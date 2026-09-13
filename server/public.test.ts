import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_SEO, PUBLIC_ROUTES } from "../shared/site";

const root = path.resolve(import.meta.dirname, "..");
const source = ["client/src/Pages.tsx", "shared/site.ts", "client/index.html"]
  .map(file => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");
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
