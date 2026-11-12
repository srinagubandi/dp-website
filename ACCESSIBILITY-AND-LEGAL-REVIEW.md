# DocPropel v6 Accessibility and Legal Review

**Author:** Manus AI
**Review date:** September 13, 2026
**Release branch:** `feature/accessibility-legal-hardening`
**Engineering target:** **WCAG 2.2 Level AA**
**Scope:** Public DocPropel templates, the Growth Brief form, the protected administrator sign-in route, mobile navigation, and the public legal pages.

## Executive summary

This review remediated the repeated contrast failure identified by automated testing, created a public Accessibility Statement and feedback route, added tailored interim Privacy Notice and Website Terms & Conditions content, and established automated regression checks for future changes. The shared accent token was darkened from `#D94D3F` to `#B23D31`; the replacement provides at least **5.11:1** contrast on every deployed light surface where the former token failed. The approved logo-orange contact buttons remain unchanged because their deep-teal text already provides strong contrast.

The automated release gate passed across thirteen routes at desktop and mobile viewports: **26 states scanned, zero axe violations, zero scan failures, zero reflow failures, zero semantic failures, and zero keyboard-interaction failures**. The manual review also confirmed that the first keyboard focus reaches the skip link and that activating it transfers focus to the main landmark.

> This is a technical accessibility review, not legal advice, an ADA certification, or a claim of complete WCAG conformance. W3C states that no evaluation tool alone can determine whether a site meets accessibility standards, and legal obligations depend on organizational facts and jurisdiction. [1] [2]

## Implemented remediation

| Area | Implemented change | Validation result |
|---|---|---|
| Text contrast | Replaced the shared low-contrast muted-red token with `#B23D31` across eyebrow labels, step labels, role labels, and related interface text. | The automated scan reported zero color-contrast violations. |
| Keyboard navigation | Preserved skip navigation, visible focus styles, semantic landmarks, and keyboard-accessible navigation. | The skip link received focus and moved focus to `main#main-content`. |
| Mobile menu | Retained dialog semantics, focus transfer, focus trapping, Escape dismissal, and focus restoration to the mobile menu trigger. | Automated interaction test passed at the 390 px viewport. |
| Forms | Retained explicit labels, required-field indicators, PHI guidance, error alerts, status messaging, and moved focus to successful Growth Brief confirmation. | Static form regression tests and the automated scan passed. |
| Images and structure | Confirmed language metadata, a single page-level heading, a main landmark, alternative text on informative images, and labeled form controls. | DOM review found no images missing `alt` and no unlabeled public controls. |
| Responsive reflow | Added permanent horizontal-overflow checks across all reviewed pages. | Zero reflow failures at desktop and mobile viewport sizes. |
| Legal navigation | Added a public **Accessibility** link alongside Privacy and Terms in the footer’s legal section. | Route, footer link, indexability, metadata, and sitemap are covered by regression tests. |
| Policy language | Added tailored interim Privacy Notice and Website Terms & Conditions with explicit legal-review notices, a no-PHI boundary, contact information, data-use language, and terms of use. | Published as interim content; counsel review remains required before final-policy representation. |

## Accessibility statement and feedback process

The new `/accessibility` page communicates DocPropel’s WCAG 2.2 AA engineering target, identifies the website’s implemented accessibility features, and explains how to request help or an alternative format. It gives two access channels: **steve@docpropel.com** and **202 841 2941**. The statement deliberately avoids unqualified claims such as “ADA certified” or “fully compliant.”

The U.S. Department of Justice identifies poor contrast, missing alternatives, inaccessible forms, and mouse-only navigation as common barriers, and specifically encourages a public method for reporting website-accessibility problems. [3] The implemented statement and feedback route address that governance need, while remaining appropriately limited to the reviewed public website scope.

## Tested journeys and environments

| Journey or state | Desktop | Mobile | Test coverage |
|---|---:|---:|---|
| Homepage and primary navigation | Yes | Yes | Automated WCAG tags, landmarks, headings, reflow, skip navigation |
| Services, specialties, workflow, results, about, team, and FAQ | Yes | Yes | Automated WCAG tags, landmarks, headings, reflow |
| Growth Brief form and contact path | Yes | Yes | Labels, instructions, alert/status semantics, keyboard reachability, reflow |
| Privacy, Terms, and Accessibility Statement | Yes | Yes | Metadata, landmarks, headings, legal navigation, reflow |
| Administrator sign-in | Yes | Yes | Automated WCAG tags, labels, landmarks, headings, reflow |
| Mobile menu open/close state | N/A | Yes | Dialog semantics, focus transfer, Escape close, focus restoration |

The automated scanner runs `axe-core` against WCAG 2.0/2.1/2.2 A and AA tags. The durable script also validates page titles, main landmarks, heading presence, horizontal reflow, skip-link activation, and mobile-menu keyboard behavior. It writes evidence to `artifacts/a11y-regression/results.json` and fails when violations, scan errors, reflow failures, semantic failures, or interaction failures occur.

## Regression and release controls

The repository now contains a GitHub Actions workflow that runs on pull requests and production-branch pushes. It performs type checking, a production build, the unit/static regression suite, and the browser-based accessibility scan. The scan results are uploaded as a workflow artifact, ensuring that findings can be inspected after a failed run. Developers can run the full local release gate with:

```bash
pnpm test:regression
```

This release added fifteen total automated unit/static checks and a browser scan covering twenty-six viewport/route states. Automated tests are an early-warning and regression mechanism, not a substitute for knowledgeable human evaluation or testing with people who use assistive technology. [1]

## Limitations and required next steps

The review did not include a formal screen-reader test matrix, usability sessions with people with disabilities, third-party vendor accessibility evidence, legal jurisdiction analysis, or a review of future administrator-supplied content. These are not minor caveats: edited content, unreviewed image alternatives, new embeds, video, documents, or vendor integrations can create new barriers after this release.

Before any public claim of full conformance, DocPropel should perform a scoped assistive-technology review using at least one supported screen-reader/browser combination, include people with disabilities in key-task testing where practical, keep an accessibility feedback log with a response owner, and require accessibility review for new third-party integrations and downloadable documents. The interim Privacy Notice and Website Terms & Conditions must be reviewed and approved by qualified counsel before being represented as final policies.

## Release decision

**Decision: Approve the technical accessibility and legal-content release with documented limitations.** The automated and manual checks identified no unresolved release-blocking defect within the defined scope. The site should not be described as legally “ADA compliant,” “ADA certified,” or universally WCAG conformant. It may accurately state that DocPropel has an accessibility statement, provides an accessibility feedback route, uses WCAG 2.2 AA as its engineering target, and runs automated accessibility regression checks.

## References

[1]: https://www.w3.org/WAI/test-evaluate/ "W3C Web Accessibility Initiative — Evaluating Web Accessibility Overview"
[2]: https://www.w3.org/TR/WCAG22/ "W3C — Web Content Accessibility Guidelines (WCAG) 2.2"
[3]: https://www.ada.gov/resources/web-guidance/ "U.S. Department of Justice — Guidance on Web Accessibility and the ADA"
