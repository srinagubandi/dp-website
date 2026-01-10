import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Calculator, DollarSign, TrendingUp, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SPECIALTIES = {
  "doctors": { label: "Doctors / Physicians", growth: 0.25, avgValue: 500 },
  "dentists": { label: "Dentists", growth: 0.35, avgValue: 1200 },
  "pharmacy": { label: "Pharmacies", growth: 0.30, avgValue: 85 },
  "pt_ot": { label: "PT / OT Clinics", growth: 0.28, avgValue: 1500 },
  "urgent": { label: "Urgent Care", growth: 0.40, avgValue: 250 },
  "specialty": { label: "Specialty Practice", growth: 0.22, avgValue: 2500 },
};

export default function ROICalculator() {
  const [specialty, setSpecialty] = useState("doctors");
  const [monthlyPatients, setMonthlyPatients] = useState(30);
  const [patientValue, setPatientValue] = useState(500);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");

  // Update defaults when specialty changes
  const handleSpecialtyChange = (value: string) => {
    setSpecialty(value);
    setPatientValue(SPECIALTIES[value as keyof typeof SPECIALTIES].avgValue);
  };

  // Calculation Logic
  const growthRate = SPECIALTIES[specialty as keyof typeof SPECIALTIES].growth;
  const additionalPatients = Math.round(monthlyPatients * growthRate);
  const monthlyRevenueIncrease = additionalPatients * patientValue;
  const annualRevenueIncrease = monthlyRevenueIncrease * 12;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = trpc.calculator.submitLead.useMutation({
    onSuccess: () => {
      toast.success("Your personalized report is on its way!");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        await submitLead.mutateAsync({
          email,
          specialty: SPECIALTIES[specialty as keyof typeof SPECIALTIES].label,
          monthlyPatients,
          patientValue,
          projectedGrowth: growthRate,
          projectedAnnualRevenue: annualRevenueIncrease,
        });
        setShowResults(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl border-t-4 border-t-secondary">
      <div className="grid md:grid-cols-2">
        {/* Input Section */}
        <div className="p-6 md:p-8 bg-background">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center gap-2 text-secondary mb-2">
              <Calculator className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Growth Calculator</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
              Calculate Your Potential
            </CardTitle>
            <CardDescription className="text-base mt-2">
              See how much revenue you could be missing out on. Enter your current metrics below.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleCalculate} className="space-y-8 mt-6">
            <div className="space-y-4">
              <Label htmlFor="specialty" className="text-base font-medium">Practice Specialty</Label>
              <Select value={specialty} onValueChange={handleSpecialtyChange}>
                <SelectTrigger id="specialty" className="h-12 text-lg">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SPECIALTIES).map(([key, data]) => (
                    <SelectItem key={key} value={key}>{data.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="patients" className="text-base font-medium">
                  Monthly New Patients
                </Label>
                <span className="text-xl font-bold text-primary bg-blue-50 px-3 py-1 rounded">
                  {monthlyPatients}
                </span>
              </div>
              <Slider
                id="patients"
                min={5}
                max={200}
                step={1}
                value={[monthlyPatients]}
                onValueChange={(vals) => setMonthlyPatients(vals[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">
                Average number of new patients you see per month.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="value" className="text-base font-medium">
                  Avg. Revenue per Patient ($)
                </Label>
                <span className="text-xl font-bold text-primary bg-blue-50 px-3 py-1 rounded">
                  ${patientValue}
                </span>
              </div>
              <Slider
                id="value"
                min={100}
                max={10000}
                step={50}
                value={[patientValue]}
                onValueChange={(vals) => setPatientValue(vals[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">
                Average lifetime value or initial visit revenue per patient.
              </p>
            </div>

            <div className="pt-4">
              <Label htmlFor="email" className="text-base font-medium mb-2 block">
                Where should we send your detailed report?
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@practice.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 px-6 bg-secondary hover:bg-secondary/90 text-white font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Calculating..." : "Calculate"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Your data is secure. No spam.
              </p>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-primary text-white p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 relative z-10"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Ready to see your growth?</h3>
                <p className="text-blue-100 text-lg">
                  Enter your metrics to unlock a personalized projection of your practice's potential revenue growth with DocPropel.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8 opacity-50 blur-[2px]">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="h-4 w-16 bg-white/20 rounded mb-2"></div>
                    <div className="h-8 w-24 bg-white/40 rounded"></div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="h-4 w-16 bg-white/20 rounded mb-2"></div>
                    <div className="h-8 w-24 bg-white/40 rounded"></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="space-y-8 relative z-10"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-blue-100 mb-1">Projected Annual Growth</h3>
                  <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                    +${annualRevenueIncrease.toLocaleString()}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/20 rounded-full">
                        <Users className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="font-medium">New Patients / Year</span>
                    </div>
                    <span className="text-2xl font-bold">+{additionalPatients * 12}</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-full">
                        <DollarSign className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="font-medium">Monthly Revenue</span>
                    </div>
                    <span className="text-2xl font-bold text-green-400">
                      +${monthlyRevenueIncrease.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-900/50 p-4 rounded-lg text-sm text-blue-100 border border-blue-800">
                  <p>
                    <strong>Note:</strong> This projection is based on a conservative <strong>{Math.round(growthRate * 100)}% growth rate</strong>, typical for {SPECIALTIES[specialty as keyof typeof SPECIALTIES].label} practices in their first 6 months with DocPropel.
                  </p>
                </div>

                <Button className="w-full bg-white text-primary hover:bg-blue-50 font-bold h-12 text-lg">
                  Start Your Growth Plan
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
