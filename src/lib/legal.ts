import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

const LEGAL_TABLE = 'legal_pages';

export interface LegalPage {
  id: number;
  slug: string;
  title: string;
  content_html: string;
  updated_at: string;
  created_at: string;
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(LEGAL_TABLE)
    .select('id, slug, title, content_html, updated_at, created_at')
    .eq('slug', slug)
    .eq('status', 'publish')
    .maybeSingle();
  if (error || !data) return null;
  return data as LegalPage;
}

export async function getAllLegalPageSlugs(): Promise<string[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from(LEGAL_TABLE)
    .select('slug')
    .eq('status', 'publish');
  return ((data || []) as Array<{ slug: string }>).map((r) => r.slug).filter(Boolean);
}
