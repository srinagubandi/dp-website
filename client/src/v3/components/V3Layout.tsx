import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import V3BriefDialog from "./V3BriefDialog";
import "../v3.css";

const navLinks = [
  ["/v3/services", "Services"],
  ["/v3/how-it-works", "How it works"],
  ["/v3/compare", "Why performance"],
  ["/v3/results", "Results"],
  ["/v3/about", "About"],
  ["/v3/calculator", "Calculator"],
] as const;

const pageTitles: Record<string, string> = {
  "/v3": "DocPropel | The Practice Growth Guide",
  "/v3/services": "Services | DocPropel Practice Growth Guide",
  "/v3/how-it-works": "How It Works | DocPropel Practice Growth Guide",
  "/v3/compare": "Why Performance | DocPropel Practice Growth Guide",
  "/v3/results": "Results | DocPropel Practice Growth Guide",
  "/v3/about": "About | DocPropel Practice Growth Guide",
  "/v3/calculator": "Growth Calculator | DocPropel Practice Growth Guide",
  "/v3/contact": "Contact | DocPropel Practice Growth Guide",
};

function Logo() {
  return (
    <Link href="/v3" className="v3-logo" aria-label="DocPropel v3 home">
      <span className="v3-logo-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        DocPropel
        <small>Practice Growth Guide</small>
      </span>
    </Link>
  );
}

export function V3BriefButton({
  children = "See if your practice is a fit",
  variant = "primary",
}: {
  children?: ReactNode;
  variant?: "primary" | "paper" | "outline";
}) {
  return (
    <V3BriefDialog
      trigger={
        <button className={`v3-button v3-button--${variant}`} type="button">
          {children} <ArrowRight aria-hidden="true" size={17} />
        </button>
      }
    />
  );
}

function V3Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className="v3-header">
      <div className="v3-shell v3-header-inner">
        <Logo />
        <nav className="v3-nav" aria-label="Practice Growth Guide navigation">
          {navLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={location === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="v3-header-cta">
          <V3BriefButton>Request a Growth Brief</V3BriefButton>
        </div>
        <button
          className="v3-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="v3-mobile-navigation"
          onClick={() => setMenuOpen(current => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="v3-mobile-navigation"
        className="v3-mobile-nav"
        data-open={menuOpen}
        aria-label="Mobile Practice Growth Guide navigation"
      >
        <div className="v3-shell">
          {navLinks.map(([href, label], index) => (
            <Link
              key={href}
              href={href}
              aria-current={location === href ? "page" : undefined}
            >
              <span>0{index + 1}</span> {label}
            </Link>
          ))}
          <Link href="/v3/contact">
            <span>07</span> Contact
          </Link>
          <V3BriefButton>Request a Growth Brief</V3BriefButton>
        </div>
      </nav>
    </header>
  );
}

function V3Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-shell">
        <div className="v3-footer-lead">
          <div>
            <p className="v3-kicker v3-kicker--light">A useful next step</p>
            <h2>Start with the practice behind the plan.</h2>
          </div>
          <V3BriefButton variant="paper">Request a Growth Brief</V3BriefButton>
        </div>
        <div className="v3-footer-grid">
          <div>
            <Logo />
            <p>
              A performance-based growth partner for doctors, dentists,
              pharmacies, and PT/OT clinics.
            </p>
          </div>
          <div>
            <h3>Read the guide</h3>
            <Link href="/v3/services">Services</Link>
            <Link href="/v3/how-it-works">How it works</Link>
            <Link href="/v3/compare">Why performance</Link>
            <Link href="/v3/results">Results &amp; case studies</Link>
          </div>
          <div>
            <h3>DocPropel</h3>
            <Link href="/v3/about">About</Link>
            <Link href="/v3/calculator">Growth calculator</Link>
            <Link href="/v3/contact">Contact</Link>
            <Link href="/">View original site</Link>
          </div>
          <div>
            <h3>Direct contact</h3>
            <a href="tel:1-800-362-7767">1-800-DOC-PROPEL</a>
            <a href="mailto:hello@docpropel.com">hello@docpropel.com</a>
            <p>Monday–Friday, 9am–6pm EST</p>
          </div>
        </div>
        <div className="v3-footer-bottom">
          <span>
            © {new Date().getFullYear()} DocPropel. All rights reserved.
          </span>
          <span>Performance-based healthcare growth</span>
        </div>
      </div>
    </footer>
  );
}

export default function V3Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    document.title = pageTitles[location] ?? "DocPropel Practice Growth Guide";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="v3">
      <a className="v3-skip-link" href="#v3-main">
        Skip to main content
      </a>
      <V3Header />
      <main id="v3-main">{children}</main>
      <V3Footer />
    </div>
  );
}
