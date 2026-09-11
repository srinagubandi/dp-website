import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const principles = [
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
];

export default function V2About() {
  return (
    <V2Layout>
      <V2PageHero
        eyebrow="About DocPropel"
        title="Not an agency. A growth partner."
        lede="DocPropel was built from a familiar frustration: many healthcare practices are sold retainers, generic activity, and dashboards that do not explain what is really changing."
        image="/images/v2/first-impression.webp"
      />
      <section className="v2-photo-story v2-section--cream">
        <div className="v2-photo-story-copy">
          <div className="v2-eyebrow">Why we exist</div>
          <h2 className="v2-photo-story-title">
            Great practices deserve growth partners who understand the work.
          </h2>
          <p className="v2-copy">
            Doctors, dentists, pharmacists, and therapists often face the same
            problem: generic marketing that does not reflect the practice, the
            local market, or the actual patient journey. DocPropel was conceived
            as the opposite—an accountable partner that works hand-in-hand with
            each client.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
        <div className="v2-photo-story-media">
          <img
            src="/images/v2/local-demand.webp"
            alt="A neighborhood practice context"
          />
        </div>
      </section>
      <section className="v2-section v2-section--soft">
        <div className="v2-shell">
          <div className="v2-eyebrow">What we stand for</div>
          <h2 className="v2-title v2-title--section">
            The principles behind the relationship.
          </h2>
          <div className="v2-service-list">
            {principles.map(([title, text], index) => (
              <article className="v2-service" key={title}>
                <div className="v2-service-number">0{index + 1}</div>
                <h3>{title}</h3>
                <p>
                  <Check
                    size={13}
                    style={{
                      display: "inline",
                      marginRight: 6,
                      color: "var(--v2-orange-deep)",
                    }}
                  />
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation.webp"
          alt="A calm setting for a growth conversation"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">Our mission</div>
          <h2 className="v2-title">Help healthcare providers focus on care.</h2>
          <p className="v2-lede v2-lede--light">
            The aim is transparent, performance-based growth that gives practice
            teams more clarity around their next patient opportunity.
          </p>
          <div className="v2-action-row">
            <Link href="/v2/contact" className="v2-button">
              Start a conversation <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
