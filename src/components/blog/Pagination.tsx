import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  /**
   * Path without trailing slash. Page 1 → `${basePath}`,
   * page N → `${basePath}/page/N` (default) or `${basePath}/N` if `pageSegment=""`.
   */
  basePath: string;
  /**
   * URL segment inserted before the page number. Defaults to `"page"` so that
   * paginated pages live at `/blog/page/2`, `/toolbox/page/2`, etc. Pass an
   * empty string to disable the segment.
   */
  pageSegment?: string;
}

function buildHref(basePath: string, page: number, pageSegment: string): string {
  if (page <= 1) return basePath;
  return pageSegment ? `${basePath}/${pageSegment}/${page}` : `${basePath}/${page}`;
}

function pageList(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | '…'> = [1];
  if (current > 3) pages.push('…');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, basePath, pageSegment = 'page' }: Props) {
  if (totalPages <= 1) return null;
  const prev = currentPage > 1 ? buildHref(basePath, currentPage - 1, pageSegment) : null;
  const next = currentPage < totalPages ? buildHref(basePath, currentPage + 1, pageSegment) : null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-2 flex-wrap"
    >
      {prev ? (
        <a
          href={prev}
          rel="prev"
          className="inline-flex items-center gap-1.5 h-9 px-3 !rounded-none border border-[color:var(--border-subtle)] text-[13px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
        >
          <ChevronLeft size={14} /> Précédent
        </a>
      ) : null}
      <ul className="flex items-center gap-1">
        {pageList(currentPage, totalPages).map((p, i) => {
          if (p === '…') {
            return (
              <li
                key={`e${i}`}
                className="px-2 text-[13px] text-[color:var(--ink-muted)] select-none"
                aria-hidden="true"
              >
                …
              </li>
            );
          }
          const isCurrent = p === currentPage;
          return (
            <li key={p}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center justify-center min-w-9 h-9 px-2 !rounded-none bg-[color:var(--accent)] text-[color:var(--accent-ink)] text-[13px] font-semibold"
                >
                  {p}
                </span>
              ) : (
                <a
                  href={buildHref(basePath, p, pageSegment)}
                  className="inline-flex items-center justify-center min-w-9 h-9 px-2 !rounded-none border border-[color:var(--border-subtle)] text-[13px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
                >
                  {p}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      {next ? (
        <a
          href={next}
          rel="next"
          className="inline-flex items-center gap-1.5 h-9 px-3 !rounded-none border border-[color:var(--border-subtle)] text-[13px] text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-colors"
        >
          Suivant <ChevronRight size={14} />
        </a>
      ) : null}
    </nav>
  );
}
