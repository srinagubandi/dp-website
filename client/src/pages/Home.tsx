import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Check,
  CircleDollarSign,
  Clock3,
  Crosshair,
  Gauge,
  HeartPulse,
  LockKeyhole,
  MapPinned,
  MessagesSquare,
  Phone,
  ShieldCheck,
  Stethoscope,
  Target,
  UsersRound,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import IntakeForm from "@/components/IntakeForm";
import ROICalculator from "@/components/ROICalculator";

const specialties = [
  {
    name: "Doctors & physicians",
    focus: "Local care demand",
    icon: Stethoscope,
    color: "text-secondary",
    border: "border-secondary/55",
  },
  {
    name: "Dental practices",
    focus: "High-intent treatment demand",
    icon: HeartPulse,
    color: "text-primary",
    border: "border-primary/60",
  },
  {
    name: "Independent pharmacies",
    focus: "Community health access",
    icon: Crosshair,
    color: "text-[#18b69b]",
    border: "border-[#18b69b]/60",
  },
  {
    name: "PT / OT clinics",
    focus: "Timely patient pathways",
    icon: Activity,
    color: "text-[#e9c46a]",
    border: "border-[#e9c46a]/60",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Capture high-intent demand",
    copy: "Find the channels and messages that match how patients already look for care in your market.",
    icon: Target,
  },
  {
    number: "02",
    title: "Turn attention into action",
    copy: "Make the next step easy and clear, from the first click through an inquiry or appointment request.",
    icon: MessagesSquare,
  },
  {
    number: "03",
    title: "Measure what moved",
    copy: "Use a shared operating view that keeps attention on patient opportunities, not surface-level activity.",
    icon: BarChart3,
  },
];

