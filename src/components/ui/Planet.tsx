'use client';

/**
 * Planet — décor partagé entre Hero (top-center) et CtaFinal (bottom-center bookend).
 * Même SVG exact : même background (planetFill), même rim glow, même texture Mercury
 * rotative, même cloud bands, même grain, même hotspots. Les ids SVG sont préfixés par
 * `idPrefix` pour permettre plusieurs planètes sur la même page sans conflit.
 */
export default function Planet({ idPrefix }: { idPrefix: string }) {
  const gid = (name: string) => `${idPrefix}-${name}`;
  const url = (name: string) => `url(#${gid(name)})`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      style={{ overflow: 'visible' }}
      className="pointer-events-none absolute inset-0 w-full h-full text-[color:var(--ink)] light:text-[color:var(--accent)]">
      <defs>
        <radialGradient id={gid('planetFill')} cx="50%" cy="10%" r="70%">
          <stop offset="0%" stopColor="var(--surface-raised)" />
          <stop offset="15%" stopColor="var(--surface)" />
          <stop offset="45%" stopColor="var(--bg)" />
          <stop offset="100%" stopColor="var(--bg)" />
        </radialGradient>
        <linearGradient id={gid('rimGrad')} gradientUnits="userSpaceOnUse" x1="600" y1="100" x2="600" y2="800">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="25%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="90%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gid('rimGradLight')} gradientUnits="userSpaceOnUse" x1="600" y1="100" x2="600" y2="800">
          <stop offset="0%" stopColor="rgba(15,147,71,0.25)" />
          <stop offset="25%" stopColor="rgba(15,147,71,0.18)" />
          <stop offset="60%" stopColor="rgba(15,147,71,0.08)" />
          <stop offset="90%" stopColor="rgba(15,147,71,0.02)" />
          <stop offset="100%" stopColor="rgba(15,147,71,0)" />
        </linearGradient>
        <filter id={gid('rimBlur')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={gid('rimBlurWide')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={gid('rimBlurLightDiffuse')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id={gid('spotBlur')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id={gid('planetGrain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed="7" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
        </filter>
        <filter id={gid('planetClouds')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.02" numOctaves="3" seed="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 -0.3" />
        </filter>
        <radialGradient id={gid('spotHit')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <clipPath id={gid('planetClip')}>
          <circle cx="600" cy="700" r="600" />
        </clipPath>
      </defs>

      {/* Planet body */}
      <circle cx="600" cy="700" r="600" fill={url('planetFill')} />
      <circle cx="600" cy="700" r="600" fill="#FCF7ED" className="hidden light:block" />

      {/* Texture Mercury rotative (CSS loop GPU) */}
      <g clipPath={url('planetClip')}>
        <g className="planet-texture-loop">
          <image className="light:hidden" href="/hero/textures/mercury.webp"
            x="0" y="100" width="1200" height="1200"
            preserveAspectRatio="xMidYMid slice" opacity="0.12" style={{ mixBlendMode: 'screen' }} />
          <image className="light:hidden" href="/hero/textures/mercury.webp"
            x="1200" y="100" width="1200" height="1200"
            preserveAspectRatio="xMidYMid slice" opacity="0.12" style={{ mixBlendMode: 'screen' }} />
          <image className="hidden light:block" href="/hero/textures/mercury.webp"
            x="0" y="100" width="1200" height="1200"
            preserveAspectRatio="xMidYMid slice" opacity="0.15" style={{ mixBlendMode: 'multiply' }} />
          <image className="hidden light:block" href="/hero/textures/mercury.webp"
            x="1200" y="100" width="1200" height="1200"
            preserveAspectRatio="xMidYMid slice" opacity="0.15" style={{ mixBlendMode: 'multiply' }} />
        </g>
      </g>

      {/* Green overlay (light mode) */}
      <circle cx="600" cy="700" r="600"
        fill="var(--accent)" fillOpacity="0.10"
        clipPath={url('planetClip')} className="hidden light:block" />

      {/* Cloud bands + fine grain (clipped inside planet) */}
      <g clipPath={url('planetClip')}>
        <g className="planet-clouds-loop light:hidden">
          <rect x="0" y="100" width="1200" height="700"
            filter={url('planetClouds')} opacity="0.14" style={{ mixBlendMode: 'overlay' }} />
          <rect x="1200" y="100" width="1200" height="700"
            filter={url('planetClouds')} opacity="0.14" style={{ mixBlendMode: 'overlay' }} />
        </g>
        <g className="planet-clouds-loop hidden light:block">
          <rect x="0" y="100" width="1200" height="700"
            filter={url('planetClouds')} opacity="0.18" style={{ mixBlendMode: 'multiply' }} />
          <rect x="1200" y="100" width="1200" height="700"
            filter={url('planetClouds')} opacity="0.18" style={{ mixBlendMode: 'multiply' }} />
        </g>
        <rect x="0" y="100" width="1200" height="700"
          filter={url('planetGrain')} opacity="0.035"
          style={{ mixBlendMode: 'overlay' }} className="light:hidden" />
        <rect x="0" y="100" width="1200" height="700"
          filter={url('planetGrain')} opacity="0.05"
          style={{ mixBlendMode: 'multiply' }} className="hidden light:block" />
      </g>

      {/* Hot spots + rim glow (clipped inside planet) */}
      <g clipPath={url('planetClip')}>
        <g filter={url('spotBlur')} className="light:hidden">
          <ellipse cx="500" cy="280" rx="150" ry="60" fill={url('spotHit')} />
          <ellipse cx="700" cy="280" rx="150" ry="60" fill={url('spotHit')} />
        </g>
        <g className="light:hidden">
          <circle cx="600" cy="700" r="600" fill="none"
            stroke={url('rimGrad')} strokeWidth="14"
            filter={url('rimBlurWide')} opacity="0.45" />
          <circle cx="600" cy="700" r="600" fill="none"
            stroke={url('rimGrad')} strokeWidth="4"
            filter={url('rimBlur')} opacity="0.8" />
        </g>
        <g className="hidden light:block">
          <circle cx="600" cy="700" r="600" fill="none"
            stroke={url('rimGradLight')} strokeWidth="40"
            filter={url('rimBlurLightDiffuse')} opacity="0.9" />
          <circle cx="600" cy="700" r="600" fill="none"
            stroke={url('rimGradLight')} strokeWidth="18"
            filter={url('rimBlurWide')} opacity="0.6" />
        </g>
      </g>

      {/* Crisp horizon rim line */}
      <circle cx="600" cy="700" r="600" fill="none"
        stroke={url('rimGrad')} strokeWidth="1.5" className="light:hidden" />
      <circle cx="600" cy="700" r="600" fill="none"
        stroke="#0F9347" strokeWidth="1.5" strokeOpacity="0.35" className="hidden light:block" />
    </svg>
  );
}
