import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import V4Layout from "../components/V4Layout";
import {
  MeasurementCharter,
  V4ConversionBand,
  V4PageHero,
  V4SectionHeader,
} from "../components/V4Primitives";
import { processSteps } from "../data";

const engagementRules = [
  [
    "Practice context",
    "Specialty, geography, current presence, demand, and capacity begin the record.",
  ],
  [
    "Channel deployment",
    "The channel mix is selected and continuously optimized for the practice context.",
  ],
  [
    "Patient opportunity",
    "Qualified inquiries and booked appointments are reviewed instead of traffic alone.",
  ],
  [
    "Shared decisions",
    "The practice and DocPropel review movement, constraints, and the next action together.",
  ],
];

export default function V4HowItWorks() {
  return (
    <V4Layout>
      <V4PageHero
        code="MOD-00"
        eyebrow="operating model"
        title="Simple. Transparent. Aligned."
        description="The operating sequence begins with practice context, connects the patient pathway, and reviews the decisions that keep growth accountable."
        image="/images/v2/how-it-works-hero-clean.webp"
        imageAlt="A quiet practice office used for operational planning"
        secondaryHref="#charter"
        secondaryLabel="Read the measurement charter"
      />
      <section className="v4-section">
        <div className="v4-shell">
          <V4SectionHeader
            code="MOD-01"
            eyebrow="three-phase record"
            title="Patient growth has context before it has a tactic."
            description="The original process remains intact: deploy and optimize, deliver patients, and pay for performance. The ledger makes each operating phase explicit."
          />
          <div className="v4-process-stack">
            {processSteps.map(step => (
              <article key={step.id}>
                <div className="v4-process-stack-id">
                  <span>{step.id}</span>
                  <i />
                </div>
                <div>
                  <p className="v4-kicker">{step.title}</p>
                  <h3>{step.operationalTitle}</h3>
                </div>
                <p>{step.text}</p>
                <span className="v4-status">
                  <i /> decision record
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v4-section v4-section--light" id="charter">
        <div className="v4-shell">
          <V4SectionHeader
            code="MOD-02"
            eyebrow="measurement charter"
            title="Agree on what will be observed and reviewed."
            description="Predictable and accountable work starts with shared definitions, not an opaque dashboard."
          />
          <MeasurementCharter />
        </div>
      </section>
      <section className="v4-section v4-section--void">
        <div className="v4-shell v4-split-section">
          <V4SectionHeader
            code="MOD-03"
            eyebrow="rules of engagement"
            title="The incentive should follow the patient path."
            description="Traditional agencies can be paid for activity regardless of the outcome. DocPropel's model is designed to make the relationship more accountable to patient-growth priorities."
          />
          <div className="v4-rule-list">
            {engagementRules.map(([title, copy], index) => (
              <article key={title} tabIndex={0}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <Check aria-hidden="true" size={17} />
              </article>
            ))}
          </div>
        </div>
        <div className="v4-shell">
          <Link href="/v4/compare" className="v4-inline-action">
            Compare the models <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
      <V4ConversionBand
        code="MOD-04"
        title="Put the model against your current operating context."
        text="The review establishes fit, scope, and measurement questions before either side decides on a next step."
      />
    </V4Layout>
  );
}
