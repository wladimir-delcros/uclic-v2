/**
 * Uclic V2 — Animation Hooks
 * Trois hooks React pour les animations scroll-triggered.
 *
 * Usage:
 *   useScrollAnimation  — IntersectionObserver fade-in-up
 *   useCountUp          — Anime les chiffres au scroll
 *   useStaggerChildren  — Stagger delay sur les enfants d'un container
 */

import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface ScrollAnimationOptions {
  /** Seuil d'intersection (0–1). Défaut: 0.1 */
  threshold?: number;
  /** Marge root — déclenche avant d'atteindre le viewport. Défaut: '0px 0px -48px 0px' */
  rootMargin?: string;
  /** Si true, se re-trigger à chaque passage. Défaut: false */
  repeat?: boolean;
  /** Délai avant de déclencher l'animation (ms). Défaut: 0 */
  delay?: number;
}

interface CountUpOptions {
  /** Valeur de départ. Défaut: 0 */
  start?: number;
  /** Durée de l'animation (ms). Défaut: 1200 */
  duration?: number;
  /** Nombre de décimales. Défaut: 0 */
  decimals?: number;
  /** Suffixe affiché après la valeur (ex: '+', '%', '★'). Défaut: '' */
  suffix?: string;
  /** Préfixe affiché avant la valeur (ex: '$'). Défaut: '' */
  prefix?: string;
  /** Easing function. Défaut: easeOutQuart */
  easing?: (t: number) => number;
  /** Options IntersectionObserver */
  intersectionOptions?: Pick<ScrollAnimationOptions, 'threshold' | 'rootMargin'>;
}

interface StaggerChildrenOptions {
  /** Délai de base entre chaque enfant (ms). Défaut: 100 */
  baseDelay?: number;
  /** Délai initial avant le premier enfant (ms). Défaut: 0 */
  initialDelay?: number;
  /** Max d'enfants à stagger (au-delà on recycle). Défaut: 8 */
  maxChildren?: number;
  /** Options IntersectionObserver */
  intersectionOptions?: Pick<ScrollAnimationOptions, 'threshold' | 'rootMargin'>;
}

// ─────────────────────────────────────────────
// Easing functions
// ─────────────────────────────────────────────

const easings = {
  /** Correspond à cubic-bezier(0.25, 1, 0.5, 1) */
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  /** Correspond à cubic-bezier(0.16, 1, 0.3, 1) */
  easeOutExpo: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeLinear: (t: number): number => t,
};

// ─────────────────────────────────────────────
// Hook 1 — useScrollAnimation
// ─────────────────────────────────────────────

/**
 * Retourne un ref à attacher à l'élément et un boolean `isVisible`.
 * Ajoute/retire la classe CSS "visible" automatiquement.
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation();
 * return (
 *   <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
 *     Contenu
 *   </div>
 * );
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
): { ref: RefObject<T | null>; isVisible: boolean } {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -48px 0px',
    repeat = false,
    delay = 0,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timerRef.current = setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            if (!repeat) {
              observer.unobserve(entry.target);
            }
          } else if (repeat) {
            if (timerRef.current) clearTimeout(timerRef.current);
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [threshold, rootMargin, repeat, delay]);

  return { ref, isVisible };
}

// ─────────────────────────────────────────────
// Hook 2 — useCountUp
// ─────────────────────────────────────────────

/**
 * Anime un chiffre de `start` à `end` quand l'élément entre dans le viewport.
 * Retourne la valeur formatée (string) et un ref à attacher à l'élément trigger.
 *
 * @example
 * const { ref, value } = useCountUp(50, { suffix: '+', duration: 1500 });
 * return <span ref={ref}>{value}</span>;
 * // Affiche "0" puis anime jusqu'à "50+"
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  end: number,
  options: CountUpOptions = {}
): { ref: RefObject<T | null>; value: string; hasStarted: boolean } {
  const {
    start = 0,
    duration = 1200,
    decimals = 0,
    suffix = '',
    prefix = '',
    easing = easings.easeOutQuart,
    intersectionOptions = {},
  } = options;

  const ref = useRef<T>(null);
  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${start.toFixed(decimals)}${suffix}`
  );
  const [hasStarted, setHasStarted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const formatValue = useCallback(
    (v: number): string => `${prefix}${v.toFixed(decimals)}${suffix}`,
    [prefix, decimals, suffix]
  );

  const runAnimation = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const current = start + (end - start) * easedProgress;

      setDisplayValue(formatValue(current));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(formatValue(end));
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [hasStarted, start, end, duration, easing, formatValue]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runAnimation();
          observer.unobserve(entries[0].target);
        }
      },
      {
        threshold: intersectionOptions.threshold ?? 0.2,
        rootMargin: intersectionOptions.rootMargin ?? '0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [runAnimation, intersectionOptions.threshold, intersectionOptions.rootMargin]);

  return { ref, value: displayValue, hasStarted };
}

// ─────────────────────────────────────────────
// Hook 3 — useStaggerChildren
// ─────────────────────────────────────────────

/**
 * Applique des délais d'animation staggerés aux enfants directs d'un container.
 * Retourne un ref à attacher au container parent.
 *
 * @example
 * const containerRef = useStaggerChildren({ baseDelay: 100 });
 * return (
 *   <div ref={containerRef}>
 *     <div className="animate-on-scroll">Card 1</div>  // delay: 0ms
 *     <div className="animate-on-scroll">Card 2</div>  // delay: 100ms
 *     <div className="animate-on-scroll">Card 3</div>  // delay: 200ms
 *   </div>
 * );
 */
export function useStaggerChildren<T extends HTMLElement = HTMLDivElement>(
  options: StaggerChildrenOptions = {}
): RefObject<T | null> {
  const {
    baseDelay = 100,
    initialDelay = 0,
    maxChildren = 8,
    intersectionOptions = {},
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Applique les délais CSS sur les enfants directs
    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, index) => {
      const delayIndex = index % maxChildren;
      const delay = initialDelay + delayIndex * baseDelay;
      child.style.animationDelay = `${delay}ms`;
      child.style.transitionDelay = `${delay}ms`;
    });

    // Observer sur le container
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const kids = Array.from(container.children) as HTMLElement[];
          kids.forEach((child) => child.classList.add('visible'));
          observer.unobserve(container);
        }
      },
      {
        threshold: intersectionOptions.threshold ?? 0.05,
        rootMargin: intersectionOptions.rootMargin ?? '0px 0px -24px 0px',
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [baseDelay, initialDelay, maxChildren, intersectionOptions.threshold, intersectionOptions.rootMargin]);

  return ref;
}

// ─────────────────────────────────────────────
// Hook bonus — useReducedMotion
// Respecte la préférence système prefers-reduced-motion
// ─────────────────────────────────────────────

/**
 * Retourne true si l'utilisateur préfère moins de mouvement.
 * À utiliser pour désactiver les animations non-essentielles.
 *
 * @example
 * const reducedMotion = useReducedMotion();
 * const duration = reducedMotion ? 0 : 600;
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// ─────────────────────────────────────────────
// Exports groupés
// ─────────────────────────────────────────────

export { easings };

/**
 * Valeurs préconfigurées pour les stats uclic V2
 * Usage : useCountUp(UCLIC_STATS.clients, { suffix: '+' })
 */
export const UCLIC_STATS = {
  clients: 50,
  rating: 4.9,
  deliveryDays: 48,
  roiPercent: 300,
} as const;
