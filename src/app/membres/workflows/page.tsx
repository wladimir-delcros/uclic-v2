import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import WorkflowsClient from '@/components/membres/workflows/WorkflowsClient';
import { getWorkflows } from '@/lib/workflows';
import { jsonLdString, ORG_ID } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';
const ROUTE = '/membres/workflows';

type SearchParams = {
  q?: string;
  tag?: string;
  cat?: string;
  sort?: 'new' | 'popular';
  page?: string;
};

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  // Touch searchParams to keep Next 15 happy even though we don't use them here.
  await searchParams;
  const title = "Workflows n8n | Banque d'automations prêtes à l'emploi | Uclic";
  const description =
    "Explorez et téléchargez des workflows n8n prêts à l'emploi. Automatisations Growth, intégrations et templates pour industrialiser vos process sans dev.";
  return {
    title,
    description,
    keywords:
      'workflows n8n, automatisation n8n, templates n8n, growth automation, no-code, intégrations, agents ia, uclic',
    alternates: { canonical: ROUTE },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${ROUTE}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Uclic — Workflows n8n',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@uclic_fr',
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function WorkflowsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page || '1') || 1;
  const { workflows, totalPages } = await getWorkflows({
    query: sp.q || '',
    tag: sp.tag,
    category: sp.cat,
    sort: (sp.sort as 'new' | 'popular') || 'new',
    page,
    perPage: 12,
  });

  const tagSet = new Set<string>();
  workflows.forEach((w) => (w.tags || []).forEach((t) => t && tagSet.add(t)));
  const allTags = Array.from(tagSet).slice(0, 24);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Membres', item: `${SITE_URL}/membres` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Workflows n8n',
        item: `${SITE_URL}${ROUTE}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Workflows n8n — Banque d'automations Uclic",
    description:
      "Catalogue de workflows n8n prêts à l'emploi pour les membres Uclic. Automatisations Growth, intégrations, templates.",
    url: `${SITE_URL}${ROUTE}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Uclic',
      url: SITE_URL,
    },
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: workflows.slice(0, 10).map((w, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/membres/workflows/${w.slug}`,
        name: w.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(collectionSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        <WorkflowsClient
          workflows={workflows}
          totalPages={totalPages}
          currentPage={page}
          activeTag={sp.tag}
          activeCategory={sp.cat}
          activeSort={(sp.sort as 'new' | 'popular') || 'new'}
          query={sp.q || ''}
          tags={allTags}
        />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
