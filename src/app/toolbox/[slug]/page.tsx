import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import CTAButton from '@/components/ui/CTAButton';
import ToolboxListingSection from '@/components/toolbox/ToolboxListingSection';
import { jsonLdString } from '@/lib/schema';
import {
  fetchToolboxPageFromSupabase,
  getToolboxItems,
  getToolboxItemBySlug,
} from '@/lib/toolbox';

const TOOLBOX_PER_PAGE = 48;
const isNumericSlug = (s: string) => /^\d+$/.test(s);

const SITE_URL = 'https://uclic.fr';

// Hybrid strategy: prerender the 50 most recent tools at build time, ISR the rest.
export const dynamicParams = true;
export const revalidate = 3600; // ISR every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const [{ nodes }, { totalCount }] = await Promise.all([
      getToolboxItems({ perPage: 50 }),
      fetchToolboxPageFromSupabase(1, TOOLBOX_PER_PAGE),
    ]);
    const toolParams = nodes
      .filter((n) => !!n.slug)
      .map((n) => ({ slug: n.slug }));
    const totalPages = Math.ceil(totalCount / TOOLBOX_PER_PAGE);
    const MAX = 200;
    const pageParams = Array.from(
      { length: Math.max(0, Math.min(totalPages, MAX) - 1) },
      (_, i) => ({ slug: String(i + 2) }),
    );
    return [...toolParams, ...pageParams];
  } catch (error) {
    console.error('Error generating static params for toolbox:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: 'Outil non trouvé | Toolbox Uclic',
      robots: { index: false, follow: false },
    };
  }

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (page < 2) return { title: 'Toolbox' };
    const title = `Toolbox Startups — Page ${page}`;
    const description = `Page ${page} de la toolbox Uclic : outils growth, marketing, sales, data et IA.`;
    return {
      title,
      description,
      alternates: { canonical: `/toolbox/${page}` },
      openGraph: {
        type: 'website',
        url: `${SITE_URL}/toolbox/${page}`,
        title,
        description,
        siteName: 'Uclic',
        locale: 'fr_FR',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Toolbox Uclic' }],
      },
      twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
    };
  }

  const tool = await getToolboxItemBySlug(slug);
  if (!tool) {
    return {
      title: 'Outil non trouvé | Toolbox Uclic',
      description: "Cet outil n'existe pas ou n'est plus disponible.",
      robots: { index: false, follow: false },
    };
  }

  const rawDescription =
    tool.productHuntFields.tagline ||
    `Découvrez ${tool.title} dans notre sélection d'outils growth, marketing, sales, data et IA.`;
  const description =
    rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription;

  const canonical = `/toolbox/${tool.slug}`;
  const imageUrl =
    tool.productHuntFields.screenshotUrl ||
    tool.productHuntFields.logo ||
    '/og-image.png';

  const categoryTags = tool.productHuntFields.categories
    ? tool.productHuntFields.categories.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  return {
    title: `${tool.title} — Toolbox Uclic`,
    description,
    keywords: [
      tool.title,
      'toolbox',
      'outil growth',
      'outil startup',
      'uclic',
      ...categoryTags,
    ],
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title: `${tool.title} — Toolbox Uclic`,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
      tags: categoryTags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} — Toolbox Uclic`,
      description,
      images: [imageUrl],
      site: '@uclic_fr',
    },
  };
}

export default async function ToolboxDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (!Number.isInteger(page) || page < 1) notFound();
    if (page === 1) redirect('/toolbox');
    const { nodes: tools, totalCount } = await fetchToolboxPageFromSupabase(
      page,
      TOOLBOX_PER_PAGE,
    );
    const totalPages = Math.ceil(totalCount / TOOLBOX_PER_PAGE);
    if (page > totalPages || tools.length === 0) notFound();
    return (
      <ToolboxListingSection
        tools={tools}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        perPage={TOOLBOX_PER_PAGE}
      />
    );
  }

  const tool = await getToolboxItemBySlug(slug);
  if (!tool) {
    notFound();
  }

  const tagline =
    tool.productHuntFields.tagline ||
    `Outil sélectionné par l'équipe Uclic pour sa pertinence sur les enjeux growth & acquisition.`;
  const logo = tool.productHuntFields.logo;
  const screenshot = tool.productHuntFields.screenshotUrl;
  const externalUrl = tool.productHuntFields.websiteUrl || '';
  const categoryTags = tool.productHuntFields.categories
    ? tool.productHuntFields.categories.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  const canonical = `${SITE_URL}/toolbox/${tool.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Toolbox', item: `${SITE_URL}/toolbox` },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.title,
        item: canonical,
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tagline,
    url: canonical,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    image: screenshot || logo || `${SITE_URL}/og-image.png`,
    inLanguage: 'fr-FR',
    keywords: categoryTags,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    ...(tool.productHuntFields.votesCount && tool.productHuntFields.votesCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            ratingCount: String(tool.productHuntFields.votesCount),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(softwareSchema) }}
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
        <section className="relative pt-24 lg:pt-28 pb-12 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10 relative">
            <a
              href="/toolbox"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Toute la toolbox
            </a>

            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
              {logo && (
                <div className="shrink-0 w-[72px] h-[72px] !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt={`${tool.title} logo`}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Toolbox Uclic
                </div>
                <h1 className="mt-3 text-[clamp(32px,4.4vw,52px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
                  {tool.title}
                </h1>
                <p className="mt-4 text-[color:var(--ink-muted)] text-[16px] leading-relaxed max-w-[720px]">
                  {tagline}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              {externalUrl && (
                <CTAButton
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  icon={ExternalLink}
                  size="md">
                  Visiter {tool.title}
                </CTAButton>
              )}
              <CTAButton href="/audit" variant="secondary" icon={ArrowRight} size="md">
                Auditer ma stack
              </CTAButton>
            </div>

            {screenshot && (
              <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshot}
                  alt={`${tool.title} — aperçu`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10 relative grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <span className="w-4 h-px bg-[color:var(--accent)]" /> Description
                </div>
                <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                  À propos de {tool.title}
                </h2>
                {tool.content ? (
                  <div
                    className="mt-4 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7] [&_a]:text-[color:var(--accent)] [&_a]:underline [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-[18px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3 [&_p]:mt-3"
                    dangerouslySetInnerHTML={{ __html: tool.content }}
                  />
                ) : (
                  <p className="mt-4 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7]">
                    {tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Aside */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Outil
                  </div>
                  <div className="mt-2 text-[22px] font-display font-medium tracking-[-0.01em]">
                    {tool.title}
                  </div>

                  {categoryTags.length > 0 && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Catégories
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {categoryTags.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {tool.date && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Référencé le
                      </div>
                      <div className="mt-2 text-[13.5px] text-[color:var(--ink-muted)]">
                        {new Date(tool.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </>
                  )}

                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                    >
                      Visiter le site officiel
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                <a
                  href="/audit"
                  className="group !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 transition-colors hover:border-[color:var(--accent)]/60"
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                    Besoin d&apos;aide
                  </div>
                  <div className="mt-2 text-[16px] font-display font-medium tracking-[-0.01em] leading-snug">
                    Faire auditer ma stack acquisition
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all">
                    Prendre RDV
                    <ArrowRight size={13} />
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
