import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, BarChart3, Users, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section - Asymmetrical Split */}
      <section className="relative overflow-hidden bg-background pt-10 pb-20 md:pt-20 md:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-5 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Performance-Based Marketing
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-primary">
                Stop Paying for <span className="text-foreground">Promises.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                DocPropel is the only healthcare marketing partner that charges for results. We grow your patient base, you only pay when we deliver.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8 h-14 rounded-none shadow-lg shadow-secondary/20 transition-all hover:translate-y-[-2px]">
                  Get Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-primary/20 text-primary font-semibold text-lg px-8 h-14 rounded-none hover:bg-primary/5">
                  See How It Works
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-none overflow-hidden shadow-2xl border-8 border-white bg-white">
                <img 
                  src="/images/hero-split.jpg" 
                  alt="Doctor analyzing growth metrics" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating Metric Card 1 */}
                <motion.div 
                  className="absolute top-10 left-10 bg-white/95 backdrop-blur p-4 shadow-xl border-l-4 border-secondary max-w-[180px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">New Patients</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-primary font-mono">+124</span>
                    <span className="text-xs text-green-600 font-bold mb-1">▲ 28%</span>
                  </div>
                </motion.div>

                {/* Floating Metric Card 2 */}
                <motion.div 
                  className="absolute bottom-10 right-10 bg-primary text-white p-5 shadow-xl max-w-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <p className="text-xs text-blue-100 font-medium uppercase tracking-wider mb-1">ROI Guaranteed</p>
                  <div className="text-2xl font-bold font-mono">Performance Model</div>
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-[-20px] right-[-20px] w-full h-full border-2 border-secondary/20"></div>
              <div className="absolute -z-10 bottom-[-20px] left-[-20px] w-full h-full bg-muted"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Pulse Line Background */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'url(/images/pulse-bg.jpg)', backgroundSize: 'cover' }}></div>
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">The Old Agency Model is Broken</h2>
            <p className="text-lg text-muted-foreground">
              Traditional agencies lock you into long contracts with high retainers and zero guarantees. 
              We flipped the script to align our success with yours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
                title: "Zero Risk",
                desc: "Stop gambling your marketing budget. With our performance model, you don't pay for empty promises."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-secondary" />,
                title: "Total Transparency",
                desc: "No vanity metrics. Our real-time dashboards show you exactly how many patients we've delivered."
              },
              {
                icon: <Zap className="h-10 w-10 text-secondary" />,
                title: "Aligned Incentives",
                desc: "We only win when you win. Our team fights for every single lead because our revenue depends on it."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="bg-background border border-border p-8 hover:border-secondary/50 transition-colors duration-300 shadow-sm hover:shadow-md group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="mb-6 p-3 bg-secondary/10 w-fit rounded-none group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The DocPropel Difference</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-md">
                See why hundreds of doctors, PTs, and dentists are switching from traditional agencies to our performance-based partnership.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold rounded-none h-14 px-8">
                Compare Full Plans
              </Button>
            </motion.div>

            <motion.div 
              className="bg-white text-foreground p-8 md:p-10 shadow-2xl relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
              <h3 className="text-2xl font-bold mb-8 text-center">Agency Comparison</h3>
              
              <div className="space-y-6">
                {[
                  { feature: "Pricing Model", us: "Performance-Based", them: "High Fixed Retainer" },
                  { feature: "Financial Risk", us: "Minimal & Shared", them: "100% On You" },
                  { feature: "Contract Terms", us: "Flexible, No Lock-in", them: "12-24 Month Lock-in" },
                  { feature: "Reporting", us: "Real-Time ROI", them: "Confusing PDFs" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Everything You Need to Grow</h2>
            <p className="text-lg text-muted-foreground">
              We handle every aspect of your digital marketing ecosystem. All included in one simple, performance-based plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Healthcare SEO",
                desc: "Dominate local search results so patients find you first.",
                img: "/images/service-seo.jpg"
              },
              {
                title: "Precision PPC",
                desc: "Targeted ad campaigns that drive qualified leads instantly.",
                img: "/images/service-ppc.jpg"
              },
              {
                title: "Medical Web Design",
                desc: "High-converting, ADA compliant websites built for trust.",
                img: "/images/service-web.jpg"
              },
              {
                title: "Reputation Management",
                desc: "Build a 5-star reputation that attracts new patients automatically.",
                img: null
              },
              {
                title: "Social Media Marketing",
                desc: "Engage your community and build a loyal patient following.",
                img: null
              },
              {
                title: "Content Marketing",
                desc: "Expert content that establishes you as the authority in your field.",
                img: null
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
                {service.img && (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.desc}</p>
                  <a href="#" className="inline-flex items-center text-sm font-bold text-secondary hover:text-secondary/80 uppercase tracking-wide">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
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
                See how many new patients you could be getting. Schedule your free, no-obligation Practice Growth Analysis today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-10 h-16 rounded-none shadow-xl">
                  Schedule Free Analysis
                </Button>
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
