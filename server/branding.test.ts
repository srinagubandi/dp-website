import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file));

describe("supplied logo and favicon integration", () => {
  it("keeps static logos outlined, proportional, and free of external resources", () => {
    for (const name of ["dark", "light"]) {
      const svg = read(`client/public/docpropel-logo-${name}.svg`).toString();
      expect(svg).toContain('viewBox="0 0 600 136"');
      expect(svg).toContain("Propeldock");
      expect(svg).not.toMatch(
        /<text\b|<script\b|<foreignObject\b|https?:\/\/[^\s"]+\.(?:js|woff|png)/i
      );
    }
  });
  it("ships correctly sized favicon, touch, install and maskable PNGs", () => {
    const sizes: Record<string, number> = {
      "favicon-16x16.png": 16,
      "favicon-32x32.png": 32,
      "apple-touch-icon.png": 180,
      "android-chrome-192x192.png": 192,
      "android-chrome-512x512.png": 512,
      "maskable-icon-192x192.png": 192,
      "maskable-icon-512x512.png": 512,
      "mstile-150x150.png": 150,
    };
    for (const [name, size] of Object.entries(sizes)) {
      const bytes = read(`client/public/${name}`);
      expect(bytes.subarray(1, 4).toString()).toBe("PNG");
      expect(bytes.readUInt32BE(16)).toBe(size);
      expect(bytes.readUInt32BE(20)).toBe(size);
    }
    const ico = read("client/public/favicon.ico");
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBeGreaterThan(0);
  });
  it("retains DocPropel's manifest identity and icon declarations", () => {
    const manifest = JSON.parse(
      read("client/public/site.webmanifest").toString()
    );
    expect(manifest.name).toBe("DocPropel");
    expect(manifest.short_name).toBe("DocPropel");
    expect(manifest.start_url).toBe("/");
    expect(
      manifest.icons.filter(
        (icon: { purpose?: string }) => icon.purpose === "maskable"
      )
    ).toHaveLength(2);
  });
  it("adds a separately focusable pause control and static reduced-motion behavior", () => {
    const wrapper = read("client/src/branding/HeaderBrand.tsx").toString();
    const css = read("client/src/branding/header-brand.css").toString();
    expect(wrapper).toContain("aria-pressed={paused}");
    expect(wrapper).toContain("Pause logo animation");
    expect(wrapper).toContain("Resume logo animation");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain('data-motion-paused="true"');
    expect(css).toContain("animation: none !important");
    expect(css).toContain("opacity: 1 !important");
    expect(css).toContain("min-height: 24px");
  });
});
