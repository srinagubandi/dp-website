export const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/specialties",
  "/how-it-works",
  "/results",
  "/about",
  "/team",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
export type ContentType = "text" | "textarea" | "url";
export type SectionSeed = { route: PublicRoute; slug: string; title: string; enabled: boolean; sortOrder: number };
export type ContentSeed = { route: PublicRoute; section: string; key: string; value: string; contentType: ContentType; label: string; sortOrder: number };
export type SeoSeed = {
  route: PublicRoute;
  title: string;
  description: string;
  canonicalPath: string;
  noindex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterImage: string;
  schemaJson: string;
};

const sectionMap: Record<PublicRoute, string[]> = {
  "/": ["hero", "pathway", "specialties", "proof", "growth-brief", "final-cta"],
  "/services": ["hero", "services", "growth-brief"],
  "/specialties": ["hero", "specialties", "growth-brief"],
  "/how-it-works": ["hero", "workflow", "performance-boundary", "growth-brief"],
  "/results": ["hero", "evidence", "review-standard", "growth-brief"],
  "/about": ["hero", "mission", "principles", "patient-trust", "growth-brief"],
  "/team": ["hero", "roles", "growth-brief"],
  "/contact": ["hero", "contact-channels", "what-happens-next", "growth-brief"],
  "/privacy": ["hero", "legal-template"],
  "/terms": ["hero", "legal-template"],
};

export const DEFAULT_SECTIONS: SectionSeed[] = PUBLIC_ROUTES.flatMap(route =>
  sectionMap[route].map((slug, sortOrder) => ({
    route,
    slug,
    title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    enabled: true,
    sortOrder,
  }))
);

export const DEFAULT_CONTENT: ContentSeed[] = [
  ["/", "hero", "eyebrow", "Performance-based healthcare growth", "text", "Hero eyebrow", 0],
  ["/", "hero", "title", "Stop paying for promises. Pay for patients.", "text", "Hero title", 1],
  ["/", "hero", "body", "DocPropel helps doctors, dentists, pharmacies, PT/OT, ABA, and pediatric clinics turn local demand into patient opportunities—with a model built for accountability.", "textarea", "Hero body", 2],
  ["/", "pathway", "title", "A performance-based model built around your patients.", "text", "Pathway title", 0],
  ["/", "proof", "title", "Evidence belongs in context.", "text", "Proof title", 0],
  ["/", "proof", "body", "Before a case study is published, its baseline, timeframe, specialty, service mix, measurement method, and approval are reviewed together. Until that review is complete, this site does not publish performance figures or client claims.", "textarea", "Proof body", 1],
  ["/", "growth-brief", "title", "Request a practical Growth Brief.", "text", "Growth Brief title", 0],
  ["/", "growth-brief", "body", "Tell us about your specialty, market, capacity, and current growth challenge. We’ll review the context without a long sales process or pressure.", "textarea", "Growth Brief body", 1],
  ["/services", "hero", "title", "One coordinated system for the patient path.", "text", "Page title", 0],
  ["/services", "hero", "body", "Search, paid media, web experience, reputation, reactivation, and content should work together around the needs and capacity of the practice.", "textarea", "Page introduction", 1],
  ["/specialties", "hero", "title", "Healthcare growth shaped by specialty context.", "text", "Page title", 0],
  ["/specialties", "hero", "body", "Different care settings have different patient questions, referral paths, service areas, and capacity constraints. The plan should reflect them.", "textarea", "Page introduction", 1],
  ["/how-it-works", "hero", "title", "A measured path from context to improvement.", "text", "Page title", 0],
  ["/how-it-works", "hero", "body", "DocPropel starts with the practice and market, connects channels to useful patient actions, and reviews evidence before recommending what comes next.", "textarea", "Page introduction", 1],
  ["/results", "hero", "title", "Results should be specific, supported, and reviewable.", "text", "Page title", 0],
  ["/results", "hero", "body", "We do not publish unnamed clients, invented quotes, or isolated numbers without the context needed to understand them.", "textarea", "Page introduction", 1],
  ["/about", "hero", "title", "Healthcare growth with accountability at the center.", "text", "Page title", 0],
  ["/about", "hero", "body", "DocPropel exists to make marketing decisions clearer for healthcare practices while respecting patient trust and the realities of care delivery.", "textarea", "Page introduction", 1],
  ["/team", "hero", "title", "The roles behind a coordinated growth program.", "text", "Page title", 0],
  ["/team", "hero", "body", "Approved team biographies and credentials have not yet been supplied. This page describes the work required without inventing people or qualifications.", "textarea", "Page introduction", 1],
  ["/contact", "hero", "title", "A clearer path to your next patient opportunity.", "text", "Page title", 0],
  ["/contact", "hero", "body", "Let’s discuss the practice, the market, your capacity, and the patient path you want to improve.", "textarea", "Page introduction", 1],
  ["/contact", "contact-channels", "phone", "1-800-DOC-PROPEL", "text", "Display phone", 0],
  ["/contact", "contact-channels", "email", "hello@docpropel.com", "text", "Email", 1],
  ["/contact", "contact-channels", "hours", "Monday–Friday, 9am–6pm ET", "text", "Hours", 2],
  ["/privacy", "hero", "title", "Privacy Notice", "text", "Page title", 0],
  ["/terms", "hero", "title", "Website Terms", "text", "Page title", 0],
].map(([route, section, key, value, contentType, label, sortOrder]) => ({ route, section, key, value, contentType, label, sortOrder })) as ContentSeed[];

