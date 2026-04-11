'use client';

import { useScrollAnimation } from '@/hooks/useAnimations';

const plans = [
  {
    name: 'Starter',
    price: '3 000',
    description: 'Pour tester un canal avec un expert dédié et valider vos premières hypothèses d\'acquisition.',
    features: [
      '1 expert senior dédié (canal au choix)',
      'Audit initial + roadmap 48h',
      'Reporting mensuel sur les KPIs',
      '1 point hebdo (30 min) avec votre expert',
    ],
    cta: 'Démarrer',
    featured: false,
  },
  {
    name: 'Growth',
    price: '5 500',
    description: 'Le squad complet pour scaler votre acquisition sur deux canaux en simultané, avec les premiers automatismes IA.',
    badge: 'Le plus demandé',
    features: [
      '2 experts seniors (ex : SEO/Ads + Outbound)',
      'Audit 360° + roadmap priorisée',
      'Déploiement J+15, premiers résultats mesurables',
      'Premiers agents IA et flux n8n',
      'Reporting hebdo + accès dashboard temps réel',
    ],
    cta: 'Choisir Growth',
    featured: true,
  },
  {
    name: 'Scale',
    price: '9 000',
    description: 'Pour les équipes qui veulent industrialiser leur acquisition sur tous les canaux et automatiser leur pipeline de A à Z.',
    features: [
      'Squad complet (Inbound + Outbound + Data & IA)',
      'DA incluse pour la production de créas et landing pages',
      'Automatisation complète des séquences et qualification IA',
      'Dashboards custom + reporting exécutif mensuel',
      'Accès direct fondateur — point stratégique bimensuel avec Wladimir',
    ],
    cta: 'Parler à Wladimir',
    featured: false,
  },
];

function PlanCard({ plan, index }: { plan: (typeof plans)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ delay: index * 100 });

  if (plan.featured) {
    return (
      <div
        ref={ref}
        className={`uclic-reveal ${isVisible ? 'is-visible' : ''} pricing-card-featured relative flex flex-col p-8 md:p-10`}
        style={{ borderRadius: '1rem' }}
      >
        <div className="relative z-10 flex flex-col h-full">
          {/* Badge */}
          {plan.badge && (
            <div className="mb-4">
              <span className="uclic-badge">{plan.badge}</span>
            </div>
          )}

          {/* Plan name */}
          <h3 className="text-lg font-semibold text-[#F5F5F1] mb-1">{plan.name}</h3>

          {/* Price */}
          <div className="flex items-end gap-1.5 mb-4">
            <span className="text-4xl font-bold text-[#F5F5F1] font-['Absans','Inter',sans-serif]">
              {plan.price}€
            </span>
            <span className="text-[rgba(245,245,241,0.4)] text-sm mb-1.5">/mois</span>
          </div>

          {/* Description */}
          <p className="text-sm text-[rgba(245,245,241,0.55)] leading-relaxed mb-6">
            {plan.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[rgba(245,245,241,0.75)]">
                <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8L6.5 11.5L13 4.5" stroke="#E0FF5C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="#cta" className="uclic-btn-primary text-sm py-3 text-center w-full">
            {plan.cta}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`uclic-reveal ${isVisible ? 'is-visible' : ''} uclic-card hover-lift flex flex-col`}
    >
      {/* Plan name */}
      <h3 className="text-lg font-semibold text-[#F5F5F1] mb-1">{plan.name}</h3>

      {/* Price */}
      <div className="flex items-end gap-1.5 mb-4">
        <span className="text-4xl font-bold text-[#F5F5F1] font-['Absans','Inter',sans-serif]">
          {plan.price}€
        </span>
        <span className="text-[rgba(245,245,241,0.4)] text-sm mb-1.5">/mois</span>
      </div>

      {/* Description */}
      <p className="text-sm text-[rgba(245,245,241,0.5)] leading-relaxed mb-6">
        {plan.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[rgba(245,245,241,0.6)]">
            <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8L6.5 11.5L13 4.5" stroke="rgba(224,255,92,0.5)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#cta" className="uclic-btn-ghost text-sm py-3 text-center w-full">
        {plan.cta}
      </a>
    </div>
  );
}

export default function PricingSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: noteRef, isVisible: noteVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="uclic-section bg-black" id="tarifs">
      <div className="uclic-container px-4 md:px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`uclic-reveal ${headerVisible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}
        >
          <span className="uclic-badge mb-4 inline-flex">Tarifs</span>
          <h2 className="uclic-heading-lg mb-4">Transparent. Sans surprise.</h2>
          <p className="text-[rgba(245,245,241,0.5)] text-base leading-relaxed">
            Chaque formule est construite autour d&apos;un squad d&apos;experts dédiés à votre canal prioritaire. Les budgets médias sont en dehors. Ajustable selon vos besoins.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-start mb-10">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Note */}
        <div
          ref={noteRef}
          className={`uclic-reveal ${noteVisible ? 'is-visible' : ''} text-center`}
        >
          <p className="text-xs text-[rgba(245,245,241,0.3)] max-w-lg mx-auto leading-relaxed">
            Tous nos tarifs sont hors budgets médias (Google Ads, LinkedIn Ads, Meta Ads). Engagement minimum : 3 mois. Résiliation sans frais après.
          </p>
        </div>
      </div>

      <style>{`
        .pricing-card-featured {
          background: linear-gradient(#0a0a0a, #0a0a0a) padding-box,
            conic-gradient(from var(--shimmer-angle, 0deg), transparent 20%, #E0FF5C 40%, #b8d93a 50%, #E0FF5C 60%, transparent 80%) border-box;
          border: 1px solid transparent;
        }
        @property --shimmer-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes shimmerSpin {
          to { --shimmer-angle: 360deg; }
        }
        .pricing-card-featured {
          animation: shimmerSpin 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
