import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

const specialtyModels = {
  doctors: { label: "Doctors / Physicians", growth: 0.25, avgValue: 500 },
  dentists: { label: "Dentists", growth: 0.35, avgValue: 1200 },
  pharmacy: { label: "Pharmacies", growth: 0.3, avgValue: 85 },
  pt_ot: { label: "PT / OT Clinics", growth: 0.28, avgValue: 1500 },
  urgent: { label: "Urgent Care", growth: 0.4, avgValue: 250 },
  specialty: { label: "Specialty Practice", growth: 0.22, avgValue: 2500 },
} as const;

type SpecialtyKey = keyof typeof specialtyModels;

type NumberFieldProps = {
  label: string;
  helper: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  onChange: (value: number) => void;
};

function NumberField({
  label,
  helper,
  value,
  min,
  max,
  step,
  prefix = "",
  onChange,
}: NumberFieldProps) {
  const id = useId();
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  return (
    <fieldset className="v5-calc__field">
      <legend>{label}</legend>
      <div className="v5-calc__value" aria-live="polite">
        {prefix}
        {value.toLocaleString()}
      </div>
      <div className="v5-calc__range-row">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          aria-label={`Decrease ${label}`}
        >
          <Minus aria-hidden="true" size={17} />
        </button>
        <label className="v5-visually-hidden" htmlFor={id}>
          {label}
        </label>
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
          <Plus aria-hidden="true" size={17} />
        </button>
      </div>
      <p>{helper}</p>
    </fieldset>
  );
}

export default function V5Calculator() {
  const [specialty, setSpecialty] = useState<SpecialtyKey>("doctors");
  const [monthlyPatients, setMonthlyPatients] = useState(30);
  const [patientValue, setPatientValue] = useState(500);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const model = specialtyModels[specialty];
  const additionalPatients = Math.round(monthlyPatients * model.growth);
  const monthlyRevenue = additionalPatients * patientValue;
  const annualRevenue = monthlyRevenue * 12;

  const submitLead = trpc.calculator.submitLead.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const markChanged = () => {
    setSubmitted(false);
    if (submitLead.error) submitLead.reset();
  };

  const handleSpecialty = (next: SpecialtyKey) => {
    setSpecialty(next);
    setPatientValue(specialtyModels[next].avgValue);
    markChanged();
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitLead.mutate({
      email,
      specialty: model.label,
      monthlyPatients,
      patientValue,
      projectedGrowth: model.growth,
      projectedAnnualRevenue: annualRevenue,
    });
  };

  return (
    <section className="v5-calc" aria-labelledby="v5-calc-title">
      <div className="v5-calc__head">
        <p className="v5-eyebrow">Interactive planning model</p>
        <h2 id="v5-calc-title">Tune the inputs. See the planning range.</h2>
        <p>
          Adjust practice-level assumptions, then request a summary. The model
          is illustrative—not a forecast or performance guarantee.
        </p>
      </div>
      <form className="v5-calc__form" onSubmit={submit}>
        <div className="v5-calc__inputs">
          <label className="v5-calc__select">
            Practice specialty
            <select
              value={specialty}
              onChange={event =>
                handleSpecialty(event.target.value as SpecialtyKey)
              }
            >
              {Object.entries(specialtyModels).map(([key, value]) => (
                <option value={key} key={key}>
                  {value.label}
                </option>
              ))}
            </select>
            <span>
              Sets an editable planning assumption for the care setting.
            </span>
          </label>
          <NumberField
            label="Monthly new patients"
            helper="Your current average new-patient volume."
            value={monthlyPatients}
            min={5}
            max={200}
            step={1}
            onChange={value => {
              setMonthlyPatients(value);
              markChanged();
            }}
          />
          <NumberField
            label="Average revenue per patient"
            helper="Average lifetime value or initial-visit revenue."
            value={patientValue}
            min={100}
            max={10000}
            step={50}
            prefix="$"
            onChange={value => {
              setPatientValue(value);
              markChanged();
            }}
          />
        </div>
        <aside
          className="v5-calc__output"
          aria-label="Illustrative calculator output"
        >
          <p>Illustrative annual opportunity</p>
          <strong>+${annualRevenue.toLocaleString()}</strong>
          <span>
            Based on your inputs and a {Math.round(model.growth * 100)}%
            planning assumption for {model.label.toLowerCase()}.
          </span>
          <dl>
            <div>
              <dt>Potential new patients / year</dt>
              <dd>+{(additionalPatients * 12).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Illustrative monthly opportunity</dt>
              <dd>+${monthlyRevenue.toLocaleString()}</dd>
            </div>
          </dl>
          <div className="v5-calc__trace" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="v5-calc__disclaimer">
            Individual outcomes vary by market conditions, specialty, capacity,
            service mix, and practice readiness.
          </p>
        </aside>
        <div className="v5-calc__submit">
          <label htmlFor="v5-calc-email">
            Email for your planning summary
            <input
              id="v5-calc-email"
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                markChanged();
              }}
              placeholder="you@practice.com"
            />
          </label>
          <button
            className="v5-button"
            type="submit"
            disabled={submitLead.isPending}
          >
            {submitLead.isPending ? "Preparing…" : "Request summary"}
            <ArrowRight aria-hidden="true" size={17} />
          </button>
          <p className="v5-calc__privacy">
            Practice contact details only. Please do not submit PHI.
          </p>
          {submitted ? (
            <p className="v5-calc__success" role="status">
              <Check aria-hidden="true" size={17} /> Summary requested. Use it
              as a starting point for a conversation.
            </p>
          ) : null}
          {submitLead.error ? (
            <p className="v5-form-error" role="alert">
              We could not request your summary. Please check your email and try
              again.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
