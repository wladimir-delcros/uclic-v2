import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogGrid from '@/components/blog/BlogGrid';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import { getAllBlogAuthors, getPostsByAuthor } from '@/lib/blog';

const SITE_URL = 'https://uclic.fr';
const PER_PAGE = 24;

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAllBlogAuthors();
  return authors.filter((a) => (a.count || 0) > 0).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { author } = await getPostsByAuthor(slug, 1, 1);
  if (!author) {return { title: 'Auteur introuvable', robots: { index: false, follow: false } };}
  const title = `${author.name} — Articles sur le blog`;
  const description =
    author.bio ||
    `Retrouvez tous les articles de ${author.name} sur le blog Uclic : Growth Marketing, Sales Ops, IA.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/auteur/${author.slug}` },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}/blog/auteur/${author.slug}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: author.avatar_url
        ? [{ url: author.avatar_url, width: 400, height: 400, alt: author.name }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: author.name }],
    },
    twitter: { card: 'summary', title, description, site: '@uclic_fr' },
  };
}

export default async function BlogAuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const { author, posts, total, totalPages } = await getPostsByAuthor(slug, 1, PER_PAGE);
  if (!author) {notFound();}

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: author.name,
        item: `${SITE_URL}/blog/auteur/${author.slug}`,
      },
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: `${SITE_URL}/blog/auteur/${author.slug}`,
    image: author.avatar_url || undefined,
    description: author.bio || undefined,
    sameAs: [author.linkedin, author.twitter].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(personSchema) }}
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
            <div className="mt-6 flex flex-col md:flex-row items-start gap-6 md:gap-8 max-w-[900px]">
              {author.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={author.avatar_url}
                  alt={author.name}
                  width={112}
                  height={112}
                  className="w-[112px] h-[112px] rounded-full object-cover border border-[color:var(--border-subtle)] shrink-0"
                  loading="eager"
                  decoding="async"
                />
              ) : null}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
                  <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                  <span>Auteur</span>
                </div>
                <h1 className="text-[36px] md:text-[48px] leading-[1.1] font-medium text-[color:var(--ink)] tracking-tight">
                  {author.name}
                </h1>
                {author.bio ? (
                  <p className="mt-4 text-[16px] leading-relaxed text-[color:var(--ink-muted)]">
                    {author.bio}
                  </p>
                ) : null}
                <p className="mt-3 text-[13px] text-[color:var(--ink-muted)]/80">
                  {total} article{total > 1 ? 's' : ''} publié{total > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <BlogGrid posts={posts} />
            <Pagination
              currentPage={1}
              totalPages={totalPages}
              basePath={`/blog/auteur/${author.slug}`}
            />
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
