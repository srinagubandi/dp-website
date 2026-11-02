import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = (process.argv[2] || "http://127.0.0.1:4201").replace(/\/$/, "");
const outputDir = path.resolve("artifacts/release-sweep");
const executablePath = process.env.CHROMIUM_PATH || "/usr/bin/chromium";
const routes = [
  "/",
  "/services",
  "/specialties",
  "/how-it-works",
  "/results",
  "/about",
  "/team",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const pages = [];
try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport });
      const safeRoute = route === "/" ? "home" : route.slice(1);
      const url = `${baseUrl}${route}`;
      try {
        const response = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 30_000,
        });
        await page.waitForTimeout(300);
        const details = await page.evaluate(() => ({
          title: document.title,
          h1: document.querySelector("h1")?.textContent?.trim() || "",
          horizontalOverflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1,
          headingCount: document.querySelectorAll("h1, h2, h3, h4, h5, h6")
            .length,
          main: Boolean(document.querySelector("main")),
        }));
        await page.screenshot({
          path: path.join(outputDir, `${viewport.name}-${safeRoute}.png`),
          fullPage: true,
        });
        pages.push({
          viewport: viewport.name,
          route,
          status: response?.status() || 0,
          ...details,
        });
      } catch (error) {
        pages.push({
          viewport: viewport.name,
          route,
          error: error instanceof Error ? error.message : String(error),
        });
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}
const summary = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  routes,
  viewports: viewports.map(item => item.name),
  pageCount: pages.length,
  statusErrors: pages.filter(item => item.status && item.status >= 400),
  runtimeErrors: pages.filter(item => item.error),
  overflowErrors: pages.filter(item => item.horizontalOverflow),
  semanticErrors: pages.filter(
    item => !item.error && (!item.title || !item.h1 || !item.main)
  ),
  pages,
};
await writeFile(
  path.join(outputDir, "summary.json"),
  `${JSON.stringify(summary, null, 2)}\n`
);
console.log(
  JSON.stringify({
    pageCount: summary.pageCount,
    statusErrors: summary.statusErrors.length,
    runtimeErrors: summary.runtimeErrors.length,
    overflowErrors: summary.overflowErrors.length,
    semanticErrors: summary.semanticErrors.length,
    outputDir,
  })
);
if (
  summary.statusErrors.length ||
  summary.runtimeErrors.length ||
  summary.overflowErrors.length ||
  summary.semanticErrors.length
) {
  process.exitCode = 1;
}
