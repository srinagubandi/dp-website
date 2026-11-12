# WCAG 2.2 AA Implementation Research — Responsive Marketing Site

**Report ID:** 04-accessibility
**Prepared by:** Manus AI
**Research access date:** 13 September 2026
**Primary sources:** W3C Web Accessibility Initiative (WAI) and W3C Recommendations
**Scope:** Public responsive marketing pages, primary and mobile navigation, lead-capture forms, CMS/admin controls, dynamic section visibility, SEO-entry fields, and the lead capture submission workflow.

## Decision summary

Build accessibility into the shared component system rather than attempting page-level remediation. The minimum implementation baseline should be **semantic HTML first**, keyboard-operable controls, unambiguous visible labels, responsive reflow at the WCAG test size, sufficient contrast, and programmatically exposed state and feedback. Use ARIA only to express state or behavior that native HTML cannot already convey, and test those ARIA patterns with the intended browser and assistive-technology combinations. W3C describes WAI-ARIA as particularly useful for dynamic content and advanced controls, while native HTML controls already supply many semantics by default. [1] [2]

For WCAG 2.2 Level AA implementation, every Level A and AA Success Criterion applies to each **full page**, including every responsive presentation that the page automatically provides. A multi-step lead workflow must be evaluated as a process; a nonconforming step prevents that process from meeting the selected level. [1] This report is an engineering and quality-assurance plan. It does **not** make a legal determination, certify the site, or make a compliance claim.

The highest-priority implementation decisions are shown below.

| Priority | Decision | Definition of done | Principal W3C basis |
|---|---|---|---|
| P0 | Establish accessible component primitives | Links navigate; native buttons operate; inputs have associated labels; controls retain a visible focus indicator; components expose their accessible name, role, value, and state. | WCAG 2.2; WAI-ARIA overview [1] [2] |
| P0 | Treat the mobile navigation and show/hide controls as stateful widgets | A native button operates each disclosure; its expanded state is exposed; keyboard use is complete; focus is never lost or hidden behind an overlay. | Disclosure and menu-button patterns; SC 2.1.1, 2.4.11 [3] [4] [5] |
| P0 | Make lead capture complete without vision or a pointer | Labels, instructions, required-state indication, descriptive error text, a navigable error summary, field-level association, and a programmatic success/failure notification are present. | Forms Tutorial; SC 3.3.1, 4.1.3 [6] [7] [8] |
| P0 | Prove responsive behavior at the WCAG test size | At an equivalent width of 320 CSS pixels (commonly 400% browser zoom from a 1280 CSS-pixel viewport), content and controls retain information and operation without two-dimensional scrolling, except for qualifying two-dimensional content. | SC 1.4.10 [9] |
| P1 | Design the visual system to measurable AA thresholds | Normal text reaches 4.5:1; large text reaches 3:1; control/state/focus visuals reach 3:1 where required; pointer targets meet 24 × 24 CSS pixels or the documented spacing exception. | SC 1.4.3, 1.4.11, 2.5.8 [10] [11] [12] |
| P1 | Make authoring/admin flows fully operable | Keyboard operation, non-drag alternatives for reorder actions, accessible confirmation dialogs, authenticable admin login, and accessible image/SEO fields are included in the same release gate. | SC 2.1.1, 2.5.7, 3.3.8; APG dialog [5] [13] [14] [15] |

## Scope and implementation model

WCAG 2.2 is the normative source for Success Criteria and conformance requirements. The WAI tutorials and ARIA Authoring Practices Guide (APG) supply implementation guidance and patterns, not a substitute for evaluating the success criteria. [1] [2] The team should define the public site and authenticated administration interface as separate but connected test scopes. The lead confirmation page, inline success state, validation states, modal confirmations, mobile menu, and dynamically shown admin sections are all in scope because they are rendered content or user interface.

A preferred build order is: first, create and test primitives; second, compose page navigation and forms from those primitives; third, add CMS/admin-specific behavior; fourth, conduct page, breakpoint, keyboard, and assistive-technology validation. This avoids duplicating inaccessible patterns across marketing pages.

## Concrete implementation requirements

### 1. Shared page structure, navigation, and responsive layout

Use native landmarks and structural elements where they match the content: a top-level `header`, a `nav` for primary navigation, one top-level `main`, and a `footer`. Include a visible-on-focus “Skip to main content” link before the repeated header/navigation and target the `main` element. Landmarks and a skip mechanism reduce repeated keyboard navigation; WAI notes that `header`, `nav`, `main`, and context-appropriate `footer` supply landmark roles, and that structural regions provide useful navigation to assistive-technology users. [16] [17]

