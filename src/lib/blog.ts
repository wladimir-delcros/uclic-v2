import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import { normalizeImageUrl, getSupabaseUrl } from '@/lib/supabase/config';

const POSTS_TABLE = 'blog_posts';
const CATEGORIES_TABLE = 'categories';
const TAGS_TABLE = 'tags';
const AUTHORS_TABLE = 'authors';
const POST_CATEGORIES_TABLE = 'post_categories';
const POST_TAGS_TABLE = 'post_tags';

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified?: string;
  author: string;
  author_slug?: string;
  slug: string;
  category: string;
  reading_time: string;
  featured_image_url: string;
  tags: string[];
}

export interface BlogAuthor {
  id: number;
  name: string;
  slug: string;
  bio?: string;
  avatar_url?: string;
  linkedin?: string;
  twitter?: string;
}

// Raw Supabase row — kept loose since underlying schema is WordPress-migrated
interface BlogPostRow {
  id: number;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content_html?: string | null;
  featured_image_url?: string | null;
  author_name?: string | null;
  author_id?: number | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  categories?: string[] | null;
  tags?: string[] | null;
  status?: string | null;
}

// ──────────────────────────────────────────────────────────────────────────────
// Image helpers
// ──────────────────────────────────────────────────────────────────────────────

export function getImageUrl(
  url: string | null | undefined,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    resize?: 'cover' | 'contain' | 'fill';
    format?: 'origin' | 'webp';
  }
): string {
  if (!url) {return '';}
  if (url.includes('placeholder') || url.startsWith('/images/')) {return url;}

  const cdnBase = process.env.NEXT_PUBLIC_STORAGE_CDN_BASE_URL;
  const baseUrl = cdnBase || getSupabaseUrl();

  if (
    url.includes('/storage/v1/object/public/') &&
    baseUrl &&
    options &&
    Object.keys(options).length > 0
  ) {
    try {
      const cleanUrlString = url.split('?')[0].replace(/[?&]$/, '').trim();
      const urlObj = new URL(cleanUrlString);
      const pathMatch = urlObj.pathname.match(
        /\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/,
      );
      if (pathMatch) {
        const [, bucket, path] = pathMatch;
        const pathSegments = path.split('/').filter(Boolean);
        const encodedPath = pathSegments
          .map((segment) => {
            try {
              return encodeURIComponent(decodeURIComponent(segment));
            } catch {
              return encodeURIComponent(segment);
            }
          })
          .join('/');

        const params = new URLSearchParams();
        if (options.width && options.width > 0)
          {params.set('width', options.width.toString());}
        if (options.height && options.height > 0)
          {params.set('height', options.height.toString());}
        if (options.quality) {params.set('quality', options.quality.toString());}
        if (options.resize) {params.set('resize', options.resize);}
        if (options.format && options.format !== 'webp') {
          params.set('format', options.format);
        }

        return `${baseUrl}/storage/v1/render/image/public/${bucket}/${encodedPath}?${params.toString()}`;
      }
    } catch {
      // fall through to normalized URL
    }
  }

  return normalizeImageUrl(url) || url;
}

