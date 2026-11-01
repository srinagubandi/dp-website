# Team full-profile pages — release evidence

## Scope

The Team overview now presents concise cards that link to separate, indexable profile pages for Rakesh Mittapelly, Mike Tomasiello, and Sri Nagubandi. The individual pages are available at `/team/rakesh-mittapelly`, `/team/mike-tomasiello`, and `/team/sri-nagubandi`.

Rakesh and Mike use the complete supplied biographies. Sri retains Latin placeholder biography content, as requested, and all visible profile fields are editable through the existing Admin content controls. Each page has its own title, description, canonical URL, sitemap entry, visibility controls, portrait URL, role, and biography-paragraph records.

## Accessibility and responsive checks

The Team overview uses ordinary crawlable links labeled “View full profile.” Each profile page has one page heading, a text-labeled back link, semantic portrait alt text, and the existing shared main landmark, header, footer, and Growth Brief treatment. The profile portrait is desktop- and mobile-responsive; the Team overview cards now stack as single-column cards at narrow mobile widths to preserve readable copy and touch targets.

Validation completed locally on October 31, 2026:

- Type check: passed.
- Production build: passed.
- Unit and regression tests: passed.
- Automated accessibility suite: 26 states, zero violations, scan errors, reflow errors, semantic errors, or interaction errors.
- Visual QA: Team overview and all three profile routes rendered at 1440px and 390px without horizontal overflow; all three overview links resolved to their dedicated routes.
- Metadata and route QA: every profile page rendered its expected title, canonical path, page heading, and main landmark; all routes appear in the generated sitemap.

## Content note

The source portrait URL for Sri had an older whitespace-only Admin value in the local data set. The UI now falls back to the approved asset for blank or whitespace-only image fields, and migration `0008_fill_blank_sri_portrait.sql` repairs only that empty legacy value. It never overwrites a non-empty Administrator-provided image URL.
