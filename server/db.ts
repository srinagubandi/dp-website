import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  contentBlocks,
  leads,
  seoRecords,
  siteSections,
  type NewLead,
} from "../drizzle/schema";
import { DEFAULT_CONTENT, DEFAULT_SECTIONS, DEFAULT_SEO } from "../shared/site";

export type Database = ReturnType<typeof drizzle>;
let pool: Pool | null = null;
let database: Database | null = null;

export function getDb(): Database | null {
  if (!database && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    });
    database = drizzle(pool);
  }
  return database;
}

export async function closeDb() {
  if (pool) await pool.end();
  pool = null;
  database = null;
}

export async function seedDefaults(db: Database) {
  await db
    .insert(siteSections)
    .values(DEFAULT_SECTIONS)
    .onConflictDoNothing({ target: [siteSections.route, siteSections.slug] });
  await db
    .insert(contentBlocks)
    .values(DEFAULT_CONTENT)
    .onConflictDoNothing({
      target: [contentBlocks.route, contentBlocks.section, contentBlocks.key],
    });
  await db
    .insert(seoRecords)
    .values(
      DEFAULT_SEO.map(item => ({
        ...item,
        schemaJson: item.schemaJson ? JSON.parse(item.schemaJson) : null,
      }))
    )
    .onConflictDoNothing({ target: seoRecords.route });
}

export async function ping(db: Database) {
  await db.execute(sql`select 1`);
}

export async function createLead(db: Database, lead: NewLead) {
  return (
    await db
      .insert(leads)
      .values(lead)
      .returning({ id: leads.id, createdAt: leads.createdAt })
  )[0];
}

export type LeadFilter = {
  status?: string;
  search?: string;
  specialty?: string;
};
function leadWhere(filter: LeadFilter) {
  const clauses = [];
  if (filter.status) clauses.push(eq(leads.status, filter.status));
  if (filter.specialty) clauses.push(eq(leads.specialty, filter.specialty));
  if (filter.search) {
    const term = `%${filter.search.replace(/[%_]/g, "\\$&")}%`;
    clauses.push(
      or(
        ilike(leads.name, term),
        ilike(leads.email, term),
        ilike(leads.practiceName, term)
      )!
    );
  }
  return clauses.length ? and(...clauses) : undefined;
}

export async function listLeads(db: Database, filter: LeadFilter) {
  return db
    .select()
    .from(leads)
    .where(leadWhere(filter))
    .orderBy(desc(leads.createdAt));
}

export async function updateLead(
  db: Database,
  id: number,
  patch: { status?: string; notes?: string | null }
) {
  return (
    (
      await db
        .update(leads)
        .set({ ...patch, updatedAt: new Date() })
        .where(eq(leads.id, id))
        .returning()
    )[0] ?? null
  );
}

export async function leadCounts(db: Database) {
  const rows = await db
    .select({ status: leads.status, count: sql<number>`count(*)::int` })
    .from(leads)
    .groupBy(leads.status);
  const counts = { all: 0, new: 0, contacted: 0, qualified: 0, closed: 0 };
  for (const row of rows) {
    counts.all += row.count;
    if (row.status in counts)
      counts[row.status as "new" | "contacted" | "qualified" | "closed"] =
        row.count;
  }
  return counts;
}

export async function getPublicConfig(db: Database | null) {
  if (!db) return { content: [], sections: [], seo: [] };
  const [content, sections, seo] = await Promise.all([
    db
      .select()
      .from(contentBlocks)
      .orderBy(asc(contentBlocks.route), asc(contentBlocks.sortOrder)),
    db
      .select()
      .from(siteSections)
      .orderBy(asc(siteSections.route), asc(siteSections.sortOrder)),
    db.select().from(seoRecords).orderBy(asc(seoRecords.route)),
  ]);
  return { content, sections, seo };
}

export const getAllContent = (db: Database) =>
  db
    .select()
    .from(contentBlocks)
    .orderBy(
      asc(contentBlocks.route),
      asc(contentBlocks.section),
      asc(contentBlocks.sortOrder)
    );
export async function updateContent(
  db: Database,
  id: number,
  patch: {
    value: string;
    label?: string;
    contentType?: string;
    sortOrder?: number;
  }
) {
  return (
    (
      await db
        .update(contentBlocks)
        .set({ ...patch, updatedAt: new Date() })
        .where(eq(contentBlocks.id, id))
        .returning()
    )[0] ?? null
  );
}
export const getAllSections = (db: Database) =>
  db
    .select()
    .from(siteSections)
    .orderBy(asc(siteSections.route), asc(siteSections.sortOrder));
export async function updateSection(
  db: Database,
  id: number,
  patch: { enabled?: boolean; title?: string; sortOrder?: number }
) {
  return (
    (
      await db
        .update(siteSections)
        .set({ ...patch, updatedAt: new Date() })
        .where(eq(siteSections.id, id))
        .returning()
    )[0] ?? null
  );
}
export const getAllSeo = (db: Database) =>
  db.select().from(seoRecords).orderBy(asc(seoRecords.route));
export async function putSeo(
  db: Database,
  value: typeof seoRecords.$inferInsert
) {
  return (
    await db
      .insert(seoRecords)
      .values(value)
      .onConflictDoUpdate({
        target: seoRecords.route,
        set: { ...value, updatedAt: new Date() },
      })
      .returning()
  )[0];
}
