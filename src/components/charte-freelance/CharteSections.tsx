import Link from 'next/link';
import {
  Handshake,
  Heart,
  Lock,
  Wallet,
  Users,
  Sparkles,
  ShieldCheck,
  GitBranch,
  MessageSquare,
  CalendarCheck2,
  ArrowRight,
} from 'lucide-react';
import CornerCross from '../ui/CornerCross';
import SectionAmbience from '../ui/SectionAmbience';

/* ──────────────────────────────────────────────────────────────────
 * Section : Engagements Uclic → freelances
 * Bento corner-cross (4 cards) — DA stricte V2
 * ────────────────────────────────────────────────────────────────── */

const ENGAGEMENTS_UCLIC = [
  {
    icon: Handshake,
    title: 'Zéro commission cachée',
    desc: "On ne prélève rien sur l'apport d'affaires entre membres. Les missions Uclic sont facturées au tarif freelance plein, marge agence séparée et transparente. Pas d'hidden fee, pas de coup tordu.",
  },
  {
    icon: Wallet,
    title: 'Paiement à 30 jours fin de mois',
    desc: "Facture validée le 5 du mois → réglée avant le 30. Si une facture client tarde, on avance la trésorerie. Pas de \"on attend que le client paye\" : c'est notre risque, pas le vôtre.",
  },
  {
    icon: Users,
    title: 'Slack commun, stand-up hebdo',
    desc: "Vous rejoignez le Slack collectif (canal #general, #wins, #help, #ai-prompts, #sales-pipe). Stand-up vidéo lundi 9h30 — 30 min. Atelier mensuel sur un sujet (SEO, IA, outbound, attribution).",
  },
  {
    icon: Sparkles,
    title: 'Bibliothèque agents IA partagée',
    desc: "Accès à nos workflows n8n, prompts d'agents éprouvés, templates outbound qui convertissent, dashboards Looker. Vous économisez −70 % de temps manuel sur l'exécution dès la première mission.",
  },
  {
    icon: GitBranch,
    title: 'Pipe commercial mutualisé',
    desc: "Quand un client demande une compétence que vous avez, on vous propose la mission en priorité. Un brief clair, un budget ferme, un Growth Strategist Uclic en pilotage — vous livrez votre expertise, on s'occupe du reste.",
  },
  {
    icon: ShieldCheck,
    title: 'On vous couvre face au client',
    desc: "Litige, scope qui dérape, client toxique : c'est nous qui prenons la balle. Vous n'êtes jamais seul·e en face. On gère la relation contractuelle, vous restez focus sur la livraison.",
  },
];

