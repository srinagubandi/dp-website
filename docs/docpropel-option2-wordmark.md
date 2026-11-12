# DocPropel Option 2 wordmark — 2026-11-11

The owner selected Option 2: DocPropel, Plus Jakarta Sans, Doc at weight 500 and Propel at weight 700, tracking -0.015em. The dark wordmark uses #073e4d and the light wordmark #FBF8F0. The existing ribbon P symbol, its geometry and theme-specific colors are preserved. The generated lockup has a natural 630 × 136 viewBox; lettering is outlined and is not horizontally stretched or dependent on an external web font.

The selected treatment replaces header, footer, mobile-menu and protected admin/login branding; the legacy full-logo PNG alias is now a true transparent 2048px PNG. The default 1200 × 630 OG/Twitter images retain the original copy and composition, with only the upper-left brand rectangle changed. Symbol-only icon bitmap and ICO files remain byte-identical. The three icon SVG titles now identify DocPropel. All updated runtime logo/icon references use the 20261111-option2 version, and a narrow shared helper versions only the two owned root-relative social images without changing saved CMS data or custom image URLs.

DocPropel copy, hero image/headline, five specialty audiences, 202 841 2941, steve@docpropel.com, domains, schema, REST/database/authentication behavior and dependencies are unchanged. Historical branding release notes remain historical records rather than being rewritten.

## Font provenance and geometry

Font source: https://github.com/tokotype/PlusJakartaSans and Google Fonts. SIL OFL 1.1 is included in `branding/Plus-Jakarta-Sans-OFL.txt`. The source font SHA-256 values and exact nine outlined glyphs are recorded in `branding/option2-geometry.json`. The export was shaped with HarfBuzz kerning enabled, separate 500/700 runs, and transformed through fontTools into SVG coordinates. Actual weights, finite bounds, positions, letter count and unclipped outlines were checked before integration.

## Local evidence

`pnpm check`, `pnpm build`, and `pnpm test` passed: 36 tests in 6 files. One initial unit failure expected the old favicon version; the exact expectation was updated to the approved release version, with no test removed, and all gates were rerun.

The real Chromium branding regression passed at 320, 359, 375, 390, 768, 1079, 1080, 1081 and 1440px. It covers proportional artwork, no horizontal overflow/phone overlap, running animation, absent on-site controls, device reduced motion, live preference changes, menu Escape/focus return, static footer/admin logos and declared icon delivery. Actual desktop and 320px mobile renders were visually inspected. The admin login logo renders proportionally, and the PNG alias returns image/png.

The unchanged automated accessibility suite passed 26 states with 0 detected violations, scan errors, reflow errors, semantic errors or interaction errors. The OG/Twitter pixel comparison found 0 differences outside the authorized rectangle from (60,45) to (445,135). Source and rendered default social-image versioning were verified locally. No old active brand name remains in source or the built client assets.

## Inference and release integrity

Planning and independent skeptical passes used Claude Opus through OpenRouter; test design and evidence review used Claude Sonnet. Qwen open-weight coders supplied implementation drafts. Invalid smaller-model drafts were rejected after two repairs and a targeted Claude diagnosis. The stronger model still required mechanical corrections to the verified shaping recipe and actual asset inventory before execution. No unmodified-model implementation or model-only test approval is claimed. Every call, including rejected drafts, remains charged in the audit. Native Manus orchestration is not represented as OpenRouter-routed inference; Git, shell, Chromium and Railway operations are direct.

Feature branch: `feature/docpropel-option2-wordmark`, based on production commit b875d8f44aa99ec4cca4db0caef83d6ed81c310f. Exact-SHA CI and isolated Railway preview are release gates; production is authorized by the owner's instruction to replace the selected branding across the existing site. Rollback image b9fb8267-5e19-48c1-80a9-d50f9780a85c was verified SUCCESS and rollback-capable before promotion. Final exact-SHA deployment receipts and post-release evidence are recorded outside Git after the release; this committed note does not claim a deployment that has not completed.

## Known limitations

The owner-selected header animation loops continuously without an on-site pause or stop control. Device reduced-motion support and the public disclosure that WCAG 2.2 SC 2.2.2 is not met remain unchanged. Automated scan results do not establish full WCAG conformance or ADA certification. Safari, Firefox, physical devices, screen readers, full authenticated admin/database journeys and social-platform debugger/cache refreshes were not tested. Cache-versioned URLs do not prove that a social platform has refreshed an existing preview.
