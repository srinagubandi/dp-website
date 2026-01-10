import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";
import {
  DoctorIcon,
  DentistIcon,
  PharmacyIcon,
  PTOTIcon,
  GrowthPulseIcon,
} from "@/components/BrandIcons";

const CASE_STUDIES = [
  {
    specialty: "Dentists",
    icon: DentistIcon,
    title: "Scaling a Multi-Location Dental Group",
    metric: "+145%",
    metricLabel: "New Patient Volume",
    desc: "How we helped a 3-location dental group dominate local search and fill their hygiene schedules with high-value patients.",
    tags: ["SEO", "PPC", "Reputation"],
    stats: [
      { label: "Cost Per Lead", value: "-40%" },
      { label: "ROI", value: "8.5x" }
    ]
  },
  {
    specialty: "Doctors",
    icon: DoctorIcon,
    title: "Primary Care Practice Growth",
    metric: "+87%",
    metricLabel: "Monthly New Patients",
    desc: "A family medicine practice struggling with patient acquisition transformed their digital presence and filled their panel in 6 months.",
    tags: ["Local SEO", "Google Ads", "Website"],
    stats: [
      { label: "Revenue Growth", value: "+$420K" },
      { label: "Lead Quality", value: "High" }
    ]
  },
  {
    specialty: "Pharmacies",
    icon: PharmacyIcon,
    title: "Independent Pharmacy Turnaround",
    metric: "+210%",
    metricLabel: "Prescription Transfers",
    desc: "Competing against big chains seemed impossible until we implemented hyper-local targeting and community engagement campaigns.",
    tags: ["Social Media", "Local SEO", "Reputation"],
    stats: [
      { label: "New Customers/Mo", value: "+95" },
      { label: "Retention Rate", value: "92%" }
    ]
  },
  {
    specialty: "PT / OT",
    icon: PTOTIcon,
    title: "Physical Therapy Clinic Expansion",
    metric: "+165%",
    metricLabel: "Patient Referrals",
    desc: "A single-location PT clinic grew to 3 locations by building physician referral networks and capturing direct-access patients online.",
    tags: ["Content Marketing", "PPC", "Referral Program"],
    stats: [
      { label: "Admin Time Saved", value: "20 hrs/wk" },
      { label: "Patient Satisfaction", value: "4.9/5" }
    ]
  },
  {
    specialty: "Dentists",
    icon: DentistIcon,
    title: "Cosmetic Dentistry Revenue Boost",
    metric: "+$1.8M",
    metricLabel: "Annual Revenue",
    desc: "Shifting focus from general dentistry to high-value cosmetic procedures through targeted campaigns and patient education content.",
    tags: ["Video Marketing", "PPC", "Website Design"],
    stats: [
      { label: "Avg Case Value", value: "+65%" },
      { label: "Consult Rate", value: "78%" }
    ]
  },
  {
    specialty: "Doctors",
    icon: DoctorIcon,
    title: "Urgent Care Volume Surge",
    metric: "+210%",
    metricLabel: "Online Bookings",
    desc: "Implementing AI-driven intake and real-time wait times to capture patient demand during peak flu season and beyond.",
    tags: ["AI Chatbot", "Local SEO", "Web Design"],
    stats: [
      { label: "Wait Time Reduction", value: "-35%" },
      { label: "Patient Satisfaction", value: "4.8/5" }
    ]
  }
];

export default function Results() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-muted/30 to-background border-b border-border">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider uppercase mb-4">
                <GrowthPulseIcon size={16} />
                Proven Results
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                Real Growth. Real Numbers.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We don't hide behind vanity metrics. See how we've transformed <strong>doctors, dentists, pharmacies, and PT/OT clinics</strong> just like yours.
              </p>
              
              {/* Specialty Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: DoctorIcon, name: "Doctors" },
                  { icon: DentistIcon, name: "Dentists" },
                  { icon: PharmacyIcon, name: "Pharmacies" },
                  { icon: PTOTIcon, name: "PT / OT" },
                ].map((s) => (
                  <span 
                    key={s.name} 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border text-sm font-medium rounded-full hover:border-secondary hover:bg-secondary/5 transition-colors cursor-pointer"
                  >
                    <s.icon size={18} />
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CASE_STUDIES.map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-secondary">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <study.icon size={24} />
                          <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                            {study.specialty}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((_, starI) => (
                            <Star key={starI} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold mb-2">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg text-center border border-border">
                        <div className="text-4xl font-bold text-primary mb-1">{study.metric}</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {study.metricLabel}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                        {study.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6 border-t border-border pt-4">
                        {study.stats.map((stat, statI) => (
                          <div key={statI}>
                            <div className="text-lg font-bold text-foreground">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.tags.map((tag, tagI) => (
                          <span key={tagI} className="text-xs bg-background border border-border px-2 py-1 rounded text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full group border-secondary text-secondary hover:bg-secondary hover:text-white">
                        Read Case Study <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-16 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Practices Served" },
                { value: "$50M+", label: "Revenue Generated" },
                { value: "32%", label: "Avg. Growth Rate" },
                { value: "4.9/5", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to be our next success story?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join the hundreds of doctors, dentists, pharmacies, and PT/OT clinics that have switched to the performance-based model.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: DoctorIcon, name: "Doctors" },
                { icon: DentistIcon, name: "Dentists" },
                { icon: PharmacyIcon, name: "Pharmacies" },
                { icon: PTOTIcon, name: "PT / OT" },
              ].map((s) => (
                <span key={s.name} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full">
                  <s.icon size={16} />
                  {s.name}
                </span>
              ))}
            </div>
            <IntakeForm trigger={
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold h-14 px-8 text-lg">
                Start Your Growth Journey
              </Button>
            } />
          </div>
        </section>
      </div>
    </Layout>
  );
}
