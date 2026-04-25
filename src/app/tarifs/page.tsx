import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import TarifsSection from '@/components/landing/TarifsSection';
import CtaFinal from '@/components/landing/CtaFinal';
import FaqSection from '@/components/landing/FaqSection';
import { jsonLdString, serviceSchema } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Tarifs Uclic — Growth Marketing & IA à partir de 0 €',
  description:
    "Nos tarifs : audit gratuit, 1 Pilier 1 490 € / mois, Duo 2 680 € (−10 %), Growth Machine 3 570 € (3 piliers, −20 %). Pilotage senior + experts canaux + agents IA en production. 3 mois min.",
  keywords: [
    'tarifs agence growth',
    'tarifs growth marketing',
    'prix agence IA',
    'forfait growth marketing',
    'abonnement growth',
    'pricing uclic',
    'uclic tarifs',
  ],
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tarifs`,
    title: 'Tarifs Uclic — Growth Marketing & IA',
    description:
      'Audit gratuit · 1 Pilier 1 490 € · Duo 2 680 € · Growth Machine 3 570 €. Sans engagement long, 3 mois min.',
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tarifs Uclic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs Uclic — Growth Marketing & IA',
    description:
      'Audit gratuit · 1 Pilier 1 490 € · Duo 2 680 € · Growth Machine 3 570 €.',
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Tarifs', item: `${SITE_URL}/tarifs` },
  ],
};

export default function TarifsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      {/* Schema Service complet avec les 4 offres + aggregateRating (source: lib/schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema()) }}
      />
      <a
        href="#tarifs"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative bg-[color:var(--bg)] text-[color:var(--ink)]">
        {/* H1 SEO — TarifsSection ne porte qu'un h2 (composant partagé avec la home).
            Ce h1 sr-only assure la hiérarchie correcte pour les crawlers et SR. */}
        <h1 className="sr-only">Tarifs Uclic — Growth Marketing &amp; IA à partir de 0 €</h1>
        {/* Grille tarifs — composant home réutilisé (source de vérité).
            Le TarifsSection contient déjà son propre header (eyebrow + h2 + lead). */}
        <div className="pt-16 lg:pt-20">
          <TarifsSection />
        </div>

        {/* FAQ (inclut notamment les questions tarifs) */}
        <FaqSection />

        {/* CTA final canon */}
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
