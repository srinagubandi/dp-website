# Responsive refinement loop 15 — direct Growth Brief routing

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

Primary calls to action labeled **Get a Growth Brief**, **Request a Growth Brief**, and **See if your practice is a fit** now use `/contact#growth-brief`. Ordinary Contact navigation and service-discussion links still open the Contact-page overview.

The Contact page recognizes the `#growth-brief` fragment during client-side navigation, fresh direct URLs, browser history, in-page hash changes, and reduced-motion use. The heading **“Start with the details that matter.”** receives programmatic focus after the native fragment action completes. It has a calm, visible blue focus ring and a sticky-header-safe scroll offset. The form section retains a focusable landmark and an accessible heading relationship.

## Validation

A browser matrix verified desktop CTA navigation, mobile-menu CTA navigation, direct URLs, back/forward behavior, an ordinary non-fragment Contact load, an in-page hash change, and a reduced-motion direct load. Every conversion state placed the focused heading below the sticky header with a visible blue focus indicator; normal Contact navigation stayed at the page top.

TypeScript, production build, 15 unit/integration tests, and the 26-state accessibility regression passed with zero reported violations, scan errors, reflow errors, semantic errors, or interaction errors.

Claude’s visual review returned `approve_with_notes`: destination clarity, sticky-header clearance, mobile readability, focus contrast, and conversion tone passed. The retained non-blocking notes are the focus-ring spacing around the large heading and the existing vertical placement of required/optional form indicators.
