export const audiences = [
  {
    id: "AUD-01",
    name: "Doctors & physicians",
    detail: "Primary care, internal medicine, specialists, and urgent care",
    priorities: [
      "Build local search presence",
      "Support specialist referral visibility",
      "Make care access pathways clearer",
      "Apply a healthcare-first approach",
    ],
  },
  {
    id: "AUD-02",
    name: "Dental practices",
    detail: "General, cosmetic, orthodontic, and oral surgery",
    priorities: [
      "Support recurring patient demand",
      "Make treatment pathways easier to understand",
      "Strengthen local discovery",
      "Turn site visits into useful next steps",
    ],
  },
  {
    id: "AUD-03",
    name: "Independent pharmacies",
    detail: "Community, compounding, specialty, and retail pharmacy",
    priorities: [
      "Increase community visibility",
      "Clarify specialty-service availability",
      "Support local loyalty",
      "Compete with confidence against chains",
    ],
  },
  {
    id: "AUD-04",
    name: "PT / OT clinics",
    detail:
      "Physical therapy, occupational therapy, sports rehab, and pediatrics",
    priorities: [
      "Capture direct-access demand",
      "Support referral relationships",
      "Reduce patient-path drop-off",
      "Create repeatable location playbooks",
    ],
  },
] as const;

export const services = [
  {
    id: "SRV-01",
    title: "Healthcare SEO",
    summary:
      "Make it easier to appear where patients are actively searching for care in the local market, with emphasis on high-intent discovery rather than traffic alone.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
    review: "Visibility, local demand, search intent",
  },
  {
    id: "SRV-02",
    title: "Paid search & PPC",
    summary:
      "Test demand and convert intent into appointment opportunities while making spend, channel decisions, and acquisition inputs visible.",
    specialties: "Doctors · Dentists · PT / OT",
    review: "Spend, inquiries, booked appointments",
  },
  {
    id: "SRV-03",
    title: "AI-powered website",
    summary:
      "Build a fast, credible patient path around trust, clarity, compliance, conversion, and a useful next action—not aesthetics alone.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
    review: "Path clarity, action rate, usability",
  },
  {
    id: "SRV-04",
    title: "Reputation management",
    summary:
      "Help the evidence patients seek become easier to find and understand while supporting the practice's local credibility.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
    review: "Visibility, response, patient proof",
  },
  {
    id: "SRV-05",
    title: "Patient reactivation",
    summary:
      "Reconnect with people who already know the practice through timely, relevant outreach and clearer routes back to care.",
    specialties: "Doctors · Dentists · PT / OT",
    review: "Audience, outreach, response",
  },
  {
    id: "SRV-06",
    title: "Social media & content",
    summary:
      "Reinforce credibility, authority, and local awareness with content shaped around the practice voice, team, and competitive advantages—not a generic template.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
    review: "Message, audience, response",
  },
  {
    id: "SRV-07",
    title: "Digital Growth Brief",
    summary:
      "Begin with an insight-led review of the current digital ecosystem, local market, and growth opportunity before selecting tactics.",
    specialties: "All supported specialties",
    review: "Context, opportunity, fit",
  },
] as const;

export const comparisonRows = [
  ["Pricing model", "Performance-based", "High fixed retainer"],
  ["Technology", "AI-driven optimization", "Manual reporting"],
  ["Financial risk", "Shared risk", "100% on you"],
  ["Contract terms", "Flexible, no lock-in", "12–24 month lock-in"],
  ["Reporting", "Real-time ROI", "Confusing PDFs"],
  ["Incentives", "Aligned with growth", "Paid regardless"],
] as const;

