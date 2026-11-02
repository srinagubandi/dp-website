# DocPropel v6 design, content, SEO, and accessibility handoff

**Release scope:** production-root replacement candidate. **Status:** implementation complete; release remains gated by content, legal, privacy, accessibility, and production-environment review.

## Authoritative design system

The implementation follows the supplied handoff prototype and approved mobile direction: Newsreader for editorial display type, DM Sans for interface and body copy, warm ivory (`#fbf8f0`), deep teal (`#073e4d`), mist (`#e9f2ef`), and coral (`#fa6958`, darkened to `#d94d3f` where needed for text/controls). The supplied SVG dark and light logos are used directly; no CSS recreation is present. Approved favicon, manifest, and social assets are copied to the public root.

The supplied consultation WebP is deliberately **not published** in v6. The inventory marks it production-ready technically but calls for usage-right confirmation. The hero instead uses a branded, accessible HTML composition that remains credible without an unverified image license. Concept PNGs are not shipped as public content.

## Content and section defaults

All listed sections default to enabled. The protected Sections admin can rename the internal section label and enable or disable a section. Public rendering checks every section’s persisted `enabled` flag and uses static fallback defaults until the public configuration API returns.

| Route           | Default sections                                           |
| --------------- | ---------------------------------------------------------- |
| `/`             | hero; pathway; specialties; proof; growth-brief; final-cta |
| `/services`     | hero; services; growth-brief                               |
| `/specialties`  | hero; specialties; growth-brief                            |
| `/how-it-works` | hero; workflow; performance-boundary; growth-brief         |
| `/results`      | hero; evidence; review-standard; growth-brief              |
| `/about`        | hero; mission; principles; patient-trust; growth-brief     |
| `/team`         | hero; roles; growth-brief                                  |
| `/contact`      | hero; contact-channels; what-happens-next; growth-brief    |
| `/privacy`      | hero; legal-template                                       |
| `/terms`        | hero; legal-template                                       |

The Content admin exposes seeded high-value page titles, introductions, contact details, homepage hero/pathway/proof copy, and Growth Brief copy. Defaults are inserted with PostgreSQL conflict-ignore, so startup cannot overwrite an editor’s changes.

## Evidence and claims boundary

Prototype figures (`500+`, `$50M+`, `4.9/5`, `+62%`), the prototype client quotation/name, and a one-business-day response promise are excluded. Home and Results instead explain the evidence review standard. Future case studies require an approved baseline, date range, specialty, service mix, measurement method, relevant operating context, and publication approval. Team content is role-based until real biographies and credentials are supplied. No copy guarantees patients, appointments, revenue, ranking, citation, accessibility conformance, or clinical outcomes.

## Metadata inventory

Each public route has an editable database record for title, description, canonical path, noindex, Open Graph title/description/image, social image, and page JSON-LD. Express injects sensible route-specific default metadata into raw HTML; the reusable React metadata component applies stored values after configuration loads. `SITE_URL` generates production absolute URLs. Privacy and Terms default to `noindex` while they remain draft legal templates.

`robots.txt` allows normal public crawling and disallows `/admin` and `/api/`. The sitemap includes the eight launch-indexable marketing routes and omits draft legal routes. No `llms.txt` or speculative LLM-bot policy is added, consistent with current Google guidance that no special AI file or markup is required.[1]

## Structured-data factual boundary

Root defaults contain only Organization and WebSite facts visible on the site: name, public URL, supplied logo, email, and phone. No review, rating, founder, address, person, or unsupported service schema is included. Admin JSON-LD must be valid JSON, use `https://schema.org`, and use one of a narrow reviewed set: WebPage, AboutPage, ContactPage, CollectionPage, Organization, WebSite, BreadcrumbList, or ItemList. The admin warns that markup must match visible content. Syntax and type validation do not replace editorial review or Google’s platform validation.[2]

## Accessibility engineering target

The engineering target is WCAG 2.2 AA, not a certification or legal conclusion. The site includes semantic landmarks/headings, a skip link, visible focus, labeled controls, status/error announcements, 48px controls, a keyboard-trapped mobile modal with Escape and focus restoration, responsive reflow, reduced-motion handling, and text alternatives. Critical journeys are public navigation, Growth Brief submission, admin sign-in, lead review/update, and content/section/SEO editing.

Automated checks and visual inspection are useful evidence but cannot establish universal accessibility. Before release, complete keyboard, current screen-reader/browser, zoom/reflow, form-error recovery, and end-to-end task testing as described by W3C’s evaluation guidance.[3]

## Sources

[1]: [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
[2]: [Google: Introduction to structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
[3]: [W3C WAI: Evaluating Web Accessibility Overview](https://www.w3.org/WAI/test-evaluate/)
