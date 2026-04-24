'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SectionAmbience from '../ui/SectionAmbience';

/* Charte éditoriale — lettre ouverte au futur freelance, préservée du legacy
   avec mise en forme DA V2 (card bg-#141211, !rounded-none, hairline border). */
const PARAGRAPHS: string[] = [
  'Cher futur membre du collectif,',
  "Bienvenue dans l'univers d'Uclic, un collectif pas comme les autres. Nous avons créé cet espace unique où la collaboration et la transparence ne sont pas de simples mots, mais des engagements quotidiens.",
  "Notre force réside dans la complémentarité de nos expertises. Chaque membre apporte sa pierre à l'édifice, permettant ainsi de relever des défis toujours plus ambitieux. C'est cette diversité qui nous rend uniques et efficaces.",
  "La transparence est notre maître-mot. Pas de zones d'ombre, pas de surprises : nous communiquons clairement sur tous les aspects de notre collaboration, des projets aux tarifs. Et surtout, nous ne prélevons aucune commission sur l'apport d'affaires.",
  "En rejoignant Uclic, vous intégrez un environnement où l'indépendance se conjugue avec la force du collectif. Ensemble, nous pouvons entreprendre des projets plus ambitieux tout en conservant notre liberté d'action.",
  "Si ces valeurs résonnent en vous, si vous croyez comme nous en la puissance de la collaboration transparente, alors vous êtes au bon endroit. Uclic n'attend que vous pour écrire ensemble les prochains chapitres de son histoire.",
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
            La charte du{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Freelance.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h1>

          <p className="mt-5 text-[color:var(--ink-muted)] max-w-[620px] text-[16px] leading-relaxed">
            Les valeurs qui font d&apos;Uclic un collectif unique et transparent.
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
