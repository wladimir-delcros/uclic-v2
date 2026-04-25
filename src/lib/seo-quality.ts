/**
 * SEO quality gate — détermine si une page programmatique doit être indexée.
 *
 * Contexte : audit GA4 + GSC + Semrush (avril 2026) a révélé un index bloat
 * massif (2 225 pages programmatiques sur ~2 575 indexées, 80 % du bruit pour
 * 18 % des clicks). Le diagnostic Helpful Content Update + March 2024 Spam
 * Update est sans appel : il faut désindexer la majorité des pages doorway
 * (`/agence/*`, `/meilleure-agence/*`, `/membres/*`) et garder uniquement
 * celles qui ont un signal réel (clicks GSC ou backlinks Semrush).
 *
 * Cette fonction est appelée depuis `generateMetadata` de chaque route
 * programmatique. Elle retourne un objet Metadata.robots à spread :
 *   return { robots: shouldIndex(...) ? indexable : noindexFollow };
 *
 * Whitelists basées sur :
 *   - GSC top pages 90j (clicks ≥ 3 OU position ≤ 20)
 *   - Semrush Indexed Pages avec backlinks (BL ≥ 1, RD ≥ 1)
 *   - Décision business du user (top-funnel inutile, etc.)
 */

const NOINDEX_FOLLOW = { index: false, follow: true } as const;
const INDEX_FOLLOW = { index: true, follow: true } as const;

/**
 * Toolbox — top 5 GSC garde indexés, le reste noindex.
 * Top GSC 90j : discover-profiles, random-timer-generator, csgo-tracker, fanfix, deepstate-map.
 */
const TOOLBOX_KEEP_INDEXED = new Set<string>([
  'discover-profiles',
  'random-timer-generator',
  'csgo-tracker',
  'fanfix',
  'deepstate-map',
  'forecastr',
]);

/**
 * Agence — aucune page programmatique `/agence/[...slug]` ne ranke en GSC top 30.
 * Top page Semrush avec quelques BL : `marketing-automation-nanterre` (7 clicks).
 * On garde uniquement le hub `/agence` (slug vide ou `agence` seul) — tout le reste noindex.
 */
const AGENCE_KEEP_INDEXED = new Set<string>([]);

/**
 * Meilleure-agence/[slug] — 690 pages, 60 clicks total, 0,15 % CTR.
 * Le hub `/meilleure-agence` reste indexé (utile, 134 clicks/page).
 * `/meilleure-agence-growth` reste indexé (top performer, 75 clicks/page).
 * Tous les slugs individuels (`youtube-ads-paris`, etc.) → noindex.
 */
const MEILLEURE_AGENCE_KEEP_INDEXED = new Set<string>([]);

/**
 * Levée de fonds — décision Wladimir 2026-04-25 : garder TOUT indexé.
 * Le format performe (3,57 % CTR — le meilleur du site, 232 clicks/90j sur
 * 338 pages). Pas de raison de désindexer même les anciennes : elles servent
 * encore d'archives + fresh content régulier.
 *
 * Cette whitelist reste pour traçabilité (articles avec backlinks externes
 * confirmés) mais `leveeRobots()` retourne désormais INDEX_FOLLOW par défaut.
 */
