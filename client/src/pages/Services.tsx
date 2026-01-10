import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";
import {
  DoctorIcon,
  DentistIcon,
  PharmacyIcon,
  PTOTIcon,
  GrowthPulseIcon,
  PerformanceIcon,
  ShieldCheckIcon,
  AIOptimizeIcon,
  PatientGrowthIcon,
  ROIIcon,
} from "@/components/BrandIcons";

export default function Services() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: PerformanceIcon,
      title: "Healthcare SEO",
      desc: "We ensure you appear exactly where patients are actively searching for care in your local market. We focus on high-intent keywords that drive appointments, not just traffic.",
      specialties: ["Doctors", "Dentists", "Pharmacies", "PT/OT"]
    },
    {
      icon: ROIIcon,
      title: "Paid Search & PPC",
      desc: "Create immediate demand and convert intent into booked appointments. We manage your ad spend to maximize ROI and eliminate waste.",
      specialties: ["Doctors", "Dentists", "PT/OT"]
    },
    {
      icon: AIOptimizeIcon,
      title: "AI-Powered Website",
      desc: "Built for trust, compliance, and conversion rather than just aesthetics. Your site will be a patient-generating machine with 24/7 AI chat.",
      specialties: ["Doctors", "Dentists", "Pharmacies", "PT/OT"]
    },
    {
      icon: ShieldCheckIcon,
      title: "Reputation Management",
      desc: "Systematically build social proof that works continuously to attract new patients. We help you get more 5-star reviews and manage your online reputation.",
      specialties: ["Doctors", "Dentists", "Pharmacies", "PT/OT"]
    },
    {
      icon: PatientGrowthIcon,
      title: "Patient Reactivation",
      desc: "Smart campaigns identify and re-engage dormant patients automatically, filling your schedule without you lifting a finger.",
      specialties: ["Doctors", "Dentists", "PT/OT"]
    },
    {
      icon: GrowthPulseIcon,
      title: "Digital Brief",
      desc: "A supportive, insight-led review of your digital ecosystem and experience. Identify gaps and opportunities for growth.",
      specialties: ["All Specialties"],
      cta: "Request a Digital Brief"
    }
  ];

  const specialtyBenefits = [
    {
      icon: DoctorIcon,
      title: "For Doctors & Physicians",
      benefits: [
        "Increase new patient appointments by 25-40%",
        "Reduce no-show rates with automated reminders",
        "Build referral networks with local specialists",
        "HIPAA-compliant marketing across all channels"
      ]
    },
    {
      icon: DentistIcon,
      title: "For Dentists",
      benefits: [
        "Fill hygiene schedules with recurring patients",
        "Attract high-value cosmetic cases",
        "Dominate local search for dental keywords",
        "Convert website visitors into booked appointments"
      ]
    },
    {
      icon: PharmacyIcon,
      title: "For Pharmacies",
      benefits: [
        "Drive prescription transfers from competitors",
        "Promote specialty services (compounding, immunizations)",
        "Build community presence and loyalty",
        "Compete effectively against big chains"
      ]
    },
    {
      icon: PTOTIcon,
      title: "For PT / OT Clinics",
      benefits: [
        "Capture direct-access patients online",
        "Build physician referral relationships",
        "Reduce patient drop-off rates",
        "Expand to multiple locations with proven playbooks"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-blue-50/30 border-b border-border">
        <div className="container">
          <motion.div className="text-center max-w-3xl mx-auto" {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase mb-6">
              <GrowthPulseIcon size={16} />
              Full-Service Growth
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">One Growth System. Predictable Results.</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You don't need multiple vendors or complex contracts. We manage your entire digital growth ecosystem under one performance-based model—tailored for <strong>doctors, dentists, pharmacies, and PT/OT clinics</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: DoctorIcon, name: "Doctors" },
                { icon: DentistIcon, name: "Dentists" },
                { icon: PharmacyIcon, name: "Pharmacies" },
                { icon: PTOTIcon, name: "PT / OT" },
              ].map((s) => (
                <span key={s.name} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border text-sm font-medium rounded-full">
                  <s.icon size={18} />
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                className="group relative overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <service.icon size={48} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{service.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.specialties.map((spec, j) => (
                      <span key={j} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  {service.cta ? (
                    <IntakeForm trigger={
                      <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white font-bold uppercase tracking-wide rounded-none mt-auto">
                        {service.cta}
                      </Button>
                    } />
                  ) : (
                    <div className="inline-flex items-center text-sm font-bold text-secondary uppercase tracking-wide mt-auto">
                      Included <Check className="ml-1 h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Tailored for Your Specialty</h2>
            <p className="text-lg text-muted-foreground">
              Every healthcare specialty has unique challenges. Our strategies are customized to address the specific growth opportunities in your field.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {specialtyBenefits.map((specialty, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 border-l-4 border-secondary shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <specialty.icon size={48} />
                  <h3 className="text-xl font-bold text-primary">{specialty.title}</h3>
                </div>
                <ul className="space-y-3">
                  {specialty.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify your growth?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a doctor, dentist, pharmacy, or PT/OT clinic—we have a proven playbook for your specialty.
          </p>
          <IntakeForm trigger={
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-10 h-16 rounded-none shadow-xl">
              Request a Practice Growth Brief <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          } />
        </div>
      </section>
    </Layout>
  );
}
