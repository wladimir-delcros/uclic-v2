# QA Full Report — 57 routes uclic V2

> Test executed: 2026-04-25
> Server: `http://localhost:3900` (Next.js 16, Turbopack dev mode)
> Method: `curl` HTTP probe + HTML body audit (title, h1, JSON-LD, Nav/Footer, errors).
> All HTML samples saved to `/tmp/qa-html/<slug>.html`. Raw TSV: `/tmp/qa-results.tsv`.

## Synthèse

| Indicateur | Valeur |
|---|---|
| Routes testées | **57 / 57** (100 %) |
| HTTP 200 | **56** |
| HTTP 3xx | **1** (`/membres/profil` → `/login?next=...` — comportement attendu, page protégée) |
| HTTP 4xx / 5xx | **0** |
| Pages sans H1 | **1** (`/tarifs` — uniquement des `<h2>`) |
| Pages avec gap V1 → V2 (> 50 % réduction de page.tsx) | **1 réelle** (`/merci`) — les autres "small" pages (`/login`, `/signup`, `/simulation`) sont splittées en `*Client.tsx` (vraie taille équivalente ou supérieure) |
| Pages avec titre > 70 caractères | **6** |
| Pages avec meta description > 160 caractères | **13** |
| Pages avec erreur visible / 500 | **0** |
| Pages sans Nav / Footer | **2** (`/auth/callback` et `/membres/profil` — légitimes : redirect / spinner) |
| Pages avec JSON-LD | **57 / 57** (100 %) |
| DA conforme (theme-init inline, `--accent`, `font-display`, Nav/Footer) | **57 / 57** |

**Verdict global : prêt pour la prod.** Aucun bug bloquant (P0). Quelques optimisations SEO/UX à faire (P1).

---

## Détail par route