export function getFeaturedImageUrl(
  featuredImageUrl: string | null | undefined,
  size: 'thumbnail' | 'medium' | 'medium_large' | 'large' | 'full' = 'medium',
  customOptions?: {
    width?: number;
    height?: number;
    quality?: number;
    resize?: 'cover' | 'contain' | 'fill';
    format?: 'origin' | 'webp';
  },
): string {
  if (!featuredImageUrl) {return '';}
  const cleanUrl = featuredImageUrl.split('?')[0].replace(/[?&]$/, '').trim();

  if (customOptions) {
    const transformed = getImageUrl(cleanUrl, {
      width: customOptions.width,
      height: customOptions.height,
      quality: customOptions.quality || 90,
      resize: customOptions.resize || 'cover',
      format: customOptions.format || 'webp',
    });
    if (
      !transformed ||
      transformed === cleanUrl ||
      !transformed.includes('/render/image/')
    ) {
      return normalizeImageUrl(cleanUrl) || cleanUrl;
    }
    return transformed;
  }

  const sizeMap: Record<string, { width: number; height: number }> = {
    thumbnail: { width: 150, height: 150 },
    medium: { width: 400, height: 250 },
    medium_large: { width: 768, height: 0 },
    large: { width: 1024, height: 0 },
    full: { width: 0, height: 0 },
  };

  const sizeConfig = sizeMap[size] || sizeMap.medium;

  if (size === 'full') {return normalizeImageUrl(cleanUrl) || cleanUrl;}

  const transformed = getImageUrl(cleanUrl, {
    width: sizeConfig.width || undefined,
    height: sizeConfig.height || undefined,
    quality: 80,
    resize: 'cover',
    format: 'webp',
  });
  if (
    !transformed ||
    transformed === cleanUrl ||
    !transformed.includes('/render/image/')
  ) {
    return normalizeImageUrl(cleanUrl) || cleanUrl;
  }
  return transformed;
}

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

export function estimateReadingTime(content: string): string {
  const plainText = content.replace(/<[^>]*>/g, '');
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes.toString();
}

