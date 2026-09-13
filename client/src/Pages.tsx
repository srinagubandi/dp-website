import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ClipboardCheck,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  UsersRound,
} from "lucide-react";
import type { PublicRoute } from "../../shared/site";
import Layout from "./Layout";
import LeadForm from "./LeadForm";
import Metadata from "./Metadata";
import { useSite } from "./site-context";

function Page({
  route,
  children,
}: {
  route: PublicRoute;
  children: ReactNode;
}) {
  return (
    <Layout>
      <Metadata route={route} />
      {children}
    </Layout>
  );
}
function Enabled({
  route,
  slug,
  children,
}: {
  route: PublicRoute;
  slug: string;
  children: ReactNode;
}) {
  const { sectionEnabled } = useSite();
  return sectionEnabled(route, slug) ? <>{children}</> : null;
}
function Intro({
  route,
  eyebrow,
  fallbackTitle,
  fallbackBody,
}: {
  route: PublicRoute;
  eyebrow: string;
  fallbackTitle: string;
  fallbackBody: string;
}) {
  const { text } = useSite();
  return (
    <Enabled route={route} slug="hero">
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{text(route, "hero", "title", fallbackTitle)}</h1>
          <p className="lede">{text(route, "hero", "body", fallbackBody)}</p>
        </div>
      </section>
    </Enabled>
  );
}
function GrowthBrief({ route }: { route: PublicRoute }) {
  const { text } = useSite();
  return (
    <Enabled route={route} slug="growth-brief">
      <section className="brief-section">
        <div className="container brief-grid">
          <div>
            <p className="eyebrow light">Your practice, in context</p>
            <h2>
              {text(
                route,
                "growth-brief",
                "title",
                "Request a practical Growth Brief."
              )}
            </h2>
            <p>
              {text(
                route,
                "growth-brief",
                "body",
                "Tell us about your practice, market, capacity, and current growth challenge. We’ll review the context without pressure."
              )}
            </p>
            <ul className="check-list">
              <li>
                <Check />
                Healthcare-first review
              </li>
              <li>
                <Check />
                Capacity-aware planning
              </li>
              <li>
                <Check />
                No performance guarantees
              </li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>
    </Enabled>
  );
}
const specialtyCards = [
  [
    "physician",
    "Doctors & physicians",
    "Local access, service-line clarity, and practical pathways from search to inquiry.",
  ],
  [
    "dental",
    "Dental practices",
    "Demand capture for the services a practice is equipped to provide and follow up on.",
  ],
  [
    "pharmacy",
    "Independent pharmacies",
    "Clear service information and local discoverability for community pharmacy options.",
  ],
  [
    "therapy",
    "PT / OT clinics",
    "Referral-aware journeys, insurance and intake clarity, and service-area relevance.",
  ],
  [
    "aba-pediatric",
    "ABA & pediatric clinics",
    "Family trust, referral pathways, intake clarity, service areas, and capacity-aware growth.",
  ],
  [
    "urgent-care",
    "Urgent care",
    "Accurate location, hours, service, and access information for time-sensitive local decisions.",
  ],
];
const services = [
  [
    "Healthcare SEO",
    "Patients may not find accurate, useful local answers when they search for care.",
    "Improve technical foundations, local relevance, service content, and findable patient information.",
    "A clearer search presence and a prioritized view of qualified organic actions.",
  ],
  [
    "Paid Search / PPC",
    "Broad targeting can spend budget on demand the practice cannot serve.",
    "Build intent-focused campaigns around locations, services, scheduling pathways, and capacity.",
    "Transparent campaign activity tied to agreed patient actions—not promised outcomes.",
  ],
  [
    "Conversion-focused websites",
    "Confusing pages, unclear next steps, and poor mobile experiences can interrupt the patient path.",
    "Clarify services, trust information, navigation, forms, and calls to action across devices.",
    "A more usable path that can be measured and improved.",
  ],
  [
    "Reputation management",
    "Incomplete listings and inconsistent review workflows can make comparison harder for patients.",
    "Support accurate profiles, responsible response processes, and sustainable review-request operations.",
    "More consistent public information and a clearer operating process.",
  ],
  [
    "Patient reactivation",
    "Existing relationships can be overlooked when outreach is fragmented or poorly timed.",
    "Plan permission-aware, operationally realistic reminders and re-engagement journeys.",
    "Trackable outreach without making assumptions about clinical need.",
  ],
  [
    "Social media & content",
    "Generic publishing may create activity without answering patient questions.",
    "Develop useful, practice-specific content aligned to patient decisions and approved claims.",
    "A reviewable content system with clear purpose and ownership.",
  ],
  [
    "Growth Brief & market review",
    "It is difficult to prioritize channels without market, capacity, and baseline context.",
    "Review the practice, local demand, constraints, current patient path, and available evidence.",
    "A practical starting view of opportunities, tradeoffs, and next steps.",
  ],
];

