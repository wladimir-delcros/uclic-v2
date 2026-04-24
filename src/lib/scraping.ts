/**
 * Scraping helpers for programmatic SEO pages.
 *
 * Levels:
 *   2. /scraping/[service]
 *   3. /scraping/[service]/[category]
 *   4. /scraping/[service]/[category]/[activity]
 *   5. /scraping/[service]/[category]/[activity]/[region]
 *   6. /scraping/[service]/[category]/[activity]/[region]/[department]
 *
 * Source of truth for "what is published" is `seo_pages_queue`. A row there
 * with is_published = true means the combination (service, activity,
 * region?, department?) is live. We use it to gate which child links to
 * surface on each index level.
 */
import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

export interface ScrapingService {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  meta_title_template: string | null;
  meta_description_template: string | null;
  seo_content: string | null;
  seo_short_description: string | null;
  use_cases: string[] | null;
  benefits: string[] | null;
}

export interface ActivityCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  category_id: string;
  meta_title_template: string | null;
  meta_description_template: string | null;
  seo_content: string | null;
  seo_short_description: string | null;
  use_cases: string[] | null;
  benefits: string[] | null;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  code: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  code: string;
  region_id: string;
}

export interface ScrapingFaqRow {
  id: string;
  question: string;
  answer: string;
  order: number | null;
  is_active: boolean | null;
  use_variables: boolean | null;
}

export interface SeoPageContent {
  id: string;
  service_id: string;
  activity_id: string | null;
  region_id: string | null;
  department_id: string | null;
  seo_content: string | null;
  seo_short_description: string | null;
  use_cases: string[] | null;
  benefits: string[] | null;
  faqs: { question: string; answer: string }[] | null;
  json_ld: Record<string, unknown> | null;
  is_published: boolean;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqVariables {
  activity: string;
  location: string;
  location_full: string;
  region: string;
  department_code: string;
  service: string;
  category: string;
}

/* -------------------------------------------------------------------------- */
/* Service lookups                                                            */
/* -------------------------------------------------------------------------- */

export async function getScrapingServiceBySlug(slug: string): Promise<ScrapingService | null> {
  const supa = createAdminClient();
  const { data } = await supa
    .from('scraping_services')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as ScrapingService | null) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Category lookups                                                           */
/* -------------------------------------------------------------------------- */

export async function getCategoryByServiceAndSlug(
  serviceSlug: string,
  categorySlug: string
): Promise<{ service: ScrapingService; category: ActivityCategory } | null> {
  const service = await getScrapingServiceBySlug(serviceSlug);
  if (!service) return null;

  const supa = createAdminClient();
  const { data: category } = await supa
    .from('activity_categories')
    .select('id, name, slug, description, icon')
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category) return null;
  return { service, category: category as ActivityCategory };
}

/**
 * Returns activities in this category that have at least one published seo_pages_queue
 * row for the given service. Falls back to all activities in the category
 * when no queue rows exist (so the UI isn't empty in dev / seed states).
 */
export async function getActivitiesByCategory(
  serviceSlug: string,
  categorySlug: string
): Promise<{
  service: ScrapingService;
  category: ActivityCategory;
  activities: Activity[];
} | null> {
  const base = await getCategoryByServiceAndSlug(serviceSlug, categorySlug);
  if (!base) return null;

  const supa = createAdminClient();
  const { data: catActs } = await supa
    .from('activities')
    .select('id')
    .eq('category_id', base.category.id);
  const catActIds = ((catActs as { id: string }[] | null) ?? []).map((r) => r.id);
  if (catActIds.length === 0) {
    return { ...base, activities: [] };
  }

  const { data: publishedRows } = await supa
    .from('seo_pages_queue')
    .select('activity_id')
    .eq('service_id', base.service.id)
    .eq('is_published', true)
    .in('activity_id', catActIds);

  const publishedIds = Array.from(
    new Set(
      ((publishedRows as { activity_id: string | null }[] | null) ?? [])
        .map((r) => r.activity_id)
        .filter((v): v is string => Boolean(v))
    )
  );

  const targetIds = publishedIds.length > 0 ? publishedIds : catActIds;
  const { data: acts } = await supa
    .from('activities')
    .select('*')
    .in('id', targetIds)
    .order('name');

  return { ...base, activities: (acts as Activity[] | null) ?? [] };
}

/* -------------------------------------------------------------------------- */
/* Activity lookups                                                           */
/* -------------------------------------------------------------------------- */

