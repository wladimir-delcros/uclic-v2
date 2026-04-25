import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ExternalLink,
  Minus,
  Star,
} from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import CornerCross from '@/components/ui/CornerCross';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import {
  getAgencePageByPath,
  getTopAgencePaths,
  getOtherCityServices,
} from '@/lib/programmatic-pages';
import { getCompetitorsByExpertiseAndCity } from '@/lib/meilleure-agence';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

// Cap at 500 pour rester compatible avec le budget build-time.
// Les pages hors-cap seront rendues a la demande (dynamicParams = true).
const STATIC_PARAMS_CAP = 500;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const paths = await getTopAgencePaths(STATIC_PARAMS_CAP);
  return paths
    .map((p) => {
      // p = "/agence/xxx-yyy" -> slug = ["xxx-yyy"]
      const trimmed = p.startsWith('/agence/') ? p.slice('/agence/'.length) : p;
      if (!trimmed) {return null;}
      return { slug: trimmed.split('/').filter(Boolean) };
    })
    .filter((x): x is { slug: string[] } => x !== null && x.slug.length > 0);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }
  const pathSlug = `/agence/${slug.join('/')}`;
  const result = await getAgencePageByPath(pathSlug);
  if (!result) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }

  const { fields, cityName, serviceName } = result;
  const canonical = pathSlug;

  const finalTitle =
    fields.metaTitle?.trim() ||
    (cityName ? `Agence ${serviceName} ${cityName}` : `Agence ${serviceName}`);

  let description = fields.metaDescription || '';
  if (cityName && description && !description.toLowerCase().includes(cityName.toLowerCase())) {
    const baseDescription = description.replace(/^Agence\s+[^:]+:\s*/i, '').trim();
    description = baseDescription
      ? `Agence ${serviceName} a ${cityName} : ${baseDescription}`
      : `Agence ${serviceName} a ${cityName}. ${fields.subtitle || ''}`.trim();
  }
  if (!description) {
    description =
      fields.subtitle ||
      (cityName
        ? `Agence ${serviceName} a ${cityName}. Pilotage senior, experts canaux, agents IA en production.`
        : `Agence ${serviceName}. Pilotage senior, experts canaux, agents IA en production.`);
  }
  if (description.length > 160) {description = description.substring(0, 157) + '...';}

  return {
    title: finalTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title: finalTitle,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: finalTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      site: '@uclic_fr',
    },
  };
}

