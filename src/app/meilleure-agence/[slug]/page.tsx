import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
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
  getAllMeilleureAgenceSlugs,
  getCompetitorsByExpertiseAndCity,
} from '@/lib/meilleure-agence';

const SITE_URL = 'https://uclic.fr';
const MAX_PRERENDER = 200;

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function parseSlug(slug: string) {
  const all = await getAllMeilleureAgenceSlugs();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const all = await getAllMeilleureAgenceSlugs();
  return all.slice(0, MAX_PRERENDER).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = await parseSlug(slug);
  if (!parsed) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }

  const serviceName = parsed.expertise.replace(/^Agence\s+/i, '').trim();
  const currentYear = new Date().getFullYear();
  const rawTitle = `Meilleure agence ${serviceName} ${parsed.ville} ${currentYear} — Comparatif`;
  const title = rawTitle.length > 60 ? `Agences ${serviceName} ${parsed.ville} ${currentYear} — Comparatif` : rawTitle;
  const description = `Classement éditorial des agences ${serviceName} à ${parsed.ville} en ${currentYear} : scores, avis, analyse par l'équipe growth Uclic. Audit gratuit en 48 h.`;

  return {
    title,
    description,
    keywords: [
      `meilleure agence ${serviceName.toLowerCase()} ${parsed.ville.toLowerCase()}`,
      `agence ${serviceName.toLowerCase()} ${parsed.ville.toLowerCase()}`,
      `comparatif agence ${serviceName.toLowerCase()}`,
      'uclic',
    ],
    alternates: { canonical: `/meilleure-agence/${slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/meilleure-agence/${slug}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `Agence ${serviceName} ${parsed.ville} — Uclic`,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function MeilleureAgenceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = await parseSlug(slug);
  if (!parsed) {notFound();}

  const competitors = await getCompetitorsByExpertiseAndCity(
    parsed.expertise,
    parsed.ville
  );
  if (competitors.length === 0) {notFound();}

  const serviceName = parsed.expertise.replace(/^Agence\s+/i, '').trim();
  const currentYear = new Date().getFullYear();
  const uclicRow = competitors.find((c) => c.isUclic);
  const top3 = competitors.slice(0, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Meilleures agences',
        item: `${SITE_URL}/meilleure-agence`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Agence ${serviceName} ${parsed.ville}`,
        item: `${SITE_URL}/meilleure-agence/${slug}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Agence ${serviceName} ${parsed.ville}`,
    description: `Comparatif éditorial des meilleures agences ${serviceName} à ${parsed.ville}.`,
    url: `${SITE_URL}/meilleure-agence/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
    },
    serviceType: serviceName,
    areaServed: { '@type': 'City', name: parsed.ville },
    availableLanguage: 'fr',
  };

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
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[820px]">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span
                  className="w-6 h-px shrink-0 bg-[color:var(--accent)]"
                  aria-hidden="true"
                />
                <span>
                  Comparatif {currentYear} · {parsed.ville}
                </span>
              </div>
              <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
                Meilleure agence {serviceName} à {parsed.ville}.
              </h1>
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
                {competitors.length} agences {serviceName} analysées à {parsed.ville}.
                Notre classement combine note Google, volume d&apos;avis, vérification
                et lisibilité du positionnement. Pas un palmarès marketing — un outil
                d&apos;arbitrage pour choisir la bonne équipe selon votre stade.
              </p>
              <div className="mt-6">
                <a
                  href="/meilleure-agence"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                >
                  ← Retour à l&apos;annuaire
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TOP 3 HIGHLIGHT */}
        {top3.length > 0 && (
          <section className="relative py-12 lg:py-16 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Top 3</span>
              </div>
              <h2 className="text-[28px] lg:text-[36px] font-display font-medium tracking-[-0.02em] max-w-[720px]">
                Les agences qui ressortent à {parsed.ville}.
              </h2>

              {/* Bento : 3 cards collées + croix aux 8 corners (DA Nos offres) */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
                {/* 8 croix aux intersections / corners externes — desktop only */}
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
                    className={`relative p-6 lg:p-8 flex flex-col gap-4 !rounded-none transition-colors duration-300 bg-[color:var(--card-elev-1)] light:bg-white ${
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
                    <h3 className="text-[20px] lg:text-[22px] font-display font-medium tracking-[-0.01em]">
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
                    {c.website && (
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
            </div>
          </section>
        )}

        {/* FULL COMPARATIF — table comparative alignée DA growth */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Comparatif complet</span>
            </div>
            <h2 className="text-[28px] lg:text-[36px] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              {competitors.length} agences {serviceName} à {parsed.ville}.
            </h2>
            <p className="mt-3 text-[color:var(--ink-muted)] max-w-[640px] text-[15px] leading-relaxed">
              Score sur 100 basé sur note Google, volume d&apos;avis, vérification de la fiche et lisibilité du positionnement. Cellules cochées = critère présent.
            </p>

            {/* Desktop : vraie table comparative */}
            <div className="mt-10 hidden lg:block">
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[color:var(--border-subtle)] text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                      <th className="sticky left-0 z-10 bg-[#141211] light:bg-white px-4 py-4 font-normal w-[60px]">#</th>
                      <th className="sticky left-[60px] z-10 bg-[#141211] light:bg-white px-4 py-4 font-normal min-w-[200px]">Agence</th>
                      <th className="px-3 py-4 font-normal text-center w-[80px]">Score</th>
                      <th className="px-3 py-4 font-normal text-center w-[100px]">Note</th>
                      <th className="px-3 py-4 font-normal text-center w-[90px]">Volume avis</th>
                      <th className="px-3 py-4 font-normal text-center w-[80px]">Site</th>
                      <th className="px-3 py-4 font-normal text-center w-[80px]">Tél.</th>
                      <th className="px-3 py-4 font-normal text-center w-[90px]">Fiche complète</th>
                      <th className="px-3 py-4 font-normal min-w-[260px]">Positionnement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((c) => {
                      const reviewCount = c.reviewCount ?? 0;
                      const volumeState: 'true' | 'partial' | 'false' =
                        c.isUclic || reviewCount >= 100
                          ? 'true'
                          : reviewCount >= 20
                            ? 'partial'
                            : 'false';
                      const completeFiche =
                        Boolean(c.website) &&
                        Boolean(c.phone) &&
                        Boolean(c.address);
                      return (
                        <tr
                          key={`${c.rank}-${c.name}`}
                          className={`border-b border-[color:var(--border-subtle)] last:border-b-0 transition-colors ${
                            c.isUclic ? 'bg-[color:var(--accent)]/5' : 'hover:bg-[color:var(--card-elev-1)]'
                          }`}
                        >
                          <td
                            className={`sticky left-0 z-[5] px-4 py-4 ${
                              c.isUclic
                                ? 'bg-[#1a1716] light:bg-[#fbfbfa]'
                                : 'bg-[#141211] light:bg-white'
                            }`}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 !rounded-none border text-[12px] font-mono ${
                                c.isUclic
                                  ? 'border-[color:var(--accent)]/60 text-[color:var(--accent)]'
                                  : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]'
                              }`}
                            >
                              {c.rank}
                            </span>
                          </td>
                          <td
                            className={`sticky left-[60px] z-[5] px-4 py-4 ${
                              c.isUclic
                                ? 'bg-[#1a1716] light:bg-[#fbfbfa]'
                                : 'bg-[#141211] light:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 text-[15px] font-display font-medium leading-tight">
                              <span className="truncate max-w-[220px]">{c.name}</span>
                              {c.isUclic && (
                                <BadgeCheck size={13} className="text-[color:var(--accent)] shrink-0" />
                              )}
                            </div>
                            {c.address && (
                              <div className="text-[11px] text-[color:var(--ink-muted)] mt-0.5 truncate max-w-[240px]">
                                {c.address}
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-4 text-center">
                            <div
                              className={`text-[20px] font-display font-medium leading-none ${
                                c.isUclic ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
                              }`}
                            >
                              {c.score}
                            </div>
                          </td>
                          <td className="px-3 py-4 text-center">
                            {c.rating !== null ? (
                              <>
                                <div className="inline-flex items-center gap-1 text-[12px] text-[color:var(--ink)]">
                                  <Star size={11} className="text-[color:var(--accent)]" />
                                  {c.rating.toFixed(1)}
                                </div>
                                {c.reviewCount !== null && (
                                  <div className="text-[10px] text-[color:var(--ink-muted)] mt-0.5">
                                    {c.reviewCount} avis
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
                                <Minus size={14} />
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-center">
                            {volumeState === 'true' ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                                <Check size={14} strokeWidth={2.5} />
                              </span>
                            ) : volumeState === 'partial' ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] text-[10px] font-mono">
                                ½
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
                                <Minus size={14} />
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-center">
                            {c.website ? (
                              <a
                                href={c.website}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                aria-label={`Site de ${c.name}`}
                                className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 transition-colors"
                              >
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
                                <Minus size={14} />
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-center">
                            {c.phone ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                                <Check size={14} strokeWidth={2.5} />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
                                <Minus size={14} />
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-center">
                            {completeFiche ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                                <Check size={14} strokeWidth={2.5} />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] text-[10px] font-mono">
                                ½
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                            {c.strengths ? (
                              <span className="line-clamp-2">{c.strengths}</span>
                            ) : (
                              <span className="text-[color:var(--ink-muted)]/60">—</span>
                            )}
                          </td>
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
                  Critère présent
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
                  * Volume avis : ✓ ≥ 100 · ½ ≥ 20.
                </span>
              </div>
            </div>

            {/* Mobile : carte par agence avec mini-matrice */}
            <div className="mt-10 flex flex-col gap-3 lg:hidden">
              {competitors.map((c) => {
                const reviewCount = c.reviewCount ?? 0;
                const volumeState: 'true' | 'partial' | 'false' =
                  c.isUclic || reviewCount >= 100
                    ? 'true'
                    : reviewCount >= 20
                      ? 'partial'
                      : 'false';
                const completeFiche =
                  Boolean(c.website) && Boolean(c.phone) && Boolean(c.address);
                const renderState = (s: 'true' | 'partial' | 'false') =>
                  s === 'true' ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                  ) : s === 'partial' ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] text-[10px] font-mono">
                      ½
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--border-subtle)]/40 text-[color:var(--ink-muted)]/40">
                      <Minus size={14} />
                    </span>
                  );
                return (
                  <article
                    key={`${c.rank}-${c.name}`}
                    className={`relative !rounded-none border ${
                      c.isUclic
                        ? 'border-[color:var(--accent)]/60 bg-[color:var(--card-elev-1)] light:bg-white'
                        : 'border-[color:var(--border-subtle)] bg-[#141211] light:bg-white'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-5 border-b border-[color:var(--border-subtle)]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`inline-flex items-center justify-center w-9 h-9 !rounded-none border text-[13px] font-mono shrink-0 ${
                            c.isUclic
                              ? 'border-[color:var(--accent)]/60 text-[color:var(--accent)]'
                              : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]'
                          }`}
                        >
                          #{c.rank}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[17px] font-display font-medium tracking-[-0.01em] flex items-center gap-1.5">
                            <span className="truncate">{c.name}</span>
                            {c.isUclic && (
                              <BadgeCheck size={13} className="text-[color:var(--accent)] shrink-0" />
                            )}
                          </h3>
                          {c.address && (
                            <p className="text-[11px] text-[color:var(--ink-muted)] truncate">
                              {c.address}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div
                          className={`text-[22px] font-display font-medium leading-none ${
                            c.isUclic ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
                          }`}
                        >
                          {c.score}
                        </div>
                        {c.rating !== null && (
                          <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[color:var(--ink-muted)]">
                            <Star size={10} className="text-[color:var(--accent)]" />
                            {c.rating.toFixed(1)}
                            {c.reviewCount !== null && ` · ${c.reviewCount}`}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Critères */}
                    <ul className="p-5 grid grid-cols-1 gap-2.5">
                      <li className="flex items-center justify-between gap-3 text-[13px]">
                        <span className="text-[color:var(--ink-muted)]">Volume avis</span>
                        {renderState(volumeState)}
                      </li>
                      <li className="flex items-center justify-between gap-3 text-[13px]">
                        <span className="text-[color:var(--ink-muted)]">Site web</span>
                        {c.website ? (
                          <a
                            href={c.website}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center justify-center w-6 h-6 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]"
                          >
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          renderState('false')
                        )}
                      </li>
                      <li className="flex items-center justify-between gap-3 text-[13px]">
                        <span className="text-[color:var(--ink-muted)]">Téléphone</span>
                        {renderState(c.phone ? 'true' : 'false')}
                      </li>
                      <li className="flex items-center justify-between gap-3 text-[13px]">
                        <span className="text-[color:var(--ink-muted)]">Fiche complète</span>
                        {renderState(completeFiche ? 'true' : 'partial')}
                      </li>
                    </ul>
                    {c.strengths && (
                      <div className="px-5 pb-5">
                        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)] mb-1">
                          Positionnement
                        </p>
                        <p className="text-[13px] text-[color:var(--ink)] leading-relaxed">{c.strengths}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOFT CTA */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <h2 className="text-[22px] lg:text-[26px] font-display font-medium tracking-[-0.01em]">
                Besoin d&apos;un avis ciblé {parsed.ville} / {serviceName} ?
              </h2>
              <p className="mt-3 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[720px]">
                {uclicRow
                  ? `Chez Uclic, on pilote des dispositifs ${serviceName.toLowerCase()} pour des scale-ups B2B : pilotage senior, experts canaux, agents IA en production. Trois piliers, une équipe, zéro silo. On oriente selon votre stade — même si la bonne réponse n'est pas nous.`
                  : `Pilotage senior, experts canaux, agents IA en production : trois piliers dans une seule équipe. On oriente selon votre stade, votre budget et votre canal dominant — gratuitement, même si la bonne réponse n'est pas Uclic.`}
              </p>
              <a
                href="/audit"
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
              >
                Mon audit gratuit — 48 h <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
