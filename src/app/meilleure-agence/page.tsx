import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import { getAllMeilleureAgenceSlugs } from '@/lib/meilleure-agence';

export const revalidate = 3600;

const SITE_URL = 'https://uclic.fr';
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Agences Marketing France ${currentYear} — Annuaire Uclic`,
  description: `Annuaire éditorial ${currentYear} des agences marketing France : SEO, Ads, Growth, Outbound. Critères, comparatifs par ville. Audit Uclic gratuit 48 h.`,
  keywords: [
    'annuaire agences marketing france',
    'agences digitales',
    'agence seo',
    'agence google ads',
    'agence growth',
    'comparatif agences',
  ],
  alternates: { canonical: '/meilleure-agence' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/meilleure-agence`,
    title: `Agences Marketing France ${currentYear} — Annuaire Uclic`,
    description: `Annuaire éditorial ${currentYear} des agences marketing France : SEO, Ads, Growth, Outbound. Critères, comparatifs par ville.`,
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `Annuaire des agences marketing France ${currentYear}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Agences Marketing France ${currentYear} — Uclic`,
    description: `Annuaire éditorial ${currentYear}. Critères d'évaluation, comparatifs par ville.`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Agences marketing', item: `${SITE_URL}/meilleure-agence` },
  ],
};

const criteria = [
  {
    icon: ShieldCheck,
    title: 'Seniorité réelle',
    desc: "Qui pilote le compte ? Un partner avec 10+ ans sur le canal, ou un junior repassant un playbook générique ? On regarde les profils LinkedIn, pas les slides.",
  },
  {
    icon: Scale,
    title: 'Transparence tarifaire',
    desc: 'Honoraires affichés, facturation à l’heure ou au livrable, pas de commission cachée sur les médias. Un acheteur doit pouvoir arbitrer.',
  },
  {
    icon: CheckCircle2,
    title: 'Résultats traçables',
    desc: 'Case studies avec chiffres vérifiables, références joignables, pilotage hebdo documenté. Pas de “on a boosté X” sans méthode reproductible.',
  },
  {
    icon: CheckCircle2,
    title: 'Adéquation au besoin',
    desc: 'Une très bonne agence SEO n’est pas forcément la bonne pour de l’outbound B2B enterprise. On oriente selon le stade et le canal dominant.',
  },
];

const expertises = [
  { name: 'SEO', desc: 'Acquisition organique, contenu, technique, netlinking.' },
  { name: 'Google Ads', desc: 'Search, Performance Max, YouTube — pilotage ROAS.' },
  { name: 'Meta Ads', desc: 'Facebook / Instagram — acquisition B2C, remarketing.' },
  { name: 'LinkedIn Ads', desc: 'B2B, ABM, lead gen, sponsored content.' },
  { name: 'Growth Marketing', desc: 'Pilotage multi-canal, méthode, expérimentation.' },
  { name: 'Outbound / Prospection', desc: 'Cold email, LinkedIn, signaux d’achat.' },
  { name: 'Contenu & Brand', desc: 'Stratégie éditoriale, copywriting, marque employeur.' },
  { name: 'CRO & UX', desc: 'Optimisation conversion, landing pages, AB testing.' },
];

export default async function MeilleureAgencePage() {
  const allSlugs = await getAllMeilleureAgenceSlugs();

  const byExpertise = new Map<string, Array<{ ville: string; slug: string }>>();
  for (const entry of allSlugs) {
    const serviceName = entry.expertise.replace(/^Agence\s+/i, '').trim();
    if (!byExpertise.has(serviceName)) {
      byExpertise.set(serviceName, []);
    }
    byExpertise.get(serviceName)!.push({ ville: entry.ville, slug: entry.slug });
  }
  const sortedExpertises = Array.from(byExpertise.entries()).sort((a, b) =>
    a[0].localeCompare(b[0], 'fr')
  );
  for (const [, cities] of sortedExpertises) {
    cities.sort((a, b) => a.ville.localeCompare(b.ville, 'fr'));
  }

  const totalPages = allSlugs.length;
  const totalExpertises = sortedExpertises.length;
  const totalVilles = new Set(allSlugs.map((s) => s.ville)).size;

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
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Annuaire {currentYear}
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
                Bien choisir son{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  agence marketing.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h1>

              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[680px] text-[16px] leading-relaxed">
                {totalPages > 0
                  ? `${totalPages} comparatifs couvrant ${totalExpertises} expertises dans ${totalVilles} villes. Trouvez l'agence idéale pour votre projet — on partage nos critères et notre lecture franche.`
                  : `Un annuaire éditorial des agences marketing reconnues en France, par expertise et par ville. On partage nos critères — à vous d'arbitrer.`}
              </p>
            </div>
          </div>
        </section>

        {/* CRITÈRES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Nos critères
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Quatre critères objectifs, pas un palmarès marketing.
            </h2>
            <p className="mt-3 text-[color:var(--ink-muted)] max-w-[620px] text-[15px] leading-relaxed">
              Une agence n&apos;est pas « la meilleure » dans l&apos;absolu — elle l&apos;est pour un stade, un budget et un canal donnés. Voici comment on évalue.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {criteria.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-[18px] font-display font-medium tracking-[-0.01em]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERTISES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Par expertise
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
              Chaque canal a sa carte.
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertises.map((e) => (
                <div
                  key={e.name}
                  className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6"
                >
                  <h3 className="text-[16px] font-display font-medium tracking-[-0.01em]">
                    Agence {e.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ANNUAIRE PAR EXPERTISE & VILLE */}
        {sortedExpertises.length > 0 && (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
              <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" /> Annuaire complet
              </div>
              <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[820px]">
                {totalPages} comparatifs · {totalExpertises} expertises · {totalVilles} villes.
              </h2>
              <p className="mt-3 text-[color:var(--ink-muted)] max-w-[640px] text-[15px] leading-relaxed">
                Cliquez sur une ville pour ouvrir le classement local. Scoring, avis Google, vérification de la fiche, lisibilité du positionnement.
              </p>

              <div className="mt-12 space-y-12">
                {sortedExpertises.map(([expertiseName, cities]) => (
                  <div key={expertiseName}>
                    <h3 className="text-[20px] lg:text-[24px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)] mb-5">
                      Agence {expertiseName}
                      <span className="ml-3 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                        {cities.length} {cities.length > 1 ? 'villes' : 'ville'}
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/meilleure-agence/${city.slug}`}
                          className="inline-flex items-center px-3.5 py-2 !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white text-[13px] text-[color:var(--ink-muted)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
                        >
                          {expertiseName} {city.ville}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Soft CTA */}
              <div className="mt-16 relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                <p className="text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
                  Chez Uclic, on assemble les trois piliers — inbound, outbound, agents IA — dans une seule équipe pilotée par un senior. Si vous voulez un avis franc sur l&apos;agence adaptée à votre stade, passez par un audit gratuit. On oriente, même si la bonne réponse n&apos;est pas nous.
                </p>
                <Link
                  href="/audit"
                  className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all"
                >
                  Mon audit gratuit — 48 h <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
