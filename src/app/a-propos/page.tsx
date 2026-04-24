import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import AboutClient from '@/components/a-propos/AboutClient';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'À propos — Pourquoi Uclic existe | Growth & IA',
  description:
    'Trois piliers, une équipe, zéro silo. Pilotage senior, experts canaux, agents IA en production. Growth industrialisé pour scale-ups B2B. Résultats en 90 jours.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/a-propos`,
    title: 'À propos — Pourquoi Uclic existe | Growth & IA',
    description:
      'Trois piliers, une seule équipe, zéro silo. Pilotage senior, experts canaux, agents IA en production. Résultats mesurables en 90 jours.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — À propos',
      },
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'À propos', item: `${SITE_URL}/a-propos` },
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Wladimir Delcros',
  jobTitle: 'Founder · CEO Uclic',
  url: `${SITE_URL}/a-propos`,
  sameAs: [
    'https://www.linkedin.com/in/wladimirdelcros/',
    'https://x.com/delcros_w',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Uclic',
    url: SITE_URL,
  },
  alumniOf: [
    { '@type': 'Organization', name: 'CodinGame' },
    { '@type': 'Organization', name: 'Muzzo' },
    { '@type': 'Organization', name: 'Obat' },
    { '@type': 'Organization', name: 'StayHome' },
  ],
};

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(personSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        <AboutClient />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
