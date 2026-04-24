'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CalendarClock, Users } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import CornerCross from '../ui/CornerCross';
import Planet from '../ui/Planet';

const EYEBROW_CROSSES = [
  { left: '0%',   top: '0%'   },
  { left: '100%', top: '0%'   },
  { left: '0%',   top: '100%' },
  { left: '100%', top: '100%' },
];

/* Pictos marques — mêmes SVG que le Hero. */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
const TrustpilotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M12 1.5l2.76 8.5h8.94l-7.23 5.26 2.76 8.5L12 18.5l-7.23 5.26 2.76-8.5L.3 10h8.94L12 1.5z" fill="#00B67A" />
  </svg>
);
const SortlistIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
    <path d="M7.5 12.5l3 3 6-6" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function CtaFinal() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 lg:py-32 bg-[color:var(--bg)]">
      {/* Top hairline — bookend avec le border-bottom du header */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />

      {/* Grid blueprint fading vers le centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[0] light:hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 55% 65% at 50% 55%, transparent 0%, transparent 25%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 65% at 50% 55%, transparent 0%, transparent 25%, black 100%)',
        }}
      />

      {/* Planet — même DA que Hero */}
      <div className="absolute inset-x-0 top-[1vh] bottom-0 flex items-center justify-center pointer-events-none">
        <div className="relative h-full scale-[1.12] origin-center" style={{ aspectRatio: '1200 / 800' }}>
          <Planet idPrefix="cta-planet" />
          {/* Halo blanc courbé vers le bas */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 w-full h-full z-[1]">
            <defs>
              <linearGradient id="ctaDownHalo" gradientUnits="userSpaceOnUse" x1="200" y1="240" x2="1000" y2="240">
                <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="30%"  stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="50%"  stopColor="#FFFFFF" stopOpacity="0.7" />
                <stop offset="70%"  stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ctaDownHaloLight" gradientUnits="userSpaceOnUse" x1="200" y1="240" x2="1000" y2="240">
                <stop offset="0%"   stopColor="#0F9347" stopOpacity="0" />
                <stop offset="30%"  stopColor="#0F9347" stopOpacity="0.32" />
                <stop offset="50%"  stopColor="#0F9347" stopOpacity="0.52" />
                <stop offset="70%"  stopColor="#0F9347" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#0F9347" stopOpacity="0" />
              </linearGradient>
              <filter id="ctaDownHaloBlur" x="-10%" y="-150%" width="120%" height="400%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>
            <g className="light:hidden" filter="url(#ctaDownHaloBlur)">
              <path d="M 220 240 A 700 700 0 0 0 980 240"
                fill="none" stroke="url(#ctaDownHalo)" strokeWidth="80" strokeLinecap="round" />
            </g>
            <g className="hidden light:block" filter="url(#ctaDownHaloBlur)">
              <path d="M 220 240 A 700 700 0 0 0 980 240"
                fill="none" stroke="url(#ctaDownHaloLight)" strokeWidth="75" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* Fade bas — évite la coupure nette de la planète */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--bg)] pointer-events-none z-10" />

      <SectionAmbience variant="full" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col items-center">

          {/* Eyebrow brutaliste avec 4 crosses (miroir du Hero) */}
          <div className="relative inline-flex items-center px-4 py-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[color:var(--ink)] bg-[color:var(--bg)] light:bg-white border border-[color:var(--border-subtle)]">
            <span aria-hidden="true" className="absolute inset-0 bg-[color:var(--card-elev-1)] light:hidden pointer-events-none" />
            {EYEBROW_CROSSES.map((pos, i) => (
              <CornerCross
                key={i}
                size={14}
                className="absolute z-[4]"
                style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
              />
            ))}
            <span className="relative">Dernière étape</span>
          </div>

          <h2 className="mt-8 text-center text-[clamp(28px,3.8vw,46px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[880px]">
            Vous n&apos;avez pas besoin de plus de canaux.
            <br />
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Vous avez besoin d&apos;un pilote.
              <span aria-hidden="true" className="absolute -inset-x-6 -inset-y-3 -z-10 bg-[color:var(--accent)]/12 light:bg-[color:var(--accent)]/45 blur-3xl rounded-full" />
            </span>
          </h2>

          {/* Un seul CTA, aligné avec le reste du site */}
          <a
            href="/audit"
            className="glass-pill mt-10 inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
            style={{
              borderRadius: '6px',
              background:
                'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
            }}>
            <CalendarClock size={16} className="text-black light:text-white" />
            <span>Réserver mon Growth Scan</span>
            <ArrowRight size={15} className="text-black light:text-white" />
          </a>

          {/* Ligne de réassurance sobre — 3 points clés inline */}
          <p className="mt-4 text-[12.5px] text-[color:var(--ink-muted)] flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
            <span className="text-[color:var(--accent)] font-semibold">Gratuit</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[color:var(--ink-dim)]" />
            <span>Résultats en 48 h</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[color:var(--ink-dim)]" />
            <span>Sans engagement</span>
          </p>

          {/* Trust line — pictos + ratings */}
          <div className="mt-10 pt-6 border-t border-[color:var(--border-subtle)] w-full max-w-[780px]">
            <p className="text-[12px] text-[color:var(--ink-muted)] flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5">
              <a href="tel:+33617125428" className="inline-flex items-center gap-1.5 hover:text-[color:var(--ink)] transition-colors">
                <Phone size={13} /> 06 17 12 54 28
              </a>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[color:var(--ink-dim)]" />
              <span className="inline-flex items-center gap-1.5">
                <GoogleIcon />
                <span className="text-[color:var(--ink)] tabular-nums font-semibold">4,9</span>
                <span className="text-[color:var(--ink-muted)]">Google</span>
              </span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[color:var(--ink-dim)]" />
              <span className="inline-flex items-center gap-1.5">
                <SortlistIcon />
                <span className="text-[color:var(--ink)] tabular-nums font-semibold">4,96</span>
                <span className="text-[color:var(--ink-muted)]">Sortlist</span>
              </span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[color:var(--ink-dim)]" />
              <span className="inline-flex items-center gap-1.5">
                <TrustpilotIcon />
                <span className="text-[color:var(--ink)] tabular-nums font-semibold">4,3</span>
                <span className="text-[color:var(--ink-muted)]">Trustpilot</span>
              </span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[color:var(--ink-dim)]" />
              <span className="inline-flex items-center gap-1.5">
                <Users size={13} className="text-[color:var(--ink-muted)]" />
                <span className="text-[color:var(--ink-muted)]">40+ clients B2B</span>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
