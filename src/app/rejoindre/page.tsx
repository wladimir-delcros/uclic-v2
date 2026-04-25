import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UserPlus,
  Video,
  ClipboardCheck,
  FileSignature,
  Users,
  Handshake,
  Wallet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const metadata: Metadata = {
  title: 'Rejoindre le collectif Freelance Uclic',
  description:
    "Rejoindre le collectif Uclic : candidature, assessment 30 min, cas pratique 5 jours, onboarding, missions et commissions sur apport d'affaires.",
  keywords: [
    'rejoindre uclic',
    'candidater uclic',
    'collectif freelance growth',
    'freelance growth marketing',
    'freelance IA',
    'apport d’affaires freelance',
    'commission freelance growth',
  ],
  alternates: { canonical: '/rejoindre' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/rejoindre`,
    title: 'Rejoindre le collectif Freelance Uclic',
    description:
      "Parcours candidature · assessment · cas pratique · onboarding · missions · apport d'affaires commissionné.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Uclic — Rejoindre le collectif' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rejoindre le collectif Freelance Uclic',
    description:
      "Candidature · assessment · cas pratique · onboarding · missions · commission apport d'affaires.",
    site: '@uclic_fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Collectif Freelance', item: `${SITE_URL}/charte-freelance` },
    { '@type': 'ListItem', position: 3, name: 'Rejoindre', item: `${SITE_URL}/rejoindre` },
  ],
};

const STEPS = [
  {
    n: '01',
    Icon: UserPlus,
    title: 'Candidature',
    body: 'Remplissez le formulaire : canal de spécialité (Inbound, Outbound, IA & Dev), 3 réalisations chiffrées, disponibilité. 3 minutes.',
    meta: 'Immédiat',
  },
  {
    n: '02',
    Icon: Video,
    title: 'Assessment visio',
    body: '30 min avec un Growth Lead senior. Pas un test technique piège — un vrai échange sur vos missions passées, vos méthodes, votre vision canal.',
    meta: 'Sous 5 jours',
  },
  {
    n: '03',
    Icon: ClipboardCheck,
    title: 'Cas pratique — payé',
    body: 'Brief réel (anonymisé) d’un client du pipe. Vous livrez sous 5 jours un plan chiffré + un preview d’exécution. Forfait 350 € HT versé à la remise.',
    meta: 'Livré sous 5 jours',
    featured: true,
  },
  {
    n: '04',
    Icon: FileSignature,
    title: 'Onboarding + signature',
    body: 'Contrat cadre signé en ligne (Yousign). Accès Slack, bibliothèque d’agents IA, templates outbound, CRM commun. Un parrain senior vous guide le premier mois.',
    meta: '48 h après cas',
  },
  {
    n: '05',
    Icon: Users,
    title: 'Distribution des missions',
    body: 'Matching automatique sur vos créneaux + expertises. 2 à 4 briefs qualifiés/mois. Vous choisissez ce qui vous inspire — jamais d’obligation.',
    meta: 'En continu',
  },
  {
    n: '06',
    Icon: Handshake,
    title: 'Apport d’affaires commissionné',
    body: 'Vous orientez un prospect vers un pair plus pertinent ? Vous touchez 10 % du CA HT sur les 12 premiers mois. Win-win qui fidélise le collectif.',
    meta: 'Récurrent',
  },
];

const PERKS = [
  {
    Icon: Sparkles,
    title: 'Agents IA & workflows n8n partagés',
    body: 'Bibliothèque vivante de prompts, agents et workflows en prod chez nos clients. Moyenne observée : −70 % de temps manuel côté exécution.',
  },
  {
    Icon: Wallet,
    title: 'Commission sur l’apport d’affaires',
    body: '10 % du CA HT réalisé sur les 12 premiers mois avec le prospect que vous amenez. Payé mensuellement, transparence totale côté Slack.',
  },
  {
    Icon: CheckCircle2,
    title: 'Pipe commercial mutualisé',
    body: 'Plus d’appels à froid pour décrocher vos missions : vous recevez des briefs pré-qualifiés par un Growth Lead senior. Concentrez votre énergie sur la livraison.',
  },
];

const FAQ = [
  {
    q: 'Combien de missions par mois ?',
    a: 'Dépend de votre dispo et expertise. Moyenne : 2 à 4 briefs qualifiés par mois. Vous choisissez ce que vous acceptez — jamais de pression ni de quota imposé.',
  },
  {
    q: 'Quel est le calcul de la commission sur apport d’affaires ?',
    a: 'Par défaut : 10 % du CA HT réalisé sur les 12 premiers mois avec le prospect que vous avez amené. Négociable à la hausse selon maturité du lead. Payé mensuellement, transparent côté Slack.',
  },
  {
    q: 'Le cas pratique est-il payé ?',
    a: 'Oui. Forfait fixe (350 € HT) pour le cas pratique, versé à la remise du livrable — même si on ne travaille pas ensemble ensuite. On respecte votre temps.',
  },
  {
    q: 'Quels profils recherchez-vous ?',
    a: 'Freelances seniors (5+ ans XP) sur un des 3 piliers Uclic : Inbound (SEO, Ads, contenu), Outbound (prospection multi-canale, SDR, cold email), IA & Dev (agents IA, n8n, Next.js, data apps).',
  },
  {
    q: 'Exclusivité demandée ?',
    a: 'Non. Vous gardez vos clients directs, votre marque, vos canaux. On co-existe. La seule contrainte : ne pas prospecter un client actif du collectif pour le même périmètre.',
  },
  {
    q: 'Y a-t-il un engagement minimum ?',
    a: 'Aucun. Pas d’engagement mensuel, pas de minimum de mission. Le contrat cadre reste actif tant que ça vous sert — vous partez quand vous voulez, sans justification.',
  },
];

const APPLY_MAILTO =
  'mailto:hello@uclic.fr?subject=Candidature%20collectif%20Uclic&body=Bonjour%2C%0A%0AJe%20souhaite%20candidater%20au%20collectif%20freelance%20Uclic.%0A%0APilier%20cibl%C3%A9%20%3A%20%5BInbound%20%2F%20Outbound%20%2F%20IA%20%26%20Dev%5D%0ACanal%20de%20sp%C3%A9cialit%C3%A9%20%3A%20%5Bex%20%3A%20SEO%2C%20Google%20Ads%2C%20agents%20IA%2C%20cold%20email...%5D%0A3%20r%C3%A9alisations%20chiffr%C3%A9es%20%3A%0A%20%201.%20%0A%20%202.%20%0A%20%203.%20%0ADisponibilit%C3%A9%20%3A%20%5Bjours%2Fmois%5D%0ALinkedIn%20%2F%20Portfolio%20%3A%20%0A%0AMerci%20!';

const CTA_GRADIENT_STYLE = {
  borderRadius: '6px',
  color: 'var(--accent-ink)',
  background:
    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
} as const;

export default function RejoindrePage() {
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
        {/* Header éditorial — pattern home canon (eyebrow centré + 2 filets + h1 center) */}
        <section className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Rejoindre le collectif
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h1 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto leading-[1.1]">
              Un parcours simple,{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                transparent.
              </span>
            </h1>
            <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[680px] mx-auto leading-relaxed">
              6 étapes pour rejoindre le collectif. Zéro engagement, zéro exclusivité,
              et même le cas pratique est payé. On respecte votre temps — on attend la
              même rigueur sur nos briefs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#candidater"
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold hover:scale-[1.02] transition-transform"
                style={CTA_GRADIENT_STYLE}
                data-ga-event="cta_click"
                data-ga-cta-name="apply-collectif-hero"
                data-ga-cta-location="rejoindre"
              >
                Candidater
                <ArrowRight size={14} strokeWidth={2} />
              </a>
              <Link
                href="/charte-freelance"
                className="inline-flex items-center gap-2 px-5 py-3 text-[13px] text-[color:var(--ink)] border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
              >
                Lire la lettre au collectif
              </Link>
            </div>
          </div>
        </section>

        {/* Timeline 6 étapes — bento home canon (grid md:cols-3, !rounded-none, border-r/border-b, card-elev-1).
            Pas de 2e header : la hero ci-dessus pose déjà la promesse "parcours simple & transparent". */}
        <section className="relative pt-4 lg:pt-6 pb-20 lg:pb-28 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <ol className="grid md:grid-cols-2 lg:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
              {STEPS.map((s, i) => {
                const isRightMostLg = (i + 1) % 3 === 0;
                const isRightMostMd = (i + 1) % 2 === 0;
                const isLastRowLg = i >= STEPS.length - (STEPS.length % 3 === 0 ? 3 : STEPS.length % 3);
                const isLastRowMd = i >= STEPS.length - (STEPS.length % 2 === 0 ? 2 : STEPS.length % 2);
                return (
                  <li
                    key={s.n}
                    className={`group relative p-8 flex flex-col !rounded-none transition-colors duration-300 ${
                      s.featured
                        ? 'bg-[color:var(--card-elev-2)] light:bg-[color:var(--accent)]/5'
                        : 'bg-[color:var(--card-elev-1)] light:bg-white'
                    } ${!isRightMostMd ? 'md:border-r md:border-[color:var(--border-subtle)]' : ''} ${
                      isRightMostLg ? 'lg:!border-r-0' : 'lg:border-r lg:border-[color:var(--border-subtle)]'
                    } ${!isLastRowMd ? 'border-b border-[color:var(--border-subtle)]' : ''} ${
                      isLastRowLg ? 'lg:!border-b-0' : ''
                    }`}
                  >
                    {s.featured && (
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 right-0 h-px bg-[color:var(--accent)]"
                      />
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-dim)]">
                        Étape {s.n}
                      </span>
                      <div
                        className={`w-11 h-11 grid place-items-center border transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] ${
                          s.featured
                            ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent)]/30'
                            : 'bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20'
                        }`}
                      >
                        <s.Icon size={20} strokeWidth={1.75} />
                      </div>
                    </div>
                    <h3 className="mt-6 text-[22px] font-display font-medium text-[color:var(--ink)] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] text-[color:var(--ink)] leading-[1.6]">
                      {s.body}
                    </p>
                    <div className="mt-auto pt-6 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-dim)]">
                      {s.meta}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Ce que vous gagnez — bento 3 cols home canon */}
        <section className="relative pt-12 lg:pt-16 pb-20 lg:pb-28 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Ce que vous gagnez
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto leading-[1.1]">
              Un collectif qui vous{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                amplifie
              </span>
            </h2>

            <ul className="mt-14 grid md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
              {PERKS.map((p, i) => (
                <li
                  key={p.title}
                  className={`group p-8 flex flex-col !rounded-none bg-[color:var(--card-elev-1)] light:bg-white transition-colors duration-300 ${
                    i < PERKS.length - 1 ? 'md:border-r md:border-[color:var(--border-subtle)]' : ''
                  } ${i !== PERKS.length - 1 ? 'border-b md:border-b-0 border-[color:var(--border-subtle)]' : ''}`}
                >
                  <div className="w-11 h-11 grid place-items-center bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20">
                    <p.Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 text-[22px] font-display font-medium leading-tight">{p.title}</h3>
                  <p className="mt-3 text-[15px] text-[color:var(--ink)] leading-[1.6]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ — clone exact du pattern FaqSection home (container 980, card bg, padding 8/10, Plus lucide) */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="max-w-[980px] mx-auto px-5 lg:px-10 relative">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" /> FAQ <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
              Les questions qu&apos;on nous pose{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                souvent.
                <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>
            <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
              Tout ce qu&apos;on nous demande avant de candidater. Si la vôtre n&apos;y est pas, écrivez-nous.
            </p>

            <div className="mt-14 !rounded-none !p-0 overflow-hidden border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white">
              {FAQ.map((f, i) => (
                <details key={f.q} className="group">
                  <summary
                    className={`px-8 lg:px-10 py-6 flex items-center justify-between gap-6 cursor-pointer list-none ${
                      i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
                    } hover:bg-[color:var(--card)]`}
                  >
                    <span className="text-[16px] font-medium pr-4 leading-snug">{f.q}</span>
                    <Plus
                      size={18}
                      strokeWidth={2}
                      className="text-[color:var(--accent)] transition-transform duration-300 group-open:rotate-45 shrink-0"
                    />
                  </summary>
                  <div className="px-8 lg:px-10 pb-7 pt-1 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[780px]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>

            <p className="mt-14 text-center text-[14px] text-[color:var(--ink-muted)]">
              Une question spécifique ? Posez-la par mail — réponse sous 24 h ouvrées.
            </p>
          </div>
        </section>

        {/* CTA candidater — card canon home */}
        <section id="candidater" className="relative pt-12 lg:pt-16 pb-24 lg:pb-32 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[760px] mx-auto relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Étape 01 — Candidater
              </div>
              <h2 className="mt-4 text-[clamp(28px,3.4vw,40px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
                Prêt·e à rejoindre le{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                  collectif
                </span>
                &nbsp;?
              </h2>
              <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-[1.6]">
                3 minutes pour candidater. Réponse sous 5 jours ouvrés. Peu importe où
                vous êtes en France (ou ailleurs) — on est remote-first depuis le jour 1.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold hover:scale-[1.02] transition-transform"
                  style={CTA_GRADIENT_STYLE}
                  data-ga-event="cta_click"
                  data-ga-cta-name="apply-collectif-form"
                  data-ga-cta-location="rejoindre-bottom"
                >
                  Envoyer ma candidature
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                >
                  Une question avant ? Écris-nous →
                </Link>
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
