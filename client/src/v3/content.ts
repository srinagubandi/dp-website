export const audiences = [
  {
    title: "Doctors & physicians",
    short: "Primary care, internal medicine, specialists, and urgent care",
    items: ["Primary Care", "Internal Medicine", "Specialists", "Urgent Care"],
    benefits: [
      "Increase new patient appointments by 25–40%",
      "Reduce no-show rates with automated reminders",
      "Build referral networks with local specialists",
      "HIPAA-compliant marketing across all channels",
    ],
  },
  {
    title: "Dental practices",
    short: "General dentistry, cosmetic, orthodontics, and oral surgery",
    items: ["General Dentistry", "Cosmetic", "Orthodontics", "Oral Surgery"],
    benefits: [
      "Fill hygiene schedules with recurring patients",
      "Attract high-value cosmetic cases",
      "Dominate local search for dental keywords",
      "Convert website visitors into booked appointments",
    ],
  },
  {
    title: "Independent pharmacies",
    short: "Community, compounding, specialty, and retail pharmacy",
    items: ["Independent", "Compounding", "Specialty", "Retail"],
    benefits: [
      "Drive prescription transfers from competitors",
      "Promote specialty services, including compounding and immunizations",
      "Build community presence and loyalty",
      "Compete effectively against big chains",
    ],
  },
  {
    title: "Physical therapy / OT",
    short:
      "Physical therapy, occupational therapy, sports rehab, and pediatrics",
    items: [
      "Physical Therapy",
      "Occupational Therapy",
      "Sports Rehab",
      "Pediatric",
    ],
    benefits: [
      "Capture direct-access patients online",
      "Build physician referral relationships",
      "Reduce patient drop-off rates",
      "Expand to multiple locations with proven playbooks",
    ],
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Healthcare SEO",
    description:
      "Help the practice appear where patients are actively searching for care in the local market, with emphasis on high-intent searches that can lead to appointments—not traffic alone.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "02",
    title: "Paid Search & PPC",
    description:
      "Create immediate demand and convert intent into appointment opportunities while managing ad spend around measurable performance and reducing waste.",
    specialties: "Doctors · Dentists · PT / OT",
  },
  {
    number: "03",
    title: "AI-Powered Website",
    description:
      "Build a fast, credible practice website for trust, clarity, compliance, and conversion, with a 24/7 path for visitors to take the next step.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "04",
    title: "Reputation Management",
    description:
      "Systematically strengthen the social proof patients look for and make the practice's online reputation easier to find and understand.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "05",
    title: "Patient Reactivation",
    description:
      "Identify and re-engage dormant patients through timely, relevant outreach designed to help fill available capacity.",
    specialties: "Doctors · Dentists · PT / OT",
  },
  {
    number: "06",
    title: "Social Media & Content",
    description:
      "Reinforce credibility and authority, communicate the practice's real advantages, and stay top of mind in the local community.",
    specialties: "Doctors · Dentists · Pharmacies · PT / OT",
  },
  {
    number: "07",
    title: "Digital Growth Brief",
    description:
      "Begin with an insight-led review of the current digital ecosystem, local market, patient path, and practical growth opportunities.",
    specialties: "All specialties",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Deploy & optimize",
    description:
      "We deploy and continuously optimize the right mix of channels based on your specialty and geography—never a cookie-cutter plan.",
    note: "Understand the practice, community, current presence, and local constraints before choosing a tactic.",
  },
  {
    number: "02",
    title: "Deliver patients",
    description:
      "We focus on qualified patient inquiries and booked appointments, with reporting built around outcomes rather than surface-level activity.",
    note: "Connect local demand to a credible, useful patient action across the channels that fit the market.",
  },
  {
    number: "03",
    title: "Pay for performance",
    description:
      "You pay when patients are delivered—not for activity, vanity metrics, or a long-term lock-in.",
    note: "Review what is moving, improve the plan, and keep the relationship accountable to patient opportunity.",
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

export const advantageNotes = [
  {
    title: "Zero wasted ad spend",
    description:
      "Predictive optimization is used to focus budget on people actively seeking care and reduce spend on clicks that do not convert.",
  },
  {
    title: "24/7 patient capture",
    description:
      "Healthcare-oriented systems give website visitors a next step outside office hours without adding work to the front desk.",
  },
  {
    title: "Automated reactivation",
    description:
      "Timely campaigns can identify and re-engage dormant patients when a practice has room in its schedule.",
  },
  {
    title: "No more black box",
    description:
      "The practice can see spend, leads, and strategy decisions, with a shared view of what is happening and why.",
  },
  {
    title: "No more generic ads",
    description:
      "Creative work is built around the practice voice, team, market, and competitive advantages—not a logo dropped into a template.",
  },
  {
    title: "Aligned incentives",
    description:
      "The performance model shares risk and aligns the work around patient growth, rather than collecting a retainer regardless of results.",
  },
] as const;

export const caseStudies = [
  {
    specialty: "Dentists",
    title: "Scaling a Multi-Location Dental Group",
    metric: "+145%",
    metricLabel: "New Patient Volume",
    description:
      "How we helped a 3-location dental group dominate local search and fill their hygiene schedules with high-value patients.",
    tags: ["SEO", "PPC", "Reputation"],
    stats: [
      ["Cost Per Lead", "-40%"],
      ["ROI", "8.5x"],
    ],
  },
  {
    specialty: "Doctors",
    title: "Primary Care Practice Growth",
    metric: "+87%",
    metricLabel: "Monthly New Patients",
    description:
      "A family medicine practice struggling with patient acquisition transformed its digital presence and filled its panel in 6 months.",
    tags: ["Local SEO", "Google Ads", "Website"],
    stats: [
      ["Revenue Growth", "+$420K"],
      ["Lead Quality", "High"],
    ],
  },
  {
    specialty: "Pharmacies",
    title: "Independent Pharmacy Turnaround",
    metric: "+210%",
    metricLabel: "Prescription Transfers",
    description:
      "Competing against big chains seemed impossible until hyper-local targeting and community engagement campaigns were implemented.",
    tags: ["Social Media", "Local SEO", "Reputation"],
    stats: [
      ["New Customers / Mo", "+95"],
      ["Retention Rate", "92%"],
    ],
  },
  {
    specialty: "PT / OT",
    title: "Physical Therapy Clinic Expansion",
    metric: "+165%",
    metricLabel: "Patient Referrals",
    description:
      "A single-location PT clinic grew to 3 locations by building physician referral networks and capturing direct-access patients online.",
    tags: ["Content Marketing", "PPC", "Referral Program"],
    stats: [
      ["Admin Time Saved", "20 hrs / wk"],
      ["Patient Satisfaction", "4.9 / 5"],
    ],
  },
  {
    specialty: "Dentists",
    title: "Cosmetic Dentistry Revenue Boost",
    metric: "+$1.8M",
    metricLabel: "Annual Revenue",
    description:
      "A shift from general dentistry to high-value cosmetic procedures through targeted campaigns and patient education content.",
    tags: ["Video Marketing", "PPC", "Website Design"],
    stats: [
      ["Avg. Case Value", "+65%"],
      ["Consult Rate", "78%"],
    ],
  },
  {
    specialty: "Doctors",
    title: "Urgent Care Volume Surge",
    metric: "+210%",
    metricLabel: "Online Bookings",
    description:
      "AI-driven intake and real-time wait times helped capture patient demand during peak flu season and beyond.",
    tags: ["AI Chatbot", "Local SEO", "Web Design"],
    stats: [
      ["Wait Time Reduction", "-35%"],
      ["Patient Satisfaction", "4.8 / 5"],
    ],
  },
] as const;

export const aggregateStats = [
  ["500+", "Practices served"],
  ["$50M+", "Revenue generated"],
  ["32%", "Average growth rate"],
  ["4.9 / 5", "Client satisfaction"],
] as const;

export const principles = [
  [
    "Results first",
    "Every strategy should be evaluated against patient opportunity, not vanity activity.",
  ],
  [
    "Full transparency",
    "The practice should understand the spend, leads, decisions, and direction of travel.",
  ],
  [
    "Healthcare-first",
    "The work needs to respect the realities and responsibilities of healthcare practices.",
  ],
  [
    "True partnership",
    "The relationship works when incentives and expectations remain aligned.",
  ],
  [
    "AI-powered",
    "Technology should improve responsiveness and focus—not replace practice judgment.",
  ],
] as const;
