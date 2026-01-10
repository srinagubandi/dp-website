import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";
import ROICalculator from "@/components/ROICalculator";

// Custom icon component for image-based icons
const IconImage = ({ src, alt, size = 64 }: { src: string; alt: string; size?: number }) => (
  <img src={src} alt={alt} className="object-contain" style={{ width: size, height: size }} />
);

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const specialties = [
    { icon: "/images/icon-doctor-v2.png", name: "Doctors", desc: "Primary Care & Specialists" },
    { icon: "/images/icon-dentist-v2.png", name: "Dentists", desc: "General & Cosmetic" },
    { icon: "/images/icon-pharmacy-v2.png", name: "Pharmacies", desc: "Independent & Retail" },
    { icon: "/images/icon-pt-v2.png", name: "Physical Therapy / Occupational Therapy", desc: "Rehab & Therapy Clinics" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 pt-10 pb-20 md:pt-20 md:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-6 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase">
                <img src="/images/icon-performance-v2.png" alt="Growth" className="w-5 h-5 object-contain" />
                Performance-Based Marketing
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-primary">
                Stop Paying for <span className="text-foreground">Promises.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                We grow your patient base. You only pay when we deliver. DocPropel is the performance-based growth partner for <strong>Doctors, Dentists, Pharmacies, and Physical Therapy / Occupational Therapy clinics</strong>. No retainers. No long-term contracts. Just accountable growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <IntakeForm trigger={
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8 h-14 rounded-none shadow-lg shadow-secondary/20 transition-all hover:translate-y-[-2px]">
                    Request a Practice Growth Brief <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                } />
                <Button variant="outline" size="lg" className="border-2 border-primary/20 text-primary font-semibold text-lg px-8 h-14 rounded-none hover:bg-primary/5">
                  See How It Works
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Specialty Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {specialties.map((specialty, i) => (
                  <motion.div
                    key={specialty.name}
                    className="bg-white p-6 shadow-lg border-l-4 border-secondary hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  >
                    <IconImage src={specialty.icon} alt={specialty.name} size={56} />
                    <h3 className="text-lg font-bold text-primary mt-3">{specialty.name}</h3>
                    <p className="text-sm text-muted-foreground">{specialty.desc}</p>
                  </motion.div>
                ))}
              </div>
              

            </motion.div>
          </div>
        </div>
        
        {/* Decorative Pulse Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
      </section>

      {/* Specialties We Serve Section */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Built for Healthcare Professionals</h2>
            <p className="text-lg text-muted-foreground">
              We specialize in growing patient volume for healthcare practices that value results over promises. Our AI-powered platform is tailored for each specialty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "/images/icon-doctor-v2.png",
                title: "Doctors & Physicians",
                items: ["Primary Care", "Internal Medicine", "Specialists", "Urgent Care"],
                color: "bg-blue-50 border-primary"
              },
              {
                icon: "/images/icon-dentist-v2.png",
                title: "Dentists",
                items: ["General Dentistry", "Cosmetic", "Orthodontics", "Oral Surgery"],
                color: "bg-orange-50 border-secondary"
              },
              {
                icon: "/images/icon-pharmacy-v2.png",
                title: "Pharmacies",
                items: ["Independent", "Compounding", "Specialty", "Retail"],
                color: "bg-blue-50 border-primary"
              },
              {
                icon: "/images/icon-pt-v2.png",
                title: "Physical Therapy / Occupational Therapy",
                items: ["Physical Therapy", "Occupational Therapy", "Sports Rehab", "Pediatric"],
                color: "bg-orange-50 border-secondary"
              }
            ].map((specialty, i) => (
              <motion.div 
                key={i}
                className={`p-6 border-t-4 ${specialty.color} shadow-sm hover:shadow-lg transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <IconImage src={specialty.icon} alt={specialty.title} size={56} />
                <h3 className="text-xl font-bold mb-4 mt-3 text-primary">{specialty.title}</h3>
                <ul className="space-y-2">
                  {specialty.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Advantage Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            {...fadeIn}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
              <img src="/images/icon-ai-v2.png" alt="AI" className="w-5 h-5 object-contain" />
              Powered by Medical AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Lower Costs. Higher Precision.</h2>
            <p className="text-lg text-muted-foreground">
              Traditional agencies bill you for their bloat. We leverage cutting-edge medical AI to automate the heavy lifting, passing the savings directly to your practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "/images/icon-target-v2.png",
                title: "Zero Wasted Ad Spend",
                desc: "Predictive algorithms optimize your budget in real-time, ensuring every dollar targets patients actively seeking care. No more paying for clicks that don't convert."
              },
              {
                icon: "/images/icon-ai-v2.png",
                title: "24/7 Patient Capture",
                desc: "Intelligent, HIPAA-compliant chatbots engage visitors instantly—even while you sleep—converting website traffic into booked appointments without adding staff."
              },
              {
                icon: "/images/icon-performance-v2.png",
                title: "Automated Reactivation",
                desc: "Smart campaigns identify and re-engage dormant patients automatically, filling your schedule without you lifting a finger."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="bg-white p-8 border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <IconImage src={item.icon} alt={item.title} size={64} />
                <h3 className="text-xl font-bold mb-3 mt-4 text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Simple. Transparent. Aligned.</h2>
            <p className="text-lg text-muted-foreground">
              Our goal is to make growth predictable and accountable. We begin with a review of your practice's current online presence, market demand, and growth potential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "/images/icon-shield-trust.png",
                step: "01",
                title: "Deploy & Optimize",
                desc: "We deploy and continuously optimize the right mix of channels based on your specialty and geography."
              },
              {
                icon: "/images/icon-growth-chart.png",
                step: "02",
                title: "Deliver Patients",
                desc: "We focus on delivering qualified patient inquiries and booked appointments. Reporting is real-time and outcome-focused."
              },
              {
                icon: "/images/icon-roi-calculator.png",
                step: "03",
                title: "Pay for Performance",
                desc: "You pay when patients are delivered, not for activity. No vanity metrics, long contracts, or lock-ins."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="bg-muted/30 border border-border p-8 hover:border-secondary/50 transition-colors duration-300 shadow-sm hover:shadow-md group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="absolute top-4 right-4 text-5xl font-bold text-muted-foreground/10">{item.step}</div>
                <div className="mb-6">
                  <IconImage src={item.icon} alt={item.title} size={56} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Calculate Your Growth Potential</h2>
            <p className="text-lg text-muted-foreground">
              Don't guess. See exactly what a performance-based partnership could mean for your bottom line.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ROICalculator />
          </motion.div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Misaligned Incentives are the Problem.</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-md">
                Most agencies are paid regardless of results. That places all the risk on the practice and removes accountability. Our performance-based model shares risk and aligns incentives around patient growth.
              </p>
              <IntakeForm trigger={
                <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold rounded-none h-14 px-8">
                  Request a Practice Growth Brief
                </Button>
              } />
            </motion.div>

            <motion.div 
              className="bg-white text-foreground p-8 md:p-10 shadow-2xl relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
              <h3 className="text-2xl font-bold mb-8 text-center">The DocPropel Difference</h3>
              
              <div className="space-y-6">
                {[
                  { feature: "Pricing Model", us: "Performance-Based", them: "High Fixed Retainer" },
                  { feature: "Technology", us: "AI-Driven Real-Time Optimization", them: "Manual Reporting & Slow Updates" },
                  { feature: "Financial Risk", us: "Shared Risk", them: "100% On You" },
                  { feature: "Contract Terms", us: "Flexible, No Lock-in", them: "12-24 Month Lock-in" },
                  { feature: "Incentives", us: "Aligned with Growth", them: "Paid Regardless" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 items-center border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="font-medium text-sm md:text-base text-muted-foreground">{row.feature}</div>
                    <div className="font-bold text-sm md:text-base text-primary flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> {row.us}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground/60 line-through decoration-destructive/50">
                      {row.them}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container">
          <motion.div className="text-center max-w-3xl mx-auto mb-20" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">One Growth System. Predictable Results.</h2>
            <p className="text-lg text-muted-foreground">
              You don't need multiple vendors or complex contracts. We manage your entire digital growth ecosystem under one performance-based model.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Healthcare SEO",
                desc: "We ensure you appear exactly where patients are actively searching for care in your local market.",
                icon: "/images/icon-target-v2.png"
              },
              {
                title: "Paid Search",
                desc: "Create immediate demand and convert intent into booked appointments, not just traffic.",
                icon: "/images/icon-performance-v2.png"
              },
              {
                title: "Website Design",
                desc: "Built for trust, compliance, and conversion rather than just aesthetics.",
                icon: "/images/icon-ai-v2.png"
              },
              {
                title: "Reputation Management",
                desc: "Systematically build social proof that works continuously to attract new patients.",
                icon: "/images/icon-shield-trust.png"
              },
              {
                title: "Social Media & Content",
                desc: "Reinforce credibility, authority, and stay top of mind in your community.",
                icon: "/images/icon-handshake-v2.png"
              },
              {
                title: "Digital Brief",
                desc: "A supportive, insight-led review of your digital ecosystem and experience.",
                icon: "/images/icon-growth-chart.png",
                cta: "Request a Digital Brief"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                className="group relative overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-8">
                  <IconImage src={service.icon} alt={service.title} size={56} />
                  <h3 className="text-xl font-bold mb-3 mt-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.desc}</p>
                  {service.cta ? (
                    <IntakeForm trigger={
                      <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white font-bold uppercase tracking-wide rounded-none">
                        {service.cta}
                      </Button>
                    } />
                  ) : (
                    <div className="inline-flex items-center text-sm font-bold text-secondary uppercase tracking-wide">
                      Included <Check className="ml-1 h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Built for Healthcare. Without the Games.</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We built DocPropel specifically for healthcare practices that want growth without the hype. We understand compliance, respect how practices actually operate, and avoid agency theatrics.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our aim is to be a long-term growth partner, measured by results. No buzzwords, just accountable patient growth.
              </p>
              <IntakeForm trigger={
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-none px-8 h-12">
                  Request a Digital Brief
                </Button>
              } />
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 shadow-lg border-t-4 border-primary">
                  <IconImage src="/images/icon-handshake-v2.png" alt="Partnership" size={48} />
                  <h4 className="font-bold text-primary mt-3">True Partnership</h4>
                  <p className="text-sm text-muted-foreground mt-2">We succeed when you succeed</p>
                </div>
                <div className="bg-white p-6 shadow-lg border-t-4 border-secondary">
                  <IconImage src="/images/icon-shield-trust.png" alt="Trust" size={48} />
                  <h4 className="font-bold text-primary mt-3">HIPAA Compliant</h4>
                  <p className="text-sm text-muted-foreground mt-2">Healthcare-first approach</p>
                </div>
                <div className="bg-white p-6 shadow-lg border-t-4 border-secondary">
                  <IconImage src="/images/icon-ai-v2.png" alt="AI" size={48} />
                  <h4 className="font-bold text-primary mt-3">AI-Powered</h4>
                  <p className="text-sm text-muted-foreground mt-2">Cutting-edge technology</p>
                </div>
                <div className="bg-white p-6 shadow-lg border-t-4 border-primary">
                  <IconImage src="/images/icon-performance-v2.png" alt="Results" size={48} />
                  <h4 className="font-bold text-primary mt-3">Results-Driven</h4>
                  <p className="text-sm text-muted-foreground mt-2">Pay for performance only</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/50 border-t border-border">
        <div className="container">
          <div className="bg-primary rounded-none p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Propel Your Practice?</h2>
              <p className="text-xl text-blue-100 mb-10">
                Get a high-level review of your practice's growth opportunities and patient demand.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <IntakeForm trigger={
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-10 h-16 rounded-none shadow-xl">
                    Request a Practice Growth Brief
                  </Button>
                } />
                <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-10 h-16 rounded-none">
                  Call 1-800-DOC-PROPEL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
