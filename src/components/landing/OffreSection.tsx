'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Search, Send, Cpu, ArrowRight, ArrowDown, Check } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import { useCounter } from '@/hooks/useCounter';

/* ─── uclic pictogram (the shape in front of the wordmark) — used as LED mask ─── */
const UCLIC_LOGO_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 44'><path d='M37.2543 33.4178C37.2465 33.2182 37.2329 33.0187 37.2173 32.8181L37.2115 32.7549C37.1949 32.5544 37.1755 32.3538 37.1531 32.1543L35.803 18.2159C35.7494 17.6182 35.6988 17.0205 35.6569 16.4219C35.5791 15.3278 35.4564 14.2151 35.0661 13.1823C34.9385 12.8436 34.7789 12.5233 34.5998 12.2099C33.7237 10.74 32.3123 9.61865 30.6789 9.10566C30.0004 8.89248 29.2908 8.7854 28.5792 8.7854C26.3345 8.7854 24.4548 10.0713 22.8175 11.4808C20.8746 13.1522 18.92 14.8109 16.9663 16.4706C14.5201 18.5488 12.1995 20.5229 9.7338 22.6352C8.4411 23.743 7.08318 24.8575 5.74278 25.9059C4.53964 26.8472 3.12915 27.9063 2.12945 29.0773C0.836749 30.591 0.0424403 32.5436 0.00155668 34.6813C-0.0899447 39.5873 3.86409 43.6786 8.77013 43.7458C13.7404 43.8149 17.7918 39.8054 17.7918 34.8506C17.7918 33.3526 17.4229 31.8447 16.6675 30.5238C16.3073 29.894 15.5442 29.0053 14.9864 28.5419C14.4296 28.0786 13.8747 27.6211 13.4873 26.9942C12.914 26.0665 12.6103 24.986 12.6103 23.8958C12.6103 20.6319 15.256 17.9871 18.5189 17.9871C21.1082 17.9871 23.314 19.5991 24.6378 21.7406C26.1496 24.1859 26.169 26.8277 26.169 29.6098C26.169 31.211 26.169 32.8133 26.169 34.4155C26.169 37.4818 28.6551 39.9669 31.7204 39.9669C33.8639 39.9669 35.7981 38.682 36.7073 36.7527C37.193 35.7219 37.301 34.582 37.2553 33.4188L37.2543 33.4178Z' fill='black'/></svg>`;
const UCLIC_LOGO_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(UCLIC_LOGO_SVG)}")`;

/* ─── Mini abstract product mockups, full-width inside each pillar card ─── */

