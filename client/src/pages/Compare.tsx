import { motion } from "framer-motion";
import { ArrowUpRight, Check, ShieldCheck, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import IntakeForm from "@/components/IntakeForm";

const rows = [
  {
    label: "Commercial model",
    traditional: "Fixed retainer",
    docpropel: "Performance-based",
  },
  {
    label: "Primary incentive",
    traditional: "Keep activity going",
    docpropel: "Create patient opportunity",
  },
  {
    label: "Risk allocation",
    traditional: "Practice carries it",
    docpropel: "Aligned around results",
  },
  {
    label: "Reporting lens",
    traditional: "Channel activity",
    docpropel: "Shared performance signal",
  },
  {
    label: "Operating rhythm",
    traditional: "Recurring deliverables",
    docpropel: "Improve the next move",
  },
];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

export default function Compare() {
  return (
    <Layout>
      <section className="grid-lines relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute right-[-10rem] top-[-13rem] h-[34rem] w-[34rem] rounded-full bg-secondary/10 blur-3xl" />
        <div className="container relative py-16 sm:py-20 lg:py-28">
          <motion.div {...reveal} className="max-w-4xl">
            <span className="signal-label">
              The performance difference / 03
            </span>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              The model changes what everyone works toward.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Most marketing partnerships are paid for activity. A performance
              model creates a different conversation: what counts as progress,
              what needs to be improved, and how both sides share
              accountability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-shell section-rule bg-[#081b2c]">
        <div className="container">
          <motion.div {...reveal} className="signal-panel overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr] border-b border-border lg:grid-cols-[1fr_1fr_1fr]">
              <div className="hidden border-r border-border p-6 lg:block">
                <p className="eyebrow text-muted-foreground">Comparison lens</p>
                <p className="mt-2 text-lg font-semibold">
                  What the agreement optimizes
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <p className="eyebrow text-muted-foreground">
                  Conventional model
                </p>
                <p className="mt-2 text-base font-semibold text-muted-foreground sm:text-lg">
                  Activity-led
                </p>
              </div>
              <div className="border-l border-border bg-secondary/5 p-5 sm:p-6">
                <p className="eyebrow text-secondary">DocPropel model</p>
                <p className="mt-2 text-base font-semibold text-foreground sm:text-lg">
                  Performance-led
                </p>
              </div>
            </div>
            <div className="divide-y divide-border">
              {rows.map((row, index) => (
                <motion.div
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.05 }}
                  key={row.label}
                  className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]"
                >
                  <div className="col-span-2 border-b border-border/70 p-4 lg:col-span-1 lg:border-b-0 lg:border-r lg:p-6">
                    <span className="font-mono text-xs text-primary">
                      0{index + 1}
                    </span>
                    <p className="mt-1 font-semibold">{row.label}</p>
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {row.traditional}
                      </p>
                    </div>
                  </div>
                  <div className="border-l border-border bg-secondary/[0.035] p-4 sm:p-5 lg:p-6">
                    <div className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18b69b]" />
                      <p className="text-sm font-medium leading-relaxed text-foreground">
                        {row.docpropel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell section-rule">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="eyebrow text-secondary">The point of the model</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              A more useful relationship with your growth partner.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The idea is not to make marketing complicated. It is to make the
              success criteria transparent enough that every decision is
              connected to the real work of creating patient opportunity.
            </p>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="border border-border bg-card p-7 shadow-[8px_8px_0_rgba(0,0,0,0.14)] sm:p-8"
          >
            <ShieldCheck className="h-8 w-8 text-secondary" />
            <blockquote className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
              “The operating model should make it easier to ask whether the next
              action is helping the practice.”
            </blockquote>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
              The growth brief is where we establish the practice context, the
              patient journey, and the questions the system needs to answer.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-rule bg-primary text-primary-foreground">
        <div className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow text-[#071829]/70">See the fit</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Bring your practice context to a straightforward performance
              conversation.
            </h2>
          </div>
          <IntakeForm
            trigger={
              <Button className="min-h-[3.25rem] bg-[#071829] px-6 font-semibold text-foreground hover:bg-[#0f2740]">
                Request a growth brief <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
        </div>
      </section>
    </Layout>
  );
}
