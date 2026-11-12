import { Link } from "wouter";
import { DocPropelHeaderLogo } from "./DocPropelHeaderLogo";
import "./header-brand.css";

export function HeaderBrand() {
  return (
    <div className="header-brand">
      <Link href="/" className="logo-link" aria-label="DocPropel home">
        <DocPropelHeaderLogo label="DocPropel logo" className="brand-logo" />
      </Link>
    </div>
  );
}
