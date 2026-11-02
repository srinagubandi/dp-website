# Responsive refinement loop 07 — FAQ and legal scanability

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

FAQ items now use clearer solid-card states, an explicit keyboard focus treatment, and an accessible open-state surface. Legal and accessibility pages retain all interim-policy and counsel-review language while improving section grouping, readability, and warning visibility.

## Specialty preservation

The existing FAQ fit answer continues to name Doctors & physicians, Dental practices, Independent pharmacies, PT/OT clinics, and ABA/pediatric clinics exactly.

## Visual and automated gates

Mobile FAQ and desktop Accessibility Statement captures passed visual review. TypeScript, production build, 15 existing tests, and the 26-state accessibility regression passed with zero reported violations or scan/reflow/semantic/interaction errors.
