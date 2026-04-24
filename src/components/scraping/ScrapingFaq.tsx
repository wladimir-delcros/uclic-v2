import type { FaqEntry } from '@/lib/scraping';

interface Props {
  items: FaqEntry[];
  title?: string;
}

export default function ScrapingFaq({ items, title = 'Questions fréquentes' }: Props) {
  if (!items || items.length === 0) {return null;}
  return (
    <section className="relative py-16 lg:py-20">
      <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
        <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
          <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
          <span>FAQ</span>
        </div>
        <h2 className="text-[28px] lg:text-[36px] font-semibold text-[color:var(--ink)] mb-8">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <details
              key={i}
              className="group !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[16px] lg:text-[17px] font-semibold text-[color:var(--ink)]">
                <span>{it.question}</span>
                <span
                  className="shrink-0 text-[color:var(--accent)] transition-transform group-open:rotate-45 text-[20px] leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div
                className="mt-4 text-[15px] leading-relaxed text-[color:var(--ink-muted)] blog-content"
                dangerouslySetInnerHTML={{ __html: it.answer }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
