import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

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
});

export type AppRouter = typeof appRouter;
