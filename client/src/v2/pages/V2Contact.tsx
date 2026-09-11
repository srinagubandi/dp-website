import { ArrowRight, Phone } from "lucide-react";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const contactItems = [
  [
    "Call",
    "1-800-DOC-PROPEL",
    "Tap to call and start a direct conversation about your practice.",
  ],
  [
    "Email",
    "hello@docpropel.com",
    "Use the Growth Brief form to share the initial context securely.",
  ],
  [
    "Office hours",
    "Monday – Friday, 9am – 6pm EST",
    "After-hours inquiries are answered the next business day.",
  ],
];

export default function V2Contact() {
  return (
    <V2Layout>
      <V2PageHero
        eyebrow="Contact DocPropel"
        title="Let's grow your practice with more clarity."
        lede="Ready to discuss the practice, the market, and the patient path you want to improve? Start a conversation without a long sales process or pressure."
        image="/images/v2/final-invitation.webp"
      />
      <section className="v2-section v2-section--cream">
        <div className="v2-shell v2-contact-grid">
          <div>
            <div className="v2-eyebrow">Request a Practice Growth Brief</div>
            <h2 className="v2-title v2-title--section">
              A useful first conversation starts with the right context.
            </h2>
            <p className="v2-lede">
              The original Growth Brief request is preserved in v2. It asks for
              your practice, specialty, location, and the growth challenge you
              would like to discuss.
            </p>
            <div className="v2-action-row">
              <RequestBriefButton />
            </div>
            <div style={{ marginTop: 22 }}>
              <a
                href="tel:1-800-362-7767"
                className="v2-button v2-button--ghost"
              >
                <Phone size={15} /> Call 1-800-DOC-PROPEL
              </a>
            </div>
          </div>
          <div>
            <dl className="v2-contact-list">
              {contactItems.map(([label, value, note]) => (
                <div className="v2-contact-item" key={label}>
                  <dt>{label}</dt>
                  <dd>
                    {label === "Call" ? (
                      <a href="tel:1-800-362-7767">{value}</a>
                    ) : (
                      value
                    )}
                  </dd>
                  <p>{note}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section className="v2-section v2-section--soft">
        <div className="v2-shell">
          <div className="v2-eyebrow">What to expect</div>
          <h2 className="v2-title v2-title--section">
            A practical, no-pressure starting point.
          </h2>
          <div className="v2-steps" style={{ color: "var(--v2-ink)" }}>
            {[
              [
                "01",
                "Share the practice context",
                "Tell us about your specialty, location, goals, and current challenge.",
              ],
              [
                "02",
                "Review the market and path",
                "We look for the information that will make a next decision more useful.",
              ],
              [
                "03",
                "Decide whether it fits",
                "If there is a clear opportunity, we will discuss the performance model and the next step.",
              ],
            ].map(([number, title, copy]) => (
              <article
                className="v2-step"
                style={{ borderTopColor: "rgba(22,56,74,.25)" }}
                key={title}
              >
                <div
                  className="v2-step-index"
                  style={{ color: "var(--v2-river)" }}
                >
                  {number}
                </div>
                <h3>{title}</h3>
                <p style={{ color: "rgba(22,56,74,.75)" }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation.webp"
          alt="A welcoming practice consultation room"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">Ready when you are</div>
          <h2 className="v2-title">
            A conversation about the next patient path.
          </h2>
          <p className="v2-lede v2-lede--light">
            There is no obligation. The goal is simply to understand the
            practice and decide whether a performance-based partnership makes
            sense.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
