import { MapPin, ArrowRight } from 'lucide-react';
import type { CityLink } from '@/lib/programmatic-pages';

interface Props {
  cities: CityLink[];
  /** Expertise / category name, used in the title (e.g. "Google Ads"). */
  label: string;
  /** Extra subline below the H2. Defaults to a generic FR sentence. */
  subtitle?: string;
}

export default function CityLinksGrid({ cities, label, subtitle }: Props) {
  if (cities.length === 0) return null;
  return (
    <section className="relative py-16 lg:py-20 border-t border-[color:var(--border-subtle)]">
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="max-w-[780px] mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
            <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
            <span>Nos agences locales</span>
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-[color:var(--ink)] tracking-tight leading-[1.1]">
            Agence {label} en France
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--ink-muted)]">
            {subtitle ||
              `Découvrez nos agences locales pour booster votre visibilité avec une stratégie ${label.toLowerCase()} personnalisée selon votre marché et votre ville.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {cities.map((c) => (
            <a
              key={c.pathSlug}
              href={c.pathSlug}
              className="group flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 hover:border-[color:var(--accent)]/50 transition-colors"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[color:var(--accent)]">
                <MapPin size={12} strokeWidth={2.2} />
                {c.cityName}
              </span>
              <h3 className="mt-3 text-[18px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors leading-tight">
                Agence {label} à {c.cityName}
              </h3>
              {c.metaDescription ? (
                <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                  {c.metaDescription}
                </p>
              ) : null}
              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                En savoir plus
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
