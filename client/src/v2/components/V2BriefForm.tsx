import { useState } from "react";
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

type V2BriefFormProps = { trigger: React.ReactNode };

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

export default function V2BriefForm({ trigger }: V2BriefFormProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(initialValues);
  const submitBrief = trpc.leads.submitBrief.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your Growth Brief request has been received.");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const update = (key: keyof typeof values, value: string) =>
    setValues(current => ({ ...current, [key]: value }));
  const reset = () => {
    setOpen(false);
    setSubmitted(false);
    setValues(initialValues);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitBrief.mutateAsync(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={value => (value ? setOpen(true) : reset())}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="v2-brief-dialog"
        aria-describedby="v2-brief-description"
        showCloseButton={false}
      >
        <DialogClose className="v2-brief-close" aria-label="Close request form">
          <X size={18} />
        </DialogClose>
        {submitted ? (
          <div className="v2-brief-success">
            <CheckCircle2 size={34} />
            <div className="v2-eyebrow">Request received</div>
            <DialogTitle>Thank you for sharing the context.</DialogTitle>
            <DialogDescription id="v2-brief-description">
              We will review your information and follow up if there is a clear
              opportunity where the DocPropel performance model can add value.
            </DialogDescription>
            <button className="v2-button" type="button" onClick={reset}>
              Return to site <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="v2-eyebrow">Practice Growth Brief</div>
            <DialogTitle>Begin with the practice behind the plan.</DialogTitle>
            <DialogDescription id="v2-brief-description">
              Tell us a little about your practice, market, and growth
              objective. There is no obligation and no sales pressure.
            </DialogDescription>
            <form className="v2-brief-form" onSubmit={submit}>
              <div className="v2-brief-grid">
                <label>
                  Practice name
                  <input
                    required
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
                    value={values.location}
                    onChange={event => update("location", event.target.value)}
                    placeholder="City, State"
                  />
                </label>
                <label>
                  Current patient volume <small>optional</small>
                  <select
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
              <label>
                Primary growth goal or challenge
                <textarea
                  required
                  rows={3}
                  value={values.goal}
                  onChange={event => update("goal", event.target.value)}
                  placeholder="What is the main outcome you are looking to achieve?"
                />
              </label>
              <div className="v2-brief-grid">
                <label>
                  Website URL <small>optional</small>
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
                    placeholder="doctor@practice.com"
                  />
                </label>
              </div>
              <label>
                Additional information <small>optional</small>
                <textarea
                  rows={2}
                  value={values.notes}
                  onChange={event => update("notes", event.target.value)}
                  placeholder="Anything else we should know?"
                />
              </label>
              <div className="v2-brief-submit">
                <p>
                  Your information is stored securely for the purpose of
                  responding to this request.
                </p>
                <button
                  className="v2-button"
                  type="submit"
                  disabled={submitBrief.isPending}
                >
                  {submitBrief.isPending
                    ? "Sending request"
                    : "Send Growth Brief request"}
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
