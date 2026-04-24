import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowRight, Wrench } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import { fetchToolboxPageFromSupabase } from '@/lib/toolbox';

const SITE_URL = 'https://uclic.fr';
const PAGE_SIZE = 48;
const MAX_PRERENDER_PAGES = 100;

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const { totalCount } = await fetchToolboxPageFromSupabase(1, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const cappedPages = Math.min(totalPages, MAX_PRERENDER_PAGES);
  return Array.from({ length: Math.max(0, cappedPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  if (!Number.isInteger(page) || page < 2) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }
  const title = `Toolbox Startups — Page ${page}`;
  const description = `Page ${page} de notre toolbox — outils growth, marketing, sales, data et IA pour scale-ups B2B.`;
  return {
    title,
    description,
    alternates: { canonical: `/toolbox/page/${page}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/toolbox/page/${page}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Uclic — Toolbox Startups',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function ToolboxPaginatedPage({ params }: PageProps) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  if (!Number.isInteger(page) || page < 1) notFound();
  if (page === 1) redirect('/toolbox');

  const { nodes: tools, totalCount } = await fetchToolboxPageFromSupabase(page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  if (page > totalPages || tools.length === 0) notFound();

  const firstIndex = (page - 1) * PAGE_SIZE + 1;
  const lastIndex = Math.min(page * PAGE_SIZE, totalCount);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Toolbox', item: `${SITE_URL}/toolbox` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Page ${page}`,
        item: `${SITE_URL}/toolbox/page/${page}`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: firstIndex + i,
      name: t.title,
      url: `${SITE_URL}/toolbox/${t.slug}`,
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        <section className="relative pt-24 lg:pt-28 pb-16 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Toolbox · Page {page}
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                La stack que{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  nous utilisons vraiment.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[640px] text-[16px] leading-relaxed">
                Outils {firstIndex}–{lastIndex} sur {totalCount}.
              </p>
              <div className="mt-6">
                <a
                  href="/toolbox"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                >
                  ← Retour à la toolbox
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((t) => {
                const logo = t.productHuntFields.logo;
                const categories = t.productHuntFields.categories
                  ?.split(',')
                  .map((c) => c.trim())
                  .filter(Boolean)
                  .slice(0, 3);
                return (
                  <a
                    key={t.slug}
                    href={`/toolbox/${t.slug}`}
                    className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6 transition-colors hover:border-[color:var(--accent)]/60"
                  >
                    <div className="flex items-center gap-3">
                      {logo ? (
                        <div className="relative w-12 h-12 shrink-0 overflow-hidden !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={logo}
                            alt={t.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 shrink-0 inline-flex items-center justify-center !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                          <Wrench size={18} />
                        </div>
                      )}
                      <h2 className="text-[18px] font-display font-medium leading-tight tracking-[-0.01em]">
                        {t.title}
                      </h2>
                    </div>

                    {t.productHuntFields.tagline && (
                      <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3">
                        {t.productHuntFields.tagline}
                      </p>
                    )}

                    {categories && categories.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {categories.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                      Voir la fiche
                      <ArrowRight size={14} />
                    </span>
                  </a>
                );
              })}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/toolbox" />
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
