# Schema.org JSON-LD Audit — Uclic V2 (localhost:3900)

Date: 2026-04-25
Auditor: Schema.org markup specialist
Pages tested: 24 (static + 8 dynamic via real slugs)
JSON-LD blocks parsed: 138 (zero parse errors)

---

## 1. Global Findings

### Foundation — Excellent
Every page emits a consistent global trio in `layout.tsx`:
- `Organization` + `ProfessionalService` (with `@id=#organization`, founder array, contactPoint, sameAs LinkedIn / Sortlist / Trustpilot, address Paris FR, knowsAbout, priceRange, slogan, logo absolute URL)
- `WebSite` (with `SearchAction` potentialAction + publisher `@id` reference)
- `LocalBusiness` (geo, openingHoursSpecification, aggregateRating 4.9/17)
- `ItemList` SiteNavigationElement (10 nav links, absolute URLs)

All `@context` values use `https://schema.org`. All URLs are absolute. All dates parsed are ISO 8601. No placeholder strings detected.

### Validation Result: 100% syntactically valid
- 0 JSON parse errors across 138 blocks
- 0 relative URLs detected
- 0 missing required fields on emitted Article/BlogPosting/NewsArticle/Person/BreadcrumbList/FAQPage/VideoObject types
- 0 deprecated types (no HowTo, no SpecialAnnouncement, no CourseInfo)

---

## 2. Per-Page Schema Inventory

| Page | Page-specific @type emitted | Notes |
|---|---|---|
| `/` (home) | WebPage, Service+AggregateOffer+OfferCatalog+AggregateRating, ItemList(Service) | 7 blocks |
| `/audit` | BreadcrumbList, FAQPage | OK |
| `/a-propos` | BreadcrumbList, AboutPage, Person (founder spotlight) | OK |
| `/blog` | BreadcrumbList, ItemList (posts) | OK |
| `/blog/[slug]` | Article (Person author, Organization publisher, ImageObject) | datePublished + dateModified ISO with offset |
| `/equipe` | BreadcrumbList, ItemList(Person) | OK |
| `/equipe/[slug]` | Person (worksFor Org), BreadcrumbList | sameAs LinkedIn present |
| `/auteur/[slug]` | Person, BreadcrumbList | One duplicate Person without jobTitle (see issues) |
| `/cas-clients` | BreadcrumbList, ItemList | OK |
| `/cas-clients/[slug]` | Article + Organization | Should be `CaseStudy` or `Article` w/ `about` (see opportunities) |
| `/expertise` | BreadcrumbList, ItemList, CollectionPage, FAQPage | OK |
| `/expertise/agence-seo` | BreadcrumbList, FAQPage | Service schema missing (see opportunities) |
| `/levee-de-fonds` | BreadcrumbList, ItemList | OK |
| `/levee-de-fonds/[slug]` | NewsArticle + Organization (the funded company) | Excellent |
| `/toolbox` | BreadcrumbList, ItemList | OK |
| `/toolbox/[slug]` | SoftwareApplication (Offer, AggregateRating), FAQPage | Excellent |
| `/scraping` | BreadcrumbList, ItemList, Service | OK |
| `/agence/[slug]` | Service (areaServed City), FAQPage | OK |
| `/meilleure-agence` | BreadcrumbList | Could add ItemList of cities |
| `/meilleure-agence/[slug]` | Service (areaServed City) | OK |
| `/meilleure-agence-growth` | Article + WebPage, BreadcrumbList | OK |
| `/tarifs` | BreadcrumbList, Service+AggregateOffer+OfferCatalog | Strong |
| `/contact` | BreadcrumbList, ContactPage | OK |
| `/presse` | BreadcrumbList | Sparse (see opportunities) |
| `/merci` | (only global trio) | Correct — noindex page |

---

## 3. Validation Issues & Inconsistencies

### Severity: Medium
1. **Rating inconsistency** — Global `LocalBusiness` reports `4.9` / 17 reviews, but `/tarifs` and `/` Service report `4.76` / 30 reviews. Pick one canonical aggregate (recommend the larger sample with the same scale across all `aggregateRating` blocks) to avoid Google ignoring inconsistent ratings.
2. **Auteur duplicate Person** — `/auteur/[slug]` emits two `Person` blocks for Wladimir: one rich (jobTitle, sameAs, worksFor) from layout founder array, one sparse (`name` only, empty `sameAs`). Merge or de-duplicate by `@id` reference.
3. **`/cas-clients/[slug]` typed as `Article`** — Loses semantic value. Use `Article` + `about` referencing the client `Organization`, or pair with a `Service` mentions.
4. **Equipe person sameAs** — Alexis profile on `/equipe/[slug]` emits one Person without `image`/`sameAs` (founder snippet) and another full one. De-dupe via `@id`.

