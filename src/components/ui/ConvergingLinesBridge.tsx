'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * ConvergingLinesBridge — pattern revomo.ai, one-shot replay.
 *
 * 7 paths convergent vers un point central. L'animation joue forward à chaque
 * entrée dans la viewport (pas de scrub scroll, pas de décharge au scroll-up).
 * Si l'user scrolle vers le haut, l'anim reste à son état final. Re-entrée
 * dans la viewport → rejoue forward.
 */
type Props = {
  color?: string;
  /** Durée de l'animation one-shot à chaque entrée dans la viewport. */
  fallbackDuration?: number;
  height?: number;
  className?: string;
  /** "full" = 7 paths + bouton + surlignage | "center-only" = seul le trait central animé. */
  variant?: 'full' | 'center-only';
};

export default function ConvergingLinesBridge({
  color = 'var(--accent)',
  fallbackDuration = 1.4,
  height = 240,
  className,
  variant = 'full',
}: Props) {
  const centerOnly = variant === 'center-only';
  const ref = useRef<HTMLDivElement>(null);
  // Key incrémentée à chaque entrée viewport → force le restart propre de l'anim.
  const [playKey, setPlayKey] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {return;}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Restart : on retire d'abord la classe, un RAF plus tard on la remet.
          // Ça force le replay forward à chaque re-entrée (scroll up → scroll down).
          setPlaying(false);
          setPlayKey((k) => k + 1);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setPlaying(true));
          });
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none relative mx-auto w-full max-w-[1040px] ${className ?? ''}`}
      style={{ height }}>
      <style>{`
        @keyframes clb-slide {
          from { y: -100%; }
          to   { y: 100%; }
        }
        /* Base : masque à la position initiale (haut, invisible).
           animation:none = reset complet, sans ça l'anim reste figée à l'état final. */
        .clb-mask-rect {
          y: -100%;
          animation: none;
        }
        .clb-playing .clb-mask-rect {
          animation: clb-slide ${fallbackDuration}s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Toutes les tiges (centrale + 6 courbes) : remplissage progressif.
           Technique: pathLength="1" normalise chaque path → dash 1 + offset 1 → 0. */
        @keyframes clb-path-fill {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .clb-fill-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: none;
        }
        .clb-playing .clb-fill-path {
          animation: clb-path-fill ${fallbackDuration}s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Halo pulsant sous le bouton — clignotement infini. */
        @keyframes clb-halo-blink {
          0%, 100% { opacity: 0.3;  transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.6;  transform: translate(-50%, -50%) scale(1.15); }
        }
        .clb-halo-blink { animation: clb-halo-blink 2s ease-in-out infinite; }

        /* LED pixels clignotent légèrement aussi — opacity + scale. */
        @keyframes clb-led-blink {
          0%, 100% { opacity: 0.85; }
          40%      { opacity: 1;    }
          50%      { opacity: 0.7;  }
          60%      { opacity: 1;    }
        }
        .clb-led-blink { animation: clb-led-blink 3.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .clb-halo-blink, .clb-led-blink { animation: none; }
        }
      `}</style>
      {/* Bouton 3D — AU-DESSUS des lignes (z:3), centré exactement sur le point de convergence.
          Masqué en variant center-only. */}
      {!centerOnly && <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          left: '50%',
          top: `calc(100% * 264 / 286)`,
          marginLeft: '-35px',
          marginTop: '-35px',
          zIndex: 3,
        }}>
        <div
          className="glass-pill flex items-center justify-center shadow-[0_10px_28px_-8px_rgba(107,255,149,0.5)]"
          style={{
            width: '70px',
            height: '70px',
            minWidth: '70px',
            minHeight: '70px',
            maxWidth: '70px',
            maxHeight: '70px',
            borderRadius: '6px',
            background:
              'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
            position: 'relative',
          }}>
          <img
            src="/logo-mark.svg"
            alt=""
            aria-hidden="true"
            style={{
              width: '36px',
              height: '32px',
              minWidth: '36px',
              maxWidth: '36px',
              display: 'block',
              flexShrink: 0,
              objectFit: 'contain',
            }}
          />
        </div>
      </div>}

      <svg
        key={playKey}
        width="100%"
        height="100%"
        viewBox="0 0 1040 286"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
        className={`absolute inset-0 ${playing ? 'clb-playing' : ''}`}>
        <defs>
          <linearGradient id="clb-grad" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0"   stopColor="white" stopOpacity="0" />
            <stop offset="0.2" stopColor="white" stopOpacity="1" />
            <stop offset="0.2" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="clb-mask">
            <rect className="clb-mask-rect" x="0" y="0" width="100%" height="100%" fill="url(#clb-grad)" />
          </mask>

          {/* Mask vertical fade : haut = transparent → bas = opaque.
              Appliqué aux tiges pour qu'elles émergent de "rien" en haut. */}
          <linearGradient id="clb-fade-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="35%"  stopColor="white" stopOpacity="0.4" />
            <stop offset="80%"  stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="clb-fade-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1040" height="286" fill="url(#clb-fade-grad)" />
          </mask>
        </defs>

        {/* Traces fantômes — fade du haut vers le bas (mask gradient).
            Le haut des tiges est transparent, elles émergent de rien.
            En variant center-only on ne garde que le trait central. */}
        <g stroke={color} strokeOpacity="0.18" strokeWidth="1.25" fill="none" mask="url(#clb-fade-mask)">
          {!centerOnly && <>
            <path d="M843.258 16.5C839.259 52 829.259 92.5677 715.265 111.5C571.207 135.425 516.401 157.363 520.023 264" />
            <path d="M759.058 5.25C755.059 40.75 753.055 56.5903 646.065 100.25C538.716 144.056 523.596 157.737 519.942 264" />
            <path d="M1038.56 16.75C1032.05 52.25 1008.31 127.73 828.058 141.75C603.058 159.25 520.058 162.25 520.058 264.25" />
            <path d="M196.059 16.5C200.058 52 210.058 92.5677 324.052 111.5C467.905 135.391 523.552 157.796 520.109 264.044" />
            <path d="M280.565 5.25C284.564 40.75 286.568 56.5903 393.558 100.25C500.907 144.056 516.027 157.737 519.681 264" />
            <path d="M1.38428 16.5C7.8972 52 31.6277 127.48 211.884 141.5C436.884 159 520.058 159.5 520.058 261.5V264" />
          </>}
          <path d="M519.797 0.749985L519.797 264" />
        </g>

        {/* Surlignage central — aussi masqué pour fader en haut.
            vector-effect=non-scaling-stroke : largeur en pixels réels, pas en viewBox units
            → cohérence visuelle avec le slider avant/après quelle que soit la taille écran. */}
        <g mask="url(#clb-fade-mask)">
          <path
            d="M519.797 0.749985L519.797 264"
            stroke={color}
            strokeOpacity="0.18"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Pulse brillant — 6 courbes + trait central, toutes en fill progressif au scroll
            via pathLength=1 + stroke-dashoffset animé. */}
        <g stroke={color} strokeOpacity="0.9" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke">
          {!centerOnly && <>
            <path pathLength={1} className="clb-fill-path" d="M843.258 16.5C839.259 52 829.259 92.5677 715.265 111.5C571.207 135.425 516.401 157.363 520.023 264" />
            <path pathLength={1} className="clb-fill-path" d="M759.058 5.25C755.059 40.75 753.055 56.5903 646.065 100.25C538.716 144.056 523.596 157.737 519.942 264" />
            <path pathLength={1} className="clb-fill-path" d="M1038.56 16.75C1032.05 52.25 1008.31 127.73 828.058 141.75C603.058 159.25 520.058 162.25 520.058 264.25" />
            <path pathLength={1} className="clb-fill-path" d="M196.059 16.5C200.058 52 210.058 92.5677 324.052 111.5C467.905 135.391 523.552 157.796 520.109 264.044" />
            <path pathLength={1} className="clb-fill-path" d="M280.565 5.25C284.564 40.75 286.568 56.5903 393.558 100.25C500.907 144.056 516.027 157.737 519.681 264" />
            <path pathLength={1} className="clb-fill-path" d="M1.38428 16.5C7.8972 52 31.6277 127.48 211.884 141.5C436.884 159 520.058 159.5 520.058 261.5V264" />
          </>}
          {/* Trait central : 2x plus épais */}
          <path pathLength={1} className="clb-fill-path" d="M519.797 0.749985L519.797 264" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
