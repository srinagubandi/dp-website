import { Check } from "lucide-react";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";
import { audiences, services } from "../content";

export default function V3Services() {
  return (
    <V3Layout>
      <V3PageHero
        kicker="Full-service practice growth"
        title="One system for the whole patient path."
        lede="DocPropel coordinates search, paid media, the practice website, reputation, reactivation, content, and market insight under one performance-based model."
        image="/images/v2/services-hero-clean.webp"
        alt="A welcoming, contemporary healthcare practice entrance"
        note="A channel belongs in the plan only when it has a clear job in the patient path."
        actions={<V3BriefButton>Discuss your practice mix</V3BriefButton>}
      />

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <p className="v3-kicker">The connected service route</p>
            <h2>Each service has a place in the path.</h2>
            <p>
              You do not need multiple vendors or complex contracts. The work is
              designed to connect local demand, patient confidence, and a
              practical next action—not create another disconnected reporting
              stack.
            </p>
          </div>
          <div className="v3-service-chapters">
            {services.map(service => (
              <article key={service.title}>
                <div className="v3-chapter-number">{service.number}</div>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span>{service.specialties}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-spread v3-spread--sage">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <p className="v3-kicker">Tailored by care setting</p>
            <h2>The practice context changes the plan.</h2>
            <p>
              Every specialty has different demand, capacity, referral, and
              patient-decision patterns. These original program objectives
              remain part of the specialty-specific service model.
            </p>
          </div>
          <div className="v3-specialty-notes">
            {audiences.map((audience, index) => (
              <article key={audience.title}>
                <span className="v3-note-tab">Field note 0{index + 1}</span>
                <h3>For {audience.title}</h3>
                <p>{audience.short}</p>
                <ul>
                  {audience.benefits.map(benefit => (
                    <li key={benefit}>
                      <Check aria-hidden="true" size={15} /> {benefit}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="v3-qualification-note">
            Specialty objectives are planning targets, not guaranteed outcomes.
            Actual results depend on market conditions, capacity, competition,
            and practice readiness.
          </p>
        </div>
      </section>

      <section className="v3-callout-band">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">Start with context</p>
            <h2>Build your Digital Growth Brief.</h2>
            <p>
              We begin with the current practice, local market, and patient path
              that needs attention.
            </p>
          </div>
          <V3BriefButton variant="paper" />
        </div>
      </section>
    </V3Layout>
  );
}
