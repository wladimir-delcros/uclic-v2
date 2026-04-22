'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, animate } from 'framer-motion';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import AnimatedChars from '../ui/AnimatedChars';

/* Animated decimal counter — e.g. "4,9" animates from 0 → 4.9 */
function AnimatedRating({ value, delay = 0 }: { value: string; delay?: number }) {
  const final = parseFloat(value.replace(',', '.'));
  const decimals = value.includes(',') ? value.split(',')[1].length : 0;
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0' + (decimals > 0 ? ',' + '0'.repeat(decimals) : ''));

  useMotionValueEvent(count, 'change', (latest) => {
    setDisplay(latest.toFixed(decimals).replace('.', ','));
  });

  useEffect(() => {
    const controls = animate(count, final, { duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [final, delay, count]);

  return <span>{display}</span>;
}

/* Pictos officiels (couleurs brand) */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const TrustpilotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M12 1.5l2.76 8.5h8.94l-7.23 5.26 2.76 8.5L12 18.5l-7.23 5.26 2.76-8.5L.3 10h8.94L12 1.5z" fill="#00B67A" />
  </svg>
);

const SortlistIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
    <path d="M7.5 12.5l3 3 6-6" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const reviews = [
  { href: 'https://g.page/uclic', label: 'Google', rating: '4,9', count: '17', color: '#FBBC05', Icon: GoogleIcon },
  { href: 'https://fr.trustpilot.com/review/uclic.fr', label: 'Trustpilot', rating: '4,3', count: '7', color: '#00B67A', Icon: TrustpilotIcon },
  { href: 'https://www.sortlist.com/fr/agency/uclic', label: 'Sortlist', rating: '4,96', count: '6', color: '#FFFFFF', Icon: SortlistIcon },
];

const recommendedBy = [
  { src: '/hero/brice-maurin.webp', alt: 'Brice Maurin' },
  { src: '/hero/denis.webp',        alt: 'Denis Cohen' },
  { src: '/hero/jean.webp',         alt: 'Jean' },
  { src: '/hero/benoit.webp',       alt: 'Benoit Dubos' },
  { src: '/hero/cabane.webp',       alt: 'Guillaume Cabane' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 lg:pt-20 pb-0">
      {/* ─── SKY : deep space background, stretched full-width ─── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        <rect x="0" y="0" width="1200" height="800" fill="var(--bg)" />
      </svg>

      {/* ─── Grid blueprint overlay — fade vers le centre pour dégager la planète ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[0] light:hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 20px',
          maskImage:
            'radial-gradient(ellipse 55% 65% at 50% 55%, transparent 0%, transparent 25%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 65% at 50% 55%, transparent 0%, transparent 25%, black 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[0] hidden light:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10,8,7,0.06) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(10,8,7,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 20px',
          maskImage:
            'radial-gradient(ellipse 55% 65% at 50% 55%, transparent 0%, transparent 25%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 65% at 50% 55%, transparent 0%, transparent 25%, black 100%)',
        }}
      />

      {/* ─── PLANET + CARDS : shared coord space (aspect 1200:800), contained ─── */}
      <div className="absolute inset-x-0 top-[1vh] bottom-0 flex items-center justify-center pointer-events-none">
      <div className="relative h-full" style={{ aspectRatio: '1200 / 800' }}>
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        style={{ overflow: 'visible' }}
        className="pointer-events-none absolute inset-0 w-full h-full text-[color:var(--ink)] light:text-[color:var(--accent)]"
      >
        <defs>
          <radialGradient id="atmo" cx="50%" cy="12%" r="38%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="30%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.02" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="backlight" cx="50%" cy="100%" r="35%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="25%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="planetFill" cx="50%" cy="10%" r="70%">
            <stop offset="0%" stopColor="var(--surface-raised)" />
            <stop offset="15%" stopColor="var(--surface)" />
            <stop offset="45%" stopColor="var(--bg)" />
            <stop offset="100%" stopColor="var(--bg)" />
          </radialGradient>
          <linearGradient id="rimGrad" gradientUnits="userSpaceOnUse" x1="600" y1="100" x2="600" y2="800">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="25%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="90%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rimGradLight" gradientUnits="userSpaceOnUse" x1="600" y1="100" x2="600" y2="800">
            <stop offset="0%" stopColor="rgba(15,147,71,0.25)" />
            <stop offset="25%" stopColor="rgba(15,147,71,0.18)" />
            <stop offset="60%" stopColor="rgba(15,147,71,0.08)" />
            <stop offset="90%" stopColor="rgba(15,147,71,0.02)" />
            <stop offset="100%" stopColor="rgba(15,147,71,0)" />
          </linearGradient>
          <filter id="rimBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="rimBlurWide" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="rimBlurLightDiffuse" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="spotBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          {/* Fine grain noise for planet surface texture */}
          <filter id="planetGrain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed="7" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
          </filter>
          {/* Soft cloud-like texture bands */}
          <filter id="planetClouds" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.02" numOctaves="3" seed="4" />
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 -0.3" />
          </filter>
          {/* Cone beams descending from the nav area */}
          <linearGradient id="beamGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          {/* Hot spot where the beam hits the planet surface */}
          <radialGradient id="spotHit" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          {/* Top crown halo — horizontal fade for arc stroke (dark: white / light: marron) */}
          <linearGradient id="topHaloArc" gradientUnits="userSpaceOnUse" x1="250" y1="100" x2="950" y2="100">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.42" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="topHaloArcLight" gradientUnits="userSpaceOnUse" x1="250" y1="100" x2="950" y2="100">
            <stop offset="0%" stopColor="#0F9347" stopOpacity="0" />
            <stop offset="30%" stopColor="#0F9347" stopOpacity="0.30" />
            <stop offset="50%" stopColor="#0F9347" stopOpacity="0.48" />
            <stop offset="70%" stopColor="#0F9347" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#0F9347" stopOpacity="0" />
          </linearGradient>
          {/* Soft blur dedicated to the crown halo so it fades naturally */}
          <filter id="crownBlur" x="-10%" y="-250%" width="120%" height="600%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          {/* Clip to keep hot spots inside the planet */}
          <clipPath id="planetClip">
            <circle cx="600" cy="700" r="600" />
          </clipPath>
        </defs>

        {/* (Light beams cones déplacés au niveau section — voir après le wrapper planète) */}

        {/* Planet body (masks the bottom of the beams) */}
        <circle cx="600" cy="700" r="600" fill="url(#planetFill)" />
        {/* Light mode : base beige fill */}
        <circle cx="600" cy="700" r="600" fill="#FCF7ED" className="hidden light:block" />

        {/* Texture image TOURNANTE — 2 copies motion.g, opacity faible pour rendre la jonction imperceptible */}
        <g clipPath="url(#planetClip)">
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: -1200 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
            {/* Dark mode */}
            <image
              className="light:hidden"
              href="https://www.solarsystemscope.com/textures/download/2k_mercury.jpg"
              x="0" y="100" width="1200" height="1200"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.12"
              style={{ mixBlendMode: 'screen' }}
            />
            <image
              className="light:hidden"
              href="https://www.solarsystemscope.com/textures/download/2k_mercury.jpg"
              x="1200" y="100" width="1200" height="1200"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.12"
              style={{ mixBlendMode: 'screen' }}
            />
            {/* Light mode */}
            <image
              className="hidden light:block"
              href="https://www.solarsystemscope.com/textures/download/2k_mercury.jpg"
              x="0" y="100" width="1200" height="1200"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.15"
              style={{ mixBlendMode: 'multiply' }}
            />
            <image
              className="hidden light:block"
              href="https://www.solarsystemscope.com/textures/download/2k_mercury.jpg"
              x="1200" y="100" width="1200" height="1200"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.15"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.g>
        </g>

        {/* Curved top halo — brume animée (drift subtil + respiration d'opacité) */}
        {/* Dark mode : curved top halo (white) */}
        <g className="light:hidden halo-mist">
          <path
            d="M 270 220 A 620 620 0 0 1 930 220"
            fill="none"
            stroke="url(#topHaloArc)"
            strokeWidth="90"
            strokeLinecap="round"
            filter="url(#crownBlur)"
          />
        </g>
        {/* Light mode : curved top halo (green) */}
        <g className="hidden light:block halo-mist">
          <path
            d="M 270 220 A 620 620 0 0 1 930 220"
            fill="none"
            stroke="url(#topHaloArcLight)"
            strokeWidth="85"
            strokeLinecap="round"
            filter="url(#crownBlur)"
          />
        </g>
        {/* Green overlay to give the planet an accent-green tint in light mode */}
        <circle
          cx="600" cy="700" r="600"
          fill="var(--accent)" fillOpacity="0.10"
          clipPath="url(#planetClip)"
          className="hidden light:block"
        />

        {/* Planet surface texture — grain + cloud bands, clipped inside the planet */}
        <g clipPath="url(#planetClip)">
          {/* Cloud bands animées (rotation planétaire) — dark mode */}
          <motion.g
            className="light:hidden"
            initial={{ x: 0 }}
            animate={{ x: -1200 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}>
            <rect
              x="0" y="100" width="1200" height="700"
              filter="url(#planetClouds)"
              opacity="0.14"
              style={{ mixBlendMode: 'overlay' }}
            />
            <rect
              x="1200" y="100" width="1200" height="700"
              filter="url(#planetClouds)"
              opacity="0.14"
              style={{ mixBlendMode: 'overlay' }}
            />
          </motion.g>
          {/* Cloud bands animées — light mode */}
          <motion.g
            className="hidden light:block"
            initial={{ x: 0 }}
            animate={{ x: -1200 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}>
            <rect
              x="0" y="100" width="1200" height="700"
              filter="url(#planetClouds)"
              opacity="0.18"
              style={{ mixBlendMode: 'multiply' }}
            />
            <rect
              x="1200" y="100" width="1200" height="700"
              filter="url(#planetClouds)"
              opacity="0.18"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.g>
          {/* Fine grain — dark mode */}
          <rect
            x="0" y="100" width="1200" height="700"
            filter="url(#planetGrain)"
            opacity="0.035"
            style={{ mixBlendMode: 'overlay' }}
            className="light:hidden"
          />
          {/* Fine grain — light mode */}
          <rect
            x="0" y="100" width="1200" height="700"
            filter="url(#planetGrain)"
            opacity="0.05"
            style={{ mixBlendMode: 'multiply' }}
            className="hidden light:block"
          />
        </g>

        {/* Hot spots + inner rim glow — clipped INSIDE the planet */}
        <g clipPath="url(#planetClip)">
          {/* Dark mode hot spots (accent/white currentColor) */}
          <g filter="url(#spotBlur)" className="light:hidden">
            <ellipse cx="500" cy="280" rx="150" ry="60" fill="url(#spotHit)" />
            <ellipse cx="700" cy="280" rx="150" ry="60" fill="url(#spotHit)" />
          </g>
          {/* Dark rim glow (accent/white currentColor) */}
          <g className="light:hidden">
            <circle cx="600" cy="700" r="600" fill="none"
              stroke="url(#rimGrad)" strokeWidth="14"
              filter="url(#rimBlurWide)" opacity="0.45" />
            <circle cx="600" cy="700" r="600" fill="none"
              stroke="url(#rimGrad)" strokeWidth="4"
              filter="url(#rimBlur)" opacity="0.8" />
          </g>
          {/* Light rim glow — diffus (inner shadow doux sur la planète) */}
          <g className="hidden light:block">
            <circle cx="600" cy="700" r="600" fill="none"
              stroke="url(#rimGradLight)" strokeWidth="40"
              filter="url(#rimBlurLightDiffuse)" opacity="0.9" />
            <circle cx="600" cy="700" r="600" fill="none"
              stroke="url(#rimGradLight)" strokeWidth="18"
              filter="url(#rimBlurWide)" opacity="0.6" />
          </g>
        </g>

        {/* Crisp horizon rim line — theme-aware (marron in light) */}
        <circle cx="600" cy="700" r="600" fill="none"
          stroke="url(#rimGrad)" strokeWidth="1.5" className="light:hidden" />
        <circle cx="600" cy="700" r="600" fill="none"
          stroke="#0F9347" strokeWidth="1.5" strokeOpacity="0.35" className="hidden light:block" />
      </svg>

      </div>
      </div>

      {/* ─── Faisceaux coniques blancs — SVG au niveau section, reprennent exactement
            les paths d'origine (direction down-left, widening 40→100). Top-aligned
            pour que les beams démarrent pile sous la nav. ─── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-0 w-full h-full z-[1] text-[color:var(--ink)] light:text-[color:var(--accent)] mix-blend-screen light:mix-blend-multiply">
        <defs>
          <linearGradient id="sectionBeamGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <filter id="sectionSpotBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>
        {/* Faisceaux blancs — cones depuis le haut-droit, tombent vers le centre-gauche */}
        <g opacity="0.85" filter="url(#sectionSpotBlur)" className="light:hidden">
          <path d="M 656 0 L 696 0 L 556 340 L 456 340 Z" fill="url(#sectionBeamGrad)" />
          <path d="M 856 0 L 896 0 L 776 340 L 676 340 Z" fill="url(#sectionBeamGrad)" />
        </g>
        <g opacity="0.55" filter="url(#sectionSpotBlur)" className="hidden light:block">
          <path d="M 656 0 L 696 0 L 556 340 L 456 340 Z" fill="rgba(15,147,71,0.30)" />
          <path d="M 856 0 L 896 0 L 776 340 L 676 340 Z" fill="rgba(15,147,71,0.30)" />
        </g>

        {/* Faisceaux verts accent — cones depuis les ANGLES gauche et droit,
            tombent en s'évasant vers l'intérieur */}
        <defs>
          <linearGradient id="sectionGreenBeamGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter="url(#sectionSpotBlur)" className="opacity-[0.28] light:opacity-[0.55]">
          {/* Gauche : angle haut-gauche (0-100) → évase vers (120-340) */}
          <path d="M 0 0 L 100 0 L 340 400 L 120 400 Z" fill="url(#sectionGreenBeamGrad)" />
          {/* Droit : angle haut-droit (1100-1200) → évase vers (860-1080) */}
          <path d="M 1100 0 L 1200 0 L 1080 400 L 860 400 Z" fill="url(#sectionGreenBeamGrad)" />
        </g>
      </svg>


      {/* Fade to bg bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--bg)] pointer-events-none z-10" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-col items-center text-center min-h-[72vh] justify-center py-20 lg:py-28 max-w-[900px] mx-auto">
          {/* Eyebrow — label brutaliste avec fond solide pour lisibilité sur la planète */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center px-3.5 py-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[color:var(--ink)] bg-[color:var(--bg)] light:bg-white border border-[color:var(--border-subtle)]">
            {/* Overlay card-elev-1 (subtil voile en dark) — identique aux cards offres */}
            <span aria-hidden="true" className="absolute inset-0 bg-[color:var(--card-elev-1)] light:hidden pointer-events-none" />
            {/* Dots gris aux 4 coins (signature DA bento) */}
            {[
              { left: '0%',   top: '0%'   },
              { left: '100%', top: '0%'   },
              { left: '0%',   top: '100%' },
              { left: '100%', top: '100%' },
            ].map((pos, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute w-[7px] h-[7px] rounded-full bg-[#201E1D] light:bg-[#E7E6E3] z-[4]"
                style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
              />
            ))}
            <span className="relative">Growth · Agents IA · Développement</span>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-5 text-[clamp(32px,5vw,64px)] leading-[1.05] font-medium tracking-[-0.025em]">
            <AnimatedChars
              text="Les planètes s'alignent,"
              delayStart={0.1}
              stagger={0.025}
              duration={0.7}
              className="block whitespace-nowrap"
            />
            <span className="relative inline-block whitespace-nowrap font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em] mt-1 text-[0.88em]">
              <AnimatedChars
                text="votre marketing aussi."
                delayStart={0.75}
                stagger={0.022}
                duration={0.7}
              />
              <span className="absolute -inset-x-10 -top-4 -bottom-10 -z-10 bg-[color:var(--accent)]/12 light:bg-[color:var(--accent)]/50 blur-3xl rounded-full" />
            </span>
          </h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--ink-muted)] max-w-[640px]">
            Inbound, outbound, agents IA et développement sur-mesure — tous sous la même orbite.
            Un Growth Lead senior pilote, les experts canaux et les devs IA livrent.
          </motion.p>

          {/* CTA — single, glass style */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex items-center justify-center">
            <a
              href="#tarifs"
              className="glass-pill inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
              style={{
                background:
                  'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
              }}>
              <PlayCircle size={16} className="text-black light:text-white" />
              <span>Mon audit gratuit — 48h</span>
            </a>
          </motion.div>

          {/* Review badges — sober one-line */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-[color:var(--ink-muted)]">
            {reviews.map((r, i) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[color:var(--ink)] transition-colors"
                aria-label={`Avis ${r.label}`}>
                <r.Icon />
                <span className="font-semibold text-[color:var(--ink)] tabular-nums">
                  <AnimatedRating value={r.rating} delay={0.8 + i * 0.15} />
                </span>
                <span className="text-[color:var(--ink-dim)]">{r.label}</span>
                {i < reviews.length - 1 && <span className="text-[color:var(--ink-dim)] ml-4">·</span>}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
