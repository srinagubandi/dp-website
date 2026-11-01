export const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/specialties",
  "/how-it-works",
  "/results",
  "/about",
  "/team",
  "/team/rakesh-mittapelly",
  "/team/mike-tomasiello",
  "/team/sri-nagubandi",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
export type ContentType = "text" | "textarea" | "url";
export type SectionSeed = {
  route: PublicRoute;
  slug: string;
  title: string;
  enabled: boolean;
  sortOrder: number;
};
export type ContentSeed = {
  route: PublicRoute;
  section: string;
  key: string;
  value: string;
  contentType: ContentType;
  label: string;
  sortOrder: number;
};
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
  "/": [
    "hero",
    "pathway",
    "no-pressure-process",
    "specialties",
    "proof",
    "growth-brief",
    "final-cta",
  ],
  "/services": ["hero", "services", "growth-brief"],
  "/specialties": ["hero", "specialties", "growth-brief"],
  "/how-it-works": ["hero", "workflow", "performance-boundary", "growth-brief"],
  "/results": ["hero", "evidence", "review-standard", "growth-brief"],
  "/about": ["hero", "mission", "principles", "patient-trust", "growth-brief"],
  "/team": ["hero", "profiles", "roles", "growth-brief"],
  "/team/rakesh-mittapelly": ["hero", "profile", "growth-brief"],
  "/team/mike-tomasiello": ["hero", "profile", "growth-brief"],
  "/team/sri-nagubandi": ["hero", "profile", "growth-brief"],
  "/faq": ["hero", "questions", "growth-brief"],
  "/contact": ["hero", "contact-channels", "what-happens-next", "growth-brief"],
  "/privacy": ["hero", "legal-template"],
  "/terms": ["hero", "legal-template"],
  "/accessibility": ["hero", "legal-template"],
};

export const DEFAULT_SECTIONS: SectionSeed[] = PUBLIC_ROUTES.flatMap(route =>
  sectionMap[route].map((slug, sortOrder) => ({
    route,
    slug,
    title: slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    enabled: true,
    sortOrder,
  }))
);

