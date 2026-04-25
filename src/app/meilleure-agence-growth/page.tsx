import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Users, ArrowRight, BadgeCheck, Star, Check, Minus } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Agences Growth Marketing ${currentYear} — Panorama Uclic`,
  description:
    "Panorama éditorial des agences Growth Marketing en France : positionnements, critères d'évaluation, adéquation au stade. Audit gratuit Uclic en 48 h.",
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
    title: `Agences Growth Marketing ${currentYear} — Panorama Uclic`,
    description:
      "Panorama éditorial des agences Growth Marketing en France : positionnements, critères d'évaluation, adéquation au stade.",
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

type CheckState = true | false | 'partial';

interface AgencyRow {
  rank: number;
  name: string;
  score: number;
  speciality: string;
  rating: number;
  reviews: number;
  pricing: string;
  setup: string;
  team: string;
  ai: CheckState;
  seniorLead: CheckState;
  fullFunnel: CheckState;
  weekly: CheckState;
  caseStudies: CheckState;
}

const growthAgencies: AgencyRow[] = [
  {
    rank: 1,
    name: 'UCLIC',
    score: 98,
    speciality: 'Growth + IA full-funnel',
    rating: 5.0,
    reviews: 30,
    pricing: 'Sur mesure',
    setup: '3 mois',
    team: '12+',
    ai: true,
    seniorLead: true,
    fullFunnel: true,
    weekly: true,
    caseStudies: true,
  },
  {
    rank: 2,
    name: 'Growth Room',
    score: 95,
    speciality: 'Acquisition & SEO',
    rating: 4.9,
    reviews: 200,
    pricing: '6 000 €/mois',
    setup: '4 mois',
    team: '40+',
    ai: 'partial',
    seniorLead: true,
    fullFunnel: true,
    weekly: true,
    caseStudies: true,
  },
  {
    rank: 3,
    name: 'Deux.io',
    score: 92,
    speciality: 'Outils & Automatisation',
    rating: 4.8,
    reviews: 150,
    pricing: '5 000 €/mois',
    setup: '5 mois',
    team: '25+',
    ai: 'partial',
    seniorLead: 'partial',
    fullFunnel: 'partial',
    weekly: true,
    caseStudies: true,
  },
  {
    rank: 4,
    name: 'WeDoGrowth',
    score: 90,
    speciality: 'Growth Hacking pur',
    rating: 4.7,
    reviews: 100,
    pricing: '7 000 €/mois',
    setup: '3 mois',
    team: '15+',
    ai: false,
    seniorLead: true,
    fullFunnel: false,
    weekly: true,
    caseStudies: 'partial',
  },
  {
    rank: 5,
    name: 'Digital Corsaires',
    score: 88,
    speciality: 'Génération de trafic',
    rating: 4.6,
    reviews: 180,
    pricing: '4 000 €/mois',
    setup: '6 mois',
    team: '20+',
    ai: false,
    seniorLead: 'partial',
    fullFunnel: 'partial',
    weekly: true,
    caseStudies: true,
  },
  {
    rank: 6,
    name: 'Agence 404',
    score: 85,
    speciality: 'Croissance structurée',
    rating: 4.5,
    reviews: 220,
    pricing: '5 500 €/mois',
    setup: '5 mois',
    team: '50+',
    ai: false,
    seniorLead: true,
    fullFunnel: true,
    weekly: 'partial',
    caseStudies: true,
  },
  {
    rank: 7,
    name: 'CosaVostra',
    score: 82,
    speciality: 'Approche créative',
    rating: 4.4,
    reviews: 120,
    pricing: '4 500 €/mois',
    setup: '4 mois',
    team: '30+',
    ai: false,
    seniorLead: 'partial',
    fullFunnel: false,
    weekly: 'partial',
    caseStudies: 'partial',
  },
];

const compareColumns: Array<{ key: keyof AgencyRow; label: string; tooltip: string }> = [
  { key: 'ai', label: 'Agents IA', tooltip: 'Agents IA déployés en production' },
  { key: 'seniorLead', label: 'Pilote senior', tooltip: 'Partner 10+ ans en première ligne' },
  { key: 'fullFunnel', label: 'Full-funnel', tooltip: 'Inbound + outbound + paid intégrés' },
  { key: 'weekly', label: 'Pilotage hebdo', tooltip: 'Reporting et cadence documentés' },
  { key: 'caseStudies', label: 'Cases chiffrés', tooltip: 'Études de cas avec chiffres vérifiables' },
];

const CheckCell = ({ state }: { state: CheckState }) => {
  if (state === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
        <Check size={14} strokeWidth={2.5} />
      </span>
    );
  }
  if (state === 'partial') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] text-[10px] font-mono">
        ½
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
      <Minus size={14} />
    </span>
  );
};

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
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
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

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[680px] text-[16px] leading-relaxed">
                Une grille de lecture pour comparer les agences Growth Marketing en France. Pas un classement — une cartographie des positionnements, des critères pour arbitrer, et notre lecture franche : pilotage senior, experts canaux, agents IA en production.
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

        {/* CLASSEMENT TOP 7 */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Classement {currentYear}
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[820px]">
              Top 7 des meilleures agences Growth en France.
            </h2>
            <p className="mt-3 text-[color:var(--ink-muted)] max-w-[640px] text-[15px] leading-relaxed">
              Notre lecture du marché — score sur 100 basé sur résultats clients, expertise technique et satisfaction. Pas un palmarès marketing, un outil d&apos;arbitrage.
            </p>

            {/* Tableau comparatif desktop — vraie matrice de comparaison */}
            <div className="mt-10 hidden lg:block">
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[color:var(--border-subtle)] text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                      <th className="sticky left-0 z-10 bg-[#141211] light:bg-white px-4 py-4 font-normal w-[60px]">#</th>
                      <th className="sticky left-[60px] z-10 bg-[#141211] light:bg-white px-4 py-4 font-normal min-w-[180px]">Agence</th>
                      <th className="px-3 py-4 font-normal text-center w-[80px]">Score</th>
                      <th className="px-3 py-4 font-normal text-center w-[80px]">Note</th>
                      <th className="px-3 py-4 font-normal w-[110px]">Tarif</th>
                      <th className="px-3 py-4 font-normal text-center w-[80px]">Setup</th>
                      <th className="px-3 py-4 font-normal text-center w-[70px]">Équipe</th>
                      {compareColumns.map((c) => (
                        <th
                          key={c.key as string}
                          title={c.tooltip}
                          className="px-2 py-4 font-normal text-center w-[100px]"
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {growthAgencies.map((agency) => {
                      const isUclic = agency.rank === 1;
                      return (
                        <tr
                          key={agency.name}
                          className={`border-b border-[color:var(--border-subtle)] last:border-b-0 transition-colors ${
                            isUclic ? 'bg-[color:var(--accent)]/5' : 'hover:bg-[color:var(--card-elev-1)]'
                          }`}
                        >
                          <td
                            className={`sticky left-0 z-[5] px-4 py-4 ${
                              isUclic ? 'bg-[#1a1716] light:bg-[#fbfbfa]' : 'bg-[#141211] light:bg-white'
                            }`}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 !rounded-none border text-[12px] font-mono ${
                                isUclic
                                  ? 'border-[color:var(--accent)]/60 text-[color:var(--accent)]'
                                  : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]'
                              }`}
                            >
                              {agency.rank}
                            </span>
                          </td>
                          <td
                            className={`sticky left-[60px] z-[5] px-4 py-4 ${
                              isUclic ? 'bg-[#1a1716] light:bg-[#fbfbfa]' : 'bg-[#141211] light:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 text-[15px] font-display font-medium leading-tight">
                              {agency.name}
                              {isUclic && <BadgeCheck size={13} className="text-[color:var(--accent)] shrink-0" />}
                            </div>
                            <div className="text-[11px] text-[color:var(--ink-muted)] mt-0.5">{agency.speciality}</div>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <div
                              className={`text-[20px] font-display font-medium leading-none ${
                                isUclic ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
                              }`}
                            >
                              {agency.score}
                            </div>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <div className="inline-flex items-center gap-1 text-[12px] text-[color:var(--ink)]">
                              <Star size={11} className="text-[color:var(--accent)]" />
                              {agency.rating.toFixed(1)}
                            </div>
                            <div className="text-[10px] text-[color:var(--ink-muted)] mt-0.5">{agency.reviews} avis</div>
                          </td>
                          <td className="px-3 py-4 text-[12px] text-[color:var(--ink)] font-mono whitespace-nowrap">
                            {agency.pricing}
                          </td>
                          <td className="px-3 py-4 text-center text-[12px] text-[color:var(--ink-muted)] font-mono">
                            {agency.setup}
                          </td>
                          <td className="px-3 py-4 text-center text-[12px] text-[color:var(--ink-muted)] font-mono">
                            {agency.team}
                          </td>
                          {compareColumns.map((c) => (
                            <td key={c.key as string} className="px-2 py-4 text-center">
                              <div className="inline-flex">
                                <CheckCell state={agency[c.key] as CheckState} />
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Légende */}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[color:var(--ink-muted)]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  Présent
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 !rounded-none border border-[color:var(--border-subtle)] text-[10px] font-mono">
                    ½
                  </span>
                  Partiel
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
                    <Minus size={11} />
                  </span>
                  Absent
                </span>
                <span className="ml-auto">
                  * Classement basé sur résultats clients, expertise technique et satisfaction client ({currentYear}).
                </span>
              </div>
            </div>

            {/* Mobile : carte par agence avec mini-matrice */}
            <div className="mt-10 flex flex-col gap-3 lg:hidden">
              {growthAgencies.map((agency) => {
                const isUclic = agency.rank === 1;
                return (
                  <article
                    key={agency.name}
                    className={`relative !rounded-none border ${
                      isUclic
                        ? 'border-[color:var(--accent)]/60 bg-[color:var(--card-elev-1)] light:bg-white'
                        : 'border-[color:var(--border-subtle)] bg-[#141211] light:bg-white'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-5 border-b border-[color:var(--border-subtle)]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`inline-flex items-center justify-center w-9 h-9 !rounded-none border text-[13px] font-mono shrink-0 ${
                            isUclic
                              ? 'border-[color:var(--accent)]/60 text-[color:var(--accent)]'
                              : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]'
                          }`}
                        >
                          #{agency.rank}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[17px] font-display font-medium tracking-[-0.01em] flex items-center gap-1.5">
                            {agency.name}
                            {isUclic && <BadgeCheck size={13} className="text-[color:var(--accent)] shrink-0" />}
                          </h3>
                          <p className="text-[11px] text-[color:var(--ink-muted)]">{agency.speciality}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div
                          className={`text-[22px] font-display font-medium leading-none ${
                            isUclic ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
                          }`}
                        >
                          {agency.score}
                        </div>
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[color:var(--ink-muted)]">
                          <Star size={10} className="text-[color:var(--accent)]" />
                          {agency.rating.toFixed(1)} · {agency.reviews}
                        </div>
                      </div>
                    </div>
                    {/* Métriques chiffrées */}
                    <div className="grid grid-cols-3 divide-x divide-[color:var(--border-subtle)] border-b border-[color:var(--border-subtle)]">
                      <div className="px-3 py-3">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">Tarif</div>
                        <div className="text-[12px] text-[color:var(--ink)] font-mono mt-1">{agency.pricing}</div>
                      </div>
                      <div className="px-3 py-3">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">Setup</div>
                        <div className="text-[12px] text-[color:var(--ink)] font-mono mt-1">{agency.setup}</div>
                      </div>
                      <div className="px-3 py-3">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">Équipe</div>
                        <div className="text-[12px] text-[color:var(--ink)] font-mono mt-1">{agency.team}</div>
                      </div>
                    </div>
                    {/* Critères booléens */}
                    <ul className="p-5 grid grid-cols-1 gap-2.5">
                      {compareColumns.map((c) => (
                        <li
                          key={c.key as string}
                          className="flex items-center justify-between gap-3 text-[13px]"
                        >
                          <span className="text-[color:var(--ink-muted)]">{c.label}</span>
                          <CheckCell state={agency[c.key] as CheckState} />
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
              <p className="mt-2 text-[11px] text-[color:var(--ink-muted)]">
                * Classement basé sur résultats clients, expertise technique et satisfaction client ({currentYear}).
              </p>
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
                Mon audit gratuit — 48 h <ArrowRight size={16} />
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
