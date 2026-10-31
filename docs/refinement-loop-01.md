# Responsive refinement loop 01 — header and hero composition

**Branch:** `feature/20-loop-responsive-refinement`
**Scope:** Header identity, desktop hero balance, mobile hero reflow, hero-photo focal handling, proof-pill placement, and narrow-device specialty-grid fallback.

## Implemented

The header now presents the full DocPropel SVG lockup at desktop and mobile sizes. The mobile header retains the accessible phone action and menu control, with its phone label collapsing visually only on the narrowest viewports while the control’s accessible name remains intact.

The homepage hero now uses a balanced desktop composition with the existing clinician-and-patient photography over a restrained mint backing layer. On viewports below 768px, the hero becomes a single-column sequence: copy, primary action, secondary action, photo, then the community proof pill. The photo uses a stable 4:5 aspect ratio and an upper-center focal position so the clinician’s face is composed with headroom instead of being cropped at the edge.

The mobile specialty grid stays two columns from 360px and becomes one column below 360px, avoiding clipped or unreadable specialty names.

## Visual acceptance

Desktop QA was captured at 1440×1800 and mobile QA at 390×1800. Both show the complete logo, clear CTA hierarchy, no overlap between the mobile proof pill and photo, and six readable specialty tiles. The hero copy remains unchanged.

## Automated gates

- TypeScript check: passed.
- Production build: passed.
- Existing Vitest suite: 15 tests passed.
- Diff whitespace check: passed.
- Accessibility regression: passed across 26 scanned states, with 0 axe violations, scan errors, reflow errors, semantic errors, or interaction errors.

## AI review record

Claude Sonnet 5.5 via OpenRouter set the design acceptance criteria. Qwen3 Coder 30B A3B via OpenRouter generated the scoped implementation plan. Usage/cost audit is retained outside the repository so no credentials or provider payloads are committed.
