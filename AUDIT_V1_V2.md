# Audit comparatif V1 (`uclic-frontend-git`) vs V2 (`uclic-v2`)

> Rédigé le 2026-04-25 — Objectif : lister tout ce qui existe en V1 et n'a pas été repris (ou pas correctement) en V2 avant la mise en prod.

---

## Synthèse

La V2 est **fonctionnellement avancée** : structure App Router complète, sitemap consolidé, RSS, blog, expertise, scraping, levée, toolbox, équipe, programmatic agence, schema JSON-LD via `lib/schema.ts`, tracking GA/Meta/LinkedIn/PostHog. Beaucoup de pages sont **plus longues qu'en V1** (cas-clients, levée détail, toolbox détail, équipe, contact, blog auteur, blog catégorie).

Néanmoins, on relève **~12 gaps critiques** :

1. **Fichiers statiques `public/`** manquants alors que `layout.tsx`/`manifest.ts` les référencent : `og-image.png`, `favicon.ico`. Risque immédiat : 404 sur OG card LinkedIn/Slack/Twitter et favicon par défaut Next.
2. **API routes V1 absentes en V2** : `/api/csv`, `/api/keywords`, `/api/legal-pages`, `/api/scraping/track-view`, `/api/cron/publish-region`, `/api/send-confirmation-email`, `/api/workflows/[id]/download`, `/api/workflows/[id]/favorite`, `/api/graphql`. Certaines (workflows fav/download) sont utilisées par le composant `FavoriteButton.client` / `WorkflowJsonBlock.client` côté V1 ; à valider si encore branché en V2.
3. **Pages V1 absentes / non portées** : `/about` (alias), `/auth/server-callback`, `/auth-test`, `/test-images`, `/auth/reset-password` (V2 a `/auth/reset-password` ; V1 a `/reset-password` à la racine — à vérifier les redirects).
4. **Pages V1 plus riches que V2** :
   - `/audit` : V1 = 107 + AuditContent 398 lignes ; V2 = 60 + 249 (–37 %).
   - `/expertise` (index) : V1 = 377 lignes ; V2 = 157 lignes.
   - `/charte-freelance` : V1 = 174 ; V2 = 80 lignes (–54 %).
   - `/scraping/[…]/[department]` : V1 = 662 lignes ; V2 = 327 lignes (–50 %, contenu SEO départemental probablement amputé).
   - `/scraping/[service]/[category]` : V1 = 383 ; V2 = 217.
   - `/a-propos` AboutContent : V1 = 437 lignes ; V2 = 118 lignes (–73 % !).
5. **Composants critiques absents** : `ROICalculator`, `OnboardingModal`, `SpotifyPlayer` + provider, `HubspotChat`, `VideoPopup`, suite d'optimization (`PageSpeedOptimizer`, `LazyVideo`, `LazyYouTube`, `LazyIframe`, `CriticalCSS`, `PreconnectOptimizer`, `LazyIcons`).
6. **Pas de Service Worker** (`public/sw.js`) ni d'enregistrement dans le layout.
7. **Pas de calculateur MDE / AB-Test contenu** : V2 `outils-gratuits/ab-test-calculator/page.tsx` = 32 lignes (V1 = 107) et `mde-calculator` = 31 (V1 = 113). Les pages V2 sont des stubs sans le composant calculateur (V1 a `MDECalculator.tsx`).
8. **Newsletter** : seul un handler local dans Footer (no-op `setNewsletterStatus`). Pas d'endpoint d'inscription connecté.
9. **Schema JSON-LD** : V2 = `Organization`, `LocalBusiness`, `WebSite`, `SiteNavigationElement`, `WebPage`, `Service`, `ItemList`, `BreadcrumbList`. V1 ajoutait `FAQPage` (extracteur HTML), `Person` (équipe), `ImageObject`, `Article` (blog post), `Course`/`HowTo` éventuels via `extractFAQsFromContent`. À vérifier si `FAQPage` JSON-LD est émis sur les articles blog et pages expertise V2.
10. **CTA / pixels** : conserver Meta Pixel + LinkedIn Insight + GA4 OK ; mais V1 avait aussi `revalidate = 3600` partout (ISR systématique). À auditer dans V2.
11. **Auth client** : V1 avait `ErrorHandler` + `UserProfile` + `LoginForm` simples ; V2 a `AuthSplitLayout`. Vérifier signup/login/reset-password fonctionnels (V2 déplace `/reset-password` → `/auth/reset-password`).
12. **Sitemap unique vs multi** : V1 splittait en `blog-sitemap.xml`, `discover-sitemap.xml`, `expertise-sitemap.xml`, `levee-sitemap.xml`, `news-sitemap.xml`, `portfolio-sitemap.xml`, `programmatic-sitemap.xml`, `toolbox-sitemap.xml`, `static-sitemap.xml`, `team-sitemap.xml`, `workflows-sitemap.xml`, `scraping/sitemap.xml`, plus index `sitemap.xml`. V2 = un seul `sitemap.ts`. Reste à valider que Google Search Console pointe sur la nouvelle URL et que le `news-sitemap.xml` (sitemap Google News) est conservé (V2 garde `discover-sitemap` et `news-sitemap` ✓).

