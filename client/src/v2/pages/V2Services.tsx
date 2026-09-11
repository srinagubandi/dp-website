import { ArrowRight, Check } from "lucide-react";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const services = [
  [
    "01",
    "Healthcare SEO",
    "We make it easier to appear where patients are actively looking for care in the local market.",
    "Doctors · Dentists · Pharmacies · PT / OT",
  ],
  [
    "02",
    "Paid Search & PPC",
    "A focused way to test demand and convert intent into appointment opportunities.",
    "Doctors · Dentists · PT / OT",
  ],
  [
    "03",
    "AI-Powered Website",
    "A practice website built for trust, clarity, compliance, and a credible next step.",
    "Doctors · Dentists · Pharmacies · PT / OT",
  ],
  [
    "04",
    "Reputation Management",
    "Help the evidence patients seek become easier to find and understand.",
    "Doctors · Dentists · Pharmacies · PT / OT",
  ],
  [
    "05",
    "Patient Reactivation",
    "Reconnect with people who already know the practice through timely, relevant outreach.",
    "Doctors · Dentists · PT / OT",
  ],
  [
    "06",
    "Digital Growth Brief",
    "An insight-led review of the current digital ecosystem and growth opportunity.",
    "All specialties",
  ],
];

const benefits: Array<[string, string[]]> = [
  [
    "Doctors & physicians",
    [
      "Build local search presence",
      "Support specialist referral visibility",
      "Make care access pathways clearer",
      "Apply a healthcare-first approach",
    ],
  ],
  [
    "Dental practices",
    [
      "Support recurring patient demand",
      "Make treatment pathways easier to understand",
      "Strengthen local discovery",
      "Turn site visits into useful next steps",
    ],
  ],
  [
    "Independent pharmacies",
    [
      "Increase community visibility",
      "Clarify specialty-service availability",
      "Support local loyalty",
      "Compete with confidence against chains",
    ],
  ],
  [
    "PT / OT clinics",
    [
      "Capture direct-access demand",
      "Support referral relationships",
      "Reduce patient-path drop-off",
      "Create repeatable location playbooks",
    ],
  ],
];

export default function V2Services() {
  return (
    <V2Layout>
      <V2PageHero
        eyebrow="Full-service growth"
        title="One growth system. Every patient path."
        lede="The original service set is retained in a single performance-based model, tailored for doctors, dentists, pharmacies, and PT/OT clinics."
        image="/images/v2/services-hero-clean.webp"
      />
      <section className="v2-section v2-section--cream">
        <div className="v2-shell">
          <div className="v2-eyebrow">The connected service route</div>
          <h2 className="v2-title v2-title--section">
            Each service has a place in the path.
          </h2>
          <p className="v2-lede">
            The work is designed to connect local demand, patient confidence,
            and a practical next action—not to create another disconnected
            vendor relationship.
          </p>
          <div className="v2-service-list">
            {services.map(([number, title, copy, specialty]) => (
              <article className="v2-service" key={title}>
                <div className="v2-service-number">{number}</div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div
                  className="v2-service-number"
                  style={{ marginTop: 20, color: "var(--v2-river)" }}
                >
                  {specialty}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-section v2-section--soft">
        <div className="v2-shell">
          <div className="v2-eyebrow">Tailored by care setting</div>
          <h2 className="v2-title v2-title--section">
            A system that begins with the practice context.
          </h2>
          <div className="v2-specialties">
            {benefits.map(([title, items], index) => (
              <article className="v2-specialty" key={title}>
                <div className="v2-specialty-index">0{index + 1}</div>
                <h3>{title}</h3>
                <ul
                  style={{
                    marginTop: 17,
                    display: "grid",
                    gap: 8,
                    padding: 0,
                    listStyle: "none",
                    color: "rgba(22,56,74,.7)",
                    fontSize: ".86rem",
                    lineHeight: 1.4,
                  }}
                >
                  {(items as string[]).map(item => (
                    <li key={item}>
                      <Check
                        size={13}
                        style={{
                          color: "var(--v2-orange-deep)",
                          display: "inline",
                          marginRight: 6,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation-clean.webp"
          alt="A calm practice space at sunset"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">Start with context</div>
          <h2 className="v2-title">Build your Digital Growth Brief.</h2>
          <p className="v2-lede v2-lede--light">
            We will start with the current practice, local market, and the
            patient path that needs attention.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
