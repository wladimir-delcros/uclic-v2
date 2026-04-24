import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cats = await getAllBlogCategories();
  return cats.filter((c) => (c.count || 0) > 0).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getBlogCategoryBySlug(slug);
  if (!cat) {return { title: 'Catégorie introuvable', robots: { index: false, follow: false } };}
  const title = `${cat.name} — Blog Growth Marketing`;
  const description =
    cat.description ||
    `Articles de blog Uclic dans la catégorie ${cat.name}. Growth Marketing, Sales Ops, IA.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/categorie/${cat.slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/blog/categorie/${cat.slug}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: cat.name }],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = await getBlogCategoryBySlug(slug);
  if (!cat) {notFound();}
  const { posts, total, totalPages } = await getPostsByCategory(slug, 1, PER_PAGE);

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
              href="/blog"
              className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              ← Tous les articles
            </a>
            <div className="mt-4 max-w-[800px]">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Catégorie</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
                {cat.name}
              </h1>
              {cat.description ? (
                <p className="mt-6 text-[17px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                  {cat.description}
                </p>
              ) : null}
              <p className="mt-4 text-[13px] text-[color:var(--ink-muted)]/80">
                {total} article{total > 1 ? 's' : ''} dans cette catégorie
              </p>
            </div>
          </div>
        </section>
        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <BlogGrid posts={posts} />
            <Pagination
              currentPage={1}
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
