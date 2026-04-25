import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, Target, Database, Workflow, ShieldCheck, Zap, Search, MapPin } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import CornerCross from '@/components/ui/CornerCross';
import ScrapingBreadcrumb from '@/components/scraping/ScrapingBreadcrumb';
import ScrapingFaq from '@/components/scraping/ScrapingFaq';
import { jsonLdString } from '@/lib/schema';
import {
  getAllScrapingLevelSlugs,
  getDepartmentByPath,
  getDepartmentsForRegion,
  getRelatedActivitiesForDepartment,
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
    department: string;
  }>;
}

// Cap at 500 for depth-6. Full matrix is 3 services × 111 activities ×
// 36 departments ≈ 12 000; we prebuild 500 and let ISR handle the rest via
// dynamicParams = true with a 1h revalidate window.
export async function generateStaticParams() {
  const all = await getAllScrapingLevelSlugs(6);
  return all.slice(0, 500).map((s) => ({
    service: s.service,
    category: s.category as string,
    activity: s.activity as string,
    region: s.region as string,
    department: s.department as string,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const {
    service: serviceSlug,
    category: categorySlug,
    activity: activitySlug,
    region: regionSlug,
    department: departmentSlug,
  } = await params;
  const data = await getDepartmentByPath(
    serviceSlug,
    categorySlug,
    activitySlug,
    regionSlug,
    departmentSlug
  );
  if (!data) {
    return { title: 'Page introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const { service, activity, department, seoContent } = data;
  const title =
    activity.meta_title_template?.replace('{location}', department.name) ||
    `${service.name} ${activity.name} ${department.name} | Uclic`;
  const description =
    seoContent?.seo_short_description ||
    activity.meta_description_template
      ?.replace('{location}', department.name)
      .replace('{count}', '500') ||
    `${service.name} ${activity.name.toLowerCase()} ${department.name} : base qualifiée, RGPD, branchée sur vos séquences outbound. Audit gratuit en 48 h.`;
  const canonical = `/scraping/${service.slug}/${categorySlug}/${activity.slug}/${regionSlug}/${department.slug}`;
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

export default async function DepartmentPage({ params }: PageProps) {
  const {
    service: serviceSlug,
    category: categorySlug,
    activity: activitySlug,
    region: regionSlug,
    department: departmentSlug,
  } = await params;
  const data = await getDepartmentByPath(
    serviceSlug,
    categorySlug,
    activitySlug,
    regionSlug,
    departmentSlug
  );
  if (!data) {notFound();}
  const { service, category, activity, region, department, seoContent } = data;

  const [faqs, regionDepartments, relatedActivities] = await Promise.all([
    getScrapingFaqs({
      serviceId: service.id,
      activityId: activity.id,
      regionId: region.id,
      departmentId: department.id,
      variables: {
        activity: activity.name,
        location: department.name,
        location_full: `${department.name} (${department.code})`,
        region: region.name,
        department_code: department.code,
        service: service.name,
        category: category.name,
      },
    }),
    getDepartmentsForRegion(serviceSlug, categorySlug, activitySlug, regionSlug),
    getRelatedActivitiesForDepartment(service.id, category.id, department.id, activity.id, 6),
  ]);

  const otherDepartments = (regionDepartments?.departments || []).filter(
    (d) => d.slug !== department.slug
  );

  const pageUrl = `${SITE_URL}/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}/${department.slug}`;

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
      { '@type': 'ListItem', position: 7, name: department.name, item: pageUrl },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} ${activity.name} ${department.name}`,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${department.name} (${department.code})`,
      containedInPlace: { '@type': 'AdministrativeArea', name: region.name },
      addressCountry: 'FR',
    },
    description:
      seoContent?.seo_short_description ||
      activity.description ||
      service.description ||
      undefined,
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      price: 'Sur devis',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
  };

  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer.replace(/<[^>]+>/g, ''),
          },
        })),
      }
    : null;

  const benefits = seoContent?.benefits || activity.benefits || [];
  const useCases = seoContent?.use_cases || activity.use_cases || [];
  const seoHtml = seoContent?.seo_content || activity.seo_content || null;

  // Default use-cases (when seo_content empty)
  const defaultUseCases = [
    {
      icon: Target,
      title: `Prospection ${department.name}`,
      desc: `Séquences cold email + LinkedIn ciblées sur les décideurs ${activity.name.toLowerCase()} du département ${department.name}.`,
    },
    {
      icon: Database,
      title: 'Enrichissement CRM local',
      desc: `Complétez vos comptes ${activity.name.toLowerCase()} ${department.name} : SIRET, effectif, dernier dirigeant, signaux d'achat.`,
    },
    {
      icon: Search,
      title: 'Market sizing local',
      desc: `Cartographiez le marché ${activity.name.toLowerCase()} en ${department.name} : volumétrie, concentration, opportunités blanches.`,
    },
    {
      icon: Workflow,
      title: 'Recrutement & sourcing',
      desc: `Identifiez talents et décideurs ${activity.name.toLowerCase()} en ${department.name} sur LinkedIn.`,
    },
    {
      icon: ShieldCheck,
      title: 'Veille concurrentielle',
      desc: `Surveillez les acteurs ${activity.name.toLowerCase()} du département ${department.code} : levées, recrutements, mouvements.`,
    },
    {
      icon: Zap,
      title: 'Lead gen automatisée',
      desc: `Branchez la base ${department.name} sur n8n / Make pour scoring + routage temps réel.`,
    },
  ];

  // Stats locales
  const stats = [
    { value: '95 %', label: "d'emails vérifiés" },
    { value: department.code, label: `département ${department.name}` },
    { value: '< 48 h', label: 'audit + extract' },
    { value: '100 %', label: 'RGPD' },
  ];

  const methodSteps = [
    {
      n: '01',
      title: 'Ciblage local',
      desc: `Atelier 30 min : profil ${activity.name.toLowerCase()} ${department.name}, taille, signaux, fonction décisionnaire.`,
    },
    {
      n: '02',
      title: 'Extraction multi-sources',
      desc: `${service.name}, registres officiels INSEE, données ouvertes, partenariats — 8 sources combinées.`,
    },
    {
      n: '03',
      title: 'Enrichissement IA',
      desc: 'Email pro, téléphone, LinkedIn, SIRET, signaux. IA + revue humaine pour 95 % de complétude.',
    },
    {
      n: '04',
      title: 'Vérification temps réel',
      desc: 'SMTP, MX, catch-all, bounce score. Zéro email à risque en sortie.',
    },
    {
      n: '05',
      title: 'Export & intégration',
      desc: 'CSV, API, push direct HubSpot, Lemlist, Apollo, Salesforce. MAJ mensuelle.',
    },
  ];

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
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
        />
      ) : null}
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        {/* Hero */}
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
                {
                  label: region.name,
                  href: `/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}`,
                },
                { label: department.name },
              ]}
            />
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>
                {service.name} — {department.code}
              </span>
            </div>
            <h1 className="font-display font-medium tracking-[-0.02em] text-[clamp(34px,4.6vw,56px)] leading-[1.05] text-[color:var(--ink)]">
              {service.name} {activity.name}{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {department.name}.
              </span>
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
              {seoContent?.seo_short_description ||
                activity.description ||
                `Base ${service.name.toLowerCase()} ${activity.name.toLowerCase()} dans le département ${department.name} (${department.code}), région ${region.name}. Données B2B qualifiées, conformes RGPD, prêtes pour vos séquences outbound.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Lancer mon scraping {department.name}
                <ArrowRight size={14} className="text-black light:text-white" />
              </Link>
              <Link
                href="/simulation"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Simuler mon ROI
              </Link>
            </div>

            {/* Stats locales bento */}
            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 border border-[color:var(--border-subtle)] !rounded-none relative">
              <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '0%', top: '0%', transform: 'translate(-50%, -50%)' }} />
              <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '100%', top: '0%', transform: 'translate(-50%, -50%)' }} />
              <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '0%', top: '100%', transform: 'translate(-50%, -50%)' }} />
              <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '100%', top: '100%', transform: 'translate(-50%, -50%)' }} />
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`p-6 lg:p-7 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white ${i < stats.length - 1 ? 'lg:border-r border-[color:var(--border-subtle)]' : ''} ${i % 2 === 0 ? 'border-r border-[color:var(--border-subtle)] lg:border-r' : ''} ${i < 2 ? 'border-b border-[color:var(--border-subtle)] lg:border-b-0' : ''}`}
                >
                  <div className="font-display font-medium text-[28px] lg:text-[32px] tracking-[-0.02em] text-[color:var(--accent)] tabular-nums">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[12.5px] text-[color:var(--ink-muted)] leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Méthode */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Méthode</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] max-w-[760px]">
              Du brief à la première séquence{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                en {department.name}.
              </span>
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border border-[color:var(--border-subtle)] !rounded-none">
              {methodSteps.map((step, i) => (
                <div
                  key={step.n}
                  className={`p-7 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white ${i < methodSteps.length - 1 ? 'lg:border-r border-[color:var(--border-subtle)]' : ''} ${i < methodSteps.length - 1 ? 'border-b lg:border-b-0 border-[color:var(--border-subtle)]' : ''}`}
                >
                  <div className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent)] mb-4">
                    {step.n}
                  </div>
                  <h3 className="font-display font-medium text-[18px] tracking-[-0.01em] text-[color:var(--ink)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[color:var(--ink-muted)]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bénéfices */}
        {benefits.length > 0 ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Bénéfices</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-8">
                Ce que contient cette base{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  {department.name}.
                </span>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--border-subtle)] !rounded-none">
                {benefits.map((b, i, arr) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white p-6 ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''} ${i < arr.length - (arr.length % 3 || 3) ? 'border-b' : ''} border-[color:var(--border-subtle)]`}
                  >
                    <Check size={18} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[color:var(--ink)] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Cas d'usage */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Cas d&apos;usage</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] max-w-[760px] mb-12">
              Comment activer la base{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {activity.name.toLowerCase()} {department.name}.
              </span>
            </h2>
            {useCases.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 border border-[color:var(--border-subtle)] !rounded-none">
                {useCases.map((u, i, arr) => (
                  <li
                    key={i}
                    className={`!rounded-none bg-[color:var(--card-elev-1)] light:bg-white p-7 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < arr.length - (arr.length % 2 || 2) ? 'border-b' : ''} border-[color:var(--border-subtle)]`}
                  >
                    <p className="text-[15px] text-[color:var(--ink)] leading-relaxed">{u}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--border-subtle)] !rounded-none">
                {defaultUseCases.map((u, i) => (
                  <div
                    key={u.title}
                    className={`p-7 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''} ${i < defaultUseCases.length - (defaultUseCases.length % 3 || 3) ? 'border-b' : ''} border-[color:var(--border-subtle)]`}
                  >
                    <div className="w-11 h-11 grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white text-[color:var(--ink-muted)] mb-5">
                      <u.icon size={20} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display font-medium text-[18px] tracking-[-0.01em] text-[color:var(--ink)] mb-2">
                      {u.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                      {u.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Données incluses */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Données incluses</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-12 max-w-[760px]">
              Chaque ligne livrée contient.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[color:var(--border-subtle)] !rounded-none">
              {[
                { label: 'Raison sociale', desc: 'Nom complet, forme juridique, SIRET' },
                { label: 'Décideur', desc: 'Nom, fonction, ancienneté du dirigeant' },
                { label: 'Email pro vérifié', desc: 'SMTP-checké, taux délivrabilité 95%' },
                { label: 'Téléphone direct', desc: 'Standard + mobile dirigeant si dispo' },
                { label: 'Adresse complète', desc: `Localisation ${department.name} (${department.code})` },
                { label: 'Site web + LinkedIn', desc: 'URL site, page entreprise LinkedIn' },
                { label: "Détails d'activité", desc: 'Code NAF, spécialités, tags métier' },
                { label: 'Effectif & CA', desc: 'Tranche effectif, CA dernier exercice' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className={`p-6 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white ${(i + 1) % 4 !== 0 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r' : ''} ${i < arr.length - 4 ? 'lg:border-b' : ''} ${i < arr.length - 2 ? 'border-b md:border-b' : ''} border-[color:var(--border-subtle)]`}
                >
                  <div className="font-display font-medium text-[15px] tracking-[-0.01em] text-[color:var(--ink)] mb-1.5">
                    {item.label}
                  </div>
                  <div className="text-[12.5px] text-[color:var(--ink-muted)] leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO content */}
        {seoHtml ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[800px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>À propos</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-8">
                Base {activity.name} {department.name}{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  en détail.
                </span>
              </h2>
              <div
                className="blog-content text-[16px] leading-relaxed text-[color:var(--ink-muted)]"
                dangerouslySetInnerHTML={{ __html: seoHtml }}
              />
            </div>
          </section>
        ) : null}

        {/* Related activities */}
        {relatedActivities.length > 0 ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Aussi en {department.name}</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-10 max-w-[760px]">
                Autres bases {category.name.toLowerCase()}{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  {department.name}.
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--border-subtle)] !rounded-none">
                {relatedActivities.map((ra, i, arr) => (
                  <Link
                    key={ra.id}
                    href={`/scraping/${service.slug}/${category.slug}/${ra.slug}/${region.slug}/${department.slug}`}
                    className={`group p-7 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white hover:bg-[color:var(--card-elev-2)] transition-colors ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''} ${i < arr.length - (arr.length % 3 || 3) ? 'border-b' : ''} border-[color:var(--border-subtle)]`}
                  >
                    <h3 className="font-display font-medium text-[18px] tracking-[-0.01em] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                      {service.name} {ra.name}
                    </h3>
                    {ra.description ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-2">
                        {ra.description}
                      </p>
                    ) : null}
                    <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Voir la base{' '}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Other departments in region */}
        {otherDepartments.length > 0 ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Autres départements {region.name}</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-10 max-w-[760px]">
                {service.name} {activity.name}{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  ailleurs en {region.name}.
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border border-[color:var(--border-subtle)] !rounded-none">
                {otherDepartments.slice(0, 12).map((d, i, arr) => (
                  <Link
                    key={d.id}
                    href={`/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}/${d.slug}`}
                    className={`group flex items-center gap-3 p-5 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white hover:bg-[color:var(--card-elev-2)] transition-colors ${(i + 1) % 4 !== 0 ? 'lg:border-r' : ''} ${(i + 1) % 3 !== 0 ? 'md:border-r lg:border-r' : ''} ${i % 2 === 0 ? 'border-r md:border-r' : ''} ${i < arr.slice(0, 12).length - 4 ? 'lg:border-b' : ''} ${i < arr.slice(0, 12).length - 3 ? 'md:border-b' : ''} ${i < arr.slice(0, 12).length - 2 ? 'border-b' : ''} border-[color:var(--border-subtle)]`}
                  >
                    <MapPin size={14} className="text-[color:var(--accent)] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[14px] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors truncate">
                        {d.name}
                      </div>
                      <div className="text-[11px] font-mono text-[color:var(--ink-muted)]">
                        {d.code}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href={`/scraping/${service.slug}/${category.slug}/${activity.slug}/${region.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                >
                  Voir toute la région {region.name}
                  <ArrowRight size={14} />
                </Link>
              </div>
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
