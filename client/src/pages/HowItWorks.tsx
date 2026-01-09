import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShieldCheck, BarChart3, Zap } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";

export default function HowItWorks() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <section className="py-20 bg-muted/30 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'url(/images/pulse-bg.jpg)', backgroundSize: 'cover' }}></div>
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            {...fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Simple. Transparent. Aligned.</h1>
            <p className="text-xl text-muted-foreground">
              Our goal is to make growth predictable and accountable. We begin with a review of your practice’s current online presence, market demand, and growth potential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
                title: "1. Deploy & Optimize",
                desc: "We deploy and continuously optimize the right mix of channels based on your specialty and geography. No cookie-cutter strategies."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-secondary" />,
                title: "2. Deliver Patients",
                desc: "We focus on delivering qualified patient inquiries and booked appointments. Reporting is real-time and outcome-focused."
              },
              {
                icon: <Zap className="h-10 w-10 text-secondary" />,
                title: "3. Pay for Performance",
                desc: "You pay when patients are delivered, not for activity. No vanity metrics, long contracts, or lock-ins."
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
          
          <div className="max-w-4xl mx-auto bg-white p-10 shadow-lg border-l-4 border-secondary">
            <h3 className="text-2xl font-bold mb-4 text-primary">Why this works better</h3>
            <p className="text-lg text-muted-foreground mb-6">
                Traditional agencies are incentivized to do the minimum amount of work to keep you paying your retainer. 
                We are incentivized to maximize your growth because our revenue depends on it.
            </p>
             <IntakeForm trigger={
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8 h-14 rounded-none shadow-lg">
                  Start with a Practice Growth Brief
                </Button>
             } />
          </div>
        </div>
      </section>
    </Layout>
  );
}
