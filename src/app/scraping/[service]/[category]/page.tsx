import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import ScrapingBreadcrumb from '@/components/scraping/ScrapingBreadcrumb';
import ScrapingFaq from '@/components/scraping/ScrapingFaq';
import { jsonLdString } from '@/lib/schema';
import {
  getActivitiesByCategory,
  getAllScrapingLevelSlugs,
  getScrapingFaqs,
} from '@/lib/scraping';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ service: string; category: string }>;
}

// Cap at 500 to avoid large build times on programmatic SEO depth-3.
// Combinations are generated as every service × every category (level 3).
export async function generateStaticParams() {
  const all = await getAllScrapingLevelSlugs(3);
  return all.slice(0, 500).map((s) => ({
    service: s.service,
    category: s.category as string,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, category: categorySlug } = await params;
  const data = await getActivitiesByCategory(serviceSlug, categorySlug);
  if (!data) {
    return { title: 'Page introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const { service, category } = data;
  const title = `${service.name} ${category.name} — Base B2B RGPD`;
  const description =
    `${service.name} pour le secteur ${category.name.toLowerCase()} : activités qualifiées, conformes RGPD, prêtes pour vos séquences outbound. Audit gratuit en 48 h.`;
  const canonical = `/scraping/${service.slug}/${category.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { service: serviceSlug, category: categorySlug } = await params;
  const data = await getActivitiesByCategory(serviceSlug, categorySlug);
  if (!data) {notFound();}
  const { service, category, activities } = data;

  const faqs = await getScrapingFaqs({
    serviceId: service.id,
    variables: {
      activity: category.name,
      location: 'France',
      location_full: 'France',
      region: 'France',
      department_code: '',
      service: service.name,
      category: category.name,
    },
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Scraping', item: `${SITE_URL}/scraping` },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `${SITE_URL}/scraping/${service.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: category.name,
        item: `${SITE_URL}/scraping/${service.slug}/${category.slug}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} ${category.name}`,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'France' },
    description: category.description || service.description || undefined,
    url: `${SITE_URL}/scraping/${service.slug}/${category.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema) }}
      />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <ScrapingBreadcrumb
              items={[
                { label: 'Scraping', href: '/scraping' },
                { label: service.name, href: `/scraping/${service.slug}` },
                { label: category.name },
              ]}
            />
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>{service.name}</span>
            </div>
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
              {service.name} {category.name}
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
              {category.description ||
                `Toutes les activités du secteur ${category.name.toLowerCase()} disponibles en ${service.name.toLowerCase()}. Sélectionnez une activité pour affiner par région.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Mon audit gratuit — 48 h
                <ArrowRight size={14} className="text-black light:text-white" />
              </a>
              <a
                href="/simulation"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Simuler mon ROI
              </a>
            </div>
          </div>
        </section>

        <section className="relative py-16 lg:py-20">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-[color:var(--ink)] mb-3">
              Activités disponibles
            </h2>
            <p className="text-[color:var(--ink-muted)] mb-10">
              {activities.length > 0
                ? `${activities.length} activité${activities.length > 1 ? 's' : ''} professionnelle${activities.length > 1 ? 's' : ''} dans ${category.name.toLowerCase()}.`
                : `Aucune activité publiée pour le moment dans ${category.name.toLowerCase()}.`}
            </p>
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activities.map((a) => (
                  <a
                    key={a.id}
                    href={`/scraping/${service.slug}/${category.slug}/${a.slug}`}
                    className="group flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 hover:border-[color:var(--accent)]/50 transition-colors"
                  >
                    <h3 className="text-[18px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                      {service.name} {a.name}
                    </h3>
                    {a.description ? (
                      <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {a.description}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Voir les régions{' '}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <ScrapingFaq items={faqs} />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
