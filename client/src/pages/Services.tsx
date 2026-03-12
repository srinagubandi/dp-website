/**
 * =============================================================================
 * SERVICES.TSX - DocPropel Services Page
 * =============================================================================
 *
 * Design: Dark premium theme inspired by PropelDental.
 * Sections:
 *   1. Hero — left-aligned headline + specialty badges
 *   2. Services Grid — 3-column card grid
 *   3. Specialty Benefits — 4-card grid with bullet lists
 *   4. Final CTA
 *
 * =============================================================================
 */

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap } from "lucide-react";
import IntakeForm from "@/components/IntakeForm";

const IconImage = ({ src, alt, size = 48 }: { src: string; alt: string; size?: number }) => (
  <img src={src} alt={alt} className="object-contain" style={{ width: size, height: size }} />
);

const services = [
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/qANZOjHlFCcayAsG.png",
    title: "Healthcare SEO",
    desc: "We ensure you appear exactly where patients are actively searching for care in your local market. We focus on high-intent keywords that drive appointments, not just traffic.",
    specialties: ["Doctors", "Dentists", "Pharmacies", "PT / OT"],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/WBhDloOVGpaxRdbW.png",
    title: "Paid Search & PPC",
    desc: "Create immediate demand and convert intent into booked appointments. We manage your ad spend to maximize ROI and eliminate waste.",
    specialties: ["Doctors", "Dentists", "PT / OT"],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/fkeHVnQjUJXtKRvn.png",
    title: "AI-Powered Website",
    desc: "Built for trust, compliance, and conversion rather than just aesthetics. Your site will be a patient-generating machine with 24/7 AI chat.",
    specialties: ["Doctors", "Dentists", "Pharmacies", "PT / OT"],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/qMFufdufqNeqWknO.png",
    title: "Reputation Management",
    desc: "Systematically build social proof that works continuously to attract new patients. We help you get more 5-star reviews and manage your online reputation.",
    specialties: ["Doctors", "Dentists", "Pharmacies", "PT / OT"],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/WBhDloOVGpaxRdbW.png",
    title: "Patient Reactivation",
    desc: "Smart campaigns identify and re-engage dormant patients automatically, filling your schedule without you lifting a finger.",
    specialties: ["Doctors", "Dentists", "PT / OT"],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/EtYMzJocxPYxMecb.png",
    title: "Digital Growth Brief",
    desc: "A supportive, insight-led review of your digital ecosystem and experience. Identify gaps and opportunities for growth.",
    specialties: ["All Specialties"],
    cta: "Request a Digital Brief",
  },
];

const specialtyBenefits = [
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/hgeCYmgWdFOTQFeJ.png",
    title: "For Doctors & Physicians",
    benefits: [
      "Increase new patient appointments by 25–40%",
      "Reduce no-show rates with automated reminders",
      "Build referral networks with local specialists",
      "HIPAA-compliant marketing across all channels",
    ],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/xUduvXxBKpcYHKDu.png",
    title: "For Dentists",
    benefits: [
      "Fill hygiene schedules with recurring patients",
      "Attract high-value cosmetic cases",
      "Dominate local search for dental keywords",
      "Convert website visitors into booked appointments",
    ],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/IPUuYqwwRkEoslEe.png",
    title: "For Pharmacies",
    benefits: [
      "Drive prescription transfers from competitors",
      "Promote specialty services (compounding, immunizations)",
      "Build community presence and loyalty",
      "Compete effectively against big chains",
    ],
  },
  {
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/vTEcNtMTylllVefa.png",
    title: "For Physical Therapy / OT Clinics",
    benefits: [
      "Capture direct-access patients online",
      "Build physician referral relationships",
      "Reduce patient drop-off rates",
      "Expand to multiple locations with proven playbooks",
    ],
  },
];

export default function Services() {
  return (
    <Layout>

      {/* =====================================================================
          1. HERO
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Full-Service Growth
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              One Growth System.{" "}
              <span className="text-primary">Predictable Results.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              You don't need multiple vendors or complex contracts. We manage your entire
              digital growth ecosystem under one performance-based model — tailored for{" "}
              <strong className="text-foreground">
                doctors, dentists, pharmacies, and Physical Therapy / OT clinics
              </strong>.
            </p>

            {/* Specialty badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/hgeCYmgWdFOTQFeJ.png", name: "Doctors" },
                { icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/xUduvXxBKpcYHKDu.png", name: "Dentists" },
                { icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/IPUuYqwwRkEoslEe.png", name: "Pharmacies" },
                { icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663082775454/vTEcNtMTylllVefa.png", name: "Physical Therapy / OT" },
              ].map((s) => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium"
                >
                  <img src={s.icon} alt={s.name} className="w-5 h-5 object-contain" />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SERVICES GRID
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors group flex flex-col"
              >
                <IconImage src={service.icon} alt={service.title} size={52} />
                <h3 className="text-lg font-semibold mt-4 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.specialties.map((spec, j) => (
                    <span
                      key={j}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                {service.cta ? (
                  <IntakeForm
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full font-semibold"
                      >
                        {service.cta}
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
        </div>
      </section>

      {/* =====================================================================
          3. SPECIALTY BENEFITS
      ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-border bg-card">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tailored for Your Specialty</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every healthcare specialty has unique challenges. Our strategies are customized
              to address the specific growth opportunities in your field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialtyBenefits.map((specialty, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <IconImage src={specialty.icon} alt={specialty.title} size={52} />
                  <h3 className="text-lg font-semibold">{specialty.title}</h3>
                </div>
                <ul className="space-y-3">
                  {specialty.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FINAL CTA
      ===================================================================== */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Simplify Your Growth?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Whether you're a doctor, dentist, pharmacy, or PT/OT clinic — we have a proven
              playbook for your specialty.
            </p>
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
      </section>

    </Layout>
  );
}
