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
  it("loops without an on-site motion control and retains device reduced-motion behavior", () => {
    const wrapper = read("client/src/branding/HeaderBrand.tsx").toString();
    const css = read("client/src/branding/header-brand.css").toString();
    const loop = read("client/src/branding/header-logo-loop.css").toString();
    const artwork = read(
      "client/src/branding/PropeldockHeaderLogo.tsx"
    ).toString();
    expect(wrapper).not.toMatch(
      /<button\b|useState|aria-pressed|data-motion-paused|paused=/
    );
    expect(css).not.toMatch(/logo-motion-toggle|data-motion-paused/);
    expect(artwork).not.toMatch(/paused\??:|data-paused/);
    expect(loop).toContain("4.8s");
    expect(loop).toContain("infinite");
    expect(loop).not.toMatch(
      /data-paused|data-pd-motion-paused|animation-play-state/
    );
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("animation: none !important");
    expect(css).toContain("opacity: 1 !important");
    expect(css).toContain("transform: none !important");
  });
  it("discloses the known continuous-motion criterion failure instead of claiming conformance", () => {
    const pages = read("client/src/Pages.tsx").toString();
    expect(pages).toContain("has no on-site pause or stop control");
    expect(pages).toContain("when your device requests reduced motion");
    expect(pages).toContain(
      "does not meet WCAG 2.2 Success Criterion 2.2.2 (Pause, Stop, Hide)"
    );
  });
});
