# Google Search, AI, and Technical SEO Requirements for a Healthcare Marketing Website

**Research ID:** 01-google-search-ai
**Prepared by:** Manus AI
**Access date:** 13 September 2026
**Scope:** Official Google Search and Search Console documentation only. This report covers public marketing pages for a healthcare provider, practice, clinic, hospital, or health-information publisher. It does **not** determine HIPAA, advertising, medical-device, accessibility, or professional-licensing compliance.

## Decision summary

A healthcare marketing site should first make every intended public landing page **publicly crawlable, HTTP 200, and textually indexable**. Those are Google's minimum technical eligibility conditions, not an indexing or ranking guarantee. Public service, location, clinician, and medically reviewed article pages should be linked through normal HTML navigation, canonically consolidated, and included in a UTF-8 sitemap that lists only preferred canonical URLs. [1] [8] [9]

For healthcare content, the highest-value content decision is to publish original, useful clinical information with clear authorship, review provenance, and accurate supporting evidence. Google identifies health as a YMYL (Your Money or Your Life) topic for which its systems give more weight to content aligned with strong experience, expertise, authoritativeness, and trustworthiness (E-E-A-T); Google also says **E-E-A-T itself is not a specific ranking factor**. [17]

AI Overviews and AI Mode require **no separate markup, `llms.txt`, content “chunking,” or special AI file**. A public page must already be indexed and eligible to show a Google Search snippet; structured data is not required for these AI features. For an otherwise eligible site, inclusion is still not assured. [2] [3]

The launch gate should therefore be: resolve indexability failures first; validate canonical, sitemap, structured-data, and field-performance behavior next; then monitor Search Console after launch. Do not promise rankings, indexing, rich-result presentation, or AI-feature visibility: Google explicitly does not guarantee any of them. [1] [4] [8] [13]

> **Interpretation key.** **Official requirement / eligibility condition** means Google says a condition must be met to be eligible for the stated Google Search behavior. **Official recommendation / best practice** means Google recommends it, but does not present it as a condition. **Internal launch control** is a conservative implementation decision derived from the official guidance; it is not a Google requirement.

## Implementation priority and launch decisions

