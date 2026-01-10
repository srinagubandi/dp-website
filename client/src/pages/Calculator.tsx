import Layout from "@/components/Layout";
import ROICalculator from "@/components/ROICalculator";
import { motion } from "framer-motion";

export default function Calculator() {
  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen py-20">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Interactive Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Calculate Your Practice's Growth Potential
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how much revenue you could be generating with a performance-based marketing partner. Input your current metrics below to see your projected growth.
            </p>
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
              *Projections are based on average results from DocPropel partners in their first 12 months. Individual results may vary based on market conditions and specialty.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
