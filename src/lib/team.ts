import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { normalizeImageUrl } from '@/lib/supabase/config';

const TABLE = 'equipe';

// TeamMember interface (moved from wordpress.ts for independence)
export interface TeamMember {
  title: string;
  slug: string;
  content: string;
  equipeFields: {
    role: string;
    linkedin: string;
    twitter: string;
    autre: string;
    extrait: string;
    image: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
    miniImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
  };
}

interface EquipeRow {
  name?: string | null;
  slug?: string | null;
  role?: string | null;
  excerpt?: string | null;
  bio_html?: string | null;
  image_url?: string | null;
  mini_image_url?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  autre?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Map Supabase row to TeamMember interface (WordPress-compatible structure)
function mapToTeamMember(row: EquipeRow): TeamMember {
  const imageUrl = normalizeImageUrl(row.image_url);
  const miniImageUrl = normalizeImageUrl(row.mini_image_url);
  const name = row.name ?? '';

  return {
    title: name,
    slug: row.slug ?? '',
    content: row.bio_html || '',
    equipeFields: {
      role: row.role || '',
      linkedin: row.linkedin || '',
      twitter: row.twitter || '',
      autre: row.autre || '',
      extrait: row.excerpt || '',
      image: imageUrl
        ? {
            node: {
              sourceUrl: imageUrl,
              altText: name,
            },
          }
        : null,
      miniImage: miniImageUrl
        ? {
            node: {
              sourceUrl: miniImageUrl,
              altText: name,
            },
          }
        : null,
    },
  };
}

/**
 * Fetch all team members from Supabase
 * Filters by status='publish' and orders by created_at ASC
 */
export async function fetchAllTeamMembers(): Promise<TeamMember[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select('name, slug, role, excerpt, image_url, mini_image_url, linkedin, twitter, autre')
    .eq('status', 'publish')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching team members from Supabase:', error);
    return [];
  }

  return ((data as EquipeRow[] | null) ?? []).map(mapToTeamMember);
}

/**
 * Get a single team member by slug
 */
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'publish')
    .single();

  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Error fetching team member from Supabase:', error);
    }
    return null;
  }

  return mapToTeamMember(data as EquipeRow);
}

/**
 * Get all team member slugs for sitemap generation
 */
export async function getAllTeamSlugsForSitemap(): Promise<
  { slug: string; lastmod: string }[]
> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select('slug, updated_at, created_at')
    .eq('status', 'publish')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching team slugs for sitemap:', error);
    return [];
  }

  return ((data as EquipeRow[] | null) ?? []).map((row) => ({
    slug: row.slug ?? '',
    lastmod: row.updated_at || row.created_at || new Date().toISOString(),
  }));
}

/**
 * Client-side fetch for team members (used in Client Components as fallback)
 * Uses browser Supabase client with anon key
 */
export async function fetchAllTeamMembersClient(): Promise<TeamMember[]> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'publish')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching team members from Supabase (client):', error);
    return [];
  }

  return ((data as EquipeRow[] | null) ?? []).map(mapToTeamMember);
}
