import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

export interface CompetitorRow {
  rank: number;
  name: string;
  score: number;
  rating: number | null;
  reviewCount: number | null;
  strengths: string;
  remarks: string;
  website: string | null;
  address: string | null;
  phone: string | null;
  isUclic: boolean;
}

export interface MeilleureAgenceSlug {
  expertise: string;
  ville: string;
  slug: string;
  expertiseSlug: string;
  villeSlug: string;
}

type RawCompetitor = {
  competitor_name: string;
  competitor_rating: number | string | null;
  competitor_review_count: number | null;
  competitor_score: number | null;
  competitor_ai_rating: number | string | null;
  competitor_strengths_positioning: string | null;
  competitor_remarks: string | null;
  competitor_website: string | null;
  competitor_address: string | null;
  competitor_phone: string | null;
  competitor_working_hours: unknown;
  competitor_verified: boolean | null;
  competitor_types: string | null;
};

function extractDomain(url: string | null): string | null {
  if (!url) {return null;}
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

function extractAgencyName(comp: RawCompetitor): string {
  if (comp.competitor_name.toLowerCase().includes('uclic')) {return 'UCLIC';}
  if (comp.competitor_address) {
    const addressMatch = comp.competitor_address.match(/^([^,]+),/);
    if (addressMatch?.[1]) {
      const cleaned = addressMatch[1]
        .trim()
        .replace(/^(Agence|Agence\s+SEA|Agence\s+SEO)\s+/i, '')
        .replace(/\s+(Agence|SEA|SEO)$/i, '')
        .trim();
      if (cleaned && cleaned.length < 50) {return cleaned;}
    }
  }
  if (comp.competitor_website) {
    try {
      const url = new URL(comp.competitor_website);
      const domainName = url.hostname.replace(/^www\./, '').split('.')[0];
      const formatted = domainName
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      if (formatted && formatted.length < 50) {return formatted;}
    } catch {
      // ignore
    }
  }
  let cleaned = comp.competitor_name
    .replace(/^Agence\s+/i, '')
    .replace(/\s+à\s+[^·]+$/i, '')
    .replace(/\s+–.*$/i, '')
    .replace(/\s+·.*$/i, '')
    .replace(/\s+Agence.*$/i, '')
    .trim();
  if (cleaned.length > 50) {
    cleaned = cleaned.split(',')[0].split('·')[0].split('–')[0].trim();
  }
  return cleaned || comp.competitor_name;
}

const MARKETING_TYPE_KEYWORDS = [
  'agence de marketing',
  'service de marketing internet',
  'agence de publicité',
  'consultant en marketing',
  'service de télémarketing',
  'service de développement commercial',
  'agence de design',
  'agence de branding',
  'agence de relations publiques',
  'concepteur de sites',
  'marketing internet',
  'e-commerce',
  'agence e-commerce',
  "service d'e-commerce",
];

function isMarketingRelatedType(competitorTypes: string | null): boolean {
  if (!competitorTypes || !competitorTypes.trim()) {return false;}
  const lower = competitorTypes.toLowerCase();
  return MARKETING_TYPE_KEYWORDS.some((kw) => lower.includes(kw));
}

function calculateScore(comp: RawCompetitor, isUclic: boolean): number {
  if (isUclic) {return 98;}
  let score = 0;
  if (comp.competitor_rating != null) {
    score += parseFloat(String(comp.competitor_rating)) * 8;
  } else if (comp.competitor_ai_rating != null) {
    score += parseFloat(String(comp.competitor_ai_rating)) * 8;
  }
  const rc = comp.competitor_review_count ?? 0;
  if (rc >= 200) {score += 30;}
  else if (rc >= 100) {score += 25;}
  else if (rc >= 50) {score += 20;}
  else if (rc >= 20) {score += 15;}
  else if (rc >= 10) {score += 10;}
  else if (rc >= 5) {score += 5;}
  if (comp.competitor_ai_rating != null && comp.competitor_rating == null) {
    score += parseFloat(String(comp.competitor_ai_rating)) * 4;
  }
  if (comp.competitor_verified) {score += 5;}
  if (comp.competitor_address && comp.competitor_phone) {score += 5;}
  return Math.min(Math.max(Math.round(score), 0), 97);
}

function deduplicateAndScore(
  rawRows: RawCompetitor[],
  maxCompetitors = 20
): CompetitorRow[] {
  const rows = rawRows.filter((r) => isMarketingRelatedType(r.competitor_types));

  const byDomain = new Map<
    string,
    RawCompetitor & { isUclic: boolean; calculatedScore: number }
  >();

  for (const comp of rows) {
    const isUclic = comp.competitor_name.toLowerCase().includes('uclic');
    const domain = extractDomain(comp.competitor_website);
    const key = domain || comp.competitor_name;
    const existing = byDomain.get(key);
    const reviewCount = comp.competitor_review_count ?? 0;
    const keep =
      !existing ||
      (isUclic && !existing.isUclic) ||
      reviewCount > (existing.competitor_review_count ?? 0);
    if (keep) {
      byDomain.set(key, {
        ...comp,
        isUclic,
        calculatedScore: calculateScore(comp, isUclic),
      });
    }
  }

  let list = Array.from(byDomain.values());
  const hasUclic = list.some((c) => c.isUclic);
  if (!hasUclic) {
    list = [
      {
        competitor_name: 'UCLIC',
        competitor_rating: null,
        competitor_review_count: null,
        competitor_score: null,
        competitor_ai_rating: null,
        competitor_strengths_positioning:
          'Agence growth marketing et IA, spécialisée B2B.',
        competitor_remarks: '',
        competitor_website: 'https://uclic.fr',
        competitor_address: null,
        competitor_phone: '06 17 12 54 28',
        competitor_working_hours: null,
        competitor_verified: null,
        competitor_types: 'agence de marketing',
        isUclic: true,
        calculatedScore: 98,
      },
      ...list,
    ];
  }

  list.sort((a, b) => {
    if (a.isUclic && !b.isUclic) {return -1;}
    if (!a.isUclic && b.isUclic) {return 1;}
    const ra = a.competitor_review_count ?? 0;
    const rb = b.competitor_review_count ?? 0;
    return rb - ra;
  });

  const limited = list.slice(0, maxCompetitors);

  return limited.map((comp, index) => ({
    rank: index + 1,
    name: extractAgencyName(comp),
    score: comp.calculatedScore,
    rating:
      comp.competitor_rating != null
        ? parseFloat(String(comp.competitor_rating))
        : null,
    reviewCount: comp.competitor_review_count,
    strengths: comp.competitor_strengths_positioning || '',
    remarks: comp.competitor_remarks || '',
    website: comp.competitor_website,
    address: comp.competitor_address,
    phone: comp.isUclic ? '06 17 12 54 28' : comp.competitor_phone,
    isUclic: comp.isUclic,
  }));
}

const COMPETITOR_SELECT_FIELDS =
  'competitor_name, competitor_rating, competitor_review_count, competitor_score, competitor_ai_rating, competitor_strengths_positioning, competitor_remarks, competitor_website, competitor_address, competitor_phone, competitor_working_hours, competitor_verified, competitor_types';

export async function getCompetitorsByExpertiseAndCity(
  expertiseTitle: string,
  cityName: string
): Promise<CompetitorRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('competitors')
    .select(COMPETITOR_SELECT_FIELDS)
    .eq('expertise', expertiseTitle)
    .eq('ville', cityName)
    .eq('publish', true);

  if (error || !data?.length) {return [];}
  return deduplicateAndScore(data as RawCompetitor[]);
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Returns all distinct expertise+ville combos usable as /meilleure-agence/[slug].
 */
export async function getAllMeilleureAgenceSlugs(): Promise<MeilleureAgenceSlug[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('competitors')
    .select('expertise, ville')
    .eq('publish', true);

  if (error || !data?.length) {return [];}

  const seen = new Set<string>();
  const results: MeilleureAgenceSlug[] = [];

  for (const row of data as Array<{ expertise: string | null; ville: string | null }>) {
    if (!row.expertise || !row.ville) {continue;}
    const key = `${row.expertise}|${row.ville}`;
    if (seen.has(key)) {continue;}
    seen.add(key);

    const expertiseSlug = slugify(row.expertise.replace(/^Agence\s+/i, ''));
    const villeSlug = slugify(row.ville);
    const slug = `${expertiseSlug}-${villeSlug}`;

    results.push({
      expertise: row.expertise,
      ville: row.ville,
      slug,
      expertiseSlug,
      villeSlug,
    });
  }

  return results;
}