| Priority | Decision | Classification | Exact implementation requirement or recommendation | Launch validation |
|---|---|---|---|---|
| P0 | Make every intended public indexable page crawlable and usable | **Official requirement for index eligibility** | Googlebot must not be blocked; the URL must return **HTTP 200**; and the page must contain indexable content in a Search-supported file type that does not violate Google's spam policies. The page must not require login or other public-access restriction. [1] | Crawl representative URLs with an HTTP client; confirm final response is `200`, no authentication wall, no Googlebot/CDN block, and meaningful rendered text. In Search Console, inspect templates and review **Page Indexing** plus **Crawl Stats**. |
| P0 | Do not accidentally noindex public templates | **Official requirement for the intended indexed outcome** | Do not emit `<meta name="robots" content="noindex">`, `<meta name="googlebot" content="noindex">`, or `X-Robots-Tag: noindex` on URLs intended for Search. Google must crawl a URL to see the rule, and a `noindex` URL must not also be robots.txt-disallowed if the desired result is removal from Search. [10] [11] | Inspect raw HTML and headers on every template. In URL Inspection, check the HTML Googlebot received and confirm no `noindex`; monitor Page Indexing exclusions. |
| P0 | Keep private patient/account flows out of public Search | **Official Google behavior; security control is outside this report** | Use authentication/password protection for genuinely private content. Google states a login-gated page will not be crawled. For public-but-non-search pages, use a meta `noindex` in the HTML `<head>` or an `X-Robots-Tag: noindex` header. Do **not** use robots.txt as a confidentiality control or as a substitute for `noindex`. [1] [10] [11] | Verify appointment, portal, confirmation, intake, document, and internal-search URLs require authentication where appropriate. For public non-search URLs, validate `noindex` in Googlebot-rendered HTML/headers and confirm they are not robots-disallowed. Obtain separate privacy/compliance review. |
| P0 | Enforce one preferred URL per public page | **Official recommendation / canonicalization best practice** | For duplicate or substantially similar URLs, implement one preferred canonical consistently: permanent redirects are a strong canonical signal; `rel="canonical"` is a strong signal; sitemap inclusion is a weak signal. Use an **absolute** canonical URL in the HTML `<head>`; place a self-referential canonical on the preferred page; link internally to the canonical URL; do not give conflicting signals. [12] | Test canonical source HTML, redirects, protocol/host variants, trailing slash, query parameters, and print/filter variants. Use URL Inspection to compare user-declared and Google-selected canonical. |
| P0 | Prevent crawler blocks that impair rendering | **Official recommendation / access condition** | Do not block CSS, JavaScript, image, or other resources when their absence makes the page difficult for Google to understand. Google advises that pages depending on blocked resources may not be analyzed well. [9] | Use URL Inspection to assess rendered page/resources. Review `robots.txt`, CDN/WAF logs, and staging rules; test representative mobile and JavaScript-rendered landing pages. |
| P1 | Publish a canonical-only sitemap | **Official sitemap protocol requirements and official best practices** | A sitemap must be UTF-8; a single sitemap may contain at most **50,000 URLs or 50 MB uncompressed**; use fully qualified absolute URLs; include only URLs intended to appear in Search, which should be canonical URLs. Put the sitemap at site root unless it is submitted in Search Console and scope is intentional. Split oversized files and optionally use a sitemap index. [8] | Fetch the deployed sitemap; validate XML/text format, UTF-8, URL count/size, absolute canonical HTTPS URLs, and `200` responses. Submit in Search Console **Sitemaps** report; resolve processing errors. |
| P1 | Make important pages discoverable by links | **Official recommendation / best practice** | Ensure every important page can be reached from site navigation or links on other pages. Google says a sitemap can help large, complex, new, or media-rich sites, but it does not replace proper linking. [7] [9] | Run a crawl from the home page and confirm services, locations, clinicians, articles, contact/appointment explainer pages, and image/video content are reachable. Check orphan-page inventory against sitemap URLs. |
| P1 | Make technical AI eligibility the same as ordinary Search eligibility | **Official requirement for AI-feature supporting-link eligibility** | To be eligible as a supporting link in AI Overviews or AI Mode, a page must be **indexed** and eligible to be shown in Google Search with a **snippet**, while fulfilling Search technical requirements. Google documents **no additional technical requirements**. [2] [3] | For representative pages, use URL Inspection to confirm indexability and no snippet suppression. Check that `nosnippet`, `max-snippet:0`, and restrictive `max-snippet` settings have not been unintentionally applied. Review the Search Console generative-AI report where available. |
| P1 | Use markup only where it truthfully describes visible public content | **Official requirement for rich-result eligibility** | Use JSON-LD (recommended), Microdata, or RDFa. The marked-up page and images must be accessible to Google; markup must be a true representation of the page; required properties for the feature must be supplied; do not mark up irrelevant, misleading, stale, or non-user-visible content. [4] | Run representative URLs through Rich Results Test and URL Inspection. Fix critical errors. Review Manual Actions and applicable Search Console rich-result reports after Google indexes the deployment. |
| P1 | Measure real-user page experience; prioritize Core Web Vitals | **Official recommendation; CWV are used by ranking systems** | Strive for **LCP ≤2.5 seconds**, **INP <200 ms**, and **CLS <0.1**. Google highly recommends good Core Web Vitals and confirms they are used by ranking systems; good tool scores do **not** guarantee top ranking. [5] [6] | Monitor Search Console Core Web Vitals report and field data, segmented by page template/device. Use Lighthouse or other diagnostics to find causes, but use field data as the launch/operations decision input. |
| P1 | Design for a complete page experience | **Official recommendation / best practice** | Serve securely, work on mobile, avoid ads that distract from main content, avoid intrusive interstitials, and make the main content distinguishable. These are page-experience self-assessment areas; Google says there is no single page-experience ranking signal. [6] | Validate HTTPS, mobile rendering, consent/interstitial behavior, ad placement, and main-content visibility on core templates. Review the Search Console HTTPS report. |
| P1 | Publish unique, expert-led healthcare information | **Official best practice; health-specific quality context** | Create helpful, reliable, people-first content. For health topics, make authorship and expertise easy to understand; use accurate sources and medical review as appropriate; avoid scaled or rewritten commodity content. Google says health topics receive more weight for content aligned with strong E-E-A-T, and trust is the most important E-E-A-T aspect. [17] | Editorial review should confirm named author/reviewer, qualifications/bio link, source/evidence accuracy, descriptive title and heading, revision date only when substantively changed, and non-duplicative service/location copy. This is an internal quality-control checklist, not an automated Google eligibility test. |

