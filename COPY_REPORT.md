# Audit Copywriting + SEO — Uclic V2

Date : 2026-04-25
Scope : metadata SEO, copywriting key pages, alt texts, liens internes.
Statut : audit READ-ONLY + fixes mineurs appliqués.

---

## 1. Metadata SEO — fixes appliqués

| Page | Problème | Fix appliqué |
|---|---|---|
| `src/app/layout.tsx` (DEFAULT_DESCRIPTION) | description = 179 caractères, dépasse la limite 160 | Réécrite à 144 car. : "Agence Growth Marketing & IA pour scale-ups B2B. Pilotage senior, experts canaux, agents IA en production. Résultats mesurables en 90 jours." |
| `src/app/login/page.tsx` | description = 34 car., trop courte | Réécrite à 130 car. (mention workflows + agents IA + Slack collectif) |
| `src/app/signup/page.tsx` | description = 75 car., trop courte | Réécrite à 132 car. |
| `src/app/legal/page.tsx` | title = 20 car., trop générique ("Informations légales") | "Informations légales — Mentions, CGV, RGPD" (43 car.) |

## 2. Metadata SEO — pages saines (aucune action)

Toutes les pages suivantes ont `title` (≤ 60), `description` (130-160), `alternates.canonical`, `openGraph` complet. La plupart ont aussi `twitter` :

- `/` (60 car. — borderline mais acceptable)
- `/audit`, `/contact`, `/a-propos`, `/tarifs`, `/expertise`, `/equipe`, `/blog`, `/cas-clients`
- `/levee-de-fonds`, `/scraping`, `/toolbox`, `/outils-gratuits`, `/presse`
- `/rejoindre`, `/charte-freelance`, `/merci`, `/simulation`
- `/meilleure-agence`, `/meilleure-agence-growth`

## 3. Metadata SEO — points à revoir manuellement

| Page | Observation |
|---|---|
| `/` (home) | Title 60 car. : à la limite de troncature SERP Google sur mobile. Optionnel : raccourcir à "Uclic — Agence Growth Marketing & IA · 90 jours" (~50 car.). |
| `/expertise` | Pas de `twitter.images` explicite. Présent via inheritance OG mais à vérifier. |
| `/blog` | Title court (26 car.) — OK car le template `%s | Uclic` ajoute le suffixe. |
| `/audit` | OpenGraph description (180 car.) légèrement longue. |
| Pages dynamiques (blog/[slug], cas-clients/[slug], expertise/[category]/[slug], etc.) | Non auditées en détail — vérifier que `generateMetadata()` produit bien des descriptions 130-160 car. |

## 4. Copywriting — observations key pages

### `/` (Home)
- H1 : "Les planètes s'alignent, votre marketing aussi." — accrocheur, signature
- Sub : clair (Inbound, outbound, agents IA, dev — Growth Lead senior pilote)
- CTA : "Mon audit gratuit — 48h" — orienté action, durée concrète
- Preuve sociale : Google 4,9 / Trustpilot 4,3 / Sortlist 4,96 affichées
- **Verdict** : conforme, rien à corriger

### `/audit`
- H1 : "Trois piliers passés au crible, votre plan 90 jours."
- Promesse : "Livrable sous 48h. 0 €. Sans engagement."
- **Verdict** : conforme

### `/contact`
- H1 : "Trois piliers. Une seule équipe. Parlons-en."
- Aside avec audit gratuit, email, téléphone direct ("Wladimir décroche en direct")
- Note 4,76/30 visible
- **Verdict** : excellent — touche personnelle + différenciation

### `/a-propos`
- H1 dans `AboutClient.tsx` (composant client)
- Personne JSON-LD avec alumni (CodinGame, Muzzo, Obat, StayHome) — bon signal E-E-A-T
- **Verdict** : conforme

### `/meilleure-agence`
- H1 : "Bien choisir son agence marketing."
- 4 critères clairs : Seniorité réelle / Transparence tarifaire / Résultats traçables / Adéquation au besoin
- Ton : franc et éditorial ("on partage nos critères — à vous d'arbitrer")
- **Verdict** : excellent positionnement

### `/expertise`
- H1 dans `ExpertiseClient.tsx` (non lu en détail — à vérifier copywriting)

### `/tarifs`
- Title clair "Tarifs Uclic — Growth Marketing & IA à partir de 0 €" (52 car.)

