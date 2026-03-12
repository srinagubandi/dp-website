/**
 * =============================================================================
 * CONTACT.TSX - DocPropel Contact Us Page
 * =============================================================================
 *
 * Design: Dark premium theme inspired by PropelDental.
 * Sections:
 *   1. Hero — left-aligned headline + CTA buttons
 *   2. Contact Info — 2-column: form card + info cards
 *   3. What to Expect — 3-step process
 *   4. Final CTA — phone number
 *
 * HOW TO EDIT:
 *   - To change PHONE NUMBER: Edit the phoneNumber constant below
 *   - To change EMAIL: Edit the email constant below
 *   - To change OFFICE HOURS: Edit the officeHours constant below
 *   - To change FORM FIELDS: Edit the IntakeForm component in components/IntakeForm.tsx
 *
 * =============================================================================
 */

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import IntakeForm from "@/components/IntakeForm";

// -----------------------------------------------------------------------------
// CONTACT INFORMATION - Edit these values to update contact details
// -----------------------------------------------------------------------------
const phoneNumber = "1-800-DOC-PROPEL";
const phoneNumberTel = "1-800-362-7767";
const email = "hello@docpropel.com";
const officeHours = "Monday – Friday, 9am – 6pm EST";

export default function Contact() {
  return (
    <Layout>

      {/* =====================================================================
          1. HERO
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Let's Grow{" "}
              <span className="text-primary">Your Practice.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Ready to stop paying for promises and start paying for patients? Get in touch
              with our team to discuss your practice's growth potential. No obligation,
              no sales pressure.
            </p>

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
              <a href={`tel:${phoneNumberTel}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted/50 h-14 px-8 text-lg font-semibold"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call {phoneNumber}
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> No Obligation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Response Within 24 Hours
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Free Practice Analysis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CONTACT INFO — 2-column: form card + info cards
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: form card */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="h-1 bg-primary" />
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Request a Practice Growth Brief</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll send you a customized analysis of your
                  practice's growth opportunities within 24 hours.
                </p>
                <IntakeForm
                  trigger={
                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 text-lg"
                    >
                      Start Your Growth Analysis <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Right: contact info cards */}
            <div className="space-y-5">

              {/* Phone */}
              <div className="flex gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <a
                    href={`tel:${phoneNumberTel}`}
                    className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    {phoneNumber}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Tap to call on mobile</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Send a Message</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Fill out our brief form and we'll respond within 24 hours
                  </p>
                  <IntakeForm
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                      >
                        Open Contact Form
                      </Button>
                    }
                  />
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="font-medium">{officeHours}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    After-hours inquiries answered next business day
                  </p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    "A brief discovery call to understand your practice",
                    "Custom analysis of your market and competition",
                    "Clear growth projections with no obligation",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FINAL CTA
      ===================================================================== */}
      <section className="py-20 md:py-28 border-t border-border bg-card">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prefer to Talk Now?</h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our team is ready to discuss how we can help grow your practice with our
              performance-based model. Real people, real conversations, real results.
            </p>
            <a href={`tel:${phoneNumberTel}`}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 px-10 text-lg"
              >
                <Phone className="mr-2 w-5 h-5" />
                {phoneNumber}
              </Button>
            </a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
