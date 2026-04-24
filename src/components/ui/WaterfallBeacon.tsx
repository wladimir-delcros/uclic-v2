'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * WaterfallBeacon — pattern Revomo "water-fallen".
 *
 * Un phare/beacon central : quatre courbes convergent depuis les coins
 * inférieurs vers un point haut, accompagnées d'une ligne verticale centrale
 * et d'une base "montagne" avec gradients et flous. Au sommet, un pulse
 * lumineux marque le point de convergence.
 *
 * Deux couches de tracés, pattern identique au ConvergingLinesBridge :
 *   - Ghosts : fantômes à faible opacité, toujours visibles (texture de fond)
 *   - Fills  : tracés lumineux qui se remplissent via stroke-dashoffset animé
 *
 * Au-dessus, le pulse au point de convergence s'allume à la fin du tracé
 * et respire en boucle.
 *
 * Trigger : IntersectionObserver threshold 0.25, une fois seulement.
 * Accessibilité : respect prefers-reduced-motion.
 */
type Props = {
  /** Classes appliquées au wrapper (positionnement). */
  className?: string;
  /** Durée du tracé des lignes (default 1.8s). */
  drawDuration?: number;
};

// 5 paths du beacon : central vertical + 4 courbes convergentes
const PATHS = {
  central: 'M325.42 327 L 325.42 83',
  rOuter:  'M648.948 341C644.949 305.5 634.949 264.932 520.954 246C376.445 222 321.747 200 325.745 92.5V83',
  rInner:  'M564.747 363.5C560.748 328 558.744 312.16 451.753 268.5C340.252 223 328.252 210 325.252 92V83',
  lOuter:  'M1.05066 341C5.04971 305.5 15.0498 264.932 129.045 246C273.553 222 329.05 199.5 325.052 92V83',
  lInner:  'M85.5571 363.5C89.5561 328 91.5601 312.16 198.551 268.5C310.052 223 322.052 210 325.052 92V83',
};