## 5. Alt texts — fixes appliqués

| Fichier | Ligne | Avant | Après |
|---|---|---|---|
| `src/components/landing/MethodeSection.tsx` | 423 | `alt=""` (avatar Growth Lead) | `alt="Growth Lead Senior Uclic"` |
| `src/components/landing/MethodeSection.tsx` | 463 | `alt=""` (experts photo dynamique) | `alt={\`Expert ${x.role}${x.sub ? ' — ' + x.sub : ''}\`}` |
| `src/components/landing/LinkedInProofSection.tsx` | 38 | `alt=""` (avatar testimonial) | `alt={r.name ? \`Photo de ${r.name}\` : 'Photo profil LinkedIn'}` |

### Alt texts décoratifs OK (aria-hidden ou pixel tracking, alt="" justifié)

- `src/app/layout.tsx` lignes 213, 223 : pixels Meta/LinkedIn (alt="" correct, image décorative tracking)
- `src/components/landing/MethodeSection.tsx` ligne 1010 : scotch décoratif (`aria-hidden="true"` présent — OK)
- `src/components/ui/ConvergingLinesBridge.tsx` ligne 141 : logo-mark dans bridge décoratif

## 6. Liens internes — vérification

Lancement `curl localhost:3900` sur 23 routes uniques.

### Liens cassés détectés

| Status | Lien | Source | Action |
|---|---|---|---|
| 404 | `/membres` | `src/components/charte-freelance/CharteSections.tsx:442` | **FIXÉ** : redirigé vers `/equipe` (les "membres du collectif" = page équipe existante) |

### Liens OK (200)

`/audit`, `/auth/reset-password`, `/blog`, `/cas-clients`, `/charte-freelance`, `/contact`, `/equipe`, `/expertise`, `/legal`, `/legal/cookies`, `/legal/politique-de-confidentialite`, `/legal/rgpd`, `/levee-de-fonds`, `/login`, `/meilleure-agence`, `/membres/workflows`, `/outils-gratuits`, `/rss`, `/scraping`, `/signup`, `/simulation`, `/toolbox`.

## 7. Top 10 améliorations copy à faire manuellement

1. **Home title 60 car.** : tester une version 50-55 car. ("Uclic — Agence Growth Marketing & IA · 90 jours") pour éviter troncature SERP mobile.
2. **`/expertise` H1** : à lire dans `ExpertiseClient.tsx` — vérifier qu'il n'est pas trop catalogue type "Nos expertises".
3. **`/tarifs` H1** : non audité — vérifier accroche (idéalement "À partir de 0 € — vous payez quand ça marche" ou similaire pour aligner sur le title).
4. **Pages `/legal/*`** : titles trop génériques ("Mentions légales", "RGPD") — ajouter brand "Uclic" et pas-trop-bullshit.
5. **Page dynamique `/blog/[slug]`** : auditer que `generateMetadata()` produit bien title + description optimaux par article.
6. **Page dynamique `/cas-clients/[slug]`** : idem — chaque case study doit avoir une description avec le résultat chiffré.
7. **`/meilleure-agence-growth`** : title contient `${currentYear}` dynamique — bon pour la fraîcheur SEO. À vérifier que la SSR/ISR le régénère bien chaque année.
8. **`/scraping/[service]/...` (5 niveaux de slug)** : hiérarchie profonde — vérifier que `generateMetadata` évite la duplication de contenu / titles identiques.
9. **CTA `/audit`** : tester variante "Mon plan 90 jours" vs "Mon audit gratuit — 48h" en A/B.
10. **OG image unique `/og-image.png`** pour toutes les pages : envisager des OG dynamiques par catégorie (blog, cas-clients, expertise) via `app/.../opengraph-image.tsx` Next.js.

## 8. Bugs copywriting détectés

Aucun bug critique : pas de fautes FR évidentes, pas de buzzwords lourds, pas d'inclusivité forcée. Le seul "transformer votre" trouvé (`SmaClient.tsx`) est idiomatique, pas un buzzword.

---

## Récap fixes appliqués

- 4 metadata corrigées (`layout`, `login`, `signup`, `legal`)
- 3 alt texts corrigés (`MethodeSection` x2, `LinkedInProofSection`)
- 1 lien cassé fixé (`/membres` → `/equipe` dans `CharteSections.tsx`)

Total : **8 fixes** appliqués, 10 recommandations manuelles.
