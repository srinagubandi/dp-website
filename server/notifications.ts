/**
 * =============================================================================
 * NOTIFICATIONS MODULE
 * =============================================================================
 * 
 * This module handles sending notifications through multiple channels:
 *   - Email (via SendGrid)
 *   - SMS (via Twilio)
 *   - WhatsApp (via Twilio WhatsApp API)
 * 
 * Notification preferences are stored in the site_content table under the
 * "notifications" section and can be configured via the admin dashboard.
 * 
 * REQUIRED ENVIRONMENT VARIABLES:
 *   - SENDGRID_API_KEY: SendGrid API key for email notifications
 *   - TWILIO_ACCOUNT_SID: Twilio account SID for SMS/WhatsApp
 *   - TWILIO_AUTH_TOKEN: Twilio auth token
 *   - TWILIO_PHONE_NUMBER: Twilio phone number for SMS
 *   - TWILIO_WHATSAPP_NUMBER: Twilio WhatsApp number (format: whatsapp:+1234567890)
 * 
 * =============================================================================
 */

import { getSiteContentValue } from "./db";

// =============================================================================
// TYPES
// =============================================================================

interface LeadNotificationParams {
  title: string;
  content: string;
  leadEmail?: string;
  leadSpecialty?: string;
}

interface NotificationSettings {
  emailEnabled: boolean;
  emailRecipient: string;
  smsEnabled: boolean;
  smsPhone: string;
  whatsappEnabled: boolean;
  whatsappPhone: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get notification settings from the database
 */
async function getNotificationSettings(): Promise<NotificationSettings> {
  const emailEnabled = await getSiteContentValue("notifications", "email_enabled");
  const emailRecipient = await getSiteContentValue("notifications", "email_recipient");
  const smsEnabled = await getSiteContentValue("notifications", "sms_enabled");
  const smsPhone = await getSiteContentValue("notifications", "sms_phone");
  const whatsappEnabled = await getSiteContentValue("notifications", "whatsapp_enabled");
  const whatsappPhone = await getSiteContentValue("notifications", "whatsapp_phone");

  return {
    emailEnabled: emailEnabled === "true",
    emailRecipient: emailRecipient || "",
    smsEnabled: smsEnabled === "true",
    smsPhone: smsPhone || "",
    whatsappEnabled: whatsappEnabled === "true",
    whatsappPhone: whatsappPhone || "",
  };
}

/**
 * Convert markdown-style content to plain text for SMS/WhatsApp
 */
function markdownToPlainText(content: string): string {
  return content
    .replace(/\*\*/g, "") // Remove bold markers
    .replace(/\*/g, "")   // Remove italic markers
    .replace(/- /g, "• ") // Convert list items
    .trim();
}

// =============================================================================
// EMAIL NOTIFICATIONS (SendGrid)
// =============================================================================

/**
 * Send email notification via SendGrid
 */
async function sendEmailNotification(
  to: string,
  subject: string,
  content: string
): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    console.warn("[Notifications] SendGrid API key not configured, skipping email");
    return false;
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: "notifications@docpropel.com", name: "DocPropel" },
        subject: subject,
        content: [
          {
            type: "text/html",
            value: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #0066B3; color: white; padding: 20px; text-align: center;">
                  <h1 style="margin: 0;">DocPropel</h1>
                </div>
                <div style="padding: 20px; background: #f9f9f9;">
                  <h2 style="color: #0066B3;">${subject}</h2>
                  <div style="white-space: pre-wrap; line-height: 1.6;">
                    ${content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
                  </div>
                </div>
                <div style="padding: 15px; text-align: center; color: #666; font-size: 12px;">
                  © 2026 DocPropel. All rights reserved.
                </div>
              </div>
            `,
          },
        ],
      }),
    });

    if (response.ok) {
      console.log(`[Notifications] Email sent to ${to}`);
      return true;
    } else {
      const error = await response.text();
      console.error("[Notifications] SendGrid error:", error);
      return false;
    }
  } catch (error) {
    console.error("[Notifications] Email send failed:", error);
    return false;
  }
}

// =============================================================================
// SMS NOTIFICATIONS (Twilio)
// =============================================================================

/**
 * Send SMS notification via Twilio
 */
async function sendSmsNotification(
  to: string,
  message: string
): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[Notifications] Twilio credentials not configured, skipping SMS");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: to,
          From: fromNumber,
          Body: message.substring(0, 1600), // SMS limit
        }),
      }
    );

    if (response.ok) {
      console.log(`[Notifications] SMS sent to ${to}`);
      return true;
    } else {
      const error = await response.text();
      console.error("[Notifications] Twilio SMS error:", error);
      return false;
    }
  } catch (error) {
    console.error("[Notifications] SMS send failed:", error);
    return false;
  }
}

// =============================================================================
// WHATSAPP NOTIFICATIONS (Twilio WhatsApp API)
// =============================================================================

/**
 * Send WhatsApp notification via Twilio
 */
async function sendWhatsAppNotification(
  to: string,
  message: string
): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886"; // Twilio sandbox default

  if (!accountSid || !authToken) {
    console.warn("[Notifications] Twilio credentials not configured, skipping WhatsApp");
    return false;
  }

  // Format the phone number for WhatsApp
  const whatsappTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: whatsappTo,
          From: fromNumber,
          Body: message.substring(0, 1600),
        }),
      }
    );

    if (response.ok) {
      console.log(`[Notifications] WhatsApp sent to ${to}`);
      return true;
    } else {
      const error = await response.text();
      console.error("[Notifications] Twilio WhatsApp error:", error);
      return false;
    }
  } catch (error) {
    console.error("[Notifications] WhatsApp send failed:", error);
    return false;
  }
}

// =============================================================================
// MAIN NOTIFICATION FUNCTION
// =============================================================================

/**
 * Send lead notifications through all enabled channels
 * 
 * This function checks the notification settings in the database and sends
 * notifications through email, SMS, and/or WhatsApp based on configuration.
 */
export async function sendLeadNotifications(params: LeadNotificationParams): Promise<void> {
  const { title, content, leadEmail, leadSpecialty } = params;
  
  // Get notification settings from database
  const settings = await getNotificationSettings();
  
  const plainTextContent = markdownToPlainText(content);
  const smsContent = `${title}\n\n${plainTextContent}`;

  // Track results
  const results: { channel: string; success: boolean }[] = [];

  // Send email if enabled
  if (settings.emailEnabled && settings.emailRecipient) {
    const success = await sendEmailNotification(
      settings.emailRecipient,
      title,
      content
    );
    results.push({ channel: "email", success });
  }

  // Send SMS if enabled
  if (settings.smsEnabled && settings.smsPhone) {
    const success = await sendSmsNotification(
      settings.smsPhone,
      smsContent
    );
    results.push({ channel: "sms", success });
  }

  // Send WhatsApp if enabled
  if (settings.whatsappEnabled && settings.whatsappPhone) {
    const success = await sendWhatsAppNotification(
      settings.whatsappPhone,
      smsContent
    );
    results.push({ channel: "whatsapp", success });
  }

  // Log summary
  if (results.length === 0) {
    console.log("[Notifications] No notification channels enabled");
  } else {
    const successful = results.filter(r => r.success).map(r => r.channel);
    const failed = results.filter(r => !r.success).map(r => r.channel);
    
    if (successful.length > 0) {
      console.log(`[Notifications] Sent via: ${successful.join(", ")}`);
    }
    if (failed.length > 0) {
      console.warn(`[Notifications] Failed: ${failed.join(", ")}`);
    }
  }
}
