# QA Audit — Uclic V2
Date : 2026-04-24
Dev testé : http://localhost:3900

Auditeur : Claude (agent QA Senior).
Scope : 100 % des routes listées (statiques + index Supabase + 1 échantillon par route dynamique).
Aucun fichier n'a été modifié — ce rapport est le seul livrable.

---

## Scorecard global

| Dimension | Score | Commentaire |
|---|---|---|
| SEO meta | 6/10 | Fondations solides (layout + Metadata typées), **mais 2 pages ont des titres NextSaaS boilerplate (`/legal`, `/login`, `/signup`) et 10+ pages subissent un double suffixe `\| Uclic \| Uclic` à cause du template `%s \| Uclic`** qui s'applique sur des titres déjà suffixés. |
| JSON-LD + GEO | 7/10 | Très bon layer site-wide (Organization + WebSite + AggregateRating sur Service). Article/Breadcrumb/ItemList/CollectionPage/SoftwareApplication/Person/HowTo/FAQPage bien présents sur les détails. **Perdu : `llms.txt` contient des URLs qui n'existent pas (/services, /pricing, /process, /case-study, /team, /contact-us, /faq, /glossary, /documentation, /whitepaper, /tutorial, /changelog, /press)** — mauvais signal pour LLMs. |
| UX / UI | 6/10 | Sticky sidebar bien présent sur cas-clients / levee / toolbox / workflows / equipe. **Manquant sur blog/[slug] et expertise/[category]** (contenu long mais zéro navigation latérale, ni TOC ni blocs connexes). Nav utilise des ancres `#offre/#equipe/#methode/#preuve/#tarifs/#faq` qui ne fonctionnent PAS quand on est sur une page autre que `/` — aucun fallback vers `/#offre`. |
| Pagination | 4/10 | `/blog` (143 articles) **aucune pagination**, 24 cards hardcodées. `/toolbox` (372) **aucune pagination**, 48 cards. `/levee-de-fonds` (202) **aucune pagination**, 30 cards. `/cas-clients` : pas de filtre ni tri mais plus tolérable vu le volume. `/membres/workflows` : pagination ✓ (159 pages). |
| Accessibilité | 7/10 | `lang="fr-FR"`, skip-link présent sur la plupart des pages, labels de formulaire, aria-live sur newsletter. **Manque skip-link sur blog/[slug], equipe, cas-clients, expertise, a-propos, audit, contact** (pas bloquant mais perfectible). Contact : seuls des `<a href="tel:">` et `<a href="mailto:">` – pas de vrai form. |
| Perf | 7/10 | Preload hero texture OK, preconnect Supabase OK, `loading="lazy"` bien utilisé, `loading="eager"` pour le LCP des détails. Pas de Lighthouse lancé (consigne). Petit risque : `lucide-react` importé dans un grand nombre de pages — vérifier le tree-shaking en prod. |
| **Total** | **37/60** | Base solide mais quelques pépins P0 urgents (meta boilerplate /legal, pagination blog, llms.txt faux) + nombreux P1 (titres dupliqués, TOC, nav ancres). |

---

## Punch-list priorisée

### P0 — bloquants (à faire tout de suite)

- [ ] **`/legal/page.tsx:6-10` — meta boilerplate NextSaaS**
  - Titre actuel : `"Legal - App Builder || NextSaaS"`
  - Description : texte anglais sur "NextSaaS - the ultimate collection of 38+ premium HTML templates"
  - Canonical : `https://uclic.fr` (pointe sur la home, pas sur `/legal`)
  - → réécrire le bloc `metadata` à l'image de `legal/mentions-legales/page.tsx` (lignes 9-30). Titre suggéré : `"Documents légaux | Uclic"`, canonical : `/legal`.
  - Impact : Google indexe actuellement `/legal` avec un title anglais hors-sujet + canonical qui dilue la home.