**Criticité globale** : moyenne. Aucune route majeure perdue, mais des pages SEO clés (a-propos, audit, expertise hub, scraping département) ont vu leur contenu **fortement réduit** ; cela risque une régression de ranking. Plus l'absence d'OG image et favicon (visible immédiatement).

---

## 1. Pages manquantes / incomplètes

| Route V1 | Statut V1 | Statut V2 | Gap | Priorité |
|---|---|---|---|---|
| `/` | 121 lignes (8+ sections lazy) | 87 lignes (8 sections directes) | Ok structurellement, design refondu | OK |
| `/a-propos` | 61 lignes + AboutContent 437 | 89 lignes + AboutClient 118 | **Contenu réduit ~73 %** | **Haute** |
| `/about` | redirect/page | absent | À vérifier la redirection 301 | Moyenne |
| `/audit` | 107 + AuditContent 398 | 60 + AuditClient 249 | Contenu réduit ~37 % | Moyenne |
| `/contact` | 97 + ContactForm 523 | 228 (page intégrée) | V2 plus long mais form custom à valider | OK |
| `/charte-freelance` | 174 + layout | 80 | **Contenu réduit 54 %** | **Haute** |
| `/equipe` | 64 + TeamPageClient 166 | 184 + EquipeClient 202 | OK | OK |
| `/equipe/[slug]` | 125 + TeamMemberPageLayout 487 | 365 | OK probable | OK |
| `/expertise` | 377 lignes | 157 lignes | Contenu réduit | Moyenne |
| `/expertise/[category]` | 282 | 340 | OK | OK |
| `/expertise/[category]/[slug]` | 469 | 379 | À vérifier sections | Moyenne |
| `/blog` | 125 | 123 | OK | OK |
| `/blog/[slug]` | 310 + BlogPostClientSide 1348 | 363 + composants TOC/share/progress/CTA modulaires | V2 plus modulaire, OK | OK |
| `/blog/auteur/[slug]` | 79 (alias) | 153 | OK | OK |
| `/blog/author/[slug]` | présent | absent | redirect 301 EN→FR à mettre | Basse |
| `/blog/authors` | présent | absent | Liste auteurs ; pas critique | Basse |
| `/blog/categorie/[slug]` | présent (alias) | 128 | OK | OK |
| `/blog/categorie/[slug]/page/[page]` | présent | présent | OK | OK |
| `/blog/category/[slug]` | EN alias | absent | redirect 301 | Basse |
| `/blog/page/[page]` | présent | présent | OK | OK |
| `/cas-clients` | 75 | 165 | OK | OK |
| `/cas-clients/[slug]` | 101 + 472 (PortfolioPostClientSide) | 209 | OK probable | OK |
| `/levee-de-fonds` | 108 | 195 | OK | OK |
| `/levee-de-fonds/[slug]` | 292 | 436 | OK | OK |
| `/levee-de-fonds/page/[page]` | 108 | présent | OK | OK |
| `/toolbox` | 156 | 199 | OK | OK |
| `/toolbox/[slug]` | 218 + ToolboxSingle 1099 | 442 | Vérifier sections critiques | Moyenne |
| `/toolbox/page/[page]` | présent | présent | OK | OK |
| `/agence/[...slug]` | 543 | 409 | Contenu un peu réduit | Moyenne |
| `/meilleure-agence` | 173 | 286 | V2 plus riche | OK |
| `/meilleure-agence/[slug]` | 203 | 376 | OK | OK |
| `/meilleure-agence-growth` | 184 | 669 | V2 plus riche | OK |
| `/scraping` | 113 | 289 | V2 plus riche | OK |
| `/scraping/[service]` | 347 | 268 | À vérifier | Moyenne |
| `/scraping/[service]/[category]` | 383 | 217 | **Réduit 43 %** | **Haute** |
| `/scraping/[service]/[category]/[activity]` | 291 | 243 | OK proche | Basse |
| `/scraping/[…]/[region]` | 316 | 257 | OK proche | Basse |
| `/scraping/[…]/[region]/[department]` | 662 | 327 | **Réduit 50 %** | **Haute** |
| `/simulation` | 817 lignes (tout-en-un client) | 86 + SimulationClient 503 | OK refactor | OK |
| `/outils-gratuits` | 96 | 268 | OK | OK |
| `/outils-gratuits/ab-test-calculator` | 107 | 32 | **Stub — calculateur absent** | **Haute** |
| `/outils-gratuits/mde-calculator` | 113 | 31 | **Stub — composant `MDECalculator.tsx` non porté** | **Haute** |
| `/membres/profil` | 16 | 60 | OK | OK |
| `/membres/workflows` | 170 | 156 | OK | OK |
| `/membres/workflows/[slug]` | 475 | 560 | OK | OK |
| `/login` | 11 + layout | 36 | OK | OK |
| `/signup` | 8 + layout | 36 | OK | OK |
| `/reset-password` (V1) → `/auth/reset-password` (V2) | move | présent | mettre redirect 301 | Moyenne |
| `/auth/callback` | présent | présent | OK | OK |
| `/auth/server-callback` | route.ts | absent | OAuth backend callback ; à porter si Supabase OAuth utilisé | Moyenne |
| `/auth/update-password` | présent | présent | OK | OK |
| `/auth-test` | dev page | absent | Pas critique | OK |
| `/test-images` | dev page | absent | Pas critique | OK |
| `/auteur/[slug]` | 12 (redirect) | 260 | V2 plus complet | OK |
| `/legal` | 36 (dynamic) | 186 (hub) + dyn | OK | OK |
| `/legal/[slug]` | dynamique | dynamique + 5 stubs hardcodés | OK | OK |
| `/feed` | RSS | RSS | OK | OK |
| `/rss` | RSS | RSS | OK | OK |
| `/robots.txt` | route.ts | `/robots.ts` | OK | OK |
| `/sitemap.xml` | hub + 11 sub-sitemaps | `sitemap.ts` (un seul) | Vérifier `news-sitemap.xml` (✓) et `discover-sitemap.xml` (✓). `programmatic-sitemap`, `expertise-sitemap`, etc. fusionnés | Moyenne (resoumettre Search Console) |
| `/services/{seo,sea,automation,crm,data}` | stubs 27 lignes | absent | Pages stubs V1, supprimables | OK |
| `/presse` | absent | présent | bonus V2 | OK |
| `/rejoindre` | absent | présent | bonus V2 | OK |
| `/tarifs` | absent | présent | bonus V2 | OK |

