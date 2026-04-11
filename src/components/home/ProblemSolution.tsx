'use client';

import { useScrollAnimation } from '@/hooks/useAnimations';

const problems = [
  'Votre agence SEO vous vend du SEO. Votre agence Ads vous vend des Ads. Résultat : vous investissez dans leurs spécialités, pas dans ce qui marche pour vous.',
  '3 mois pour voir les premières actions — et encore',
  'Un chef de projet qui sous-traite à des juniors',
  'Des rapports PowerPoint sans impact sur votre chiffre',
  'Vous payez pour du temps passé, pas pour des résultats',
];

const solutions = [
  'Un squad activé en 48h — chaque expert senior sur son canal',
  'Inbound, Outbound et IA pilotés en simultané dès le J+15',
  'Des indicateurs business dès le premier mois : MQLs, CAC, pipeline',
  'Vous parlez directement aux experts, pas à un intermédiaire',
  'Vous payez pour de la croissance, pas pour des livrables',
];

function ProblemItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[rgba(245,245,241,0.55)] leading-relaxed">
      <span className="mt-1.5 shrink-0 w-4 h-4 rounded-full border border-[rgba(245,245,241,0.2)] flex items-center justify-center">
        <span className="w-1.5 h-0.5 bg-[rgba(245,245,241,0.3)] block" />
      </span>
      {text}
    </li>
  );
}

function SolutionItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[rgba(245,245,241,0.75)] leading-relaxed">
      <span className="mt-0.5 shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8L6.5 11.5L13 4.5" stroke="#E0FF5C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  );
}

export default function ProblemSolution() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation<HTMLDivElement>({ delay: 150 });

  return (
    <section className="uclic-section bg-black" id="methode">
      <div className="uclic-container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-0 md:gap-0 relative">

          {/* Left — Problem */}
          <div
            ref={leftRef}
            className={`uclic-reveal ${leftVisible ? 'is-visible' : ''} p-8 md:p-12 rounded-2xl md:rounded-r-none rounded-r-2xl bg-[rgba(245,245,241,0.02)] border border-white/[0.06] md:border-r-0`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[rgba(245,245,241,0.3)]" />
              <span className="text-xs uppercase tracking-wider text-[rgba(245,245,241,0.3)]">Le problème</span>
            </div>
            <h2 className="uclic-heading-md mb-8 text-[rgba(245,245,241,0.9)]">
              Ce que vous vivez avec une agence classique
            </h2>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <ProblemItem key={i} text={p} />
              ))}
            </ul>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#E0FF5C]/30 to-transparent" />

          {/* Right — Solution */}
          <div
            ref={rightRef}
            className={`uclic-reveal ${rightVisible ? 'is-visible' : ''} p-8 md:p-12 rounded-2xl md:rounded-l-none rounded-l-2xl bg-[rgba(224,255,92,0.03)] border border-[rgba(224,255,92,0.1)] md:border-l-0`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E0FF5C] animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-[#E0FF5C]/70">La solution Uclic</span>
            </div>
            <h2 className="uclic-heading-md mb-8 text-[#F5F5F1]">
              Ce que Uclic fait différemment
            </h2>
            <ul className="space-y-5">
              {solutions.map((s, i) => (
                <SolutionItem key={i} text={s} />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
