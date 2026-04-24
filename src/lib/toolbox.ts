import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

export interface ToolboxPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  productHuntFields: {
    tagline: string;
    logo: string;
    categories?: string | null;
  };
}

export interface ToolboxItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  modified: string;
  content: string;
  productHuntFields: {
    id: string;
    tagline: string;
    logo: string;
    screenshotUrl: string;
    votesCount: number;
    day: string;
    makersname: string;
    makersname1: string;
    makersname2: string;
    makersheadline: string;
    makersheadline1: string;
    makersheadline2: string;
    makerswebsiteUrl: string;
    makerswebsiteUrl1: string;
    makerswebsiteUrl2: string;
    categories: string | null;
    websiteUrl?: string;
  };
}

const TABLE = 'toolbox_products';
const BUCKET = 'media';
const FOLDER = 'toolbox';

type SupabaseAdmin = ReturnType<typeof createAdminClient>;

function isSupabaseUrl(url?: string | null): boolean {
  return !!url && url.includes('/storage/v1/object/public/');
}

function publicUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

async function getToolboxStorageMap(supabase: SupabaseAdmin): Promise<Map<string, string>> {
  const { data: listing, error } = await supabase.storage
    .from(BUCKET)
    .list(FOLDER, { limit: 10000 });
  if (error) {
    console.error('Error listing toolbox storage:', error);
    return new Map<string, string>();
  }
  const files: string[] = (listing ?? []).map((f: { name: string }) => f.name);
  const exts = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
  const map = new Map<string, string>();
  for (const file of files) {
    const lower = file.toLowerCase();
    for (const ext of exts) {
      if (lower.endsWith(`_logo.${ext}`)) {
        const slug = lower.replace(`_logo.${ext}`, '');
        if (!map.has(slug)) map.set(slug, file);
      } else if (lower.endsWith(`.${ext}`)) {
        const slug = lower.replace(`.${ext}`, '');
        if (!map.has(slug)) map.set(slug, file);
      }
    }
  }
  return map;
}

export async function fetchToolboxPageFromSupabase(
  page: number,
  pageSize: number
): Promise<{ nodes: ToolboxPost[]; totalCount: number }> {
  const supabase = createAdminClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: false })
    .order('ph_day', { ascending: false, nullsFirst: false })
    .order('slug', { ascending: true })
    .range(from, to);

  if (error) {
    console.error('Error fetching toolbox page from Supabase:', error);
    return { nodes: [], totalCount: 0 };
  }
  const storageMap = await getToolboxStorageMap(supabase);

  const nodes: ToolboxPost[] = (data ?? []).map((row: Record<string, unknown>) => {
    const slugLower = String(row.slug ?? '').toLowerCase();
    let logo = (row.logo_url as string | null) ?? '';
    if (!isSupabaseUrl(logo)) {
      const matched = storageMap.get(slugLower);
      if (matched) {
        logo = publicUrl(`${FOLDER}/${matched}`);
      }
    }
    return {
      id: String(row.id ?? row.ph_id ?? row.slug),
      title: String(row.title ?? ''),
      slug: String(row.slug ?? ''),
      date: (row.ph_day as string | null) ?? '',
      productHuntFields: {
        tagline: (row.tagline as string | null) ?? '',
        logo,
        categories: (row.categories as string | null) ?? null,
      },
    };
  });

  return { nodes, totalCount: count ?? nodes.length };
}

/**
 * Fetch a page of tools (used for generateStaticParams).
 * Options: { page?: number; perPage?: number }
 */
export async function getToolboxItems(
  options: { page?: number; perPage?: number } = {}
): Promise<{ nodes: ToolboxPost[]; totalCount: number }> {
  const page = options.page ?? 1;
  const perPage = options.perPage ?? 50;
  return fetchToolboxPageFromSupabase(page, perPage);
}

