import { Check } from "lucide-react";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";
import { principles } from "../content";

const commitments = [
  [
    "Transparency is non-negotiable",
    "You should be able to see spend, leads, and the decisions being made. The work operates in daylight.",
  ],
  [
    "Healthcare-first approach",
    "Specialty-specific strategy must respect compliance and how doctors, dentists, pharmacies, and PT/OT clinics actually operate.",
  ],
  [
    "Performance-based model",
    "The relationship is organized around qualified patient inquiries rather than a fixed retainer and misaligned incentives.",
  ],
  [
    "AI-powered optimization",
    "Automation and real-time optimization should improve focus and responsiveness while practice judgment remains essential.",
  ],
] as const;

export default function V3About() {
  return (
    <V3Layout>
      <V3PageHero
        kicker="About DocPropel"
        title="Not an agency. A growth partner."
        lede="DocPropel was built from a familiar frustration: too many healthcare practices are sold packages, generic activity, and dashboards that do not explain what is really changing."
        image="/images/v2/local-demand-clean.webp"
        alt="A neighborhood healthcare practice in its local community"
        note="The practice identity, operating reality, and local market should shape the work—not disappear behind an agency template."
        actions={<V3BriefButton>Start a growth conversation</V3BriefButton>}
      />

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell v3-story-grid">
          <div className="v3-story-copy">
            <p className="v3-kicker">Why we exist</p>
            <h2>Great practices deserve a partner who understands the work.</h2>
            <p>
              DocPropel's founders saw a gap: great doctors, dentists,
              pharmacists, and therapists were struggling to grow because
              traditional marketing agencies were focused on selling
              retainers—not delivering patients.
            </p>
            <p>
              The same frustrations surfaced repeatedly: “I don't know where my
              money is going.” “The leads are garbage.” “They don't understand
              my practice.” “I feel like just another account number.”
            </p>
            <p>
              DocPropel was conceived as the opposite: a performance-based
              growth partner that works hand-in-hand with each client to
              strengthen the practice identity and communicate its competitive
              advantages.
            </p>
            <p>
              The approach respects how practices operate and avoids agency
              theatrics. No buzzwords. No lock-ins. Just accountable patient
              growth.
            </p>
          </div>
          <div className="v3-commitment-stack">
            {commitments.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-spread v3-spread--sage">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <p className="v3-kicker">What we stand for</p>
            <h2>Five principles behind every relationship.</h2>
            <p>
              These principles guide the strategy, operating decisions, and
              partnership—not just the sales conversation.
            </p>
          </div>
          <div className="v3-principle-list">
            {principles.map(([title, description], index) => (
              <article key={title}>
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>
                  <Check aria-hidden="true" size={15} /> {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-callout-band v3-callout-band--terracotta">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">Our mission</p>
            <h2>Help healthcare providers focus on care.</h2>
            <p>
              Empower healthcare providers to grow through transparent,
              performance-based marketing—so practice teams can focus on what
              they do best: caring for patients.
            </p>
          </div>
          <V3BriefButton variant="paper" />
        </div>
      </section>
    </V3Layout>
  );
}
