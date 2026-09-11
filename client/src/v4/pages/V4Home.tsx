import { ArrowRight, Check, CircleCheck } from "lucide-react";
import { Link } from "wouter";
import V4GrowthCalculator from "../components/V4GrowthCalculator";
import V4Layout from "../components/V4Layout";
import V4ReviewDialog from "../components/V4ReviewDialog";
import {
  FlowMarker,
  MeasurementCharter,
  SignalPanel,
  V4ConversionBand,
  V4SectionHeader,
} from "../components/V4Primitives";
import {
  aggregateResults,
  audiences,
  caseStudies,
  comparisonRows,
  evidenceMeta,
  processSteps,
  services,
} from "../data";

export default function V4Home() {
  return (
    <V4Layout>
      <section className="v4-home-hero" aria-labelledby="v4-home-title">
        <div className="v4-shell v4-home-hero-grid">
          <div className="v4-home-copy">
            <p className="v4-kicker">
              <span>PL-00</span> performance-based healthcare growth
            </p>
            <h1 id="v4-home-title">
              Stop paying for promises. Pay for patients.
            </h1>
            <p className="v4-home-lede">
              DocPropel helps doctors, dentists, pharmacies, and PT/OT clinics
              turn local demand into patient opportunities through a
              performance-based model built for accountable growth.
            </p>
            <div className="v4-action-row">
              <V4ReviewDialog
                trigger={
                  <button
                    type="button"
                    className="v4-button v4-button--primary"
                  >
                    Request a performance model review
                    <ArrowRight aria-hidden="true" size={16} />
                  </button>
                }
              />
              <a href="#measurement-charter" className="v4-text-link">
                Inspect the measurement framework
                <ArrowRight aria-hidden="true" size={15} />
              </a>
            </div>
            <div className="v4-hero-trust" aria-label="Model boundaries">
              <span>
                <CircleCheck aria-hidden="true" size={14} /> No long-term
                lock-ins
              </span>
              <span>
                <CircleCheck aria-hidden="true" size={14} /> Healthcare-first
                approach
              </span>
              <span>
                <CircleCheck aria-hidden="true" size={14} /> No outcome promise
              </span>
            </div>
          </div>
          <SignalPanel />
        </div>
        <div
          className="v4-shell v4-hero-index"
          aria-label="Performance model sequence"
        >
          <span>01 / Local demand</span>
          <i />
          <span>02 / Patient pathway</span>
          <i />
          <span>03 / Measured review</span>
        </div>
      </section>

      <FlowMarker />

      <section className="v4-section" id="measurement-charter">
        <div className="v4-shell">
          <V4SectionHeader
            code="PL-01"
            eyebrow="measurement charter"
            title="Make the operating terms visible before the work begins."
            description="The model starts with shared definitions: what will be reviewed, which inputs matter, who owns each decision, and where the limits sit."
          />
          <MeasurementCharter />
        </div>
      </section>

      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="PL-02"
            eyebrow="care-setting matrix"
            title="One performance model. Four distinct practice contexts."
            description="The plan is tailored to how each care setting is discovered, evaluated, and contacted—not applied as a generic package."
          />
          <div className="v4-record-grid v4-record-grid--four">
            {audiences.map(audience => (
              <article className="v4-record" key={audience.id} tabIndex={0}>
                <div className="v4-record-top">
                  <span>{audience.id}</span>
                  <span>Eligible context</span>
                </div>
                <h3>{audience.name}</h3>
                <p>{audience.detail}</p>
                <div className="v4-record-status">
                  <i /> Context before tactics
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v4-section">
        <div className="v4-shell">
          <V4SectionHeader
            code="PL-03"
            eyebrow="rule of engagement"
            title="Simple. Transparent. Aligned."
            description="A shared operating view connects market context to execution, patient opportunity, and the next decision."
          />
          <div className="v4-process-grid">
            {processSteps.map(step => (
              <article className="v4-process-record" key={step.id}>
                <div className="v4-process-rail">
                  <span>{step.id}</span>
                  <i />
                </div>
                <div>
                  <p className="v4-kicker">{step.title}</p>
                  <h3>{step.operationalTitle}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/v4/how-it-works" className="v4-inline-action">
            Inspect the full operating model{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="v4-section v4-section--light">
        <div className="v4-shell">
          <V4SectionHeader
            code="PL-04"
            eyebrow="connected service system"
            title="The work behind a clearer patient path."
            description="The original DocPropel service set remains one coordinated system, so the practice is not left reconciling multiple vendors and competing reports."
          />
          <div className="v4-service-ledger">
            {services.map(service => (
              <article className="v4-service-row" key={service.id}>
                <span className="v4-service-id">{service.id}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <span className="v4-service-review">{service.review}</span>
              </article>
            ))}
          </div>
          <Link href="/v4/services" className="v4-button v4-button--dark">
            Review all services <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="v4-section">
        <div className="v4-shell v4-split-section">
          <div>
            <V4SectionHeader
              code="PL-05"
              eyebrow="model comparison"
              title="Misaligned incentives are the problem."
              description="Most agencies are paid regardless of results. DocPropel's performance-based model is designed to share risk and align the work around patient growth."
            />
            <Link href="/v4/compare" className="v4-inline-action">
              Compare the full record{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div
            className="v4-compare-table"
            role="table"
            aria-label="DocPropel model comparison"
          >
            <div className="v4-compare-row v4-compare-head" role="row">
              <span>Field</span>
              <span>DocPropel</span>
              <span>Traditional agency</span>
            </div>
            {comparisonRows.slice(0, 5).map(([field, us, them]) => (
              <div className="v4-compare-row" role="row" key={field}>
                <span>{field}</span>
                <strong>
                  <Check aria-hidden="true" size={14} />
                  {us}
                </strong>
                <span>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="PL-06"
            eyebrow="attributed evidence ledger"
            title="Case-specific records. Visible limitations."
            description="The original case studies and aggregate results are retained. They describe past examples and are not a promise of future performance."
          />
          <div className="v4-evidence-feature">
            {caseStudies.slice(0, 3).map(item => (
              <article className="v4-evidence-card" key={item.id}>
                <div className="v4-evidence-meta">
                  <span>{item.id} / case study</span>
                  <span>{item.specialty}</span>
                </div>
                <div className="v4-evidence-metric">
                  <strong>{item.metric}</strong>
                  <span>{item.metricLabel}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <dl>
                  <div>
                    <dt>Owner</dt>
                    <dd>{evidenceMeta.owner}</dd>
                  </div>
                  <div>
                    <dt>Review</dt>
                    <dd>{evidenceMeta.review}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{evidenceMeta.status}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="v4-aggregate-strip">
            {aggregateResults.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <Link href="/v4/results" className="v4-inline-action">
            Open the complete evidence ledger{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="v4-section v4-section--calculator">
        <div className="v4-shell">
          <V4SectionHeader
            code="PL-07"
            eyebrow="growth planning tool"
            title="Explore an estimate. Then review the assumptions."
            description="The original interactive calculator remains available as a planning instrument. Its outputs are illustrative and vary with market, specialty, capacity, and practice readiness."
          />
          <V4GrowthCalculator />
        </div>
      </section>

      <V4ConversionBand
        code="PL-08"
        title="Start with a clearer performance conversation."
        text="Share the practice, market, and growth priority. DocPropel will assess fit and measurement context without obligation or sales pressure."
      />
    </V4Layout>
  );
}