const LEVEE_KEEP_INDEXED_FOREVER = new Set<string>([
  // Backlinks externes confirmés (Semrush)
  'rune-technologies-leve-24-millions-de-dollars-pour-revolutionner-la-logistique-militaire-grace-a-lia',
  'kin-leve-raises-additional-15m-series-d-round-upsized-to-109m',
  'twin-leve-84-m-la-startup-parisienne-qui-deploie-lia-par-175-000-agents-et-vise-le-marche-grand-public',
  'atlas-v-leve-5-m-nouvelle-etape-pour-le-divertissement-immersif-made-in-france',
  'edailabs-leve-5-m-pour-emma-lapp-danglais-ia-immersive-qui-revolutionne-ledtech',
  'notom-leve-2-m-pour-democratiser-lautomatisation-industrielle-sans-code-et-ia',
  'lucis-paris-leve-72-m-pour-revolutionner-le-suivi-sante-preventif-grace-a-lanalyse-sanguine-intelligente',
  'recupere-metals-leve-5-m-pour-revolutionner-le-cuivre-recycle-et-renforcer-la-souverainete-industrielle',
  'newcleo-leve-75-m-la-deeptech-nucleaire-francaise-accelere-sa-revolution-energetique',
  'safeheal-financement-serie-c-safeheal',
  'revox-leve-26-m-en-amorcage-nouveau-tremplin-pour-la-martech-francaise',
  'equitable-earth-leve-126-m-en-serie-a-pour-accelerer-la-norme-mondiale-des-projets-carbone-et-restaurer-les-ecosystemes',
  'sweetech-biotech-leve-23-m-pour-accelerer-son-developpement-a-toulouse',
  'lun-energy-leve-11-2m-seed-funding',
  'everdye-leve-15-millions-deuros-pour-revolutionner-la-teinture-textile-durable',
]);

const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 180;

/**
 * Décide robots policy pour `/agence/[...slug]`.
 * Tout en noindex sauf whitelist explicite (vide aujourd'hui).
 */
export function agenceRobots(slug: string[] | undefined): typeof INDEX_FOLLOW | typeof NOINDEX_FOLLOW {
  if (!slug || slug.length === 0) return INDEX_FOLLOW;
  const joined = slug.join('/');
  return AGENCE_KEEP_INDEXED.has(joined) ? INDEX_FOLLOW : NOINDEX_FOLLOW;
}

/**
 * Décide robots policy pour `/meilleure-agence/[slug]`.
 * Tout en noindex (la valeur est uniquement sur le hub et `/meilleure-agence-growth`).
 */
export function meilleureAgenceRobots(slug: string): typeof INDEX_FOLLOW | typeof NOINDEX_FOLLOW {
  return MEILLEURE_AGENCE_KEEP_INDEXED.has(slug) ? INDEX_FOLLOW : NOINDEX_FOLLOW;
}

/**
 * Décide robots policy pour `/membres/*`.
 * `/membres` (hub) et `/membres/workflows` (catalogue public) restent indexés.
 * Le reste (profil, workflows individuels) → noindex (semi-privé).
 */
export function membresRobots(path: string): typeof INDEX_FOLLOW | typeof NOINDEX_FOLLOW {
  const normalized = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (normalized === 'membres' || normalized === 'membres/workflows') return INDEX_FOLLOW;
  return NOINDEX_FOLLOW;
}

/**
 * Décide robots policy pour `/toolbox/[slug]`.
 * Whitelist top 5 GSC garde indexés. Le reste → noindex (top-funnel inutile selon
 * la décision business — pas de business intent sur ces queries).
 */
export function toolboxRobots(slug: string): typeof INDEX_FOLLOW | typeof NOINDEX_FOLLOW {
  return TOOLBOX_KEEP_INDEXED.has(slug) ? INDEX_FOLLOW : NOINDEX_FOLLOW;
}

/**
 * Décide robots policy pour `/levee-de-fonds/[slug]`.
 * - Whitelist permanente (backlinks externes confirmés) : indexable forever.
 * - Articles < 6 mois : indexable (format CTR 3,57 %, fresh news).
 * - Articles > 6 mois sans whitelist : noindex (long-tail dilue l'autorité).
 */
export function leveeRobots(
  slug: string,
  publishedAt: Date | string | null | undefined
): typeof INDEX_FOLLOW | typeof NOINDEX_FOLLOW {
  if (LEVEE_KEEP_INDEXED_FOREVER.has(slug)) return INDEX_FOLLOW;
  if (!publishedAt) return INDEX_FOLLOW;
  const pubDate = typeof publishedAt === 'string' ? new Date(publishedAt) : publishedAt;
  if (Number.isNaN(pubDate.getTime())) return INDEX_FOLLOW;
  const age = Date.now() - pubDate.getTime();
  return age < SIX_MONTHS_MS ? INDEX_FOLLOW : NOINDEX_FOLLOW;
}

