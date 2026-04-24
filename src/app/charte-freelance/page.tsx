import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import CharteFreelanceClient from '@/components/charte-freelance/CharteFreelanceClient';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Charte Freelance — Cadre qualité Uclic',
  description:
    "Cadre qualité pour rejoindre Uclic : pilotage senior, résultats mesurables, agents IA en production. Zéro commission sur apport d'affaires, transparence totale.",
  keywords: [
    'charte freelance',
    'collectif freelance',
    'rejoindre uclic',
    'freelance growth',
    'valeurs uclic',
  ],
  alternates: { canonical: '/charte-freelance' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/charte-freelance`,
    title: 'Charte Freelance — Cadre qualité Uclic',
    description:
      "Cadre qualité Uclic : pilotage senior, résultats mesurables, agents IA en production. Transparence totale, zéro commission sur apport d'affaires.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Charte du Freelance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charte Freelance — Cadre qualité Uclic',
    description:
      "Cadre qualité Uclic : pilotage senior, résultats mesurables, agents IA en production. Transparence totale, zéro commission sur apport d'affaires.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Charte du Freelance', item: `${SITE_URL}/charte-freelance` },
  ],
};

export default function CharteFreelancePage() {
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
      <main id="main" className="relative">
        <CharteFreelanceClient />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
