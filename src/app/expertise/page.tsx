import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { getExpertiseCategories } from '@/lib/expertise';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Expertises Growth Marketing & IA',
  description:
    "Découvrez nos expertises en Growth Marketing, IA, Paid Media, SEO, Social Ads, Data Analytics, Branding et CRM. Pilotage senior pour scale-ups B2B.",
  alternates: { canonical: '/expertise' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/expertise`,
    title: 'Expertises Growth Marketing & IA | Uclic',
    description:
      "Toutes nos expertises en Growth Marketing, IA et acquisition B2B.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Expertises Uclic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expertises Growth Marketing & IA | Uclic',
    description:
      "Toutes nos expertises en Growth Marketing, IA et acquisition B2B.",
    site: '@uclic_fr',
  },
};

export default async function ExpertiseIndexPage() {
  const categories = await getExpertiseCategories();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Expertises', item: `${SITE_URL}/expertise` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/expertise/${c.slug}`,
      name: c.name,
    })),
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
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Expertises
            </span>
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[800px]">
              Nos domaines d&apos;
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                expertise
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
              </span>
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
              Growth Marketing, IA, acquisition, prospection, data. Une équipe senior qui pilote
              vos leviers et met en production les canaux adaptés à votre stade.
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
                Audit offert
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

        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            {categories.length === 0 ? (
              <p className="text-[color:var(--ink-muted)]">Aucune expertise publiée pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {categories.map((c) => (
                  <a
                    key={c.slug}
                    href={`/expertise/${c.slug}`}
                    className="group flex flex-col p-6 lg:p-7 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg)] hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <h2 className="text-[20px] lg:text-[22px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                      {c.name}
                    </h2>
                    {c.description ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {c.description}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-5 flex items-center justify-between text-[12px] text-[color:var(--ink-muted)]">
                      {typeof c.count === 'number' && c.count > 0 ? (
                        <span>
                          {c.count} expertise{c.count > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                        Voir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
