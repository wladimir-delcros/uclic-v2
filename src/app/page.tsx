import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import ConvergingLinesBridge from '@/components/ui/ConvergingLinesBridge';
import MediaMarquee from '@/components/landing/MediaMarquee';
import OffreSection from '@/components/landing/OffreSection';
import DifferentSection from '@/components/landing/DifferentSection';
import SectionDivider from '@/components/ui/SectionDivider';
import LinkedInProofSection from '@/components/landing/LinkedInProofSection';
import MethodeSection from '@/components/landing/MethodeSection';
import TarifsSection from '@/components/landing/TarifsSection';
import FaqSection from '@/components/landing/FaqSection';
import CtaFinal from '@/components/landing/CtaFinal';
import Footer from '@/components/landing/Footer';
import {
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
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(pillarsItemListSchema()) }}
      />
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <MediaMarquee />
        <OffreSection />
        <SectionDivider />
        <DifferentSection />
        <MethodeSection />
        <SectionDivider />
        <TarifsSection />
        <ConvergingLinesBridge className="mt-4 mb-12 lg:mt-6 lg:mb-16" />
        <LinkedInProofSection />
        <ConvergingLinesBridge variant="center-only" className="my-4 lg:my-6" height={140} />
        <FaqSection />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
