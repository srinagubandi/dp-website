# Refinement loop 18 — approved specialty scope and form clarity

## Scope protected

The public website now names **exactly five** practice groups wherever the visitor sees specialty coverage: Doctors & physicians, Dental practices, Independent pharmacies, PT / OT clinics, and ABA & pediatric clinics. The unapproved Urgent care card, form option, FAQ language, and default specialty SEO description were removed.

The published SEO migration updates only the legacy default `/specialties` description and Open Graph description. Its conditional `WHERE` clause intentionally leaves any administrator-customized SEO record untouched.

## Form accessibility

The Growth Brief form now places a required-fields legend before its first field, keeps required asterisks and optional labels inline, retains native required semantics, and adds `aria-required` plus an accessible legend description to all required inputs and consent. The PHI warning and consent wording were retained exactly.

## Review and validation

OpenRouter Claude approved the remediated Specialties page and Growth Brief form with no critical issues. The final gate passed `pnpm check`, `pnpm build`, 18 tests, the 26-state accessibility regression, a no-public-Urgent-care source audit, and desktop/mobile captures.