### Routes API — V1 → V2

| Route V1 | Présent V2 | Usage | Action |
|---|---|---|---|
| `/api/cron/publish-region` | ❌ | Cron interne pour activer pages programmatiques par région | Porter ou supprimer cron |
| `/api/csv` | ❌ | Export CSV (probablement keywords ou expertises) | Vérifier dépendance |
| `/api/graphql` | ❌ | Wordpress proxy GraphQL | Probablement obsolète (V2 = Supabase) |
| `/api/keywords` | ❌ | Mots-clés | Vérifier |
| `/api/legal-pages` | ❌ | CRUD pages légales | Remplacé par Supabase direct |
| `/api/scraping/track-view` | ❌ | Tracking de vues sur scraping | Pixel analytics manquant |
| `/api/send-confirmation-email` | ❌ | Email auto post-form `/merci` | À porter (lead nurturing) |
| `/api/workflows/[id]/download` | ❌ | Download JSON workflow | À porter (utilisé par membre) |
| `/api/workflows/[id]/favorite` | ❌ | Toggle favoris workflow | À porter (utilisé par membre) |

---

## 2. Composants manquants ou refondus

| Composant V1 | Fonction | Présent V2 | Action |
|---|---|---|---|
| `header/Header.tsx` + `MegaMenu` + `MobileMenu` + `DesktopNav` + `Logo` + `NavItems` + `ServiceCard` + `SimpleDropdown` + `ThemeSwitcher` | Nav | refondu en `landing/Nav` + `nav/DesktopDropdown` + `nav/DesktopMegaPanel` + `nav/MobilePanel` + `nav/navData.ts` | OK |
| `footer/Footer` + `FooterUI` + `MainFooter` + `PreFooter` + `NewsletterSection` | Footer | `landing/Footer` (413 lignes) + `landing/FooterPartnersMarquee` | OK structure ; **Newsletter no-op** |
| `pages/home/hero/*` (animation + background + client) | Hero | `landing/Hero.tsx` (25 K) | OK refondu |
| `pages/home/partner/*` + `partnerbtob` | Partners marquee | `landing/FooterPartnersMarquee` + `landing/MediaMarquee` | OK |
| `pages/home/services/serviceData.ts` + `services.tsx` | Services grid | `landing/OffreSection` | OK refondu |
| `pages/home/process/process.tsx` + `ROICalculator.tsx` | Process steps + ROI calc | `landing/MethodeSection` (55 K) | **ROICalculator absent** — à porter si besoin |
| `pages/home/casestudy/casestudyClient.tsx` | Cas-clients grille home | non visible sur home V2 | Ajouter `CasClientsHomeSection` ? |
| `pages/home/testimonials/TestimonialClient.tsx` + `testi.json` (204 K !) | Avis clients | `landing/PreuveSection` + `PreuveCard` + `PreuveTabs` | OK refondu (mais pas certain que tout testi.json a été repris) |
| `pages/home/team/ClientTeam.tsx` | Team home | `landing/Organigramme` + `OrganigrammeAvant` | OK refondu |
| `pages/home/blog/*` + `LogoGrid.tsx` | Blog home | non visible sur home V2 | Vérifier |
| `pages/home/faq/faq.tsx` (13 K) | FAQ home | `landing/FaqSection` (15 K) | OK |
| `pages/home/seo-content/seo-content.tsx` | Bloc SEO | `landing/MethodeSection` ? | Vérifier que le contenu SEO bottom-of-page est encore présent |
| `pages/about/AboutContent.tsx` (437 lignes) | Contenu /a-propos | `a-propos/AboutClient.tsx` (118 lignes) | **Contenu amputé** |
| `pages/audit/AuditContent.tsx` (398) | Contenu /audit | `audit/AuditClient.tsx` (249) | Contenu réduit |
| `pages/blog/AuthorBioBox` + `AuthorBioPage` + `AuthorPage` + `AuthorsArchiveClientSide` + `BlogCategoryClientSide` + `BlogIndexClientSide` + `BlogPostClientSide` (1348 lignes) | Blog complet | refondu en composants modulaires `blog/*` (BlogGrid, ListingSection, FloatingShareRail, MidArticleCTA, Pagination, ReadingProgress, ShareButtons, TableOfContents) | OK |
| `pages/cas-clients/CasClientsIndexClientSide` + `PortfolioPostClientSide` | Cas-clients | refondu via app pages directes | OK |
| `pages/contact/ContactForm.tsx` (523 lignes) | Form contact | intégré dans `app/contact/page.tsx` (228 lignes) | **Form simplifié — vérifier intégrations EmailJS / HubSpot** |
| `pages/equipe/OtherConsultants` + `TeamMemberPage` + `TeamMemberPageLayout` + `TeamPageClient` | Équipe | `equipe/EquipeClient.tsx` (202) | OK probable |
| `pages/expertise/ExpertiseAnimation` | Anim expertise | `expertise/ExpertiseClient` + `ExpertiseBookingSection` + `CityLinksGrid` | OK refondu |
| `pages/levee-de-fonds/LeveeFeaturedImage` + `LeveePage` (753) + `LeveePageClient` + `LeveesPage` | Levée détail/index | `levee/LeveeListingSection` | Vérifier détail levée 436 lignes (V1 = 753) |
| `pages/toolbox/ToolboxArchiveClientSide` + `ToolboxList.client/server` + `ToolboxPage` + `ToolboxSingle` (1099 lignes) + `ToolboxSinglePage` | Toolbox | `toolbox/ToolboxListingSection` (227 lignes) + V2 single 442 lignes | **Single page peut-être amputée** |
| `calculators/MDECalculator.tsx` (14.7 K) | MDE calc | absent | **Porter** |
| `calculators/(AB Test calc)` (dans page) | AB calc | absent | **Porter** |
| `auth/ErrorHandler` + `LoginForm` + `UserProfile` | Auth | `auth/AuthSplitLayout` + pages app | OK refondu |
| `membres/BlogCard` + `ExpertiseContentClient` + `MembersNavbar` + `MembersSidebar` | Espace membre layout | absent ? | Vérifier nav membre V2 |
| `onboarding/OnboardingModal.client.tsx` | Onboarding /membres | absent | À porter si flow conservé |
| `optimization/(11 fichiers)` (PageSpeedOptimizer, LazyVideo, LazyYouTube, LazyIframe, CriticalCSS, PreconnectOptimizer, LazyIcons, LazyPostHog, LazyGoogleAnalytics, LazyComponent, ImageOptimizer, LazyScriptLoader, OptimizedImage) | Perfs | majoritairement absent (V2 utilise next/script + LenisProvider) | Vérifier perfs PageSpeed après build |
| `tracking/DataLayerInit` + `MetaPixelEvent` | Tracking | présent V2 | OK |
| `tracking/ClientPageSpeedOptimizer` | Perf | absent | OK (Next 15 gère) |
| `ui/AvatarGroup` + `CalendlyPlaceholder` + `CloudinaryImage` + `FloatingPhoneButton` + `GlobalMobileStickyBar` + `GrainOverlay` + `HubspotChat` + `Loading` + `OptimizedImage` + `Pagination` + `ReviewBadges` + `ScrollToTop` + `SocialProof` + `SpotifyPlayer` + `StickyShareButtons` + `VideoPopup` + `cta-button` + `submit-button` + `underlined-text` | Lib UI | partiellement porté (V2 a son propre `ui/` + `landing/` + `shared/`) | **Manquent** : `HubspotChat`, `SpotifyPlayer`, `VideoPopup`, `FloatingPhoneButton`, `CalendlyPlaceholder`, `ReviewBadges`, `SocialProof`, `StickyShareButtons` |
| `providers/PostHogProvider` + `SpotifyPlayerProvider` | Providers | `providers/PostHogProvider` ✓ ; SpotifyPlayer ❌ | OK pour PH |
| `workflows/FavoriteButton.client` + `LogoutButton.client` + `TagFilter.client` + `WorkflowGraph.client` + `WorkflowJsonBlock.client` + `WorkflowShareButton.client` | Membres workflows | seul `WorkflowGraph.client` semble présent | **Porter** Favorite, Tag filter, JsonBlock, ShareButton, Logout |
| `404/NotFoundContent` | 404 | absent (pas de `not-found.tsx` détecté) | Ajouter `app/not-found.tsx` |
| `examples/OptimizedHeroExample` + `test/ImageTest` + `documents/DocumentUpload` | Dev only | absent | OK |
| `Pagination.tsx` (root) | générique | `ui/Pagination.tsx` ✓ | OK |

