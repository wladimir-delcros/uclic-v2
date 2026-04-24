import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import { normalizeImageUrl as normalizeStorageUrl } from '@/lib/supabase/config';

/**
 * Helper to normalize image URLs
 * Blocks WordPress URLs to avoid external calls
 * For Supabase URLs, clean trailing ? then delegate to centralised rewriter
 */
function normalizeImageUrl(url?: string | null): string | null {
  if (!url) return null;

  // Block WordPress URLs - return placeholder instead
  if (url.includes('api.uclic.fr') || url.includes('wp-content')) {
    return '/images/placeholder-blog.svg';
  }

  // For Supabase Storage URLs, clean the trailing ? then rewrite online→local if needed
  if (url.includes('/storage/v1/object/public/')) {
    const cleaned = url.split('?')[0].replace(/[?&]$/, '').trim();
    return normalizeStorageUrl(cleaned) || cleaned;
  }

  return url;
}

// Interface matching the Supabase structure
export interface Levee {
  id: number;
  wordpress_post_id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  company: string | null;
  date_text: string | null;
  amount_text: string | null;
  deal_type: string | null;
  external_id: string | null;
  featured_image_url: string | null;
  status: string;
  author_id: number | null;
  created_at: string;
  updated_at: string;
}

// Interface matching WordPress Levee structure for compatibility
export interface WordPressLevee {
  id: string;
  title: string;
  slug: string;
  date: string;
  modified: string;
  content: string;
  excerpt: string;
  company: string;
  dateText: string;
  amountText: string;
  dealType: string;
  author?: string;
  authorSlug?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorLinkedIn?: string;
  authorTwitter?: string;
  authorGitHub?: string;
  authorSpotify?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
  };
}

/**
 * Generate Supabase Storage URL from slug if featured_image_url is null
 */
function generateImageUrlFromSlug(slug: string): string {
  const supabaseBase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cdnBase = process.env.NEXT_PUBLIC_STORAGE_CDN_BASE_URL;
  const baseUrl = cdnBase || supabaseBase;

  if (!baseUrl) return '';

  const cleanSlug = slug.toLowerCase().trim();
  return `${baseUrl}/storage/v1/object/public/media/levees/${cleanSlug}.jpg`;
}

/**
 * Normalize levee data to WordPress-compatible format
 */
function mapToWordPressLevee(
  levee: Levee,
  includeContent: boolean = false,
  authorData?: {
    name: string;
    slug: string;
    avatar_url?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
    spotify?: string | null;
  }
): WordPressLevee {
  // First try to normalize existing featured_image_url
  let imageUrl = normalizeImageUrl(levee.featured_image_url);

  // If no image URL and we have a slug, generate URL from slug
  if (!imageUrl || imageUrl === '/images/placeholder-blog.svg') {
    const generatedUrl = generateImageUrlFromSlug(levee.slug);
    if (generatedUrl) {
      imageUrl = generatedUrl;
    }
  }

  const featuredImage =
    imageUrl && imageUrl !== '/images/placeholder-blog.svg'
      ? {
          node: {
            sourceUrl: imageUrl,
            altText: levee.title,
          },
        }
      : undefined;

  const date = levee.created_at || new Date().toISOString();
  const modified = levee.updated_at || date;

  const authorAvatar = authorData?.avatar_url
    ? normalizeImageUrl(authorData.avatar_url)
    : undefined;

  return {
    id: levee.id.toString(),
    title: levee.title ?? '',
    slug: levee.slug,
    date,
    modified,
    content: includeContent ? levee.content_html ?? '' : '',
    excerpt: levee.excerpt ?? '',
    company: levee.company ?? '',
    dateText: levee.date_text ?? '',
    amountText: levee.amount_text ?? '',
    dealType: levee.deal_type ?? '',
    ...(featuredImage && { featuredImage }),
    ...(authorData && {
      author: authorData.name,
      authorSlug: authorData.slug,
      authorAvatar: authorAvatar || undefined,
      authorBio: authorData.bio || undefined,
      authorLinkedIn: authorData.linkedin || undefined,
      authorTwitter: authorData.twitter || undefined,
      authorGitHub: authorData.github || undefined,
      authorSpotify: authorData.spotify || undefined,
    }),
  };
}

/**
 * Get all published levees
 */
export async function getAllLevees(): Promise<WordPressLevee[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('levees_de_fonds')
    .select('*')
    .eq('status', 'publish')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all levees:', error);
    return [];
  }

  if (!data) return [];

  return data.map((levee) => mapToWordPressLevee(levee as Levee));
}

