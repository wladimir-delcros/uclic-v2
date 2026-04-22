'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { CasClient } from '@/lib/portfolio';

interface Props {
  cases: CasClient[];
}

/**
 * Sticky scroll-stack : chaque card s'empile progressivement en haut du viewport
 * au scroll. Pattern style "scroll telescope" (revomo.ai, linear.app).
 * - Chaque card = position:sticky avec un top décalé (i * 28px) → les cards laissent
 *   apparaître une tranche de la précédente.
 * - Un spacer vertical entre chaque card force le user à scroller pour « libérer » la suivante.
 */
export default function PreuveTabs({ cases }: Props) {
  if (!cases.length) return null;

  return (
    <div className="mt-14 relative">
      {cases.map((c, i) => {
        const href = `https://uclic.fr/cas-clients/${c.slug}`;
        const topOffset = 90 + i * 28; // chaque card pin 28px plus bas que la précédente

        return (
          <div
            key={c.id}
            className="sticky mb-[18vh] last:mb-0"
            style={{ top: `${topOffset}px` }}>
            <article className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--bg)] light:bg-white overflow-hidden">
              {/* Overlay card-elev-1 identique aux cards offres (voile subtil) — uniquement en dark */}
              <div aria-hidden="true" className="absolute inset-0 bg-[color:var(--card-elev-1)] light:hidden pointer-events-none" />
              <div className="relative grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-stretch">
                {/* Left : text */}
                <div className="p-8 lg:p-12 flex flex-col justify-center gap-5 min-h-[380px] relative">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] self-start">
                    <span className="w-4 h-px bg-[color:var(--accent)]" />
                    Cas client {String(i + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
                  </div>
                  <h3 className="text-[clamp(24px,3vw,34px)] font-display font-medium leading-[1.15] tracking-[-0.01em]">
                    {c.title}
                  </h3>
                  {c.excerpt && c.excerpt.trim().length > 0 && (
                    <p className="text-[15px] text-[color:var(--ink-muted)] leading-[1.6]">
                      {c.excerpt}
                    </p>
                  )}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-[13.5px] font-medium text-[color:var(--ink)] hover:text-[color:var(--accent)] hover:gap-3 transition-all self-start">
                    Lire le cas complet
                    <ArrowRight size={15} className="transition-transform" />
                  </a>
                </div>

                {/* Right : image */}
                <div className="relative aspect-[5/4] lg:aspect-auto lg:min-h-[380px] bg-[color:var(--bg)] overflow-hidden border-t lg:border-t-0 lg:border-l border-[color:var(--border-subtle)]">
                  {c.featured_image_url ? (
                    <Image
                      src={c.featured_image_url}
                      alt={c.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent)]/10 via-transparent to-[color:var(--card-elev-1)]" />
                  )}
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
