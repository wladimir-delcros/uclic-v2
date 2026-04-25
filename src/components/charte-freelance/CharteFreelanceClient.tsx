'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SectionAmbience from '../ui/SectionAmbience';

/* Lettre ouverte à la communauté freelance Uclic — ton collectif, entraide,
   partage, valeurs alignées avec la home (3 piliers · collectif · zéro silo). */
const PARAGRAPHS: string[] = [
  'Cher·e futur·e membre du collectif,',
  "Uclic, c'est trois piliers — Inbound, Outbound, IA & Développement — portés par une seule équipe, zéro silo. Ce que nous construisons ensemble, c'est un collectif de freelances seniors qui partagent une conviction : on avance mieux à plusieurs qu'isolé·e dans son coin.",
  "Le cœur du collectif, c'est un Slack commun où on échange chaque jour : retours d'expérience clients, tips canal par canal, prompts d'agents IA qui marchent, templates outbound qui convertissent, benchs d'outils. Les bonnes idées circulent, les ratés aussi — sans filtre, sans ego.",
  "Chaque semaine, un stand-up collectif : revue des missions en cours, pairing sur les dossiers chauds, veille croisée growth/IA/produit. Chaque mois, un atelier ouvert pour approfondir un sujet (SEO technique, agents IA, cold outbound, attribution). Vous repartez avec des workflows prêts à déployer.",
  "Nos engagements partagés : transparence totale sur les projets et les tarifs, zéro commission sur l'apport d'affaires entre membres, pipe commercial mutualisé, bibliothèque d'agents IA et de workflows n8n mis à votre disposition (−70 % de temps manuel côté exécution).",
  "Ce qu'on vous propose : un cadre bienveillant, un collectif qui vous couvre, des clients scale-ups B2B exigeants et un terrain de jeu pour progresser chaque mois. Vous gardez votre indépendance — vous gagnez une tribu.",
  "Si vous voulez bosser entouré·e, apprendre vite et livrer avec fierté, on se parle.",
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
            Un collectif de freelances seniors. Slack commun, entraide quotidienne,
            stand-up hebdo, partage d'agents IA. On avance ensemble — pas seul·e.
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
