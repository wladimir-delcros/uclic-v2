import 'server-only';
import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

export interface CasClient {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  show_on_home_page?: boolean | null;
  updated_at?: string | null;
}

export interface CasClientDetail extends CasClient {
  content_html: string;
  created_at?: string | null;
}

/**
 * Cas clients vitrines (flag `show_on_home_page`) pour la landing.
 */
export async function getCasClientsForHomepage(): Promise<CasClient[]> {
  const supa = createAdminClient();
  const { data, error } = await supa
    .from('cas_clients')
    .select('id, title, slug, excerpt, featured_image_url, show_on_home_page, updated_at')
    .eq('status', 'publish')
    .eq('show_on_home_page', true)
    .order('updated_at', { ascending: false, nullsFirst: false })
    .limit(3);
  if (error) {
    console.error('[cas_clients.home]', error);
    return [];
  }
  return (data || []) as CasClient[];
}

/**
 * Liste complète des cas-clients publiés (index).
 */
export async function getAllCasClients(): Promise<CasClient[]> {
  const supa = createAdminClient();
  const { data, error } = await supa
    .from('cas_clients')
    .select('id, title, slug, excerpt, featured_image_url, show_on_home_page, updated_at')
    .eq('status', 'publish')
    .order('updated_at', { ascending: false, nullsFirst: false });
  if (error) {
    console.error('[cas_clients.all]', error);
    return [];
  }
  return (data || []) as CasClient[];
}

/**
 * Slugs de tous les cas-clients publiés (pour generateStaticParams).
 */
export async function getAllCasClientSlugs(): Promise<string[]> {
  const supa = createAdminClient();
  const { data, error } = await supa
    .from('cas_clients')
    .select('slug')
    .eq('status', 'publish');
  if (error) {
    console.error('[cas_clients.slugs]', error);
    return [];
  }
  return (data || []).map((r) => r.slug as string).filter(Boolean);
}

/**
 * Cas-client complet avec content_html.
 */
export async function getCasClientBySlug(slug: string): Promise<CasClientDetail | null> {
  if (!slug) {return null;}
  const supa = createAdminClient();
  const { data, error } = await supa
    .from('cas_clients')
    .select(
      'id, title, slug, excerpt, content_html, featured_image_url, show_on_home_page, created_at, updated_at',
    )
    .eq('slug', slug)
    .eq('status', 'publish')
    .maybeSingle();
  if (error) {
    console.error('[cas_clients.bySlug]', slug, error);
    return null;
  }
  if (!data) {return null;}
  return {
    id: data.id as number,
    title: (data.title as string) || '',
    slug: data.slug as string,
    excerpt: (data.excerpt as string) ?? null,
    content_html: (data.content_html as string) || '',
    featured_image_url: (data.featured_image_url as string) ?? null,
    show_on_home_page: (data.show_on_home_page as boolean) ?? null,
    created_at: (data.created_at as string) ?? null,
    updated_at: (data.updated_at as string) ?? null,
  };
}
