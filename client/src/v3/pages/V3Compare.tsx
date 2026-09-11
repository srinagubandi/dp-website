import { Check, Minus } from "lucide-react";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";
import { comparisonRows } from "../content";

export default function V3Compare() {
  return (
    <V3Layout>
      <V3PageHero
        kicker="Why performance"
        title="Misaligned incentives are the problem."
        lede="Most agencies are paid regardless of results. That places the risk on the practice and removes accountability. DocPropel's model is designed to share risk and align the work around patient growth."
        image="/images/v2/accountability-clean.webp"
        alt="A bright planning table prepared for a practice review"
        note="A responsible model makes the commercial relationship, measurement view, and next decision easier to inspect."
        actions={<V3BriefButton>Discuss the model in context</V3BriefButton>}
      />

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell v3-compare-intro">
          <div>
            <p className="v3-kicker">A clearer working relationship</p>
            <h2>The model should work as hard as the strategy.</h2>
          </div>
          <p className="v3-lede">
            A practice deserves visibility into the decisions, effort, spend,
            and incentives behind its growth program. The comparison below
            preserves the original decision points in a format designed for
            inspection.
          </p>
        </div>
        <div className="v3-shell v3-large-comparison">
          <div className="v3-compare-column v3-compare-column--labels">
            <p>Decision point</p>
            {comparisonRows.map(([feature]) => (
              <div key={feature}>{feature}</div>
            ))}
          </div>
          <article className="v3-compare-column v3-compare-column--us">
            <p>DocPropel</p>
            {comparisonRows.map(([feature, us]) => (
              <div key={feature}>
                <Check aria-hidden="true" size={16} />
                <span className="v3-mobile-table-label">{feature}: </span>
                {us}
              </div>
            ))}
          </article>
          <article className="v3-compare-column v3-compare-column--them">
            <p>Traditional agency</p>
            {comparisonRows.map(([feature, , them]) => (
              <div key={feature}>
                <Minus aria-hidden="true" size={16} />
                <span className="v3-mobile-table-label">{feature}: </span>
                {them}
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className="v3-spread v3-spread--blue">
        <div className="v3-shell v3-charter-grid">
          <div>
            <p className="v3-kicker v3-kicker--light">No black box</p>
            <h2>Transparency makes better decisions possible.</h2>
            <p>
              The work should produce a shared view of spend, activity, patient
              opportunity, and the next decision. Clear information is a
              prerequisite for a responsible performance model.
            </p>
          </div>
          <div className="v3-charter-note">
            <span>Review together</span>
            <dl>
              <div>
                <dt>What is moving?</dt>
                <dd>Demand, qualified inquiries, and booked appointments.</dd>
              </div>
              <div>
                <dt>What needs context?</dt>
                <dd>Capacity, market, specialty, and practice readiness.</dd>
              </div>
              <div>
                <dt>What comes next?</dt>
                <dd>A clear decision—not another stack of vanity metrics.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="v3-callout-band v3-callout-band--terracotta">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">See if it fits</p>
            <h2>Discuss the model in your market context.</h2>
            <p>
              The Growth Brief is the starting point for deciding whether a
              performance relationship is right for your practice.
            </p>
          </div>
          <V3BriefButton variant="paper" />
        </div>
      </section>
    </V3Layout>
  );
}
