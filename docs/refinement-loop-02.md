# Responsive refinement loop 02 — proof, pathway, and specialty rhythm

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

The post-hero proof strip now reads as one quiet, bordered evidence band rather than three disconnected boxes. The three-step patient path receives clearer card separation, a restrained desktop connector treatment, and a compact mobile treatment that preserves readable step labels and descriptions. The specialty section has calmer section boundaries, stronger tile definition, and an explicit narrow-device one-column fallback while preserving all six specialty links.

## Visual acceptance

Desktop QA at 1440×1800 confirms that the pathway arrows sit in the inter-card space rather than clipping inside a card. Mobile QA at 390×1800 confirms the proof band, all three pathway steps, and the specialty section retain a compact, readable hierarchy with no overlap or truncation.

## Automated gates

- TypeScript check: passed.
- Production build: passed.
- Existing Vitest suite: 15 tests passed.
- Accessibility regression: passed across 26 scanned states, with 0 axe violations, scan errors, reflow errors, semantic errors, or interaction errors.
- Diff whitespace check: passed.

## AI review record

Qwen3 Coder 30B A3B via OpenRouter was used to identify responsive risk areas. Its suggested stylesheet path did not match the repository, so the implementation was constrained to the actual shared stylesheet and verified visually before release. Provider usage/cost audit remains outside source control.