function cleanSlug(slug: string): string {
  if (!slug) {return '';}
  return String(slug)
    .trim()
    .replace(/%ef%b8%8f/gi, '')
    .replace(/[︀-️]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function mapRowToBlogPost(
  row: BlogPostRow,
  categoryName?: string,
  tags: string[] = [],
): BlogPost {
  const imageUrl = normalizeImageUrl(row.featured_image_url) || '';
  const content = row.content_html || '';
  return {
    id: row.id,
    title: row.title || '',
    excerpt: row.excerpt || '',
    content,
    date:
      row.published_at ||
      row.created_at ||
      new Date().toISOString(),
    modified:
      row.updated_at ||
      row.published_at ||
      row.created_at ||
      new Date().toISOString(),
    author: row.author_name || 'Uclic',
    slug: cleanSlug(row.slug || ''),
    category: categoryName || row.categories?.[0] || 'Blog',
    reading_time: estimateReadingTime(content),
    featured_image_url: imageUrl,
    tags: tags.length > 0 ? tags : row.tags || [],
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Queries
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Get latest published blog posts with pagination.
 */
export async function getLatestPosts(
  perPage = 9,
  page = 1,
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const supabase = createAdminClient();

  const { count, error: countError } = await supabase
    .from(POSTS_TABLE)
    .select('id', { count: 'exact', head: true })
    .eq('status', 'publish');

  if (countError) {
    console.error('Error counting blog posts:', countError);
    return { posts: [], total: 0, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select(
      'id, title, slug, excerpt, content_html, featured_image_url, author_name, author_id, published_at, created_at, updated_at, categories, tags',
    )
    .eq('status', 'publish')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  if (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], total: 0, totalPages: 0 };
  }

  const rows = (data || []) as BlogPostRow[];
  const postIds = rows.map((p) => p.id);
  if (postIds.length === 0) {return { posts: [], total, totalPages };}

  // Batch-fetch categories
  const { data: allPostCategories } = await supabase
    .from(POST_CATEGORIES_TABLE)
    .select('post_id, category_id')
    .in('post_id', postIds);

  const pcRows = (allPostCategories || []) as Array<{
    post_id: number;
    category_id: number;
  }>;
  const allCategoryIds = [...new Set(pcRows.map((pc) => pc.category_id))];
  let categoriesMap: Record<number, string> = {};
  if (allCategoryIds.length > 0) {
    const { data: categories } = await supabase
      .from(CATEGORIES_TABLE)
      .select('id, name')
      .in('id', allCategoryIds);
    if (categories) {
      categoriesMap = Object.fromEntries(
        (categories as Array<{ id: number; name: string }>).map((c) => [
          c.id,
          c.name,
        ]),
      );
    }
  }

  // Batch-fetch tags
  const { data: allPostTags } = await supabase
    .from(POST_TAGS_TABLE)
    .select('post_id, tag_id')
    .in('post_id', postIds);

  const ptRows = (allPostTags || []) as Array<{
    post_id: number;
    tag_id: number;
  }>;
  const allTagIds = [...new Set(ptRows.map((pt) => pt.tag_id))];
  let tagsMap: Record<number, string> = {};
  if (allTagIds.length > 0) {
    const { data: tagsData } = await supabase
      .from(TAGS_TABLE)
      .select('id, name')
      .in('id', allTagIds);
    if (tagsData) {
      tagsMap = Object.fromEntries(
        (tagsData as Array<{ id: number; name: string }>).map((t) => [
          t.id,
          t.name,
        ]),
      );
    }
  }

  const posts: BlogPost[] = rows.map((post) => {
    const postCatIds = pcRows
      .filter((pc) => pc.post_id === post.id)
      .map((pc) => pc.category_id);
    const categoryName =
      postCatIds.length > 0 && categoriesMap[postCatIds[0]]
        ? categoriesMap[postCatIds[0]]
        : post.categories?.[0] || 'Blog';

    const postTagIds = ptRows
      .filter((pt) => pt.post_id === post.id)
      .map((pt) => pt.tag_id);
    const tags =
      postTagIds.length > 0
        ? (postTagIds.map((id) => tagsMap[id]).filter(Boolean) as string[])
        : post.tags || [];

    return mapRowToBlogPost(post, categoryName, tags);
  });

  return { posts, total, totalPages };
}

/**
 * Get a single published blog post by slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug || slug === 'undefined') {return null;}
  const normalizedSlug = cleanSlug(slug);
  const supabase = createAdminClient();

  const { data: exactData } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('slug', normalizedSlug)
    .eq('status', 'publish')
    .maybeSingle();

  let row = exactData as BlogPostRow | null;

  if (!row) {
    const { data: fuzzy } = await supabase
      .from(POSTS_TABLE)
      .select('*')
      .eq('status', 'publish')
      .like('slug', `${normalizedSlug}%`)
      .limit(50);

    const candidates = (fuzzy || []) as BlogPostRow[];
    const matching = candidates.find(
      (post) => cleanSlug(post.slug || '') === normalizedSlug,
    );
    if (matching) {row = matching;}
  }

  if (!row) {return null;}

  const [pcRes, ptRes] = await Promise.all([
    supabase
      .from(POST_CATEGORIES_TABLE)
      .select('category_id')
      .eq('post_id', row.id),
    supabase
      .from(POST_TAGS_TABLE)
      .select('tag_id')
      .eq('post_id', row.id),
  ]);

  const categoryIds = ((pcRes.data || []) as Array<{ category_id: number }>).map(
    (pc) => pc.category_id,
  );
  const tagIds = ((ptRes.data || []) as Array<{ tag_id: number }>).map(
    (pt) => pt.tag_id,
  );

  let categoryName = row.categories?.[0] || 'Blog';
  let tags: string[] = row.tags || [];

  const [catRes, tagsRes] = await Promise.all([
    categoryIds.length > 0
      ? supabase
          .from(CATEGORIES_TABLE)
          .select('id, name, slug')
          .in('id', categoryIds)
          .limit(1)
      : Promise.resolve({ data: [] as Array<{ id: number; name: string }> }),
    tagIds.length > 0
      ? supabase.from(TAGS_TABLE).select('id, name').in('id', tagIds)
      : Promise.resolve({ data: [] as Array<{ id: number; name: string }> }),
  ]);

  const catData = (catRes.data || []) as Array<{ id: number; name: string }>;
  if (catData.length > 0) {categoryName = catData[0].name;}

  const tagData = (tagsRes.data || []) as Array<{ id: number; name: string }>;
  if (tagData.length > 0) {tags = tagData.map((t) => t.name);}

  return mapRowToBlogPost(row, categoryName, tags);
}

/**
 * Get all published blog slugs, ordered by recency.
 * Used for generateStaticParams and sitemap.
 */
export async function getAllBlogSlugs(
  limit?: number,
): Promise<Array<{ slug: string; lastmod: string }>> {
  const supabase = createAdminClient();

  let query = supabase
    .from(POSTS_TABLE)
    .select('slug, published_at, updated_at, created_at')
    .eq('status', 'publish')
    .order('published_at', { ascending: false, nullsFirst: false });

  if (limit && limit > 0) {query = query.limit(limit);}

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }

  const rows = (data || []) as Array<{
    slug: string | null;
    published_at: string | null;
    updated_at: string | null;
    created_at: string | null;
  }>;

  return rows
    .filter((r) => !!r.slug)
    .map((post) => ({
      slug: cleanSlug(post.slug || ''),
      lastmod:
        post.updated_at ||
        post.published_at ||
        post.created_at ||
        new Date().toISOString(),
    }));
}

/**
 * Get total count of published blog posts.
 */
export async function getBlogPostsCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count } = await supabase
    .from(POSTS_TABLE)
    .select('id', { count: 'exact', head: true })
    .eq('status', 'publish');
  return count || 0;
}

/**
 * Get author by slug (returns minimal author info for post detail page).
 */
export async function getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  if (!slug) {return null;}
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(AUTHORS_TABLE)
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {return null;}

  const row = data as {
    id: number;
    name: string;
    slug?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  };

  return {
    id: row.id,
    name: row.name,
    slug: row.slug || slug,
    bio: row.bio || undefined,
    avatar_url: normalizeImageUrl(row.avatar_url) || undefined,
    linkedin: row.linkedin || undefined,
    twitter: row.twitter || undefined,
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Presentation helpers
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Returns a short plain-text excerpt suitable for meta descriptions and cards.
 */
export function buildPlainExcerpt(
  post: Pick<BlogPost, 'excerpt' | 'content'>,
  maxLength = 160,
): string {
  const raw = post.excerpt && post.excerpt.trim().length > 0
    ? post.excerpt
    : post.content;
  const plain = stripHtml(raw || '');
  if (plain.length <= maxLength) {return plain;}
  return `${plain.substring(0, maxLength - 3).trimEnd()}...`;
}

/**
 * Format ISO date to FR short date (e.g. "24 avr. 2026").
 */
export function formatDateFr(iso?: string): string {
  if (!iso) {return '';}
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {return '';}
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

// ──────────────────────────────────────────────────────────────────────────────
// Categories & Authors queries
// ──────────────────────────────────────────────────────────────────────────────

export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  count?: number;
}

/**
 * All blog categories, optionally with post counts.
 */
export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  const supabase = createAdminClient();

  const { data: cats, error } = await supabase
    .from(CATEGORIES_TABLE)
    .select('id, slug, name, description')
    .order('name', { ascending: true });

  if (error || !cats) {return [];}

  // Count published posts per category
  const { data: pcRows } = await supabase
    .from(POST_CATEGORIES_TABLE)
    .select('category_id, post_id');

  const counts = new Map<number, number>();
  if (pcRows) {
    // Need to filter by published posts — pull published post IDs once
    const { data: publishedIds } = await supabase
      .from(POSTS_TABLE)
      .select('id')
      .eq('status', 'publish');
    const publishedSet = new Set(
      ((publishedIds || []) as Array<{ id: number }>).map((r) => r.id),
    );
    for (const pc of pcRows as Array<{ category_id: number; post_id: number }>) {
      if (!publishedSet.has(pc.post_id)) {continue;}
      counts.set(pc.category_id, (counts.get(pc.category_id) || 0) + 1);
    }
  }

  return (cats as Array<{ id: number; slug: string; name: string; description: string | null }>).map(
    (c) => ({ ...c, count: counts.get(c.id) || 0 }),
  );
}

export async function getBlogCategoryBySlug(
  slug: string,
): Promise<BlogCategory | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .select('id, slug, name, description')
    .eq('slug', slug)
    .maybeSingle();
  if (error || !data) {return null;}
  return data as BlogCategory;
}