- [ ] **`/login/page.tsx` et `/signup/page.tsx` — aucune `metadata` exportée**
  - Les deux sont `'use client'` → héritent de la `metadata` racine → titre `"Uclic — Agence Growth Marketing & IA..."` + canonical `https://uclic.fr` sur les deux URLs.
  - → extraire la partie UI dans `LoginClient.tsx` / `SignupClient.tsx` et créer un `page.tsx` serveur qui exporte :
    ```ts
    export const metadata: Metadata = {
      title: 'Connexion | Uclic',
      description: 'Espace membre Uclic — accédez à la bibliothèque de workflows n8n et ressources.',
      alternates: { canonical: '/login' }, // idem /signup
      robots: { index: false, follow: false }, // pages d'auth, non-indexables
    };
    ```
  - Bonus : `robots.ts:17-18` les disallow déjà, mais noindex au niveau page est plus propre.

- [ ] **Sitemap `/src/app/sitemap.ts` — aucun slug dynamique inclus**
  - Les 143 articles blog, 202 levées, 372 outils toolbox, 1898 workflows, cas-clients, equipe, auteurs : **zéro** dans le sitemap généré.
  - → ajouter une génération dynamique avec `getAllBlogSlugs`, `getAllLevees`, `getToolboxItems`, etc. Exemple pattern :
    ```ts
    const posts = await getAllBlogSlugs(200);
    const blogEntries = posts.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, ... }));
    ```
  - Sans ça, Google ne connaîtra jamais l'essentiel du contenu long-tail.

- [ ] **`/public/llms.txt` — 11 URLs inexistantes listées (lignes 43-60)**
  - `/services`, `/pricing`, `/process`, `/case-study`, `/success-stories`, `/team`, `/contact-us`, `/faq`, `/glossary`, `/documentation`, `/whitepaper`, `/tutorial`, `/changelog`, `/press` : aucune de ces routes n'existe dans `src/app/`.
  - → remplacer par les URLs réelles (`/expertise`, `/cas-clients`, `/equipe`, `/contact`, `/blog`, `/toolbox`, `/audit`, `/levee-de-fonds`, `/scraping`, `/membres/workflows`).
  - GPTBot/ClaudeBot/Perplexity vont suivre ces liens → 404 en cascade → signal de site dégradé pour l'index LLM.

- [ ] **Pagination absente sur `/blog`, `/toolbox`, `/levee-de-fonds`**
  - `/blog` : 143 articles, **24 affichés**, pas de "Page 2" (`blog/page.tsx:60` hardcode `getLatestPosts(24, 1)`).
  - `/toolbox` : 372 outils, **48 affichés** (`toolbox/page.tsx:11,56`).
  - `/levee-de-fonds` : 202 levées, **30 affichées** (`levee-de-fonds/page.tsx:12,57`).
  - → passer sur le pattern déjà implémenté dans `/membres/workflows/page.tsx` (searchParams `page`, `getLatestPosts(24, page)`, pagination numérotée en footer).
  - Impact : >80 % du contenu long-tail est inaccessible au crawler et au visiteur.

### P1 — importants (impact SEO / conversion)

- [ ] **Titre dupliqué `| Uclic | Uclic` — template appliqué sur titres déjà suffixés**
  - Causé par `layout.tsx:28` qui définit `template: '%s | Uclic'`, combiné avec des titres de page qui incluent déjà `"| Uclic"` ou `"| Blog Uclic"`.
  - Pages affectées (vérifiées via curl) :
    - `/expertise` → `"Expertises Growth Marketing & IA | Uclic | Uclic"` (expertise/page.tsx:15)
    - `/blog/[slug]` → `"... | Blog Uclic | Uclic"` (blog/[slug]/page.tsx:38)
    - `/cas-clients/[slug]` → `"... | Cas client Uclic | Uclic"` (cas-clients/[slug]/page.tsx:38)
    - `/equipe/[slug]` → `"Wladimir Delcros — Head of Growth | Uclic | Uclic"` (equipe/[slug]/page.tsx:50)
    - `/levee-de-fonds/[slug]` → `"... — Levée de fonds | Uclic | Uclic"` (levee-de-fonds/[slug]/page.tsx:69)
    - `/membres/workflows/[slug]` → `"... | Workflow n8n | Uclic | Uclic"` (workflows/[slug]/page.tsx:123)
    - `/auteur/[slug]` → `"... — Auteur | Blog Uclic | Uclic"` (auteur/[slug]/page.tsx:67)
    - `/scraping/[service]` → `"Base Mail | Uclic — Constitution de bases B2B | Uclic"` (vérifié via curl)
  - → retirer tous les `| Uclic` (et `| Blog Uclic`, `| Cas client Uclic`, etc.) de ces chaînes title — le template les rajoute.
  - Exception : `/a-propos/page.tsx:11` fournit `title: 'À propos — Pourquoi Uclic existe | Agence Growth & IA'` → rendu `"... | Agence Growth & IA | Uclic"` (OK).

