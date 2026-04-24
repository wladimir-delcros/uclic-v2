'use client';
import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * SideAccentLines — pattern Revomo.
 *
 * Deux lignes SVG latérales qui partent des bords du viewport et convergent
 * vers le titre au centre. Forme : horizontal bas → S-rise smooth → horizontal
 * haut qui fade vers le centre. Tangentes horizontales aux deux extrémités de
 * la rise → courbe parfaitement symétrique, raccords invisibles.
 *
 * Trigger : useInView réversible (replay à chaque entrée en vue).
 * Accessibilité : respect prefersReducedMotion → affichage final direct.
 *
 * Usage :
 *   <section className="relative ...">
 *     <SideAccentLines className="top-[6.5rem] lg:top-[8.5rem]" />
 *     ...
 *   </section>
 *
 * Le `className` permet de régler le top offset pour aligner la queue
 * horizontale haute avec le niveau vertical de l'eyebrow du titre.
 */
type Props = {
  /** Classes appliquées au container (typiquement top-[Xrem] lg:top-[Yrem]). */
  className?: string;
  /** Durée de l'animation du tracé (par défaut 1.4s). */
  duration?: number;
};

export default function SideAccentLines({ className = '', duration = 1.4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // once:true → l'anim joue au premier passage et reste figée à son état final.
  // Évite que les lignes "disparaissent" quand l'utilisateur scrolle plus bas
  // dans la section et que le container sort du seuil viewport par le haut.
  const inView = useInView(ref, { once: true, margin: '-10% 0px -30% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const shown = inView || prefersReducedMotion;

  // Path unique symétrique :
  //   - Horizontal bas (0 → 200)
  //   - S-rise avec controls (280,120) et (320,0) → tangent lengths égaux de 80
  //   - Horizontal haut long (400 → 600) qui fade vers le centre via gradient
  // viewBox : 0 0 600 120.
  const pathD = 'M 0 120 L 200 120 C 280 120, 320 0, 400 0 L 600 0';
  const pathLen = 1;

  const strokeTransition =
    shown && !prefersReducedMotion
      ? `stroke-dashoffset ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`
      : 'none';

  // IDs uniques par instance pour éviter les collisions si plusieurs
  // SideAccentLines coexistent dans le DOM.
  const uid = useRef(`sal-${Math.random().toString(36).slice(2, 9)}`).current;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 h-[120px] z-[0] ${className}`}>
      {/* Theme-responsive stop colors :
          - Dark (default)  : ink à 8% d'alpha → gris discret (matche border-bottom du header)
          - Light           : accent plein → vert éditorial d'uclic */}
      <style>{`
        .sal-stop      { stop-color: var(--ink); stop-opacity: 0.08; }
        .sal-stop-end  { stop-color: var(--ink); stop-opacity: 0; }
        .light .sal-stop      { stop-color: var(--accent); stop-opacity: 1; }
        .light .sal-stop-end  { stop-color: var(--accent); stop-opacity: 0; }
      `}</style>

      {/* LEFT line */}
      <svg
        className="absolute top-0 left-0 h-[120px] w-[calc(50vw-20px)] max-w-[720px]"
        viewBox="0 0 600 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Dark : gris discret (ink 8%, matche le border-bottom du header).
              Light : accent vert plein. Fade-out vers 0 alpha côté centre viewport. */}
          <linearGradient id={`${uid}-l`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="sal-stop" />
            <stop offset="66%" className="sal-stop" />
            <stop offset="100%" className="sal-stop-end" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          stroke={`url(#${uid}-l)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          pathLength={pathLen}
          strokeDasharray={pathLen}
          style={{
            strokeDashoffset: shown ? 0 : pathLen,
            transition: strokeTransition,
            vectorEffect: 'non-scaling-stroke',
          }}
        />
      </svg>

      {/* RIGHT line — miroir via scaleX(-1). Le gradient (défini dans l'espace
          du viewBox non-flippé) est lui aussi retourné par le transform CSS,
          donc la partie transparente se retrouve côté centre comme voulu. */}
      <svg
        className="absolute top-0 right-0 h-[120px] w-[calc(50vw-20px)] max-w-[720px]"
        viewBox="0 0 600 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'scaleX(-1)' }}>
        <defs>
          <linearGradient id={`${uid}-r`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="sal-stop" />
            <stop offset="66%" className="sal-stop" />
            <stop offset="100%" className="sal-stop-end" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          stroke={`url(#${uid}-r)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          pathLength={pathLen}
          strokeDasharray={pathLen}
          style={{
            strokeDashoffset: shown ? 0 : pathLen,
            transition: strokeTransition,
            vectorEffect: 'non-scaling-stroke',
          }}
        />
      </svg>
    </div>
  );
}
