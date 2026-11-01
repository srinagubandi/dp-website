import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONTENT,
  DEFAULT_SEO,
  PUBLIC_ROUTES,
  SPECIALTIES,
} from "../shared/site";

const root = path.resolve(import.meta.dirname, "..");
const source = ["client/src/Pages.tsx", "shared/site.ts", "client/index.html"]
  .map(file => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");
const leadFormSource = fs.readFileSync(
  path.join(root, "client/src/LeadForm.tsx"),
  "utf8"
);
const layoutSource = fs.readFileSync(
  path.join(root, "client/src/Layout.tsx"),
  "utf8"
);
const modalSource = fs.readFileSync(
  path.join(root, "client/src/GrowthBriefModal.tsx"),
  "utf8"
);
describe("public release inventory", () => {
  it("has metadata for every public route", () =>
    expect(DEFAULT_SEO.map(item => item.route)).toEqual(PUBLIC_ROUTES));
  it("contains no prohibited placeholder proof claims", () => {
    for (const claim of [
      "500+",
      "$50M+",
      "4.9/5",
      "+62%",
      "within 1 business day",
    ])
      expect(source).not.toContain(claim);
  });
  it("retains the approved conversion headline and five core practice groups", () => {
    expect(source).toContain("Stop paying for promises. Pay for patients.");
    expect(source).toContain("A simple, no-pressure process.");
    for (const practice of [
      "Doctors & physicians",
      "Dental practices",
      "Independent pharmacies",
      "PT / OT clinics",
      "ABA & pediatric clinics",
    ])
      expect(source).toContain(practice);
  });
  it("publishes the supplied team leaders while keeping Sri's placeholder bio editable", () => {
    for (const name of [
      "Rakesh Mittapelly",
      "Mike Tomasiello",
      "Sri Nagubandi",
    ])
      expect(source).toContain(name);
    expect(source).toContain("Lorem ipsum dolor sit amet");
    expect(source).not.toContain("Aurelia Vale");
    expect(source).not.toContain("Marcus Vero");
  });
  it("publishes dedicated, indexable full-profile routes for every team leader", () => {
    for (const route of [
      "/team/rakesh-mittapelly",
      "/team/mike-tomasiello",
      "/team/sri-nagubandi",
    ]) {
      expect(PUBLIC_ROUTES).toContain(route);
      expect(DEFAULT_SEO.map(item => item.route)).toContain(route);
      expect(source).toContain(route);
    }
    expect(source).toContain("View full profile");
    expect(source).toContain("I founded Propel Dental with one mission");
  });
  it("registers full-profile routes before the Team overview route", () => {
    const appSource = fs.readFileSync(
      path.join(root, "client/src/App.tsx"),
      "utf8"
    );
    expect(appSource.indexOf('path="/team/rakesh-mittapelly"')).toBeLessThan(
      appSource.indexOf('path="/team" component={Team}')
    );
  });
  it("seeds Admin-editable image and full-bio fields for every profile page", () => {
    for (const route of [
      "/team/rakesh-mittapelly",
      "/team/mike-tomasiello",
      "/team/sri-nagubandi",
    ]) {
      const profileFields = DEFAULT_CONTENT.filter(
        item => item.route === route && item.section === "profile"
      );
      expect(profileFields.some(item => item.key === "image")).toBe(true);
      expect(
        profileFields.filter(item => item.key.startsWith("bio-")).length
      ).toBeGreaterThan(0);
    }
  });
  it("publishes only the five approved specialty options", () =>
    expect([...SPECIALTIES]).toEqual([
      "Doctors & physicians",
      "Dental practices",
      "Independent pharmacies",
      "PT / OT clinics",
      "ABA & pediatric clinics",
    ]));
  it("keeps required-field guidance before the Growth Brief inputs", () => {
    expect(leadFormSource).toContain('className="form-legend wide"');
    expect(leadFormSource).toContain('aria-required="true"');
    expect(leadFormSource).not.toContain("Urgent Care");
  });
  it("keeps Growth Brief modal entry points public while removing Admin from the public footer", () => {
    expect(modalSource).toContain('role="dialog"');
    expect(modalSource).toContain('aria-modal="true"');
    expect(modalSource).toContain('href = "/contact#growth-brief"');
    expect(layoutSource).not.toContain('<Link href="/admin">Admin</Link>');
  });
  it("includes every indexable route in the sitemap", () => {
    const sitemap = fs.readFileSync(
      path.join(root, "client/public/sitemap.xml"),
      "utf8"
    );
    for (const route of PUBLIC_ROUTES.filter(
      item => !["/privacy", "/terms"].includes(item)
    ))
      expect(sitemap).toContain(`https://docpropel.com${route}`);
  });
  it("uses approved root-relative icons and an absolute production social default", () => {
    const html = fs.readFileSync(path.join(root, "client/index.html"), "utf8");
    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain("__META_OG_IMAGE__");
  });
});
