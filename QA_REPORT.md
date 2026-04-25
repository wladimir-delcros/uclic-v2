# QA Report — uclic V2 (2026-04-25)

Audit READ-ONLY contre dev server `http://localhost:3900` (Next.js 16 App Router, mode dev).
Screenshots : `/tmp/qa-screenshots/` (36 fichiers, viewports mobile 360 + laptop 1280).
Données brutes : `/tmp/qa-results.json`.

---

## 1. Status routes top-level

| Route | HTTP | Notes |
|---|---|---|
| `/` | 200 | OK |
| `/a-propos` | 200 | OK |
| `/agence` | 404 | Catch-all `[...slug]` only — pas d'index. À couvrir par redirect vers `/expertise` ou page liste. |
| `/audit` | 200 | OK |
| `/auteur` | 404 | `[slug]` only — pas d'index. Idem. |
| `/auth` | 404 | Sous-routes only (`callback`, `reset-password`). Normal mais devrait rediriger vers `/login`. |
| `/blog` | 200 | OK |
| `/cas-clients` | 200 | OK |
| `/charte-freelance` | 200 | OK |
| `/contact` | 200 | OK |
| `/equipe` | 200 | OK |
| `/expertise` | 200 | OK |
| `/feed` | 200 | OK |
| `/legal` | 200 | OK |
| `/levee-de-fonds` | 200 | OK |
| `/login` | 200 | OK |
| `/meilleure-agence` | 200 | OK (slow first hit ~2.6s en dev) |
| `/meilleure-agence-growth` | 200 | OK |
| `/membres` | 404 | Sous-routes only (`callback`, `reset-password`, `update-password`). Pas d'index. |
| `/merci` | 200 | OK |
| `/outils-gratuits` | 200 | OK |
| `/presse` | 200 | OK |
| `/rejoindre` | 200 | OK |
| `/rss` | 200 | OK |
| `/scraping` | 200 | OK |
| `/services` | 404 | Catch-all `[...slug]` only. |
| `/signup` | 200 | OK |
| `/simulation` | 200 | OK |
| `/tarifs` | 200 | OK |
| `/toolbox` | 200 | OK |

### Routes dynamiques testées

| Route | HTTP | Notes |
|---|---|---|
| `/blog/adobe-semrush-rachat-strategique` | 200 | OK |
| `/blog/auteur/wladimir-delcros` | 200 | OK |
| `/cas-clients/industrialiser-acquisition-b2b` | 200 | OK |
| `/expertise/agence-seo` | 200 | OK |
| `/expertise/agence-seo/audit-seo` | 200 | OK |
| `/expertise/agence-branding` | 200 | OK |
| `/levee-de-fonds/heliup-leve-16-m-...` | 200 | OK |
| `/toolbox/forecastr` | 200 | OK |
| `/equipe/wladimir` | 200 | OK |
| `/auteur/wladimir-delcros` | 200 | OK |
| `/meilleure-agence/youtube-ads-paris` | 200 | OK |
| `/meilleure-agence/bing-ads-lyon` | 200 | OK |
| `/agence/rev-ops-grenoble` | 200 | OK (slug = single segment, pas `seo/paris`) |
| `/agence/seo/paris` | 404 | Pattern `seo/paris` (2 segments) **n'existe pas** dans `getTopAgencePaths`. Le catch-all `[...slug]` est en place mais aucun path 2-segments correspond. |

---

## 2. Bugs détectés (par criticité)

### Bloquants
*Aucun*. Toutes les routes principales servent du HTML 200, hero/CTA/formulaires visibles.

### Sérieux

1. **H1 dupliqué sur la home page** (impact SEO + a11y)
   - `h1.textContent` = `"Les planètes s'alignent,Les\xa0planètes\xa0s'alignent,votre marketing aussi.votre\xa0mark…"`.
   - Source : `src/components/landing/Hero.tsx:448-465` — composant `AnimatedChars` rend à la fois le texte SR-only ET les chars animés visibles dans le même `<h1>`, donc `textContent` contient le texte 2x. Les screen readers liront « Les planètes s'alignent Les planètes s'alignent votre marketing aussi votre marketing aussi ».
   - Fix : envelopper le rendu visible dans `aria-hidden="true"` et garder une seule version SR-only, ou utiliser un node externe au `<h1>` pour les chars animés.

