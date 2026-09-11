import { Check } from "lucide-react";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const rows = [
  ["Pricing model", "Performance-based", "High fixed retainer"],
  ["Financial risk", "Shared risk", "100% on you"],
  ["Contract terms", "Flexible, no lock-in", "12–24 month lock-in"],
  ["Reporting", "Real-time ROI", "Confusing PDFs"],
  ["Incentives", "Aligned with growth", "Paid regardless"],
];

export default function V2Compare() {
  return (
    <V2Layout>
      <V2PageHero
        eyebrow="Why performance"
        title="Misaligned incentives are the problem."
        lede="Most agencies are paid regardless of results. That places the risk on the practice and removes accountability. Our performance-based model is designed to share risk and align the work around patient growth."
        image="/images/v2/accountability-clean.webp"
      />
      <section className="v2-section v2-section--cream">
        <div className="v2-shell v2-comparison">
          <div>
            <div className="v2-eyebrow">A clearer working relationship</div>
            <h2 className="v2-title v2-title--section">
              The model should work as hard as the strategy.
            </h2>
            <p className="v2-lede">
              The original comparison is retained without losing its point: a
              practice deserves visibility into the decisions, the effort, and
              the incentives behind its growth program.
            </p>
            <div className="v2-action-row">
              <RequestBriefButton />
            </div>
          </div>
          <div
            className="v2-table"
            role="table"
            aria-label="Performance model comparison"
          >
            <div className="v2-table-row v2-table-label" role="row">
              <span>Feature</span>
              <span>DocPropel</span>
              <span>Traditional agency</span>
            </div>
            {rows.map(([feature, us, them]) => (
              <div className="v2-table-row" role="row" key={feature}>
                <span>{feature}</span>
                <span>
                  <Check
                    size={14}
                    style={{ display: "inline", marginRight: 6 }}
                  />
                  {us}
                </span>
                <span>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-photo-story v2-section--ink">
        <div className="v2-photo-story-copy">
          <div className="v2-eyebrow v2-eyebrow--light">No black box</div>
          <h2 className="v2-photo-story-title">
            Transparency makes better decisions possible.
          </h2>
          <p className="v2-copy v2-copy--light">
            The work should produce a shared view of spend, activity, patient
            opportunity, and the next decision. Clear information is a
            prerequisite for a responsible performance model.
          </p>
        </div>
        <div className="v2-photo-story-media">
          <img
            src="/images/v2/local-demand-clean.webp"
            alt="Local neighborhood context for patient demand"
          />
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation-clean.webp"
          alt="A quiet practice conversation setting"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">See if it fits</div>
          <h2 className="v2-title">
            Discuss the model in your market context.
          </h2>
          <p className="v2-lede v2-lede--light">
            The Growth Brief is the starting point for deciding whether a
            performance relationship is right for your practice.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
