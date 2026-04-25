'use client';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Search,
  Send,
  Cpu,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Gauge,
  Rocket,
} from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import CornerCross from '../ui/CornerCross';
import MediaMarquee from '../landing/MediaMarquee';

/* ─────────────────────────────────────────────────────────────
   Manifeste — voix Wladimir, ex-Head of Growth CodinGame.
   Les paragraphes existaient déjà ; on les conserve intacts car
   ils portent le SEO + l'EEAT (autorité, expérience).
   ───────────────────────────────────────────────────────────── */
const PARAGRAPHS: Array<string | { highlight: string; before: string; after: string }> = [
  'Bonjour,',
  "Je m'appelle Wladimir. J'ai commencé par la tech : développeur front-end, intégrateur, chef de projet web. Très vite, j'ai compris que mon ADN était de mettre la technologie et le développement au service des équipes marketing, commerciales et opérations. Pas coder pour coder. Coder pour faire croître.",
  "J'ai souvent été le premier salarié en startup. Celui qu'on recrute quand il n'y a encore rien : pas de process, pas de budget, pas de filet. Chez StayHome, j'étais le premier employé — on est passé de 1 à 13. Chez CodinGame, 5 ans en tant que Head of Growth puis Growth PM : 100% de croissance annuelle, stratégie Product-Led Growth, membre du codir. Dont 2 ans sous ère américaine après le rachat par un fonds US et la fusion avec CoderPad — 20M d'ARR, équipes internationales. Puis Head of Growth chez Muzzo, Growth Manager chez Obat. J'ai également enseigné le Growth Hacking en école de commerce.",
  "Plus de 10 ans sur le terrain. Ce que j'en retiens est simple : chaque euro investi doit être traçable, mesurable et rentable. Pas de slides. Pas de promesses. Des résultats. Quand on est le premier salarié marketing d'une entreprise qui bootstrappe, on apprend vite à ne rien gaspiller.",
  "Et puis j'ai créé Uclic avec Alexis Christine-Amara, ex-Head of Sales CodinGame. Lui côté revenu, moi côté growth — on a retrouvé le tandem qui a fait scaler CodinGame à 20M d'ARR. Aujourd'hui, je suis de l'autre côté. Je suis entrepreneur, comme vous. Je sais ce que c'est de regarder ses métriques en se demandant où investir le prochain euro. Je connais la pression, les arbitrages, le besoin de résultats concrets. C'est pour ça qu'Uclic existe.",
  "Aujourd'hui, Agicap, Deepki, Tehtris, CodinGame, MSC Cruises... toutes ces entreprises structurent leur croissance avec nous. Avec un système. Automatisé. Scalable. Contrôlable.",
  {
    before: 'Notre promesse tient en une ligne : ',
    highlight: 'Trois piliers. Une seule équipe. Zéro silo.',
    after: " Inbound pour captez la demande (SEO, Google & Meta Ads, pages de conversion, contenu — × 2,4 contacts organiques en 6 mois). Outbound pour créez la demande (signaux d'achat, séquences email + LinkedIn, SDR — +38 RDV qualifiés / mois). IA & Développement pour industrialisez sur-mesure (agents IA en production, apps métier, n8n — −70 % de temps manuel).",
  },
  "Ce qui nous différencie des agences classiques : un pilotage senior qui reste en première ligne, une équipe complète sans silo ni sous-traitance déguisée, des agents IA en production — pas des démos — et des résultats mesurables en 90 jours. Flexibilité 3 mois min. Pas de contrat qui enferme. Pas de reporting cosmétique.",
  "Si vous cherchez une équipe qui comprend vos problématiques parce qu'elle les a vécues — on est là.",
];

/* ─────────────── Histoire / Milestones ─────────────── */
const milestones = [
  { year: '2014', label: 'Premier salarié', desc: 'StayHome — de 1 à 13 personnes en moins de 2 ans.' },
  { year: '2017', label: 'Head of Growth', desc: 'CodinGame — 100 % de croissance annuelle, stratégie Product-Led Growth, codir.' },
  { year: '2022', label: 'Scale international', desc: '20M d’ARR. Rachat par fonds US, fusion CoderPad. 2 ans sous ère américaine.' },
  { year: '2023', label: "Naissance d'Uclic", desc: "Lancement avec Alexis Christine-Amara (ex-Head of Sales CodinGame). Le tandem revenue/growth de nouveau réuni." },
  { year: '2024', label: 'Premiers agents IA en prod', desc: '12 agents IA déployés en production chez nos clients. Pas des démos.' },
  { year: '2026', label: 'Trois piliers, une équipe', desc: 'Inbound + Outbound + IA & Dev sous un seul pilotage senior. Agicap, Deepki, MSC, Tehtris.' },
];