### Severity: Low / Cosmetic
- Article on `/meilleure-agence-growth` uses `datePublished: "2026-01-15"` (date-only) while `/blog/[slug]` uses full timestamps — both ISO-valid but inconsistent style.
- `Person` blocks for team members lack `image` URL even though photos exist on the page. Add `image` (absolute URL) — recommended for Person rich results.
- `WebPage` only emitted on home; missing on most other pages (not required, but `WebPage` + `primaryImageOfPage` adds clarity).

### Severity: None (info)
- No `http://schema.org` usage. No relative URLs. No placeholder text. No deprecated types. No FAQPage on inappropriate pages (only kept on `/audit`, `/expertise`, `/expertise/agence-seo`, `/agence/[slug]`, `/toolbox/[slug]` — note: FAQPage rich results were restricted to government/healthcare in Aug 2023; these will not earn rich snippets but remain valid markup. Consider removing for SEO clarity, or migrate Q&A into the page body for `Speakable`/AI Overviews relevance).

---

## 4. Missed Opportunities

| Page / Type | Missing schema | Why it matters |
|---|---|---|
| `/cas-clients/[slug]` | `Review` (testimonial) + `CreativeWork` `about` Org | Eligible for Review rich result if testimonials present |
| `/blog/[slug]` w/ embedded video | `VideoObject` (name, thumbnailUrl, uploadDate, duration, contentUrl) | Video rich result + Key Moments |
| `/expertise/[slug]` | `Service` block (provider Organization, areaServed, hasOfferCatalog) | Already present on `/scraping` and `/agence/[slug]` — extend to all expertise children |
| `/equipe/[slug]` | `ProfilePage` wrapper around `Person` | New 2024 supported type for author/team profiles |
| `/auteur/[slug]` | `ProfilePage` + `Person.knowsAbout`, `Person.alumniOf` | Same — strengthens E-E-A-T signals |
| `/presse` | `ItemList` of press items + each with `NewsArticle`/`CreativeWork` and `publisher` | Presently only breadcrumb |
| `/toolbox/[slug]` | `Review` blocks (individual) feeding `aggregateRating` | Currently aggregateRating without any `Review` items — Google may filter |
| `/tarifs` | Per-offer `Offer.priceValidUntil` (ISO 8601 future date) | Required for Merchant listing eligibility |
| `/meilleure-agence` | `ItemList` enumerating city pages | Sitelinks navigation |
| `/contact` | `ContactPoint.hoursAvailable` | Already have openingHours on LocalBusiness — mirror it |
| Home / Article pages | `Speakable` (`SpeakableSpecification` selecting hero h1 + intro) | AI Overviews / voice |
| Funding articles (`/levee-de-fonds/[slug]`) | `MonetaryAmount` for `funder` / `funding` | Adds structured fundraising data |

> Reminder: do **not** add HowTo (deprecated 2023), SpecialAnnouncement (deprecated 2025), CourseInfo/EstimatedSalary/LearningVideo (retired 2025).

---

## 5. Score

| Dimension | Score |
|---|---|
| Foundation (Org/Website/LocalBusiness) | 19/20 |
| Validity / parse / dates / URLs | 19/20 |
| Required fields per type | 14/15 |
| Coverage across page types | 16/20 |
| Consistency (Org @id, sameAs, ratings) | 8/10 |
| Use of recommended properties (image, knowsAbout, etc.) | 7/10 |
| Avoidance of deprecated/restricted types | 5/5 |

**Total: 88 / 100**

Headline takeaways:
- Solid, consistent global graph using `@id` references — best practice.
- Main losses from rating inconsistency (LocalBusiness 4.9/17 vs Service 4.76/30), missing `image` on `Person`, no `Review` items backing `aggregateRating`, missed `ProfilePage`, missed `VideoObject` on rich blog posts, and `FAQPage` blocks unlikely to render rich results.
