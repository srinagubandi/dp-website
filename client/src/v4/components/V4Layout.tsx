import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { contactDetails, navLinks } from "../data";
import V4ReviewDialog from "./V4ReviewDialog";
import "../v4.css";

export function V4Logo() {
  return (
    <Link
      href="/v4"
      className="v4-logo"
      aria-label="DocPropel Performance Ledger home"
    >
      <span className="v4-logo-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>DocPropel</span>
      <small>Performance Ledger</small>
    </Link>
  );
}

export function V4ReviewButton({
  label = "Request a performance model review",
  variant = "primary",
}: {
  label?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <V4ReviewDialog
      trigger={
        <button className={`v4-button v4-button--${variant}`} type="button">
          <span>{label}</span>
          <ArrowRight aria-hidden="true" size={16} />
        </button>
      }
    />
  );
}

export function V4Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="v4-nav">
      <div className="v4-shell v4-nav-inner">
        <V4Logo />
        <nav
          className="v4-nav-links"
          aria-label="Performance Ledger primary navigation"
        >
          {navLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="v4-nav-link"
              aria-current={location === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="v4-nav-action">
          <V4ReviewButton label="Request review" />
        </div>
        <button
          className="v4-menu-toggle"
          type="button"
          onClick={() => setOpen(value => !value)}
          aria-expanded={open}
          aria-controls="v4-mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="v4-mobile-navigation"
        className="v4-mobile-nav"
        data-open={open}
        aria-label="Performance Ledger mobile navigation"
      >
        <div className="v4-shell">
          {navLinks.map(([href, label], index) => (
            <Link
              key={href}
              href={href}
              className="v4-mobile-link"
              aria-current={location === href ? "page" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </Link>
          ))}
          <Link href="/v4/contact" className="v4-mobile-link">
            <span>07</span>Contact
          </Link>
          <div className="v4-mobile-action">
            <V4ReviewButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

export function V4Footer() {
  return (
    <footer className="v4-footer">
      <div className="v4-shell">
        <div className="v4-footer-head">
          <div>
            <p className="v4-kicker">Record 08 / next decision</p>
            <h2>Bring the model into your market context.</h2>
          </div>
          <V4ReviewButton />
        </div>
        <div className="v4-footer-grid">
          <div className="v4-footer-brand">
            <V4Logo />
            <p>
              A performance-based growth partner for doctors, dentists,
              pharmacies, and PT/OT clinics.
            </p>
          </div>
          <div>
            <h3>Ledger</h3>
            <Link href="/v4/services">Services</Link>
            <Link href="/v4/how-it-works">Operating model</Link>
            <Link href="/v4/results">Evidence</Link>
            <Link href="/v4/calculator">Planning tool</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/v4/about">About DocPropel</Link>
            <Link href="/v4/contact">Contact</Link>
            <Link href="/">Original site</Link>
          </div>
          <div>
            <h3>Direct contact</h3>
            <a href={`tel:${contactDetails.tel}`}>{contactDetails.phone}</a>
            <span>{contactDetails.email}</span>
            <span>{contactDetails.hours}</span>
          </div>
        </div>
        <div className="v4-footer-bottom">
          <span>
            © {new Date().getFullYear()} DocPropel. All rights reserved.
          </span>
          <span>Performance-based healthcare growth</span>
        </div>
      </div>
    </footer>
  );
}

export default function V4Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="v4">
      <a className="v4-skip-link" href="#v4-main">
        Skip to main content
      </a>
      <V4Nav />
      <main id="v4-main">{children}</main>
      <V4Footer />
    </div>
  );
}
