# Uclic V2 — Mobile / Responsive QA Report

Date : 2026-04-25
Outil : Playwright (Chromium headless) sur http://localhost:3900
Mission : READ-ONLY (aucun fichier source modifié)

---

## 1. Synthèse

| Indicateur                 | Valeur                                |
|----------------------------|---------------------------------------|
| Pages testées              | 29                                    |
| Viewports testés           | 4 (360 / 768 / 1280 / 1920)           |
| Total tests page × viewport| 116                                   |
| Issues détectées (brut)    | 119                                   |
| Issues réelles (hors GTM)  | 7                                     |
| Screenshots produits       | 151 (`/tmp/qa-screenshots/`)          |

Viewports : `mobile-360` (iPhone SE), `tablet-768`, `laptop-1280`, `desktop-1920`.

### Bilan global : très propre

- **0 horizontal-overflow** sur l'ensemble des 116 combinaisons (excellent — aucune fuite mobile).
- **0 page HTTP non-200** (toutes les routes répondent).
- **0 erreur de navigation** (pas de timeout / crash).
- **0 H1 multiple**.
- **Footer** : badges France Num / RGPD / AI Act présents en desktop ET mobile (empilement vertical OK, hauteur 2279px sur 360 vs 1426px en desktop).
- **Hamburger nav mobile** : bouton `aria-label="Ouvrir le menu"` détecté, clic → 104 liens visibles dans le drawer (fonctionne).

---

## 2. Top issues (par criticité)

### P0 — Critique
*(aucune)*

### P1 — À corriger

1. **`/tarifs` — Aucun `<h1>` détecté** sur 3 viewports (mobile-360, tablet-768, laptop-1280). Présent sur desktop-1920 → probablement un H1 caché par classe responsive (`hidden md:block` ou inverse) au lieu d'un H1 unique avec classes responsive sur le texte. Impact SEO + accessibilité.
   - Screenshots : `mobile-360_tarifs.png`, `tablet-768_tarifs.png`, `laptop-1280_tarifs.png`, `desktop-1920_tarifs.png`.

2. **Home `/` — `<svg> attribute height: Expected length, "auto"`** (erreur récurrente sur les 4 viewports). Un composant SVG reçoit `height="auto"` ce qui est invalide en SVG (seules valeurs numériques ou unités). À chercher dans les composants Hero / illustrations de la home.

3. **Home `/` — Hydration mismatch** : `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties`. Probable cause : `typeof window !== 'undefined'`, `Date.now()` ou condition theme/locale dans un Client Component SSR. À investiguer (peut casser interactions React subtiles).

### P2 — À surveiller

4. **`/expertise/agence-seo` — 12 erreurs console / viewport (~48 total)** vs 8 ailleurs. Pic dû au tag Google Ads conversion (`googleadservices.com/pagead/conversion/637970941`) bloqué en local mais qui s'ajoute aux GTM standard. À vérifier que le tag de conversion est bien gardé derrière consentement en prod.

5. **Bruit GTM/Google Ads en console** : ~110 erreurs de fetch CORS (`google.com/ccm/collect`, `googleadservices.com`) sur quasi toutes les pages. Normal en dev local (CORS bloque les beacons), mais l'agent QA devrait les filtrer. **Pas un bug applicatif** — mentionné pour transparence.

6. **Tables `/meilleure-agence-growth` mobile** : aucune balise `<table>` HTML détectée sur la page → la "table" comparative est vraisemblablement construite en `div`/grid Tailwind. Pas de scroll horizontal natif possible. À vérifier visuellement sur le screenshot `_TABLES_meilleure-agence-growth_mobile.png` que le contenu s'empile proprement (visuellement OK sur la capture).

7. **Aucune `<img>` sans `alt`** détectée sur l'ensemble du site → bon point accessibilité. Note : seules les `<img>` sont vérifiées, les `next/image` insèrent des `img` aussi donc le check est valide.

---

## 3. Détail console errors (hors GTM bruit)

```
/  →  Error: <svg> attribute height: Expected length, "auto".
/  →  Hydration mismatch (server vs client HTML attributes)
```

Ces deux erreurs apparaissent uniquement sur `/`, sur les 4 viewports.

---

## 4. Recommandations

### À faire vite (P1)
- **Fix H1 `/tarifs`** : s'assurer qu'un seul `<h1>` existe et n'est pas masqué par `hidden md:block`. Préférer `<h1 className="text-3xl md:text-5xl">` plutôt que dupliquer le markup.
- **Fix SVG `height="auto"` sur `/`** : remplacer par `height={undefined}` (omettre) ou une valeur numérique. Probablement un composant illustration héro.
- **Investiguer hydration mismatch home** : chercher dans les Client Components de la home toute condition `typeof window`, `Date.now()`, `Math.random()`, ou lecture localStorage avant `useEffect`.

### À surveiller (P2)
- Vérifier en prod que les beacons GTM/Google Ads ne polluent pas la console (CORS résolu en prod réelle).
- Test manuel visuel des comparatifs `/meilleure-agence-growth` sur mobile : confirmer que les colonnes div s'empilent bien.
- Garder un œil sur `/expertise/agence-seo` (charge tracking la plus lourde).

### Bonnes pratiques observées
- Aucun overflow horizontal sur 116 tests → tailwind `overflow-x-hidden` ou design rigoureux : à maintenir.
- Toutes les images ont un `alt` → maintenu via `next/image` strict.
- Footer empile bien ses 3 badges réglementaires en mobile.
- Hamburger nav fonctionnel et accessible (`aria-label` FR).

---

## 5. Inventaire screenshots

Tous dans `/tmp/qa-screenshots/`.

### Naming pattern
- `{viewport}_{path}.png` → ex. `mobile-360_tarifs.png`, `desktop-1920_levee-de-fonds.png`
- Spéciaux :
  - `_NAV-mobile-open.png` — drawer hamburger ouvert
  - `_HAMBURGER_open.png` — vérification hamburger second pass
  - `_FOOTER_desktop.png` / `_FOOTER_mobile.png` — focus footer
  - `_TABLES_meilleure-agence-growth_mobile.png` — comparatifs mobile

### Couverture
- 29 pages × 4 viewports = 116 captures principales (+ extras footer/nav/tables = 151 fichiers totaux).

---

## 6. Méthode

Script : `qa-mobile.mjs` (supprimé après run). Logique :
1. Boucle viewport → pour chaque page : `goto` + `domcontentloaded` + 800ms wait.
2. Screenshot fullPage.
3. Mesure `documentElement.scrollWidth - clientWidth` (overflow horizontal).
4. Compte `<h1>`, `<img>` sans `alt`.
5. Capture erreurs console via listener.
6. Retry 1× sur erreur de navigation.

Script extra `qa-extra.mjs` : footer multi-VP, hamburger réel (clic + détection drawer), inspection tables comparatives.

Résultats bruts JSON : `/tmp/qa-mobile-results.json` + `/tmp/qa-extra.json`.