function MockInbound() {
  return (
    <svg viewBox="0 0 320 80" preserveAspectRatio="xMinYMid meet" className="w-full h-full" aria-hidden="true">
      {/* Mini search bar */}
      <rect x="20" y="10" width="280" height="14" rx="7" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="32" cy="17" r="2.5" fill="var(--accent)" fillOpacity="0.6" />
      {/* Typing text inside searchbar (scaleX from left) */}
      <motion.rect
        x="42" y="15" width="90" height="4" rx="2"
        fill="var(--ink)" fillOpacity="0.45"
        style={{ transformOrigin: '0% 50%', transformBox: 'fill-box' as const }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.3, 0.85, 1], repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
      />
      {/* Blinking caret that follows the typing */}
      <motion.rect
        y="13" width="1.2" height="8"
        fill="var(--accent)"
        initial={{ x: 42 }}
        animate={{ x: [42, 132, 132, 42], opacity: [1, 1, 0.2, 1] }}
        transition={{ duration: 4, times: [0, 0.3, 0.85, 1], repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
      />

      {/* Result 1 — highlighted (rises to top) */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <rect x="20" y="32" width="280" height="16" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" />
        <rect x="30" y="38" width="60" height="4" rx="2" fill="var(--accent)" fillOpacity="0.85" />
        {/* Pulsing halo around badge */}
        <motion.circle
          cx="290" cy="40" r="6"
          fill="var(--accent)"
          fillOpacity="0.3"
          animate={{ r: [6, 11, 6], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <circle cx="290" cy="40" r="6" fill="var(--accent)" />
        <text x="290" y="42.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#000">1</text>
      </motion.g>

      {/* Result 2 — faded */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}>
        <rect x="20" y="56" width="280" height="14" rx="3.5" fill="var(--ink)" fillOpacity="0.04" />
        <rect x="30" y="61" width="50" height="3" rx="1.5" fill="var(--ink)" fillOpacity="0.30" />
      </motion.g>
    </svg>
  );
}

function MockOutbound() {
  return (
    <svg viewBox="0 0 320 80" preserveAspectRatio="xMinYMid meet" className="w-full h-full" aria-hidden="true">
      {/* Connector lines */}
      <line x1="50" y1="40" x2="120" y2="40" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="120" y1="40" x2="200" y2="20" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="120" y1="40" x2="200" y2="60" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="200" y1="20" x2="280" y2="40" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="200" y1="60" x2="280" y2="40" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Source node */}
      <circle cx="50" cy="40" r="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.5" />
      <circle cx="50" cy="40" r="4" fill="var(--accent)" />
      {/* Hub */}
      <rect x="113" y="33" width="14" height="14" rx="2" fill="var(--ink)" fillOpacity="0.05" stroke="var(--accent)" strokeOpacity="0.6" />
      {/* Targets */}
      <circle cx="200" cy="20" r="9" fill="var(--ink)" fillOpacity="0.04" stroke="var(--ink)" strokeOpacity="0.3" />
      <circle cx="200" cy="60" r="9" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeOpacity="0.5" />
      {/* Endpoint = booked */}
      <circle cx="280" cy="40" r="11" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="280" cy="40" r="4" fill="var(--accent)" />
      {/* Travelling pulse */}
      <motion.circle r="2.2" fill="var(--accent)"
        initial={{ cx: 50, cy: 40, opacity: 0 }}
        animate={{ cx: [50, 120, 200, 280], cy: [40, 40, 60, 40], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.6 }}
      />
    </svg>
  );
}

type LogKind = 'cmd' | 'ok' | 'info' | 'warn' | 'done';
type LogLine = { t: string; kind: LogKind };

const sessions: LogLine[][] = [
  [
    { t: '$ agent run seo-writer --auto',              kind: 'cmd' },
    { t: '[OK] connected to n8n · 12 workflows',        kind: 'ok' },
    { t: '→ generating 12 articles · brand QA pass',    kind: 'info' },
    { t: '[OK] meta + schema + internal links',         kind: 'ok' },
    { t: '[✓] published · validated · indexed',         kind: 'done' },
  ],
  [
    { t: '$ agent run outbound-bot --icp dsi-scaleup',  kind: 'cmd' },
    { t: '[OK] LinkedIn API · enriched 420 leads',      kind: 'ok' },
    { t: '→ scoring + sequencing in HubSpot',           kind: 'info' },
    { t: '[!] 12 leads dropped · low intent score',     kind: 'warn' },
    { t: '[✓] 38 RDV qualifiés bookés · semaine 24',    kind: 'done' },
  ],
  [
    { t: '$ agent run paid-bid-optimizer --24h',        kind: 'cmd' },
    { t: '[OK] Google Ads + Meta · API ok',             kind: 'ok' },
    { t: '→ rebalance budgets across 14 campaigns',     kind: 'info' },
    { t: '[OK] kill 3 ad-sets · ROAS < 1.8',            kind: 'ok' },
    { t: '[✓] CPL −22 % · ROAS × 2,4',                  kind: 'done' },
  ],
  [
    { t: '$ agent run crm-trigger --hubspot --live',    kind: 'cmd' },
    { t: '[OK] 37 triggers déployés',                   kind: 'ok' },
    { t: '→ scoring + nurture temps réel',              kind: 'info' },
    { t: '[OK] 186 prospects priorisés ce matin',       kind: 'ok' },
    { t: '[✓] conv ×3 · −40 % temps qualif',            kind: 'done' },
  ],
];

function MockIA() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const tick = setInterval(() => setStep((s) => (s + 1) % sessions.length), 6000);
    return () => clearInterval(tick);
  }, []);

  const lines = sessions[step];

  return (
    <div className="relative w-full h-full px-4 py-3 font-mono leading-[1.4]">
      {/* Window header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/70" />
          <span className="w-2 h-2 rounded-full bg-amber-400/70" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-[10px] text-[color:var(--ink-muted)] tracking-wide">~/agents · uclic</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[9.5px] text-[color:var(--ink-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-soft" />
          live · session {step + 1}/{sessions.length}
        </span>
      </div>

      {/* Log lines (fade-cycle every 6 s) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-0.5">
          {lines.map((l, i) => (
            <motion.div
              key={l.t}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.35 }}
              className="text-[11px] truncate">
              {l.kind === 'cmd' && (
                <>
                  <span className="text-[color:var(--accent)] font-bold">$</span>
                  <span className="text-[color:var(--ink)] ml-1">{l.t.slice(2)}</span>
                </>
              )}
              {l.kind === 'ok'   && <span className="text-emerald-500 dark:text-emerald-400">{l.t}</span>}
              {l.kind === 'info' && <span className="text-[color:var(--ink-muted)]">{l.t}</span>}
              {l.kind === 'warn' && <span className="text-amber-600 dark:text-amber-400">{l.t}</span>}
              {l.kind === 'done' && <span className="text-[color:var(--accent)] font-semibold">{l.t}</span>}
            </motion.div>
          ))}
          {/* Blinking cursor on last line */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block w-[6px] h-[12px] bg-[color:var(--accent)] align-middle ml-1 mt-1"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Mocks: Record<string, React.FC> = {
  Inbound: MockInbound,
  Outbound: MockOutbound,
  'IA & Développement': MockIA,
};

const piliers = [
  {
    n: '01',
    icon: Search,
    label: 'Captez la demande',
    title: 'Inbound',
    desc: 'SEO, Google & Meta Ads, pages de conversion et contenu à forte intention. On va chercher ceux qui vous cherchent déjà.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Contenu', 'Conversion'],
    kpi: { value: '× 2,4', label: 'contacts organiques moyens en 6 mois' },
    span: '',
  },
  {
    n: '02',
    icon: Send,
    label: 'Créez la demande',
    title: 'Outbound',
    desc: "Signaux d'achat, ciblage précis, séquences email + LinkedIn, appels à froid. On va chercher ceux qui ne vous connaissent pas encore.",
    tags: ['Signaux d\'achat', 'Ciblage', 'Cold Email', 'LinkedIn', 'Appels', 'SDR'],
    kpi: { value: '+38', label: 'RDV qualifiés / mois en moyenne' },
    featured: true,
    span: '',
  },
  {
    n: '03',
    icon: Cpu,
    label: 'Industrialisez sur-mesure',
    title: 'IA & Développement',
    desc: "Agents IA en production, applications métier déployées, workflows n8n, scripts sur-mesure. Ce que vos concurrents n'ont pas encore industrialisé.",
    tags: ['Agents IA', 'Apps custom', 'n8n', 'Next.js', 'Scoring', 'APIs'],
    kpi: { value: '− 70 %', label: 'temps passé sur tâches manuelles répétitives' },
    span: '',
  },
];

/* ─── Animated KPI ─── */
function AnimatedKpi({ raw, inView, featured }: { raw: string; inView: boolean; featured?: boolean }) {
  const display = useCounter(raw, inView);
  return (
    <span
      className={`font-display font-medium text-[28px] tracking-[-0.02em] tabular-nums ${
        featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
      }`}>
      {display}
    </span>
  );
}

/* ─── Bento corner dot positions (4 corners of each column) ─── */
// Maps each card index → the 4 dots surrounding it (top-left, top-right, bottom-right, bottom-left).
const DOTS = [
  { left: '0%',      top: '0%'   }, // 0 top-left
  { left: '33.333%', top: '0%'   }, // 1 top-int-1
  { left: '66.666%', top: '0%'   }, // 2 top-int-2
  { left: '100%',    top: '0%'   }, // 3 top-right
  { left: '0%',      top: '100%' }, // 4 bottom-left
  { left: '33.333%', top: '100%' }, // 5 bottom-int-1
  { left: '66.666%', top: '100%' }, // 6 bottom-int-2
  { left: '100%',    top: '100%' }, // 7 bottom-right
];
const CARD_DOTS: Record<number, number[]> = {
  0: [0, 1, 5, 4], // card 0 corners
  1: [1, 2, 6, 5], // card 1 corners
  2: [2, 3, 7, 6], // card 2 corners
};

export default function OffreSection() {
  const bentoRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(bentoRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const stagger = reduce ? 0 : 0.12;

  return (
    <section id="offre" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Pulse keyframes — scoped via styled-jsx */}
      <style jsx>{`
        @keyframes offrePulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes offrePulseSoft {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.75; }
          50%      { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        .offre-dot-outbound {
          background-color: var(--accent) !important;
          animation: offrePulseSoft 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .offre-dot-outbound { animation: none; }
        }
        .offre-dot-active {
          background-color: var(--accent) !important;
          animation: offrePulse 1.6s ease-in-out infinite;
          box-shadow: 0 0 12px 0 color-mix(in oklab, var(--accent) 45%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .offre-dot-active { animation: none; }
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Notre offre
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
          Trois piliers. Une seule équipe.{' '}
          <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
            <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            Zéro silo.
          </span>
        </h2>
        <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
          Là où une agence spécialisée couvre un seul canal, on active l'ensemble du parcours client avec une équipe senior pilotée.
        </p>

        {/* Bento layout : 3 cards side-by-side — tight grid, no gaps, no rounding */}
        <motion.div
          ref={bentoRef}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
          }}
          className="mt-14 grid md:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
          {/* Decorative dots at card intersections (and outer corners) */}
          {DOTS.map((pos, idx) => {
            // Dots 1, 2, 5, 6 entourent la card Outbound (index 1) → pulse soft permanent
            const isOutboundDot = [1, 2, 5, 6].includes(idx);
            return (
              <span
                key={idx}
                aria-hidden="true"
                className={`hidden md:block pointer-events-none absolute w-[14px] h-[14px] rounded-full bg-[#201E1D] light:bg-[#E7E6E3] z-[2] ${
                  isOutboundDot ? 'offre-dot-outbound' : ''
                }`}
                style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
              />
            );
          })}
          {piliers.map((p, i) => (
            <motion.article
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`group p-8 flex flex-col relative overflow-hidden transition-colors duration-300 !rounded-none border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white ${
                i < piliers.length - 1 ? 'md:border-r' : ''
              } ${i !== piliers.length - 1 ? 'border-b md:border-b-0' : ''} ${p.span}`}>




              <div className="relative">
                <div
                  className={`w-11 h-11 grid place-items-center border transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] ${
                    p.featured
                      ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent)]/30'
                      : 'bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] border-[color:var(--border-subtle)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/20'
                  }`}>
                  <p.icon size={20} strokeWidth={1.75} />
                </div>
              </div>

              <h3 className="relative mt-6 text-[28px] font-display font-medium leading-tight">{p.title}</h3>
              <p className="relative mt-3 text-[16px] text-[color:var(--ink)] leading-[1.6]">{p.desc}</p>

              <div className="relative mt-8 flex flex-col items-start gap-1 pt-5 border-t border-[color:var(--border-subtle)]">
                <AnimatedKpi raw={p.kpi.value} inView={inView} featured={p.featured} />
                <span className="text-[12.5px] text-[color:var(--ink-muted)] leading-tight">{p.kpi.label}</span>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="pill !rounded-none !text-[10.5px] !py-1 !px-2.5 !bg-[color:var(--card)] transition-colors group-hover:!border-[color:var(--border-strong)]">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#tarifs"
                className={`relative mt-auto pt-7 inline-flex items-center gap-1.5 text-[13px] hover:gap-2.5 transition-all self-start ${
                  p.featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink-muted)] hover:text-[color:var(--accent)]'
                }`}>
                Activer {p.title}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex items-center justify-center gap-2 text-[14px] text-[color:var(--ink-muted)]">
          Derrière ces 3 piliers, une équipe senior que vous rencontrez dès le premier call
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[color:var(--accent)]">
            <ArrowDown size={14} />
          </motion.span>
        </motion.p>

        {/* ─── Recommandés par — avatars qui se chevauchent ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[color:var(--accent)]">
            <Check size={12} strokeWidth={2.8} />
            Recommandé par
          </div>
          <ul className="flex items-center">
            {[
              { src: '/hero/brice-maurin.webp', alt: 'Brice Maurin' },
              { src: '/hero/denis.webp',        alt: 'Denis Cohen' },
              { src: '/hero/jean.webp',         alt: 'Jean de La Rochebrochard' },
              { src: '/hero/benoit.webp',       alt: 'Benoit Dubos' },
              { src: '/hero/cabane.webp',       alt: 'Guillaume Cabane' },
            ].map((p, i) => (
              <li key={p.src} className={i > 0 ? '-ml-3' : ''} style={{ zIndex: 5 - i }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  title={p.alt}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[color:var(--bg)] light:border-white"
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
