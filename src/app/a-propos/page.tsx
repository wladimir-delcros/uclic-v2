import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import AboutClient from '@/components/a-propos/AboutClient';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'À propos — Pourquoi Uclic existe | Agence Growth & IA',
  description:
    'Manifeste — l\'histoire d\'un ex-Head of Growth CodinGame devenu fondateur d\'agence. Pourquoi Uclic existe : pilote senior, experts canaux certifiés, agents IA en production. Sans silo, sans promesses creuses.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/a-propos`,
    title: 'À propos — Pourquoi Uclic existe | Agence Growth & IA',
    description:
      'Manifeste — l\'histoire d\'un ex-Head of Growth devenu fondateur d\'agence. Pilote senior, experts canaux, agents IA en production.',
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
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
