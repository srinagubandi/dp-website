# Supplied logo and favicon update — 2026-11-11

## Scope and release boundary

The owner approved replacing only logo/favicons while retaining DocPropel copy, domains, contact details, metadata identity and functionality. The supplied outlined wordmark visibly says **Propeldock**; this is intentional use of the supplied artwork, not a full site-name migration. Accessible logo names include both the supplied visible wordmark and DocPropel context.

Feature branch: `feature/supplied-logo-favicon-update`. Base: production branch `feature/handoff-production-v6`, commit `3e71537`. Existing isolated Railway preview project: `11c2def8-d828-43fe-a425-167dfb8916f8`, service `5f12b182-26f3-43c3-835f-964178323f9f`, environment `92b4df0f-c44b-498f-9da6-1b559a7957bd`. Known-good preview rollback deployment: `54fb2fdc-2227-4ad8-92a8-89b08f9aadfa`. Production remains unchanged until owner final review.

## Asset selection and implementation

Static color/inverse logos and favicon/install/maskable assets come from `Propeldock-Complete-Package-v2.zip`. The latest `Propeldock-Header-Logo-Loop.zip` supplies the outlined React logo and 4.8-second ribbon animation. The supplied path geometry is preserved; the only component adaptation is the local CSS import path and formatting. Unrelated homepage, typography, report, color-system and motion files in the other packages are not imported.

Only the public header animates. The footer, mobile-menu bar, admin and browser icons remain static. A separate keyboard-operable 24px-minimum control pauses the logo into an opaque stationary frame and restarts it on resume. CSS disables motion immediately for reduced-motion preferences and hides the unnecessary pause button. The wordmark does not move. Both desktop and mobile retain the visible call action **202 841 2941**. Email remains **steve@docpropel.com**.

Favicon references have a `20261111` cache-version query. Existing asset URLs still resolve. All PNG/ICO/SVG/apple-touch/install/maskable/pinned-tab/Windows icon variants and older favicon aliases are updated. Missing resolutions are derived deterministically with Pillow/Lanczos. The existing manifest bytes and identity, SEO/social metadata and site content are unchanged. No dependencies, database migrations, forms or page-layout changes are included.

## Executed evidence

`pnpm check`, `pnpm build`, and `pnpm test` pass. There are 28 unit tests, including four added logo/icon regression cases. `pnpm test:a11y` passes across 26 states with zero reported violations, scan errors, reflow errors, semantic errors or interaction errors.

`CHROMIUM_PATH=/usr/bin/chromium node scripts/branding-qa.mjs` checks actual responsive behavior at 320, 390, 768, 1081 and 1440px. It verifies no horizontal overflow/header overlap, proportional logos, visible 44px-minimum call controls, pause/resume through Enter/Space, stable paused frames, CSS reduced motion, menu Escape/focus return, static footer/menu/admin logos, all declared icon responses and preserved manifest/contact identity. Screenshots and JSON evidence are saved under ignored `artifacts/branding-qa/`. The script accepts a base URL and output folder for post-deploy verification.

Manus reviewed desktop, narrow mobile and inverse-footer screenshots. Claude reviewed the actual test evidence, not image inputs: the authenticated connector exposes text-only chat. These checks are engineering evidence for the defined scope, not an ADA certification or unbounded WCAG-conformance claim. Safari, Firefox, real-device browser-icon installation and screen-reader testing are not performed.

## AI routing and cost

Explicit planning calls P1/S1/P2/S2 use OpenRouter Claude Opus 5.5; test design and independent evidence review use Claude Sonnet 5.5; Qwen3 Coder 30B implements the header wrapper. The generated implementation required scoped import/CSS corrections before tests. Manus coordinates deterministic integration, browser tests, Git and Railway and is not represented as OpenRouter-backed inference.

The owner approved a US$1 OpenRouter ceiling. Call IDs, native token counts, verified charges and reserved costs for missing generation records are retained outside Git under `/home/ubuntu/docpropel-logo-update/`. The direct API key failed authentication; the authenticated OpenRouter MCP supplied all successful calls. No credentials or raw reasoning are stored in the repository. Manus and Railway costs are separate.

## Deployment gate

Commit only the scoped sources/assets/tests/docs, push the feature branch, open a PR to the production release branch, and deploy that exact Git SHA to the existing isolated preview. Verify Railway SUCCESS, health and changed logo states. Do not merge/promote to production until the owner approves the mixed visual/text identity on preview.
