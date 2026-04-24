import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import CharteFreelanceClient from '@/components/charte-freelance/CharteFreelanceClient';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Charte du Freelance — Collectif',
  description:
    "La charte du freelance Uclic : collaboration, transparence totale, zéro commission sur apport d'affaires. Les valeurs qui font du collectif un partenaire unique.",
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
    title: 'Charte du Freelance | Collectif Uclic',
    description:
      "La charte du freelance Uclic : collaboration, transparence totale, zéro commission sur apport d'affaires.",
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
    title: 'Charte du Freelance | Collectif Uclic',
    description:
      "La charte du freelance Uclic : collaboration, transparence totale, zéro commission sur apport d'affaires.",
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
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
