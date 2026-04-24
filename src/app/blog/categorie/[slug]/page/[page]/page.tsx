import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogGrid from '@/components/blog/BlogGrid';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import {
  getAllBlogCategories,
  getBlogCategoryBySlug,
  getPostsByCategory,
} from '@/lib/blog';

const SITE_URL = 'https://uclic.fr';
const PER_PAGE = 24;
const MAX_PRERENDER_PAGES_PER_CAT = 20;

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateStaticParams() {
  const cats = await getAllBlogCategories();
  const params: Array<{ slug: string; page: string }> = [];
  for (const cat of cats) {
    const count = cat.count || 0;
    if (count <= PER_PAGE) {continue;}
    const totalPages = Math.ceil(count / PER_PAGE);
    const capped = Math.min(totalPages, MAX_PRERENDER_PAGES_PER_CAT);
    // Pages 2..capped ; page 1 est servie par /blog/categorie/[slug]/page.tsx
    for (let p = 2; p <= capped; p++) {
      params.push({ slug: cat.slug, page: String(p) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const cat = await getBlogCategoryBySlug(slug);
  if (!cat || !Number.isInteger(page) || page < 2) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }
  const title = `${cat.name} — Blog · Page ${page}`;
  const description = `Page ${page} des articles ${cat.name} du blog Uclic.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/categorie/${cat.slug}/page/${page}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/blog/categorie/${cat.slug}/page/${page}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: cat.name }],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function BlogCategoryPaginatedPage({ params }: PageProps) {
  const { slug, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  if (!Number.isInteger(page) || page < 1) {notFound();}
  if (page === 1) {redirect(`/blog/categorie/${slug}`);}

  const cat = await getBlogCategoryBySlug(slug);
  if (!cat) {notFound();}
  const { posts, total, totalPages } = await getPostsByCategory(slug, page, PER_PAGE);
  if (page > totalPages) {notFound();}

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.name,
        item: `${SITE_URL}/blog/categorie/${cat.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `Page ${page}`,
        item: `${SITE_URL}/blog/categorie/${cat.slug}/page/${page}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <a
              href={`/blog/categorie/${cat.slug}`}
              className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              ← {cat.name}
            </a>
            <div className="mt-4 max-w-[800px]">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>{cat.name} · Page {page}</span>
              </div>
              <h1 className="text-[36px] md:text-[44px] leading-[1.1] font-medium text-[color:var(--ink)] tracking-tight">
                {cat.name}
              </h1>
              <p className="mt-4 text-[13px] text-[color:var(--ink-muted)]/80">
                Articles {((page - 1) * PER_PAGE) + 1}–{Math.min(page * PER_PAGE, total)} sur{' '}
                {total}.
              </p>
            </div>
          </div>
        </section>
        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <BlogGrid posts={posts} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`/blog/categorie/${cat.slug}`}
            />
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
