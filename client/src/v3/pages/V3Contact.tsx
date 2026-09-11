import { Clock3, Mail, Phone } from "lucide-react";
import V3Layout, { V3BriefButton } from "../components/V3Layout";
import V3PageHero from "../components/V3PageHero";

const contactItems = [
  {
    label: "Call",
    value: "1-800-DOC-PROPEL",
    href: "tel:1-800-362-7767",
    note: "Tap to call and start a direct conversation about your practice.",
    icon: Phone,
  },
  {
    label: "Email",
    value: "hello@docpropel.com",
    href: "mailto:hello@docpropel.com",
    note: "Use email or the Growth Brief to share initial business context.",
    icon: Mail,
  },
  {
    label: "Office hours",
    value: "Monday–Friday, 9am–6pm EST",
    note: "After-hours inquiries are answered the next business day.",
    icon: Clock3,
  },
] as const;

export default function V3Contact() {
  return (
    <V3Layout>
      <V3PageHero
        kicker="Contact DocPropel"
        title="Let's grow your practice with more clarity."
        lede="Ready to discuss the practice, market, and patient path you want to improve? Start a practical conversation with no obligation and no sales pressure."
        image="/images/v2/final-invitation-clean.webp"
        alt="A welcoming consultation room with a neighborhood view"
        note="The first conversation is for understanding fit and measurement context—not promising a result. Please do not send patient information."
        actions={<V3BriefButton>Open the Growth Brief</V3BriefButton>}
      />

      <section className="v3-spread v3-spread--paper">
        <div className="v3-shell v3-contact-layout">
          <div className="v3-contact-letter">
            <p className="v3-kicker">A practical starting point</p>
            <h2>
              Share just enough context to make the next conversation useful.
            </h2>
            <p>
              The Practice Growth Brief asks for the practice, specialty,
              location, and business challenge you would like to discuss. Please
              do not include patient names, diagnoses, or other health
              information.
            </p>
            <V3BriefButton>Start the three-step brief</V3BriefButton>
            <small>
              No obligation. We will review the information and discuss whether
              the performance model is a practical fit.
            </small>
          </div>
          <address className="v3-contact-notes">
            {contactItems.map(item => {
              const Icon = item.icon;
              return (
                <article key={item.label}>
                  <Icon aria-hidden="true" size={19} />
                  <div>
                    <span>{item.label}</span>
                    {"href" in item ? (
                      <a href={item.href}>{item.value}</a>
                    ) : (
                      <strong>{item.value}</strong>
                    )}
                    <p>{item.note}</p>
                  </div>
                </article>
              );
            })}
          </address>
        </div>
      </section>

      <section className="v3-spread v3-spread--sage">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <p className="v3-kicker">What to expect</p>
            <h2>Three steps, without a long sales process.</h2>
          </div>
          <ol className="v3-expect-list">
            <li>
              <span>01</span>
              <h3>Share the practice context</h3>
              <p>
                Tell us about the specialty, location, goals, and current
                business challenge.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Review the market and path</h3>
              <p>
                We look for the information that will make a next decision more
                useful, including market and competitive context.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Decide whether it fits</h3>
              <p>
                If there is a clear opportunity, we discuss the performance
                model, measurement questions, and next step.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="v3-callout-band v3-callout-band--terracotta">
        <div className="v3-shell">
          <div>
            <p className="v3-kicker v3-kicker--light">Prefer to talk now?</p>
            <h2>Real people. A direct conversation.</h2>
            <p>
              Call during office hours to discuss the practice and whether a
              performance-based relationship makes sense.
            </p>
          </div>
          <a className="v3-button v3-button--paper" href="tel:1-800-362-7767">
            <Phone aria-hidden="true" size={17} /> 1-800-DOC-PROPEL
          </a>
        </div>
      </section>
    </V3Layout>
  );
}
