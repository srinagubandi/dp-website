import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [patientValue, setPatientValue] = useState([500]);
  const [patientVolume, setPatientVolume] = useState([10]);
  const [growthRate, setGrowthRate] = useState([20]);

  const currentRevenue = patientValue[0] * patientVolume[0];
  const projectedRevenue = currentRevenue * (1 + growthRate[0] / 100);
  const additionalRevenue = projectedRevenue - currentRevenue;

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full items-center">
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary">Input Practice Metrics</h3>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="font-medium text-muted-foreground">Avg. Patient Value</label>
                <span className="font-bold text-primary">${patientValue[0].toLocaleString()}</span>
              </div>
              <Slider
                value={patientValue}
                onValueChange={setPatientValue}
                min={100}
                max={5000}
                step={50}
                className="py-4"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="font-medium text-muted-foreground">Monthly Patient Volume</label>
                <span className="font-bold text-primary">{patientVolume[0]} patients</span>
              </div>
              <Slider
                value={patientVolume}
                onValueChange={setPatientVolume}
                min={5}
                max={200}
                step={5}
                className="py-4"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="font-medium text-muted-foreground">Projected Growth Rate</label>
                <span className="font-bold text-secondary">+{growthRate[0]}%</span>
              </div>
              <Slider
                value={growthRate}
                onValueChange={setGrowthRate}
                min={5}
                max={100}
                step={5}
                className="py-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-xl border border-border">
        <h3 className="text-xl font-bold mb-6 text-center text-muted-foreground">Projected Monthly Impact</h3>
        
        <div className="space-y-6">
          <Card className="border-none shadow-none bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${currentRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary shadow-lg bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary">Projected Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                key={projectedRevenue}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold text-primary"
              >
                ${projectedRevenue.toLocaleString()}
              </motion.div>
              <div className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
                +${additionalRevenue.toLocaleString()} / month
              </div>
            </CardContent>
          </Card>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            *Estimates based on typical results. Actual growth may vary by specialty and market.
          </p>
        </div>
      </div>
    </div>
  );
}