---

## 3. Libs / data layer manquantes

| Lib V1 | Présent V2 | Notes |
|---|---|---|
| `assets.ts` | absent | constantes assets ; à vérifier |
| `blog.ts` (31 K) | `blog.ts` (28 K) | OK refait pour Supabase |
| `competitors.ts` | renommé `meilleure-agence.ts` | OK |
| `datalayer.ts` | OK identique | OK |
| `expertise.ts` | OK identique | OK |
| `fonts.ts` | absent (V2 utilise next/font/google direct) | OK |
| `image-utils.ts` | absent | helpers utilisés ailleurs ? à vérifier |
| `jsonld-utils.ts` | remplacé par `schema.ts` | mais `extractFAQsFromContent` + `generateFAQPageSchema` non porté → **pas de FAQPage JSON-LD auto sur articles blog** |
| `legal.ts` | OK | OK |
| `levee.ts` | OK | OK |
| `portfolio.client.ts` + `portfolio.ts` | fusionné `portfolio.ts` | OK |
| `profile.client.ts` + `profile.ts` | absent en V2 | si membre profil utilise Supabase direct, OK |
| `programmatic-pages.ts` | présent (16 K → 10 K, refactorisé) | API similaire mais signatures différentes |
| `rss.ts` | OK | OK |
| `sitemap-utils.ts` | absent (intégré dans `sitemap.ts`) | OK |
| `team.ts` | OK | OK |
| `text.ts` | absent | helper texte ; à vérifier |
| `toolbox.ts` | OK (8 K → 8 K) | OK |
| `utils.ts` | absent (généralement `cn` etc.) | vérifier `lib/utils` |
| `wordpress.ts` (38 K) | absent (V2 = Supabase only) | OK migration assumée |
| `workflows.ts` | OK | OK |
| (V2 ajoute) `sanitize-content.ts`, `schema.ts`, `scraping.ts` (28 K), `simulation.ts`, `stats.ts` | nouveaux | OK |

