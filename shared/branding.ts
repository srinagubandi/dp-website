export const BRAND_ASSET_VERSION = "20261111-option2";

const OWNED_PATHS = new Set([
  "/og-image-1200x630.png",
  "/twitter-card-1200x630.png",
]);

/** Version owned default social images without changing saved CMS records. */
export function versionBrandImage(value: string): string {
  const queryIndex = value.indexOf("?");
  const pathname = queryIndex < 0 ? value : value.slice(0, queryIndex);
  if (!OWNED_PATHS.has(pathname)) return value;
  const query = queryIndex < 0 ? "" : value.slice(queryIndex + 1);
  const params = new URLSearchParams(query);
  params.set("v", BRAND_ASSET_VERSION);
  return `${pathname}?${params.toString()}`;
}