2. **SVG `height="auto"` invalide**
   - Console error sur toutes les pages utilisant `WaterfallBeacon` : `<svg> attribute height: Expected length, "auto"`.
   - Source : `src/components/ui/WaterfallBeacon.tsx:118`.
   - Fix : remplacer par `height="100%"` ou retirer (laisser le viewBox + width gérer).

3. **React state update warning sur `/blog` (laptop)**
   - Console : `Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component.`
   - À investiguer dans `BlogGrid` ou `Pagination` (effet déclenché pendant le rendu initial).

### Mineurs

4. **2 images sans `alt` sur la home**
   - `/scotch.webp` — élément décoratif → ajouter `alt=""` explicite.
   - `/logo-mark.svg` (dans le footer/badge) → ajouter `alt="Uclic"`.

5. **Routes index manquantes pour catch-all** : `/agence`, `/auteur`, `/services`, `/membres`, `/auth` retournent 404 si on tape l'URL nue. Ajouter au minimum un `redirect()` vers une page parente (ou créer un index minimal).

6. **`/blog` n'a pas de skip-link** (`a[href="#main"]`) alors que les 4 autres pages clés en ont un. Le `<main>` existe bien, c'est juste l'ancre qui manque.

7. **Bouton dark-mode toggle apparaît vide** sur le 1er paint laptop (capture `/blog__laptop-1280.png`) — icône Sun/Moon non hydratée immédiatement. Ajouter un fallback SSR (icône par défaut).

8. **404 silencieux sur 2-segments `/agence/seo/paris`** : le catch-all accepte mais `getAgencePageByPath` ne trouve rien → notFound. Si du SEO externe pointe vers ce pattern il faudrait soit générer ces pages soit redirect 301 vers `/agence/seo-paris`.

---

## 3. Responsive issues

| Page | Viewport | Issue | Sévérité | Capture |
|---|---|---|---|---|
| `/` | mobile-360 + laptop-1280 | Aucune issue visuelle, hero + CTA OK | OK | `home__*.png` |
| `/a-propos` | mobile-360 | Carte « Bonjour … » apparaît vide initialement (animation reveal trop tardive ou délai) — l'utilisateur voit une carte blanche vide pendant 1-2s | Mineur | `a-propos__mobile-360.png` |
| `/blog` | mobile-360 | OK ; cards bien empilées, images bien chargées | OK | `blog__mobile-360.png` |
| `/equipe` | mobile-360 | Bandeau `Compiling …` Next.js dev visible (artefact dev mode, pas un bug prod) | Info | `equipe__mobile-360.png` |
| `/meilleure-agence/youtube-ads-paris` | mobile-360 | Hero + CTA OK ; tableau comparatif a `overflow-x:auto` correct (scroll horizontal opérationnel) | OK | `full_mobile_meilleure-agence_youtube-ads-paris.png` |
| Tous (laptop-1280) | laptop | Toggle dark-mode (top-right) parfois rendu vide au 1er paint | Mineur | `blog__laptop-1280.png` |
| Toutes les pages testées | mobile + laptop | **Aucun débordement horizontal détecté** (`document.body.scrollWidth <= clientWidth` partout) | OK | — |
| `/contact` | mobile-360 | Formulaire bien aligné, champs clairs et touch-friendly | OK | `contact__mobile-360.png` |

---

## 4. Accessibility (a11y)

| Page | imgs sans alt | btns sans label | nav avec aria-label | h1 count | links sans texte | main | skip-link |
|---|---|---|---|---|---|---|---|
| `/` | 2 / 100 | 0 / 14 | 1 / 1 | 1 | 0 / 108 | 1 | OUI |
| `/audit` | 0 / 10 | 0 / 6 | 1 / 1 | 1 | 0 / 46 | 1 | OUI |
| `/blog` | 0 / 34 | 0 / 5 | **1 / 2** (un nav non labellé) | 1 | 0 / 75 | 1 | **NON** |
| `/contact` | 0 / 10 | 0 / 6 | 1 / 1 | 1 | 0 / 51 | 1 | OUI |
| `/meilleure-agence` | 0 / 10 | 0 / 5 | 1 / 1 | 1 | 0 / 447 | 1 | OUI |

