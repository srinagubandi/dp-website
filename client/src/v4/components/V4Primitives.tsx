import { ArrowDown, ArrowRight, CircleCheck, Minus } from "lucide-react";
import { Link } from "wouter";
import V4ReviewDialog from "./V4ReviewDialog";

export function V4PageHero({
  code,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  actionLabel = "Request a performance model review",
  secondaryHref,
  secondaryLabel,
}: {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="v4-page-hero" aria-labelledby={`${code}-title`}>
      <div className="v4-shell v4-page-hero-grid">
        <div className="v4-page-hero-copy">
          <p className="v4-kicker">
            <span>{code}</span> {eyebrow}
          </p>
          <h1 id={`${code}-title`}>{title}</h1>
          <p className="v4-page-lede">{description}</p>
          <div className="v4-action-row">
            <V4ReviewDialog
              trigger={
                <button type="button" className="v4-button v4-button--primary">
                  {actionLabel} <ArrowRight aria-hidden="true" size={16} />
                </button>
              }
            />
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="v4-text-link">
                {secondaryLabel} <ArrowRight aria-hidden="true" size={15} />
              </Link>
            ) : null}
          </div>
          <p className="v4-trust-note">
            <CircleCheck aria-hidden="true" size={15} /> Structured fit review ·
            no patient information · no outcome promise
          </p>
        </div>
        {image ? (
          <figure className="v4-bounded-media">
            <img src={image} alt={imageAlt ?? ""} />
            <figcaption>
              <span>Static signal / no live data</span>
              <span>Defined measurement. Shared review.</span>
            </figcaption>
          </figure>
        ) : (
          <SignalPanel compact />
        )}
      </div>
    </section>
  );
}

export function SignalPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`v4-signal-panel${compact ? " v4-signal-panel--compact" : ""}`}
    >
      <div className="v4-signal-head">
        <span>Measurement field / illustrative</span>
        <span className="v4-status">
          <i /> ready for review
        </span>
      </div>
      <div className="v4-signal-plot" aria-hidden="true">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label="Abstract measurement path"
        >
          <defs>
            <linearGradient
              id={`v4Signal${compact ? "Compact" : "Full"}`}
              x1="0"
              x2="1"
            >
              <stop offset="0" stopColor="#61f2ae" stopOpacity="0" />
              <stop offset=".32" stopColor="#61f2ae" stopOpacity=".72" />
              <stop offset="1" stopColor="#61f2ae" />
            </linearGradient>
          </defs>
          <path
            className="v4-signal-guide"
            d="M0 326H720M0 220H720M0 114H720M178 0V420M360 0V420M542 0V420"
          />
          <path
            className="v4-signal-path"
            d="M20 332C84 326 92 292 140 288C212 282 205 220 278 222C341 223 362 270 423 245C484 220 471 142 537 154C592 164 619 101 700 77"
            stroke={`url(#v4Signal${compact ? "Compact" : "Full"})`}
          />
          <circle cx="140" cy="288" r="7" />
          <circle cx="278" cy="222" r="7" />
          <circle cx="423" cy="245" r="7" />
          <circle cx="537" cy="154" r="7" />
          <circle cx="700" cy="77" r="7" />
        </svg>
        <div className="v4-signal-label v4-signal-label--one">
          <small>01</small>
          <strong>Baseline</strong>
        </div>
        <div className="v4-signal-label v4-signal-label--two">
          <small>02</small>
          <strong>Patient path</strong>
        </div>
        <div className="v4-signal-label v4-signal-label--three">
          <small>03</small>
          <strong>Shared review</strong>
        </div>
      </div>
      <div className="v4-signal-foot">
        <span>Scope / local practice growth</span>
        <span>Record / inputs before outcomes</span>
      </div>
    </div>
  );
}

export function V4SectionHeader({
  code,
  eyebrow,
  title,
  description,
}: {
  code: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="v4-section-head">
      <p className="v4-kicker">
        <span>{code}</span> {eyebrow}
      </p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

export function MeasurementCharter() {
  const rows = [
    [
      "01",
      "Define",
      "Practice context, local demand, channel scope",
      "Practice + DocPropel",
    ],
    [
      "02",
      "Observe",
      "Spend, activity, inquiries, booked appointments",
      "Shared view",
    ],
    [
      "03",
      "Review",
      "Movement, constraints, and the next decision",
      "Agreed cadence",
    ],
    [
      "04",
      "Bound",
      "No fabricated live metrics and no guaranteed outcome",
      "Documented",
    ],
  ];

  return (
    <div className="v4-charter" role="table" aria-label="Measurement charter">
      <div className="v4-charter-row v4-charter-label" role="row">
        <span>ID</span>
        <span>Review point</span>
        <span>Definition</span>
        <span>Owner</span>
      </div>
      {rows.map(([id, point, definition, owner]) => (
        <div className="v4-charter-row" role="row" key={id} tabIndex={0}>
          <span>{id}</span>
          <strong>{point}</strong>
          <span>{definition}</span>
          <span>{owner}</span>
        </div>
      ))}
    </div>
  );
}

export function V4ConversionBand({
  code = "ACTION-01",
  title,
  text,
}: {
  code?: string;
  title: string;
  text: string;
}) {
  return (
    <section className="v4-conversion-band">
      <div className="v4-shell v4-conversion-grid">
        <p className="v4-kicker">
          <span>{code}</span> next decision
        </p>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <V4ReviewDialog
          trigger={
            <button type="button" className="v4-button v4-button--primary">
              Request a performance model review{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </button>
          }
        />
      </div>
    </section>
  );
}

export function FlowMarker() {
  return (
    <div className="v4-flow-marker" aria-hidden="true">
      <Minus />
      <span>inspect the record</span>
      <ArrowDown />
    </div>
  );
}
