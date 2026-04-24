'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, Sparkles, Check, PlayCircle } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';

const STATS = [
  { value: '90j',  label: 'cadre éprouvé' },
  { value: '48h',  label: 'rapport + roadmap livrés' },
  { value: '0€',   label: 'offert · sans engagement' },
];

// Steps = Phase 01 de la méthode home (MethodeSection Audit stratégique)
const STEPS = [
  {
    n: '01',
    title: 'Audit funnel & attribution',
    desc: 'De la première visite au closing : on identifie où vos prospects décrochent et quels canaux sous-performent.',
  },
  {
    n: '02',
    title: 'Audit stack tech & data',
    desc: 'Cartographie de vos outils, intégrations, tracking et qualité d’attribution. On trouve les fuites de data.',
  },
  {
    n: '03',
    title: 'Maturité IA & automation',
    desc: 'On évalue les leviers IA activables — scoring, outreach, content, ops — et on priorise ceux qui ont un ROI mesurable.',
  },
  {
    n: '04',
    title: 'Roadmap priorisée 12 mois',
    desc: 'Quick wins 30j + chantiers structurants. Concret, actionnable, chiffré.',
  },
];

export default function AuditClient() {
  const reduceMotion = useReducedMotion();
  const [showBooking, setShowBooking] = useState(false);
  const preconnected = useRef(false);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const bookingStartTime = useRef<number | null>(null);
  const bookingTracked = useRef(false);

  const preconnectHubSpot = useCallback(() => {
    if (preconnected.current) return;
    preconnected.current = true;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://meetings.hubspot.com';
    document.head.appendChild(link);
  }, []);

  const openBooking = useCallback(() => {
    setShowBooking(true);
    bookingStartTime.current = Date.now();
  }, []);

  // HubSpot meeting booked event → redirect vers merci
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch { /* noop */ }
      }
      const isBooked =
        data?.meetingBookSucceeded ||
        data?.meetingBookingSucceeded ||
        data?.type === 'meetingBookingSucceeded' ||
        data?.type === 'hubspot:meeting:booked' ||
        data?.eventName === 'meetingBookSucceeded' ||
        (typeof event.data === 'string' && (event.data.includes('meetingBook') || event.data.includes('meetingBooking')));
      if (isBooked && !bookingTracked.current) {
        bookingTracked.current = true;
        window.location.href = '/merci?source=audit_booking';
      }
    };
    window.addEventListener('message', handleMessage);

    // Allow external triggers (e.g. sticky mobile CTA)
    const handleOpen = () => {
      openBooking();
      setTimeout(() => {
        bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };
    window.addEventListener('open-audit-booking', handleOpen);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('open-audit-booking', handleOpen);
    };
  }, [openBooking]);

  return (
    <section className="relative pt-24 lg:pt-28 pb-20 lg:pb-28 overflow-x-clip">
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* ─────────── Left column : content ─────────── */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Audit Gratuit
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            {/* H1 */}
            <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
              Votre marketing{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                ne convertit pas&nbsp;?
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-[17px] text-[color:var(--ink)] leading-relaxed max-w-[560px]">
              Phase 01 de notre méthode en 90 jours, offerte. Diagnostic funnel, audit stack tech et évaluation de votre maturité IA &amp; automation.
              <br />
              Livrable sous 48h : rapport stratégique + roadmap priorisée 12 mois.
            </p>

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-[color:var(--border-subtle)] py-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-medium text-[28px] lg:text-[32px] tabular-nums tracking-tight text-[color:var(--accent)] leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[12px] text-[color:var(--ink-muted)] leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div className="mt-8 flex flex-col gap-5">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                  className="flex items-start gap-4">
                  <span className="w-10 h-10 grid place-items-center border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white shrink-0 text-[12px] font-mono font-semibold tracking-widest text-[color:var(--accent)]">
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-medium text-[color:var(--ink)] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-[color:var(--ink-muted)] leading-[1.55]">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Free/no-engagement box */}
            <div className="mt-10 relative border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/[0.04] p-5 flex items-start gap-4 overflow-hidden">
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl pointer-events-none" />
              <span className="w-10 h-10 grid place-items-center border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 text-[color:var(--accent)] shrink-0">
                <Sparkles size={18} strokeWidth={2} />
              </span>
              <div>
                <div className="text-[15px] font-medium text-[color:var(--ink)]">
                  Phase 01 offerte · 0€ · sans engagement
                </div>
                <p className="mt-1 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                  Pas de sales, pas de discours marketing. Un expert senior uclic analyse votre situation et vous remet un diagnostic exécutif + une roadmap actionnable.
                </p>
              </div>
            </div>
          </div>

          {/* ─────────── Right column : HubSpot booking ─────────── */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-[100px]">
            <div
              id="audit-booking"
              ref={bookingRef}
              className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden">
              {showBooking ? (
                <iframe
                  src="https://meetings.hubspot.com/wdelcros"
                  width="100%"
                  height="680"
                  frameBorder="0"
                  title="Réserver un appel audit"
                  className="w-full"
                  style={{ minHeight: '680px', backgroundColor: 'transparent' }}
                />
              ) : (
                <button
                  type="button"
                  onClick={openBooking}
                  onMouseEnter={preconnectHubSpot}
                  onTouchStart={preconnectHubSpot}
                  className="w-full flex flex-col items-center justify-center p-8 lg:p-10 min-h-[500px] text-center cursor-pointer group">
                  <span className="w-16 h-16 grid place-items-center border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 text-[color:var(--accent)] mb-6 transition-transform duration-300 group-hover:scale-[1.06]">
                    <Calendar size={28} strokeWidth={1.75} />
                  </span>
                  <h2 className="text-[22px] lg:text-[26px] font-display font-medium text-[color:var(--ink)] tracking-[-0.01em] leading-tight">
                    Réservez votre audit stratégique
                  </h2>
                  <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed max-w-[340px]">
                    30 min avec un expert senior uclic. On cadre votre situation, on vous présente notre méthode, on vous remet un rapport sous 48h.
                  </p>

                  {/* Features list */}
                  <ul className="mt-6 flex flex-col items-start gap-2 text-[13px] text-[color:var(--ink)]">
                    {['Diagnostic funnel + stack tech + maturité IA', 'Rapport stratégique + roadmap 12 mois en 48h', 'Échange direct avec un expert senior · pas de SDR'].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={14} strokeWidth={2.6} className="text-[color:var(--accent)] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — même DA que le bouton "Audit offert" du header (gradient spéculaire) */}
                  <span
                    className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[15px] font-semibold text-black light:text-white transition-transform duration-200 group-hover:-translate-y-0.5 shadow-[0_10px_24px_-10px_rgba(107,255,149,0.55)]"
                    style={{
                      background:
                        'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                    }}
                  >
                    <PlayCircle size={16} strokeWidth={2} className="text-black light:text-white" />
                    Choisir un créneau
                  </span>

                  <p className="mt-5 flex items-center gap-1.5 text-[11.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                    <Clock size={11} strokeWidth={2} />
                    Gratuit · Sans engagement · Places limitées
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
