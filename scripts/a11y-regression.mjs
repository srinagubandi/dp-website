import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const baseUrl = (process.argv[2] || "http://127.0.0.1:4180").replace(/\/$/, "");
const outputDir = path.join(projectRoot, "artifacts", "a11y-regression");
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
  "/admin/login",
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const scans = [];
const interactionErrors = [];
try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport });
      const url = `${baseUrl}${route}`;
      try {
        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 30_000,
        });
        await page.waitForTimeout(250);
        await page.addScriptTag({ content: axe.source });
        const layout = await page.evaluate(() => ({
          horizontalOverflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1,
          pageTitle: document.title,
          hasMain: Boolean(document.querySelector("main")),
          headingCount: document.querySelectorAll("h1, h2, h3, h4, h5, h6")
            .length,
        }));
        const result = await page.evaluate(
          async selectedTags =>
            window.axe.run(document, {
              runOnly: { type: "tag", values: selectedTags },
              resultTypes: [
                "violations",
                "incomplete",
                "passes",
                "inapplicable",
              ],
            }),
          tags
        );
        scans.push({ viewport: viewport.name, route, url, layout, ...result });
      } catch (error) {
        scans.push({
          viewport: viewport.name,
          route,
          url,
          error: error instanceof Error ? error.message : String(error),
          violations: [],
          incomplete: [],
        });
      } finally {
        await page.close();
      }
    }
  }

  const keyboardPage = await browser.newPage({ viewport: viewports[0] });
  try {
    await keyboardPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const skipLink = keyboardPage.locator(".skip-link");
    await skipLink.focus();
    const skipFocused = await keyboardPage.evaluate(
      () => document.activeElement?.classList.contains("skip-link") ?? false
    );
    if (!skipFocused)
      interactionErrors.push("Skip link could not receive keyboard focus.");
    await keyboardPage.keyboard.press("Enter");
    const skipDestination = await keyboardPage.evaluate(
      () => document.activeElement?.id === "main-content"
    );
    if (!skipDestination) {
      interactionErrors.push("Skip link did not move focus to main content.");
    }
  } catch (error) {
    interactionErrors.push(
      `Keyboard skip-link test failed: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    await keyboardPage.close();
  }

  const mobilePage = await browser.newPage({ viewport: viewports[1] });
  try {
    await mobilePage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const menuButton = mobilePage.locator(".menu-button");
    if (!(await menuButton.isVisible())) {
      interactionErrors.push(
        "Mobile navigation control is not visible at the mobile viewport."
      );
    } else {
      await menuButton.click();
      const dialogState = await mobilePage.evaluate(() => ({
        dialog: document
          .querySelector("#mobile-navigation")
          ?.getAttribute("role"),
        modal: document
          .querySelector("#mobile-navigation")
          ?.getAttribute("aria-modal"),
        focusInside: Boolean(
          document
            .querySelector("#mobile-navigation")
            ?.contains(document.activeElement)
        ),
      }));
      if (
        dialogState.dialog !== "dialog" ||
        dialogState.modal !== "true" ||
        !dialogState.focusInside
      ) {
        interactionErrors.push(
          "Mobile navigation did not provide expected dialog and focus behavior."
        );
      }
      await mobilePage.keyboard.press("Escape");
      const closed = await mobilePage.evaluate(
        () =>
          !document.querySelector("#mobile-navigation") &&
          document.activeElement?.classList.contains("menu-button")
      );
      if (!closed)
        interactionErrors.push(
          "Mobile navigation did not close and restore focus on Escape."
        );
    }
  } catch (error) {
    interactionErrors.push(
      `Mobile navigation keyboard test failed: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    await mobilePage.close();
  }
} finally {
  await browser.close();
}

const findings = scans.flatMap(scan =>
  (scan.violations || []).map(violation => ({
    viewport: scan.viewport,
    route: scan.route,
    id: violation.id,
    impact: violation.impact || "unknown",
    help: violation.help,
    helpUrl: violation.helpUrl,
    nodes: violation.nodes.map(node => ({
      target: node.target,
      html: node.html,
      failureSummary: node.failureSummary,
    })),
  }))
);
const errors = scans.filter(scan => scan.error);
const reflowErrors = scans
  .filter(scan => scan.layout?.horizontalOverflow)
  .map(scan => `${scan.viewport} ${scan.route} has horizontal overflow.`);
const semanticErrors = scans
  .filter(
    scan =>
      !scan.layout?.pageTitle ||
      !scan.layout?.hasMain ||
      !scan.layout?.headingCount
  )
  .map(
    scan =>
      `${scan.viewport} ${scan.route} is missing a page title, main landmark, or heading.`
  );
const summary = {
  scannedAt: new Date().toISOString(),
  baseUrl,
  routes,
  viewports: viewports.map(item => item.name),
  scanCount: scans.length,
  violationCount: findings.length,
  scanErrorCount: errors.length,
  reflowErrorCount: reflowErrors.length,
  semanticErrorCount: semanticErrors.length,
  interactionErrorCount: interactionErrors.length,
  findings,
  scanErrors: errors,
  reflowErrors,
  semanticErrors,
  interactionErrors,
};

await mkdir(outputDir, { recursive: true });
await writeFile(
  path.join(outputDir, "results.json"),
  `${JSON.stringify(summary, null, 2)}\n`
);
console.log(
  `Accessibility scan completed: ${summary.scanCount} states, ${summary.violationCount} violations, ${summary.scanErrorCount} scan errors, ${summary.reflowErrorCount} reflow errors, ${summary.semanticErrorCount} semantic errors, ${summary.interactionErrorCount} interaction errors.`
);
for (const finding of findings) {
  console.error(
    `[${finding.impact}] ${finding.viewport} ${finding.route} ${finding.id}: ${finding.help}`
  );
}
for (const error of errors) {
  console.error(
    `[scan error] ${error.viewport} ${error.route}: ${error.error}`
  );
}
for (const error of reflowErrors) console.error(`[reflow error] ${error}`);
for (const error of semanticErrors) console.error(`[semantic error] ${error}`);
for (const error of interactionErrors) {
  console.error(`[interaction error] ${error}`);
}
if (
  findings.length ||
  errors.length ||
  reflowErrors.length ||
  semanticErrors.length ||
  interactionErrors.length
)
  process.exitCode = 1;
