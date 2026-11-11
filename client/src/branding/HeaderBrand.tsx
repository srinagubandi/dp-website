import { Link } from "wouter";
import { PropeldockHeaderLogo } from "./PropeldockHeaderLogo";
import "./header-brand.css";

export function HeaderBrand() {
  return (
    <div className="header-brand">
      <Link
        href="/"
        className="logo-link"
        aria-label="DocPropel home — Propeldock logo"
      >
        <PropeldockHeaderLogo
          label="Propeldock logo artwork for DocPropel"
          className="brand-logo"
        />
      </Link>
    </div>
  );
}
