'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Clock, PlayCircle, Check } from 'lucide-react';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { buildStrategy, type SimulationAnswers } from '@/lib/simulation';
import { trackBookingClick } from '@/lib/datalayer';

interface Choice {
  label: string;
  value: string;
}

interface Step {
  id: keyof SimulationAnswers;
  question: string;
  hint: string;
  choices: Choice[];
}

const STEPS: Step[] = [
  {
    id: 'secteur',
    question: 'Votre secteur d\'activite ?',
    hint: 'Chaque marche a ses leviers de croissance.',
    choices: [
      { label: 'SaaS / Logiciel B2B', value: 'SaaS B2B' },
      { label: 'Fintech / Assurance', value: 'Fintech' },
      { label: 'E-commerce', value: 'Ecommerce' },
      { label: 'Services B2B', value: 'Services B2B' },
      { label: 'Sante / MedTech', value: 'Sante' },
      { label: 'Formation / EdTech', value: 'EdTech' },
      { label: 'Immobilier / PropTech', value: 'Immobilier' },
      { label: 'Autre secteur', value: 'Autre' },
    ],
  },
  {
    id: 'ca',
    question: 'Votre chiffre d\'affaires annuel ?',
    hint: 'On calibre les benchmarks sur votre taille.',
    choices: [
      { label: 'Moins de 500 k€', value: '<500k' },
      { label: '500 k€ - 2 M€', value: '500k-2M' },
      { label: '2 M€ - 10 M€', value: '2M-10M' },
      { label: 'Plus de 10 M€', value: '>10M' },
    ],
  },
  {
    id: 'budget',
    question: 'Budget marketing mensuel ?',
    hint: 'Toutes depenses : agences, Ads, outils.',
    choices: [
      { label: 'Moins de 2 000 €/mois', value: '<2k' },
      { label: '2 000 € - 10 000 €/mois', value: '2k-10k' },
      { label: '10 000 € - 30 000 €/mois', value: '10k-30k' },
      { label: 'Plus de 30 000 €/mois', value: '>30k' },
      { label: 'Pas de budget defini', value: 'Indefini' },
    ],
  },
  {
    id: 'source',
    question: 'Vos sources d\'acquisition actuelles ?',
    hint: 'Sur quoi repose aujourd\'hui votre croissance ?',
    choices: [
      { label: 'SEO / contenu', value: 'SEO' },
      { label: 'Ads payants (Google, Meta, LinkedIn)', value: 'Ads' },
      { label: 'Outbound / prospection', value: 'Outbound' },
      { label: 'Reseau et recommandations', value: 'Reseau' },
      { label: 'Multi-canal equilibre', value: 'Multi-canal' },
      { label: 'Rien de structure', value: 'Aucun' },
    ],
  },
  {
    id: 'defi',
    question: 'Votre defi marketing n°1 ?',
    hint: 'On concentre le plan sur ce point.',
    choices: [
      { label: 'Plus de leads qualifies', value: 'Plus de leads' },
      { label: 'Reduire mon cout d\'acquisition', value: 'Reduire CAC' },
      { label: 'Ameliorer les conversions', value: 'Conversion' },
      { label: 'Automatiser l\'acquisition', value: 'Automatisation' },
      { label: 'Comprendre ce qui bloque', value: 'Diagnostic' },
      { label: 'Se developper a l\'international', value: 'International' },
    ],
  },
  {
    id: 'timing',
    question: 'Quand souhaitez-vous demarrer ?',
    hint: 'On s\'adapte a votre agenda.',
    choices: [
      { label: 'Le plus tot possible', value: 'ASAP' },
      { label: 'Dans le mois', value: '1 mois' },
      { label: 'Dans 1 a 3 mois', value: '3 mois' },
      { label: 'Je me renseigne pour l\'instant', value: 'Renseignement' },
    ],
  },
];

