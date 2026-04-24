import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
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
  getRegionsForActivity,
  getScrapingFaqs,
} from '@/lib/scraping';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ service: string; category: string; activity: string }>;
}

// Cap at 500 for depth-4 programmatic SEO: 3 services × 111 activities ≈ 333,
// well under the cap. Cap applied to protect future data growth.
export async function generateStaticParams() {
  const all = await getAllScrapingLevelSlugs(4);
  return all.slice(0, 500).map((s) => ({
    service: s.service,
    category: s.category as string,
    activity: s.activity as string,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, category: categorySlug, activity: activitySlug } = await params;
  const data = await getRegionsForActivity(serviceSlug, categorySlug, activitySlug);
  if (!data) {
    return { title: 'Page introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const { service, activity } = data;
  const title =
    activity.meta_title_template?.replace('{location}', 'France') ||
    `${service.name} ${activity.name} France | Toutes les régions`;
  const description =
    activity.meta_description_template?.replace('{location}', 'France').replace('{count}', '2000') ||
    `${service.name} ${activity.name.toLowerCase()} partout en France : base qualifiée, RGPD. Devis sous 24h.`;
  const canonical = `/scraping/${service.slug}/${categorySlug}/${activity.slug}`;
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

export default async function ActivityPage({ params }: PageProps) {
  const { service: serviceSlug, category: categorySlug, activity: activitySlug } = await params;
  const data = await getRegionsForActivity(serviceSlug, categorySlug, activitySlug);
  if (!data) {notFound();}
  const { service, category, activity, regions } = data;

  const faqs = await getScrapingFaqs({
    serviceId: service.id,
    activityId: activity.id,
    variables: {
      activity: activity.name,
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
      {
        '@type': 'ListItem',
        position: 5,
        name: activity.name,
        item: `${SITE_URL}/scraping/${service.slug}/${category.slug}/${activity.slug}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} ${activity.name}`,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'France' },
    description: activity.description || service.description || undefined,
    url: `${SITE_URL}/scraping/${service.slug}/${category.slug}/${activity.slug}`,
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
                { label: activity.name },
              ]}
            />
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>
                {service.name} — {category.name}
              </span>
            </div>
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
              {service.name} {activity.name}
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
              {activity.description ||
                `${service.name} pour ${activity.name.toLowerCase()} en France : sélectionnez votre région pour accéder à la base localisée.`}
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
                Demander un devis
                <ArrowRight size={14} className="text-black light:text-white" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>

        {activity.benefits && activity.benefits.length > 0 ? (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <h2 className="text-[28px] lg:text-[36px] font-semibold text-[color:var(--ink)] mb-8">
                Pourquoi choisir cette base
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activity.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6"
                  >
                    <Check size={18} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[color:var(--ink)] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="relative py-16 lg:py-20">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-[color:var(--ink)] mb-3">
              {service.name} {activity.name} par région
            </h2>
            <p className="text-[color:var(--ink-muted)] mb-10">
              Sélectionnez votre région pour accéder à la base {activity.name.toLowerCase()} localisée.
            </p>
            <LocationGrid
              items={regions.map((r) => ({ id: r.id, name: r.name, slug: r.slug, code: r.code }))}
              buildHref={(r) =>
                `/scraping/${service.slug}/${category.slug}/${activity.slug}/${r.slug}`
              }
              emptyLabel="Aucune région publiée pour le moment."
              labelPrefix="Région"
            />
          </div>
        </section>

        {activity.seo_content ? (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[800px] mx-auto px-5 lg:px-10">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: activity.seo_content }}
              />
            </div>
          </section>
        ) : null}

        <ScrapingFaq items={faqs} />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
