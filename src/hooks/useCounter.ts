'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useMotionValue, useReducedMotion } from 'framer-motion';

/**
 * Parses a KPI string like "× 2,4", "+38", "− 70 %" and returns the components
 * needed to animate the numeric portion while preserving prefix/suffix/format.
 */
function parseKpi(raw: string) {
  // Match optional prefix (non-digit / non-comma chars), the number (with comma decimal), then optional suffix.
  const match = raw.match(/^(.*?)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', number: 0, decimals: 0, suffix: raw, raw };
  const [, prefix, numStr, suffix] = match;
  const normalized = numStr.replace(',', '.');
  const number = parseFloat(normalized);
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0;
  return { prefix, number, decimals, suffix, raw };
}

function formatFr(value: number, decimals: number) {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Animates a KPI string from 0 → target when `inView` flips true.
 * Preserves prefix/suffix and French number formatting (comma decimal).
 * Respects prefers-reduced-motion (snaps to final value).
 */
export function useCounter(raw: string, inView: boolean, duration = 1.8) {
  const parsed = useRef(parseKpi(raw));
  const mv = useMotionValue(0);
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => {
    const { prefix, suffix, decimals } = parsed.current;
    return `${prefix}${formatFr(0, decimals)}${suffix}`;
  });

  useEffect(() => {
    const { prefix, suffix, decimals, number } = parsed.current;

    if (!inView) return;

    if (reduce) {
      setDisplay(`${prefix}${formatFr(number, decimals)}${suffix}`);
      return;
    }

    // easeOutExpo
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const controls = animate(mv, number, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => {
        setDisplay(`${prefix}${formatFr(v, decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, duration, mv]);

  return display;
}