const services = [
  {
    title: "Search presence",
    description: "Be present when local care intent is highest.",
    icon: MapPinned,
  },
  {
    title: "Paid demand",
    description: "Test and refine acquisition channels with clear inputs.",
    icon: CircleDollarSign,
  },
  {
    title: "Practice website",
    description: "Give patients a fast, credible path to take action.",
    icon: Gauge,
  },
  {
    title: "Patient reactivation",
    description: "Reconnect with people who already know your practice.",
    icon: UsersRound,
  },
  {
    title: "Reputation signal",
    description: "Make the proof patients seek easier to find.",
    icon: BadgeCheck,
  },
  {
    title: "Automation layer",
    description: "Create faster response paths without adding friction.",
    icon: Bot,
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

export default function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);
  const currentSpecialty = specialties[selectedSpecialty];

  return (
    <Layout>
      <section className="grid-lines relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute right-[-20rem] top-[-16rem] h-[42rem] w-[42rem] rounded-full bg-secondary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-16rem] left-[20%] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative py-14 lg:py-24">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.12em] text-secondary">
              DocPropel / growth system 01
            </span>
            <span className="font-mono uppercase tracking-[0.1em]">
              Designed for healthcare practices
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <span className="signal-label">
                Performance-based healthcare marketing
              </span>
              <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
                Make patient growth a{" "}
                <span className="text-primary">measurable system.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
                DocPropel helps healthcare practices connect demand, patient
                conversations, and accountable growth. You pay for performance,
                not busywork.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <IntakeForm
                  trigger={
                    <Button
                      size="lg"
                      className="signal-button bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-[#ff9639]"
                    >
                      Request a growth brief{" "}
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  }
                />
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="signal-link h-[3.25rem] border-secondary/50 px-6 text-base font-semibold text-foreground hover:bg-secondary/10 hover:text-foreground"
                  >
                    See the operating model{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-4 sm:gap-4">
                {[
                  "No long-term lock-in",
                  "Patient-first paths",
                  "Shared visibility",
                  "Multi-specialty",
                ].map(item => (
                  <span className="flex items-start gap-2" key={item}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18b69b]" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="signal-panel overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
                <div>
                  <p className="eyebrow text-muted-foreground">
                    Growth console
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    A clearer view of the work
                  </p>
                </div>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#18b69b]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#18b69b]" />{" "}
                  System active
                </span>
              </div>
              <div className="relative p-5 sm:p-6">
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <p className="eyebrow text-muted-foreground">
                      Practice focus
                    </p>
                    <p
                      className={`mt-1 text-lg font-semibold ${currentSpecialty.color}`}
                    >
                      {currentSpecialty.name}
                    </p>
                  </div>
                  <currentSpecialty.icon
                    className={`h-8 w-8 ${currentSpecialty.color}`}
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "Discover",
                      detail: currentSpecialty.focus,
                      width: "88%",
                      color: "bg-secondary",
                    },
                    {
                      label: "Connect",
                      detail: "Clear patient response path",
                      width: "68%",
                      color: "bg-[#18b69b]",
                    },
                    {
                      label: "Measure",
                      detail: "Shared performance signal",
                      width: "80%",
                      color: "bg-primary",
                    },
                  ].map((stage, index) => (
                    <div
                      key={stage.label}
                      className="grid grid-cols-[28px_1fr] gap-3"
                    >
                      <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-semibold">
                            {stage.label}
                          </span>
                          <span className="truncate text-right text-xs text-muted-foreground">
                            {stage.detail}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: stage.width }}
                            transition={{
                              duration: 0.85,
                              delay: 0.3 + index * 0.14,
                            }}
                            className={`h-full ${stage.color}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-3 border border-border bg-background/50">
                  {[
                    ["FOCUS", "Patient demand"],
                    ["METHOD", "Shared risk"],
                    ["OUTPUT", "Clear next steps"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border-r border-border p-3 last:border-r-0"
                    >
                      <p className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 text-xs font-medium text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-shell section-rule bg-[#081b2c]">
        <div className="container">
          <motion.div
            {...reveal}
            className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"
          >
            <div>
              <p className="eyebrow text-secondary">
                Designed around your practice
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                One model. Different care contexts.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Choose the specialty context that best reflects your practice. The
              message and the path should fit the care decision patients are
              making.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              const active = selectedSpecialty === index;
              return (
                <button
                  key={specialty.name}
                  type="button"
                  onClick={() => setSelectedSpecialty(index)}
                  className={`group min-h-36 border p-5 text-left transition-all ${active ? `${specialty.border} bg-[#0f2740] shadow-[4px_4px_0_rgba(0,0,0,0.18)]` : "border-border bg-card/60 hover:-translate-y-1 hover:border-secondary/50"}`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`font-mono text-xs ${active ? specialty.color : "text-muted-foreground"}`}
                    >
                      0{index + 1}
                    </span>
                    <Icon
                      className={`h-5 w-5 ${active ? specialty.color : "text-muted-foreground group-hover:text-secondary"}`}
                    />
                  </div>
                  <p className="mt-8 font-semibold text-foreground">
                    {specialty.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {specialty.focus}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-rule">
        <div className="container">
          <motion.div
            {...reveal}
            className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-end"
          >
            <div>
              <span className="signal-label">The operating model</span>
              <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The work should make sense at every stage.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              The model is intentionally simple: create a clear growth
              hypothesis, build the path, then use the signal to make a better
              next decision.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-3">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.08 }}
                  key={item.number}
                  className="group bg-background p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="metric-value text-3xl text-primary">
                      {item.number}
                    </span>
                    <Icon className="h-6 w-6 text-secondary transition-transform duration-200 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="mt-14 text-xl font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                  <div className="mt-8 h-px w-10 bg-primary transition-all duration-200 group-hover:w-20" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-rule bg-[#081b2c]">
        <div className="container">
          <motion.div
            {...reveal}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <p className="eyebrow text-secondary">The growth toolkit</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Every channel should point to a useful next step.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
            >
              Explore capabilities <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.05 }}
                  key={service.title}
                  className="signal-card group p-6"
                >
                  <Icon className="h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-110" />
                  <h3 className="mt-12 text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-rule overflow-hidden">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <motion.div {...reveal}>
              <span className="signal-label">
                Why the model changes the work
              </span>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Risk should not sit on one side of the table.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A performance model is built to keep the conversation focused on
                shared outcomes. It replaces activity for activity’s sake with a
                more direct question: is the system creating a meaningful
                patient opportunity?
              </p>
              <Link
                href="/compare"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-foreground"
              >
                See the performance difference{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="signal-panel p-5 sm:p-8"
            >
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 border-b border-border pb-5 text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground">
                <span>Model</span>
                <span>Traditional</span>
                <span className="text-right text-secondary">DocPropel</span>
              </div>
              {[
                ["Incentive", "Hours and retainers", "Patient opportunity"],
                ["Reporting", "Activity recap", "Shared performance view"],
                ["Risk", "Practice carries it", "Aligned around results"],
                ["Next step", "More marketing", "Improve the system"],
              ].map(([label, left, right]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_auto_1fr] gap-3 border-b border-border/70 py-5 text-sm last:border-b-0"
                >
                  <span className="font-semibold text-foreground">{label}</span>
                  <span className="text-muted-foreground">{left}</span>
                  <span className="text-right font-medium text-secondary">
                    {right}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-shell section-rule bg-[#081b2c]">
        <div className="container">
          <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-secondary">Input, not guesswork</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Start with the numbers you already know.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Use the growth calculator to frame the conversation. It is a
              starting point for a discussion, not a promise of results.
            </p>
          </motion.div>
          <div className="mt-12">
            <ROICalculator />
          </div>
        </div>
      </section>

      <section className="grid-lines relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(246,248,251,0.34),transparent_28%)]" />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <motion.div
            {...reveal}
            className="grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <p className="eyebrow text-[#071829]/70">
                The next useful conversation
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Let’s map the growth system your practice actually needs.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#071829]/80">
                Start with a practice growth brief. We will use it to understand
                your context, pressure-test the opportunity, and decide whether
                there is a fit.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <IntakeForm
                trigger={
                  <Button
                    size="lg"
                    className="min-h-[3.25rem] bg-[#071829] px-6 text-base font-semibold text-foreground shadow-[0_4px_0_rgba(246,248,251,0.5)] transition-transform hover:-translate-y-1 hover:bg-[#0f2740] active:translate-y-1 active:shadow-none"
                  >
                    Request a growth brief{" "}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <a href="tel:1-800-362-7767">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-[3.25rem] w-full border-[#071829]/50 bg-transparent px-6 text-base font-semibold text-[#071829] hover:bg-[#071829]/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  1-800-DOC-PROPEL
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