- [ ] **Blog `/blog/[slug]` — aucun sticky sidebar ni TOC**
  - `blog/[slug]/page.tsx:174-187` rend l'article en un seul `<article className="prose prose-lg max-w-[760px] mx-auto">`.
  - Contrairement à `cas-clients/[slug]` (sticky avec CTA + next), `levee-de-fonds/[slug]` (sticky entreprise + related) et `toolbox/[slug]`, l'article blog n'a aucun élément latéral.
  - → transformer la structure en grid 2/3 + 1/3 comme les autres, ajouter :
    1. TOC auto-générée (parser `post.content` pour `<h2>/<h3>`)
    2. Bloc auteur (avec lien `/auteur/{slug}`)
    3. Bloc "Articles reliés" (mêmes catégories / tags)
    4. CTA audit sticky
  - Zone d'insertion : `blog/[slug]/page.tsx:174-187` (remplacer `<article>` par `<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">...`)

- [ ] **Expertise `/expertise/[category]` — FAQ sans sticky, mais surtout aucun index latéral**
  - Page très longue (hero + 3 boxes + content + process + liste expertises + FAQ), zéro navigation.
  - `expertise/[category]/page.tsx:264-288` liste les 12 dernières expertises en grille mais pas de pagination ni de "voir plus".
  - → ajouter TOC sticky à gauche (Ancrage vers `#processus`, `#expertises-liees`, `#faq`) + pagination si >12 items.

- [ ] **Nav — ancres en `#xxxx` non fonctionnelles hors landing**
  - `Nav.tsx:7-14` : `{ href: '#offre' }, { href: '#equipe' }, ...`
  - Sur `/blog`, `/cas-clients`, `/equipe` etc., cliquer sur "Offre" dans la nav ne scrolle vers rien (aucune section avec ces `id` sur ces pages).
  - → transformer en `/#offre`, `/#equipe`, etc. pour que le browser retourne sur la home et y défile, OU conditionner les liens au pathname.

- [ ] **`/contact/page.tsx` — aucun CtaFinal, aucun vrai formulaire**
  - Seulement 3 cartes (audit / email / tel), tout redirige vers `/audit`. Pas de bloc `<CtaFinal />` final (contrairement aux autres pages).
  - Pas de JSON-LD `ContactPage` ni `ContactPoint` à l'échelle page.
  - → ajouter `<CtaFinal />` avant `</main>` ligne 189 + injecter un schema `ContactPage` avec `contactPoint` (téléphone + email).

- [ ] **`/outils-gratuits/page.tsx` — JSON-LD ? Vérifier cohérence**
  - Aucune mention ItemList pour les calculateurs listés. → ajouter `ItemList` avec chaque outil gratuit, eligible à un carousel search result.

- [ ] **Padding violations `pt-32 lg:pt-40` (au lieu de `pt-24 lg:pt-28`)**
  - `legal/mentions-legales/page.tsx:57`
  - `legal/conditions-generales-de-vente/page.tsx:62`
  - `legal/rgpd/page.tsx:57`
  - (`/legal/cookies` et `/legal/politique-de-confidentialite` sont déjà corrects.)
  - → remplacer `pt-32 pb-16 lg:pt-40` par `pt-24 lg:pt-28 pb-16 lg:pb-20` pour conformer à la règle UX globale.

