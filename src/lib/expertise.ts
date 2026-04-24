import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

const EXPERTISES_TABLE = 'expertises';
const CATEGORIES_TABLE = 'expertise_categories';

// Interfaces moved from wordpress.ts for independence
export interface ExpertiseFields {
  tag: string;
  h1: string;
  subtitle: string;
  h21: string;
  titrebox1: string;
  description1: string;
  titrebox2: string;
  description2: string;
  titrebox3: string;
  description3: string;
  marqueeRelatedCat: string | null;
  moreRelatedCat: string | null;
  h22: string;
  content2: string;
  processLittleTitle: string;
  processTitle: string;
  processDescription: string;
  processTitre1: string;
  processTitre2: string;
  processTitre3: string;
  descriptionTitre1: string;
  descriptionTitre2: string;
  descriptionTitre3: string;
  faqSubtitle: string;
  faqTitle1: string;
  faqDesc1: string;
  faqTitle2: string;
  faqDesc2: string;
  faqTitle3: string;
  faqDesc3: string;
  faqTitle4: string;
  faqDesc4: string;
  faqTitle5: string;
  faqDesc5: string;
  faqTitle6: string;
  faqDesc6: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Expertise {
  id: string;
  title: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  expertiseFields: ExpertiseFields;
  expertiseGrowthCategories?: {
    nodes: Array<{
      name: string;
      slug: string;
      description?: string | null;
    }>;
  };
}

export interface ExpertiseCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

export interface ExpertiseCategoryFields {
  tag: string;
  h1: string;
  subtitle: string;
  h21: string;
  titrebox1: string;
  description1: string;
  titrebox2: string;
  description2: string;
  titrebox3: string;
  description3: string;
  marqueeRelatedCat: string | null;
  moreRelatedCat: string | null;
  h22: string;
  content2: string;
  processLittleTitle: string;
  processTitle: string;
  processDescription: string;
  processTitre1: string;
  processTitre2: string;
  processTitre3: string;
  descriptionTitre1: string;
  descriptionTitre2: string;
  descriptionTitre3: string;
  faqSubtitle: string;
  faqTitle1: string;
  faqDesc1: string;
  faqTitle2: string;
  faqDesc2: string;
  faqTitle3: string;
  faqDesc3: string;
  faqTitle4: string;
  faqDesc4: string;
  faqTitle5: string;
  faqDesc5: string;
  faqTitle6: string;
  faqDesc6: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ExpertiseCategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  expertiseFields: ExpertiseCategoryFields;
}

export interface ExpertisePost {
  id: string;
  title: string;
  slug: string;
  uri: string;
  expertiseFields: ExpertiseFields;
  categories?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

// Alias for menu compatibility
export type ExpertiseGrowthCategory = ExpertiseCategory;

export interface ExpertiseByCategory {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  expertiseFields?: {
    subtitle?: string;
  };
  expertiseGrowthCategories: {
    nodes: ExpertiseGrowthCategory[];
  };
}

/**
 * Get all expertise categories for menu (alias for getExpertiseCategories)
 */
export async function getAllExpertiseGrowthCategoriesForMenu(): Promise<ExpertiseGrowthCategory[]> {
  const categories = await getExpertiseCategories();
  // Filtrer pour exclure "Agence Web" et "Marketing Digital" du menu
  return categories.filter(
    category => category.slug !== 'agence-web' && category.slug !== 'marketing-digital'
  );
}

// Helper to normalize image URLs to CDN if configured
// normalizeImageUrl imported from @/lib/supabase/config

// Map Supabase row (snake_case) to ExpertiseFields (camelCase)
function mapToExpertiseFields(row: any): ExpertiseFields {
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
    marqueeRelatedCat: row.marquee_related_cat || null,
    moreRelatedCat: row.more_related_cat || null,
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

// Map Supabase row to Expertise interface
function mapToExpertise(row: any): Expertise {
  const expertiseFields = mapToExpertiseFields(row);
  
  // Build expertiseGrowthCategories from growth_terms array
  const categories = row.growth_terms
    ? row.growth_terms.map((slug: string) => ({
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        slug,
        description: null,
      }))
    : [];
  
  return {
    id: row.id.toString(),
    title: row.title,
    slug: row.slug,
    created_at: row.created_at || undefined,
    updated_at: row.updated_at || undefined,
    expertiseFields,
    expertiseGrowthCategories: categories.length > 0 ? { nodes: categories } : undefined,
  };
}

// Map Supabase category row to ExpertiseCategoryFields
function mapToCategoryFields(row: any): ExpertiseCategoryFields {
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
    marqueeRelatedCat: row.marquee_related_cat || null,
    moreRelatedCat: row.more_related_cat || null,
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

/**
 * Fetch all expertises from Supabase
 * Filters by status='publish' and orders by created_at ASC
 */
export async function fetchAllExpertises(): Promise<Expertise[]> {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('*')
    .eq('status', 'publish')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching expertises from Supabase:', error);
    return [];
  }
  
  return (data ?? []).map(mapToExpertise);
}

/**
 * Get a single expertise by slug
 */
export async function getExpertiseBySlug(slug: string): Promise<Expertise | null> {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'publish')
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching expertise from Supabase:', error);
    return null;
  }
  
