import V4GrowthCalculator from "../components/V4GrowthCalculator";
import V4Layout from "../components/V4Layout";
import {
  V4ConversionBand,
  V4PageHero,
  V4SectionHeader,
} from "../components/V4Primitives";
import { audiences } from "../data";

export default function V4Calculator() {
  return (
    <V4Layout>
      <V4PageHero
        code="CAL-00"
        eyebrow="interactive planning model"
        title="Explore your practice's growth potential."
        description="Use the original calculator to frame a potential revenue opportunity, then inspect the specialty assumption and ground the estimate in market, capacity, and practice readiness."
        secondaryHref="#planning-model"
        secondaryLabel="Review the model inputs"
      />
      <section className="v4-section" id="planning-model">
        <div className="v4-shell">
          <V4SectionHeader
            code="CAL-01"
            eyebrow="planning instrument"
            title="Start with an informed estimate, not a promise."
            description="Change the care setting, monthly patient count, and average patient value. The calculation remains visible and the lead endpoint behavior is unchanged."
          />
          <V4GrowthCalculator />
        </div>
      </section>
      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="CAL-02"
            eyebrow="supported contexts"
            title="Review the estimate against the practice."
            description="The planning tool supports the original practice categories. Each output requires interpretation against the market and operating reality."
          />
          <div className="v4-record-grid v4-record-grid--four">
            {audiences.map(audience => (
              <article className="v4-record" key={audience.id}>
                <div className="v4-record-top">
                  <span>{audience.id}</span>
                  <span>Supported</span>
                </div>
                <h3>{audience.name}</h3>
                <p>{audience.detail}</p>
                <div className="v4-record-status">
                  <i /> Context required
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <V4ConversionBand
        code="CAL-03"
        title="Put the estimate in context."
        text="A performance-model review can turn a planning output into better questions about local demand, capacity, patient pathways, and the next decision."
      />
    </V4Layout>
  );
}
