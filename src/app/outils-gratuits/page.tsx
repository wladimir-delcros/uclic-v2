import type { Metadata } from 'next';
import { FlaskConical, Calculator, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Outils Gratuits Growth Hacking — Calculateurs A/B',
  description:
    "Collection d'outils gratuits pour optimiser votre croissance : calculateurs A/B test, taille d'échantillon, analyses statistiques. Ressources growth hacking par Uclic.",
  keywords: [
    'outils gratuits',
    'growth hacking',
    'a/b test calculator',
    'mde calculator',
    'taille échantillon',
    'statistiques marketing',
    'uclic',
  ],
  alternates: { canonical: '/outils-gratuits' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/outils-gratuits`,
    title: 'Outils Gratuits Growth Hacking | Uclic',
    description:
      "Calculateurs A/B test et outils statistiques gratuits pour piloter votre croissance. Sélection Uclic.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Outils Gratuits Growth Hacking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outils Gratuits Growth Hacking | Uclic',
    description:
      "Calculateurs A/B test et outils statistiques gratuits pour piloter votre croissance.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Outils Gratuits', item: `${SITE_URL}/outils-gratuits` },
  ],
};

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Outils Gratuits Growth Hacking Uclic',
  description:
    "Collection d'outils gratuits pour optimiser votre croissance : calculateurs A/B, analyses statistiques.",
  url: `${SITE_URL}/outils-gratuits`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Uclic',
    url: SITE_URL,
  },
  about: {
    '@type': 'Thing',
    name: 'Outils Growth Hacking',
    description: 'Calculateurs et ressources gratuites pour tests A/B et analyses marketing',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Uclic',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
    },
  },
};

const tools = [
  {
    icon: FlaskConical,
    title: 'A/B Testing Confidence',
    desc: "Calculateur avancé pour déterminer la taille d'échantillon optimale de vos tests A/B. Détectez la MDE (Minimum Detectable Effect) et planifiez vos expérimentations avec rigueur statistique.",
    href: '/outils-gratuits/mde-calculator',
    cta: 'Ouvrir le calculateur',
    tags: ['A/B Test', 'MDE', 'Sample size'],
  },
  {
    icon: Calculator,
    title: 'A/B Test Calculator',
    desc: "Analysez les résultats de vos tests A/B : significativité statistique, intervalles de confiance et uplift. Prenez des décisions fondées sur les données, pas sur l'intuition.",
    href: '/outils-gratuits/ab-test-calculator',
    cta: 'Lancer l\'analyse',
    tags: ['A/B Test', 'Significativité', 'Uplift'],
  },
];

const reasons = [
  {
    title: 'Méthodes statistiques éprouvées',
    desc: "Nos calculateurs s'appuient sur les standards utilisés par les équipes growth des meilleures scale-ups B2B.",
  },
  {
    title: 'Interface directe',
    desc: 'Pas de compte à créer, pas de pop-up. Vous entrez vos chiffres, vous obtenez une réponse exploitable.',
  },
  {
    title: 'Issus de la vraie vie',
    desc: "Ces outils sont ceux qu'on utilise nous-mêmes chez nos clients scale-ups. Pas de théorie, que du terrain.",
  },
];

export default function OutilsGratuitsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(collectionPageSchema) }}
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
                Outils Gratuits Uclic
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Outils Gratuits{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  Growth Hacking.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[680px] text-[16px] leading-relaxed">
                Découvrez notre collection d&apos;outils gratuits spécialement conçus pour optimiser votre croissance. Des calculateurs et ressources essentielles pour vos tests A/B, analyses statistiques et stratégie marketing.
              </p>
            </div>
          </div>
        </section>

        {/* OUTILS */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Nos outils
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Nos outils gratuits pour votre croissance.
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <a
                    key={t.title}
                    href={t.href}
                    className="group relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 flex flex-col transition-colors hover:border-[color:var(--accent)]"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                      {t.desc}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {t.tags.map((x) => (
                        <span
                          key={x}
                          className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] group-hover:gap-3 transition-all">
                      {t.cta} <ArrowRight size={14} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* POURQUOI */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Pourquoi ces outils
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Pourquoi utiliser nos outils gratuits ?
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <h3 className="text-[16px] font-display font-medium tracking-[-0.01em]">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Note complémentaire */}
            <div className="mt-10 relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Besoin d&apos;aller plus loin ?
                </div>
                <p className="mt-2 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[640px]">
                  Ces calculateurs donnent les bons chiffres — reste à en faire des décisions. Si vous voulez structurer votre programme d&apos;expérimentation ou piloter votre stack acquisition, on regarde ensemble via un audit offert.
                </p>
              </div>
              <a
                href="/audit"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
              >
                Demander un audit <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