---

## 4. Schema JSON-LD à porter / à vérifier

V2 a en `lib/schema.ts` : `organizationSchema`, `localBusinessSchema`, `websiteSchema`, `siteNavigationSchema`, `webPageSchema`, `serviceSchema`, `pillarsItemListSchema` (+ `BreadcrumbList` ad-hoc dans plusieurs pages).

**Manques par rapport à V1** :
- `FAQPage` JSON-LD : V1 avait `extractFAQsFromContent()` + `generateFAQPageSchema()` posé sur articles blog & expertise. V2 n'émet pas de `FAQPage` automatiquement (seulement breadcrumb/article). À ajouter sur `/blog/[slug]`, `/expertise/[category]/[slug]`, `/scraping/*`, etc.
- `Article` / `BlogPosting` JSON-LD : à vérifier sur `/blog/[slug]` V2 (non grep visible).
- `Person` JSON-LD : V1 le posait sur `/equipe/[slug]` et `/auteur/[slug]`. À vérifier en V2.
- `Course` / `HowTo` / `VideoObject` : potentiellement utilisés par V1 sur expertise/toolbox.
- `getUCLICOrganizationSchema()` (variante riche avec sameAs Trustpilot/Sortlist) : V2 a déjà sameAs étendu ✓.
- `generateCompetitorsItemListSchema` : pour `/agence/[...slug]` et `/meilleure-agence/[slug]`.