**Issues a11y synthèse** :
- **H1 dupliqué** sur `/` (cf. bug sérieux #1).
- 2 imgs sans alt sur home.
- `/blog` : 1 nav sans `aria-label` (probablement la pagination), pas de skip-link.

Très bons résultats globaux : 0 bouton sans label, 0 lien sans texte sur 727 liens audités, structure h1/main correcte partout.

---

## 5. Performance (dev server, à interpréter avec précaution)

| Page | time_total | TTFB | size |
|---|---|---|---|
| `/` | 0.49s | 0.48s | 482 KB |
| `/audit` | 0.30s | 0.28s | 196 KB |
| `/blog` | 1.32s | 1.28s | 260 KB |
| `/meilleure-agence` | **2.65s** | 2.04s | 490 KB |
| `/tarifs` | 0.47s | 0.46s | 183 KB |
| `/contact` | 0.32s | 0.26s | 129 KB |
| `/cas-clients` | 0.34s | 0.30s | 130 KB |
| `/equipe` | 0.25s | 0.23s | 124 KB |

- `/meilleure-agence` est le plus lourd (490 KB HTML — beaucoup de liens internes vers les 400+ fiches villes/canaux). Vérifier en prod et envisager pagination ou facettes.
- Le HTML home est aussi conséquent (482 KB) — beaucoup de logos clients + copy. À benchmark Lighthouse en prod.

---

## 6. Top 10 recommandations actionables

1. **[Sérieux/SEO]** Corriger le H1 home : `AnimatedChars` génère le texte 2× dans le DOM accessible. Wrapper visuel dans `aria-hidden="true"` et garder un seul fallback SR-only.
2. **[Sérieux/Console]** Remplacer `height="auto"` par `height="100%"` dans `WaterfallBeacon.tsx:118`.
3. **[Sérieux/React]** Investiguer le warning « state update on unmounted component » sur `/blog` (probablement dans `Pagination` ou `BlogGrid`) — race condition au mount.
4. **[Mineur/a11y]** Ajouter `alt=""` sur `/scotch.webp` et `alt="Uclic"` sur `/logo-mark.svg` dans le hero/badge home.
5. **[Mineur/a11y]** Ajouter un skip-link sur `/blog` et un `aria-label` sur le second `<nav>` (pagination).
6. **[Mineur/UX]** 5 routes 404 (`/agence`, `/auteur`, `/services`, `/membres`, `/auth`) — créer une page index minimale ou `redirect()` côté serveur.
7. **[Mineur/UX]** Bouton dark-mode toggle vide au 1er paint : ajouter une icône SSR par défaut pour éviter le flash.
8. **[Mineur/UX]** Carte « Bonjour … » sur `/a-propos` mobile apparaît vide ~1s — accélérer ou supprimer le délai d'animation reveal sur mobile.
9. **[Perf]** Auditer `/meilleure-agence` (490 KB HTML) en prod : pagination de la liste agences ou lazy-loading des cards hors viewport.
10. **[SEO]** Vérifier que `/agence/seo/paris` (2-segments) n'est pas attendu par sitemap externe / backlinks anciens — sinon ajouter une 301 vers `/agence/seo-paris` (ou le slug 1-segment équivalent).

---

## Annexe — Méthodologie

- Routes : `curl -sI` HEAD requests.
- Responsive : Playwright Python 1.56 + Chromium headless 1208, viewports 360×800 et 1280×720, screenshots non-fullpage.
- A11y : DOM evaluation côté browser (imgs/buttons/navs/h1/links/main/skip-link).
- Perf : `curl -w` sur dev server (times indicatifs uniquement).
- Erreurs 401/secrets : tracking GA externe bloqué côté headless mais sans impact prod (juste console errors dev/headless).
