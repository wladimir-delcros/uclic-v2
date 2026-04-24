import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogGrid from '@/components/blog/BlogGrid';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import { getLatestPosts } from '@/lib/blog';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog Growth Marketing & IA',
  description:
    "Articles et conseils d'experts en Growth Marketing, Sales Ops, IA et Product Marketing. Stratégies data-driven pour scale-ups B2B.",
  keywords: [
    'blog growth marketing',
    'growth hacking',
    'sales ops',
    'product marketing',
    'intelligence artificielle marketing',
    'agence growth',
    'uclic',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog Growth Marketing & IA | Uclic',
    description:
      "Articles et conseils d'experts en Growth Marketing, Sales Ops, IA et Product Marketing.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Blog Uclic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Growth Marketing & IA | Uclic',
    description:
      "Articles et conseils d'experts en Growth Marketing, Sales Ops, IA et Product Marketing.",
    site: '@uclic_fr',
  },
};

const PER_PAGE = 24;

export default async function BlogIndexPage() {
  const { posts, total, totalPages } = await getLatestPosts(PER_PAGE, 1);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[800px]">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Blog
              </span>
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
                Growth, IA &amp;{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  insights
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                </span>
              </h1>
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                Articles et retours d&apos;expérience de l&apos;équipe Uclic : stratégies growth,
                automatisations IA, sales ops, scraping, et benchmarks pour scale-ups B2B.
                <span className="block mt-2 text-[13px] text-[color:var(--ink-muted)]/80">
                  {total} article{total > 1 ? 's' : ''} publié{total > 1 ? 's' : ''}
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <BlogGrid posts={posts} />
            <Pagination currentPage={1} totalPages={totalPages} basePath="/blog" />
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
