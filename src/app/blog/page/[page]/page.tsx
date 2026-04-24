import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogGrid from '@/components/blog/BlogGrid';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import { getLatestPosts } from '@/lib/blog';

const SITE_URL = 'https://uclic.fr';
const PER_PAGE = 24;
const MAX_PRERENDER_PAGES = 200;

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const { totalPages } = await getLatestPosts(PER_PAGE, 1);
  const cappedPages = Math.min(totalPages, MAX_PRERENDER_PAGES);
  // Only generate pages 2..N; page 1 is handled by /blog/page.tsx
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
  const title = `Blog Growth Marketing & IA — Page ${page}`;
  const description = `Page ${page} du blog Uclic — articles et conseils d'experts en Growth Marketing, Sales Ops, IA et Product Marketing.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/page/${page}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/blog/page/${page}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Blog Uclic' }],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  if (!Number.isInteger(page) || page < 1) notFound();
  if (page === 1) redirect('/blog');

  const { posts, total, totalPages } = await getLatestPosts(PER_PAGE, page);
  if (page > totalPages || posts.length === 0) notFound();

  const firstIndex = (page - 1) * PER_PAGE + 1;
  const lastIndex = Math.min(page * PER_PAGE, total);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Page ${page}`,
        item: `${SITE_URL}/blog/page/${page}`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: firstIndex + i,
      url: `${SITE_URL}/blog/${p.slug}`,
      name: p.title,
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
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[800px]">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Blog · Page {page}</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
                Growth, IA &amp;{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  insights
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                </span>
              </h1>
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                Articles {firstIndex}–{lastIndex} sur {total}.
              </p>
              <div className="mt-6">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                >
                  ← Retour au blog
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <BlogGrid posts={posts} />
            <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
