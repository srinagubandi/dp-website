/**
 * =============================================================================
 * HOME.TSX - DocPropel Homepage
 * =============================================================================
 *
 * Design: Dark premium theme inspired by PropelDental.
 * - Left-aligned hero with large bold headline
 * - Card-based grid sections with subtle border hover effects
 * - Consistent border-t separators between sections
 * - Generous padding (py-20 md:py-28)
 * - Orange (primary) used sparingly for CTAs, icons, highlights
 * - Blue (secondary) used for badges, links, secondary CTAs
 *
 * SECTIONS:
 *   1. Hero
 *   2. Specialties We Serve
 *   3. AI Advantage (Pain Points / Why DocPropel)
 *   4. How It Works (3-step process)
 *   5. Services Overview
 *   6. Comparison Table
 *   7. ROI Calculator
 *   8. Final CTA
 *
 * =============================================================================
 */

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Check,
  Zap,
  Shield,
  Users,
  Target,
  Eye,
  TrendingUp,
  Phone,
} from "lucide-react";
import IntakeForm from "@/components/IntakeForm";
import ROICalculator from "@/components/ROICalculator";

// Reusable CDN icon image component
const IconImage = ({ src, alt, size = 48 }: { src: string; alt: string; size?: number }) => (
  <img src={src} alt={alt} className="object-contain" style={{ width: size, height: size }} />
);

// CDN URLs for specialty and service icons (uploaded to Manus CDN)
const ICONS = {
  doctors:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/hgeCYmgWdFOTQFeJ.png",
  dentists:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/xUduvXxBKpcYHKDu.png",
  pharmacy:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/IPUuYqwwRkEoslEe.png",
  ptot:       "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/vTEcNtMTylllVefa.png",
  ai:         "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/qANZOjHlFCcayAsG.png",
  chatbot:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/fkeHVnQjUJXtKRvn.png",
  reactivate: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/WBhDloOVGpaxRdbW.png",
  deploy:     "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/woFUFmSxhgHLUyTo.png",
  deliver:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/EtYMzJocxPYxMecb.png",
  reputation: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/qMFufdufqNeqWknO.png",
  social:     "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/iTgceqtSLqLOWeyy.png",
};

