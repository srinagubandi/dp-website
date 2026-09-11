export function loadConfiguredAnalytics() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

  if (!endpoint || !websiteId) return;

  try {
    const src = new URL("umami", `${endpoint.replace(/\/$/, "")}/`).toString();
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.dataset.websiteId = websiteId;
    document.head.appendChild(script);
  } catch {
    console.warn("[Analytics] Ignoring invalid VITE_ANALYTICS_ENDPOINT.");
  }
}
