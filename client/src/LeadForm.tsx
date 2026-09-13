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

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const confirmationRef = useRef<HTMLDivElement>(null);
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
      <div className="field">
        <label htmlFor="lead-name">
          Full name <b aria-hidden="true">*</b>
        </label>
        <input
          id="lead-name"
          name="name"
          autoComplete="name"
          required
          maxLength={140}
        />
      </div>
      <div className="field">
        <label htmlFor="lead-email">
          Work email <b aria-hidden="true">*</b>
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </div>
      <div className="field">
        <label htmlFor="lead-phone">
          Phone <span>(optional)</span>
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
        />
      </div>
      <div className="field">
        <label htmlFor="lead-practice">
          Practice name <b aria-hidden="true">*</b>
        </label>
        <input
          id="lead-practice"
          name="practiceName"
          autoComplete="organization"
          required
          maxLength={180}
        />
      </div>
      <div className="field">
        <label htmlFor="lead-specialty">
          Specialization <b aria-hidden="true">*</b>
        </label>
        <select id="lead-specialty" name="specialty" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {SPECIALTIES.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="lead-location">
          City / State <span>(optional)</span>
        </label>
        <input
          id="lead-location"
          name="location"
          autoComplete="address-level2"
          maxLength={180}
        />
      </div>
      {!compact && (
        <div className="field wide">
          <label htmlFor="lead-monthly">
            Current monthly new-patient range <span>(optional)</span>
          </label>
          <select id="lead-monthly" name="monthlyPatients" defaultValue="">
            <option value="">Select a range</option>
            {ranges.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      )}
      <div className="field wide">
        <label htmlFor="lead-message">
          Growth challenge <span>(optional)</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={compact ? 3 : 4}
          maxLength={3000}
          aria-describedby="phi-guidance"
        />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p id="phi-guidance" className="form-guidance wide">
        <strong>Do not include patient or protected health information.</strong>
      </p>
      <label className="consent wide">
        <input name="consent" type="checkbox" required />{" "}
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
        Required fields are marked with an asterisk.
      </p>
    </form>
  );
}