export default async function AgenceProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {notFound();}

  const pathSlug = `/agence/${slug.join('/')}`;
  const result = await getAgencePageByPath(pathSlug);
  if (!result) {notFound();}

  const { fields: f, cityName, citySlug, serviceName, pageType } = result;

  const finalH1 =
    f.h1 ||
    (cityName ? `Agence ${serviceName} a ${cityName}` : `Agence ${serviceName}`);

  const canonicalUrl = `${SITE_URL}${pathSlug}`;
  const currentYear = new Date().getFullYear();

  // Load competitors (top 3) — best-effort: not all (service, city) tuples exist.
  let competitors: Awaited<ReturnType<typeof getCompetitorsByExpertiseAndCity>> = [];
  if (cityName) {
    try {
      // Try with the real expertise title first, fallback to "Agence <serviceName>".
      competitors = await getCompetitorsByExpertiseAndCity(
        `Agence ${serviceName}`,
        cityName,
      );
      if (competitors.length === 0) {
        competitors = await getCompetitorsByExpertiseAndCity(serviceName, cityName);
      }
    } catch {
      competitors = [];
    }
  }
  const top3 = competitors.slice(0, 3);
  const compareSlug = cityName
    ? `${serviceName.toLowerCase().replace(/\s+/g, '-')}-${cityName.toLowerCase().replace(/\s+/g, '-')}`
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Agence', item: `${SITE_URL}/agence` },
      { '@type': 'ListItem', position: 3, name: finalH1, item: canonicalUrl },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: finalH1,
    description: f.metaDescription || f.subtitle || '',
    provider: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    serviceType: pageType === 'expertise' ? 'Expertise' : 'Categorie expertise',
    areaServed: cityName
      ? { '@type': 'City', name: cityName }
      : { '@type': 'Country', name: 'France' },
    availableLanguage: 'fr',
    url: canonicalUrl,
  };

  const itemListSchema =
    competitors.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Top agences ${serviceName}${cityName ? ` ${cityName}` : ''}`,
          itemListElement: competitors.slice(0, 10).map((c, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Organization',
              name: c.name,
              ...(c.website ? { url: c.website } : {}),
              ...(c.address ? { address: c.address } : {}),
              ...(c.rating !== null && c.reviewCount !== null
                ? {
                    aggregateRating: {
                      '@type': 'AggregateRating',
                      ratingValue: c.rating,
                      reviewCount: c.reviewCount,
                      bestRating: '5',
                      worstRating: '1',
                    },
                  }
                : {}),
            },
          })),
        }
      : null;

  const faqItems = [
    { q: f.faqTitle1, a: f.faqDesc1 },
    { q: f.faqTitle2, a: f.faqDesc2 },
    { q: f.faqTitle3, a: f.faqDesc3 },
    { q: f.faqTitle4, a: f.faqDesc4 },
    { q: f.faqTitle5, a: f.faqDesc5 },
    { q: f.faqTitle6, a: f.faqDesc6 },
  ].filter((x) => x.q && x.a);

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((fa) => ({
            '@type': 'Question',
            name: fa.q,
            acceptedAnswer: { '@type': 'Answer', text: fa.a },
          })),
        }
      : null;

  const boxes = [
    { t: f.titrebox1, d: f.description1 },
    { t: f.titrebox2, d: f.description2 },
    { t: f.titrebox3, d: f.description3 },
  ].filter((x) => x.t);

  const processItems = [
    { t: f.processTitre1, d: f.descriptionTitre1 },
    { t: f.processTitre2, d: f.descriptionTitre2 },
    { t: f.processTitre3, d: f.descriptionTitre3 },
  ].filter((x) => x.t);

  // Fallback method steps (V1 had a 5-step growth method when DB empty).
  const fallbackProcess = [
    {
      t: 'Cadrage business',
      d: `Audit de votre stack ${serviceName.toLowerCase()}, baseline KPI, ICP et goulot prioritaire. Livrable : roadmap 90 jours chiffrée.`,
    },
    {
      t: 'Mise en place',
      d: `Branchement tracking (server-side, GA4, CAPI), data warehouse, dashboards de pilotage hebdo. Le compteur démarre.`,
    },
    {
      t: 'Sprints d\'execution',
      d: `Sprints de 2 semaines : tests d\'angles, optimisation funnel, automatisation. Reporting transparent par canal.`,
    },
    {
      t: 'Itération & scale',
      d: `Quand un canal devient profitable et stable, on le scale. Quand il ne l\'est pas, on coupe. Pas d\'attachement aux moyens.`,
    },
  ];

  const stepsToRender = processItems.length > 0 ? processItems : fallbackProcess;

  // Comparatif Uclic vs autres agences.
  const comparativeRows = [
    { label: 'Pilotage senior', uclic: 'Oui — partner direct', generic: 'Account manager junior' },
    { label: 'Expert canal dédié', uclic: 'Oui — un par levier', generic: 'Pool partagé' },
    { label: 'Agents IA en production', uclic: 'Oui — workflows custom', generic: 'Rare ou prompts génériques' },
    { label: 'Engagement', uclic: 'Mensuel, sans tacite reconduction', generic: '12 mois minimum' },
    { label: 'Reporting', uclic: 'Dashboards live, hebdo', generic: 'PDF mensuel' },
    { label: 'Délai de démarrage', uclic: '7 à 14 jours', generic: '4 à 8 semaines' },
  ];

  // Cas d'usage typiques pour ce service.
  const useCases = [
    {
      t: `Scale-up B2B SaaS qui plafonne en CAC`,
      d: `On rebatit le mix acquisition pour casser le palier : lancement Demand Gen ABM, optimisation paid + outbound LinkedIn IA-augmenté.`,
    },
    {
      t: `Levée de fonds ou go-to-market FR`,
      d: `Plan ${serviceName.toLowerCase()} 90 jours pour valider product-market fit et générer un pipeline mesurable avant la due diligence.`,
    },
    {
      t: `Migration tracking server-side / RGPD`,
      d: `Audit conversions, GTM server-side, attribution multi-touch. Vous récupérez la donnée perdue par les bloqueurs.`,
    },
  ];

  const otherServices = await getOtherCityServices(citySlug, pathSlug, 9);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema) }}
      />
      {itemListSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(itemListSchema) }}
        />
      ) : null}
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
        />
      ) : null}

      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <Link
              href="/expertise"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Retour aux expertises
            </Link>
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>{f.tag || `Agence ${serviceName}${cityName ? ` · ${cityName}` : ''}`}</span>
            </div>
            <h1 className="font-display font-medium tracking-[-0.02em] text-[clamp(34px,4.6vw,56px)] leading-[1.05] text-[color:var(--ink)] max-w-[900px]">
              {finalH1}
            </h1>
            {f.subtitle ? (
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
                {f.subtitle}
              </p>
            ) : (
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
                Pilotage senior, experts canaux, agents IA en production. Trois piliers, une équipe, zéro silo —
                {cityName ? ` à ${cityName} comme ailleurs.` : ' partout en France.'}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Mon audit gratuit — 48 h
                <ArrowRight size={14} className="text-black light:text-white" />
              </a>
              <a
                href="/simulation"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Simuler mon ROI
              </a>
            </div>
            {/* Mini stats bar */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px border border-[color:var(--border-subtle)] !rounded-none bg-[color:var(--border-subtle)]/40">
              {[
                { k: '90j', v: 'Roadmap chiffrée' },
                { k: '7-14j', v: 'Démarrage opérationnel' },
                { k: '+30%', v: 'Pipeline médian 6 mois' },
                { k: 'Senior', v: 'Pilotage partner direct' },
              ].map((s) => (
                <div key={s.k} className="bg-[color:var(--bg)] p-5">
                  <div className="text-[22px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                    {s.k}
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--ink-muted)] mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESENTATION LOCALE (si ville) */}
        {cityName ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                  <span>Contexte local</span>
                </div>
                <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)]">
                  {serviceName} à {cityName} —{' '}
                  <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                    pourquoi ça compte
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 text-[15px] leading-relaxed text-[color:var(--ink-muted)] space-y-4">
                <p>
                  {cityName} concentre un tissu d&apos;entreprises B2B en pleine accélération : SaaS, services
                  professionnels, industrie tech. La concurrence sur les requêtes locales est plus dense qu&apos;il
                  y a trois ans, et les coûts médias paid montent.
                </p>
                <p>
                  Les enjeux {serviceName.toLowerCase()} d&apos;une équipe basée à {cityName} ne sont pas les
                  mêmes que ceux d&apos;une scale-up parisienne : marché adressable plus localisé, dépendance
                  forte aux relais terrain, et exigence de ROI chiffré dès le premier trimestre.
                </p>
                <p>
                  C&apos;est exactement là que notre approche fait la différence : on rebatit votre mix
                  d&apos;acquisition autour de votre stade réel, pas d&apos;un template.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {/* 3 BENEFITS BOXES (DA bento corner-cross) */}
        {boxes.length > 0 ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Ce qu&apos;on livre</span>
              </div>
              {f.h21 ? (
                <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
                  {f.h21}
                </h2>
              ) : (
                <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
                  Trois piliers,{' '}
                  <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                    une seule équipe.
                  </span>
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
                {[
                  { left: '0%', top: '0%' },
                  { left: '33.333%', top: '0%' },
                  { left: '66.666%', top: '0%' },
                  { left: '100%', top: '0%' },
                  { left: '0%', top: '100%' },
                  { left: '33.333%', top: '100%' },
                  { left: '66.666%', top: '100%' },
                  { left: '100%', top: '100%' },
                ].map((pos, idx) => (
                  <CornerCross
                    key={idx}
                    size={14}
                    className="hidden md:block absolute z-[2]"
                    style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
                {boxes.map((b, i) => (
                  <article
                    key={i}
                    className={`relative p-7 lg:p-8 flex flex-col gap-3 !rounded-none bg-[#141211] light:bg-white ${
                      i < boxes.length - 1 ? 'md:border-r md:border-[color:var(--border-subtle)]' : ''
                    } ${i !== boxes.length - 1 ? 'border-b border-[color:var(--border-subtle)] md:border-b-0' : ''}`}
                  >
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                      0{i + 1}
                    </span>
                    <h3 className="text-[18px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                      {b.t}
                    </h3>
                    {b.d ? (
                      <p className="text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                        {b.d}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* TOP 3 AGENCES LOCALES (si compétitors disponibles) */}
        {top3.length > 0 && cityName ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Top 3 · {cityName}</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-3">
                Les agences {serviceName} qui ressortent à{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  {cityName}
                </span>
              </h2>
              <p className="text-[15px] text-[color:var(--ink-muted)] max-w-[640px] leading-relaxed mb-10">
                Classement éditorial sur {currentYear} basé sur note Google, volume d&apos;avis,
                fiche complète et lisibilité du positionnement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
                {[
                  { left: '0%', top: '0%' },
                  { left: '33.333%', top: '0%' },
                  { left: '66.666%', top: '0%' },
                  { left: '100%', top: '0%' },
                  { left: '0%', top: '100%' },
                  { left: '33.333%', top: '100%' },
                  { left: '66.666%', top: '100%' },
                  { left: '100%', top: '100%' },
                ].map((pos, idx) => (
                  <CornerCross
                    key={idx}
                    size={14}
                    className="hidden md:block absolute z-[2]"
                    style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
                {top3.map((c, i) => (
                  <article
                    key={`${c.rank}-${c.name}`}
                    className={`relative p-7 lg:p-8 flex flex-col gap-4 !rounded-none bg-[#141211] light:bg-white ${
                      c.isUclic ? 'bg-[color:var(--accent)]/[0.04]' : ''
                    } ${i < top3.length - 1 ? 'md:border-r md:border-[color:var(--border-subtle)]' : ''} ${
                      i !== top3.length - 1 ? 'border-b border-[color:var(--border-subtle)] md:border-b-0' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center justify-center w-9 h-9 !rounded-none border text-[13px] font-mono ${
                          c.isUclic
                            ? 'border-[color:var(--accent)]/60 text-[color:var(--accent)]'
                            : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]'
                        }`}
                      >
                        #{c.rank}
                      </span>
                      {c.isUclic && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                          <BadgeCheck size={12} />
                          Uclic
                        </span>
                      )}
                    </div>
                    <h3 className="text-[20px] font-display font-medium tracking-[-0.01em]">
                      {c.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-[12px] text-[color:var(--ink-muted)]">
                      {c.rating !== null && (
                        <span className="inline-flex items-center gap-1">
                          <Star size={12} className="text-[color:var(--accent)]" />
                          {c.rating.toFixed(1)}
                          {c.reviewCount !== null && ` · ${c.reviewCount} avis`}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-mono uppercase tracking-[0.18em]">
                        Score {c.score}
                      </span>
                    </div>
                    {c.strengths && (
                      <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-5">
                        {c.strengths}
                      </p>
                    )}
                    {c.website && !c.isUclic && (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all self-start"
                      >
                        Voir le site <ExternalLink size={13} />
                      </a>
                    )}
                  </article>
                ))}
              </div>

              {compareSlug ? (
                <div className="mt-6">
                  <Link
                    href={`/meilleure-agence/${compareSlug}`}
                    className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                  >
                    Voir le comparatif complet ({competitors.length} agences) <ArrowRight size={13} />
                  </Link>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* CONTENT 2 (free-form HTML from DB) */}
        {(f.h22 || f.content2) && (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              {f.h22 ? (
                <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-6">
                  {f.h22}
                </h2>
              ) : null}
              {f.content2 ? (
                <div
                  className="text-[15.5px] leading-[1.7] text-[color:var(--ink)]/90
                    [&_a]:text-[color:var(--accent)] [&_a]:underline
                    [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-[20px]
                    [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3 [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: f.content2 }}
                />
              ) : null}
            </div>
          </section>
        )}

        {/* CAS D'USAGE TYPIQUES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Cas d&apos;usage</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Quand on est{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                la bonne réponse
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {useCases.map((u, i) => (
                <article
                  key={i}
                  className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    Scénario {i + 1}
                  </span>
                  <h3 className="mt-3 text-[18px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                    {u.t}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                    {u.d}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METHODE GROWTH (process steps) */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>{f.processLittleTitle || 'Méthode'}</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-4 max-w-[820px]">
              {f.processTitle || `Comment on opère votre ${serviceName.toLowerCase()}.`}
            </h2>
            {f.processDescription ? (
              <p className="text-[16px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px] mb-10">
                {f.processDescription}
              </p>
            ) : (
              <p className="text-[16px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px] mb-10">
                Pas de slides. Pas de séminaires. Une roadmap chiffrée à 90 jours, des sprints de 2 semaines,
                un dashboard de pilotage hebdo. Vous savez à tout moment où va l&apos;euro investi.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stepsToRender.map((p, i) => (
                <div
                  key={i}
                  className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <span className="absolute -top-3 left-6 bg-[color:var(--bg)] px-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                    Étape {i + 1}
                  </span>
                  <h3 className="mt-2 text-[17px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                    {p.t}
                  </h3>
                  {p.d ? (
                    <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--ink-muted)]">
                      {p.d}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIF UCLIC VS AUTRES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Comparatif</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Uclic vs. agence{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {serviceName.toLowerCase()}
              </span>{' '}
              classique
            </h2>
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[color:var(--border-subtle)] text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                    <th className="px-5 py-4 font-normal min-w-[200px]">Critère</th>
                    <th className="px-5 py-4 font-normal text-[color:var(--accent)]">Uclic</th>
                    <th className="px-5 py-4 font-normal">Agence classique</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativeRows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[color:var(--border-subtle)] last:border-b-0"
                    >
                      <td className="px-5 py-4 text-[13px] text-[color:var(--ink-muted)]">
                        {row.label}
                      </td>
                      <td className="px-5 py-4 text-[14px] text-[color:var(--ink)] bg-[color:var(--accent)]/[0.04]">
                        <span className="inline-flex items-center gap-2">
                          <Check size={14} className="text-[color:var(--accent)] shrink-0" />
                          {row.uclic}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[14px] text-[color:var(--ink-muted)]">
                        <span className="inline-flex items-center gap-2">
                          <Minus size={14} className="text-[color:var(--ink-muted)]/50 shrink-0" />
                          {row.generic}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AUTRES SERVICES DANS LA MEME VILLE */}
        {otherServices.length > 0 && (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Autres expertises</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10">
                {cityName ? `Nos autres services à ${cityName}` : 'Nos autres expertises'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {otherServices.map((s) => (
                  <Link
                    key={s.path_slug}
                    href={s.path_slug}
                    className="group flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <h3 className="text-[18px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors line-clamp-2">
                      {s.title}
                    </h3>
                    {s.subtitle ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {s.subtitle}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>{f.faqSubtitle || 'Questions fréquentes'}</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10">
                Vos questions sur{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  {serviceName.toLowerCase()}
                </span>
                {cityName ? ` à ${cityName}` : ''}
              </h2>
              <div className="space-y-4">
                {faqItems.map((fa, i) => (
                  <details
                    key={i}
                    className="group !rounded-none border border-[color:var(--border-subtle)] overflow-hidden"
                  >
                    <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-[15px] font-medium text-[color:var(--ink)] hover:bg-[color:var(--border-subtle)]/10 transition-colors">
                      <span>{fa.q}</span>
                      <span className="text-[color:var(--accent)] group-open:rotate-45 transition-transform text-[20px] leading-none ml-4">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                      {fa.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