---

## 5. Features fonctionnelles à vérifier / porter

| Feature | V1 | V2 | Action |
|---|---|---|---|
| Meta Pixel + GA4 + LinkedIn Insight + GTM | ✓ | ✓ | OK identique |
| PostHog | ✓ via provider | ✓ via provider | OK |
| Service Worker (`sw.js`) | ✓ + register dans layout | ❌ | À porter si offline/PWA voulu |
| `manifest.json` | static | dynamic via `manifest.ts` ✓ | OK |
| `og-image.png` | `static.uclic.fr/open.png` | référencé `/og-image.png` mais **fichier absent** | **Ajouter `/public/og-image.png`** |
| `favicon.ico` + favicon.svg + apple-touch-icon + favicon-96 | présent dans `/public/favicon/` | référencé `/favicon.ico` mais **absent** ; seul `logo.svg` présent | **Ajouter favicons** |
| Newsletter inscription | `NewsletterSection` (probablement HubSpot/Mailchimp) | handler stub no-op dans `Footer.tsx` | **Brancher endpoint inscription** |
| Form contact | `ContactForm` 523 lignes (EmailJS / HubSpot ?) | dans `app/contact/page.tsx` | Vérifier que l'envoi d'email fonctionne |
| Form simulation | EmailJS (`@emailjs/browser` import V1) | `SimulationClient` à vérifier | Vérifier transport email |
| Email confirmation `/merci` | `/api/send-confirmation-email` POST | absent (`/merci` page statique) | **Brancher transactional email** |
| RSS feed | `/rss` + `/feed` | `/rss` + `/feed` ✓ | OK |
| Robots.txt | route.ts | `robots.ts` ✓ | OK |
| Sitemap | 11 sub-sitemaps + index | sitemap.ts unique + `news-sitemap.xml` + `discover-sitemap.xml` | Resoumettre Search Console |
| Auth Supabase | callback + reset + update | OK | Vérifier `/auth/server-callback` (V2 absent) |
| Espace membres (workflows favoris / download / share) | `/api/workflows/[id]/{favorite,download}` | API absent | **Porter** |
| Tracking scraping pageviews | `/api/scraping/track-view` | absent | **Porter** ou utiliser GA4 events |
| Cron publish-region | `/api/cron/publish-region` | absent | Vérifier si encore utilisé |
| AB test calculator | composant inline 107 lignes | stub 32 lignes | **Porter calculateur** |
| MDE calculator | `MDECalculator.tsx` 14.7 K | stub 31 lignes | **Porter calculateur** |
| ROI calculator (home) | `ROICalculator.tsx` 11 K dans seo-content | absent | À porter si CTA souhaité |
| Onboarding modal membres | `OnboardingModal.client.tsx` | absent | Vérifier flow membres |
| Hubspot chat | `HubspotChat.tsx` injecté dans layout | absent | À porter si chat souhaité |
| Spotify Player (CEO playlist) | provider + UI | absent | Optionnel |
| Video popup global | `VideoPopup` + provider | absent | À porter si CTA vidéo |
| 404 personnalisé | `404/NotFoundContent.tsx` | absent (`app/not-found.tsx` non détecté) | **Ajouter not-found.tsx** |

