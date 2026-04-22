'use client';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
 * Abstract mockups — minimal geometric language
 * ───────────────────────────────────────────────────────────── */

/* INBOUND — Search ranking : abstract bars stack with one highlighted */
export function OffrePictoInbound() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-full max-w-[280px]" aria-hidden="true">
      {/* Search bar */}
      <motion.rect
        initial={{ opacity: 0, y: -4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        x="20" y="14" width="200" height="22" rx="11"
        fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="34" cy="25" r="3.5" fill="var(--accent)" fillOpacity="0.6" />
      <rect x="44" y="22" width="80" height="6" rx="3" fill="var(--ink)" fillOpacity="0.35" />

      {/* Result 1 — highlighted (uclic position 1) */}
      <motion.g
        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.15 }}>
        <rect x="20" y="48" width="200" height="26" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1" />
        <rect x="30" y="55" width="60" height="5" rx="2.5" fill="var(--accent)" fillOpacity="0.85" />
        <rect x="30" y="64" width="120" height="4" rx="2" fill="var(--ink)" fillOpacity="0.45" />
        {/* Crown badge */}
        <circle cx="208" cy="61" r="8" fill="var(--accent)" />
        <text x="208" y="64.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">1</text>
      </motion.g>

      {/* Result 2 */}
      <motion.g
        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.25 }}>
        <rect x="20" y="84" width="200" height="20" rx="5" fill="var(--ink)" fillOpacity="0.04" />
        <rect x="30" y="91" width="50" height="4" rx="2" fill="var(--ink)" fillOpacity="0.35" />
        <rect x="30" y="98" width="100" height="3" rx="1.5" fill="var(--ink)" fillOpacity="0.20" />
      </motion.g>

      {/* Result 3 */}
      <motion.g
        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.35 }}>
        <rect x="20" y="112" width="200" height="20" rx="5" fill="var(--ink)" fillOpacity="0.03" />
        <rect x="30" y="119" width="40" height="4" rx="2" fill="var(--ink)" fillOpacity="0.25" />
        <rect x="30" y="126" width="90" height="3" rx="1.5" fill="var(--ink)" fillOpacity="0.15" />
      </motion.g>
    </svg>
  );
}

/* OUTBOUND — Network nodes connected with a flow */
export function OffrePictoOutbound() {
  return (
    <svg viewBox="0 0 260 160" className="w-full h-full max-w-[300px]" aria-hidden="true">
      {/* Connections */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}>
        <path d="M 60 80 L 130 80" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d="M 130 80 L 200 50" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d="M 130 80 L 200 110" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      </motion.g>

      {/* Source node (you) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0 }}>
        <circle cx="60" cy="80" r="22" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="60" cy="80" r="6" fill="var(--accent)" />
      </motion.g>

      {/* Hub node (sequencer) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.3 }}>
        <circle cx="130" cy="80" r="14" fill="var(--ink)" fillOpacity="0.06" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1" />
        <rect x="124" y="74" width="12" height="12" rx="2" fill="none" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.2" />
      </motion.g>

      {/* Target nodes */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.5 }}>
        <circle cx="200" cy="50" r="14" fill="var(--ink)" fillOpacity="0.04" stroke="var(--ink)" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="200" cy="50" r="3" fill="var(--ink)" fillOpacity="0.3" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.7 }}>
        <circle cx="200" cy="110" r="14" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="200" cy="110" r="4" fill="var(--accent)" />
      </motion.g>

      {/* Pulsing dot traveling along the path */}
      <motion.circle
        r="2.5" fill="var(--accent)"
        initial={{ cx: 60, cy: 80, opacity: 0 }}
        animate={{ cx: [60, 130, 200], cy: [80, 80, 110], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 1 }}
      />
    </svg>
  );
}

/* IA — Abstract orb with orbiting particles */
export function OffrePictoIA() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-full max-w-[320px]" aria-hidden="true">
      <defs>
        <radialGradient id="orb-grad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Orbits */}
      <ellipse cx="120" cy="80" rx="92" ry="34" fill="none" stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 4" />
      <ellipse cx="120" cy="80" rx="68" ry="22" fill="none" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="1" />

      {/* Orb halo */}
      <circle cx="120" cy="80" r="56" fill="url(#orb-grad)" />
      {/* Orb core */}
      <motion.circle
        cx="120" cy="80" r="22"
        fill="var(--accent)" fillOpacity="0.85"
        initial={{ scale: 0.85 }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Inner ring */}
      <circle cx="120" cy="80" r="22" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1" />

      {/* Orbiting particles */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '120px 80px' }}>
        <circle cx="212" cy="80" r="3" fill="var(--accent)" />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '120px 80px' }}>
        <circle cx="188" cy="80" r="2.5" fill="var(--ink)" fillOpacity="0.6" />
      </motion.g>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        style={{ transformOrigin: '120px 80px' }}>
        <circle cx="52" cy="80" r="2" fill="var(--accent)" fillOpacity="0.6" />
      </motion.g>
    </svg>
  );
}
