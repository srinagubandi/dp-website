import { Check } from "lucide-react";
import V4Layout from "../components/V4Layout";
import {
  V4ConversionBand,
  V4PageHero,
  V4SectionHeader,
} from "../components/V4Primitives";
import { principles } from "../data";

export default function V4About() {
  return (
    <V4Layout>
      <V4PageHero
        code="ORG-00"
        eyebrow="about DocPropel"
        title="Not an agency. A growth partner."
        description="DocPropel was built from a familiar frustration: healthcare practices are often sold retainers, generic activity, and dashboards that do not explain what is actually changing."
        image="/images/v2/first-impression-clean.webp"
        imageAlt="A local practice exterior set within its neighborhood"
        secondaryHref="#company-record"
        secondaryLabel="Read the company record"
      />
      <section className="v4-section" id="company-record">
        <div className="v4-shell v4-story-grid">
          <div>
            <V4SectionHeader
              code="ORG-01"
              eyebrow="why we exist"
              title="Great practices deserve partners who understand the work."
            />
          </div>
          <div className="v4-long-copy">
            <p>
              Our founders saw a gap in the market: great doctors, dentists,
              pharmacists, and therapists were struggling to grow because
              traditional marketing agencies were focused on selling
              retainers—not delivering patients.
            </p>
            <p>
              The same frustrations repeated: practices could not see where
              money was going, leads lacked relevance, partners did not
              understand the practice, and the relationship felt like another
              account number.
            </p>
            <p>
              DocPropel was conceived as the opposite: a performance-based
              growth partner working hand-in-hand with each client to strengthen
              practice identity and communicate its competitive advantages in a
              changing local market.
            </p>
            <p>
              The goal is straightforward: understand how practices operate,
              respect healthcare responsibilities, avoid agency theatrics, and
              make patient-growth work accountable.
            </p>
          </div>
        </div>
      </section>
      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="ORG-02"
            eyebrow="operating principles"
            title="Five standards behind the relationship."
            description="These principles guide the strategy, measurement, and partnership model."
          />
          <div className="v4-principle-list">
            {principles.map(([title, text], index) => (
              <article key={title} tabIndex={0}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Check aria-hidden="true" size={17} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v4-section v4-section--light">
        <div className="v4-shell v4-mission-record">
          <p className="v4-kicker">
            <span>ORG-03</span> mission record
          </p>
          <h2>Help healthcare providers focus on care.</h2>
          <p>
            Empower healthcare providers to grow through transparent,
            performance-based marketing—giving practice teams more clarity
            around patient opportunity while they focus on caring for patients.
          </p>
          <dl>
            <div>
              <dt>Model</dt>
              <dd>Performance-based</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd>Healthcare-first</dd>
            </div>
            <div>
              <dt>Standard</dt>
              <dd>Full transparency</dd>
            </div>
          </dl>
        </div>
      </section>
      <V4ConversionBand
        code="ORG-04"
        title="Decide whether the partnership is a fit."
        text="Bring the practice context, market, and growth priority. The first conversation establishes fit and measurement boundaries."
      />
    </V4Layout>
  );
}
