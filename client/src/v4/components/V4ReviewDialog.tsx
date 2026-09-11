import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
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

export default function V4ReviewDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(initialValues);
  const submitBrief = trpc.leads.submitBrief.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your performance model review request has been received.");
    },
    onError: () =>
      toast.error("The request could not be sent. Please try again."),
  });

  const update = (key: keyof typeof values, value: string) => {
    setValues(current => ({ ...current, [key]: value }));
  };

  const reset = () => {
    setOpen(false);
    setSubmitted(false);
    setValues(initialValues);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitBrief.mutateAsync(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => (nextOpen ? setOpen(true) : reset())}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="v4-review-dialog"
        aria-describedby={`${formId}-description`}
        showCloseButton={false}
      >
        <DialogClose className="v4-dialog-close" aria-label="Close review form">
          <X aria-hidden="true" size={18} />
        </DialogClose>
        {submitted ? (
          <div className="v4-dialog-success" role="status">
            <CheckCircle2 aria-hidden="true" size={34} />
            <p className="v4-kicker">Record received / next step: review</p>
            <DialogTitle>Thank you for sharing the context.</DialogTitle>
            <DialogDescription id={`${formId}-description`}>
              DocPropel will review the practice, market, and growth objective.
              If the model appears relevant, the team will follow up to
              establish fit and a measurement approach—not promise an outcome.
            </DialogDescription>
            <button className="v4-button" type="button" onClick={reset}>
              Return to the site <ArrowRight aria-hidden="true" size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="v4-dialog-heading">
              <p className="v4-kicker">
                Decision record / performance model review
              </p>
              <DialogTitle>
                Set the scope for an accountable conversation.
              </DialogTitle>
              <DialogDescription id={`${formId}-description`}>
                Share commercial and operational context only. Do not include
                patient names, diagnoses, records, or other protected health
                information. Fields marked required must be completed.
              </DialogDescription>
            </div>
            <form className="v4-review-form" onSubmit={submit}>
              <div className="v4-form-grid">
                <label htmlFor={`${formId}-practice`}>
                  <span>Practice name</span>
                  <input
                    id={`${formId}-practice`}
                    required
                    autoComplete="organization"
                    value={values.practiceName}
                    onChange={event =>
                      update("practiceName", event.target.value)
                    }
                    placeholder="City Dental Care"
                  />
                </label>
                <label htmlFor={`${formId}-specialty`}>
                  <span>Primary specialty</span>
                  <select
                    id={`${formId}-specialty`}
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
                <label htmlFor={`${formId}-location`}>
                  <span>Location(s)</span>
                  <input
                    id={`${formId}-location`}
                    required
                    autoComplete="address-level2"
                    value={values.location}
                    onChange={event => update("location", event.target.value)}
                    placeholder="City, State"
                  />
                </label>
                <label htmlFor={`${formId}-volume`}>
                  <span>
                    Current patient volume <small>optional</small>
                  </span>
                  <select
                    id={`${formId}-volume`}
                    value={values.patientVolume}
                    onChange={event =>
                      update("patientVolume", event.target.value)
                    }
                  >
                    <option value="">Select volume range</option>
                    <option>1–100 / month</option>
                    <option>101–500 / month</option>
                    <option>500+ / month</option>
                  </select>
                </label>
              </div>
              <label htmlFor={`${formId}-goal`}>
                <span>Primary growth goal or challenge</span>
                <textarea
                  id={`${formId}-goal`}
                  required
                  rows={3}
                  value={values.goal}
                  onChange={event => update("goal", event.target.value)}
                  placeholder="What operating outcome or constraint should the review consider?"
                />
              </label>
              <div className="v4-form-grid">
                <label htmlFor={`${formId}-website`}>
                  <span>
                    Website URL <small>optional</small>
                  </span>
                  <input
                    id={`${formId}-website`}
                    type="url"
                    value={values.website}
                    onChange={event => update("website", event.target.value)}
                    placeholder="https://"
                  />
                </label>
                <label htmlFor={`${formId}-email`}>
                  <span>Best contact email</span>
                  <input
                    id={`${formId}-email`}
                    required
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={event => update("email", event.target.value)}
                    placeholder="doctor@practice.com"
                  />
                </label>
              </div>
              <label htmlFor={`${formId}-notes`}>
                <span>
                  Additional context{" "}
                  <small>optional · no patient information</small>
                </span>
                <textarea
                  id={`${formId}-notes`}
                  rows={2}
                  value={values.notes}
                  onChange={event => update("notes", event.target.value)}
                  placeholder="Market, capacity, or current channel context"
                />
              </label>
              <div className="v4-form-submit">
                <p>
                  Your information is stored for the purpose of responding to
                  this request. This request is a fit review, not a performance
                  guarantee.
                </p>
                <button
                  className="v4-button"
                  type="submit"
                  disabled={submitBrief.isPending}
                >
                  {submitBrief.isPending
                    ? "Transmitting record"
                    : "Submit review request"}
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
