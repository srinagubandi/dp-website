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
  for (const width of [320, 390, 768, 1079, 1080, 1081, 1440]) {
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
      return {
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brand: box(brand),
        logo: box(logo),
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
    assert.equal(layout.phoneHref, "tel:+12028412941");
    assert(layout.phone.height >= 44);
    assert(layout.phone.right <= width);
    assert.equal(
      await page
        .locator(
          ".header-brand button,.logo-motion-toggle,[data-motion-paused],[data-paused]"
        )
        .count(),
      0
    );
    assert.equal(
      await page
        .getByRole("button", {
          name: /(?:pause|resume|reduce).*(?:logo|motion|animation)/i,
        })
        .count(),
      0
    );
    const sample = () =>
      page.locator(".header-brand .pd-header-ribbon").evaluateAll(elements =>
        elements.map(e => {
          const s = getComputedStyle(e);
          return {
            animation: s.animationName,
            opacity: s.opacity,
            transform: s.transform,
            animations: e.getAnimations().map(a => ({
              playState: a.playState,
              currentTime: a.currentTime,
              iterations:
                a.effect.getTiming().iterations === Infinity
                  ? "Infinity"
                  : a.effect.getTiming().iterations,
              duration: a.effect.getTiming().duration,
            })),
          };
        })
      );
    const initial = await sample();
    const baseline = Math.max(
      ...initial.flatMap(s => s.animations.map(a => Number(a.currentTime)))
    );
    assert(Number.isFinite(baseline));
    const phases = [];
    for (const elapsed of [500, 1200, 2400, 3600, 5500, 7000]) {
      const target = baseline + elapsed;
      await page.waitForFunction(
        target => {
          const ribbons = [
            ...document.querySelectorAll(".header-brand .pd-header-ribbon"),
          ];
          return (
            ribbons.length === 3 &&
            ribbons.every(e =>
              e
                .getAnimations()
                .some(
                  a =>
                    a.playState === "running" && Number(a.currentTime) >= target
                )
            )
          );
        },
        target,
        { timeout: 15000 }
      );
      const current = await sample();
      assert.equal(current.length, 3);
      assert(
        current.every(
          s =>
            s.animation === "pd-header-logo-cycle" &&
            s.animations.some(
              a =>
                a.playState === "running" &&
                a.iterations === "Infinity" &&
                a.currentTime >= target &&
                a.duration === 4800
            )
        )
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1
        ),
        false,
        `animated overflow at ${width}/${elapsed}`
      );
      phases.push({ elapsed, target, ribbons: current });
    }
    const renderedStates = new Set(
      phases.map(p =>
        JSON.stringify(p.ribbons.map(s => [s.opacity, s.transform]))
      )
    );
    assert(
      renderedStates.size >= 3,
      `insufficient changing motion frames at ${width}`
    );
    await page.screenshot({ path: path.join(out, `header-${width}.png`) });
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
      onSiteMotionControls: "absent as owner requested",
      continuousMotion: "running past seven seconds with infinite iterations",
      motionPhases: phases,
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
  assert.equal(
    await page.locator(".logo-motion-toggle,.header-brand button").count(),
    0
  );
  const staticSample = () =>
    page.locator(".header-brand .pd-header-ribbon").evaluateAll(es =>
      es.map(e => {
        const s = getComputedStyle(e);
        return {
          animation: s.animationName,
          opacity: s.opacity,
          transform: s.transform,
          animationCount: e.getAnimations().length,
        };
      })
    );
  const initialStatic = await staticSample();
  assert(
    initialStatic.every(
      s =>
        s.animation === "none" &&
        s.opacity === "1" &&
        s.transform === "none" &&
        s.animationCount === 0
    )
  );
  await page.waitForTimeout(5500);
  assert.deepEqual(await staticSample(), initialStatic);
  await page.screenshot({ path: path.join(out, "reduced-motion-390.png") });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".header-brand .pd-header-ribbon")].every(e =>
      e.getAnimations().some(a => a.playState === "running")
    )
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".header-brand .pd-header-ribbon")].every(
      e => e.getAnimations().length === 0
    )
  );
  assert.deepEqual(await staticSample(), initialStatic);
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
  await page.goto(base + "/accessibility", { waitUntil: "networkidle" });
  const disclosure = await page.locator(".legal-content").innerText();
  assert(disclosure.includes("has no on-site pause or stop control"));
  assert(
    disclosure.includes(
      "does not meet WCAG 2.2 Success Criterion 2.2.2 (Pause, Stop, Hide)"
    )
  );
  assert.equal(
    await page
      .getByRole("button", {
        name: /(?:pause|resume|reduce).*(?:logo|motion|animation)/i,
      })
      .count(),
    0
  );
  await page.goto(base + "/admin/login", { waitUntil: "networkidle" });
  const adminLogo = page.locator(".auth-card img");
  assert(await adminLogo.evaluate(el => el.complete && el.naturalWidth > 0));
  await page.screenshot({ path: path.join(out, "admin-login.png") });
  evidence.push({
    reducedMotion: "passed",
    runtimePreferenceChanges: "passed",
    motionCriterion:
      "WCAG 2.2 SC 2.2.2 not met; owner-selected limitation disclosed",
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
        viewports: 7,
        scopedAxeViolations: 0,
        states:
          "continuous-loop/no-controls/reduced-motion/preference-changes/menu/footer/admin/icons/disclosure",
        knownLimitation:
          "WCAG 2.2 SC 2.2.2 is not met; automated axe results do not establish conformance",
      },
      null,
      2
    )
  );
} finally {
  await browser.close();
}
