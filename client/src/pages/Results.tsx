import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";

const CASE_STUDIES = [
  {
    specialty: "Dental",
    title: "Scaling a Multi-Location Dental Group",
    metric: "+145%",
    metricLabel: "New Patient Volume",
    desc: "How we helped a 3-location dental group dominate local search and fill their hygiene schedules.",
    tags: ["SEO", "PPC", "Reputation"],
    stats: [
      { label: "Cost Per Lead", value: "-40%" },
      { label: "ROI", value: "8.5x" }
    ]
  },
  {
    specialty: "Urgent Care",
    title: "Reducing Wait Times & Increasing Volume",
    metric: "+210%",
    metricLabel: "Online Bookings",
    desc: "Implementing AI-driven intake and real-time wait times to capture patient demand during peak flu season.",
    tags: ["AI Chatbot", "Local SEO", "Web Design"],
    stats: [
      { label: "Admin Time Saved", value: "25 hrs/wk" },
      { label: "Patient Satisfaction", value: "4.8/5" }
    ]
  },
  {
    specialty: "Orthopedics",
    title: "Attracting High-Value Surgical Cases",
    metric: "+65%",
    metricLabel: "Surgical Consults",
    desc: "A targeted campaign strategy to shift focus from general inquiries to high-revenue joint replacement procedures.",
    tags: ["Content Marketing", "PPC", "Video"],
    stats: [
      { label: "Revenue Growth", value: "+$1.2M" },
      { label: "Lead Quality", value: "High" }
    ]
  }
];

export default function Results() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30 border-b border-border">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider uppercase mb-4">
                <TrendingUp className="w-3 h-3" />
                Proven Results
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                Real Growth. Real Numbers.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We don't hide behind vanity metrics. See how we've transformed practices just like yours with our performance-based model.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
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
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                          {study.specialty}
                        </Badge>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((_, starI) => (
                            <Star key={starI} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold mb-2">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 p-4 bg-muted/50 rounded-lg text-center">
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

                      <Button variant="outline" className="w-full group">
                        Read Case Study <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
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
              Join the hundreds of practices that have switched to the performance-based model.
            </p>
            <IntakeForm trigger={
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold h-14 px-8 text-lg">
                Start Your Growth Journey
              </Button>
            } />
          </div>
        </section>
      </div>
    </Layout>
  );
}
