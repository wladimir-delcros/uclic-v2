import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description:
    "Conditions Générales de Vente (CGV) UCLIC : tarifs, modalités de paiement, délais de réalisation et conditions d'utilisation de nos services.",
  alternates: { canonical: '/legal/conditions-generales-de-vente' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal/conditions-generales-de-vente`,
    title: 'Conditions Générales de Vente | Uclic',
    description:
      "Conditions Générales de Vente (CGV) UCLIC : tarifs, modalités de paiement, délais de réalisation et conditions d'utilisation de nos services.",
    locale: 'fr_FR',
    siteName: 'Agence Growth & IA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conditions Générales de Vente | Uclic',
    description:
      "Conditions Générales de Vente (CGV) UCLIC : tarifs, modalités de paiement, délais de réalisation et conditions d'utilisation de nos services.",
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
      name: 'Conditions Générales de Vente',
      item: `${SITE_URL}/legal/conditions-generales-de-vente`,
    },
  ],
};

export default function CGVPage() {
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
              <span className="text-[color:var(--ink)]">CGV</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              CGV
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              Conditions générales de{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                vente
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>
          </div>
        </section>

        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <article className="article-body text-[17px] leading-relaxed text-[color:var(--ink)] space-y-6 max-w-[960px] mx-auto">
              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 1 : Objet
              </h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) définissent les termes et
                conditions selon lesquels l&rsquo;entreprise <strong>DELCROS Wladimir (UCLIC)</strong>{' '}
                fournit des services de{' '}
                <strong>
                  création de sites internet, webmarketing, design, gestion des réseaux sociaux et
                  référencement
                </strong>{' '}
                à ses clients.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 2 : Identification du prestataire
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
                <strong>Contact :</strong>{' '}
                <a
                  href="mailto:contact@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  contact@uclic.fr
                </a>
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 3 : Services proposés
              </h2>
              <p>UCLIC propose une gamme de services incluant :</p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                Création et développement de sites internet
              </h3>
              <p>Développement sur mesure, refonte, intégration de solutions CMS.</p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                Stratégies de webmarketing
              </h3>
              <p>Campagnes publicitaires, génération de leads, automatisation marketing.</p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                Conception graphique (design)
              </h3>
              <p>Création d&rsquo;identité visuelle, supports digitaux et print.</p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                Gestion et animation des réseaux sociaux
              </h3>
              <p>Community management, planification de contenu, engagement.</p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                Optimisation pour les moteurs de recherche (SEO)
              </h3>
              <p>Audit SEO, optimisation on-page et off-page, stratégies de contenu.</p>

              <p>
                Les caractéristiques détaillées de chaque service sont disponibles sur le site
                internet d&rsquo;UCLIC.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 4 : Tarifs
              </h2>
              <p>
                Les tarifs des services sont exprimés en <strong>euros</strong> et peuvent être{' '}
                <strong>soumis à la TVA</strong>. UCLIC se réserve le droit de modifier ses tarifs
                à tout moment. Toutefois, les prix appliqués seront ceux en vigueur{' '}
                <strong>au moment de la signature du devis ou du contrat</strong>.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 5 : Commande et validation
              </h2>
              <p>
                Toute commande de services fait l&rsquo;objet d&rsquo;un <strong>devis détaillé</strong>.
                La validation du devis par le client entraîne{' '}
                <strong>l&rsquo;acceptation des présentes CGV</strong>.
              </p>
              <p>
                Un <strong>acompte</strong> peut être demandé lors de la commande, son montant
                étant précisé dans le devis.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 6 : Modalités de paiement
              </h2>
              <p>
                Le solde est exigible selon les{' '}
                <strong>modalités définies dans le devis ou le contrat</strong>.
              </p>
              <p>
                Les <strong>modes de paiement acceptés</strong> sont précisés dans ces documents.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 7 : Délais de réalisation
              </h2>
              <p>
                Les <strong>délais de réalisation</strong> des services sont donnés à titre
                indicatif et peuvent varier selon la complexité du projet. UCLIC s&rsquo;engage à
                informer le client de <strong>tout retard éventuel</strong>.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 8 : Droit de rétractation
              </h2>
              <p>
                Conformément à <strong>l&rsquo;article L. 221-18 du Code de la consommation</strong>,
                le client dispose d&rsquo;un délai de <strong>14 jours</strong> pour exercer son
                droit de rétractation à compter de la signature du contrat, sauf si
                l&rsquo;exécution des services a commencé avec l&rsquo;accord préalable du client.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 9 : Responsabilité
              </h2>
              <p>
                UCLIC s&rsquo;engage à fournir ses services avec{' '}
                <strong>diligence et professionnalisme</strong>. Toutefois, sa responsabilité ne
                pourra être engagée en cas de :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Faute, négligence ou omission du client</strong>
                </li>
                <li>
                  <strong>
                    Force majeure ou tout événement extérieur indépendant de la volonté de UCLIC
                  </strong>
                </li>
              </ul>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 10 : Propriété intellectuelle
              </h2>
              <p>
                Sauf mention contraire,{' '}
                <strong>UCLIC conserve la propriété intellectuelle des créations réalisées</strong>.
                Le client bénéficie d&rsquo;un <strong>droit d&rsquo;utilisation</strong> dans le
                cadre défini par le contrat.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 11 : Données personnelles
              </h2>
              <p>
                UCLIC s&rsquo;engage à respecter la confidentialité des données personnelles du
                client, conformément à{' '}
                <strong>
                  la loi n° 78-17 du 6 janvier 1978 modifiée et au Règlement Général sur la
                  Protection des Données (RGPD)
                </strong>
                .
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Article 12 : Litiges
              </h2>
              <p>
                Les présentes CGV sont <strong>régies par le droit français</strong>. En cas de
                litige, les parties s&rsquo;engagent à rechercher{' '}
                <strong>une solution amiable</strong> avant toute saisine des tribunaux compétents.
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
