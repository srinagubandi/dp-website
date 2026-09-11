import { Check, Minus } from "lucide-react";
import V4Layout from "../components/V4Layout";
import {
  V4ConversionBand,
  V4PageHero,
  V4SectionHeader,
} from "../components/V4Primitives";
import { comparisonRows } from "../data";

const decisionNotes = [
  [
    "Visibility",
    "A shared view of spend, activity, patient opportunity, and the next decision.",
  ],
  [
    "Accountability",
    "The model is designed to share financial risk and align incentives around growth.",
  ],
  [
    "Flexibility",
    "Flexible terms without the original site's 12–24 month lock-in comparison.",
  ],
  [
    "Boundary",
    "A performance model still requires market, capacity, and practice readiness; it is not a guaranteed outcome.",
  ],
];

export default function V4Compare() {
  return (
    <V4Layout>
      <V4PageHero
        code="CMP-00"
        eyebrow="model comparison"
        title="Misaligned incentives are the problem."
        description="Most agencies are paid regardless of results. That places the risk on the practice and removes accountability. DocPropel's model is designed to share risk and align the work around patient growth."
        image="/images/v2/accountability-clean.webp"
        imageAlt="A planning table with notes, laptop, and daylight"
        secondaryHref="#comparison-record"
        secondaryLabel="Inspect each comparison field"
      />
      <section className="v4-section" id="comparison-record">
        <div className="v4-shell">
          <V4SectionHeader
            code="CMP-01"
            eyebrow="side-by-side record"
            title="The working model should be inspectable."
            description="The original comparison is retained as a clear decision record—not hidden inside a sales promise."
          />
          <div
            className="v4-compare-table v4-compare-table--full"
            role="table"
            aria-label="Performance model comparison"
          >
            <div className="v4-compare-row v4-compare-head" role="row">
              <span>Decision field</span>
              <span>DocPropel</span>
              <span>Traditional agency</span>
            </div>
            {comparisonRows.map(([field, us, them]) => (
              <div className="v4-compare-row" role="row" key={field}>
                <span>{field}</span>
                <strong>
                  <Check aria-hidden="true" size={15} />
                  {us}
                </strong>
                <span>
                  <Minus aria-hidden="true" size={14} />
                  {them}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="CMP-02"
            eyebrow="decision notes"
            title="Transparency makes better decisions possible."
            description="A responsible relationship provides the information needed to evaluate the work, while keeping estimates and case-specific evidence in their proper context."
          />
          <div className="v4-record-grid v4-record-grid--four">
            {decisionNotes.map(([title, copy], index) => (
              <article className="v4-record" key={title} tabIndex={0}>
                <div className="v4-record-top">
                  <span>NOTE-{String(index + 1).padStart(2, "0")}</span>
                  <span>Review point</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <V4ConversionBand
        code="CMP-03"
        title="Discuss the model in your market context."
        text="The first review determines whether this working relationship makes sense for the practice. There is no obligation and no automatic promise of results."
      />
    </V4Layout>
  );
}
