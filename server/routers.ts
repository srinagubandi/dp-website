import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import crypto from "crypto";
import { notifyOwner } from "./_core/notification";
import { 
  getAllSiteContent, 
  getSiteContentBySection,
  getSiteContentValue, 
  upsertSiteContent, 
  updateSiteContentById,
  deleteSiteContentById,
  createLeadSubmission,
  getAllLeadSubmissions,
  updateLeadStatus,
  deleteLeadSubmission,
  getAllTestimonials,
  getVisibleTestimonials,
  getFeaturedTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./db";
import { sendLeadNotifications } from "./notifications";

/**
 * ADMIN CREDENTIALS
 * These can be overridden via environment variables:
 * - ADMIN_USERNAME (default: "admin")
 * - ADMIN_PASSWORD (default: "DocPropel2024!")
 * 
 * For Railway deployment, set these in your Railway dashboard under Variables.
 */
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "DocPropel2024!";
const ADMIN_TOKEN_SECRET = process.env.JWT_SECRET || "docpropel-admin-secret-key";

// Simple token generation for admin sessions
function generateAdminToken(): string {
  const payload = {
    type: "admin",
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    rand: crypto.randomBytes(16).toString("hex")
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

// Verify admin token
function verifyAdminToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    return payload.type === "admin" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  
  // =============================================================================
  // ADMIN AUTHENTICATION (Username/Password based)
  // =============================================================================
  adminAuth: router({
    /** Login with username and password */
    login: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Validate credentials against environment variables
        if (input.username === ADMIN_USERNAME && input.password === ADMIN_PASSWORD) {
          const token = generateAdminToken();
          return {
            success: true,
            token,
            message: "Login successful"
          };
        }
        return {
          success: false,
          token: "",
          message: "Invalid username or password"
        };
      }),
    
    /** Verify admin token */
    verify: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(({ input }) => {
        return {
          valid: verifyAdminToken(input.token)
        };
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // =============================================================================
  // PUBLIC ROUTES
  // =============================================================================

  /** Get visible testimonials for public display */
  testimonials: router({
    getVisible: publicProcedure.query(async () => {
      return await getVisibleTestimonials();
    }),
    getFeatured: publicProcedure.query(async () => {
      return await getFeaturedTestimonials();
    }),
  }),

  // ROI Calculator Lead Capture
  calculator: router({
    submitLead: publicProcedure
      .input(z.object({
        email: z.string().email(),
        specialty: z.string(),
        monthlyPatients: z.number(),
        patientValue: z.number(),
        projectedGrowth: z.number(),
        projectedAnnualRevenue: z.number(),
      }))
      .mutation(async ({ input }) => {
        // Save lead to database
        await createLeadSubmission({
          email: input.email,
          specialty: input.specialty,
          message: `Monthly Patients: ${input.monthlyPatients}, Avg Value: $${input.patientValue}, Projected Growth: ${Math.round(input.projectedGrowth * 100)}%, Projected Revenue: $${input.projectedAnnualRevenue.toLocaleString()}`,
          status: "new",
        });

        // Build notification content
        const notificationContent = `
**New ROI Calculator Lead**

- **Email:** ${input.email}
- **Specialty:** ${input.specialty}
- **Monthly Patients:** ${input.monthlyPatients}
- **Avg. Patient Value:** $${input.patientValue}
- **Projected Growth Rate:** ${Math.round(input.projectedGrowth * 100)}%
- **Projected Annual Revenue Increase:** $${input.projectedAnnualRevenue.toLocaleString()}
        `.trim();

        // Send notifications via configured channels (email, SMS, WhatsApp)
        await sendLeadNotifications({
          title: "New ROI Calculator Lead",
          content: notificationContent,
          leadEmail: input.email,
          leadSpecialty: input.specialty,
        });

        // Also notify owner via Manus notification
        await notifyOwner({
          title: "New ROI Calculator Lead",
          content: notificationContent,
        });

        return { success: true };
      }),
  }),

  // =============================================================================
  // ADMIN ROUTES - Require admin role
  // =============================================================================
  
  admin: router({
    // -------------------------------------------------------------------------
    // SITE CONTENT MANAGEMENT
    // -------------------------------------------------------------------------
    
    /** Get all site content */
    getAllContent: adminProcedure.query(async () => {
      return await getAllSiteContent();
    }),

    /** Get site content by section */
    getContentBySection: adminProcedure
      .input(z.object({ section: z.string() }))
      .query(async ({ input }) => {
        return await getSiteContentBySection(input.section);
      }),

    /** Create or update site content */
    upsertContent: adminProcedure
      .input(z.object({
        section: z.string(),
        key: z.string(),
        value: z.string(),
        label: z.string().optional(),
        contentType: z.enum(["text", "textarea", "image", "link"]).optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertSiteContent({
          section: input.section,
          key: input.key,
          value: input.value,
          label: input.label ?? null,
          contentType: input.contentType ?? "text",
          sortOrder: input.sortOrder ?? 0,
        });
        return { success: true };
      }),

    /** Update site content by ID */
    updateContent: adminProcedure
      .input(z.object({
        id: z.number(),
        value: z.string(),
      }))
      .mutation(async ({ input }) => {
        await updateSiteContentById(input.id, input.value);
        return { success: true };
      }),

    /** Delete site content by ID */
    deleteContent: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteSiteContentById(input.id);
        return { success: true };
      }),

    // -------------------------------------------------------------------------
    // LEAD MANAGEMENT
    // -------------------------------------------------------------------------

    /** Get all lead submissions */
    getAllLeads: adminProcedure.query(async () => {
      return await getAllLeadSubmissions();
    }),

    /** Update lead status */
    updateLeadStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "qualified", "converted", "closed"]),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status, input.adminNotes);
        return { success: true };
      }),

    /** Delete lead */
    deleteLead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteLeadSubmission(input.id);
        return { success: true };
      }),

    // -------------------------------------------------------------------------
    // TESTIMONIAL MANAGEMENT
    // -------------------------------------------------------------------------

    /** Get all testimonials (including hidden) */
    getAllTestimonials: adminProcedure.query(async () => {
      return await getAllTestimonials();
    }),

    /** Create a new testimonial */
    createTestimonial: adminProcedure
      .input(z.object({
        clientName: z.string(),
        practiceName: z.string().optional(),
        specialty: z.string().optional(),
        location: z.string().optional(),
        quote: z.string(),
        photoUrl: z.string().optional(),
        growthPercent: z.number().optional(),
        newPatientsPerMonth: z.number().optional(),
        revenueIncrease: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        isFeatured: z.enum(["true", "false"]).optional(),
        isVisible: z.enum(["true", "false"]).optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await createTestimonial({
          clientName: input.clientName,
          practiceName: input.practiceName ?? null,
          specialty: input.specialty ?? null,
          location: input.location ?? null,
          quote: input.quote,
          photoUrl: input.photoUrl ?? null,
          growthPercent: input.growthPercent ?? null,
          newPatientsPerMonth: input.newPatientsPerMonth ?? null,
          revenueIncrease: input.revenueIncrease ?? null,
          rating: input.rating ?? 5,
          isFeatured: input.isFeatured ?? "false",
          isVisible: input.isVisible ?? "true",
          sortOrder: input.sortOrder ?? 0,
        });
        return { success: true };
      }),

    /** Update a testimonial */
    updateTestimonial: adminProcedure
      .input(z.object({
        id: z.number(),
        clientName: z.string().optional(),
        practiceName: z.string().optional(),
        specialty: z.string().optional(),
        location: z.string().optional(),
        quote: z.string().optional(),
        photoUrl: z.string().optional(),
        growthPercent: z.number().optional(),
        newPatientsPerMonth: z.number().optional(),
        revenueIncrease: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        isFeatured: z.enum(["true", "false"]).optional(),
        isVisible: z.enum(["true", "false"]).optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateTestimonial(id, data);
        return { success: true };
      }),

    /** Delete a testimonial */
    deleteTestimonial: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),

    // -------------------------------------------------------------------------
    // NOTIFICATION SETTINGS
    // -------------------------------------------------------------------------

    /** Get notification settings */
    getNotificationSettings: adminProcedure.query(async () => {
      const settings = await getSiteContentBySection("notifications");
      const result: Record<string, string> = {};
      for (const item of settings) {
        result[item.key] = item.value;
      }
      return result;
    }),

    /** Update notification settings */
    updateNotificationSettings: adminProcedure
      .input(z.object({
        email_enabled: z.string().optional(),
        email_recipient: z.string().optional(),
        sms_enabled: z.string().optional(),
        sms_phone: z.string().optional(),
        whatsapp_enabled: z.string().optional(),
        whatsapp_phone: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const updates = Object.entries(input).filter(([_, v]) => v !== undefined);
        for (const [key, value] of updates) {
          await upsertSiteContent({
            section: "notifications",
            key,
            value: value as string,
            label: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            contentType: "text",
            sortOrder: 0,
          });
        }
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