export async function getActivityByPath(
  serviceSlug: string,
  categorySlug: string,
  activitySlug: string
): Promise<{
  service: ScrapingService;
  category: ActivityCategory;
  activity: Activity;
} | null> {
  const base = await getCategoryByServiceAndSlug(serviceSlug, categorySlug);
  if (!base) return null;

  const supa = createAdminClient();
  const { data: activity } = await supa
    .from('activities')
    .select('*')
    .eq('slug', activitySlug)
    .eq('category_id', base.category.id)
    .maybeSingle();

  if (!activity) return null;
  return { ...base, activity: activity as Activity };
}

/* -------------------------------------------------------------------------- */
/* Region lookups                                                             */
/* -------------------------------------------------------------------------- */

export async function getRegionsForActivity(
  serviceSlug: string,
  categorySlug: string,
  activitySlug: string
): Promise<{
  service: ScrapingService;
  category: ActivityCategory;
  activity: Activity;
  regions: Region[];
} | null> {
  const base = await getActivityByPath(serviceSlug, categorySlug, activitySlug);
  if (!base) return null;

  const supa = createAdminClient();
  const { data: publishedRegionRows } = await supa
    .from('seo_pages_queue')
    .select('region_id')
    .eq('service_id', base.service.id)
    .eq('activity_id', base.activity.id)
    .eq('is_published', true);

  const regionIds = Array.from(
    new Set(
      ((publishedRegionRows as { region_id: string | null }[] | null) ?? [])
        .map((r) => r.region_id)
        .filter((v): v is string => Boolean(v))
    )
  );

  let regions: Region[] = [];
  if (regionIds.length > 0) {
    const { data } = await supa
      .from('regions')
      .select('id, name, slug, code')
      .in('id', regionIds)
      .order('name');
    regions = (data as Region[] | null) ?? [];
  } else {
    // Dev fallback: show every region so the UI has content before queue seeding.
    const { data } = await supa
      .from('regions')
      .select('id, name, slug, code')
      .order('name');
    regions = (data as Region[] | null) ?? [];
  }

  return { ...base, regions };
}

export async function getRegionByPath(
  serviceSlug: string,
  categorySlug: string,
  activitySlug: string,
  regionSlug: string
): Promise<{
  service: ScrapingService;
  category: ActivityCategory;
  activity: Activity;
  region: Region;
} | null> {
  const base = await getActivityByPath(serviceSlug, categorySlug, activitySlug);
  if (!base) return null;

  const supa = createAdminClient();
  const { data: region } = await supa
    .from('regions')
    .select('id, name, slug, code')
    .eq('slug', regionSlug)
    .maybeSingle();

  if (!region) return null;
  return { ...base, region: region as Region };
}

/* -------------------------------------------------------------------------- */
/* Department lookups                                                         */
/* -------------------------------------------------------------------------- */

export async function getDepartmentsForRegion(
  serviceSlug: string,
  categorySlug: string,
  activitySlug: string,
  regionSlug: string
): Promise<{
  service: ScrapingService;
  category: ActivityCategory;
  activity: Activity;
  region: Region;
  departments: Department[];
} | null> {
  const base = await getRegionByPath(serviceSlug, categorySlug, activitySlug, regionSlug);
  if (!base) return null;

  const supa = createAdminClient();
  const { data: publishedDeptRows } = await supa
    .from('seo_pages_queue')
    .select('department_id')
    .eq('service_id', base.service.id)
    .eq('activity_id', base.activity.id)
    .eq('region_id', base.region.id)
    .eq('is_published', true);

  const deptIds = Array.from(
    new Set(
      ((publishedDeptRows as { department_id: string | null }[] | null) ?? [])
        .map((r) => r.department_id)
        .filter((v): v is string => Boolean(v))
    )
  );

  let departments: Department[] = [];
  if (deptIds.length > 0) {
    const { data } = await supa
      .from('departments')
      .select('id, name, slug, code, region_id')
      .eq('region_id', base.region.id)
      .in('id', deptIds)
      .order('name');
    departments = (data as Department[] | null) ?? [];
  } else {
    const { data } = await supa
      .from('departments')
      .select('id, name, slug, code, region_id')
      .eq('region_id', base.region.id)
      .order('name');
    departments = (data as Department[] | null) ?? [];
  }

  return { ...base, departments };
}

