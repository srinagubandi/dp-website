import { eq, and, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, siteContent, InsertSiteContent, SiteContent, leadSubmissions, InsertLeadSubmission, LeadSubmission, testimonials, InsertTestimonial, Testimonial } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// =============================================================================
// USER QUERIES
// =============================================================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// =============================================================================
// SITE CONTENT QUERIES
// =============================================================================

/**
 * Get all site content entries
 */
export async function getAllSiteContent(): Promise<SiteContent[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get site content: database not available");
    return [];
  }

  return await db.select().from(siteContent).orderBy(asc(siteContent.section), asc(siteContent.sortOrder));
}

/**
 * Get site content by section
 */
export async function getSiteContentBySection(section: string): Promise<SiteContent[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get site content: database not available");
    return [];
  }

  return await db.select().from(siteContent).where(eq(siteContent.section, section)).orderBy(asc(siteContent.sortOrder));
}

/**
 * Get a specific site content entry by section and key
 */
export async function getSiteContentValue(section: string, key: string): Promise<string | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get site content: database not available");
    return null;
  }

  const result = await db.select().from(siteContent)
    .where(and(eq(siteContent.section, section), eq(siteContent.key, key)))
    .limit(1);

  return result.length > 0 ? result[0].value : null;
}

/**
 * Upsert site content (create or update)
 */
export async function upsertSiteContent(content: InsertSiteContent): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert site content: database not available");
    return;
  }

  // Check if entry exists
  const existing = await db.select().from(siteContent)
    .where(and(eq(siteContent.section, content.section), eq(siteContent.key, content.key)))
    .limit(1);

  if (existing.length > 0) {
    // Update existing
    await db.update(siteContent)
      .set({ 
        value: content.value, 
        label: content.label,
        contentType: content.contentType,
        sortOrder: content.sortOrder,
      })
      .where(eq(siteContent.id, existing[0].id));
  } else {
    // Insert new
    await db.insert(siteContent).values(content);
  }
}

/**
 * Update site content by ID
 */
export async function updateSiteContentById(id: number, value: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update site content: database not available");
    return;
  }

  await db.update(siteContent).set({ value }).where(eq(siteContent.id, id));
}

/**
 * Delete site content by ID
 */
export async function deleteSiteContentById(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete site content: database not available");
    return;
  }

  await db.delete(siteContent).where(eq(siteContent.id, id));
}

// =============================================================================
// LEAD SUBMISSION QUERIES
// =============================================================================

/**
 * Create a new lead submission
 */
export async function createLeadSubmission(lead: InsertLeadSubmission): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create lead: database not available");
    return;
  }

  await db.insert(leadSubmissions).values(lead);
}

/**
 * Get all lead submissions
 */
export async function getAllLeadSubmissions(): Promise<LeadSubmission[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get leads: database not available");
    return [];
  }

  return await db.select().from(leadSubmissions).orderBy(asc(leadSubmissions.createdAt));
}

/**
 * Update lead submission status
 */
export async function updateLeadStatus(id: number, status: LeadSubmission['status'], adminNotes?: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update lead: database not available");
    return;
  }

  const updateData: Partial<LeadSubmission> = { status };
  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }

  await db.update(leadSubmissions).set(updateData).where(eq(leadSubmissions.id, id));
}

/**
 * Delete lead submission by ID
 */
export async function deleteLeadSubmission(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete lead: database not available");
    return;
  }

  await db.delete(leadSubmissions).where(eq(leadSubmissions.id, id));
}


// =============================================================================
// TESTIMONIAL QUERIES
// =============================================================================

/**
 * Get all testimonials (for admin)
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get testimonials: database not available");
    return [];
  }

  return await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
}

/**
 * Get visible testimonials (for public display)
 */
export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get testimonials: database not available");
    return [];
  }

  return await db.select()
    .from(testimonials)
    .where(eq(testimonials.isVisible, "true"))
    .orderBy(asc(testimonials.sortOrder));
}

/**
 * Get featured testimonials
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get testimonials: database not available");
    return [];
  }

  return await db.select()
    .from(testimonials)
    .where(and(
      eq(testimonials.isVisible, "true"),
      eq(testimonials.isFeatured, "true")
    ))
    .orderBy(asc(testimonials.sortOrder));
}

/**
 * Create a new testimonial
 */
export async function createTestimonial(testimonial: InsertTestimonial): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create testimonial: database not available");
    return;
  }

  await db.insert(testimonials).values(testimonial);
}

/**
 * Update a testimonial
 */
export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update testimonial: database not available");
    return;
  }

  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

/**
 * Delete a testimonial
 */
export async function deleteTestimonial(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete testimonial: database not available");
    return;
  }

  await db.delete(testimonials).where(eq(testimonials.id, id));
}
