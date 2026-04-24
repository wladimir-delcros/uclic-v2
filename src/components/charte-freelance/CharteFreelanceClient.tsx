'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SectionAmbience from '../ui/SectionAmbience';

/* Charte éditoriale — lettre ouverte au futur freelance, préservée du legacy
   avec mise en forme DA V2 (card bg-#141211, !rounded-none, hairline border). */
const PARAGRAPHS: string[] = [
  'Cher·e futur·e membre du collectif,',
  "Uclic, c'est trois piliers, une seule équipe, zéro silo — Inbound, Outbound, IA & Développement. Si vous rejoignez le collectif, c'est pour tenir un pilier avec le niveau d'exigence que nos clients attendent : scale-ups B2B qui veulent des résultats mesurables en 90 jours, pas des slides.",
  "Le cadre est simple. Un pilote senior garde la main sur chaque compte — vous livrez sous son mandat, jamais en autonomie déguisée. Certifications à jour, process documenté, reporting hebdo. On ne confie pas un client à un junior sans filet, et on attend la même rigueur de chaque expert canal.",
  "Nos engagements en retour : transparence totale sur les projets et les tarifs, zéro commission sur l'apport d'affaires, pipe commercial partagé, agents IA mis à votre disposition pour industrialiser vos tâches répétitives (−70 % de temps manuel côté exécution).",
  "Ce qu'on vous demande : des résultats mesurables, pas des livrables cosmétiques. Chaque euro client doit être traçable. Pas de promesses creuses. Pas de reporting qui cache les trous. Si un test ne rapporte pas, on coupe — ensemble.",
  "Vous gardez votre indépendance, vous gagnez un cadre senior, un pipe B2B exigeant et des outils IA en production. Si ces règles du jeu résonnent, on en parle.",
];

export default function CharteFreelanceClient() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-24 lg:pt-28 pb-20 lg:pb-28 overflow-x-clip">
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Notre charte
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>

          <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
            La charte{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Freelance.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h1>

          <p className="mt-5 text-[color:var(--ink-muted)] max-w-[620px] text-[16px] leading-relaxed">
            Le cadre qualité pour rejoindre Uclic. Trois piliers, une seule équipe, zéro silo.
          </p>
        </div>

        {/* Lettre */}
        <div className="mt-16 lg:mt-20 max-w-[720px] mx-auto">
          <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-8 lg:p-14">
            <div className="flex flex-col gap-6 lg:gap-7">
              {PARAGRAPHS.map((p, i) => {
                const isFirst = i === 0;
                return (
                  <motion.p
                    key={i}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                    className={
                      isFirst
                        ? 'text-[20px] lg:text-[22px] font-display text-[color:var(--ink)] leading-relaxed'
                        : 'text-[16px] lg:text-[17px] text-[color:var(--ink)] leading-[1.7]'
                    }
                  >
                    {p}
                  </motion.p>
                );
              })}

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: PARAGRAPHS.length * 0.08 }}
                className="mt-4 text-right"
              >
                <p className="text-[17px] text-[color:var(--ink)]">Avec enthousiasme,</p>
                <p className="text-[20px] font-display font-medium mt-1 text-[color:var(--accent)]">
                  Le collectif Uclic
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
