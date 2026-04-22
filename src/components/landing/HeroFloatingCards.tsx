'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Bot, Users, BarChart3, Check, Target, Code2 } from 'lucide-react';

/* Floating decorative mockups straddling the planet rim.
 * DA brutaliste : fond solide opaque, !rounded-none, border subtle, zéro blur,
 * icônes boxées carrées, chips rectangulaires. Rotations conservées. */

type CardProps = {
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  delay: number;
  xFrom: number;
  yFrom: number;
  children: React.ReactNode;
};

function FloatingCard({ top, left, right, rotate, delay, xFrom, yFrom, children }: CardProps) {
  return (
    <div
      className="pointer-events-none absolute hidden lg:block z-[1]"
      style={{ top, left, right }}>
      <motion.div
        initial={{ opacity: 0, x: xFrom, y: yFrom, rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </div>
  );
}

/* Container commun : même DA que les cards offres/cas clients (flat, border-subtle, opaque) */
const FLOAT_CARD =
  '!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--bg)] light:bg-white relative';
/* Overlay subtil pour reproduire le voile card-elev-1 en dark sans perdre l'opacité */
const FLOAT_OVERLAY =
  'absolute inset-0 bg-[color:var(--card-elev-1)] light:hidden pointer-events-none';

export default function HeroFloatingCards() {
  return (
    <>
      {/* Left · row 1 — ROI 90j */}
      <FloatingCard top="28%" left="7%" rotate={0} delay={0.7} xFrom={-12} yFrom={0}>
        <div className={`${FLOAT_CARD} p-3 w-[220px]`}>
          <div aria-hidden="true" className={FLOAT_OVERLAY} />
          <div className="relative flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[color:var(--ink-muted)]">ROI 90j</span>
            <span className="inline-flex items-center gap-0.5 text-[12px] font-mono font-bold text-emerald-500">
              <TrendingUp size={12} /> +24%
            </span>
          </div>
          <div className="relative text-[24px] font-display font-semibold text-[color:var(--ink)]">× 2,4</div>
          <svg viewBox="0 0 100 24" className="relative w-full h-5 mt-1" preserveAspectRatio="none">
            <path
              d="M 0 18 L 15 14 L 30 16 L 45 10 L 60 12 L 75 6 L 90 4 L 100 2"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </FloatingCard>

      {/* Right · row 1 — Nouveau RDV qualifié */}
      <FloatingCard top="28%" right="7%" rotate={0} delay={0.85} xFrom={12} yFrom={0}>
        <div className={`${FLOAT_CARD} p-3 w-[220px]`}>
          <div aria-hidden="true" className={FLOAT_OVERLAY} />
          <div className="relative flex items-center gap-2">
            <div className="w-8 h-8 grid place-items-center bg-[color:var(--accent)]/15 border border-[color:var(--accent)]/40 shrink-0">
              <Check size={15} strokeWidth={3} className="text-[color:var(--accent)]" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-[color:var(--ink)] truncate">Nouveau RDV qualifié</div>
              <div className="text-[11px] text-[color:var(--ink-muted)] truncate">Séquence prospection · Marc</div>
            </div>
          </div>
        </div>
      </FloatingCard>

      {/* Left · row 2 — App custom déployée */}
      <FloatingCard top="55%" left="7%" rotate={0} delay={1.0} xFrom={-12} yFrom={0}>
        <div className={`${FLOAT_CARD} p-3 w-[220px]`}>
          <div aria-hidden="true" className={FLOAT_OVERLAY} />
          <div className="relative flex items-center gap-2 mb-2">
            <div className="w-8 h-8 grid place-items-center bg-[color:var(--accent)]/15 border border-[color:var(--accent)]/40 shrink-0">
              <Code2 size={15} className="text-[color:var(--accent)]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[color:var(--ink)] truncate">App custom déployée</div>
              <div className="flex items-center gap-1 text-[11px] text-[color:var(--ink-muted)]">
                <span className="w-1.5 h-1.5 bg-emerald-400 pulse-soft" />
                Lead scoring API · 340 req/min
              </div>
            </div>
          </div>
          <div className="relative flex items-center flex-wrap gap-1">
            {['Next.js', 'Claude', 'n8n'].map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono uppercase tracking-wider text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] px-2 py-[2px]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </FloatingCard>

      {/* Right · row 2 — Agent Prospection */}
      <FloatingCard top="55%" right="7%" rotate={0} delay={1.15} xFrom={12} yFrom={0}>
        <div className={`${FLOAT_CARD} p-3 w-[220px]`}>
          <div aria-hidden="true" className={FLOAT_OVERLAY} />
          <div className="relative flex items-center gap-2 mb-2">
            <div className="w-8 h-8 grid place-items-center bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] shrink-0">
              <Bot size={15} className="text-[color:var(--ink-muted)]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[color:var(--ink)] truncate">Agent Prospection</div>
              <div className="flex items-center gap-1 text-[11px] text-[color:var(--ink-muted)]">
                <span className="w-1.5 h-1.5 bg-emerald-400 pulse-soft" />
                Actif · 420 messages
              </div>
            </div>
          </div>
          <div className="relative flex items-center gap-1.5">
            <Users size={12} className="text-[color:var(--ink-muted)]" />
            <span className="text-[11.5px] text-[color:var(--ink-muted)]">23 nouveaux RDV · 7 j</span>
          </div>
        </div>
      </FloatingCard>

      {/* Left · row 3 — Funnel */}
      <FloatingCard top="82%" left="7%" rotate={0} delay={1.3} xFrom={-12} yFrom={0}>
        <div className={`${FLOAT_CARD} p-3 w-[220px]`}>
          <div aria-hidden="true" className={FLOAT_OVERLAY} />
          <div className="relative flex items-center gap-1.5 mb-2">
            <BarChart3 size={13} className="text-[color:var(--accent)]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.1em] text-[color:var(--ink-muted)]">Funnel · S24</span>
          </div>
          <div className="relative space-y-1.5">
            {[
              { label: 'Visites', width: 100, val: '8,4k' },
              { label: 'Leads', width: 62, val: '5,2k' },
              { label: 'RDV', width: 28, val: '2,4k' },
              { label: 'Clients', width: 12, val: '1,0k' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-[10.5px] text-[color:var(--ink-muted)] w-11 shrink-0">{s.label}</span>
                <div className="flex-1 h-1.5 bg-[color:var(--card-elev-2)] overflow-hidden">
                  <div className="h-full bg-[color:var(--accent)]" style={{ width: `${s.width}%` }} />
                </div>
                <span className="text-[10.5px] font-mono text-[color:var(--ink-muted)] w-8 text-right">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </FloatingCard>

      {/* Right · row 3 — CPA Google Ads */}
      <FloatingCard top="82%" right="7%" rotate={0} delay={1.45} xFrom={12} yFrom={0}>
        <div className={`${FLOAT_CARD} p-3 w-[220px]`}>
          <div aria-hidden="true" className={FLOAT_OVERLAY} />
          <div className="relative flex items-center gap-2 mb-2">
            <div className="w-8 h-8 grid place-items-center bg-[color:var(--accent)]/15 border border-[color:var(--accent)]/40 shrink-0">
              <Target size={15} className="text-[color:var(--accent)]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[color:var(--ink)] truncate">CPA Google Ads</div>
              <div className="text-[11px] text-[color:var(--ink-muted)]">Campagne Scale · 30j</div>
            </div>
          </div>
          <div className="relative flex items-baseline gap-2">
            <span className="text-[22px] font-display font-semibold text-[color:var(--ink)]">38€</span>
            <span className="text-[12px] font-mono text-[color:var(--ink-muted)] line-through">128€</span>
            <span className="ml-auto inline-flex items-center gap-0.5 text-[12px] font-mono font-bold text-emerald-500">
              −70%
            </span>
          </div>
        </div>
      </FloatingCard>
    </>
  );
}