## Exact requirements by implementation area

### 1. Search Essentials, crawlability, and indexability

The baseline is deliberately narrow. Google lists only three minimum technical conditions for a page to be eligible for indexing: Googlebot is not blocked, Google receives an HTTP `200 (success)` response, and the page has indexable content. Google further explains that indexable content must be in a supported file type and must not violate spam policies. [1]

**Required for eligibility:** Public service, clinician, location, and health-information URLs intended for organic Search must be reachable without a login; must return a final `200` response; must be allowed to Googlebot; and must expose substantive textual content. Do not treat client-side UI chrome, images containing text, or inaccessible content behind interaction as the sole content source. Google's Search Essentials also requires avoiding policy-violating behavior, while its core best practices recommend descriptive language in titles, headings, alt text, and link text. [1] [9]

**Important limitation:** Passing these conditions makes a page eligible to be indexed. It does **not** require Google to crawl, index, rank, or display it. Google says this explicitly in Search Essentials. [9]

**Validation checks:** For each template and a statistical URL sample, check HTTP status and redirect chain; test both anonymous access and the deployed robots rules; use URL Inspection to see Google's fetched HTML; investigate Page Indexing and Crawl Stats; and track canonicalization status. Test after CDN/WAF, consent-management, staging, or JavaScript changes, because each can alter what Googlebot receives.

### 2. Robots, `noindex`, snippets, and sensitive health pages

`robots.txt` controls crawler access; it does not reliably prevent a web-page URL from appearing in Search. Google notes that a robots-disallowed URL can still appear, without a description, when linked from elsewhere. Use `noindex` to block Search indexing, and use authentication/password protection to keep sensitive material private. [10]

**Exact implementation for a public page that must not appear in Search:** Add `<meta name="robots" content="noindex">` inside the page `<head>`, or return `X-Robots-Tag: noindex` for the response. The HTTP header option supports non-HTML resources such as PDFs, videos, and images. Google does not support a `noindex` rule in `robots.txt`. The URL must remain crawlable so Google can discover the meta tag or header. [10] [11]

**Exact implementation for AI/Search preview control:** `nosnippet` suppresses text snippets and video previews across Google web Search, Images, Discover, AI Overviews, and AI Mode, and prevents the page content from being direct input for AI Overviews/AI Mode. `max-snippet:0` is equivalent. `max-snippet:[number]` limits automatic text snippets and the amount of page text used as direct AI input. `data-nosnippet` may be placed on valid `span`, `div`, or `section` elements to exclude selected text. These directives apply only when Google can crawl the URL. [11]

**Healthcare implementation decision:** Keep appointment confirmations, portal areas, intake flows, downloadable patient documents, and individually identifying content behind authentication and outside the public sitemap. Apply `noindex` to public utility pages that should not appear in Search (for example, internal-result pages) only when the page remains public. This is an application of Google's controls, not legal advice or a determination that `noindex` is sufficient for protected health information.

