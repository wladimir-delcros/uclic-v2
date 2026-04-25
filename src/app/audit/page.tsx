import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import AuditClient from '@/components/audit/AuditClient';
import AuditSections from '@/components/audit/AuditSections';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Mon audit gratuit — 48h | Growth Inbound · Outbound · IA',
  description:
    'Audit des 3 piliers uclic (Inbound, Outbound, IA & Dev) en 48h. Diagnostic chiffré, plan 90 jours, pilotage senior. Gratuit, sans engagement.',
  alternates: { canonical: '/audit' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/audit`,
    title: 'Mon audit gratuit — 48h | Growth Inbound · Outbound · IA',
    description:
      'Audit des 3 piliers uclic (Inbound, Outbound, IA & Dev). Diagnostic chiffré, plan 90 jours, pilotage senior. Note agrégée 4,76/30 (Google · Sortlist · Trustpilot).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Audit Growth Marketing',
      },
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Audit Growth Marketing', item: `${SITE_URL}/audit` },
  ],
};

export default function AuditPage() {
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
        <AuditClient />
        <AuditSections />
      </main>
      <Footer />
    </>
  );
}
