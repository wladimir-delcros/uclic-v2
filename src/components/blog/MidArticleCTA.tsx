'use client';

import { useEffect } from 'react';

/**
 * Injecte un CTA au milieu de l'article CMS (`.article-body`).
 * Le contenu HTML vient de `dangerouslySetInnerHTML` donc on ne peut pas
 * le composer en JSX. On cible le `<h2>` du milieu côté client (mount only)
 * et on insère un bloc CTA en style bento canon juste avant.
 */
interface Props {
  href?: string;
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
  containerSelector?: string;
}

export default function MidArticleCTA({
  href = '/audit',
  eyebrow = 'Passons à l’action',
  title = 'Envie de l’appliquer chez vous ? Audit gratuit — 48 h.',
  buttonLabel = 'Mon audit gratuit — 48h',
  containerSelector = '.article-body',
}: Props) {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) {return;}
    if (container.querySelector('[data-mid-cta]')) {return;}

    const h2s = container.querySelectorAll<HTMLHeadingElement>('h2');
    if (h2s.length < 3) {return;}

    const midIndex = Math.floor(h2s.length / 2);
    const anchor = h2s[midIndex];
    if (!anchor) {return;}

    const cta = document.createElement('aside');
    cta.setAttribute('data-mid-cta', '');
    cta.className = 'my-10 not-prose';
    cta.innerHTML = `
      <div class="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6 lg:p-8 overflow-hidden">
        <div class="inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase" style="color: var(--accent);">
          <span class="w-4 h-px" style="background: var(--accent);"></span>
          ${escapeHtml(eyebrow)}
        </div>
        <h3 class="mt-3 text-[20px] lg:text-[22px] font-display font-medium tracking-[-0.015em] leading-tight" style="color: var(--ink);">
          ${escapeHtml(title)}
        </h3>
        <p class="mt-2 text-[14px] leading-relaxed" style="color: var(--ink-muted);">
          30 min avec un Growth Lead senior. Audit des 3 piliers + plan 90 jours chiffré. 0 €, sans engagement.
        </p>
        <a
          href="${href}"
          data-ga-event="cta_click"
          data-ga-cta-name="mid-article-audit"
          data-ga-cta-location="blog-mid"
          class="mt-5 inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] font-semibold hover:scale-[1.02] transition-transform"
          style="border-radius: 6px; color: var(--accent-ink); background: radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent);"
        >
          <span style="color: var(--accent-ink);">${escapeHtml(buttonLabel)}</span>
          <span aria-hidden="true" style="color: var(--accent-ink);">→</span>
        </a>
      </div>
    `;

    anchor.parentNode?.insertBefore(cta, anchor);
  }, [href, eyebrow, title, buttonLabel, containerSelector]);

  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
