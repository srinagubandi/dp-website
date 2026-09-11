import { Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";
import V4Layout from "../components/V4Layout";
import {
  V4ConversionBand,
  V4PageHero,
  V4SectionHeader,
} from "../components/V4Primitives";
import { aggregateResults, caseStudies, evidenceMeta } from "../data";

export default function V4Results() {
  const { data: testimonials, isLoading } =
    trpc.testimonials.getVisible.useQuery();

  return (
    <V4Layout>
      <V4PageHero
        code="EVD-00"
        eyebrow="results and case studies"
        title="Real growth. Recorded evidence."
        description="The original DocPropel case studies, detail metrics, aggregate results, and client testimonials are retained with explicit record types and limitations."
        image="/images/v2/first-impression-clean.webp"
        imageAlt="A neighborhood healthcare practice exterior at golden hour"
        secondaryHref="#evidence-ledger"
        secondaryLabel="Open the evidence ledger"
      />
      {isLoading ? (
        <section className="v4-section v4-section--void">
          <div className="v4-shell">
            <p className="v4-loading">Loading client testimony records…</p>
          </div>
        </section>
      ) : testimonials && testimonials.length > 0 ? (
        <section className="v4-section v4-section--void">
          <div className="v4-shell">
            <V4SectionHeader
              code="EVD-01"
              eyebrow="client testimony"
              title="Attributed voices from the existing record."
              description="Published testimonials remain distinct from case-study outcomes and planning assumptions."
            />
            <div className="v4-testimonial-grid">
              {testimonials.map(testimonial => (
                <article className="v4-testimonial" key={testimonial.id}>
                  <div className="v4-evidence-meta">
                    <span>TESTIMONIAL</span>
                    <span>{testimonial.specialty || "Healthcare"}</span>
                  </div>
                  <Quote aria-hidden="true" size={23} />
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <footer>
                    <strong>{testimonial.clientName}</strong>
                    {testimonial.practiceName ? (
                      <span>{testimonial.practiceName}</span>
                    ) : null}
                    {testimonial.location ? (
                      <span>{testimonial.location}</span>
                    ) : null}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="v4-section" id="evidence-ledger">
        <div className="v4-shell">
          <V4SectionHeader
            code="EVD-02"
            eyebrow="case-study ledger"
            title="Past examples, with their status in view."
            description="Each entry preserves the original subject, headline metric, supporting measures, and service mix. Outcomes are case-specific and not a promise of future performance."
          />
          <div className="v4-evidence-ledger">
            {caseStudies.map(item => (
              <article className="v4-evidence-entry" key={item.id}>
                <div className="v4-evidence-entry-head">
                  <span>{item.id}</span>
                  <span>Case study</span>
                  <span>{item.specialty}</span>
                </div>
                <div className="v4-evidence-entry-main">
                  <div className="v4-evidence-metric">
                    <strong>{item.metric}</strong>
                    <span>{item.metricLabel}</span>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="v4-tags">
                      {item.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <dl>
                    {item.details.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="v4-evidence-entry-foot">
                  <span>Owner / {evidenceMeta.owner}</span>
                  <span>Review / {evidenceMeta.review}</span>
                  <span>Status / {evidenceMeta.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v4-section v4-section--light">
        <div className="v4-shell">
          <V4SectionHeader
            code="EVD-03"
            eyebrow="aggregate record"
            title="A track record shaped by healthcare practices."
            description="These figures are retained from the original public results page and shown separately from individual case-study evidence."
          />
          <div className="v4-aggregate-strip v4-aggregate-strip--dark">
            {aggregateResults.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="v4-limit-note">
            Historical and aggregate results do not guarantee a future outcome.
            Market conditions, specialty, capacity, and practice readiness
            affect performance.
          </p>
        </div>
      </section>
      <V4ConversionBand
        code="EVD-04"
        title="Review what evidence applies to your decision."
        text="A performance-model review starts with your context and a shared definition of what should be measured next."
      />
    </V4Layout>
  );
}
