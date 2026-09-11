# DocPropel v3 Visual QA

**Concept:** The Practice Growth Guide
**Branch:** `feature/practice-growth-guide-v3`
**Routes inspected:** `/v3`, `/v3/calculator`
**Browsers/tooling:** Headless Chromium, local production preview

## Viewport checks

| Route                  |                  Viewport | Review finding                                                                                                                                                                                                          | Result |
| ---------------------- | ------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `/v3`                  |               1440 × 1000 | The editorial 55/45 hero presents the exact H1, support copy, primary action, secondary link, and trust cue without requiring interaction. The illustration treatment has adequate contrast and no horizontal overflow. | Pass   |
| `/v3`                  |                 390 × 844 | The mobile composition is story-first: headline, value support, primary action, and trust cue precede visual material. Reading order and touch targets are preserved.                                                   | Pass   |
| `/v3/calculator`       |               1440 × 1000 | The planning tool uses a readable three-area presentation; inputs and illustrative result stay within the content rail without overlap.                                                                                 | Pass   |
| `/v3/calculator`       |                 390 × 844 | Inputs and the result stack into a single vertical flow with no horizontal clipping.                                                                                                                                    | Pass   |
| V3 Growth Brief dialog | 1440 × 1000 and 390 × 844 | The portal-specific token scope was corrected. The opaque panel has a warm-paper background, coastal-ink text, visible controls, focus trap, and no overflow at either viewport.                                        | Pass   |

## Refinements and accessibility

The final visual review corrected the token scope for the portal-rendered dialog so its color system does not inherit an invalid transparent background. Screenshot metrics recorded 1440-pixel and 390-pixel `scrollWidth` equal to viewport width across the homepage and calculator. The implementation uses semantic landmarks, skip navigation, persistently labeled native inputs, focus-visible treatment, 44-pixel mobile controls, image alternatives, reduced-motion handling, and an `aria-live` calculator result. The dialog autofocuses the specialty selector and supports an explicit close action. Escape dismissal uses the Radix dialog primitive and should be verified manually as part of any browser acceptance test.

## Validation results

| Check                        | Result                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `pnpm exec prettier --write` | Passed                                                                              |
| `pnpm check`                 | Passed                                                                              |
| `pnpm build`                 | Passed, with pre-existing unresolved analytics-placeholder and bundle-size warnings |
| `pnpm test`                  | Passed: 5 files, 23 tests                                                           |
| `git diff --check`           | Passed                                                                              |

## Screenshot artifacts

The final screenshot artifacts were created in the execution workspace at `/home/ubuntu/jobs/job_M1tPySgu/screenshots/pass-3/`; a final independent preview capture is recorded after this document as part of the release handoff.

## Final independent screenshot review

A final headless-Chromium capture at **1440 × 1000** and **390 × 844** reconfirmed the v3 homepage after agent handoff. The desktop hero preserves the intended spacious editorial split and shows the exact hero copy, support copy, primary conversion action, secondary method route, and trust cue without overlap. The mobile hero correctly delays the nonessential illustration until after the complete narrative and conversion path. Neither view exhibits copy clipping or horizontal overflow.

The final independent calculator captures confirm the v3 calculator is designed as part of the same editorial system rather than a reused generic utility. The desktop view keeps the outcome panel within the three-part planning area; the mobile view retains headline and explanation legibility before the static guide image and the vertically stacked controls. No overlap or horizontal clipping is visible at either target size.
