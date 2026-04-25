import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: "Mentions légales — Éditeur, hébergeur et conditions d'utilisation Uclic",
  description:
    "Mentions légales UCLIC : informations sur l'éditeur, l'hébergement, la propriété intellectuelle et les conditions d'utilisation du site.",
  alternates: { canonical: '/legal/mentions-legales' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal/mentions-legales`,
    title: "Mentions légales — Éditeur, hébergeur et conditions d'utilisation Uclic",
    description:
      "Mentions légales UCLIC : informations sur l'éditeur, l'hébergement, la propriété intellectuelle et les conditions d'utilisation du site.",
    locale: 'fr_FR',
    siteName: 'Agence Growth & IA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mentions légales — Éditeur, hébergeur et conditions d'utilisation Uclic",
    description:
      "Mentions légales UCLIC : informations sur l'éditeur, l'hébergement, la propriété intellectuelle et les conditions d'utilisation du site.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Documents légaux', item: `${SITE_URL}/legal` },
    { '@type': 'ListItem', position: 3, name: 'Mentions légales', item: `${SITE_URL}/legal/mentions-legales` },
  ],
};

export default function MentionsLegalesPage() {
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
        <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            {/* Breadcrumb */}
            <nav
              aria-label="Fil d'Ariane"
              className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)] mb-10"
            >
              <a href="/" className="hover:text-[color:var(--accent)] transition-colors">
                Accueil
              </a>
              <span aria-hidden="true">/</span>
              <a href="/legal" className="hover:text-[color:var(--accent)] transition-colors">
                Légal
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-[color:var(--ink)]">Mentions légales</span>
            </nav>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              INFORMATIONS LÉGALES
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            {/* H1 */}
            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              Mentions{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                légales
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <article className="article-body text-[17px] leading-relaxed text-[color:var(--ink)] space-y-6 max-w-[960px] mx-auto">
              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Éditeur du site
              </h2>
              <p>
                <strong>Nom commercial :</strong> UCLIC
                <br />
                <strong>Entreprise individuelle :</strong> DELCROS Wladimir
                <br />
                <strong>Adresse :</strong> L&rsquo;Alauzet, 12520 Paulhe, France
                <br />
                <strong>SIREN :</strong> 827 553 371
                <br />
                <strong>Numéro de TVA intracommunautaire :</strong> FR27827553371
                <br />
                <strong>Email :</strong>{' '}
                <a
                  href="mailto:contact@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  contact@uclic.fr
                </a>
                <br />
                <strong>Directeur de publication :</strong> DELCROS Wladimir
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Hébergement
              </h2>
              <p>
                Le site UCLIC est hébergé par :
                <br />
                <strong>Nom de l&rsquo;hébergeur :</strong> OVH
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Propriété intellectuelle
              </h2>
              <p>
                Tous les contenus présents sur le site UCLIC, incluant les textes, images,
                graphismes, logos, icônes et éléments multimédias, sont la propriété exclusive de{' '}
                <strong>DELCROS Wladimir</strong> sauf mention contraire. Toute reproduction,
                distribution, modification, adaptation ou publication, même partielle, est
                strictement interdite sans l&rsquo;autorisation écrite de l&rsquo;éditeur.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Protection des données personnelles
              </h2>
              <p>
                Conformément à la loi <strong>n° 78-17 du 6 janvier 1978</strong> modifiée et au{' '}
                <strong>Règlement Général sur la Protection des Données (RGPD)</strong>, UCLIC
                s&rsquo;engage à protéger la confidentialité des données personnelles des
                utilisateurs.
              </p>
              <p>
                Les données collectées sont destinées uniquement à l&rsquo;usage de UCLIC et ne
                seront ni vendues ni transmises à des tiers sans consentement explicite.
                L&rsquo;utilisateur dispose d&rsquo;un droit d&rsquo;accès, de modification et de
                suppression de ses données personnelles, qu&rsquo;il peut exercer en contactant :{' '}
                <a
                  href="mailto:contact@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  contact@uclic.fr
                </a>
                .
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Responsabilité
              </h2>
              <p>
                UCLIC met tout en œuvre pour assurer l&rsquo;exactitude et l&rsquo;actualisation
                des informations diffusées sur son site. Toutefois, l&rsquo;éditeur ne saurait être
                tenu responsable en cas d&rsquo;erreur, omission ou indisponibilité temporaire du
                site.
              </p>
              <p>
                L&rsquo;utilisateur reconnaît utiliser le site sous sa responsabilité exclusive et
                dégage UCLIC de toute responsabilité en cas de dommage lié à l&rsquo;utilisation du
                site.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Liens hypertextes
              </h2>
              <p>
                Le site peut contenir des liens vers des sites tiers. UCLIC n&rsquo;exerce aucun
                contrôle sur ces sites et ne peut être tenu responsable de leur contenu ou
                politique de confidentialité.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Droit applicable et juridiction compétente
              </h2>
              <p>
                Les présentes <strong>mentions légales</strong> sont régies par le droit français.
                En cas de litige, une <strong>solution amiable</strong> sera recherchée avant tout{' '}
                <strong>recours judiciaire</strong>. À défaut, le <strong>tribunal compétent</strong>{' '}
                sera celui du <strong>lieu du siège social de l&rsquo;entreprise</strong>.
              </p>
            </article>

            {/* Footer note */}
            <div className="max-w-[960px] mx-auto mt-16 pt-8 border-t border-[color:var(--border-subtle)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13px] text-[color:var(--ink-muted)]">
              <span className="font-mono uppercase tracking-[0.18em]">
                Dernière mise à jour — 2026
              </span>
              <a
                href="/legal"
                className="inline-flex items-center gap-2 text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
              >
                ← Retour aux documents légaux
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
