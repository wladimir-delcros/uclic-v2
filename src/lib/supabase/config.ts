/**
 * Supabase configuration helper
 *
 * Toggle NEXT_PUBLIC_SUPABASE_ONLINE to switch databases:
 *   "on"  (default) → supabase.co (online/production)
 *   "off"           → supabase.uclic.fr (self-hosted/local)
 *
 * Auth (login, signup, reset password, etc.) ALWAYS uses the online instance.
 */

const isOnline = process.env.NEXT_PUBLIC_SUPABASE_ONLINE !== 'off';

// --- Data endpoints (switchable) ---

export function getSupabaseUrl(): string {
  if (isOnline) {return process.env.NEXT_PUBLIC_SUPABASE_URL!;}
  return process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL!;
}

export function getSupabaseAnonKey(): string {
  if (isOnline) {return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;}
  return process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY!;
}

export function getSupabaseServiceKey(): string | undefined {
  if (isOnline) {return process.env.SUPABASE_SERVICE_ROLE_KEY;}
  return process.env.SUPABASE_LOCAL_SERVICE_ROLE_KEY;
}

// --- Storage / image URL normalization (switchable) ---

const ONLINE_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL!;   // e.g. https://xxx.supabase.co
const LOCAL_BASE  = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL!; // e.g. https://supabase.uclic.fr

/**
 * Rewrite a Supabase Storage URL to point to the active instance (online or local).
 * Also rewrites to CDN if NEXT_PUBLIC_STORAGE_CDN_BASE_URL is set.
 */
export function normalizeImageUrl(url?: string | null): string | null {
  if (!url) {return null;}

  // Only rewrite Supabase storage URLs
  if (!url.includes('/storage/v1/object/public/')) {return url;}

  const cdnBase = process.env.NEXT_PUBLIC_STORAGE_CDN_BASE_URL;

  // If local mode: rewrite online URLs → local
  if (!isOnline && ONLINE_BASE && LOCAL_BASE && url.includes(ONLINE_BASE)) {
    url = url.replace(ONLINE_BASE, LOCAL_BASE);
  }

  // If CDN configured: rewrite to CDN
  if (cdnBase) {
    const currentBase = isOnline ? ONLINE_BASE : LOCAL_BASE;
    if (currentBase && url.includes(currentBase)) {
      return url.replace(currentBase, cdnBase);
    }
  }

  return url;
}

// --- Auth endpoints (always online) ---

export function getAuthUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL!;
}

export function getAuthAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
}
