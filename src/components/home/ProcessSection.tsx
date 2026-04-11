'use client';

import { useScrollAnimation } from '@/hooks/useAnimations';

const phases = [
  {
    number: '01',
    tag: '48h',
    title: 'On identifie CE QUI MARCHE pour vous — pas ce qu\'on sait vendre',
    description:
      'En 48h, on passe en revue 15 à 20 canaux de croissance possibles. On analyse vos données, votre ICP, vos blocages — et on sélectionne les 3 à 5 canaux avec le meilleur potentiel pour votre business spécifique. Pas selon nos spécialités. Selon vos données.',
    bullets: [
      'Analyse de 15-20 canaux de traction possibles (pas juste ceux qu\'on maîtrise)',
      'Sélection des 3-5 canaux à plus fort potentiel pour votre contexte',
      'Analyse ICP, segmentation et données d\'acquisition existantes',
      'Roadmap priorisée livrée en 48h — avec les raisons de chaque choix',
    ],
  },
  {
    number: '02',
    tag: 'J+15',
    title: 'On active les canaux qui marchent pour vous',
    description:
      'Chaque expert prend son canal, déploie les premières campagnes et teste les hypothèses. Pas de théorie. Des actions, des résultats, des ajustements en temps réel.',
    bullets: [
      'Lancement SEO + Ads (Google, LinkedIn, Meta)',
      'Séquences outbound scraping + cold email + LinkedIn',
      'Premiers flux automatisés via n8n et agents IA',
      'Reporting hebdo sur les métriques clés',
    ],
  },
  {
    number: '03',
    tag: 'J+30',
    title: 'On industrialise ce qui performe',
    description:
      'Ce qui fonctionne, on le scale. Ce qui ne fonctionne pas, on pivote vite. Les agents IA automatisent les tâches répétitives pour libérer de la bande passante et multiplier le volume.',
    bullets: [
      'Automatisation des séquences outbound les plus performantes',
      'Agents IA de qualification et d\'enrichissement de leads',
      'Dashboards temps réel sur vos KPIs d\'acquisition',
      'Revue mensuelle et recalibrage de la roadmap',
    ],
  },
];

function PhaseCard({ phase, index }: { phase: (typeof phases)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ delay: index * 120 });

  return (
    <div
      ref={ref}
      className={`uclic-reveal ${isVisible ? 'is-visible' : ''} uclic-card hover-lift group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <span className="text-5xl font-bold text-[rgba(245,245,241,0.08)] group-hover:text-[rgba(224,255,92,0.1)] transition-colors duration-300 font-['Absans','Inter',sans-serif] leading-none">
          {phase.number}
        </span>
        <span className="uclic-badge">{phase.tag}</span>
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-[#F5F5F1] mb-3 leading-snug">
        {phase.title}
      </h3>
      <p className="text-sm text-[rgba(245,245,241,0.5)] leading-relaxed mb-6">
        {phase.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-2.5">
        {phase.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[rgba(245,245,241,0.6)]">
            <span className="mt-1 shrink-0 text-[#E0FF5C]">→</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProcessSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="uclic-section bg-black" id="processus">
      <div className="uclic-container px-4 md:px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`uclic-reveal ${headerVisible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}
        >
          <span className="uclic-badge mb-4 inline-flex">Notre méthode</span>
          <h2 className="uclic-heading-lg mb-4">
            De l&apos;audit au scale — en 30 jours
          </h2>
          <p className="text-[rgba(245,245,241,0.5)] text-base leading-relaxed">
            Pas de phase d&apos;onboarding de 6 semaines. Trois phases, une cadence, des résultats mesurables.
          </p>
        </div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.number} phase={phase} index={i} />
          ))}
        </div>

        {/* Encart "Pourquoi pas une agence spécialisée" */}
        <AgencyEncart />
      </div>
    </section>
  );
}

function AgencyEncart() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`uclic-reveal ${isVisible ? 'is-visible' : ''} relative rounded-2xl border border-[rgba(224,255,92,0.15)] bg-[rgba(224,255,92,0.03)] p-8 md:p-10 overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[rgba(224,255,92,0.04)] blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl">
        <h3 className="text-lg font-semibold text-[#F5F5F1] mb-3">
          Pourquoi pas une agence spécialisée ?
        </h3>
        <p className="text-sm text-[rgba(245,245,241,0.55)] leading-relaxed mb-4">
          Une agence SEO va toujours vous dire que le SEO est la solution. Une agence Ads va toujours vous dire que les Ads sont la solution. Elles ont un biais structurel — elles vendent ce qu&apos;elles savent faire.
          <br /><br />
          Uclic n&apos;est pas une agence canal. On est des stratèges growth qui identifient ce qui marche pour vous, puis staffent les bons experts pour le scaler.
        </p>
        <p className="text-sm font-semibold text-[#E0FF5C]">
          La méthode d&apos;abord. Le canal ensuite.
        </p>
      </div>
    </div>
  );
}
