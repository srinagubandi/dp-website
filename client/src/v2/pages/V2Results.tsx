import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import V2Layout, { RequestBriefButton } from "../components/V2Layout";
import V2PageHero from "../components/V2PageHero";

const caseStudies = [
  [
    "Dentists",
    "Scaling a Multi-Location Dental Group",
    "+145%",
    "New Patient Volume",
    "How we helped a 3-location dental group dominate local search and fill their hygiene schedules with high-value patients.",
    ["SEO", "PPC", "Reputation"],
  ],
  [
    "Doctors",
    "Primary Care Practice Growth",
    "+87%",
    "Monthly New Patients",
    "A family medicine practice struggling with patient acquisition transformed their digital presence and filled their panel in 6 months.",
    ["Local SEO", "Google Ads", "Website"],
  ],
  [
    "Pharmacies",
    "Independent Pharmacy Turnaround",
    "+210%",
    "Prescription Transfers",
    "Competing against big chains seemed impossible until we implemented hyper-local targeting and community engagement campaigns.",
    ["Social Media", "Local SEO", "Reputation"],
  ],
  [
    "PT / OT",
    "Physical Therapy Clinic Expansion",
    "+165%",
    "Patient Referrals",
    "A single-location PT clinic grew to 3 locations by building physician referral networks and capturing direct-access patients online.",
    ["Content Marketing", "PPC", "Referral Program"],
  ],
  [
    "Dentists",
    "Cosmetic Dentistry Revenue Boost",
    "+$1.8M",
    "Annual Revenue",
    "Shifting focus from general dentistry to high-value cosmetic procedures through targeted campaigns and patient education content.",
    ["Video Marketing", "PPC", "Website Design"],
  ],
  [
    "Doctors",
    "Urgent Care Volume Surge",
    "+210%",
    "Online Bookings",
    "Implementing AI-driven intake and real-time wait times to capture patient demand during peak flu season and beyond.",
    ["AI Chatbot", "Local SEO", "Web Design"],
  ],
] as const;

const stats = [
  ["500+", "Practices served"],
  ["$50M+", "Revenue generated"],
  ["32%", "Average growth rate"],
  ["4.9 / 5", "Client satisfaction"],
] as const;

export default function V2Results() {
  const { data: testimonials, isLoading } =
    trpc.testimonials.getVisible.useQuery();

  return (
    <V2Layout>
      <V2PageHero
        eyebrow="Results & case studies"
        title="Real growth. Real numbers."
        lede="The original DocPropel results content is retained here in the Patient Journey system, organized around the practice stories and outcome measures behind each example."
        image="/images/v2/first-impression-clean.webp"
      />
      {isLoading ? (
        <section className="v2-section v2-section--soft">
          <div className="v2-shell">
            <p className="v2-copy">Loading client stories…</p>
          </div>
        </section>
      ) : testimonials && testimonials.length > 0 ? (
        <section className="v2-section v2-section--cream">
          <div className="v2-shell">
            <div className="v2-eyebrow">Client voices</div>
            <h2 className="v2-title v2-title--section">
              What our clients say.
            </h2>
            <div className="v2-results-grid">
              {testimonials.map(testimonial => (
                <article className="v2-result-story" key={testimonial.id}>
                  <Quote size={24} />
                  <p>{testimonial.quote}</p>
                  <div>
                    <strong>{testimonial.clientName}</strong>
                    {testimonial.practiceName ? (
                      <span>{testimonial.practiceName}</span>
                    ) : null}
                    {testimonial.location ? (
                      <span>{testimonial.location}</span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="v2-section v2-section--cream">
        <div className="v2-shell">
          <div className="v2-eyebrow">Case studies</div>
          <h2 className="v2-title v2-title--section">
            The original work, told with more room to read.
          </h2>
          <p className="v2-lede">
            Each case study below preserves the original subject, headline
            metric, and service mix. Outcomes are case-specific and not a
            promise of future performance.
          </p>
          <div className="v2-results-grid">
            {caseStudies.map(
              ([specialty, title, metric, metricLabel, copy, tags], index) => (
                <article className="v2-result-story" key={title}>
                  <div className="v2-result-kicker">
                    0{index + 1} / {specialty}
                  </div>
                  <div className="v2-result-metric">
                    {metric}
                    <span>{metricLabel}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className="v2-result-tags">
                    {tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>
      <section className="v2-section v2-section--soft">
        <div className="v2-shell">
          <div className="v2-eyebrow">At a glance</div>
          <h2 className="v2-title v2-title--section">
            A track record shaped by healthcare practices.
          </h2>
          <div className="v2-specialties">
            {stats.map(([value, label], index) => (
              <article className="v2-specialty" key={label}>
                <div className="v2-specialty-index">0{index + 1}</div>
                <h3>{value}</h3>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="v2-final">
        <img
          src="/images/v2/final-invitation-clean.webp"
          alt="A calm practice room at twilight"
        />
        <div className="v2-shell">
          <div className="v2-eyebrow v2-eyebrow--light">The next story</div>
          <h2 className="v2-title">
            Explore what a performance-based model could mean for your practice.
          </h2>
          <p className="v2-lede v2-lede--light">
            Begin with a Growth Brief, then decide whether there is a clear
            opportunity to work together.
          </p>
          <div className="v2-action-row">
            <RequestBriefButton />
            <Link href="/v2/contact" className="v2-button v2-button--light">
              Contact DocPropel <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </V2Layout>
  );
}
