import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import type { ExpertiseFields } from '@/lib/expertise';

/**
 * Programmatic SEO pages driven by two Supabase tables:
 *  - `expertise_city_pages`          (expertise + ville, 494 pubs)
 *  - `expertise_category_city_pages` (category  + ville, 156 pubs)
 *
 * Servies via le catch-all `/agence/[...slug]`. Le lookup se fait par
 * `path_slug` (ex: "/agence/agence-branding-paris").
 */

export interface ExpertiseCityPageRow {
  id: number;
  expertise_id: number;
  city_slug: string;
  city_name: string;
  path_slug: string;
  title: string | null;
  slug: string | null;
  h1: string | null;
  subtitle: string | null;
  h2_1: string | null;
  h2_2: string | null;
  content_2: string | null;
  titrebox_1: string | null;
  titrebox_2: string | null;
  titrebox_3: string | null;
  description_1: string | null;
  description_2: string | null;
  description_3: string | null;
  description_titre_1: string | null;
  description_titre_2: string | null;
  description_titre_3: string | null;
  process_title: string | null;
  process_little_title: string | null;
  process_description: string | null;
  process_titre_1: string | null;
  process_titre_2: string | null;
  process_titre_3: string | null;
  faq_subtitle: string | null;
  faq_title_1: string | null;
  faq_desc_1: string | null;
  faq_title_2: string | null;
  faq_desc_2: string | null;
  faq_title_3: string | null;
  faq_desc_3: string | null;
  faq_title_4: string | null;
  faq_desc_4: string | null;
  faq_title_5: string | null;
  faq_desc_5: string | null;
  faq_title_6: string | null;
  faq_desc_6: string | null;
  tag: string | null;
  meta_title: string | null;
  meta_description: string | null;
  updated_at?: string | null;
}

export interface ExpertiseCategoryCityPageRow extends Omit<ExpertiseCityPageRow, 'expertise_id' | 'title'> {
  category_id: number;
  name: string | null;
}

function mapRowToExpertiseFields(row: ExpertiseCityPageRow | ExpertiseCategoryCityPageRow): ExpertiseFields {
  return {
    tag: row.tag || '',
    h1: row.h1 || '',
    subtitle: row.subtitle || '',
    h21: row.h2_1 || '',
    titrebox1: row.titrebox_1 || '',
    description1: row.description_1 || '',
    titrebox2: row.titrebox_2 || '',
    description2: row.description_2 || '',
    titrebox3: row.titrebox_3 || '',
    description3: row.description_3 || '',
    marqueeRelatedCat: null,
    moreRelatedCat: null,
    h22: row.h2_2 || '',
    content2: row.content_2 || '',
    processLittleTitle: row.process_little_title || '',
    processTitle: row.process_title || '',
    processDescription: row.process_description || '',
    processTitre1: row.process_titre_1 || '',
    processTitre2: row.process_titre_2 || '',
    processTitre3: row.process_titre_3 || '',
    descriptionTitre1: row.description_titre_1 || '',
    descriptionTitre2: row.description_titre_2 || '',
    descriptionTitre3: row.description_titre_3 || '',
    faqSubtitle: row.faq_subtitle || '',
    faqTitle1: row.faq_title_1 || '',
    faqDesc1: row.faq_desc_1 || '',
    faqTitle2: row.faq_title_2 || '',
    faqDesc2: row.faq_desc_2 || '',
    faqTitle3: row.faq_title_3 || '',
    faqDesc3: row.faq_desc_3 || '',
    faqTitle4: row.faq_title_4 || '',
    faqDesc4: row.faq_desc_4 || '',
    faqTitle5: row.faq_title_5 || '',
    faqDesc5: row.faq_desc_5 || '',
    faqTitle6: row.faq_title_6 || '',
    faqDesc6: row.faq_desc_6 || '',
    metaTitle: row.meta_title || '',
    metaDescription: row.meta_description || '',
  };
}

export interface AgencePageResult {
  pageType: 'expertise' | 'category';
  row: ExpertiseCityPageRow | ExpertiseCategoryCityPageRow;
  fields: ExpertiseFields;
  cityName: string;
  citySlug: string;
  serviceName: string;
}

function normalizeServiceName(name: string): string {
  return name.replace(/^Agence\s+/i, '').trim();
}

/**
 * Lookup a page by its full path_slug (e.g. "/agence/agence-branding-paris").
 * Tries expertise_city_pages first, then expertise_category_city_pages.
 */
export async function getAgencePageByPath(pathSlug: string): Promise<AgencePageResult | null> {
  const supabase = createAdminClient();

  // Try expertise page first
  const { data: expData, error: expErr } = await supabase
    .from('expertise_city_pages')
    .select('*')
    .eq('path_slug', pathSlug)
    .eq('publish', true)
    .maybeSingle();

  if (expErr && expErr.code !== 'PGRST116') {
    console.error('[agence] expertise_city_pages error:', expErr);
  }

  if (expData) {
    const row = expData as ExpertiseCityPageRow;
    const fields = mapRowToExpertiseFields(row);
    const title = row.title || fields.h1 || '';
    return {
      pageType: 'expertise',
      row,
      fields,
      cityName: row.city_name || '',
      citySlug: row.city_slug || '',
      serviceName: normalizeServiceName(title) || fields.tag || 'Expertise',
    };
  }

  // Fallback to category page
  const { data: catData, error: catErr } = await supabase
    .from('expertise_category_city_pages')
    .select('*')
    .eq('path_slug', pathSlug)
    .eq('publish', true)
    .maybeSingle();

  if (catErr && catErr.code !== 'PGRST116') {
    console.error('[agence] expertise_category_city_pages error:', catErr);
  }

  if (catData) {
    const row = catData as ExpertiseCategoryCityPageRow;
    const fields = mapRowToExpertiseFields(row);
    const name = row.name || fields.h1 || '';
    return {
      pageType: 'category',
      row,
      fields,
      cityName: row.city_name || '',
      citySlug: row.city_slug || '',
      serviceName: normalizeServiceName(name) || fields.tag || 'Expertise',
    };
  }

  return null;
}

