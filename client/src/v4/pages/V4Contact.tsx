import { ArrowRight, Phone } from "lucide-react";
import V4Layout from "../components/V4Layout";
import V4ReviewDialog from "../components/V4ReviewDialog";
import { V4PageHero, V4SectionHeader } from "../components/V4Primitives";
import { contactDetails } from "../data";

const expectations = [
  [
    "01",
    "Share the practice context",
    "Specialty, location, goals, and the current growth constraint.",
  ],
  [
    "02",
    "Review the market and path",
    "DocPropel looks for the information that makes the next decision useful.",
  ],
  [
    "03",
    "Decide whether it fits",
    "If the opportunity is clear, both sides discuss the performance model and measurement approach.",
  ],
];

export default function V4Contact() {
  return (
    <V4Layout>
      <V4PageHero
        code="CON-00"
        eyebrow="contact DocPropel"
        title="Start with the decision context."
        description="Discuss the practice, market, and patient path you want to improve. The review is structured, non-clinical, and carries no obligation or sales pressure."
        image="/images/v2/final-invitation-clean.webp"
        imageAlt="A consultation room prepared for a practice planning conversation"
        actionLabel="Open the review record"
        secondaryHref="#direct-contact"
        secondaryLabel="View direct contact options"
      />
      <section className="v4-section" id="direct-contact">
        <div className="v4-shell v4-contact-layout">
          <div>
            <V4SectionHeader
              code="CON-01"
              eyebrow="review request"
              title="A useful first conversation starts with the right context."
              description="The Growth Brief asks only for commercial and operational information: practice, specialty, location, and the growth challenge to discuss. Do not submit patient information."
            />
            <div className="v4-action-row">
              <V4ReviewDialog
                trigger={
                  <button
                    type="button"
                    className="v4-button v4-button--primary"
                  >
                    Request a performance model review{" "}
                    <ArrowRight aria-hidden="true" size={16} />
                  </button>
                }
              />
              <a
                href={`tel:${contactDetails.tel}`}
                className="v4-button v4-button--secondary"
              >
                <Phone aria-hidden="true" size={16} /> Call{" "}
                {contactDetails.phone}
              </a>
            </div>
          </div>
          <dl className="v4-contact-records">
            <div>
              <dt>CON-01 / Call</dt>
              <dd>
                <a href={`tel:${contactDetails.tel}`}>{contactDetails.phone}</a>
              </dd>
              <p>
                Tap to call and start a direct conversation about your practice.
              </p>
            </div>
            <div>
              <dt>CON-02 / Email</dt>
              <dd>{contactDetails.email}</dd>
              <p>Use the review form to share the initial context securely.</p>
            </div>
            <div>
              <dt>CON-03 / Office hours</dt>
              <dd>{contactDetails.hours}</dd>
              <p>After-hours inquiries are answered the next business day.</p>
            </div>
          </dl>
        </div>
      </section>
      <section className="v4-section v4-section--void">
        <div className="v4-shell">
          <V4SectionHeader
            code="CON-02"
            eyebrow="what to expect"
            title="A practical, no-pressure starting point."
            description="The conversation is designed to establish context and fit—not manufacture urgency."
          />
          <div className="v4-process-stack">
            {expectations.map(([id, title, text]) => (
              <article key={id}>
                <div className="v4-process-stack-id">
                  <span>{id}</span>
                  <i />
                </div>
                <div>
                  <p className="v4-kicker">Review stage</p>
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
                <span className="v4-status">
                  <i /> bounded scope
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </V4Layout>
  );
}
