'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';

export default function UpdatePasswordClient() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 8) {
      setError('8 caractères minimum.');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push('/membres/workflows'), 2000);
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
                Nouveau mot de passe
              </h1>
              <p className="text-[13.5px] text-[color:var(--ink-muted)] mb-6">
                Choisissez un nouveau mot de passe pour votre compte.
              </p>
              {success ? (
                <div className="rounded-md border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-4 py-3 text-[13px] text-[color:var(--accent)]">
                  Mot de passe mis à jour. Redirection…
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="password" className="block text-[13px] font-medium text-[color:var(--ink)] mb-2">
                      Nouveau mot de passe
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
                  <div>
                    <label htmlFor="confirm" className="block text-[13px] font-medium text-[color:var(--ink)] mb-2">
                      Confirmation
                    </label>
                    <input
                      id="confirm"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
                      placeholder="Retapez le mot de passe"
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
                    {loading ? 'Mise à jour…' : 'Mettre à jour'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
