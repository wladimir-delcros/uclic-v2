/**
 * Uclic V2 — SVG Components
 * DA: #000000 bg | #E0FF5C accent | #F5F5F1 text
 * All components are tree-shakeable and typed.
 */

import React from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface SVGProps {
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────
// 1. UclicLogoSVG
// Logo "uclic" avec le point final animé (lime pulse)
// ─────────────────────────────────────────────

export function UclicLogoSVG({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width="96"
      height="32"
      viewBox="0 0 96 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="uclic"
      role="img"
    >
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 1; r: 3; }
          50%       { opacity: 0.6; r: 3.8; }
        }
        .uclic-dot {
          animation: dotPulse 2.4s ease-in-out infinite;
          transform-origin: 91px 26px;
        }
      `}</style>

      {/* Lettres "uclic" en Absans-style — tracé simplifié */}
      <text
        x="0"
        y="26"
        fontFamily="Absans, 'Inter', sans-serif"
        fontWeight="600"
        fontSize="24"
        letterSpacing="-0.5"
        fill="#F5F5F1"
      >
        uclic
      </text>

      {/* Point vert animé — remplace le "." final ou la ponctuation */}
      <circle
        className="uclic-dot"
        cx="91"
        cy="26"
        r="3"
        fill="#E0FF5C"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// 2. ArrowRightSVG
// Flèche droite fine, 16x16
// ─────────────────────────────────────────────

export function ArrowRightSVG({ className = '', size = 16, color = 'currentColor', style }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// 3. CheckSVG
// Check mark pour bullet lists, 16x16
// ─────────────────────────────────────────────

export function CheckSVG({ className = '', size = 16, color = '#E0FF5C', style }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M3 8L6.5 11.5L13 4.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// 4. StarSVG
// Étoile pour ratings, 16x16
// ─────────────────────────────────────────────

export function StarSVG({ className = '', size = 16, color = '#E0FF5C', style }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M8 1.5L9.854 5.257L14 5.878L11 8.797L11.708 13L8 11.007L4.292 13L5 8.797L2 5.878L6.146 5.257L8 1.5Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// 5. HeroBackground
// Forme organique lime en bottom-right, avec mask gradient + breathe
// ─────────────────────────────────────────────

export function HeroBackground({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '60%',
        maxWidth: '720px',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <defs>
        <style>{`
          @keyframes heroBreathe {
            0%, 100% { opacity: 0.18; transform: scale(1); }
            50%       { opacity: 0.28; transform: scale(1.03); }
          }
          .hero-shape {
            animation: heroBreathe 5s ease-in-out infinite;
            transform-origin: center;
          }
        `}</style>

        {/* Mask gradient — fade vers les bords */}
        <radialGradient id="heroMask" cx="75%" cy="80%" r="60%">
          <stop offset="0%"  stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="heroFadeMask">
          <rect width="800" height="600" fill="url(#heroMask)" />
        </mask>

        {/* Glow filter */}
        <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g className="hero-shape" mask="url(#heroFadeMask)">
        {/* Forme organique — inspirée uclic.fr existant */}
        <path
          d="M351.415 232.339C389.877 180.621 449.34 152.5 512 152.5C618.039 152.5 704 238.461 704 344.5C704 450.539 618.039 536.5 512 536.5C450.068 536.5 394.744 508.821 357.5 464.5C320.256 420.179 304 360.5 304 344.5C304 316.5 313.5 283.5 351.415 232.339Z"
          fill="#E0FF5C"
          filter="url(#heroGlow)"
        />
        {/* Second layer légèrement décalé pour profondeur */}
        <path
          d="M400 280C430 240 480 220 530 225C600 232 650 290 645 360C640 430 585 480 515 478C460 476 415 445 392 400C369 355 370 320 400 280Z"
          fill="#E0FF5C"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────
// 6. GlowOrb
// Radial gradient lime pulsant — hero + CTA
// ─────────────────────────────────────────────

interface GlowOrbProps {
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
  style?: React.CSSProperties;
  intensity?: 'soft' | 'medium' | 'strong';
  animationDuration?: number; // secondes
}

export function GlowOrb({
  size = 'md',
  className = '',
  style,
  intensity = 'medium',
  animationDuration = 3,
}: GlowOrbProps) {
  const sizeMap = { sm: 200, md: 400, lg: 600 };
  const px = typeof size === 'number' ? size : sizeMap[size];

  const opacityMap = {
    soft:   { min: 0.2, max: 0.4 },
    medium: { min: 0.3, max: 0.55 },
    strong: { min: 0.4, max: 0.7 },
  };
  const { min, max } = opacityMap[intensity];

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: px,
        height: px,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(224,255,92,0.35) 0%, rgba(224,255,92,0.12) 40%, transparent 70%)`,
        filter: `blur(${Math.round(px * 0.1)}px)`,
        pointerEvents: 'none',
        animation: `glowOrbPulse_${px} ${animationDuration}s ease-in-out infinite`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      <style>{`
        @keyframes glowOrbPulse_${px} {
          0%, 100% { opacity: ${min}; transform: scale(1); }
          50%       { opacity: ${max}; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. GrainOverlay
// Overlay grain animé avec SVG feTurbulence
// ─────────────────────────────────────────────

export function GrainOverlay({
  opacity = 0.03,
  className = '',
  style,
}: {
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <style>{`
        @keyframes grainShiftOverlay {
          0%   { transform: translate(0, 0); }
          10%  { transform: translate(-2%, -3%); }
          20%  { transform: translate(1%, 2%); }
          30%  { transform: translate(-1%, 1%); }
          40%  { transform: translate(2%, -2%); }
          50%  { transform: translate(-2%, 3%); }
          60%  { transform: translate(3%, 1%); }
          70%  { transform: translate(-1%, -2%); }
          80%  { transform: translate(2%, 2%); }
          90%  { transform: translate(-3%, 1%); }
          100% { transform: translate(0, 0); }
        }
        .grain-overlay-el {
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          pointer-events: none;
          z-index: 9999;
          animation: grainShiftOverlay 0.5s steps(1) infinite;
          will-change: transform;
        }
      `}</style>

      <svg
        className={`grain-overlay-el ${className}`}
        aria-hidden="true"
        style={{ opacity, ...style }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </>
  );
}

// ─────────────────────────────────────────────
// Export regroupé pour import simplifié
// ─────────────────────────────────────────────

export const UclicIcons = {
  Logo: UclicLogoSVG,
  ArrowRight: ArrowRightSVG,
  Check: CheckSVG,
  Star: StarSVG,
};

export const UclicDecorations = {
  HeroBackground,
  GlowOrb,
  GrainOverlay,
};
