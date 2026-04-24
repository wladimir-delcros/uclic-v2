'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, Check, PlayCircle } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import { trackBookingClick } from '@/lib/datalayer';

interface ExpertiseBookingSectionProps {
  /** Slug of the expertise category for granular tracking — e.g. "agence-seo" */
  category?: string;
  /** Optional override for the eyebrow label */
  eyebrow?: string;
  /** Optional h2 plain portion (before the italic accent word) */
  h2Plain?: string;
  /** Optional h2 italic accent portion */
  h2Italic?: string;
  /** Optional subtitle under the h2 */
  subtitle?: string;
}

const BULLETS = [
  'Diagnostic funnel + stack tech + maturité IA',
  'Rapport stratégique + roadmap 12 mois en 48h',
  'Échange direct avec un expert senior · pas de SDR',
];

/**
 * Footer booking section for expertise pages (/expertise/[category] and
 * /expertise/[category]/[slug]). Mirrors the HubSpot embed pattern used in
 * AuditClient but packaged as a standalone section respecting the V2 design
 * system (container 1200, italic accent h2, framer-motion whileInView, etc.).
 */
export default function ExpertiseBookingSection({
  category,
  eyebrow = 'Prenez rendez-vous',
  h2Plain = 'Parlez de votre projet avec',
  h2Italic = 'un expert senior.',
  subtitle = '30 min pour cadrer votre situation. Diagnostic funnel + stack tech + maturité IA. Rapport stratégique + roadmap 12 mois livrés sous 48h. Gratuit, sans engagement.',
}: ExpertiseBookingSectionProps) {
  const reduceMotion = useReducedMotion();
  const [showBooking, setShowBooking] = useState(false);
  const preconnected = useRef(false);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const bookingTracked = useRef(false);
  const mountTracked = useRef(false);

  const trackLocation = category ? `expertise-${category}` : 'expertise';
  const redirectSource = category ? `expertise-${category}` : 'expertise';

  // Fire trackBookingClick once on mount (GA4 + Google Ads 2 conversions + Meta Schedule)
  useEffect(() => {
    if (mountTracked.current) return;
    mountTracked.current = true;
    trackBookingClick(trackLocation);
  }, [trackLocation]);

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
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          /* noop */
        }
      }
      const isBooked =
        data?.meetingBookSucceeded ||
        data?.meetingBookingSucceeded ||
        data?.type === 'meetingBookingSucceeded' ||
        data?.type === 'hubspot:meeting:booked' ||
        data?.eventName === 'meetingBookSucceeded' ||
        (typeof event.data === 'string' &&
          (event.data.includes('meetingBook') || event.data.includes('meetingBooking')));
      if (isBooked && !bookingTracked.current) {
        bookingTracked.current = true;
        window.location.href = `/merci?source=${redirectSource}`;
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [redirectSource]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <SectionAmbience variant="medium" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]"
        >
          <span className="w-6 h-px bg-[color:var(--accent)]" />
          {eyebrow}
        </motion.div>

        {/* Header row : h2 + subtitle */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <h2 className="text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[760px] leading-[1.05]">
            {h2Plain}{' '}
            <span className="relative inline-block font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              {h2Italic}
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
            </span>
          </h2>
          <p className="text-[color:var(--ink-muted)] max-w-[420px] text-[15px] leading-[1.55]">
            {subtitle}
          </p>
        </motion.div>

        {/* Booking embed */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-14"
        >
          <div
            id="expertise-booking"
            ref={bookingRef}
            className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden"
          >
            {showBooking ? (
              <iframe
                src="https://meetings.hubspot.com/wdelcros?embed=true"
                width="100%"
                height="720"
                frameBorder="0"
                title="Réserver un appel avec un expert Uclic"
                loading="lazy"
                className="w-full"
                style={{ minHeight: '720px', backgroundColor: 'transparent' }}
              />
            ) : (
              <button
                type="button"
                onClick={openBooking}
                onMouseEnter={preconnectHubSpot}
                onTouchStart={preconnectHubSpot}
                className="w-full flex flex-col items-center justify-center p-8 lg:p-12 min-h-[440px] text-center cursor-pointer group"
              >
                <span className="w-16 h-16 grid place-items-center border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 text-[color:var(--accent)] mb-6 transition-transform duration-300 group-hover:scale-[1.06]">
                  <Calendar size={28} strokeWidth={1.75} />
                </span>
                <h3 className="text-[22px] lg:text-[26px] font-display font-medium text-[color:var(--ink)] tracking-[-0.01em] leading-tight">
                  Réservez votre créneau — 30 min
                </h3>
                <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed max-w-[420px]">
                  Expert senior uclic. On cadre votre situation, on valide la faisabilité,
                  on vous remet un rapport stratégique + roadmap 12 mois sous 48h.
                </p>

                <ul className="mt-6 flex flex-col items-start gap-2 text-[13px] text-[color:var(--ink)]">
                  {BULLETS.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        size={14}
                        strokeWidth={2.6}
                        className="text-[color:var(--accent)] mt-0.5 shrink-0"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[15px] font-semibold text-black light:text-white transition-transform duration-200 group-hover:-translate-y-0.5 shadow-[0_10px_24px_-10px_rgba(107,255,149,0.55)]"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}
                >
                  <PlayCircle
                    size={16}
                    strokeWidth={2}
                    className="text-black light:text-white"
                  />
                  Choisir un créneau
                </span>

                <p className="mt-5 flex items-center gap-1.5 text-[11.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                  <Clock size={11} strokeWidth={2} />
                  Gratuit · Sans engagement · Places limitées
                </p>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