export async function fetchToolboxTopNFromSupabase(
  n: number
): Promise<Array<{ title: string; slug: string }>> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('title,slug')
    .order('ph_day', { ascending: false, nullsFirst: false })
    .order('slug', { ascending: true })
    .limit(n);

  if (error) {
    console.error('Error fetching toolbox top N from Supabase:', error);
    return [];
  }

  return (data ?? []).map((row: Record<string, unknown>) => ({
    title: String(row.title ?? ''),
    slug: String(row.slug ?? ''),
  }));
}

export async function getToolboxItemBySlug(slug: string): Promise<ToolboxItem | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const storageMap = await getToolboxStorageMap(supabase);
  const slugLower = String(row.slug ?? '').toLowerCase();
  let logo = (row.logo_url as string | null) ?? '';
  if (!isSupabaseUrl(logo)) {
    const matched = storageMap.get(slugLower);
    if (matched) {
      logo = publicUrl(`${FOLDER}/${matched}`);
    }
  }

  return {
    id: String(row.id ?? row.ph_id ?? row.slug),
    title: String(row.title ?? ''),
    slug: String(row.slug ?? ''),
    date: (row.ph_day as string | null) ?? '',
    modified:
      (row.updated_at as string | null) ?? (row.ph_day as string | null) ?? '',
    content: (row.content_html as string | null) ?? '',
    productHuntFields: {
      id: String(row.ph_id ?? row.id ?? ''),
      tagline: (row.tagline as string | null) ?? '',
      logo,
      screenshotUrl: (row.screenshot_url as string | null) ?? '',
      votesCount: (row.votes_count as number | null) ?? 0,
      day: (row.ph_day as string | null) ?? '',
      makersname: (row.makersname as string | null) ?? '',
      makersname1: (row.makersname1 as string | null) ?? '',
      makersname2: (row.makersname2 as string | null) ?? '',
      makersheadline:
        (row.makersheadline1 as string | null) ??
        (row.makersheadline as string | null) ??
        '',
      makersheadline1: (row.makersheadline1 as string | null) ?? '',
      makersheadline2: (row.makersheadline2 as string | null) ?? '',
      makerswebsiteUrl: (row.makerswebsite_url as string | null) ?? '',
      makerswebsiteUrl1: (row.makerswebsite_url1 as string | null) ?? '',
      makerswebsiteUrl2: (row.makerswebsite_url2 as string | null) ?? '',
      categories: (row.categories as string | null) ?? null,
      websiteUrl:
        (row.website_url as string | null) ??
        (row.url as string | null) ??
        (row.product_url as string | null) ??
        '',
    },
  };
}

export async function getAllToolboxSlugsForSitemap(): Promise<
  Array<{ slug: string; lastmod: string }>
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('slug, ph_day, updated_at')
    .order('ph_day', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching toolbox slugs for sitemap:', error);
    return [];
  }

  return (data ?? []).map((row: Record<string, unknown>) => ({
    slug: String(row.slug ?? ''),
    lastmod:
      (row.updated_at as string | null) ??
      (row.ph_day as string | null) ??
      new Date().toISOString(),
  }));
}

export async function getAllToolboxPosts(): Promise<ToolboxPost[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'publish')
    .order('ph_day', { ascending: false, nullsFirst: false })
    .order('slug', { ascending: true });

  if (error) {
    console.error('Error fetching all toolbox posts from Supabase:', error);
    return [];
  }

  const storageMap = await getToolboxStorageMap(supabase);

  return (data ?? []).map((row: Record<string, unknown>) => {
    const slugLower = String(row.slug ?? '').toLowerCase();
    let logo = (row.logo_url as string | null) ?? '';
    if (!isSupabaseUrl(logo)) {
      const matched = storageMap.get(slugLower);
      if (matched) {
        logo = publicUrl(`${FOLDER}/${matched}`);
      }
    }
    return {
      id: String(row.id ?? row.ph_id ?? row.slug),
      title: String(row.title ?? ''),
      slug: String(row.slug ?? ''),
      date: (row.ph_day as string | null) ?? '',
      productHuntFields: {
        tagline: (row.tagline as string | null) ?? '',
        logo,
        categories: (row.categories as string | null) ?? null,
      },
    };
  });
}
