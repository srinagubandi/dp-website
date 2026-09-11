import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import "../v2.css";
import V2BriefForm from "./V2BriefForm";

const links = [
  { href: "/v2/services", label: "Services" },
  { href: "/v2/how-it-works", label: "How it works" },
  { href: "/v2/compare", label: "Why performance" },
  { href: "/v2/about", label: "About" },
  { href: "/v2/calculator", label: "Calculator" },
  { href: "/v2/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/v2" className="v2-logo" aria-label="DocPropel version 2 home">
      <span className="v2-logo-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>DocPropel</span>
    </Link>
  );
}

function RequestBriefButton({ light = false }: { light?: boolean }) {
  return (
    <V2BriefForm
      trigger={
        <button className={`v2-button ${light ? "v2-button--light" : ""}`}>
          Request a Growth Brief <ArrowRight size={15} strokeWidth={1.7} />
        </button>
      }
    />
  );
}

export function V2Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="v2-nav">
      <div className="v2-shell">
        <div className="v2-nav-inner">
          <Logo />
          <nav
            className="v2-nav-links"
            aria-label="Version 2 primary navigation"
          >
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="v2-nav-link"
                aria-current={location === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="v2-nav-cta">
            <RequestBriefButton />
          </div>
          <button
            className="v2-menu-button"
            type="button"
            onClick={() => setOpen(value => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <nav
          className="v2-mobile-links"
          data-open={open}
          aria-label="Version 2 mobile navigation"
        >
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="v2-nav-link"
              aria-current={location === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <RequestBriefButton />
        </nav>
      </div>
    </header>
  );
}

export function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-shell">
        <div className="v2-footer-grid">
          <div>
            <Logo />
            <p style={{ marginTop: 20, maxWidth: 300 }}>
              A performance-based growth partner for doctors, dentists,
              pharmacies, and PT/OT clinics.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              <li>
                <Link href="/v2/services">Services</Link>
              </li>
              <li>
                <Link href="/v2/how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/v2/compare">Why performance</Link>
              </li>
              <li>
                <Link href="/v2/results">Results &amp; case studies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link href="/v2/about">About DocPropel</Link>
              </li>
              <li>
                <Link href="/v2/contact">Contact</Link>
              </li>
              <li>
                <Link href="/">View original site</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Start a conversation</h3>
            <p>
              Tell us about your practice, your market, and the patient path you
              want to improve.
            </p>
            <div style={{ marginTop: 20 }}>
              <RequestBriefButton light />
            </div>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>
            © {new Date().getFullYear()} DocPropel. All rights reserved.
          </span>
          <span>Performance-based healthcare growth</span>
        </div>
      </div>
    </footer>
  );
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2">
      <V2Nav />
      <main className="v2-main">{children}</main>
      <V2Footer />
    </div>
  );
}

export { RequestBriefButton };
