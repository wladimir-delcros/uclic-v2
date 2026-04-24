import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, CalendarClock, ArrowRight, Clock } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import ContactForm from './ContactForm';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Contact | Agence Growth & IA',
  description:
    "Contactez Uclic pour discuter de votre projet growth et IA. Audit stratégique offert, réponse sous 24h, équipe senior que vous rencontrez dès le premier call.",
  keywords: [
    'contact',
    'agence growth marketing',
    'audit growth',
    'agence IA',
    'freelance growth',
    'uclic',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact`,
    title: 'Contact | Agence Growth & IA',
    description:
      "Contactez Uclic pour discuter de votre projet growth et IA. Audit stratégique offert, réponse sous 24h.",
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
    title: 'Contact | Agence Growth & IA',
    description:
      "Contactez Uclic pour discuter de votre projet growth et IA. Audit stratégique offert, réponse sous 24h.",
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
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
                Parlons de votre{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  croissance.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[620px] text-[16px] leading-relaxed">
                Un brief, une question, une demande presse ? Remplissez le formulaire — un pilote senior vous répond sous 24h ouvrées. Pour aller plus vite, réservez directement un audit stratégique offert.
              </p>
            </div>

            {/* Form + aside */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 lg:gap-6 items-start">
              {/* Contact form (client) */}
              <ContactForm />

              {/* Aside — canaux rapides */}
              <aside className="space-y-5">
                <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                    <CalendarClock size={18} strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                    Audit stratégique offert
                  </h2>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    30 min avec un pilote senior. Plan 90 jours concret. Gratuit, sans engagement.
                  </p>
                  <Link
                    href="/audit"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                  >
                    Réserver mon audit <ArrowRight size={14} />
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
                    Réponse sous 24h
                  </h2>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    Paris · remote first. FR / EN. Pas de commercial — un pilote senior dès le premier call.
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
