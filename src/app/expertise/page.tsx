import type { Metadata } from 'next';
import { ArrowRight, Search, Send, Cpu, BarChart3, Megaphone, Wrench, Sparkles, Users, Target, LineChart, Mail, Globe2 } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import PreuveSection from '@/components/landing/PreuveSection';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { getExpertiseCategories } from '@/lib/expertise';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Expertises Growth Marketing & IA',
  description:
    "Découvrez nos expertises en Growth Marketing, IA, Paid Media, SEO, Social Ads, Data Analytics, Branding et CRM. Pilotage senior pour scale-ups B2B.",
  alternates: { canonical: '/expertise' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/expertise`,
    title: 'Expertises Growth Marketing & IA | Uclic',
    description:
      "Toutes nos expertises en Growth Marketing, IA et acquisition B2B.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Expertises Uclic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expertises Growth Marketing & IA | Uclic',
    description:
      "Toutes nos expertises en Growth Marketing, IA et acquisition B2B.",
    site: '@uclic_fr',
  },
};

// Familles d'expertises (regroupement éditorial)
const FAMILLES = [
  {
    eyebrow: 'Acquisition',
    title: 'Acquisition payante & organique',
    description:
      "Capter une demande qualifiée — sur les bons canaux, au bon moment, au bon coût.",
    icon: Search,
    slugs: ['seo', 'paid-media', 'sma', 'marketing-digital', 'agence-web'],
  },
  {
    eyebrow: 'Conversion',
    title: 'Conversion & Product Marketing',
    description:
      "Transformer le trafic en pipeline qualifié, puis en revenus récurrents.",
    icon: Target,
    slugs: ['growth-marketing', 'branding'],
  },
  {
    eyebrow: 'Rétention & CRM',
    title: 'Rétention, CRM & Sales Ops',
    description:
      "Activer, fidéliser, monter en valeur. CRM, lifecycle, automation, scoring.",
    icon: Users,
    slugs: ['crm'],
  },
  {
    eyebrow: 'IA & Data',
    title: 'IA, Automation & Data',
    description:
      "Industrialiser les opérations Growth grâce à l'IA générative et la data.",
    icon: Cpu,
    slugs: ['intelligence-artificielle', 'data-analytics'],
  },
];

// Méthode transversale (réutilisée sur toutes les expertises)
const METHODE = [
  { n: '01', t: 'Audit & cadrage', d: "Diagnostic 360° du funnel, des canaux et de la data en 5 jours." },
  { n: '02', t: 'Roadmap priorisée', d: "Backlog Growth scoré (impact × effort × confiance) avec OKR trimestriels." },
  { n: '03', t: 'Stack & tracking', d: "Mise en place / refonte du tracking, attribution, dataLayer, GA4, CRM." },
  { n: '04', t: 'Run éditorial & paid', d: "Production, diffusion, A/B tests, itérations hebdomadaires sur tous canaux." },
  { n: '05', t: 'Industrialisation IA', d: "Workflows IA + automation pour scaler sans alourdir l'équipe." },
  { n: '06', t: 'Reporting & pilotage', d: "Dashboard hebdo, COPIL mensuel, comité trimestriel orienté ROI." },
];

// FAQ générale expertises
const FAQ = [
  {
    q: 'Quelle expertise activer en premier ?',
    a: "Cela dépend de votre stade. Early stage : poser le tracking, lancer Inbound + Outbound léger. Growth stage : industrialiser SEO + Paid + CRM. Scale-up : automatiser via IA et structurer la rétention. Notre audit gratuit cadre tout cela en 5 jours.",
  },
  {
    q: "Combien d'expertises pouvez-vous activer en parallèle ?",
    a: "Sur un accompagnement standard, on active 3 à 5 leviers en simultané, pilotés par un Growth Lead senior unique. L'objectif n'est jamais de tout activer mais d'aller vite sur les leviers qui transforment.",
  },
  {
    q: "Comment l'IA change votre manière de travailler ?",
    a: "L'IA est intégrée à chaque expertise : génération de contenus SEO, ICP scoring, prospection multi-touch, copywriting paid, segmentation CRM, dashboards conversationnels. Elle ne remplace pas le pilotage senior, elle décuple sa vitesse d'exécution.",
  },
  {
    q: "Travaillez-vous uniquement en B2B ?",
    a: "Notre expertise principale couvre les scale-ups B2B SaaS et tech. Nous accompagnons aussi des marques B2C ambitieuses (DTC, marketplaces) lorsque la maturité data et l'enjeu paid media justifient un pilotage senior.",
  },
  {
    q: "Quels résultats moyens observez-vous ?",
    a: "Sur les 40+ scale-ups accompagnées : x2 à x4 sur le pipeline qualifié à 6 mois, -30% sur le CPA paid après 90 jours, +60% de SQL via SEO IA en 12 mois. Chaque cas client publié documente la méthode et la mesure.",
  },
  {
    q: "Comment sont composées vos équipes ?",
    a: "Une équipe Growth Lead senior (10+ ans), un copywriter, un media buyer, un data analyst, un automation engineer. Tous certifiés (Google Ads, Meta, HubSpot) et formés en continu sur les sorties IA.",
  },
];

export default async function ExpertiseIndexPage() {
  const categories = await getExpertiseCategories();

  // Index rapide des categories par slug
  const bySlug = new Map(categories.map((c) => [c.slug, c]));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Expertises', item: `${SITE_URL}/expertise` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/expertise/${c.slug}`,
      name: c.name,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Expertises Growth Marketing & IA — Uclic',
    description:
      "Expertises en Growth Marketing, IA, Paid Media, SEO, CRM, Data Analytics et Branding par les growth seniors Uclic.",
    url: `${SITE_URL}/expertise`,
    isPartOf: { '@type': 'WebSite', name: 'Uclic', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }} />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Expertises
            </span>
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[900px]">
              Toutes nos expertises{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                growth
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
              </span>
              {' '}& IA
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[680px]">
              Acquisition, conversion, rétention, IA. Une équipe senior qui pilote vos leviers,
              met en production les canaux adaptés à votre stade, et industrialise l&apos;exécution
              grâce à l&apos;automation et l&apos;IA générative.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Audit offert
                <ArrowRight size={14} className="text-black light:text-white" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Nous contacter
              </a>
            </div>

            {/* KPIs band */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)] !rounded-none">
              {[
                { v: '40+', l: 'scale-ups B2B accompagnées' },
                { v: '10 ans', l: 'd\'expérience Growth en moyenne' },
                { v: 'x3', l: 'pipeline moyen à 6 mois' },
                { v: '5j', l: 'pour démarrer après le brief' },
              ].map((k) => (
                <div key={k.l} className="bg-[color:var(--card-elev-1)] light:bg-white p-5 lg:p-6">
                  <div className="text-[28px] md:text-[32px] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)]">{k.v}</div>
                  <div className="mt-1 text-[12px] text-[color:var(--ink-muted)] leading-tight">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRID — toutes les expertises */}
        <section className="relative pb-20 lg:pb-28">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Catalogue
                </span>
                <h2 className="text-[32px] md:text-[42px] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)] max-w-[640px]">
                  {categories.length} domaines d&apos;expertise
                </h2>
              </div>
              <p className="text-[15px] text-[color:var(--ink-muted)] max-w-[420px] leading-relaxed">
                Chaque expertise est pilotée par un référent senior et combine outils, méthode et IA.
              </p>
            </div>

            {categories.length === 0 ? (
              <p className="text-[color:var(--ink-muted)]">Aucune expertise publiée pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--border-subtle)] !rounded-none relative">
                {categories.map((c, idx) => {
                  const colCount = 3;
                  const isLastCol = (idx + 1) % colCount === 0;
                  const isLastRow = idx >= categories.length - (categories.length % colCount || colCount);
                  return (
                    <a
                      key={c.slug}
                      href={`/expertise/${c.slug}`}
                      className={`group relative flex flex-col p-7 bg-[color:var(--card-elev-1)] light:bg-white !rounded-none border-[color:var(--border-subtle)] transition-colors hover:bg-[color:var(--card)] ${
                        !isLastCol ? 'md:border-r' : ''
                      } ${!isLastRow ? 'border-b' : ''}`}
                    >
                      <div className="w-11 h-11 grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card)] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/30 transition-colors">
                        <Sparkles size={18} strokeWidth={1.75} />
                      </div>
                      <h3 className="mt-5 text-[20px] font-display font-medium leading-tight text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                        {c.name}
                      </h3>
                      {c.description ? (
                        <p className="mt-2.5 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                          {c.description}
                        </p>
                      ) : null}
                      <div className="mt-auto pt-5 flex items-center justify-between text-[12px] text-[color:var(--ink-muted)]">
                        {typeof c.count === 'number' && c.count > 0 ? (
                          <span>{c.count} expertise{c.count > 1 ? 's' : ''}</span>
                        ) : (
                          <span />
                        )}
                        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                          Voir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* FAMILLES D'EXPERTISES */}
        <section className="relative py-20 lg:py-28 border-t border-[color:var(--border-subtle)]">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Par famille
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-[clamp(28px,3.6vw,44px)] font-display font-medium tracking-[-0.02em] max-w-[820px] mx-auto">
              4 familles, un seul{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                pilotage
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>
            <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[620px] mx-auto leading-relaxed">
              Chaque famille regroupe les leviers actionnables. Le Growth Lead arbitre les priorités selon votre stade et vos données.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)] !rounded-none">
              {FAMILLES.map((f) => {
                const Icon = f.icon;
                const cats = f.slugs.map((s) => bySlug.get(s)).filter(Boolean) as typeof categories;
                return (
                  <article
                    key={f.title}
                    className="bg-[color:var(--card-elev-1)] light:bg-white p-8 lg:p-10 flex flex-col"
                  >
                    <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                      <span className="w-6 h-px bg-[color:var(--accent)]" />
                      {f.eyebrow}
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 shrink-0 grid place-items-center border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
                        <Icon size={20} strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-[22px] font-display font-medium tracking-tight text-[color:var(--ink)] leading-tight">
                          {f.title}
                        </h3>
                        <p className="mt-2 text-[14.5px] text-[color:var(--ink-muted)] leading-relaxed">{f.description}</p>
                      </div>
                    </div>

                    {cats.length > 0 ? (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {cats.map((c) => (
                          <li key={c.slug}>
                            <a
                              href={`/expertise/${c.slug}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[color:var(--border-subtle)] !rounded-none text-[12.5px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
                            >
                              {c.name}
                              <ArrowRight size={11} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* MÉTHODE TRANSVERSALE */}
        <section className="relative py-20 lg:py-28 border-t border-[color:var(--border-subtle)]">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Méthode
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-[clamp(28px,3.6vw,44px)] font-display font-medium tracking-[-0.02em] max-w-[820px] mx-auto">
              6 étapes,{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                une cadence
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>
            <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[620px] mx-auto leading-relaxed">
              Une méthode commune à toutes les expertises pour passer de l&apos;audit au ROI mesuré.
            </p>

            <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)] !rounded-none">
              {METHODE.map((m) => (
                <li key={m.n} className="bg-[color:var(--card-elev-1)] light:bg-white p-7">
                  <div className="text-[12px] font-mono tracking-[0.18em] text-[color:var(--accent)]">{m.n}</div>
                  <div className="mt-3 text-[18px] font-display font-medium tracking-tight text-[color:var(--ink)]">{m.t}</div>
                  <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">{m.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PREUVE — réutilise PreuveSection */}
        <PreuveSection />

        {/* TOP EXPERTISES — internal links */}
        <section className="relative py-20 lg:py-28 border-t border-[color:var(--border-subtle)]">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Populaires
                </span>
                <h2 className="text-[32px] md:text-[42px] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)] max-w-[640px]">
                  Découvrez tous les détails par expertise
                </h2>
              </div>
              <a
                href="/cas-clients"
                className="inline-flex items-center gap-2 text-[14px] text-[color:var(--accent)] hover:gap-3 transition-all"
              >
                Voir nos cas clients <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(
                [
                  ['seo', 'SEO IA', LineChart],
                  ['paid-media', 'Paid Media', Megaphone],
                  ['growth-marketing', 'Growth Marketing', Send],
                  ['intelligence-artificielle', 'IA & Automation', Cpu],
                  ['crm', 'CRM & Lifecycle', Mail],
                  ['data-analytics', 'Data Analytics', BarChart3],
                  ['sma', 'Social Media Ads', Globe2],
                  ['branding', 'Branding', Sparkles],
                  ['agence-web', 'Agence Web', Wrench],
                ] as const
              )
                .filter(([slug]) => bySlug.has(slug))
                .map(([slug, label, Icon]) => (
                  <a
                    key={slug}
                    href={`/expertise/${slug}`}
                    className="group flex items-center gap-4 p-5 border border-[color:var(--border-subtle)] !rounded-none bg-[color:var(--card-elev-1)] light:bg-white hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <div className="w-10 h-10 shrink-0 grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card)] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/30 transition-colors">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-medium text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors truncate">
                        {label}
                      </div>
                      <div className="text-[12px] text-[color:var(--ink-muted)] truncate">
                        /expertise/{slug}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
            </div>

            {/* Liens connexes */}
            <div className="mt-10 pt-8 border-t border-[color:var(--border-subtle)] flex flex-wrap gap-3">
              <a href="/blog" className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">→ Blog Growth & IA</a>
              <a href="/outils-gratuits" className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">→ Outils gratuits (MDE, A/B Test)</a>
              <a href="/equipe" className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">→ L&apos;équipe Uclic</a>
              <a href="/cas-clients" className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">→ 40+ cas clients B2B</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 lg:py-28 border-t border-[color:var(--border-subtle)]">
          <div className="relative z-10 max-w-[920px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                FAQ
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-[clamp(28px,3.6vw,44px)] font-display font-medium tracking-[-0.02em]">
              Questions{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                fréquentes
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>

            <div className="mt-12 border border-[color:var(--border-subtle)] !rounded-none">
              {FAQ.map((f, i) => (
                <details
                  key={f.q}
                  className={`group bg-[color:var(--card-elev-1)] light:bg-white ${
                    i < FAQ.length - 1 ? 'border-b border-[color:var(--border-subtle)]' : ''
                  }`}
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none hover:bg-[color:var(--card)] transition-colors">
                    <h3 className="text-[16px] md:text-[17px] font-medium text-[color:var(--ink)] pr-4">{f.q}</h3>
                    <span className="shrink-0 w-7 h-7 grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] group-open:bg-[color:var(--accent)] group-open:text-black group-open:border-[color:var(--accent)] transition-colors">
                      <ArrowRight size={13} className="rotate-90 group-open:rotate-[-90deg] transition-transform" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-[14.5px] leading-relaxed text-[color:var(--ink-muted)]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