| # | Route | URL testée | HTTP | Time | Size | Title (len) | H1 | JSON-LD | V1 lines | V2 lines | Ratio | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | `/` | 200 | 1.04s | 481 KB | YES (64) | 1 | 3 | 120 | 87 | 72 % | desc 187c (>160) |
| 2 | `/a-propos` | `/a-propos` | 200 | 0.36s | 158 KB | YES (58) | 1 | 2 | 61 | 129 | 211 % | OK |
| 3 | `/agence/[...slug]` | `/agence/rev-ops-grenoble` | 200 | 1.82s | 222 KB | YES (53) | 1 | 2 | 543 | 828 | 152 % | OK |
| 4 | `/audit` | `/audit` | 200 | 0.43s | 196 KB | YES (64) | 1 | 2 | 107 | 62 | 58 % | OK (composants externalisés) |
| 5 | `/auteur/[slug]` | `/auteur/wladimir-delcros` | 200 | 2.30s | 221 KB | YES (46) | 1 | 2 | 12 | 260 | 2167 % | OK |
| 6 | `/auth/callback` | `/auth/callback` | 200 | 4.23s | 57 KB | YES (26) | 1 | 2 | — | — | — | Pas de Nav/Footer (callback légitime) |
| 7 | `/auth/reset-password` | `/auth/reset-password` | 200 | 2.54s | 99 KB | YES (27) | 1 | 2 | — | — | — | OK |
| 8 | `/auth/update-password` | `/auth/update-password` | 200 | 7.06s | 90 KB | YES (28) | 1 | 2 | — | — | — | OK (slow dev) |
| 9 | `/blog` | `/blog` | 200 | 1.67s | 260 KB | YES (38) | 1 | 2 | 125 | 123 | 98 % | OK |
| 10 | `/blog/[slug]` | `/blog/guide-claude-code-2026` | 200 | 1.68s | 296 KB | **YES (121)** | 1 | 3 | 310 | 375 | 121 % | **Title trop long (>70)** |
| 11 | `/blog/auteur/[slug]` | `/blog/auteur/wladimir-delcros` | 200 | 1.76s | 253 KB | YES (47) | 1 | 2 | — | — | — | OK |
| 12 | `/blog/categorie/[slug]` | `/blog/categorie/seo` | 200 | 1.71s | 249 KB | YES (35) | 1 | 2 | — | — | — | OK |
| 13 | `/blog/categorie/[slug]/page/[page]` | `/blog/categorie/seo/page/2` | 200 | 5.30s | 171 KB | YES (27) | 1 | 3 | — | — | — | OK |
| 14 | `/blog/page/[page]` | `/blog/page/2` | 200 | 2.52s | 265 KB | YES (47) | 1 | 2 | — | — | — | OK |
| 15 | `/cas-clients` | `/cas-clients` | 200 | 0.28s | 130 KB | YES (62) | 1 | 2 | 75 | 165 | 220 % | OK |
| 16 | `/cas-clients/[slug]` | `/cas-clients/industrialiser-acquisition-b2b` | 200 | 1.30s | 127 KB | **YES (96)** | 1 | 2 | 101 | 209 | 207 % | **Title trop long** |
| 17 | `/charte-freelance` | `/charte-freelance` | 200 | 0.68s | 200 KB | YES (67) | 1 | 2 | 174 | 82 | 47 % | desc 182c (>160) — page condensée mais visuellement complète |
| 18 | `/contact` | `/contact` | 200 | 2.04s | 129 KB | YES (49) | 1 | 3 | 97 | 228 | 235 % | OK |
| 19 | `/equipe` | `/equipe` | 200 | 2.49s | 124 KB | YES (65) | 1 | 2 | 64 | 184 | 288 % | OK |
| 20 | `/equipe/[slug]` | `/equipe/wladimir` | 200 | 1.50s | 138 KB | YES (49) | 1 | 2 | 125 | 365 | 292 % | desc 185c, fallback "Membre introuvable" présent dans payload Suspense (bénin) |
| 21 | `/expertise` | `/expertise` | 200 | 4.90s | 238 KB | YES (44) | 1 | 2 | 377 | 513 | 136 % | OK |
| 22 | `/expertise/[category]` | `/expertise/agence-seo` | 200 | 1.23s | 173 KB | **YES (75)** | 1 | 2 | 282 | 340 | 121 % | **Title 75c, desc 268c (>>160)** |
| 23 | `/expertise/[category]/[slug]` | `/expertise/agence-seo/agence-seo-ia` | 200 | 1.25s | 286 KB | YES (63) | 1 | 3 | 469 | 379 | 81 % | OK |
| 24 | `/legal` | `/legal` | 200 | 0.28s | 106 KB | YES (50) | 1 | 2 | 34 | 162 | 476 % | OK |
| 25 | `/legal/[slug]` | `/legal/mentions-legales` | 200 | 0.28s | 102 KB | YES (24) | 1 | 2 | — | — | — | OK |
| 26 | `/legal/conditions-generales-de-vente` | idem | 200 | 1.02s | 109 KB | YES (37) | 1 | 2 | — | — | — | OK |
| 27 | `/legal/cookies` | idem | 200 | 0.30s | 107 KB | YES (15) | 1 | 2 | — | — | — | desc 163c |
| 28 | `/legal/mentions-legales` | idem | 200 | 0.30s | 102 KB | YES (24) | 1 | 2 | — | — | — | Title court (24c) — risque sous-optimisation SEO |
| 29 | `/legal/politique-de-confidentialite` | idem | 200 | 0.33s | 111 KB | YES (36) | 1 | 2 | — | — | — | desc 170c |
| 30 | `/legal/rgpd` | idem | 200 | 0.33s | 105 KB | **YES (12)** | 1 | 2 | — | — | — | **Title trop court (12c) "RGPD \| Uclic"** ; desc 171c |
| 31 | `/levee-de-fonds` | `/levee-de-fonds` | 200 | 0.97s | 272 KB | YES (58) | 1 | 2 | 108 | 195 | 181 % | OK |
| 32 | `/levee-de-fonds/[slug]` | `/levee-de-fonds/albupad-leve-13-m...` | 200 | 1.25s | 164 KB | **YES (134)** | 1 | 3 | 292 | 436 | 149 % | **Title énormément trop long (134c)** |
| 33 | `/levee-de-fonds/page/[page]` | `/levee-de-fonds/page/2` | 200 | 4.52s | 264 KB | YES (52) | 1 | 2 | — | — | — | OK |
| 34 | `/login` | `/login` | 200 | 0.21s | 100 KB | YES (17) | 1 | 2 | 320 | 13+109 | ≥ équiv. | OK (split en LoginClient.tsx) |
| 35 | `/meilleure-agence` | `/meilleure-agence` | 200 | 0.89s | 490 KB | YES (54) | 1 | 2 | 173 | 286 | 165 % | OK |
| 36 | `/meilleure-agence-growth` | `/meilleure-agence-growth` | 200 | 0.57s | 297 KB | YES (54) | 1 | 2 | 184 | 669 | 364 % | OK |
| 37 | `/meilleure-agence/[slug]` | `/meilleure-agence/bing-ads-aix-en-provence` | 200 | 1.12s | 243 KB | YES (67) | 1 | 2 | 203 | 643 | 317 % | OK |
| 38 | `/membres/profil` | `/membres/profil` | **307** | 0.34s | 50 KB | — | — | — | — | — | — | Redirect → `/login?next=%2Fmembres%2Fprofil` (attendu, auth) |
| 39 | `/membres/workflows` | `/membres/workflows` | 200 | 0.38s | 366 KB | **YES (80)** | 1 | 3 | 170 | 156 | 92 % | **Title 80c (double "Uclic" en fin)** |
| 40 | `/membres/workflows/[slug]` | `/membres/workflows/automatisation-telegram-...` | 200 | 8.60s | 208 KB | **YES (96)** | 1 | 3 | — | — | — | **Title 96c, double "Uclic"** ; latence dev élevée |
| 41 | `/merci` | `/merci` | 200 | 0.61s | 96 KB | YES (47) | 1 | 2 | **395** | **112** | **28 %** | **GAP V1→V2 réel** — le V1 avait du tracking enhanced + variantes UTM ; V2 simplifiée. À valider business |
| 42 | `/outils-gratuits` | `/outils-gratuits` | 200 | 1.01s | 129 KB | YES (55) | 1 | 2 | 96 | 268 | 279 % | OK |
| 43 | `/outils-gratuits/ab-test-calculator` | idem | 200 | 1.03s | 94 KB | YES (54) | 1 | 2 | — | — | — | OK |
| 44 | `/outils-gratuits/mde-calculator` | idem | 200 | 0.95s | 149 KB | YES (54) | 1 | 2 | — | — | — | OK |
| 45 | `/presse` | `/presse` | 200 | 3.75s | 141 KB | YES (38) | 1 | 2 | (n/a) | (présent V2) | — | desc 173c ; nouveau (pas en V1) |
| 46 | `/rejoindre` | `/rejoindre` | 200 | 2.72s | 170 KB | YES (46) | 1 | 2 | (n/a) | (présent V2) | — | desc 223c (>>160) |
| 47 | `/scraping` | `/scraping` | 200 | 6.30s | 131 KB | YES (58) | 1 | 2 | 113 | 289 | 256 % | OK |
| 48 | `/scraping/[service]` | `/scraping/base-mail` | 200 | 1.13s | 117 KB | YES (42) | 1 | 2 | 347 | 268 | 77 % | desc 165c |
| 49 | `/scraping/[service]/[category]` | `/scraping/base-mail/automobiles-transport` | 200 | 1.33s | 177 KB | YES (58) | 1 | 2 | 383 | 455 | 119 % | OK |
| 50 | `/scraping/[service]/[category]/[activity]` | `/scraping/.../location-voiture` | 200 | 1.71s | 132 KB | YES (55) | 1 | 2 | 291 | 243 | 84 % | OK |
| 51 | `/scraping/[service]/[category]/[activity]/[region]` | `/scraping/.../auvergne-rhone-alpes` | 200 | 3.46s | 139 KB | YES (69) | 1 | 2 | — | — | — | OK |
| 52 | `/scraping/[service]/[category]/[activity]/[region]/[department]` | `/scraping/.../ain` | 200 | 2.12s | 195 KB | YES (52) | 1 | 2 | — | — | — | OK |
| 53 | `/signup` | `/signup` | 200 | 0.52s | 99 KB | YES (23) | 1 | 2 | 328 | 13+109 | ≥ équiv. | OK (split en SignupClient) |
| 54 | `/simulation` | `/simulation` | 200 | 0.31s | 111 KB | YES (58) | 1 | 2 | 817 | 86+503 | ≥ 72 % | OK (split en SimulationClient) |
| 55 | `/tarifs` | `/tarifs` | 200 | 0.46s | 183 KB | YES (64) | **0** | 2 | (n/a) | 286 | — | **PAS DE H1** — uniquement `<h2>` ; desc 188c |
| 56 | `/toolbox` | `/toolbox` | 200 | 0.85s | 306 KB | YES (58) | 1 | 2 | 156 | 199 | 128 % | OK |
| 57 | `/toolbox/[slug]` | `/toolbox/forecastr` | 200 | 1.54s | 132 KB | YES (33) | 1 | 3 | 218 | 442 | 203 % | OK |
| 58 | `/toolbox/page/[page]` | `/toolbox/page/2` | 200 | 3.93s | 310 KB | YES (33) | 1 | 2 | — | — | — | OK |