### 3. Canonical URLs, redirects, and URL inventory

Canonicalization is a preference mechanism, not a guarantee. Google ranks signals as follows: redirects and `rel="canonical"` are strong signals; sitemap inclusion is a weak signal. Signals that agree reinforce the preferred URL. [12]

**Exact implementation:** Emit one absolute `rel="canonical"` link in the `<head>` of canonical and duplicate HTML pages, pointing to the preferred final HTTPS URL. Use a self-referential canonical on the preferred page. Redirect retired duplicate URLs permanently to the preferred equivalent where the redirect is appropriate. Put only preferred canonical URLs in the sitemap. Maintain internal links to preferred URLs. Do not use robots.txt to canonicalize, do not use `noindex` merely to avoid selection of a site-internal canonical, and do not send conflicting canonicals in HTML, HTTP headers, redirects, or sitemap. [12]

**Healthcare implementation decision:** Consolidate HTTP/HTTPS, `www`/non-`www`, slash/no-slash, campaign parameters, printable pages, search/filter combinations, duplicate service pages, and provider/location permutations. If clinical articles are paginated, Article guidance requires canonicalizing each individual page or a view-all page, not every page to page one. [16]

### 4. Sitemaps

Sitemaps are crawl-discovery hints. They do not guarantee download, use for crawling, indexing, or appearance. A sitemap is most useful for a large, complex, new, media-rich, or weakly linked site. A small, comprehensively internally linked site may not need one, but a sitemap remains a useful operational control for a healthcare marketing rebuild. [7] [8]

**Exact sitemap requirements:**

| Item | Official implementation requirement / behavior | Validation check |
|---|---|---|
| Encoding | Sitemap file must be **UTF-8 encoded**. [8] | Inspect file encoding in the deployed response. |
| Size and count | Each sitemap is limited to **50 MB uncompressed** or **50,000 URLs**. Split larger inventories; a sitemap index may list multiple sitemaps. [8] | Automated build fails if either maximum is exceeded. |
| URL format | Use fully qualified, **absolute URLs**. Google will attempt to crawl URLs exactly as listed. [8] | Parse sitemap and reject relative URLs, non-HTTPS URLs, parameter duplicates, redirects, `404`s, and noindexed URLs. |
| URL selection | Include URLs intended for Google Search; these should be canonical URLs. [8] | Reconcile sitemap to canonical inventory; each listed URL returns final `200`, is indexable, and self-canonicalizes. |
| Location | A sitemap at site root can affect the entire site. Without Search Console submission, a sitemap affects descendants of its parent directory. [8] | Serve `/sitemap.xml` or a root sitemap index unless a scoped architecture is intentional. |
| Discovery/submission | Submit via the Search Console Sitemaps report or declare one or more `Sitemap:` lines in `robots.txt`; submission is still a hint. [8] | Confirm accepted sitemap and review last-read time and errors in Search Console. |
| `lastmod` | Google uses `<lastmod>` only when it is consistently and verifiably accurate. Google ignores `<priority>` and `<changefreq>`. [8] | Populate `lastmod` only from a trustworthy substantive-content update; omit it rather than artificially freshening it. |

### 5. AI Overviews and AI Mode

Google's official direction is to continue foundational SEO. AI Overviews and AI Mode can surface supporting links based on Search-index content, but Google documents no unique AEO/GEO technical mechanism for an ordinary healthcare site. [2] [3]

**Exact eligibility condition:** The page must be indexed and eligible to show in Google Search with a snippet, and it must fulfill Search technical requirements. Google states there are no additional technical requirements. [2] [3]

**Not required by Google for AI-feature eligibility:** `llms.txt`; special machine-readable AI files; bespoke AI schema; breaking content into small “chunks”; rewriting copy in a special style for AI; or structured data. Google explicitly says structured data is not required for generative AI Search. [2]