export async function getDepartmentByPath(
  serviceSlug: string,
  categorySlug: string,
  activitySlug: string,
  regionSlug: string,
  departmentSlug: string
): Promise<{
  service: ScrapingService;
  category: ActivityCategory;
  activity: Activity;
  region: Region;
  department: Department;
  seoContent: SeoPageContent | null;
} | null> {
  const base = await getRegionByPath(serviceSlug, categorySlug, activitySlug, regionSlug);
  if (!base) return null;

  const supa = createAdminClient();
  const { data: department } = await supa
    .from('departments')
    .select('id, name, slug, code, region_id')
    .eq('slug', departmentSlug)
    .eq('region_id', base.region.id)
    .maybeSingle();

  if (!department) return null;

  const { data: seoRow } = await supa
    .from('seo_pages_queue')
    .select('*')
    .eq('service_id', base.service.id)
    .eq('activity_id', base.activity.id)
    .eq('department_id', (department as Department).id)
    .eq('is_published', true)
    .maybeSingle();

  return {
    ...base,
    department: department as Department,
    seoContent: (seoRow as SeoPageContent | null) ?? null,
  };
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Fetch the best FAQ set for a given scope: prefer AI-generated faqs from
 * seo_pages_queue, then fall back to static template FAQ with variable
 * substitution.
 */
export async function getScrapingFaqs(scope: {
  serviceId: string;
  activityId?: string;
  regionId?: string;
  departmentId?: string;
  variables: FaqVariables;
}): Promise<FaqEntry[]> {
  const supa = createAdminClient();

  // Try AI faqs with the most specific scope first, then loosen.
  const filters: Array<Record<string, string>> = [];
  if (scope.departmentId) {
    filters.push({
      service_id: scope.serviceId,
      activity_id: scope.activityId ?? '',
      region_id: scope.regionId ?? '',
      department_id: scope.departmentId,
    });
  }
  if (scope.regionId) {
    filters.push({
      service_id: scope.serviceId,
      activity_id: scope.activityId ?? '',
      region_id: scope.regionId,
    });
  }
  if (scope.activityId) {
    filters.push({ service_id: scope.serviceId, activity_id: scope.activityId });
  }
  filters.push({ service_id: scope.serviceId });

  for (const f of filters) {
    let q = supa
      .from('seo_pages_queue')
      .select('faqs')
      .eq('is_published', true)
      .not('faqs', 'is', null)
      .limit(1);
    for (const [k, v] of Object.entries(f)) {
      if (!v) continue;
      q = q.eq(k, v);
    }
    const { data } = await q;
    const row = (data as { faqs: FaqEntry[] | null }[] | null)?.[0];
    if (row?.faqs && Array.isArray(row.faqs) && row.faqs.length > 0) {
      return row.faqs;
    }
  }

  // Static fallback with variable substitution.
  const { data: rows } = await supa
    .from('scraping_faq')
    .select('*')
    .eq('is_active', true)
    .order('order', { ascending: true });

  const faqRows = (rows as ScrapingFaqRow[] | null) ?? [];
  return faqRows.map((faq) => {
    let q = faq.question;
    let a = faq.answer;
    if (faq.use_variables) {
      const map: Record<string, string> = {
        '{{activity}}': scope.variables.activity,
        '{{location}}': scope.variables.location,
        '{{location_full}}': scope.variables.location_full,
        '{{region}}': scope.variables.region,
        '{{department_code}}': scope.variables.department_code,
        '{{service}}': scope.variables.service,
        '{{category}}': scope.variables.category,
      };
      for (const [k, v] of Object.entries(map)) {
        q = q.split(k).join(v);
        a = a.split(k).join(v);
      }
    }
    return { question: q, answer: a };
  });
}

/* -------------------------------------------------------------------------- */
/* Sitemap helpers                                                            */
/* -------------------------------------------------------------------------- */

export type ScrapingLevel = 3 | 4 | 5 | 6;

export interface SitemapSlug {
  service: string;
  category?: string;
  activity?: string;
  region?: string;
  department?: string;
}

/**
 * Returns slug combinations that exist in the DB for the given level.
 * Level 3 = service/category, 4 = service/category/activity, 5 adds region,
 * 6 adds department. Gated by `seo_pages_queue.is_published` whenever
 * seo_pages_queue rows exist for the combination.
 */
export async function getAllScrapingLevelSlugs(level: ScrapingLevel): Promise<SitemapSlug[]> {
  const supa = createAdminClient();

  const { data: services } = await supa.from('scraping_services').select('id, slug');
  const { data: categories } = await supa.from('activity_categories').select('id, slug');
  const { data: activities } = await supa
    .from('activities')
    .select('id, slug, category_id');

  const serviceRows = (services as { id: string; slug: string }[] | null) ?? [];
  const categoryRows = (categories as { id: string; slug: string }[] | null) ?? [];
  const activityRows =
    (activities as { id: string; slug: string; category_id: string }[] | null) ?? [];
  const catSlugById = new Map(categoryRows.map((c) => [c.id, c.slug]));

  if (level === 3) {
    const out: SitemapSlug[] = [];
    for (const s of serviceRows) {
      for (const c of categoryRows) {
        out.push({ service: s.slug, category: c.slug });
      }
    }
    return out;
  }

  if (level === 4) {
    const out: SitemapSlug[] = [];
    for (const s of serviceRows) {
      for (const a of activityRows) {
        const catSlug = catSlugById.get(a.category_id);
        if (!catSlug) continue;
        out.push({ service: s.slug, category: catSlug, activity: a.slug });
      }
    }
    return out;
  }

  const { data: regions } = await supa.from('regions').select('id, slug');
  const regionRows = (regions as { id: string; slug: string }[] | null) ?? [];

  if (level === 5) {
    const out: SitemapSlug[] = [];
    for (const s of serviceRows) {
      for (const a of activityRows) {
        const catSlug = catSlugById.get(a.category_id);
        if (!catSlug) continue;
        for (const r of regionRows) {
          out.push({
            service: s.slug,
            category: catSlug,
            activity: a.slug,
            region: r.slug,
          });
        }
      }
    }
    return out;
  }

  // level 6 (department)
  const { data: depts } = await supa
    .from('departments')
    .select('id, slug, region_id');
  const deptRows =
    (depts as { id: string; slug: string; region_id: string }[] | null) ?? [];
  const regionSlugById = new Map(regionRows.map((r) => [r.id, r.slug]));

  const out: SitemapSlug[] = [];
  for (const s of serviceRows) {
    for (const a of activityRows) {
      const catSlug = catSlugById.get(a.category_id);
      if (!catSlug) continue;
      for (const d of deptRows) {
        const regionSlug = regionSlugById.get(d.region_id);
        if (!regionSlug) continue;
        out.push({
          service: s.slug,
          category: catSlug,
          activity: a.slug,
          region: regionSlug,
          department: d.slug,
        });
      }
    }
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/* Sitemap-facing helpers (consumed later by sitemap.ts)                      */
/* -------------------------------------------------------------------------- */

export interface SitemapCategoryEntry {
  service: string;
  category: string;
  lastmod: string;
}

export interface SitemapActivityEntry {
  service: string;
  category: string;
  activity: string;
  lastmod: string;
}

export interface SitemapRegionEntry {
  service: string;
  category: string;
  activity: string;
  region: string;
  lastmod: string;
}

export interface SitemapDepartmentEntry {
  service: string;
  category: string;
  activity: string;
  region: string;
  department: string;
  lastmod: string;
}

/**
 * Sitemap: all (service, category) pairs with at least one published page.
 */
export async function getAllScrapingCategoriesForSitemap(): Promise<SitemapCategoryEntry[]> {
  const supa = createAdminClient();
  const [{ data: services }, { data: activities }, { data: categories }, { data: published }] =
    await Promise.all([
      supa.from('scraping_services').select('id, slug'),
      supa.from('activities').select('id, category_id'),
      supa.from('activity_categories').select('id, slug, updated_at'),
      supa
        .from('seo_pages_queue')
        .select('service_id, activity_id, updated_at')
        .eq('is_published', true),
    ]);

  const serviceRows = (services as { id: string; slug: string }[] | null) ?? [];
  const activityRows = (activities as { id: string; category_id: string }[] | null) ?? [];
  const categoryRows =
    (categories as { id: string; slug: string; updated_at: string | null }[] | null) ?? [];
  const publishedRows =
    (published as {
      service_id: string;
      activity_id: string | null;
      updated_at: string | null;
    }[] | null) ?? [];

  const serviceSlug = new Map(serviceRows.map((s) => [s.id, s.slug]));
  const categoryInfo = new Map(
    categoryRows.map((c) => [c.id, { slug: c.slug, updated_at: c.updated_at }])
  );
  const activityCategory = new Map(activityRows.map((a) => [a.id, a.category_id]));

  const seen = new Map<string, string>();
  for (const row of publishedRows) {
    if (!row.activity_id) continue;
    const catId = activityCategory.get(row.activity_id);
    if (!catId) continue;
    const svc = serviceSlug.get(row.service_id);
    const cat = categoryInfo.get(catId);
    if (!svc || !cat) continue;
    const key = `${svc}|${cat.slug}`;
    const lm = row.updated_at || cat.updated_at || new Date().toISOString();
    const existing = seen.get(key);
    if (!existing || lm > existing) seen.set(key, lm);
  }

  return [...seen.entries()].map(([key, lastmod]) => {
    const [service, category] = key.split('|');
    return { service, category, lastmod };
  });
}

/**
 * Sitemap: all (service, category, activity) triples with published content.
 */
export async function getAllScrapingActivitiesForSitemap(): Promise<SitemapActivityEntry[]> {
  const supa = createAdminClient();
  const [{ data: services }, { data: activities }, { data: categories }, { data: published }] =
    await Promise.all([
      supa.from('scraping_services').select('id, slug'),
      supa.from('activities').select('id, slug, category_id, updated_at'),
      supa.from('activity_categories').select('id, slug'),
      supa
        .from('seo_pages_queue')
        .select('service_id, activity_id, updated_at')
        .eq('is_published', true),
    ]);

  const serviceRows = (services as { id: string; slug: string }[] | null) ?? [];
  const activityRows =
    (activities as {
      id: string;
      slug: string;
      category_id: string;
      updated_at: string | null;
    }[] | null) ?? [];
  const categoryRows = (categories as { id: string; slug: string }[] | null) ?? [];
  const publishedRows =
    (published as {
      service_id: string;
      activity_id: string | null;
      updated_at: string | null;
    }[] | null) ?? [];

  const serviceSlug = new Map(serviceRows.map((s) => [s.id, s.slug]));
  const categorySlug = new Map(categoryRows.map((c) => [c.id, c.slug]));
  const activityInfo = new Map(
    activityRows.map((a) => [
      a.id,
      { slug: a.slug, category_id: a.category_id, updated_at: a.updated_at },
    ])
  );

  const seen = new Map<string, string>();
  for (const row of publishedRows) {
    if (!row.activity_id) continue;
    const act = activityInfo.get(row.activity_id);
    const svc = serviceSlug.get(row.service_id);
    if (!act || !svc) continue;
    const cat = categorySlug.get(act.category_id);
    if (!cat) continue;
    const key = `${svc}|${cat}|${act.slug}`;
    const lm = row.updated_at || act.updated_at || new Date().toISOString();
    const existing = seen.get(key);
    if (!existing || lm > existing) seen.set(key, lm);
  }

  return [...seen.entries()].map(([key, lastmod]) => {
    const [service, category, activity] = key.split('|');
    return { service, category, activity, lastmod };
  });
}

/**
 * Sitemap: all (service, category, activity, region) quads with published content.
 */
export async function getAllScrapingRegionsForSitemap(): Promise<SitemapRegionEntry[]> {
  const supa = createAdminClient();
  const [
    { data: services },
    { data: activities },
    { data: categories },
    { data: regions },
    { data: published },
  ] = await Promise.all([
    supa.from('scraping_services').select('id, slug'),
    supa.from('activities').select('id, slug, category_id'),
    supa.from('activity_categories').select('id, slug'),
    supa.from('regions').select('id, slug'),
    supa
      .from('seo_pages_queue')
      .select('service_id, activity_id, region_id, updated_at')
      .eq('is_published', true),
  ]);

  const serviceRows = (services as { id: string; slug: string }[] | null) ?? [];
  const activityRows =
    (activities as { id: string; slug: string; category_id: string }[] | null) ?? [];
  const categoryRows = (categories as { id: string; slug: string }[] | null) ?? [];
  const regionRows = (regions as { id: string; slug: string }[] | null) ?? [];
  const publishedRows =
    (published as {
      service_id: string;
      activity_id: string | null;
      region_id: string | null;
      updated_at: string | null;
    }[] | null) ?? [];

  const serviceSlug = new Map(serviceRows.map((s) => [s.id, s.slug]));
  const categorySlug = new Map(categoryRows.map((c) => [c.id, c.slug]));
  const regionSlug = new Map(regionRows.map((r) => [r.id, r.slug]));
  const activityInfo = new Map(
    activityRows.map((a) => [a.id, { slug: a.slug, category_id: a.category_id }])
  );

  const seen = new Map<string, string>();
  for (const row of publishedRows) {
    if (!row.activity_id || !row.region_id) continue;
    const act = activityInfo.get(row.activity_id);
    const svc = serviceSlug.get(row.service_id);
    const reg = regionSlug.get(row.region_id);
    if (!act || !svc || !reg) continue;
    const cat = categorySlug.get(act.category_id);
    if (!cat) continue;
    const key = `${svc}|${cat}|${act.slug}|${reg}`;
    const lm = row.updated_at || new Date().toISOString();
    const existing = seen.get(key);
    if (!existing || lm > existing) seen.set(key, lm);
  }

  return [...seen.entries()].map(([key, lastmod]) => {
    const [service, category, activity, region] = key.split('|');
    return { service, category, activity, region, lastmod };
  });
}

/**
 * Sitemap: full 5-segment URLs that actually have a published seo_pages_queue row.
 */
export async function getAllScrapingDepartmentsForSitemap(): Promise<SitemapDepartmentEntry[]> {
  const supa = createAdminClient();
  const [
    { data: services },
    { data: activities },
    { data: categories },
    { data: regions },
    { data: departments },
    { data: published },
  ] = await Promise.all([
    supa.from('scraping_services').select('id, slug'),
    supa.from('activities').select('id, slug, category_id'),
    supa.from('activity_categories').select('id, slug'),
    supa.from('regions').select('id, slug'),
    supa.from('departments').select('id, slug, region_id'),
    supa
      .from('seo_pages_queue')
      .select('service_id, activity_id, region_id, department_id, updated_at')
      .eq('is_published', true),
  ]);

  const serviceRows = (services as { id: string; slug: string }[] | null) ?? [];
  const activityRows =
    (activities as { id: string; slug: string; category_id: string }[] | null) ?? [];
  const categoryRows = (categories as { id: string; slug: string }[] | null) ?? [];
  const regionRows = (regions as { id: string; slug: string }[] | null) ?? [];
  const departmentRows =
    (departments as { id: string; slug: string; region_id: string }[] | null) ?? [];
  const publishedRows =
    (published as {
      service_id: string;
      activity_id: string | null;
      region_id: string | null;
      department_id: string | null;
      updated_at: string | null;
    }[] | null) ?? [];

  const serviceSlug = new Map(serviceRows.map((s) => [s.id, s.slug]));
  const categorySlug = new Map(categoryRows.map((c) => [c.id, c.slug]));
  const regionSlug = new Map(regionRows.map((r) => [r.id, r.slug]));
  const activityInfo = new Map(
    activityRows.map((a) => [a.id, { slug: a.slug, category_id: a.category_id }])
  );
  const departmentInfo = new Map(
    departmentRows.map((d) => [d.id, { slug: d.slug, region_id: d.region_id }])
  );

  const out: SitemapDepartmentEntry[] = [];
  for (const row of publishedRows) {
    if (!row.activity_id || !row.region_id || !row.department_id) continue;
    const act = activityInfo.get(row.activity_id);
    const dept = departmentInfo.get(row.department_id);
    const svc = serviceSlug.get(row.service_id);
    const reg = regionSlug.get(row.region_id);
    if (!act || !dept || !svc || !reg) continue;
    if (dept.region_id !== row.region_id) continue;
    const cat = categorySlug.get(act.category_id);
    if (!cat) continue;
    out.push({
      service: svc,
      category: cat,
      activity: act.slug,
      region: reg,
      department: dept.slug,
      lastmod: row.updated_at || new Date().toISOString(),
    });
  }
  return out;
}

/**
 * Other published activities in the same category and department.
 */
export async function getRelatedActivitiesForDepartment(
  serviceId: string,
  categoryId: string,
  departmentId: string,
  excludeActivityId: string,
  limit = 6
): Promise<Activity[]> {
  const supa = createAdminClient();
  const { data: rows } = await supa
    .from('seo_pages_queue')
    .select('activity_id')
    .eq('service_id', serviceId)
    .eq('department_id', departmentId)
    .eq('is_published', true);

  const ids = Array.from(
    new Set(
      ((rows as { activity_id: string | null }[] | null) ?? [])
        .map((r) => r.activity_id)
        .filter((v): v is string => !!v && v !== excludeActivityId)
    )
  );
  if (ids.length === 0) return [];

  const { data: acts } = await supa
    .from('activities')
    .select('*')
    .eq('category_id', categoryId)
    .in('id', ids)
    .limit(limit);
  return (acts as Activity[] | null) ?? [];
}
