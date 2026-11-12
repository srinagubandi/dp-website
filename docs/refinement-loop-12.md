# Responsive refinement loop 12 — reusable no-pressure process

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

Restored **“A simple, no-pressure process.”** as a reusable semantic three-step section on both the homepage and Contact page:

1. Tell us about your practice
2. Review the opportunity
3. Choose the next step

The homepage version includes a specialty-context bridge and the Contact version is positioned after the direct contact channels. New section and content defaults make homepage visibility and all title/body/step copy editable through the existing Admin controls; PostgreSQL startup seeding uses conflict-safe inserts, so the new rows are added without overwriting existing edits.

## Specialty preservation

The homepage continues into the existing specialty grid, and the new bridge explicitly preserves the requested care settings: doctors, dental practices, independent pharmacies, PT/OT clinics, and ABA/pediatric care. Urgent care remains in the existing specialty catalog.

## Gates

TypeScript, production build, 15 existing tests, and the 26-state accessibility regression passed with zero reported violations or scan/reflow/semantic/interaction errors. Desktop and mobile Home and Contact screenshots passed visual review.