Every routed page and meaningful single-page-application view must update the document `<title>` to describe its topic or purpose. Do not use a generic title such as “Site” or “Dashboard” for every view. This supports both visitor orientation and the SEO-title field’s user-visible outcome. [18]

Use actual `<a href>` elements for navigation and actual `<button type="button">` elements for actions such as “Open menu,” “Save SEO,” “Publish,” “Hide section,” “Delete,” and “Submit.” Do not turn noninteractive elements into controls unless a native element is genuinely impossible; custom controls add the obligation to provide name, role, state, keyboard behavior, and tested accessibility support. [1] [2] Do not remove focus on receipt of focus or rely only on mouse/touch event handlers. All functionality must have a keyboard interface without timed keystrokes. [5]

At responsive breakpoints, preserve access to every navigation item, call to action, form field, legal link, and administrative control. Test at an equivalent 320 CSS-pixel viewport width and at a 256 CSS-pixel viewport height for horizontal-scrolling layouts. Normal vertically scrolling content must not require horizontal scrolling to read or operate it. Stacking columns, moving an element, or placing navigation behind an operable menu control is allowed when the information and function remain available. [9]

### 2. Main and mobile navigation menu

For a conventional site-navigation list, prefer a native `<nav aria-label="Primary">` with a list of ordinary links. If the small-screen layout hides that list, use a native button as a **disclosure** control, rather than applying menu roles merely for appearance. The button must have a specific accessible name, such as “Open primary navigation,” and expose `aria-expanded="false"` when closed and `aria-expanded="true"` when open. `aria-controls` may reference the controlled list. Enter and Space must toggle the disclosure. [3]

If the team intentionally implements a true ARIA **menu button**—a widget whose items use menu semantics—implement the complete APG keyboard model, not a partial imitation. The trigger has button semantics, `aria-haspopup="menu"` (or `true`), correct `aria-expanded` state, and the menu uses the prescribed roles and focus behavior. Enter and Space open the menu and place focus on its first item. [4] A conventional collection of site links generally remains easier to use and maintain as ordinary links within navigation.

On close, return focus to the trigger when the user closed the menu with Escape or an explicit close control. When a link is activated, normal page/view focus behavior must orient the user to the new content. On every breakpoint, keep focused controls at least partly visible; sticky headers, cookie notices, chat widgets, and open panels must not entirely hide a focused item. [7]

### 3. Lead-capture form and submission workflow

Use a real `<form>` and native inputs wherever possible. Give every control a programmatically associated, visible `<label>`; do not rely on placeholder text as the label. Give related choices a `<fieldset>` and `<legend>`, and place persistent instructions before the field or associate them with `aria-describedby`. Keep the form short and request only data necessary to qualify the lead. [6]

Mark required inputs in text and programmatically, and state the expected format before entry where it is not obvious. For common personal-data inputs, expose purpose through supported HTML `autocomplete` tokens in addition to correct input types. Typical mappings include `name`, `email`, `tel`, `organization`, and `url` where those fields collect the visitor’s information. `autocomplete="email"` is appropriate for the visitor’s email; do not set it merely because a field accepts an email address about someone else. SC 1.3.5 applies when a field collecting user information has an identified input purpose and the technology supports identification. [19]

On validation failure, identify the field and describe the error in text. For example, write “Work email: enter an email address in the format name@example.com,” rather than “Invalid” or a red outline alone. Keep the entered values unless security or data freshness makes that inappropriate. Provide an error summary before the form with a distinct heading; each entry identifies the relevant field, explains the correction, and links to that field. Associate the inline error message with its field using `aria-describedby`; set `aria-invalid="true"` only when the field is invalid. For dynamically inserted errors, announce the prominent summary with an appropriate alert/live-region treatment and move focus to the summary or first erroneous input using an intentional, documented rule. [7] [8]

For successful asynchronous submission, keep a visible confirmation in the page and expose it as a programmatically determinable status message (for example, a concise `role="status"` region). Include the substantive result, such as “Thanks—your request was received. We will contact you at [email].” Do not move focus merely to announce routine success, but ensure a screen reader receives the message without focus movement. Errors that appear without a context change require equivalent programmatic notification. W3C specifically identifies successful form submission and “errors on page” as examples of status messages. [8]