export default function SimulationClient() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<SimulationAnswers>({});
  const [done, setDone] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const preconnected = useRef(false);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const bookingTracked = useRef(false);

  const strategy = useMemo(() => buildStrategy(answers), [answers]);
  const step = STEPS[stepIdx];
  const progress = Math.round(((stepIdx + (done ? 1 : 0)) / STEPS.length) * 100);

  const preconnectHubSpot = useCallback(() => {
    if (preconnected.current) {return;}
    preconnected.current = true;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://meetings.hubspot.com';
    document.head.appendChild(link);
  }, []);

  const openBooking = useCallback(() => {
    setShowBooking(true);
    try {
      trackBookingClick('simulation');
    } catch {
      /* noop */
    }
  }, []);

  // HubSpot meeting booked event → redirect vers merci
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = typeof event.origin === 'string' ? event.origin : '';
      if (origin && !origin.includes('hubspot.com')) {return;}
      let data: unknown = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          /* noop */
        }
      }
      const d = (data ?? {}) as Record<string, unknown>;
      const isBooked =
        d.meetingBookSucceeded ||
        d.meetingBookingSucceeded ||
        d.type === 'meetingBookingSucceeded' ||
        d.type === 'hubspot:meeting:booked' ||
        d.eventName === 'meetingBookSucceeded' ||
        (typeof event.data === 'string' &&
          (event.data.includes('meetingBook') || event.data.includes('meetingBooking')));
      if (isBooked && !bookingTracked.current) {
        bookingTracked.current = true;
        window.location.href = '/merci?source=simulation';
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleChoice = (value: string) => {
    if (!step) {return;}
    const next: SimulationAnswers = { ...answers, [step.id]: value };
    setAnswers(next);
    if (stepIdx + 1 >= STEPS.length) {
      setDone(true);
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const goBack = () => {
    if (done) {
      setDone(false);
      return;
    }
    if (stepIdx > 0) {setStepIdx(stepIdx - 1);}
  };

  const reset = () => {
    setAnswers({});
    setStepIdx(0);
    setDone(false);
  };

  return (
    <>
      <section className="relative py-12 lg:py-16">
      <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-[12px] text-[color:var(--ink-muted)] mb-2">
            <span>
              {done ? 'Simulation complete' : `Etape ${stepIdx + 1} / ${STEPS.length}`}
            </span>
            <span className="text-[color:var(--accent)] font-medium">{progress}%</span>
          </div>
          <div className="h-[3px] w-full bg-[color:var(--border-subtle)] overflow-hidden">
            <div
              className="h-full bg-[color:var(--accent)] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!done && step && (
          <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[color:var(--ink)] tracking-tight">
              {step.question}
            </h2>
            <p className="mt-2 text-[14px] text-[color:var(--ink-muted)]">{step.hint}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.choices.map((c) => {
                const isSelected = answers[step.id] === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => handleChoice(c.value)}
                    className={`text-left !rounded-none border p-4 lg:p-5 transition-colors ${
                      isSelected
                        ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/5'
                        : 'border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/50'
                    }`}
                  >
                    <span className="text-[14px] font-medium text-[color:var(--ink)]">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIdx === 0}
                className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &larr; Retour
              </button>
              <span className="text-[12px] text-[color:var(--ink-muted)]">
                Selectionnez une reponse pour continuer
              </span>
            </div>
          </div>
        )}

        {done && (
          <div className="space-y-6">
            {/* Score */}
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Score de potentiel</span>
              </div>
              <div className="flex items-end gap-4">
                <div className="text-[56px] md:text-[72px] leading-none font-semibold text-[color:var(--ink)] tracking-tight">
                  {strategy.score}
                </div>
                <div className="text-[14px] text-[color:var(--ink-muted)] pb-2">/ 100</div>
              </div>
              <div className="mt-4 h-[4px] w-full bg-[color:var(--border-subtle)] overflow-hidden">
                <div
                  className="h-full bg-[color:var(--accent)] transition-[width] duration-700"
                  style={{ width: `${strategy.score}%` }}
                />
              </div>
              <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] max-w-[620px]">
                Fort potentiel de croissance identifie sur {strategy.piliers.length} leviers
                prioritaires. Estimations indicatives basees sur notre portefeuille clients.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)] mb-3">
                  Leads qualifies
                </div>
                <div className="text-[32px] md:text-[40px] leading-none font-semibold text-[color:var(--accent)] tracking-tight">
                  {strategy.leadsGain}
                </div>
                <div className="mt-2 text-[12px] text-[color:var(--ink-muted)]">
                  Gain attendu sur 6 mois
                </div>
              </div>
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)] mb-3">
                  CAC
                </div>
                <div className="text-[32px] md:text-[40px] leading-none font-semibold text-[color:var(--ink)] tracking-tight">
                  {strategy.cac}
                </div>
                <div className="mt-2 text-[12px] text-[color:var(--ink-muted)]">
                  Reduction du cout d&apos;acquisition
                </div>
              </div>
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)] mb-3">
                  Premiers resultats
                </div>
                <div className="text-[32px] md:text-[40px] leading-none font-semibold text-[color:var(--ink)] tracking-tight">
                  {strategy.delay}
                </div>
                <div className="mt-2 text-[12px] text-[color:var(--ink-muted)]">
                  Apres kick-off
                </div>
              </div>
            </div>

            {/* Piliers */}
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Plan d&apos;action recommande</span>
              </div>
              <ul className="space-y-4">
                {strategy.piliers.map((p) => (
                  <li key={p.label} className="flex gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[color:var(--accent)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[15px] font-semibold text-[color:var(--ink)]">
                        {p.label}
                      </div>
                      <div className="mt-1 text-[13px] leading-relaxed text-[color:var(--ink-muted)]">
                        {p.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-6 lg:p-8">
              <h3 className="text-[22px] md:text-[28px] font-semibold text-[color:var(--ink)] tracking-tight">
                Recevez votre plan d&apos;action detaille sous 24h.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] max-w-[680px]">
                Reservez un appel stratege avec Wladimir Delcros (30 min, gratuit) et recevez
                un audit personnalise base sur vos reponses.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#simulation-booking"
                  onClick={(e) => {
                    e.preventDefault();
                    openBooking();
                    setTimeout(() => {
                      bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 60);
                  }}
                  onMouseEnter={preconnectHubSpot}
                  onTouchStart={preconnectHubSpot}
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}
                >
                  Reserver mon audit offert
                  <ArrowRight size={14} className="text-black light:text-white" />
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  Refaire la simulation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

      {/* ─────────── HubSpot booking — fin de parcours (DA V2) ─────────── */}
      {done && (
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Filet top canonique */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <SectionAmbience variant="medium" />

          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            {/* Header section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Réservez votre créneau
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>

              <h2 className="mt-5 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[780px] mx-auto">
                Transformez cette simulation en{' '}
                <span className="relative inline-block font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                  plan d&apos;action.
                  <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
                </span>
              </h2>

              <p className="mt-5 text-[15px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto">
                30 min avec Wladimir Delcros. On revient sur vos réponses, on priorise les leviers et on vous remet un rapport sous 48h. Gratuit, sans engagement.
              </p>
            </motion.div>

            {/* Embed */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-14 max-w-[960px] mx-auto"
            >
              <div
                id="simulation-booking"
                ref={bookingRef}
                className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden"
              >
                {showBooking ? (
                  <iframe
                    src="https://meetings.hubspot.com/wdelcros"
                    width="100%"
                    height="680"
                    frameBorder="0"
                    loading="lazy"
                    title="Réserver un appel stratégie simulation"
                    className="w-full"
                    style={{ minHeight: '680px', backgroundColor: 'transparent' }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={openBooking}
                    onMouseEnter={preconnectHubSpot}
                    onTouchStart={preconnectHubSpot}
                    aria-label="Ouvrir le calendrier de réservation"
                    className="w-full flex flex-col items-center justify-center p-8 lg:p-10 min-h-[500px] text-center cursor-pointer group"
                  >
                    <span className="w-16 h-16 grid place-items-center border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 text-[color:var(--accent)] mb-6 transition-transform duration-300 group-hover:scale-[1.06]">
                      <Calendar size={28} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-[22px] lg:text-[26px] font-display font-medium text-[color:var(--ink)] tracking-[-0.01em] leading-tight">
                      Réservez votre appel stratégie
                    </h3>
                    <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed max-w-[380px]">
                      Un expert senior uclic cadre votre situation, présente la méthode et vous remet un rapport personnalisé sous 48h.
                    </p>

                    <ul className="mt-6 flex flex-col items-start gap-2 text-[13px] text-[color:var(--ink)]">
                      {[
                        'Analyse fine de vos réponses + benchmarks',
                        'Rapport stratégique + roadmap 12 mois en 48h',
                        'Échange direct avec un expert senior · pas de SDR',
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check size={14} strokeWidth={2.6} className="text-[color:var(--accent)] mt-0.5 shrink-0" />
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
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
