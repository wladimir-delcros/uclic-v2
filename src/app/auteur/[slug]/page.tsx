import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import { getAuthorBySlug } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostsByAuthorId(authorId: number, limit = 24): Promise<Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'date' | 'featured_image_url' | 'category'>[]> {
  const supa = createAdminClient();
  const { data } = await supa
    .from('blog_posts')
    .select('slug, title, excerpt, published_at, featured_image_url, categories')
    .eq('author_id', authorId)
    .eq('status', 'publish')
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);
  return (data || []).map((r) => ({
    slug: r.slug as string,
    title: r.title as string,
    excerpt: (r.excerpt as string) || '',
    date: (r.published_at as string) || '',
    featured_image_url: (r.featured_image_url as string) || '',
    category: (r.categories as string[] | null)?.[0] || '',
  }));
}

export async function generateStaticParams() {
  const supa = createAdminClient();
  const { data } = await supa.from('authors').select('slug');
  return (data || [])
    .filter((r) => r.slug)
    .map((r) => ({ slug: r.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    return { title: 'Auteur introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const title = `${author.name} — Auteur | Blog Uclic`;
  const description = author.bio || `Articles rédigés par ${author.name} sur le blog Uclic.`;
  const canonical = `/auteur/${author.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}${canonical}`,
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

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const posts = await getPostsByAuthorId(author.id, 24);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: `${SITE_URL}/auteur/${author.slug}`,
    image: author.avatar_url || undefined,
    description: author.bio || undefined,
    sameAs: [author.linkedin, author.twitter].filter(Boolean),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: author.name, item: `${SITE_URL}/auteur/${author.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }} />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1000px] mx-auto px-5 lg:px-10">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Retour au blog
            </a>
            <div className="flex flex-col md:flex-row items-start gap-8">
              {author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={author.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border border-[color:var(--border-subtle)]"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--border-subtle)]/40 border border-[color:var(--border-subtle)]" />
              )}
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Auteur
                </span>
                <h1 className="text-[36px] md:text-[48px] leading-[1.1] font-medium text-[color:var(--ink)] tracking-tight">
                  {author.name}
                </h1>
                {author.bio ? (
                  <p className="mt-4 text-[16px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                    {author.bio}
                  </p>
                ) : null}
                {(author.linkedin || author.twitter) && (
                  <div className="mt-5 flex items-center gap-3">
                    {author.linkedin ? (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${author.name}`}
                        className="w-9 h-9 rounded-full grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors"
                      >
                        <LinkedinIcon />
                      </a>
                    ) : null}
                    {author.twitter ? (
                      <a
                        href={author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`X/Twitter de ${author.name}`}
                        className="w-9 h-9 rounded-full grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors"
                      >
                        <TwitterIcon />
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <h2 className="text-[24px] lg:text-[28px] font-semibold text-[color:var(--ink)] mb-8">
              {posts.length} article{posts.length > 1 ? 's' : ''} publié{posts.length > 1 ? 's' : ''}
            </h2>
            {posts.length === 0 ? (
              <p className="text-[color:var(--ink-muted)]">Aucun article publié pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((p) => (
                  <a
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col bg-[color:var(--bg)] border border-[color:var(--border-subtle)] rounded-xl overflow-hidden hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    {p.featured_image_url ? (
                      <div className="aspect-[16/9] overflow-hidden bg-[color:var(--border-subtle)]">
                        <img
                          src={p.featured_image_url}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-[color:var(--accent)]/10 to-[color:var(--border-subtle)]/30" />
                    )}
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      {p.category ? (
                        <span className="inline-flex self-start text-[11px] tracking-[0.2em] uppercase text-[color:var(--accent)]">
                          {p.category}
                        </span>
                      ) : null}
                      <h3 className="text-[18px] leading-tight font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-2">
                          {p.excerpt}
                        </p>
                      ) : null}
                      <div className="mt-auto pt-4 flex items-center justify-between text-[12px] text-[color:var(--ink-muted)]">
                        <span>{p.date ? formatDate(p.date) : ''}</span>
                        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                          Lire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
