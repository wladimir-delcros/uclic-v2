import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, CalendarClock, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

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

const contactChannels = [
  {
    icon: CalendarClock,
    title: 'Audit stratégique offert',
    desc: '30 min avec un pilote senior. On regarde ensemble vos leviers, vos fuites, votre plan 90 jours. Gratuit, sans engagement.',
    cta: { label: 'Réserver mon audit', href: '/audit' },
  },
  {
    icon: Mail,
    title: 'Par email',
    desc: 'Une question spécifique, un brief à nous envoyer, une demande presse ou partenariat.',
    cta: { label: 'hello@uclic.fr', href: 'mailto:hello@uclic.fr' },
  },
  {
    icon: Phone,
    title: 'Par téléphone',
    desc: 'Si vous préférez la voix — Wladimir décroche en direct (ou vous rappelle dans l’heure).',
    cta: { label: '+33 6 17 12 54 28', href: 'tel:+33617125428' },
  },
];

export default function ContactPage() {
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
        <section className="relative pt-24 lg:pt-28 pb-20 lg:pb-28 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
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
                Le plus simple : réserver un audit stratégique offert. Un pilote senior vous rappelle dans les 24h ouvrées avec un plan 90 jours concret.
              </p>

              <Link
                href="/audit"
                className="glass-pill mt-8 inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  borderRadius: '6px',
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                <CalendarClock size={16} /> Mon audit gratuit
              </Link>
            </div>

            {/* Canaux de contact */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
              {contactChannels.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 flex flex-col"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                      <Icon size={18} />
                    </div>
                    <h2 className="mt-5 text-[18px] font-display font-medium tracking-[-0.01em]">
                      {c.title}
                    </h2>
                    <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed flex-1">
                      {c.desc}
                    </p>
                    <Link
                      href={c.cta.href}
                      className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                    >
                      {c.cta.label} <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Bloc équipe / localisation */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                  Qui vous répondra
                </div>
                <h2 className="mt-3 text-[20px] font-display font-medium tracking-[-0.01em]">
                  Wladimir, co-fondateur
                </h2>
                <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                  Ex-Head of Growth CodinGame. 15 ans sur le terrain, 100% de croissance annuelle pendant 5 ans. Vous discutez directement avec lui — pas avec un commercial qui repasse le dossier.
                </p>
              </div>
              <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                  Où on est
                </div>
                <h2 className="mt-3 text-[20px] font-display font-medium tracking-[-0.01em]">
                  Paris · France · Europe
                </h2>
                <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                  On travaille en remote first avec des passages Paris / Lyon / Bruxelles selon les clients. On répond en français et en anglais.
                </p>
              </div>
            </div>

            {/* TODO: form contact si besoin — aujourd'hui, tout converge vers /audit pour unifier le pilotage des leads. */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
