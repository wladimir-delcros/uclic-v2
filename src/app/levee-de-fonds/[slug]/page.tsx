import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight, Building2, Calendar, Coins } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import LeveeListingSection from '@/components/levee/LeveeListingSection';
import { jsonLdString } from '@/lib/schema';
import {
  getLeveeBySlug,
  getLeveesPaginated,
  getRelatedLevees,
  getTopLeveeSlugs,
} from '@/lib/levee';
import { sanitizeCmsContent } from '@/lib/sanitize-content';

const LEVEE_PER_PAGE = 30;
const isNumericSlug = (s: string) => /^\d+$/.test(s);

const SITE_URL = 'https://uclic.fr';

// ISR every hour; unknown slugs are rendered on-demand then cached.
export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render the 50 most recent levées at build time.
 * The rest are rendered on-demand via ISR (dynamicParams = true).
 */
export async function generateStaticParams() {
  const [slugs, { totalPages }] = await Promise.all([
    getTopLeveeSlugs(50),
    getLeveesPaginated(1, LEVEE_PER_PAGE),
  ]);
  const leveeParams = slugs.map((slug) => ({ slug }));
  const MAX = 200;
  const pageParams = Array.from(
    { length: Math.max(0, Math.min(totalPages, MAX) - 1) },
    (_, i) => ({ slug: String(i + 2) }),
  );
  return [...leveeParams, ...pageParams];
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (page < 2) {return { title: 'Levées de fonds' };}
    const title = `Levées de fonds startups françaises — Page ${page}`;
    const description = `Page ${page} de la veille levées de fonds Uclic.`;
    return {
      title,
      description,
      alternates: { canonical: `/levee-de-fonds/${page}` },
      openGraph: {
        type: 'website',
        url: `${SITE_URL}/levee-de-fonds/${page}`,
        title,
        description,
        siteName: 'Uclic',
        locale: 'fr_FR',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Levées Uclic' }],
      },
      twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
    };
  }

  const post = await getLeveeBySlug(slug);

  if (!post) {
    return {
      title: 'Levée de fonds introuvable | Uclic',
      description: "La levée de fonds que vous recherchez n'existe pas.",
      robots: { index: false, follow: false },
    };
  }

  const rawExcerpt = post.excerpt || stripHtml(post.content).slice(0, 200);
  const description =
    rawExcerpt.length > 160 ? rawExcerpt.slice(0, 157) + '...' : rawExcerpt || 'Découvrez cette levée de fonds.';

  const title = `${post.title} — Levée de fonds | Uclic`;
  const canonical = `/levee-de-fonds/${post.slug}`;
  const featuredImageUrl = post.featuredImage?.node.sourceUrl;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredImageUrl
        ? [{ url: featuredImageUrl, width: 1200, height: 630, alt: post.title }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@uclic_fr',
      images: featuredImageUrl ? [featuredImageUrl] : ['/og-image.png'],
    },
  };
}

