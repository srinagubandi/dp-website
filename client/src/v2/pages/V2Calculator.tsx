import ROICalculator from "@/components/ROICalculator";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const contexts = [
  ["Doctors", "Primary care, specialists, urgent care"],
  ["Dentists", "General, cosmetic, orthodontic care"],
  ["Pharmacies", "Independent, compounding, specialty services"],
  ["PT / OT", "Rehabilitation, direct access, pediatric pathways"],
];

export default function V2Calculator() {
  return (
    <V2Layout>
      <V2PageHero
        eyebrow="Interactive planning tool"
        title="Explore your practice's growth potential."
        lede="Use the original calculator to frame a discussion about potential revenue opportunity, then ground it in the practice, market, specialty, and current capacity."
        image="/images/v2/accountability.webp"
      />
      <section className="v2-section v2-section--cream">
        <div className="v2-shell">
          <div className="v2-eyebrow">Built for the practice context</div>
          <h2 className="v2-title v2-title--section">
            Start with an informed estimate, not a promise.
          </h2>
          <p className="v2-lede">
            The calculator is retained as a planning tool for the original
            supported specialties. Results are illustrative and individual
            outcomes will vary based on local market conditions, specialty, and
            practice readiness.
          </p>
          <div className="v2-specialties">
            {contexts.map(([title, detail], index) => (
              <article className="v2-specialty" key={title}>
                <div className="v2-specialty-index">0{index + 1}</div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="v2-calculator-wrap">
            <ROICalculator />
          </div>
          <p className="v2-copy" style={{ marginTop: 22, fontSize: ".82rem" }}>
            Illustrative projections are not a guarantee of results. A Practice
            Growth Brief is the appropriate next step for a market-specific
            assessment.
          </p>
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation.webp"
          alt="A practice room prepared for a conversation"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">
            Put the estimate in context
          </div>
          <h2 className="v2-title">
            Talk through your practice's growth path.
          </h2>
          <p className="v2-lede v2-lede--light">
            A short conversation can turn an estimate into a more useful set of
            questions about the market, the patient pathway, and the next
            decision.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
