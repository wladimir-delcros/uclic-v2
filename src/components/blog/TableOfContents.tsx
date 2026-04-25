'use client';

import { useEffect, useState } from 'react';

type Heading = { id: string; text: string; level: 2 | 3 };

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Table des matières auto-générée depuis les h2/h3 du container `.article-body`.
 * - Injecte les id sur chaque titre (idempotent : respecte les id déjà présents).
 * - Suit la section active avec IntersectionObserver.
 * - Sticky sur desktop (via `.article-sidebar-sticky`).
 */
export default function TableOfContents({ containerSelector = '.article-body' }: { containerSelector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) {return;}

    const nodes = container.querySelectorAll<HTMLHeadingElement>('h2, h3');
    const seen = new Set<string>();
    const list: Heading[] = [];

    nodes.forEach((node) => {
      const text = (node.textContent || '').trim();
      if (!text) {return;}
      let id = node.id;
      if (!id) {
        id = slugify(text);
        if (seen.has(id)) {id = `${id}-${list.length}`;}
        node.id = id;
      }
      seen.add(id);
      list.push({ id, text, level: node.tagName === 'H3' ? 3 : 2 });
    });

    setHeadings(list);
  }, [containerSelector]);

  useEffect(() => {
    if (headings.length === 0) {return;}
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]) {setActiveId(visible[0].target.id);}
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) {return null;}

  return (
    <nav aria-label="Sommaire de l'article" className="border border-[color:var(--border-subtle)] !rounded-none bg-[#141211] light:bg-white p-5">
      <div className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--accent)] mb-4">
        <span className="w-4 h-px bg-[color:var(--accent)]" />
        Sommaire
      </div>
      <ul className="space-y-1.5 text-[13px]">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className={`group flex items-start gap-2 leading-snug transition-colors ${
                activeId === h.id
                  ? 'text-[color:var(--accent)]'
                  : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-2 shrink-0 h-px transition-all ${
                  activeId === h.id
                    ? 'w-5 bg-[color:var(--accent)]'
                    : 'w-2 bg-[color:var(--border-strong)] group-hover:w-4 group-hover:bg-[color:var(--ink-muted)]'
                }`}
              />
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
