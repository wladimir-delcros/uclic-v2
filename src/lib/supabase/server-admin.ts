import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseAnonKey, getSupabaseServiceKey } from './config';

/**
 * Create a Supabase admin client for server-side operations
 * Uses service role key for operations requiring elevated permissions (e.g., Storage listing)
 * Falls back to anon key if service role key is not available
 * Switches between online/local based on NEXT_PUBLIC_SUPABASE_ONLINE
 */
export function createClient() {
  const key = getSupabaseServiceKey() || getSupabaseAnonKey();
  return createSupabaseClient(getSupabaseUrl(), key);
}
