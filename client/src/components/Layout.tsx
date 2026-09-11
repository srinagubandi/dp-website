import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import IntakeForm from "@/components/IntakeForm";

const navLinks = [
  { href: "/services", label: "Capabilities" },
  { href: "/how-it-works", label: "Operating Model" },
  { href: "/compare", label: "Why Performance" },
  { href: "/calculator", label: "Growth Calculator" },
  { href: "/about", label: "About" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="border-b border-border bg-[#06131f]">
        <div className="container flex min-h-8 items-center justify-between gap-3 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px]">
          <span className="font-mono">
            Healthcare practice growth / performance model
          </span>
          <a
            href="tel:1-800-362-7767"
            className="hidden font-mono text-secondary transition-colors hover:text-foreground sm:block"
          >
            1-800-DOC-PROPEL
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex h-[4.6rem] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            onClick={closeMenu}
          >
            <img
              src="/images/logo.png"
              alt="DocPropel"
              className="h-9 w-auto sm:h-10"
            />
            <span className="hidden border-l border-border pl-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground xl:block">
              Growth systems
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                  location === link.href
                    ? "text-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mr-1 font-mono text-[10px] text-primary/75">
                  0{index + 1}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:1-800-362-7767"
              className="hidden items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-secondary xl:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              1-800-DOC-PROPEL
            </a>
            <IntakeForm
              trigger={
                <Button className="signal-button bg-primary px-4 font-semibold text-primary-foreground hover:bg-[#ff9639]">
                  Start with a brief <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Button>
              }
            />
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-secondary hover:text-secondary lg:hidden"
            onClick={() => setMobileMenuOpen(open => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-[#081b2c] lg:hidden">
            <nav
              className="container grid gap-1 py-5"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-3 py-3 text-base font-medium ${
                    location === link.href
                      ? "bg-secondary/10 text-secondary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="font-mono text-xs text-primary">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:1-800-362-7767"
                className="mt-3 flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground"
                onClick={closeMenu}
              >
                <Phone className="h-4 w-4 text-secondary" /> 1-800-DOC-PROPEL
              </a>
              <IntakeForm
                trigger={
                  <Button className="signal-button mt-2 w-full bg-primary font-semibold text-primary-foreground hover:bg-[#ff9639]">
                    Request a Practice Growth Brief{" "}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="section-rule bg-[#06131f]">
        <div className="container py-12 lg:py-16">
          <div className="grid gap-10 md:grid-cols-[1.45fr_0.8fr_0.8fr]">
            <div>
              <img
                src="/images/logo.png"
                alt="DocPropel"
                className="mb-5 h-9 w-auto"
              />
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                A performance-based growth partner for healthcare practices that
                want a clearer path from demand to patient opportunity.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:1-800-362-7767"
                  className="signal-link inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold text-secondary"
                >
                  <Phone className="h-4 w-4" /> 1-800-DOC-PROPEL
                </a>
                <IntakeForm
                  trigger={
                    <button
                      type="button"
                      className="signal-link inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold text-foreground"
                    >
                      Request a brief <ArrowUpRight className="h-4 w-4" />
                    </button>
                  }
                />
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4 text-secondary">Explore</p>
              <ul className="grid gap-3 text-sm text-muted-foreground">
                {navLinks.slice(0, 4).map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4 text-secondary">Built for</p>
              <ul className="grid gap-3 text-sm text-muted-foreground">
                <li>Doctors &amp; physicians</li>
                <li>Dentists &amp; specialist practices</li>
                <li>Independent pharmacies</li>
                <li>Physical therapy &amp; OT clinics</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {new Date().getFullYear()} DocPropel. Performance-based
              healthcare marketing.
            </p>
            <Link
              href="/contact"
              className="transition-colors hover:text-secondary"
            >
              Contact the team <ArrowUpRight className="inline h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
