'use client';
import { useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';
import {
  ArrowDown,
  Check,
  Layers,
  Cpu,
  Activity,
  Bot,
  Zap,
  Radar,
  Sparkles,
  BarChart3,
  Code2,
  Terminal,
  GitBranch,
  Rocket,
  Play,
  X,
} from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import { useState, useEffect } from 'react';

/* ───────────────────── data ───────────────────── */

const etapes = [
  {
    n: '01',
    phase: 'Phase 01',
    semaines: 'Cadrage',
    titre: 'Audit stratégique',
    temps: 'Roadmap priorisée',
    tempsLabel: 'sans engagement',
    duree: '2 sem.',
    badge: 'Offert · 0€',
    livrable: 'Rapport de diagnostic + roadmap',
    desc: "Diagnostic de votre funnel, audit de votre stack tech et benchmark sectoriel. On identifie les opportunités d'automation et d'IA — sans engagement.",
    items: [
      'Audit funnel & attribution',
      'Audit stack tech & data',
      'Maturité IA & automation',
      'Roadmap priorisée',
    ],
  },
  {
    n: '02',
    phase: 'Phase 02',
    semaines: 'Setup',
    titre: 'Architecture & mix canaux',
    temps: 'Stack intégré',
    tempsLabel: 'tracking · CRM · automation',
    duree: '—',
    livrable: 'Architecture canaux + stack opérationnel',
    desc: "Mix de canaux sélectionnés pour votre marché, stack martech intégré et APIs connectées. Rien ne se lance sans mesure.",
    items: [
      'Mix canaux testé',
      'Stack martech intégré',
      'APIs & automation',
      'Tracking & attribution',
    ],
  },
  {
    n: '03',
    phase: 'Phase 03',
    semaines: 'Activation',
    titre: 'Équipe senior dédiée',
    temps: 'Pilotage hebdo',
    tempsLabel: 'reporting exécutif',
    duree: '—',
    livrable: 'Équipe opérationnelle + gouvernance',
    desc: "Un Growth Lead senior en pilote, des experts certifiés par canal et un Dev Fullstack dédié. Onboarding métier, cadence hebdomadaire, reporting exécutif.",
    items: [
      'Growth Lead senior',
      'Experts canaux certifiés',
      'Dev Fullstack dédié',
      'Comité de pilotage hebdo',
    ],
  },
  {
    n: '04',
    phase: 'Phase 04',
    semaines: 'Production',
    titre: 'Industrialisation IA & Dev',
    temps: 'ROI mesurable',
    tempsLabel: 'agents IA + apps en production',
    duree: 'en continu',
    livrable: 'Agents IA + apps métier + dashboard exécutif',
    desc: "Expérimentations pilotées par hypothèse et KPI. Ce qui performe est industrialisé : agents IA sur-mesure et applications métier (Next.js, APIs, automation).",
    items: [
      'Agents IA en production',
      'Apps métier sur-mesure',
      'APIs & intégrations custom',
      'Dashboard exécutif',
    ],
  },
];

/* ───────────────────── Mockups — 4 états UI ───────────────────── */

const mockFrame =
  'relative w-full aspect-[4/3] !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden';

/* Badge flottant décalé qui dépasse du coin du mockup (Figma-pin style) */
const floatingBadges = [
  { label: 'Benchmark', value: '12 mois roadmap', icon: BarChart3 },
  { label: 'Mix',       value: '4-6 canaux',      icon: Layers },
  { label: 'Dev',       value: 'Next.js · Py',    icon: Code2 },
  { label: 'Agents IA', value: '12 en prod',      icon: Bot },
];

function FloatingBadge({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
      animate={{ opacity: 1, scale: 1, rotate: 2 }}
      exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-[6] -top-4 -right-4 lg:-top-5 lg:-right-5 inline-flex items-center gap-2 border border-[color:var(--accent)]/50 bg-[color:var(--bg)] light:bg-white px-4 py-2">
      <Icon size={15} strokeWidth={2.4} className="text-[color:var(--accent)]" />
      <span className="text-[13px] font-mono uppercase tracking-[0.16em] text-[color:var(--ink)]">{label}</span>
      <span className="text-[13px] font-mono uppercase tracking-[0.16em] tabular-nums text-[color:var(--ink)]">{value}</span>
    </motion.div>
  );
}

/* ÉTAPE 01 — Audit stratégique : rapport de benchmark sectoriel */
function MockAudit() {
  type Row = {
    channel: string;
    etat: 'Sous-perf' | 'Dans la norme' | 'Opportunité';
    marche: string;
    vous: string;
    opportunite: string;
    highlight?: boolean;
  };
  const rows: Row[] = [
    { channel: 'SEO',          etat: 'Opportunité',    marche: '230€', vous: '184€', opportunite: 'top 10% · 90€', highlight: true },
    { channel: 'SEA',          etat: 'Dans la norme',  marche: '42€',  vous: '38€',  opportunite: '−22% possible' },
    { channel: 'Paid Social',  etat: 'Sous-perf',      marche: '58€',  vous: '74€',  opportunite: '−35% ciblage' },
    { channel: 'Outbound B2B', etat: 'Opportunité',    marche: '3.2%', vous: '1.8%', opportunite: 'top 10% · 6.1%' },
    { channel: 'Email',        etat: 'Sous-perf',      marche: '22%',  vous: '14%',  opportunite: '+8 pts open' },
  ];
  const etatColor: Record<Row['etat'], string> = {
    'Sous-perf':     'text-red-300/75 light:text-red-700 border-red-400/20 light:border-red-600/30 bg-red-500/[0.04] light:bg-red-500/[0.06]',
    'Dans la norme': 'text-amber-200/75 light:text-amber-700 border-amber-400/20 light:border-amber-600/30 bg-amber-400/[0.04] light:bg-amber-500/[0.06]',
    'Opportunité':   'text-emerald-300/80 light:text-emerald-700 border-emerald-400/25 light:border-emerald-600/35 bg-emerald-400/[0.05] light:bg-emerald-500/[0.06]',
  };

  return (
    <div className={mockFrame}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[color:var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-[14.5px] font-mono text-[color:var(--ink)] uppercase tracking-widest font-semibold">
            Rapport d'audit
          </span>
          <span className="text-[13px] font-mono text-[color:var(--ink)]">·</span>
          <span className="text-[13px] font-mono uppercase tracking-wider text-[color:var(--ink)]">
            Benchmark sectoriel
          </span>
        </div>
        <span className="text-[12.5px] font-mono text-[color:var(--ink)] tabular-nums">
          5 canaux · percentiles
        </span>
      </div>

      {/* Columns header */}
      <div className="grid grid-cols-[1.2fr_1fr_58px_58px_1.2fr] gap-2 px-5 pt-3 pb-2 text-[12.5px] font-mono uppercase tracking-[0.14em] text-[color:var(--ink)] border-b border-[color:var(--border-subtle)]/60">
        <span>Canal</span>
        <span>État</span>
        <span className="text-right">Marché</span>
        <span className="text-right">Vous</span>
        <span className="text-right">Opportunité</span>
      </div>

      {/* Rows */}
      <div className="px-3 pb-4 pt-2 flex flex-col gap-0.5">
        {rows.map((r, idx) => (
          <motion.div
            key={r.channel}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * idx, duration: 0.4 }}
            className={`grid grid-cols-[1.2fr_1fr_58px_58px_1.2fr] gap-2 items-center px-2.5 py-2.5 ${
              r.highlight
                ? 'bg-[color:var(--accent)]/5 border border-[color:var(--accent)]/20'
                : 'border border-transparent'
            }`}>
            <span className={`text-[15.5px] ${r.highlight ? 'text-[color:var(--accent)] font-semibold' : 'text-[color:var(--ink)]'}`}>
              {r.channel}
            </span>
            <span className={`text-[12px] font-mono uppercase tracking-wider px-2 py-[2px] border inline-block w-fit ${etatColor[r.etat]}`}>
              {r.etat}
            </span>
            <span className="text-right text-[14.5px] font-mono tabular-nums text-[color:var(--ink)]">{r.marche}</span>
            <span className={`text-right text-[14.5px] font-mono tabular-nums ${r.highlight ? 'text-[color:var(--accent)] font-semibold' : 'text-[color:var(--ink)]'}`}>
              {r.vous}
            </span>
            <span className="text-right text-[13.5px] font-mono tabular-nums text-[color:var(--ink)] truncate">
              {r.opportunite}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute left-3 right-3 bottom-3 border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] px-3.5 py-2.5 flex items-center gap-2">
        <Radar size={14} className="text-[color:var(--ink)]" />
        <span className="text-[13.5px] text-[color:var(--ink)]">
          Cadre : Bullseye · 20 canaux évalués
        </span>
        <span className="ml-auto text-[13.5px] font-mono tabular-nums text-[color:var(--ink)]">
          livrable exec
        </span>
      </div>
    </div>
  );
}

/* ÉTAPE 02 — Architecture & mix canaux : pilules canaux + grille stack martech */
function MockArchitecture() {
  const channels = [
    { label: 'Google Ads',   color: '#4285F4' },
    { label: 'Meta Ads',     color: '#1877F2' },
    { label: 'LinkedIn Ads', color: '#0A66C2' },
    { label: 'SEO',          color: '#8E44AD' },
    { label: 'Outbound',     color: '#B57215' },
    { label: 'Content',      color: '#3A7BD5' },
    { label: 'Lifecycle',    color: '#E74C3C' },
    { label: 'CRO',          color: '#EC5990' },
  ];

  const stack: { cat: string; tools: { name: string; initial: string; color: string }[] }[] = [
    {
      cat: 'CRM & Sales',
      tools: [
        { name: 'HubSpot',    initial: 'H', color: '#FF7A59' },
        { name: 'Salesforce', initial: 'S', color: '#00A1E0' },
        { name: 'Pipedrive',  initial: 'P', color: '#1A1A1A' },
      ],
    },
    {
      cat: 'Analytics',
      tools: [
        { name: 'GA4',       initial: 'G', color: '#F9AB00' },
        { name: 'PostHog',   initial: 'P', color: '#F9BD2B' },
        { name: 'Amplitude', initial: 'A', color: '#1E61F0' },
      ],
    },
    {
      cat: 'Automation · IA',
      tools: [
        { name: 'n8n',          initial: 'n', color: '#EA4B71' },
        { name: 'Make',         initial: 'M', color: '#6D00CC' },
        { name: 'Claude',       initial: 'C', color: '#D97757' },
      ],
    },
    {
      cat: 'Outbound',
      tools: [
        { name: 'Lemlist', initial: 'L', color: '#0B5FFF' },
        { name: 'Apollo',  initial: 'A', color: '#4B3FFF' },
        { name: 'Clay',    initial: 'C', color: '#EF4444' },
      ],
    },
  ];

  return (
    <div className={mockFrame}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[color:var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-[14.5px] font-mono text-[color:var(--ink)] uppercase tracking-widest font-semibold">
            Architecture canaux
          </span>
          <span className="text-[13px] font-mono text-[color:var(--ink)]">·</span>
          <span className="text-[13px] font-mono uppercase tracking-wider text-[color:var(--ink)]">
            Stack martech
          </span>
        </div>
        <span className="text-[12.5px] font-mono text-[color:var(--ink)] tabular-nums">
          mix validé
        </span>
      </div>

      {/* Channels pills */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[12.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink)]">
            Canaux sélectionnés
          </span>
          <span className="text-[12px] font-mono uppercase tracking-wider text-[color:var(--ink)] border border-[color:var(--border-subtle)] px-2 py-[2px]">
            mix validé
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {channels.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.3 }}
              className="inline-flex items-center gap-1.5 text-[14px] font-mono uppercase tracking-wider px-3 py-1.5 border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] text-[color:var(--ink)]">
              <span
                className="w-1.5 h-1.5 shrink-0"
                style={{ backgroundColor: c.color, opacity: 0.4 }}
              />
              {c.label}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Stack grid */}
      <div className="px-5 pt-2 pb-16">
        <div className="text-[12.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink)] mb-2">
          Stack intégré
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {stack.map((s, idx) => (
            <motion.div
              key={s.cat}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx, duration: 0.35 }}
              className="border border-[color:var(--border-subtle)] p-2.5 bg-[color:var(--card-elev-1)]">
              <div className="text-[12px] font-mono uppercase tracking-widest text-[color:var(--ink)] mb-2">
                {s.cat}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.tools.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-1.5 px-2 py-[3px] rounded border border-[color:var(--border-subtle)]"
                    title={t.name}>
                    <span
                      className="w-1.5 h-1.5 shrink-0"
                      style={{ backgroundColor: t.color, opacity: 0.35 }}
                    />
                    <span className="text-[12px] font-mono uppercase tracking-wider text-[color:var(--ink)]">{t.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-3 right-3 bottom-3 border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] px-3.5 py-2.5 flex items-center gap-2">
        <Layers size={14} className="text-[color:var(--ink)]" />
        <span className="text-[13.5px] text-[color:var(--ink)]">
          Gouvernance data centralisée · dashboard unifié
        </span>
        <span className="ml-auto flex items-center gap-1 text-[color:var(--ink)] text-[13.5px] font-mono">
          <span className="w-1.5 h-1.5 bg-[color:var(--accent)] pulse-soft" />
          intégré
        </span>
      </div>
    </div>
  );
}

/* ÉTAPE 03 — Équipe senior dédiée : organigramme */
function MockTeam() {
  const experts = [
    { role: 'Paid',     sub: 'Meta/Google',    photo: '/avatars/women-68.webp', color: '#0D7377', kind: 'expert' as const },
    { role: 'SEO',      sub: 'Senior 8 ans',   photo: '/avatars/men-32.webp',   color: '#8E44AD', kind: 'expert' as const },
    { role: 'Outbound', sub: 'B2B Expert',     photo: '/avatars/women-44.webp', color: '#B57215', kind: 'expert' as const },
    { role: 'Data',     sub: 'Analytics',      photo: '/avatars/men-85.webp',   color: '#3A7BD5', kind: 'expert' as const },
    { role: 'Dev',      sub: 'Next.js · Py',   photo: '/avatars/men-54.webp',   color: '#0F9347', kind: 'dev'    as const },
  ];

  return (
    <div className={mockFrame}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[color:var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-[14.5px] font-mono text-[color:var(--ink)] uppercase tracking-widest font-semibold">
            Équipe dédiée
          </span>
          <span className="text-[13px] font-mono text-[color:var(--ink)]">·</span>
          <span className="text-[13px] font-mono uppercase tracking-wider text-[color:var(--ink)]">
            Organigramme
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] text-[color:var(--ink)] font-mono uppercase tracking-[0.18em]">
          <span className="w-1.5 h-1.5 bg-[color:var(--accent)] pulse-soft" />
          allocated
        </div>
      </div>

      {/* Org chart */}
      <div className="px-5 pt-6 pb-16 flex flex-col items-center">
        {/* Growth Lead */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative z-[2] w-[62%] border border-[color:var(--accent)]/50 bg-[color:var(--card-elev-1)] px-4 py-2.5 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatars/men-22.webp"
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="w-12 h-12 border border-[color:var(--border-subtle)] object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold text-[color:var(--ink)] leading-tight">
              Growth Lead Senior
            </div>
            <div className="text-[13px] font-mono uppercase tracking-wider text-[color:var(--ink)] mt-1">
              Pilote · 10+ ans
            </div>
          </div>
          <span className="text-[12.5px] font-mono uppercase tracking-wider px-2 py-[2px] border border-[color:var(--border-subtle)] text-[color:var(--ink)]">
            lead
          </span>
        </motion.div>

        {/* Vertical connector */}
        <div className="w-px h-7 bg-[color:var(--border-subtle)]" />
        {/* Horizontal bar */}
        <div className="w-[92%] h-px bg-[color:var(--border-subtle)]" />

        {/* Experts row — 4 experts + 1 dev fullstack */}
        <div className="grid grid-cols-5 gap-2 w-full mt-4">
          {experts.map((x, i) => (
            <motion.div
              key={x.role}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i + 0.2, duration: 0.35 }}
              className="relative p-2.5 bg-[color:var(--card-elev-1)] flex flex-col items-center text-center border border-[color:var(--border-subtle)]">
              {/* Connector up */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[color:var(--border-subtle)]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={x.photo}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="w-9 h-9 object-cover border border-[color:var(--border-subtle)]"
              />
              <div className="mt-1.5 text-[14px] font-semibold text-[color:var(--ink)] leading-tight">
                {x.role}
              </div>
              <div className="text-[12.5px] text-[color:var(--ink)] mt-0.5 leading-tight">
                {x.sub}
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-mono uppercase tracking-wider px-2 py-[2px] border border-[color:var(--border-subtle)] text-[color:var(--ink)]">
                {x.kind === 'dev' ? (<><Code2 size={11} strokeWidth={2.5} /> Fullstack</>) : 'certifié'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-3 right-3 bottom-3 border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] px-3.5 py-2.5 flex items-center gap-2">
        <Activity size={14} className="text-[color:var(--ink)]" />
        <span className="text-[13.5px] text-[color:var(--ink)]">
          Comité hebdo · 1 Dev Fullstack intégré
        </span>
        <span className="ml-auto flex items-center gap-1 text-[13.5px] font-mono text-[color:var(--ink)]">
          <GitBranch size={12} /> ship weekly
        </span>
      </div>
    </div>
  );
}

/* ÉTAPE 04 — Industrialisation IA & Dev : agents live + log de déploiement */
function MockAgentsDev() {
  const agents = [
    { name: 'outbound-ai',      role: 'Prospection B2B',     metric: '1.2k', unit: 'calls/j', icon: Bot },
    { name: 'lead-scoring',     role: 'ML · HubSpot sync',   metric: '842',  unit: '/jour',   icon: Cpu },
    { name: 'content-gen',      role: 'SEO · drafts',        metric: '3.4k', unit: 'tokens/s',icon: Sparkles },
    { name: 'reporting-bot',    role: 'Slack · daily digest',metric: '24',   unit: 'rapports',icon: Zap },
  ];

  const logs = [
    { t: '14:02', tag: 'deploy', msg: 'agent-outbound v2.1.0 → prod',          color: 'var(--accent)' },
    { t: '14:07', tag: 'build',  msg: 'dashboard-exec · next build · 11.4s',   color: 'var(--ink-muted)' },
    { t: '14:09', tag: 'ok',     msg: 'api-scoring · 200 /predict · p95 112ms',color: 'var(--accent)' },
  ];

  return (
    <div className={mockFrame}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[color:var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-[14.5px] font-mono text-[color:var(--ink)] uppercase tracking-widest font-semibold">
            Industrialisation IA & Dev
          </span>
          <span className="text-[13px] font-mono text-[color:var(--ink)]">·</span>
          <span className="text-[13px] font-mono uppercase tracking-wider text-[color:var(--ink)]">
            Agents en production
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] text-[color:var(--ink)] font-mono uppercase tracking-[0.18em]">
          <span className="w-1.5 h-1.5 bg-[color:var(--accent)] pulse-soft" />
          live
        </div>
      </div>

      {/* Stack row : tech chips */}
      <div className="px-5 pt-3 pb-2.5 flex items-center gap-1.5 flex-wrap border-b border-[color:var(--border-subtle)]/60">
        <span className="text-[12.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink)] mr-1">
          stack
        </span>
        {['Next.js', 'Python', 'FastAPI', 'OpenAI', 'Claude', 'n8n'].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
            className="inline-flex items-center gap-1.5 text-[13px] font-mono uppercase tracking-wider px-2 py-[3px] rounded border border-[color:var(--border-subtle)] text-[color:var(--ink)]">
            <span className="w-1.5 h-1.5 bg-[color:var(--ink-muted)]" />
            {t}
          </motion.span>
        ))}
      </div>

      {/* Agents grid — 2 x 2 */}
      <div className="px-5 pt-3 pb-2 grid grid-cols-2 gap-2.5">
        {agents.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * i, duration: 0.35 }}
              className="relative border border-[color:var(--border-subtle)] p-2.5 bg-[color:var(--card-elev-1)]">
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-8 h-8 rounded grid place-items-center border border-[color:var(--border-subtle)] shrink-0">
                    <Icon size={16} strokeWidth={2.2} className="text-[color:var(--ink)]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-mono text-[color:var(--ink)] truncate leading-tight font-medium">
                      {a.name}
                    </div>
                    <div className="text-[12px] text-[color:var(--ink)] truncate leading-tight mt-0.5">
                      {a.role}
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11.5px] font-mono uppercase tracking-wider text-[color:var(--ink)]">
                  <span className="w-1.5 h-1.5 bg-[color:var(--accent)] pulse-soft" />
                  run
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[20px] font-display font-medium text-[color:var(--ink)] tabular-nums leading-none">
                  {a.metric}
                </span>
                <span className="text-[12.5px] font-mono text-[color:var(--ink)]">
                  {a.unit}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal / deploy log — forced dark bg + white text in both modes.
          Absolute-positioned above the footer to guarantee it renders even
          when content overflows the 4/3 aspect frame (especially in light mode). */}
      <div
        className="absolute left-3 right-3 bottom-[56px] overflow-hidden z-[2]"
        style={{ backgroundColor: '#0b0b0b', border: '1px solid rgba(255,255,255,0.12)' }}>
        <div
          className="flex items-center gap-2 px-2.5 py-1.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="w-2 h-2" style={{ backgroundColor: 'rgba(248,113,113,0.6)' }} />
          <span className="w-2 h-2" style={{ backgroundColor: 'rgba(251,191,36,0.6)' }} />
          <span className="w-2 h-2" style={{ backgroundColor: 'rgba(52,211,153,0.6)' }} />
          <Terminal size={11} className="ml-1" style={{ color: 'rgba(255,255,255,0.75)' }} />
          <span
            className="text-[11px] font-mono uppercase tracking-wider"
            style={{ color: 'rgba(255,255,255,0.75)' }}>
            deploy.log
          </span>
          <span
            className="ml-auto flex items-center gap-1 text-[11px] font-mono"
            style={{ color: 'rgba(255,255,255,0.75)' }}>
            <GitBranch size={10} />
            main · uclic/growth-stack
          </span>
        </div>
        <div className="px-2.5 py-2 font-mono text-[12px] leading-[1.7] space-y-1">
          {logs.map((l, i) => {
            const isAccent = l.color === 'var(--accent)';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + 0.12 * i, duration: 0.3 }}
                className="flex items-center gap-2">
                <span className="tabular-nums" style={{ color: 'rgba(255,255,255,0.70)' }}>{l.t}</span>
                <span
                  className="uppercase tracking-wider text-[10.5px] px-1.5 py-[1px] rounded border"
                  style={{
                    color: isAccent ? '#6BFF95' : 'rgba(255,255,255,0.85)',
                    borderColor: isAccent ? '#6BFF95' : 'rgba(255,255,255,0.25)',
                  }}>
                  {l.tag}
                </span>
                <span className="truncate" style={{ color: 'rgba(255,255,255,0.95)' }}>{l.msg}</span>
                {l.tag === 'ok' && <Check size={11} strokeWidth={2.5} className="ml-auto shrink-0" style={{ color: '#6BFF95' }} />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-3 right-3 bottom-3 border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] px-3.5 py-2.5 flex items-center gap-2">
        <Rocket size={14} className="text-[color:var(--ink)]" />
        <span className="text-[13.5px] text-[color:var(--ink)]">
          12 agents · 3 apps livrées · uptime 99.8%
        </span>
        <span className="ml-auto text-[13.5px] font-mono tabular-nums text-[color:var(--accent)]">
          ROI +2.4x
        </span>
      </div>
    </div>
  );
}

const mockups = [MockAudit, MockArchitecture, MockTeam, MockAgentsDev];

/* ───────────────────── FeaturedVideos ─────────────────────
   3 cards cliquables (YouTube / Spotify / LinkedIn) qui ouvrent
   un modal lightbox avec la vidéo/audio embed mis en avant sur uclic.fr.
*/
type VideoSource = 'youtube' | 'spotify' | 'linkedin';
type FeaturedVideo = {
  platform: VideoSource;
  label: string;
  title: string;
  embedUrl: string;
  externalUrl: string;
};

const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    platform: 'youtube',
    label: 'YouTube',
    title: 'Interview growth & IA — Wladimir Delcros',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    externalUrl: 'https://www.youtube.com/@uclic',
  },
  {
    platform: 'spotify',
    label: 'Spotify',
    title: 'Podcast — Growth industrialisé & agents IA',
    embedUrl: 'https://open.spotify.com/embed/episode/5Dl8GapWjsIf6TWM1VLvM8',
    externalUrl: 'https://open.spotify.com/show/uclic',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    title: 'Post — Les leçons de 10 ans de growth SaaS',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7240000000000000000',
    externalUrl: 'https://www.linkedin.com/in/wladimirdelcros',
  },
];

