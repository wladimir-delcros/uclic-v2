import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import MediaMarquee from '@/components/landing/MediaMarquee';
import OffreSection from '@/components/landing/OffreSection';
import DifferentSection from '@/components/landing/DifferentSection';
import PreuveSection from '@/components/landing/PreuveSection';
import LinkedInProofSection from '@/components/landing/LinkedInProofSection';
import MethodeSection from '@/components/landing/MethodeSection';
import TarifsSection from '@/components/landing/TarifsSection';
import FaqSection from '@/components/landing/FaqSection';
import CtaFinal from '@/components/landing/CtaFinal';
import Footer from '@/components/landing/Footer';
import {
  breadcrumbSchema,
  jsonLdString,
  pillarsItemListSchema,
  serviceSchema,
  webPageSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Uclic — Agence Growth Marketing & IA | Résultats en 90 jours',
  description:
    'Agence Growth Marketing & IA pour scale-ups B2B. Pilotage senior, experts canaux et agents IA en production. Acquisition, prospection, IA & Automation activés selon vos priorités.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://uclic.fr/',
    title: 'Uclic — Agence Growth Marketing & IA',
    description:
      'Une équipe marketing complète, sans silos, avec un vrai pilotage. Growth industrialisé pour scale-ups B2B.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Agence Growth Marketing & IA',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Homepage-specific JSON-LD (Organization + WebSite already injected site-wide in layout.tsx) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(webPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(pillarsItemListSchema()) }}
      />
      <Nav />
      <main className="relative">
        <Hero />
        <MediaMarquee />
        <OffreSection />
        <DifferentSection />
        <MethodeSection />
        <TarifsSection />
        <PreuveSection />
        <LinkedInProofSection />
        <FaqSection />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
