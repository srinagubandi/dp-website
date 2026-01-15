/**
 * =============================================================================
 * SEED CONTENT SCRIPT
 * =============================================================================
 * 
 * This script populates the database with initial editable content blocks.
 * Run with: node scripts/seed-content.mjs
 * 
 * Content is organized by section:
 *   - contact: Phone, email, address
 *   - hero: Main headline, subheadline
 *   - about: Company description
 *   - footer: Footer text
 *   - notifications: Notification preferences
 * 
 * =============================================================================
 */

import { drizzle } from "drizzle-orm/mysql2";
import { eq, and } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

// Define schema inline for standalone script
const siteContent = mysqlTable("site_content", {
  id: int("id").autoincrement().primaryKey(),
  section: varchar("section", { length: 64 }).notNull(),
  key: varchar("key", { length: 64 }).notNull(),
  value: text("value").notNull(),
  label: varchar("label", { length: 128 }),
  contentType: mysqlEnum("contentType", ["text", "textarea", "image", "link"]).default("text").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Initial content to seed
const seedData = [
  // Contact Section
  {
    section: "contact",
    key: "phone",
    value: "1-800-DOC-PROPEL",
    label: "Phone Number",
    contentType: "text",
    sortOrder: 1,
  },
  {
    section: "contact",
    key: "phone_link",
    value: "1-800-362-7767",
    label: "Phone Number (for tel: link)",
    contentType: "text",
    sortOrder: 2,
  },
  {
    section: "contact",
    key: "email",
    value: "hello@docpropel.com",
    label: "Email Address",
    contentType: "text",
    sortOrder: 3,
  },
  
  // Hero Section
  {
    section: "hero",
    key: "headline",
    value: "Stop Paying for Promises.",
    label: "Main Headline",
    contentType: "text",
    sortOrder: 1,
  },
  {
    section: "hero",
    key: "subheadline",
    value: "We grow your patient base. You only pay when we deliver. DocPropel is the performance-based growth partner for healthcare practices. No retainers. No long-term contracts. Just accountable patient growth.",
    label: "Subheadline",
    contentType: "textarea",
    sortOrder: 2,
  },
  {
    section: "hero",
    key: "cta_text",
    value: "Request a Practice Growth Brief",
    label: "CTA Button Text",
    contentType: "text",
    sortOrder: 3,
  },
  
  // About Section
  {
    section: "about",
    key: "title",
    value: "Built for Healthcare. Without the Games.",
    label: "About Title",
    contentType: "text",
    sortOrder: 1,
  },
  {
    section: "about",
    key: "description",
    value: "We built DocPropel specifically for healthcare practices that want growth without the hype. We understand compliance, respect how practices actually operate, and avoid agency theatrics. Our aim is to be a long-term growth partner, measured by results. No buzzwords, just accountable patient growth.",
    label: "About Description",
    contentType: "textarea",
    sortOrder: 2,
  },
  
  // Footer Section
  {
    section: "footer",
    key: "tagline",
    value: "The only performance-based marketing partner for healthcare practices. We grow your patient base, you only pay for results.",
    label: "Footer Tagline",
    contentType: "textarea",
    sortOrder: 1,
  },
  {
    section: "footer",
    key: "copyright",
    value: "© 2026 DocPropel. All rights reserved.",
    label: "Copyright Text",
    contentType: "text",
    sortOrder: 2,
  },
  
  // Notification Settings
  {
    section: "notifications",
    key: "email_enabled",
    value: "true",
    label: "Email Notifications Enabled",
    contentType: "text",
    sortOrder: 1,
  },
  {
    section: "notifications",
    key: "email_recipient",
    value: "hello@docpropel.com",
    label: "Email Notification Recipient",
    contentType: "text",
    sortOrder: 2,
  },
  {
    section: "notifications",
    key: "sms_enabled",
    value: "false",
    label: "SMS Notifications Enabled",
    contentType: "text",
    sortOrder: 3,
  },
  {
    section: "notifications",
    key: "sms_phone",
    value: "",
    label: "SMS Phone Number",
    contentType: "text",
    sortOrder: 4,
  },
  {
    section: "notifications",
    key: "whatsapp_enabled",
    value: "false",
    label: "WhatsApp Notifications Enabled",
    contentType: "text",
    sortOrder: 5,
  },
  {
    section: "notifications",
    key: "whatsapp_phone",
    value: "",
    label: "WhatsApp Phone Number",
    contentType: "text",
    sortOrder: 6,
  },
];

async function seed() {
  console.log("🌱 Starting content seed...");
  
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }
  
  const db = drizzle(databaseUrl);
  
  for (const item of seedData) {
    try {
      // Check if entry already exists
      const existing = await db.select()
        .from(siteContent)
        .where(and(
          eq(siteContent.section, item.section),
          eq(siteContent.key, item.key)
        ))
        .limit(1);
      
      if (existing.length === 0) {
        // Insert new entry
        await db.insert(siteContent).values(item);
        console.log(`  ✅ Added: ${item.section}.${item.key}`);
      } else {
        console.log(`  ⏭️  Skipped (exists): ${item.section}.${item.key}`);
      }
    } catch (error) {
      console.error(`  ❌ Error with ${item.section}.${item.key}:`, error.message);
    }
  }
  
  console.log("\\n🎉 Content seed complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
