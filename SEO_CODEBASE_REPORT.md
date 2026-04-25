# SEO Codebase Audit — uclic-v2

Date: 2026-04-25  
Scope: code-source level (Next.js App Router metadata, schema, redirects, headers, sitemap, robots, manifest)

---

## Synthesis

**Score global : 86 / 100**

Solide foundation Next.js 15 App Router. `metadataBase`, JSON-LD site-wide riches (Organization, WebSite, LocalBusiness, SiteNavigationElement), sitemap dynamique multi-source Supabase, robots permissif AI-friendly (GPTBot/ClaudeBot/PerplexityBot listés explicitement), security headers complets, redirects 301 V1→V2 portés.

Gaps : quelques descriptions > 165 chars, incohérence canonical (legal en absolu vs reste en relatif), absence de `twitter` sur 5 pages clés (homepage, audit, a-propos, /legal, /legal/[slug]), manifest qui ne référence pas les PNG `icon-192/512` pourtant présents dans `/public`, breadcrumb schema dupliqué en inline dans 50 fichiers (pas de helper centralisé).

---

## Top 10 issues par priorité

### Critical (0)
Aucun bloqueur d'indexation détecté.

### High (3)

1. **Twitter Card manquante sur la homepage** — `src/app/page.tsx` n'a pas de bloc `twitter`. Hérite via metadata inheritance du layout, mais le `description` OG personnalisé (« Une équipe marketing complète… ») n'est pas reflété sur Twitter/X. Idem `audit/page.tsx`, `a-propos/page.tsx`, `legal/page.tsx`, `legal/[slug]/page.tsx`.
2. **Description homepage 179 chars** — `src/app/page.tsx:24-25` dépasse les ~160 chars recommandés ; Google tronque l'extrait. Idem `tarifs/page.tsx` (188), `rejoindre/page.tsx` (184), `presse/page.tsx` (169).
3. **Manifest.ts ne référence pas les PNG 192/512** — `src/app/manifest.ts` icons : seulement `logo.svg` + `favicon.ico`. Pourtant `/public/icon-192.png`, `/public/icon-512.png`, `/public/apple-touch-icon.png` existent. Lighthouse PWA et Add-to-Home-Screen Android dégradés.

### Medium (4)

4. **Canonical inconsistency** — pages `legal/cookies|cgv|rgpd|mentions-legales|politique-de-confidentialite` utilisent `${SITE_URL}/legal/...` (absolu) alors que toutes les autres utilisent des chemins relatifs. Avec `metadataBase` configuré, les relatifs suffisent — corriger les 5 fichiers `legal/*`.
5. **Pas de helper `breadcrumbSchema`** — `BreadcrumbList` est ré-implémenté inline dans 50 `page.tsx`. Risque de drift (URLs codées en dur, pattern @id non uniforme). Ajouter `breadcrumbListSchema(items)` dans `src/lib/schema.ts`.
6. **FAQPage commenté comme déconseillé mais toujours utilisé** — `src/lib/schema.ts:11-14` documente que FAQPage rich result est restreint depuis août 2023. Pourtant `src/lib/faq-schema.ts` génère encore du `FAQPage` et plusieurs pages (expertise, scraping, agence, rejoindre…) le consomment. Décider : retirer ou mettre à jour le commentaire.
7. **Sitemap : pas de regroupement par fichier** — un seul sitemap.xml retourne potentiellement plusieurs milliers d'URLs (agence programmatic + scraping départements). Limite Google : 50k URL / 50 MB. Acceptable aujourd'hui, mais à découper en sitemap-index si la prog SEO `agence/scraping` continue de scaler.

### Low (3)

8. **`/membres/profil` indexable mais redirigé** — `noindex` correct, mais OG/Twitter manquants. Cohérence symbolique seulement.
9. **`merci/page.tsx` sans OG/Twitter** — pas critique (noindex), mais bloque le partage manuel d'une URL de remerciement (rare cas).
10. **`hreflang` configuré uniquement au layout root** — `languages: { 'fr-FR': '/', 'x-default': '/' }`. Comme le site est mono-langue, c'est défendable. Mais si une version EN est planifiée, prévoir un helper par-page. Pas une issue active.

---

## Validations OK

