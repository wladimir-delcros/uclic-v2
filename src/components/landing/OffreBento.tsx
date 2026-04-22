'use client';
import { motion } from 'framer-motion';

/* Abstract bento panel — 2 elements 50/50 on top + 1 full-width below */
export default function OffreBento() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 grid grid-cols-2 gap-5">
      {/* TOP-LEFT — Concentric pulse */}
      <BentoCell delay={0.05}>
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[300px] max-h-[260px]" aria-hidden="true">
          {[80, 60, 40, 20].map((r, i) => (
            <motion.circle
              key={r}
              cx="100" cy="100" r={r}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity={0.7 - i * 0.15}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              style={{ transformOrigin: '100px 100px' }}
            />
          ))}
          <circle cx="100" cy="100" r="5" fill="var(--accent)" />
        </svg>
      </BentoCell>

      {/* TOP-RIGHT — Diagonal stripes */}
      <BentoCell delay={0.15}>
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[300px] max-h-[260px]" aria-hidden="true">
          {[
            { x1: 20, y1: 180, x2: 180, y2: 20, op: 0.7 },
            { x1: 0,  y1: 160, x2: 160, y2: 0,  op: 0.5 },
            { x1: 40, y1: 200, x2: 200, y2: 40, op: 0.5 },
            { x1: 60, y1: 200, x2: 200, y2: 60, op: 0.35 },
            { x1: 0,  y1: 130, x2: 130, y2: 0,  op: 0.35 },
          ].map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="var(--accent)"
              strokeWidth={i === 0 ? 2 : 1}
              strokeOpacity={l.op}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
      </BentoCell>

      {/* BOTTOM — Wave ribbon (full width) */}
      <BentoCell delay={0.3} className="col-span-2 min-h-[240px]">
        <svg viewBox="0 0 600 140" className="w-full h-full max-w-[760px] max-h-[220px]" aria-hidden="true">
          {/* Background grid lines */}
          {[35, 70, 105].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="var(--ink)" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="3 5" />
          ))}
          {/* Wave path */}
          <motion.path
            d="M 0 90 C 80 90, 120 30, 200 30 S 320 90, 400 90 S 520 30, 600 30"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Filled wave area below */}
          <motion.path
            d="M 0 90 C 80 90, 120 30, 200 30 S 320 90, 400 90 S 520 30, 600 30 L 600 140 L 0 140 Z"
            fill="var(--accent)"
            fillOpacity="0.08"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.7 }}
          />
          {/* Apex dots */}
          {[{ cx: 200, cy: 30 }, { cx: 600, cy: 30 }].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx} cy={p.cy} r="4"
              fill="var(--accent)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
            />
          ))}
        </svg>
      </BentoCell>
    </motion.div>
  );
}

function BentoCell({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group card-surface relative flex items-center justify-center min-h-[260px] p-8 overflow-hidden !bg-[color:var(--surface-raised)] ${className}`}>
      {/* subtle accent halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 100%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
