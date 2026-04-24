import type { Metadata } from 'next';
import { ArrowRight, Database, Users, Mail, MapPin, FileSearch, ShieldCheck } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { createClient as createAdminClient } from '@/lib/supabase/server-admin';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Scraping B2B sur-mesure | Extraction de données RGPD',
  description:
    'Services de scraping B2B sur-mesure : LinkedIn, emails, Google Maps, sites métier. Extraction de données conforme RGPD pour alimenter votre prospection B2B.',
  alternates: { canonical: '/scraping' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/scraping`,
    title: 'Scraping B2B sur-mesure | Extraction de données RGPD',
    description:
      'Services de scraping B2B sur-mesure : LinkedIn, emails, Google Maps, sites métier. Conforme RGPD.',
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Services de scraping B2B',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scraping B2B sur-mesure | Extraction de données RGPD',
    description:
      'Services de scraping B2B sur-mesure : LinkedIn, emails, Google Maps, sites métier.',
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Scraping', item: `${SITE_URL}/scraping` },
  ],
};

interface ScrapingServiceRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  meta_title_template: string | null;
  meta_description_template: string | null;
  seo_short_description: string | null;
}

// Map icon string (from DB) to lucide component
const ICON_MAP: Record<string, typeof Database> = {
  users: Users,
  mail: Mail,
  map: MapPin,
  mappin: MapPin,
  search: FileSearch,
  filesearch: FileSearch,
  shield: ShieldCheck,
  shieldcheck: ShieldCheck,
  database: Database,
};

function resolveIcon(icon: string | null | undefined) {
  if (!icon) return Database;
  const key = icon.toLowerCase().replace(/[-_\s]/g, '');
  return ICON_MAP[key] || Database;
}

async function getServices(): Promise<ScrapingServiceRow[]> {
  const supa = createAdminClient();

  const { data: published } = await supa
    .from('scraping_services')
    .select('*')
    .eq('is_published', true)
    .order('name');

  if (published && published.length > 0) {
    return published as ScrapingServiceRow[];
  }

  const { data: all } = await supa
    .from('scraping_services')
    .select('*')
    .order('name');

  return (all || []) as ScrapingServiceRow[];
}

export default async function ScrapingPage() {
  const services = await getServices();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: `${SITE_URL}/scraping/${s.slug}`,
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Services de Scraping B2B Uclic',
    serviceType: 'Data scraping & enrichment',
    description:
      'Extraction de données B2B sur-mesure — LinkedIn, emails, Google Maps, sites métier — conforme RGPD.',
    provider: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Place', name: 'Europe' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Scraping B2B · Sur-mesure
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Extraire la donnée,{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  pas juste la collecter.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[640px] text-[16px] leading-relaxed">
                Services de scraping sur-mesure pour alimenter votre prospection B2B et votre intelligence marché. Extraction conforme RGPD, intégrée dans une stratégie outbound pilotée.
              </p>

              <a
                href="/audit"
                className="glass-pill mt-8 inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  borderRadius: '6px',
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Cadrer mon besoin <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Nos bases B2B
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              {services.length > 0
                ? `${services.length} sources d'extraction à combiner.`
                : `Des briques d'extraction à combiner.`}
            </h2>
            <p className="mt-3 text-[color:var(--ink-muted)] max-w-[640px] text-[15px] leading-relaxed">
              Le scraping n&apos;est pas une fin : c&apos;est la matière première d&apos;une campagne outbound. On commence toujours par cadrer l&apos;ICP avant de lancer l&apos;extraction.
            </p>

            {services.length === 0 ? (
              <p className="mt-10 text-[color:var(--ink-muted)] text-center py-16">
                Services en cours de publication.
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((s) => {
                  const Icon = resolveIcon(s.icon);
                  const desc = s.seo_short_description || s.description || '';
                  return (
                    <a
                      key={s.slug}
                      href={`/scraping/${s.slug}`}
                      className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 transition-colors hover:border-[color:var(--accent)]/60"
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                        <Icon size={18} />
                      </div>
                      <h3 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                        {s.name}
                      </h3>
                      {desc && (
                        <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-4">
                          {desc}
                        </p>
                      )}
                      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                        Explorer ce service
                        <ArrowRight size={14} />
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* MÉTHODE */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Notre méthode
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Du cadrage ICP à la base exploitable.
            </h2>

            <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: '01', t: 'Cadrage ICP', d: 'On définit ensemble les critères firmographiques et comportementaux précis.' },
                { n: '02', t: 'Extraction', d: 'Script ou outil sur-mesure selon la source, avec rotation IP et throttling éthique.' },
                { n: '03', t: 'Enrichissement', d: 'Email valide, LinkedIn, tech stack, signaux d’achat — agrégation multi-sources.' },
                { n: '04', t: 'Livraison', d: 'Base CSV ou push direct dans votre CRM / outil de séquencement, prête à activer.' },
              ].map((p) => (
                <li
                  key={p.n}
                  className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6"
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Phase {p.n}
                  </div>
                  <h3 className="mt-3 text-[16px] font-display font-medium tracking-[-0.01em]">{p.t}</h3>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
