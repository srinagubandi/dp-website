import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Built for Healthcare. Without the Games.</h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We built DocPropel specifically for healthcare practices that want growth without the hype. We understand compliance, respect how practices actually operate, and avoid agency theatrics.
                  </p>
                  <p>
                    Our founders saw a gap in the market: great doctors were struggling to grow because traditional marketing agencies were focused on selling retainers, not delivering patients.
                  </p>
                  <p>
                    We aim to be a long-term growth partner, measured by results. No buzzwords, just accountable patient growth.
                  </p>
              </div>
              <div className="mt-10">
                  <IntakeForm trigger={
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-none px-8 h-14 text-lg">
                      Request a Digital Brief
                    </Button>
                  } />
              </div>
            </motion.div>
            <motion.div 
              className="relative h-[500px] bg-white p-3 shadow-2xl border border-border rotate-2 hover:rotate-0 transition-all duration-500"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="/images/hero-split.jpg" 
                alt="Healthcare professionals" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-primary text-white text-center">
        <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
                To empower healthcare providers to grow their practices through transparent, performance-based marketing, allowing them to focus on what they do best: caring for patients.
            </p>
        </div>
      </section>
    </Layout>
  );
}