---

## 6. Recommandations — ordre de priorité

### P0 — Bloquant prod (fixer avant déploiement)
1. **Ajouter `/public/og-image.png`** (1200×630, branding V2). Sinon partages LinkedIn/Slack/Twitter cassés.
2. **Ajouter `/public/favicon.ico`** + apple-touch-icon (au moins 180×180). Sinon favicon par défaut Next.
3. **Ajouter `app/not-found.tsx`** (sinon 404 brutal sans nav/footer).
4. **Vérifier metadata `siteUrl` cohérent** (`metadataBase` + canonical).
5. **Tester form contact + simulation** : que le mail part bien (EmailJS ou autre).

### P1 — SEO / régressions ranking
1. **Étoffer `/a-propos`** (V1 = 437 lignes, V2 = 118) : porter sections histoire, valeurs, bureaux, équipe, témoignages CEO.
2. **Étoffer `/scraping/[…]/[department]`** (V1 = 662, V2 = 327) : sections concurrence locale, prix, FAQ département, breadcrumb riche, table de comparaison.
3. **Étoffer `/scraping/[service]/[category]`** (V1 = 383, V2 = 217).
4. **Étoffer `/charte-freelance`** (V1 = 174, V2 = 80) : porter charte complète, signature, valeurs.
5. **Étoffer `/audit`** (V1 = 398, V2 = 249) : porter sections deliverables, témoignages, process.
6. **Ajouter `FAQPage` JSON-LD** automatique sur `/blog/[slug]`, `/expertise/[category]/[slug]`, `/scraping/*` (porter `extractFAQsFromContent` + `generateFAQPageSchema` depuis V1).
7. **Ajouter `Article`/`BlogPosting` JSON-LD** sur articles blog si non présent.
8. **Ajouter `Person` JSON-LD** sur `/equipe/[slug]` et `/auteur/[slug]`.
9. **Ajouter redirects 301** : `/about` → `/a-propos`, `/blog/author/[slug]` → `/blog/auteur/[slug]`, `/blog/category/[slug]` → `/blog/categorie/[slug]`, `/reset-password` → `/auth/reset-password`.
10. **Resoumettre sitemap** dans Google Search Console (URL change : 11 sitemaps → 1 + 2 spéciaux).

