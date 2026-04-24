import { ArrowLeft } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export default function ScrapingBreadcrumb({ items }: { items: Crumb[] }) {
  if (!items || items.length === 0) {return null;}
  const last = items[items.length - 1];
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      {parent?.href ? (
        <a
          href={parent.href}
          className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
        >
          <ArrowLeft size={14} /> Retour à {parent.label}
        </a>
      ) : null}
      <ol className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-[color:var(--ink-muted)]">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-2">
            {c.href && i < items.length - 1 ? (
              <a href={c.href} className="hover:text-[color:var(--accent)] transition-colors">
                {c.label}
              </a>
            ) : (
              <span className={i === items.length - 1 ? 'text-[color:var(--ink)]' : ''}>
                {c.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
      <span className="sr-only">
        Page actuelle : {last.label}
      </span>
    </nav>
  );
}
