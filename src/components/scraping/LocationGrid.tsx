import { ArrowRight } from 'lucide-react';

export interface LocationItem {
  id: string;
  name: string;
  slug: string;
  code?: string | null;
}

interface Props {
  items: LocationItem[];
  buildHref: (item: LocationItem) => string;
  emptyLabel?: string;
  labelPrefix?: string;
}

export default function LocationGrid({ items, buildHref, emptyLabel, labelPrefix }: Props) {
  if (items.length === 0) {
    return emptyLabel ? (
      <p className="text-[color:var(--ink-muted)] text-[14px]">{emptyLabel}</p>
    ) : null;
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={buildHref(it)}
            className="group flex items-center justify-between gap-3 !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-5 hover:border-[color:var(--accent)]/50 transition-colors"
          >
            <div className="min-w-0">
              {labelPrefix ? (
                <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-muted)] mb-1">
                  {labelPrefix}
                </p>
              ) : null}
              <p className="text-[15px] font-semibold text-[color:var(--ink)] truncate">
                {it.name}
                {it.code ? (
                  <span className="ml-2 text-[12px] font-normal text-[color:var(--ink-muted)]">
                    ({it.code})
                  </span>
                ) : null}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="shrink-0 text-[color:var(--accent)] group-hover:translate-x-1 transition-transform"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