- `metadataBase: new URL('https://uclic.fr')` — présent et cohérent
- `robots: index/follow` par défaut sur layout, `noindex,nofollow` correct sur `/login`, `/signup`, `/membres/profil`, `/merci`, `/auth/{callback,reset-password,update-password}`, `/not-found`
- Redirects 301 portés : `/about` → `/a-propos`, `/services/seo|sea|crm|data|automation` → `/expertise/...`, `/blog/author/*` → `/blog/auteur/*`, `/blog/category/*` → `/blog/categorie/*`, `/reset-password` → `/auth/reset-password`, `/home`, `/index`, `/index.html`
- Security headers complets : CSP avec allow-list précise tracking, HSTS prod-only, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (interest-cohort/browsing-topics off), COOP same-origin
- Cache headers : assets statics 1y immutable, sitemap/robots/llms.txt 1h must-revalidate
- Image domains : Supabase, media.licdn.com, static.uclic.fr — couvre tous les externals identifiés
- 4 schemas site-wide JSON-LD émis dans `<head>` du root layout (Organization+ProfessionalService, WebSite+SearchAction, LocalBusiness+Google rating 4.9/17, SiteNavigationElement)
- Schemas helpers exportés depuis `src/lib/schema.ts` (pas hardcodés en page sauf breadcrumb)
- `not-found.tsx` est un component App Router → Next renvoie HTTP 404, metadata `index: false, follow: true` correct
- Sitemap couvre **toutes** les routes Supabase dynamiques : blog, blog/categorie, blog/auteur, cas-clients, expertise (cat + cat/slug), levee-de-fonds, toolbox, equipe, workflows, auteur, scraping (5 niveaux), meilleure-agence, agence (programmatic), legal — avec pagination derive (blog, levee, toolbox)
- Pas de doublon « | Uclic | Uclic » : root `template: '%s'` au lieu de `'%s | Uclic'` (commentaire explicite ligne 38-40)
- Inline theme init avant first paint pour éviter FOUC dark/light
- Preload + preconnect + dns-prefetch correctement configurés (LCP texture, fonts.gstatic, supabase, static.uclic, GTM, GA, Meta, LinkedIn, PostHog)

---

## Tableau récap par page (échantillon clé)

| Page | metadata | canonical | OG | Twitter | schema additionnel | robots |
|---|---|---|---|---|---|---|
| `/` | OK | `/` (rel) | OK | absent (hérité) | WebPage + Service + ItemList | index/follow |
| `/a-propos` | OK | `/a-propos` | OK | absent | breadcrumb | index/follow |
| `/audit` | OK | `/audit` | OK | absent | breadcrumb | index/follow |
| `/contact` | OK | `/contact` | OK | OK | — | index/follow |
| `/tarifs` | desc 188c | `/tarifs` | OK | OK | — | index/follow |
| `/expertise` | OK | `/expertise` | OK | OK | breadcrumb | index/follow |
| `/blog` | OK | `/blog` | OK | OK | — | index/follow |
| `/blog/[slug]` | OK | absolu (article) | OK | OK | Article + breadcrumb (+ FAQ) | index/follow |
| `/cas-clients` | OK | `/cas-clients` | OK | OK | — | index/follow |
| `/equipe/[slug]` | OK | absolu | OK | OK | Person + breadcrumb | index/follow |
| `/legal/cookies` | OK | **absolu** | OK | OK | — | index/follow |
| `/legal/[slug]` | OK | rel | OK | absent | — | index/follow |
| `/login`, `/signup` | OK | rel | absent | absent | — | **noindex/nofollow** |
| `/auth/*` | OK | rel | absent | absent | — | **noindex/nofollow** |
| `/membres/profil` | OK | rel | absent | absent | — | **noindex/nofollow** |
| `/merci` | OK | absent | absent | absent | — | **noindex/nofollow** |
| `not-found` | OK | — | absent | absent | — | **noindex** |

---

## Recommandations concrètes par fichier

### `src/app/page.tsx`
- Ajouter bloc `twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] }`
- Raccourcir `description` à ~155c. Suggestion : « Agence Growth Marketing & IA pour scale-ups B2B. Pilotage senior, experts canaux, agents IA en production. Résultats en 90 jours. »

### `src/app/tarifs/page.tsx`
- Description 188c → 155c. Garder les 3 prix repères, supprimer les % de remise répétés.

### `src/app/rejoindre/page.tsx` & `src/app/presse/page.tsx`
- Réduire descriptions à 150-160c.

### `src/app/audit/page.tsx`, `src/app/a-propos/page.tsx`, `src/app/legal/page.tsx`, `src/app/legal/[slug]/page.tsx`
- Ajouter bloc `twitter` (peut être identique à `openGraph`).

### `src/app/manifest.ts`
- Ajouter `icon-192.png` (192×192, purpose 'any maskable'), `icon-512.png` (512×512), `apple-touch-icon.png` (180×180). Garder le SVG en fallback `purpose: 'any'`.

### `src/app/legal/{cookies,conditions-generales-de-vente,rgpd,mentions-legales,politique-de-confidentialite}/page.tsx`
- Remplacer `canonical: \`${SITE_URL}/legal/...\`` par `canonical: '/legal/...'` pour cohérence avec le reste du site (metadataBase fait le job).

### `src/lib/schema.ts`
- Ajouter `breadcrumbListSchema(items: Array<{name,url}>)` réutilisable. Migrer les 50 inline.
- Décider du sort de FAQPage : soit retirer le warning ligne 11-14 (FAQ encore consommé largement), soit auditer les pages qui l'utilisent et les nettoyer.

### `src/app/sitemap.ts`
- Quand la programmatic agence/scraping dépasse ~30k URLs cumulées, splitter en sitemap-index + sous-sitemaps par catégorie (déjà séparés `news-sitemap.xml` et `discover-sitemap.xml`, étendre).

### `next.config.ts`
- RAS, configuration solide. Optionnel : ajouter `Cross-Origin-Resource-Policy: same-origin` aux securityHeaders pour compléter l'isolement (peut casser embeds OK to test).
