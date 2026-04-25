# Audit SEO Technique — Uclic V2 (localhost:3900)

**Date** : 2026-04-25
**Environnement** : Next.js 15 dev (Turbopack) — résultats à interpréter avec précaution pour CWV/cache.
**Score technique global** : **82/100**

---

## Synthèse Exécutive

| Catégorie | Statut | Score |
|---|---|---|
| Crawlability | PASS | 95/100 |
| Indexability | PASS | 90/100 |
| Security headers | PARTIEL | 75/100 |
| URL structure / Redirects | PASS | 95/100 |
| Mobile | PASS | 90/100 |
| Core Web Vitals (potentiel) | À VÉRIFIER prod | 70/100 |
| Structured Data | PASS | 95/100 |
| JS Rendering | PASS (SSR) | 90/100 |

---

## 1. Crawlability — PASS

- `robots.txt` : présent, bien structuré, Allow root, Disallow `/api/`, `/admin/`, `/_next/`, paramètres `utm_/fbclid/gclid`. Bots IA explicitement autorisés (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot).
- `sitemap.xml` : 1 fichier monolithique, **3 653 URLs** (~725 KB). Conforme aux limites 50k/50MB.
- Tags `<meta robots>` : `index, follow` ; `googlebot` avec `max-image-preview:large` — optimal.

**Issue MEDIUM** : sitemap monolithique. À 3 653 URLs c'est OK, mais vu la croissance (membres/workflows = milliers d'URLs), passer à un **sitemap index** segmenté (`sitemap-blog.xml`, `sitemap-workflows.xml`, `sitemap-leveedefonds.xml`) facilitera le monitoring GSC par cluster.

**Issue LOW** : référence à `https://uclic.fr/sitemap.xml` doit être dans robots.txt (à confirmer — non vu dans l'extrait).

---

## 2. Indexability — PASS

- Canonical homepage : `https://uclic.fr` (sans slash) — homogène, pointant prod.
- Canonical `/expertise`, `/blog` : self-référents, corrects.
- Pas de balises `noindex` détectées sur pages crawlées.
- Title homepage : 60 chars, optimisé. Description : 219 chars (légèrement long, idéal <160).
- 1 H1 par page (vérifié sur `/`, `/expertise`).

**Issue LOW** : meta description homepage tronquée en SERP (>160 chars).

---

## 3. Security Headers — PARTIEL (75/100)

Présents :
- CSP (très détaillée, bien scopée)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, mic, geo, FLoC, topics OFF)
- Cross-Origin-Opener-Policy: same-origin

**Issue HIGH** : **HSTS absent** (`Strict-Transport-Security`). À ajouter en prod : `max-age=63072000; includeSubDomains; preload`.
**Issue MEDIUM** : `X-XSS-Protection: 1; mode=block` est obsolète (déprécié par tous les navigateurs modernes) — peut être retiré, CSP couvre déjà.
**Issue LOW** : pas de `Cross-Origin-Embedder-Policy` ni `Cross-Origin-Resource-Policy`.

---

## 4. URL Structure / Redirects — PASS

- URLs propres, kebab-case, slugs FR explicites (`/levee-de-fonds/...`, `/cas-clients/...`).
- Redirect trailing slash : `/expertise/` → `/expertise` en **308 Permanent** (correct, préserve méthode).
- 404 propre sur page inexistante.
- Pas de redirect chain détectée.

---

## 5. Mobile — PASS

- Viewport : `width=device-width, initial-scale=1, viewport-fit=cover` — correct (notch iOS supporté).
- 93 images avec `loading="lazy"` — excellent.
- Theme-color light/dark défini.
- Pas de tap-target ni font-size évaluables sans rendering — à vérifier en Lighthouse mobile prod.

---

## 6. Core Web Vitals — À VÉRIFIER PROD

Inspection statique du HTML (en dev mode, bundle non minifié, HMR actif — non représentatif) :

**Risques LCP** :
- Préload fonts woff2 OK (rel=preload, crossorigin).
- HTML 121 KB (acceptable, mais après minification prod ~40 KB attendu).
- Vérifier que l'image hero est en `priority` Next/Image (pas vu de `<img>` LCP candidate dans le head).

**Risques CLS** :
- Hero utilise `clamp(32px,5vw,64px)` sur H1 + `inline-block` animé avec `opacity` par span — risque de shift si fonts swap. Vérifier `font-display: swap` + `size-adjust` (next-size-adjust meta présente, bon signe).

**Risques INP** :
- 7 blocs JSON-LD + nombreux scripts third-party (GTM, GA, FB, LinkedIn, PostHog, Calendly) chargés via CSP. Risque INP si chargement non différé.

**Action** : lancer PSI/CrUX sur prod pour mesures réelles.

---

## 7. Structured Data — PASS (excellent)

7 blocs JSON-LD détectés, types : `Organization` (implicite via LocalBusiness), `LocalBusiness` (avec GeoCoordinates, AggregateRating, OpeningHours), `WebSite` + `SearchAction`, `Person` (Wladimir, Alexis), `ContactPoint`, `ItemList`, `SiteNavigationElement`, `BreadcrumbList` probable.

**Issue LOW** : valider via Rich Results Test que `AggregateRating` a un nombre suffisant d'avis sourcés (sinon risque manual action Google).

---

## 8. JavaScript Rendering — PASS

- HTML rendu côté serveur (SSR Next.js App Router). Title, meta, H1, contenu structurel, JSON-LD tous présents dans le HTML brut.
- Crawlable sans exécution JS.

---

## TOP ISSUES Priorisées

| Priorité | Issue | Action |
|---|---|---|
| **HIGH** | HSTS manquant | Ajouter `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` côté prod (next.config / Cloudflare) |
| **MEDIUM** | Sitemap monolithique 3.6k URLs | Migrer vers sitemap index segmenté par type de contenu |
| **MEDIUM** | X-XSS-Protection obsolète | Retirer (CSP couvre) |
| **MEDIUM** | Meta description homepage >160 chars | Raccourcir à 150-155 chars |
| **LOW** | Sitemap pas référencé dans robots.txt (à confirmer) | Ajouter `Sitemap: https://uclic.fr/sitemap.xml` |
| **LOW** | AggregateRating JSON-LD | Vérifier sourcing avis |
| **LOW** | CWV non mesurés | Audit Lighthouse + CrUX prod |

---

## Recommandations d'Implémentation

1. **HSTS** dans `next.config.ts` :
   ```ts
   { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
   ```
2. **Sitemap index** : créer `app/sitemap.ts` retournant un index avec routes split par type (`generateSitemaps()` Next.js 14+).
3. **Confirmer prod** : relancer cet audit sur `https://uclic.fr` (build prod) pour évaluer minification, cache, CWV réels.
