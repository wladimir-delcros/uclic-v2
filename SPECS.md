# UCLIC V2 — Specs complètes

> Stack : Next.js 16 + Tailwind 4 + GSAP 3 + Lenis (smooth scroll)
> Repo : https://github.com/wladimir-delcros/uclic-v2
> Design system : DA Uclic (dark premium, fond noir, accent lime #E0FF5C)

---

## Architecture des sections (ordre)

| # | Section | Composant | Description |
|---|---------|-----------|-------------|
| 1 | **Navbar** | `Navbar` | Sticky, fond noir transparent → opaque au scroll, logo Uclic SVG, nav items (Services, Experts, Résultats, Pricing), CTA "Audit Gratuit" lime |
| 2 | **Hero** | `Hero` | Plein écran 100vh, headline punch centré, sous-titre squad-based, 2 CTAs (Audit Gratuit + Voir nos experts), bande stats (50+ startups / 4.9★ / réponse 48h) |
| 3 | **LogoBar** | `LogoBar` | "Ils nous font confiance" + défilement auto (marquee) logos clients |
| 4 | **ProblemSolution** | `ProblemSolution` | 2 colonnes : colonne gauche "Le problème" (5 douleurs), colonne droite "La solution Uclic" (5 bénéfices). Séparateur vertical ligne lime |
| 5 | **Process** | `Process` | 3 phases numérotées (01/02/03) : Audit 48h → Déploiement J+15 → IA J+30. Cards avec numéro, titre, description, icône |
| 6 | **Experts** | `Experts` | Grid 4 experts nommés : photo placeholder, nom, rôle, spécialité(s), réseau social LinkedIn. Wladimir / Alexis / Tuka / Florence |
| 7 | **Results** | `Results` | 2 case studies expandables : CodinGame (+300% MQL, -60% CAC) + B2B Cybersec (+45% taux réponse, x3 SQL). Métriques en grand, contexte, leviers actionnés |
| 8 | **Pricing** | `Pricing` | 3 plans : Starter 3k€ / Growth 5.5k€ (featured) / Scale 9k€. Toggle mensuel/annuel, comparaison features, CTA par plan |
| 9 | **FAQ** | `FAQ` | Accordion 5 questions clés sur le modèle squad, engagement, garanties, onboarding |
| 10 | **CTAFinal** | `CTAFinal` | Section plein écran dark, radial glow lime en fond, headline punch, CTA unique "Réserver un audit" |
| 11 | **Footer** | `Footer` | Logo, tagline, liens nav, liens légaux, LinkedIn Wladimir |

---

## Design tokens (DA Uclic)

```css
/* Couleurs */
--uclic-bg: #000000;
--uclic-accent: #E0FF5C;
--uclic-text-primary: #F5F5F1;
--uclic-text-muted: rgba(245, 245, 241, 0.4);
--uclic-text-subtle: rgba(245, 245, 241, 0.15);
--uclic-border: rgba(245, 245, 241, 0.08);
--uclic-surface: rgba(245, 245, 241, 0.04);
--uclic-surface-hover: rgba(245, 245, 241, 0.06);

/* Accents sémantiques */
--uclic-accent-hover: #cce84f;
--uclic-accent-glow: rgba(224, 255, 92, 0.2);
--uclic-accent-glow-strong: rgba(224, 255, 92, 0.4);

/* Typographie */
--uclic-font-heading: 'Absans', 'Inter', sans-serif;
--uclic-font-body: 'Inter', sans-serif;

/* Shadows / Glow */
--uclic-glow-lime: 0 0 40px rgba(224, 255, 92, 0.15);
--uclic-glow-lime-strong: 0 0 80px rgba(224, 255, 92, 0.25);
```

### Classes utilitaires Tailwind à créer

```css
.uclic-card        /* bg surface, border, rounded-2xl, hover lift */
.uclic-badge       /* bg accent/10, text accent, rounded-full, text-xs */
.uclic-btn-primary /* bg accent, text black, hover:bg-accent-hover */
.uclic-btn-ghost   /* border border/20, text-primary, hover:border-accent */
.uclic-section     /* py-24 md:py-32, px-4, max-w-7xl mx-auto */
.uclic-heading-xl  /* font-heading text-5xl md:text-7xl font-bold */
.uclic-heading-lg  /* font-heading text-3xl md:text-5xl font-bold */
.uclic-text-muted  /* text-[rgba(245,245,241,0.4)] */
```

---

## Animations requises (pour agent Animation)

### Hero
- `fade-in-up` staggeré : badge → headline → sous-titre → CTAs → stats (délai 0.1s entre chaque)
- Background : grain texture SVG noise en overlay (opacity 0.03)
- Optionnel : ligne de scan horizontale animée en arrière-plan

### Scroll-triggered (IntersectionObserver ou GSAP ScrollTrigger)
- Toutes les sections : `fade-in-up` avec `y: 40px → 0`, `opacity: 0 → 1`, `duration: 0.8s`
- Seuil d'activation : `threshold: 0.15`

### Stats count-up
- Déclenché au scroll sur la bande stats du Hero
- `CountUp` de 0 → valeur finale en 1.5s avec easing `power2.out`
- Chiffres : 50 (startups), 4.9 (étoiles), 48 (heures)

### Cards
- Hover : `translateY(-4px)` + `box-shadow: var(--uclic-glow-lime)` en 0.2s ease
- Transition `transform 0.2s ease, box-shadow 0.2s ease`

### Process cards
- Stagger reveal gauche-droite : chaque card avec `delay: index * 0.15s`
- Numéros : clip-path wipe de gauche à droite

### Pricing featured (plan Growth)
- Shimmer border animé : gradient rotatif sur le border
- `@keyframes shimmer-border` : rotation 360° en 3s loop

### CTA Final
- Radial glow lime : `radial-gradient` centré, pulsation scale 0.95↔1.05 en 4s loop
- Headline : split-text letter-by-letter reveal au scroll

### Navbar
- Background blur + opacity transition au scroll (0 → `backdrop-blur-md` après 80px scroll)

---

## Copy brief (pour agent Copywriter)

**Ton général** : Direct, sans bullshit, fondateur à fondateur. Pas de jargon agency. Résultats concrets, pas de promesses vagues. Style Growth Division mais en français, avec l'expertise data/IA propre à Uclic.

**Vocabulaire à utiliser** : "squad", "déploiement", "pipeline", "MQL", "SQL", "CAC", "taux de réponse", "scraping", "cold email", "audit"

**Vocabulaire à éviter** : "solutions innovantes", "accompagnement sur-mesure", "expertise reconnue", "partenaire de confiance"

---

### 1. Hero

**Headline (options à tester)** :
- Option A : "On scale votre acquisition. Sans bullshit."
- Option B : "Votre squad growth. Déployée en 15 jours."
- Option C : "50 startups ont triplé leur pipeline avec Uclic."

**Sous-titre** :
> Une squad d'experts growth (SEO, Ads, Outbound, Data & IA) activée en 48h. Des résultats mesurables dès le premier mois.

**Badge** : "Squad-based · Résultats J+30 · 50+ startups"

**CTA primaire** : "Réserver mon audit gratuit"
**CTA secondaire** : "Voir nos experts →"

**Stats bande** :
- `50+` startups accompagnées
- `4.9★` satisfaction client
- `48h` pour démarrer

---

### 2. LogoBar

**Label** : "Ils nous font confiance"

Logos : [placeholders à remplacer — CodinGame, clients B2B cybersec, SaaS FR]

---

### 3. Problem / Solution

**Titre colonne gauche** : "Le growth à l'ancienne, ça coûte cher."

**5 douleurs** :
1. Recruter un growth en CDI = 6 mois de process + 80k€/an
2. Une agence classique = livrables PowerPoint, pas de pipeline
3. Les freelances ne parlent pas entre eux — pas de synergie canal
4. Les outils IA mal configurés brûlent du budget sans résultat
5. Vous perdez 6 mois avant de savoir si ça marche

**Titre colonne droite** : "Uclic : une squad activée en 48h."

**5 bénéfices** :
1. Head of Growth + experts canal opérationnels en 2 jours
2. Stratégie data-driven + exécution immédiate sur chaque canal
3. SEO, Ads, Cold Email, Scraping, IA : tous alignés sur votre ICP
4. Reporting hebdomadaire avec KPIs business (MQL, SQL, CAC)
5. Résultats mesurables à J+30, optimisation continue à J+90

---

### 4. Process

**Titre section** : "De l'audit au pipeline en 30 jours."

**Phase 01 — Audit 48h**
> Titre : "Diagnostic complet en 48h"
> Description : On audite votre stack marketing, vos canaux actifs, vos ICP et vos données. On identifie les 3 leviers à fort impact immédiat.

**Phase 02 — Déploiement J+15**
> Titre : "Squad déployée, canaux actifs"
> Description : Les experts canal prennent en main leur périmètre. Campagnes live, sequences cold email, SEO on-page : tout est en production à J+15.

**Phase 03 — IA & Optimisation J+30**
> Titre : "IA intégrée, pipeline optimisé"
> Description : On branche les automatisations IA sur votre CRM et vos outils. Scoring leads, enrichissement, séquences intelligentes. Votre pipeline tourne en semi-autonome.

---

### 5. Experts

**Titre section** : "Votre squad, pas une agence anonyme."

**Wladimir Delcros — Head of Growth**
> Rôle : Stratégie, pilotage squad, LinkedIn & personal branding
> Spécialité : Growth loops, funnel B2B, +20M vues LinkedIn
> Badge : Fondateur

**Alexis Christine-Amara — VP Sales & Outbound**
> Rôle : Cold email, LinkedIn outbound, SDR process
> Spécialité : Séquences multicanal, enrichissement données, closing
> Badge : Outbound

**Tuka Bade — Head of Data & IA**
> Rôle : Scraping, automatisations, IA appliquée au growth
> Spécialité : Python, n8n, scoring leads, enrichissement IA
> Badge : Data & IA

**Florence Beckel — Creative & DA**
> Rôle : Direction artistique, landing pages, assets campagnes
> Spécialité : Ads créatives, conversion design, brand consistency
> Badge : Créatif

---

### 6. Results (Case Studies)

**Titre section** : "Ce qu'on a vraiment livré."

**Case Study 1 — CodinGame (B2C/B2B SaaS EdTech)**
> Contexte : Plateforme de coding challenges, pipeline MQL stagnant
> Leviers : SEO programmatique + LinkedIn Ads + séquences cold email sur DRH
> Résultats :
> - `+300%` MQL qualifiés en 90 jours
> - `-60%` CAC (de 180€ à 72€/MQL)
> - `×2.4` taux de conversion landing → démo

**Case Study 2 — Scale-up Cybersécurité B2B**
> Contexte : Cycle de vente long, cible RSSI et DSI très sollicitée
> Leviers : Scraping LinkedIn + enrichissement IA + séquences multicanal ultra-personnalisées
> Résultats :
> - `+45%` taux de réponse cold email
> - `×3` SQL générés par trimestre
> - `8 jours` délai moyen démo → proposition

---

### 7. Pricing

**Titre section** : "Transparent. Sans surprise."
**Sous-titre** : "Chaque plan inclut un Head of Growth dédié et un rapport hebdo. Pas de frais cachés."

**Starter — 3 000€/mois**
> Pour : Startups early-stage, 1 canal prioritaire
> Inclus :
> - 1 expert canal (SEO OU Outbound OU Ads)
> - Head of Growth 2j/mois
> - Audit initial + stratégie 90j
> - Reporting mensuel
> CTA : "Démarrer"

**Growth — 5 500€/mois** ⭐ _Recommandé_
> Pour : Scale-ups, 2-3 canaux actifs simultanément
> Inclus :
> - 2 experts canal (combo SEO+Outbound ou Ads+Outbound)
> - Head of Growth 4j/mois
> - Intégration IA basique (scoring, enrichissement)
> - Reporting hebdomadaire + accès dashboard
> - Slack dédié réponse < 4h
> CTA : "Choisir Growth"

**Scale — 9 000€/mois**
> Pour : Entreprises avec pipeline complexe, multi-ICP
> Inclus :
> - Squad complète (SEO + Ads + Outbound + Data & IA)
> - Head of Growth 8j/mois
> - Automatisations IA avancées (n8n, CRM, scoring)
> - Reporting hebdo + dashboard live
> - Slack + appel hebdo stratégique
> - SLA résultats J+30
> CTA : "Parler à Wladimir"

---

### 8. FAQ

**Q1 : Comment fonctionne le modèle squad ?**
> On assemble une équipe d'experts indépendants sélectionnés pour votre ICP et vos canaux prioritaires. Chaque expert gère son périmètre de manière autonome, coordonné par votre Head of Growth. Pas d'account manager qui relaie — vous travaillez directement avec les experts.

**Q2 : Quel est l'engagement minimum ?**
> Nous demandons 3 mois minimum pour voir des résultats mesurables. Le premier mois est consacré à l'audit et au déploiement. Les résultats arrivent à partir du mois 2. Après 3 mois, vous pouvez continuer mois par mois ou adapter la squad.

**Q3 : Comment se passe l'onboarding ?**
> Après signature, un call de 90 min avec Wladimir pour aligner la stratégie. Dans les 48h, audit de votre stack et de vos données. À J+7, présentation de la roadmap 90 jours et activation de la squad. À J+15, premiers canaux en production.

**Q4 : Qu'est-ce qui est inclus dans "l'intégration IA" ?**
> Selon le plan : scoring automatique de vos leads entrants, enrichissement des contacts (email pro, LinkedIn, technos utilisées), séquences de relance intelligentes via n8n, et connexion à votre CRM (HubSpot, Pipedrive, Salesforce). Pas de "ChatGPT pour rédiger des emails" — de la vraie automatisation opérationnelle.

**Q5 : Avez-vous des garanties sur les résultats ?**
> Sur le plan Scale, nous proposons un SLA résultats à J+30 (défini au kick-off selon votre baseline). Si les KPIs convenus ne sont pas atteints à J+90, nous prolongeons d'un mois offert. Nous ne promettons pas des chiffres magiques — on promet une exécution rigoureuse et de la transparence totale.

---

### 9. CTA Final

**Headline** : "Votre pipeline ne va pas se remplir tout seul."

**Sous-titre** : "Réservez un audit gratuit de 30 min avec Wladimir. On vous dit exactement ce qui bloque et les 3 actions à lancer cette semaine."

**CTA** : "Réserver mon audit gratuit"
**Note sous CTA** : "Gratuit · Sans engagement · Réponse sous 24h"

---

## Fichiers à créer (pour agent Dev)

```
src/
  app/
    page.tsx                    — Homepage (assemblage sections)
    layout.tsx                  — RootLayout Uclic (fonts, meta, dark forced)
    globals.css                 — Import tokens + base
  styles/
    variables.css               — Tokens Uclic (remplace template)
    uclic-tokens.css            — Classes utilitaires Uclic
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      LogoBar.tsx
      ProblemSolution.tsx
      Process.tsx
      Experts.tsx
      Results.tsx
      Pricing.tsx
      FAQ.tsx
      CTAFinal.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      AccordionItem.tsx
      CountUp.tsx
  utils/
    font.ts                     — Absans local + Inter Google
```

---

## Notes pour l'agent Dev

1. **Forcer le dark mode** : retirer `ThemeProvider` ou forcer `defaultTheme="dark"` — le site est 100% dark, pas de toggle
2. **Font Absans** : font custom locale, à placer dans `public/fonts/Absans-*.woff2` et déclarer en `@font-face` dans `globals.css`
3. **Grain texture** : SVG noise filter ou `url('/noise.png')` en overlay pseudo-element sur le body
4. **Suppression des pages template inutiles** : garder uniquement `app/page.tsx` pour la V1
5. **GSAP** : déjà installé dans le template — utiliser `useGSAP` hook de `@gsap/react` et `ScrollTrigger` plugin
6. **Lenis** : déjà configuré dans le template via `SmoothScrollProvider` — garder
7. **next.config.ts** : pas de modifications nécessaires pour la V1

---

## Checklist de livraison V1

- [ ] Navbar sticky responsive mobile/desktop
- [ ] Hero avec stats count-up
- [ ] LogoBar marquee
- [ ] ProblemSolution 2 colonnes
- [ ] Process 3 phases
- [ ] Experts grid 4 personnes
- [ ] Results 2 case studies
- [ ] Pricing 3 plans avec featured
- [ ] FAQ accordion
- [ ] CTA Final avec glow
- [ ] Footer
- [ ] Animations scroll-triggered sur toutes les sections
- [ ] Responsive mobile (breakpoint 768px minimum)
- [ ] Meta tags OG (titre, description, image)
- [ ] Favicon Uclic
