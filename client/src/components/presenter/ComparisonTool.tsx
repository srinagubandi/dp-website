import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, DollarSign, Lock, BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ComparisonTool() {
  const [showDocPropel, setShowDocPropel] = useState(false);

  const features = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Pricing Model",
      traditional: "High Fixed Retainer ($3k-$10k/mo)",
      docpropel: "Performance-Based (Pay for Results)"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Contract Terms",
      traditional: "12-24 Month Lock-in Contract",
      docpropel: "Flexible, No Long-Term Lock-in"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Accountability",
      traditional: "Paid Regardless of Outcome",
      docpropel: "Revenue Tied to Your Growth"
    }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-12 bg-muted/50 p-2 rounded-full border border-border">
        <span className={`text-sm font-bold px-4 py-2 rounded-full transition-colors ${!showDocPropel ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}>
          Traditional Agency
        </span>
        <Switch 
          checked={showDocPropel}
          onCheckedChange={setShowDocPropel}
          className="data-[state=checked]:bg-secondary"
        />
        <span className={`text-sm font-bold px-4 py-2 rounded-full transition-colors ${showDocPropel ? "bg-secondary text-white shadow-sm" : "text-muted-foreground"}`}>
          DocPropel Model
        </span>
      </div>

      <div className="grid gap-6 w-full">
        {features.map((feature, i) => (
          <div key={i} className="relative h-32 w-full perspective-1000">
            <AnimatePresence mode="wait">
              {!showDocPropel ? (
                <motion.div
                  key="traditional"
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white border border-border rounded-xl p-6 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg text-muted-foreground">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-muted-foreground">{feature.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-lg font-medium text-muted-foreground">
                    <X className="h-5 w-5 text-destructive" />
                    {feature.traditional}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="docpropel"
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white border-2 border-secondary rounded-xl p-6 flex items-center justify-between shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-lg font-bold text-primary">
                    <Check className="h-6 w-6 text-secondary" />
                    {feature.docpropel}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
