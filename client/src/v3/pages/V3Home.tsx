import { ArrowRight, Check, CircleCheck, MoveRight } from "lucide-react";
import { Link } from "wouter";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3GrowthCalculator from "../components/V3GrowthCalculator";
import {
  advantageNotes,
  aggregateStats,
  audiences,
  caseStudies,
  comparisonRows,
  processSteps,
  services,
} from "../content";

export default function V3Home() {
  return (
    <V3Layout>
      <section className="v3-home-hero">
        <div className="v3-shell v3-home-hero-grid">
          <div className="v3-home-hero-copy">
            <p className="v3-kicker">Performance-based healthcare growth</p>
            <h1>Stop paying for promises. Pay for patients.</h1>
            <p className="v3-hero-lede">
              DocPropel helps doctors, dentists, pharmacies, and PT/OT clinics
              turn local demand into patient opportunities—with a model designed
              to make growth work more accountable.
            </p>
            <div className="v3-action-row">
              <V3BriefButton />
              <Link className="v3-link-arrow" href="/v3/how-it-works">
                Explore how the model works <ArrowRight size={16} />
              </Link>
            </div>
            <p className="v3-trust-line">
              <CircleCheck aria-hidden="true" size={17} /> No long-term lock-ins
              · Healthcare-first approach · Built around local care
            </p>
          </div>

          <figure className="v3-hero-figure">
            <div className="v3-figure-frame">
              <img
                src="/images/v2/patient-pathway-clean.webp"
                alt="A calm practice reception path with warm daylight"
              />
              <div className="v3-path-drawing" aria-hidden="true">
                <span />
                <i />
                <span />
                <i />
                <span />
              </div>
            </div>
            <figcaption className="v3-note-card">
              <span>How performance is defined</span>
              <strong>Local demand → useful action → shared review</strong>
              <p>
                The first conversation establishes fit and measurement context.
                It does not promise a result.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell v3-intro-grid">
          <div>
            <p className="v3-kicker">The decision in plain language</p>
            <h2>A growth partner should be easier to evaluate.</h2>
          </div>
          <p className="v3-lede">
            Practices should not have to judge a partner by activity reports and
            untestable promises. The DocPropel model connects the work, the
            patient path, and the next decision in one shared view.
          </p>
        </div>
        <div className="v3-shell v3-contrast-spread">
          <article className="v3-margin-note">
            <span>What practices are tired of</span>
            <h3>Promises without a useful line of sight.</h3>
            <ul>
              <li>Generic ads that do not reflect the practice</li>
              <li>Black-box reporting that hides where money goes</li>
              <li>Long contracts and retainers paid regardless of results</li>
            </ul>
          </article>
          <article className="v3-proof-note">
            <span>The measurable model</span>
            <h3>Decisions made in daylight.</h3>
            <ul>
              <li>
                <Check aria-hidden="true" /> Shared visibility into spend,
                leads, and decisions
              </li>
              <li>
                <Check aria-hidden="true" /> A specialty- and market-specific
                channel plan
              </li>
              <li>
                <Check aria-hidden="true" /> Incentives aligned around patient
                growth
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="v3-spread v3-spread--blue">
        <div className="v3-shell">
          <div className="v3-section-heading v3-section-heading--light">
            <p className="v3-kicker v3-kicker--light">
              Built for healthcare professionals
            </p>
            <h2>The care setting comes before the playbook.</h2>
            <p>
              DocPropel specializes in patient growth for practices that value
              outcomes over activity. Each path begins with the realities of the
              specialty and local market.
            </p>
          </div>
          <div className="v3-audience-grid">
            {audiences.map((audience, index) => (
              <article key={audience.title}>
                <span>0{index + 1}</span>
                <h3>{audience.title}</h3>
                <p>{audience.short}</p>
                <ul>
                  {audience.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-spread v3-spread--canvas">
        <div className="v3-shell v3-pathway-layout">
          <div className="v3-sticky-copy">
            <p className="v3-kicker">The operating pathway</p>
            <h2>Simple. Transparent. Aligned.</h2>
            <p>
              Growth has context before it has a tactic. We review the current
              practice presence, local demand, and capacity, then work around
              the decisions that keep a patient path moving.
            </p>
            <Link className="v3-link-arrow" href="/v3/how-it-works">
              Read the operating model <ArrowRight size={16} />
            </Link>
          </div>
          <ol className="v3-pathway">
            {processSteps.map(step => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <small>{step.note}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v3-spread v3-spread--sage">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <p className="v3-kicker">The work behind the path</p>
            <h2>One connected growth system.</h2>
            <p>
              The original DocPropel service set remains here as a coordinated
              performance model—not a collection of disconnected vendors.
            </p>
          </div>
          <div className="v3-service-index">
            {services.map(service => (
              <article key={service.title}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <Link className="v3-button v3-button--outline" href="/v3/services">
            Explore every service <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <p className="v3-kicker">What the system addresses</p>
            <h2>Less noise. More useful accountability.</h2>
            <p>
              Technology supports the work, but it does not replace practice
              judgment. These are the operational problems the model is designed
              to address.
            </p>
          </div>
          <div className="v3-note-grid">
            {advantageNotes.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-spread v3-spread--canvas">
        <div className="v3-shell v3-compare-layout">
          <div>
            <p className="v3-kicker">Promises / proof</p>
            <h2>Misaligned incentives are the problem.</h2>
            <p className="v3-lede">
              Most agencies are paid regardless of results. That places the risk
              on the practice and removes accountability. The performance model
              is designed to share risk and align the work around patient
              growth.
            </p>
            <Link className="v3-link-arrow" href="/v3/compare">
              Compare the models <ArrowRight size={16} />
            </Link>
          </div>
          <div
            className="v3-comparison"
            role="table"
            aria-label="Growth model comparison"
          >
            <div className="v3-comparison-row v3-comparison-head" role="row">
              <span role="columnheader">Decision point</span>
              <span role="columnheader">DocPropel</span>
              <span role="columnheader">Traditional agency</span>
            </div>
            {comparisonRows.map(([feature, us, them]) => (
              <div className="v3-comparison-row" role="row" key={feature}>
                <strong role="cell">{feature}</strong>
                <span role="cell">
                  <Check aria-hidden="true" size={15} /> {us}
                </span>
                <span role="cell">{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-spread v3-spread--ink">
        <div className="v3-shell">
          <div className="v3-notebook-heading">
            <div>
              <p className="v3-kicker v3-kicker--light">Evidence notebook</p>
              <h2>Results, with the context still attached.</h2>
            </div>
            <p>
              Published case examples preserve the original headline measures
              and service mix. They are case-specific—not a promise of future
              performance.
            </p>
          </div>
          <div className="v3-evidence-preview">
            {caseStudies.slice(0, 3).map((study, index) => (
              <article key={study.title}>
                <div className="v3-evidence-meta">
                  <span>Case note {String(index + 1).padStart(2, "0")}</span>
                  <span>{study.specialty}</span>
                </div>
                <strong>{study.metric}</strong>
                <small>{study.metricLabel}</small>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
              </article>
            ))}
          </div>
          <div className="v3-evidence-footer">
            <div className="v3-stat-strip">
              {aggregateStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <Link className="v3-button v3-button--paper" href="/v3/results">
              Open the evidence notebook <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell">
          <V3GrowthCalculator />
        </div>
      </section>

      <section className="v3-closing-spread">
        <div className="v3-shell v3-closing-grid">
          <img
            src="/images/v2/final-invitation-clean.webp"
            alt="A quiet consultation room looking toward the neighborhood"
          />
          <div>
            <p className="v3-kicker v3-kicker--light">The next conversation</p>
            <h2>Start with a clearer growth conversation.</h2>
            <p>
              Tell us about the practice, market, and patient path you want to
              improve. There is no obligation and no sales pressure.
            </p>
            <V3BriefButton variant="paper" />
            <Link
              href="/v3/contact"
              className="v3-link-arrow v3-link-arrow--light"
            >
              Or contact DocPropel directly <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </V3Layout>
  );
}
