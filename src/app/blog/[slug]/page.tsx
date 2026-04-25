import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogListingSection from '@/components/blog/BlogListingSection';
import { jsonLdString } from '@/lib/schema';
import { extractFAQsFromContent, generateFAQPageSchema } from '@/lib/faq-schema';
import {
  getAllBlogSlugs,
  getLatestPosts,
  getPostBySlug,
  getRelatedPosts,
  estimateReadingTime,
} from '@/lib/blog';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import ReadingProgress from '@/components/blog/ReadingProgress';
import FloatingShareRail from '@/components/blog/FloatingShareRail';
import MidArticleCTA from '@/components/blog/MidArticleCTA';
import BlogGrid from '@/components/blog/BlogGrid';

const BLOG_PER_PAGE = 24;
const isNumericSlug = (slug: string) => /^\d+$/.test(slug);

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const [slugs, { totalPages }] = await Promise.all([
    getAllBlogSlugs(30),
    getLatestPosts(BLOG_PER_PAGE, 1),
  ]);
  const postParams = slugs.map((s) => ({ slug: s.slug }));
  // Numeric pagination slugs: /blog/2, /blog/3, ... (page 1 is served by /blog)
  const pageParams = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, i) => ({ slug: String(i + 2) }),
  );
  return [...postParams, ...pageParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (page < 2) {return { title: 'Blog' };}
    const title = `Blog Growth Marketing & IA — Page ${page}`;
    const description = `Page ${page} du blog Uclic : Growth Marketing, Sales Ops, IA, Product Marketing.`;
    return {
      title,
      description,
      alternates: { canonical: `/blog/${page}` },
      openGraph: {
        type: 'website',
        url: `${SITE_URL}/blog/${page}`,
        title,
        description,
        siteName: 'Uclic',
        locale: 'fr_FR',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Blog Uclic' }],
      },
      twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Article introuvable | Uclic',
      robots: { index: false, follow: false },
    };
  }
  const title = `${post.title} | Blog Uclic`;
  const description = post.excerpt || `${post.title} — article du blog Uclic.`;
  const canonical = `/blog/${post.slug}`;
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
      modifiedTime: post.modified || post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.featured_image_url
        ? [{ url: post.featured_image_url, width: 1200, height: 630, alt: post.title }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@uclic_fr',
    },
  };
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Numeric slug → pagination dispatch
  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (!Number.isInteger(page) || page < 1) {notFound();}
    if (page === 1) {redirect('/blog');}
    const { posts, total, totalPages } = await getLatestPosts(BLOG_PER_PAGE, page);
    if (page > totalPages) {notFound();}
    return (
      <BlogListingSection
        posts={posts}
        page={page}
        totalPages={totalPages}
        total={total}
        perPage={BLOG_PER_PAGE}
        basePath="/blog"
        eyebrow={`Blog · Page ${page}`}
        title="Growth, IA & insights"
        breadcrumbs={[
          { name: 'Accueil', item: `${SITE_URL}/` },
          { name: 'Blog', item: `${SITE_URL}/blog` },
          { name: `Page ${page}`, item: `${SITE_URL}/blog/${page}` },
        ]}
      />
    );
  }

  const post = await getPostBySlug(slug);
  if (!post) {notFound();}

  const reading = post.reading_time || estimateReadingTime(post.content || '');
  const related = await getRelatedPosts(post.id, 3);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  // FAQ schema dérivé du contenu HTML (≥ 2 paires Q/R nécessaires)
  const extractedFaqs = extractFAQsFromContent(post.content || '');
  const faqSchema =
    extractedFaqs.length >= 2 ? generateFAQPageSchema(extractedFaqs) : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.featured_image_url || `${SITE_URL}/og-image.png`,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    dateModified: post.modified || post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Uclic',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

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
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
        />
      ) : null}
      <Nav />
      <main className="relative bg-[color:var(--bg)] text-[color:var(--ink)]">
        {/* Header éditorial — container canon 1200px */}
        <section className="relative pt-24 lg:pt-28 pb-10 lg:pb-14 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[860px] mx-auto">
              {/* Breadcrumb canon site */}
              <nav
                aria-label="Fil d'Ariane"
                className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)] mb-8"
              >
                <a href="/" className="hover:text-[color:var(--accent)] transition-colors">Accueil</a>
                <span aria-hidden="true">/</span>
                <a href="/blog" className="hover:text-[color:var(--accent)] transition-colors">Blog</a>
                {post.category ? (
                  <>
                    <span aria-hidden="true">/</span>
                    <span className="text-[color:var(--ink)] line-clamp-1">{post.category}</span>
                  </>
                ) : null}
              </nav>

              {post.category ? (
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-5">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  {post.category}
                </span>
              ) : null}

              {/* H1 DA canon — italique accent sur le dernier mot */}
              <h1 className="text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
                {(() => {
                  const words = (post.title || '').trim().split(/\s+/);
                  if (words.length <= 1) {
                    return (
                      <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                        {post.title}
                        <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                      </span>
                    );
                  }
                  const last = words[words.length - 1];
                  const prefix = words.slice(0, -1).join(' ');
                  return (
                    <>
                      {prefix}{' '}
                      <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                        {last}
                        <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                      </span>
                    </>
                  );
                })()}
              </h1>

              {post.excerpt ? (
                <p className="mt-6 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--ink-muted)]">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[color:var(--ink-muted)] pb-6 border-b border-[color:var(--border-subtle)]">
                {post.author ? (
                  <span className="inline-flex items-center">
                    Par <span className="ml-1 font-medium text-[color:var(--ink)]">{post.author}</span>
                  </span>
                ) : null}
                {post.date ? <span>· {formatDate(post.date)}</span> : null}
                <span className="inline-flex items-center gap-1">· <Clock size={12} /> {reading}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured image — canon bento !rounded-none, container 1200 */}
        {post.featured_image_url ? (
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[1100px] mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover !rounded-none border border-[color:var(--border-subtle)]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        ) : null}

        {/* Barre de progression de lecture, fixée sous la Nav */}
        <ReadingProgress />

        {/* Rail social flottant + back-to-top (desktop only, apparaît après 35vh scroll) */}
        <FloatingShareRail url={shareUrl} title={post.title} />

        {/* Article — single column centrée (reading width 720px) */}
        <article className="relative py-12 lg:py-16">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[720px] mx-auto">
              {/* Table des matières — collapsible en tête d'article (standard UX) */}
              <div className="mb-10">
                <TableOfContents />
              </div>

              <div
                className="article-body blog-content"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
              {/* CTA injecté au milieu de l'article (avant le h2 central) */}
              <MidArticleCTA />

              {/* Share inline en fin d'article */}
              <div className="mt-12 pt-8 border-t border-[color:var(--border-subtle)]">
                <ShareButtons url={shareUrl} title={post.title} variant="inline" />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1 rounded-full border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] font-mono uppercase tracking-[0.15em]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Back link */}
              <div className="mt-12">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
                >
                  <ArrowLeft size={14} /> Tous les articles
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related articles — largeur alignée avec le header éditorial (860px) */}
        {related.length > 0 ? (
          <section className="relative pb-20 lg:pb-28 pt-8 lg:pt-10">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="max-w-[720px] mx-auto">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-6">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Articles connexes
                </div>
                <BlogGrid posts={related} />
              </div>
            </div>
          </section>
        ) : null}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
