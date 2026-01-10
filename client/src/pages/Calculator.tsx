import Layout from "@/components/Layout";
import ROICalculator from "@/components/ROICalculator";
import { motion } from "framer-motion";
import {
  DoctorIcon,
  DentistIcon,
  PharmacyIcon,
  PTOTIcon,
  GrowthPulseIcon,
} from "@/components/BrandIcons";

export default function Calculator() {
  const specialties = [
    { icon: DoctorIcon, name: "Doctors", growth: "25-40%" },
    { icon: DentistIcon, name: "Dentists", growth: "30-50%" },
    { icon: PharmacyIcon, name: "Pharmacies", growth: "20-35%" },
    { icon: PTOTIcon, name: "PT / OT", growth: "35-55%" },
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-muted/30 to-background min-h-screen py-20">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase mb-4">
              <GrowthPulseIcon size={16} />
              Interactive Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Calculate Your Practice's Growth Potential
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Whether you're a <strong>doctor, dentist, pharmacy, or PT/OT clinic</strong>—discover how much revenue you could be generating with a performance-based marketing partner.
            </p>
            
            {/* Specialty Growth Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {specialties.map((s) => (
                <div 
                  key={s.name}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg shadow-sm"
                >
                  <s.icon size={24} />
                  <div className="text-left">
                    <div className="text-sm font-bold text-primary">{s.name}</div>
                    <div className="text-xs text-muted-foreground">Avg. {s.growth} growth</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ROICalculator />
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              *Projections are based on average results from DocPropel partners in their first 12 months. Individual results may vary based on market conditions and specialty. Growth rates shown are typical ranges for each specialty type.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
