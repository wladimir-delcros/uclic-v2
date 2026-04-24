import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import MediaMarquee from '@/components/landing/MediaMarquee';
import AuditClient from '@/components/audit/AuditClient';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Audit Growth Marketing | Gratuit · 48h',
  description:
    'Audit complet de votre stratégie growth en 48h. SEO, Ads, Funnel, Outbound — on identifie vos fuites et vos leviers. Gratuit, sans engagement.',
  alternates: { canonical: '/audit' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/audit`,
    title: 'Audit Growth Marketing | Gratuit · 48h',
    description:
      'Audit complet de votre stratégie growth. SEO, Ads, Funnel, Outbound — on identifie vos fuites et vos leviers. Gratuit, sans engagement.',
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        <AuditClient />
        <MediaMarquee />
      </main>
      <Footer />
    </>
  );
}