/* ─────────────── Valeurs (3-piliers ADN) ─────────────── */
const valeurs = [
  {
    icon: Target,
    titre: 'Mesurable',
    desc: "Chaque euro investi doit être traçable, mesurable et rentable. Pas de slides, pas de vanity metrics — uniquement des KPIs reliés au revenu.",
    kpi: 'KPIs revenue-first',
  },
  {
    icon: Gauge,
    titre: 'Sans silo',
    desc: "Inbound, outbound, IA, dev, data : un seul pilote senior, une seule équipe. Zéro ping-pong entre agences spécialisées.",
    kpi: '1 Growth Lead dédié',
  },
  {
    icon: Sparkles,
    titre: 'Industrialisé',
    desc: 'Agents IA en production, scripts sur-mesure, workflows n8n. Ce qui prend 8h chez les autres tient en 8 minutes chez nous.',
    kpi: '−70 % temps manuel',
  },
  {
    icon: Compass,
    titre: 'Flexible',
    desc: 'Engagement 3 mois minimum, pas de contrat qui enferme. On reste parce qu’on délivre, pas parce que vous êtes piégés.',
    kpi: '3 mois · sans menottes',
  },
];

/* ─────────────── Trois piliers résumés ─────────────── */
const piliers = [
  {
    icon: Search,
    label: 'Captez la demande',
    titre: 'Inbound',
    desc: 'SEO, Google & Meta Ads, pages de conversion, contenu à forte intention. On va chercher ceux qui vous cherchent déjà.',
    kpi: '× 2,4 contacts organiques en 6 mois',
  },
  {
    icon: Send,
    label: 'Créez la demande',
    titre: 'Outbound',
    desc: "Signaux d'achat, ciblage précis, séquences email + LinkedIn, appels à froid, SDR senior. On va chercher ceux qui ne vous connaissent pas.",
    kpi: '+38 RDV qualifiés / mois',
    featured: true,
  },
  {
    icon: Cpu,
    label: 'Industrialisez sur-mesure',
    titre: 'IA & Développement',
    desc: "Agents IA en production, applications métier, workflows n8n, scripts sur-mesure. Ce que vos concurrents n'ont pas encore industrialisé.",
    kpi: '−70 % de temps manuel',
  },
];

/* ─────────────── Méthode 90 jours résumée ─────────────── */
const methode = [
  { n: '01', semaine: 'S1 — S2', titre: 'Audit stratégique', desc: 'Diagnostic funnel, audit stack & data, benchmark sectoriel. Roadmap priorisée. Offert.' },
  { n: '02', semaine: 'S3 — S6', titre: 'Architecture & setup', desc: 'Mix canaux, stack martech, tracking, attribution, APIs connectées. Rien ne se lance sans mesure.' },
  { n: '03', semaine: 'S7 — S12', titre: 'Activation pilotée', desc: 'Growth Lead senior + experts canaux + Dev Fullstack. Cadence hebdo, reporting exécutif.' },
  { n: '04', semaine: 'J90+', titre: 'Industrialisation IA', desc: 'Agents IA en production, automation n8n, scoring temps réel. On scale ce qui marche.' },
];

/* ─────────────── Engagements ─────────────── */
const engagements = [
  { label: 'RGPD', desc: 'Données hébergées en UE. DPA signé. Privacy by design.' },
  { label: 'AI Act', desc: 'Conformité agents IA, traçabilité décisions, transparence prompts.' },
  { label: 'France Num', desc: 'Référencé activateur France Num pour la transformation numérique des PME.' },
  { label: 'Made in France', desc: 'Équipe 100 % France, basée à Paris. Pas de sous-traitance offshore déguisée.' },
];

