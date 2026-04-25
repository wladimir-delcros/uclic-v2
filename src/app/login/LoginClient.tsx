'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get('next') || '/membres/workflows';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
  };

  return (
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
          placeholder="••••••••"
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
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
      <div className="flex justify-end text-[12px] text-[color:var(--ink-muted)]">
        <a href="/auth/reset-password" className="hover:text-[color:var(--accent)] transition-colors">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
}

export default function LoginClient() {
  return (
    <AuthSplitLayout
      eyebrow="Espace membre"
      title="Se connecter"
      lead="Accédez à vos workflows, favoris et outils réservés aux membres Uclic."
      planetId="login"
      footer={
        <p className="text-center">
          Pas encore de compte ?{' '}
          <a href="/signup" className="text-[color:var(--accent)] hover:underline">
            Créer un compte
          </a>
        </p>
      }
    >
      <Suspense fallback={<p className="text-[color:var(--ink-muted)]">Chargement…</p>}>
        <LoginForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
