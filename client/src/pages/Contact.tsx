/**
 * =============================================================================
 * CONTACT.TSX - Contact Us Page
 * =============================================================================
 * 
 * This page provides visitors with multiple ways to get in touch:
 *   - INTAKE FORM: The main lead capture form for requesting a Practice Growth Brief
 *   - PHONE NUMBER: Click-to-call functionality for mobile users
 *   - EMAIL: Direct email contact
 *   - OFFICE HOURS: When the team is available
 * 
 * HOW TO EDIT:
 *   - To change PHONE NUMBER: Edit the phoneNumber constant (line ~30)
 *   - To change EMAIL: Edit the email constant (line ~31)
 *   - To change OFFICE HOURS: Edit the officeHours constant (line ~32)
 *   - To change FORM FIELDS: Edit the IntakeForm component in components/IntakeForm.tsx
 * 
 * =============================================================================
 */

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import IntakeForm from "@/components/IntakeForm";
import {
  DoctorIcon,
  DentistIcon,
  PharmacyIcon,
  PTOTIcon,
} from "@/components/BrandIcons";

// -----------------------------------------------------------------------------
// CONTACT INFORMATION - Edit these values to update contact details
// -----------------------------------------------------------------------------
const phoneNumber = "1-800-DOC-PROPEL";      // Display format
const phoneNumberTel = "1-800-362-7767";     // Tel link format (numbers only)
const email = "hello@docpropel.com";
const officeHours = "Monday - Friday, 9am - 6pm EST";

export default function Contact() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-background to-blue-50/30 border-b border-border">
        <div className="container">
          <motion.div className="text-center max-w-3xl mx-auto" {...fadeIn}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Let's Grow Your Practice
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to stop paying for promises and start paying for patients? 
              Get in touch with our team to discuss your practice's growth potential.
            </p>
            
            {/* Click-to-Call Button - Prominent on Mobile */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href={`tel:${phoneNumberTel}`}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8 py-4 rounded-none shadow-lg transition-all hover:translate-y-[-2px]"
              >
                <Phone className="h-5 w-5" />
                Call {phoneNumber}
              </a>
              <span className="text-muted-foreground">or</span>
              <a 
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg px-8 py-4 rounded-none transition-all"
              >
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </div>

            {/* Specialty Icons */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: DoctorIcon, name: "Doctors" },
                { icon: DentistIcon, name: "Dentists" },
                { icon: PharmacyIcon, name: "Pharmacies" },
                { icon: PTOTIcon, name: "PT / OT" },
              ].map((s) => (
                <span 
                  key={s.name} 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border text-sm font-medium rounded-full"
                >
                  <s.icon size={18} />
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Form and Contact Info */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Contact Form */}
            <motion.div {...fadeIn}>
              <Card className="border-t-4 border-t-secondary shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    Request a Practice Growth Brief
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll send you a customized analysis 
                    of your practice's growth opportunities.
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Embedded Intake Form */}
                  <IntakeForm 
                    trigger={
                      <Button 
                        size="lg" 
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-14 rounded-none"
                      >
                        Start Your Growth Analysis <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    } 
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Contact Information */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Phone Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <a 
                        href={`tel:${phoneNumberTel}`}
                        className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
                      >
                        {phoneNumber}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tap to call on mobile
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <a 
                        href={`mailto:${email}`}
                        className="text-xl font-bold text-primary hover:text-secondary transition-colors"
                      >
                        {email}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Office Hours</h3>
                      <p className="text-lg font-medium text-foreground">
                        {officeHours}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        After-hours inquiries answered next business day
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <div className="bg-muted/30 p-6 border-l-4 border-secondary">
                <h3 className="font-bold text-lg mb-3">What to Expect</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">1.</span>
                    <span>A brief discovery call to understand your practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">2.</span>
                    <span>Custom analysis of your market and competition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">3.</span>
                    <span>Clear growth projections with no obligation</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prefer to Talk Now?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our team is ready to discuss how we can help grow your practice 
            with our performance-based model.
          </p>
          <a 
            href={`tel:${phoneNumberTel}`}
            className="inline-flex items-center gap-3 bg-white text-primary hover:bg-blue-50 font-bold text-xl px-10 py-5 rounded-none shadow-xl transition-all hover:translate-y-[-2px]"
          >
            <Phone className="h-6 w-6" />
            {phoneNumber}
          </a>
        </div>
      </section>
    </Layout>
  );
}
