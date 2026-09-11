import { useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const SPECIALTIES = {
  doctors: { label: "Doctors / Physicians", growth: 0.25, avgValue: 500 },
  dentists: { label: "Dentists", growth: 0.35, avgValue: 1200 },
  pharmacy: { label: "Pharmacies", growth: 0.3, avgValue: 85 },
  pt_ot: { label: "PT / OT Clinics", growth: 0.28, avgValue: 1500 },
  urgent: { label: "Urgent Care", growth: 0.4, avgValue: 250 },
  specialty: { label: "Specialty Practice", growth: 0.22, avgValue: 2500 },
};

type SpecialtyKey = keyof typeof SPECIALTIES;

type NumberControlProps = {
  id: string;
  label: string;
  helper: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  onChange: (value: number) => void;
};

function NumberControl({
  id,
  label,
  helper,
  value,
  min,
  max,
  step,
  prefix = "",
  onChange,
}: NumberControlProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  return (
    <div className="v3-calc-field">
      <div className="v3-calc-label-row">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>
          {prefix}
          {value.toLocaleString()}
        </output>
      </div>
      <div className="v3-range-row">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(clamp(value - step))}
        >
          <Minus aria-hidden="true" size={16} />
        </button>
        <input
          id={id}
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
          <Plus aria-hidden="true" size={16} />
        </button>
      </div>
      <p>{helper}</p>
    </div>
  );
}

export default function V3GrowthCalculator() {
  const [specialty, setSpecialty] = useState<SpecialtyKey>("doctors");
  const [monthlyPatients, setMonthlyPatients] = useState(30);
  const [patientValue, setPatientValue] = useState(500);
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);

  const model = SPECIALTIES[specialty];
  const additionalPatients = Math.round(monthlyPatients * model.growth);
  const monthlyRevenueIncrease = additionalPatients * patientValue;
  const annualRevenueIncrease = monthlyRevenueIncrease * 12;

  const submitLead = trpc.calculator.submitLead.useMutation({
    onSuccess: () => {
      setRequested(true);
      toast.success("Your planning summary is ready.");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const updateSpecialty = (next: SpecialtyKey) => {
    setSpecialty(next);
    setPatientValue(SPECIALTIES[next].avgValue);
    setRequested(false);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await submitLead.mutateAsync({
        email,
        specialty: model.label,
        monthlyPatients,
        patientValue,
        projectedGrowth: model.growth,
        projectedAnnualRevenue: annualRevenueIncrease,
      });
    } catch {
      // Mutation callbacks surface the result without exposing form values.
    }
  };

  return (
    <section className="v3-calculator" aria-labelledby="v3-calculator-title">
      <div className="v3-calc-copy">
        <p className="v3-kicker">Growth planning tool</p>
        <h2 id="v3-calculator-title">Put a planning range on paper.</h2>
        <p>
          Adjust the care setting, current monthly new-patient volume, and
          average patient value. The result is a scenario to discuss—not a
          forecast or guarantee.
        </p>
        <ol className="v3-calc-key">
          <li>
            <span>1</span> Start with today's practice
          </li>
          <li>
            <span>2</span> Apply a specialty planning assumption
          </li>
          <li>
            <span>3</span> Review against capacity and market context
          </li>
        </ol>
      </div>

      <form className="v3-calc-form" onSubmit={submit}>
        <div className="v3-calc-field">
          <label htmlFor="v3-specialty">Practice specialty</label>
          <select
            id="v3-specialty"
            value={specialty}
            onChange={event =>
              updateSpecialty(event.target.value as SpecialtyKey)
            }
          >
            {Object.entries(SPECIALTIES).map(([key, details]) => (
              <option key={key} value={key}>
                {details.label}
              </option>
            ))}
          </select>
          <p>Each care setting begins with a different planning assumption.</p>
        </div>
        <NumberControl
          id="v3-monthly-patients"
          label="Monthly new patients"
          helper="Your current average number of new patients per month."
          min={5}
          max={200}
          step={1}
          value={monthlyPatients}
          onChange={value => {
            setMonthlyPatients(value);
            setRequested(false);
          }}
        />
        <NumberControl
          id="v3-patient-value"
          label="Average revenue per patient"
          helper="Average lifetime value or initial-visit revenue, in dollars."
          min={100}
          max={10000}
          step={50}
          prefix="$"
          value={patientValue}
          onChange={value => {
            setPatientValue(value);
            setRequested(false);
          }}
        />
        <label className="v3-calc-email" htmlFor="v3-calculator-email">
          Email for your planning summary
          <span>
            <input
              id="v3-calculator-email"
              type="email"
              autoComplete="email"
              required
              placeholder="doctor@practice.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <button
              className="v3-button"
              type="submit"
              disabled={submitLead.isPending}
            >
              {submitLead.isPending ? "Calculating…" : "Request summary"}
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </span>
        </label>
      </form>

      <aside className="v3-calc-result" aria-live="polite">
        <p>Illustrative annual opportunity</p>
        <strong>+${annualRevenueIncrease.toLocaleString()}</strong>
        <span>
          Using a {Math.round(model.growth * 100)}% planning assumption for{" "}
          {model.label.toLowerCase()}.
        </span>
        <dl>
          <div>
            <dt>Potential new patients / year</dt>
            <dd>+{(additionalPatients * 12).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Illustrative monthly opportunity</dt>
            <dd>+${monthlyRevenueIncrease.toLocaleString()}</dd>
          </div>
        </dl>
        {requested ? (
          <p className="v3-calc-confirmation">
            <CheckCircle2 aria-hidden="true" size={17} /> Summary requested. Use
            this as a starting point for a conversation.
          </p>
        ) : null}
        <small>
          Illustrative only, not a performance guarantee. Individual results
          vary by market, specialty, capacity, competition, and practice
          readiness.
        </small>
      </aside>
    </section>
  );
}
