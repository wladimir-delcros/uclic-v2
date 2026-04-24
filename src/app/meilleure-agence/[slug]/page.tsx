import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  MapPin,
  Phone,
  Star,
} from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
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

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {top3.map((c) => (
                  <article
                    key={`${c.rank}-${c.name}`}
                    className={`relative !rounded-none border p-6 lg:p-8 flex flex-col gap-4 ${
                      c.isUclic
                        ? 'border-[color:var(--accent)]/60 bg-[color:var(--card-elev-1)] light:bg-white'
                        : 'border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center w-9 h-9 !rounded-none border border-[color:var(--border-subtle)] text-[13px] font-mono text-[color:var(--accent)]">
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

        {/* FULL COMPARATIF */}
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

            <div className="mt-10 flex flex-col gap-3">
              {competitors.map((c) => (
                <article
                  key={`${c.rank}-${c.name}`}
                  className={`relative !rounded-none border p-6 lg:p-7 grid grid-cols-1 md:grid-cols-[56px_1fr_auto] gap-5 items-start ${
                    c.isUclic
                      ? 'border-[color:var(--accent)]/60 bg-[color:var(--card-elev-1)] light:bg-white'
                      : 'border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white'
                  }`}
                >
                  <div className="flex md:block items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[13px] font-mono text-[color:var(--accent)]">
                      #{c.rank}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[17px] lg:text-[19px] font-display font-medium tracking-[-0.01em]">
                        {c.name}
                      </h3>
                      {c.isUclic && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                          <BadgeCheck size={12} />
                          Uclic
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[color:var(--ink-muted)]">
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
                      {c.address && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} />
                          <span className="truncate max-w-[360px]">{c.address}</span>
                        </span>
                      )}
                      {c.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone size={12} />
                          {c.phone}
                        </span>
                      )}
                    </div>
                    {c.strengths && (
                      <p className="mt-1 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                        {c.strengths}
                      </p>
                    )}
                    {c.remarks && (
                      <p className="text-[13px] text-[color:var(--ink-muted)]/80 leading-relaxed italic">
                        {c.remarks}
                      </p>
                    )}
                  </div>

                  <div className="flex md:justify-end">
                    {c.website && (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 h-9 px-3 !rounded-none border border-[color:var(--border-subtle)] text-[13px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
                      >
                        Site <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
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