**Recommended health-content approach:** Publish helpful, reliable, people-first content with a genuinely useful practitioner, clinical, or organizational perspective. Make critical information textual and supported by relevant images/video where useful. Do not create high volumes of near-duplicate question pages or AI-generated summaries to target speculative fan-out queries; Google says scaled content primarily intended to manipulate rankings violates its scaled-content-abuse policy. [2] [17]

**Controls and measurement:** Keep `nosnippet` and restrictive `max-snippet` off pages where supporting-link inclusion and normal previews are desired. Use Search Console reporting—Google's current documentation identifies a Generative AI performance report and reports AI-feature traffic in Performance under Web—while interpreting it as observation, not a promise of feature appearance. [2] [3]

### 6. Structured data for a healthcare marketing site

Structured data supports eligibility for specific rich-result appearances. It is neither a general ranking guarantee nor an AI-feature prerequisite. A structured-data manual action removes rich-result eligibility but does not itself affect web-search ranking. Google may still decline to show a rich result even when markup validates. [4] [13]

**General exact requirements:** Use JSON-LD (Google-recommended), Microdata, or RDFa; do not block the marked-up page with robots.txt, `noindex`, login, or other access controls; ensure structured data truthfully represents the content on that page; supply every required property of the chosen feature; keep information current; and avoid misleading content, fabricated reviews, or markup unrelated to the page focus. Images referenced by markup must be crawlable and indexable. [4]

| Page type | Decision | Official requirements / limits | Validation |
|---|---|---|---|
| Clinic, hospital, or physical practice location | Implement `LocalBusiness` only for an actual local business/location page. | Use the most specific supported `LocalBusiness` subtype possible. Google requires `name` and physical `address` for the LocalBusiness rich-result type; it recommends relevant details such as `telephone`, `url`, geo coordinates, hours, and price range. The location URL must work. Do not self-mark up first-party reviews unless the review guidance supports the use case; Google's LocalBusiness page limits review/aggregate-rating recommendation to sites capturing reviews about **other** local businesses. [14] | Rich Results Test; URL Inspection; compare business name, address, phone, hours, URL, and images with visible page content and actual operations. |
| Public service, specialty, condition, clinician, or location page with hierarchical navigation | Implement `BreadcrumbList` where a real breadcrumb path exists. | Google requires a `BreadcrumbList` with at least two `ListItem`s. Required `ListItem` fields include ordered `position`, `name`, and URL/`item` except that the final item may omit `item`. Breadcrumbs should describe a typical user path, not mechanically mirror URL shape. [15] | Rich Results Test; inspect user-visible breadcrumb and JSON-LD for agreement; check internal item URLs. |
| Medical education, blog, or research article | Implement `Article` / `BlogPosting` only when the page is genuinely an article. | Google lists no required Article properties; include applicable recommended properties, especially a genuine `author` with name and identifying URL, `datePublished`, accurate `dateModified` with timezone, `headline`, and crawlable representative image. Images must represent the article. Article markup does not by itself make a page eligible for Top Stories. [16] | Rich Results Test; manually reconcile on-page author, byline, reviewer, headline, dates, image, and markup. Test image fetchability with URL Inspection. |
| FAQ page | Do **not** use FAQPage markup as a routine clinic-marketing tactic. | Google says FAQ rich results are only shown for well-known, authoritative government and health websites. The documentation does not provide a self-certification test for “well-known” or “authoritative.” Therefore a typical regional practice should not forecast this outcome. If markup is nevertheless used, it must still meet all general structured-data rules and exactly represent visible FAQ content. [18] [4] | Treat a clean Rich Results Test as syntax validation only; do not use it to claim FAQ rich-result eligibility or predicted display. Monitor Search Console after indexing. |

### 7. Core Web Vitals and page experience

**Official targets:** Largest Contentful Paint (LCP) measures loading performance; Google says strive for LCP within the first **2.5 seconds** of loading. Interaction to Next Paint (INP) measures responsiveness; strive for **less than 200 milliseconds**. Cumulative Layout Shift (CLS) measures visual stability; strive for **less than 0.1**. [5]

