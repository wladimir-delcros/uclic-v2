import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogListingSection from '@/components/blog/BlogListingSection';
import { jsonLdString } from '@/lib/schema';
import {
  getAllBlogSlugs,
  getLatestPosts,
  getPostBySlug,
  estimateReadingTime,
} from '@/lib/blog';

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
    if (page < 2) return { title: 'Blog' };
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
    if (!Number.isInteger(page) || page < 1) notFound();
    if (page === 1) redirect('/blog');
    const { posts, total, totalPages } = await getLatestPosts(BLOG_PER_PAGE, page);
    if (page > totalPages) notFound();
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
  if (!post) notFound();

  const reading = post.reading_time || estimateReadingTime(post.content || '');

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
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-10 lg:pb-12 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[860px] mx-auto px-5 lg:px-10">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Tous les articles
            </a>
            {post.category ? (
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                {post.category}
              </span>
            ) : null}
            <h1 className="text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] font-medium text-[color:var(--ink)] tracking-tight">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-5 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)]">
                {post.excerpt}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-[color:var(--ink-muted)] pb-6 border-b border-[color:var(--border-subtle)]">
              {post.author ? (
                <span className="inline-flex items-center">
                  Par <span className="ml-1 font-medium text-[color:var(--ink)]">{post.author}</span>
                </span>
              ) : null}
              {post.date ? <span>· {formatDate(post.date)}</span> : null}
              <span className="inline-flex items-center gap-1">· <Clock size={12} /> {reading}</span>
            </div>
          </div>
        </section>

        {post.featured_image_url ? (
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover rounded-xl border border-[color:var(--border-subtle)]"
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}

        <article className="relative py-12 lg:py-16">
          <div
            className="prose prose-lg max-w-[760px] mx-auto px-5 lg:px-10 blog-content
              prose-headings:text-[color:var(--ink)] prose-headings:font-semibold
              prose-p:text-[color:var(--ink)] prose-p:leading-relaxed
              prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[color:var(--ink)]
              prose-code:text-[color:var(--accent)] prose-code:bg-[color:var(--border-subtle)]/30 prose-code:px-1 prose-code:rounded
              prose-blockquote:border-[color:var(--accent)] prose-blockquote:text-[color:var(--ink-muted)]
              prose-img:rounded-xl prose-img:border prose-img:border-[color:var(--border-subtle)]
              prose-li:text-[color:var(--ink)]"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>

        {post.tags && post.tags.length > 0 ? (
          <div className="max-w-[760px] mx-auto px-5 lg:px-10 pb-16">
            <div className="flex flex-wrap gap-2 pt-6 border-t border-[color:var(--border-subtle)]">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[12px] px-3 py-1 rounded-full border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
