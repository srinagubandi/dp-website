import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file));
const geometry = JSON.parse(
  read("docs/branding/option2-geometry.json").toString()
) as {
  name: string;
  family: string;
  trackingEm: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  glyphs: { letter: string; weight: number; d: string; bounds: number[] }[];
  fontHashes: Record<string, string>;
};

describe("selected DocPropel Option 2 wordmark", () => {
  it("pins the approved font weights, exact lettering, and finite unclipped bounds", () => {
    expect(geometry.name).toBe("DocPropel");
    expect(geometry.family).toBe("Plus Jakarta Sans");
    expect(geometry.trackingEm).toBe(-0.015);
    expect([geometry.viewBoxWidth, geometry.viewBoxHeight]).toEqual([630, 136]);
    expect(geometry.glyphs.map(glyph => glyph.letter).join("")).toBe(
      "DocPropel"
    );
    expect(geometry.glyphs.map(glyph => glyph.weight)).toEqual([
      500, 500, 500, 700, 700, 700, 700, 700, 700,
    ]);
    expect(geometry.fontHashes).toEqual({
      "jakarta-0.ttf":
        "b4fc14ec283d54236fd302cdb92546f98ae0ff061ca5ee23453a02bdf4628791",
      "jakarta-1.ttf":
        "32971ad7976930539a11c79ce91ce84092df7f25c5be716b594601842f10a7ae",
    });
    for (const glyph of geometry.glyphs) {
      expect(glyph.d.length).toBeGreaterThan(0);
      expect(glyph.bounds).toHaveLength(4);
      expect(glyph.bounds.every(Number.isFinite)).toBe(true);
      const [x0, y0, x1, y1] = glyph.bounds;
      expect(x0).toBeGreaterThanOrEqual(0);
      expect(y0).toBeGreaterThanOrEqual(0);
      expect(x1).toBeLessThanOrEqual(630);
      expect(y1).toBeLessThanOrEqual(136);
      expect(x1).toBeGreaterThan(x0);
      expect(y1).toBeGreaterThan(y0);
    }
  });
  it("uses identical outlined letter geometry in both static themes and the animated header", () => {
    const sources = [
      "client/src/branding/DocPropelHeaderLogo.tsx",
      "client/public/docpropel-logo-dark.svg",
      "client/public/docpropel-logo-light.svg",
    ].map(file => read(file).toString());
    for (const source of sources) {
      expect(source).toContain('viewBox="0 0 630 136"');
      expect(source).not.toMatch(
        /Propeldock|<text\b|<script\b|<foreignObject\b|https?:\/\/[^\s"]+\.(?:js|woff|png)/i
      );
      expect(source).toContain('data-typeface="Plus Jakarta Sans"');
      for (const glyph of geometry.glyphs) {
        expect(source).toContain(`d="${glyph.d}"`);
        expect(source).toContain(`data-letter="${glyph.letter}"`);
        expect(source).toContain(`data-weight="${glyph.weight}"`);
      }
      for (const ribbon of [
        "M30 16H83C106 16 119 30 119 49C119 66 110 82 94 90L75 99L83 73C96 67 101 60 99 53C98 48 92 45 83 45H15Z",
        "M83 45C98 45 105 53 100 65L89 94L54 106L67 72L83 66C92 62 94 53 83 45Z",
        "M17 78L70 62L54 106L2 121Z",
      ]) {
        expect(source).toContain(`d="${ribbon}"`);
      }
    }
  });
  it("delivers a real high-resolution PNG logo and correctly sized social PNGs", () => {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const logo = read("client/public/images/logo.png");
    expect(logo.subarray(0, 8)).toEqual(signature);
    expect(logo.readUInt32BE(16)).toBe(2048);
    expect(logo.readUInt32BE(20)).toBeGreaterThan(400);
    expect(logo.readUInt32BE(20)).toBeLessThan(500);
    for (const file of ["og-image-1200x630.png", "twitter-card-1200x630.png"]) {
      const bytes = read(`client/public/${file}`);
      expect(bytes.subarray(0, 8)).toEqual(signature);
      expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([
        1200, 630,
      ]);
    }
  });
});
