'use client';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ── Doubled-arrow icon (inline SVG) ──────────────────────────────────── */

const DoubleChevron = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"
       fill="none" stroke="currentColor" strokeWidth={2.4}
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 L4 12 L9 18" />
    <path d="M15 6 L20 12 L15 18" />
  </svg>
);

/* ── Main slider ──────────────────────────────────────────────────────── */

type BeforeAfterSliderProps = {
  before: ReactNode;
  after: ReactNode;
  /** Initial reveal ratio (0 → 1). Default 0.5 (centré). */
  initialRatio?: number;
  /** Extra classes for the outer container */
  className?: string;
  /** Labels shown on top corners (defaults "Avant" / "Après") */
  beforeLabel?: string;
  afterLabel?: string;
  /** Called once the first time the user actively interacts (pointer/keyboard). */
  onInteract?: () => void;
  /** Called at every ratio change — lets the parent react (e.g. dynamic filters). */
  onRatioChange?: (ratio: number) => void;
};

export default function BeforeAfterSlider({
  before,
  after,
  initialRatio = 0.5,
  className = '',
  beforeLabel = 'Avant',
  afterLabel = 'Après',
  onInteract,
  onRatioChange,
}: BeforeAfterSliderProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [ratio, setRatio] = useState<number>(initialRatio);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const r = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setRatio(r);
    onRatioChange?.(r);
  }, [onRatioChange]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    onInteract?.();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  /* Keyboard accessibility on the handle */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      onInteract?.();
    }
    const setR = (nextR: number) => {
      setRatio(nextR);
      onRatioChange?.(nextR);
    };
    if (e.key === 'ArrowLeft')  { setR(Math.max(0, ratio - 0.05)); e.preventDefault(); return; }
    if (e.key === 'ArrowRight') { setR(Math.min(1, ratio + 0.05)); e.preventDefault(); return; }
    if (e.key === 'Home')       { setR(0); e.preventDefault(); return; }
    if (e.key === 'End')        { setR(1); e.preventDefault(); return; }
  };

  /* Sweep-hint on first view (only once, disabled if reduced motion) */
  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !done) {
          done = true;
          const t0 = performance.now();
          const duration = 1400;
          const from = initialRatio;
          const to = Math.min(1, initialRatio + 0.17);
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = p < 0.5
              ? 2 * p * p
              : 1 - Math.pow(-2 * p + 2, 2) / 2;
            const val = from + (to - from) * Math.sin(eased * Math.PI);
            setRatio(val);
            onRatioChange?.(val);
            if (p < 1) requestAnimationFrame(tick);
            else { setRatio(from); onRatioChange?.(from); }
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, initialRatio]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative w-full overflow-hidden select-none cursor-ew-resize touch-none grid [grid-template-areas:'stack']"
        role="slider"
        aria-label="Glisser pour comparer avant et après Uclic"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(ratio * 100)}
      >
        {/* Styles scopés : bg opaque par thème, évite le bleed-through du clipPath */}
        <style>{`
          .ba-panel-bg { background-color: #141211; }
          .light .ba-panel-bg { background-color: #FFFFFF; }
        `}</style>

        {/* Avant (base layer) — bg opaque solide + h-full pour matcher le after. */}
        <div className="[grid-area:stack] relative w-full h-full isolate ba-panel-bg">
          {before}
        </div>

        {/* Après (revealed layer) — même bg + clipPath pour révéler progressivement. */}
        <div
          className="[grid-area:stack] relative w-full h-full isolate will-change-[clip-path] ba-panel-bg"
          style={{ clipPath: `inset(0 ${(1 - ratio) * 100}% 0 0)` }}>
          {after}
        </div>

        {/* Top corner labels */}
        <div className="absolute top-3 left-3 z-[3] inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-red-300 bg-[color:var(--bg)]/85 backdrop-blur-sm px-2 py-1 border border-red-300/25 pointer-events-none">
          <span className="w-1 h-1 bg-red-300" /> {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 z-[3] inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)] bg-[color:var(--bg)]/85 backdrop-blur-sm px-2 py-1 border border-[color:var(--accent)]/30 pointer-events-none">
          <span className="w-1 h-1 bg-[color:var(--accent)]" /> {afterLabel}
        </div>

        {/* Séparateur — barre accent vert, ombre noire en dark / accent en light */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 z-[4] pointer-events-none ba-sep-bar"
          style={{
            left: `${ratio * 100}%`,
            width: '6px',
            marginLeft: '-3px',
            backgroundColor: 'var(--accent)',
            opacity: 0.9,
          }}
        />
        <motion.button
          type="button"
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Poignée du comparateur avant/après"
          className="absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center cursor-ew-resize text-[color:var(--ink)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
          style={{
            left: `${ratio * 100}%`,
            borderRadius: '6px',
            background:
              'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 65%, transparent 100%), var(--bg)',
          }}
          whileTap={{ scale: 0.94 }}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        >
          <DoubleChevron size={16} />
        </motion.button>
      </div>
    </div>
  );
}
