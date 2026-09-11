import { useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const SPECIALTIES = {
  doctors: { label: "Doctors / Physicians", growth: 0.25, avgValue: 500 },
  dentists: { label: "Dentists", growth: 0.35, avgValue: 1200 },
  pharmacy: { label: "Pharmacies", growth: 0.3, avgValue: 85 },
  pt_ot: { label: "PT / OT Clinics", growth: 0.28, avgValue: 1500 },
  urgent: { label: "Urgent Care", growth: 0.4, avgValue: 250 },
  specialty: { label: "Specialty Practice", growth: 0.22, avgValue: 2500 },
};

type SpecialtyKey = keyof typeof SPECIALTIES;

function NumberControl({
  label,
  helper,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
}: {
  label: string;
  helper: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  return (
    <div className="v2-calc-field">
      <div className="v2-calc-field-head">
        <label>{label}</label>
        <span>
          {prefix}
          {value.toLocaleString()}
        </span>
      </div>
      <div className="v2-calc-control">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(clamp(value - step))}
        >
          <Minus size={15} />
        </button>
        <input
          aria-label={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={event => onChange(Number(event.target.value))}
        />
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(clamp(value + step))}
        >
          <Plus size={15} />
        </button>
      </div>
      <p>{helper}</p>
    </div>
  );
}

export default function V2GrowthCalculator() {
  const [specialty, setSpecialty] = useState<SpecialtyKey>("doctors");
  const [monthlyPatients, setMonthlyPatients] = useState(30);
  const [patientValue, setPatientValue] = useState(500);
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const model = SPECIALTIES[specialty];
  const additionalPatients = Math.round(monthlyPatients * model.growth);
  const monthlyRevenueIncrease = additionalPatients * patientValue;
  const annualRevenueIncrease = monthlyRevenueIncrease * 12;
  const submitLead = trpc.calculator.submitLead.useMutation({
    onSuccess: () => toast.success("Your planning summary is ready."),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const changeSpecialty = (next: SpecialtyKey) => {
    setSpecialty(next);
    setPatientValue(SPECIALTIES[next].avgValue);
    setShowResults(false);
  };

  const calculate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await submitLead.mutateAsync({
        email,
        specialty: model.label,
        monthlyPatients,
        patientValue,
        projectedGrowth: model.growth,
        projectedAnnualRevenue: annualRevenueIncrease,
      });
      setShowResults(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="v2-calc" aria-labelledby="v2-calculator-title">
      <div className="v2-calc-intro">
        <div className="v2-eyebrow">Growth planning tool</div>
        <h2 id="v2-calculator-title">A clearer place to begin.</h2>
        <p>
          Explore an illustrative planning range, then put it in the context of
          your practice, market, capacity, and patient path.
        </p>
        <div className="v2-calc-route" aria-hidden="true">
          <span>Practice today</span>
          <i />
          <span>Opportunity</span>
        </div>
      </div>
      <form className="v2-calc-form" onSubmit={calculate}>
        <div className="v2-calc-field">
          <label htmlFor="v2-specialty">Practice specialty</label>
          <select
            id="v2-specialty"
            value={specialty}
            onChange={event =>
              changeSpecialty(event.target.value as SpecialtyKey)
            }
          >
            {Object.entries(SPECIALTIES).map(([key, data]) => (
              <option key={key} value={key}>
                {data.label}
              </option>
            ))}
          </select>
          <p>Adjust the planning inputs for the care setting you serve.</p>
        </div>
        <NumberControl
          label="Monthly new patients"
          helper="Your current average number of new patients per month."
          value={monthlyPatients}
          onChange={value => {
            setMonthlyPatients(value);
            setShowResults(false);
          }}
          min={5}
          max={200}
          step={1}
        />
        <NumberControl
          label="Average revenue per patient"
          helper="Average lifetime value or initial-visit revenue, in dollars."
          value={patientValue}
          onChange={value => {
            setPatientValue(value);
            setShowResults(false);
          }}
          min={100}
          max={10000}
          step={50}
          prefix="$"
        />
        <div className="v2-calc-email">
          <label htmlFor="v2-calculator-email">
            Email for your planning summary
          </label>
          <div>
            <input
              id="v2-calculator-email"
              type="email"
              autoComplete="email"
              placeholder="doctor@practice.com"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <button className="v2-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Calculating" : "Calculate"}
              <ArrowRight size={15} />
            </button>
          </div>
          <p>
            Your details are used to prepare the requested summary. No spam.
          </p>
        </div>
      </form>
      <aside className="v2-calc-result" aria-live="polite">
        <div className="v2-calc-result-label">
          Illustrative annual opportunity
        </div>
        <div className="v2-calc-result-number">
          +${annualRevenueIncrease.toLocaleString()}
        </div>
        <p className="v2-calc-result-copy">
          Based on the inputs above and a planning assumption of{" "}
          {Math.round(model.growth * 100)}% growth for{" "}
          {model.label.toLowerCase()}.
        </p>
        <div className="v2-calc-metrics">
          <div>
            <span>Potential new patients / year</span>
            <strong>+{(additionalPatients * 12).toLocaleString()}</strong>
          </div>
          <div>
            <span>Illustrative monthly opportunity</span>
            <strong>+${monthlyRevenueIncrease.toLocaleString()}</strong>
          </div>
        </div>
        <div className="v2-calc-status">
          {showResults ? (
            <>
              <CheckCircle2 size={16} /> Summary requested—use this as a
              starting point for a conversation.
            </>
          ) : (
            "Adjust the inputs to explore the planning range."
          )}
        </div>
        <p className="v2-calc-disclaimer">
          This tool is illustrative, not a performance guarantee. Individual
          results vary by market conditions, specialty, capacity, and practice
          readiness.
        </p>
      </aside>
    </section>
  );
}
