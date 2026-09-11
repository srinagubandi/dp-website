import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("leads.submitBrief", () => {
  it("accepts a valid Practice Growth Brief request", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.submitBrief({
      practiceName: "City Dental Care",
      specialty: "Dental",
      location: "Richmond, VA",
      patientVolume: "101–500 / month",
      goal: "Increase high-value new patient volume.",
      website: "https://citydental.example",
      email: "owner@citydental.example",
      notes: "Interested in local search visibility.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects a brief request without a valid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.submitBrief({
        practiceName: "City Dental Care",
        specialty: "Dental",
        location: "Richmond, VA",
        goal: "Increase high-value new patient volume.",
        email: "invalid-email",
      })
    ).rejects.toThrow();
  });
});
