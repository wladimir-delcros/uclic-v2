'use client';
import { motion, useReducedMotion } from 'framer-motion';
import SectionAmbience from '../ui/SectionAmbience';

/* Letter paragraphs — préserve la voix de Wladimir du manifeste legacy,
   avec une légère mise à jour de positionnement V2 dans le §7 (pilote senior,
   experts canaux, agents IA en production) pour aligner sur la home. */
const PARAGRAPHS: Array<string | { highlight: string; before: string; after: string }> = [
  'Bonjour,',
  "Je m'appelle Wladimir. J'ai commencé par la tech : développeur front-end, intégrateur, chef de projet web. Très vite, j'ai compris que mon ADN était de mettre la technologie et le développement au service des équipes marketing, commerciales et opérations. Pas coder pour coder. Coder pour faire croître.",
  "J'ai souvent été le premier salarié en startup. Celui qu'on recrute quand il n'y a encore rien : pas de process, pas de budget, pas de filet. Chez StayHome, j'étais le premier employé — on est passé de 1 à 13. Chez CodinGame, 5 ans en tant que Head of Growth puis Growth PM : 100% de croissance annuelle, stratégie Product-Led Growth, membre du codir. Dont 2 ans sous ère américaine après le rachat par un fonds US et la fusion avec CoderPad — 20M d'ARR, équipes internationales. Puis Head of Growth chez Muzzo, Growth Manager chez Obat. J'ai également enseigné le Growth Hacking en école de commerce.",
  "Plus de 10 ans sur le terrain. Ce que j'en retiens est simple : chaque euro investi doit être traçable, mesurable et rentable. Pas de slides. Pas de promesses. Des résultats. Quand on est le premier salarié marketing d'une entreprise qui bootstrappe, on apprend vite à ne rien gaspiller.",
  "Et puis j'ai créé Uclic. Aujourd'hui, je suis de l'autre côté. Je suis entrepreneur, comme vous. Je sais ce que c'est de regarder ses métriques en se demandant où investir le prochain euro. Je connais la pression, les arbitrages, le besoin de résultats concrets. C'est pour ça qu'Uclic existe : pour offrir aux entrepreneurs ce que j'aurais voulu avoir — un partenaire qui comprend vos problématiques parce qu'il les vit au quotidien.",
  "Aujourd'hui, Agicap, Deepki, Tehtris, CodinGame, MSC Cruises... toutes ces entreprises structurent leur croissance avec nous. Avec un système. Automatisé. Scalable. Contrôlable.",
  {
    before: "Notre approche ? ",
    highlight: "Un pilote senior, des experts canaux certifiés, des agents IA en production.",
    after: " On ne promet pas la lune. On cadre en 90 jours, on industrialise ce qui marche, on coupe ce qui ne rapporte pas. Sans silo. Sans prestataire de plus à orchestrer à votre place.",
  },
  "Ce qui nous différencie des agences classiques ? La transparence totale. Pas de contrat qui vous enferme. Pas de reporting cosmétique. Pas de promesses creuses. Des tests concrets, mesurés, pilotés par un Growth Lead senior qui reste en première ligne.",
  "Si vous cherchez un partenaire qui vous comprend parce qu'il est passé par là — on est là.",
];

export default function AboutClient() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-24 lg:pt-28 pb-20 lg:pb-28 overflow-x-clip">
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            Manifeste
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>

          <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
            Pourquoi{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Uclic existe.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h1>

          <p className="mt-5 text-[color:var(--ink-muted)] max-w-[620px] text-[16px] leading-relaxed">
            L&apos;histoire d&apos;un Head of Growth devenu fondateur d&apos;agence.
          </p>
        </div>

        {/* Letter body */}
        <div className="mt-16 lg:mt-20 max-w-[720px] mx-auto">
          <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-8 lg:p-14">
            <div className="flex flex-col gap-6 lg:gap-7">
              {PARAGRAPHS.map((p, i) => {
                const isFirst = i === 0;
                const content = typeof p === 'string' ? (
                  <>{p}</>
                ) : (
                  <>
                    {p.before}
                    <span className="font-medium text-[color:var(--accent)]">{p.highlight}</span>
                    {p.after}
                  </>
                );
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
                    }>
                    {content}
                  </motion.p>
                );
              })}

              {/* Signature */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: PARAGRAPHS.length * 0.08 }}
                className="mt-6 pt-6 border-t border-[color:var(--border-subtle)] flex items-center justify-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/wladimir.webp"
                  alt="Wladimir Delcros — Founder Uclic"
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[color:var(--border-subtle)]"
                />
                <div className="text-right">
                  <p className="text-[16px] text-[color:var(--ink-muted)]">À très vite,</p>
                  <p className="text-[20px] font-display font-medium text-[color:var(--ink)] mt-1">
                    Wladimir Delcros
                  </p>
                  <p className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] mt-1.5">
                    Founder · CEO Uclic
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