If lead capture becomes a multi-step process, do not require the visitor to re-enter data already supplied in the same process. Auto-populate it or make it available to select unless re-entry is essential, needed for security, or the value is no longer valid. [20]

### 4. Dynamic section visibility and inline updates

Use the WAI disclosure pattern for show/hide marketing sections, CMS panels, filter panels, and optional form content. The visible trigger is a real button with an accessible name that identifies the controlled content. Its `aria-expanded` value matches the actual state, and the relationship can be identified with `aria-controls`. Enter and Space toggle the state. Do not leave keyboard-focusable descendants in content that is actually hidden from users. [3]

When user input causes new fields or conditions to appear, preserve a logical focus order and ensure the change is understandable. State changes for controls—such as expanded/collapsed—must be exposed to assistive technology. A routine disclosure does not itself require a separate status message if the control state is correctly exposed, but a newly displayed success, warning, error, waiting, or progress message must be programmatically determinable under SC 4.1.3. Avoid making pages excessively “chatty” with live announcements. [8]

Avoid overlays that allow keyboard focus to travel into obscured background content. Use content reflow/displacement where practical. Where a destructive confirmation or other true modal is necessary, make the background inert, move focus into the dialog, constrain Tab and Shift+Tab to the dialog, support Escape where appropriate, provide a visible close/cancel control, and return focus to the invoker or the next logical workflow location when it closes. A dialog marked `aria-modal="true"` must behave as modal for every user. [15]

### 5. CMS/admin controls and settings forms

The administration interface needs the same semantic component library and test gate as the public site. Every icon-only control requires an accessible name that describes its result, for example “Move Testimonials section up,” “Preview SEO snippet,” or “Delete draft.” Provide text labels for all SEO inputs: page title, meta description, canonical URL, robots setting, social image, alt text, and publication status. The `<title>` outcome for public pages must be descriptive of the page topic or purpose. [18]

For media fields, prompt authors to provide text alternatives based on purpose, not visual appearance alone. Informative images require text conveying essential information; decorative images require `alt=""`; an image used as a link or button needs alternative text describing the action; and complex visual content needs an equivalent that conveys the data or information. This directly affects image fields surfaced through SEO and social sharing workflows. [21]

If the admin allows section ordering by drag and drop, provide a single-pointer alternative that does not involve dragging, such as “Move up,” “Move down,” “Move to position” controls, or a selection menu. Keyboard accessibility alone is not a replacement for the required single-pointer alternative. [13]

For login and reauthentication, do not block password managers or paste. Any credential or one-time-code field must accept paste. A cognitive function test in any authentication step requires an alternative that does not rely on that test or a qualifying assistance mechanism. Properly marked-up email/username and password fields support password-manager filling. [14]

### 6. Visual design thresholds and interaction geometry

Adopt and test design tokens with the following floors. Normal-size text and images of text require a **4.5:1** contrast ratio. Large-scale text requires **3:1**; W3C explains this as approximately 24 CSS pixels normal or 18.5 CSS pixels bold, subject to the criterion’s definition. Do not round calculated ratios upward: 4.499:1 does not meet the 4.5:1 threshold. [10]

Control boundaries, meaningful icons, selection indicators, and focus indicators require **3:1** contrast against adjacent colours when they are visual information needed to identify the component or its state. Never use colour alone to express required, error, selected, enabled, or expanded status. Use a persistent visible keyboard focus indicator and verify it remains visible against every underlying surface, including sticky or translucent overlays. [11]

Set the hit area of menu triggers, close buttons, chevrons, icon-only admin controls, and comparable pointer targets to at least **24 × 24 CSS pixels**. If an undersized target is retained, document and test the SC 2.5.8 spacing exception: an imaginary 24-CSS-pixel-diameter circle centred on it must not intersect another target or the circle of another undersized target. Inline text links have a separate exception, but toolbars and action rows usually should meet the 24 × 24 target size directly. [12]

## Manual test cases

Run these scenarios in the production-like build at each supported breakpoint. Record URL/view, browser, assistive technology where used, viewport/zoom, result, defect reference, and retest date. “Pass” below means the observable expectation is met; it is a test outcome, not a legal conclusion.

