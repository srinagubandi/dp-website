import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_SEO, PUBLIC_ROUTES } from "../shared/site";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const layout = read("client/src/Layout.tsx");
const leadForm = read("client/src/LeadForm.tsx");
const pages = read("client/src/Pages.tsx");
const styles = read("client/src/index.css");
const app = read("client/src/App.tsx");

describe("accessibility and legal regression controls", () => {
  it("keeps the public accessibility statement registered, indexed, and linked from legal navigation", () => {
    expect(PUBLIC_ROUTES).toContain("/accessibility");
    expect(
      DEFAULT_SEO.find(item => item.route === "/accessibility")?.noindex
    ).toBe(false);
    expect(app).toContain('path="/accessibility"');
    expect(layout).toContain('href="/accessibility"');
    expect(pages).toContain("Accessibility Statement");
    expect(pages).toContain("WCAG 2.2 Level AA");
  });

  it("retains meaningful keyboard, dialog, and reduced-motion controls", () => {
    expect(layout).toContain('href="#main-content"');
    expect(layout).toContain('aria-modal="true"');
    expect(layout).toContain('event.key === "Escape"');
    expect(layout).toContain("focusable()[0]?.focus()");
    expect(styles).toContain("a:focus-visible");
    expect(styles).toContain("prefers-reduced-motion: reduce");
  });

  it("keeps accessible form labels, PHI guidance, errors, and submission status", () => {
    expect(leadForm).toContain('htmlFor="lead-name"');
    expect(leadForm).toContain('aria-describedby="phi-guidance"');
    expect(leadForm).toContain('role="alert"');
    expect(leadForm).toContain('role="status"');
    expect(leadForm).toContain("confirmationRef.current?.focus()");
    expect(leadForm).toContain("protected health information");
  });

  it("retains tailored interim privacy and terms language", () => {
    expect(pages).toContain("interim Privacy Notice");
    expect(pages).toContain("Website Terms & Conditions");
    expect(pages).toContain("Interim policy for legal review");
    expect(pages).toContain("not a patient portal");
  });
});
