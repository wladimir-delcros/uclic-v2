'use client';

import { useScrollAnimation } from '@/hooks/useAnimations';

const experts = [
  {
    initials: 'WD',
    name: 'Wladimir Delcros',
    role: 'Growth Strategist · Fondateur',
    badge: 'Fondateur',
    bio: 'Son rôle premier : identifier quels canaux ont un vrai potentiel pour votre business — avant d\'activer quoi que ce soit. 10 ans Head of Growth en SaaS B2B, +20M de vues LinkedIn. Il a construit ce modèle parce qu\'il a vécu le biais des agences de l\'intérieur.',
    linkedin: 'https://www.linkedin.com/in/wladimirdelcros/',
    color: '#E0FF5C',
  },
  {
    initials: 'AC',
    name: 'Alexis Christine-Amara',
    role: 'VP Sales & Outbound',
    badge: 'Outbound',
    bio: 'Architecte de pipelines outbound à haute cadence — scraping, séquences cold email, LinkedIn automation — il transforme une liste en pipeline qualifié.',
    linkedin: '#',
    color: '#83e7ee',
  },
  {
    initials: 'TB',
    name: 'Tuka Bade',
    role: 'Data & Machine Learning',
    badge: 'Data & IA',
    bio: 'Il construit les agents IA et les systèmes d\'automatisation n8n qui font tourner votre acquisition pendant que vous dormez.',
    linkedin: '#',
    color: '#c6f56f',
  },
  {
    initials: 'FB',
    name: 'Florence Beckel',
    role: 'Directrice Artistique',
    badge: 'Créatif',
    bio: 'Elle donne à votre marque l\'image qui convertit — landing pages, créas ads, identité visuelle alignée sur votre positionnement growth.',
    linkedin: '#',
    color: '#ffc2ad',
  },
];

function ExpertCard({ expert, index }: { expert: (typeof experts)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ delay: index * 100 });

  return (
    <div
      ref={ref}
      className={`uclic-reveal ${isVisible ? 'is-visible' : ''} uclic-card hover-lift group flex flex-col`}
    >
      {/* Avatar + badge */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-bold text-sm font-['Absans','Inter',sans-serif]"
          style={{ backgroundColor: expert.color }}
        >
          {expert.initials}
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            backgroundColor: `${expert.color}18`,
            color: expert.color,
            border: `1px solid ${expert.color}30`,
          }}
        >
          {expert.badge}
        </span>
      </div>

      {/* Name & role */}
      <h3 className="text-base font-semibold text-[#F5F5F1] mb-1">{expert.name}</h3>
      <p className="text-xs text-[rgba(245,245,241,0.4)] mb-4 uppercase tracking-wide">{expert.role}</p>

      {/* Bio */}
      <p className="text-sm text-[rgba(245,245,241,0.55)] leading-relaxed flex-1 mb-5">
        {expert.bio}
      </p>

      {/* LinkedIn */}
      <a
        href={expert.linkedin}
        className="text-xs text-[rgba(245,245,241,0.3)] hover:text-[#E0FF5C] transition-colors flex items-center gap-1.5"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
        LinkedIn
      </a>
    </div>
  );
}

export default function ExpertsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="uclic-section bg-black" id="equipe">
      <div className="uclic-container px-4 md:px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`uclic-reveal ${headerVisible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}
        >
          <span className="uclic-badge mb-4 inline-flex">L&apos;équipe</span>
          <h2 className="uclic-heading-lg mb-4">Des experts, pas des généralistes</h2>
          <p className="text-[rgba(245,245,241,0.5)] text-base leading-relaxed">
            On commence par identifier les bons canaux pour vous. Ensuite seulement, on active les experts qui correspondent. Chaque expert Uclic est spécialisé sur un seul canal. À partir de ~1 000€/mois par expert.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {experts.map((expert, i) => (
            <ExpertCard key={expert.name} expert={expert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
