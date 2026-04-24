import type { Metadata } from 'next';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { getAllLevees } from '@/lib/levee';

const SITE_URL = 'https://uclic.fr';
const PAGE_SIZE = 30;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Levées de fonds startups françaises — Veille Uclic',
  description:
    "Veille critique sur les levées de fonds startups françaises : montants, investisseurs, signaux faibles. Lecture par l'équipe growth Uclic. Audit gratuit.",
  alternates: { canonical: '/levee-de-fonds' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/levee-de-fonds`,
    title: 'Levées de fonds startups françaises — Veille Uclic',
    description:
      "Veille critique sur les levées de fonds des startups françaises : montants, investisseurs, signaux faibles.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Levées de fonds startups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levées de fonds startups françaises — Veille Uclic',
    description:
      "Veille critique sur les levées de fonds des startups françaises : montants, investisseurs, signaux faibles.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Levée de fonds', item: `${SITE_URL}/levee-de-fonds` },
  ],
};

export default async function LeveeDeFondsPage() {
  const allLevees = await getAllLevees();
  const levees = allLevees.slice(0, PAGE_SIZE);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: levees.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: l.company || l.title,
      url: `${SITE_URL}/levee-de-fonds/${l.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(itemListSchema) }}
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
                Veille · Levées de fonds
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Les levées qui{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  comptent vraiment.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[680px] text-[16px] leading-relaxed">
                {allLevees.length > 0
                  ? `${allLevees.length} levées analysées par l'équipe qui structure la croissance de scale-ups B2B au quotidien — pilotage senior, experts canaux, agents IA en production. Lecture critique, zéro communiqué recopié.`
                  : `Veille signée par l'équipe qui structure la croissance de scale-ups B2B au quotidien — pilotage senior, experts canaux, agents IA en production.`}
              </p>
            </div>
          </div>
        </section>

        {/* LISTING */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            {levees.length === 0 ? (
              <p className="text-[color:var(--ink-muted)] text-center py-16">
                Aucune levée publiée pour le moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {levees.map((l) => {
                  const img = l.featuredImage?.node.sourceUrl;
                  return (
                    <a
                      key={l.slug}
                      href={`/levee-de-fonds/${l.slug}`}
                      className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden transition-colors hover:border-[color:var(--accent)]/60"
                    >
                      {img && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--card-elev-1)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={l.company || l.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}

                      <div className="p-7 flex flex-col gap-3 flex-1">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] self-start">
                          <TrendingUp size={12} />
                          Levée de fonds
                        </div>
                        <h2 className="text-[22px] lg:text-[24px] font-display font-medium leading-tight tracking-[-0.01em]">
                          {l.company || l.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 text-[12px] font-mono uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
                          {l.amountText && (
                            <span className="px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                              {l.amountText}
                            </span>
                          )}
                          {l.dateText && (
                            <span className="px-2 py-1 border border-[color:var(--border-subtle)]">
                              {l.dateText}
                            </span>
                          )}
                          {l.dealType && (
                            <span className="px-2 py-1 border border-[color:var(--border-subtle)]">
                              {l.dealType}
                            </span>
                          )}
                        </div>
                        {l.excerpt && (
                          <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3">
                            {l.excerpt.replace(/<[^>]+>/g, '').trim()}
                          </p>
                        )}
                        <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                          Lire l&apos;analyse
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
