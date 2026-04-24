'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, Search, SlidersHorizontal, Tag } from 'lucide-react';
import SectionAmbience from '../../ui/SectionAmbience';
import type { Workflow } from '@/lib/workflows';

interface Props {
  workflows: Workflow[];
  totalPages: number;
  currentPage: number;
  activeTag?: string;
  activeCategory?: string;
  activeSort: 'new' | 'popular';
  query: string;
  tags: string[];
}

/**
 * V2 public catalogue of n8n workflows for Uclic members.
 *
 * Notes on migration :
 * - Legacy version was gated behind auth + OnboardingModal + FavoriteButton.
 *   V2 membres auth isn't migrated yet, so this page is a public read-only
 *   gallery with server-side filtering via search params.
 * - TODO: re-add favorites toggle once /login is migrated.
 * - TODO: tracking (Amplitude) on filter + card click.
 */
export default function WorkflowsClient(props: Props) {
  const reduceMotion = useReducedMotion();
  const {
    workflows,
    totalPages,
    currentPage,
    activeTag,
    activeSort,
    query,
    tags,
  } = props;

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (query) {params.set('q', query);}
    if (activeTag) {params.set('tag', activeTag);}
    if (props.activeCategory) {params.set('cat', props.activeCategory);}
    if (activeSort && activeSort !== 'new') {params.set('sort', activeSort);}
    if (p > 1) {params.set('page', String(p));}
    const qs = params.toString();
    return qs ? `/membres/workflows?${qs}` : '/membres/workflows';
  };

  const buildTagUrl = (tag: string | null) => {
    const params = new URLSearchParams();
    if (query) {params.set('q', query);}
    if (tag) {params.set('tag', tag);}
    if (activeSort && activeSort !== 'new') {params.set('sort', activeSort);}
    const qs = params.toString();
    return qs ? `/membres/workflows?${qs}` : '/membres/workflows';
  };

  const buildSortUrl = (sort: 'new' | 'popular') => {
    const params = new URLSearchParams();
    if (query) {params.set('q', query);}
    if (activeTag) {params.set('tag', activeTag);}
    if (sort !== 'new') {params.set('sort', sort);}
    const qs = params.toString();
    return qs ? `/membres/workflows?${qs}` : '/membres/workflows';
  };

  const paginationPages: (number | 'ellipsis')[] = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const list: (number | 'ellipsis')[] = [];
    const show = 2;
    list.push(1);
    if (currentPage - show > 2) {list.push('ellipsis');}
    for (
      let i = Math.max(2, currentPage - show);
      i <= Math.min(totalPages - 1, currentPage + show);
      i++
    ) {
      list.push(i);
    }
    if (currentPage + show < totalPages - 1) {list.push('ellipsis');}
    if (totalPages > 1 && !list.includes(totalPages)) {list.push(totalPages);}
    return list;
  })();

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-x-clip">
        <SectionAmbience variant="medium" />

        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="max-w-[820px]">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Membres · Workflows n8n
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
              Votre banque de{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                workflows n8n.
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>

            <p className="mt-6 text-[17px] lg:text-[18px] text-[color:var(--ink)] leading-relaxed max-w-[680px]">
              Explorez, téléchargez et personnalisez des automatisations prêtes à
              l&apos;emploi. Prospection, scoring, enrichissement, content ops,
              CRM — les workflows que nous déployons chez nos clients, documentés
              et réutilisables.
            </p>

            {/* Search form */}
            <form
              action="/membres/workflows"
              method="get"
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[640px]"
            >
              <label className="relative flex-1 flex items-center">
                <Search
                  size={16}
                  strokeWidth={2}
                  className="absolute left-4 text-[color:var(--ink-muted)] pointer-events-none"
                />
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Rechercher un workflow…"
                  className="w-full pl-11 pr-4 py-3 bg-[#141211] light:bg-white border border-[color:var(--border-subtle)] text-[14px] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                />
              </label>
              {activeTag && <input type="hidden" name="tag" value={activeTag} />}
              {activeSort && activeSort !== 'new' && (
                <input type="hidden" name="sort" value={activeSort} />
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[color:var(--accent)] text-[color:var(--accent-ink)] font-medium text-[14px] transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_10px_24px_-10px_rgba(107,255,149,0.55)]"
              >
                Rechercher
                <ArrowRight size={14} strokeWidth={2.2} />
              </button>
            </form>

            {/* Sort tabs */}
            <div className="mt-6 flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.2em]">
              <SlidersHorizontal
                size={13}
                strokeWidth={2}
                className="text-[color:var(--ink-muted)]"
              />
              <span className="text-[color:var(--ink-muted)]">Tri :</span>
              <Link
                href={buildSortUrl('new')}
                className={`px-3 py-1 border transition-colors ${
                  activeSort === 'new'
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]'
                    : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:border-[color:var(--accent)]/40'
                }`}
              >
                Récents
              </Link>
              <Link
                href={buildSortUrl('popular')}
                className={`px-3 py-1 border transition-colors ${
                  activeSort === 'popular'
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]'
                    : 'border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:border-[color:var(--accent)]/40'
                }`}
              >
                Populaires
              </Link>
            </div>
          </div>

          {/* Tag chips */}
          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              <Link
                href={buildTagUrl(null)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[12px] font-mono uppercase tracking-[0.14em] transition-colors ${
                  !activeTag
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]'
                    : 'border-[color:var(--border-subtle)] bg-[#141211] light:bg-white text-[color:var(--ink-muted)] hover:border-[color:var(--accent)]/40'
                }`}
              >
                <Tag size={11} strokeWidth={2} />
                Tous
              </Link>
              {tags.map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <Link
                    key={tag}
                    href={buildTagUrl(isActive ? null : tag)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[12px] font-mono uppercase tracking-[0.14em] transition-colors ${
                      isActive
                        ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]'
                        : 'border-[color:var(--border-subtle)] bg-[#141211] light:bg-white text-[color:var(--ink-muted)] hover:border-[color:var(--accent)]/40'
                    }`}
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─────────── GRID ─────────── */}
      <section className="relative pb-20 lg:pb-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          {workflows.length === 0 ? (
            <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-10 text-center">
              <p className="text-[15px] text-[color:var(--ink-muted)]">
                Aucun workflow ne correspond à votre recherche. Essayez un autre
                terme ou réinitialisez les filtres.
              </p>
              <Link
                href="/membres/workflows"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] hover:underline"
              >
                Réinitialiser →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {workflows.map((w, i) => (
                <motion.div
                  key={w.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i * 0.04, 0.3),
                  }}
                  className="group relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden transition-colors hover:border-[color:var(--accent)]/40"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)]/0 to-transparent group-hover:via-[color:var(--accent)]/60 transition-colors" />
                  <div className="p-6 lg:p-7 flex flex-col h-full min-h-[220px]">
                    <div className="flex items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.22em]">
                      <span className="text-[color:var(--ink-muted)]">
                        {w.category || 'Général'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[color:var(--ink-muted)]">
                        <Heart size={11} strokeWidth={2} />
                        {w.favorites_count}
                      </span>
                    </div>

                    <Link
                      href={`/membres/workflows/${w.slug}`}
                      className="mt-4 inline-block"
                    >
                      <h2 className="text-[17px] lg:text-[18px] font-display font-medium text-[color:var(--ink)] leading-snug tracking-[-0.01em] group-hover:text-[color:var(--accent)] transition-colors">
                        {w.title}
                      </h2>
                    </Link>

                    {w.summary && (
                      <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-[1.6] line-clamp-3">
                        {w.summary}
                      </p>
                    )}

                    {w.tags && w.tags.length > 0 && (
                      <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
                        {w.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-t border-[color:var(--border-subtle)] flex items-center justify-between">
                      <Link
                        href={`/membres/workflows/${w.slug}`}
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                      >
                        Ouvrir
                        <ArrowRight size={12} strokeWidth={2.2} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="mt-14 flex flex-wrap items-center justify-center gap-2"
              aria-label="Pagination des workflows"
            >
              {currentPage > 1 && (
                <Link
                  href={buildPageUrl(currentPage - 1)}
                  className="px-4 py-2 border border-[color:var(--border-subtle)] text-[13px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  ← Précédent
                </Link>
              )}
              <div className="flex items-center gap-1">
                {paginationPages.map((item, idx) =>
                  item === 'ellipsis' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-[color:var(--ink-muted)]"
                      aria-hidden
                    >
                      …
                    </span>
                  ) : (
                    <Link
                      key={item}
                      href={buildPageUrl(item)}
                      className={`min-w-[2.4rem] px-3 py-2 border text-center text-[13px] font-mono transition-colors ${
                        item === currentPage
                          ? 'border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--accent-ink)]'
                          : 'border-[color:var(--border-subtle)] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40'
                      }`}
                      aria-current={item === currentPage ? 'page' : undefined}
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
              {currentPage < totalPages && (
                <Link
                  href={buildPageUrl(currentPage + 1)}
                  className="px-4 py-2 border border-[color:var(--border-subtle)] text-[13px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  Suivant →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
