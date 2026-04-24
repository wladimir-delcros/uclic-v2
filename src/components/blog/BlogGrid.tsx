import { ArrowRight, Clock } from 'lucide-react';
import { estimateReadingTime, formatDateFr, type BlogPost } from '@/lib/blog';

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-[color:var(--ink-muted)]">
        Aucun article publié pour le moment.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {posts.map((p) => {
        const reading = p.reading_time || estimateReadingTime(p.content || '');
        return (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col !rounded-none bg-[color:var(--card)] border border-[color:var(--border-subtle)] overflow-hidden hover:bg-[color:var(--card-elev-1)] hover:border-[color:var(--accent)]/30 transition-colors"
          >
            {p.featured_image_url ? (
              <div className="aspect-[16/9] overflow-hidden bg-[color:var(--border-subtle)] border-b border-[color:var(--border-subtle)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.featured_image_url}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] bg-gradient-to-br from-[color:var(--accent)]/10 to-[color:var(--border-subtle)]/30 border-b border-[color:var(--border-subtle)]" />
            )}
            <div className="flex flex-col flex-1 p-6 gap-3">
              {p.category ? (
                <span className="inline-flex items-center gap-2 self-start text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                  <span className="w-4 h-px bg-[color:var(--accent)]" />
                  {p.category}
                </span>
              ) : null}
              <h2 className="text-[20px] leading-tight font-display font-medium text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                {p.title}
              </h2>
              {p.excerpt ? (
                <p className="text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                  {p.excerpt}
                </p>
              ) : null}
              <div className="mt-auto pt-4 flex items-center justify-between text-[12px] text-[color:var(--ink-muted)]">
                <span>{p.date ? formatDateFr(p.date) : ''}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {reading}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                Lire l&apos;article{' '}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
