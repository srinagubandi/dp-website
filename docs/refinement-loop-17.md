# Responsive refinement loop 17 — human-copy pass two

**Branch:** `feature/20-loop-responsive-refinement`

## Scope

This final editorial pass improves the short page introductions on Services, Specialties, How It Works, Results, About, Team, and FAQ. It favors concrete, plain language while retaining all specialty names, factual proof limits, PHI boundaries, and the meaning of the performance-based model.

## Changes

The intros now identify services and marketing more directly, explain that specialty planning accounts for real care-setting differences, and make the evidence-review approach easier to understand. Results remains explicitly non-promissory. About and Team use specific marketing language instead of generic “growth” language. FAQ introduces the material as a straightforward guide to how the model works and where it stops.

Editable defaults and runtime fallbacks are aligned. Migration `0005_cross_page_human_copy.sql` only updates a CMS value when it still equals the old default, preserving administrator edits.

## Quality gates

Claude reviewed the editorial direction through OpenRouter. Qwen Coder reviewed the fallback/default/migration diff and returned `safe` with no critical issues. The release passed TypeScript, production build, 16 unit and integration tests, and the 26-state accessibility regression with zero reported violations, scan errors, reflow errors, semantic errors, or interaction errors. Desktop and mobile page-top captures were reviewed for Services, Specialties, How It Works, Results, About, Team, and FAQ.
