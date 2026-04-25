'use client';

import { useEffect, useState } from 'react';

/**
 * Barre de progression de lecture — collée sous la Nav (top-16 px),
 * se remplit en accent au fil du scroll. S'efface quand on n'est pas sur l'article.
 */
export default function ReadingProgress({ containerSelector = 'article' }: { containerSelector?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(containerSelector);
    if (!el) {return;}

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setPct(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setPct((scrolled / total) * 100);
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [containerSelector]);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-[64px] z-[45] h-[2px] bg-[color:var(--border-subtle)]/30 pointer-events-none"
    >
      <div
        className="h-full bg-[color:var(--accent)] transition-[width] duration-75 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
