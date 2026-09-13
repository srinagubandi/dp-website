# DocPropel v6 Visual QA

## Test environment

- **Build:** local v6 development preview on isolated port 4177
- **Review date:** 13 September 2026
- **Desktop viewport:** 1440 × 900
- **Mobile viewport:** 390 × 844
- **Reviewed routes:** `/`, `/contact`, `/admin/login`, and unauthenticated `/admin`

## Homepage review

The desktop homepage correctly uses the supplied two-slash DocPropel logo, a warm ivory field, deep-teal editorial headline, clear navigation, and a single high-priority Growth Brief action. The first viewport preserves the required proposition, supporting copy, both conversion paths, and an original abstract patient-path visual. No unapproved metric, testimonial, physician name, case-study result, or response-time claim appears in the reviewed viewport. The layout shows no visible overlap, clipping, or horizontal overflow.

The mobile homepage preserves an accessible narrative order: branded header, hero category, headline, explanatory paragraph, primary CTA, secondary route, then visual support. The primary CTA spans the available column with comfortable touch geometry. The visual enters below the action content rather than displacing it. The 390 px capture shows no visible clipping or unintended horizontal overflow.

## Metadata and indexability spot check

The raw root response contains a title, meta description, index/follow directive, absolute canonical URL, root-relative favicon/manifest assets, Open Graph title/description/URL/image, Twitter compatibility fields, and visible factual Organization/WebSite JSON-LD. The sitemap contains only the eight intended indexable public marketing routes and excludes the draft legal pages. This confirms source-level baseline behavior in the local preview; it is not a Search Console, social-platform, indexing, rich-result, ranking, or AI citation guarantee.

## Pending reviews

The required home, contact, admin-login, and unauthenticated-admin desktop/mobile captures are complete. The remaining release-gate checks are production PostgreSQL persistence, production source metadata, social-preview validators, `SITE_URL` host verification, complete keyboard and screen-reader task testing, and legal/privacy approval.

## Contact review

The desktop contact page follows the supplied direct-modern contact direction without using its unapproved response-time promise. The first viewport presents a clear contact proposition, a coral Growth Brief action, a secondary telephone action, and visible email, call, and hours channels. The abstract context panel avoids publishing the supplied consultation photo while its usage rights remain unconfirmed. The desktop composition shows no visible overlap or clipping.

The 390 px contact view preserves the same order and keeps both primary actions full-width and separated. Copy wraps naturally, the heading remains readable, and the contact-context visual follows the actions. No response-time claim, fake proof, or horizontal overflow appears in the reviewed capture.

## Admin login review

The desktop admin-login capture presents a focused, readable sign-in card with an approved supplied logo, persistent email and password labels, a single sign-in action, and a direct return path. The mobile capture preserves the complete sign-in flow within the viewport, with readable field labels and 48px-scale controls. Neither capture shows clipping or overlap. A visible focus ring appears in the screenshot because Chromium rendered the first keyboard-focusable control state; this demonstrates focus visibility but a separate keyboard interaction test remains required.

## Unauthenticated admin route review

Captures of `/admin` at both reviewed breakpoints resolve to the protected sign-in experience after the client session check. The result does not expose lead, content, section, or SEO records before authentication. REST coverage separately verifies that the protected endpoints return a 401 envelope without a valid session.