/**
 * Top N paths prerendered at build time (cap for build-time perf).
 * Returns the most recently updated pages first.
 */
export async function getTopAgencePaths(limit = 500): Promise<string[]> {
  const supabase = createAdminClient();

  // Split the budget ~75% expertise / 25% category to match row-count ratio.
  const expertiseBudget = Math.floor(limit * 0.75);
  const categoryBudget = limit - expertiseBudget;

  const [expertiseRes, categoryRes] = await Promise.all([
    supabase
      .from('expertise_city_pages')
      .select('path_slug, updated_at')
      .eq('publish', true)
      .order('updated_at', { ascending: false, nullsFirst: false })
      .limit(expertiseBudget),
    supabase
      .from('expertise_category_city_pages')
      .select('path_slug, updated_at')
      .eq('publish', true)
      .order('updated_at', { ascending: false, nullsFirst: false })
      .limit(categoryBudget),
  ]);

  const paths: string[] = [];
  if (!expertiseRes.error && expertiseRes.data) {
    for (const r of expertiseRes.data as Array<{ path_slug: string }>) {
      if (r.path_slug) paths.push(r.path_slug);
    }
  }
  if (!categoryRes.error && categoryRes.data) {
    for (const r of categoryRes.data as Array<{ path_slug: string }>) {
      if (r.path_slug) paths.push(r.path_slug);
    }
  }

  return paths.slice(0, limit);
}

/**
 * Other pages in the same city — used for the "autres services" block.
 */
export async function getOtherCityServices(
  citySlug: string,
  excludePathSlug: string,
  limitN = 9,
): Promise<Array<{
  path_slug: string;
  title: string;
  subtitle: string | null;
  type: 'expertise' | 'category';
}>> {
  if (!citySlug) return [];
  const supabase = createAdminClient();

  const [expRes, catRes] = await Promise.all([
    supabase
      .from('expertise_city_pages')
      .select('path_slug, title, h1, subtitle')
      .eq('city_slug', citySlug)
      .eq('publish', true)
      .neq('path_slug', excludePathSlug)
      .limit(limitN),
    supabase
      .from('expertise_category_city_pages')
      .select('path_slug, name, h1, subtitle')
      .eq('city_slug', citySlug)
      .eq('publish', true)
      .neq('path_slug', excludePathSlug)
      .limit(limitN),
  ]);

  const results: Array<{
    path_slug: string;
    title: string;
    subtitle: string | null;
    type: 'expertise' | 'category';
  }> = [];

  if (!expRes.error && expRes.data) {
    for (const r of expRes.data as Array<{
      path_slug: string;
      title: string | null;
      h1: string | null;
      subtitle: string | null;
    }>) {
      results.push({
        path_slug: r.path_slug,
        title: r.title || r.h1 || '',
        subtitle: r.subtitle,
        type: 'expertise',
      });
    }
  }
  if (!catRes.error && catRes.data) {
    for (const r of catRes.data as Array<{
      path_slug: string;
      name: string | null;
      h1: string | null;
      subtitle: string | null;
    }>) {
      results.push({
        path_slug: r.path_slug,
        title: r.name || r.h1 || '',
        subtitle: r.subtitle,
        type: 'category',
      });
    }
  }

  return results
    .filter((x) => x.title)
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, limitN);
}

/* -------------------------------------------------------------------------- */
/* Cities list for a given expertise / category                                */
/* -------------------------------------------------------------------------- */

export interface CityLink {
  cityName: string;
  citySlug: string;
  pathSlug: string;
  metaDescription: string | null;
}

/**
 * All city-variant pages for a given expertise slug.
 * Used to render the "Retrouvez nos experts partout en France" block at the
 * bottom of /expertise/[category]/[slug].
 */
export async function getCityPagesForExpertise(
  expertiseSlug: string,
): Promise<CityLink[]> {
  if (!expertiseSlug) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('expertise_city_pages')
    .select('path_slug, city_slug, city_name, meta_description')
    .eq('status', 'publish')
    .like('path_slug', `/agence/${expertiseSlug}-%`)
    .order('city_name', { ascending: true });
  return ((data || []) as Array<{
    path_slug: string;
    city_slug: string;
    city_name: string;
    meta_description: string | null;
  }>).map((r) => ({
    cityName: r.city_name,
    citySlug: r.city_slug,
    pathSlug: r.path_slug,
    metaDescription: r.meta_description,
  }));
}

/**
 * All city-variant pages for a given expertise category slug (from
 * expertise_category_city_pages). Used on /expertise/[category] to list
 * every city that has a city-specific page.
 */
export async function getCityPagesForCategory(
  categorySlug: string,
): Promise<CityLink[]> {
  if (!categorySlug) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('expertise_category_city_pages')
    .select('path_slug, city_slug, city_name, meta_description')
    .eq('status', 'publish')
    .like('path_slug', `/agence/${categorySlug}-%`)
    .order('city_name', { ascending: true });
  return ((data || []) as Array<{
    path_slug: string;
    city_slug: string;
    city_name: string;
    meta_description: string | null;
  }>).map((r) => ({
    cityName: r.city_name,
    citySlug: r.city_slug,
    pathSlug: r.path_slug,
    metaDescription: r.meta_description,
  }));
}
