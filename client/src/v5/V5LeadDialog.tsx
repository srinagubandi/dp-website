import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

type BriefValues = {
  practiceName: string;
  specialty: string;
  location: string;
  patientVolume: string;
  goal: string;
  website: string;
  email: string;
  notes: string;
};

const initialValues: BriefValues = {
  practiceName: "",
  specialty: "",
  location: "",
  patientVolume: "",
  goal: "",
  website: "",
  email: "",
  notes: "",
};

export default function V5LeadDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(initialValues);
  const submitBrief = trpc.leads.submitBrief.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const update = (field: keyof BriefValues, value: string) => {
    setValues(current => ({ ...current, [field]: value }));
    if (submitBrief.error) submitBrief.reset();
  };

  const reset = () => {
    setOpen(false);
    window.setTimeout(() => {
      setSubmitted(false);
      setValues(initialValues);
      submitBrief.reset();
    }, 180);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitBrief.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={next => (next ? setOpen(true) : reset())}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="v5-dialog"
        aria-describedby="v5-brief-description"
        showCloseButton={false}
      >
        <DialogClose
          className="v5-dialog__close"
          aria-label="Close Growth Brief"
        >
          <X aria-hidden="true" size={20} />
        </DialogClose>
        {submitted ? (
          <div className="v5-dialog__success" role="status">
            <span className="v5-dialog__success-mark" aria-hidden="true">
              <Check size={26} />
            </span>
            <p className="v5-eyebrow">Brief received</p>
            <DialogTitle>
              Thank you for sharing the practice context.
            </DialogTitle>
            <DialogDescription id="v5-brief-description">
              We will review your information and follow up about whether there
              is a clear opportunity for the DocPropel model to add value.
            </DialogDescription>
            <button className="v5-button" type="button" onClick={reset}>
              Return to site <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        ) : (
          <div className="v5-dialog__layout">
            <aside className="v5-dialog__intro">
              <p className="v5-eyebrow">Practice Growth Brief</p>
              <DialogTitle>
                A focused intake. No pitch deck required.
              </DialogTitle>
              <DialogDescription id="v5-brief-description">
                Share the operational context that matters. We use it only to
                evaluate fit and respond to this request.
              </DialogDescription>
              <div className="v5-dialog__boundary">
                <ShieldCheck aria-hidden="true" size={20} />
                <p>
                  <strong>Please do not include PHI.</strong> Do not enter
                  patient names, medical details, or other protected health
                  information.
                </p>
              </div>
            </aside>
            <form className="v5-brief-form" onSubmit={handleSubmit}>
              <div className="v5-form-grid">
                <label>
                  Practice name
                  <input
                    required
                    autoComplete="organization"
                    value={values.practiceName}
                    onChange={event =>
                      update("practiceName", event.target.value)
                    }
                    placeholder="City Dental Care"
                  />
                </label>
                <label>
                  Primary specialty
                  <select
                    required
                    value={values.specialty}
                    onChange={event => update("specialty", event.target.value)}
                  >
                    <option value="" disabled>
                      Select specialty
                    </option>
                    <option>Dental</option>
                    <option>Medical / Primary Care</option>
                    <option>Physical Therapy</option>
                    <option>Pharmacy</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Location(s)
                  <input
                    required
                    autoComplete="address-level2"
                    value={values.location}
                    onChange={event => update("location", event.target.value)}
                    placeholder="City, State"
                  />
                </label>
                <label>
                  Current patient volume <small>Optional</small>
                  <select
                    value={values.patientVolume}
                    onChange={event =>
                      update("patientVolume", event.target.value)
                    }
                  >
                    <option value="">Select a range</option>
                    <option>1–100 / month</option>
                    <option>101–500 / month</option>
                    <option>500+ / month</option>
                  </select>
                </label>
              </div>
              <label>
                Primary growth goal or challenge
                <textarea
                  required
                  rows={3}
                  value={values.goal}
                  onChange={event => update("goal", event.target.value)}
                  placeholder="What outcome are you trying to improve? Please exclude patient information."
                />
              </label>
              <div className="v5-form-grid">
                <label>
                  Website URL <small>Optional</small>
                  <input
                    type="url"
                    value={values.website}
                    onChange={event => update("website", event.target.value)}
                    placeholder="https://"
                  />
                </label>
                <label>
                  Best contact email
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={event => update("email", event.target.value)}
                    placeholder="you@practice.com"
                  />
                </label>
              </div>
              <label>
                Additional business context <small>Optional, no PHI</small>
                <textarea
                  rows={2}
                  value={values.notes}
                  onChange={event => update("notes", event.target.value)}
                  placeholder="Market, locations, or operational context"
                />
              </label>
              {submitBrief.error ? (
                <p className="v5-form-error" role="alert">
                  We could not send your brief. Check the fields and try again,
                  or call 1-800-DOC-PROPEL.
                </p>
              ) : null}
              <div className="v5-brief-form__footer">
                <p>
                  Your information is stored for the purpose of responding to
                  this request.
                </p>
                <button
                  className="v5-button"
                  type="submit"
                  disabled={submitBrief.isPending}
                >
                  {submitBrief.isPending ? "Sending…" : "Send Growth Brief"}
                  <ArrowRight aria-hidden="true" size={17} />
                </button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
