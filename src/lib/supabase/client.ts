import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseUrl, getSupabaseAnonKey, getAuthUrl, getAuthAnonKey } from './config';

/**
 * Create a Supabase client for use in Client Components (data operations)
 * Switches between online/local based on NEXT_PUBLIC_SUPABASE_ONLINE
 */
export function createClient() {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey()
  );
}

/**
 * Create a Supabase client for auth operations (always online)
 * Use this for login, signup, signOut, getUser, password reset, etc.
 */
export function createAuthClient() {
  return createBrowserClient(
    getAuthUrl(),
    getAuthAnonKey()
  );
}
