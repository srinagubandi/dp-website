import {
  ArrowRight,
  Check,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2GrowthCalculator from "../components/V2GrowthCalculator";

const specialties = [
  {
    name: "Doctors & physicians",
    detail: "Primary care, specialists, urgent care",
  },
  {
    name: "Dental practices",
    detail: "General, cosmetic, orthodontic, oral surgery",
  },
  {
    name: "Independent pharmacies",
    detail: "Community access, compounding, specialty care",
  },
  {
    name: "PT / OT clinics",
    detail: "Timely pathways, rehabilitation, pediatrics",
  },
];

const services = [
  ["01", "Healthcare SEO", "Be present when local care intent is highest."],
  [
    "02",
    "Paid search & PPC",
    "Test and refine acquisition channels with clear inputs.",
  ],
  [
    "03",
    "AI-powered website",
    "Give patients a fast, credible path to take action.",
  ],
  [
    "04",
    "Reputation management",
    "Make the proof patients seek easier to find.",
  ],
  [
    "05",
    "Patient reactivation",
    "Reconnect with people who already know your practice.",
  ],
  [
    "06",
    "Digital Growth Brief",
    "Start with an insight-led review of your market.",
  ],
];

const comparison = [
  ["Pricing model", "Performance-based", "Fixed retainer"],
  ["Technology", "AI-driven optimization", "Manual reporting"],
  ["Financial risk", "Shared risk", "100% on you"],
  ["Contract terms", "Flexible, no lock-in", "12–24 month lock-in"],
  ["Incentives", "Aligned with growth", "Paid regardless"],
];

export default function V2Home() {
  return (
    <V2Layout>
      <section className="v2-hero">
        <img
          className="v2-hero-media"
          src="/images/v2/hero-window-community.webp"
          alt="A calm practice interior looking toward a tree-lined neighborhood"
        />
        <div className="v2-hero-shade" />
        <div className="v2-hero-content">
          <div className="v2-shell">
            <div className="v2-hero-copy">
              <div className="v2-eyebrow v2-eyebrow--light">
                Performance-based healthcare growth
              </div>
              <h1 className="v2-title">
                Stop paying for promises. Pay for patients.
              </h1>
              <p className="v2-lede v2-lede--light">
                DocPropel helps doctors, dentists, pharmacies, and PT/OT clinics
                turn local demand into patient opportunities—with a
                performance-based model built for accountable growth.
              </p>
              <div className="v2-action-row">
                <RequestBriefButton />
                <Link
                  href="/v2/how-it-works"
                  className="v2-button v2-button--light"
                >
                  See how it works <ArrowRight size={15} strokeWidth={1.7} />
                </Link>
              </div>
              <div
                className="v2-trust-row"
                aria-label="DocPropel model highlights"
              >
                <span>No long-term lock-ins</span>
                <span>Healthcare-first approach</span>
                <span>Built around local care</span>
              </div>
            </div>
          </div>
        </div>
        <div className="v2-route" aria-hidden="true">
          <span>Local demand</span>
          <div className="v2-route-line" />
          <span>Patient opportunity</span>
        </div>
      </section>

      <section className="v2-section v2-section--cream">
        <div className="v2-shell">
          <div className="v2-eyebrow">Built for healthcare professionals</div>
          <h2 className="v2-title v2-title--section">
            A growth model that understands the practice behind the plan.
          </h2>
          <p className="v2-lede">
            We specialize in patient growth for practices that value outcomes
            over activity, with a tailored approach for the realities of each
            care setting.
          </p>
          <div className="v2-specialties">
            {specialties.map((specialty, index) => (
              <article className="v2-specialty" key={specialty.name}>
                <div className="v2-specialty-index">0{index + 1}</div>
                <h3>{specialty.name}</h3>
                <p>{specialty.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-photo-story v2-section--ink">
        <div className="v2-photo-story-copy">
          <div className="v2-eyebrow v2-eyebrow--light">
            The first impression
          </div>
          <h2 className="v2-photo-story-title">
            Be present when care becomes a priority.
          </h2>
          <p className="v2-copy v2-copy--light">
            Generic ads and black-box reporting can separate a practice from the
            people already looking for help. We begin by identifying the
            channels and messages that match how patients seek care in your
            local market.
          </p>
        </div>
        <div className="v2-photo-story-media">
          <img
            src="/images/v2/first-impression-clean.webp"
            alt="A neighborhood practice at golden hour"
          />
        </div>
      </section>

      <section className="v2-quote-band">
        <div className="v2-shell">
          <p>
            Not a generic marketing package—<strong>a shared system</strong> for
            making patient pathways easier to find and act on.
          </p>
        </div>
      </section>

      <section className="v2-photo-story v2-photo-story--reverse v2-section--paper">
        <div className="v2-photo-story-copy">
          <div className="v2-eyebrow">The patient pathway</div>
          <h2 className="v2-photo-story-title">
            Turn attention into an action someone can take.
          </h2>
          <p className="v2-copy">
            From the first click through an inquiry or appointment request,
            DocPropel focuses on the small decisions that make the next step
            feel clear, credible, and timely.
          </p>
          <div className="v2-action-row">
            <Link
              href="/v2/how-it-works"
              className="v2-button v2-button--ghost"
            >
              Follow the operating model <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="v2-photo-story-media">
          <img
            src="/images/v2/patient-pathway-clean.webp"
            alt="A calm practice reception path"
          />
        </div>
      </section>

      <section className="v2-section v2-section--soft">
        <div className="v2-shell">
          <div className="v2-eyebrow">Simple process</div>
          <h2 className="v2-title v2-title--section">
            Simple. Transparent. Aligned.
          </h2>
          <p className="v2-lede">
            We review the current practice presence, local demand, and growth
            potential, then work around the decisions that keep a patient path
            moving.
          </p>
          <div className="v2-steps" style={{ color: "var(--v2-ink)" }}>
            {[
              {
                title: "Deploy & optimize",
                text: "Deploy and continuously improve the right mix of channels for your specialty and geography.",
              },
              {
                title: "Deliver patients",
                text: "Focus on qualified inquiries and booked appointments, with outcome-focused reporting.",
              },
              {
                title: "Pay for performance",
                text: "Pay when patients are delivered—not for activity, vanity metrics, or a long lock-in.",
              },
            ].map((step, index) => (
              <article
                className="v2-step"
                style={{ borderTopColor: "rgba(22,56,74,.25)" }}
                key={step.title}
              >
                <div
                  className="v2-step-index"
                  style={{ color: "var(--v2-river)" }}
                >
                  0{index + 1}
                </div>
                <h3>{step.title}</h3>
                <p style={{ color: "rgba(22,56,74,.75)" }}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-section--cream">
        <div className="v2-shell">
          <div className="v2-eyebrow">One connected system</div>
          <h2 className="v2-title v2-title--section">
            The work behind a clearer patient path.
          </h2>
          <p className="v2-lede">
            You do not need multiple vendors or a stack of competing reports.
            The original DocPropel service set is retained here as one
            coordinated performance model.
          </p>
          <div className="v2-service-list">
            {services.map(([number, title, copy]) => (
              <article className="v2-service" key={title}>
                <div className="v2-service-number">{number}</div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="v2-action-row">
            <Link href="/v2/services" className="v2-button">
              Explore services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="v2-photo-story v2-section--paper">
        <div className="v2-photo-story-copy">
          <div className="v2-eyebrow">Accountability in daylight</div>
          <h2 className="v2-photo-story-title">
            See what is working. Decide what comes next.
          </h2>
          <p className="v2-copy">
            The performance model is designed to align the practice and
            DocPropel around a shared view of patient opportunity—not
            surface-level activity.
          </p>
        </div>
        <div className="v2-photo-story-media">
          <img
            src="/images/v2/accountability-clean.webp"
            alt="A practice planning table in warm daylight"
          />
        </div>
      </section>

      <section className="v2-section v2-section--cream">
        <div className="v2-shell v2-comparison">
          <div>
            <div className="v2-eyebrow">Why performance</div>
            <h2 className="v2-title v2-title--section">
              Misaligned incentives are the problem.
            </h2>
            <p className="v2-lede">
              Most agencies are paid regardless of results. That places the risk
              on the practice and removes accountability. DocPropel's model is
              designed to share risk and align the work around patient growth.
            </p>
            <div className="v2-action-row">
              <Link href="/v2/compare" className="v2-button v2-button--ghost">
                Compare the models <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div
            className="v2-table"
            role="table"
            aria-label="DocPropel comparison"
          >
            <div className="v2-table-row v2-table-label" role="row">
              <span>Feature</span>
              <span>DocPropel</span>
              <span>Traditional agency</span>
            </div>
            {comparison.map(([feature, us, them]) => (
              <div className="v2-table-row" role="row" key={feature}>
                <span>{feature}</span>
                <span>
                  <Check
                    size={14}
                    style={{ display: "inline", marginRight: 6 }}
                  />
                  {us}
                </span>
                <span>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-section--soft">
        <div className="v2-shell">
          <div className="v2-eyebrow">Growth calculator</div>
          <h2 className="v2-title v2-title--section">
            Explore your practice's growth potential.
          </h2>
          <p className="v2-lede">
            The original interactive calculator remains available in the v2
            experience. Its outputs are illustrative only and should be
            evaluated against your practice context.
          </p>
          <div className="v2-calculator-wrap">
            <V2GrowthCalculator />
          </div>
        </div>
      </section>

      <section className="v2-final">
        <img
          src="/images/v2/final-invitation-clean.webp"
          alt="A calm consultation room looking out to the neighborhood at sunset"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">
            The next conversation
          </div>
          <h2 className="v2-title">
            Start with a clearer growth conversation.
          </h2>
          <p className="v2-lede v2-lede--light">
            Tell us about your practice, your market, and the patient path you
            want to improve. There is no obligation and no sales pressure.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