function EngagementsUclicSection() {
  // 6 cards en grid 3 colonnes — corner-cross aux intersections
  // Pattern OffreSection : pas de gap, borders partagés, !rounded-none
  return (
    <section id="engagements-uclic" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <SectionAmbience variant="soft" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Ce qu'Uclic vous garantit
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Six engagements concrets,{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              écrits noir sur blanc.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] leading-relaxed">
            Pas de promesses vagues, pas de "esprit d'équipe" sans contenu. Ce qu'on vous doit, et qu'on tient — facture après facture.
          </p>
        </div>

        {/* Bento 3×2 sans gap, borders partagés */}
        <div className="mt-14 grid md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
          {/* Crosses aux intersections internes */}
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '33.333%', top: '0%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '66.666%', top: '0%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '33.333%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '66.666%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '33.333%', top: '100%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '66.666%', top: '100%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} accent className="hidden md:block absolute z-[2]" style={{ left: '0%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} accent className="hidden md:block absolute z-[2]" style={{ left: '100%', top: '50%', transform: 'translate(-50%, -50%)' }} />

          {ENGAGEMENTS_UCLIC.map((e, i) => {
            const isLastCol = (i + 1) % 3 === 0;
            const isLastRow = i >= 3;
            return (
              <article
                key={e.title}
                className={`group p-7 flex flex-col relative overflow-hidden transition-colors duration-300 !rounded-none border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white ${
                  !isLastCol ? 'md:border-r' : ''
                } ${!isLastRow ? 'border-b md:border-b' : 'border-b md:border-b-0'}`}>
                <div
                  className="w-11 h-11 grid place-items-center border bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20 transition-all duration-300 group-hover:scale-[1.06] group-hover:rotate-[-4deg]">
                  <e.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-[20px] font-display font-medium leading-tight">{e.title}</h3>
                <p className="mt-3 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.6]">{e.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section : Engagements freelance → Uclic
 * Liste épurée + filets — pas un bento, plus "checklist"
 * ────────────────────────────────────────────────────────────────── */

const ENGAGEMENTS_FREELANCE = [
  {
    title: 'Sénior, opérationnel, autonome',
    desc: "Minimum 5 ans d'expérience sur votre canal. Vous pilotez votre périmètre sans micro-management. On vous fait confiance — vous nous le rendez en livrant propre, à l'heure.",
  },
  {
    title: 'Disponibilité contractuelle respectée',
    desc: "Ce qu'on signe, on le tient. 0,5 / 1 / 2 jours par semaine selon la mission. Si la charge évolue, on en parle 15 jours avant — pas le vendredi soir pour le lundi matin.",
  },
  {
    title: 'Communication transparente sur Slack',
    desc: "Statut clair sur les tâches en cours. Quand on bloque, on dit qu'on bloque (pas dans 3 jours). Quand on ne sait pas, on demande. Pas de ghosting, pas d'effet de surprise au comité hebdo.",
  },
  {
    title: 'Posture orientée client',
    desc: "Vos arbitrages remontent au Growth Strategist Uclic, pas directement au client. Pas de promesse hors-scope, pas d'engagement de délai non validé. On parle d'une seule voix.",
  },
  {
    title: 'Confidentialité & deal d\'exclusivité raisonnée',
    desc: "NDA standard à la signature. Pas de mission concurrente directe sur un même secteur sans nous en parler. On respecte vos autres clients, vous respectez les nôtres.",
  },
  {
    title: 'Vous partagez en retour',
    desc: "Quand vous trouvez un workflow qui marche, vous le documentez 30 min sur la base partagée. Quand un atelier mensuel touche votre expertise, vous prenez la parole. C'est la mécanique du collectif.",
  },
];

function EngagementsFreelanceSection() {
  return (
    <section id="engagements-freelance" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[100px]">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Ce qu'on attend de vous
            </div>
            <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1]">
              Le deal,{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                dans les deux sens.
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>
            <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[460px] leading-relaxed">
              Un collectif tient quand chacun tient sa part. Voici les six points qu'on coche avant de signer ensemble — et qu'on revoie tous les six mois.
            </p>
          </div>

          <ol className="border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white !rounded-none">
            {ENGAGEMENTS_FREELANCE.map((e, i) => (
              <li
                key={e.title}
                className={`flex items-start gap-5 p-6 lg:p-7 ${
                  i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
                }`}>
                <span className="w-9 h-9 grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] shrink-0 text-[12px] font-mono font-semibold tracking-widest text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16.5px] font-medium text-[color:var(--ink)] leading-tight">{e.title}</h3>
                  <p className="mt-2 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.65]">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section : Process de collaboration (4 étapes)
 * ────────────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Premier échange — 30 min',
    desc: "Visio avec un Growth Lead Uclic. On regarde votre parcours, vos clients passés, votre stack et votre niveau de séniorité réel. Pas de test technique gratuit, pas de devoir maison. On parle.",
  },
  {
    n: '02',
    title: 'Mission test rémunérée',
    desc: "Une première mission courte (5 à 10 jours) sur un client réel, payée plein tarif. C'est le seul vrai filtre : la qualité de livrable, le rythme, la communication.",
  },
  {
    n: '03',
    title: 'Onboarding collectif',
    desc: "Accès Slack, bibliothèque agents IA, dashboards, NDA cadre signé, profil ajouté à /membres. Un parrain·e Uclic vous suit les 60 premiers jours.",
  },
  {
    n: '04',
    title: 'Cycle 6 mois — bilan croisé',
    desc: "Tous les 6 mois, on fait un bilan dans les deux sens : ce qui marche, ce qui frotte, missions à venir, montée en compétence souhaitée. Pas de pige permanente sans rétro.",
  },
];

function ProcessSection() {
  return (
    <section id="process-charte" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <SectionAmbience variant="soft" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Comment on travaille ensemble
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Un process clair,{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              quatre étapes.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`relative p-7 bg-[color:var(--card-elev-1)] light:bg-white ${
                i < PROCESS_STEPS.length - 1 ? 'md:border-r border-[color:var(--border-subtle)]' : ''
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
 * Section : Tarifs / honoraires / paiement
 * ────────────────────────────────────────────────────────────────── */

const TARIFS_RULES = [
  {
    label: 'Taux journalier',
    value: '550 — 950 €',
    desc: "Selon canal, séniorité et complexité. On fixe ensemble le TJM avant la première mission, on n'y touche qu'à la revue annuelle.",
  },
  {
    label: 'Délai de paiement',
    value: '30j fin de mois',
    desc: "Facture validée le 5 → règlement avant le 30. Avance de trésorerie Uclic si un client tarde — c'est notre risque, pas le vôtre.",
  },
  {
    label: 'Marge agence',
    value: 'Transparente',
    desc: "Sur missions Uclic, marge agence séparée de votre TJM, communiquée au signing. Pas de pourcentage flou, pas de \"on verra\".",
  },
  {
    label: 'Apport d\'affaires',
    value: '0 % de commission',
    desc: "Si vous ramenez un client au collectif et que vous le pilotez, vous gardez 100 % de votre TJM. Aucune commission cachée.",
  },
];

function TarifsSection() {
  return (
    <section id="tarifs-charte" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[100px]">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Tarifs & paiement
            </div>
            <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1]">
              On parle d'argent{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                directement.
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>
            <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[460px] leading-relaxed">
              Pas de tabou, pas de "on verra plus tard". Voici nos règles de tarification et de paiement, identiques pour tous les membres du collectif.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-0 border border-[color:var(--border-subtle)] !rounded-none">
            {TARIFS_RULES.map((t, i) => (
              <div
                key={t.label}
                className={`p-7 bg-[color:var(--card-elev-1)] light:bg-white ${
                  i % 2 === 0 ? 'sm:border-r border-[color:var(--border-subtle)]' : ''
                } ${i < TARIFS_RULES.length - 2 ? 'border-b border-[color:var(--border-subtle)]' : ''}`}>
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)]">
                  {t.label}
                </div>
                <div className="mt-3 font-display font-medium text-[28px] text-[color:var(--accent)] leading-none tabular-nums">
                  {t.value}
                </div>
                <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] leading-[1.6]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section : Confidentialité & propriété intellectuelle
 * ────────────────────────────────────────────────────────────────── */

const CLAUSES = [
  {
    icon: Lock,
    title: 'NDA cadre signé à l\'onboarding',
    desc: "Un seul NDA Uclic-freelance qui couvre toutes les missions à venir. Pas de paperasserie à chaque nouveau client. Données client, prompts, dashboards, schémas — tout est en confidentialité.",
  },
  {
    icon: ShieldCheck,
    title: 'Vos livrables, propriété client',
    desc: "Tout ce que vous produisez en mission Uclic (ads, copy, workflows n8n, scripts, apps) appartient au client final dès la livraison. Vous ne conservez aucun droit d'exploitation exclusif sur les assets clients.",
  },
  {
    icon: Heart,
    title: 'Votre savoir-faire reste à vous',
    desc: "Méthodes, frameworks, biblio personnelle d'agents et de prompts : ils restent votre propriété. Ce que vous apportez à Uclic ne devient jamais propriété d'Uclic. Vous repartez avec tout.",
  },
  {
    icon: MessageSquare,
    title: 'Pas de débauchage entre membres',
    desc: "Les missions trouvées via le pipe Uclic restent dans le collectif tant que vous y êtes. Si un client veut vous contractualiser en direct hors Uclic, on le décide ensemble — pas en douce.",
  },
];

function ConfidentialiteSection() {
  return (
    <section id="confidentialite-charte" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <SectionAmbience variant="soft" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Confidentialité & propriété intellectuelle
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] max-w-[820px]">
            Quatre clauses,{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              écrites en français.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] leading-relaxed">
            Un contrat-cadre lisible en 10 minutes, pas en 40 pages d'avocat. Voici les quatre points qu'on signe ensemble.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '50%', top: '0%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <CornerCross size={14} className="hidden md:block absolute z-[2]" style={{ left: '50%', top: '100%', transform: 'translate(-50%, -50%)' }} />

          {CLAUSES.map((c, i) => (
            <article
              key={c.title}
              className={`group p-7 lg:p-8 bg-[color:var(--card-elev-1)] light:bg-white relative ${
                i % 2 === 0 ? 'md:border-r border-[color:var(--border-subtle)]' : ''
              } ${i < CLAUSES.length - 2 ? 'border-b border-[color:var(--border-subtle)]' : ''}`}>
              <div className="w-11 h-11 grid place-items-center border bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20 transition-all duration-300">
                <c.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-[20px] font-display font-medium leading-tight">{c.title}</h3>
              <p className="mt-3 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.6]">{c.desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
          Le contrat-cadre complet est partagé avant la mission test. Vous le lisez tranquille — on l'amende ensemble si besoin.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Section : Communauté & signature CTA
 * ────────────────────────────────────────────────────────────────── */

function CommunauteSection() {
  return (
    <section id="communaute-charte" className="relative py-16 lg:py-20 overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
          <div className="p-8 lg:p-12 bg-[color:var(--card-elev-1)] light:bg-white border-b lg:border-b-0 lg:border-r border-[color:var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Le collectif
            </div>
            <h2 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1]">
              Une tribu de freelances{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                qui se tirent vers le haut.
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>
            <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] leading-relaxed">
              Découvrez les membres déjà embarqués : SEO, Paid, SDR, motion, ingénieurs IA, devs Next.js. Chacun avec son terrain, ses outils, ses convictions.
            </p>
            <Link
              href="/equipe"
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent)] hover:gap-3 transition-all">
              Voir les membres du collectif
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>

          <div className="p-8 lg:p-12 bg-[#141211] light:bg-white relative overflow-hidden">
            <span aria-hidden="true" className="absolute -top-10 -right-10 w-48 h-48 bg-[color:var(--accent)]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <CalendarCheck2 size={12} strokeWidth={2.2} />
                Signature
              </div>
              <h3 className="mt-4 font-display font-medium tracking-[-0.02em] text-[clamp(24px,2.6vw,32px)] leading-[1.15]">
                Vous êtes prêt·e ?{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                  On signe ensemble.
                </span>
              </h3>
              <p className="mt-5 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[460px]">
                Un mot sur vous, votre canal, votre dispo. On revient sous 48h avec un premier créneau de visio. Pas de questionnaire de 30 questions, pas de robot à chatbot.
              </p>

              <Link
                href="/contact?ref=charte-freelance"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-black light:text-white transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_10px_24px_-10px_rgba(107,255,149,0.55)]"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}>
                Rejoindre le collectif
                <ArrowRight size={16} strokeWidth={2} />
              </Link>

              <p className="mt-5 text-[12px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                Réponse sous 48h · Visio 30 min · 0 paperasserie
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

export default function CharteSections() {
  return (
    <>
      <EngagementsUclicSection />
      <EngagementsFreelanceSection />
      <ProcessSection />
      <TarifsSection />
      <ConfidentialiteSection />
      <CommunauteSection />
    </>
  );
}