**Ranking limitation:** Google says Core Web Vitals are used by ranking systems. It also states that good results in Search Console or third-party tools do **not** guarantee top ranking, that there is no single page-experience signal, and that relevance may prevail even when page experience is sub-par. Treat CWV as an experience and technical-quality program, not a ranking promise. [6]

**Healthcare implementation decision:** Make LCP element identification, image size/dimensions, font loading, third-party booking/chat scripts, consent platform behavior, clinician photos, and embedded maps/video part of template acceptance testing. These are sensible ways to pursue the official metrics, but Google does not prescribe a single implementation pattern.

**Validation checks:** Review Search Console Core Web Vitals field data by mobile/desktop and template family. Use Chrome Lighthouse and developer tooling diagnostically to identify performance regressions. Independently test secure delivery, mobile layout, intrusive dialogs, distracting ads, and whether primary medical/service information is visually distinguishable. [5] [6]

## Release checklist and ownership

| Release gate | Owner | Required evidence | Status rule |
|---|---|---|---|
| Public indexability | Engineering + SEO | Template URL list, anonymous `200` checks, Googlebot access test, rendered text check, no accidental login/noindex | Block release for any intended public template that is inaccessible, non-200, noindexed, or text-empty. |
| Privacy separation | Product + privacy/compliance + engineering | Auth/access-control test for patient flows; header/meta inventory for public utility URLs | Block release for public exposure of sensitive/private flows. `noindex` alone is not the security approval. |
| Canonical/redirect inventory | Engineering + SEO | Preferred-host decision; redirect test; HTML canonical scan; duplicate URL inventory | Block release for conflicting canonical signals or cross-environment canonicals. |
| Sitemap and internal links | Engineering + SEO | UTF-8 sitemap validation, size/count report, canonical-only URL report, crawl/orphan report | Block release for malformed sitemap or sitemap URLs that redirect, error, noindex, or canonicalize elsewhere. |
| Structured data | Engineering + content | Rich Results Test record for every implemented type; visible-content reconciliation | Block deployment of markup with critical errors, false claims, stale details, or inaccessible pages. |
| Performance and page experience | Engineering + design | Search Console baseline/field report; mobile template test; CWV regression review | Resolve material regressions before release; do not represent good scores as a ranking guarantee. |
| Search Console operations | SEO | Verified property, sitemap submitted, URL Inspection samples, Page Indexing/Crawl Stats/Manual Actions monitoring plan | Go live only with owner and recurring review cadence assigned. |

## Claims that the project must not make

1. **Do not promise indexing or rankings.** Meeting Search Essentials only creates eligibility; Google may still not crawl, index, or serve the content. [9]
2. **Do not promise AI Overview or AI Mode inclusion.** There are no additional technical requirements, but eligibility is not display. [2] [3]
3. **Do not promise a rich result from valid markup.** Google may elect not to show rich results, and manual actions can remove eligibility. [4] [13]
4. **Do not promise that passing Core Web Vitals will produce a top rank.** Google expressly rejects that inference. [6]
5. **Do not represent E-E-A-T as a discrete ranking factor.** Google says it is not one, even though its systems use signals intended to identify strong E-E-A-T and health topics get additional weight for such alignment. [17]
6. **Do not describe robots.txt as an indexing-removal or privacy mechanism.** Use crawl access, `noindex`, and authentication for their distinct purposes. [10] [11]

## Source register

All sources below are **official Google documentation**. All URLs were accessed on **13 September 2026**. Titles are the live page titles at access.