export default function WaterfallBeacon({ className = '', drawDuration = 1.8 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const uid = useRef(`wfb-${Math.random().toString(36).slice(2, 9)}`).current;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none relative w-full max-w-[650px] mx-auto ${playing ? 'wfb-playing' : ''} ${className}`}>
      <style>{`
        /* Blend modes theme-aware :
           - Dark (default) : screen → les lignes lime "brillent" sur fond sombre
           - Light          : normal → l'accent vert foncé reste opaque et visible */
        .wfb-screen { mix-blend-mode: screen; }
        .light .wfb-screen { mix-blend-mode: normal; }

        /* Fills : pattern dashoffset inversé — remplissage de la FIN vers le DÉBUT.
           - Les paths sont définis "bottom → top" (start=bas, end=pulse)
           - Animer dashoffset de 1 → 2 (au lieu de 1 → 0) inverse la direction visuelle
           - Résultat : le tracé se remplit depuis le pulse en haut vers les coins inférieurs
           - Effet "waterfall" : l'eau coule du beacon vers l'extérieur */
        .wfb-fill {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset ${drawDuration}s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wfb-playing .wfb-fill { stroke-dashoffset: 2; }

        /* Pulse au sommet : apparaît à la fin du tracé */
        .wfb-pulse {
          opacity: 0;
          transform: scale(0.4);
          transform-origin: 325.42px 83px;
          transition: opacity 0.6s ease-out ${drawDuration * 0.75}s,
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${drawDuration * 0.75}s;
        }
        .wfb-playing .wfb-pulse { opacity: 1; transform: scale(1); }

        /* Base "montagne" gradient : fade-in doux */
        .wfb-base {
          opacity: 0;
          transition: opacity 0.8s ease-out ${drawDuration * 0.35}s;
        }
        .wfb-playing .wfb-base { opacity: 1; }

        /* Pulse infinite subtil une fois visible */
        @keyframes wfb-pulse-breath {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%      { transform: scale(1.15); opacity: 1; }
        }
        .wfb-playing .wfb-pulse-core {
          animation: wfb-pulse-breath 2.4s ease-in-out infinite ${drawDuration + 0.3}s;
          transform-origin: 325.42px 83px;
        }
        @media (prefers-reduced-motion: reduce) {
          .wfb-fill, .wfb-pulse, .wfb-base { transition: none; }
          .wfb-playing .wfb-pulse-core { animation: none; }
        }
      `}</style>

      <svg
        width="100%"
        height="auto"
        viewBox="0 83 650 281"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        style={{ overflow: 'visible' }}>
        <defs>
          {/* Gradient vertical : accent opaque en bas → transparent en haut */}
          <linearGradient id={`${uid}-central`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
          {/* Gradient fade pour les ghosts (haut transparent, dense en bas) */}
          <linearGradient id={`${uid}-ghost`} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
          </linearGradient>
          {/* Gradients courbes fills : plus intense au centre, fade vers l'extérieur */}
          <linearGradient id={`${uid}-curve-r`} x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`${uid}-curve-l`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
          </linearGradient>
          {/* Gradient de la "montagne" : base transparente → accent au sommet */}
          <linearGradient id={`${uid}-base`} x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="80%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.55" />
          </linearGradient>

          {/* Filter : blur doux pour halo de la montagne */}
          <filter id={`${uid}-blur`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          {/* Filter : glow intense autour du pulse */}
          <filter id={`${uid}-glow`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* ─── BASE : silhouette "montagne" avec halo doux ─── */}
        <g className="wfb-base wfb-screen">
          {/* Halo blurred */}
          <path
            d="M647.466 298.781C641.363 266.91 621.372 233.668 521.403 217.065C386.508 194.662 329.268 173.565 325.5 83.4177C321.721 173.565 264.388 194.662 129.494 217.065C29.5247 233.668 9.53401 266.91 3.43102 298.781C2.08454 305.813 7.76811 312.065 14.9275 312.065H325.457H325.501H635.969C643.129 312.065 648.812 305.813 647.466 298.781Z"
            fill={`url(#${uid}-base)`}
            opacity="0.6"
            filter={`url(#${uid}-blur)`}
          />
          {/* Silhouette fine */}
          <path
            d="M647.466 298.781C641.363 266.91 621.372 233.668 521.403 217.065C386.508 194.662 329.268 173.565 325.5 83.4177C321.721 173.565 264.388 194.662 129.494 217.065C29.5247 233.668 9.53401 266.91 3.43102 298.781C2.08454 305.813 7.76811 312.065 14.9275 312.065H325.457H325.501H635.969C643.129 312.065 648.812 305.813 647.466 298.781Z"
            fill={`url(#${uid}-base)`}
            opacity="0.25"
          />
        </g>

        {/* ─── GHOSTS : tracés fantômes toujours visibles, texture de fond ─── */}
        <g stroke={`url(#${uid}-ghost)`} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.9">
          <path d={PATHS.central} />
          <path d={PATHS.rOuter} />
          <path d={PATHS.rInner} />
          <path d={PATHS.lOuter} />
          <path d={PATHS.lInner} />
        </g>

        {/* ─── FILLS : tracés lumineux qui se remplissent via stroke-dashoffset ─── */}
        <g className="wfb-screen">
          <path
            className="wfb-fill"
            d={PATHS.central}
            pathLength={1}
            stroke={`url(#${uid}-central)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="wfb-fill"
            d={PATHS.rOuter}
            pathLength={1}
            stroke={`url(#${uid}-curve-r)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="wfb-fill"
            d={PATHS.rInner}
            pathLength={1}
            stroke={`url(#${uid}-curve-r)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="wfb-fill"
            d={PATHS.lOuter}
            pathLength={1}
            stroke={`url(#${uid}-curve-l)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="wfb-fill"
            d={PATHS.lInner}
            pathLength={1}
            stroke={`url(#${uid}-curve-l)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* ─── PULSE au sommet : point de convergence ─── */}
        <g className="wfb-pulse">
          {/* Halo externe flou */}
          <circle
            cx="325.42"
            cy="83"
            r="12"
            fill="var(--accent)"
            opacity="0.18"
            filter={`url(#${uid}-glow)`}
          />
          {/* Halo moyen */}
          <circle cx="325.42" cy="83" r="7" fill="var(--accent)" opacity="0.45" />
          {/* Core pulsant */}
          <circle className="wfb-pulse-core" cx="325.42" cy="83" r="3.5" fill="var(--accent)" />
        </g>
      </svg>
    </div>
  );
}
