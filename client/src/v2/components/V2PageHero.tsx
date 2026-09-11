type V2PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  image?: string;
};

export default function V2PageHero({
  eyebrow,
  title,
  lede,
  image = "/images/v2/hero-window-community.webp",
}: V2PageHeroProps) {
  return (
    <section className="v2-page-hero">
      <img
        src={image}
        alt="A warm local healthcare practice and neighborhood setting"
      />
      <div className="v2-shell">
        <div className="v2-eyebrow v2-eyebrow--light">{eyebrow}</div>
        <h1 className="v2-title">{title}</h1>
        <p className="v2-lede v2-lede--light">{lede}</p>
      </div>
    </section>
  );
}
