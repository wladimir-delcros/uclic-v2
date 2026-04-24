import type { Metadata } from 'next';
import { ArrowRight, Users } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { fetchAllTeamMembers } from '@/lib/team';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Équipe Growth Marketing & IA',
  description:
    "L'équipe Uclic : un pilote senior, des experts canaux certifiés, et des agents IA en production. Seniors au pilotage, spécialistes au terrain.",
  alternates: { canonical: '/equipe' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/equipe`,
    title: 'Équipe Growth Marketing & IA | Agence Uclic',
    description:
      "L'équipe Uclic : un pilote senior, des experts canaux certifiés, et des agents IA en production.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Équipe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Équipe Growth Marketing & IA | Agence Uclic',
    description:
      "L'équipe Uclic : un pilote senior, des experts canaux certifiés, et des agents IA en production.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Équipe', item: `${SITE_URL}/equipe` },
  ],
};

export default async function EquipePage() {
  const members = await fetchAllTeamMembers();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: members.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.title,
      url: `${SITE_URL}/equipe/${m.slug}`,
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
                L&apos;équipe Uclic
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Des seniors,{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  pas des stagiaires.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[640px] text-[16px] leading-relaxed">
                {members.length > 0
                  ? `${members.length} profils au pilotage : un head pilote le compte, des experts canaux exécutent, des agents IA accélèrent. Pas de pyramide junior.`
                  : `Un head pilote le compte, des experts canaux exécutent, des agents IA accélèrent. Pas de pyramide junior.`}
              </p>
            </div>
          </div>
        </section>

        {/* LISTING */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            {members.length === 0 ? (
              <p className="text-[color:var(--ink-muted)] text-center py-16">
                Équipe en cours de republication.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {members.map((m) => {
                  const img =
                    m.equipeFields.miniImage?.node.sourceUrl ||
                    m.equipeFields.image?.node.sourceUrl;
                  return (
                    <a
                      key={m.slug}
                      href={`/equipe/${m.slug}`}
                      className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden transition-colors hover:border-[color:var(--accent)]/60"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--card-elev-1)]">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img}
                            alt={m.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[color:var(--accent)]">
                            <Users size={48} />
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col gap-2 flex-1">
                        {m.equipeFields.role && (
                          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                            <span className="w-4 h-px bg-[color:var(--accent)]" />
                            {m.equipeFields.role}
                          </div>
                        )}
                        <h2 className="text-[20px] font-display font-medium leading-tight tracking-[-0.01em]">
                          {m.title}
                        </h2>
                        {m.equipeFields.extrait && (
                          <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3">
                            {m.equipeFields.extrait}
                          </p>
                        )}
                        <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                          Voir le profil
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </a>
                  );
                })}
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
