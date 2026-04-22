# uclic V2 — Design Spec (DA de référence)

> Source de vérité : `Hero.tsx`, `OffreSection.tsx`, `DifferentSection.tsx` + `src/app/globals.css`.
> Objectif : permettre à n'importe quel dev de refactor une section pour qu'elle s'aligne à la DA **sans ambiguïté**.
> Toutes les valeurs ci-dessous sont **extraites du code**, pas inventées.

> Note : les tokens dans `src/styles/uclic-tokens.css` et `SPECS.md` sont **LEGACY** (ancienne DA lime `#E0FF5C` + Absans). La source vivante est `src/app/globals.css`. Ne pas utiliser `uclic-tokens.css` ni les tokens `--uclic-*`.

---

## 0 · Principes directeurs (résumé 1 ligne)

1. Fond sombre `--bg: #060403` (ou crème `#FAFAF5` en light), un seul accent vert `--accent: #6BFF95` / `#0F9347`.
2. Deux familles : **Inter** partout + **Instrument Serif italique** (via `var(--font-hand)`) pour le mot clé de chaque titre.
3. Chaque section commence par la **même formule** : filet horizontal + eyebrow accent majuscule + `<h2>` avec un bout italique accent.
4. Cards **bento `!rounded-none`** — c'est le pattern UNIQUE et CANONIQUE pour toute section contenant 2 à 4 cards principales narratives (offre, différenciation, méthode, tarifs, preuve, cas clients). `card-surface` est RÉSERVÉ à des usages secondaires (mini-trust-row, mur d'avis, container FAQ). Pas d'invention, pas de double canon.
5. Animations : `framer-motion`, ease `[0.22, 1, 0.36, 1]`, durée 0.6–0.8s, `whileInView` + `viewport={{ once: true, margin: '-60px' }}`.

---

## 1 · Design tokens

### 1.1 Couleurs (variables CSS — `:root` = dark par défaut)

| Rôle | Variable | Dark | Light |
|---|---|---|---|
| Fond page | `--bg` | `#060403` | `#FAFAF5` |
| Surface | `--surface` | `#15110F` | `#FFFFFF` |
| Surface raised (card bg) | `--surface-raised` | `#1a1512` | `#FFFFFF` |
| Card overlay | `--card` | `rgba(255,255,255,0.02)` | `rgba(10,8,7,0.015)` |
| Card elev 1 | `--card-elev-1` | `rgba(255,255,255,0.04)` | `rgba(10,8,7,0.025)` |
| Card elev 2 | `--card-elev-2` | `rgba(255,255,255,0.06)` | `rgba(10,8,7,0.04)` |
| **Accent** | `--accent` | `#6BFF95` | `#0F9347` |
| Accent soft (bg) | `--accent-soft` | `rgba(107,255,149,0.20)` | `rgba(15,147,71,0.12)` |
| Accent sur-CTA ink | `--accent-ink` | `#052010` | `#FFFFFF` |
| Ink (texte) | `--ink` | `#FFFFFF` | `#0A0807` |
| Ink muted | `--ink-muted` | `rgba(255,255,255,0.88)` | `rgba(10,8,7,0.92)` |
| Ink dim | `--ink-dim` | `rgba(255,255,255,0.60)` | `rgba(10,8,7,0.75)` |
| Border subtle | `--border-subtle` | `rgba(255,255,255,0.08)` | `rgba(10,8,7,0.08)` |
| Border strong | `--border-strong` | `rgba(255,255,255,0.16)` | `rgba(10,8,7,0.16)` |
| Hairline bright | `--hairline-bright` | `rgba(255,255,255,0.10)` | `rgba(10,8,7,0.10)` |

