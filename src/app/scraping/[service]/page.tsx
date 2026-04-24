import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ service: string }>;
}

interface ScrapingService {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  meta_title_template: string | null;
  meta_description_template: string | null;
  seo_content: string | null;
  seo_short_description: string | null;
  use_cases: string[] | null;
  benefits: string[] | null;
}

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

async function getServiceData(serviceSlug: string): Promise<{ service: ScrapingService; categories: CategoryRow[] } | null> {
  const supa = createAdminClient();

  const { data: service } = await supa
    .from('scraping_services')
    .select('*')
    .eq('slug', serviceSlug)
    .single();

  if (!service) return null;

  const { data: publishedActivityRows } = await supa
    .from('seo_pages_queue')
    .select('activity_id')
    .eq('service_id', service.id)
    .eq('is_published', true);

  const activityIds = (publishedActivityRows || [])
    .map((p) => p.activity_id)
    .filter(Boolean) as string[];

  let categories: CategoryRow[] = [];
  if (activityIds.length > 0) {
    const { data: activityRows } = await supa
      .from('activities')
      .select('category_id')
      .in('id', activityIds);

    const categoryIds = [
      ...new Set((activityRows || []).map((a) => a.category_id).filter(Boolean)),
    ] as string[];

    if (categoryIds.length > 0) {
      const { data: catRows } = await supa
        .from('activity_categories')
        .select('id, name, slug, description, icon')
        .in('id', categoryIds)
        .order('name');
      categories = (catRows || []) as CategoryRow[];
    }
  }

  return { service: service as ScrapingService, categories };
}

export async function generateStaticParams() {
  const supa = createAdminClient();
  const { data } = await supa.from('scraping_services').select('slug');
  return (data || []).map((r) => ({ service: r.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const data = await getServiceData(slug);
  if (!data) {
    return { title: 'Service introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const { service } = data;
  const title = `${service.name} | Uclic — Constitution de bases B2B`;
  const description =
    service.seo_short_description ||
    service.description ||
    `${service.name} : bases de données B2B qualifiées, conformes RGPD. Devis 24h.`;
  const canonical = `/scraping/${service.slug}`;
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
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: service.name }],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function ScrapingServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const data = await getServiceData(slug);
  if (!data) notFound();
  const { service, categories } = data;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Scraping', item: `${SITE_URL}/scraping` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/scraping/${service.slug}` },
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
              href="/scraping"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Tous les services
            </a>
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Scraping B2B
            </span>
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight">
              {service.name}
            </h1>
            {service.description ? (
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
                {service.description}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-5 h-10 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
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
                className="inline-flex items-center gap-2 px-5 h-10 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>

        {service.benefits && service.benefits.length > 0 ? (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <h2 className="text-[28px] lg:text-[36px] font-semibold text-[color:var(--ink)] mb-8">
                Pourquoi choisir ce service
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-xl border border-[color:var(--border-subtle)]"
                  >
                    <Check size={18} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[color:var(--ink)] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {categories.length > 0 ? (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <h2 className="text-[28px] lg:text-[36px] font-semibold text-[color:var(--ink)] mb-3">
                Catégories disponibles
              </h2>
              <p className="text-[color:var(--ink-muted)] mb-10">
                {categories.length} secteur{categories.length > 1 ? 's' : ''} d&apos;activité couvert
                {categories.length > 1 ? 's' : ''} en {service.name.toLowerCase()}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((c) => (
                  <a
                    key={c.id}
                    href={`/scraping/${service.slug}/${c.slug}`}
                    className="group flex flex-col p-6 rounded-xl border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <h3 className="text-[18px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                      {c.name}
                    </h3>
                    {c.description ? (
                      <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {c.description}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Voir la catégorie{' '}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {service.seo_content ? (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[800px] mx-auto px-5 lg:px-10">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-[color:var(--ink)] prose-headings:font-semibold
                  prose-p:text-[color:var(--ink)] prose-p:leading-relaxed
                  prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[color:var(--ink)]
                  prose-li:text-[color:var(--ink)]"
                dangerouslySetInnerHTML={{ __html: service.seo_content }}
              />
            </div>
          </section>
        ) : null}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
