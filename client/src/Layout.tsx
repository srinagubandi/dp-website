import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

const nav = [
  ["/services", "Services"], ["/specialties", "Specialties"], ["/how-it-works", "How it works"],
  ["/results", "Results"], ["/about", "About"], ["/team", "Team"],
];

function Logo({ light = false }: { light?: boolean }) {
  return <img className="brand-logo" src={light ? "/docpropel-logo-light.svg" : "/docpropel-logo-dark.svg"} alt="DocPropel" width="180" height="36" />;
}

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement;
    const focusable = () => Array.from(menu.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const list = focusable(); const first = list[0]; const last = list[list.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey); document.body.classList.add("menu-open");
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("menu-open"); previous?.focus(); };
  }, [open]);
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo-link" aria-label="DocPropel home"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Primary">
          {nav.map(([href, label]) => <Link key={href} href={href} aria-current={location === href ? "page" : undefined}>{label}</Link>)}
          <Link href="/contact" className="button small">Get a Growth Brief <span aria-hidden="true">→</span></Link>
        </nav>
        <button ref={menuButton} className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(value => !value)}>
          <span /><span /><span />
        </button>
      </div>
      {open && <div className="mobile-panel" id="mobile-navigation" ref={menu} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="menu-close" type="button" onClick={() => setOpen(false)} aria-label="Close navigation">×</button>
        <nav aria-label="Mobile primary">{nav.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact" className="button coral">Get a Growth Brief</Link></nav>
      </div>}
    </header>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Link href="/" aria-label="DocPropel home"><Logo light /></Link><p>Accountable growth systems for healthcare practices.</p></div>
        <div><strong>Explore</strong><Link href="/services">Services</Link><Link href="/specialties">Specialties</Link><Link href="/how-it-works">How it works</Link><Link href="/results">Results</Link></div>
        <div><strong>Company</strong><Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/contact">Contact</Link><Link href="/admin">Admin</Link></div>
        <div><strong>Contact</strong><a href="tel:+18003627767">1-800-DOC-PROPEL</a><a href="mailto:hello@docpropel.com">hello@docpropel.com</a><span>Mon–Fri, 9am–6pm ET</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} DocPropel</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div>
    </footer>
  </div>;
}
