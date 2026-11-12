# DocPropel v6 release readiness

## Decision

**Block production release pending the external approvals and production-equivalent checks below.** The implementation is a complete release candidate; this status does not assert legal compliance, accessibility conformance, search performance, ranking, AI citation, or marketing outcomes.

## Completed implementation checks

| Area                 | Status                          | Evidence                                                                                                                                       |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Architecture         | Complete                        | Vite + React + Express, REST endpoints, PostgreSQL `pg` + Drizzle runtime; no MySQL/tRPC runtime dependency.                                   |
| Public routes        | Complete                        | All ten required root routes plus protected admin routes.                                                                                      |
| Lead journey         | Complete in code/test           | Required/optional fields, PHI warning, consent, attribution, honeypot, body limit, rate limit, normalized input, pending/success/error states. |
| Admin                | Complete in code/test           | Signed cookie session, lead filtering/update/export, editable content, section toggles/order, SEO and restricted JSON-LD.                      |
| Claims               | Complete                        | Unapproved figures, quote/name, and response-time promise are excluded and regression-tested.                                                  |
| Technical SEO        | Complete in code                | Raw route defaults, dynamic client metadata, canonicals, social tags, approved assets, robots and sitemap.                                     |
| Responsive visual QA | Complete for requested captures | See `v6-visual-qa.md` and `artifacts/v6-visual-qa/`.                                                                                           |
| Automated suite      | Complete                        | Record the final `pnpm check`, `pnpm build`, `pnpm test`, and `git diff --check` result in the commit handoff.                                 |

## Required approvals before release

| Gate               | Owner                             | Block condition / required action                                                                                                                           |
| ------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Legal and privacy  | Qualified counsel + privacy owner | Approve or replace `/privacy` and `/terms`, including retention, provider, governing-law, and cookie/analytics specifics. Draft pages default to `noindex`. |
| Content and claims | Marketing/content owner           | Approve all public copy and any future team biography or case evidence.                                                                                     |
| Photography        | Rights/brand owner                | Confirm rights before using the supplied consultation WebP. It is not used now.                                                                             |
| Structured data    | SEO + content owner               | Reconcile every value to visible facts and validate production output.                                                                                      |
| Accessibility      | Accessibility/QA owner            | Execute manual keyboard, screen-reader, zoom/reflow, error recovery, and complete-process testing in supported production-equivalent browsers.              |
| Infrastructure     | Release owner                     | Provision Railway PostgreSQL, set production secrets and `SITE_URL`, run migration, verify health, session cookie, persistence, and filtered CSV.           |
| Search consoles    | SEO owner                         | After approved deployment, verify ownership, sitemap receipt, URL status/canonical/rendering, and monitor crawl/index state.                                |

## Release runbook

1. Back up the target v6 PostgreSQL service and confirm the prior production service remains independently restorable.
2. Configure all variables from `.env.example`; production startup intentionally fails if database or admin secrets are absent.
3. Run `pnpm migrate`, then build and start. Verify `/api/health` without exposing configuration values.
4. Submit a synthetic Growth Brief containing no real personal or health information. Confirm storage, admin visibility, status/notes update, filtering, and CSV export; remove the synthetic record under an approved data procedure.
5. Toggle a noncritical section off/on and edit a test content block, then verify the public page actually changes and editor updates survive restart.
6. Verify titles, descriptions, canonicals, robots, social images, sitemap, and structured data in both raw source and rendered DOM.
7. Complete manual accessibility checks across 360×800, 390×844, 768×1024, and 1440×900, including keyboard navigation and Growth Brief error/success states.
8. Obtain named approval. Only then change production routing. Monitor application errors, database connections, lead submissions, and crawler behavior.

## Rollback

Do not modify prior v2–v5 projects or branches. If v6 fails a gate, restore production routing to the prior service. Do not destroy the v6 database. Preserve logs without form contents, passwords, cookies, or tokens. Investigate, remediate, retest in a production-equivalent environment, and repeat approval.

## Known constraints

The repository does not contain approved case-study evidence, real team profiles, final legal text, a confirmed analytics/cookie policy, production PostgreSQL credentials, or production Search Console/Bing access. Those are deliberately not fabricated. The public pages have static fallback content if the content API is unavailable, but lead submission and admin persistence correctly require PostgreSQL.
