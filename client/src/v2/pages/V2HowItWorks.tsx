import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const steps = [
  [
    "01",
    "Understand",
    "Begin with the practice, the community, the current presence, and the local opportunities and constraints that influence growth.",
  ],
  [
    "02",
    "Connect",
    "Deploy and optimize the appropriate channels so local demand has a clearer path to a useful patient action.",
  ],
  [
    "03",
    "Improve",
    "Review what is moving, refine the plan, and keep the work accountable to patient opportunity rather than surface-level activity.",
  ],
];

export default function V2HowItWorks() {
  return (
    <V2Layout>
      <V2PageHero
        eyebrow="The operating model"
        title="Simple. Transparent. Aligned."
        lede="The original three-step process is retained as a calmer, more practical sequence: understand the context, connect the pathway, and improve the decisions that follow."
        image="/images/v2/how-it-works-hero-clean.webp"
      />
      <section className="v2-section v2-section--cream">
        <div className="v2-shell">
          <div className="v2-eyebrow">A simple path</div>
          <h2 className="v2-title v2-title--section">
            Patient growth has context before it has a tactic.
          </h2>
          <p className="v2-lede">
            A performance-based relationship works better when the practice and
            the growth partner share a useful operating view. The approach
            begins with discovery, then moves into execution and review.
          </p>
          <div className="v2-steps" style={{ color: "var(--v2-ink)" }}>
            {steps.map(([number, title, copy]) => (
              <article
                className="v2-step"
                style={{ borderTopColor: "rgba(22,56,74,.25)" }}
                key={title}
              >
                <div
                  className="v2-step-index"
                  style={{ color: "var(--v2-river)" }}
                >
                  {number}
                </div>
                <h3>{title}</h3>
                <p style={{ color: "rgba(22,56,74,.75)" }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-photo-story v2-section--soft">
        <div className="v2-photo-story-copy">
          <div className="v2-eyebrow">Why the model is different</div>
          <h2 className="v2-photo-story-title">
            The incentive should follow the patient path.
          </h2>
          <p className="v2-copy">
            Traditional agencies can be paid for activity regardless of the
            outcome. DocPropel's model is designed to make the working
            relationship more accountable to the practice's patient-growth
            priorities.
          </p>
          <div className="v2-action-row">
            <Link href="/v2/compare" className="v2-button v2-button--ghost">
              Compare the models <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="v2-photo-story-media">
          <img
            src="/images/v2/accountability.webp"
            alt="A practical growth planning scene"
          />
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation.webp"
          alt="Practice consultation space with a neighborhood view"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">The first step</div>
          <h2 className="v2-title">Begin with a Practice Growth Brief.</h2>
          <p className="v2-lede v2-lede--light">
            A brief discovery conversation helps establish whether the model is
            a practical fit for your practice.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
