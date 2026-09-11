import { Check } from "lucide-react";
import V4Layout from "../components/V4Layout";
import {
  V4ConversionBand,
  V4PageHero,
  V4SectionHeader,
} from "../components/V4Primitives";
import { audiences, services } from "../data";

export default function V4Services() {
  return (
    <V4Layout>
      <V4PageHero
        code="SRV-00"
        eyebrow="connected growth system"
        title="One growth system. Every patient path."
        description="The complete DocPropel service set operates inside one performance-based model, tailored for doctors, dentists, pharmacies, and PT/OT clinics."
        image="/images/v2/services-hero-clean.webp"
        imageAlt="A modern practice work area with plants and daylight"
        secondaryHref="#service-ledger"
        secondaryLabel="Inspect service scope"
      />
      <section className="v4-section" id="service-ledger">
        <div className="v4-shell">
          <V4SectionHeader
            code="SRV-01"
            eyebrow="service ledger"
            title="Each capability has a defined job in the path."
            description="The work connects local demand, patient confidence, and a practical next action rather than creating another disconnected vendor relationship."
          />
          <div className="v4-service-ledger v4-service-ledger--detailed">
            {services.map(service => (
              <article className="v4-service-row" key={service.id}>
                <span className="v4-service-id">{service.id}</span>
                <div>
                  <h3>{service.title}</h3>
                  <span className="v4-service-audience">
                    {service.specialties}
                  </span>
                </div>
                <p>{service.summary}</p>
                <dl>
                  <dt>Review field</dt>
                  <dd>{service.review}</dd>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="SRV-02"
            eyebrow="care-setting requirements"
            title="The practice context sets the requirements."
            description="Each specialty carries a different access pattern, local market, and operating reality. These are starting questions, not automatic promises."
          />
          <div className="v4-audience-matrix">
            {audiences.map(audience => (
              <article key={audience.id}>
                <div className="v4-record-top">
                  <span>{audience.id}</span>
                  <span>Context record</span>
                </div>
                <h3>{audience.name}</h3>
                <p>{audience.detail}</p>
                <ul>
                  {audience.priorities.map(priority => (
                    <li key={priority}>
                      <Check aria-hidden="true" size={14} />
                      {priority}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <V4ConversionBand
        code="SRV-03"
        title="Start with the service context, not a package."
        text="A structured review identifies the practice, market, current patient path, and the operating questions worth examining first."
      />
    </V4Layout>
  );
}
