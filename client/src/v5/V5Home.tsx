import { ArrowDown, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { audiences, comparisonRows, processSteps, services } from "./content";
import V5Calculator from "./V5Calculator";
import V5Layout from "./V5Layout";
import {
  DataLens,
  Eyebrow,
  FinalCallout,
  MagneticLink,
  SectionHeading,
} from "./V5Primitives";

export default function V5Home() {
  return (
    <V5Layout>
      <section className="v5-hero" aria-labelledby="v5-hero-title">
        <div className="v5-hero__rule" aria-hidden="true">
          <span>Clinical precision</span>
          <i />
          <span>Fluid trust</span>
        </div>
        <div className="v5-hero__copy">
          <Eyebrow>Performance-based healthcare growth</Eyebrow>
          <h1 id="v5-hero-title">
            Stop paying for promises. Pay for patients.
          </h1>
          <p className="v5-hero__lede">
            DocPropel helps healthcare practices turn local demand into patient
            opportunities through a transparent, performance-based growth model.
          </p>
          <div className="v5-hero__actions">
            <MagneticLink href="/v5/calculator">
              Explore your practice path
            </MagneticLink>
            <Link href="/v5/how-it-works" className="v5-text-link">
              See the method <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="v5-trust-boundary">
            <ShieldCheck aria-hidden="true" size={18} />
            <p>
              <strong>The trust boundary:</strong> planning tools are
              illustrative; case-study outcomes are specific to those
              engagements; no patient or clinical data is used here.
            </p>
          </div>
        </div>
        <div className="v5-hero__lens">
          <DataLens />
        </div>
        <a href="#system" className="v5-scroll-cue">
          Continue through the system <ArrowDown aria-hidden="true" size={16} />
        </a>
      </section>

      <section id="system" className="v5-expansion">
        <div className="v5-expansion__halo" aria-hidden="true" />
        <div className="v5-shell v5-expansion__content">
          <Eyebrow>A shared operating view</Eyebrow>
          <h2>From scattered activity to one accountable patient path.</h2>
          <p>
            The lens is conceptual—not a live dashboard. It represents a simpler
            working model: understand demand, connect the next useful action,
            and review what happens with the practice.
          </p>
          <div
            className="v5-expansion__route"
            aria-label="DocPropel operating sequence"
          >
            <span>Local demand</span>
            <i aria-hidden="true" />
            <span>Clear next action</span>
            <i aria-hidden="true" />
            <span>Shared review</span>
          </div>
        </div>
      </section>

      <section className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="Built for healthcare professionals"
            title="A growth model that understands the practice behind the plan."
            copy="DocPropel specializes in patient growth for practices that value outcomes over activity, with an approach shaped around each care setting."
          />
          <div className="v5-audience-grid">
            {audiences.map((audience, index) => (
              <article className="v5-audience-card" key={audience.name}>
                <span>0{index + 1}</span>
                <h3>{audience.name}</h3>
                <p>{audience.detail}</p>
                <div className="v5-audience-card__line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v5-editorial-split">
        <div className="v5-editorial-split__copy">
          <Eyebrow>The first impression</Eyebrow>
          <h2>Be present when care becomes a priority.</h2>
          <p>
            Generic ads and black-box reporting can separate a practice from
            people already looking for help. We identify the channels and
            messages that fit how patients seek care in the local market.
          </p>
          <Link className="v5-text-link" href="/v5/services">
            Explore the connected services{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <figure className="v5-editorial-split__media">
          <img
            src="/images/v2/first-impression-clean.webp"
            alt="A neighborhood healthcare practice at golden hour"
          />
          <figcaption>Local context shapes the path.</figcaption>
        </figure>
      </section>

      <section className="v5-section v5-section--mist">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="A simple operating model"
            title="Understand. Connect. Improve."
            copy="Patient growth has context before it has a tactic. The practice and growth partner begin with a shared view, then move into execution and review."
          />
          <div className="v5-process-grid">
            {processSteps.map(step => (
              <article key={step.title}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <strong>{step.summary}</strong>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
          <Link
            href="/v5/how-it-works"
            className="v5-button v5-button--outline"
          >
            Follow the operating model{" "}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>

      <section className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="One connected system"
            title="The work behind a clearer patient path."
            copy="One coordinated service set connects local discovery, patient confidence, and a practical next action."
          />
          <div className="v5-service-ledger">
            {services.map(service => (
              <article key={service.title}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ArrowRight aria-hidden="true" size={17} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v5-comparison-band">
        <div className="v5-shell v5-comparison-band__grid">
          <div>
            <Eyebrow>Why performance</Eyebrow>
            <h2>Misaligned incentives are the problem.</h2>
            <p>
              Most agencies are paid regardless of results. That places risk on
              the practice. DocPropel's model is designed to share risk and
              align the work around patient growth.
            </p>
            <Link
              className="v5-text-link v5-text-link--light"
              href="/v5/compare"
            >
              Compare the models <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div
            className="v5-compare-table"
            role="table"
            aria-label="Condensed growth model comparison"
          >
            {comparisonRows.slice(0, 4).map(([label, us, them]) => (
              <div role="row" key={label}>
                <span role="cell">{label}</span>
                <span role="cell">
                  <Check aria-hidden="true" size={15} /> {us}
                </span>
                <span role="cell">{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v5-section v5-section--mist">
        <div className="v5-shell">
          <V5Calculator />
        </div>
      </section>

      <FinalCallout />
    </V5Layout>
  );
}
