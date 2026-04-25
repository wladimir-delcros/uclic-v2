# Uclic V2 — Audit Qualité Contenu SEO

**Date :** 25 avril 2026
**Périmètre :** 18 pages auditées sur `http://localhost:3900`
**Référentiel :** Google Quality Rater Guidelines (sept. 2025) + Helpful Content (intégré au core algo).
**Cible :** B2B scale-ups, agence Growth Marketing & IA.

---

## Score global de contenu : **68 / 100**

> Site solide sur la fondation E-E-A-T (auteur identifié, manifeste fondateur, schémas Org/Person bien posés, manifeste de différenciation puissant) mais **plombé par 4 catégories de problèmes graves** : compteurs cassés en home, pages "vitrines" amputées, blog placeholder/IA non éditorialisé, et expertise sub-pages génériques (low-effort SEO content).

| Composante | Score | Pondération | Contribution |
|---|---|---|---|
| Experience (1ère main) | 85/100 | 20 % | 17.0 |
| Expertise (technique) | 78/100 | 25 % | 19.5 |
| Authoritativeness | 60/100 | 25 % | 15.0 |
| Trustworthiness | 55/100 | 30 % | 16.5 |
| **Total E-E-A-T** | | | **68.0** |
| AI citation readiness | 62/100 | — | bonus/malus |
| Readability | 75/100 | — | OK |

---

## TOP 10 ISSUES — par sévérité

### 1. Compteurs cassés sur la home — **CRITIQUE**
La home affiche littéralement `0,0 Google · 0,0 Trustpilot · 0,00 Sortlist`, `× 0,0 contacts organiques moyens`, `+0 RDV qualifiés / mois`, `−0 % temps passé sur tâches manuelles`. Les variables de stats ne sont pas hydratées côté SSR. Effet désastreux : le visiteur lit *"0 résultats"* sur la page la plus consultée. **Impact CTR + bounce immédiat. À fixer en priorité 1.**
(Cf. lignes "0,0 Google · 0,0 Trustpilot" et "× 0,0 contacts organiques" du HTML rendu.)

### 2. Pages-clés sous le seuil minimum — **HAUT**
- `/cas-clients` : **327 mots** (min recommandé 500-800 pour un hub) — 5 cas listés sans extraits chiffrés visibles dans le hub.
- `/equipe` : **306 mots** — 4 profils listés sans bio courte, sans expertises, sans LinkedIn visible inline.
- `/contact` : **420 mots** — acceptable mais pourrait inclure FAQ "premier RDV", délai, process.
- `/expertise` (hub) : **1064 mots** — sous le seuil 1500 attendu pour un pillar.

### 3. Blog placeholder / déchets indexables — **HAUT**
3 articles à supprimer/désindexer :
- `/blog/article-sans-titre` → 260 mots, titre littéral "article sans titre", contenu sur "What's happening Google" tronqué de partout (`...`). **Honteux pour un site agence Growth.**
- `/blog/media-12` → **29 mots**. Brouillon publié.
- `/blog/hello-world-aux-origines-du-message-daccueil-en-programmation` → 434 mots, hors sujet pour un B2B scale-ups agency.

### 4. Articles blog probablement IA non éditorialisés — **MOYEN-HAUT**
- `/blog/comment-optimiser-la-gestion-administrative-de-votre-entreprise` → ton générique, hors persona scale-up B2B (parle à TPE).
- `/blog/dans-l-attente-de-votre-retour` → 3136 mots sur "formules de politesse mail" : complètement hors topical authority (zéro signal Growth/IA). C'est du content-farming.
- `/blog/le-product-led-growth-cest-quoi` → ton scolaire ("Mais qu'est-ce que c'est exactement ?"), zéro insight 1ère main, alors que Wladimir a 5 ans Head of Growth chez CodinGame en PLG. **Énorme E-E-A-T leak** : il devrait raconter, pas définir.

