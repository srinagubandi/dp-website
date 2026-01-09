import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";

export default function Services() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div className="text-center max-w-3xl mx-auto mb-20" {...fadeIn}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">One Growth System. Predictable Results.</h1>
            <p className="text-xl text-muted-foreground">
              You don't need multiple vendors or complex contracts. We manage your entire digital growth ecosystem under one performance-based model.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Healthcare SEO",
                desc: "We ensure you appear exactly where patients are actively searching for care in your local market. We focus on high-intent keywords that drive appointments, not just traffic.",
                img: "/images/service-seo.jpg"
              },
              {
                title: "Paid Search",
                desc: "Create immediate demand and convert intent into booked appointments. We manage your ad spend to maximize ROI and eliminate waste.",
                img: "/images/service-ppc.jpg"
              },
              {
                title: "Website Design",
                desc: "Built for trust, compliance, and conversion rather than just aesthetics. Your site will be a patient-generating machine.",
                img: "/images/service-web.jpg"
              },
              {
                title: "Reputation Management",
                desc: "Systematically build social proof that works continuously to attract new patients. We help you get more 5-star reviews and manage your online reputation.",
                img: null
              },
              {
                title: "Social Media & Content",
                desc: "Reinforce credibility, authority, and stay top of mind in your community. We create content that educates and engages your patients.",
                img: null
              },
              {
                title: "Digital Brief",
                desc: "A supportive, insight-led review of your digital ecosystem and experience. Identify gaps and opportunities for growth.",
                img: null,
                cta: "Request a Digital Brief"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                className="group relative overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {service.img && (
                  <div className="h-48 overflow-hidden bg-muted shrink-0">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{service.desc}</p>
                  {service.cta ? (
                    <IntakeForm trigger={
                      <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white font-bold uppercase tracking-wide rounded-none mt-auto">
                        {service.cta}
                      </Button>
                    } />
                  ) : (
                    <div className="inline-flex items-center text-sm font-bold text-secondary uppercase tracking-wide mt-auto">
                      Included <Check className="ml-1 h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-muted/30">
        <div className="container text-center">
             <h2 className="text-3xl font-bold mb-8 text-primary">Ready to simplify your growth?</h2>
             <IntakeForm trigger={
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-10 h-16 rounded-none shadow-xl">
                  Request a Practice Growth Brief
                </Button>
             } />
        </div>
      </section>
    </Layout>
  );
}