| ID | Official source title | URL | Primary use |
|---|---|---|---|
| [1] | Google Search technical requirements | [Google Search Central documentation][1] | Minimum index eligibility and validation tools. |
| [2] | Optimizing your website for generative AI features on Google Search | [Google Search Central documentation][2] | AI-feature eligibility, non-requirements, measurement. |
| [3] | AI features and your website | [Google Search Central documentation][3] | AI Overviews/AI Mode behavior, controls, reporting. |
| [4] | General structured data guidelines | [Google Search Central documentation][4] | Formats, access, quality, relevance, completeness. |
| [5] | Understanding Core Web Vitals and Google search results | [Google Search Central documentation][5] | CWV definitions and thresholds. |
| [6] | Understanding page experience in Google Search results | [Google Search Central documentation][6] | Ranking limitations and page-experience checks. |
| [7] | Learn about sitemaps | [Google Search Central documentation][7] | Sitemap need and link-discovery context. |
| [8] | Build and submit a sitemap | [Google Search Central documentation][8] | Sitemap construction, limits, submission. |
| [9] | Google Search Essentials | [Google Search Central documentation][9] | No-guarantee statement and best practices. |
| [10] | Introduction to robots.txt | [Google Search Central documentation][10] | Crawl access and robots limitations. |
| [11] | Robots meta tag, data-nosnippet, and X-Robots-Tag specifications | [Google Search Central documentation][11] | Indexing/snippet/AI controls. |
| [12] | How to specify a canonical URL with rel="canonical" and other methods | [Google Search Central documentation][12] | Canonical and duplicate-URL implementation. |
| [13] | Local business (LocalBusiness) structured data | [Google Search Central documentation][13] | Structured-data deployment, non-guarantee, local business details. |
| [14] | Local business (LocalBusiness) structured data | [Google Search Central documentation][14] | Healthcare location markup decision. |
| [15] | Breadcrumb (BreadcrumbList) structured data | [Google Search Central documentation][15] | Breadcrumb requirements and monitoring. |
| [16] | Article (Article, NewsArticle, BlogPosting) structured data | [Google Search Central documentation][16] | Article markup and author/date/image guidance. |
| [17] | Creating helpful, reliable, people-first content | [Google Search Central documentation][17] | Healthcare/YMYL, E-E-A-T, authorship, AI-assisted content. |
| [18] | FAQPage structured data | [Google Search Central documentation][18] | Official FAQ display limitation for government/health sites. |

## References

[1]: https://developers.google.com/search/docs/essentials/technical "Google Search technical requirements"
[2]: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide "Optimizing your website for generative AI features on Google Search"
[3]: https://developers.google.com/search/docs/appearance/ai-features "AI features and your website"
[4]: https://developers.google.com/search/docs/appearance/structured-data/sd-policies "General structured data guidelines"
[5]: https://developers.google.com/search/docs/appearance/core-web-vitals "Understanding Core Web Vitals and Google search results"
[6]: https://developers.google.com/search/docs/appearance/page-experience "Understanding page experience in Google Search results"
[7]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview "Learn about sitemaps"
[8]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap "Build and submit a sitemap"
[9]: https://developers.google.com/search/docs/essentials "Google Search Essentials"
[10]: https://developers.google.com/search/docs/crawling-indexing/robots/intro "Introduction to robots.txt"
[11]: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag "Robots meta tag, data-nosnippet, and X-Robots-Tag specifications"
[12]: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls "How to specify a canonical URL with rel=canonical and other methods"
[13]: https://developers.google.com/search/docs/appearance/structured-data/local-business "Local business (LocalBusiness) structured data"
[14]: https://developers.google.com/search/docs/appearance/structured-data/local-business "Local business (LocalBusiness) structured data"
[15]: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb "Breadcrumb (BreadcrumbList) structured data"
[16]: https://developers.google.com/search/docs/appearance/structured-data/article "Article (Article, NewsArticle, BlogPosting) structured data"
[17]: https://developers.google.com/search/docs/fundamentals/creating-helpful-content "Creating helpful, reliable, people-first content"
[18]: https://developers.google.com/search/docs/appearance/structured-data/faqpage "FAQPage structured data"