### P2 — Features fonctionnelles
1. **Porter MDE Calculator** (`MDECalculator.tsx` V1 → composant V2).
2. **Porter AB Test Calculator** (logique inline dans page V1).
3. **Porter API workflows favorite/download** ou retirer les CTA correspondants côté membres.
4. **Brancher newsletter** (handler actuel = no-op).
5. **Brancher `/api/send-confirmation-email`** (ou substitut transactional).
6. **Porter `track-view` scraping** (ou laisser GA4 events seuls).
7. **Porter ROI Calculator** sur home si pertinent (V2 page d'accueil n'en parle plus).

### P3 — Nice to have
1. Ajouter `HubspotChat`, `VideoPopup`, `FloatingPhoneButton`, `Calendly` si on veut conserver les leviers de conversion V1.
2. Service worker pour PWA / offline.
3. Onboarding modal membres.
4. SpotifyPlayer (si CEO le souhaite).

### P4 — Cleanup
1. Supprimer pages V1 stub (`/services/*`, `/auth-test`, `/test-images`).
2. Vérifier que tous les composants `optimization/*` V1 sont remplacés par mécanismes Next 15 natifs (next/image, next/script, dynamic).

---

## 7. Spot-checks restants à faire avant prod (manuel)

- `/blog/[slug]` : confirmer rendu TOC + share rail + reading progress + JSON-LD Article + FAQ.
- `/expertise/[category]/[slug]` : confirmer FAQ + Booking + city links + JSON-LD Service.
- `/cas-clients/[slug]` : confirmer galerie + résultats + témoignage.
- `/levee-de-fonds/[slug]` : confirmer infos levée (montant, lead, fondateurs).
- `/membres/workflows` : connexion Supabase + filtres tags + favoris + logout.
- `/scraping/*` 5 niveaux : vérifier breadcrumbs + autres villes + JSON-LD complet.
- `/agence/[...slug]` : vérifier table concurrents + ItemList JSON-LD + autres villes.
- Pages légales : 5 stubs hardcodés vs dynamic. Pas de doublon.
- Mobile : sticky bar + nav.
- `dark/light` mode : init script présent ✓.

---

*Audit généré automatiquement par diff structurel V1↔V2. Vérifier avec QA manuelle avant rollout.*
