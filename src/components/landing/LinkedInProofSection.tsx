'use client';
import reviews from '@/data/linkedin-reviews.json';
import Reveal from '../ui/Reveal';
import SectionAmbience from '../ui/SectionAmbience';

const LinkedinIcon = ({ size = 14, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type Review = {
  text: string;
  name: string;
  role: string;
  avatar: string;
  linkedin: string;
  post: string;
};

const ReviewCard = ({ r }: { r: Review }) => (
  <a
    href={r.post || r.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="group border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-5 shrink-0 w-[340px] md:w-[380px] transition-[border-color,background-color,box-shadow] duration-300 hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--card-elev-2,var(--card-elev-1))]">
    <p className="text-[14.5px] leading-relaxed text-[color:var(--ink-muted)] mb-4 line-clamp-5">{r.text}</p>
    <div className="flex items-center gap-3 pt-3 border-t border-[color:var(--border-subtle)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={r.avatar || undefined}
        alt=""
        width={36}
        height={36}
        loading="lazy"
        decoding="async"
        className="w-9 h-9 rounded-full object-cover border border-[color:var(--border-subtle)] shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] font-medium text-[color:var(--ink)] truncate">{r.name}</div>
        <div className="text-[11px] text-[color:var(--ink-muted)] truncate">{r.role}</div>
      </div>
      <LinkedinIcon
        size={14}
        aria-hidden="true"
        className="text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] transition-colors shrink-0"
      />
    </div>
  </a>
);

export default function LinkedInProofSection() {
  const half = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, half);
  const row2 = reviews.slice(half);
  // duplicate for seamless loop
  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <section id="linkedin-proof" className="relative pt-24 lg:pt-32 pb-10 lg:pb-12 overflow-hidden">
      <SectionAmbience variant="medium" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <Reveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Vos pairs valident
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
          </div>

          <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
            Dirigeants, CMOs et Heads of Growth.{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              À visage découvert.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Ils dirigent des PME, ETI et grands comptes. Ils commentent publiquement nos analyses sur LinkedIn. Chaque card ouvre le fil d'origine.
          </p>
        </Reveal>

        {/* ── Double-row marquee (contained dans la colonne) ── */}
        <div className="mt-14 space-y-4">
          {/* Row 1 : droite → gauche */}
          <div className="marquee-wrap">
            <div className="marquee-track-reviews">
              {loop1.map((r, i) => (
                <ReviewCard key={`r1-${i}`} r={r} />
              ))}
            </div>
          </div>
          {/* Row 2 : gauche → droite (reverse) */}
          <div className="marquee-wrap">
            <div className="marquee-track-reviews marquee-track-reverse">
              {loop2.map((r, i) => (
                <ReviewCard key={`r2-${i}`} r={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
