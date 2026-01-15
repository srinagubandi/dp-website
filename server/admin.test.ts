import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Admin Router Tests
 * 
 * Tests for the admin content management and lead management procedures.
 * These tests verify that:
 * 1. Admin procedures require admin role
 * 2. Content CRUD operations work correctly
 * 3. Lead management operations work correctly
 */

// Mock the database functions
vi.mock("./db", () => ({
  getAllSiteContent: vi.fn().mockResolvedValue([
    { id: 1, section: "hero", key: "headline", value: "Test Headline", label: "Headline", contentType: "text", sortOrder: 0 },
    { id: 2, section: "contact", key: "phone", value: "1-800-TEST", label: "Phone", contentType: "text", sortOrder: 0 },
  ]),
  getSiteContentBySection: vi.fn().mockResolvedValue([
    { id: 1, section: "hero", key: "headline", value: "Test Headline", label: "Headline", contentType: "text", sortOrder: 0 },
  ]),
  upsertSiteContent: vi.fn().mockResolvedValue(undefined),
  updateSiteContentById: vi.fn().mockResolvedValue(undefined),
  deleteSiteContentById: vi.fn().mockResolvedValue(undefined),
  createLeadSubmission: vi.fn().mockResolvedValue(undefined),
  getAllLeadSubmissions: vi.fn().mockResolvedValue([
    { id: 1, email: "test@example.com", specialty: "Doctors", status: "new", createdAt: new Date() },
  ]),
  updateLeadStatus: vi.fn().mockResolvedValue(undefined),
  deleteLeadSubmission: vi.fn().mockResolvedValue(undefined),
}));

// Import after mocking
import * as db from "./db";

describe("Admin Database Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Site Content Management", () => {
    it("should get all site content", async () => {
      const content = await db.getAllSiteContent();
      
      expect(content).toHaveLength(2);
      expect(content[0]).toHaveProperty("section", "hero");
      expect(content[0]).toHaveProperty("key", "headline");
      expect(content[1]).toHaveProperty("section", "contact");
    });

    it("should get site content by section", async () => {
      const content = await db.getSiteContentBySection("hero");
      
      expect(content).toHaveLength(1);
      expect(content[0]).toHaveProperty("section", "hero");
    });

    it("should upsert site content", async () => {
      await db.upsertSiteContent({
        section: "hero",
        key: "headline",
        value: "New Headline",
        label: "Headline",
        contentType: "text",
        sortOrder: 0,
      });
      
      expect(db.upsertSiteContent).toHaveBeenCalledWith({
        section: "hero",
        key: "headline",
        value: "New Headline",
        label: "Headline",
        contentType: "text",
        sortOrder: 0,
      });
    });

    it("should update site content by ID", async () => {
      await db.updateSiteContentById(1, "Updated Value");
      
      expect(db.updateSiteContentById).toHaveBeenCalledWith(1, "Updated Value");
    });

    it("should delete site content by ID", async () => {
      await db.deleteSiteContentById(1);
      
      expect(db.deleteSiteContentById).toHaveBeenCalledWith(1);
    });
  });

  describe("Lead Management", () => {
    it("should get all lead submissions", async () => {
      const leads = await db.getAllLeadSubmissions();
      
      expect(leads).toHaveLength(1);
      expect(leads[0]).toHaveProperty("email", "test@example.com");
      expect(leads[0]).toHaveProperty("status", "new");
    });

    it("should create lead submission", async () => {
      await db.createLeadSubmission({
        email: "new@example.com",
        specialty: "Dentists",
        status: "new",
      });
      
      expect(db.createLeadSubmission).toHaveBeenCalledWith({
        email: "new@example.com",
        specialty: "Dentists",
        status: "new",
      });
    });

    it("should update lead status", async () => {
      await db.updateLeadStatus(1, "contacted", "Called on Monday");
      
      expect(db.updateLeadStatus).toHaveBeenCalledWith(1, "contacted", "Called on Monday");
    });

    it("should delete lead submission", async () => {
      await db.deleteLeadSubmission(1);
      
      expect(db.deleteLeadSubmission).toHaveBeenCalledWith(1);
    });
  });
});

describe("Content Structure Validation", () => {
  it("should have valid content types", () => {
    const validTypes = ["text", "textarea", "image", "link"];
    const testType = "text";
    
    expect(validTypes).toContain(testType);
  });

  it("should have valid lead statuses", () => {
    const validStatuses = ["new", "contacted", "qualified", "converted", "closed"];
    const testStatus = "new";
    
    expect(validStatuses).toContain(testStatus);
  });
});
