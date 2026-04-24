/**
 * CMS content sanitizer.
 *
 * Historical AI pipelines (internal-linking SEO spam) have injected
 * duplicate CTA paragraphs at the bottom of `levees_de_fonds.content_html`.
 * These follow a tight template:
 *   - open with "Avec/La levée de fonds/Cette levée/Pour soutenir/…"
 *   - contain one to three internal links to /expertise/*
 *   - push Uclic services (SEO, data analytics, IA, marketing automation…)
 *   - are repeated 10 to 60 times in the same post
 *
 * This module strips them at render time so the page only shows the
 * editorial content. It is conservative: it only removes paragraphs that
 * match BOTH a known opening pattern AND contain the Uclic CTA fingerprint,
 * or a near-duplicate set of such paragraphs.
 */

const SPAM_OPENINGS = [
  /^avec\s+(sa|cette|une|sa\s+r[ée]cente|une\s+r[ée]cente)\s+lev[ée]+/i,
  /^la\s+lev[ée]+\s+de\s+fonds/i,
  /^pour\s+soutenir\s+(cette|son|sa|leur)/i,
  /^alors\s+qu['']/i,
  /^gr[âa]ce\s+[àa]\s+(sa|cette|cette\s+r[ée]cente)\s+lev[ée]+/i,
];

const CTA_KEYWORDS = [
  'positionnement de marque',
  'marketing automation',
  'analyse de donn',
  'data analytics',
  'data-analytics',
  'intelligence artificielle',
  'ia sur mesure',
  'diagnostic ia',
  'seo local',
  'recherche de mots',
  'rev ops',
  'sales ops',
  'growth ops',
  'brandbook',
  'prospection multicanal',
  'web analytics',
  'bi & reporting',
  'crm',
  'agence display',
  'automatisation intelligente',
];

function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ');
}

function looksLikeSpam(rawInner: string): boolean {
  const text = normalize(stripTags(rawInner));
  if (!text) {return false;}

  const hasInternalLink = /<a[^>]+href\s*=\s*["'](?:https?:\/\/(?:www\.)?uclic\.fr)?\/(?:expertise|services|meilleure-agence|scraping|agence)/i.test(
    rawInner,
  );
  const matchesOpening = SPAM_OPENINGS.some((p) => p.test(text));
  const mentionsCta = CTA_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));

  // Strong signal: opening + internal link
  if (matchesOpening && hasInternalLink) {return true;}
  // Medium signal: opening + several CTA keywords
  if (matchesOpening && mentionsCta) {
    const ctaHits = CTA_KEYWORDS.filter((kw) =>
      text.toLowerCase().includes(kw),
    ).length;
    if (ctaHits >= 2) {return true;}
  }
  return false;
}

/**
 * Remove duplicated AI-generated CTA paragraphs from CMS HTML.
 * Also dedupes consecutive near-identical paragraphs.
 */
export function sanitizeCmsContent(html: string | null | undefined): string {
  if (!html) {return '';}

  const seenSignatures = new Set<string>();
  let removedSpam = 0;
  let removedDup = 0;

  const cleaned = html.replace(
    /<p[\s\S]*?<\/p>/gi,
    (match) => {
      // Extract inner
      const inner = match.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '');
      if (looksLikeSpam(inner)) {
        removedSpam += 1;
        return '';
      }
      const sig = normalize(stripTags(inner)).slice(0, 120).toLowerCase();
      if (sig.length > 40) {
        if (seenSignatures.has(sig)) {
          removedDup += 1;
          return '';
        }
        seenSignatures.add(sig);
      }
      return match;
    },
  );

  if (removedSpam + removedDup > 0 && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(
      `[sanitizeCmsContent] removed ${removedSpam} spam + ${removedDup} duplicate <p> tags`,
    );
  }

  return cleaned;
}