**Couleurs secondaires réservées (ne pas en abuser)** :
- `--teal: #056162` · `--brand-blue: #007AFF` (uniquement halos atmosphère dans `SectionAmbience variant="full"`).
- Rouge uniquement pour la colonne "Sans Uclic" contre-négative : `red-500`, `red-500/10`, `red-500/20`, `red-500/30` (miroir de l'accent vert).
- Emerald uniquement pour les logs terminal (`emerald-500`, `emerald-400`). Pas ailleurs.

**Règle d'or** : n'utilise **jamais** de valeurs hexadécimales hors des tokens ci-dessus. Toujours `var(--ink)`, `text-[color:var(--ink-muted)]`, etc.

### 1.2 Radii

| Usage | Valeur |
|---|---|
| Icon tile (44×44) | `rounded-xl` (12px) |
| **Cards bento (canon unique sections principales)** | **`!rounded-none`** (signature DA : filets droits) |
| `card-inner` (sous-éléments internes) | `20px` |
| `card-surface` (usages secondaires uniquement) | `24px` (défini dans la classe) |
| Pill, glass-pill, CTA, review-badge | `9999px` (full) |
| Blockquote Preuve | `rounded-xl` (12px) |

### 1.3 Ombres

```css
--shadow-card:       0 20px 40px -20px rgba(0,0,0,0.50);
--shadow-card-hover: 0 24px 48px -20px rgba(0,0,0,0.60);

/* Featured card glow (accent) */
shadow-[0_0_0_1px_rgba(107,255,149,0.12),0_30px_80px_-30px_rgba(107,255,149,0.25)]

/* Featured badge above card */
shadow-[0_10px_30px_-10px_rgba(107,255,149,0.6)]

/* Accent number tile (MethodeSection) */
shadow-[0_10px_30px_-10px_rgba(107,255,149,0.45)]
```

### 1.4 Opacités récurrentes sur l'accent

| Usage | Valeur |
|---|---|
| Texte accent | `text-[color:var(--accent)]` |
| Fond accent faible | `bg-[color:var(--accent)]/5` |
| Fond accent moyen | `bg-[color:var(--accent)]/10` |
| Border accent subtil | `border-[color:var(--accent)]/20` ou `/30` |
| Border accent featured | `border-[color:var(--accent)]/45` / `/60` |
| Halo glow derrière titre italique | `bg-[color:var(--accent)]/10 blur-2xl rounded-full` |

---

## 2 · Typographie

### 2.1 Familles (déclarées dans `@theme` et sur `<html>`)

```css
--font-display: var(--font-inter), 'Inter', system-ui, sans-serif;
--font-sans:    var(--font-inter), 'Inter', system-ui, sans-serif;
--font-hand:    var(--font-instrument-serif), 'Instrument Serif', 'Garamond', serif;
```

- **Inter** pour TOUT le texte (corps, titres, UI).
- **Instrument Serif italique** UNIQUEMENT pour le "mot accent" des titres h1/h2 (voir §4.2).
- Ne jamais utiliser Absans ni les tokens `--uclic-*` (legacy).
- **Reset global** sur h1–h5 : `font-weight: 500`, `letter-spacing: -0.02em`, `line-height: 1.1`.

### 2.2 Échelle

| Rôle | Classe(s) | Notes |
|---|---|---|
| **Eyebrow** (label avant h2) | `text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]` | + `<span className="w-6 h-px bg-[color:var(--accent)]" />` comme préfixe |
| **h1 hero** | `text-[clamp(32px,5vw,64px)] leading-[1.05] font-medium tracking-[-0.025em]` | Motif italique accent obligatoire |
| **h2 section** | `text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]` | Italique accent obligatoire |
| **h2 CTA final** | `text-[clamp(36px,5vw,60px)] font-display font-medium tracking-[-0.02em]` | Même recette |
| **h3 card** | `text-[28px] font-display font-medium leading-tight` (bento) / `text-xl font-display font-medium` (card-surface) / `text-2xl font-display font-medium` (tarifs) |  |
| **Subtitle / lead** | `text-[15px] text-[color:var(--ink-muted)]` (Offre/Different) · `text-[16px] lg:text-[17px] leading-[1.55]` (Hero) |  |
| **Body card desc** | `text-[15px] text-[color:var(--ink)] leading-[1.6]` (Offre/Different) · `text-[13px] text-[color:var(--ink-muted)] leading-relaxed` (Methode/Tarifs) |  |
| **Bullet** | `text-[13px] text-[color:var(--ink-muted)]` |  |
| **KPI number** | `font-display font-medium text-[28px] tracking-[-0.02em]` (Offre/Different) · `text-[26px]` (Methode) · `text-[34px]` leading-none (Preuve) · `text-[36px]` (Tarifs price) |  |
| **KPI label** | `text-[12.5px] text-[color:var(--ink-muted)] leading-tight` |  |
| **Caption footer / mention** | `text-[12px] text-[color:var(--ink-muted)]` ou `text-[13px]` |  |
| **Tag/pill** | `!text-[10.5px]` (Offre) · `!text-[11px]` (Methode/Preuve/Tarifs) |  |
| **Mono (timestamps, versions)** | `font-mono` + taille contexte (`text-[10px]` à `text-[11px]`, `uppercase tracking-[0.2em]` pour labels) |  |

### 2.3 Règle du "mot italique accent" (signature typographique)

Chaque h1 / h2 se termine (ou accentue) un fragment via ce snippet exact :

```tsx
<span className="relative inline-block font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
  le mot clé
  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
</span>
```

- C'est le **ET SEUL** usage de Instrument Serif.
- Toujours accompagné du halo flou derrière (`blur-2xl`).
- Ne jamais l'appliquer à du body ou à des boutons.

---

## 3 · Layout & rythme vertical

### 3.1 Container

```tsx
<div className="max-w-[1200px] mx-auto px-5 lg:px-10">
```

- Toujours `max-w-[1200px]`. Exception unique : FAQ en `max-w-[980px]` (pour resserrer la lecture).
- Padding horizontal : `px-5 lg:px-10` (20 / 40 px). **Jamais** `px-4` ou `px-6`.

### 3.2 Padding vertical des sections

| Type | Classes |
|---|---|
| Section standard | `py-24 lg:py-32` |
| Hero | `pt-14 lg:pt-20 pb-0 -mt-[76px]` (compense la nav) |
| Marquee logos | `pt-0 pb-10 border-b border-[color:var(--border-subtle)]` |
| Footer | `pt-20 pb-10 border-t border-[color:var(--border-subtle)]` |

### 3.3 Rythme interne d'une section

```
eyebrow + filet
  └─ mt-4  → h2 (+ sub en flex-row lg:items-end lg:justify-between)
      └─ mt-14 → grille principale bento (pas de gap, `!rounded-none`, dots aux intersections)
          └─ mt-14 → phrase de clôture "arrow down" (text-[13px] ink-muted, centrée)
```

### 3.4 Breakpoints

Tailwind par défaut, avec `md:` (≥768px) et `lg:` (≥1024px) largement utilisés. `sm:` apparaît uniquement dans CtaFinal et TarifsSection.

### 3.5 Filet de séparation top-of-section

Chaque section (hors Hero) ouvre avec :

```tsx
<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
```

(Section doit être `relative`.)

---

## 4 · Composants récurrents

### 4.1 `<EyebrowLabel>` — à extraire

Deux variantes observées :

**(A) Aligné à gauche (Offre, Different, Methode, Preuve, LinkedInProof)**

```tsx
<div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
  <span className="w-6 h-px bg-[color:var(--accent)]" /> Notre offre
</div>
```

**(B) Centré, filets des deux côtés (FAQ, Tarifs, CtaFinal)**

```tsx
<div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
  <span className="w-6 h-px bg-[color:var(--accent)]" /> FAQ <span className="w-6 h-px bg-[color:var(--accent)]" />
</div>
```

Squelette proposé :

```tsx
type EyebrowProps = { children: React.ReactNode; align?: 'left' | 'center' };
export const EyebrowLabel = ({ children, align = 'left' }: EyebrowProps) => (
  <div className={`${align === 'center' ? 'inline-flex' : 'flex'} items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]`}>
    <span className="w-6 h-px bg-[color:var(--accent)]" />
    {children}
    {align === 'center' && <span className="w-6 h-px bg-[color:var(--accent)]" />}
  </div>
);
```

