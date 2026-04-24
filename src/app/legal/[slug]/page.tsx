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
  if (!page) return { title: 'Document introuvable', robots: { index: false, follow: false } };
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
  if (!page) notFound();

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
      <main id="main" className="relative">
        <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="max-w-[860px] mx-auto px-5 lg:px-8 relative">
            <a
              href="/legal"
              className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              ← Informations légales
            </a>
            <h1 className="mt-4 text-[36px] md:text-[44px] leading-[1.1] font-medium text-[color:var(--ink)] tracking-tight">
              {page.title}
            </h1>
            <p className="mt-4 text-[13px] text-[color:var(--ink-muted)]/80">
              Dernière mise à jour :{' '}
              {new Date(page.updated_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <article
              className="mt-10 blog-content"
              dangerouslySetInnerHTML={{ __html: page.content_html }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
