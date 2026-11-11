import { useState } from "react";
import { Link } from "wouter";
import { PropeldockHeaderLogo } from "./PropeldockHeaderLogo";
import "./header-brand.css";

export function HeaderBrand() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="header-brand" data-motion-paused={paused}>
      <Link
        href="/"
        className="logo-link"
        aria-label="DocPropel home — Propeldock logo"
      >
        <PropeldockHeaderLogo
          paused={paused}
          label="Propeldock logo artwork for DocPropel"
          className="brand-logo"
        />
      </Link>
      <button
        type="button"
        className="logo-motion-toggle"
        aria-pressed={paused}
        aria-label={paused ? "Resume logo animation" : "Pause logo animation"}
        onClick={() => setPaused(value => !value)}
      >
        {paused ? "Play logo" : "Pause logo"}
      </button>
    </div>
  );
}
