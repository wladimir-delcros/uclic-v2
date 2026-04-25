import type { Metadata } from 'next';
import { Download, Mail, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { FeaturedVideos } from '@/components/landing/MethodeSection';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Presse — Uclic dans les médias',
  description:
    "Demandes presse, interviews, citations et kit presse Uclic. Agence Growth Marketing & IA — Pilotage senior, 3 piliers, agents IA en production. Contact : hello@uclic.fr.",
  keywords: [
    'presse uclic',
    'uclic média',
    'kit presse agence growth',
    'interview wladimir delcros',
    'demande interview uclic',
  ],
  alternates: { canonical: '/presse' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/presse`,
    title: 'Presse — Uclic dans les médias',
    description:
      'Interviews, citations, kit presse et contact presse Uclic.',
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Uclic — Presse' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presse — Uclic dans les médias',
    description: 'Interviews, citations, kit presse et contact presse Uclic.',
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Presse', item: `${SITE_URL}/presse` },
  ],
};

// Media mentions — liste éditoriale sobre (logos servent aussi dans le footer marquee)
const MEDIA = [
  { name: 'Maddyness', href: 'https://www.maddyness.com', logo: null },
  { name: 'French Tech', href: 'https://lafrenchtech.com', logo: null },
  { name: 'FrenchWeb', href: 'https://www.frenchweb.fr', logo: null },
  { name: 'Journal du Net', href: 'https://www.journaldunet.com', logo: null },
  { name: 'BFM Business', href: 'https://www.bfmtv.com/economie/', logo: null },
  { name: 'Les Échos', href: 'https://www.lesechos.fr', logo: null },
];

const PRESS_KIT = [
  { label: 'Logo Uclic (SVG)', href: '/logo.svg', ext: 'SVG', size: '3 Ko' },
  { label: 'Logo mark (SVG)', href: '/logo-mark.svg', ext: 'SVG', size: '1,4 Ko' },
  { label: 'Fiche France Num (JPEG)', href: '/france-num.jpeg', ext: 'JPEG', size: '6 Ko' },
];

export default function PressePage() {
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
      <main id="main" className="relative bg-[color:var(--bg)] text-[color:var(--ink)]">
        {/* Header éditorial */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[860px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Presse
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
              <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
                Uclic dans les{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  médias
                  <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                </span>
              </h1>
              <p className="mt-6 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--ink-muted)]">
                Interviews, podcasts, citations et analyses — les prises de parole
                publiques d'Uclic et de ses fondateurs. Contact presse, kit, et
                demandes d'interview ci-dessous.
              </p>
            </div>
          </div>
        </section>

        {/* Interviews featured — réutilise les 4 vidéos de la home */}
        <section className="relative pb-20 lg:pb-28">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[860px] mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Interviews & podcasts
              </div>
              <h2 className="text-[clamp(26px,3.2vw,38px)] font-display font-medium tracking-[-0.02em]">
                Ils ont invité{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  Wladimir
                  <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                </span>
              </h2>
            </div>
            <FeaturedVideos />
          </div>
        </section>

        {/* Media mentions */}
        <section className="relative pb-20 lg:pb-28 border-t border-[color:var(--border-subtle)] pt-16 lg:pt-20">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[860px] mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Citations média
              </div>
              <h2 className="text-[clamp(26px,3.2vw,38px)] font-display font-medium tracking-[-0.02em]">
                Ils parlent de{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  nous
                  <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                </span>
              </h2>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)]">
              {MEDIA.map((m) => (
                <li key={m.name} className="bg-[color:var(--bg)]">
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center h-20 px-4 hover:bg-[color:var(--card-elev-1)] transition-colors"
                  >
                    <span className="text-[13px] font-display font-medium text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] transition-colors">
                      {m.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[12.5px] text-[color:var(--ink-muted)] max-w-[620px]">
              Vous êtes journaliste et souhaitez une citation, un brief ou un angle ?
              Écrivez-nous — réponse sous 24 h ouvrées.
            </p>
          </div>
        </section>

        {/* Kit presse + contact */}
        <section className="relative pb-24 lg:pb-32 border-t border-[color:var(--border-subtle)] pt-16 lg:pt-20">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Kit presse */}
              <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6 lg:p-8">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Kit presse
                </div>
                <h3 className="text-[22px] font-display font-medium tracking-[-0.015em] leading-tight mb-4">
                  Logos & assets officiels
                </h3>
                <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed mb-6">
                  Téléchargez les fichiers dont vous avez besoin pour vos articles.
                  Conditions : aucun floutage, aucune modification des couleurs.
                </p>
                <ul className="space-y-2">
                  {PRESS_KIT.map((f) => (
                    <li key={f.href}>
                      <a
                        href={f.href}
                        download
                        className="group flex items-center justify-between gap-4 p-3 border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--card-elev-1)] transition-colors"
                      >
                        <span className="inline-flex items-center gap-3 text-[13px] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                          <Download size={14} strokeWidth={1.75} />
                          {f.label}
                        </span>
                        <span className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-dim)]">
                          {f.ext} · {f.size}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact presse */}
              <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6 lg:p-8">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Contact presse
                </div>
                <h3 className="text-[22px] font-display font-medium tracking-[-0.015em] leading-tight mb-4">
                  Un angle, une citation, une interview ?
                </h3>
                <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed mb-6">
                  Wladimir Delcros (CEO · Growth Strategist, 16 ans d'XP) est
                  disponible pour des interviews growth, IA générative, agents IA,
                  prospection B2B, SEO/GEO. Réponse sous 24 h ouvrées.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:hello@uclic.fr?subject=Demande%20presse"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                    data-ga-event="contact_click"
                    data-ga-method="email"
                    data-ga-location="presse"
                  >
                    <Mail size={14} strokeWidth={1.75} />
                    hello@uclic.fr
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                  >
                    Formulaire contact général →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
