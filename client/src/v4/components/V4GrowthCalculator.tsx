import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { planningAssumptions, type PlanningSpecialty } from "../data";

function InputRecord({
  id,
  index,
  label,
  helper,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
}: {
  id: string;
  index: string;
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
    <div className="v4-calc-record">
      <div className="v4-calc-record-head">
        <span>{index}</span>
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>
          {prefix}
          {value.toLocaleString()}
        </output>
      </div>
      <div className="v4-range-control">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          aria-label={`Decrease ${label}`}
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
          onClick={() => onChange(clamp(value + step))}
          aria-label={`Increase ${label}`}
        >
          <Plus aria-hidden="true" size={16} />
        </button>
      </div>
      <p>{helper}</p>
    </div>
  );
}

export default function V4GrowthCalculator() {
  const id = useId();
  const [specialty, setSpecialty] = useState<PlanningSpecialty>("doctors");
  const [monthlyPatients, setMonthlyPatients] = useState(30);
  const [patientValue, setPatientValue] = useState(500);
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);
  const model = planningAssumptions[specialty];
  const additionalPatients = Math.round(monthlyPatients * model.growth);
  const monthlyRevenueIncrease = additionalPatients * patientValue;
  const annualRevenueIncrease = monthlyRevenueIncrease * 12;
  const submitLead = trpc.calculator.submitLead.useMutation({
    onSuccess: () => {
      setRequested(true);
      toast.success("Your planning summary is ready.");
    },
    onError: () =>
      toast.error("The summary could not be requested. Please try again."),
  });

  const changeSpecialty = (next: PlanningSpecialty) => {
    setSpecialty(next);
    setPatientValue(planningAssumptions[next].avgValue);
    setRequested(false);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLead.mutateAsync({
      email,
      specialty: model.label,
      monthlyPatients,
      patientValue,
      projectedGrowth: model.growth,
      projectedAnnualRevenue: annualRevenueIncrease,
    });
  };

  return (
    <section className="v4-calculator" aria-labelledby={`${id}-title`}>
      <header className="v4-calc-header">
        <div>
          <p className="v4-kicker">Model input / editable</p>
          <h3 id={`${id}-title`}>Illustrative growth range</h3>
        </div>
        <span className="v4-status">
          <i /> assumption model
        </span>
      </header>
      <div className="v4-calculator-grid">
        <form className="v4-calc-inputs" onSubmit={submit}>
          <div className="v4-calc-record">
            <div className="v4-calc-record-head">
              <span>IN-01</span>
              <label htmlFor={`${id}-specialty`}>Practice specialty</label>
            </div>
            <select
              id={`${id}-specialty`}
              value={specialty}
              onChange={event =>
                changeSpecialty(event.target.value as PlanningSpecialty)
              }
            >
              {Object.entries(planningAssumptions).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.label}
                </option>
              ))}
            </select>
            <p>
              Sets the original site's planning assumption and starting patient
              value.
            </p>
          </div>
          <InputRecord
            id={`${id}-patients`}
            index="IN-02"
            label="Monthly new patients"
            helper="Your current average number of new patients per month."
            value={monthlyPatients}
            onChange={value => {
              setMonthlyPatients(value);
              setRequested(false);
            }}
            min={5}
            max={200}
            step={1}
          />
          <InputRecord
            id={`${id}-value`}
            index="IN-03"
            label="Average revenue per patient"
            helper="Average lifetime value or initial-visit revenue, in dollars."
            value={patientValue}
            onChange={value => {
              setPatientValue(value);
              setRequested(false);
            }}
            min={100}
            max={10000}
            step={50}
            prefix="$"
          />
          <div className="v4-calc-email">
            <label htmlFor={`${id}-email`}>
              Email for your planning summary
            </label>
            <div>
              <input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                required
                placeholder="doctor@practice.com"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <button
                className="v4-button v4-button--primary"
                type="submit"
                disabled={submitLead.isPending}
              >
                {submitLead.isPending ? "Calculating" : "Calculate"}
                <ArrowRight aria-hidden="true" size={16} />
              </button>
            </div>
            <p>
              Your details are used to prepare the requested summary. No spam.
            </p>
          </div>
        </form>
        <aside className="v4-calc-output" aria-live="polite">
          <div className="v4-calc-output-head">
            <span>OUTPUT-01</span>
            <span>Illustrative annual opportunity</span>
          </div>
          <strong className="v4-calc-total">
            +${annualRevenueIncrease.toLocaleString()}
          </strong>
          <p>
            Based on the selected inputs and a {Math.round(model.growth * 100)}%
            planning assumption for {model.label.toLowerCase()}.
          </p>
          <dl>
            <div>
              <dt>Potential new patients / year</dt>
              <dd>+{(additionalPatients * 12).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Illustrative monthly opportunity</dt>
              <dd>+${monthlyRevenueIncrease.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Assumption</dt>
              <dd>{Math.round(model.growth * 100)}%</dd>
            </div>
          </dl>
          <div className="v4-calc-state" data-requested={requested}>
            {requested ? (
              <>
                <CheckCircle2 aria-hidden="true" size={16} /> Summary requested.
                Use it as a starting point for review.
              </>
            ) : (
              "Adjust inputs to inspect the planning range."
            )}
          </div>
          <p className="v4-calc-disclaimer">
            This tool is illustrative, not a performance guarantee. Individual
            results vary by market conditions, specialty, capacity, and practice
            readiness.
          </p>
        </aside>
      </div>
    </section>
  );
}
