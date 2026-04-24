import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import SimulationClient from './SimulationClient';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Simuler mon ROI — Plan growth en 2 minutes | Uclic',
  description:
    "Simulez votre ROI sur les 3 piliers uclic (Inbound · Outbound · IA). Score, leviers prioritaires, gain leads / CAC — plan 90 jours sous 24h. Gratuit.",
  alternates: { canonical: '/simulation' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/simulation`,
    title: 'Simuler mon ROI — Plan growth en 2 minutes | Uclic',
    description:
      "Simulez votre ROI sur les 3 piliers uclic (Inbound · Outbound · IA). Score, leviers prioritaires, plan 90 jours sous 24h. Note agrégée 4,76/30.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Simuler mon ROI Uclic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simuler mon ROI — Plan growth en 2 minutes',
    description:
      "5 questions, score sur les 3 piliers uclic + audit gratuit sous 48h. Pilotage senior, résultats en 90 jours.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Simulation', item: `${SITE_URL}/simulation` },
  ],
};

export default function SimulationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1100px] mx-auto px-5 lg:px-10">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-6"
            >
              &larr; Retour a l&apos;accueil
            </a>
            <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Simuler mon ROI &middot; 2 min</span>
            </div>
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[900px]">
              Simulez votre ROI sur les 3 piliers uclic.
            </h1>
            <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
              5 questions. On identifie vos leviers prioritaires sur Inbound, Outbound et IA &amp;
              Développement, on estime le gain leads / CAC et on vous renvoie un plan 90 jours
              sous 24h. Gratuit, sans engagement.
            </p>
          </div>
        </section>

        <SimulationClient />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
