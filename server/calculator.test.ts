import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("calculator.submitLead", () => {
  it("successfully submits a lead with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calculator.submitLead({
      email: "test@practice.com",
      specialty: "Dental",
      monthlyPatients: 50,
      patientValue: 1200,
      projectedGrowth: 0.35,
      projectedAnnualRevenue: 252000,
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.calculator.submitLead({
        email: "invalid-email",
        specialty: "Dental",
        monthlyPatients: 50,
        patientValue: 1200,
        projectedGrowth: 0.35,
        projectedAnnualRevenue: 252000,
      })
    ).rejects.toThrow();
  });

  it("accepts various specialty types", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const specialties = [
      "General Practice",
      "Dental",
      "Orthodontics",
      "Urgent Care",
      "Plastic Surgery",
      "Physical Therapy",
    ];

    for (const specialty of specialties) {
      const result = await caller.calculator.submitLead({
        email: "doctor@practice.com",
        specialty,
        monthlyPatients: 30,
        patientValue: 500,
        projectedGrowth: 0.25,
        projectedAnnualRevenue: 45000,
      });

      expect(result).toEqual({ success: true });
    }
  });
});