export default function Home() {
  return (
    <Layout>

      {/* ===================================================================
          1. HERO SECTION
          Left-aligned, large bold headline — PropelDental style.
          Gradient orb in top-right for depth.
      =================================================================== */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
        {/* Decorative glow orb */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container relative z-10 py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Performance-Based Healthcare Marketing
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Stop Paying for{" "}
              <span className="text-primary">Promises.</span>{" "}
              Pay for Patients.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              DocPropel is the only performance-based growth partner for healthcare practices.
              We grow your patient base for{" "}
              <strong className="text-foreground">Doctors, Dentists, Pharmacies, and PT/OT Clinics</strong>.
              You only pay when we deliver — no retainers, no lock-ins.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <IntakeForm
                trigger={
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 px-8 text-lg"
                  >
                    Request a Practice Growth Brief <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                }
              />
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted/50 h-14 px-8 text-lg font-semibold"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> HIPAA Compliant
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> No Long-Term Contracts
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Pay for Results Only
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> All 50 States
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. SPECIALTIES WE SERVE
          4-column card grid with specialty icons and sub-specialties.
      =================================================================== */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container">
          {/* Section header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for Healthcare Professionals
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We specialize in growing patient volume for practices that value results over promises.
              Our AI-powered platform is tailored for each specialty.
            </p>
          </div>

          {/* Specialty cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ICONS.doctors,
                title: "Doctors & Physicians",
                items: ["Primary Care", "Internal Medicine", "Specialists", "Urgent Care"],
              },
              {
                icon: ICONS.dentists,
                title: "Dentists",
                items: ["General Dentistry", "Cosmetic", "Orthodontics", "Oral Surgery"],
              },
              {
                icon: ICONS.pharmacy,
                title: "Pharmacies",
                items: ["Independent", "Compounding", "Specialty", "Retail"],
              },
              {
                icon: ICONS.ptot,
                title: "Physical Therapy / OT",
                items: ["Physical Therapy", "Occupational Therapy", "Sports Rehab", "Pediatric"],
              },
            ].map((specialty, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors group"
              >
                <IconImage src={specialty.icon} alt={specialty.title} size={52} />
                <h3 className="text-lg font-semibold mt-4 mb-3 group-hover:text-primary transition-colors">
                  {specialty.title}
                </h3>
                <ul className="space-y-2">
                  {specialty.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. AI ADVANTAGE / WHY DOCPROPEL
          3-column pain-point cards — mirrors PropelDental's "No More..." section.
      =================================================================== */}
      <section className="py-20 md:py-28 border-t border-border bg-card">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Powered by Medical AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tired of Marketing That Doesn't Deliver?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've heard the same frustrations from practices across the country. Generic ads,
              agencies that churn clients, and black-box reporting that hides where your money goes.
              DocPropel was built to be the opposite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ICONS.ai,
                title: "Zero Wasted Ad Spend",
                desc: "Predictive algorithms optimize your budget in real-time, ensuring every dollar targets patients actively seeking care. No more paying for clicks that don't convert.",
              },
              {
                icon: ICONS.chatbot,
                title: "24/7 Patient Capture",
                desc: "HIPAA-compliant systems engage visitors instantly—even while you sleep—converting website traffic into booked appointments without adding staff.",
              },
              {
                icon: ICONS.reactivate,
                title: "Automated Reactivation",
                desc: "Smart campaigns identify and re-engage dormant patients automatically, filling your schedule without you lifting a finger.",
              },
              {
                icon: ICONS.reputation,
                title: "No More Black Box",
                desc: "Full visibility into every dollar spent, every lead generated, and every strategy decision. You'll always know exactly what's happening and why.",
              },
              {
                icon: ICONS.social,
                title: "No More Generic Ads",
                desc: "Every asset we create is built around your practice voice, your team, and your competitive advantages — not a template with your logo slapped on it.",
              },
              {
                icon: ICONS.deploy,
                title: "No More Misaligned Incentives",
                desc: "Traditional agencies are paid regardless of results. Our performance model shares risk and aligns incentives around patient growth — we only win when you win.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors group"
              >
                <IconImage src={item.icon} alt={item.title} size={48} />
                <h3 className="text-lg font-semibold mt-4 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. HOW IT WORKS — 3-step timeline
          Left-border timeline style from PropelDental.
      =================================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                Simple Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Simple. Transparent. Aligned.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our goal is to make growth predictable and accountable. We begin with a review
                of your practice's current online presence, market demand, and growth potential.
              </p>
              <IntakeForm
                trigger={
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Request a Practice Growth Brief <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                }
              />
            </div>

            {/* Right: timeline steps */}
            <div className="space-y-8">
              {[
                {
                  step: "Step 01",
                  title: "Deploy & Optimize",
                  desc: "We deploy and continuously optimize the right mix of channels based on your specialty and geography.",
                  icon: ICONS.deploy,
                },
                {
                  step: "Step 02",
                  title: "Deliver Patients",
                  desc: "We focus on delivering qualified patient inquiries and booked appointments. Reporting is real-time and outcome-focused.",
                  icon: ICONS.deliver,
                },
                {
                  step: "Step 03",
                  title: "Pay for Performance",
                  desc: "You pay when patients are delivered, not for activity. No vanity metrics, long contracts, or lock-ins.",
                  icon: ICONS.reactivate,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px]" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SERVICES OVERVIEW
          6-card grid — matches PropelDental's services section style.
      =================================================================== */}
      <section id="services" className="py-20 md:py-28 border-t border-border bg-card">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              One Growth System. Predictable Results.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You don't need multiple vendors or complex contracts. We manage your entire
              digital growth ecosystem under one performance-based model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ICONS.ai,
                title: "Healthcare SEO",
                desc: "We ensure you appear exactly where patients are actively searching for care in your local market.",
              },
              {
                icon: ICONS.reactivate,
                title: "Paid Search & PPC",
                desc: "Create immediate demand and convert intent into booked appointments, not just traffic.",
              },
              {
                icon: ICONS.chatbot,
                title: "AI-Powered Website",
                desc: "Built for trust, compliance, and conversion rather than just aesthetics.",
              },
              {
                icon: ICONS.reputation,
                title: "Reputation Management",
                desc: "Systematically build social proof that works continuously to attract new patients.",
              },
              {
                icon: ICONS.social,
                title: "Social Media & Content",
                desc: "Reinforce credibility, authority, and stay top of mind in your community.",
              },
              {
                icon: ICONS.deliver,
                title: "Digital Growth Brief",
                desc: "A supportive, insight-led review of your digital ecosystem and growth opportunities.",
                cta: true,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors group"
              >
                <IconImage src={service.icon} alt={service.title} size={48} />
                <h3 className="text-lg font-semibold mt-4 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                {service.cta ? (
                  <IntakeForm
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Request a Digital Brief
                      </Button>
                    }
                  />
                ) : (
                  <span className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-wide">
                    Included <Check className="ml-1 w-3 h-3" />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted/50 font-semibold"
              >
                View All Services <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. COMPARISON TABLE
          2-column layout: headline + comparison card.
      =================================================================== */}
      <section id="comparison" className="py-20 md:py-28 border-t border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Misaligned Incentives Are the Problem.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Most agencies are paid regardless of results. That places all the risk on the
                practice and removes accountability. Our performance-based model shares risk and
                aligns incentives around patient growth.
              </p>
              <IntakeForm
                trigger={
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Request a Practice Growth Brief
                  </Button>
                }
              />
            </div>

            {/* Right: comparison card */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="h-1 bg-primary" />
              <div className="p-8">
                <h3 className="text-xl font-bold mb-8 text-center">The DocPropel Difference</h3>
                <div className="space-y-5">
                  {/* Column headers */}
                  <div className="grid grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
                    <span>Feature</span>
                    <span className="text-primary">DocPropel</span>
                    <span>Others</span>
                  </div>
                  {[
                    { feature: "Pricing Model",    us: "Performance-Based",           them: "Fixed Retainer" },
                    { feature: "Technology",        us: "AI-Driven Optimization",      them: "Manual Reporting" },
                    { feature: "Financial Risk",    us: "Shared Risk",                 them: "100% On You" },
                    { feature: "Contract Terms",    us: "Flexible, No Lock-in",        them: "12–24 Month Lock-in" },
                    { feature: "Incentives",        us: "Aligned with Growth",         them: "Paid Regardless" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 items-center py-2 border-b border-border/50 last:border-0">
                      <div className="text-sm text-muted-foreground">{row.feature}</div>
                      <div className="text-sm font-semibold text-primary flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> {row.us}
                      </div>
                      <div className="text-sm text-muted-foreground/50 line-through">{row.them}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          7. KEY STATS — mirrors PropelDental's stats section
      =================================================================== */}
      <section className="py-20 md:py-28 border-t border-border bg-primary/5">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for Results. Measured by Transparency.
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't just promise growth — we prove it with numbers you can see and verify.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "0",    suffix: "",    label: "Retainers charged",            icon: <Shield className="w-5 h-5" /> },
              { stat: "100",  suffix: "%",   label: "Transparency on spend",        icon: <Eye className="w-5 h-5" /> },
              { stat: "4",    suffix: "+",   label: "Healthcare specialties served", icon: <Users className="w-5 h-5" /> },
              { stat: "50",   suffix: "+",   label: "States served nationwide",     icon: <TrendingUp className="w-5 h-5" /> },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-lg border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {item.stat}<span className="text-2xl">{item.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. ROI CALCULATOR
      =================================================================== */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calculate Your Growth Potential
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't guess. See exactly what a performance-based partnership could mean for your
              bottom line.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ===================================================================
          9. FINAL CTA
          Centered card with two action buttons.
      =================================================================== */}
      <section className="py-20 md:py-28 border-t border-border bg-card">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Propel Your Practice?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              This isn't a sales pitch. It's a real strategy conversation about your practice,
              your market, and whether we're the right fit. We're selective about who we work
              with — and we think you should be too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <IntakeForm
                trigger={
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 px-8 text-lg"
                  >
                    Request a Practice Growth Brief <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                }
              />
              <a href="tel:1-800-362-7767">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted/50 h-14 px-8 text-lg font-semibold"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call 1-800-DOC-PROPEL
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