export const caseStudies = [
  {
    id: "CASE-01",
    specialty: "Dentists",
    title: "Scaling a Multi-Location Dental Group",
    metric: "+145%",
    metricLabel: "New Patient Volume",
    description:
      "How we helped a 3-location dental group dominate local search and fill their hygiene schedules with high-value patients.",
    tags: ["SEO", "PPC", "Reputation"],
    details: [
      ["Cost Per Lead", "-40%"],
      ["ROI", "8.5x"],
    ],
  },
  {
    id: "CASE-02",
    specialty: "Doctors",
    title: "Primary Care Practice Growth",
    metric: "+87%",
    metricLabel: "Monthly New Patients",
    description:
      "A family medicine practice struggling with patient acquisition transformed their digital presence and filled their panel in 6 months.",
    tags: ["Local SEO", "Google Ads", "Website"],
    details: [
      ["Revenue Growth", "+$420K"],
      ["Lead Quality", "High"],
    ],
  },
  {
    id: "CASE-03",
    specialty: "Pharmacies",
    title: "Independent Pharmacy Turnaround",
    metric: "+210%",
    metricLabel: "Prescription Transfers",
    description:
      "Competing against big chains seemed impossible until we implemented hyper-local targeting and community engagement campaigns.",
    tags: ["Social Media", "Local SEO", "Reputation"],
    details: [
      ["New Customers/Mo", "+95"],
      ["Retention Rate", "92%"],
    ],
  },
  {
    id: "CASE-04",
    specialty: "PT / OT",
    title: "Physical Therapy Clinic Expansion",
    metric: "+165%",
    metricLabel: "Patient Referrals",
    description:
      "A single-location PT clinic grew to 3 locations by building physician referral networks and capturing direct-access patients online.",
    tags: ["Content Marketing", "PPC", "Referral Program"],
    details: [
      ["Admin Time Saved", "20 hrs/wk"],
      ["Patient Satisfaction", "4.9/5"],
    ],
  },
  {
    id: "CASE-05",
    specialty: "Dentists",
    title: "Cosmetic Dentistry Revenue Boost",
    metric: "+$1.8M",
    metricLabel: "Annual Revenue",
    description:
      "Shifting focus from general dentistry to high-value cosmetic procedures through targeted campaigns and patient education content.",
    tags: ["Video Marketing", "PPC", "Website Design"],
    details: [
      ["Avg Case Value", "+65%"],
      ["Consult Rate", "78%"],
    ],
  },
  {
    id: "CASE-06",
    specialty: "Doctors",
    title: "Urgent Care Volume Surge",
    metric: "+210%",
    metricLabel: "Online Bookings",
    description:
      "Implementing AI-driven intake and real-time wait times to capture patient demand during peak flu season and beyond.",
    tags: ["AI Chatbot", "Local SEO", "Web Design"],
    details: [
      ["Wait Time Reduction", "-35%"],
      ["Patient Satisfaction", "4.8/5"],
    ],
  },
] as const;

export const aggregateResults = [
  ["500+", "Practices served"],
  ["$50M+", "Revenue generated"],
  ["32%", "Average growth rate"],
  ["4.9 / 5", "Client satisfaction"],
] as const;

export const processSteps = [
  {
    id: "PHASE-01",
    title: "Understand",
    operationalTitle: "Deploy & optimize",
    text: "Begin with the practice, community, current online presence, local market demand, and growth potential. Then deploy the channel mix appropriate to the specialty and geography.",
  },
  {
    id: "PHASE-02",
    title: "Connect",
    operationalTitle: "Deliver patients",
    text: "Create a clearer path from local demand to qualified patient inquiries and booked appointments, with outcome-focused reporting.",
  },
  {
    id: "PHASE-03",
    title: "Improve",
    operationalTitle: "Pay for performance",
    text: "Review what is moving, refine the plan, and align payment with delivered patients rather than activity, vanity metrics, or a long lock-in.",
  },
] as const;

export const principles = [
  [
    "Results first",
    "Evaluate strategy against patient opportunity, not vanity activity.",
  ],
  [
    "Full transparency",
    "See spend, leads, decisions, and direction of travel.",
  ],
  [
    "Healthcare-first",
    "Respect the realities and responsibilities of healthcare practices.",
  ],
  [
    "True partnership",
    "Keep incentives, expectations, and accountability aligned.",
  ],
  [
    "AI-powered",
    "Use technology to improve responsiveness and focus—not replace practice judgment.",
  ],
] as const;

export const contactDetails = {
  phone: "1-800-DOC-PROPEL",
  tel: "1-800-362-7767",
  email: "hello@docpropel.com",
  hours: "Monday – Friday, 9am – 6pm EST",
};

export const evidenceMeta = {
  owner: "DocPropel",
  review: "Existing site record",
  status: "Case-specific · not a forecast",
};

export const planningAssumptions = {
  doctors: { label: "Doctors / Physicians", growth: 0.25, avgValue: 500 },
  dentists: { label: "Dentists", growth: 0.35, avgValue: 1200 },
  pharmacy: { label: "Pharmacies", growth: 0.3, avgValue: 85 },
  pt_ot: { label: "PT / OT Clinics", growth: 0.28, avgValue: 1500 },
  urgent: { label: "Urgent Care", growth: 0.4, avgValue: 250 },
  specialty: { label: "Specialty Practice", growth: 0.22, avgValue: 2500 },
} as const;

export type PlanningSpecialty = keyof typeof planningAssumptions;

export const navLinks = [
  ["/v4/services", "Services"],
  ["/v4/how-it-works", "Model"],
  ["/v4/compare", "Compare"],
  ["/v4/results", "Evidence"],
  ["/v4/about", "About"],
  ["/v4/calculator", "Calculator"],
] as const;