/* Brand icons inline — lucide-react les a retiré pour raisons de trademark */
const YoutubeIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const LinkedinIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const SpotifyIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.57.4-.87.22-2.38-1.45-5.37-1.78-8.9-.97-.34.08-.68-.13-.76-.47-.08-.34.13-.68.47-.76 3.87-.89 7.18-.51 9.82 1.11.3.18.4.57.24.87zm1.22-2.72c-.22.37-.71.49-1.08.26-2.72-1.67-6.86-2.16-10.08-1.18-.42.13-.86-.11-.99-.52-.13-.42.11-.86.52-.99 3.68-1.12 8.25-.57 11.37 1.35.37.22.49.71.26 1.08zm.11-2.83c-3.26-1.94-8.65-2.12-11.77-1.17-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.58-1.09 9.53-.88 13.29 1.36.45.27.6.86.33 1.31-.27.45-.86.6-1.31.33z"/>
  </svg>
);

function FeaturedVideos() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) {return;}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {setOpenIdx(null);}
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIdx]);

  const Icon = ({ platform, size = 22 }: { platform: VideoSource; size?: number }) => {
    if (platform === 'youtube') {return <YoutubeIcon size={size} />;}
    if (platform === 'linkedin') {return <LinkedinIcon size={size} />;}
    return <SpotifyIcon size={size} />;
  };

  const platformColor = (p: VideoSource) => {
    if (p === 'youtube') {return '#FF0000';}
    if (p === 'linkedin') {return '#0A66C2';}
    return '#1DB954';
  };

  const current = openIdx !== null ? FEATURED_VIDEOS[openIdx] : null;

  return (
    <>
      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
          Ils parlent de notre méthode
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {FEATURED_VIDEOS.map((v, i) => (
            <button
              key={v.platform}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group relative flex items-center gap-2.5 px-4 py-2.5 border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white hover:!border-[color:var(--accent)]/60 transition-colors duration-200">
              <span
                className="w-8 h-8 grid place-items-center rounded-[4px] shrink-0 transition-transform duration-200 group-hover:scale-[1.05]"
                style={{ color: platformColor(v.platform), backgroundColor: `${platformColor(v.platform)}1a` }}>
                <Icon platform={v.platform} size={18} />
              </span>
              <span className="flex flex-col items-start min-w-0 text-left">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[color:var(--ink-muted)] leading-none">
                  {v.label}
                </span>
                <span className="text-[13px] text-[color:var(--ink)] leading-tight mt-0.5 max-w-[220px] truncate">
                  {v.title}
                </span>
              </span>
              <Play size={14} strokeWidth={2} className="text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] transition-colors shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            key="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setOpenIdx(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[900px] bg-[#141211] light:bg-white border border-[color:var(--border-subtle)] shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--border-subtle)]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-7 h-7 grid place-items-center rounded-[4px] shrink-0"
                    style={{ color: platformColor(current.platform), backgroundColor: `${platformColor(current.platform)}1a` }}>
                    <Icon platform={current.platform} size={15} />
                  </span>
                  <span className="text-[14px] text-[color:var(--ink)] truncate">{current.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIdx(null)}
                  aria-label="Fermer"
                  className="w-8 h-8 grid place-items-center border border-[color:var(--border-subtle)] hover:!border-[color:var(--accent)]/60 transition-colors text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]">
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>
              <div className={`relative w-full ${current.platform === 'spotify' ? 'aspect-[16/5]' : 'aspect-video'} bg-black`}>
                <iframe
                  src={current.embedUrl}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────── Section ───────────────────── */

export default function MethodeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smoothed progress for less jittery transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  // Fill of the vertical timeline line
  const fillHeight = useTransform(smoothProgress, [0.15, 0.85], ['0%', '100%']);

  // Animated sticky top
  const stickyTop = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.75, 0.90],
    ['14vh', '22vh', '22vh', '14vh']
  );

  // Active step index (0 / 1 / 2 / 3) — synchronisé avec la card visible au centre viewport
  const [active, setActive] = useState(0);
  const stepRef0 = useRef<HTMLLIElement | null>(null);
  const stepRef1 = useRef<HTMLLIElement | null>(null);
  const stepRef2 = useRef<HTMLLIElement | null>(null);
  const stepRef3 = useRef<HTMLLIElement | null>(null);
  const stepRefs = [stepRef0, stepRef1, stepRef2, stepRef3];

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(0);
      return;
    }
    // IntersectionObserver : bande d'activation étroite à 45-50% de la viewport
    // (zone de lecture centrale). Narrower que l'ancienne 50-60% pour éviter que
    // plusieurs steps soient intersectés simultanément → sync plus propre avec le mockup.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.findIndex((r) => r.current === entry.target);
            if (idx >= 0) {setActive(idx);}
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    stepRefs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <section
      id="methode"
      ref={sectionRef}
      className="relative pt-16 lg:pt-20 pb-24 lg:pb-32 overflow-x-clip">
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        {/* ───── HEADER ───── */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative z-[1] inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            La méthode
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>

          <h2 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[880px] mx-auto">
            Audit, architecture, équipe, exécution.{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Un cadre éprouvé en 90 jours.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>

          <p className="mt-5 text-[color:var(--ink)] max-w-[620px] text-[17px] leading-relaxed">
            Une méthodologie structurée en 4 phases pour cadrer, outiller, équiper et piloter
            votre croissance — sans improvisation, avec une équipe senior dédiée.
          </p>
        </div>

        {/* ───── BODY : split desktop / stacked mobile ───── */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 relative">
          {/* ============ COLONNE GAUCHE — mockup SEUL est sticky ============ */}
          <motion.div
            style={{ top: stickyTop }}
            className="lg:sticky lg:self-start">
            <div className="relative w-full">
              <div className="relative w-full aspect-[4/3]">
                {/* Scotch top-left — WebP 300x250 (2x retina for 150px display) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/scotch.webp"
                  alt=""
                  aria-hidden="true"
                  width={150}
                  height={125}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute z-[7] select-none opacity-25 light:opacity-100"
                  style={{
                    top: '-42px',
                    left: '-52px',
                    width: '150px',
                    height: 'auto',
                    transform: 'rotate(-10deg)',
                  }}
                />
                {mockups.map((Mock, i) => {
                  const isActive = prefersReducedMotion ? i === 0 : active === i;
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.98,
                        y: isActive ? 0 : 12,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                      style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
                      <Mock />
                    </motion.div>
                  );
                })}

                {/* Floating pin badge */}
                <AnimatePresence mode="wait">
                  <FloatingBadge
                    key={active}
                    label={floatingBadges[active].label}
                    value={floatingBadges[active].value}
                    Icon={floatingBadges[active].icon}
                  />
                </AnimatePresence>
              </div>

              {/* Tiny caption under mockup */}
              <div className="mt-5 flex items-center justify-between text-[12px] font-mono uppercase tracking-widest text-[color:var(--ink)]">
                <span>
                  Étape {String(active + 1).padStart(2, '0')} / 04
                </span>
                <span className="flex items-center gap-1.5 text-[color:var(--accent)]">
                  <span className="w-1.5 h-1.5 bg-[color:var(--accent)] pulse-soft" />
                  {etapes[active].titre}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ============ COLONNE DROITE — timeline ============ */}
          <div className="relative">
            {/* Timeline vertical — même DA que le trait central du ConvergingLinesBridge :
                halo 14px accent/18 rounded-full + core 4px accent/90 rounded-full
                (au lieu de l'ancien rail 1px avec fill accent). */}
            <div
              className="absolute top-2 bottom-2 pointer-events-none"
              style={{ left: '9px', width: '10px' }}>
              {/* Halo surlignage — accent vert, bouts arrondis */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: '10px', opacity: 0.35, backgroundColor: 'var(--accent)' }}
              />
              {/* Core 3px animé — accent vert, bouts arrondis */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: '3px',
                  opacity: 1,
                  backgroundColor: 'var(--accent)',
                  height: prefersReducedMotion ? '100%' : fillHeight,
                }}
              />
            </div>

            <ol className="flex flex-col gap-8 lg:gap-16">
              {etapes.map((e, i) => {
                const isActive = prefersReducedMotion ? true : i <= active;
                const isCurrent = prefersReducedMotion ? i === 0 : i === active;
                return (
                  <li key={e.n} ref={stepRefs[i]} className="relative pl-10">
                    {/* Step marker — même DA que le CTA du header (rounded-md + radial gradient accent) */}
                    <div className="absolute left-0 top-5">
                      <motion.div
                        animate={{
                          opacity: prefersReducedMotion ? 1 : isCurrent ? 1 : isActive ? 0.35 : 0.25,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-7 h-7 grid place-items-center text-[color:var(--accent-ink)] shadow-[0_6px_18px_-6px_rgba(107,255,149,0.55)]"
                        style={{
                          borderRadius: '6px',
                          backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                          backgroundImage: isActive
                            ? 'radial-gradient(ellipse 160% 140% at 50% -40%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)'
                            : 'none',
                          border: isActive ? 'none' : '1px solid var(--border-subtle)',
                        }}>
                        {isActive ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <span className="text-[11px] font-mono text-[color:var(--ink)] tabular-nums">
                            {e.n}
                          </span>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      animate={{
                        opacity: prefersReducedMotion ? 1 : isCurrent ? 1 : 0.18,
                        filter: prefersReducedMotion || isCurrent ? 'blur(0px)' : 'blur(0.5px)',
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative overflow-hidden p-6 lg:p-7 !rounded-none border bg-[#141211] light:bg-white transition-colors duration-300 ${
                        isCurrent
                          ? '!border-[color:var(--accent)]/60'
                          : 'border-[color:var(--border-subtle)]'
                      }`}>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-[12px] font-mono uppercase tracking-[0.25em] text-[color:var(--accent)]">
                          {e.n}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[color:var(--ink)]">
                          {e.semaines}
                        </span>
                        {e.badge && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest px-2 py-[2px] bg-[color:var(--accent)] text-black light:text-white font-semibold">
                            <Sparkles size={9} strokeWidth={2.6} /> {e.badge}
                          </span>
                        )}
                        <span className="ml-auto text-[11px] font-mono uppercase tracking-widest text-[color:var(--ink)] border border-[color:var(--border-subtle)] px-1.5 py-[1px]">
                          {e.duree}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-[22px] lg:text-[24px] font-display font-medium leading-tight tracking-[-0.01em]">
                        {e.titre}
                      </h3>

                      {/* KPI accent line */}
                      <div className="mt-2 inline-flex items-baseline gap-2 flex-wrap">
                        <span className="font-display font-medium text-[color:var(--accent)] text-[20px] tabular-nums tracking-tight">
                          {e.temps}
                        </span>
                        <span className="text-[13px] text-[color:var(--ink)]">
                          · {e.tempsLabel}
                        </span>
                      </div>

                      <p className="mt-3 text-[15px] text-[color:var(--ink)] leading-[1.6]">
                        {e.desc}
                      </p>

                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                        {e.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-2 text-[14px] text-[color:var(--ink)] leading-[1.5] min-h-[44px]">
                            <Check
                              size={13}
                              strokeWidth={2.5}
                              className="text-[color:var(--accent)] mt-0.5 shrink-0"
                            />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Livrable — ligne éditoriale bottom de la card (signal corporate) */}
                      <div className="mt-5 pt-4 border-t border-[color:var(--border-subtle)] flex items-center gap-2 text-[11.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--accent)]">
                        <span className="w-4 h-px bg-[color:var(--accent)]" />
                        Livrable
                        <span className="text-[color:var(--ink)] normal-case tracking-normal font-sans">
                          · {e.livrable}
                        </span>
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ───── Closure ───── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex items-center justify-center gap-2 text-[14px] text-[color:var(--ink)] text-center">
          Et après ? On continue à tester, mesurer, industrialiser. Le growth n'est jamais « fini »
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[color:var(--accent)]">
            <ArrowDown size={14} />
          </motion.span>
        </motion.p>

        {/* ───── Featured Videos : YouTube / Spotify / LinkedIn ───── */}
        <FeaturedVideos />
      </div>
    </section>
  );
}
