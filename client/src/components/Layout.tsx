/**
 * =============================================================================
 * LAYOUT.TSX - Main Website Layout Component
 * =============================================================================
 * 
 * This file controls the overall structure of every page on the website:
 *   - HEADER: Logo, navigation menu, and call-to-action button
 *   - MAIN CONTENT: Where each page's content is displayed
 *   - FOOTER: Company info, links, contact details
 * 
 * HOW TO EDIT:
 *   - To change the LOGO: Update the image path in the <img> tags (lines ~80, ~130)
 *   - To change NAV LINKS: Edit the NavLinks component (lines ~50-70)
 *   - To change FOOTER TEXT: Edit the footer section (lines ~125-190)
 *   - To change COLORS: Edit the className properties (bg-*, text-*, border-*)
 * 
 * COLOR REFERENCE:
 *   - primary = Blue (#0066B3) - Used for main headings, links
 *   - secondary = Orange (#F7941D) - Used for buttons, accents
 *   - muted-foreground = Gray text for descriptions
 *   - background = White background
 *   - border = Light gray borders
 * 
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// IMPORTS - Required libraries and components
// -----------------------------------------------------------------------------
import { Link } from "wouter";                    // For navigation links
import { Button } from "@/components/ui/button";  // Button component
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Mobile menu
import { Menu } from "lucide-react";              // Hamburger menu icon
import { useState } from "react";                 // React state hook
import IntakeForm from "@/components/IntakeForm"; // Lead capture form popup

// Custom brand icons for the four specialties
import {
  DoctorIcon,
  DentistIcon,
  PharmacyIcon,
  PTOTIcon,
} from "@/components/BrandIcons";


// -----------------------------------------------------------------------------
// MAIN LAYOUT COMPONENT
// -----------------------------------------------------------------------------
export default function Layout({ children }: { children: React.ReactNode }) {
  
  // State for mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // NAVIGATION LINKS COMPONENT
  // ---------------------------------------------------------------------------
  // These are the links that appear in both desktop and mobile navigation.
  // 
  // TO ADD A NEW PAGE:
  //   1. Add a new <Link> element below
  //   2. Set href="/your-page-url"
  //   3. Set the display text between the tags
  //
  // TO REMOVE A PAGE:
  //   1. Delete the entire <Link>...</Link> line
  //
  // TO RENAME A PAGE:
  //   1. Change the text between the <Link> tags
  // ---------------------------------------------------------------------------
  const NavLinks = () => (
    <>
      {/* Services Page Link */}
      <Link 
        href="/services" 
        className="text-sm font-medium hover:text-primary transition-colors" 
        onClick={() => setIsOpen(false)}
      >
        Services
      </Link>

      {/* How It Works Page Link */}
      <Link 
        href="/how-it-works" 
        className="text-sm font-medium hover:text-primary transition-colors" 
        onClick={() => setIsOpen(false)}
      >
        How It Works
      </Link>

      {/* Compare Page Link */}
      <Link 
        href="/compare" 
        className="text-sm font-medium hover:text-primary transition-colors" 
        onClick={() => setIsOpen(false)}
      >
        Compare
      </Link>

      {/* About Us Page Link */}
      <Link 
        href="/about" 
        className="text-sm font-medium hover:text-primary transition-colors" 
        onClick={() => setIsOpen(false)}
      >
        About Us
      </Link>

      {/* ROI Calculator Page Link */}
      <Link 
        href="/calculator" 
        className="text-sm font-medium hover:text-primary transition-colors" 
        onClick={() => setIsOpen(false)}
      >
        ROI Calculator
      </Link>

      {/* Results/Case Studies Page Link */}
      <Link 
        href="/results" 
        className="text-sm font-medium hover:text-primary transition-colors" 
        onClick={() => setIsOpen(false)}
      >
        Results
      </Link>
    </>
  );

  // ---------------------------------------------------------------------------
  // MAIN LAYOUT STRUCTURE
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      
      {/* =====================================================================
          HEADER SECTION
          =====================================================================
          Contains: Logo, Navigation Links, CTA Button
          
          TO CHANGE HEADER HEIGHT: Edit "h-20" (h-16 = shorter, h-24 = taller)
          TO CHANGE BACKGROUND: Edit "bg-background/95" 
          TO REMOVE STICKY: Remove "sticky top-0" classes
      ===================================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          
          {/* -----------------------------------------------------------------
              LOGO
              -----------------------------------------------------------------
              TO CHANGE LOGO:
                1. Replace "/images/logo.png" with your new logo path
                2. Upload new logo to: client/public/images/
              
              TO CHANGE LOGO SIZE:
                - Edit "h-10" (h-8 = smaller, h-12 = larger)
          ----------------------------------------------------------------- */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                src="/images/logo.png" 
                alt="DocPropel" 
                className="h-10 w-auto" 
              />
            </div>
          </Link>

          {/* -----------------------------------------------------------------
              DESKTOP NAVIGATION (visible on screens md and larger)
              -----------------------------------------------------------------
              TO CHANGE SPACING BETWEEN LINKS: Edit "gap-8" (gap-4, gap-6, gap-10)
              TO HIDE ON DESKTOP: Change "hidden md:flex" to "hidden"
          ----------------------------------------------------------------- */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
            
            {/* CTA BUTTON - Opens the intake form popup
                TO CHANGE BUTTON TEXT: Edit text inside the Button component
                TO CHANGE BUTTON COLOR: Edit "bg-secondary" to "bg-primary" etc.
            */}
            <IntakeForm trigger={
              <Button 
                variant="default" 
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-none px-6"
              >
                Request a Practice Growth Brief
              </Button>
            } />
          </nav>

          {/* -----------------------------------------------------------------
              MOBILE NAVIGATION (hamburger menu, visible on small screens)
              -----------------------------------------------------------------
              This creates a slide-out menu for mobile devices.
              TO CHANGE MENU WIDTH: Edit "w-[300px]" in SheetContent
          ----------------------------------------------------------------- */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                <NavLinks />
                <IntakeForm trigger={
                  <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold w-full rounded-none">
                    Request a Practice Growth Brief
                  </Button>
                } />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* =====================================================================
          MAIN CONTENT AREA
          =====================================================================
          This is where each page's content is rendered.
          The {children} prop contains the page content.
          DO NOT EDIT THIS SECTION unless changing overall page structure.
      ===================================================================== */}
      <main className="flex-1">
        {children}
      </main>

      {/* =====================================================================
          FOOTER SECTION
          =====================================================================
          Contains: Company info, Specialty links, Company links, Contact info
          
          TO CHANGE FOOTER BACKGROUND: Edit "bg-muted/30"
          TO CHANGE PADDING: Edit "py-12 md:py-16"
      ===================================================================== */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-12 md:py-16">
          
          {/* Footer Grid - 4 columns on desktop, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* ---------------------------------------------------------------
                COLUMN 1: Company Logo & Description
                ---------------------------------------------------------------
                TO CHANGE DESCRIPTION: Edit the <p> text below
                TO CHANGE LOGO: Edit the src="/images/logo.png" path
            --------------------------------------------------------------- */}
            <div className="space-y-4">
              <img 
                src="/images/logo.png" 
                alt="DocPropel" 
                className="h-8 w-auto mb-4" 
              />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The only performance-based marketing partner for healthcare practices. 
                We grow your patient base, you only pay for results.
              </p>
              
              {/* Specialty Icons Row
                  These are the small icons showing the 4 specialties.
                  TO REMOVE: Delete the entire <div> block below
                  TO CHANGE SIZE: Edit "size={20}" to a different number
              */}
              <div className="flex gap-3 pt-2">
                <DoctorIcon size={20} className="opacity-60 hover:opacity-100 transition-opacity" />
                <DentistIcon size={20} className="opacity-60 hover:opacity-100 transition-opacity" />
                <PharmacyIcon size={20} className="opacity-60 hover:opacity-100 transition-opacity" />
                <PTOTIcon size={20} className="opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            
            {/* ---------------------------------------------------------------
                COLUMN 2: Specialties Links
                ---------------------------------------------------------------
                TO ADD A SPECIALTY: Copy an <li> block and edit the text
                TO REMOVE A SPECIALTY: Delete the entire <li> block
                TO CHANGE LINK DESTINATION: Edit the href="/services" path
            --------------------------------------------------------------- */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Specialties</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <DoctorIcon size={14} />
                  <Link href="/services" className="hover:text-primary">Doctors & Physicians</Link>
                </li>
                <li className="flex items-center gap-2">
                  <DentistIcon size={14} />
                  <Link href="/services" className="hover:text-primary">Dentists</Link>
                </li>
                <li className="flex items-center gap-2">
                  <PharmacyIcon size={14} />
                  <Link href="/services" className="hover:text-primary">Pharmacies</Link>
                </li>
                <li className="flex items-center gap-2">
                  <PTOTIcon size={14} />
                  <Link href="/services" className="hover:text-primary">PT / OT Clinics</Link>
                </li>
              </ul>
            </div>

            {/* ---------------------------------------------------------------
                COLUMN 3: Company Links
                ---------------------------------------------------------------
                TO ADD A LINK: Copy an <li> block and edit text + href
                TO REMOVE A LINK: Delete the entire <li> block
            --------------------------------------------------------------- */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-primary">How It Works</Link></li>
                <li><Link href="/results" className="hover:text-primary">Case Studies</Link></li>
                <li><Link href="/calculator" className="hover:text-primary">ROI Calculator</Link></li>
              </ul>
            </div>

            {/* ---------------------------------------------------------------
                COLUMN 4: Contact Information
                ---------------------------------------------------------------
                TO CHANGE PHONE NUMBER: Edit "1-800-DOC-PROPEL"
                TO CHANGE EMAIL: Edit "hello@docpropel.com"
                TO REMOVE CLIENT LOGIN BUTTON: Delete the <li> with Button
            --------------------------------------------------------------- */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1-800-DOC-PROPEL</li>
                <li>hello@docpropel.com</li>
                <li className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-none"
                  >
                    Client Login
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              FOOTER BOTTOM BAR
              -----------------------------------------------------------------
              Contains: Copyright text, Privacy Policy, Terms of Service
              
              TO CHANGE COPYRIGHT TEXT: Edit the <p> content below
              TO ADD/REMOVE LINKS: Edit the <a> elements
          ----------------------------------------------------------------- */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} DocPropel. All rights reserved. 
              Serving Doctors, Dentists, Pharmacies & PT/OT Clinics.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