| ID | Area and procedure | Expected result | Related criteria / guidance |
|---|---|---|---|
| M-01 | Load every page/view and press Tab from the top. Activate the first focusable control. | A visible skip link appears and moves focus to the primary content. Repeated header navigation can be bypassed. | SC 2.4.1; landmarks [16] [17] |
| M-02 | Tab through desktop header navigation, then repeat at the smallest breakpoint. | Every visible or revealed navigation link and CTA receives focus in a meaningful order; no keyboard trap occurs; focus indicator is visible. | SC 2.1.1, 2.4.3, 2.4.7 [5] [1] |
| M-03 | At small viewport, operate the navigation trigger with Enter, Space, Escape, and Tab/Shift+Tab. | The trigger announces its name and expanded/collapsed state; content opens and closes; focus is retained or returned logically; menu links work. | Disclosure/menu patterns [3] [4] |
| M-04 | Tab past sticky header, cookie message, chat widget, and any fixed footer. | The focused component is never entirely hidden by author-created content. | SC 2.4.11 [7] |
| M-05 | Resize to 320 CSS-pixel equivalent and zoom a desktop browser to 400%. Inspect marketing cards, menus, lead form, admin settings, dialogs, and error summary. | No loss of content/functionality and no two-dimensional scrolling for ordinary vertical content. | SC 1.4.10 [9] |
| M-06 | Measure normal copy, labels, placeholders if used, links, button text, disabled/active states as applicable, and text overlaying media. | Required text meets 4.5:1 or large text meets 3:1; contrast is based on authored colours, not a rounded screen estimate. | SC 1.4.3 [10] |
| M-07 | Inspect input borders, icons, checkmarks, selected tab state, open-menu indicator, and focus indicators against their adjacent backgrounds. | Required non-text visual identifiers and states meet 3:1; focus is apparent without colour-only signalling. | SC 1.4.11 [11] |
| M-08 | Measure all adjacent icon/action targets in header, mobile navigation, lead form, CMS toolbar, and reorder controls. | Targets are 24 × 24 CSS pixels or satisfy the documented spacing exception. | SC 2.5.8 [12] |
| M-09 | With mouse disconnected or unused, complete a lead submission with blank, malformed, and valid data. | All actions are keyboard-operable; errors name the field and problem in text; summary links work; correction is possible; success is confirmed. | SC 2.1.1, 3.3.1, 4.1.3 [5] [7] [8] |
| M-10 | Use a screen reader to complete the lead form. Navigate field by field and submit invalid then valid values. | Each input exposes its label, instructions, required state, and associated error; error/success feedback is announced without ambiguity. | Forms tutorial; SC 3.3.1, 4.1.3 [6] [7] [8] |
| M-11 | Trigger each marketing and admin disclosure; inspect expanded and collapsed states with a browser accessibility tree or screen reader. | The trigger is identified as a button and reports an accurate expanded state; hidden content does not retain focusable descendants. | Disclosure pattern [3] |
| M-12 | Open and close each confirmation/modal dialog using keyboard only. | Focus enters the dialog, remains within it, a visible close/cancel action exists, Escape works where applicable, and focus returns logically. Background controls cannot be operated. | APG modal dialog [15] |
| M-13 | Reorder a section using only a mouse/touch single click or tap, without dragging; then repeat with keyboard. | A non-drag single-pointer method and keyboard method both complete the equivalent action. | SC 2.5.7, 2.1.1 [13] [5] |
| M-14 | Login to admin using a password manager or pasted credentials and, if applicable, paste a one-time code. | Fields permit autofill and paste; no puzzle, memorisation, or transcription-only step blocks the available path. | SC 3.3.8 [14] |
| M-15 | Create/edit SEO data and upload an informative image, decorative image, and functional image. Review the public result. | Settings controls are labelled; page title describes the view; image alternatives match purpose; decorative images are silent to assistive technology. | SC 2.4.2; Images Tutorial [18] [21] |

## Validation checks and release evidence

### Automated and source-level checks

Use automated checks in local development and continuous integration to find detectable regressions, including missing form labels, empty buttons/links, invalid ARIA references, duplicate IDs, missing language metadata, heading-level anomalies, contrast candidates, and focusable descendants inside hidden containers. Validate generated HTML and examine the browser accessibility tree for the shared components. A static check must also assert that each disclosure trigger’s `aria-expanded` state changes in sync with the actual visibility of its controlled region, and that each ARIA ID reference resolves uniquely.

Automated output is triage evidence, not final proof. W3C explicitly states that no tool alone can determine whether a site meets accessibility standards and that knowledgeable human evaluation is required. Evaluate early and throughout development rather than only before launch. [22]

