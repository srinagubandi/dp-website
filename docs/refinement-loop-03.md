# Responsive refinement loop 03 — service and specialty detail pages

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

Services now group each patient problem, DocPropel workstream, and practice-facing outcome in a readable bordered panel. Alternating service rows receive a quiet mist surface so long-form content can be scanned without changing any copy. Specialty pages now use distinct, anchor-friendly numbered markers and restrained alternating surfaces for better long-page navigation.

## Visual acceptance

Mobile Services review at 390px confirms card content stacks without truncation or horizontal overflow. Desktop Specialties review at 1440px confirms the numbered markers and panels preserve a calm editorial reading rhythm.

## Automated gates

- TypeScript check: passed.
- Production build: passed.
- Existing Vitest suite: 15 tests passed.
- Accessibility regression: 26 states scanned; 0 violations, scan errors, reflow errors, semantic errors, or interaction errors.
- Diff whitespace check: passed.
