# DocPropel v4 Visual QA

**Concept:** The Performance Ledger
**Branch:** `feature/performance-ledger-v4`
**Routes inspected:** `/v4`, `/v4/calculator`
**Browsers/tooling:** Headless Chromium, local production build at `http://127.0.0.1:4174`

## Viewport checks

| Route            |    Viewport | Pass 1 inspection                                                                                                                                                                                      | Fix or disposition         | Pass 2                                                          |
| ---------------- | ----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------- |
| `/v4`            | 1440 × 1000 | Full split hero, exact H1, support copy, CTA, framework link, trust boundary, signal labels, and static grid were visible without interaction. No horizontal clipping or collisions.                   | No layout change required. | Re-captured after final content and dialog-token edits; passed. |
| `/v4`            |   390 × 844 | Content-first hero correctly replaced the desktop split: navigation, exact H1, support copy, both actions, and all three trust cues appeared before the deferred signal panel. No horizontal overflow. | No layout change required. | Re-captured; passed.                                            |
| `/v4/calculator` | 1440 × 1000 | Route hero and bounded signal panel aligned cleanly; title, explanation, primary and secondary actions, trust boundary, and opening planning-tool section were readable.                               | No layout change required. | Re-captured; passed.                                            |
| `/v4/calculator` |   390 × 844 | Title and CTA stack remained within the viewport; the trust line wrapped without clipping; static signal panel followed the content as specified.                                                      | No layout change required. | Re-captured; passed.                                            |

## Issues and fixes

The first screenshot pass found no obvious overlap or horizontal clipping in the four required captures. Two non-visual completeness checks prompted final edits before the second pass: the original **Social Media & Content** service category was restored as its own v4 service-ledger entry, and v4 design tokens were added directly to the Radix dialog content because the dialog renders through a portal outside the `.v4` wrapper. The result preserves the dark, high-contrast dialog styling and visible focus treatment.

The mobile implementation intentionally stacks ledger rows as decision-record cards, removes desktop table headers where they would force horizontal scrolling, and defers the static signal field until after the heading, explanatory copy, primary action, and trust boundary. No dynamic video is used.

## Accessibility and interaction review

Semantic header, navigation, main, section, article, figure, table-role, form, label, and footer structures are present. The skip link, visible `:focus-visible` states, Radix focus-trapped dialog, Escape/close behavior, persistent field labels, native required validation, explicit no-PHI guidance, image alt text, 44-pixel mobile controls, and `prefers-reduced-motion` override were checked in source and rendered layout. The calculator uses labeled range inputs plus decrement/increment buttons and an `aria-live` result state.

## Validation results

- `pnpm exec prettier --write` — passed for all changed files.
- `pnpm check` — passed.
- `pnpm build` — passed; Vite reports the existing unresolved analytics placeholders and a bundle-size advisory.
- `pnpm test` — pending final run at time of initial QA entry; updated below after completion.
- `git diff --check` — pending final run at time of initial QA entry; updated below after completion.

## Screenshot artifacts

Required screenshots are retained in the job workspace at `/home/ubuntu/jobs/job_AakIuJrd/screenshots/`. The final pass files are named `v4-home-desktop-pass2.png`, `v4-home-mobile-pass2.png`, `v4-calculator-desktop-pass2.png`, and `v4-calculator-mobile-pass2.png`.

## Final independent screenshot review

An independent headless-Chromium capture at **1440 × 1000** and **390 × 844** reconfirmed the v4 homepage after agent handoff. The desktop view is a materially different, high-contrast measurement-field composition: the exact hero line and the conversion controls are readable in the left grid column, and the right signal field is presented as illustrative rather than a fabricated dashboard. The mobile version correctly becomes a text-first, stacked decision record with clear primary and secondary actions. Neither target width shows copy overlap or horizontal clipping.

The final independent calculator captures confirm that the v4 planning tool follows the Performance Ledger design rather than a generic calculator treatment. On desktop, the bounded signal field and primary review action remain distinct from the explanatory planning model. On mobile, long labels and the trust boundary wrap inside the content rail without clipping; the signal field follows the primary content as intended. No overlap or horizontal overflow is visible at either target size.

The final validation run completed `pnpm test` successfully with **5 test files and 23 tests passing**, and `git diff --check` passed with no whitespace errors.
