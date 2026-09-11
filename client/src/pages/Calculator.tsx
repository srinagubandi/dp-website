import { motion } from "framer-motion";
import {
  Calculator as CalculatorIcon,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import ROICalculator from "@/components/ROICalculator";

export default function Calculator() {
  return (
    <Layout>
      <section className="grid-lines relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute left-[55%] top-[-13rem] h-[36rem] w-[36rem] rounded-full bg-secondary/10 blur-3xl" />
        <div className="container relative py-16 sm:py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="signal-label">Planning tool / 04</span>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Frame the growth conversation with the inputs you know.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Use a few practice inputs to create a starting point for your
              discussion with DocPropel. The calculator is illustrative planning
              support—not a promise of results.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3"
          >
            {[
              [CalculatorIcon, "Practice inputs", "Use your current baseline"],
              [Sparkles, "Scenario framing", "Explore practical possibilities"],
              [LockKeyhole, "Private context", "A starting point for a brief"],
            ].map(([Icon, title, copy]) => {
              const Mark = Icon as typeof CalculatorIcon;
              return (
                <div
                  key={title as string}
                  className="border border-border bg-card/70 p-5 text-left"
                >
                  <Mark className="h-5 w-5 text-secondary" />
                  <p className="mt-8 font-semibold">{title as string}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {copy as string}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-shell section-rule bg-[#081b2c]">
        <div className="container">
          <ROICalculator />
        </div>
      </section>

      <section className="section-rule bg-background">
        <div className="container py-10 text-center text-sm leading-relaxed text-muted-foreground">
          Calculations are illustrative and depend on the inputs provided.
          Actual results vary by practice, market, patient demand, operational
          capacity, and other factors.
        </div>
      </section>
    </Layout>
  );
}
