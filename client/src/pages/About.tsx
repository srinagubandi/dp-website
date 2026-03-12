/**
 * =============================================================================
 * ABOUT.TSX - DocPropel About Us Page
 * =============================================================================
 *
 * Design: Dark premium theme inspired by PropelDental.
 * Sections:
 *   1. Hero — left-aligned headline
 *   2. Our Story — 2-column: text + value cards
 *   3. Core Values — icon card grid
 *   4. Mission CTA
 *
 * =============================================================================
 */

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Eye, Users, Shield, Target, Heart, Zap } from "lucide-react";
import IntakeForm from "@/components/IntakeForm";

export default function About() {
  return (
    <Layout>

      {/* =====================================================================
          1. HERO
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              We're Not an Agency.{" "}
              <span className="text-primary">We're Your Growth Partner.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              DocPropel was built from frustration — the same frustration you've probably felt.
              Too many marketing companies treat healthcare practices like a number. They sell you
              a package, run generic ads, send dashboards full of vanity metrics, and move on to
              the next client. We built DocPropel to be the opposite.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. OUR STORY — 2-column: narrative text + value cards
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: story text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why We Exist</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Our founders saw a gap in the market: great doctors, dentists, pharmacists, and
                  therapists were struggling to grow because traditional marketing agencies were
                  focused on selling retainers — not delivering patients.
                </p>
                <p>
                  We've heard the same frustrations over and over: "I don't know where my money
                  is going." "The leads are garbage." "They don't understand my practice." "I feel
                  like just another account number."
                </p>
                <p>
                  So we built something different. DocPropel is a performance-based growth partner
                  — not an ad agency. Our mission is to work hand-in-hand with each client to
                  develop and strengthen your practice identity, while emphasizing your competitive
                  advantages in an ever-growing market.
                </p>
                <p>
                  We understand compliance, respect how practices actually operate, and avoid
                  agency theatrics. No buzzwords. No lock-ins. Just accountable patient growth.
                </p>
              </div>
              <div className="mt-8">
                <IntakeForm
                  trigger={
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Request a Digital Brief <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Right: value cards */}
            <div className="space-y-6">
              {[
                {
                  icon: <Eye className="w-6 h-6" />,
                  title: "Transparency Is Non-Negotiable",
                  desc: "You'll see every dollar spent, every lead generated, every decision made. We operate in full daylight because we have nothing to hide.",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Healthcare-First Approach",
                  desc: "HIPAA-compliant, specialty-specific strategies built for doctors, dentists, pharmacies, and PT/OT clinics. We understand your world.",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Performance-Based Model",
                  desc: "You only pay when we deliver qualified patient inquiries. No retainers, no wasted spend, no misaligned incentives.",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "AI-Powered Optimization",
                  desc: "Cutting-edge automation and real-time optimization to maximize your ROI and minimize costs — technology that works while you focus on patients.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CORE VALUES — icon card grid
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Stand For</h2>
            <p className="text-lg text-muted-foreground">
              Five principles that guide every decision we make, every strategy we build, and
              every partnership we form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: <Target className="w-6 h-6" />,  title: "Results First",       desc: "Every strategy is measured by patient outcomes, not vanity metrics." },
              { icon: <Eye className="w-6 h-6" />,      title: "Full Transparency",   desc: "No black boxes. You see everything — spend, leads, and decisions." },
              { icon: <Shield className="w-6 h-6" />,   title: "HIPAA Compliant",     desc: "Healthcare-first approach that respects compliance at every step." },
              { icon: <Heart className="w-6 h-6" />,    title: "True Partnership",    desc: "We succeed when you succeed. Our incentives are fully aligned." },
              { icon: <Zap className="w-6 h-6" />,      title: "AI-Powered",          desc: "Cutting-edge technology that optimizes in real-time, 24/7." },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. MISSION CTA
      ===================================================================== */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              To empower healthcare providers to grow their practices through transparent,
              performance-based marketing — allowing them to focus on what they do best:
              caring for patients.
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
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