  if (!data) return null;
  
  return mapToExpertise(data);
}

/**
 * Helper function to convert slug to readable name
 */
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Fetch all expertise categories from Supabase
 * Uses expertise_categories table (now populated with data)
 * Also includes count of expertises per category from growth_terms
 */
export async function getExpertiseCategories(): Promise<ExpertiseCategory[]> {
  const supabase = createAdminClient();
  
  // Get categories from expertise_categories table
  // Use no-store to avoid stale cache showing old slugs like 'freelance-seo'
  const { data: dbCategories, error: catError } = await supabase
    .from(CATEGORIES_TABLE)
    .select('id, slug, name, description')
    .order('name', { ascending: true });
  
  if (catError) {
    console.error('Error fetching categories from Supabase:', catError);
    return [];
  }
  
  if (!dbCategories || dbCategories.length === 0) {
    // Fallback: extract from growth_terms if table is empty
    const { data: expertises } = await supabase
      .from(EXPERTISES_TABLE)
      .select('growth_terms')
      .eq('status', 'publish');
    
    const counts: Record<string, number> = {};
    const uniqueSlugs = new Set<string>();
    (expertises || []).forEach((exp: any) => {
      if (exp.growth_terms && Array.isArray(exp.growth_terms)) {
        exp.growth_terms.forEach((catSlug: string) => {
          uniqueSlugs.add(catSlug);
          counts[catSlug] = (counts[catSlug] || 0) + 1;
        });
      }
    });
    
    return Array.from(uniqueSlugs)
      .map((slug, index) => ({
        id: `extracted-${index}`,
        name: slugToName(slug),
        slug,
        count: counts[slug] || 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Get count of expertises per category from growth_terms
  const { data: expertises, error: expError } = await supabase
    .from(EXPERTISES_TABLE)
    .select('growth_terms')
    .eq('status', 'publish');
  
  // Count expertises per category slug
  const counts: Record<string, number> = {};
  if (!expError && expertises) {
    (expertises || []).forEach((exp: any) => {
      if (exp.growth_terms && Array.isArray(exp.growth_terms)) {
        exp.growth_terms.forEach((catSlug: string) => {
          counts[catSlug] = (counts[catSlug] || 0) + 1;
        });
      }
    });
  }
  
  // Return categories from database with counts
  return dbCategories.map(cat => ({
    id: cat.id.toString(),
    name: cat.name,
    slug: cat.slug,
    description: cat.description || undefined,
    count: counts[cat.slug] || 0,
  }));
}

/**
 * Get a single expertise category by slug with all ACF fields
 * Uses expertise_categories table (now populated with data)
 */
export async function getExpertiseCategoryBySlug(slug: string): Promise<ExpertiseCategoryData | null> {
  const supabase = createAdminClient();
  
  // Get from expertise_categories table
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching category from Supabase:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    id: data.id.toString(),
    name: data.name,
    slug: data.slug,
    description: data.description || null,
    created_at: data.created_at || undefined,
    updated_at: data.updated_at || undefined,
    expertiseFields: mapToCategoryFields(data),
  };
}

/**
 * Get the primary category slug for an expertise (same source as mega menu: growth_terms).
 * Returns growth_terms[0] or null. Use this to keep agence page "other expertises" in sync with header hierarchy.
 */
export async function getCategorySlugForExpertise(expertiseSlug: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('growth_terms')
    .eq('slug', expertiseSlug)
    .eq('status', 'publish')
    .single();

  if (error || !data?.growth_terms || !Array.isArray(data.growth_terms) || data.growth_terms.length === 0) {
    return null;
  }
  return data.growth_terms[0];
}

/**
 * Get expertises by category slug (using growth_terms array)
 * Returns as ExpertisePost[] for compatibility
 * Optimized: only fetches columns needed by callers (marquee, JSON-LD, CSV export)
 */
export async function getExpertisesByCategory(categorySlug: string): Promise<ExpertisePost[]> {
  const supabase = createAdminClient();

  // Filter server-side with PostgREST contains operator + select only needed columns
  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('id, title, slug, subtitle, growth_terms, created_at')
    .eq('status', 'publish')
    .contains('growth_terms', [categorySlug])
    .order('created_at', { ascending: true });

  if (error) {
    console.error(`Error fetching expertises for category ${categorySlug}:`, error);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: String(row.id),
    title: row.title || '',
    slug: row.slug || '',
    uri: `/expertise/${categorySlug}/${row.slug}`,
    expertiseFields: {
      tag: '', h1: '', subtitle: row.subtitle || '',
      h21: '', titrebox1: '', description1: '', titrebox2: '', description2: '',
      titrebox3: '', description3: '', marqueeRelatedCat: null, moreRelatedCat: null,
      h22: '', content2: '', processLittleTitle: '', processTitle: '', processDescription: '',
      processTitre1: '', processTitre2: '', processTitre3: '',
      descriptionTitre1: '', descriptionTitre2: '', descriptionTitre3: '',
      faqSubtitle: '', faqTitle1: '', faqDesc1: '', faqTitle2: '', faqDesc2: '',
      faqTitle3: '', faqDesc3: '', faqTitle4: '', faqDesc4: '',
      faqTitle5: '', faqDesc5: '', faqTitle6: '', faqDesc6: '',
      metaTitle: '', metaDescription: '',
    },
    categories: {
      nodes: (row.growth_terms || []).map((slug: string) => ({
        id: `cat-${slug}`,
        name: slugToName(slug),
        slug,
      })),
    },
  }));
}

/**
 * Get expertises by category as ExpertiseByCategory format (for menu compatibility)
 * Optimized: only fetches the columns needed for menu/home display
 */
export async function getExpertisesByCategoryAsByCategory(categorySlug: string): Promise<ExpertiseByCategory[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('id, title, slug, growth_terms, created_at')
    .eq('status', 'publish')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(`Error fetching expertises for category ${categorySlug}:`, error);
    return [];
  }

  return (data || [])
    .filter((row: any) =>
      row.growth_terms && Array.isArray(row.growth_terms) && row.growth_terms.includes(categorySlug)
    )
    .map((row: any) => ({
      id: String(row.id),
      title: row.title || '',
      slug: row.slug || '',
      date: row.created_at || new Date().toISOString(),
      content: '',
      expertiseFields: {
        subtitle: '',
      },
      expertiseGrowthCategories: {
        nodes: (row.growth_terms || []).map((slug: string, i: number) => ({
          id: `cat-${i}`,
          name: slugToName(slug),
          slug,
        })),
      },
    }));
}

/** Pilier pour le marquee home (aligné avec le mega menu) */
export type MarqueePillar = 'inbound' | 'outbound' | 'ops';

export interface MarqueeExpertiseLink {
  text: string;
  href: string;
  description: string;
  pillar?: MarqueePillar;
}

const MARQUEE_PILLAR_BY_CATEGORY: Record<string, MarqueePillar> = {
  'agence-seo': 'inbound',
  'agence-paid-media': 'inbound',
  'agence-sma': 'inbound',
  'growth-marketing': 'outbound',
  'agence-intelligence-artificielle': 'ops',
  'crm-gestion-de-la-relation-client': 'ops',
  'agence-data-analytics': 'ops',
  'agence-branding': 'ops',
};

/**
 * Récupère les liens expertises pour le marquee home (même source que le mega menu).
 * Retourne firstLine et secondLine pour affichage sur 2 lignes.
 */
export async function getMarqueeExpertiseLinks(): Promise<{
  firstLine: MarqueeExpertiseLink[];
  secondLine: MarqueeExpertiseLink[];
}> {
  const categories = await getAllExpertiseGrowthCategoriesForMenu();
  const allItems: MarqueeExpertiseLink[] = [];

  for (const category of categories) {
    const expertises = await getExpertisesByCategoryAsByCategory(category.slug);
    const pillar = MARQUEE_PILLAR_BY_CATEGORY[category.slug] ?? 'inbound';
    for (const exp of expertises) {
      allItems.push({
        text: exp.title,
        href: `/expertise/${category.slug}/${exp.slug}`,
        description: exp.expertiseFields?.subtitle ?? exp.title,
        pillar,
      });
    }
  }

  const mid = Math.ceil(allItems.length / 2);
  return {
    firstLine: allItems.slice(0, mid),
    secondLine: allItems.slice(mid),
  };
}

/**
 * Get all expertise slugs for sitemap generation
 */
export async function getAllExpertiseSlugsForSitemap(): Promise<Array<{ slug: string; lastmod: string; categorySlug?: string }>> {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('slug, updated_at, created_at, growth_terms')
    .eq('status', 'publish');
  
  if (error) {
    console.error('Error fetching expertise slugs for sitemap:', error);
    return [];
  }
  
  const results: Array<{ slug: string; lastmod: string; categorySlug?: string }> = [];
  
  (data ?? []).forEach((row: any) => {
    const lastmod = row.updated_at || row.created_at || new Date().toISOString();
    const categorySlug = row.growth_terms && row.growth_terms.length > 0 ? row.growth_terms[0] : undefined;
    
    if (categorySlug) {
      results.push({
        slug: row.slug,
        lastmod,
        categorySlug,
      });
    } else {
      results.push({
        slug: row.slug,
        lastmod,
      });
    }
  });
  
  return results;
}

/**
 * Client-side fetch for expertises (used in Client Components as fallback)
 * Uses browser Supabase client with anon key
 */
export async function fetchAllExpertisesClient(): Promise<Expertise[]> {
  const supabase = createBrowserClient();
  
  const { data, error } = await supabase
    .from(EXPERTISES_TABLE)
    .select('*')
    .eq('status', 'publish')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching expertises from Supabase (client):', error);
    return [];
  }
  
  return (data ?? []).map(mapToExpertise);
}

