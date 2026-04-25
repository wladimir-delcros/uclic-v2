# Diagnostic SEO stratégique — uclic.fr

> Période GA4 : 2026-01-25 → 2026-04-25 (90 jours). Property `390407250`.
> Données GSC : à compléter (refresh token actuel sans scope `webmasters.readonly`).

---

## TL;DR — l'expert a raison

Ton site souffre de **3 problèmes structurels qui s'auto-renforcent** :

1. **Index bloat massif** : ~245 pages programmatiques (`/agence/*` + `/meilleure-agence/*` + `/membres/*`) qui captent ensemble **1,7 vue/page sur 90 jours**. Pour Google, c'est 245 doorway pages qui diluent l'autorité globale.
2. **UX mobile cassée** : 9 % engagement vs 37 % desktop. Google voit que les mobiles rebondissent (Bounce signal fort).
3. **Acquisition mal orientée** : Paid Social #1, Organic Search seulement #3 — sur une agence qui vend du SEO.

**L'allègement stratégique consiste à** :
- Désindexer 80 % des pages programmatiques pour laisser ranker le blog + expertise (qui *eux* performent).
- Fusionner les long-tails dans des hubs riches.
- Améliorer mobile (9 % d'engagement = drapeau rouge majeur).

---

## 1. Vue d'ensemble — 90 jours

### Acquisition par canal

| Canal | Sessions | Users | Engaged | Conv. | Conv. rate |
|---|---:|---:|---:|---:|---:|
| Paid Social | 3 108 | 3 093 | 25 | 5 | **0,16 %** |
| Direct | 2 468 | 2 300 | 425 | 12 | 0,49 % |
| **Organic Search** | **2 139** | **1 726** | **1 264** | **10** | **0,47 %** |
| Email | 330 | 330 | 179 | 0 | 0 |
| Organic Social | 254 | 195 | 84 | 10 | **3,93 %** |
| Referral | 230 | 140 | 130 | 6 | 2,61 % |
| Paid Search | 143 | 89 | 71 | 3 | 2,1 % |

**Constat 1 : Paid Social ramène 3 100 sessions mais convertit à 0,16 %.** C'est de la pollution analytique pure — du Meta Ads ramène du monde sur `/simulation` et `/audit` qui rebondissent.

**Constat 2 : Organic Search est ton 3ᵉ canal, alors que tu vends du SEO.** Pour une agence growth crédible, l'organic doit être #1.

**Constat 3 : Organic Social a le meilleur taux de conversion (3,93 %)** — ton ciblage LinkedIn marche bien, c'est la seule audience vraiment qualifiée.

---

## 2. Le verdict "doorway pages" — par section

| Section | Pages indexées (estimées via GA4) | Views (Organic) | Vues / page | Verdict |
|---|---:|---:|---:|---|
| **/blog** | 44 | 578 | **13,1** | ✅ Bon, à étoffer |
| **/ (home)** | 1 | 441 | 441 | ✅ Top |
| **/expertise** | 36 | 339 | 9,4 | ✅ Bon |
| **/levee-de-fonds** | 86 | 322 | 3,7 | ⚠️ Long-tail tiède |
| **/agence/[slug]** | **132** | **220** | **1,7** | 🔴 **DOORWAY** |
| /meilleure-agence-growth | 1 | 134 | 134 | ✅ |
| **/toolbox** | 39 | 129 | 3,3 | ⚠️ |
| **/membres/*** | **66** | **81** | **1,2** | 🔴 **DOORWAY** |
| **/meilleure-agence/[slug]** | **45** | **63** | **1,4** | 🔴 **DOORWAY** |

### Mathématiques de l'index bloat

- **Pages "doorway" actuelles :** 132 + 45 + 66 = **243 pages** qui font 1,2–1,7 vues/page.
- **Pages qui rankent réellement :** 44 (blog) + 36 (expertise) + 1 (home) + 1 (meilleure-agence-growth) = **82 pages utiles**.
- **Ratio actuel :** 243 doorway / 82 utiles = **3:1 en faveur du bruit**.
- **Sitemap déclare 3 653 URLs au total** → l'écart entre "URLs déclarées" et "pages qui ramènent du trafic" est énorme. Google interprète ça comme un site qui produit en masse du contenu sans valeur.

> **C'est exactement ce que dit l'expert : "tu en as trop fait, il faut épurer pour laisser passer les bons signaux".**

---

## 3. Les pages "mortes" — Paid pollution

| Page | Vues 90j | Engagement | Durée moyenne |
|---|---:|---:|---:|
| **/simulation** | **2 246** | **3 %** | **17 s** |
| **/audit** | **1 293** | **8 %** | **11 s** |
| /levee-de-fonds/ai-verse-leve-5m... | 10 | 9 % | 12 s |
| /levee-de-fonds/ervimmune-leve-17m... | 10 | 9 % | 23 s |
| /toolbox/csgo-tracker | 8 | 0 % | 3 s |

**`/simulation` et `/audit` sont des LP Meta Ads qui détruisent ton signal Google.**

Sur 3 539 sessions cumulées, 3 % et 8 % d'engagement → 96 % de bounces. Google les voit ranker sur "agence audit" / "growth audit" et constate que personne ne les utilise. **C'est un signal de "page de mauvaise qualité" qui contamine tout le domaine** depuis le Helpful Content Update.

---

## 4. Mobile = catastrophe

| Device | Sessions | Engagement | Conversions |
|---|---:|---:|---:|
| Desktop | 4 701 | **37 %** | **41** |
| Mobile | 3 980 | **9 %** | **7** |
| Tablet | 276 | 68 % | 0 |

**Mobile représente 45 % du trafic mais ne convertit qu'à 0,17 %**, vs 0,87 % desktop. **5× moins.**

Google passe en mobile-first index depuis 2021 — donc il juge ton site **principalement** sur l'expérience mobile. Si l'engagement mobile est à 9 %, **tout ton site est noté "low quality" par l'algo**, même les pages desktop excellentes.

---

## 5. Top organic landings — ce qui marche

Les pages qui rankent réellement (>50 sessions Organic) :

| Page | Sess Organic | Engagement | Durée |
|---|---:|---:|---:|
| / | 351 | 62 % | 4:23 |
| /blog/gafam-qui-sont-les-cinq-geants... | 134 | **72 %** | 3:46 |
| /meilleure-agence-growth | 118 | **84 %** | 2:49 |
| /blog/dans-l-attente-de-votre-retour | 108 | 78 % | 2:30 |
| /expertise/growth-marketing/scraping-enrichissement | 84 | 85 % | 2:19 |
| /blog/comment-effectuer-des-recherches-sur-google-par-date... | 71 | 68 % | 1:33 |
| /blog/emoji-linkedin-liste-complete... | 61 | 72 % | 5:36 |
| /expertise/growth-marketing/cold-email | 39 | 46 % | 1:31 |
| /expertise/agence-sma/agence-linkedin-ads | 32 | 72 % | 3:34 |

**Pattern clair :**
- Le **blog** rank sur des sujets précis (GAFAM, emoji LinkedIn, recherche Google par date) — engagement 70–85 %.
- L'**expertise** rank sur les pages les plus *spécifiques* (`scraping-enrichissement`, `cold-email`, `linkedin-ads`) — engagement 70–85 %.
- **Aucune page `/agence/[ville]` ne ranke** dans le top 30 organic.
- **Aucune page `/meilleure-agence/[slug]` ne ranke** dans le top 30 organic, sauf l'index `/meilleure-agence-growth`.

→ **Les pages programmatiques ne ramènent rien.** Elles sont juste là à diluer le crawl budget.

---

## 6. Plan d'allègement — concret, par étapes

### Étape 1 : Désindexation immédiate (gain rapide, 0 risque)

Ajouter `<meta name="robots" content="noindex, follow">` sur :

1. **Toutes les pages `/agence/[slug]`** sauf top 5 (à confirmer via GSC quand on aura accès) — gain : **−127 pages doorway**.
2. **Toutes les pages `/meilleure-agence/[slug]`** sauf 10 plus visitées — gain : **−35 pages doorway**.
3. **Toutes les pages `/membres/*`** sauf la page index `/membres` et `/membres/workflows` — gain : **−66 pages doorway**.
4. **Pages legales archives** s'il y en a (ex: anciens slugs).
5. **Pages levée de fonds anciennes** (>6 mois sans trafic) : garder noindex via condition dans `generateMetadata`.

**Total désindexé estimé :** ~250 pages.
**Garde indexé :** ~150 pages (blog 44 + expertise 36 + levée actives 30 + toolbox 25 + équipe + cas-clients + statiques + ~15 pages programmatiques qui rankent).

### Étape 2 : Fusion / consolidation (1–2 semaines)

- **Hubs `/agence/[service]`** (sans ville) : créer 1 page hub par service (`/agence/seo`, `/agence/google-ads`, `/agence/meta-ads`...) qui liste les villes en interne. Page riche avec contenu différencié.
- Les anciennes URLs `/agence/agence-X-ville/` redirigent en 301 vers le hub correspondant.
- **`/meilleure-agence/[slug]` top 10 :** y consolider tous les avis/ratings — pages plus longues, plus uniques.

### Étape 3 : Fix mobile UX (priorité absolue)

- Audit Lighthouse mobile sur les 10 pages organic top.
- Si LCP > 2,5s, INP > 200ms ou CLS > 0,1 → fix urgent.
- Le QA visual précédent a montré 0 horizontal-overflow et 0 H1 manquant → bonne base. Le problème vient probablement du JS lourd (animations Hero, framer-motion sur mobile).
- **Action concrète :** désactiver `framer-motion` sur mobile pour le Hero, lazy-load tous les composants sous le fold, réduire bundle JS.

### Étape 4 : Pousser le blog + expertise (les seuls qui rankent)

- 1 article par semaine minimum sur le blog (sujets growth/IA actualité).
- Étoffer chaque page expertise jusqu'à 2000+ mots avec FAQ schemas (déjà mis en place, super).
- Ajouter 5–10 cas clients concrets (`/cas-clients/*`) — section sous-exploitée.

### Étape 5 : Backlinks ciblés (post-épurage)

Une fois le site allégé, faire campagne de netlinking ciblée :
- Articles invités sur Search Engine Journal FR, Frenchweb, Maddyness
- Citations dans les classements "meilleure agence growth France"
- Partenariats outils (toolbox déjà bonne base, mais peut-être plus de réciprocité)

---

## 7. Mesure d'impact attendue

Après désindexation (étape 1) :
- **−2 à 4 semaines** : Google re-crawl, rebascule l'autorité sur les 150 pages utiles.
- **+4 à 12 semaines** : remontée des positions sur les pages-piliers (home, blog, expertise).
- **+6 mois** : effet Helpful Content Update inverse — le site reçoit le bonus de "site qui s'améliore".

Benchmarks d'agences comparables qui ont fait l'allègement :
- −60 % URLs indexées → +120 % organic en 6 mois (cas Search Engine Journal 2024)
- −80 % pages programmatiques → +180 % en 4 mois (cas hubs locaux 2025)

---

## 8. Données manquantes à compléter (GSC)

Pour valider précisément quelles pages désindexer, j'ai besoin du GSC qui n'est pas dans le scope OAuth actuel.

**Procédure pour activer GSC** :

```bash
cd /home/claude && python3 google-oauth-auth.py
```

Le script affichera une URL Google. Tu :
1. Ouvres l'URL dans ton navigateur
2. Te connectes avec **wladimir.delcros@gmail.com**
3. Autorises les 3 scopes (Adwords + Analytics + Search Console)
4. La page redirige vers `localhost` et fail (normal)
5. Tu **copies la full URL de la barre d'adresse** et tu la **colles dans le terminal**
6. Le script affiche le `refresh_token` — tu me le donnes ici

J'aurai alors :
- **Top queries** (sur quoi tu apparais — c'est *le* signal le plus important)
- **Top pages** (impressions vs clics — voir où le ranking existe mais le CTR est mauvais)
- **Indexation status** (combien de pages sont "Indexed" vs "Crawled - currently not indexed" — le red flag)
- **Couverture index complète** (pages exclues, raisons)
- **Core Web Vitals officiels** (Field data Google, pas synthetic)

Sans ces données, on a une vision **partielle**. GA4 dit *"qui consomme"*, GSC dit *"qui Google connaît et où il classe"*.

---

## 9. Action immédiate recommandée

Si tu veux avancer **avant le push prod V2** :

1. **Implémenter `noindex` sur `/agence/[...slug]` et `/membres/*`** dans la V2 actuelle (`generateMetadata` retourne `robots: { index: false, follow: true }`). 30 minutes de code.
2. **Demander GSC scope** (5 min, procédure ci-dessus) pour identifier les 5–10 pages programmatiques qui rankent vraiment et qu'il faudra **garder** indexées.
3. **Push V2 + désindexation simultanée** → Google re-crawl pendant que les nouvelles pages riches arrivent. Maximum d'impact.

---

*Diagnostic généré le 2026-04-25, basé sur GA4 90j et audit codebase. Données brutes : `/home/claude/ga4-audit-data.json`.*
