'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PlayCircle, Plus, Check, Sparkles } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import Reveal from '../ui/Reveal';

/**
 * Unified client component for all /expertise/<slug> pages.
 *
 * Flat-props API to keep each slug-level file simple and explicit (no indirect
 * data dict). Preserves backward-compatibility with the earlier agence-seo /
 * agence-sma / agence-paid-media migrations.
 */
export interface ExpertiseClientProps {
  /* Hero */
  eyebrow: string;
  h1Plain: string; // ex: "Agence"
  h1Highlight: string; // ex: "SEO." — portion hand-written italic
  subtitle: string;

  /* Pourquoi Uclic — intro + bullet list */
  whyTitle: string;
  whyIntro: string;
  whyBullets: string[];

  /* Bénéfices (3 cards) */
  benefits: Array<{ title: string; description: string }>;

  /* Process (3 étapes) */
  processTitle: string;
  processSubtitle: string;
  processSteps: Array<{ title: string; description: string }>;

  /* FAQ */
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;

  /* Closing blurb avant le CtaFinal global */
  closingBlurb: string;
}

export default function ExpertiseClient({
  eyebrow,
  h1Plain,
  h1Highlight,
  subtitle,
  whyTitle,
  whyIntro,
  whyBullets,
  benefits,
  processTitle,
  processSubtitle,
  processSteps,
  faqTitle,
  faq,
  closingBlurb,
}: ExpertiseClientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-24 lg:pt-28 pb-20 lg:pb-24 overflow-x-clip">
        <SectionAmbience variant="full" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex flex-col items-center text-center max-w-[920px] mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              {eyebrow}
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-6 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.08]">
              {h1Plain && <>{h1Plain} </>}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                {h1Highlight}
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>

            <p className="mt-6 text-[17px] lg:text-[18px] text-[color:var(--ink-muted)] max-w-[780px] leading-relaxed">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  borderRadius: '6px',
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}>
                <PlayCircle size={16} />
                Mon audit gratuit — 48h
              </a>
              <a
                href="/simulation"
                className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-medium text-[color:var(--ink)] border border-[color:var(--border-subtle)] hover:border-[color:var(--ink-muted)] transition-colors"
                style={{ borderRadius: '6px' }}>
                Simuler mon ROI
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-[color:var(--ink-muted)] font-mono uppercase tracking-[0.18em]">
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-[color:var(--accent)]" /> Résultats 90 jours
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-[color:var(--accent)]" /> Pilotage senior
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-[color:var(--accent)]" /> Note 4,76/30
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ POURQUOI UCLIC ═══════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <SectionAmbience variant="medium" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <Reveal as="div" className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                Pourquoi
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
              <h2 className="mt-4 text-[clamp(28px,3.6vw,44px)] font-display font-medium tracking-[-0.02em] leading-[1.12]">
                {whyTitle}
              </h2>
              <p className="mt-6 text-[16px] text-[color:var(--ink-muted)] leading-[1.75]">
                {whyIntro}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                <Sparkles size={14} className="text-[color:var(--accent)]" />
                Pilotage senior + experts canaux + agents IA
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-7" delay={0.15}>
              <ul className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white divide-y divide-[color:var(--border-subtle)]">
                {whyBullets.map((b, i) => (
                  <li
                    key={i}
                    className="px-6 lg:px-8 py-5 flex items-start gap-4 text-[15px] lg:text-[16px] text-[color:var(--ink)] leading-relaxed">
                    <span className="mt-1 inline-flex items-center justify-center w-6 h-6 border border-[color:var(--accent)] text-[color:var(--accent)] font-mono text-[11px] shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ BÉNÉFICES — 3 cards ═══════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <SectionAmbience variant="medium" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <Reveal as="div" className="text-center max-w-[780px] mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Bénéfices
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
            <h2 className="mt-4 text-[clamp(30px,4vw,48px)] font-display font-medium tracking-[-0.02em] leading-[1.12]">
              Ce que vous gagnez.
            </h2>
          </Reveal>

          <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 lg:p-9 flex flex-col gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 border border-[color:var(--accent)] text-[color:var(--accent)] font-mono text-[13px]">
                  0{i + 1}
                </div>
                <h3 className="text-[19px] lg:text-[21px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)] leading-snug">
                  {b.title}
                </h3>
                <p className="text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESSUS — 3 étapes ═══════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <SectionAmbience variant="medium" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <Reveal as="div" className="text-center max-w-[820px] mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Méthode
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
            <h2 className="mt-4 text-[clamp(28px,3.6vw,44px)] font-display font-medium tracking-[-0.02em] leading-[1.15]">
              {processTitle}
            </h2>
            <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] leading-relaxed">
              {processSubtitle}
            </p>
          </Reveal>

          <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 lg:p-9 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--ink-muted)]">
                    Étape {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-[family-name:var(--font-hand)] italic text-[clamp(32px,3vw,40px)] leading-none text-[color:var(--accent)]/60">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[19px] lg:text-[21px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)] leading-snug">
                  {step.title}
                </h3>
                <p className="text-[15px] text-[color:var(--ink-muted)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="mt-14 text-center">
            <a
              href="/audit"
              className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
              style={{
                borderRadius: '6px',
                background:
                  'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
              }}>
              <PlayCircle size={16} />
              Mon audit gratuit — 48h
            </a>
            <p className="mt-3 text-[12px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              Growth Scan · 0 € · plan 90 jours · sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <SectionAmbience variant="medium" />
        <div className="max-w-[980px] mx-auto px-5 lg:px-10 relative">
          <Reveal as="div" className="text-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              FAQ
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>
            <h2 className="mt-4 text-[clamp(30px,4vw,48px)] font-display font-medium tracking-[-0.02em]">
              {faqTitle}
            </h2>
          </Reveal>

          <Reveal
            as="div"
            className="mt-12 !rounded-none !p-0 overflow-hidden border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white"
            delay={0.2}>
            {faq.map((f, i) => (
              <details key={i} className="group">
                <summary
                  className={`px-8 lg:px-10 py-6 flex items-center justify-between gap-6 cursor-pointer list-none ${
                    i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
                  } hover:bg-[color:var(--card)]`}>
                  <span className="text-[16px] font-medium pr-4 leading-snug">{f.question}</span>
                  <Plus
                    size={18}
                    strokeWidth={2}
                    className="text-[color:var(--accent)] transition-transform duration-300 group-open:rotate-45 shrink-0"
                  />
                </summary>
                <div className="px-8 lg:px-10 pb-7 pt-1 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[840px]">
                  {f.answer}
                </div>
              </details>
            ))}
          </Reveal>

          <p className="mt-12 text-center text-[14px] text-[color:var(--ink-muted)] max-w-[720px] mx-auto leading-relaxed">
            {closingBlurb}
          </p>
        </div>
      </section>
    </>
  );
}
