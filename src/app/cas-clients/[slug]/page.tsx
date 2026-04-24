import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import {
  getAllCasClientSlugs,
  getAllCasClients,
  getCasClientBySlug,
} from '@/lib/portfolio';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCasClientSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cas = await getCasClientBySlug(slug);
  if (!cas) {
    return {
      title: 'Cas client introuvable | Uclic',
      robots: { index: false, follow: false },
    };
  }
  const title = `${cas.title} | Cas client Uclic`;
  const description = cas.excerpt || `Cas client : ${cas.title}.`;
  const canonical = `/cas-clients/${cas.slug}`;
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
      images: cas.featured_image_url
        ? [{ url: cas.featured_image_url, width: 1200, height: 630, alt: cas.title }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: cas.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@uclic_fr',
    },
  };
}

export default async function CasClientDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cas = await getCasClientBySlug(slug);
  if (!cas) notFound();

  const all = await getAllCasClients();
  const currentIdx = all.findIndex((c) => c.slug === cas.slug);
  const next = currentIdx >= 0 && all.length > 1 ? all[(currentIdx + 1) % all.length] : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Cas clients', item: `${SITE_URL}/cas-clients` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cas.title,
        item: `${SITE_URL}/cas-clients/${cas.slug}`,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cas.title,
    description: cas.excerpt || undefined,
    image: cas.featured_image_url || undefined,
    author: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    datePublished: cas.created_at || undefined,
    dateModified: cas.updated_at || undefined,
    mainEntityOfPage: `${SITE_URL}/cas-clients/${cas.slug}`,
  };

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
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-12 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <a
              href="/cas-clients"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Tous les cas clients
            </a>

            <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Cas client
            </div>

            <h1 className="mt-4 text-[clamp(32px,4.4vw,52px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
              {cas.title}
            </h1>

            {cas.excerpt && (
              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[720px] text-[16px] leading-relaxed">
                {cas.excerpt}
              </p>
            )}

            {cas.featured_image_url && (
              <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden border border-[color:var(--border-subtle)] rounded-xl">
                <img
                  src={cas.featured_image_url}
                  alt={cas.title}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        <section className="relative py-12 lg:py-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 min-w-0">
              <div
                className="article-body max-w-none"
                dangerouslySetInnerHTML={{ __html: cas.content_html }}
              />
            </div>

            <aside className="lg:col-span-1 article-sidebar-sticky">
              <div className="flex flex-col gap-6">
                <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg)] p-6">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                    Vous vivez le même enjeu ?
                  </div>
                  <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                    Démarrons par un audit offert de votre acquisition actuelle.
                  </p>
                  <a
                    href="/audit"
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[color:var(--accent)] hover:gap-2.5 transition-all"
                  >
                    Faire auditer mon acquisition
                    <ArrowRight size={14} />
                  </a>
                </div>

                {next && next.slug !== cas.slug && (
                  <a
                    href={`/cas-clients/${next.slug}`}
                    className="group rounded-xl border border-[color:var(--border-subtle)] p-6 transition-colors hover:border-[color:var(--accent)]/60"
                  >
                    <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-muted)]">
                      Cas suivant
                    </div>
                    <div className="mt-2 text-[16px] font-medium leading-snug">
                      {next.title}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all">
                      Lire
                      <ArrowRight size={13} />
                    </span>
                  </a>
                )}
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
