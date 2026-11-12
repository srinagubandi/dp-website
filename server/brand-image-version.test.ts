import { describe, it, expect } from "vitest";
import { versionBrandImage, BRAND_ASSET_VERSION } from "../shared/branding";

describe("versionBrandImage", () => {
  it("versions both owned default image paths", () => {
    for (const pathname of [
      "/og-image-1200x630.png",
      "/twitter-card-1200x630.png",
    ]) {
      expect(versionBrandImage(pathname)).toBe(
        `${pathname}?v=${BRAND_ASSET_VERSION}`
      );
    }
  });
  it("preserves query parameters and updates the version idempotently", () => {
    const result = versionBrandImage(
      "/og-image-1200x630.png?crop=center&caption=why?now&v=old"
    );
    const params = new URLSearchParams(result.slice(result.indexOf("?") + 1));
    expect(params.get("crop")).toBe("center");
    expect(params.get("caption")).toBe("why?now");
    expect(params.get("v")).toBe(BRAND_ASSET_VERSION);
    expect(versionBrandImage(result)).toBe(result);
  });
  it("leaves custom root paths and fragments untouched", () => {
    for (const custom of [
      "/uploads/og-image-1200x630.png",
      "/custom.png?v=owner",
      "/og-image-1200x630.png#custom",
    ]) {
      expect(versionBrandImage(custom)).toBe(custom);
    }
  });
  it("leaves external image URLs unchanged", () => {
    const external =
      "https://example.com/og-image-1200x630.png?crop=center&v=owner";
    expect(versionBrandImage(external)).toBe(external);
  });
});
