import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const base = process.argv[2] || "http://127.0.0.1:4240";
const out = path.resolve(process.argv[3] || "artifacts/branding-qa");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const evidence = [];
try {
  for (const width of [320, 390, 768, 1081, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector(".header-brand");
    const layout = await page.evaluate(() => {
      const box = el => {
        const r = el.getBoundingClientRect();
        return {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          right: r.right,
          bottom: r.bottom,
        };
      };
      const visible = el =>
        el &&
        el.getBoundingClientRect().width > 0 &&
        getComputedStyle(el).display !== "none";
      const phone = [
        ...document.querySelectorAll(
          ".desktop-header-phone,.mobile-header-phone"
        ),
      ].find(visible);
      const brand = document.querySelector(".header-brand");
      const logo = brand.querySelector("svg");
      const pause = brand.querySelector("button");
      return {
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brand: box(brand),
        logo: box(logo),
        pause: box(pause),
        header: box(document.querySelector(".site-header")),
        phone: box(phone),
        phoneHref: phone.getAttribute("href"),
        title: document.title,
      };
    });
    assert(!layout.overflow, `horizontal overflow at ${width}`);
    assert(
      layout.brand.bottom <= layout.header.bottom + 1,
      `header height at ${width}`
    );
    assert(
      layout.brand.right <= layout.phone.x + 1,
      `logo overlaps phone at ${width}`
    );
    assert(
      Math.abs(layout.logo.width / layout.logo.height - 600 / 136) < 0.05,
      `logo distorted at ${width}`
    );
    assert(layout.pause.height >= 24 && layout.pause.width >= 24);
    assert.equal(layout.phoneHref, "tel:+12028412941");
    assert(layout.phone.height >= 44);
    assert(layout.phone.right <= width);
    const pause = page.getByRole("button", {
      name: "Pause logo animation",
      exact: true,
    });
    await pause.focus();
    await page.keyboard.press("Enter");
    const paused = page.getByRole("button", {
      name: "Resume logo animation",
      exact: true,
    });
    assert.equal(await paused.getAttribute("aria-pressed"), "true");
    const sample = () =>
      page.locator(".header-brand .pd-header-ribbon").evaluateAll(elements =>
        elements.map(e => {
          const s = getComputedStyle(e);
          return {
            animation: s.animationName,
            opacity: s.opacity,
            transform: s.transform,
          };
        })
      );
    const a = await sample();
    await page.waitForTimeout(200);
    const b = await sample();
    assert.deepEqual(a, b);
    assert(
      a.every(
        s =>
          s.animation === "none" && s.opacity === "1" && s.transform === "none"
      )
    );
    await page.screenshot({ path: path.join(out, `header-${width}.png`) });
    await page.keyboard.press("Space");
    assert.equal(await pause.getAttribute("aria-pressed"), "false");
    assert((await sample()).every(s => s.animation === "pd-header-logo-cycle"));
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const scan = await page.evaluate(() =>
      window.axe.run(document.querySelector(".site-header"), {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
        },
      })
    );
    assert.equal(
      scan.violations.length,
      0,
      JSON.stringify(
        scan.violations.map(v => ({
          id: v.id,
          nodes: v.nodes.map(n => n.target),
        }))
      )
    );
    if (width <= 1080) {
      await page
        .getByRole("button", { name: "Open navigation", exact: true })
        .click();
      const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
      await dialog.waitFor();
      assert.equal(await dialog.locator("svg.pd-header-logo-loop").count(), 0);
      assert.equal(await dialog.locator("img.brand-logo").count(), 1);
      await page.keyboard.press("Escape");
      assert.equal(await dialog.count(), 0);
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation", exact: true })
          .evaluate(el => el === document.activeElement),
        true
      );
    }
    assert.equal(
      await page.locator(".site-footer svg.pd-header-logo-loop").count(),
      0
    );
    const footer = page.locator(".footer-brand img");
    await footer.scrollIntoViewIfNeeded();
    assert(await footer.evaluate(el => el.complete && el.naturalWidth > 0));
    assert.equal(
      (await page.locator('a[href="mailto:steve@docpropel.com"]').count()) > 0,
      true
    );
    await page.screenshot({ path: path.join(out, `footer-${width}.png`) });
    evidence.push({
      width,
      layout,
      axeViolations: scan.violations.length,
      pauseResume: "passed",
      menu: "passed or desktop not applicable",
      footer: "static loaded",
    });
    await context.close();
  }
  const reduce = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await reduce.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(await page.locator(".logo-motion-toggle").isVisible(), false);
  assert(
    (
      await page
        .locator(".header-brand .pd-header-ribbon")
        .evaluateAll(es => es.map(e => getComputedStyle(e).animationName))
    ).every(n => n === "none")
  );
  await page.screenshot({ path: path.join(out, "reduced-motion-390.png") });
  const manifest = await (
    await page.request.get(base + "/site.webmanifest")
  ).json();
  assert.equal(manifest.name, "DocPropel");
  for (const file of [
    "/favicon.ico",
    "/favicon.svg",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/apple-touch-icon.png",
    "/safari-pinned-tab.svg",
    "/docpropel-logo-dark.svg",
    "/docpropel-logo-light.svg",
    ...manifest.icons.map(i => i.src),
  ]) {
    const response = await page.request.get(base + file);
    assert.equal(response.status(), 200, file);
    assert((await response.body()).length > 0);
  }
  await page.goto(base + "/admin/login", { waitUntil: "networkidle" });
  const adminLogo = page.locator(".auth-card img");
  assert(await adminLogo.evaluate(el => el.complete && el.naturalWidth > 0));
  await page.screenshot({ path: path.join(out, "admin-login.png") });
  evidence.push({
    reducedMotion: "passed",
    icons: "all declared assets HTTP200",
    manifest: "DocPropel unchanged",
    adminLoginLogo: "loaded",
  });
  await fs.writeFile(
    path.join(out, "results.json"),
    JSON.stringify({ base, evidence }, null, 2) + "\n"
  );
  console.log(
    JSON.stringify(
      {
        result: "PASS",
        base,
        viewports: 5,
        scopedAxeViolations: 0,
        states: "pause/resume/reduced-motion/menu/footer/admin/icons",
      },
      null,
      2
    )
  );
} finally {
  await browser.close();
}
