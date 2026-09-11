import { Check } from "lucide-react";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";
import V3GrowthCalculator from "../components/V3GrowthCalculator";

export default function V3Calculator() {
  return (
    <V3Layout>
      <V3PageHero
        kicker="Interactive planning tool"
        title="Calculate your practice's growth potential."
        lede="Explore what a performance-based partnership could mean for a doctor, dentist, pharmacy, PT/OT clinic, urgent care, or specialty practice—then test the result against real capacity and market context."
        image="/images/v2/patient-pathway-clean.webp"
        alt="A clear path through a welcoming practice reception space"
        note="The calculator is a conversation aid. It applies a specialty planning assumption to your inputs; it is not a forecast."
      />

      <section className="v3-spread v3-spread--paper v3-calculator-page">
        <div className="v3-shell">
          <V3GrowthCalculator />
        </div>
      </section>

      <section className="v3-spread v3-spread--sage">
        <div className="v3-shell v3-interpret-grid">
          <div>
            <p className="v3-kicker">How to read the result</p>
            <h2>Use the number to ask better questions.</h2>
          </div>
          <ul>
            <li>
              <Check aria-hidden="true" size={16} /> Does the practice have
              capacity for the additional patient volume?
            </li>
            <li>
              <Check aria-hidden="true" size={16} /> Does the average patient
              value reflect the actual service mix?
            </li>
            <li>
              <Check aria-hidden="true" size={16} /> What do local demand and
              competition make realistic?
            </li>
            <li>
              <Check aria-hidden="true" size={16} /> Which part of the patient
              path is limiting growth today?
            </li>
          </ul>
        </div>
      </section>

      <section className="v3-callout-band">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">Add the context</p>
            <h2>Turn a planning range into a useful conversation.</h2>
            <p>
              Share the practice, market, and growth priority. We will help
              assess fit and the measurement approach—without promising an
              outcome.
            </p>
          </div>
          <V3BriefButton variant="paper" />
        </div>
      </section>
    </V3Layout>
  );
}
