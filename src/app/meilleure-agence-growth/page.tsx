import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Users, ArrowRight, BadgeCheck } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Agences Growth Marketing ${currentYear} | Panorama éditorial`,
  description:
    "Panorama éditorial des agences Growth Marketing reconnues en France. Critères d'évaluation, spécialisations, positionnements — pour choisir l'agence growth adaptée à votre stade.",
  keywords: [
    'agence growth',
    'agence growth marketing',
    'panorama agences growth',
    'agence growth paris',
    'marketing automation',
    'acquisition clients b2b',
    'conversion optimization',
    'lead generation',
  ],
  alternates: { canonical: '/meilleure-agence-growth' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/meilleure-agence-growth`,
    title: `Agences Growth Marketing ${currentYear} | Panorama éditorial`,
    description:
      "Panorama éditorial des agences Growth Marketing reconnues en France. Critères d'évaluation, spécialisations, positionnements.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `Agences Growth Marketing France ${currentYear}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Agences Growth Marketing ${currentYear}`,
    description:
      'Panorama éditorial des agences Growth Marketing reconnues en France.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Agences Growth Marketing',
      item: `${SITE_URL}/meilleure-agence-growth`,
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `Agences Growth Marketing ${currentYear} : comment choisir`,
  description:
    "Panorama éditorial des agences Growth Marketing reconnues en France. Critères d'évaluation, positionnements, adéquation au stade de l'entreprise.",
  author: {
    '@type': 'Organization',
    name: 'Uclic',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Uclic',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
    },
  },
  datePublished: '2026-01-15',
  dateModified: new Date().toISOString(),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/meilleure-agence-growth`,
  },
  articleSection: 'Growth Marketing',
};

const positioning = [
  {
    title: 'Agences full-funnel pilotées',
    desc: 'Accompagnement complet avec un pilote senior, des experts canaux et une méthode en phases. Adapté aux scale-ups B2B qui veulent sortir des silos.',
    hint: 'Uclic, agences à pilotage senior intégré',
  },
  {
    title: 'Agences acquisition pure',
    desc: 'Focus canal unique — SEO, Ads ou Outbound. Idéal quand vous avez déjà le reste en interne et cherchez un spécialiste pointu.',
    hint: 'Agences specialistes, studios canal',
  },
  {
    title: 'Agences growth early-stage',
    desc: 'Accompagnement de startups pré-PMF / seed. Positionnement, test rapide de canaux, premiers playbooks. Budget plus bas, scope expérimental.',
    hint: 'Studios growth startups, growth hackers solo',
  },
  {
    title: 'Consulting stratégique',
    desc: 'Conseil sans exécution — audit, roadmap, recrutement d’une équipe interne. Utile pour structurer avant de passer en mode opérationnel.',
    hint: 'Cabinets conseil growth, advisors',
  },
];

const criteria = [
  'Qui pilote concrètement le compte (seniorité, dispo)',
  'Transparence tarifaire (honoraires vs commission média)',
  'Méthode documentée vs playbook générique',
  'Qualité du reporting et du pilotage hebdo',
  'Case studies chiffrés + références joignables',
  'Adéquation au stade, au canal et au budget',
];

export default function MeilleureAgenceGrowthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Panorama éditorial {currentYear}
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Choisir une{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  agence growth.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[640px] text-[16px] leading-relaxed">
                Une grille de lecture pour comparer les agences Growth Marketing reconnues en France. Pas un classement — une cartographie des positionnements et des critères pour arbitrer.
              </p>
            </div>
          </div>
        </section>

        {/* POSITIONNEMENTS */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Quatre positionnements
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Il n&apos;y a pas « une » agence growth — il y a la vôtre.
            </h2>
            <p className="mt-3 text-[color:var(--ink-muted)] max-w-[640px] text-[15px] leading-relaxed">
              Les agences Growth se regroupent autour de quatre positionnements. Le bon choix dépend de votre stade, de votre budget et de votre besoin de pilotage.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {positioning.map((p) => (
                <div
                  key={p.title}
                  className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                    <Target size={18} />
                  </div>
                  <h3 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                    {p.desc}
                  </p>
                  <p className="mt-4 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                    Exemples · {p.hint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRITÈRES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                  <span className="w-6 h-px bg-[color:var(--accent)]" /> Check-list
                </div>
                <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em]">
                  Six questions à poser avant de signer.
                </h2>
                <p className="mt-3 text-[color:var(--ink-muted)] text-[15px] leading-relaxed">
                  Ces questions vous évitent 90% des mauvais choix d&apos;agence. Si une agence hésite à répondre, vous avez votre réponse.
                </p>
              </div>
              <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                <ul className="flex flex-col gap-4">
                  {criteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <BadgeCheck size={18} className="shrink-0 mt-0.5 text-[color:var(--accent)]" />
                      <span className="text-[15px] text-[color:var(--ink)] leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NOTRE POSITIONNEMENT */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Et Uclic ?
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Notre positionnement, en toute transparence.
            </h2>

            <div className="mt-10 relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-8 lg:p-10">
              <div className="flex items-start gap-3 mb-6">
                <Users size={20} className="shrink-0 mt-1 text-[color:var(--accent)]" />
                <p className="text-[16px] text-[color:var(--ink)] leading-relaxed">
                  Uclic est une <strong>agence full-funnel pilotée</strong>. Notre promesse : un pilote senior en première ligne, des experts canaux certifiés, et des agents IA en production. Un cadre éprouvé en 90 jours — sans silo, sans sous-traitance déguisée.
                </p>
              </div>
              <p className="text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
                Si vous êtes une scale-up B2B avec 2M€ à 20M€ d&apos;ARR et que vous cherchez à industrialiser votre acquisition sans empiler les prestataires, on est probablement adaptés. Si votre besoin est plus early-stage ou ultra-spécialisé sur un canal, on vous orientera vers un confrère mieux calibré.
              </p>

              <Link
                href="/audit"
                className="glass-pill mt-8 inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  borderRadius: '6px',
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Réserver mon audit <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
