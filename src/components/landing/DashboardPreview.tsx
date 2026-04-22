'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Target, Compass, Ticket, Bot, Plus, ChevronRight, Sparkles, Zap, ArrowRight } from 'lucide-react';

type TacticStatus = 'todo' | 'inprogress' | 'done';
const STATUS_ORDER: TacticStatus[] = ['todo', 'inprogress', 'done'];
const statusMeta: Record<TacticStatus, { label: string; cls: string; dot: string }> = {
  todo:       { label: 'To do',       cls: 'bg-[color:var(--card-elev-2)] text-[color:var(--ink)] border-[color:var(--border-strong)]', dot: 'bg-[color:var(--ink-dim)]' },
  inprogress: { label: 'In progress', cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-200 border-amber-500/50',                   dot: 'bg-amber-500 pulse-soft' },
  done:       { label: 'Done',        cls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border-emerald-500/50',           dot: 'bg-emerald-500' },
};
const nextStatus = (s: TacticStatus): TacticStatus =>
  STATUS_ORDER[(STATUS_ORDER.indexOf(s) + 1) % STATUS_ORDER.length];

/* ────────────────────────────────────────────────────────────────
   DATA — Uclic methodology: OKR → Strategy → Weekly tactics (ICE)
   + AI agents assisting channel experts to ship faster.
   ──────────────────────────────────────────────────────────────── */

/* Lineage colors : each Objectif gets a hue, Strategies/Tactics/Agents inherit */
const lineage: Record<string, { hue: string; soft: string; border: string }> = {
  'OBJ-01': { hue: '#8B5CF6', soft: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.40)' }, // violet
  'OBJ-02': { hue: '#38BDF8', soft: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.40)' }, // sky
  'OBJ-03': { hue: '#F59E0B', soft: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.40)' }, // amber
};

const objectifs = [
  { id: 'OBJ-01', title: '+3 M€ de CA · S1 2026',            owner: 'Wladimir · CEO',  progress: 68, kpi: 'CA' },
  { id: 'OBJ-02', title: '+40 % de prospects qualifiés',     owner: 'Claire · CMO',    progress: 42, kpi: 'Leads' },
  { id: 'OBJ-03', title: 'Rentabiliser un client en < 9 mois', owner: 'Marc · CFO',    progress: 81, kpi: 'Coût' },
];

const strategies = [
  { id: 'STR-04', parent: 'OBJ-01', root: 'OBJ-01', title: 'Dominer Google sur les requêtes d\'achat',       owner: 'Alexis · SEO',       channel: 'SEO' },
  { id: 'STR-05', parent: 'OBJ-02', root: 'OBJ-02', title: 'Prospection ciblée des décideurs IT',             owner: 'Marc · Prospection', channel: 'Prospection' },
  { id: 'STR-06', parent: 'OBJ-02', root: 'OBJ-02', title: 'IA : scoring prospects + relances auto',          owner: 'Julien · CRM',       channel: 'CRM' },
  { id: 'STR-07', parent: 'OBJ-03', root: 'OBJ-03', title: 'Baisser le coût des pubs via reciblage',          owner: 'Anaïs · Pubs',       channel: 'Pubs' },
];

const tactiques = [
  { id: 'TAC-12', parent: 'STR-04', root: 'OBJ-01', title: 'Publier 15 pages comparatives concurrents',       ice: 8.6, I: 9, C: 8, E: 9, owner: 'Théo',   agent: 'Rédacteur SEO'  },
  { id: 'TAC-13', parent: 'STR-05', root: 'OBJ-02', title: 'Séquence de prospection en 5 étapes',             ice: 7.8, I: 8, C: 7, E: 8, owner: 'Marc',   agent: 'Agent Prospection' },
  { id: 'TAC-14', parent: 'STR-06', root: 'OBJ-02', title: 'Scoring IA : 37 déclencheurs HubSpot',            ice: 7.2, I: 7, C: 8, E: 7, owner: 'Julien', agent: 'Agent CRM'      },
  { id: 'TAC-15', parent: 'STR-07', root: 'OBJ-03', title: 'Reciblage publicitaire LinkedIn & Meta',          ice: 6.9, I: 7, C: 7, E: 7, owner: 'Anaïs',  agent: null             },
];

const agents = [
  { name: 'Rédacteur SEO',    tag: '12 pages · 7 j',      status: 'active', icon: Sparkles, tactic: 'TAC-12', root: 'OBJ-01' },
  { name: 'Agent Prospection', tag: '420 messages · 7 j', status: 'active', icon: Zap,      tactic: 'TAC-13', root: 'OBJ-02' },
  { name: 'Agent CRM',         tag: 'prêt',                status: 'idle',   icon: Bot,      tactic: 'TAC-14', root: 'OBJ-02' },
];

const ownerColor: Record<string, string> = {
  'Wladimir · CEO':    '#7B3FC4',
  'Claire · CMO':      '#1A5FA8',
  'Marc · CFO':        '#B57215',
  'Alexis · Growth':   '#1E7F6B',
  'Marc · Outbound':   '#B57215',
  'Julien · CRM':      '#C68B00',
  'Anaïs · Paid':      '#0D7377',
  'Théo':              '#8E44AD',
  'Marc':              '#B57215',
  'Julien':            '#C68B00',
  'Anaïs':             '#0D7377',
};

/* Vraies photos — réutilise les mêmes que l'organigramme Équipe pour cohérence */
const ownerPhoto: Record<string, string> = {
  'Wladimir · CEO':    'https://randomuser.me/api/portraits/men/32.jpg',
  'Claire · CMO':      'https://randomuser.me/api/portraits/women/52.jpg',
  'Marc · CFO':        'https://randomuser.me/api/portraits/men/60.jpg',
  'Alexis · Growth':   'https://randomuser.me/api/portraits/men/45.jpg',
  'Marc · Outbound':   'https://randomuser.me/api/portraits/men/51.jpg',
  'Julien · CRM':      'https://randomuser.me/api/portraits/men/85.jpg',
  'Anaïs · Paid':      'https://randomuser.me/api/portraits/women/44.jpg',
  'Théo':              'https://randomuser.me/api/portraits/men/76.jpg',
  'Marc':              'https://randomuser.me/api/portraits/men/51.jpg',
  'Julien':            'https://randomuser.me/api/portraits/men/85.jpg',
  'Anaïs':             'https://randomuser.me/api/portraits/women/44.jpg',
};

/* ─── Small primitives ───────────────────────────────────── */

const Ref = ({ id, tone = 'muted' }: { id: string; tone?: 'muted' | 'green' | 'blue' }) => (
  <span className={`inline-flex items-center font-mono text-[10px] px-1.5 py-0.5 rounded-md border
    ${tone === 'green' ? 'border-[color:var(--accent)]/30 text-[color:var(--accent)] bg-[color:var(--accent)]/8'
      : tone === 'blue' ? 'border-blue-400/25 text-blue-300/90 bg-blue-400/5'
      : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] bg-[color:var(--card-elev-1)]'}`}>
    {id}
  </span>
);

const Avatar = ({ name }: { name: string }) => {
  const photo = ownerPhoto[name];
  const color = ownerColor[name] || '#555';
  if (photo) {
    return (
      <img src={photo} alt={name} width={20} height={20}
           className="w-5 h-5 rounded-full object-cover ring-2 ring-[color:var(--bg)]"
           loading="lazy" decoding="async" />
    );
  }
  const initial = name.charAt(0).toUpperCase();
  return (
    <div style={{ backgroundColor: color }}
         className="w-5 h-5 rounded-full grid place-items-center text-[color:var(--ink)] font-semibold text-[10px] ring-2 ring-[color:var(--bg)]">
      {initial}
    </div>
  );
};

const Column = ({ icon: Icon, letter, title, subtitle, count, accent, children }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  letter: string;
  title: string; subtitle: string; count?: number; accent?: boolean;
  children: React.ReactNode;
}) => (
  <div className="card-inner p-3 flex flex-col min-h-[340px]">
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded-md grid place-items-center font-mono text-[11px] font-bold
          ${accent ? 'bg-[color:var(--accent)]/15 text-[color:var(--accent)] border border-[color:var(--accent)]/30'
            : 'bg-[color:var(--card-elev-2)] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)]'}`}>
          {letter}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <Icon size={12} className={accent ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink-muted)]'} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-muted)]">{title}</span>
          </div>
          <div className="text-[10px] text-[color:var(--ink-muted)] font-medium">{subtitle}</div>
        </div>
      </div>
      {count !== undefined && <span className="text-[10px] text-[color:var(--ink-muted)] font-mono">{count}</span>}
    </div>
    <div className="space-y-2 flex-1">{children}</div>
  </div>
);

/* ─── Component ──────────────────────────────────────────── */

const initialObjProgress: Record<string, number> = {
  'OBJ-01': 68,
  'OBJ-02': 42,
  'OBJ-03': 81,
};

export default function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [statuses, setStatuses] = useState<Record<string, TacticStatus>>({
    'TAC-12': 'done',
    'TAC-13': 'inprogress',
    'TAC-14': 'todo',
    'TAC-15': 'todo',
  });
  const [objProgress, setObjProgress] = useState<Record<string, number>>(initialObjProgress);
  const [pulsedObj, setPulsedObj] = useState<string | null>(null);
  const [cursorIdx, setCursorIdx] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [clickPulse, setClickPulse] = useState(0);

  const tacticIds = ['TAC-12', 'TAC-13', 'TAC-14', 'TAC-15'];

  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      const idx = i % tacticIds.length;
      setCursorIdx(idx);
      i++;
    }, 2200);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (cursorIdx < 0) return;
    const id = tacticIds[cursorIdx];
    const chip = chipRefs.current[id];
    const container = containerRef.current;
    if (chip && container) {
      const chipRect = chip.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setCursorPos({
        x: chipRect.left - containerRect.left + chipRect.width - 6,
        y: chipRect.top - containerRect.top + chipRect.height / 2 - 2,
      });
    }
    // Click moment: fire pulse + status advance + cascade to root objective
    const clickTimer = setTimeout(() => {
      setClickPulse((p) => p + 1);
      setStatuses((prev) => {
        const cur = prev[id];
        const next = nextStatus(cur);
        const tactic = tactiques.find((t) => t.id === id);
        if (tactic) {
          const delta = next === 'inprogress' ? 4 : next === 'done' ? 8 : -11;
          setObjProgress((op) => {
            let v = op[tactic.root] + delta;
            if (v > 96) v = initialObjProgress[tactic.root];
            if (v < 30) v = initialObjProgress[tactic.root];
            return { ...op, [tactic.root]: v };
          });
          setPulsedObj(tactic.root);
          setTimeout(() => setPulsedObj(null), 900);
        }
        return { ...prev, [id]: next };
      });
    }, 620);
    return () => clearTimeout(clickTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorIdx]);

  return (
    <div ref={containerRef} className="dashboard-mockup p-3.5 md:p-5 relative">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[color:var(--card-elev-2)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[color:var(--card-elev-2)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[color:var(--card-elev-2)]" />
          </div>
          <div className="h-4 w-px bg-[color:var(--card-elev-2)] shrink-0" />
          {/* Acme Corp workspace */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 rounded-md grid place-items-center text-[10px] font-bold text-[color:var(--ink)]"
                 style={{ background: 'linear-gradient(135deg,#E11D48,#9F1239)' }}>A</div>
            <span className="text-[12px] text-[color:var(--ink-muted)] font-medium">Acme SAS</span>
            <ChevronRight size={12} className="text-[color:var(--ink-muted)]" />
            <span className="text-[12px] text-[color:var(--ink-muted)]">Pilotage marketing</span>
          </div>
          <span className="hidden md:inline text-[10px] text-[color:var(--ink-muted)] font-mono font-medium truncate">Cette semaine · S24</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold px-2 py-1 rounded-md bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/30 text-[color:var(--accent)] uppercase tracking-[0.1em]">
            Méthode OST
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[color:var(--ink-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] pulse-soft" />
            En direct
          </span>
        </div>
      </div>

      {/* Sub-bar : exemple fictif */}
      <div className="mb-3 px-1 flex items-center justify-between">
        <span className="text-[10px] text-[color:var(--ink-muted)] italic">Exemple — Acme SAS, PME B2B · 12 M€ de CA</span>
        <div className="hidden md:flex items-center gap-1 text-[10px] text-[color:var(--ink-muted)]">
          <span className="px-2 py-0.5 rounded-md bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)]">Tableau</span>
          <span className="px-2 py-0.5 rounded-md hover:bg-[color:var(--card-elev-1)] cursor-pointer">Calendrier</span>
          <span className="px-2 py-0.5 rounded-md hover:bg-[color:var(--card-elev-1)] cursor-pointer">Priorités</span>
        </div>
      </div>

      {/* ─── Entrée / Sortie swimlanes banner ─── */}
      <div className="hidden md:grid grid-cols-4 gap-3 mb-2">
        {/* ENTRÉE — client */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/8 border border-rose-400/20">
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-rose-300 dark:text-rose-300">Vous</span>
          <div className="h-3 w-px bg-rose-400/25" />
          <div className="w-4 h-4 rounded grid place-items-center text-[8.5px] font-bold text-[color:var(--ink)]"
               style={{ background: 'linear-gradient(135deg,#E11D48,#9F1239)' }}>A</div>
          <span className="text-[10.5px] text-[color:var(--ink-muted)]">Acme SAS transmet ses objectifs</span>
        </div>

        {/* SORTIE — Uclic (span 3) */}
        <div className="col-span-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[color:var(--accent)]/8 border border-[color:var(--accent)]/25">
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-[color:var(--accent)]">Uclic</span>
          <div className="h-3 w-px bg-[color:var(--accent)]/30" />
          <Image src="/logo.svg" alt="uclic" width={42} height={12} className="h-3 w-auto opacity-90 logo-themed" />
          <ArrowRight size={11} className="text-[color:var(--ink-muted)]" />
          <span className="text-[10.5px] text-[color:var(--ink-muted)]">Plans, actions chaque semaine &amp; agents IA livrés à Acme SAS</span>
        </div>
      </div>

      {/* 4-column Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* ── OBJECTIFS ── */}
        <Column icon={Target} letter="O" title="Objectifs" subtitle="Direction · trimestre" count={objectifs.length} accent>
          {objectifs.map((o, i) => {
            const ln = lineage[o.id];
            const progress = objProgress[o.id] ?? o.progress;
            const isPulsed = pulsedObj === o.id;
            return (
              <motion.div key={o.id}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                animate={isPulsed
                  ? { boxShadow: `0 0 0 1px ${ln.border}, 0 8px 24px -8px ${ln.soft}` }
                  : { boxShadow: '0 0 0 0 transparent' }}
                style={{ borderLeftColor: ln.hue, borderLeftWidth: 3 }}
                className="p-2.5 pl-3 rounded-xl bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] hover:border-[color:var(--border-strong)] transition-colors relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ln.hue }} />
                    <Ref id={o.id} tone="green" />
                  </span>
                  <span className="text-[9px] font-mono text-[color:var(--ink-muted)]">{o.kpi}</span>
                </div>
                <div className="text-[12.5px] text-[color:var(--ink)] font-medium leading-snug">{o.title}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Avatar name={o.owner} />
                    <span className="text-[10px] text-[color:var(--ink-muted)]">{o.owner.split(' · ')[0]}</span>
                  </div>
                  <motion.span
                    key={progress}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] font-semibold"
                    style={{ color: isPulsed ? ln.hue : 'var(--accent)' }}>
                    {Math.round(progress)}%
                  </motion.span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-[color:var(--card-elev-2)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: ln.hue }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </Column>

        {/* ── STRATÉGIES ── */}
        <Column icon={Compass} letter="S" title="Stratégies" subtitle="Chef d'orchestre · pilotage" count={strategies.length}>
          {strategies.map((s, i) => {
            const ln = lineage[s.root];
            return (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                style={{ borderLeftColor: ln.hue, borderLeftWidth: 3 }}
                className="p-2.5 pl-3 rounded-xl bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] hover:border-[color:var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <Ref id={s.id} />
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[color:var(--ink-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ln.hue }} />
                    <ChevronRight size={10} className="-mx-0.5" /> {s.parent}
                  </span>
                </div>
                <div className="text-[12.5px] text-[color:var(--ink)] font-medium leading-snug">{s.title}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Avatar name={s.owner} />
                    <span className="text-[10px] text-[color:var(--ink-muted)]">{s.owner.split(' · ')[0]}</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]">{s.channel}</span>
                </div>
              </motion.div>
            );
          })}
        </Column>

        {/* ── TACTIQUES (hebdo, ICE) ── */}
        <Column icon={Ticket} letter="T" title="Tactiques · S24" subtitle="Experts · 1 semaine · priorité" count={tactiques.length}>
          {tactiques.map((t, i) => {
            const ln = lineage[t.root];
            const status = statuses[t.id] || 'todo';
            const meta = statusMeta[status];
            const isTarget = tacticIds[cursorIdx] === t.id;
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
                animate={isTarget ? { boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent)' } : { boxShadow: '0 0 0 0px transparent' }}
                style={{ borderLeftColor: ln.hue, borderLeftWidth: 3 }}
                className="p-2.5 pl-3 rounded-xl bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <Ref id={t.id} />
                  <span
                    ref={(el) => { chipRefs.current[t.id] = el; }}
                    className={`relative inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded-md border uppercase tracking-[0.06em] ${meta.cls}`}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={status}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.22 }}
                        className="inline-flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
                <div className="text-[12.5px] text-[color:var(--ink)] font-medium leading-snug">{t.title}</div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-baseline gap-1 px-1.5 py-0.5 rounded-md bg-[color:var(--accent)]/12 border border-[color:var(--accent)]/25 text-[color:var(--accent)]">
                    <span className="text-[10px] font-semibold">ICE</span>
                    <span className="text-[11px] font-bold">{t.ice}</span>
                  </span>
                  <span className="text-[9px] font-mono text-[color:var(--ink-muted)]">I{t.I}·C{t.C}·E{t.E}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-mono text-[color:var(--ink-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ln.hue }} />
                    <ChevronRight size={10} className="-mx-0.5" /> {t.parent}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <Avatar name={t.owner} />
                    <span className="text-[10px] text-[color:var(--ink-muted)]">{t.owner}</span>
                  </div>
                  {t.agent && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] text-violet-800 dark:text-violet-200 px-1.5 py-0.5 rounded-md bg-violet-500/12 border border-violet-500/40">
                      <Sparkles size={9} className="text-violet-700 dark:text-violet-300" />
                      {t.agent}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </Column>

        {/* ── AGENTS IA ── */}
        <Column icon={Bot} letter="IA" title="Agents IA" subtitle="Prêts à déployer · accélération" count={agents.length}>
          {agents.map((a, i) => {
            const ln = lineage[a.root];
            return (
              <motion.div key={a.name}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06 }}
                style={{ borderLeftColor: ln.hue, borderLeftWidth: 3 }}
                className="p-2.5 pl-3 rounded-xl bg-violet-500/[0.05] border border-violet-400/15 hover:border-violet-400/35 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg grid place-items-center bg-gradient-to-br from-violet-500/30 to-indigo-500/20 border border-violet-500/40 shrink-0">
                    <a.icon size={13} className="text-violet-700 dark:text-violet-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-medium text-[color:var(--ink)] truncate">{a.name}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[color:var(--ink-muted)]">
                      <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'active' ? 'bg-emerald-400 pulse-soft' : 'bg-[color:var(--ink-dim)]'}`} />
                      {a.tag}
                    </div>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[9px] font-mono text-[color:var(--ink-muted)] pl-0.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: ln.hue }} />
                  <ChevronRight size={10} className="-mx-0.5" /> {a.tactic}
                </div>
              </motion.div>
            );
          })}
          <motion.button
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.55 }}
            className="w-full p-2.5 rounded-xl border border-dashed border-[color:var(--border-subtle)] text-[11px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/40 transition-colors flex items-center justify-center gap-1.5">
            <Plus size={12} /> Ajouter un agent IA
          </motion.button>
        </Column>
      </div>

      {/* Animated demo cursor — ticks statuses in the Tactiques column */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
        animate={cursorIdx < 0 ? { opacity: 0 } : { opacity: 1, x: cursorPos.x, y: cursorPos.y }}
        transition={{
          x: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
          y: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.3 },
        }}>
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 20 20" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            <path
              d="M2 2 L2 15 L5.5 11.5 L7.5 16 L9.5 15 L7.5 10.5 L12.5 10.5 Z"
              fill="#FFFFFF"
              stroke="#0A0807"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <AnimatePresence>
            <motion.span
              key={clickPulse}
              initial={{ scale: 0.4, opacity: 0.65 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute -left-2 -top-2 w-6 h-6 rounded-full border-2 border-[color:var(--accent)]"
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer — OST legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10.5px] text-[color:var(--ink-muted)] px-1">
        <span className="inline-flex items-center gap-1.5">
          <span className="font-mono font-bold text-[color:var(--accent)]">O</span>bjectifs
        </span>
        <ChevronRight size={11} className="text-[color:var(--ink-muted)]" />
        <span className="inline-flex items-center gap-1.5">
          <span className="font-mono font-bold text-[color:var(--ink-muted)]">S</span>tratégies
        </span>
        <ChevronRight size={11} className="text-[color:var(--ink-muted)]" />
        <span className="inline-flex items-center gap-1.5">
          <span className="font-mono font-bold text-[color:var(--ink-muted)]">T</span>actiques
        </span>
        <span className="inline-flex items-center gap-1.5 ml-1">
          <span className="font-mono font-bold text-violet-700 dark:text-violet-300">+ IA</span>
        </span>
        <span className="ml-auto text-[color:var(--ink-muted)] font-mono">Méthode OST · Cycle 1 semaine · priorisation</span>
      </div>
    </div>
  );
}