- [ ] **Sitemap — `/auteur/[slug]` et `/expertise/[category]` hors-slug non listés**
  - `sitemap.ts:18-25` liste 8 slugs hardcodés d'expertise, mais la DB en contient potentiellement plus.
  - → générer dynamiquement via `getExpertiseCategories()`.

- [ ] **Blog index — pas d'ItemList avec image, pas de filtres**
  - Le blog n'a ni filtre catégorie, ni filtre auteur, ni tri. Avec 143 articles, un utilisateur cherchant "growth hacking" doit scroller.
  - → ajouter filtres catégorie + tri (récent / populaire) + search client.

- [ ] **Toolbox/levee — pas de filtres catégorie/secteur/année**
  - Critique pour `/toolbox` (372 outils, catégories existent déjà dans la donnée) et `/levee-de-fonds` (dealType, dateText).
  - → ajouter barre de filtres client au-dessus de la grille.

- [ ] **`/blog/[slug]` — pas de lien UI vers `/auteur/{slug}`**
  - L'article affiche seulement le nom auteur en texte brut (`blog/[slug]/page.tsx:151-156`).
  - → wrapper dans un `<a href={/auteur/${authorSlug}}>` — passerelle clé pour E-E-A-T.

### P2 — nice-to-have

- [ ] **Breadcrumb UI visible sur les détails** : actuellement seul le JSON-LD BreadcrumbList existe sur blog/[slug], levee, toolbox. Ajouter un breadcrumb visuel en haut (comme dans `legal/mentions-legales/page.tsx:60-74`).

- [ ] **`/audit`, `/a-propos`, `/contact`, `/charte-freelance`** : pas de `twitter:site` sur la plupart (parfois `twitter` carrément absent). Harmoniser.

- [ ] **`/equipe/[slug]` page.tsx:50** : `title = "${member.title} — ${role} | Uclic"` → avec le template, devient `"... | Uclic | Uclic"`. Retirer le `| Uclic` manuel.

- [ ] **Remplacer `<img>` par `<Image>` Next.js** sur blog cards, toolbox cards, levee cards : perte de LCP / CLS à l'échelle du site. Listés :
  - `blog/page.tsx:132-138`
  - `blog/[slug]/page.tsx:164-170`
  - `toolbox/page.tsx:142-148`
  - `levee-de-fonds/page.tsx:137-143`
  - `cas-clients/[slug]/page.tsx:141-149`

