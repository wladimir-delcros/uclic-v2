import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité UCLIC : informations sur la collecte, l'utilisation, la conservation et la protection des données personnelles des utilisateurs du site.",
  alternates: { canonical: `${SITE_URL}/legal/politique-de-confidentialite` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal/politique-de-confidentialite`,
    title: 'Politique de confidentialité | Uclic',
    description:
      "Politique de confidentialité UCLIC : informations sur la collecte, l'utilisation, la conservation et la protection des données personnelles des utilisateurs du site.",
    locale: 'fr_FR',
    siteName: 'Agence Growth & IA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique de confidentialité | Uclic',
    description:
      "Politique de confidentialité UCLIC : informations sur la collecte, l'utilisation, la conservation et la protection des données personnelles des utilisateurs du site.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Documents légaux', item: `${SITE_URL}/legal` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Politique de confidentialité',
      item: `${SITE_URL}/legal/politique-de-confidentialite`,
    },
  ],
};

export default function PolitiqueConfidentialitePage() {
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
          <div className="max-w-[860px] mx-auto px-5 lg:px-8 relative">
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
              <span className="text-[color:var(--ink)]">Politique de confidentialité</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              DONNÉES PERSONNELLES
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              Politique de{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                confidentialité
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-[860px] mx-auto px-5 lg:px-8">
            <article className="text-[17px] leading-relaxed text-[color:var(--ink)] space-y-6">
              <p>
                Chez Uclic.fr, la protection des données personnelles de nos utilisateurs est une
                priorité absolue. Nous nous engageons à respecter le Règlement Général sur la
                Protection des Données (RGPD) ainsi que la loi n° 78-17 du 6 janvier 1978
                modifiée, en garantissant une transparence totale sur la collecte,
                l&rsquo;utilisation et la conservation des informations personnelles.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données collectées sur le site est{' '}
                <strong>DELCROS Wladimir (UCLIC)</strong>, entreprise individuelle immatriculée
                sous le SIREN <strong>827 553 371</strong>, dont le siège social est situé
                L&rsquo;Alauzet, 12520 Paulhe, France. Pour toute question relative au traitement
                de vos données, vous pouvez contacter le Délégué à la Protection des Données à
                l&rsquo;adresse{' '}
                <a
                  href="mailto:dpo@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  dpo@uclic.fr
                </a>
                .
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Données collectées
              </h2>
              <p>
                Nous ne collectons que les données strictement nécessaires à la fourniture de nos
                services et au bon fonctionnement du site :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Données d&rsquo;identification</strong> : nom, prénom, adresse email,
                  numéro de téléphone, nom de l&rsquo;entreprise, fonction.
                </li>
                <li>
                  <strong>Données de connexion</strong> : adresse IP, type de navigateur, système
                  d&rsquo;exploitation, pages consultées, durée de visite, source de trafic.
                </li>
                <li>
                  <strong>Données relatives à la relation commerciale</strong> : échanges email,
                  devis, contrats, factures.
                </li>
                <li>
                  <strong>Données de communication</strong> : contenu des messages adressés via
                  les formulaires de contact.
                </li>
              </ul>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Finalités et bases légales
              </h2>
              <p>
                Vos données sont traitées pour des finalités déterminées, explicites et
                légitimes :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Exécution contractuelle</strong> : répondre à vos demandes, établir des
                  devis, fournir et facturer les prestations.
                </li>
                <li>
                  <strong>Intérêt légitime</strong> : prospection commerciale B2B, amélioration
                  des services, mesure d&rsquo;audience anonymisée, sécurité du site.
                </li>
                <li>
                  <strong>Consentement</strong> : envoi de newsletters, dépôt de cookies non
                  essentiels, communications marketing.
                </li>
                <li>
                  <strong>Obligation légale</strong> : conservation des données de facturation et
                  comptables.
                </li>
              </ul>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Durée de conservation
              </h2>
              <p>
                Les données ne sont conservées que pour la durée nécessaire aux finalités du
                traitement :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Prospects</strong> : 3 ans à compter du dernier contact.
                </li>
                <li>
                  <strong>Clients</strong> : pendant la durée de la relation commerciale, puis 3
                  ans à des fins de prospection.
                </li>
                <li>
                  <strong>Documents comptables et contractuels</strong> : 10 ans conformément aux
                  obligations légales.
                </li>
                <li>
                  <strong>Cookies</strong> : 13 mois maximum à compter du dépôt.
                </li>
                <li>
                  <strong>Logs de connexion</strong> : 12 mois maximum.
                </li>
              </ul>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Destinataires des données
              </h2>
              <p>
                Vos données sont exclusivement destinées à UCLIC et à ses sous-traitants agissant
                pour son compte, sélectionnés pour leur conformité au RGPD (hébergeur, outils
                d&rsquo;emailing, CRM, outils d&rsquo;analytics). Elles ne sont ni vendues ni
                louées à des tiers. Un transfert hors Union Européenne n&rsquo;intervient que
                lorsqu&rsquo;il est encadré par les garanties appropriées (clauses contractuelles
                types de la Commission européenne).
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants sur vos données
                personnelles :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Droit d&rsquo;accès</strong> : obtenir une copie des données vous
                  concernant.
                </li>
                <li>
                  <strong>Droit de rectification</strong> : corriger toute donnée inexacte ou
                  incomplète.
                </li>
                <li>
                  <strong>Droit à l&rsquo;effacement</strong> : demander la suppression de vos
                  données sous certaines conditions.
                </li>
                <li>
                  <strong>Droit à la limitation</strong> : restreindre temporairement le
                  traitement.
                </li>
                <li>
                  <strong>Droit à la portabilité</strong> : récupérer vos données dans un format
                  structuré, couramment utilisé et lisible par machine.
                </li>
                <li>
                  <strong>Droit d&rsquo;opposition</strong> : vous opposer au traitement,
                  notamment à la prospection.
                </li>
                <li>
                  <strong>Droit de retrait du consentement</strong> : à tout moment, pour les
                  traitements basés sur celui-ci.
                </li>
                <li>
                  <strong>Droit de définir des directives post-mortem</strong> concernant le sort
                  de vos données.
                </li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à{' '}
                <a
                  href="mailto:dpo@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  dpo@uclic.fr
                </a>{' '}
                en joignant un justificatif d&rsquo;identité. Vous disposez également du droit
                d&rsquo;introduire une réclamation auprès de la <strong>CNIL</strong>{' '}
                (www.cnil.fr) si vous estimez que le traitement de vos données n&rsquo;est pas
                conforme à la réglementation.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Sécurité des données
              </h2>
              <p>
                UCLIC met en œuvre des mesures techniques et organisationnelles appropriées pour
                garantir la sécurité et la confidentialité de vos données : chiffrement des
                communications (HTTPS), contrôles d&rsquo;accès stricts, sauvegardes régulières,
                audits de sécurité, hébergement sur des serveurs situés dans l&rsquo;Union
                Européenne.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Cookies
              </h2>
              <p>
                Le site utilise des cookies pour son bon fonctionnement, la mesure
                d&rsquo;audience et, sous réserve de votre consentement, à des fins marketing.
                Pour en savoir plus et gérer vos préférences, consultez notre{' '}
                <a
                  href="/legal/cookies"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  politique de cookies
                </a>
                .
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Modification de la politique
              </h2>
              <p>
                La présente politique de confidentialité peut être mise à jour à tout moment pour
                refléter les évolutions légales, techniques ou organisationnelles. La date de
                dernière mise à jour est indiquée ci-dessous. En cas de modification
                substantielle, nous en informerons les utilisateurs par tout moyen approprié.
              </p>
            </article>

            <div className="mt-16 pt-8 border-t border-[color:var(--border-subtle)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13px] text-[color:var(--ink-muted)]">
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
