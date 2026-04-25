import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import MerciTracking from './MerciTracking';

export const metadata: Metadata = {
  title: 'Merci — Votre demande est reçue | Uclic',
  description:
    "Merci. Un Growth Lead senior uclic revient vers vous sous 24h ouvrées pour cadrer vos 3 piliers et votre plan 90 jours.",
  alternates: { canonical: '/merci' },
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <>
      {/* Conversion tracking (client only, suspended for useSearchParams) */}
      <Suspense fallback={null}>
        <MerciTracking />
      </Suspense>
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-24 lg:pb-32 overflow-hidden min-h-[80vh]">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[560px] mx-auto px-5 lg:px-10">
            <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="w-14 h-14 grid place-items-center border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 text-[color:var(--accent)] mb-6"
              >
                <CheckCircle2 size={28} strokeWidth={1.75} />
              </span>
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Confirmation</span>
              </div>
              <h1 className="text-[30px] md:text-[36px] leading-[1.1] font-medium text-[color:var(--ink)] tracking-tight mb-3">
                Demande reçue. On cadre ensemble.
              </h1>
              <p className="text-[15px] leading-relaxed text-[color:var(--ink-muted)]">
                Un Growth Lead senior uclic revient vers vous sous{' '}
                <strong className="text-[color:var(--ink)]">24h ouvrées</strong> pour
                cadrer vos 3 piliers (Inbound · Outbound · IA &amp; Dev) et vous
                proposer un créneau d&apos;audit gratuit.
              </p>

              <ul className="mt-6 space-y-3 text-[14px] text-[color:var(--ink)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-[color:var(--accent)] mt-0.5 shrink-0"
                  />
                  Confirmation par email dans les prochaines minutes.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-[color:var(--accent)] mt-0.5 shrink-0"
                  />
                  Livrable audit sous 48h : reco chiffrées + plan 90 jours.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-[color:var(--accent)] mt-0.5 shrink-0"
                  />
                  Pas de SDR, pas de relance agressive — pilotage senior direct.
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="/audit"
                  className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}
                >
                  <Calendar size={14} />
                  Mon audit gratuit — 48h
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  Retour à l'accueil
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-[13px] text-[color:var(--ink-muted)]">
              Note agrégée 4,76/30 · Google 4,9 · Sortlist 4,96 · Trustpilot 4,3.
              <br />
              En attendant, explorez nos{' '}
              <a
                href="/cas-clients"
                className="text-[color:var(--accent)] hover:underline"
              >
                cas clients
              </a>{' '}
              ou notre{' '}
              <a href="/blog" className="text-[color:var(--accent)] hover:underline">
                blog
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