/**
 * Aide pour `app/blog/[slug]` — le user a demandé d'élaguer aussi le blog.
 * Critère : noindex si l'article a 0 clicks GSC sur 90j ET aucun backlink externe Semrush.
 * Comme on ne peut pas matcher tous les slugs en build-time, on whitelist les
 * articles qui rankent / ont du jus, et on laisse les autres noindex.
 *
 * Top blog GSC 90j : 21 slugs avec ≥ 5 clicks. Plus quelques articles avec
 * backlinks Semrush (magileads ×10+, kevin-grillot, aramis-digital).
 */
const BLOG_KEEP_INDEXED = new Set<string>([
  // Top GSC 90j (clicks ≥ 3)
  'gafam-qui-sont-les-cinq-geants-de-la-tech-et-leurs-acquisitions-majeures',
  'dans-l-attente-de-votre-retour',
  'comment-effectuer-des-recherches-sur-google-par-date-en-utilisant-les-commandes-avant-et-apres',
  'emoji-linkedin-liste-complete-pour-vos-posts-2026',
  'better-call-ouss',
  'json-prompts-pourquoi-et-comment-les-utiliser-pour-la-generation-video-par-ia',
  'guide-claude-code-2026',
  'product-led-vs-sales-led-quelle-est-la-difference',
  'google-performance-max-le-format-vertical-916-arrive-enfin-pour-des-campagnes-mobile-first',
  'google-search-facilite-les-recherches-sans-personnalisation',
  // Backlinks externes confirmés
  'comment-optimiser-votre-prospection-b2b-avec-un-outil-innovant-dautomatisation', // magileads ×10+
  'google-search-console-guide-complet-seo', // aramis-digital + kevin-grillot multilangue + webtoiture + florian-consultant-seo
  'lautomatisation-marketing-le-levier-de-croissance-incontournable-pour-les-tpe-pme', // ekioz.fr
  'le-responsable-de-google-search-revele-que-les-resumes-dia-ameliorent-la-qualite-des-clics', // clickaipro
  'openai-nenvisage-pas-de-publicite-pour-chatgpt-dans-un-avenir-proche', // mwinda.org
  'comment-creer-une-entreprise-autonome-qui-fonctionne-sans-intervention',
  'growth-hacking-des-conseils-pour-vos-ventes-b2b', // techreview.fr
]);

export function blogRobots(slug: string): typeof INDEX_FOLLOW | typeof NOINDEX_FOLLOW {
  return BLOG_KEEP_INDEXED.has(slug) ? INDEX_FOLLOW : NOINDEX_FOLLOW;
}

/**
 * Helper pour exclure les pages noindex du sitemap.
 * Doit être appelé par `app/sitemap.ts`.
 */
export function isPageIndexed(
  section: 'agence' | 'meilleure-agence' | 'meilleure-agence-slug' | 'membres' | 'toolbox' | 'levee' | 'blog',
  slug: string,
  publishedAt?: Date | string | null
): boolean {
  switch (section) {
    case 'agence':
      return agenceRobots(slug.split('/').filter(Boolean)) === INDEX_FOLLOW;
    case 'meilleure-agence':
      return true; // hub indexé
    case 'meilleure-agence-slug':
      return meilleureAgenceRobots(slug) === INDEX_FOLLOW;
    case 'membres':
      return membresRobots(slug) === INDEX_FOLLOW;
    case 'toolbox':
      return toolboxRobots(slug) === INDEX_FOLLOW;
    case 'levee':
      return leveeRobots(slug, publishedAt) === INDEX_FOLLOW;
    case 'blog':
      return blogRobots(slug) === INDEX_FOLLOW;
    default:
      return true;
  }
}
