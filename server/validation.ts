import { z } from "zod";
import { LEAD_STATUSES, SPECIALTIES } from "../shared/site";

const trimmed = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => z.preprocess(value => value === null ? undefined : value, z.string().trim().max(max).optional()).transform(value => value || null);

export const leadInputSchema = z.object({
  name: trimmed(140).min(2, "Enter your full name."),
  email: trimmed(254).email("Enter a valid work email.").transform(value => value.toLowerCase()),
  phone: optionalText(40),
  practiceName: trimmed(180).min(2, "Enter your practice name."),
  specialty: z.enum(SPECIALTIES, { message: "Select a specialization." }),
  location: optionalText(180),
  monthlyPatients: optionalText(60),
  message: optionalText(3000),
  source: trimmed(120).optional().default("website"),
  utmSource: optionalText(160),
  utmMedium: optionalText(160),
  utmCampaign: optionalText(160),
  consent: z.literal(true, { message: "Consent is required." }),
  website: z.string().max(0).optional().default(""),
}).strict();

export const loginSchema = z.object({ email: trimmed(254).email(), password: z.string().min(1).max(300) }).strict();
export const leadUpdateSchema = z.object({ status: z.enum(LEAD_STATUSES).optional(), notes: z.string().trim().max(10000).nullable().optional() }).strict().refine(value => value.status !== undefined || value.notes !== undefined, "Provide a status or notes update.");
export const contentUpdateSchema = z.object({ value: z.string().trim().max(20000), label: trimmed(180).optional(), contentType: z.enum(["text", "textarea", "url"]).optional(), sortOrder: z.number().int().min(0).max(1000).optional() }).strict();
export const sectionUpdateSchema = z.object({ enabled: z.boolean().optional(), title: trimmed(180).min(1).optional(), sortOrder: z.number().int().min(0).max(1000).optional() }).strict().refine(value => Object.keys(value).length > 0, "Provide a section update.");
export const seoUpdateSchema = z.object({
  title: trimmed(180).min(10),
  description: trimmed(320).min(30),
  canonicalPath: z.string().trim().regex(/^\/(?:[a-z0-9-]+\/?)*$/, "Use a root-relative canonical path."),
  noindex: z.boolean(),
  ogTitle: trimmed(180).min(10),
  ogDescription: trimmed(320).min(30),
  ogImage: z.string().trim().max(500).refine(value => value.startsWith("/") || /^https:\/\//.test(value), "Use a root-relative path or HTTPS URL."),
  twitterImage: z.string().trim().max(500).refine(value => value.startsWith("/") || /^https:\/\//.test(value), "Use a root-relative path or HTTPS URL."),
  schemaJson: z.string().max(30000),
}).strict();