### 4.2 `<SectionHeader>` — à extraire

Structure canonique (Offre, Different, Methode) :

```tsx
<EyebrowLabel>Notre offre</EyebrowLabel>
<div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
  <h2 className="text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[680px]">
    Partie standard.{' '}
    <span className="relative inline-block font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
      mot italique.
      <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
    </span>
  </h2>
  <p className="text-[color:var(--ink-muted)] max-w-[420px] text-[15px]">
    Support copy courte (1-2 phrases).
  </p>
</div>
```

Variante centrée (Tarifs/FAQ/CtaFinal) : wrapper en `text-center`, h2 sans `max-w`, `p` en `max-w-[640px] mx-auto mt-5/mt-6`.

### 4.3 CTA — boutons

Deux patterns officiels :

**Primary "glass-pill accent"** (Hero, Nav, Tarifs) :

```tsx
<a
  href="#..."
  className="glass-pill inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
  style={{
    background:
      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
  }}>
  <PlayCircle size={16} /> <span>Mon audit gratuit — 48h</span>
</a>
```

**Primary "plat accent"** (CtaFinal, Tarifs activer) :

```tsx
<a
  href="#..."
  className="inline-flex items-center gap-2 bg-[color:var(--accent)] text-black font-medium px-7 py-4 rounded-full hover:brightness-110 transition">
  <CalendarClock size={18} /> Réserver mon Growth Scan <ArrowRight size={16} />
</a>
```

**Secondary "pill"** (CtaFinal mail, Tarifs non-featured) :

```tsx
<a href="..." className="pill !py-4 !px-7 hover:border-[color:var(--border-strong)] transition">
  <Mail size={16} /> hello@uclic.fr
</a>
```

**Link minimal "Activer ..."** (Offre/Different/Preuve) :

```tsx
<a href="#tarifs" className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all self-start">
  Activer Inbound <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
</a>
```

Variante featured : `text-[color:var(--accent)]` au lieu du muted.

Classes CSS disponibles (définies dans `globals.css`, ne pas rebuild) : `.btn-accent-3d`, `.btn-glass`, `.cta-shiny-text`, `.glass-pill`, `.pill`, `.review-badge`.

### 4.4 Cards — canon UNIQUE "bento" + usages secondaires

> **Règle absolue** : toute section qui affiche **2 à 4 cards principales narratives** (offre, pilier, étape méthode, tarif, cas client, bénéfice, différenciation) DOIT utiliser le pattern bento ci-dessous. Pas de `card-surface` pour ces cas. L'audit visuel confirme que la DA de référence (Hero + OffreSection + DifferentSection) n'utilise qu'UN SEUL canon.

#### Canon "bento grid transparent + dots" (source : `OffreSection.tsx`, `DifferentSection.tsx`)

**Conteneur grid** (extrait exact) :

```tsx
<div className="mt-14 grid md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
```

- Pas de `gap` entre cells (grid "tight").
- `!rounded-none` sur le conteneur ET les cells (filets droits, signature visuelle).
- `items-stretch` pour uniformiser les hauteurs.
- Border externe fine `border-[color:var(--border-subtle)]`.

**Cells** (extrait exact Offre/Different) :

```tsx
<motion.article
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.6, delay: i * 0.1 }}
  className={`group p-8 flex flex-col relative overflow-hidden transition-colors duration-300 !rounded-none border-[color:var(--border-subtle)] light:bg-white ${
    i < items.length - 1 ? 'md:border-r' : ''
  } ${i !== items.length - 1 ? 'border-b md:border-b-0' : ''}`}>
  …
</motion.article>
```

