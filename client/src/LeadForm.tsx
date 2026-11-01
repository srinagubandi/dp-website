import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { api } from "./api";
import { SPECIALTIES } from "../../shared/site";

const ranges = [
  "Fewer than 25",
  "25–50",
  "51–100",
  "101–200",
  "More than 200",
  "Prefer not to say",
];

export default function LeadForm({
  compact = false,
  idPrefix = "lead",
}: {
  compact?: boolean;
  idPrefix?: string;
}) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const confirmationRef = useRef<HTMLDivElement>(null);
  const requiredFieldsNoteId = `${idPrefix}-required-fields-note`;
  const phiGuidanceId = `${idPrefix}-phi-guidance`;
  const attribution = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: window.location.pathname,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    };
  }, []);
  useEffect(() => {
    if (success) confirmationRef.current?.focus();
  }, [success]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const value = Object.fromEntries(form.entries());
    try {
      await api("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          ...value,
          ...attribution,
          consent: form.get("consent") === "on",
        }),
      });
      setSuccess(true);
      event.currentTarget.reset();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We could not submit the brief. Please call or email us."
      );
    } finally {
      setPending(false);
    }
  }
  if (success)
    return (
      <div
        ref={confirmationRef}
        className="form-confirmation"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <span aria-hidden="true">✓</span>
        <h3>Your Growth Brief request was received.</h3>
        <p>
          Thank you for sharing your practice context. If you need to add
          anything, email{" "}
          <a href="mailto:steve@docpropel.com">steve@docpropel.com</a>.
        </p>
      </div>
    );
  return (
    <form
      className={`lead-form ${compact ? "compact" : ""}`}
      onSubmit={submit}
      noValidate={false}
    >
      <p className="form-legend wide" id={requiredFieldsNoteId}>
        <span aria-hidden="true">*</span> Required fields
      </p>
      <div className="field">
        <label htmlFor={`${idPrefix}-name`}>
          Full name{" "}
          <span className="required-marker" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          required
          aria-required="true"
          aria-describedby={requiredFieldsNoteId}
          maxLength={140}
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-email`}>
          Work email{" "}
          <span className="required-marker" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={requiredFieldsNoteId}
          maxLength={254}
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-phone`}>
          Phone <span className="optional-marker">(optional)</span>
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-practice`}>
          Practice name{" "}
          <span className="required-marker" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id={`${idPrefix}-practice`}
          name="practiceName"
          autoComplete="organization"
          required
          aria-required="true"
          aria-describedby={requiredFieldsNoteId}
          maxLength={180}
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-specialty`}>
          Specialization{" "}
          <span className="required-marker" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id={`${idPrefix}-specialty`}
          name="specialty"
          required
          aria-required="true"
          aria-describedby={requiredFieldsNoteId}
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          {SPECIALTIES.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-location`}>
          City / State <span className="optional-marker">(optional)</span>
        </label>
        <input
          id={`${idPrefix}-location`}
          name="location"
          autoComplete="address-level2"
          maxLength={180}
        />
      </div>
      {!compact && (
        <div className="field wide">
          <label htmlFor={`${idPrefix}-monthly`}>
            Current monthly new-patient range{" "}
            <span className="optional-marker">(optional)</span>
          </label>
          <select
            id={`${idPrefix}-monthly`}
            name="monthlyPatients"
            defaultValue=""
          >
            <option value="">Select a range</option>
            {ranges.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      )}
      <div className="field wide">
        <label htmlFor={`${idPrefix}-message`}>
          Growth challenge <span className="optional-marker">(optional)</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={compact ? 3 : 4}
          maxLength={3000}
          aria-describedby={phiGuidanceId}
        />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p id={phiGuidanceId} className="form-guidance wide">
        <strong>Do not include patient or protected health information.</strong>
      </p>
      <label className="consent wide">
        <input
          name="consent"
          type="checkbox"
          required
          aria-required="true"
          aria-describedby={requiredFieldsNoteId}
        />{" "}
        <span>
          I agree that DocPropel may use this information to respond to my
          request. See the <Link href="/privacy">Privacy Notice</Link>.
        </span>
      </label>
      {error && (
        <p className="form-error wide" role="alert">
          {error}
        </p>
      )}
      <button className="button coral wide" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Request my Growth Brief"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="form-note wide" aria-live="polite">
        We use your practice information only to respond to this request.
      </p>
    </form>
  );
}
