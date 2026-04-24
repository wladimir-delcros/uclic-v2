'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAuthClient } from '@/lib/supabase/client';

export default function AuthCallbackClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createAuthClient();
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const type = url.searchParams.get('type');
        const next = url.searchParams.get('next') || '/membres/workflows';

        if (!code) {
          router.replace(next);
          return;
        }

        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          url.toString(),
        );

        if (exchangeError) {
          // When no PKCE verifier is present (e.g. opened in a different browser),
          // fall back to the current session if one exists.
          if (exchangeError.message?.toLowerCase().includes('code verifier')) {
            const { data: session } = await supabase.auth.getSession();
            if (session.session) {
              if (type === 'recovery' || session.session.user?.app_metadata?.recovery) {
                router.replace('/auth/update-password');
                return;
              }
              router.replace(next);
              return;
            }
          }
          setError(exchangeError.message);
          return;
        }

        // Password recovery flow → force the user to set a new password.
        if (type === 'recovery' || data.session?.user?.app_metadata?.recovery) {
          router.replace('/auth/update-password');
          return;
        }

        if (next === '/auth/update-password') {
          router.replace('/auth/update-password');
          return;
        }

        // Hard redirect so the session cookie is sent on the next request.
        window.location.replace(next);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur de callback.';
        setError(message);
      }
    };
    run();
  }, [router]);

  return (
    <main className="relative min-h-screen bg-[color:var(--bg)] flex items-center justify-center px-5 lg:px-10">
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
            <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
            <span>Espace membre</span>
            <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
          </div>
          {error ? (
            <>
              <h1 className="text-[22px] md:text-[26px] leading-[1.15] font-semibold text-[color:var(--ink)] tracking-tight mb-2">
                Connexion impossible
              </h1>
              <p className="text-[13.5px] text-red-400" role="alert">
                {error}
              </p>
              <p className="mt-5 text-[12px] text-[color:var(--ink-muted)]">
                <a href="/login" className="text-[color:var(--accent)] hover:underline">
                  Retour à la connexion
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center mb-4" aria-hidden="true">
                <span
                  className="inline-block h-6 w-6 rounded-full border-2 border-[color:var(--border-strong)] border-t-[color:var(--accent)] animate-spin"
                />
              </div>
              <h1 className="text-[22px] md:text-[26px] leading-[1.15] font-semibold text-[color:var(--ink)] tracking-tight mb-2">
                Connexion en cours…
              </h1>
              <p className="text-[13.5px] text-[color:var(--ink-muted)]">
                Finalisation de votre authentification. Vous allez être redirigé.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