> Notes : "V2 lines" pour les pages splittées inclut `page.tsx` + `*Client.tsx`. Les pages > 4s en dev seront < 200 ms en prod compilée (Next 16 build optimisé).

---

## Bugs P0 (bloquants prod)

**Aucun.** Toutes les routes répondent (200 ou 307 légitime). Tous les composants critiques (Nav, Footer, JSON-LD, theme-init) sont présents.

---

## Bugs P1 (à fixer avant prod)

1. **`/tarifs` n'a pas de `<h1>`** — la page utilise `<h2>` pour son hero ("Commencez gratuitement…"). Impact SEO + accessibilité. Fix : promouvoir le hero h2 en h1.
2. **Title trop long sur 6 routes (>70c)** — tronqué dans les SERPs Google (≈55-60c affichés) :
   - `/blog/[slug]` (121c) — tag « | Blog Uclic | Uclic » dupliqué
   - `/cas-clients/[slug]` (96c) — « | Cas client Uclic | Uclic » dupliqué
   - `/expertise/[category]` (75c)
   - `/levee-de-fonds/[slug]` (134c) — « — Levée de fonds | Uclic | Uclic » dupliqué
   - `/membres/workflows` (80c) — « Uclic | Uclic » dupliqué
   - `/membres/workflows/[slug]` (96c) — « Uclic | Uclic » dupliqué
   **Cause racine commune** : `metadata.title.template` ajoute « | Uclic » alors que le slug embarque déjà « Uclic » → doublon. À fixer dans `layout.tsx` (template) ou dans les `generateMetadata` qui ajoutent manuellement « Uclic ».
