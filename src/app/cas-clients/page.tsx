import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { getAllCasClients } from '@/lib/portfolio';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Cas clients — Résultats mesurables en 90 jours | Uclic',
  description:
    "CodinGame, Tehtris, Agicap, Deepki, MSC Cruises. Trois piliers activés : Inbound, Outbound, IA & Développement. Résultats mesurables en 90 jours.",
  alternates: { canonical: '/cas-clients' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/cas-clients`,
    title: 'Cas clients — Résultats mesurables en 90 jours | Uclic',
    description:
      "Scale-ups B2B : trois piliers, une seule équipe, zéro silo. Résultats mesurables en 90 jours. Problème, solution, chiffres.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Cas clients',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cas clients — Résultats mesurables en 90 jours | Uclic',
    description:
      "Scale-ups B2B : trois piliers, une seule équipe, zéro silo. Résultats mesurables en 90 jours.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Cas clients', item: `${SITE_URL}/cas-clients` },
  ],
};

export const revalidate = 3600;

export default async function CasClientsIndexPage() {
  const cases = await getAllCasClients();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cases.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      url: `${SITE_URL}/cas-clients/${c.slug}`,
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
                Cas clients · Terrain
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Résultats mesurables{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  en 90 jours.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[680px] text-[16px] leading-relaxed">
                {cases.length} cas publiés, extraits de 40+ scale-ups B2B accompagnées. Trois piliers mobilisés — Inbound, Outbound, IA & Développement — du problème brut au chiffre mesuré.
              </p>
            </div>
          </div>
        </section>

        {/* LISTING */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cases.map((c) => (
                <a
                  key={c.slug}
                  href={`/cas-clients/${c.slug}`}
                  className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden transition-colors hover:border-[color:var(--accent)]/60"
                >
                  {c.featured_image_url && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--card-elev-1)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.featured_image_url}
                        alt={c.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="p-7 flex flex-col gap-4 flex-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] self-start">
                      <span className="w-4 h-px bg-[color:var(--accent)]" />
                      Cas client
                    </div>
                    <h2 className="text-[22px] lg:text-[24px] font-display font-medium leading-tight tracking-[-0.01em]">
                      {c.title}
                    </h2>
                    {c.excerpt && (
                      <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                        {c.excerpt}
                      </p>
                    )}
                    <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                      Lire le cas complet
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </a>
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