- **Pas de `bg-*`** (fond transparent en dark). Seul `light:bg-white` pour le mode clair.
- Padding `p-8` (32px).
- Borders internes : `md:border-r` sur toutes les cells sauf la dernière + `border-b md:border-b-0` pour séparer les rows en mobile (stacking vertical) sans doubler la bordure en desktop.
- `overflow-hidden` + `relative` + `group` obligatoires.

**Dots SVG aux intersections** (extrait exact) :

```tsx
{[
  { left: '0%',     top: '0%'   },
  { left: '33.333%', top: '0%'  },
  { left: '66.666%', top: '0%'  },
  { left: '100%',   top: '0%'   },
  { left: '0%',     top: '100%' },
  { left: '33.333%', top: '100%' },
  { left: '66.666%', top: '100%' },
  { left: '100%',   top: '100%' },
].map((pos, idx) => (
  <span
    key={idx}
    aria-hidden="true"
    className="hidden md:block pointer-events-none absolute w-[14px] h-[14px] rounded-full bg-[#201E1D] light:bg-[#E7E6E3] z-[2]"
    style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
  />
))}
```

- Taille **exacte** : `w-[14px] h-[14px]` (14×14 px).
- Couleur **exacte** : `bg-[#201E1D]` en dark, `light:bg-[#E7E6E3]` en light (jamais `var(--accent)`, ce ne sont pas des accents).
- Placement : 4 coins externes + intersections internes (top + bottom de chaque colonne partagée).
- Offset : `transform: translate(-50%, -50%)` pour centrer le dot sur l'intersection.
- `z-[2]` pour passer au-dessus des borders. `hidden md:block` → invisibles en mobile (stacking → plus d'intersections).
- Pour 3 col → 8 dots (4 coins + 2 intersections top + 2 intersections bottom). Pour 2 col → 6 dots. Pour N col → `2 × (N+1)` dots.

**Composition interne d'une cell (ordre canonique)** :

1. **Icon tile top-left** (44×44 `rounded-xl`, translucide, jamais solide) :
   ```tsx
   <div className={`w-11 h-11 rounded-xl grid place-items-center border transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] ${
     featured
       ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent)]/30'
       : 'bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20'
   }`}>
     <Icon size={20} strokeWidth={1.75} />
   </div>
   ```
   - Fond translucide (`var(--accent-soft)` = `rgba(107,255,149,0.20)` en dark / `var(--card-elev-1)` = `rgba(255,255,255,0.04)`). **Jamais** de solid `bg-[color:var(--accent)]`.
   - Lucide, `size={20}`, `strokeWidth={1.75}`.
   - Variante négative (colonne rouge Different) : `bg-red-500/10 text-red-500 border-red-500/30`.

