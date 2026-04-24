'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';

export default function SignupClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push('/login'), 2500);
  };

  return (
    <>
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-24 lg:pb-32 overflow-hidden min-h-[80vh]">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[440px] mx-auto px-5 lg:px-10">
            <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Espace membre</span>
              </div>
              <h1 className="text-[26px] md:text-[30px] leading-[1.15] font-semibold text-[color:var(--ink)] tracking-tight mb-2">
                Créer un compte
              </h1>
              <p className="text-[13.5px] text-[color:var(--ink-muted)] mb-6">
                Accédez à la bibliothèque de workflows n8n et ressources membres Uclic.
              </p>
            {success ? (
              <div className="rounded-md border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-4 py-3 text-[13px] text-[color:var(--accent)]">
                Compte créé. Vérifiez votre email pour activer votre accès. Redirection vers la connexion…
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-[color:var(--ink)] mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[14px] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
                    placeholder="vous@exemple.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-[13px] font-medium text-[color:var(--ink)] mb-2">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
                    placeholder="8 caractères min."
                  />
                </div>
                {error ? (
                  <p className="text-[13px] text-red-400" role="alert">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md px-5 h-11 text-[13px] font-semibold text-black light:text-white hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}
                >
                  {loading ? 'Création…' : 'Créer mon compte'}
                </button>
              </form>
            )}
            </div>
            <p className="mt-5 text-center text-[12px] text-[color:var(--ink-muted)]">
              Déjà un compte ?{' '}
              <a href="/login" className="text-[color:var(--accent)] hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
