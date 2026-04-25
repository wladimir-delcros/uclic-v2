'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

/**
 * Carte Leaflet des 3 bureaux Uclic : Paris (HQ), Toulouse, Montpellier.
 * - `react-leaflet` chargé en dynamic import (SSR:false) car il touche `window`.
 * - Tiles OpenStreetMap FR (usage non-commercial OK avec attribution visible).
 */
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center text-[13px] text-[color:var(--ink-muted)]">
      Chargement de la carte…
    </div>
  ),
});

const OFFICES = [
  { city: 'Paris', label: 'Siège social', primary: true, href: 'tel:+33617125428' },
  { city: 'Toulouse', label: 'Bureau Sud-Ouest', href: 'tel:+33617125428' },
  { city: 'Montpellier', label: 'Bureau Sud', href: 'tel:+33617125428' },
  { city: 'Clermont-Ferrand', label: 'Bureau Centre', href: 'tel:+33617125428' },
];

export default function OfficesMap() {
  return (
    <section className="relative">
      {/* Eyebrow + h2 dans la DA canon home */}
      <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
        <span className="w-6 h-px bg-[color:var(--accent)]" />
        Nos bureaux
      </div>
      <h2 className="mt-4 text-[clamp(26px,3.2vw,38px)] font-display font-medium tracking-[-0.02em] leading-[1.15]">
        Paris, Toulouse,{' '}
        <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
          Montpellier
          <span aria-hidden="true" className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
        </span>
      </h2>
      <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] max-w-[620px]">
        Une équipe en remote-first avec trois ancrages physiques. On vous reçoit à Paris,
        Toulouse ou Montpellier — ou on se cale sur votre fuseau.
      </p>

      {/* Bento : carte Leaflet + liste bureaux */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)]">
        {/* Carte Leaflet (fond plain, aucun wash de card) */}
        <div className="relative min-h-[360px] lg:min-h-[440px]">
          <LeafletMap />
        </div>

        {/* Liste bureaux — même DA que les cards de la sidebar : bg-[#141211] en dark, white en light */}
        <ul className="bg-[#141211] light:bg-white divide-y divide-[color:var(--border-subtle)]">
          {OFFICES.map((o) => (
            <li key={o.city}>
              <a
                href={o.href}
                className="group flex items-start gap-4 p-6 lg:p-7 hover:bg-[color:var(--card-elev-1)] transition-colors"
                data-ga-event="contact_click"
                data-ga-method="phone"
                data-ga-location={`offices-${o.city.toLowerCase()}`}
              >
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                  <MapPin size={18} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--ink-dim)] mb-1">
                    {o.label}
                  </div>
                  <div className="text-[17px] font-display font-medium text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                    {o.city}
                    {o.primary && (
                      <span className="ml-2 inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--accent)] align-middle">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-[color:var(--ink-muted)]">
                    Rendez-vous sur site ou en visio — réponse sous 24h.
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
