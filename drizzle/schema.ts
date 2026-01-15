import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * =============================================================================
 * SITE CONTENT TABLE
 * =============================================================================
 * 
 * Stores editable content for the website. Each row represents a content block
 * that can be edited through the admin dashboard.
 * 
 * Content is organized by:
 *   - section: Which part of the site (e.g., "hero", "about", "contact")
 *   - key: Specific content item (e.g., "headline", "phone", "email")
 *   - value: The actual content text
 * 
 * Example entries:
 *   section: "contact", key: "phone", value: "1-800-DOC-PROPEL"
 *   section: "hero", key: "headline", value: "Stop Paying for Promises."
 *   section: "about", key: "description", value: "We built DocPropel..."
 * 
 * =============================================================================
 */
export const siteContent = mysqlTable("site_content", {
  id: int("id").autoincrement().primaryKey(),
  
  /** Section of the website (e.g., "hero", "about", "contact", "footer") */
  section: varchar("section", { length: 64 }).notNull(),
  
  /** Unique key within the section (e.g., "headline", "phone", "email") */
  key: varchar("key", { length: 64 }).notNull(),
  
  /** The actual content value */
  value: text("value").notNull(),
  
  /** Optional label for admin UI display */
  label: varchar("label", { length: 128 }),
  
  /** Content type for rendering (text, textarea, image, link) */
  contentType: mysqlEnum("contentType", ["text", "textarea", "image", "link"]).default("text").notNull(),
  
  /** Order for display in admin UI */
  sortOrder: int("sortOrder").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

/**
 * =============================================================================
 * LEAD SUBMISSIONS TABLE
 * =============================================================================
 * 
 * Stores form submissions from the intake form (Practice Growth Brief requests).
 * This allows the admin to view and manage leads from the dashboard.
 * 
 * =============================================================================
 */
export const leadSubmissions = mysqlTable("lead_submissions", {
  id: int("id").autoincrement().primaryKey(),
  
  /** Contact information */
  practiceName: varchar("practiceName", { length: 256 }),
  contactName: varchar("contactName", { length: 256 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  
  /** Practice details */
  specialty: varchar("specialty", { length: 128 }),
  location: varchar("location", { length: 256 }),
  
  /** Additional notes or message */
  message: text("message"),
  
  /** Lead status for tracking */
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted", "closed"]).default("new").notNull(),
  
  /** Notes from admin */
  adminNotes: text("adminNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LeadSubmission = typeof leadSubmissions.$inferSelect;
export type InsertLeadSubmission = typeof leadSubmissions.$inferInsert;


/**
 * =============================================================================
 * TESTIMONIALS TABLE
 * =============================================================================
 * 
 * Stores client testimonials and case study highlights for display on the
 * Results page and throughout the website.
 * 
 * Each testimonial includes:
 *   - Client/practice information
 *   - Quote or testimonial text
 *   - Metrics (growth percentage, new patients, etc.)
 *   - Display settings (featured, order, visibility)
 * 
 * =============================================================================
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  
  /** Client/Practice name */
  clientName: varchar("clientName", { length: 256 }).notNull(),
  
  /** Practice name or business name */
  practiceName: varchar("practiceName", { length: 256 }),
  
  /** Specialty (Doctors, Dentists, Pharmacies, PT/OT) */
  specialty: varchar("specialty", { length: 128 }),
  
  /** Location (city, state) */
  location: varchar("location", { length: 256 }),
  
  /** The testimonial quote */
  quote: text("quote").notNull(),
  
  /** Client photo URL (optional) */
  photoUrl: varchar("photoUrl", { length: 512 }),
  
  /** Growth metrics - percentage increase */
  growthPercent: int("growthPercent"),
  
  /** Growth metrics - new patients per month */
  newPatientsPerMonth: int("newPatientsPerMonth"),
  
  /** Growth metrics - revenue increase */
  revenueIncrease: varchar("revenueIncrease", { length: 64 }),
  
  /** Star rating (1-5) */
  rating: int("rating").default(5),
  
  /** Whether this testimonial is featured prominently */
  isFeatured: mysqlEnum("isFeatured", ["true", "false"]).default("false").notNull(),
  
  /** Whether this testimonial is visible on the site */
  isVisible: mysqlEnum("isVisible", ["true", "false"]).default("true").notNull(),
  
  /** Display order (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
