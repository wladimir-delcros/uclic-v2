import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'RGPD',
  description:
    'Politique de protection des données personnelles et conformité RGPD de UCLIC. Découvrez nos engagements en matière de confidentialité et vos droits concernant vos données.',
  alternates: { canonical: `${SITE_URL}/legal/rgpd` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/legal/rgpd`,
    title: 'RGPD | Uclic',
    description:
      'Politique de protection des données personnelles et conformité RGPD de UCLIC. Découvrez nos engagements en matière de confidentialité et vos droits concernant vos données.',
    locale: 'fr_FR',
    siteName: 'Agence Growth & IA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RGPD | Uclic',
    description:
      'Politique de protection des données personnelles et conformité RGPD de UCLIC. Découvrez nos engagements en matière de confidentialité et vos droits concernant vos données.',
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Documents légaux', item: `${SITE_URL}/legal` },
    { '@type': 'ListItem', position: 3, name: 'RGPD', item: `${SITE_URL}/legal/rgpd` },
  ],
};

export default function RGPDPage() {
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
              <span className="text-[color:var(--ink)]">RGPD</span>
            </nav>

            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              PROTECTION DES DONNÉES
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
              Conformité{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                RGPD
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
                Protection des Données (RGPD), en garantissant une transparence totale sur la
                collecte, l&rsquo;utilisation et la conservation des informations personnelles.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Respect des principes fondamentaux du RGPD
              </h2>
              <p>
                Nous avons mis en place des mesures strictes pour assurer la conformité de
                Uclic.fr avec les principes du RGPD, notamment :
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                1. <strong>Licéité, loyauté et transparence</strong>
              </h3>
              <p>
                Nous collectons uniquement les données nécessaires à l&rsquo;utilisation de notre
                plateforme et informons clairement nos utilisateurs sur l&rsquo;usage de leurs
                informations personnelles.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                2. <strong>Limitation des finalités</strong>
              </h3>
              <p>
                Les données sont collectées dans un but déterminé, explicite et légitime. Nous ne
                traitons pas les informations personnelles à des fins incompatibles avec ces
                objectifs.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                3. <strong>Minimisation des données</strong>
              </h3>
              <p>
                Nous nous assurons de ne collecter que les informations strictement nécessaires à
                nos services, en évitant toute collecte excessive.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                4. <strong>Exactitude et mise à jour des données</strong>
              </h3>
              <p>
                Nous veillons à ce que les données personnelles enregistrées soient exactes et
                mises à jour régulièrement.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                5. <strong>Limitation de la conservation</strong>
              </h3>
              <p>
                Les données ne sont conservées que pour la durée nécessaire aux traitements
                définis, conformément aux exigences légales et réglementaires.
              </p>

              <h3 className="text-[clamp(20px,2vw,24px)] font-display font-medium tracking-[-0.01em] mt-6 mb-3">
                6. <strong>Intégrité et confidentialité</strong>
              </h3>
              <p>
                Nous avons mis en place des mesures de sécurité avancées pour protéger les données
                contre tout accès non autorisé, perte, altération ou divulgation.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Droits des utilisateurs et contrôle sur les données
              </h2>
              <p>
                En tant qu&rsquo;utilisateur de Uclic.fr, vous disposez de droits clairs et
                accessibles concernant vos données personnelles :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Droit d&rsquo;accès</strong> : Vous pouvez demander une copie de vos
                  données personnelles que nous détenons.
                </li>
                <li>
                  <strong>Droit de rectification</strong> : Vous pouvez corriger toute information
                  inexacte ou incomplète.
                </li>
                <li>
                  <strong>Droit à l&rsquo;effacement</strong> : Vous pouvez demander la suppression
                  de vos données sous certaines conditions.
                </li>
                <li>
                  <strong>Droit à la portabilité</strong> : Vous pouvez récupérer vos données dans
                  un format lisible et les transmettre à un autre prestataire.
                </li>
                <li>
                  <strong>Droit d&rsquo;opposition et de limitation du traitement</strong> : Vous
                  pouvez vous opposer à l&rsquo;utilisation de vos données ou en limiter le
                  traitement.
                </li>
                <li>
                  <strong>Droit au retrait du consentement</strong> : Vous pouvez retirer votre
                  consentement à tout moment pour les traitements basés sur celui-ci.
                </li>
              </ul>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Mesures de sécurité et collaboration avec nos partenaires
              </h2>
              <p>
                Nous avons mis en place des protocoles de sécurité robustes pour garantir la
                protection des données, notamment :
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Contrôles d&rsquo;accès rigoureux</li>
                <li>Audits réguliers de nos systèmes et processus</li>
                <li>
                  Stockage des données sur des serveurs sécurisés situés dans l&rsquo;Union
                  Européenne
                </li>
              </ul>
              <p>
                Nous travaillons uniquement avec des partenaires conformes au RGPD et exigeons
                d&rsquo;eux le respect des mêmes normes strictes en matière de protection des
                données.
              </p>

              <h2 className="text-[clamp(24px,2.6vw,32px)] font-display font-medium tracking-[-0.01em] mt-10 mb-4">
                Contact et Délégué à la Protection des Données (DPO)
              </h2>
              <p>
                Si vous avez des questions concernant notre conformité au RGPD ou si vous
                souhaitez exercer vos droits, vous pouvez contacter notre Délégué à la Protection
                des Données (DPO) à l&rsquo;adresse suivante :{' '}
                <a
                  href="mailto:dpo@uclic.fr"
                  className="text-[color:var(--accent)] underline decoration-[color:var(--accent)]/40 underline-offset-4 hover:decoration-[color:var(--accent)] transition-colors"
                >
                  <strong>dpo@uclic.fr</strong>
                </a>
                .
              </p>
              <p>
                Chez Uclic.fr, nous nous engageons à protéger vos données personnelles et à vous
                offrir une expérience en toute sécurité. Notre conformité au RGPD est un
                engagement fort envers nos utilisateurs et partenaires.
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
