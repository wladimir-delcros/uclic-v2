import type { Metadata } from 'next';
import MDECalculatorClient from './MDECalculatorClient';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Calculateur MDE — Sample size A/B Test | Uclic',
  description:
    "Taille d'échantillon et MDE pour détecter un écart relatif donné entre contrôle et variante. Outil gratuit par les growth seniors Uclic.",
  alternates: { canonical: '/outils-gratuits/mde-calculator' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/outils-gratuits/mde-calculator`,
    title: 'Calculateur MDE — Sample size A/B Test | Uclic',
    description:
      "MDE, sample size et durée de test pour votre prochain A/B. Gratuit, par les growth seniors Uclic.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MDE Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur MDE — Taille d\'échantillon',
    description: "MDE + sample size pour votre prochain A/B. Gratuit.",
    site: '@uclic_fr',
  },
};

export default function MDECalculatorPage() {
  return <MDECalculatorClient />;
}