/**
 * Paginated published posts in a given category (by category slug).
 */
export async function getPostsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 12,
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const supabase = createAdminClient();

  const cat = await getBlogCategoryBySlug(categorySlug);
  if (!cat) {return { posts: [], total: 0, totalPages: 0 };}

  // Post ids in this category
  const { data: pcRows } = await supabase
    .from(POST_CATEGORIES_TABLE)
    .select('post_id')
    .eq('category_id', cat.id);

  const postIds = ((pcRows || []) as Array<{ post_id: number }>).map((r) => r.post_id);
  if (postIds.length === 0) {return { posts: [], total: 0, totalPages: 0 };}

  const { count } = await supabase
    .from(POSTS_TABLE)
    .select('id', { count: 'exact', head: true })
    .eq('status', 'publish')
    .in('id', postIds);

  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const { data: rows } = await supabase
    .from(POSTS_TABLE)
    .select(
      'id, title, slug, excerpt, content_html, featured_image_url, author_name, author_id, published_at, created_at, updated_at, categories, tags',
    )
    .eq('status', 'publish')
    .in('id', postIds)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  const posts = ((rows || []) as BlogPostRow[]).map((r) =>
    mapRowToBlogPost(r, cat.name, r.tags || []),
  );

  return { posts, total, totalPages };
}

