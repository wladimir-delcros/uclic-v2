import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Informations légales',
  description:
    "Mentions légales, CGV, RGPD, politique de confidentialité et cookies : retrouvez toutes les informations légales relatives à l'agence Uclic.",
  alternates: { canonical: '/legal' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal`,
    title: 'Informations légales — Uclic',
    description:
      "Mentions légales, CGV, RGPD, politique de confidentialité et cookies.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Uclic — Informations légales' }],
  },
};

const LEGAL_LINKS: Array<{ href: string; label: string; description: string }> = [
  {
    href: '/legal/mentions-legales',
    label: 'Mentions légales',
    description: "Éditeur, hébergement, propriété intellectuelle et conditions d'utilisation du site.",
  },
  {
    href: '/legal/conditions-generales-de-vente',
    label: 'Conditions Générales de Vente',
    description: 'Tarifs, modalités de paiement, délais et conditions de nos prestations.',
  },
  {
    href: '/legal/politique-de-confidentialite',
    label: 'Politique de confidentialité',
    description: "Collecte, utilisation, conservation et protection des données personnelles.",
  },
  {
    href: '/legal/rgpd',
    label: 'RGPD',
    description: 'Nos engagements en matière de conformité RGPD et vos droits sur vos données.',
  },
  {
    href: '/legal/cookies',
    label: 'Cookies',
    description: 'Traceurs déposés, finalités, durée de conservation et gestion des préférences.',
  },
];

export default function LegalIndexPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <SectionAmbience />
      <section className="relative z-10 pt-24 lg:pt-28 pb-20">
        <div className="mx-auto max-w-[980px] px-5 lg:px-10">
          <h1 className="text-[clamp(32px,4.2vw,52px)] font-medium tracking-[-0.02em] mb-6">
            Informations{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              légales
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
            </span>
          </h1>
          <p className="text-foreground/70 text-lg mb-12">
            Retrouvez ci-dessous l'ensemble des documents légaux encadrant votre relation avec Uclic.
          </p>
          <ul className="space-y-4">
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition hover:bg-foreground/[0.05]"
                >
                  <div>
                    <div className="font-medium text-lg mb-1">{item.label}</div>
                    <div className="text-foreground/60 text-sm">{item.description}</div>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 flex-none text-foreground/40 transition group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
