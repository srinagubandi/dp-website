# Responsive refinement loop 14 — practice audience preservation

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

The homepage’s reusable **“A simple, no-pressure process.”** now ends with a compact, linked audience rail. It explicitly preserves the five requested practice groups: **Doctors & physicians**, **Dental practices**, **Independent pharmacies**, **PT / OT clinics**, and **ABA & pediatric clinics**. Every audience item links directly to its relevant anchor on `/specialties`; the later six-card specialty grid remains unchanged, including its Urgent care card.

The audience rail is intentionally smaller and denser than the later specialty grid so it functions as audience context rather than a duplicate navigation system. At mobile widths, it uses two compact cards per row; the final ABA/pediatric card spans the row to avoid an unbalanced orphan cell.

## Review and evidence

Qwen supplied the implementation plan. Claude’s initial design review confirmed the prescribed copy and visual hierarchy but requested complete 320px and comparison evidence. The full-page evidence was too large for the provider payload, so final validation used browser-rendered 1440px, 980px, 390px, and 320px checks plus targeted mobile captures. All five labels, direct specialty targets, and touch-target checks passed with no horizontal overflow.

## Gates

TypeScript, production build, 15 tests, and the 26-state accessibility regression all passed with zero reported violations, scan errors, reflow errors, semantic errors, or interaction errors.
