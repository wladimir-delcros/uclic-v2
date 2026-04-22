import { createClient } from '@supabase/supabase-js';

export interface CasClient {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

export async function getCasClientsForHomepage(): Promise<CasClient[]> {
  const { data, error } = await supabase
    .from('cas_clients')
    .select('id, title, slug, excerpt, featured_image_url')
    .eq('status', 'publish')
    .eq('show_on_home_page', true)
    .order('updated_at', { ascending: false })
    .limit(3);
  if (error) {
    console.error('[cas_clients]', error);
    return [];
  }
  return data ?? [];
}