2. **Titre h3** : `mt-6 text-[28px] font-display font-medium leading-tight`.
3. **Description** : `mt-3 text-[15px] text-[color:var(--ink)] leading-[1.6]`.
4. **Illustration optionnelle** (mock SVG / organigramme) : `mt-10 mb-6 w-full`.
5. **Bullet list** (si section comparative) : `mt-6 space-y-2`, bullets `text-[13px]` avec `Check`/`X` `size={14} strokeWidth={2.5}`.
6. **KPI proof line** (gros chiffre accent) :
   ```tsx
   <div className="relative mt-8 flex flex-col items-start gap-1 pt-5 border-t border-[color:var(--border-subtle)]">
     <span className={`font-display font-medium text-[28px] tracking-[-0.02em] ${featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'}`}>× 2,4</span>
     <span className="text-[12.5px] text-[color:var(--ink-muted)] leading-tight">contacts organiques en 6 mois</span>
   </div>
   ```
7. **Chips / pills** (tags techno, optionnel) : `mt-5 flex flex-wrap gap-1.5` de `pill !text-[10.5px] !py-1 !px-2.5 !bg-[color:var(--card)]`.
8. **Lien "Activer X →" bottom** (`mt-auto pt-7`, s'aligne en bas de card) :
   ```tsx
   <a href="#tarifs" className={`relative mt-auto pt-7 inline-flex items-center gap-1.5 text-[13px] hover:gap-2.5 transition-all self-start ${
     featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink-muted)] hover:text-[color:var(--accent)]'
   }`}>
     Activer Inbound <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
   </a>
   ```

#### Variantes nommées du canon bento

Toutes partagent le MÊME conteneur, les MÊMES dots, les MÊMES cells. Seuls `grid-cols-*` et la logique "featured" changent.

**Variante A — bento 3 colonnes** (réf. `OffreSection`)
- `grid md:grid-cols-3`
- 8 dots (4 coins + 2 intersections top + 2 intersections bottom à 33.333 % et 66.666 %).
- Cell centrale typiquement `featured` via l'icon tile accent + KPI en accent. **Pas** de border accent sur la cell (le bento reste visuellement homogène en 3 col).

**Variante B — bento 2 colonnes** (réf. `DifferentSection`)
- `grid md:grid-cols-2`
- 6 dots (4 coins + 2 intersections à 50 %).
- Opposition narrative "Sans / Avec" : cell gauche en variante rouge (`bg-red-500/10 text-red-500 border-red-500/30` sur l'icon tile, bullets en `X` rouge), cell droite en variante accent (`bg-[color:var(--accent-soft)]` sur l'icon tile, bullets en `Check` accent).
- La cell featured reçoit le CTA "Démarrer avec nous" accent, l'autre n'en a pas.

**Variante "featured highlighted"** (pour `TarifsSection`, `PreuveSection` : une offre/un cas client se démarque)
- Même bento (2 ou 3 col) MAIS la cell mise en valeur reçoit, en plus :
  - Une surcharge de bordure : `!border-[color:var(--accent)]/60` (prioritaire sur la border interne neutre).
  - Un glow accent optionnel : `shadow-[0_0_0_1px_rgba(107,255,149,0.12),0_30px_80px_-30px_rgba(107,255,149,0.25)]` (repris du featured card-surface mais appliqué dans le bento — pas de lift vertical, la grille reste alignée).
  - Un badge top-center **à l'intérieur** de la cell (pas au-dessus du bento) :
    ```tsx
    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-[color:var(--accent)] text-black text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-[0_10px_30px_-10px_rgba(107,255,149,0.6)] whitespace-nowrap z-[3]">
      <Sparkles size={11} strokeWidth={2.5} /> Plus choisi
    </span>
    ```
    Micro-copy : `★ Plus choisi` (Tarifs) · `★ Résultat phare` (Preuve).
  - **Pas** de `md:-translate-y-2` : on casserait l'alignement de la grille bento. Le highlight vient de la border + du badge + du glow uniquement.
- Règle : **maximum 1 cell featured par bento**.

#### `card-surface` — usages secondaires TOLÉRÉS (liste close)

`card-surface` n'est **PLUS** un pattern de cards principales. Il reste autorisé UNIQUEMENT pour :

| Usage | Contexte | Justification |
|---|---|---|
| Mini-cards trust row | `CtaFinal` (3-4 micro-badges logos + chiffre) | cards non-narratives, compactes, ne portent pas le discours |
| Mini-cards avis LinkedIn | Mur social style Twitter-wall (LinkedInProof) | densité visuelle "flux", pas 2-4 piliers narratifs |
| Container FAQ | `FAQSection` via `card-surface !p-0` | agit comme container d'accordéon, pas comme card standalone |
| Sous-éléments internes à une cell bento | Ex. cards stagiaires dans `MockChaos` | déco interne à une cell, pas une section-level card |

#### ❌ INTERDIT (refacto à faire)

- `MethodeSection` (4 étapes) → **doit passer en bento 2 col × 2 rows ou bento 4 col** (pas `card-surface`).
- `TarifsSection` (3 offres) → **doit passer en bento 3 col**, l'offre populaire en variante featured.
- `PreuveSection` (3-4 cas clients) → **doit passer en bento 3 col**, le cas phare en variante featured.

Dès qu'une section contient 2 à 4 cards principales qui portent le discours (chaque card = un pilier narratif avec titre + description + KPI), c'est bento. Point.

#### Card inner compacte

Classe `card-inner` (radius 20px) : autorisée pour micro-blocs à l'intérieur d'une card bento (ex. sous-bloc KPI multi-lignes). Ne jamais utilisée seule au niveau section.

### 4.5 Icon tile (devant le titre d'une card bento)

Taille 44×44, radius `rounded-xl`. Variante featured/non-featured :

```tsx
<div className={`w-11 h-11 rounded-xl grid place-items-center border transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] ${
  featured
    ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent)]/30'
    : 'bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20'
}`}>
  <Icon size={20} strokeWidth={1.75} />
</div>
```

Variante "negative" (colonne rouge Different) : `bg-red-500/10 text-red-500 border-red-500/30`.

### 4.6 Badge "featured above card"

```tsx
<span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-[color:var(--accent)] text-black text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-[0_10px_30px_-10px_rgba(107,255,149,0.6)] whitespace-nowrap">
  <Sparkles size={11} strokeWidth={2.5} />
  Texte
</span>
```

### 4.7 Pills & tags (inline data)

- `.pill` (CSS) : capsule 13px, `bg: var(--surface)`, `border: var(--border-strong)`, `rounded-full`, `padding 6px 14px`.
- Surcharges usuelles : `pill !text-[10.5px] !py-1 !px-2.5 !bg-[color:var(--card)]` (tags Offre) / `pill !text-[11px] !py-1 !px-3` (Methode badge temps).
- Tag "accent" (Different MockHub) : `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[color:var(--accent)]/45 bg-[color:var(--accent)]/5` + texte `text-[10px] font-mono text-[color:var(--accent)] tracking-wide`.

### 4.8 KPI proof line (bas de card)

```tsx
<div className="relative mt-8 flex flex-col items-start gap-1 pt-5 border-t border-[color:var(--border-subtle)]">
  <span className={`font-display font-medium text-[28px] tracking-[-0.02em] ${featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'}`}>
    × 2,4
  </span>
  <span className="text-[12.5px] text-[color:var(--ink-muted)] leading-tight">contacts organiques en 6 mois</span>
</div>
```

### 4.9 Bullet list (check/X)

```tsx
<ul className="space-y-2">
  {items.map((b) => (
    <li className="flex items-start gap-2 text-[13px] text-[color:var(--ink-muted)]">
      <Check size={14} strokeWidth={2.5} className="text-[color:var(--accent)] mt-0.5 shrink-0" />
      <span>{b}</span>
    </li>
  ))}
</ul>
```

- Check vert pour positif, `X` rouge (`text-red-500`) pour négatif.
- Variante caractère unicode ✓ (Methode) : `<span className="text-[color:var(--accent)] mt-0.5">✓</span>`.

### 4.10 Divider / séparateur horizontal

```tsx
<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
```

Variante rouge (organigramme chaos) : `via-red-500/35`.

### 4.11 Phrase de clôture "arrow down"

Toutes les sections standard ferment par :

```tsx
<motion.p
  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
  className="mt-14 flex items-center justify-center gap-2 text-[13px] text-[color:var(--ink-muted)]">
  Phrase de transition vers la section suivante
  <motion.span
    animate={{ y: [0, 4, 0] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    className="text-[color:var(--accent)]">
    <ArrowDown size={14} />
  </motion.span>
</motion.p>
```

---

## 5 · Backgrounds, ambiances & effets

### 5.1 Ambiance standard d'une section interne

```tsx
<SectionAmbience variant="medium" />  // grid + 1 halo + noise
<SectionAmbience variant="full" />    // grid + 2 halos + teal + conic + particles + noise (réservé CtaFinal)
```

Source : `src/components/ui/SectionAmbience.tsx`.

### 5.2 Classes utilitaires d'ambiance (déjà dans `globals.css`)

| Classe | Rôle |
|---|---|
| `.grid-bg` | Grille lime 56px avec mask radial |
| `.grid-bg-dots` | Pattern de points |
| `.grid-bg-fine` | Grille 14px fine |
| `.noise-overlay` | Film de grain SVG, `mix-blend-mode: var(--noise-blend)` |
| `.halo`, `.halo-teal`, `.halo-blue` | Orbes floues breathing 7-9s |
| `.conic-glow` | Conic gradient accent/teal/blue 900px |
| `.particles` | Dots flottants |
| `.planet-bg` | Horizon planétaire (section dédiée) |
| `.crosshair`, `.scanline` | Détails atmosphériques |

### 5.3 Radial glow de section CTA (hero/cta-final)

```tsx
style={{ background: 'radial-gradient(100% 80% at 50% 0%, rgba(107,255,149,0.14) 0%, rgba(6,4,3,1) 70%)' }}
```

### 5.4 Spots ambiants (coins Hero) — pattern réutilisable

```tsx
<div
  aria-hidden="true"
  className="pointer-events-none absolute top-0 left-0 w-[720px] h-[520px] -translate-x-[25%] -translate-y-[20%] z-[1] mix-blend-screen light:mix-blend-multiply blur-2xl"
  style={{
    background:
      'radial-gradient(ellipse 45% 55% at 32% 38%, color-mix(in srgb, var(--accent) 24%, transparent) 0%, transparent 70%),' +
      'radial-gradient(ellipse 38% 42% at 62% 55%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 72%)',
  }}
/>
```

### 5.5 Fade-to-bg bottom

```tsx
<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--bg)] pointer-events-none z-10" />
```

---

## 6 · Animations & interactions

### 6.1 Framer Motion — defaults

```ts
// Apparition à l'entrée (cards, paragraphes)
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-60px' }}
transition={{ duration: 0.6, delay: i * 0.1 }}
```

- **Ease signature** : `[0.22, 1, 0.36, 1]` (cubic bezier "soft-out").
- Stagger cards : `delay: i * 0.1`.
- Hover lift card : `whileHover={{ y: -6 }}`.
- Hover icon tile : `group-hover:scale-[1.08] group-hover:rotate-[-4deg]` + `duration-300`.
- Arrow link : `group-hover:translate-x-0.5` sur l'icône + `hover:gap-2.5` sur le lien.

### 6.2 Transition CSS génériques

- `transition` (tout) sur tokens faibles.
- `transition-colors duration-300` pour cards bento.
- `transition-[border-color,box-shadow] duration-300` pour `card-surface`.
- `transition-transform` pour CTA `hover:scale-[1.02]`.

### 6.3 Animations CSS (définies dans globals.css — ne pas redéfinir)

| Keyframe | Usage |
|---|---|
| `halo-breathe` | Halos atmosphériques |
| `marquee` | `.marquee-track`, `.marquee-track-reviews` (60s/120s) |
| `pulse-soft` | `.scroll-dot`, indicateurs "live" |
| `cta-shiny` | `.cta-shiny-text` (3s linear infinite) |
| `cta-beam-spin` | Border rotatif `.btn-glass` |
| `neon-bg-flow-h` / `-v` | Connecteurs organigramme |
| `particles-float` | `.particles` |

### 6.4 `<AnimatedChars>` — pour titres hero

Reveal char par char avec blur-in. Utiliser uniquement dans les h1 du Hero (ou équivalent visuellement premier).

---

## 7 · Icônes

- **Pack unique** : `lucide-react`. Ne pas mélanger d'autres packs hors SVG inline pour brand (Google, Trustpilot, Sortlist uniquement dans Hero).
- **Taille canonique** : `size={14}` inline/link, `size={16}` CTA small, `size={20}` icon tile, `size={13}` eyebrow, `size={11}` badge featured.
- **Stroke** : `strokeWidth={1.75}` icon tile, `strokeWidth={2}` MockHub, `strokeWidth={2.5}` checkmarks bullets.
- **Couleur** : toujours `text-[color:var(--accent)]` (accent) ou `text-[color:var(--ink-muted)]` ou `text-red-500` (négatif).

---

## 8 · Dark / Light mode

- Dark est le défaut (`:root` = dark tokens). Light est activé via `.light` sur `<html>` (driver `next-themes`).
- Custom variants dispos :
  ```css
  @custom-variant dark  (&:where(.dark, .dark *));
  @custom-variant light (&:where(.light, .light *));
  ```
- En Tailwind, utiliser `light:` (ex : `light:bg-white`, `light:text-white`, `light:mix-blend-multiply`).
- **Règle** : tout usage de `bg-*` avec rgba sombre doit avoir son pendant `light:` (cf. dots bento `bg-[#201E1D] light:bg-[#E7E6E3]`).
- Les cards `card-surface` switchent automatiquement (`.light .card-surface { background: var(--surface); }`).

---

## 9 · Règles de composition d'une section

**Ouverture (dans cet ordre) :**

1. `<section className="relative py-24 lg:py-32 overflow-hidden">` (ou sans `overflow-hidden` si pas d'halo qui déborde)
2. Filet horizontal top (`absolute inset-x-0 top-0 h-px bg-gradient-to-r ...`)
3. `<SectionAmbience variant="medium" />` (optionnel mais recommandé)
4. Container `max-w-[1200px] mx-auto px-5 lg:px-10`
5. `<EyebrowLabel>...</EyebrowLabel>`
6. `mt-4` → `<h2>` avec fragment italique accent, en flex-row lg avec une support-copy à droite

**Cœur (mt-14) :**

- **Toujours** grid bento `!rounded-none` pour toute section à 2-4 cards principales narratives (offre, différenciation, méthode, tarifs, preuve, cas clients). Pas d'exception, pas de `card-surface` à ce niveau.
- Padding cells : `p-8` (32px).
- Borders internes : `md:border-r` (sauf dernière col) + `border-b md:border-b-0` (sauf dernière row).
- Dots 14×14 `#201E1D` / `light:#E7E6E3` aux 4 coins externes + intersections internes.
- Un seul "featured" par grid → `!border-[color:var(--accent)]/60` + badge top-center `absolute -top-3 left-1/2`. Pas de `md:-translate-y-2` (casserait la grille).

**Clôture (mt-14) :**

- Phrase de transition centrée + `<ArrowDown>` bounce accent.
- Ou bloc transparence (Tarifs) / Quote-like.

---

## 10 · Primitives à extraire (roadmap refacto)

| Primitive | Remplace du code dans | Justification |
|---|---|---|
| `<EyebrowLabel align="left\|center">` | 10 sections | Pattern dupliqué 10× à l'identique |
| `<SectionHeader eyebrow h2Plain h2Italic sub align>` | 8 sections | Structure h2 + italique accent + sub dupliquée |
| `<SectionShell id ambience="medium\|full\|none">` | Toutes | Filet top + container + section wrapper |
| `<KpiBlock value label featured>` | 4 sections | bloc "mt-8 flex-col gap-1 pt-5 border-t" |
| `<IconTile Icon featured variant="neutral\|accent\|negative">` | 5 sections | Pattern 44×44 + rotate-hover |
| `<FeaturedBadge>Sparkles + text</FeaturedBadge>` | 3 sections | `absolute -top-3 left-1/2 bg-accent` |
| `<SectionCloser>text + ArrowDown bounce</SectionCloser>` | 5 sections | Pattern phrase-arrow identique |
| `<BentoGrid columns={2\|3\|4}>` | 5+ sections (Offre, Different, Methode, Tarifs, Preuve) | **Canon unique** : grid `!rounded-none` + dots auto-calculés aux intersections + borders internes `md:border-r`/`border-b md:border-b-0` + prop `featuredIndex` pour la variante highlighted |
| `<AccentItalic>mot</AccentItalic>` | Tous les h1/h2 | Wrapper Instrument Serif + halo blur-2xl |

Squelette `<AccentItalic>` :

```tsx
export const AccentItalic = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
    {children}
    <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
  </span>
);
```

Squelette `<SectionShell>` :

```tsx
export const SectionShell = ({
  id, ambience = 'medium', children, className = '',
}: {
  id?: string;
  ambience?: 'medium' | 'full' | 'none';
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative py-24 lg:py-32 overflow-hidden ${className}`}>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
    {ambience !== 'none' && <SectionAmbience variant={ambience} />}
    <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">{children}</div>
  </section>
);
```

---

## 11 · Checklist d'unification (à cocher par section)

### Structure

- [ ] `<section>` est `relative`, `py-24 lg:py-32`, éventuellement `overflow-hidden`
- [ ] Filet top `h-px bg-gradient-to-r via-[color:var(--border-subtle)]` présent
- [ ] Container `max-w-[1200px] mx-auto px-5 lg:px-10` (pas `px-4`, pas `max-w-7xl`)
- [ ] Ambiance via `<SectionAmbience />` (medium par défaut, full pour sections conversion)

### Header de section

- [ ] Eyebrow : `text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]` + filet 6×1px accent
- [ ] Eyebrow couleur EST `var(--accent)` (pas `var(--ink)`, pas de blanc)
- [ ] h2 : `text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]`
- [ ] h2 contient **au moins un** fragment `<AccentItalic>` (Instrument Serif + halo blur-2xl)
- [ ] Sub-copy : `text-[15px] text-[color:var(--ink-muted)]` avec `max-w-[420px]` à droite

### Couleurs & tokens

- [ ] Aucun hex en dur hors tokens (`#E0FF5C` = INTERDIT, legacy — utiliser `var(--accent)`)
- [ ] Pas de `text-gray-400`, `bg-zinc-900`, etc. → `text-[color:var(--ink-muted)]`, `bg-[color:var(--surface)]`
- [ ] Accent partout cohérent : `var(--accent)`, jamais redéfini localement
- [ ] Light-mode counterparts présents (`light:bg-...`, `light:text-...`)

