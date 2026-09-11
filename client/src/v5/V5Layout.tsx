import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { v5Nav } from "./content";
import V5LeadDialog from "./V5LeadDialog";
import "./v5.css";

function Logo() {
  return (
    <Link className="v5-logo" href="/v5" aria-label="DocPropel v5 home">
      <span className="v5-logo__mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>DocPropel</span>
    </Link>
  );
}

export function BriefButton({ light = false }: { light?: boolean }) {
  return (
    <V5LeadDialog
      trigger={
        <button
          className={`v5-button ${light ? "v5-button--light" : ""}`}
          type="button"
        >
          Request a Growth Brief <ArrowRight aria-hidden="true" size={17} />
        </button>
      }
    />
  );
}

function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="v5-nav">
      <div className="v5-shell v5-nav__inner">
        <Logo />
        <nav
          className="v5-nav__links"
          aria-label="Version 5 primary navigation"
        >
          {v5Nav.slice(0, 5).map(link => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={location === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="v5-nav__actions">
          <Link href="/v5/calculator" className="v5-nav__calculator">
            Calculator
          </Link>
          <BriefButton />
        </div>
        <button
          className="v5-menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="v5-mobile-menu"
          onClick={() => setOpen(value => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="v5-mobile-menu"
        className="v5-mobile-menu"
        aria-label="Version 5 mobile navigation"
        data-open={open}
      >
        <div className="v5-shell">
          {v5Nav.map(link => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={location === link.href ? "page" : undefined}
            >
              <span>{link.label}</span>
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ))}
          <BriefButton />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="v5-footer">
      <div className="v5-shell">
        <div className="v5-footer__lead">
          <div>
            <Logo />
            <h2>Accountable growth, viewed with clarity.</h2>
          </div>
          <p>
            A performance-based growth partner for doctors, dentists,
            independent pharmacies, and PT/OT clinics.
          </p>
        </div>
        <div className="v5-footer__grid">
          <div>
            <h3>Explore</h3>
            <Link href="/v5/services">Services</Link>
            <Link href="/v5/how-it-works">How it works</Link>
            <Link href="/v5/compare">Why performance</Link>
            <Link href="/v5/results">Results &amp; case studies</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/v5/about">About DocPropel</Link>
            <Link href="/v5/calculator">Growth calculator</Link>
            <Link href="/v5/contact">Contact</Link>
            <Link href="/">Original site</Link>
          </div>
          <div className="v5-footer__contact">
            <h3>Start a conversation</h3>
            <p>
              Share practice-level context only. Please do not send patient or
              protected health information.
            </p>
            <BriefButton light />
          </div>
        </div>
        <div className="v5-footer__bottom">
          <span>
            © {new Date().getFullYear()} DocPropel. All rights reserved.
          </span>
          <span>Performance-based healthcare growth</span>
        </div>
      </div>
    </footer>
  );
}

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v5">
      <a className="v5-skip-link" href="#v5-main">
        Skip to main content
      </a>
      <Navigation />
      <main id="v5-main">{children}</main>
      <Footer />
    </div>
  );
}