/**
 * Get levee by slug (with author join). Returns WordPress-compatible format.
 */
export async function getLeveeBySlug(slug: string): Promise<WordPressLevee | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('levees_de_fonds')
    .select(
      `
      *,
      authors (
        id,
        name,
        slug,
        avatar_url,
        bio
      )
    `
    )
    .eq('slug', slug)
    .eq('status', 'publish')
    .single();

  if (error) {
    console.error('Error fetching levee by slug:', error);
    return null;
  }

  if (!data) return null;

  const row = data as Levee & {
    authors?: {
      id: number;
      name: string;
      slug: string | null;
      avatar_url: string | null;
      bio: string | null;
    } | null;
  };

  const isWladimir =
    row.authors &&
    (row.authors.name === 'Wladimir Delcros' ||
      row.authors.name === 'Wladimir.Delcros.44');

  const authorData = row.authors
    ? {
        name: row.authors.name,
        slug: row.authors.slug ?? '',
        avatar_url: row.authors.avatar_url,
        bio: row.authors.bio,
        linkedin: isWladimir ? 'https://www.linkedin.com/in/wladimir-delcros/' : undefined,
        twitter: isWladimir ? 'https://x.com/delcros_w' : undefined,
        github: isWladimir ? 'https://github.com/wladimir-delcros' : undefined,
        spotify: isWladimir
          ? 'https://open.spotify.com/episode/6oN7OBOaooqdFnT0czddrc'
          : undefined,
      }
    : undefined;

  return mapToWordPressLevee(row, true, authorData);
}

/**
 * Get related levees (exclude current slug, limit count)
 */
export async function getRelatedLevees(
  currentSlug: string,
  count: number = 3
): Promise<WordPressLevee[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('levees_de_fonds')
    .select('*')
    .eq('status', 'publish')
    .neq('slug', currentSlug)
    .order('created_at', { ascending: false })
    .limit(count);

  if (error) {
    console.error('Error fetching related levees:', error);
    return [];
  }

  if (!data) return [];

  return data.map((levee) => mapToWordPressLevee(levee as Levee));
}

/**
 * Get latest levees (exclude specific IDs, limit count)
 */
export async function getLatestLevees(
  count: number = 3,
  excludeIds: string[] = []
): Promise<WordPressLevee[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from('levees_de_fonds')
    .select('*')
    .eq('status', 'publish')
    .order('created_at', { ascending: false });

  if (excludeIds.length > 0) {
    const excludeIdsNumeric = excludeIds
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));
    if (excludeIdsNumeric.length > 0) {
      query = query.not('id', 'in', `(${excludeIdsNumeric.join(',')})`);
    }
  }

  const { data, error } = await query.limit(count);

  if (error) {
    console.error('Error fetching latest levees:', error);
    return [];
  }

  if (!data) return [];

  return data.map((levee) => mapToWordPressLevee(levee as Levee));
}

/**
 * Get a paginated slice of levees with total count (for listing + pagination).
 */
export async function getLeveesPaginated(
  page: number,
  perPage: number
): Promise<{ levees: WordPressLevee[]; total: number; totalPages: number }> {
  const supabase = createAdminClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await supabase
    .from('levees_de_fonds')
    .select('*', { count: 'exact', head: false })
    .eq('status', 'publish')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching paginated levees:', error);
    return { levees: [], total: 0, totalPages: 0 };
  }

  const total = count ?? 0;
  const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 0;
  const levees = (data ?? []).map((l) => mapToWordPressLevee(l as Levee));
  return { levees, total, totalPages };
}

/**
 * Get top N most recent slugs for SSG; returns the slug list.
 */
export async function getTopLeveeSlugs(limit: number = 50): Promise<string[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('levees_de_fonds')
    .select('slug, created_at')
    .eq('status', 'publish')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top levee slugs:', error);
    return [];
  }

  if (!data) return [];

  return data.map((l: { slug: string }) => l.slug);
}

/**
 * Get all levee slugs for sitemap
 */
export async function getAllLeveeSlugsForSitemap(): Promise<
  Array<{ slug: string; lastmod: string }>
> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('levees_de_fonds')
    .select('slug, updated_at')
    .eq('status', 'publish');

  if (error) {
    console.error('Error fetching levee slugs for sitemap:', error);
    return [];
  }

  if (!data) return [];

  return data.map((levee: { slug: string; updated_at: string | null }) => ({
    slug: levee.slug,
    lastmod: levee.updated_at
      ? new Date(levee.updated_at).toISOString()
      : new Date().toISOString(),
  }));
}