/**
 * All authors with post counts.
 */
export async function getAllBlogAuthors(): Promise<Array<BlogAuthor & { count: number }>> {
  const supabase = createAdminClient();
  const { data: authors } = await supabase
    .from(AUTHORS_TABLE)
    .select('id, name, slug, avatar_url, bio')
    .order('name', { ascending: true });
  if (!authors) {return [];}

  // Count posts per author
  const { data: posts } = await supabase
    .from(POSTS_TABLE)
    .select('author_id')
    .eq('status', 'publish');
  const counts = new Map<number, number>();
  for (const p of (posts || []) as Array<{ author_id: number | null }>) {
    if (p.author_id === null) {continue;}
    counts.set(p.author_id, (counts.get(p.author_id) || 0) + 1);
  }

  return (authors as Array<BlogAuthor>).map((a) => ({
    ...a,
    count: counts.get(a.id) || 0,
  }));
}

/**
 * Paginated published posts by author slug.
 */
export async function getPostsByAuthor(
  authorSlug: string,
  page = 1,
  perPage = 12,
): Promise<{
  author: BlogAuthor | null;
  posts: BlogPost[];
  total: number;
  totalPages: number;
}> {
  const author = await getAuthorBySlug(authorSlug);
  if (!author) {return { author: null, posts: [], total: 0, totalPages: 0 };}

  const supabase = createAdminClient();
  const { count } = await supabase
    .from(POSTS_TABLE)
    .select('id', { count: 'exact', head: true })
    .eq('status', 'publish')
    .eq('author_id', author.id);

  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const { data: rows } = await supabase
    .from(POSTS_TABLE)
    .select(
      'id, title, slug, excerpt, content_html, featured_image_url, author_name, author_id, published_at, created_at, updated_at, categories, tags',
    )
    .eq('status', 'publish')
    .eq('author_id', author.id)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  const posts = ((rows || []) as BlogPostRow[]).map((r) =>
    mapRowToBlogPost(r, r.categories?.[0] || 'Blog', r.tags || []),
  );

  return { author, posts, total, totalPages };
}