export function Home() {
  const route = "/" as const;
  const { text } = useSite();
  return (
    <Page route={route}>
      <Enabled route={route} slug="hero">
        <section className="home-hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">
                {text(
                  route,
                  "hero",
                  "eyebrow",
                  "Performance-based healthcare growth"
                )}
              </p>
              <h1>
                {text(
                  route,
                  "hero",
                  "title",
                  "Stop paying for promises. Pay for patients."
                )}
              </h1>
              <p className="lede">
                {text(
                  route,
                  "hero",
                  "body",
                  "DocPropel helps doctors, dentists, pharmacies, PT/OT, ABA, and pediatric clinics turn local demand into patient opportunities—with a model built for accountability."
                )}
              </p>
              <div className="actions">
                <Link href="/contact" className="button coral">
                  See if your practice is a fit <ArrowRight />
                </Link>
                <Link href="/how-it-works" className="text-link">
                  Explore how the model works <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="/images/hero-doctor-patient-v6.webp"
                alt="A physician listening attentively to a patient in a bright clinical setting"
                width="1200"
                height="1500"
                fetchPriority="high"
              />
              <div className="community-pill">
                <HeartHandshake />
                <span>
                  More informed patient paths.
                  <br />
                  Stronger communities.
                </span>
              </div>
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="pathway">
        <section
          className="home-proof-strip"
          aria-label="DocPropel operating principles"
        >
          <div className="container">
            <div>
              <Stethoscope aria-hidden="true" />
              <span>Healthcare-first</span>
            </div>
            <div>
              <UsersRound aria-hidden="true" />
              <span>Patient-path focus</span>
            </div>
            <div>
              <BarChart3 aria-hidden="true" />
              <span>Evidence-led review</span>
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="pathway">
        <section className="section pathway">
          <div className="container">
            <p className="eyebrow">A clearer path to growth</p>
            <h2>
              {text(
                route,
                "pathway",
                "title",
                "A performance-based model built around your patients."
              )}
            </h2>
            <div className="step-grid">
              {[
                [
                  Target,
                  "01",
                  "Attract",
                  "Reach relevant local demand with focused, responsible marketing.",
                ],
                [
                  UsersRound,
                  "02",
                  "Convert",
                  "Make it easier for people to understand services and take a useful next step.",
                ],
                [
                  BarChart3,
                  "03",
                  "Grow",
                  "Review meaningful actions and improve what the evidence supports.",
                ],
              ].map(([Icon, num, title, body]) => (
                <article className="step-card" key={String(title)}>
                  <div className="step-icon">
                    <Icon />
                  </div>
                  <span>{num as string}</span>
                  <div>
                    <h3>{title as string}</h3>
                    <p>{body as string}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="specialties">
        <section className="section specialties-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Built for your practice</p>
                <h2>Specialized growth for healthcare providers.</h2>
              </div>
              <Link href="/specialties" className="text-link">
                Explore specialties <ArrowRight />
              </Link>
            </div>
            <div className="specialty-grid">
              {specialtyCards.slice(0, 4).map(([slug, title]) => (
                <Link
                  href={`/specialties#${slug}`}
                  className={slug === "aba-pediatric" ? "featured" : ""}
                  key={slug}
                >
                  <Stethoscope />
                  <span>{title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="proof">
        <section className="section">
          <div className="container proof-card">
            <div>
              <p className="eyebrow">Proof, with its context intact</p>
              <h2>
                {text(route, "proof", "title", "Evidence belongs in context.")}
              </h2>
              <p>
                {text(
                  route,
                  "proof",
                  "body",
                  "Before a case study is published, its baseline, timeframe, specialty, service mix, measurement method, and approval are reviewed together. Until that review is complete, this site does not publish performance figures or client claims."
                )}
              </p>
            </div>
            <div className="review-list" aria-label="Evidence review checklist">
              <span>
                <Check />
                Baseline and date range
              </span>
              <span>
                <Check />
                Specialty and service mix
              </span>
              <span>
                <Check />
                Measurement method
              </span>
              <span>
                <Check />
                Client approval
              </span>
            </div>
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
      <Enabled route={route} slug="final-cta">
        <section className="final-cta">
          <div className="container">
            <p className="eyebrow light">A practical first step</p>
            <h2>Build around your practice—not a generic promise.</h2>
            <Link className="button coral" href="/contact">
              Request a Growth Brief <ArrowRight />
            </Link>
          </div>
        </section>
      </Enabled>
    </Page>
  );
}

export function Services() {
  const route = "/services" as const;
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="Services"
        fallbackTitle="One coordinated system for the patient path."
        fallbackBody="Search, paid media, web experience, reputation, reactivation, and content should work together around the needs and capacity of the practice."
      />
      <Enabled route={route} slug="services">
        <section className="section">
          <div className="container service-stack">
            {services.map(([title, problem, work, sees], index) => (
              <article className="service-row" key={title}>
                <span className="service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{title}</h2>
                  <div className="service-details">
                    <div>
                      <h3>Patient problem</h3>
                      <p>{problem}</p>
                    </div>
                    <div>
                      <h3>DocPropel work</h3>
                      <p>{work}</p>
                    </div>
                    <div>
                      <h3>What the practice sees</h3>
                      <p>{sees}</p>
                    </div>
                  </div>
                  <Link href="/contact" className="text-link">
                    Discuss this service <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function Specialties() {
  const route = "/specialties" as const;
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="Specialties"
        fallbackTitle="Healthcare growth shaped by specialty context."
        fallbackBody="Different care settings have different patient questions, referral paths, service areas, and capacity constraints. The plan should reflect them."
      />
      <Enabled route={route} slug="specialties">
        <section className="section">
          <div className="container specialty-details">
            {specialtyCards.map(([slug, title, body], index) => (
              <article id={slug} key={slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{body}</p>
                  <p>
                    Planning starts with the services available, the people the
                    practice can responsibly support, and the information
                    patients and families need to make an informed next step.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function HowItWorks() {
  const route = "/how-it-works" as const;
  const steps = [
    "Understand the practice, market, capacity, and constraints.",
    "Build the channel and patient-path plan.",
    "Launch and measure useful patient actions.",
    "Review performance together.",
    "Improve or scale based on evidence.",
  ];
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="How it works"
        fallbackTitle="A measured path from context to improvement."
        fallbackBody="DocPropel starts with the practice and market, connects channels to useful patient actions, and reviews evidence before recommending what comes next."
      />
      <Enabled route={route} slug="workflow">
        <section className="section">
          <div className="container workflow">
            {steps.map((step, index) => (
              <article key={step}>
                <span>{index + 1}</span>
                <div>
                  <h2>{step}</h2>
                  <p>
                    {
                      [
                        "Define services, audiences, operating realities, current performance, and what the practice can support.",
                        "Prioritize channels and information around real patient questions and a clear path to contact.",
                        "Use agreed signals—such as qualified calls or form inquiries—while preserving source and campaign context.",
                        "Examine what happened, what remains uncertain, and whether operational follow-up affects the picture.",
                        "Change investment only where evidence and practice capacity support the next move.",
                      ][index]
                    }
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="performance-boundary">
        <section className="section mist">
          <div className="container boundary-grid">
            <div>
              <p className="eyebrow">An important boundary</p>
              <h2>What “performance-based” means here.</h2>
            </div>
            <div>
              <p>
                <strong>It means</strong> defining agreed, measurable marketing
                actions and connecting commercial terms to the scope and
                evidence documented in an approved engagement.
              </p>
              <p>
                <strong>It does not mean</strong> a guarantee of patients,
                appointments, revenue, rankings, clinical outcomes, or a fixed
                return. Practices control availability, eligibility, scheduling,
                care decisions, and follow-up.
              </p>
            </div>
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function Results() {
  const route = "/results" as const;
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="Results"
        fallbackTitle="Results should be specific, supported, and reviewable."
        fallbackBody="We do not publish unnamed clients, invented quotes, or isolated numbers without the context needed to understand them."
      />
      <Enabled route={route} slug="evidence">
        <section className="section">
          <div className="container empty-evidence">
            <div className="evidence-icon">
              <ClipboardCheck />
            </div>
            <p className="eyebrow">Case-study library</p>
            <h2>Evidence is reviewed before publishing.</h2>
            <p>
              No case studies are published yet because approved source packages
              are not available in this release. When evidence is approved, each
              card will identify the specialty, baseline, date range, service
              mix, measurement method, and relevant context. Results will remain
              case-specific, not a promise.
            </p>
            <div className="empty-slots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="review-standard">
        <section className="section mist">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Publishing standard</p>
                <h2>What every future case study must answer.</h2>
              </div>
            </div>
            <div className="principle-grid">
              {[
                "What was the baseline?",
                "What dates are included?",
                "Which services were used?",
                "Which patient actions were measured?",
                "What changed outside marketing?",
                "Was the account approved for publication?",
              ].map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function About() {
  const route = "/about" as const;
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="About DocPropel"
        fallbackTitle="Healthcare growth with accountability at the center."
        fallbackBody="DocPropel exists to make marketing decisions clearer for healthcare practices while respecting patient trust and the realities of care delivery."
      />
      <Enabled route={route} slug="mission">
        <section className="section">
          <div className="container split-copy">
            <p className="eyebrow">Our mission</p>
            <h2>
              Make the path between local demand and appropriate care easier to
              understand, measure, and improve.
            </h2>
            <p>
              Healthcare marketing should not begin with a channel or a promise.
              It should begin with what a practice offers, who it can
              responsibly serve, how patients make decisions, and which signals
              can be reviewed honestly.
            </p>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="principles">
        <section className="section mist">
          <div className="container">
            <p className="eyebrow">Accountability principles</p>
            <div className="principle-grid">
              {[
                [
                  Search,
                  "Clarity before activity",
                  "Define the problem and the patient path before selecting tactics.",
                ],
                [
                  BarChart3,
                  "Context before conclusions",
                  "Keep baselines, timeframes, operations, and attribution visible.",
                ],
                [
                  ShieldCheck,
                  "Boundaries before claims",
                  "Use approved, supportable language and never imply clinical outcomes.",
                ],
                [
                  HeartHandshake,
                  "Partnership before pressure",
                  "Make tradeoffs understandable so practices can choose the next step.",
                ],
              ].map(([Icon, title, body]) => (
                <article key={String(title)}>
                  <Icon />
                  <h3>{title as string}</h3>
                  <p>{body as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="patient-trust">
        <section className="section">
          <div className="container boundary-grid">
            <div>
              <p className="eyebrow">Patient trust</p>
              <h2>
                Responsible growth keeps the person—not the metric—in view.
              </h2>
            </div>
            <div>
              <p>
                Public information should help people understand services and
                access options without exploiting fear, overstating fit, or
                replacing clinical guidance. Marketing measurement should not
                require patient or protected health information in a general
                inquiry form.
              </p>
            </div>
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function Team() {
  const route = "/team" as const;
  const { text } = useSite();
  const profiles = [
    {
      key: "profile-1",
      name: "Aurelia Vale",
      role: "Growth strategy",
      image: "/images/team-placeholder-01.webp",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada, arcu quis consequat dignissim, nibh libero posuere sem, vitae posuere enim lectus vel eros.",
    },
    {
      key: "profile-2",
      name: "Marcus Vero",
      role: "Search & paid media",
      image: "/images/team-placeholder-02.webp",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, tellus at efficitur facilisis, velit tellus posuere mi, at pulvinar erat sapien non ligula.",
    },
    {
      key: "profile-3",
      name: "Livia Sera",
      role: "Conversion & web experience",
      image: "/images/team-placeholder-03.webp",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet lectus at mi posuere, nec feugiat ligula posuere. Donec quis faucibus nunc, a rhoncus sem.",
    },
    {
      key: "profile-4",
      name: "Soren Atlas",
      role: "Analytics & performance review",
      image: "/images/team-placeholder-04.webp",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pellentesque, nisl vitae tincidunt faucibus, eros metus volutpat magna, id porttitor libero velit sed est.",
    },
  ];
  const roles = [
    [
      Target,
      "Growth strategy",
      "Connect market opportunity, practice priorities, capacity, and program design.",
    ],
    [
      Search,
      "Search & paid media",
      "Plan discoverability and demand capture around relevant services and intent.",
    ],
    [
      Building2,
      "Conversion & web experience",
      "Create understandable, usable paths from questions to contact.",
    ],
    [
      HeartHandshake,
      "Reputation & lifecycle",
      "Support public trust, follow-up processes, and responsible re-engagement.",
    ],
    [
      BarChart3,
      "Analytics & performance review",
      "Define useful signals, retain context, and interpret evidence cautiously.",
    ],
    [
      UsersRound,
      "Client partnership",
      "Coordinate decisions, approvals, operational feedback, and next steps.",
    ],
  ];
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="Team"
        fallbackTitle="The disciplines behind a coordinated growth program."
        fallbackBody="DocPropel connects strategy, patient-path experience, local demand, and performance review so the practice sees one accountable operating picture."
      />
      <Enabled route={route} slug="profiles">
        <section className="section team-profiles-section">
          <div className="container section-heading">
            <div>
              <p className="eyebrow">Meet the team</p>
              <h2>Placeholder profiles, ready for approved bios.</h2>
            </div>
            <p className="team-placeholder-note">
              Replace names, roles, bios, and image URLs in Admin before public
              launch.
            </p>
          </div>
          <div className="container team-profile-grid">
            {profiles.map(profile => {
              const name = text(
                route,
                "profiles",
                `${profile.key}-name`,
                profile.name
              );
              const role = text(
                route,
                "profiles",
                `${profile.key}-role`,
                profile.role
              );
              const image = text(
                route,
                "profiles",
                `${profile.key}-image`,
                profile.image
              );
              const bio = text(
                route,
                "profiles",
                `${profile.key}-bio`,
                profile.bio
              );
              return (
                <article key={profile.key}>
                  <img
                    src={image}
                    alt={`Placeholder portrait for ${name}`}
                    width="720"
                    height="720"
                    loading="lazy"
                  />
                  <div>
                    <p className="eyebrow">{role}</p>
                    <h3>{name}</h3>
                    <p>{bio}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="roles">
        <section className="section">
          <div className="container team-intro">
            <figure>
              <img
                src="/images/team-collaboration-v6.webp"
                alt="Representative DocPropel collaborators reviewing a growth plan together"
                width="1600"
                height="900"
                loading="lazy"
              />
              <figcaption>
                Representative collaboration image. Named profiles and
                credentials are added only after they are supplied and approved.
              </figcaption>
            </figure>
            <div>
              <p className="eyebrow">One accountable team</p>
              <h2>Every channel should strengthen the same patient path.</h2>
              <p>
                The work is organized around clear ownership, useful evidence,
                and decisions the practice can act on. Each discipline has a
                specific role, but the program is planned and reviewed as one
                system.
              </p>
            </div>
          </div>
          <div className="container role-grid team-role-grid">
            {roles.map(([Icon, title, body], index) => (
              <article key={String(title)}>
                <span className="role-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="step-icon">
                  <Icon />
                </div>
                <h2>{title as string}</h2>
                <p>{body as string}</p>
              </article>
            ))}
          </div>
          <p className="container content-note">
            Named profiles, employment claims, headshots, and credentials will
            be added only after they are supplied and approved.
          </p>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function FAQ() {
  const route = "/faq" as const;
  const questions = [
    [
      "What does performance-based mean at DocPropel?",
      "It means the engagement starts with agreed marketing actions, scope, and evidence. It does not mean a guarantee of patients, appointments, revenue, rankings, or clinical outcomes.",
    ],
    [
      "Which practices are a fit?",
      "DocPropel is designed for doctors and physicians, dental practices, independent pharmacies, PT/OT clinics, ABA and pediatric clinics, and urgent care teams that want their growth plan to reflect real capacity and patient access needs.",
    ],
    [
      "Do you guarantee patient volume or revenue?",
      "No. Patient decisions, clinical eligibility, appointment availability, follow-up, and local competition all affect outcomes. DocPropel reviews the patient path and marketing evidence without presenting promises as certainty.",
    ],
    [
      "What happens in a Growth Brief?",
      "The first review looks at the practice, local market, available capacity, current patient path, and the question you want to solve. The outcome is a practical view of priorities, tradeoffs, and useful next steps.",
    ],
    [
      "How does DocPropel handle patient information?",
      "The public Growth Brief form is for practice and marketing context only. Do not include patient or protected health information. Program measurement should use appropriate, approved systems and processes.",
    ],
    [
      "Can we begin with one service or channel?",
      "Yes. The plan can begin with the constraint that matters most, such as service clarity, local discovery, paid-search waste, website conversion, reputation operations, or reactivation. The broader patient path remains visible as decisions are made.",
    ],
  ];
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="FAQ"
        fallbackTitle="Practical answers before the first conversation."
        fallbackBody="A concise guide to the model, its boundaries, and what a useful first step looks like for a healthcare practice."
      />
      <Enabled route={route} slug="questions">
        <section className="section faq-section">
          <div className="container narrow faq-list">
            {questions.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </Enabled>
      <GrowthBrief route={route} />
    </Page>
  );
}

export function Contact() {
  const route = "/contact" as const;
  const { text } = useSite();
  return (
    <Page route={route}>
      <Enabled route={route} slug="hero">
        <section className="contact-hero">
          <div className="container contact-hero-grid">
            <div>
              <p className="eyebrow">Contact DocPropel</p>
              <h1>
                {text(
                  route,
                  "hero",
                  "title",
                  "A clearer path to your next patient opportunity."
                )}
              </h1>
              <p className="lede">
                {text(
                  route,
                  "hero",
                  "body",
                  "Let’s discuss the practice, the market, your capacity, and the patient path you want to improve."
                )}
              </p>
              <div className="contact-actions">
                <a className="button coral" href="#growth-brief">
                  Request a Growth Brief <ArrowRight />
                </a>
                <a className="button outline" href="tel:+12028412941">
                  <Phone />
                  Call 202 841 2941
                </a>
              </div>
            </div>
            <div className="contact-visual">
              <span>
                <Stethoscope />
              </span>
              <div>
                <strong>Practice context</strong>
                <small>Market · Capacity · Patient path</small>
              </div>
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="contact-channels">
        <section className="contact-channels">
          <div className="container channel-grid">
            <a
              href={`mailto:${text(route, "contact-channels", "email", "steve@docpropel.com")}`}
            >
              <Mail />
              <span>
                <strong>Email</strong>
                {text(
                  route,
                  "contact-channels",
                  "email",
                  "steve@docpropel.com"
                )}
              </span>
            </a>
            <a href="tel:+12028412941">
              <Phone />
              <span>
                <strong>Call</strong>
                {text(route, "contact-channels", "phone", "202 841 2941")}
              </span>
            </a>
            <div>
              <MapPin />
              <span>
                <strong>Hours</strong>
                {text(
                  route,
                  "contact-channels",
                  "hours",
                  "Monday–Friday, 9am–6pm ET"
                )}
              </span>
            </div>
          </div>
        </section>
      </Enabled>
      <Enabled route={route} slug="what-happens-next">
        <section className="section">
          <div className="container next-card">
            <div>
              <p className="eyebrow light">What happens next</p>
              <h2>A simple, no-pressure process.</h2>
            </div>
            <ol>
              <li>
                <span>1</span>
                <div>
                  <h3>Tell us about your practice</h3>
                  <p>
                    Share your priorities, constraints, capacity, and current
                    growth challenge.
                  </p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Review the opportunity</h3>
                  <p>
                    DocPropel considers the market and patient path, then
                    organizes practical questions and options.
                  </p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>Choose the next step</h3>
                  <p>
                    You decide whether any proposed direction makes sense for
                    your practice.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </Enabled>
      <section id="growth-brief" className="section contact-form-section">
        <div className="container contact-form-grid">
          <div>
            <p className="eyebrow">Growth Brief</p>
            <h2>Start with the details that matter.</h2>
            <p>
              Use this general business form for practice-level information
              only. Do not share any patient details.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </Page>
  );
}

const privacySections = [
  [
    "Information this site collects",
    "The Growth Brief form collects your name, work email, practice name, specialty, and any optional phone, location, patient-volume range, message, source page, and campaign parameters you choose to provide. Do not submit patient or protected health information.",
  ],
  [
    "Purpose and use",
    "The draft purpose is to evaluate and respond to business inquiries, maintain inquiry records, improve the inquiry experience, and protect the website from misuse.",
  ],
  [
    "Retention",
    "A final retention period has not been approved. Before launch, legal and operational owners should define documented retention and deletion periods for inquiries and related administrative notes.",
  ],
  [
    "Service providers",
    "Hosting, database, security, email, analytics, or other providers may process data for approved business purposes under appropriate agreements. The final provider list and disclosures require review.",
  ],
  [
    "Cookies and analytics",
    "The application uses a necessary signed admin session cookie. Public analytics or advertising tools are not configured by this v6 code; any future tools require consent and disclosure review before activation.",
  ],
  [
    "Security",
    "Reasonable technical and organizational safeguards are intended, but no internet transmission or storage system can be guaranteed secure. Report concerns using the contact information below.",
  ],
];
const termsSections = [
  [
    "Informational purpose",
    "Website content is general business information about marketing services. It is not medical, legal, compliance, financial, or other professional advice.",
  ],
  [
    "No guarantees",
    "Nothing on this website guarantees patient volume, appointments, revenue, rankings, clinical outcomes, or any specific marketing result. Examples, when approved and published, remain case-specific.",
  ],
  [
    "Permitted use",
    "Use the website lawfully and do not interfere with its security, availability, forms, administration, or other users. Do not submit patient or protected health information through the Growth Brief.",
  ],
  [
    "Intellectual property",
    "The final terms should identify ownership and permitted use of site text, graphics, software, and brand assets. This clause requires legal review before launch.",
  ],
  [
    "Third-party services",
    "Links or service-provider functionality may be subject to separate terms and policies. Their inclusion does not create a guarantee or endorsement beyond an approved agreement.",
  ],
  [
    "Changes and governing terms",
    "Effective dates, change notice, governing law, dispute language, and any limitation provisions must be supplied or approved by counsel before publication as final terms.",
  ],
];
export function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const route = (kind === "privacy" ? "/privacy" : "/terms") as PublicRoute;
  const sections = kind === "privacy" ? privacySections : termsSections;
  return (
    <Page route={route}>
      <Intro
        route={route}
        eyebrow="Draft for legal review"
        fallbackTitle={kind === "privacy" ? "Privacy Notice" : "Website Terms"}
        fallbackBody="This template is provided for legal and operational review. It is not a statement of final policy or legal compliance."
      />
      <Enabled route={route} slug="legal-template">
        <section className="section legal-content">
          <div className="container narrow">
            <div className="legal-warning">
              <ShieldCheck />
              <p>
                <strong>Draft for legal review.</strong> This page must be
                reviewed, completed, and approved by qualified counsel and
                internal owners before release.
              </p>
            </div>
            {sections.map(([title, body]) => (
              <section key={title}>
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            ))}
            <section>
              <h2>Contact</h2>
              <p>
                Questions about this draft may be sent to{" "}
                <a href="mailto:steve@docpropel.com">steve@docpropel.com</a> or
                discussed by calling <a href="tel:+12028412941">202 841 2941</a>
                .
              </p>
            </section>
          </div>
        </section>
      </Enabled>
    </Page>
  );
}
export function NotFound() {
  return (
    <Layout>
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Page not found</p>
          <h1>That path does not lead to a page.</h1>
          <p className="lede">
            Return to the DocPropel home page or request a Growth Brief.
          </p>
          <div className="actions">
            <Link className="button" href="/">
              Return home
            </Link>
            <Link className="text-link" href="/contact">
              Contact DocPropel <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
