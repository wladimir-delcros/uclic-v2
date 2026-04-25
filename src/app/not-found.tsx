import Link from 'next/link';
import { ArrowRight, Compass, Zap, BookOpen, Target } from 'lucide-react';
import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';

export const metadata: Metadata = {
  title: '404 — Page introuvable | uclic',
  description: "Cette page n'existe pas ou a été déplacée. Voici les sorties recommandées sur uclic.fr.",
  robots: { index: false, follow: true },
};

type ExitCard = {
  title: string;
  desc: string;
  href: string;
  icon: typeof Compass;
};

const EXITS: ExitCard[] = [
  {
    title: 'Notre offre',
    desc: 'Trois piliers — Inbound, Outbound, IA — opérés par une seule équipe senior.',
    href: '/',
    icon: Compass,
  },
  {
    title: 'Audit gratuit 48h',
    desc: 'On regarde vos canaux, votre tracking et votre stack. Plan d\'action sous 48 heures.',
    href: '/audit',
    icon: Zap,
  },
  {
    title: 'Blog growth',
    desc: 'Tactiques, frameworks et retours d\'expérience pour scaler votre acquisition B2B.',
    href: '/blog',
    icon: BookOpen,
  },
  {
    title: 'Cas clients',
    desc: 'Résultats chiffrés, contextes réels — comment on a fait bouger l\'aiguille.',
    href: '/cas-clients',
    icon: Target,
  },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-[color:var(--bg)] text-[color:var(--ink)] min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 lg:pt-28 pb-16 lg:pb-24">
          <SectionAmbience variant="medium" />

          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Erreur 404
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>

            <h1 className="mt-5 text-center font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(40px,6vw,84px)] max-w-[920px] mx-auto">
              <span className="text-[color:var(--accent)]">404.</span>{' '}
              Cette page n&apos;existe pas.
            </h1>

            <p className="mt-6 text-center text-[16px] lg:text-[17px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
              Soit le lien est cassé, soit la page a été déplacée. Voici les sorties qu&apos;on recommande.
            </p>
          </div>
        </section>

        {/* Bento exits */}
        <section className="relative pb-20 lg:pb-28">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[color:var(--border-subtle)] !rounded-none">
              {EXITS.map((exit, i) => {
                const Icon = exit.icon;
                // Border logic for 2-col bento
                const isRightCol = i % 2 === 1;
                const isLastRow = i >= EXITS.length - 2;
                return (
                  <Link
                    key={exit.title}
                    href={exit.href}
                    className={[
                      'group relative !rounded-none p-6 lg:p-8',
                      'border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white',
                      'transition-colors duration-300',
                      'hover:border-[color:var(--accent)]/40',
                      !isRightCol ? 'md:border-r' : '',
                      !isLastRow ? 'border-b' : '',
                    ].join(' ')}>
                    <div className="flex items-start justify-between gap-6">
                      <div className="w-11 h-11 grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/30">
                        <Icon size={20} strokeWidth={1.75} />
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-[color:var(--ink-muted)] transition-all duration-300 group-hover:text-[color:var(--accent)] group-hover:translate-x-1"
                      />
                    </div>

                    <h2 className="mt-6 text-[22px] lg:text-[26px] font-display font-medium leading-tight">
                      {exit.title}
                    </h2>
                    <p className="mt-3 text-[15px] text-[color:var(--ink-muted)] leading-[1.6]">
                      {exit.desc}
                    </p>
                  </Link>
                );
              })}
            </div>

            {/* CTA back home */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/"
                className="glass-pill inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
                Retour à l&apos;accueil
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