export default function AboutClient() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO — Manifeste lettre ouverte (existant, conservé)
          ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-x-clip">
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Manifeste
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
              Pourquoi{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                Uclic existe.
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>

            <p className="mt-5 text-[color:var(--ink-muted)] max-w-[640px] text-[16px] leading-relaxed">
              Trois piliers. Une seule équipe. Zéro silo. L&apos;histoire d&apos;un ex-Head of Growth CodinGame devenu fondateur d&apos;agence — et pourquoi on fait du growth différemment.
            </p>
          </div>

          {/* Letter body */}
          <div className="mt-14 lg:mt-16 max-w-[720px] mx-auto">
            <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-8 lg:p-14">
              {/* Corner crosses */}
              <CornerCross size={14} className="hidden md:block absolute z-[3] left-0 top-0" style={{ transform: 'translate(-50%, -50%)' }} />
              <CornerCross size={14} className="hidden md:block absolute z-[3] right-0 top-0" style={{ transform: 'translate(50%, -50%)' }} />
              <CornerCross size={14} className="hidden md:block absolute z-[3] left-0 bottom-0" style={{ transform: 'translate(-50%, 50%)' }} />
              <CornerCross size={14} className="hidden md:block absolute z-[3] right-0 bottom-0" style={{ transform: 'translate(50%, 50%)' }} />

              <div className="flex flex-col gap-6 lg:gap-7">
                {PARAGRAPHS.map((p, i) => {
                  const isFirst = i === 0;
                  const content = typeof p === 'string' ? (
                    <>{p}</>
                  ) : (
                    <>
                      {p.before}
                      <span className="font-medium text-[color:var(--accent)]">{p.highlight}</span>
                      {p.after}
                    </>
                  );
                  return (
                    <motion.p
                      key={i}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                      className={
                        isFirst
                          ? 'text-[20px] lg:text-[22px] font-display text-[color:var(--ink)] leading-relaxed'
                          : 'text-[16px] lg:text-[17px] text-[color:var(--ink)] leading-[1.7]'
                      }>
                      {content}
                    </motion.p>
                  );
                })}

                {/* Signature */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 pt-6 border-t border-[color:var(--border-subtle)] flex items-center justify-end gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/team/wladimir.webp"
                    alt="Wladimir Delcros — Founder Uclic"
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[color:var(--border-subtle)]"
                  />
                  <div className="text-right">
                    <p className="text-[16px] text-[color:var(--ink-muted)]">À très vite,</p>
                    <p className="text-[20px] font-display font-medium text-[color:var(--ink)] mt-1">
                      Wladimir Delcros
                    </p>
                    <p className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] mt-1.5">
                      Founder · CEO Uclic
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MEDIA MARQUEE — clients qui nous font confiance
          ════════════════════════════════════════════════════════════ */}
      <MediaMarquee />

      {/* ════════════════════════════════════════════════════════════
          HISTOIRE — Timeline milestones
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Notre histoire
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[820px] mx-auto leading-[1.15]">
            Plus de 10 ans à scaler{' '}
            <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">de l’intérieur</span>.
          </h2>
          <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Avant d&apos;être agence, on a été premiers salariés, Head of Growth, membres du codir. On a vécu vos arbitrages.
          </p>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--border-subtle)] !rounded-none">
            {milestones.map((m, i) => (
              <motion.article
                key={m.year}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                className={`group relative p-7 lg:p-8 bg-[color:var(--card-elev-1)] light:bg-white transition-colors duration-300 hover:bg-[#181615] ${
                  i % 3 !== 2 ? 'lg:border-r' : ''
                } ${(i % 2 === 0 && (i % 3 !== 2)) ? 'md:border-r lg:border-r' : ''} ${
                  i < milestones.length - (milestones.length % 3 || 3) ? 'border-b' : ''
                } border-[color:var(--border-subtle)]`}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[color:var(--accent)]">{m.year}</span>
                  <span className="h-px flex-1 bg-[color:var(--border-subtle)]" />
                </div>
                <h3 className="mt-4 text-[20px] lg:text-[22px] font-display font-medium text-[color:var(--ink)] leading-tight">
                  {m.label}
                </h3>
                <p className="mt-3 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.6]">{m.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TROIS PILIERS — résumé / lien vers la home
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Notre offre
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[860px] mx-auto leading-[1.15]">
            Trois piliers. Une seule équipe.{' '}
            <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">Zéro silo.</span>
          </h2>
          <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Là où une agence spécialisée couvre un seul canal, on active l&apos;ensemble du parcours client avec une équipe senior pilotée.
          </p>

          <div className="mt-14 grid md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none">
            {piliers.map((p, i) => (
              <article
                key={p.titre}
                className={`group p-7 lg:p-8 flex flex-col bg-[color:var(--card-elev-1)] light:bg-white transition-colors duration-300 ${
                  i < piliers.length - 1 ? 'md:border-r border-b md:border-b-0' : ''
                } border-[color:var(--border-subtle)]`}>
                <div
                  className={`w-11 h-11 grid place-items-center border ${
                    p.featured
                      ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent)]/30'
                      : 'bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)]'
                  }`}>
                  <p.icon size={20} strokeWidth={1.75} />
                </div>
                <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{p.label}</p>
                <h3 className="mt-2 text-[26px] font-display font-medium text-[color:var(--ink)] leading-tight">{p.titre}</h3>
                <p className="mt-3 text-[15.5px] text-[color:var(--ink)] leading-[1.6]">{p.desc}</p>
                <div className="mt-auto pt-6 border-t border-[color:var(--border-subtle)]">
                  <p className={`text-[14px] font-mono ${p.featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink-muted)]'}`}>
                    {p.kpi}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="/#offre"
              className="inline-flex items-center gap-2 text-[14px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
              Voir l&apos;offre détaillée
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          VALEURS — bento 4 cards
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Nos valeurs
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[820px] mx-auto leading-[1.15]">
            Ce qu&apos;on fait, et ce qu&apos;on{' '}
            <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">refuse de faire</span>.
          </h2>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 border border-[color:var(--border-subtle)] !rounded-none">
            {valeurs.map((v, i) => (
              <motion.article
                key={v.titre}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className={`group relative p-7 bg-[color:var(--card-elev-1)] light:bg-white flex flex-col transition-colors duration-300 hover:bg-[#181615] ${
                  i < valeurs.length - 1 ? 'md:border-r' : ''
                } border-b md:border-b-0 lg:border-b-0 border-[color:var(--border-subtle)] ${
                  i < 2 ? 'md:border-b lg:border-b-0' : ''
                }`}>
                <div className="w-10 h-10 grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--bg)] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] transition-colors">
                  <v.icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-[20px] font-display font-medium text-[color:var(--ink)] leading-tight">{v.titre}</h3>
                <p className="mt-3 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.6]">{v.desc}</p>
                <p className="mt-auto pt-5 text-[12px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {v.kpi}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MÉTHODE 90 JOURS — résumé en 4 étapes
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Notre méthode
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[820px] mx-auto leading-[1.15]">
            Des résultats mesurables{' '}
            <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">en 90 jours</span>.
          </h2>
          <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Audit offert. Setup intégré. Activation pilotée. Industrialisation IA. On déroule, vous voyez les chiffres bouger.
          </p>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 border border-[color:var(--border-subtle)] !rounded-none">
            {methode.map((etape, i) => (
              <motion.article
                key={etape.n}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className={`p-7 bg-[color:var(--card-elev-1)] light:bg-white flex flex-col transition-colors duration-300 hover:bg-[#181615] ${
                  i < methode.length - 1 ? 'md:border-r' : ''
                } ${i < 2 ? 'md:border-b lg:border-b-0' : ''} border-[color:var(--border-subtle)]`}>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[40px] font-medium text-[color:var(--accent)] leading-none tabular-nums">
                    {etape.n}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                    {etape.semaine}
                  </span>
                </div>
                <h3 className="mt-5 text-[19px] font-display font-medium text-[color:var(--ink)] leading-tight">{etape.titre}</h3>
                <p className="mt-3 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.6]">{etape.desc}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="/#methode"
              className="inline-flex items-center gap-2 text-[14px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
              Voir la méthode détaillée
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ÉQUIPE & BUREAUX — split bento 2 cols
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 border border-[color:var(--border-subtle)] !rounded-none">
            {/* ── Équipe ── */}
            <div className="p-8 lg:p-10 bg-[color:var(--card-elev-1)] light:bg-white border-b lg:border-b-0 lg:border-r border-[color:var(--border-subtle)] flex flex-col">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] self-start">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Pilotage senior
              </div>
              <h2 className="mt-5 text-[clamp(24px,2.6vw,32px)] font-display font-medium text-[color:var(--ink)] leading-[1.15] tracking-[-0.02em]">
                Une équipe qui reste{' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">en première ligne</span>.
              </h2>
              <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
                Pas de junior parachuté après le closing. Le Growth Lead qui pitche est celui qui pilote. Experts canaux certifiés. Dev fullstack interne. SDR senior. Tous salariés Uclic.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/team/wladimir.webp"
                    alt="Wladimir Delcros — CEO"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[color:var(--bg)] light:border-white"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/team/alexis.webp"
                    alt="Alexis Christine-Amara — Head of Sales"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[color:var(--bg)] light:border-white"
                  />
                </div>
                <div>
                  <p className="text-[14px] text-[color:var(--ink)] font-medium">Wladimir &amp; Alexis</p>
                  <p className="text-[12px] text-[color:var(--ink-muted)]">Co-fondateurs · ex-CodinGame</p>
                </div>
              </div>

              <a
                href="/equipe"
                className="mt-auto pt-8 inline-flex items-center gap-2 text-[14px] text-[color:var(--accent)] hover:gap-3 transition-all self-start">
                Rencontrer toute l&apos;équipe
                <ArrowRight size={14} />
              </a>
            </div>

            {/* ── Bureaux ── */}
            <div className="p-8 lg:p-10 bg-[color:var(--card-elev-1)] light:bg-white flex flex-col">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] self-start">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Notre présence
              </div>
              <h2 className="mt-5 text-[clamp(24px,2.6vw,32px)] font-display font-medium text-[color:var(--ink)] leading-[1.15] tracking-[-0.02em]">
                Paris · {' '}
                <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">100 % France</span>.
              </h2>
              <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
                Équipe à Paris, intervention partout en France. Pas d&apos;offshore déguisé, pas de plateau sous-traité au Maghreb : chaque membre est salarié Uclic, basé en France, formé en interne.
              </p>

              <div className="mt-6 flex items-start gap-3 p-5 border border-[color:var(--border-subtle)] !rounded-none bg-[color:var(--bg)]">
                <MapPin size={18} className="text-[color:var(--accent)] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="text-[14px] leading-[1.6]">
                  <p className="text-[color:var(--ink)] font-medium">Uclic</p>
                  <p className="text-[color:var(--ink-muted)]">Paris, Île-de-France</p>
                  <p className="text-[color:var(--ink-muted)] mt-1.5 text-[12.5px]">Intervention France · UE</p>
                </div>
              </div>

              <a
                href="/contact"
                className="mt-auto pt-8 inline-flex items-center gap-2 text-[14px] text-[color:var(--accent)] hover:gap-3 transition-all self-start">
                Nous rencontrer
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ENGAGEMENTS — RGPD / AI Act / France Num / Made in France
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Nos engagements
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[820px] mx-auto leading-[1.15]">
            Conformes par défaut.{' '}
            <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">Pas en option.</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 border border-[color:var(--border-subtle)] !rounded-none">
            {engagements.map((e, i) => (
              <article
                key={e.label}
                className={`p-7 bg-[color:var(--card-elev-1)] light:bg-white flex flex-col transition-colors duration-300 hover:bg-[#181615] ${
                  i < engagements.length - 1 ? 'md:border-r' : ''
                } ${i < 2 ? 'md:border-b lg:border-b-0' : ''} border-[color:var(--border-subtle)]`}>
                <ShieldCheck size={20} className="text-[color:var(--accent)]" strokeWidth={1.75} />
                <h3 className="mt-4 text-[18px] font-display font-medium text-[color:var(--ink)] leading-tight">{e.label}</h3>
                <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-[1.6]">{e.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA AUDIT — bridge vers /audit avant CtaFinal
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-8 lg:p-12 text-center">
            <CornerCross size={14} accent className="hidden md:block absolute z-[3] left-0 top-0" style={{ transform: 'translate(-50%, -50%)' }} />
            <CornerCross size={14} accent className="hidden md:block absolute z-[3] right-0 top-0" style={{ transform: 'translate(50%, -50%)' }} />
            <CornerCross size={14} accent className="hidden md:block absolute z-[3] left-0 bottom-0" style={{ transform: 'translate(-50%, 50%)' }} />
            <CornerCross size={14} accent className="hidden md:block absolute z-[3] right-0 bottom-0" style={{ transform: 'translate(50%, 50%)' }} />

            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <Rocket size={12} strokeWidth={2} />
              Pour démarrer
            </div>
            <h2 className="mt-4 text-[clamp(26px,3vw,38px)] font-display font-medium tracking-[-0.02em] max-w-[760px] mx-auto leading-[1.15]">
              Mon audit gratuit{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">en 48 heures</span>.
            </h2>
            <p className="mt-4 text-[15.5px] text-[color:var(--ink-muted)] max-w-[600px] mx-auto leading-relaxed">
              Diagnostic funnel, audit stack &amp; data, benchmark sectoriel et roadmap priorisée. Sans engagement, sans slides creux.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[color:var(--accent)] text-[color:var(--accent-ink)] !rounded-none font-medium text-[14px] hover:gap-3 transition-all">
                Mon audit gratuit
                <ArrowRight size={16} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[color:var(--border-subtle)] !rounded-none text-[color:var(--ink)] text-[14px] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors">
                Échanger 30 min
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
