'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Compass, Ticket, Bot, Sparkles, Zap, Check, ChevronDown, TrendingUp } from 'lucide-react';

type Status = 'todo' | 'inprogress' | 'done';
const ORDER: Status[] = ['todo', 'inprogress', 'done'];

const statusMeta: Record<Status, { label: string; cls: string; dot: string }> = {
  todo:       { label: 'À faire',    cls: 'bg-[color:var(--card-elev-2)] text-[color:var(--ink)] border-[color:var(--border-strong)]', dot: 'bg-[color:var(--ink-dim)]' },
  inprogress: { label: 'En cours',   cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-200 border-amber-500/50',                   dot: 'bg-amber-500 pulse-soft' },
  done:       { label: 'Livré',      cls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border-emerald-500/50',           dot: 'bg-emerald-500' },
};

const stageMeta = {
  o: { idx: 1, title: 'Objectif',    subtitle: 'Direction · trimestre',  icon: Target },
  s: { idx: 2, title: 'Stratégie',   subtitle: 'Chef d\'orchestre',      icon: Compass },
  t: { idx: 3, title: 'Tactique',    subtitle: 'Cette semaine',          icon: Ticket },
  i: { idx: 4, title: 'Agent IA',    subtitle: 'Accélération',            icon: Bot },
};

type Journey = {
  hue: string;
  channel: string;
  narrative: string;
  obj:   { title: string; owner: string; ownerPhoto: string; progress: number; kpi: string };
  str:   { title: string; owner: string; ownerPhoto: string; channel: string };
  tac:   { title: string; owner: string; ice: number };
  agent: { name: string; icon: React.ComponentType<{ size?: number; className?: string }>; unit: string; start: number; deltaLabel: string } | null;
  metric: { value: string; label: string };
};

const journeys: Journey[] = [
  {
    hue: '#8B5CF6',
    channel: 'SEO',
    narrative: 'Cette semaine on attire',
    obj: { title: '+3 M€ de CA · S1 2026', owner: 'Wladimir · CEO', ownerPhoto: 'https://randomuser.me/api/portraits/men/32.jpg', progress: 68, kpi: 'CA' },
    str: { title: 'Dominer Google sur les requêtes d\'achat', owner: 'Alexis · SEO', ownerPhoto: 'https://randomuser.me/api/portraits/men/45.jpg', channel: 'SEO' },
    tac: { title: 'Publier 15 pages comparatives concurrents', owner: 'Théo', ice: 8.6 },
    agent: { name: 'Rédacteur SEO', icon: Sparkles, unit: 'pages · 7 j', start: 12, deltaLabel: 'validées' },
    metric: { value: '× 2,4', label: 'trafic organique en 90 j' },
  },
  {
    hue: '#38BDF8',
    channel: 'Prospection',
    narrative: 'Cette semaine on prospecte',
    obj: { title: '+40 % de prospects qualifiés', owner: 'Claire · CMO', ownerPhoto: 'https://randomuser.me/api/portraits/women/52.jpg', progress: 42, kpi: 'Leads' },
    str: { title: 'Prospection ciblée des décideurs IT', owner: 'Marc · Prospection', ownerPhoto: 'https://randomuser.me/api/portraits/men/51.jpg', channel: 'Prospection' },
    tac: { title: 'Séquence de prospection 5 étapes', owner: 'Marc', ice: 7.8 },
    agent: { name: 'Agent Prospection', icon: Zap, unit: 'messages · 7 j', start: 420, deltaLabel: 'aujourd\'hui' },
    metric: { value: '+23 RDV', label: 'générés cette semaine' },
  },
  {
    hue: '#10B981',
    channel: 'CRM',
    narrative: 'Cette semaine on automatise',
    obj: { title: '+40 % de prospects qualifiés', owner: 'Claire · CMO', ownerPhoto: 'https://randomuser.me/api/portraits/women/52.jpg', progress: 42, kpi: 'Leads' },
    str: { title: 'IA : scoring prospects + relances auto', owner: 'Julien · CRM', ownerPhoto: 'https://randomuser.me/api/portraits/men/85.jpg', channel: 'CRM' },
    tac: { title: 'Scoring IA : 37 déclencheurs HubSpot', owner: 'Julien', ice: 7.2 },
    agent: { name: 'Agent CRM', icon: Bot, unit: 'prospects scorés', start: 186, deltaLabel: 'priorisés' },
    metric: { value: '− 40 %', label: 'de temps de qualification' },
  },
  {
    hue: '#F59E0B',
    channel: 'Pubs',
    narrative: 'Cette semaine on rentabilise',
    obj: { title: 'Rentabiliser un client en < 9 mois', owner: 'Marc · CFO', ownerPhoto: 'https://randomuser.me/api/portraits/men/60.jpg', progress: 81, kpi: 'Coût' },
    str: { title: 'Baisser le coût des pubs via reciblage', owner: 'Anaïs · Pubs', ownerPhoto: 'https://randomuser.me/api/portraits/women/44.jpg', channel: 'Pubs' },
    tac: { title: 'Reciblage publicitaire LinkedIn & Meta', owner: 'Anaïs', ice: 6.9 },
    agent: null,
    metric: { value: '− 28 %', label: 'sur le coût par acquisition' },
  },
];

const JOURNEY_MS        = 8200;
const CURSOR_REVEAL_MS  = 1700;
const CLICK_1_MS        = 3000;
const CLICK_2_MS        = 5000;
const ENTER_DURATION    = 0.55;
const EXIT_DURATION     = 0.32;

export default function HeroStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement | null>(null);

  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<Status>('todo');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [clickPulse, setClickPulse] = useState(0);

  const journey = journeys[idx];
  const [progress, setProgress] = useState(journey.obj.progress);
  const [count, setCount] = useState(journey.agent?.start ?? 0);

  useEffect(() => {
    setStatus('todo');
    setProgress(journey.obj.progress);
    setCount(journey.agent?.start ?? 0);
    setCursorPos((c) => ({ ...c, visible: false }));

    const reposition = () => {
      const chip = chipRef.current;
      const container = containerRef.current;
      if (chip && container) {
        const cr = chip.getBoundingClientRect();
        const cc = container.getBoundingClientRect();
        setCursorPos({
          x: cr.left - cc.left + cr.width - 6,
          y: cr.top - cc.top + cr.height / 2 - 2,
          visible: true,
        });
      }
    };

    const t1 = setTimeout(reposition, CURSOR_REVEAL_MS);
    const t2 = setTimeout(() => {
      reposition();
      setClickPulse((p) => p + 1);
      setStatus('inprogress');
      setProgress((p) => Math.min(96, p + 3));
    }, CLICK_1_MS);
    const t3 = setTimeout(() => {
      reposition();
      setClickPulse((p) => p + 1);
      setStatus('done');
      setProgress((p) => Math.min(96, p + 7));
      setCount((c) => c + (journey.agent ? Math.round(journey.agent.start * 0.04) + 3 : 0));
    }, CLICK_2_MS);
    const t4 = setTimeout(() => setCursorPos((c) => ({ ...c, visible: false })), JOURNEY_MS - 700);
    const t5 = setTimeout(() => setIdx((i) => (i + 1) % journeys.length), JOURNEY_MS);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div className="relative" style={{ perspective: '1600px' }}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="card-surface relative w-full max-w-[480px] mx-auto p-3 md:p-3.5 !bg-[color:var(--surface-raised)] overflow-hidden lg:[transform:rotateY(-5deg)_rotateX(2deg)]"
        style={{ transformStyle: 'preserve-3d' }}>

        {/* ─── Header : OST · channel mutant · live ─── */}
        <div className="flex items-center justify-between mb-2.5 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)] px-2 py-0.5 rounded-md bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/30 shrink-0">
              Méthode OST
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`chan-${idx}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-md border shrink-0"
                style={{
                  color: journey.hue,
                  borderColor: `${journey.hue}55`,
                  background: `${journey.hue}14`,
                }}>
                Canal · {journey.channel}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[color:var(--ink-muted)] font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-soft" />
            En direct
          </span>
        </div>

        {/* ─── Narrative bar : miroir du hero ─── */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={`narr-${idx}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.35 }}
              className="text-[12px] font-display font-medium text-[color:var(--ink)] truncate">
              {journey.narrative}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-1.5 shrink-0">
            {journeys.map((j, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-400"
                style={{
                  background: i === idx ? j.hue : 'color-mix(in srgb, var(--ink) 22%, transparent)',
                  boxShadow: i === idx ? `0 0 0 3px ${j.hue}22` : 'none',
                  transform: i === idx ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            ))}
            <span className="ml-1 text-[9.5px] font-mono font-semibold text-[color:var(--ink-muted)] uppercase tracking-wider">
              {idx + 1}/4 canaux
            </span>
          </div>
        </div>

        {/* ─── Stage 1 — Objectif ─── */}
        <AnimatePresence mode="wait">
          <SlideCard key={`obj-${idx}`} meta={stageMeta.o} hue={journey.hue} accent enterDelay={0} exitDelay={0.36} checked>
            <div className="flex items-center justify-between gap-2">
              <div className="text-[13px] font-medium text-[color:var(--ink)] leading-snug flex-1">{journey.obj.title}</div>
              <motion.span
                key={progress}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] font-semibold text-[color:var(--accent)] shrink-0 font-mono">
                {Math.round(progress)} %
              </motion.span>
            </div>
            <div className="mt-2 h-[3px] rounded-full bg-[color:var(--card-elev-2)] overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{ background: journey.hue }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* shimmer on progress bump */}
              <motion.div
                key={`shim-${progress}`}
                initial={{ left: '-20%', opacity: 0.8 }}
                animate={{ left: '110%', opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute top-0 w-8 h-full bg-white/50 blur-sm"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <img src={journey.obj.ownerPhoto} alt={journey.obj.owner} className="w-4 h-4 rounded-full object-cover ring-1 ring-[color:var(--bg)]" />
                <span className="text-[10.5px] text-[color:var(--ink-muted)]">{journey.obj.owner}</span>
              </div>
              <span className="text-[9.5px] font-mono text-[color:var(--ink-muted)] uppercase tracking-wider">{journey.obj.kpi}</span>
            </div>
          </SlideCard>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Connector key={`c1-${idx}`} hue={journey.hue} active enterDelay={0.07} exitDelay={0.30} />
        </AnimatePresence>

        {/* ─── Stage 2 — Stratégie ─── */}
        <AnimatePresence mode="wait">
          <SlideCard key={`str-${idx}`} meta={stageMeta.s} hue={journey.hue} enterDelay={0.14} exitDelay={0.24} checked>
            <div className="text-[13px] font-medium text-[color:var(--ink)] leading-snug">{journey.str.title}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <img src={journey.str.ownerPhoto} alt={journey.str.owner} className="w-4 h-4 rounded-full object-cover ring-1 ring-[color:var(--bg)]" />
                <span className="text-[10.5px] text-[color:var(--ink-muted)]">{journey.str.owner}</span>
              </div>
              <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-md border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]">{journey.str.channel}</span>
            </div>
          </SlideCard>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Connector key={`c2-${idx}`} hue={journey.hue} active={status !== 'todo'} enterDelay={0.21} exitDelay={0.18} />
        </AnimatePresence>

        {/* ─── Stage 3 — Tactique (animée) ─── */}
        <AnimatePresence mode="wait">
          <SlideCard key={`tac-${idx}`} meta={stageMeta.t} hue={journey.hue} highlighted enterDelay={0.28} exitDelay={0.12}>
            <div className="flex items-start justify-between gap-3">
              <div className="text-[13px] font-medium text-[color:var(--ink)] leading-snug flex-1">{journey.tac.title}</div>
              <span
                ref={chipRef}
                className={`relative inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded-md border uppercase tracking-[0.06em] shrink-0 ${statusMeta[status].cls}`}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.22 }}
                    className="inline-flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusMeta[status].dot}`} />
                    {statusMeta[status].label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="inline-flex items-baseline gap-1 px-1.5 py-0.5 rounded-md bg-[color:var(--accent)]/12 border border-[color:var(--accent)]/25 text-[color:var(--accent)]">
                <span className="text-[9.5px] font-semibold">ICE</span>
                <span className="text-[10.5px] font-bold">{journey.tac.ice}</span>
              </span>
              <span className="text-[10px] text-[color:var(--ink-muted)]">{journey.tac.owner} · cette semaine</span>
            </div>
          </SlideCard>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Connector key={`c3-${idx}`} hue={journey.hue} active={status === 'done'} enterDelay={0.35} exitDelay={0.06} />
        </AnimatePresence>

        {/* ─── Stage 4 — Agent IA ─── */}
        <AnimatePresence mode="wait">
          <SlideCard key={`agt-${idx}`} meta={stageMeta.i} hue={journey.hue} violet enterDelay={0.42} exitDelay={0}>
            {journey.agent ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg grid place-items-center bg-gradient-to-br from-violet-500/30 to-indigo-500/20 border border-violet-500/40 shrink-0">
                    <journey.agent.icon size={13} className="text-violet-700 dark:text-violet-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-[color:var(--ink)] truncate">{journey.agent.name}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[color:var(--ink-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-soft" />
                      <motion.span
                        key={count}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22 }}>
                        {count} {journey.agent.unit}
                      </motion.span>
                    </div>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {status === 'done' && journey.agent && (
                    <motion.span
                      key={`delta-${count}`}
                      initial={{ opacity: 0, scale: 0.7, x: -4 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-300 px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 shrink-0">
                      <TrendingUp size={10} />
                      +{Math.round((journey.agent?.start ?? 0) * 0.04) + 3}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-[12px] text-[color:var(--ink-muted)] italic py-1">Exécution 100 % humaine — pas d'agent IA sur ce parcours</div>
            )}
          </SlideCard>
        </AnimatePresence>

        {/* ─── Footer metric — outcome (compact) ─── */}
        <div className="mt-2.5 pt-2.5 border-t border-[color:var(--border-subtle)] flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 min-w-0">
            <TrendingUp size={13} className="text-[color:var(--accent)] shrink-0" />
            <AnimatePresence mode="wait">
              <motion.div
                key={`metric-${idx}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-baseline gap-1.5 min-w-0 truncate">
                <span className="text-[13px] font-display font-semibold text-[color:var(--ink)]">
                  {journey.metric.value}
                </span>
                <span className="text-[10.5px] text-[color:var(--ink-muted)] truncate">{journey.metric.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <span className="text-[9.5px] font-mono text-[color:var(--ink-muted)] uppercase tracking-wider hidden md:inline shrink-0">Impact</span>
        </div>

        {/* ─── Animated cursor ─── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-30"
          animate={cursorPos.visible ? { opacity: 1, x: cursorPos.x, y: cursorPos.y } : { opacity: 0 }}
          transition={{
            x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4 },
          }}>
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 20 20" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
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
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute -left-2 -top-2 w-6 h-6 rounded-full border-2 border-[color:var(--accent)]"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Subcomponents ────────────────────────────────────────── */

function SlideCard({
  meta,
  hue,
  children,
  accent,
  violet,
  highlighted,
  checked,
  enterDelay = 0,
  exitDelay = 0,
}: {
  meta: { idx: number; title: string; subtitle: string; icon: React.ComponentType<{ size?: number; className?: string }> };
  hue: string;
  children: React.ReactNode;
  accent?: boolean;
  violet?: boolean;
  highlighted?: boolean;
  checked?: boolean;
  enterDelay?: number;
  exitDelay?: number;
}) {
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: ENTER_DURATION, delay: enterDelay, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: 14, filter: 'blur(4px)', transition: { duration: EXIT_DURATION, delay: exitDelay, ease: [0.4, 0, 1, 1] } }}
      style={{ borderLeftColor: hue, borderLeftWidth: 3 }}
      className={`rounded-xl p-2.5 bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] relative ${
        highlighted ? 'ring-1 ring-[color:var(--accent)]/30 shadow-[0_0_0_3px_rgba(107,255,149,0.06)]' : ''
      }`}>
      <div className="flex items-center gap-2 mb-1.5">
        {/* Numbered badge */}
        <div
          className={`w-6 h-6 rounded-md grid place-items-center font-mono text-[11px] font-bold shrink-0 ${
            accent
              ? 'bg-[color:var(--accent)]/15 text-[color:var(--accent)] border border-[color:var(--accent)]/30'
              : violet
              ? 'bg-violet-500/15 text-violet-700 dark:text-violet-200 border border-violet-500/40'
              : 'bg-[color:var(--card-elev-2)] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)]'
          }`}>
          {meta.idx}
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Icon size={11} className={accent ? 'text-[color:var(--accent)]' : violet ? 'text-violet-700 dark:text-violet-300' : 'text-[color:var(--ink-muted)]'} />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-muted)]">{meta.title}</span>
            <span className="text-[9.5px] text-[color:var(--ink-muted)] truncate">· {meta.subtitle}</span>
          </div>
          {checked && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 shrink-0">
              <Check size={9} strokeWidth={3} className="text-emerald-600 dark:text-emerald-300" />
            </span>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function Connector({ hue, active, enterDelay = 0, exitDelay = 0 }: { hue: string; active?: boolean; enterDelay?: number; exitDelay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.8, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: ENTER_DURATION, delay: enterDelay, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: 10, scale: 0.85, filter: 'blur(3px)', transition: { duration: EXIT_DURATION, delay: exitDelay, ease: [0.4, 0, 1, 1] } }}
      className="flex flex-col items-center justify-center py-0.5 relative"
      aria-hidden="true">
      <div
        className="w-[2px] h-2 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(180deg, ${hue} 0 4px, transparent 4px 8px)`,
          backgroundSize: '2px 8px',
          backgroundRepeat: 'repeat-y',
          opacity: active ? 0.85 : 0.35,
        }}
      />
      <div
        className="w-5 h-5 rounded-full grid place-items-center transition-[background,box-shadow,transform] duration-500"
        style={{
          background: active ? hue : 'color-mix(in srgb, var(--ink) 20%, transparent)',
          boxShadow: active ? `0 4px 14px -4px ${hue}` : 'none',
          transform: active ? 'scale(1)' : 'scale(0.85)',
        }}>
        <ChevronDown size={11} strokeWidth={2.5} className="text-white" />
      </div>
      <div
        className="w-[2px] h-2 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(180deg, ${hue} 0 4px, transparent 4px 8px)`,
          backgroundSize: '2px 8px',
          backgroundRepeat: 'repeat-y',
          opacity: active ? 0.85 : 0.35,
        }}
      />
    </motion.div>
  );
}
