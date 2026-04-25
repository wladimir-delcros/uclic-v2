import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Target, Database, ShieldCheck, Workflow, Zap, Search } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import CornerCross from '@/components/ui/CornerCross';
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

  const useCases = [
    {
      icon: Target,
      title: 'Prospection sortante',
      desc: `Alimentez vos séquences cold email + LinkedIn avec des contacts ${category.name.toLowerCase()} au profil ICP, signaux d'achat à l'appui.`,
    },
    {
      icon: Database,
      title: 'Enrichissement CRM',
      desc: `Complétez HubSpot, Pipedrive ou Salesforce avec emails pro vérifiés, SIRET, taille et stack tech des entreprises ${category.name.toLowerCase()}.`,
    },
    {
      icon: Search,
      title: 'Market sizing',
      desc: `Mesurez votre TAM/SAM sur le secteur ${category.name.toLowerCase()} : volumétrie réelle, répartition géo, concentration concurrentielle.`,
    },
    {
      icon: Workflow,
      title: 'Recrutement & sourcing',
      desc: `Identifiez décideurs et opérationnels ${category.name.toLowerCase()} : nom, fonction, ancienneté, signaux de mobilité.`,
    },
    {
      icon: ShieldCheck,
      title: 'Veille concurrentielle',
      desc: `Suivez l'évolution du marché ${category.name.toLowerCase()} : nouvelles entreprises, levées de fonds, recrutements actifs, changements de stack.`,
    },
    {
      icon: Zap,
      title: 'Lead gen automatisée',
      desc: `Branchez la base sur vos workflows n8n / Make pour scorer, router, séquencer en temps réel — sans intervention manuelle.`,
    },
  ];

  const methodSteps = [
    {
      n: '01',
      title: 'Ciblage ICP',
      desc: `Atelier 30 min pour cadrer le profil idéal ${category.name.toLowerCase()} : taille, géo, signaux, stack, fonction décisionnaire.`,
    },
    {
      n: '02',
      title: 'Extraction multi-sources',
      desc: `${service.name}, registres officiels, données publiques, partenariats data — on combine 8 sources pour maximiser la couverture.`,
    },
    {
      n: '03',
      title: 'Enrichissement IA',
      desc: 'Email pro, téléphone direct, LinkedIn URL, SIRET, dernier post — IA + humain pour atteindre 95 % de complétude.',
    },
    {
      n: '04',
      title: 'Vérification temps réel',
      desc: 'Validation SMTP, MX, catch-all, bounce score. On supprime les emails à risque avant livraison.',
    },
    {
      n: '05',
      title: 'Export & intégration',
      desc: 'Livraison CSV / API / push direct HubSpot, Lemlist, Apollo, Salesforce. Mise à jour mensuelle incluse.',
    },
  ];

  const stats = [
    { value: '95 %', label: "d'emails vérifiés et délivrables" },
    { value: '< 48 h', label: 'pour audit + premier extract' },
    { value: '100 %', label: 'conforme RGPD & LCEN' },
    { value: 'x 2,4', label: 'ROI moyen séquences outbound' },
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
                { label: category.name },
              ]}
            />
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>{service.name}</span>
            </div>
            <h1 className="font-display font-medium tracking-[-0.02em] text-[clamp(34px,4.6vw,56px)] leading-[1.05] text-[color:var(--ink)]">
              {service.name} {category.name}{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                qualifié.
              </span>
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
              {category.description ||
                `Toutes les activités du secteur ${category.name.toLowerCase()} disponibles en ${service.name.toLowerCase()}. Données B2B vérifiées, conformes RGPD, prêtes à brancher sur vos séquences outbound.`}
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
                Mon audit gratuit — 48 h
                <ArrowRight size={14} className="text-black light:text-white" />
              </Link>
              <Link
                href="/simulation"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Simuler mon ROI
              </Link>
            </div>

            {/* Stats bento */}
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
              <span>Méthode Uclic</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] max-w-[760px]">
              5 étapes pour livrer une base{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {category.name.toLowerCase()}
              </span>{' '}
              prête à activer.
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

        {/* Use cases */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Cas d&apos;usage</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] max-w-[760px] mb-12">
              Six façons d&apos;activer votre base{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {category.name.toLowerCase()}.
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--border-subtle)] !rounded-none">
              {useCases.map((u, i) => (
                <div
                  key={u.title}
                  className={`p-7 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''} ${i < useCases.length - (useCases.length % 3 || 3) ? 'border-b' : ''} border-[color:var(--border-subtle)]`}
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
          </div>
        </section>

        {/* Activités disponibles */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Activités</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-3">
              Activités disponibles
            </h2>
            <p className="text-[color:var(--ink-muted)] mb-10 max-w-[640px]">
              {activities.length > 0
                ? `${activities.length} activité${activities.length > 1 ? 's' : ''} professionnelle${activities.length > 1 ? 's' : ''} dans ${category.name.toLowerCase()}, chacune déclinée par région et département.`
                : `Aucune activité publiée pour le moment dans ${category.name.toLowerCase()}.`}
            </p>
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[color:var(--border-subtle)] !rounded-none">
                {activities.map((a, i) => (
                  <Link
                    key={a.id}
                    href={`/scraping/${service.slug}/${category.slug}/${a.slug}`}
                    className={`group flex flex-col !rounded-none bg-[color:var(--card-elev-1)] light:bg-white p-7 hover:bg-[color:var(--card-elev-2)] transition-colors ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''} border-b border-[color:var(--border-subtle)]`}
                  >
                    <h3 className="font-display font-medium text-[18px] tracking-[-0.01em] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                      {service.name} {a.name}
                    </h3>
                    {a.description ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {a.description}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-5 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Voir les régions{' '}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Avantages V2 */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                  <span>Différence Uclic</span>
                </div>
                <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] text-[color:var(--ink)] mb-6">
                  IA + automatisation,{' '}
                  <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                    pas un fichier mort.
                  </span>
                </h2>
                <p className="text-[16px] leading-relaxed text-[color:var(--ink-muted)] mb-4">
                  Là où les fournisseurs livrent un CSV figé, Uclic livre une base vivante : enrichissement IA continu, vérification temps réel, et workflows d&apos;activation pré-câblés (HubSpot, Lemlist, Apollo, n8n).
                </p>
                <p className="text-[16px] leading-relaxed text-[color:var(--ink-muted)]">
                  Vous pilotez la performance, pas la donnée.
                </p>
              </div>
              <ul className="border border-[color:var(--border-subtle)] !rounded-none">
                {[
                  'Enrichissement IA propriétaire (8 sources)',
                  'Vérification SMTP temps réel',
                  'Mise à jour mensuelle automatique',
                  'Conformité RGPD & LCEN documentée',
                  'API + push CRM natif (HubSpot, Salesforce, Pipedrive)',
                  'Support senior dédié — réponse < 2 h',
                ].map((item, i, arr) => (
                  <li
                    key={i}
                    className={`px-6 py-4 flex items-start gap-3 bg-[color:var(--card-elev-1)] light:bg-white ${i < arr.length - 1 ? 'border-b border-[color:var(--border-subtle)]' : ''}`}
                  >
                    <span className="mt-1 w-1.5 h-1.5 bg-[color:var(--accent)] shrink-0" aria-hidden="true" />
                    <span className="text-[15px] text-[color:var(--ink)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ScrapingFaq items={faqs} />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
