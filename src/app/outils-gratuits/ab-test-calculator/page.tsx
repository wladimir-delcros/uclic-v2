import type { Metadata } from 'next';
import ABTestCalculatorClient from './ABTestCalculatorClient';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Calculateur A/B Test — Significativité statistique',
  description:
    "Calculez la significativité statistique de votre test A/B : p-value, z-score, uplift et intervalle de confiance. Outil gratuit Uclic.",
  alternates: { canonical: '/outils-gratuits/ab-test-calculator' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/outils-gratuits/ab-test-calculator`,
    title: 'Calculateur A/B Test — Significativité statistique',
    description:
      "Test z sur deux proportions, p-value, intervalle de confiance. Outil gratuit par Uclic.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'A/B Test Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur A/B Test — Significativité',
    description:
      "Test z sur deux proportions, p-value, intervalle de confiance. Gratuit, par Uclic.",
    site: '@uclic_fr',
  },
};

export default function ABTestCalculatorPage() {
  return <ABTestCalculatorClient />;
}
