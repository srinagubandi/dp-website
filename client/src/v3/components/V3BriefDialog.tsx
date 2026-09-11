import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialValues = {
  practiceName: "",
  specialty: "",
  location: "",
  patientVolume: "",
  goal: "",
  website: "",
  email: "",
  notes: "",
};

type BriefValues = typeof initialValues;

type V3BriefDialogProps = {
  trigger: ReactNode;
};

export default function V3BriefDialog({ trigger }: V3BriefDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const submitBrief = trpc.leads.submitBrief.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormError("");
      toast.success("Your Practice Growth Brief request has been received.");
    },
    onError: () => {
      setFormError(
        "We could not send your request. Please try again or call 1-800-DOC-PROPEL."
      );
    },
  });

  const update = (key: keyof BriefValues, value: string) => {
    setValues(current => ({ ...current, [key]: value }));
    setFormError("");
  };

  const reset = () => {
    setOpen(false);
    setStep(1);
    setSubmitted(false);
    setFormError("");
    setValues(initialValues);
  };

  const next = () => {
    if (!formRef.current?.reportValidity()) return;
    setStep(current => Math.min(3, current + 1));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");
    try {
      await submitBrief.mutateAsync(values);
    } catch {
      // The mutation callback presents a useful, non-sensitive error message.
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => (nextOpen ? setOpen(true) : reset())}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="v3-brief-dialog"
        aria-describedby="v3-brief-description"
        showCloseButton={false}
      >
        <DialogClose
          className="v3-dialog-close"
          aria-label="Close Growth Brief"
        >
          <X aria-hidden="true" size={20} />
        </DialogClose>

        {submitted ? (
          <div className="v3-brief-success">
            <span className="v3-success-mark" aria-hidden="true">
              <CheckCircle2 size={30} />
            </span>
            <p className="v3-kicker">Brief received</p>
            <DialogTitle>
              Thank you for sharing the practice context.
            </DialogTitle>
            <DialogDescription id="v3-brief-description">
              We will review the information and follow up to discuss whether
              the DocPropel performance model is a practical fit. This is a fit
              and measurement conversation—not a promise of results.
            </DialogDescription>
            <button className="v3-button" type="button" onClick={reset}>
              Return to the guide <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="v3-brief-heading">
              <div>
                <p className="v3-kicker">Practice Growth Brief</p>
                <DialogTitle>Let’s begin with the useful context.</DialogTitle>
              </div>
              <span aria-live="polite">Step {step} of 3</span>
            </div>
            <DialogDescription id="v3-brief-description">
              A short, no-pressure fit check. Please share business context only
              and do not include patient names, diagnoses, or other health
              information.
            </DialogDescription>
            <ol
              className="v3-brief-progress"
              aria-label="Growth Brief progress"
            >
              {["Practice", "Priority", "Contact"].map((label, index) => (
                <li data-active={index + 1 <= step} key={label}>
                  <span>
                    {index + 1 <= step ? <Check size={12} /> : index + 1}
                  </span>
                  {label}
                </li>
              ))}
            </ol>

            <form ref={formRef} className="v3-brief-form" onSubmit={submit}>
              {step === 1 ? (
                <fieldset>
                  <legend>Tell us about the practice</legend>
                  <label htmlFor="v3-brief-specialty">
                    Practice type
                    <select
                      id="v3-brief-specialty"
                      required
                      autoFocus
                      value={values.specialty}
                      onChange={event =>
                        update("specialty", event.target.value)
                      }
                    >
                      <option value="" disabled>
                        Choose a practice type
                      </option>
                      <option>Dental</option>
                      <option>Medical / Primary Care</option>
                      <option>Urgent Care</option>
                      <option>Physical Therapy / OT</option>
                      <option>Pharmacy</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label htmlFor="v3-brief-location">
                    Location or service area
                    <input
                      id="v3-brief-location"
                      required
                      value={values.location}
                      onChange={event => update("location", event.target.value)}
                      placeholder="City, State"
                    />
                  </label>
                </fieldset>
              ) : null}

              {step === 2 ? (
                <fieldset>
                  <legend>What should we understand?</legend>
                  <div className="v3-form-pair">
                    <label htmlFor="v3-brief-name">
                      Practice name
                      <input
                        id="v3-brief-name"
                        required
                        autoFocus
                        value={values.practiceName}
                        onChange={event =>
                          update("practiceName", event.target.value)
                        }
                        placeholder="City Dental Care"
                      />
                    </label>
                    <label htmlFor="v3-brief-volume">
                      Current patient volume <small>Optional</small>
                      <select
                        id="v3-brief-volume"
                        value={values.patientVolume}
                        onChange={event =>
                          update("patientVolume", event.target.value)
                        }
                      >
                        <option value="">Choose a monthly range</option>
                        <option>1–100 / month</option>
                        <option>101–500 / month</option>
                        <option>500+ / month</option>
                      </select>
                    </label>
                  </div>
                  <label htmlFor="v3-brief-goal">
                    Primary growth goal or challenge
                    <textarea
                      id="v3-brief-goal"
                      required
                      rows={4}
                      value={values.goal}
                      onChange={event => update("goal", event.target.value)}
                      placeholder="What business outcome or patient path would you like to improve?"
                    />
                  </label>
                </fieldset>
              ) : null}

              {step === 3 ? (
                <fieldset>
                  <legend>Where should we send the next step?</legend>
                  <div className="v3-form-pair">
                    <label htmlFor="v3-brief-email">
                      Best contact email
                      <input
                        id="v3-brief-email"
                        required
                        autoFocus
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={event => update("email", event.target.value)}
                        placeholder="doctor@practice.com"
                      />
                    </label>
                    <label htmlFor="v3-brief-website">
                      Website URL <small>Optional</small>
                      <input
                        id="v3-brief-website"
                        type="url"
                        value={values.website}
                        onChange={event =>
                          update("website", event.target.value)
                        }
                        placeholder="https://"
                      />
                    </label>
                  </div>
                  <label htmlFor="v3-brief-notes">
                    Additional business context <small>Optional</small>
                    <textarea
                      id="v3-brief-notes"
                      rows={3}
                      value={values.notes}
                      onChange={event => update("notes", event.target.value)}
                      placeholder="Anything else about your market, capacity, or current approach?"
                    />
                  </label>
                  <p className="v3-privacy-note">
                    Your information is used to respond to this request. Do not
                    include patient or clinical information.
                  </p>
                </fieldset>
              ) : null}

              {formError ? (
                <p className="v3-form-error" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="v3-brief-actions">
                {step > 1 ? (
                  <button
                    className="v3-text-button"
                    type="button"
                    onClick={() => setStep(current => current - 1)}
                  >
                    <ArrowLeft aria-hidden="true" size={16} /> Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button className="v3-button" type="button" onClick={next}>
                    Continue <ArrowRight aria-hidden="true" size={17} />
                  </button>
                ) : (
                  <button
                    className="v3-button"
                    type="submit"
                    disabled={submitBrief.isPending}
                  >
                    {submitBrief.isPending
                      ? "Sending brief…"
                      : "Send Growth Brief"}
                    <ArrowRight aria-hidden="true" size={17} />
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