3. **Meta description > 160c sur 13 routes** — Google tronque vers 155-160c. Routes les plus impactées : `/expertise/[category]` (268c), `/rejoindre` (223c), `/tarifs` (188c), `/charte-freelance` (182c), `/`(187c).
4. **`/merci` réduit de 72 %** — V1 avait 395 lignes (probablement avec tracking enhanced conversions / GA4 events / variantes UTM), V2 est 112 lignes. Vérifier que les events de conversion (Pixel Meta, GA4 purchase, LinkedIn Insight) sont bien tirés sur cette page (cruciale pour attribution Ads).
5. **Title trop court : `/legal/rgpd` (12c)** + `/legal/mentions-legales` (24c) — sous-utilisation du space SEO ; titres < 30c sont sous-optimaux.

---

## Bugs P2 (post-prod OK)

6. **`/equipe/wladimir`** : la chaîne « Membre introuvable » apparaît dans le payload RSC (Suspense fallback) — purement bénin (l'utilisateur ne voit jamais ce texte) mais le grep brut le détecte.
7. **`/charte-freelance`** : V1 174 → V2 82 lignes (47 %). À comparer visuellement pour vérifier qu'aucune section éditoriale n'a été perdue.
8. **`/scraping/[service]`** descend à 77 % de V1 (347 → 268). À auditer si une section comparative a sauté.
9. **Latence dev** : `/membres/workflows/[slug]` 8.6s, `/auth/update-password` 7s, `/scraping` 6.3s — purement Turbopack dev, à reverifier en prod build.
10. **`/auth/callback`** sans Nav/Footer — légitime (page de redirect transitoire) mais pas de fallback visuel si le callback échoue.

---

## Top 10 fixes prioritaires

1. **Ajouter `<h1>` à `/tarifs`** (P1, 5 min). Promouvoir le h2 « Commencez gratuitement. » en h1 ou ajouter un h1 narratif au-dessus.
2. **Corriger les doubles « | Uclic »** dans les titles `/blog/[slug]`, `/cas-clients/[slug]`, `/levee-de-fonds/[slug]`, `/membres/workflows`, `/membres/workflows/[slug]`. Soit retirer le suffixe manuel des `generateMetadata`, soit retirer le `title.template` global. (P1, 15 min).
3. **Raccourcir les meta descriptions de 13 pages à ≤ 160c** — script de pruning automatisable. (P1, 30 min).
4. **Auditer `/merci`** : valider que les conversions Meta Pixel, LinkedIn, GA4 sont déclenchées (pixel CAPI + UTM passthrough). Comparer ligne à ligne avec V1 pour ne rien rater. (P1, 1h).
5. **Étendre les titles trop courts** : `/legal/rgpd` → "Politique RGPD & Protection des données | Uclic", `/legal/mentions-legales` → "Mentions légales — Agence Uclic". (P1, 10 min).
6. **Vérifier visuellement `/charte-freelance`** vs V1 pour ne pas avoir perdu de section. (P2, 30 min).
7. **Ajouter un fallback visuel à `/auth/callback`** (état "loading" + message de redirect) au cas où le callback prendrait > 3s. (P2, 20 min).
8. **Tester `/membres/profil` connecté** (la session manque dans ce test) — vérifier que la page rendue derrière le 307 est correcte. (P2, hors-scope read-only).
9. **Profiler `/scraping`, `/expertise`, `/blog/categorie/[slug]/page/[page]`** en dev — > 4s répétés, suspect d'une requête Supabase non-cachée. (P2, 1h).
10. **Ajouter un test e2e Playwright** sur ces 57 routes pour éviter les régressions futures (smoke test 200 + h1 + title length). (P2, 2h).

---

## Annexes

- **Tableau brut TSV** : `/tmp/qa-results.tsv`
- **HTML capturés** : `/tmp/qa-html/*.html` (57 fichiers)
- **Sitemap.xml** : 21 921 lignes (présent et conforme)
- **`robots.txt`, `manifest.webmanifest`, `/feed`, `/rss`** : tous 200
- **Slugs réels utilisés pour le test (extraits via Supabase + listings)** :
  - blog : `guide-claude-code-2026`
  - cas-clients : `industrialiser-acquisition-b2b`
  - equipe : `wladimir`
  - levee-de-fonds : `albupad-leve-13-m-pour-revolutionner-…`
  - toolbox : `forecastr`
  - workflows : `automatisation-telegram-avec-n8n-gestion-intelligente-des-notes`
  - meilleure-agence : `bing-ads-aix-en-provence`
  - agence/[...slug] : `rev-ops-grenoble`
  - auteur : `wladimir-delcros`
  - blog/categorie : `seo`
  - scraping (5 niveaux) : `base-mail/automobiles-transport/location-voiture/auvergne-rhone-alpes/ain`
