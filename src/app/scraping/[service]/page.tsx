import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Database, FileCheck, Shield, Zap } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import CornerCross from '@/components/ui/CornerCross';
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

interface FaqItem {
  question: string;
  answer: string;
}

async function getServiceData(serviceSlug: string): Promise<{
  service: ScrapingService;
  categories: CategoryRow[];
  faqs: FaqItem[];
} | null> {
  const supa = createAdminClient();

  const { data: service } = await supa
    .from('scraping_services')
    .select('*')
    .eq('slug', serviceSlug)
    .single();

  if (!service) {return null;}

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

  // FAQs : try AI faqs first (most general scope = service-level), fallback to static.
  let faqs: FaqItem[] = [];
  const { data: aiFaqs } = await supa
    .from('seo_pages_queue')
    .select('faqs')
    .eq('service_id', service.id)
    .eq('is_published', true)
    .not('faqs', 'is', null)
    .limit(1);

  if (
    aiFaqs &&
    aiFaqs.length > 0 &&
    Array.isArray(aiFaqs[0].faqs) &&
    aiFaqs[0].faqs.length > 0
  ) {
    faqs = aiFaqs[0].faqs as FaqItem[];
  } else {
    const { data: faqRows } = await supa
      .from('scraping_faq')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true });
    const variables: Record<string, string> = {
      '{{activity}}': 'professionnels',
      '{{location}}': 'France',
      '{{location_full}}': 'France',
      '{{region}}': 'France',
      '{{department_code}}': '',
      '{{service}}': service.name,
      '{{category}}': 'tous secteurs',
    };
    faqs = (faqRows || []).map((row: { question: string; answer: string; use_variables?: boolean }) => {
      let q = row.question;
      let a = row.answer;
      if (row.use_variables) {
        for (const [k, v] of Object.entries(variables)) {
          q = q.split(k).join(v);
          a = a.split(k).join(v);
        }
      }
      return { question: q, answer: a };
    });
  }

  return {
    service: service as ScrapingService,
    categories,
    faqs,
  };
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
  const title = `${service.name} | Bases B2B RGPD — Uclic`;
  const description =
    service.seo_short_description ||
    service.description ||
    `${service.name} : bases B2B qualifiées, RGPD, branchées sur vos séquences outbound. Audit gratuit en 48 h.`;
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
  if (!data) {notFound();}
  const { service, categories, faqs } = data;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Scraping', item: `${SITE_URL}/scraping` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/scraping/${service.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.seo_short_description || service.description || '',
    provider: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    serviceType: 'B2B Data Scraping',
    areaServed: { '@type': 'Country', name: 'France' },
    availableLanguage: 'fr',
    url: `${SITE_URL}/scraping/${service.slug}`,
  };

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  // Editorial defaults — always rendered if DB doesn't carry rich content.
  const benefits =
    service.benefits && service.benefits.length > 0
      ? service.benefits
      : [
          'Données vérifiées en temps réel — pas de fichier dormant',
          'Conformité RGPD : opt-out automatique, traçabilité complète',
          `Branchement direct sur vos séquences outbound (Lemlist, Apollo, Smartlead, La Growth Machine)`,
          'Enrichissement contextuel : taille, secteur, technos, signaux d\'intention',
          'Filtres ICP avancés : on cible le bon profil au bon moment',
          'Garantie qualité : remplacement gratuit des emails invalides',
        ];

  const useCases =
    service.use_cases && service.use_cases.length > 0
      ? service.use_cases
      : [
          `Lancement d'une campagne outbound ciblée — vous savez à qui vous parlez avant d'écrire la séquence.`,
          `Alimentation de votre CRM avec un flux de prospects qualifiés et frais.`,
          `Construction d'une audience de retargeting B2B (LinkedIn Matched Audiences, Meta CAPI).`,
          `Veille concurrentielle et market mapping sur un segment précis.`,
        ];

  const features = [
    {
      icon: Database,
      t: `Source ${service.name.toLowerCase()}`,
      d: `Données extraites depuis la source de référence, mises à jour à chaque cycle. Pas de fichier acheté en marketplace.`,
    },
    {
      icon: FileCheck,
      t: 'Vérification multi-passes',
      d: 'Validation MX + SMTP + détection des catch-all. Bounce rate maîtrisé < 5 % en sortie.',
    },
    {
      icon: Shield,
      t: 'Conformité RGPD',
      d: 'Mention légitime intérêt, opt-out automatique, registre de traitement traçable. Vos campagnes restent propres.',
    },
    {
      icon: Zap,
      t: 'Livrable opérationnel',
      d: 'CSV propre + webhook live ou API si besoin. On peut aussi pousser directement dans votre séquenceur.',
    },
  ];

  const processSteps = [
    {
      t: 'Cadrage ICP',
      d: 'On qualifie votre cible idéale : secteur, taille, fonctions, signaux d\'intention. 30 minutes pour caler le brief.',
    },
    {
      t: 'Extraction & enrichissement',
      d: `Extraction depuis ${service.name}, dédoublonnage, enrichissement (LinkedIn, technos, taille).`,
    },
    {
      t: 'Validation & livraison',
      d: 'Validation emails multi-passes, suppression des hard bounces, livraison sous 48 à 72 h.',
    },
    {
      t: 'Suivi outbound',
      d: 'On peut prolonger en gérant le séquençage outbound pour vous : copywriting, A/B testing, prise de RDV.',
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
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <Link
              href="/scraping"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Tous les services
            </Link>
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Scraping B2B · RGPD
            </span>
            <h1 className="font-display font-medium tracking-[-0.02em] text-[clamp(34px,4.6vw,56px)] leading-[1.05] text-[color:var(--ink)]">
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

        {/* FEATURES BENTO 4 (corner cross) */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Comment on opère</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Une chaîne propre, de la source{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                à la séquence
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
              {[
                { left: '0%', top: '0%' },
                { left: '25%', top: '0%' },
                { left: '50%', top: '0%' },
                { left: '75%', top: '0%' },
                { left: '100%', top: '0%' },
                { left: '0%', top: '100%' },
                { left: '25%', top: '100%' },
                { left: '50%', top: '100%' },
                { left: '75%', top: '100%' },
                { left: '100%', top: '100%' },
              ].map((pos, idx) => (
                <CornerCross
                  key={idx}
                  size={14}
                  className="hidden lg:block absolute z-[2]"
                  style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                />
              ))}
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <article
                    key={i}
                    className={`relative p-7 flex flex-col gap-3 !rounded-none bg-[#141211] light:bg-white ${
                      i < features.length - 1
                        ? 'lg:border-r lg:border-[color:var(--border-subtle)]'
                        : ''
                    } ${i !== features.length - 1 ? 'border-b border-[color:var(--border-subtle)] lg:border-b-0' : ''}`}
                  >
                    <span className="inline-flex items-center justify-center w-9 h-9 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-[16px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                      {feat.t}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-[color:var(--ink-muted)]">
                      {feat.d}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Pourquoi choisir ce service</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Ce qu&apos;une base{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {service.name.toLowerCase()}
              </span>{' '}
              Uclic vous apporte
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-5"
                >
                  <Check size={18} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[color:var(--ink)]/90 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* USE CASES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Cas d&apos;usage</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Quand activer{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {service.name}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {useCases.map((u, i) => (
                <article
                  key={i}
                  className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    Cas {i + 1}
                  </span>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--ink)]/90">
                    {u}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Process</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Du brief à la première séquence en{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                72 heures
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((p, i) => (
                <div
                  key={i}
                  className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <span className="absolute -top-3 left-6 bg-[color:var(--bg)] px-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                    Étape {i + 1}
                  </span>
                  <h3 className="mt-2 text-[16px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--ink-muted)]">
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES (existing block, keep) */}
        {categories.length > 0 ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Secteurs couverts</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-3">
                {service.name} par{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  secteur d&apos;activité
                </span>
              </h2>
              <p className="text-[color:var(--ink-muted)] mb-10">
                {categories.length} secteur{categories.length > 1 ? 's' : ''} d&apos;activité couvert
                {categories.length > 1 ? 's' : ''} en {service.name.toLowerCase()}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/scraping/${service.slug}/${c.slug}`}
                    className="group flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    {c.icon ? (
                      <div className="text-[28px] mb-3" aria-hidden="true">
                        {c.icon}
                      </div>
                    ) : null}
                    <h3 className="text-[18px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                      {service.name} {c.name}
                    </h3>
                    {c.description ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {c.description}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Voir la catégorie{' '}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* SEO CONTENT (free-form HTML from DB) */}
        {service.seo_content ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              <div
                className="text-[15.5px] leading-[1.7] text-[color:var(--ink)]/90
                  [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:font-medium [&_h2]:text-[clamp(24px,2.6vw,32px)] [&_h2]:tracking-[-0.02em] [&_h2]:text-[color:var(--ink)]
                  [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-[20px]
                  [&_p]:mt-3 [&_a]:text-[color:var(--accent)] [&_a]:underline
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: service.seo_content }}
              />
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {faqs.length > 0 ? (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>FAQ</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10">
                Vos questions sur{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  {service.name.toLowerCase()}
                </span>
              </h2>
              <div className="space-y-4">
                {faqs.map((fa, i) => (
                  <details
                    key={i}
                    className="group !rounded-none border border-[color:var(--border-subtle)] overflow-hidden"
                  >
                    <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-[15px] font-medium text-[color:var(--ink)] hover:bg-[color:var(--border-subtle)]/10 transition-colors">
                      <span>{fa.question}</span>
                      <span className="text-[color:var(--accent)] group-open:rotate-45 transition-transform text-[20px] leading-none ml-4">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                      {fa.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