### Required manual evidence

For the release candidate, retain the completed manual-case log above for a representative page set: home page, a content/landing page, a campaign page with lead form, form error and success states, mobile navigation, the admin login, SEO editor, section visibility/reorder screen, and each dialog type. Test both default desktop width and 320-CSS-pixel-equivalent reflow. Include an agreed browser/assistive-technology matrix based on the site’s intended audience and usage; test the actual ARIA patterns in those combinations because WCAG conformance may rely only on accessibility-supported uses of technology. [1]

The following objective checks should be recorded for each relevant component:

| Check | Evidence to retain | Release action if failed |
|---|---|---|
| Keyboard and focus | Screen recording or step log for open/close, submit, save, cancel, reorder, and navigation flows. | Block release for an unavailable function, trap, lost focus, invisible focus, or focus obscured by author content. |
| Responsive reflow | Screenshot/video at 400% zoom or equivalent 320 CSS-pixel width; note legitimate two-dimensional exceptions. | Block release for lost controls, clipped form errors, horizontal reading scroll, or inaccessible off-canvas navigation. |
| Contrast and target geometry | Colour values and unrounded ratio calculations; CSS-pixel measurements or spacing calculation. | Correct token/control styles before release, unless a documented WCAG exception demonstrably applies. |
| Form semantics and feedback | Accessibility-tree capture plus keyboard/screen-reader run for invalid and valid submission. | Block release for unlabeled fields, textless errors, inaccessible error/success feedback, or undetected state. |
| Dynamic content and modal behavior | Accessibility-tree state capture for open/closed disclosures and modal keyboard recording. | Block release for inaccurate state, focusable hidden content, operable background behind a modal, or undefined focus return. |
| Admin authentication and authoring | Password-manager/paste test; image-alt and SEO-field authoring walkthrough. | Block release for paste blocking, inaccessible authentication step, unlabeled author controls, or incorrect content alternative handling. |

## Implementation handoff checklist

The engineering lead should accept the component library only after the following decisions are embodied in reusable code and test fixtures: semantic link/button/input primitives; page landmarks and skip link; navigation disclosure behavior; contrast/focus/target-size tokens; form fields, error summary, inline error, and status message primitives; disclosure and modal components; non-drag reorder controls; and password-manager-compatible authentication fields. Content authors should receive field-level guidance for page titles, headings, link text, image alternatives, required-field instructions, and concise confirmation/error copy.

Do not represent the checklist or test results as a formal conformance or legal compliance statement. WCAG conformance is scoped to full pages and the selected set/process, and W3C evaluation guidance calls for knowledgeable human assessment beyond tools. [1] [22]

## References

[1]: https://www.w3.org/TR/WCAG22/ "Web Content Accessibility Guidelines (WCAG) 2.2"
[2]: https://www.w3.org/WAI/standards-guidelines/aria/ "WAI-ARIA Overview"
[3]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ "Disclosure (Show/Hide) Pattern"
[4]: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ "Menu Button Pattern"
[5]: https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html "Understanding SC 2.1.1: Keyboard"
[6]: https://www.w3.org/WAI/tutorials/forms/ "Forms Tutorial"
[7]: https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html "Understanding SC 3.3.1: Error Identification"
[8]: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html "Understanding SC 4.1.3: Status Messages"
[9]: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html "Understanding SC 1.4.10: Reflow"
[10]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html "Understanding SC 1.4.3: Contrast (Minimum)"
[11]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html "Understanding SC 1.4.11: Non-text Contrast"
[12]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html "Understanding SC 2.5.8: Target Size (Minimum)"
[13]: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html "Understanding SC 2.5.7: Dragging Movements"
[14]: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html "Understanding SC 3.3.8: Accessible Authentication (Minimum)"
[15]: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ "Dialog (Modal) Pattern"
[16]: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/ "Landmark Regions"
[17]: https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html "Understanding SC 2.4.1: Bypass Blocks"
[18]: https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html "Understanding SC 2.4.2: Page Titled"
[19]: https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html "Understanding SC 1.3.5: Identify Input Purpose"
[20]: https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html "Understanding SC 3.3.7: Redundant Entry"
[21]: https://www.w3.org/WAI/tutorials/images/ "Images Tutorial"
[22]: https://www.w3.org/WAI/test-evaluate/ "Evaluating Web Accessibility Overview"
