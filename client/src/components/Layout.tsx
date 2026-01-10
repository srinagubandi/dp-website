import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import IntakeForm from "@/components/IntakeForm";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
      <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>How It Works</Link>
      <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Compare</Link>
      <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>About Us</Link>
      <Link href="/calculator" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>ROI Calculator</Link>
      <Link href="/results" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Results</Link>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/images/logo.png" alt="DocPropel" className="h-10 w-auto" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
            <IntakeForm trigger={
              <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-none px-6">
                Request a Practice Growth Brief
              </Button>
            } />
          </nav>

          {/* Mobile Nav */}
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

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <img src="/images/logo.png" alt="DocPropel" className="h-8 w-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The only performance-based marketing partner for healthcare practices. We grow your patient base, you only pay for results.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">SEO & Local Search</a></li>
                <li><a href="#" className="hover:text-primary">PPC Advertising</a></li>
                <li><a href="#" className="hover:text-primary">Website Design</a></li>
                <li><a href="#" className="hover:text-primary">Reputation Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary">About Us</a></li>
                <li><a href="#how-it-works" className="hover:text-primary">How It Works</a></li>
                <li><a href="#" className="hover:text-primary">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1-800-DOC-PROPEL</li>
                <li>hello@docpropel.com</li>
                <li className="pt-2">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-none">
                    Client Login
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DocPropel. All rights reserved.</p>
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
