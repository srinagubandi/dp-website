import { Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";
import { aggregateStats, caseStudies } from "../content";

export default function V3Results() {
  const { data: testimonials, isLoading } =
    trpc.testimonials.getVisible.useQuery();

  return (
    <V3Layout>
      <V3PageHero
        kicker="Results & case studies"
        title="The evidence notebook."
        lede="A readable record of the practice stories, headline measures, service mix, and client voices already published by DocPropel—with context and limitations kept visible."
        image="/images/v2/first-impression-clean.webp"
        alt="A neighborhood healthcare practice at the end of the day"
        note="Case studies describe specific engagements. They do not guarantee that another practice will achieve the same result."
        actions={<V3BriefButton>Discuss your practice context</V3BriefButton>}
      />

      {isLoading ? (
        <section className="v3-spread v3-spread--sage" aria-live="polite">
          <div className="v3-shell">
            <p>Opening client notes…</p>
          </div>
        </section>
      ) : testimonials && testimonials.length > 0 ? (
        <section className="v3-spread v3-spread--sage">
          <div className="v3-shell">
            <div className="v3-section-heading">
              <p className="v3-kicker">Client voices</p>
              <h2>Notes from the practices.</h2>
              <p>Published testimonials from healthcare practice partners.</p>
            </div>
            <div className="v3-testimonial-grid">
              {testimonials.map(testimonial => (
                <blockquote key={testimonial.id}>
                  <Quote aria-hidden="true" size={23} />
                  <p>“{testimonial.quote}”</p>
                  {(testimonial.growthPercent ||
                    testimonial.newPatientsPerMonth) && (
                    <div className="v3-quote-metrics">
                      {testimonial.growthPercent ? (
                        <span>+{testimonial.growthPercent}% growth</span>
                      ) : null}
                      {testimonial.newPatientsPerMonth ? (
                        <span>
                          {testimonial.newPatientsPerMonth} new patients / month
                        </span>
                      ) : null}
                    </div>
                  )}
                  <footer>
                    <strong>{testimonial.clientName}</strong>
                    {testimonial.practiceName ? (
                      <span>{testimonial.practiceName}</span>
                    ) : null}
                    {testimonial.location ? (
                      <span>{testimonial.location}</span>
                    ) : null}
                    {testimonial.rating ? (
                      <span>{testimonial.rating} / 5 rating</span>
                    ) : null}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell">
          <div className="v3-notebook-heading v3-notebook-heading--dark">
            <div>
              <p className="v3-kicker">Case studies</p>
              <h2>The original work, with room to inspect it.</h2>
            </div>
            <p>
              Outcomes are case-specific, depend on the individual practice and
              market, and are not a promise of future performance.
            </p>
          </div>
          <div className="v3-case-grid">
            {caseStudies.map((study, index) => (
              <article className="v3-case-note" key={study.title}>
                <header>
                  <span>Case {String(index + 1).padStart(2, "0")}</span>
                  <span>{study.specialty}</span>
                </header>
                <div className="v3-case-metric">
                  <strong>{study.metric}</strong>
                  <span>{study.metricLabel}</span>
                </div>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <dl>
                  {study.stats.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <footer>
                  {study.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </footer>
              </article>
            ))}
          </div>
          <p className="v3-qualification-note">
            The descriptions and measures above retain the original site's
            published case-study content. Individual performance varies with
            specialty, capacity, competition, market conditions, and execution.
          </p>
        </div>
      </section>

      <section className="v3-spread v3-spread--ink">
        <div className="v3-shell">
          <div className="v3-section-heading v3-section-heading--light">
            <p className="v3-kicker v3-kicker--light">At a glance</p>
            <h2>A track record shaped by healthcare practices.</h2>
          </div>
          <div className="v3-stat-strip v3-stat-strip--large">
            {aggregateStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-callout-band">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">
              Your context comes next
            </p>
            <h2>Explore what the model could mean for your practice.</h2>
            <p>
              Begin with a Growth Brief, then decide whether there is a clear
              opportunity to work together.
            </p>
          </div>
          <V3BriefButton variant="paper" />
        </div>
      </section>
    </V3Layout>
  );
}