const seo = (route: PublicRoute, title: string, description: string, noindex = false): SeoSeed => ({
  route,
  title,
  description,
  canonicalPath: route,
  noindex,
  ogTitle: title,
  ogDescription: description,
  ogImage: "/og-image-1200x630.png",
  twitterImage: "/twitter-card-1200x630.png",
  schemaJson: "",
});

export const DEFAULT_SEO: SeoSeed[] = [
  seo("/", "DocPropel | Accountable Healthcare Growth", "DocPropel builds accountable healthcare growth systems around local patient demand, practice capacity, and measurable patient actions."),
  seo("/services", "Healthcare Growth Services | DocPropel", "Explore a coordinated approach to healthcare SEO, paid search, web conversion, reputation, reactivation, content, and market review."),
  seo("/specialties", "Healthcare Specialties | DocPropel", "Growth planning for physician, dental, pharmacy, PT/OT, ABA and pediatric, and urgent care practices."),
  seo("/how-it-works", "How DocPropel Works | Performance-Based Boundaries", "Understand DocPropel’s five-step workflow and what performance-based healthcare marketing means—and does not mean."),
  seo("/results", "Evidence and Results Review | DocPropel", "Learn how context, baselines, timeframes, service mix, and approval are reviewed before case evidence is published."),
  seo("/about", "About DocPropel | Accountable Healthcare Marketing", "Read DocPropel’s mission, accountability principles, and approach to responsible healthcare marketing and patient trust."),
  seo("/team", "Team Roles | DocPropel", "See the disciplines involved in DocPropel programs. Approved biographies will be published only when supplied and verified."),
  seo("/contact", "Request a Practice Growth Brief | DocPropel", "Tell DocPropel about your practice, market, capacity, and growth challenge, or contact the team by phone or email."),
  seo("/privacy", "Privacy Notice | DocPropel", "Draft privacy notice for legal review describing website form data, purposes, retention, providers, cookies, security, and contact options.", true),
  seo("/terms", "Website Terms | DocPropel", "Draft website terms for legal review covering permitted use, informational boundaries, third parties, and contact details.", true),
];

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DocPropel",
  url: "https://docpropel.com/",
  logo: "https://docpropel.com/docpropel-logo-dark.svg",
  email: "hello@docpropel.com",
  telephone: "+1-800-362-7767",
};

export const WEBSITE_SCHEMA = { "@context": "https://schema.org", "@type": "WebSite", name: "DocPropel", url: "https://docpropel.com/" };
export const LEAD_STATUSES = ["new", "contacted", "qualified", "closed"] as const;
export const SPECIALTIES = ["Doctors / Physicians", "Dental Practice", "Independent Pharmacy", "PT / OT Clinic", "ABA & Pediatric Clinic", "Urgent Care", "Other Specialty"] as const;
export const ALLOWED_SCHEMA_TYPES = ["WebPage", "AboutPage", "ContactPage", "CollectionPage", "Organization", "WebSite", "BreadcrumbList", "ItemList"] as const;

export function isPublicRoute(value: string): value is PublicRoute {
  return (PUBLIC_ROUTES as readonly string[]).includes(value);
}

export function validateSchemaJson(value: string): { valid: true; parsed: unknown } | { valid: false; message: string } {
  if (!value.trim()) return { valid: true, parsed: null };
  try {
    const parsed = JSON.parse(value) as unknown;
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    if (!nodes.length || nodes.some(node => !node || typeof node !== "object" || Array.isArray(node))) {
      return { valid: false, message: "Schema JSON must be an object or a non-empty array of objects." };
    }
    for (const node of nodes as Record<string, unknown>[]) {
      if (node["@context"] !== "https://schema.org") return { valid: false, message: "Each schema object must use @context https://schema.org." };
      const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
      if (!types.length || types.some(type => !ALLOWED_SCHEMA_TYPES.includes(type as (typeof ALLOWED_SCHEMA_TYPES)[number]))) {
        return { valid: false, message: `Allowed schema types: ${ALLOWED_SCHEMA_TYPES.join(", ")}.` };
      }
    }
    return { valid: true, parsed };
  } catch {
    return { valid: false, message: "Schema JSON is malformed." };
  }
}
