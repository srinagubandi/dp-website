import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";

export default function Compare() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <section className="py-24 bg-primary text-white relative overflow-hidden min-h-screen flex items-center">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Misaligned Incentives are the Problem.</h1>
              <p className="text-blue-100 text-xl mb-8 max-w-lg leading-relaxed">
                Most agencies are paid regardless of results. That places all the risk on the practice and removes accountability. Our performance-based model shares risk and aligns incentives around patient growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                  <IntakeForm trigger={
                    <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold rounded-none h-14 px-8 text-lg">
                      Request a Practice Growth Brief
                    </Button>
                  } />
              </div>
            </motion.div>

            <motion.div 
              className="bg-white text-foreground p-8 md:p-12 shadow-2xl relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-secondary"></div>
              <h3 className="text-3xl font-bold mb-10 text-center text-primary">The DocPropel Difference</h3>
              
              <div className="space-y-8">
                {[
                  { feature: "Pricing Model", us: "Performance-Based", them: "High Fixed Retainer" },
                  { feature: "Financial Risk", us: "Shared Risk", them: "100% On You" },
                  { feature: "Contract Terms", us: "Flexible, No Lock-in", them: "12-24 Month Lock-in" },
                  { feature: "Reporting", us: "Real-Time ROI", them: "Confusing PDFs" },
                  { feature: "Incentives", us: "Aligned with Growth", them: "Paid Regardless" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 items-center border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="font-medium text-base md:text-lg text-muted-foreground">{row.feature}</div>
                    <div className="font-bold text-base md:text-lg text-primary flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" /> {row.us}
                    </div>
                    <div className="text-base md:text-lg text-muted-foreground/60 line-through decoration-destructive/50">
                      {row.them}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