### Typographie

- [ ] Pas d'Absans, pas de tokens `--uclic-*`, pas de `.uclic-heading-*`
- [ ] Titres avec `font-display` ou hérités (Inter, medium 500)
- [ ] Instrument Serif (`var(--font-hand)`) UNIQUEMENT sur fragments italiques accent
- [ ] KPI number : `font-display font-medium text-[28px] tracking-[-0.02em]`

### Cards (bento par défaut — `card-surface` = exception justifiée)

- [ ] La section a 2-4 cards principales narratives ? → **OBLIGATOIREMENT bento** (pas `card-surface`).
- [ ] Conteneur bento : `grid md:grid-cols-{2|3} items-stretch border border-[color:var(--border-subtle)] !rounded-none relative` (pas de `gap-*`).
- [ ] Cells bento : `p-8 flex flex-col !rounded-none` + borders internes `md:border-r` (sauf dernière col) + `border-b md:border-b-0` (sauf dernière row). Pas de `bg-*` en dark (fond transparent), seulement `light:bg-white`.
- [ ] Dots 14×14 `bg-[#201E1D] light:bg-[#E7E6E3]` aux 4 coins externes + toutes les intersections internes, `hidden md:block`, `transform: translate(-50%, -50%)`.
- [ ] Icon tile 44×44 `rounded-xl` **translucide** (`bg-[color:var(--accent-soft)]` ou `bg-[color:var(--card-elev-1)]`), lucide `size={20} strokeWidth={1.75}`. Jamais solid accent.
- [ ] Featured dans bento : `!border-[color:var(--accent)]/60` + badge top-center "★ Plus choisi"/"★ Résultat phare" `absolute -top-3 left-1/2 -translate-x-1/2` bg-accent. **Pas** de `md:-translate-y-2`.
- [ ] KPI bas de card : `text-[28px] font-display font-medium tracking-[-0.02em]` + border-top `pt-5`.
- [ ] Lien "Activer X →" bottom : `mt-auto pt-7` + `hover:gap-2.5`.
- [ ] **`card-surface` uniquement** pour : trust-row CtaFinal, mur d'avis LinkedIn, container FAQ. Sinon → refacto en bento.

