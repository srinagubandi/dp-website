import { useEffect } from "react";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, type PublicRoute } from "../../shared/site";
import { useSite } from "./site-context";

function setMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = value;
}

export default function Metadata({ route }: { route: PublicRoute }) {
  const { seoFor } = useSite();
  const seo = seoFor(route);
  useEffect(() => {
    const siteUrl = window.location.origin;
    const absolute = (value: string) => value.startsWith("http") ? value : `${siteUrl}${value}`;
    document.title = seo.title;
    setMeta('meta[name="description"]', "name", "description", seo.description);
    setMeta('meta[name="robots"]', "name", "robots", seo.noindex ? "noindex,follow" : "index,follow");
    setMeta('meta[property="og:title"]', "property", "og:title", seo.ogTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", seo.ogDescription);
    setMeta('meta[property="og:url"]', "property", "og:url", `${siteUrl}${seo.canonicalPath}`);
    setMeta('meta[property="og:image"]', "property", "og:image", absolute(seo.ogImage));
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.ogTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.ogDescription);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", absolute(seo.twitterImage));
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = `${siteUrl}${seo.canonicalPath}`;
    document.querySelectorAll("script[data-page-schema]").forEach(element => element.remove());
    const schemas = route === "/" ? [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA] : [];
    if (seo.schemaJson) schemas.push(seo.schemaJson);
    schemas.forEach(value => {
      const script = document.createElement("script"); script.type = "application/ld+json"; script.dataset.pageSchema = "true";
      script.text = JSON.stringify(value).replaceAll("https://docpropel.com", siteUrl); document.head.append(script);
    });
  }, [route, seo]);
  return null;
}
