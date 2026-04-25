import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, CalendarClock, ArrowRight, Clock } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import ContactForm from './ContactForm';
import OfficesMap from '@/components/contact/OfficesMap';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Contact | Uclic — Inbound · Outbound · IA',
  description:
    "Parlez à un Growth Lead senior uclic. 3 piliers (Inbound, Outbound, IA & Dev), pilotage senior, résultats en 90 jours. Réponse sous 24h ouvrées.",
  keywords: [
    'contact uclic',
    'agence growth scale-up B2B',
    'audit growth gratuit',
    'agents IA production',
    'growth lead senior',
    'uclic',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact`,
    title: 'Contact | Uclic — Inbound · Outbound · IA',
    description:
      "Growth Lead senior + experts canaux + agents IA en production. Note agrégée 4,76/30 (Google · Sortlist · Trustpilot). Réponse sous 24h ouvrées.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Uclic — Inbound · Outbound · IA',
    description:
      "Growth Lead senior + experts canaux + agents IA. Audit gratuit 48h. Réponse sous 24h ouvrées.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Uclic',
  description:
    "Contactez Uclic pour discuter de votre projet growth et IA. Réponse sous 24h ouvrées.",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Uclic',
    url: SITE_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+33-6-17-12-54-28',
        contactType: 'customer service',
        areaServed: 'FR',
        availableLanguage: ['French', 'English'],
      },
      {
        '@type': 'ContactPoint',
        email: 'hello@uclic.fr',
        contactType: 'customer service',
        areaServed: 'FR',
        availableLanguage: ['French', 'English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(contactPageSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        <section className="relative pt-24 lg:pt-28 pb-20 lg:pb-28 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Contact
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Trois piliers. Une seule équipe.{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  Parlons-en.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[620px] text-[16px] leading-relaxed">
                Un brief, une question, une demande presse ? Remplissez le formulaire — un Growth Lead senior vous répond sous 24h ouvrées. Pour aller plus vite, réservez votre audit gratuit — 48h.
              </p>
            </div>

            {/* Form + aside */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 lg:gap-6 items-start">
              {/* Contact form + carte bureaux empilés dans la colonne principale */}
              <div className="min-w-0 space-y-16 lg:space-y-20">
                <ContactForm />
                <OfficesMap />
              </div>

              {/* Aside — canaux rapides, sticky sur desktop */}
              <aside className="space-y-5 article-sidebar-sticky">
                <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                    <CalendarClock size={18} strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                    Mon audit gratuit — 48h
                  </h2>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    30 min avec un Growth Lead senior. Audit des 3 piliers + plan 90 jours chiffré. 0 €, sans engagement.
                  </p>
                  <Link
                    href="/audit"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                  >
                    Réserver mon créneau <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                    <Mail size={18} strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                    Par email
                  </h2>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    Brief, demande presse, partenariat.
                  </p>
                  <a
                    href="mailto:hello@uclic.fr"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                    data-ga-event="contact_click"
                    data-ga-method="email"
                    data-ga-location="contact-aside"
                  >
                    hello@uclic.fr <ArrowRight size={14} />
                  </a>
                </div>

                <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                    <Phone size={18} strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                    Par téléphone
                  </h2>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    Wladimir décroche en direct (ou vous rappelle dans l&apos;heure).
                  </p>
                  <a
                    href="tel:+33617125428"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                    data-ga-event="contact_click"
                    data-ga-method="phone"
                    data-ga-location="contact-aside"
                  >
                    +33 6 17 12 54 28 <ArrowRight size={14} />
                  </a>
                </div>

                <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                    <Clock size={18} strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                    Note 4,76/30 · réponse 24h
                  </h2>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    Google 4,9 · Sortlist 4,96 · Trustpilot 4,3. Paris · remote first. FR / EN. Growth Lead senior dès le premier call — pas de SDR.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
