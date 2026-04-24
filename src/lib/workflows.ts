import "server-only";
import { createClient as createAdminClient } from "@/lib/supabase/server-admin";
import { createClient as createBrowserClient, createAuthClient as createBrowserAuthClient } from "@/lib/supabase/client";
import { createAuthClient as createServerAuthClient } from "@/lib/supabase/server";

export interface Workflow {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  n8n_json: unknown;
  tags: string[];
  category: string | null;
  favorites_count: number;
  created_at: string;
  // Métadonnées IA détaillées (colonnes text dans la table workflows)
  target_audience?: string | null;
  problem_solved?: string | null;
  flow_steps?: string | null;
  customization_guide?: string | null;
}

export async function getWorkflows({
  query = '',
  tag,
  category,
  page = 1,
  perPage = 12,
  sort = 'new', // 'new' | 'popular'
  onlyIds,
}: {
  query?: string;
  tag?: string;
  category?: string;
  page?: number;
  perPage?: number;
  sort?: 'new' | 'popular';
  onlyIds?: number[];
}): Promise<{ workflows: Workflow[]; total: number; totalPages: number }>{
  const supabase = createAdminClient();

  let sel = supabase
    .from('workflows')
    .select('*', { count: 'exact' });

  if (onlyIds !== undefined) {
    if (onlyIds.length === 0) {
      return { workflows: [], total: 0, totalPages: 0 };
    }
    sel = sel.in('id', onlyIds);
  }
  if (query && query.trim()) {
    const q = query.trim().replace(/'/g, "''").replace(/,/g, " ");
    const pattern = `%${q}%`;
    sel = sel.or(`title.ilike.${pattern},summary.ilike.${pattern}`);
  }
  if (tag) {sel = sel.contains('tags', [tag]);}
  if (category) {sel = sel.eq('category', category);}

  if (sort === 'popular') {
    sel = sel.order('favorites_count', { ascending: false })
             .order('created_at', { ascending: false });
  } else {
    sel = sel.order('created_at', { ascending: false });
  }

  const { data, error, count } = await sel
    .range((page - 1) * perPage, page * perPage - 1);

  if (error) {
    console.error('Error fetching workflows:', error);
    return { workflows: [], total: 0, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return { workflows: (data as Workflow[]) || [], total, totalPages };
}

export async function getWorkflowBySlug(slug: string): Promise<Workflow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) {
    console.error('Error fetching workflow by slug:', error);
    return null;
  }
  return data as Workflow;
}

/** Workflows liés (partageant au moins un tag) pour un workflow donné. */
export async function getRelatedWorkflows(
  workflowId: number,
  tags: string[] | null,
  limit: number = 5
): Promise<Workflow[]> {
  if (!tags || tags.length === 0) {return [];}

  const supabase = createAdminClient();

  // Utiliser l'opérateur overlaps sur la colonne array `tags`
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .neq('id', workflowId)
    // au moins un tag en commun
    .overlaps('tags', tags)
    .order('favorites_count', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related workflows:', error);
    return [];
  }

  return (data as Workflow[]) || [];
}

/** Tous les slugs de workflows pour le sitemap. */
export async function getAllWorkflowSlugsForSitemap(): Promise<{ slug: string; lastmod: string }[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('workflows')
    .select('slug, created_at')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching workflow slugs for sitemap:', error);
    return [];
  }
  return (data || []).map((row) => ({
    slug: row.slug,
    lastmod: row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
  }));
}

/** IDs des workflows favoris de l'utilisateur connecté (côté serveur). */
export async function getFavoriteWorkflowIds(): Promise<number[]> {
  const authClient = await createServerAuthClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {return [];}
  const admin = createAdminClient();
  const { data } = await admin
    .from('workflow_favorites')
    .select('workflow_id')
    .eq('user_id', user.id);
  return (data || []).map((r) => r.workflow_id);
}

export interface WorkflowNodeRow {
  node_id: string;
  node_name: string | null;
  description: string | null;
}

/** Descriptions des nœuds d’un workflow (table workflow_nodes). Utiliser pour tooltips / sous-titres dans le graphe. */
export async function getWorkflowNodes(workflowId: number): Promise<WorkflowNodeRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('workflow_nodes')
    .select('node_id, node_name, description')
    .eq('workflow_id', workflowId)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching workflow nodes:', error);
    return [];
  }
  return (data as WorkflowNodeRow[]) || [];
}

export async function isFavorite(workflowId: number): Promise<boolean> {
  const authClient = createBrowserAuthClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {return false;}
  const supabase = createBrowserClient();
  const { data } = await supabase
    .from('workflow_favorites')
    .select('workflow_id')
    .eq('workflow_id', workflowId)
    .eq('user_id', user.id)
    .maybeSingle();
  return !!data;
}

export async function toggleFavorite(workflowId: number): Promise<'added' | 'removed' | 'unauthenticated'> {
  const authClient = createBrowserAuthClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {return 'unauthenticated';}
  const supabase = createBrowserClient();
  const { data } = await supabase
    .from('workflow_favorites')
    .select('workflow_id')
    .eq('workflow_id', workflowId)
    .eq('user_id', user.id)
    .maybeSingle();
  if (data) {
    await supabase
      .from('workflow_favorites')
      .delete()
      .eq('workflow_id', workflowId)
      .eq('user_id', user.id);
    return 'removed';
  }
  await supabase
    .from('workflow_favorites')
    .insert({ workflow_id: workflowId, user_id: user.id });
  return 'added';
}


