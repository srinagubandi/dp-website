import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { 
  getAllSiteContent, 
  getSiteContentBySection, 
  upsertSiteContent, 
  updateSiteContentById,
  deleteSiteContentById,
  createLeadSubmission,
  getAllLeadSubmissions,
  updateLeadStatus,
  deleteLeadSubmission
} from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
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

        // Notify the owner about the new lead
        const notificationContent = `
**New ROI Calculator Lead**

- **Email:** ${input.email}
- **Specialty:** ${input.specialty}
- **Monthly Patients:** ${input.monthlyPatients}
- **Avg. Patient Value:** $${input.patientValue}
- **Projected Growth Rate:** ${Math.round(input.projectedGrowth * 100)}%
- **Projected Annual Revenue Increase:** $${input.projectedAnnualRevenue.toLocaleString()}
        `.trim();

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
  }),
});

export type AppRouter = typeof appRouter;
