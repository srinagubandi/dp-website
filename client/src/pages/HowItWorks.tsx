import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Compass,
  MessagesSquare,
  ShieldCheck,
  Target,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import IntakeForm from "@/components/IntakeForm";

const steps = [
  {
    id: "01",
    title: "Map the opportunity",
    description:
      "We start with your practice, local demand, and patient pathway—not a generic channel package.",
    icon: Compass,
    detail: "Context before tactics",
  },
  {
    id: "02",
    title: "Build the response path",
    description:
      "We focus the message, media, website, and follow-up around a clear action a patient can take.",
    icon: MessagesSquare,
    detail: "Friction out, clarity in",
  },
  {
    id: "03",
    title: "Improve with the signal",
    description:
      "We use what the system is telling us to improve the next decision and keep incentives tied to performance.",
    icon: BarChart3,
    detail: "Shared performance view",
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

export default function HowItWorks() {
  return (
    <Layout>
      <section className="grid-lines relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute left-[58%] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative py-16 sm:py-20 lg:py-28">
          <motion.div {...reveal} className="max-w-4xl">
            <span className="signal-label">Operating model / 02</span>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              A more accountable way to build growth.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The work is designed around a simple loop: understand the practice
              context, create a patient-ready path, and make the next decision
              from a shared view of performance.
            </p>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3"
          >
            {[
              ["01", "Context", Compass],
              ["02", "Path", Target],
              ["03", "Signal", BarChart3],
            ].map(([number, label, Icon]) => {
              const Mark = Icon as typeof Compass;
              return (
                <div
                  key={number as string}
                  className="border border-border bg-card/70 p-4"
                >
                  <p className="font-mono text-xs text-primary">
                    {number as string}
                  </p>
                  <div className="mt-7 flex items-center justify-between">
                    <p className="font-semibold">{label as string}</p>
                    <Mark className="h-5 w-5 text-secondary" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-shell section-rule bg-[#081b2c]">
        <div className="container">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.08 }}
                  key={step.id}
                  className="group relative min-h-[26rem] overflow-hidden bg-[#081b2c] p-7 sm:p-9"
                >
                  <span className="metric-value text-6xl text-primary/25">
                    {step.id}
                  </span>
                  <Icon className="absolute right-8 top-9 h-7 w-7 text-secondary transition-transform duration-200 group-hover:-translate-y-1" />
                  <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                    <p className="eyebrow text-secondary">{step.detail}</p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">
                      {step.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-rule">
        <div className="container grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="eyebrow text-secondary">A clearer exchange</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              The plan is useful only if it gives you a better next move.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The deliverable is not more marketing activity. It is a focused
              system with a clear hypothesis, patient-facing path, and an
              ongoing way to decide what needs attention.
            </p>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="signal-panel p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="eyebrow text-muted-foreground">
                  Growth brief / starting point
                </p>
                <p className="mt-1 text-xl font-semibold">
                  What the first conversation covers
                </p>
              </div>
              <ShieldCheck className="h-7 w-7 text-[#18b69b]" />
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                "Practice goals and care context",
                "Local demand and patient decisions",
                "Current path from attention to action",
                "What performance would mean in practice",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-3 border-t border-border pt-4"
                >
                  <span className="font-mono text-xs text-primary">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-rule bg-primary text-primary-foreground">
        <div className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow text-[#071829]/70">Start with the inputs</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              See whether the operating model is a fit for your practice.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <IntakeForm
              trigger={
                <Button className="min-h-[3.25rem] bg-[#071829] px-6 font-semibold text-foreground hover:bg-[#0f2740]">
                  Request a growth brief{" "}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <a href="/calculator">
              <Button
                variant="outline"
                className="min-h-[3.25rem] w-full border-[#071829]/45 bg-transparent px-6 font-semibold text-[#071829] hover:bg-[#071829]/10"
              >
                Use the calculator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
