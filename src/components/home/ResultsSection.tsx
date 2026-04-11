'use client';

import { useScrollAnimation } from '@/hooks/useAnimations';

const caseStudies = [
  {
    tag: 'B2B SaaS · EdTech',
    client: 'CodinGame',
    title: 'Comment CodinGame a multiplié ses MQLs par 4 en 90 jours',
    metrics: [
      { value: '+300%', label: 'MQLs générés' },
      { value: '-60%', label: 'CAC' },
      { value: '48h', label: 'démarrage effectif' },
    ],
    quote:
      '"On a eu plus de résultats en 3 mois avec Uclic qu\'en 18 mois avec notre agence précédente. Et on savait exactement pourquoi ça marchait."',
    levers: ['SEO programmatique', 'LinkedIn Ads', 'Séquences cold email DRH'],
  },
  {
    tag: 'B2B · Cybersécurité',
    client: 'Scale-up Cybersécurité',
    title: '×3 sur le pipeline en 90 jours avec une stratégie outbound reconstruite',
    metrics: [
      { value: '+45%', label: 'taux de réponse cold email' },
      { value: '×3', label: 'pipeline généré en 90 jours' },
      { value: '6 sem.', label: 'pour atteindre le rythme de croisière' },
    ],
    quote:
      '"On avait essayé le cold email en interne. Ça ne donnait rien. Alexis a tout restructuré — segmentation, copywriting, séquences. Les réponses ont explosé dès la semaine 3."',
    levers: ['Scraping LinkedIn', 'Enrichissement IA', 'Séquences multicanal ultra-personnalisées'],
  },
];

function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl md:text-3xl font-bold text-[#E0FF5C] font-['Absans','Inter',sans-serif] leading-none">
        {value}
      </span>
      <span className="text-xs text-[rgba(245,245,241,0.45)] mt-1">{label}</span>
    </div>
  );
}

function CaseStudyCard({ cs, index }: { cs: (typeof caseStudies)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ delay: index * 150 });

  return (
    <div
      ref={ref}
      className={`uclic-reveal ${isVisible ? 'is-visible' : ''} uclic-card hover-lift`}
    >
      {/* Tag + client */}
      <div className="flex items-center gap-3 mb-6">
        <span className="uclic-badge">{cs.tag}</span>
        <span className="text-xs text-[rgba(245,245,241,0.35)] font-medium">{cs.client}</span>
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-semibold text-[#F5F5F1] mb-8 leading-snug">
        {cs.title}
      </h3>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/[0.06]">
        {cs.metrics.map((m) => (
          <MetricBadge key={m.label} value={m.value} label={m.label} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-[rgba(245,245,241,0.55)] italic leading-relaxed mb-6 pl-4 border-l-2 border-[rgba(224,255,92,0.3)]">
        {cs.quote}
      </blockquote>

      {/* Levers */}
      <div>
        <p className="text-xs uppercase tracking-wider text-[rgba(245,245,241,0.3)] mb-3">Leviers activés</p>
        <div className="flex flex-wrap gap-2">
          {cs.levers.map((lever) => (
            <span
              key={lever}
              className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[rgba(245,245,241,0.5)]"
            >
              {lever}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResultsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="uclic-section bg-[#050505]" id="resultats">
      <div className="uclic-container px-4 md:px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`uclic-reveal ${headerVisible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}
        >
          <span className="uclic-badge mb-4 inline-flex">Cas clients</span>
          <h2 className="uclic-heading-lg mb-4">Des chiffres, pas des promesses</h2>
          <p className="text-[rgba(245,245,241,0.5)] text-base leading-relaxed">
            Voici ce que nos squads ont produit. Pas des estimations — des résultats réels, mesurés, vérifiables.
          </p>
        </div>

        {/* Case studies */}
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.client} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