export const DEFAULT_CONTENT: ContentSeed[] = [
  [
    "/",
    "hero",
    "eyebrow",
    "Performance-based healthcare growth",
    "text",
    "Hero eyebrow",
    0,
  ],
  [
    "/",
    "hero",
    "title",
    "Stop paying for promises. Pay for patients.",
    "text",
    "Hero title",
    1,
  ],
  [
    "/",
    "hero",
    "body",
    "DocPropel helps doctors, dentists, pharmacies, PT/OT, ABA, and pediatric clinics turn local demand into patient opportunities—with a model built for accountability.",
    "textarea",
    "Hero body",
    2,
  ],
  [
    "/",
    "pathway",
    "title",
    "A performance-based model built around your patients.",
    "text",
    "Pathway title",
    0,
  ],
  [
    "/",
    "no-pressure-process",
    "title",
    "A simple, no-pressure process.",
    "text",
    "Process title",
    0,
  ],
  [
    "/",
    "no-pressure-process",
    "body",
    "Tell us what is working, what is not, and what the practice can handle. You do not need to commit before you have a clear view of the options.",
    "textarea",
    "Process introduction",
    1,
  ],
  [
    "/",
    "no-pressure-process",
    "step-1-title",
    "Tell us about your practice",
    "text",
    "Step 1 title",
    2,
  ],
  [
    "/",
    "no-pressure-process",
    "step-1-body",
    "Tell us your priorities, constraints, capacity, and current growth challenge.",
    "textarea",
    "Step 1 description",
    3,
  ],
  [
    "/",
    "no-pressure-process",
    "step-2-title",
    "Review the opportunity",
    "text",
    "Step 2 title",
    4,
  ],
  [
    "/",
    "no-pressure-process",
    "step-2-body",
    "We look at your market and patient path, then bring back practical questions and options.",
    "textarea",
    "Step 2 description",
    5,
  ],
  [
    "/",
    "no-pressure-process",
    "step-3-title",
    "Choose the next step",
    "text",
    "Step 3 title",
    6,
  ],
  [
    "/",
    "no-pressure-process",
    "step-3-body",
    "You decide whether any next step fits your practice.",
    "textarea",
    "Step 3 description",
    7,
  ],
  [
    "/",
    "proof",
    "title",
    "Evidence belongs in context.",
    "text",
    "Proof title",
    0,
  ],
  [
    "/",
    "proof",
    "body",
    "Before we publish a case study, we review the baseline, timeframe, specialty, service mix, measurement method, and approval together. Until that review is complete, this site does not publish performance figures or client claims.",
    "textarea",
    "Proof body",
    1,
  ],
  [
    "/",
    "growth-brief",
    "title",
    "Request a practical Growth Brief.",
    "text",
    "Growth Brief title",
    0,
  ],
  [
    "/",
    "growth-brief",
    "body",
    "Tell us about your specialty, market, capacity, and current growth challenge. We’ll review the context without a long sales process or pressure.",
    "textarea",
    "Growth Brief body",
    1,
  ],
  [
    "/services",
    "hero",
    "title",
    "Marketing services built around the patient path",
    "text",
    "Page title",
    0,
  ],
  [
    "/services",
    "hero",
    "body",
    "Search, paid media, website experience, reputation, patient reactivation, and content work together. Each is planned around what the practice needs and can handle.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/specialties",
    "hero",
    "title",
    "Marketing shaped by your specialty",
    "text",
    "Page title",
    0,
  ],
  [
    "/specialties",
    "hero",
    "body",
    "Each care setting has its own patient questions, referral paths, service areas, and capacity limits. The plan should account for them.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/how-it-works",
    "hero",
    "title",
    "A measured path from context to improvement.",
    "text",
    "Page title",
    0,
  ],
  [
    "/how-it-works",
    "hero",
    "body",
    "DocPropel starts by learning the practice and its market. We tie each channel to patient actions that matter, then review the evidence before recommending next steps.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/results",
    "hero",
    "title",
    "Results that are specific, supported, and reviewable",
    "text",
    "Page title",
    0,
  ],
  [
    "/results",
    "hero",
    "body",
    "We do not publish unnamed clients, invented quotes, or isolated numbers without the context needed to understand them.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/about",
    "hero",
    "title",
    "Healthcare marketing with accountability at the center",
    "text",
    "Page title",
    0,
  ],
  [
    "/about",
    "hero",
    "body",
    "DocPropel helps healthcare practices make clearer marketing decisions while respecting patient trust and the realities of delivering care.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/team",
    "hero",
    "title",
    "The disciplines behind a coordinated marketing program",
    "text",
    "Page title",
    0,
  ],
  [
    "/team",
    "hero",
    "body",
    "DocPropel brings together strategy, patient-path experience, local demand, and performance review, so the practice has one accountable view of its marketing.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/team",
    "profiles",
    "profile-1-name",
    "Rakesh Mittapelly",
    "text",
    "Profile 1 name",
    0,
  ],
  [
    "/team",
    "profiles",
    "profile-1-role",
    "Performance & growth marketing",
    "text",
    "Profile 1 role",
    1,
  ],
  [
    "/team",
    "profiles",
    "profile-1-bio",
    "Rakesh brings more than 13 years of performance marketing leadership across agency, platform, and brand environments. His work connects acquisition strategy, media efficiency, and measurable revenue outcomes across healthcare and other growth-focused categories.",
    "textarea",
    "Profile 1 bio",
    2,
  ],
  [
    "/team",
    "profiles",
    "profile-1-image",
    "/images/team-rakesh-mittapelly.webp",
    "url",
    "Profile 1 image URL",
    3,
  ],
  [
    "/team",
    "profiles",
    "profile-2-name",
    "Mike Tomasiello",
    "text",
    "Profile 2 name",
    4,
  ],
  [
    "/team",
    "profiles",
    "profile-2-role",
    "Founder, Propel Dental",
    "text",
    "Profile 2 role",
    5,
  ],
  [
    "/team",
    "profiles",
    "profile-2-bio",
    "Mike has spent more than a decade in marketing, including five years dedicated to dental practices. He helps teams pair patient trust, stronger internal workflows, and practical measurement to build sustainable growth.",
    "textarea",
    "Profile 2 bio",
    6,
  ],
  [
    "/team",
    "profiles",
    "profile-2-image",
    "/images/team-mike-tomasiello.webp",
    "url",
    "Profile 2 image URL",
    7,
  ],
  [
    "/team",
    "profiles",
    "profile-3-name",
    "Sri Nagubandi",
    "text",
    "Profile 3 name",
    8,
  ],
  [
    "/team",
    "profiles",
    "profile-3-role",
    "Strategy & client partnership",
    "text",
    "Profile 3 role",
    9,
  ],
  [
    "/team",
    "profiles",
    "profile-3-bio",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada, arcu quis consequat dignissim, nibh libero posuere sem, vitae posuere enim lectus vel eros.",
    "textarea",
    "Profile 3 bio",
    10,
  ],
  [
    "/team",
    "profiles",
    "profile-3-image",
    "/images/team-sri-nagubandi.webp",
    "url",
    "Profile 3 image URL",
    11,
  ],
  [
    "/team/rakesh-mittapelly",
    "hero",
    "title",
    "Rakesh Mittapelly",
    "text",
    "Page title",
    0,
  ],
  [
    "/team/rakesh-mittapelly",
    "hero",
    "body",
    "Performance & Growth Marketing Leader | Digital Acquisition | Revenue Growth",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "role",
    "Performance & growth marketing",
    "text",
    "Role",
    2,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "image",
    "/images/team-rakesh-mittapelly.webp",
    "url",
    "Portrait image URL",
    3,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "bio-1",
    "I help businesses turn digital marketing investments into measurable revenue growth. With more than 13 years of experience across agency, platform, and brand environments, I specialize in performance strategy, customer acquisition, marketing efficiency, and scalable growth.",
    "textarea",
    "Bio paragraph 1",
    4,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "bio-2",
    "My experience includes leading organizations such as TikTok, GroupM, iProspect, Performics, and Pinstorm, with experience managing media investments of approximately US$20–25 million.",
    "textarea",
    "Bio paragraph 2",
    5,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "bio-3",
    "I have driven performance and growth initiatives across the USA, UK, Australia, GCC markets, and India, delivering measurable improvements in customer acquisition costs, lead quality, sales performance, and marketing ROI.",
    "textarea",
    "Bio paragraph 3",
    6,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "bio-4",
    "My work has included BFSI and fintech, real estate, e-commerce and D2C, EdTech, FMCG, technology and SaaS, automotive, healthcare, and travel.",
    "textarea",
    "Bio paragraph 4",
    7,
  ],
  [
    "/team/rakesh-mittapelly",
    "profile",
    "bio-5",
    "I combine commercial strategy, data-driven insight, and hands-on performance expertise to build high-impact marketing strategies that improve efficiency, accelerate growth, and deliver measurable business outcomes.",
    "textarea",
    "Bio paragraph 5",
    8,
  ],
  [
    "/team/mike-tomasiello",
    "hero",
    "title",
    "Mike Tomasiello",
    "text",
    "Page title",
    0,
  ],
  [
    "/team/mike-tomasiello",
    "hero",
    "body",
    "Founder, Propel Dental",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/team/mike-tomasiello",
    "profile",
    "role",
    "Founder, Propel Dental",
    "text",
    "Role",
    2,
  ],
  [
    "/team/mike-tomasiello",
    "profile",
    "image",
    "/images/team-mike-tomasiello.webp",
    "url",
    "Portrait image URL",
    3,
  ],
  [
    "/team/mike-tomasiello",
    "profile",
    "bio-1",
    "I founded Propel Dental with one mission: to help dental practices grow through smarter, more strategic marketing.",
    "textarea",
    "Bio paragraph 1",
    4,
  ],
  [
    "/team/mike-tomasiello",
    "profile",
    "bio-2",
    "With more than 10 years of marketing experience and five years dedicated exclusively to the dental industry, I have worked alongside more than 200 practices across the country to develop marketing systems that attract high-quality patients, strengthen brands, and drive sustainable growth.",
    "textarea",
    "Bio paragraph 2",
    5,
  ],
  [
    "/team/mike-tomasiello",
    "profile",
    "bio-3",
    "I believe successful marketing goes beyond generating leads. It requires understanding patient psychology, building trust, developing efficient internal workflows for lead management and sales, and creating strategies that produce real, measurable results.",
    "textarea",
    "Bio paragraph 3",
    6,
  ],
  [
    "/team/mike-tomasiello",
    "profile",
    "bio-4",
    "My goal is to become an extension of every practice I work with, providing the expertise, innovation, and partnership needed to help them reach the next level.",
    "textarea",
    "Bio paragraph 4",
    7,
  ],
  [
    "/team/sri-nagubandi",
    "hero",
    "title",
    "Sri Nagubandi",
    "text",
    "Page title",
    0,
  ],
  [
    "/team/sri-nagubandi",
    "hero",
    "body",
    "Strategy & client partnership",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/team/sri-nagubandi",
    "profile",
    "role",
    "Strategy & client partnership",
    "text",
    "Role",
    2,
  ],
  [
    "/team/sri-nagubandi",
    "profile",
    "image",
    "/images/team-sri-nagubandi.webp",
    "url",
    "Portrait image URL",
    3,
  ],
  [
    "/team/sri-nagubandi",
    "profile",
    "bio-1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada, arcu quis consequat dignissim, nibh libero posuere sem, vitae posuere enim lectus vel eros.",
    "textarea",
    "Bio paragraph 1",
    4,
  ],
  [
    "/team/sri-nagubandi",
    "profile",
    "bio-2",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "textarea",
    "Bio paragraph 2",
    5,
  ],
  [
    "/team/sri-nagubandi",
    "profile",
    "bio-3",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "textarea",
    "Bio paragraph 3",
    6,
  ],
  [
    "/faq",
    "hero",
    "title",
    "Practical answers before the first conversation",
    "text",
    "Page title",
    0,
  ],
  [
    "/faq",
    "hero",
    "body",
    "A short guide to how DocPropel works, where its limits are, and what a useful first step looks like for a healthcare practice.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/contact",
    "hero",
    "title",
    "A clearer path to your next patient opportunity.",
    "text",
    "Page title",
    0,
  ],
  [
    "/contact",
    "hero",
    "body",
    "Let’s talk about your practice, your market, your capacity, and the patient path you want to improve.",
    "textarea",
    "Page introduction",
    1,
  ],
  [
    "/contact",
    "contact-channels",
    "phone",
    "202 841 2941",
    "text",
    "Display phone",
    0,
  ],
  [
    "/contact",
    "contact-channels",
    "email",
    "steve@docpropel.com",
    "text",
    "Email",
    1,
  ],
  [
    "/contact",
    "contact-channels",
    "hours",
    "Monday–Friday, 9am–6pm ET",
    "text",
    "Hours",
    2,
  ],
  [
    "/contact",
    "what-happens-next",
    "title",
    "A simple, no-pressure process.",
    "text",
    "Process title",
    0,
  ],
  [
    "/contact",
    "what-happens-next",
    "body",
    "Tell us what is working, what is not, and what the practice can handle. You do not need to commit before you have a clear view of the options.",
    "textarea",
    "Process introduction",
    1,
  ],
  [
    "/contact",
    "what-happens-next",
    "step-1-title",
    "Tell us about your practice",
    "text",
    "Step 1 title",
    2,
  ],
  [
    "/contact",
    "what-happens-next",
    "step-1-body",
    "Tell us your priorities, constraints, capacity, and current growth challenge.",
    "textarea",
    "Step 1 description",
    3,
  ],
  [
    "/contact",
    "what-happens-next",
    "step-2-title",
    "Review the opportunity",
    "text",
    "Step 2 title",
    4,
  ],
  [
    "/contact",
    "what-happens-next",
    "step-2-body",
    "We look at your market and patient path, then bring back practical questions and options.",
    "textarea",
    "Step 2 description",
    5,
  ],
  [
    "/contact",
    "what-happens-next",
    "step-3-title",
    "Choose the next step",
    "text",
    "Step 3 title",
    6,
  ],
  [
    "/contact",
    "what-happens-next",
    "step-3-body",
    "You decide whether any next step fits your practice.",
    "textarea",
    "Step 3 description",
    7,
  ],
  ["/privacy", "hero", "title", "Privacy Notice", "text", "Page title", 0],
  [
    "/terms",
    "hero",
    "title",
    "Website Terms & Conditions",
    "text",
    "Page title",
    0,
  ],
  [
    "/accessibility",
    "hero",
    "title",
    "Accessibility Statement",
    "text",
    "Page title",
    0,
  ],
].map(([route, section, key, value, contentType, label, sortOrder]) => ({
  route,
  section,
  key,
  value,
  contentType,
  label,
  sortOrder,
})) as ContentSeed[];

