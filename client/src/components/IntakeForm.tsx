import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function IntakeForm({ trigger }: { trigger?: React.ReactNode }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {trigger || <Button>Request Brief</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold text-primary mb-4">Thank you.</h3>
            <p className="text-muted-foreground">
              We’ll review your information and follow up if there is a clear opportunity where our model can add value.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Request Brief</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Practice Growth Brief Request</DialogTitle>
          <DialogDescription className="text-base pt-2">
            This brief helps us understand your practice, market, and growth goals so we can determine whether our performance-based model is a fit. There is no obligation and no sales pressure.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="practiceName">Practice Name</Label>
              <Input id="practiceName" required placeholder="e.g. City Dental Care" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Primary Specialty</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dental">Dental</SelectItem>
                  <SelectItem value="medical">Medical / Primary Care</SelectItem>
                  <SelectItem value="pt">Physical Therapy</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="locations">Location(s)</Label>
              <Input id="locations" required placeholder="City, State" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volume">Current Patient Volume (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-100">1-100 / month</SelectItem>
                  <SelectItem value="101-500">101-500 / month</SelectItem>
                  <SelectItem value="500+">500+ / month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Primary Growth Goal or Challenge</Label>
            <Textarea id="goal" required placeholder="What is the main outcome you are looking to achieve?" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website">Website URL (Optional)</Label>
              <Input id="website" type="url" placeholder="https://" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Best Contact Email</Label>
              <Input id="email" type="email" required placeholder="doctor@practice.com" />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 text-lg rounded-none">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
