import Link from 'next/link';
import {
  Search,
  Send,
  Cpu,
  Funnel,
  LineChart,
  Map,
  Wallet,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import CornerCross from '../ui/CornerCross';
import SectionAmbience from '../ui/SectionAmbience';
import AuditFaq from './AuditFaq';

/* ──────────────────────────────────────────────────────────────────
 * Section 1 : Promesse — ce qu'on regarde concrètement
 * ────────────────────────────────────────────────────────────────── */

const PROMESSE = [
  {
    eyebrow: 'Acquisition',
    title: 'D\'où viennent vos prospects',
    desc: "SEO (santé technique, intent gap, contenu qui ranke ou pas), Google/Meta/LinkedIn Ads (CAC réel par campagne, structure de comptes, attribution), outbound multicanal (qualité base, taux de réponse, séquences). On regarde tout, on chiffre tout.",
  },
  {
    eyebrow: 'Conversion',
    title: 'Pourquoi vos visiteurs ne signent pas',
    desc: "Funnel page par page, taux d'abandon par étape, qualité des landing, message-match avec vos ads, friction formulaire, vitesse réelle terrain (Core Web Vitals + INP). On identifie les fuites coûteuses.",
  },
  {
    eyebrow: 'Rétention & pilotage',
    title: 'Ce que vous mesurez vraiment',
    desc: "KPIs pipeline (MQL/SQL/Win rate), CAC par canal, LTV par segment, cohortes, attribution multi-touch. On audite votre stack analytics (GA4, Mixpanel, Amplitude, Segment) et la qualité des données décisionnelles.",
  },
  {
    eyebrow: 'IA & agents',
    title: 'Où l\'IA peut vous faire gagner du temps',
    desc: "Use-cases identifiables sous 90 jours : enrichissement leads, scoring, personnalisation outbound, agents support, génération de contenu, automatisation interne. Estimé en heures gagnées par mois et budget de mise en prod.",
  },
  {
    eyebrow: 'Stack tech',
    title: 'Ce qui freine votre exécution',
    desc: "CRM (HubSpot/Salesforce/Pipedrive), prospection (Lemlist/LGM/Instantly), orchestration (n8n/Make/Zapier), enrichissement (Clay/Apollo). On dit ce qui marche, ce qui doit dégager, et ce qui manque clairement.",
  },
];

function PromesseSection() {
  return (
    <section id="promesse-audit" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <SectionAmbience variant="soft" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Ce qu'on regarde
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Cinq angles d'attaque,{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              tous chiffrés.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] leading-relaxed">
            Pas de rapport générique de 80 pages que personne ne lit. On cible les cinq zones où votre ROI growth se joue — et on les chiffre.
          </p>
        </div>

        <ol className="mt-14 border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white !rounded-none">
          {PROMESSE.map((p, i) => (
            <li
              key={p.title}
              className={`grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 p-7 lg:p-9 ${
                i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
              }`}>
              <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] md:pt-1">
                {p.eyebrow}
              </div>
              <div className="min-w-0">
                <h3 className="text-[20px] lg:text-[22px] font-display font-medium leading-tight text-[color:var(--ink)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] text-[color:var(--ink-muted)] leading-[1.65]">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section 2 : Livrables concrets — bento corner-cross 7 cards
 * ────────────────────────────────────────────────────────────────── */

const LIVRABLES = [
  {
    icon: Search,
    title: 'Audit acquisition',
    desc: 'Diagnostic SEO + Ads + Outbound chiffré, fuites identifiées, leviers prioritaires, estimation upside.',
    featured: false,
  },
  {
    icon: Funnel,
    title: 'Audit conversion',
    desc: 'Funnel page par page, taux d\'abandon, friction landing, message-match ads → page, vitesse mobile.',
    featured: false,
  },
  {
    icon: LineChart,
    title: 'Audit pilotage',
    desc: 'Stack analytics, qualité des KPIs (MQL/SQL/CAC/LTV), reporting hebdo prêt à déployer.',
    featured: false,
  },
  {
    icon: Cpu,
    title: 'Audit IA & agents',
    desc: 'Use-cases identifiés sous 90j : enrichissement, scoring, outbound IA, agents support. Heures gagnées chiffrées.',
    featured: true,
  },
  {
    icon: Send,
    title: 'Audit stack technique',
    desc: 'CRM, prospection, orchestration, enrichissement : ce qui marche, ce qui dégage, ce qui manque.',
    featured: false,
  },
  {
    icon: Map,
    title: 'Roadmap 90 jours',
    desc: 'Quick wins 30j + chantiers structurants. Priorisée ICE, ressources et budget estimés sprint par sprint.',
    featured: false,
  },
  {
    icon: Wallet,
    title: 'Budget media optimisé',
    desc: "Réallocation Google/Meta/LinkedIn par campagne. Combien retirer, combien injecter, où, sur quels signaux d'achat.",
    featured: false,
  },
];

function LivrablesSection() {
  return (
    <section id="livrables-audit" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Livrables concrets
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Sept livrables,{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              48 h chrono.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] leading-relaxed">
            Tout ce que vous recevez à la fin des 48h. Documents activables tels quels — pas de "synthèse executive" qui dort dans Drive.
          </p>
        </div>

        {/* Bento 4×2 (7 items + featured) — corner-cross aux intersections */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '25%', top: '0%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '50%', top: '0%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '75%', top: '0%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '25%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} accent className="hidden lg:block absolute z-[2]" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '25%', top: '100%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '50%', top: '100%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden lg:block absolute z-[2]" style={{ left: '75%', top: '100%', transform: 'translate(-50%, -50%)' }} />

          {LIVRABLES.map((l, i) => {
            // 7 items dans une grille 4 cols : derniers 3 sur la 2e ligne
            const isLastInRow = (i + 1) % 4 === 0;
            const isLastRow = i >= 4;
            return (
              <article
                key={l.title}
                className={`group p-7 flex flex-col relative overflow-hidden transition-colors duration-300 !rounded-none border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white ${
                  !isLastInRow ? 'lg:border-r' : ''
                } ${!isLastRow ? 'border-b lg:border-b' : 'border-b lg:border-b-0'} ${
                  i % 2 === 0 ? 'md:border-r' : ''
                }`}>
                <div
                  className={`w-11 h-11 grid place-items-center border transition-all duration-300 group-hover:scale-[1.06] group-hover:rotate-[-4deg] ${
                    l.featured
                      ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent)]/30'
                      : 'bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20'
                  }`}>
                  <l.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-[18px] font-display font-medium leading-tight">{l.title}</h3>
                <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-[1.6]">{l.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section 3 : Process — 4 étapes
 * ────────────────────────────────────────────────────────────────── */

const PROCESS_AUDIT = [
  {
    n: '01',
    title: 'Brief — 30 min',
    desc: "Visio avec un Growth Lead senior. On capte cible, produit, ACV, canaux actuels, frustrations. Vous nous donnez accès lecture aux dashboards : GA4, Search Console, Ads, CRM.",
  },
  {
    n: '02',
    title: 'Analyse — 24-36 h',
    desc: 'On épluche votre stack : SEO technique, comptes Ads, séquences outbound, funnel, attribution, IA. Reco chiffrées sur tableurs partagés. Pas de copier-coller de checklists génériques.',
  },
  {
    n: '03',
    title: 'Restitution — visio 60 min',
    desc: "On déroule les fuites identifiées, les leviers prioritaires, les chiffres. Vous challengez en direct, on ajuste. Compte-rendu écrit envoyé dans la foulée.",
  },
  {
    n: '04',
    title: 'Roadmap 90 jours — livrée',
    desc: 'Vous repartez avec une roadmap priorisée ICE, sprint par sprint, ressources et budget estimés. Activable en interne ou avec nous — vous tranchez.',
  },
];

function ProcessAuditSection() {
  return (
    <section id="process-audit" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <SectionAmbience variant="soft" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Le process en 48 h
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Quatre étapes,{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              zéro friction.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
          {PROCESS_AUDIT.map((s, i) => (
            <div
              key={s.n}
              className={`relative p-7 bg-[color:var(--card-elev-1)] light:bg-white ${
                i < PROCESS_AUDIT.length - 1 ? 'md:border-r border-[color:var(--border-subtle)]' : ''
              } ${i < 2 ? 'border-b md:border-b lg:border-b-0' : ''}`}>
              <span className="font-display font-medium text-[44px] tabular-nums tracking-tight text-[color:var(--accent)] leading-none">
                {s.n}
              </span>
              <h3 className="mt-5 text-[18px] font-medium text-[color:var(--ink)] leading-tight">{s.title}</h3>
              <p className="mt-2.5 text-[14px] text-[color:var(--ink-muted)] leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section 4 : Témoignages
 * ────────────────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    quote:
      "L'audit nous a sorti 12 quick wins activables tout de suite. On a doublé notre taux de réponse outbound en 4 semaines, et identifié 18 k€ de spend Google qui partait à la poubelle.",
    name: 'CEO — Scale-up SaaS B2B',
    sector: 'Series A · 35 personnes',
    score: '+106 % RDV qualifiés / 90 j',
  },
  {
    quote:
      "On était convaincus que notre problème, c'était l'acquisition. Uclic nous a montré que c'était la conversion landing. 6 semaines plus tard, le funnel passait de 1,8 % à 4,3 %.",
    name: 'CMO — Fintech B2B2C',
    sector: 'Series B · 80 personnes',
    score: '×2,4 conversion landing',
  },
  {
    quote:
      "La roadmap 90 j priorisée ICE, ça a aligné le COMEX en 30 minutes là où on tournait depuis 6 mois. Plus de débats stériles : des chiffres, des chantiers, des owners.",
    name: 'Head of Growth — Marketplace B2B',
    sector: 'Bootstrap · 22 personnes',
    score: 'Roadmap validée COMEX en 30 min',
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials-audit" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Ils l'ont passé
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Ce que les CEOs en{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              gardent.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] leading-relaxed">
            Trois retours bruts, anonymisés à la demande. Note agrégée 4,76 / 5 (Google · Sortlist · Trustpilot).
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className={`relative p-7 lg:p-8 bg-[color:var(--card-elev-1)] light:bg-white flex flex-col ${
                i < TESTIMONIALS.length - 1 ? 'md:border-r border-[color:var(--border-subtle)]' : ''
              } ${i < TESTIMONIALS.length - 1 ? 'border-b md:border-b-0 border-[color:var(--border-subtle)]' : ''}`}>
              <span className="font-display font-medium text-[60px] leading-none text-[color:var(--accent)]/30 -mb-2">
                "
              </span>
              <blockquote className="text-[15px] text-[color:var(--ink)] leading-[1.65]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[color:var(--border-subtle)]">
                <div className="text-[14px] font-medium text-[color:var(--ink)]">{t.name}</div>
                <div className="mt-1 text-[12px] text-[color:var(--ink-muted)]">{t.sector}</div>
                <div className="mt-3 text-[12.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {t.score}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section 5 : FAQ + JSON-LD
 * ────────────────────────────────────────────────────────────────── */

export const AUDIT_FAQ = [
  {
    q: 'Pourquoi 0 € ? C\'est quoi le piège ?',
    a: "Aucun piège. 80 % de nos audits ne débouchent pas sur un contrat — on assume. C'est notre meilleur canal d'acquisition : un Growth Lead senior passe 3 h sur votre stack, vous repartez avec 12-18 reco chiffrées. Si ça matche, on en parle ensuite. Sinon, vous activez en interne. Pas de mail de relance commercial agressif.",
  },
  {
    q: 'Qui mène l\'audit ? Un junior, un SDR ?',
    a: "Un Growth Lead senior, 10+ ans d'XP, ex-Head of Growth d'une scale-up reconnue. Pas de SDR, pas de chargé de compte. Vous parlez directement à la personne qui rédige les recommandations. Aucune sous-traitance opaque.",
  },
  {
    q: 'Vous regardez vraiment notre stack ou c\'est un audit de surface ?',
    a: "On rentre dedans. Accès lecture demandés : GA4, Search Console, Google Ads, Meta Ads, LinkedIn Ads, HubSpot/CRM, dashboards internes. On épluche les comptes campagne par campagne, on analyse les requêtes SEO, on regarde la qualité des séquences outbound, on benchmark votre vitesse mobile réelle. Pas un audit Lighthouse + 3 captures.",
  },
  {
    q: 'Et si on est trop petits / trop gros pour Uclic ?',
    a: "PME 10-50 salariés, scale-ups Series A/B, ETI post-levée, grands comptes sur périmètre délimité — on couvre. Trop petit (< 5 personnes, ACV < 3 k€) : on vous dit non honnêtement, on vous oriente vers un freelance solo plus adapté. L'audit reste valable et activable.",
  },
  {
    q: 'C\'est quoi la différence avec un audit SEO classique ?',
    a: "Un audit SEO classique regarde un canal. Notre audit regarde les 5 angles : acquisition (SEO + Ads + Outbound), conversion, pilotage, IA & agents, stack tech. C'est un audit growth complet, pas un check Screaming Frog. Et c'est livré en 48 h chrono — pas en 3 semaines.",
  },
  {
    q: 'On peut activer la roadmap en interne, sans Uclic ?',
    a: "Oui — c'est explicitement le but. La roadmap 90 jours est priorisée ICE, ressources et budget estimés sprint par sprint. Votre équipe peut l'attaquer dès lundi. On ne pose aucun verrou contractuel sur les recommandations. Vous êtes propriétaire à 100 %.",
  },
  {
    q: 'Quelles données avez-vous besoin pour l\'audit ?',
    a: "Accès lecture (NDA cadre signé en amont) : GA4, Search Console, Google/Meta/LinkedIn Ads Manager, HubSpot ou votre CRM, Lemlist/LGM si outbound, Mixpanel/Amplitude si produit. Si certains accès sont impossibles, on travaille avec ce qu'on a — l'audit reste exploitable.",
  },
  {
    q: 'Je peux booker quand ?',
    a: "Réponse sous 48 h ouvrées sur la prise de contact. Premier créneau visio sous 5-7 jours selon agenda Growth Lead. Restitution audit livrée 48 h après le brief. Total : du premier contact à la roadmap, environ 10 jours ouvrés.",
  },
];

function FaqSchemaScript() {
  // FAQPage JSON-LD — émis sur demande explicite, malgré la note dans schema.ts
  // (les rich results FAQ sont restreints depuis 2023, mais le balisage reste utile pour les LLMs / GEO)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AUDIT_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqAuditSection() {
  return (
    <section id="faq-audit" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <SectionAmbience variant="soft" />
      <FaqSchemaScript />
      <div className="max-w-[980px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Questions fréquentes
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Tout ce qu'on nous demande{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              avant de booker.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
        </div>

        <AuditFaq items={AUDIT_FAQ} />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section 6 : CTA final
 * ────────────────────────────────────────────────────────────────── */

function FinalCtaSection() {
  return (
    <section id="cta-audit" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="relative border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-10 lg:p-14 overflow-hidden">
          <span aria-hidden="true" className="absolute -top-20 -right-20 w-96 h-96 bg-[color:var(--accent)]/10 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <Sparkles size={12} strokeWidth={2.2} />
                Audit gratuit — 48 h
              </div>
              <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1]">
                Prêt à voir vos vraies fuites{' '}
                <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  growth ?
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
                </span>
              </h2>
              <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] leading-relaxed max-w-[560px]">
                30 min de visio avec un Growth Lead senior. 48 h plus tard, vous avez sur votre bureau : audit chiffré 5 angles, 7 livrables activables, roadmap 90 jours priorisée. Aucun engagement, aucune relance commerciale agressive.
              </p>

              <ul className="mt-7 space-y-2.5 text-[14px] text-[color:var(--ink)]">
                {[
                  '100 % gratuit — sans contrepartie commerciale',
                  'Sans engagement — la roadmap reste activable en interne',
                  'Restitution sous 48 h après le brief',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <ShieldCheck size={15} strokeWidth={2.2} className="text-[color:var(--accent)] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <Link
                href="/contact?ref=audit"
                className="inline-flex items-center gap-2 px-8 py-4 text-[15px] font-semibold text-black light:text-white transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_10px_24px_-10px_rgba(107,255,149,0.55)]"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}>
                Réserver mon audit gratuit
                <ArrowRight size={16} strokeWidth={2} />
              </Link>

              <a
                href="#audit-booking"
                className="inline-flex items-center gap-2 text-[14px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
                Ou booker directement un créneau →
              </a>

              <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)] lg:text-right">
                <Clock size={11} strokeWidth={2} />
                Réponse sous 48 h · Places limitées
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Export composé
 * ────────────────────────────────────────────────────────────────── */

export default function AuditSections() {
  return (
    <>
      <PromesseSection />
      <LivrablesSection />
      <ProcessAuditSection />
      <TestimonialsSection />
      <FaqAuditSection />
      <FinalCtaSection />
    </>
  );
}