const seo = (
  route: PublicRoute,
  title: string,
  description: string,
  noindex = false
): SeoSeed => ({
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
  seo(
    "/",
    "DocPropel | Accountable Healthcare Growth",
    "DocPropel builds accountable healthcare growth systems around local patient demand, practice capacity, and measurable patient actions."
  ),
  seo(
    "/services",
    "Healthcare Growth Services | DocPropel",
    "Explore a coordinated approach to healthcare SEO, paid search, web conversion, reputation, reactivation, content, and market review."
  ),
  seo(
    "/specialties",
    "Healthcare Specialties | DocPropel",
    "Growth planning for doctors and physicians, dental practices, independent pharmacies, PT/OT clinics, and ABA and pediatric clinics."
  ),
  seo(
    "/how-it-works",
    "How DocPropel Works | Performance-Based Boundaries",
    "Understand DocPropel’s five-step workflow and what performance-based healthcare marketing means—and does not mean."
  ),
  seo(
    "/results",
    "Evidence and Results Review | DocPropel",
    "Learn how context, baselines, timeframes, service mix, and approval are reviewed before case evidence is published."
  ),
  seo(
    "/about",
    "About DocPropel | Accountable Healthcare Marketing",
    "Read DocPropel’s mission, accountability principles, and approach to responsible healthcare marketing and patient trust."
  ),
  seo(
    "/team",
    "Team Roles | DocPropel",
    "See the disciplines involved in DocPropel programs. Approved biographies will be published only when supplied and verified."
  ),
  seo(
    "/team/rakesh-mittapelly",
    "Rakesh Mittapelly | DocPropel",
    "Learn about Rakesh Mittapelly’s performance marketing, digital acquisition, and revenue growth experience at DocPropel."
  ),
  seo(
    "/team/mike-tomasiello",
    "Mike Tomasiello | DocPropel",
    "Learn about Mike Tomasiello, Founder of Propel Dental, and his approach to sustainable dental-practice growth."
  ),
  seo(
    "/team/sri-nagubandi",
    "Sri Nagubandi | DocPropel",
    "Meet Sri Nagubandi, a DocPropel strategy and client partnership team member."
  ),
  seo(
    "/faq",
    "Healthcare Growth FAQ | DocPropel",
    "Answers to common questions about DocPropel’s performance-based healthcare growth model, its boundaries, and the Growth Brief process."
  ),
  seo(
    "/contact",
    "Request a Practice Growth Brief | DocPropel",
    "Tell DocPropel about your practice, market, capacity, and growth challenge, or contact the team by phone or email."
  ),
  seo(
    "/privacy",
    "Privacy Notice | DocPropel",
    "Draft privacy notice for legal review describing website form data, purposes, retention, providers, cookies, security, and contact options.",
    true
  ),
  seo(
    "/terms",
    "Website Terms | DocPropel",
    "Draft website terms for legal review covering permitted use, informational boundaries, third parties, and contact details.",
    true
  ),
  seo(
    "/accessibility",
    "Accessibility Statement | DocPropel",
    "Learn about DocPropel’s public-website accessibility effort, WCAG 2.2 AA engineering target, and accessibility feedback process."
  ),
];

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DocPropel",
  url: "https://docpropel.com/",
  logo: "https://docpropel.com/docpropel-logo-dark.svg",
  email: "steve@docpropel.com",
  telephone: "+1-202-841-2941",
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DocPropel",
  url: "https://docpropel.com/",
};
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
] as const;
export const SPECIALTIES = [
  "Doctors & physicians",
  "Dental practices",
  "Independent pharmacies",
  "PT / OT clinics",
  "ABA & pediatric clinics",
] as const;
export const ALLOWED_SCHEMA_TYPES = [
  "WebPage",
  "AboutPage",
  "ContactPage",
  "CollectionPage",
  "Organization",
  "WebSite",
  "BreadcrumbList",
  "ItemList",
] as const;