### Animations

- [ ] Framer Motion `initial` + `whileInView` + `viewport={{ once:true, margin:'-60px' }}`
- [ ] Ease `[0.22, 1, 0.36, 1]` (pas de `easeOut` par défaut)
- [ ] Stagger cards `delay: i * 0.1`, durée 0.6
- [ ] Icônes lucide avec strokeWidth cohérent (1.75 tile / 2 link / 2.5 check)

### Clôture

- [ ] Phrase de transition centrée + `<ArrowDown>` bounce accent — ou variante justifiée

### Responsive

- [ ] Mobile : single column par défaut, `md:grid-cols-2` / `lg:grid-cols-3`
- [ ] Padding vertical : `py-24 lg:py-32`, jamais plus / jamais moins

---

## Annexe — Liste exhaustive des classes CSS globales utilisables

Définies dans `globals.css`, prêtes à l'emploi, ne pas redupliquer en Tailwind :

**Layout / background** : `.grid-bg`, `.grid-bg-dots`, `.grid-bg-fine`, `.noise-overlay`, `.halo`, `.halo-teal`, `.halo-blue`, `.conic-glow`, `.planet-bg`, `.particles`, `.crosshair`, `.scanline`

**Surfaces** : `.glass`, `.glass-strong`, `.glass-amber`, `.card-surface`, `.card-inner`, `.nav-glass`, `.header-blur`, `.dashboard-mockup`

**Controls** : `.glass-pill`, `.nav-pill`, `.pill`, `.review-badge`, `.btn-accent-3d`, `.btn-glass`, `.cta-shiny-text`, `.logo-badge`, `.scroll-dot`, `.avatar-stack`

**Marquee** : `.marquee-wrap`, `.marquee-track`, `.marquee-track-reviews`, `.marquee-track-reverse`

**FX** : `.pulse-soft`, `.neon-line-h`, `.neon-line-v`, `.topbar-glow`, `.logo-white`, `.logo-themed`

---

*Dernière màj : dérivée de `Hero.tsx`, `OffreSection.tsx`, `DifferentSection.tsx`, `globals.css` — toute divergence doit être corrigée côté section, pas côté spec.*
