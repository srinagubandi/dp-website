# Changelog

All notable DocPropel website changes are recorded in this file.

## 2026-11-11 — DocPropel Option 2 wordmark

Applied the owner-selected Plus Jakarta Sans Doc 500 / Propel 700 lettering to the shared header, footer, mobile menu and protected admin branding. Replaced the legacy PNG alias and branding in the default social images, preserved the supplied ribbon symbol and icon bitmap artwork, and versioned the updated assets. DocPropel copy, contacts, identity and database behavior are unchanged. Local type/build/36-unit-test, nine-width branding and 26-state automated accessibility regressions passed; exact-SHA CI/preview/production verification remains a release gate. The owner-selected continuous-motion limitation remains disclosed. See `docs/docpropel-option2-wordmark.md`.

## 2026-11-11 — Supplied logo and favicon update

- Added the supplied Propeldock vector artwork and header-only loop with keyboard pause and reduced-motion support.
- Updated static footer/admin/menu logos and all browser/touch/install/pinned-tab/Windows favicon variants.
- Preserved DocPropel site copy, domains, contacts, manifest identity, layouts and database.
- Added four asset regression cases and five-width browser checks; release is preview-only pending owner review.


## 2026-11-02 - Team directory and profile redesign

### Changed

- Rebuilt team cards with compact portraits beside names and roles, balanced summaries, and aligned profile links.
- Reduced portraits to 76px on desktop directory cards and 64px on mobile; individual profiles use 160px and 80px portraits respectively.
- Refined individual profiles with a contained introduction, readable biography column, biography anchor, and links to colleagues.
- Removed outdated copy saying named team profiles had not yet been supplied.

### Added

- Seifeldin Salah and Rishi Patil portraits and biographies from the supplied team-bios reference, including dedicated routes, editable CMS fields, metadata, and sitemap entries.
- Expanded existing route and editable-content regression coverage to include both new profiles.

### Validation

- TypeScript check and all 24 existing regression tests pass.
- Vite production client build passes using the runner config loader on Windows.
- Desktop and 390px mobile visual checks confirm compact portraits, readable layouts, and 44px profile links without horizontal overflow.
- Standard local build/test entry points encounter Windows sandbox restrictions while resolving config files; tests were run through the Vitest API. Railway runs the standard full production build.

### Release

- Working branch: `feature/profile-portrait-scale-refinement`.
- Production source branch: `feature/handoff-production-v6`; deploy to `virtuous-exploration` / `dp-website` per the live-release request.
- Preserve existing CMS biographies, including Sri's previously requested editable placeholder text.

## Unreleased — Team full-profile pages

### Added

- Dedicated, canonical profile routes for Rakesh Mittapelly, Mike Tomasiello, and Sri Nagubandi.
- Full supplied biographies for Rakesh and Mike; Sri retains editable Latin placeholder biography content.
- Compact Team-card entry points with accessible **View full profile** links.
- Admin-editable title, role, portrait URL, and biography paragraph fields for every full-profile page.
- Route metadata and sitemap entries for each public profile page.

### Changed

- The Team overview remains concise; full biographies now live on individual pages rather than expandable cards.
- Reduced portrait footprint across Team cards and individual profile pages, while preserving responsive face framing and physical image aspect ratios.
- Aligned desktop profile links to a shared baseline and retained a 44px interactive target at all tested widths.

### Validation planned

- Type checking, production build, unit tests, automated accessibility regression, desktop/mobile visual QA, sitemap/metadata response checks, and live Railway preview verification.
