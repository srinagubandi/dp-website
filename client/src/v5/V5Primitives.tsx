import { ArrowRight, Check, CircleCheck, MoveDown } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "wouter";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="v5-eyebrow">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`v5-section-head v5-section-head--${align}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </header>
  );
}

export function MagneticLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    ref.current.style.setProperty("--v5-magnetic-x", `${x}px`);
    ref.current.style.setProperty("--v5-magnetic-y", `${y}px`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--v5-magnetic-x", "0px");
    ref.current?.style.setProperty("--v5-magnetic-y", "0px");
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`v5-button v5-magnetic ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}

const particles = [
  [18, 25],
  [27, 67],
  [42, 18],
  [52, 76],
  [65, 31],
  [77, 63],
  [84, 22],
  [35, 46],
  [68, 54],
];

export function DataLens({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`v5-lens ${compact ? "v5-lens--compact" : ""}`}
      aria-labelledby="v5-lens-caption"
    >
      <div className="v5-lens__surface">
        <div className="v5-lens__grid" aria-hidden="true" />
        <div className="v5-lens__particles" aria-hidden="true">
          {particles.map(([left, top], index) => (
            <i
              key={`${left}-${top}`}
              style={
                {
                  "--particle-x": `${left}%`,
                  "--particle-y": `${top}%`,
                  "--particle-delay": `${index * -0.42}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="v5-lens__route" aria-hidden="true">
          <span className="v5-lens__node v5-lens__node--one" />
          <span className="v5-lens__node v5-lens__node--two" />
          <span className="v5-lens__node v5-lens__node--three" />
          <svg viewBox="0 0 800 300" preserveAspectRatio="none">
            <path d="M22 216 C180 214 195 94 352 126 S592 274 778 83" />
            <path d="M22 253 C190 252 282 204 394 209 S603 126 778 154" />
          </svg>
        </div>
        <div className="v5-lens__readout v5-lens__readout--a">
          <span>01</span>
          <strong>Local demand</strong>
          <small>Understand the context</small>
        </div>
        <div className="v5-lens__readout v5-lens__readout--b">
          <span>02</span>
          <strong>Clear pathway</strong>
          <small>Connect the next action</small>
        </div>
        <div className="v5-lens__readout v5-lens__readout--c">
          <CircleCheck size={16} aria-hidden="true" />
          <strong>Shared view</strong>
        </div>
      </div>
      <figcaption id="v5-lens-caption">
        <span>Conceptual patient-path lens</span>
        <span>Illustration only · not live practice data</span>
      </figcaption>
    </figure>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  index,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  index: string;
}) {
  return (
    <section className="v5-page-hero">
      <div className="v5-shell v5-page-hero__grid">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
        </div>
        <div className="v5-page-hero__aside">
          <span className="v5-page-index" aria-hidden="true">
            {index}
          </span>
          <p>{lede}</p>
          <a className="v5-method-link" href="#page-content">
            Read the method <MoveDown aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="v5-check-list">
      {items.map(item => (
        <li key={item}>
          <Check aria-hidden="true" size={15} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FinalCallout({
  eyebrow = "A useful next step",
  title = "Start with a clearer growth conversation.",
  copy = "Tell us about the practice, market, and patient path you want to improve. There is no obligation and no sales pressure.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="v5-final-callout">
      <div className="v5-shell v5-final-callout__inner">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{copy}</p>
          <div className="v5-inline-actions">
            <Link href="/v5/contact" className="v5-button v5-button--light">
              Request a Growth Brief <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              href="/v5/how-it-works"
              className="v5-text-link v5-text-link--light"
            >
              Review the method
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DisclosureNote({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="v5-disclosure">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        {open ? "Hide context" : "Read context"}
      </button>
      {open ? <p>{children}</p> : null}
    </div>
  );
}
