import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import { createAuthClient } from '@/lib/supabase/server';
import ProfilEditForm from './ProfilEditForm';

export const metadata: Metadata = {
  title: 'Édition du profil | Espace membres Uclic',
  description: 'Modifiez vos informations de profil dans votre espace membre Uclic.',
  alternates: { canonical: '/membres/profil' },
  robots: { index: false, follow: false },
};

export default async function ProfilPage() {
  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=' + encodeURIComponent('/membres/profil'));
  }

  return (
    <>
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-24 lg:pb-32 overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Espace membre</span>
            </div>
            <h1 className="text-[clamp(28px,3.6vw,44px)] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)] mb-3">
              Édition du{' '}
              <span className="relative inline-block font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                profil
                <span
                  className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full"
                  aria-hidden="true"
                />
              </span>
            </h1>
            <p className="text-[15px] text-[color:var(--ink-muted)] max-w-[560px] mb-10">
              Modifiez vos informations. Votre email de connexion n’est pas modifiable ici.
            </p>

            <ProfilEditForm initialEmail={user.email ?? ''} userId={user.id} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
