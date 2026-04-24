import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import ScrapingBreadcrumb from '@/components/scraping/ScrapingBreadcrumb';
import ScrapingFaq from '@/components/scraping/ScrapingFaq';
import LocationGrid from '@/components/scraping/LocationGrid';
import { jsonLdString } from '@/lib/schema';
import {
  getAllScrapingLevelSlugs,
  getDepartmentsForRegion,
  getScrapingFaqs,
} from '@/lib/scraping';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    service: string;
    category: string;
    activity: string;
    region: string;
  }>;
}

// Cap at 500 for depth-5: 3 services × 111 activities × 13 regions ≈ 4329.
// We slice to 500 at build; remaining combinations are ISR on-demand via
// dynamicParams = true.
export async function generateStaticParams() {
  const all = await getAllScrapingLevelSlugs(5);
  return all.slice(0, 500).map((s) => ({
    service: s.service,
    category: s.category as string,
    activity: s.activity as string,
    region: s.region as string,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const {
    service: serviceSlug,
    category: categorySlug,
    activity: activitySlug,
    region: regionSlug,
  } = await params;
  const data = await getDepartmentsForRegion(
    serviceSlug,
    categorySlug,
    activitySlug,
    regionSlug
  );
  if (!data) {
    return { title: 'Page introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const { service, activity, region } = data;
  const title =
    activity.meta_title_template?.replace('{location}', region.name) ||
    `${service.name} ${activity.name} ${region.name} | Uclic`;
  const description =
    activity.meta_description_template
      ?.replace('{location}', region.name)
      .replace('{count}', '500') ||
    `${service.name} ${activity.name.toLowerCase()} en ${region.name} : base qualifiée, RGPD, branchée sur vos séquences outbound. Audit gratuit en 48 h.`;
  const canonical = `/scraping/${service.slug}/${categorySlug}/${activity.slug}/${region.slug}`;
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

export default async function RegionPage({ params }: PageProps) {
  const {
    service: serviceSlug,
    category: categorySlug,
    activity: activitySlug,
    region: regionSlug,
  } = await params;
  const data = await getDepartmentsForRegion(
    serviceSlug,
    categorySlug,
    activitySlug,
    regionSlug
  );
  if (!data) {notFound();}
  const { service, category, activity, region, departments } = data;

  const faqs = await getScrapingFaqs({
    serviceId: service.id,
    activityId: activity.id,
    regionId: region.id,
    variables: {
      activity: activity.name,
      location: region.name,
      location_full: region.name,
      region: region.name,
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
      {
        '@type': 'ListItem',
        position: 5,
        name: activity.name,
        item: `${SITE_URL}/scraping/${service.slug}/${category.slug}/${activity.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: region.name,
        item: `${SITE_URL}/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} ${activity.name} ${region.name}`,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    areaServed: { '@type': 'AdministrativeArea', name: region.name, addressCountry: 'FR' },
    description: activity.description || service.description || undefined,
    url: `${SITE_URL}/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}`,
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
                { label: category.name, href: `/scraping/${service.slug}/${category.slug}` },
                {
                  label: activity.name,
                  href: `/scraping/${service.slug}/${category.slug}/${activity.slug}`,
                },
                { label: region.name },
              ]}
            />
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>
                {service.name} — {activity.name}
              </span>
            </div>
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
              {service.name} {activity.name} {region.name}
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
              {`${service.name} pour ${activity.name.toLowerCase()} en ${region.name} : sélectionnez votre département pour affiner.`}
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
              Départements en {region.name}
            </h2>
            <p className="text-[color:var(--ink-muted)] mb-10">
              {departments.length > 0
                ? `${departments.length} département${departments.length > 1 ? 's' : ''} couvert${departments.length > 1 ? 's' : ''} en ${region.name}.`
                : `Aucun département publié pour cette activité en ${region.name}.`}
            </p>
            <LocationGrid
              items={departments.map((d) => ({
                id: d.id,
                name: d.name,
                slug: d.slug,
                code: d.code,
              }))}
              buildHref={(d) =>
                `/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}/${d.slug}`
              }
              emptyLabel={`Aucun département publié pour le moment en ${region.name}.`}
              labelPrefix="Département"
            />
          </div>
        </section>

        <ScrapingFaq items={faqs} />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