export function isPublicRoute(value: string): value is PublicRoute {
  return (PUBLIC_ROUTES as readonly string[]).includes(value);
}

export function validateSchemaJson(
  value: string
): { valid: true; parsed: unknown } | { valid: false; message: string } {
  if (!value.trim()) return { valid: true, parsed: null };
  try {
    const parsed = JSON.parse(value) as unknown;
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    if (
      !nodes.length ||
      nodes.some(
        node => !node || typeof node !== "object" || Array.isArray(node)
      )
    ) {
      return {
        valid: false,
        message:
          "Schema JSON must be an object or a non-empty array of objects.",
      };
    }
    for (const node of nodes as Record<string, unknown>[]) {
      if (node["@context"] !== "https://schema.org")
        return {
          valid: false,
          message: "Each schema object must use @context https://schema.org.",
        };
      const types = Array.isArray(node["@type"])
        ? node["@type"]
        : [node["@type"]];
      if (
        !types.length ||
        types.some(
          type =>
            !ALLOWED_SCHEMA_TYPES.includes(
              type as (typeof ALLOWED_SCHEMA_TYPES)[number]
            )
        )
      ) {
        return {
          valid: false,
          message: `Allowed schema types: ${ALLOWED_SCHEMA_TYPES.join(", ")}.`,
        };
      }
    }
    return { valid: true, parsed };
  } catch {
    return { valid: false, message: "Schema JSON is malformed." };
  }
}
