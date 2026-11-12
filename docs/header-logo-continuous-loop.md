# Header logo continuous loop — 2026-11-11

The owner explicitly selected: remove all on-site motion controls, keep the supplied header logo looping, retain device reduced-motion support, and document the accessibility limitation. This supersedes the pause-control behavior documented for the earlier supplied-logo release.

## Behavior and scope

The visible Pause/Play row is removed with no replacement footer toggle, hidden control or on-site pause API. The supplied three-ribbon 4.8-second animation loops by default; wordmark and SVG geometry remain unchanged. CSS makes the logo immediately static, opaque and untransformed under `prefers-reduced-motion: reduce`, including when the preference changes while the page is open. Footer, mobile-menu and admin logos remain static. Icons, manifest, DocPropel identity, hero, specialties, phone, email, forms and database behavior are unchanged. Only the existing Accessibility Statement gains a concise known-limitation disclosure.

## Known accessibility limitation

An automatic, nonessential loop running alongside other content for more than five seconds needs a pause, stop or hide mechanism under [WCAG 2.2 Success Criterion 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). The infinite loop lasts beyond five seconds even though one cycle is 4.8 seconds. Removing all on-site controls means this logo animation **does not meet SC 2.2.2**. Device reduced-motion support remains helpful but is not represented as curing this criterion failure or establishing conformance. The owner selected this limitation after being offered an alternative motion setting in the footer. No ADA, WCAG or legal certification is claimed.

The existing accessibility statement names the continuous default, absence of an on-site control, device reduced-motion behavior, and criterion not met. Existing automated axe results are regression observations only; they cannot establish that this motion requirement passes. No rapid flashing is introduced: the supplied 4.8-second gradual translate/opacity cycle is unchanged, with no per-frame visibility toggling or high-frequency blink.

## Verification and release gates

Retain the original type/build/unit and 26-state accessibility regression gates. The updated real Chromium branding script checks 320, 390, 768, 1079, 1080, 1081 and 1440px, including both sides of the 1080px navigation breakpoint. It verifies actual Web Animation objects continue running past seven seconds with infinite iterations and changing rendered samples, samples overflow during the cycle, verifies absence of motion controls, tests reduced motion before navigation and runtime preference changes, checks menu Escape/focus return and static logos, verifies icon delivery, and asserts the public limitation disclosure.

Use `feature/header-logo-continuous-loop` from production commit `9f68dba`. Require the exact feature SHA's CI and isolated preview deployment to succeed before merging the owner-authorized scoped change into the existing production release branch. Verify Railway SUCCESS, exact merge SHA, health and changed live behavior before reporting deployment complete. Record prior production deployment `0e090ce3-2c9f-4c27-9ca4-4fc2bb426884` at `9f68dba` as the application rollback target; no schema/data rollback is introduced by this task.

## Inference audit

Planning and skeptical passes use OpenRouter Opus; test design/review use Sonnet; implementation uses Qwen3 Coder 30B. Two planning responses truncated and were not accepted as completed gates; a bounded correction on the same Opus model used lower reasoning effort and completed. The first Qwen response changed unrelated code and was rejected without applying it; the narrowed corrective response was integrated mechanically. Actual generation charges, including failures, are audited outside Git within the original owner-approved US$1 logo-task ceiling. Native Manus orchestration is not claimed to use OpenRouter; Manus and Railway costs are separate.

Safari, Firefox, real devices, screen readers, icon installation, full authenticated admin/database journeys and outbound form submission are not evaluated by the scoped browser checks. No source evidence, keys or private reasoning are published in this document.

## Executed local evidence

`pnpm check`, `pnpm build` and `pnpm test` completed successfully with 29 unit tests. `pnpm test:a11y` completed 26 states with zero reported violations, scan, reflow, semantic or interaction errors. These automated checks do not override the documented SC 2.2.2 failure.

The updated real Chromium branding regression passed all seven widths. Each ribbon still had a running, infinite Web Animation beyond 7,000ms; motion samples changed, phase-specific overflow assertions passed, and no on-site logo motion controls were present. Static reduced motion, runtime preference changes, menu keyboard behavior, static logos, icons and the public disclosure passed. Sonnet independently reviewed the source and actual evidence with no concrete blocker for the owner-approved scope, conditional on exact-SHA CI, preview and live deployment verification.
