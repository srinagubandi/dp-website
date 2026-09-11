export const v5Nav = [
  { href: "/v5/services", label: "Services" },
  { href: "/v5/how-it-works", label: "How it works" },
  { href: "/v5/compare", label: "Why performance" },
  { href: "/v5/results", label: "Results" },
  { href: "/v5/about", label: "About" },
  { href: "/v5/calculator", label: "Calculator" },
  { href: "/v5/contact", label: "Contact" },
] as const;

export const audiences = [
  {
    name: "Doctors & physicians",
    detail: "Primary care, specialists, and urgent care",
    benefits: [
      "Build local search presence",
      "Support specialist referral visibility",
      "Make care-access pathways clearer",
      "Apply a healthcare-first approach",
    ],
  },
  {
    name: "Dental practices",
    detail: "General, cosmetic, orthodontic, and oral surgery",
    benefits: [
      "Support recurring patient demand",
      "Make treatment pathways easier to understand",
      "Strengthen local discovery",
      "Turn site visits into useful next steps",
    ],
  },
  {
    name: "Independent pharmacies",
    detail: "Community access, compounding, and specialty services",
    benefits: [
      "Increase community visibility",
      "Clarify specialty-service availability",
      "Support local loyalty",
      "Compete with confidence against chains",
    ],
  },
  {
    name: "PT / OT clinics",
    detail: "Rehabilitation, direct access, and pediatric pathways",
    benefits: [
      "Capture direct-access demand",
      "Support referral relationships",
      "Reduce patient-path drop-off",
      "Create repeatable location playbooks",
    ],
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Healthcare SEO",
    summary: "Be present when local care intent is highest.",
    detail:
      "Make it easier to appear where patients are actively looking for care in the local market.",
    audience: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "02",
    title: "Paid Search & PPC",
    summary: "Test and refine acquisition channels with clear inputs.",
    detail:
      "A focused way to test demand and convert intent into appointment opportunities.",
    audience: "Doctors · Dentists · PT / OT",
  },
  {
    number: "03",
    title: "AI-Powered Website",
    summary: "Give patients a fast, credible path to take action.",
    detail:
      "A practice website designed for trust and clarity, with compliance requirements considered alongside a credible next step.",
    audience: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "04",
    title: "Reputation Management",
    summary: "Make the proof patients seek easier to find.",
    detail:
      "Help the evidence patients seek become easier to find and understand.",
    audience: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "05",
    title: "Patient Reactivation",
    summary: "Reconnect with people who already know your practice.",
    detail:
      "Support timely, relevant outreach to people with an existing practice relationship.",
    audience: "Doctors · Dentists · PT / OT",
  },
  {
    number: "06",
    title: "Digital Growth Brief",
    summary: "Start with an insight-led review of your market.",
    detail:
      "An insight-led review of the current digital ecosystem and growth opportunity.",
    audience: "All specialties",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    summary: "Practice context before tactics.",
    detail:
      "Begin with the practice, community, current presence, and local opportunities and constraints that influence growth.",
  },
  {
    number: "02",
    title: "Connect",
    summary: "Build the right patient pathway.",
    detail:
      "Deploy and optimize the appropriate channels so local demand has a clearer path to a useful patient action.",
  },
  {
    number: "03",
    title: "Improve",
    summary: "Review, refine, and stay accountable.",
    detail:
      "Review what is moving, refine the plan, and keep the work accountable to patient opportunity rather than surface-level activity.",
  },
] as const;

export const comparisonRows = [
  ["Pricing model", "Performance-based", "High fixed retainer"],
  ["Technology", "AI-driven optimization", "Manual reporting"],
  ["Financial risk", "Shared risk", "100% on you"],
  ["Contract terms", "Flexible, no lock-in", "12–24 month lock-in"],
  ["Reporting", "Outcome-focused view", "Confusing PDFs"],
  ["Incentives", "Aligned with growth", "Paid regardless"],
] as const;

export const caseStudies = [
  {
    specialty: "Dentists",
    title: "Scaling a Multi-Location Dental Group",
    metric: "+145%",
    metricLabel: "New Patient Volume",
    copy: "How DocPropel helped a three-location dental group strengthen local search and fill hygiene schedules with high-value patients.",
    tags: ["SEO", "PPC", "Reputation"],
  },
  {
    specialty: "Doctors",
    title: "Primary Care Practice Growth",
    metric: "+87%",
    metricLabel: "Monthly New Patients",
    copy: "A family medicine practice transformed its digital presence and filled its panel over a six-month engagement.",
    tags: ["Local SEO", "Google Ads", "Website"],
  },
  {
    specialty: "Pharmacies",
    title: "Independent Pharmacy Turnaround",
    metric: "+210%",
    metricLabel: "Prescription Transfers",
    copy: "Hyper-local targeting and community-engagement campaigns helped an independent pharmacy compete in a chain-dominated market.",
    tags: ["Social Media", "Local SEO", "Reputation"],
  },
  {
    specialty: "PT / OT",
    title: "Physical Therapy Clinic Expansion",
    metric: "+165%",
    metricLabel: "Patient Referrals",
    copy: "A single-location PT clinic grew to three locations by building referral relationships and capturing direct-access demand online.",
    tags: ["Content Marketing", "PPC", "Referral Program"],
  },
  {
    specialty: "Dentists",
    title: "Cosmetic Dentistry Revenue Boost",
    metric: "+$1.8M",
    metricLabel: "Annual Revenue",
    copy: "Targeted campaigns and patient-education content supported a shift toward higher-value cosmetic procedures.",
    tags: ["Video Marketing", "PPC", "Website Design"],
  },
  {
    specialty: "Doctors",
    title: "Urgent Care Volume Surge",
    metric: "+210%",
    metricLabel: "Online Bookings",
    copy: "Digital intake, local search, and timely access information helped capture demand during peak flu season and beyond.",
    tags: ["AI Chatbot", "Local SEO", "Web Design"],
  },
] as const;

export const publishedStats = [
  ["500+", "Practices served"],
  ["$50M+", "Revenue generated"],
  ["32%", "Average growth rate"],
  ["4.9 / 5", "Client satisfaction"],
] as const;

export const principles = [
  [
    "Results first",
    "Evaluate strategy against patient opportunity, not vanity activity.",
  ],
  [
    "Full transparency",
    "Understand the spend, leads, decisions, and direction of travel.",
  ],
  [
    "Healthcare-first",
    "Respect the realities and responsibilities of healthcare practices.",
  ],
  ["True partnership", "Keep incentives, decisions, and expectations aligned."],
  [
    "AI-powered",
    "Use technology to improve responsiveness and focus—not replace practice judgment.",
  ],
] as const;

export const contactItems = [
  {
    label: "Call",
    value: "1-800-DOC-PROPEL",
    href: "tel:1-800-362-7767",
    note: "Start a direct conversation about your practice.",
  },
  {
    label: "Email",
    value: "hello@docpropel.com",
    note: "Use the Growth Brief to share initial context without clinical details.",
  },
  {
    label: "Office hours",
    value: "Monday–Friday, 9am–6pm EST",
    note: "After-hours inquiries are answered the next business day.",
  },
] as const;
