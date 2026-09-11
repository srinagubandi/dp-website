import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";
import { processSteps } from "../content";

export default function V3HowItWorks() {
  return (
    <V3Layout>
      <V3PageHero
        kicker="The operating model"
        title="Simple. Transparent. Aligned."
        lede="The work begins with a review of the practice's current online presence, local demand, capacity, and growth potential—then moves through execution and shared review."
        image="/images/v2/how-it-works-hero-clean.webp"
        alt="A clinician reviewing a clear planning board in a bright practice"
        note="Growth has context before it has a tactic. Define the practice situation, then choose the route."
        actions={
          <V3BriefButton>Start with a Practice Growth Brief</V3BriefButton>
        }
      />

      <section className="v3-spread v3-spread--canvas">
        <div className="v3-shell v3-method-intro">
          <div>
            <p className="v3-kicker">A three-part route</p>
            <h2>From practice context to accountable decisions.</h2>
          </div>
          <p className="v3-lede">
            A performance-based relationship works better when the practice and
            growth partner share an operating view. Every stage has a job, a
            review point, and a clear question to answer.
          </p>
        </div>
        <div className="v3-shell">
          <ol className="v3-method-path">
            {processSteps.map(step => (
              <li key={step.number}>
                <div className="v3-method-marker">
                  <span>{step.number}</span>
                  <i aria-hidden="true" />
                </div>
                <article>
                  <p className="v3-kicker">Operating step {step.number}</p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="v3-method-note">
                    <Check aria-hidden="true" size={17} />
                    <span>{step.note}</span>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v3-photo-spread">
        <div className="v3-shell v3-photo-spread-grid">
          <figure>
            <img
              src="/images/v2/accountability-clean.webp"
              alt="A planning table arranged for a transparent practice review"
            />
            <figcaption>Shared review, not a black box.</figcaption>
          </figure>
          <div>
            <p className="v3-kicker">Why the model is different</p>
            <h2>The incentive should follow the patient path.</h2>
            <p>
              Traditional agencies can be paid for activity regardless of the
              outcome. DocPropel's model is designed to make the relationship
              more accountable to the practice's patient-growth priorities. The
              shared view includes spend, activity, patient opportunity, and the
              next decision.
            </p>
            <Link className="v3-link-arrow" href="/v3/compare">
              Compare the working models <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="v3-callout-band">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">The first step</p>
            <h2>Begin with a Practice Growth Brief.</h2>
            <p>
              A short discovery sequence helps establish whether the performance
              model and measurement approach are a practical fit.
            </p>
          </div>
          <V3BriefButton variant="paper" />
        </div>
      </section>
    </V3Layout>
  );
}