### 5. Sous-pages /expertise/* génériques — **MOYEN-HAUT**
`/expertise/agence-seo`, `/agence-paid-media`, `/agence-branding`, `/growth-marketing` : 1050-1450 mots chacune mais **structure copiée-collée** : "Pourquoi choisir notre agence X pour bâtir une stratégie…", H3 interchangeables, **aucun cas client cité dans la page**, aucun chiffre, aucun outil propriétaire. Marqueurs IA-content faible qualité (sept. 2025 QRG) :
- phrasés génériques répétitifs ("ultra-détaillé", "performant et durable", "expertise globale")
- structure répétitive d'une expertise à l'autre
- zéro signal d'expérience 1ère main
- zéro chiffre / benchmark / capture / methodology

### 6. Trustworthiness lacunaire — **MOYEN-HAUT**
- Pas de **mentions légales / RGPD / politique conf** liées depuis le footer visible (à vérifier `/legal`).
- **Aucun avis client cité textuellement** dans les pages auditées (juste les notes agrégées 4,9 / 4,96 / 4,3) — alors que le trust se joue là.
- Adresse postale absente (uniquement "Paris · Toulouse · Montpellier · Clermont-Ferrand" en libellé).
- N° SIREN, capital social, mentions obligatoires pour une SaaS / agence française : à vérifier dans `/legal`.
- **`/auteur/wladimir-delcros` renvoie 200 mais ne contient que `<!--...` (1 mot)** — la page auteur ne se rend pas, gros problème E-E-A-T (Google s'attend à une bio auteur richie).
- `/membres` → 404. Lien existe-t-il ? À nettoyer du sitemap.

### 7. Cas-clients individuels : E-E-A-T bon mais pas exploité — **MOYEN**
`/cas-clients/industrialiser-acquisition-b2b` (CodinGame) : **850 mots seulement**, raconté à la 1ère personne (excellent signal Experience), mention concrète d'outils (n8n, Captain Data, Dropcontact, Lemlist, Python scrapers Indeed). MAIS :
- aucun chiffre de résultat (RDV générés, % conversion, ROI)
- aucune timeline
- pas de testimonial client de CodinGame
- pas d'image / capture des dashboards
**On vend du "j'ai fait" sans preuve quantitative** — exactement ce que le manifeste home reproche aux concurrents.

### 8. AI citation readiness faible — **MOYEN**
Pour être citée par ChatGPT/Perplexity/Google AIO, une page a besoin de **faits quotables courts, structurés, datés**. Audit :
- Aucune section "Key facts" / "TL;DR" / "Chiffres clés" sur les pages stratégiques.
- Aucune table comparative (sauf `/tarifs` qui est OK).
- Bons points : 12-14 blocs JSON-LD par page, schémas Organization + ProfessionalService bien posés.
- FAQ schema absent sur `/audit`, `/tarifs`, expertise pages — manque énorme pour AIO.

### 9. Densité keyword limite stuffing sur expertise pages — **MOYEN**
`/expertise/agence-seo` : "référencement naturel" répété 6x dans les 1500 mots, "stratégie" 11x, "Google" 8x. Phrases à tournures redondantes ("Audit SEO complet, analyse de potentiel et identification des leviers de croissance sur Google" + "Audit SEO complet, analyse stratégique et feuille de route personnalisée" — 2 H3 quasi-identiques sur la même page).

### 10. Tone-of-voice excellent en haut de funnel, dilué en bas — **BAS**
- Home, /audit, /a-propos, /charte-freelance, /meilleure-agence : **excellent** copywriting ("Trois piliers. Une seule équipe. Zéro silo.", "Pas coder pour coder. Coder pour faire croître.", "Wladimir décroche en direct"). Voix forte, opinion, 1ère personne.
- Sub-pages expertise + 80% du blog : **voix générique d'agence SEO 2018**. Cassure de marque.

---

## E-E-A-T détaillé

### Experience — **85/100** (excellent)
- `/a-propos` : récit fondateur 1ère personne, étapes carrière vérifiables (CodinGame, StayHome, Muzzo, Obat).
- `/cas-clients/industrialiser-acquisition-b2b` : narrative 1ère main concrète (outils, déclic, méthode).
- `/charte-freelance` : ton manifeste, conviction.
- **Manque :** screenshots, captures dashboards, vidéos process, témoignages texte.

### Expertise — **78/100** (bon)
- Auteurs identifiés (Wladimir, Alexis, équipe) avec rôles précis.
- Stack technique cité (n8n, Python, Captain Data, Dropcontact, Lemlist, Next.js, agents IA).
- **Manque :** certifications affichées (Google Partner ? Meta Business Partner ?), publications externes, conférences, contenus invités, médias parlant d'Uclic.
- Sub-pages expertise n'apportent pas de preuve d'expertise — juste des affirmations.

### Authoritativeness — **60/100** (moyen)
- Mention "Activateur France Num" (officiel) : bon signal.
- Note agrégée 4,76/30 (Google 4,9 · Sortlist 4,96 · Trustpilot 4,3) — citée mais 30/30 max pas explicite, formulation confuse "4,76/30".
- Logos clients home : 8+ partners visibles (CoderPad, Breega, Isai, Summit Partner, etc.) — bon.
- **Manque :** backlinks externes affichés, presse ("vu dans"), articles signés ailleurs, awards, communauté/newsletter chiffrée.

### Trustworthiness — **55/100** (faible)
- Coordonnées : tel, email visibles. ✓
- HTTPS supposé en prod. ✓
- **Manques critiques :**
  - Page `/auteur/[slug]` cassée (1 mot rendu)
  - Pas de testimonials texte avec nom + photo + entreprise
  - Mentions légales pas liées depuis le footer audit
  - SIREN / capital / TVA absents des pages auditées
  - Pas de page "Sécurité / RGPD / Hébergement données"
  - 3 articles blog poubelle non désindexés

---

## AI Citation Readiness : **62/100**

| Critère | État |
|---|---|
| JSON-LD Organization | ✓ (présent partout) |
| JSON-LD Article + Author | ✓ |
| FAQ schema | ✗ (absent partout — gros manque) |
| HowTo schema sur /audit | ✗ |
| Service schema sur expertise | À vérifier |
| Faits quotables courts | Partiellement (home oui, expertise non) |
| Table comparative | ✓ /tarifs uniquement |
| Date publication / lastmod | ✓ |
| Auteur lié + bio | ✗ (page auteur cassée) |
| Stable URL canonicals | ✓ |

---

## Readability — **75/100**

- Phrases courtes, ponctuation rythmée, "—" et "·" comme respirateurs : très lisible niveau pro.
- FR pro B2B nickel sur pages stratégiques.
- Blog : phrases plus longues, voix passive sur posts IA.
- Manque sur expertise : bullets compactés trop denses ("Audit technique, optimisation sémantique, stratégie de contenu, netlinking, SEO local, intégration de l'IA" — 6 items en virgule sans hiérarchie).

---

## Recommandations priorisées

### P0 — Bloquant (à fixer cette semaine)
1. **Réparer les compteurs home** (0,0 Google, ×0,0 contacts, +0 RDV, −0 %) → variables non hydratées SSR.
2. **Désindexer / supprimer 3 articles poubelle** : `article-sans-titre`, `media-12`, `hello-world-aux-origines`.
3. **Réparer `/auteur/[slug]`** — bio Wladimir Delcros riche (parcours, conférences, articles, social, expertises). Idem Alexis, Florence, Tuka.

### P1 — Haute priorité (2 semaines)
4. **Étoffer `/cas-clients` hub** → 800-1200 mots : intro chiffrée, cards avec excerpts, filtres par expertise.
5. **Étoffer `/equipe`** → bios courtes (50-80 mots/personne), expertises clés, LinkedIn, citation perso.
6. **Réécrire les 5 cas-clients** avec : timeline, chiffres résultat (RDV, %, €), outils, screenshots dashboards, testimonial client texte.
7. **Réécrire les 3 articles "IA-suspects"** : `dans-l-attente-de-votre-retour` (à supprimer ou requalifier), `comment-optimiser-gestion-administrative` (à supprimer), `le-product-led-growth-cest-quoi` (Wladimir le réécrit en 1ère main avec ses 5 ans CodinGame).

### P2 — Moyenne priorité (1 mois)
8. **Différencier les sous-pages /expertise/*** : pour chaque, ajouter (a) un cas client embedded, (b) un workflow propriétaire visualisé, (c) 3 chiffres benchmark, (d) FAQ schema.
9. **Ajouter FAQ schema** sur /audit, /tarifs, /expertise/*. AIO va vous citer.
10. **Section "Vu dans la presse / Conférences / Publications"** sur /a-propos ou /equipe (Authoritativeness).
11. **Bloc testimonials texte** (3-5 clients nommés, avec photo + entreprise + LinkedIn) sur home + cas-clients hub.
12. **Trust footer** : SIREN, capital, mentions légales, RGPD, hébergeur, lien sécurité.

### P3 — Polish (2 mois)
13. Standardiser tone-of-voice : sub-pages expertise dans la même voix que /audit / /a-propos (1ère personne, opinion, chiffres).
14. Ajouter TL;DR / "Chiffres clés" en haut de chaque page pour AIO.
15. Audit interne maillage : depuis chaque expertise, lier 1 cas client + 2 articles blog pertinents.
16. Désindexer le `/blog/page/2+` si peu d'articles qualitatifs (préférer indexer 30 bons articles que 100 médiocres).

---

## Tableau récap par page

| Page | Mots | Min | Statut | Top issue |
|---|---|---|---|---|
| `/` | 4433 | 500 | ✓ qty | Compteurs cassés (0,0) |
| `/audit` | 1657 | 800 | ✓ | Manque FAQ schema |
| `/a-propos` | 1357 | 800 | ✓ | Excellent — réf manifeste |
| `/tarifs` | 1376 | 800 | ✓ | Excellent |
| `/contact` | 420 | 500 | ⚠ limite | Ajouter FAQ "premier RDV" |
| `/blog` | 1515 | 1500 | ✓ | OK |
| `/cas-clients` | 327 | 500 | ✗ | Sous-dimensionné |
| `/equipe` | 306 | 500 | ✗ | Pas de bios |
| `/expertise` | 1064 | 1500 | ⚠ | Hub trop maigre |
| `/charte-freelance` | 1532 | 800 | ✓ | Excellent |
| `/meilleure-agence` | 1918 | 1500 | ✓ | Bon |
| `/expertise/agence-seo` | 1458 | 800 | ⚠ | Générique IA-flavored |
| `/expertise/growth-marketing` | 1146 | 800 | ⚠ | Générique |
| `/expertise/agence-IA` | 1361 | 800 | ⚠ | Générique |
| `/expertise/agence-paid-media` | 1080 | 800 | ⚠ | Générique |
| `/expertise/agence-branding` | 1051 | 800 | ⚠ | Générique |
| `/blog/guide-claude-code-2026` | 7509 | 1500 | ✓ | Excellent (long-form) |
| `/blog/google-search-console-guide-complet-seo` | 3083 | 1500 | ✓ | Bon |
| `/blog/blogging-et-ia-2026` | 2648 | 1500 | ✓ | Bon |
| `/blog/le-product-led-growth-cest-quoi` | 1094 | 1500 | ⚠ | Sous-dimensionné + voix générique |
| `/blog/article-sans-titre` | 260 | 1500 | ✗ | À SUPPRIMER |
| `/blog/media-12` | 29 | 1500 | ✗ | À SUPPRIMER |
| `/blog/hello-world` | 434 | 1500 | ✗ | À SUPPRIMER (hors sujet) |
| `/auteur/wladimir-delcros` | 1 | 500 | ✗ | PAGE CASSÉE |
| `/cas-clients/industrialiser-acquisition-b2b` | 850 | 800 | ⚠ | Manque chiffres résultat |

---

## Conclusion

**Score 68/100** : Uclic V2 a un **socle exceptionnel** sur la voix de marque, le manifeste fondateur, la structure JSON-LD, et le copywriting des pages cœur (home, audit, à-propos, charte). C'est rare et précieux.

Mais 4 angles morts saignent le score :
1. **Bug technique** (compteurs 0,0 en home) qui décrédibilise immédiatement.
2. **Pages amputées** (équipe, cas-clients hub, page auteur) sur les axes E-E-A-T les plus regardés par Google.
3. **Pollution blog** (3 articles à supprimer + 3-4 articles IA non éditorialisés).
4. **Sub-pages expertise génériques** qui contredisent le positionnement "senior pilote, pas SDR".

**Si les 12 actions P0+P1 sont closes en 4 semaines, le score remonte à 82-85/100.** La fondation est là — c'est de l'exécution.