export default async function LeveeDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (!Number.isInteger(page) || page < 1) {notFound();}
    if (page === 1) {redirect('/levee-de-fonds');}
    const { levees, total, totalPages } = await getLeveesPaginated(page, LEVEE_PER_PAGE);
    if (page > totalPages || levees.length === 0) {notFound();}
    return (
      <LeveeListingSection
        levees={levees}
        page={page}
        totalPages={totalPages}
        total={total}
        perPage={LEVEE_PER_PAGE}
      />
    );
  }

  const post = await getLeveeBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedLevees(slug, 3);

  const cleanContent = sanitizeCmsContent(post.content);
  const companyName = post.company || post.title;
  const rawExcerpt = post.excerpt || stripHtml(cleanContent).slice(0, 240);
  const displayDate = post.dateText || formatDate(post.date);
  const featuredImageUrl = post.featuredImage?.node.sourceUrl;

  const canonicalUrl = `${SITE_URL}/levee-de-fonds/${post.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Levées de fonds',
        item: `${SITE_URL}/levee-de-fonds`,
      },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    description: rawExcerpt,
    image: featuredImageUrl ? [featuredImageUrl] : undefined,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
          url: post.authorSlug
            ? `${SITE_URL}/blog/auteur/${post.authorSlug}`
            : undefined,
          sameAs: [
            ...(post.authorLinkedIn ? [post.authorLinkedIn] : []),
            ...(post.authorTwitter ? [post.authorTwitter] : []),
          ].filter(Boolean),
        }
      : { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'fr-FR',
    articleSection: 'Levées de fonds',
  };

  const organizationSchema = post.company
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: post.company,
        description: `Startup française — levée de fonds${
          post.amountText ? ` de ${post.amountText}` : ''
        }${post.dateText ? ` en ${post.dateText}` : ''}.`,
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleSchema) }}
      />
      {organizationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationSchema) }}
        />
      )}
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
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
              href="/levee-de-fonds"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Toutes les levées
            </a>

            <div className="mt-8 inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Levée de fonds{post.company ? ` · ${post.company}` : ''}</span>
            </div>

            <h1 className="mt-4 text-[clamp(30px,4.2vw,50px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
              {post.title}
            </h1>

            {/* Meta pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {post.amountText && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-mono uppercase tracking-[0.12em] text-[color:var(--ink)] border border-[color:var(--border-subtle)] !rounded-none">
                  <Coins size={13} className="text-[color:var(--accent)]" />
                  {post.amountText}
                </span>
              )}
              {displayDate && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-mono uppercase tracking-[0.12em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] !rounded-none">
                  <Calendar size={13} className="text-[color:var(--accent)]" />
                  {displayDate}
                </span>
              )}
              {post.dealType && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-mono uppercase tracking-[0.12em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] !rounded-none">
                  <Building2 size={13} className="text-[color:var(--accent)]" />
                  {post.dealType}
                </span>
              )}
            </div>

            {featuredImageUrl && (
              <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImageUrl}
                  alt={post.featuredImage?.node.altText || post.title}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10 relative grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-10 min-w-0">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <span className="w-4 h-px bg-[color:var(--accent)]" /> Analyse
                </div>
                {cleanContent ? (
                  <article
                    className="levee-content mt-4"
                    // sanitizeCmsContent removes AI-injected CTA spam + duplicates
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                ) : (
                  <p className="mt-5 text-[15.5px] text-[color:var(--ink-muted)] leading-[1.7]">
                    Contenu détaillé bientôt disponible.
                  </p>
                )}
              </div>
            </div>

            {/* Aside */}
            <aside className="lg:col-span-1 article-sidebar-sticky flex flex-col gap-6">
                {/* Company card */}
                <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Startup
                  </div>
                  <div className="mt-2 text-[22px] font-display font-medium tracking-[-0.01em]">
                    {companyName}
                  </div>

                  {post.amountText && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Montant
                      </div>
                      <div className="mt-2 text-[16px] text-[color:var(--ink)]">
                        {post.amountText}
                      </div>
                    </>
                  )}

                  {displayDate && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Date
                      </div>
                      <div className="mt-2 text-[14px] text-[color:var(--ink-muted)]">
                        {displayDate}
                      </div>
                    </>
                  )}

                  {post.dealType && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Type
                      </div>
                      <div className="mt-2 text-[14px] text-[color:var(--ink-muted)]">
                        {post.dealType}
                      </div>
                    </>
                  )}
                </div>

                {/* CTA audit */}
                <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    CTA
                  </div>
                  <div className="mt-2 text-[18px] font-display font-medium tracking-[-0.01em] leading-snug text-[color:var(--ink)]">
                    Vous venez de lever ? Scalons ensemble.
                  </div>
                  <p className="mt-2 text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed">
                    Pilotage senior, experts canaux, agents IA en production. On identifie les 3 leviers d&apos;acquisition à activer en premier — résultats mesurables en 90 jours.
                  </p>
                  <a
                    href="/audit"
                    className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[color:var(--accent)] hover:gap-2.5 transition-all"
                  >
                    Mon audit gratuit — 48 h
                    <ArrowRight size={14} />
                  </a>
                </div>

                {/* Related */}
                {relatedPosts.length > 0 && (
                  <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6">
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                      À lire aussi
                    </div>
                    <ul className="mt-3 flex flex-col divide-y divide-[color:var(--border-subtle)]">
                      {relatedPosts.map((r) => (
                        <li key={r.slug} className="py-3 first:pt-0 last:pb-0">
                          <a
                            href={`/levee-de-fonds/${r.slug}`}
                            className="group flex items-start gap-2 text-[14px] text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
                          >
                            <ArrowRight
                              size={13}
                              className="mt-1 shrink-0 text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)]"
                            />
                            <span className="leading-snug">{r.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </aside>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
