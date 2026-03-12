/**
 * =============================================================================
 * LAYOUT.TSX - Main Website Layout Component
 * =============================================================================
 *
 * Controls the overall structure of every page:
 *   - HEADER: Logo, navigation links, phone number, CTA button
 *   - MAIN CONTENT: Where each page's content is rendered
 *   - FOOTER: Company info, specialty links, company links, contact
 *
 * Design: Dark premium theme inspired by PropelDental, using DocPropel
 * brand colors (Orange = primary, Blue = secondary).
 *
 * HOW TO EDIT:
 *   - Logo: Update src="/images/logo.png" (lines ~80, ~175)
 *   - Nav links: Edit the navLinks array (lines ~55-65)
 *   - Phone number: Edit "1-800-DOC-PROPEL" and "tel:1-800-362-7767"
 *   - Footer columns: Edit the footer section (~lines 175+)
 *   - Colors: Defined in client/src/index.css CSS variables
 *
 * =============================================================================
 */

import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import IntakeForm from "@/components/IntakeForm";
import {
  DoctorIcon,
  DentistIcon,
  PharmacyIcon,
  PTOTIcon,
} from "@/components/BrandIcons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // NAVIGATION LINKS
  // To add a page: add { href: "/page", label: "Page Name" }
  // To remove: delete the entry
  // To hide Results: it is commented out below
  // ---------------------------------------------------------------------------
  const navLinks = [
    { href: "/services",     label: "Services" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/compare",      label: "Compare" },
    { href: "/about",        label: "About Us" },
    { href: "/calculator",   label: "ROI Calculator" },
    { href: "/contact",      label: "Contact Us" },
    // { href: "/results",   label: "Results" }, // Hidden — uncomment to show
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      {/* =====================================================================
          HEADER
          Sticky, dark background with subtle blur — matches PropelDental style.
          TO CHANGE HEIGHT: edit h-16 / md:h-20
      ===================================================================== */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="DocPropel"
              className="h-10 w-auto"
            />
          </Link>

          {/* PHONE NUMBER — click-to-call, desktop only */}
          <a
            href="tel:1-800-362-7767"
            className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>1-800-DOC-PROPEL</span>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA BUTTON */}
          <div className="hidden lg:flex items-center">
            <IntakeForm
              trigger={
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5">
                  Request a Practice Growth Brief
                </Button>
              }
            />
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 px-4 space-y-3">
                <a
                  href="tel:1-800-362-7767"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  <span>1-800-DOC-PROPEL</span>
                </a>
                <IntakeForm
                  trigger={
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      Request a Practice Growth Brief
                    </Button>
                  }
                />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN CONTENT AREA
          Each page's content is injected here via {children}.
          DO NOT EDIT unless changing overall page structure.
      ===================================================================== */}
      <main className="flex-1">{children}</main>

      {/* =====================================================================
          FOOTER
          Dark card background with 4-column grid.
          TO CHANGE BACKGROUND: edit "bg-card"
          TO CHANGE PADDING: edit "py-16"
      ===================================================================== */}
      <footer className="border-t border-border bg-card">
        <div className="container py-16">

          {/* Footer Grid: 4 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* COLUMN 1: Brand + description */}
            <div className="md:col-span-1">
              <img
                src="/images/logo.png"
                alt="DocPropel"
                className="h-8 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                The only performance-based marketing partner for healthcare
                practices. We grow your patient base — you only pay for results.
              </p>
              <a
                href="tel:1-800-362-7767"
                className="flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Phone className="w-4 h-4" />
                1-800-DOC-PROPEL
              </a>
            </div>

            {/* COLUMN 2: Specialties */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Specialties
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <DoctorIcon size={14} />
                  <Link href="/services" className="hover:text-primary transition-colors">
                    Doctors &amp; Physicians
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <DentistIcon size={14} />
                  <Link href="/services" className="hover:text-primary transition-colors">
                    Dentists
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <PharmacyIcon size={14} />
                  <Link href="/services" className="hover:text-primary transition-colors">
                    Pharmacies
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <PTOTIcon size={14} />
                  <Link href="/services" className="hover:text-primary transition-colors">
                    PT / OT Clinics
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Company links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"        className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link href="/compare"      className="hover:text-primary transition-colors">Compare</Link></li>
                <li><Link href="/calculator"   className="hover:text-primary transition-colors">ROI Calculator</Link></li>
                <li><Link href="/contact"      className="hover:text-primary transition-colors">Contact Us</Link></li>
                {/* <li><Link href="/results" className="hover:text-primary transition-colors">Case Studies</Link></li> */}
              </ul>
            </div>

            {/* COLUMN 4: Contact */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="tel:1-800-362-7767"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    1-800-DOC-PROPEL
                  </a>
                </li>
                <li>
                  <IntakeForm
                    trigger={
                      <button className="hover:text-primary transition-colors text-left">
                        Send us a message
                      </button>
                    }
                  />
                </li>
                <li className="pt-1">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer bottom bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} DocPropel. All rights reserved.
              Serving Doctors, Dentists, Pharmacies &amp; PT/OT Clinics.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
