'use client';
import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionAmbience from '../ui/SectionAmbience';
import CornerCross from '../ui/CornerCross';
import WaterfallBeacon from '../ui/WaterfallBeacon';
import Organigramme from './Organigramme';
import OrganigrammeAvant from './OrganigrammeAvant';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function DifferentSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  // Blur : "Avant" flouté par défaut. Dès que l'utilisateur drag, le côté
  // minoritaire se floute dynamiquement (celui qui est recouvert par le slider).
  // À la sortie du composant, retour au blur par défaut sur "Avant".
  const [isActive, setIsActive] = useState(false);
  const [sliderRatio, setSliderRatio] = useState(0.5);

  const maxBlur = 8; // px
  // Si ratio > 0.5 → on voit majoritairement "Avec Uclic" → blur progressif sur "Avant"
  const beforeDynamicBlur = Math.max(0, (sliderRatio - 0.5) * 2) * maxBlur;
  // Si ratio < 0.5 → on voit majoritairement "Sans Uclic" → blur progressif sur "Avec"
  const afterDynamicBlur  = Math.max(0, (0.5 - sliderRatio) * 2) * maxBlur;

  return (
    <section ref={sectionRef} id="different" className="relative pt-20 lg:pt-24 pb-0 overflow-hidden">
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex justify-center relative z-[1]">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Ce qu&apos;on fait différemment
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
          Pourquoi nous plutôt{' '}
          <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
            qu&apos;ailleurs ?
            <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
          </span>
        </h2>
        <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
          On le voit depuis des années sur le terrain — en tant qu&apos;anciens responsables Growth, pas en tant que commerciaux.
        </p>

        {/* Discrete drag hint — placé au-dessus du comparateur pour préparer le geste */}
        <p className="mt-8 flex items-center justify-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]/75">
          <span aria-hidden="true">←</span>
          Glissez pour voir la différence
          <span aria-hidden="true">→</span>
        </p>

        {/* ── Encart : simple border + bg card-elev-1, sans passepartout ni border accent ── */}
        <div className="mt-6 relative">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setIsActive(false)}
            onBlur={() => setIsActive(false)}
            className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-visible"
          >
            {/* CornerCross aux 4 coins — matche la DA des cards de OffreSection */}
            <CornerCross size={14} className="hidden md:block absolute z-[3] left-0 top-0" style={{ transform: 'translate(-50%, -50%)' }} />
            <CornerCross size={14} className="hidden md:block absolute z-[3] right-0 top-0" style={{ transform: 'translate(50%, -50%)' }} />
            <CornerCross size={14} className="hidden md:block absolute z-[3] left-0 bottom-0" style={{ transform: 'translate(-50%, 50%)' }} />
            <CornerCross size={14} className="hidden md:block absolute z-[3] right-0 bottom-0" style={{ transform: 'translate(50%, 50%)' }} />
            <div className="relative">
              <BeforeAfterSlider
                initialRatio={0.5}
                onInteract={() => setIsActive(true)}
                onRatioChange={(r) => setSliderRatio(r)}
                before={
                  <div
                    className="w-full px-6 py-10 lg:px-12 lg:py-14 transition-[filter] duration-100 ease-out will-change-[filter]"
                    style={{
                      filter: isActive
                        ? `blur(${beforeDynamicBlur}px) saturate(${1 - beforeDynamicBlur / 10}) brightness(${1 - beforeDynamicBlur / 25})`
                        : 'blur(3px) saturate(0.7) brightness(0.9)',
                    }}>
                    <OrganigrammeAvant />
                  </div>
                }
                after={
                  <div
                    className="w-full px-6 py-10 lg:px-12 lg:py-14 transition-[filter] duration-100 ease-out will-change-[filter]"
                    style={{
                      filter: isActive
                        ? `blur(${afterDynamicBlur}px) saturate(${1 - afterDynamicBlur / 10}) brightness(${1 - afterDynamicBlur / 25})`
                        : 'blur(0px)',
                    }}>
                    <Organigramme />
                  </div>
                }
                beforeLabel="Sans Uclic"
                afterLabel="Avec Uclic"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Waterfall beacon : collé au comparateur, transition vers la section suivante. */}
        <div className="relative">
          <WaterfallBeacon />
        </div>
      </div>
    </section>
  );
}
