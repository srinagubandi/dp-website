import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, Phone, Quote, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  audiences,
  caseStudies,
  comparisonRows,
  contactItems,
  principles,
  processSteps,
  publishedStats,
  services,
} from "./content";
import V5Calculator from "./V5Calculator";
import V5Layout, { BriefButton } from "./V5Layout";
import {
  CheckList,
  DataLens,
  DisclosureNote,
  Eyebrow,
  FinalCallout,
  PageHero,
  SectionHeading,
} from "./V5Primitives";

export function V5Services() {
  return (
    <V5Layout>
      <PageHero
        index="01 / 07"
        eyebrow="Full-service growth"
        title="One growth system. Every patient path."
        lede="A connected service model for doctors, dentists, pharmacies, and PT/OT clinics—built around local context rather than a generic package."
      />
      <section id="page-content" className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="The connected service route"
            title="Each service has a place in the path."
            copy="The work connects local demand, patient confidence, and a practical next action instead of creating another disconnected vendor relationship."
          />
          <div className="v5-service-cards">
            {services.map(service => (
              <article key={service.title}>
                <div className="v5-service-cards__number">{service.number}</div>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <span>{service.audience}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v5-section v5-section--mist">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="Tailored by care setting"
            title="A system that begins with practice context."
          />
          <div className="v5-context-grid">
            {audiences.map((audience, index) => (
              <article key={audience.name}>
                <span>0{index + 1}</span>
                <h3>{audience.name}</h3>
                <CheckList items={audience.benefits} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCallout
        eyebrow="Start with context"
        title="Build your Digital Growth Brief."
      />
    </V5Layout>
  );
}

export function V5HowItWorks() {
  return (
    <V5Layout>
      <PageHero
        index="02 / 07"
        eyebrow="The operating model"
        title="Simple. Transparent. Aligned."
        lede="Understand the context, connect the pathway, and improve the decisions that follow."
      />
      <section id="page-content" className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="A simple path"
            title="Patient growth has context before it has a tactic."
            copy="A performance relationship works better when the practice and growth partner share a useful operating view."
          />
          <ol className="v5-process-stack">
            {processSteps.map(step => (
              <li key={step.title}>
                <span>{step.number}</span>
                <div>
                  <p>{step.summary}</p>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="v5-lens-story">
        <div className="v5-shell v5-lens-story__grid">
          <div>
            <Eyebrow>Why the model is different</Eyebrow>
            <h2>The incentive should follow the patient path.</h2>
            <p>
              Traditional agencies can be paid for activity regardless of the
              outcome. DocPropel is designed to make the working relationship
              more accountable to patient-growth priorities.
            </p>
            <Link href="/v5/compare" className="v5-button v5-button--light">
              Compare the models <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <DataLens compact />
        </div>
      </section>
      <FinalCallout
        eyebrow="The first step"
        title="Begin with a Practice Growth Brief."
      />
    </V5Layout>
  );
}

export function V5Compare() {
  return (
    <V5Layout>
      <PageHero
        index="03 / 07"
        eyebrow="Why performance"
        title="The model should work as hard as the strategy."
        lede="A practice deserves visibility into the decisions, effort, and incentives behind its growth program."
      />
      <section id="page-content" className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="A clearer working relationship"
            title="Misaligned incentives are the problem."
            copy="Most agencies are paid regardless of results. DocPropel's performance-based model is designed to share risk and align work around patient growth."
          />
          <div
            className="v5-comparison-full"
            role="table"
            aria-label="Performance model comparison"
          >
            <div className="v5-comparison-full__head" role="row">
              <span role="columnheader">Feature</span>
              <span role="columnheader">DocPropel</span>
              <span role="columnheader">Traditional agency</span>
            </div>
            {comparisonRows.map(([label, us, them]) => (
              <div role="row" key={label}>
                <strong role="cell">{label}</strong>
                <span role="cell">
                  <Check aria-hidden="true" size={16} /> {us}
                </span>
                <span role="cell">{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="v5-editorial-split v5-editorial-split--reverse">
        <div className="v5-editorial-split__copy">
          <Eyebrow>No black box</Eyebrow>
          <h2>Transparency makes better decisions possible.</h2>
          <p>
            The work should produce a shared view of spend, activity, patient
            opportunity, and the next decision. Clear information is a
            prerequisite for a responsible performance model.
          </p>
        </div>
        <figure className="v5-editorial-split__media">
          <img
            src="/images/v2/local-demand-clean.webp"
            alt="A local neighborhood surrounding a healthcare practice"
          />
          <figcaption>Context before claims.</figcaption>
        </figure>
      </section>
      <FinalCallout
        eyebrow="See if it fits"
        title="Discuss the model in your market context."
      />
    </V5Layout>
  );
}

export function V5Results() {
  const { data: testimonials, isLoading } =
    trpc.testimonials.getVisible.useQuery();
  return (
    <V5Layout>
      <PageHero
        index="04 / 07"
        eyebrow="Results & case studies"
        title="Specific work. Specific outcomes."
        lede="Practice stories and outcome measures are presented with the context that matters: every result belongs to its engagement."
      />
      {isLoading || !testimonials?.length ? null : (
        <section
          className="v5-section v5-section--mist"
          aria-label="Client stories"
        >
          <div className="v5-shell">
            <SectionHeading
              eyebrow="Client voices"
              title="What clients say about the work."
            />
            <div className="v5-testimonials">
              {testimonials.map(testimonial => (
                <blockquote key={testimonial.id}>
                  <Quote aria-hidden="true" size={22} />
                  <p>{testimonial.quote}</p>
                  <footer>
                    <strong>{testimonial.clientName}</strong>
                    <span>
                      {[testimonial.practiceName, testimonial.location]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
      <section id="page-content" className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="Case studies"
            title="The original work, with its qualifiers in view."
            copy="These historical examples retain their original subject, headline metric, and service mix. Outcomes are case-specific and are not promises of future performance."
          />
          <div className="v5-case-grid">
            {caseStudies.map((study, index) => (
              <article key={study.title}>
                <header>
                  <span>
                    0{index + 1} / {study.specialty}
                  </span>
                  <div>
                    <strong>{study.metric}</strong>
                    <small>{study.metricLabel}</small>
                  </div>
                </header>
                <h3>{study.title}</h3>
                <p>{study.copy}</p>
                <div className="v5-tags">
                  {study.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <p className="v5-case-note">
                  Case-specific result. Not a guarantee.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v5-section v5-section--mist">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="Published track record"
            title="Healthcare practice experience at a glance."
          />
          <div className="v5-stat-grid">
            {publishedStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <DisclosureNote>
            These are aggregate figures previously published by DocPropel. They
            describe historical experience, not an expected or guaranteed result
            for any practice.
          </DisclosureNote>
        </div>
      </section>
      <FinalCallout
        eyebrow="Your context comes first"
        title="Explore whether the model fits your practice."
      />
    </V5Layout>
  );
}

export function V5About() {
  return (
    <V5Layout>
      <PageHero
        index="05 / 07"
        eyebrow="About DocPropel"
        title="Not an agency. A growth partner."
        lede="DocPropel was built in response to retainers, generic activity, and dashboards that do not explain what is really changing."
      />
      <section id="page-content" className="v5-editorial-split">
        <div className="v5-editorial-split__copy">
          <Eyebrow>Why we exist</Eyebrow>
          <h2>Great practices deserve partners who understand the work.</h2>
          <p>
            Doctors, dentists, pharmacists, and therapists often face generic
            marketing that does not reflect the practice, local market, or
            actual patient journey. DocPropel was conceived as the opposite: an
            accountable partner working alongside each client.
          </p>
          <BriefButton />
        </div>
        <figure className="v5-editorial-split__media">
          <img
            src="/images/v2/accountability-clean.webp"
            alt="A sunlit table prepared for thoughtful practice planning"
          />
          <figcaption>Decisions shared in daylight.</figcaption>
        </figure>
      </section>
      <section className="v5-section v5-section--mist">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="What we stand for"
            title="Principles behind the relationship."
          />
          <div className="v5-principles">
            {principles.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCallout
        eyebrow="Our mission"
        title="Help healthcare providers focus on care."
        copy="The aim is transparent, performance-based growth that gives practice teams more clarity around the next patient opportunity."
      />
    </V5Layout>
  );
}

export function V5CalculatorPage() {
  return (
    <V5Layout>
      <PageHero
        index="06 / 07"
        eyebrow="Interactive planning tool"
        title="Explore the shape of a possible opportunity."
        lede="Use editable practice inputs to frame a discussion, then ground the result in market conditions, capacity, specialty, and readiness."
      />
      <section id="page-content" className="v5-section v5-section--mist">
        <div className="v5-shell">
          <div className="v5-boundary-card">
            <ShieldCheck aria-hidden="true" size={22} />
            <div>
              <strong>A planning tool—not a forecast.</strong>
              <p>
                Outputs are illustrative. They do not represent live
                performance, a promise, or a guarantee. Use practice-level
                assumptions only; do not enter patient or protected health
                information.
              </p>
            </div>
          </div>
          <V5Calculator />
        </div>
      </section>
      <section className="v5-section v5-section--paper">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="Built for practice context"
            title="Start with an informed estimate, not a promise."
            copy="The tool supports the original specialty set while leaving the inputs in your control."
          />
          <div className="v5-audience-grid">
            {audiences.map((audience, index) => (
              <article className="v5-audience-card" key={audience.name}>
                <span>0{index + 1}</span>
                <h3>{audience.name}</h3>
                <p>{audience.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCallout
        eyebrow="Put the estimate in context"
        title="Talk through your practice's growth path."
      />
    </V5Layout>
  );
}

export function V5Contact() {
  return (
    <V5Layout>
      <PageHero
        index="07 / 07"
        eyebrow="Contact DocPropel"
        title="A useful first conversation starts with context."
        lede="Discuss the practice, market, and patient path you want to improve—without a long sales process or pressure."
      />
      <section id="page-content" className="v5-section v5-section--paper">
        <div className="v5-shell v5-contact-grid">
          <div>
            <SectionHeading
              eyebrow="Request a Practice Growth Brief"
              title="Share the operational picture—not patient information."
              copy="The brief asks for your practice, specialty, location, and growth challenge so the first conversation can be useful."
            />
            <div className="v5-contact-actions">
              <BriefButton />
              <a
                className="v5-button v5-button--outline"
                href="tel:1-800-362-7767"
              >
                <Phone aria-hidden="true" size={17} /> Call 1-800-DOC-PROPEL
              </a>
            </div>
            <div className="v5-boundary-card">
              <ShieldCheck aria-hidden="true" size={22} />
              <div>
                <strong>Please do not submit PHI.</strong>
                <p>
                  Do not include patient names, dates of birth, treatment
                  information, or other protected health information in the form
                  or email.
                </p>
              </div>
            </div>
          </div>
          <dl className="v5-contact-list">
            {contactItems.map(item => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {"href" in item ? (
                    <a href={item.href}>{item.value}</a>
                  ) : (
                    item.value
                  )}
                </dd>
                <p>{item.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="v5-section v5-section--mist">
        <div className="v5-shell">
          <SectionHeading
            eyebrow="What to expect"
            title="A practical, no-pressure starting point."
          />
          <div className="v5-process-grid">
            {[
              [
                "01",
                "Share the practice context",
                "Tell us about the specialty, location, goals, and current challenge—without PHI.",
              ],
              [
                "02",
                "Review the market and path",
                "We look for the information that will make the next decision more useful.",
              ],
              [
                "03",
                "Decide whether it fits",
                "If there is a clear opportunity, we discuss the performance model and next step.",
              ],
            ].map(([number, title, copy]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCallout
        eyebrow="Ready when you are"
        title="A conversation about the next patient path."
        copy="There is no obligation. The goal is to understand the practice and decide whether a performance-based partnership makes sense."
      />
    </V5Layout>
  );
}
