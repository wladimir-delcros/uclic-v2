import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Cookies',
  description:
    "Politique de cookies UCLIC : informations sur les traceurs déposés sur le site, leurs finalités, leur durée de conservation et les moyens de gérer vos préférences.",
  alternates: { canonical: '/legal/cookies' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal/cookies`,
    title: 'Cookies | Uclic',
    description:
      "Politique de cookies UCLIC : informations sur les traceurs déposés sur le site, leurs finalités, leur durée de conservation et les moyens de gérer vos préférences.",
    locale: 'fr_FR',
    siteName: 'Agence Growth & IA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookies | Uclic',
    description:
      "Politique de cookies UCLIC : informations sur les traceurs déposés sur le site, leurs finalités, leur durée de conservation et les moyens de gérer vos préférences.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Documents légaux', item: `${SITE_URL}/legal` },
    { '@type': 'ListItem', position: 3, name: 'Cookies', item: `${SITE_URL}/legal/cookies` },
  ],
};

export default function CookiesPage() {
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
              <span className="text-[color:var(--ink)]">Cookies</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              TRACEURS ET COOKIES
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              Politique de{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                cookies
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <article className="article-body text-[17px] leading-relaxed text-[color:var(--ink)] space-y-6 max-w-[960px] mx-auto">
              <p>
                La présente politique a pour objet de vous informer des conditions
                d&rsquo;utilisation des cookies et autres traceurs déposés ou lus lors de votre
                navigation sur le site UCLIC, conformément au Règlement Général sur la Protection
                des Données (RGPD) et aux recommandations de la <strong>CNIL</strong>.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Qu&rsquo;est-ce qu&rsquo;un cookie ?
              </h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
                tablette, smartphone) lors de la consultation d&rsquo;un site web. Il permet au
                site de reconnaître votre navigateur, de mémoriser certaines informations (langue,
                session, préférences) et, selon sa finalité, de mesurer l&rsquo;audience ou de
                personnaliser des contenus.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Types de cookies utilisés
              </h2>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                1. <strong>Cookies strictement nécessaires</strong>
              </h3>
              <p>
                Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent
                d&rsquo;assurer la sécurité, la navigation entre les pages, la gestion de la
                session et la mémorisation de votre choix concernant le bandeau cookies. Ils ne
                requièrent pas votre consentement, conformément à l&rsquo;article 82 de la loi
                Informatique et Libertés.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                2. <strong>Cookies de mesure d&rsquo;audience</strong>
              </h3>
              <p>
                Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le
                site (pages vues, temps passé, source de trafic) afin d&rsquo;améliorer son
                contenu et son ergonomie. Lorsqu&rsquo;ils sont configurés conformément aux
                recommandations de la CNIL (anonymisation IP, absence de recoupement), ils peuvent
                être déposés sans consentement ; dans les autres cas, votre consentement est
                requis.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                3. <strong>Cookies de personnalisation</strong>
              </h3>
              <p>
                Ces cookies permettent d&rsquo;adapter le site à vos préférences (affichage,
                langue, contenu). Ils sont déposés uniquement avec votre consentement.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                4. <strong>Cookies marketing et publicitaires</strong>
              </h3>
              <p>
                Ces cookies, déposés par UCLIC ou par des partenaires tiers, permettent de mesurer
                l&rsquo;efficacité de nos campagnes publicitaires, de cibler des audiences sur les
                réseaux sociaux ou les régies publicitaires (Meta, Google Ads, LinkedIn, TikTok)
                et de proposer des contenus adaptés à vos centres d&rsquo;intérêt. Ils ne sont
                déposés qu&rsquo;après recueil de votre consentement explicite.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                5. <strong>Cookies de réseaux sociaux</strong>
              </h3>
              <p>
                Lorsque vous interagissez avec des boutons de partage ou des contenus intégrés
                issus de plateformes tierces (LinkedIn, YouTube, X, etc.), celles-ci peuvent
                déposer des cookies sur votre terminal. Ces cookies sont soumis à la politique de
                confidentialité des plateformes concernées.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Durée de conservation
              </h2>
              <p>
                Conformément aux recommandations de la CNIL, les cookies soumis à consentement
                sont conservés pour une durée maximale de <strong>13 mois</strong> à compter de
                leur dépôt. Les informations collectées via ces cookies sont conservées pour une
                durée maximale de <strong>25 mois</strong>. À l&rsquo;issue de ces durées, votre
                consentement sera à nouveau sollicité.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Gérer vos préférences
              </h2>
              <p>
                Vous pouvez à tout moment modifier vos choix en matière de cookies :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Via le bandeau cookies</strong> affiché sur le site, accessible depuis
                  le pied de page pour rouvrir les préférences.
                </li>
                <li>
                  <strong>Via votre navigateur</strong> : la plupart des navigateurs permettent de
                  refuser, supprimer ou être notifié lors du dépôt de cookies (Chrome, Firefox,
                  Safari, Edge).
                </li>
                <li>
                  <strong>Via les plateformes tierces</strong> : vous pouvez vous opposer au
                  traçage publicitaire sur www.youronlinechoices.com ou
                  optout.aboutads.info.
                </li>
              </ul>
              <p>
                Le refus des cookies non essentiels n&rsquo;empêche pas l&rsquo;accès au site.
                Toutefois, certaines fonctionnalités (mesure d&rsquo;audience détaillée,
                personnalisation, contenus intégrés) pourraient être limitées.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès, de
                rectification, d&rsquo;effacement, d&rsquo;opposition et de retrait de
                consentement concernant les données collectées via les cookies. Pour exercer ces
                droits, contactez-nous à{' '}
                <a
                  href="mailto:dpo@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  dpo@uclic.fr
                </a>
                . Pour en savoir plus sur nos engagements, consultez notre{' '}
                <a
                  href="/legal/politique-de-confidentialite"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  politique de confidentialité
                </a>{' '}
                et notre page{' '}
                <a
                  href="/legal/rgpd"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  conformité RGPD
                </a>
                . Vous pouvez également introduire une réclamation auprès de la{' '}
                <strong>CNIL</strong> (www.cnil.fr).
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Évolution de la politique
              </h2>
              <p>
                La présente politique de cookies peut être mise à jour à tout moment pour tenir
                compte des évolutions légales, techniques ou fonctionnelles du site. La date de
                dernière mise à jour figure ci-dessous.
              </p>
            </article>

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