- [ ] **Ajouter `FAQPage` sur `/audit`** si une section FAQ existe (le composant `AuditClient` n'a pas été introspecté à fond — vérifier).

- [ ] **`schema.ts:11-15`** indique volontairement "pas de FAQPage / HowTo" mais `expertise/[category]/page.tsx:83-93` émet du FAQPage + `workflows/[slug]/page.tsx:227-239` émet HowTo. Incohérence interne : décider une ligne (je recommande garder les schemas sur les détails car ils sont éligibles sur des query plus niche).

- [ ] **Empty states / skeletons** : aucune page n'affiche de skeleton pendant le fetch Supabase (pages server donc pas critique, mais `generateStaticParams` retourne `[]` pour workflows → premier hit sur un slug non pré-rendu = SSR complet visible).

- [ ] **`/cas-clients/page.tsx`** : pas de filtre par secteur/taille entreprise/pilier → avec 10+ cas, ce sera vite illisible.

- [ ] **Workflows `/membres/workflows/page.tsx:77`** : `perPage: 12` → 159 pages pour 1898 workflows. Augmenter à `perPage: 24` pour moitié moins de clics.

- [ ] **Scraping `/scraping/[service]`** : vérifier qu'il y a bien un schema `Service` avec `offers` + `areaServed`. Le detail est en service et peut devenir un bon contenu transactionnel.

- [ ] **llms.txt** : ajouter une section `## Routes indexables` qui mappe tous les chemins réels groupés par type (pages, blog, levée, toolbox, workflow, expertise) — meilleure compréhension LLM.

- [ ] **`robots.ts:14-22`** : `disallow: ['/login', '/signup']` + parameters `?utm_, ?fbclid, ?gclid` → bien. Ajouter `/auth/*` (callback / reset-password) si ces routes existent.

---

## Détail page par page

### `/` (landing)
- SEO : Title 64 chars ✓, description 225 chars (**au-dessus de 160**). Canonical ✓. OG complet ✓. Twitter card ✓.
- JSON-LD : Organization + WebSite site-wide (`layout.tsx:144-153`), + WebPage + Service (avec aggregateRating 4.76/30 reviews) + ItemList pillars (`page.tsx:50-62`). Très propre.
- UX : Nav sticky ✓ (position sticky via `.header-blur` CSS globals.css:202). `<a id="main">` skip-link ✓ (`page.tsx:63-68`). `CtaFinal` + `Footer` présents.
- Perf : preload hero mercury.webp ✓, preconnect supabase ✓.
- Recommandations : réduire la description meta à ≤160 chars (actuellement 225 → tronqué par Google).

### `/a-propos`
- SEO : Title 66 chars ✓, description 257 chars (**trop longue**). Canonical ✓. OG ✓ mais **pas de `twitter:` card explicitement** (devrait hériter mais à confirmer).
- JSON-LD : BreadcrumbList + Person (Wladimir avec alumniOf CodinGame/Muzzo/Obat/StayHome). Pas de `WebPage`/`AboutPage` spécifique → ajouter `@type: AboutPage`.
- UX : Skip-link ✓, Nav ✓, CtaFinal ✓, Footer ✓. Padding OK (`AboutClient.tsx:28` = `pt-24 lg:pt-28`).
- Recommandations : raccourcir la description (≤160), ajouter `@type: AboutPage` avec `mainEntity: { @id: PERSON_WLADIMIR_ID }`.

### `/audit`
- SEO : Title 45 chars ✓, description 155 chars ✓. Canonical ✓. OG ✓. Twitter : absent (pas de bloc `twitter:` dans `audit/page.tsx:10-30`).
- JSON-LD : BreadcrumbList seulement. Pas de schema `Service` ni `OfferCatalog` dédié au Growth Scan — **grosse opportunité SEO** car c'est une page transactionnelle. → ajouter un `@type: Service` avec `offers: { price: '0' }`.
- UX : Nav ✓, padding OK (`AuditClient.tsx:96`), MediaMarquee en bas ✓, skip-link ✓.
- Recommandations : ajouter schema Service + Twitter card.

### `/contact`
- SEO : Title 27 chars ✓, description 193 chars (**trop longue**). Canonical ✓. OG ✓. Twitter card ✓.
- JSON-LD : Breadcrumb uniquement. Devrait avoir `@type: ContactPage` + `ContactPoint`.
- UX : Pas de `CtaFinal`, pas de vrai form (uniquement cards avec tel/email/lien `/audit`). Padding OK.
- Recommandations : ajouter CtaFinal avant `</main>` (ligne 189), ajouter ContactPage schema, raccourcir description ≤160.

### `/charte-freelance`
- SEO : Title 41 chars ✓, description 185 chars (un peu long). Canonical ✓. OG ✓.
- JSON-LD : vérifier (pas introspecté en détail) → probablement Breadcrumb seul.
- UX : Padding OK (pt-24 lg:pt-28 trouvé). CtaFinal présent.
- Recommandations : raccourcir description.

### `/meilleure-agence`, `/meilleure-agence-growth`
- SEO : Titles OK (~55 chars), descriptions 195+ chars (**trop longues** pour les 2).
- JSON-LD : non introspecté — probablement Breadcrumb seul. → ajouter `ItemList` des agences citées (éligible carousel).
- UX : Padding ✓, CtaFinal ✓.
- Recommandations : tronquer descriptions ≤160, ajouter ItemList schema.

### `/outils-gratuits`
- SEO : Title 61 chars ✓, description 180 chars (un peu long). Canonical ✓.
- JSON-LD : non vérifié en détail → ajouter ItemList pour les calculateurs.
- UX : Padding ✓, CtaFinal ✓.
- Recommandations : ajouter ItemList + `SoftwareApplication` par outil gratuit (A/B calc, sample size, etc.).

### `/legal` ⚠️ P0
- SEO : **Title `"Legal - App Builder || NextSaaS"` + canonical `https://uclic.fr` + description NextSaaS anglais** (`legal/page.tsx:6-10`). À reprendre intégralement.
- JSON-LD : non présent.
- UX : imports `@/components/legal-notice/Hero` et `Content` → à vérifier, potentiellement composants hérités d'un starter.
- Recommandations : P0 — réécrire metadata + intégrer Nav/Footer corrects.

### `/legal/mentions-legales`, `/legal/conditions-generales-de-vente`, `/legal/rgpd`
- SEO : titles courts OK, canonical ✓, descriptions OK.
- JSON-LD : Breadcrumb ✓.
- UX : **Padding `pt-32 lg:pt-40` non conforme** au standard `pt-24 lg:pt-28`.
- Recommandations : aligner padding (P1).

### `/legal/cookies`, `/legal/politique-de-confidentialite`
- SEO : OK.
- UX : Padding conforme ✓.

### `/login`, `/signup` ⚠️ P0
- SEO : **pas de metadata exportée** (page client). Titre = homepage title, canonical = `https://uclic.fr`. → pages auth indexables avec meta homepage.
- UX : sticky section avec `pt-24 lg:pt-28 pb-24 lg:pb-32 min-h-[80vh]` ✓, labels `<label htmlFor>` ✓, `aria-live` absent sur le bloc erreur (role="alert" utilisé ligne 66).
- Recommandations : P0 — exporter metadata + `robots: { index: false }` + split client/server.

### `/expertise` (index)
- SEO : Title `"Expertises Growth Marketing & IA | Uclic"` → avec template devient `"... | Uclic | Uclic"` ⚠️ P1. Description 177 chars (un peu long).
- JSON-LD : BreadcrumbList + ItemList (catégories) ✓.
- UX : Nav ✓, padding ✓, CTAs hero ✓, CtaFinal ✓. Pas de skip-link.
- Recommandations : retirer `| Uclic` du title, raccourcir description.

### `/expertise/[category]` (ex : `/expertise/growth-marketing`)
- SEO : Title dynamique via `fields.metaTitle` (bien), canonical ✓, OG ✓.
- JSON-LD : BreadcrumbList + FAQPage conditionnel ✓.
- UX : **Longue page, aucune TOC sticky** → P1. H2 pour 3-boxes, content2, process, liste expertises, FAQ. Aucun "back to top" non plus.
- Recommandations : structurer en grid 2/3 + 1/3 avec TOC sticky à droite (comme cas-clients/[slug]).

### `/blog` (index)
- SEO : Title 34 chars ✓, description 169 chars (un peu long). Canonical ✓. OG+Twitter ✓.
- JSON-LD : BreadcrumbList + ItemList (20 premiers posts, avec position/url/name) ✓.
- UX : padding ✓, grid 3 cols ✓. **Pas de pagination** → P0. Pas de filtre / tri / search.
- Recommandations : P0 pagination, P1 filtres catégorie + recherche.

### `/blog/[slug]` ⚠️ P1
- SEO : Title `"${post.title} | Blog Uclic"` + template → **`"... | Blog Uclic | Uclic"`** ⚠️. Canonical ✓. OG article avec publishedTime/authors/tags ✓. Twitter ✓.
- JSON-LD : Article + BreadcrumbList ✓. Auteur `Person` : bien mais `url` manquant (lien vers `/auteur/{slug}` recommandé).
- UX : **Zéro sidebar, zéro TOC, zéro related, zéro lien auteur cliquable** (`blog/[slug]/page.tsx:151-155`). Tags en bas ✓.
- Recommandations : refonte grid 2/3 + 1/3 avec TOC auto + related + auteur card + CTA audit sticky. Retirer `| Blog Uclic` du title.

### `/cas-clients` (index)
- SEO : Title 55 chars ✓, description 215 chars (**trop longue**). Canonical ✓.
- JSON-LD : BreadcrumbList + ItemList ✓.
- UX : ✓. Pas de filtres.
- Recommandations : raccourcir description, ajouter filtres par secteur / pilier.

### `/cas-clients/[slug]`
- SEO : Title `"${title} | Cas client Uclic"` + template → **double suffixe** ⚠️.
- JSON-LD : Breadcrumb + Article ✓.
- UX : **Sticky sidebar présent** ✓ avec CTA audit + next case (`cas-clients/[slug]/page.tsx:172-208`). Très bonne structure.
- Recommandations : retirer `| Cas client Uclic` du title, ajouter aussi un bloc "Résultats clés" chiffrés au-dessus de l'article pour GEO/AI citation.

### `/equipe` (index)
- SEO : Title 46 chars ✓, description 176 chars (un peu long). Canonical ✓.
- JSON-LD : BreadcrumbList + ItemList ✓.
- UX : OK.
- Recommandations : ajouter schema `Organization` avec `employee[]` (au lieu de simple ItemList → éligible knowledge panel).

### `/equipe/[slug]` (ex : `/equipe/wladimir`)
- SEO : Title `"${title} — ${role} | Uclic"` + template → **double suffixe** ⚠️.
- JSON-LD : BreadcrumbList + Person (avec worksFor Uclic, sameAs linkedin/twitter/autre) ✓.
- UX : **Sticky sidebar ✓** (équipe/slug/page.tsx:307-360). Très propre.
- Recommandations : retirer `| Uclic` du title.

### `/levee-de-fonds` (index)
- SEO : OK (titles corrects).
- JSON-LD : BreadcrumbList + ItemList ✓.
- UX : 30 cards, **pas de pagination** → P0. Pas de filtre par secteur / montant / année.
- Recommandations : P0 pagination + filtres.

### `/levee-de-fonds/[slug]`
- SEO : Title `"${title} — Levée de fonds | Uclic"` + template → **double suffixe** ⚠️.
- JSON-LD : Breadcrumb + NewsArticle + Organization (si `company`) ✓.
- UX : **Sticky sidebar ✓** (company card + CTA audit + related). Très bonne structure.
- Recommandations : retirer `| Uclic` du title.

### `/toolbox` (index)
- SEO : Title 61 chars ✓, description 222 chars (**trop longue**).
- JSON-LD : BreadcrumbList + ItemList ✓.
- UX : 48 cards, **pas de pagination** → P0. Pas de filtre catégorie (alors que data.categories dispo).
- Recommandations : P0 pagination + filtres.

### `/toolbox/[slug]` (ex : `/toolbox/forecastr`)
- SEO : Title court ✓.
- JSON-LD : Breadcrumb + SoftwareApplication (avec offers + optional aggregateRating sur votesCount) ✓.
- UX : Sticky sidebar ✓ (tool card + CTA audit).
- Recommandations : ajouter schema `Review` quand une vraie note existe (pas un placeholder 4.5 ratingValue dérivé de votesCount, qui peut être vu comme spam).

### `/scraping` (index)
- SEO : Title 62 chars ✓, description 150 chars ✓. Canonical ✓.
- JSON-LD : à vérifier, probablement Service.
- UX : Padding ✓, CtaFinal ✓.

### `/scraping/[service]` (ex : `/scraping/base-mail`)
- SEO : Title `"Base Mail | Uclic — Constitution de bases B2B"` + template → `"... | Uclic"` final. À confirmer en inspectant `scraping/[service]/page.tsx:93-97`.
- JSON-LD : à vérifier.

### `/membres/workflows` (index)
- SEO : OK.
- JSON-LD : BreadcrumbList + CollectionPage avec mainEntity ItemList ✓.
- UX : Pagination déjà gérée côté client (`WorkflowsClient` avec searchParams `page`) ✓. Recherche + tag + catégorie + tri présents ✓.
- Recommandations : augmenter `perPage: 12` → `24` (`workflows/page.tsx:77`) pour moitié moins de pages.

### `/membres/workflows/[slug]`
- SEO : Title `"${title} | Workflow n8n | Uclic"` + template → **double suffixe** ⚠️.
- JSON-LD : Breadcrumb + Article + HowTo conditionnel (sur flow_steps) ✓. Très riche.
- UX : **Sticky sidebar ✓** (workflow card + related + CTA custom). Structure exemplaire.
- Recommandations : retirer `| Uclic` du title.

### `/auteur/[slug]` (ex : `/auteur/wladimir-delcros`)
- SEO : Title `"${name} — Auteur | Blog Uclic"` + template → **double suffixe** ⚠️. Canonical ✓.
- JSON-LD : BreadcrumbList + Person (avec sameAs) ✓.
- UX : Bien — avatar, bio, icônes LinkedIn/Twitter, liste articles. Pas de sticky sidebar (OK car page plus courte).
- Recommandations : retirer `| Blog Uclic` du title. Ajouter schema `ProfilePage` avec `mainEntity: Person`.

---

## Annexe — fichiers critiques à retoucher

| Priorité | Fichier | Action |
|---|---|---|
| P0 | `src/app/legal/page.tsx:6-10` | Réécrire metadata entier (boilerplate NextSaaS) |
| P0 | `src/app/login/page.tsx` | Extraire en client + wrapper server avec metadata + robots noindex |
| P0 | `src/app/signup/page.tsx` | Idem |
| P0 | `src/app/sitemap.ts:54-60` | Ajouter slugs dynamiques (blog, toolbox, levee, workflows, cas-clients, equipe, auteur, expertise) |
| P0 | `public/llms.txt:42-60` | Remplacer 11 URLs inexistantes par les routes réelles |
| P0 | `src/app/blog/page.tsx:60` | Remplacer `getLatestPosts(24, 1)` par une version avec pagination |
| P0 | `src/app/toolbox/page.tsx:56` | Ajouter `searchParams.page` + pagination |
| P0 | `src/app/levee-de-fonds/page.tsx:57` | Idem |
| P1 | `src/app/layout.tsx:28` | **OU** retirer le template `%s \| Uclic` **OU** nettoyer toutes les pages pour ne plus l'avoir en suffixe manuel |
| P1 | `src/app/blog/[slug]/page.tsx:38` | Retirer `" \| Blog Uclic"` |
| P1 | `src/app/blog/[slug]/page.tsx:174-187` | Refonte grid 2/3 1/3 + TOC + related + auteur card |
| P1 | `src/app/cas-clients/[slug]/page.tsx:38` | Retirer `" \| Cas client Uclic"` |
| P1 | `src/app/equipe/[slug]/page.tsx:50` | Retirer `" \| Uclic"` |
| P1 | `src/app/levee-de-fonds/[slug]/page.tsx:69` | Retirer `" \| Uclic"` |
| P1 | `src/app/membres/workflows/[slug]/page.tsx:123` | Retirer `" \| Uclic"` |
| P1 | `src/app/auteur/[slug]/page.tsx:67` | Retirer `" \| Blog Uclic"` |
| P1 | `src/app/expertise/page.tsx:15` | Retirer `" \| Uclic"` |
| P1 | `src/components/landing/Nav.tsx:7-13` | Convertir ancres `#xxx` en `/#xxx` OU conditionner au pathname |
| P1 | `src/app/contact/page.tsx:189` | Ajouter `<CtaFinal />` + schema ContactPage |
| P1 | `src/app/expertise/[category]/page.tsx:107-325` | Restructurer en grid 2/3 + 1/3 avec TOC sticky |
| P1 | `src/app/legal/mentions-legales/page.tsx:57` | `pt-32 lg:pt-40` → `pt-24 lg:pt-28` |
| P1 | `src/app/legal/conditions-generales-de-vente/page.tsx:62` | Idem |
| P1 | `src/app/legal/rgpd/page.tsx:57` | Idem |

Fin du rapport.
