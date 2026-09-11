import { type ReactNode } from "react";

export default function V3PageHero({
  kicker,
  title,
  lede,
  image,
  alt,
  note,
  actions,
}: {
  kicker: string;
  title: string;
  lede: string;
  image: string;
  alt: string;
  note: string;
  actions?: ReactNode;
}) {
  return (
    <section className="v3-page-hero">
      <div className="v3-shell v3-page-hero-grid">
        <div className="v3-page-hero-copy">
          <p className="v3-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="v3-lede">{lede}</p>
          {actions ? <div className="v3-action-row">{actions}</div> : null}
        </div>
        <figure className="v3-page-hero-figure">
          <img src={image} alt={alt} />
          <figcaption>
            <span>Guide note</span>
            {note}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
