import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import CharteFreelanceClient from '@/components/charte-freelance/CharteFreelanceClient';
import CharteSections from '@/components/charte-freelance/CharteSections';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Collectif Freelance Uclic — Entraide, partage, Slack commun',
  description:
    "Un collectif de freelances seniors growth, IA & développement. Slack commun, stand-up hebdo, partage d'agents IA et workflows, pipe commercial mutualisé. On avance ensemble.",
  keywords: [
    'collectif freelance',
    'communauté freelance growth',
    'rejoindre uclic',
    'freelance growth marketing',
    'slack freelance',
    'partage agents IA',
    'entraide freelance',
  ],
  alternates: { canonical: '/charte-freelance' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/charte-freelance`,
    title: 'Collectif Freelance Uclic — Entraide & partage',
    description:
      "Un collectif de freelances seniors qui partagent Slack, stand-up, agents IA et pipe commercial. On avance ensemble.",
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
    title: 'Collectif Freelance Uclic — Entraide & partage',
    description:
      "Un collectif de freelances seniors : Slack commun, stand-up hebdo, agents IA partagés, pipe commercial mutualisé.",
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
        <CharteSections />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
