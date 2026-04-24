import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Informations légales',
  description:
    "Mentions légales, CGV, RGPD, politique de confidentialité et cookies : retrouvez toutes les informations légales relatives à l'agence Uclic.",
  alternates: { canonical: '/legal' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal`,
    title: 'Informations légales — Uclic',
    description:
      'Mentions légales, CGV, RGPD, politique de confidentialité et cookies.',
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Uclic — Informations légales' }],
  },
};

const LEGAL_LINKS: Array<{ href: string; label: string; description: string }> = [
  {
    href: '/legal/mentions-legales',
    label: 'Mentions légales',
    description:
      "Éditeur, hébergement, propriété intellectuelle et conditions d'utilisation du site.",
  },
  {
    href: '/legal/conditions-generales-de-vente',
    label: 'Conditions Générales de Vente',
    description: 'Tarifs, modalités de paiement, délais et conditions de nos prestations.',
  },
  {
    href: '/legal/politique-de-confidentialite',
    label: 'Politique de confidentialité',
    description: 'Collecte, utilisation, conservation et protection des données personnelles.',
  },
  {
    href: '/legal/rgpd',
    label: 'RGPD',
    description: 'Nos engagements en matière de conformité RGPD et vos droits sur vos données.',
  },
  {
    href: '/legal/cookies',
    label: 'Cookies',
    description: 'Traceurs déposés, finalités, durée de conservation et gestion des préférences.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Informations légales', item: `${SITE_URL}/legal` },
  ],
};

export default function LegalIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative bg-[color:var(--bg)] text-[color:var(--ink)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[980px] mx-auto px-5 lg:px-10">
            {/* Breadcrumb */}
            <nav
              aria-label="Fil d'Ariane"
              className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)] mb-10"
            >
              <Link href="/" className="hover:text-[color:var(--accent)] transition-colors">
                Accueil
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[color:var(--ink)]">Légal</span>
            </nav>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Informations légales
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            {/* H1 DA canon */}
            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              Informations{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                légales
                <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
              </span>
            </h1>

            <p className="mt-6 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--ink-muted)] max-w-[640px]">
              Cadre contractuel et données personnelles — Uclic opère sur la base de documents
              clairs et accessibles. Éditeur, CGV, RGPD, cookies : tout est en dessous.
            </p>
          </div>
        </section>

        {/* Liste — bento canon V2 (!rounded-none, tokens V2) */}
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-[980px] mx-auto px-5 lg:px-10">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)]">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href} className="bg-[color:var(--bg)]">
                  <Link
                    href={item.href}
                    className="group flex items-start justify-between gap-6 p-6 lg:p-8 !rounded-none hover:bg-[color:var(--card-elev-1)] transition-colors h-full"
                  >
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--ink-dim)] mb-3">
                        <span className="w-4 h-px bg-[color:var(--ink-dim)] group-hover:bg-[color:var(--accent)] transition-colors" />
                        Document
                      </div>
                      <div className="text-[20px] font-display font-medium text-[color:var(--ink)] leading-tight mb-2 group-hover:text-[color:var(--accent)] transition-colors">
                        {item.label}
                      </div>
                      <p className="text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.75}
                      className="mt-1 flex-none text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Caption footer */}
            <p className="mt-10 text-[12px] text-[color:var(--ink-muted)] font-mono uppercase tracking-[0.18em]">
              Dernière mise à jour — 2026
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
