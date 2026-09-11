import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import IntakeForm from "@/components/IntakeForm";

const SPECIALTIES = {
  doctors: { label: "Doctors / Physicians", defaultValue: 500 },
  dentists: { label: "Dentists", defaultValue: 1200 },
  pharmacy: { label: "Pharmacies", defaultValue: 85 },
  pt_ot: { label: "PT / OT Clinics", defaultValue: 1500 },
  urgent: { label: "Urgent Care", defaultValue: 250 },
  specialty: { label: "Specialty Practice", defaultValue: 2500 },
};

export default function ROICalculator() {
  const [specialty, setSpecialty] = useState("doctors");
  const [monthlyPatients, setMonthlyPatients] = useState(30);
  const [patientValue, setPatientValue] = useState(500);
  const [scenarioRate, setScenarioRate] = useState(20);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSpecialty = SPECIALTIES[specialty as keyof typeof SPECIALTIES];
  const additionalPatients = Math.round(monthlyPatients * (scenarioRate / 100));
  const monthlyRevenueIncrease = additionalPatients * patientValue;
  const annualRevenueIncrease = monthlyRevenueIncrease * 12;

  const submitLead = trpc.calculator.submitLead.useMutation({
    onSuccess: () => toast.success("Your planning scenario is ready."),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSpecialtyChange = (value: string) => {
    setSpecialty(value);
    setPatientValue(
      SPECIALTIES[value as keyof typeof SPECIALTIES].defaultValue
    );
  };

  const handleCalculate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await submitLead.mutateAsync({
        email,
        specialty: selectedSpecialty.label,
        monthlyPatients,
        patientValue,
        projectedGrowth: scenarioRate / 100,
        projectedAnnualRevenue: annualRevenueIncrease,
      });
      setShowResults(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-5xl overflow-hidden border border-border bg-card shadow-[10px_10px_0_rgba(0,0,0,0.16)]">
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-border bg-card p-6 sm:p-8 md:border-b-0 md:border-r">
          <div className="flex items-start justify-between gap-5 border-b border-border pb-6">
            <div>
              <p className="eyebrow text-secondary">
                Calculator / planning input
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Build an illustrative scenario.
              </h3>
            </div>
            <Calculator className="h-7 w-7 shrink-0 text-primary" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Set the inputs you want to discuss. The scenario rate is your chosen
            planning assumption, not a forecast or performance claim.
          </p>

          <form onSubmit={handleCalculate} className="mt-7 space-y-7">
            <div className="space-y-3">
              <Label htmlFor="specialty" className="text-sm font-medium">
                Practice specialty
              </Label>
              <Select value={specialty} onValueChange={handleSpecialtyChange}>
                <SelectTrigger
                  id="specialty"
                  className="h-12 border-border bg-background text-base"
                >
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SPECIALTIES).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <SliderField
              label="Monthly new patients"
              value={monthlyPatients}
              display={String(monthlyPatients)}
              min={5}
              max={200}
              step={1}
              onChange={setMonthlyPatients}
              help="Enter a current monthly baseline."
            />
            <SliderField
              label="Revenue per patient"
              value={patientValue}
              display={`$${patientValue.toLocaleString()}`}
              min={100}
              max={10000}
              step={50}
              onChange={setPatientValue}
              help="Use the lifetime value or initial-visit value you prefer."
            />
            <SliderField
              label="Illustrative planning rate"
              value={scenarioRate}
              display={`${scenarioRate}%`}
              min={5}
              max={50}
              step={1}
              onChange={setScenarioRate}
              help="Choose the scenario you want to explore. This is not a prediction."
            />

            <div className="border-t border-border pt-6">
              <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                Where should we send this planning scenario?
              </Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@practice.com"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="h-12 border-border bg-background text-base"
                />
                <Button
                  type="submit"
                  className="signal-button h-12 bg-primary px-5 font-semibold text-primary-foreground hover:bg-[#ff9639]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Calculating…" : "Calculate"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-[#18b69b]" />
                Your data is used to generate this planning scenario.
              </p>
            </div>
          </form>
        </div>

        <div className="relative flex min-h-[34rem] flex-col justify-center overflow-hidden bg-[#0f2740] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-[-6rem] top-[-6rem] h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-7rem] left-[-7rem] h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-secondary/40 bg-secondary/10 text-secondary">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <p className="eyebrow mt-8 text-secondary">Scenario output</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
                  Set your inputs to see the planning view.
                </h3>
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-muted-foreground">
                  The result will show the mathematical impact of the inputs and
                  planning rate you select.
                </p>
                <div className="mt-9 grid grid-cols-2 gap-3 text-left opacity-45">
                  {["Additional patients", "Annual scenario"].map(label => (
                    <div
                      key={label}
                      className="border border-border bg-background/30 p-4"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        {label}
                      </p>
                      <div className="mt-3 h-7 w-20 bg-muted" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.25 }}
                className="relative z-10"
              >
                <p className="eyebrow text-secondary">
                  Illustrative annual scenario
                </p>
                <p className="metric-value mt-3 text-5xl font-semibold tracking-[-0.065em] text-foreground sm:text-6xl">
                  ${annualRevenueIncrease.toLocaleString()}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on your selected inputs and {scenarioRate}% planning
                  rate.
                </p>
                <div className="mt-8 grid gap-3">
                  <Metric
                    label="Additional patients / year"
                    value={`+${additionalPatients * 12}`}
                    icon={Users}
                    color="text-secondary"
                  />
                  <Metric
                    label="Illustrative monthly amount"
                    value={`$${monthlyRevenueIncrease.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-primary"
                  />
                </div>
                <div className="mt-7 border border-secondary/25 bg-secondary/5 p-4 text-sm leading-relaxed text-muted-foreground">
                  This mathematical scenario is not a forecast. Performance
                  depends on market conditions, practice capacity, patient
                  behavior, and implementation.
                </div>
                <IntakeForm
                  trigger={
                    <Button className="signal-button mt-7 w-full bg-primary font-semibold text-primary-foreground hover:bg-[#ff9639]">
                      Discuss this scenario{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

function SliderField({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  help,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  help: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="border border-secondary/35 bg-secondary/10 px-2.5 py-1 font-mono text-sm font-medium text-secondary">
          {display}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={values => onChange(values[0])}
        className="py-2"
      />
      <p className="text-xs text-muted-foreground">{help}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: typeof Users;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between border border-border bg-background/30 p-4">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="font-mono text-xl font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}
