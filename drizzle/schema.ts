import {
  bigserial,
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: varchar("name", { length: 140 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    practiceName: varchar("practice_name", { length: 180 }).notNull(),
    specialty: varchar("specialty", { length: 100 }).notNull(),
    location: varchar("location", { length: 180 }),
    monthlyPatients: varchar("monthly_patients", { length: 60 }),
    message: text("message"),
    source: varchar("source", { length: 120 }).notNull().default("website"),
    utmSource: varchar("utm_source", { length: 160 }),
    utmMedium: varchar("utm_medium", { length: 160 }),
    utmCampaign: varchar("utm_campaign", { length: 160 }),
    status: varchar("status", { length: 30 }).notNull().default("new"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  table => [index("leads_status_idx").on(table.status), index("leads_created_at_idx").on(table.createdAt)]
);

export const contentBlocks = pgTable(
  "content_blocks",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    route: varchar("route", { length: 120 }).notNull(),
    section: varchar("section", { length: 100 }).notNull(),
    key: varchar("key", { length: 100 }).notNull(),
    value: text("value").notNull(),
    contentType: varchar("content_type", { length: 30 }).notNull().default("text"),
    label: varchar("label", { length: 180 }).notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  table => [uniqueIndex("content_route_section_key_uq").on(table.route, table.section, table.key)]
);

export const siteSections = pgTable(
  "site_sections",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    route: varchar("route", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    enabled: boolean("enabled").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  table => [uniqueIndex("sections_route_slug_uq").on(table.route, table.slug)]
);

export const seoRecords = pgTable("seo_records", {
  route: varchar("route", { length: 120 }).primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  description: varchar("description", { length: 320 }).notNull(),
  canonicalPath: varchar("canonical_path", { length: 240 }).notNull(),
  noindex: boolean("noindex").notNull().default(false),
  ogTitle: varchar("og_title", { length: 180 }).notNull(),
  ogDescription: varchar("og_description", { length: 320 }).notNull(),
  ogImage: varchar("og_image", { length: 500 }).notNull(),
  twitterImage: varchar("twitter_image", { length: 500 }).notNull(),
  schemaJson: jsonb("schema_json"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type SiteSection = typeof siteSections.$inferSelect;
export type SeoRecord = typeof seoRecords.$inferSelect;
