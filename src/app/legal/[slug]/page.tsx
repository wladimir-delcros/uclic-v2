import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { getAllLegalPageSlugs, getLegalPageBySlug } from '@/lib/legal';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Catch-all for legal_pages rows whose slug does NOT collide with the hardcoded
 * /legal/{mentions-legales, cgv, rgpd, cookies, politique-de-confidentialite}
 * routes. Next.js prioritises exact segments over dynamic ones, so this only
 * kicks in for CMS-added legal docs (e.g. DPA, cookie-list-specific pages).
 */
export async function generateStaticParams() {
  const hardcoded = new Set([
    'mentions-legales',
    'conditions-generales-de-vente',
    'rgpd',
    'cookies',
    'politique-de-confidentialite',
  ]);
  const slugs = await getAllLegalPageSlugs();
  return slugs.filter((s) => !hardcoded.has(s)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);
  if (!page) {return { title: 'Document introuvable', robots: { index: false, follow: false } };}
  const title = page.title;
  const description = `${page.title} — Uclic.`;
  return {
    title,
    description,
    alternates: { canonical: `/legal/${page.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/legal/${page.slug}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
    },
  };
}

export default async function LegalDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);
  if (!page) {notFound();}

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Légal', item: `${SITE_URL}/legal` },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `${SITE_URL}/legal/${page.slug}`,
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
      <main id="main" className="relative bg-[color:var(--bg)] text-[color:var(--ink)]">
        <section className="relative pt-24 pb-10 lg:pt-28 lg:pb-14 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="max-w-[860px] mx-auto px-5 lg:px-10 relative">
            {/* Breadcrumb */}
            <nav
              aria-label="Fil d'Ariane"
              className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)] mb-10"
            >
              <a href="/" className="hover:text-[color:var(--accent)] transition-colors">
                Accueil
              </a>
              <span aria-hidden="true">/</span>
              <a href="/legal" className="hover:text-[color:var(--accent)] transition-colors">
                Légal
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-[color:var(--ink)] line-clamp-1">{page.title}</span>
            </nav>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Informations légales
            </div>

            {/* H1 DA canon — italic accent fragment on the last word */}
            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              {(() => {
                const words = page.title.trim().split(/\s+/);
                if (words.length <= 1) {
                  return (
                    <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                      {page.title}
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

            <p className="mt-5 text-[13px] text-[color:var(--ink-muted)] font-mono uppercase tracking-[0.18em]">
              Dernière mise à jour —{' '}
              {new Date(page.updated_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-[860px] mx-auto px-5 lg:px-10">
            <article
              className="article-body blog-content"
              dangerouslySetInnerHTML={{ __html: page.content_html }}
            />

            <div className="mt-16 pt-8 border-t border-[color:var(--border-subtle)]">
              <a
                href="/legal"
                className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
              >
                ← Retour aux documents légaux
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
