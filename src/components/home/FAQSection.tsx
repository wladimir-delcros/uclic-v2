'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useAnimations';

const faqs = [
  {
    q: 'C\'est quoi la différence avec une agence classique ?',
    a: 'Une agence SEO va toujours vous recommander du SEO. Une agence Ads va toujours vous recommander des Ads. Chez Uclic, on commence par identifier les canaux qui ont réellement du potentiel pour votre business — sans biais, sans angle de vente. On choisit selon vos données, pas selon nos spécialités. Et vous parlez directement aux experts qui font le travail, pas à un intermédiaire qui sous-traite.',
  },
  {
    q: 'On peut démarrer en combien de temps ?',
    a: '48h. Dès que l\'audit est calé, on démarre. Pas de phase de "découverte" de 6 semaines. Le brief, l\'audit, la roadmap — tout ça se fait dans les deux premiers jours.',
  },
  {
    q: 'Vous gérez les budgets médias ?',
    a: 'Non. Les budgets médias (Google, LinkedIn, Meta) restent sur votre compte et sous votre contrôle. On les pilote, on optimise les campagnes, mais vous gardez la main sur la dépense. Nos honoraires n\'incluent pas les budgets.',
  },
  {
    q: 'Est-ce qu\'on peut changer la composition du squad en cours de route ?',
    a: 'Oui. Si vous avez besoin de renforcer un canal ou d\'en activer un nouveau, on ajuste. C\'est le principe du modèle squad — modulaire par nature.',
  },
  {
    q: 'Vous travaillez avec quel type de boîte ?',
    a: 'Principalement des startups et scale-ups B2B entre 500k et 10M d\'ARR qui ont déjà un produit qui fonctionne et veulent accélérer leur acquisition. On ne fait pas de l\'early stage à zéro traction — il faut un minimum de données pour qu\'on puisse travailler efficacement.',
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-medium text-[rgba(245,245,241,0.85)] group-hover:text-[#F5F5F1] transition-colors pr-4">
          {faq.q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-white/[0.15] flex items-center justify-center transition-all duration-200 ${
            open ? 'border-[#E0FF5C]/40 bg-[rgba(224,255,92,0.08)] rotate-45' : ''
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1V9M1 5H9" stroke={open ? '#E0FF5C' : 'rgba(245,245,241,0.4)'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '400px' : '0' }}
      >
        <p className="text-sm text-[rgba(245,245,241,0.5)] leading-relaxed pb-5">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation<HTMLDivElement>({ delay: 100 });

  return (
    <section className="uclic-section bg-[#050505]" id="faq">
      <div className="uclic-container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div
            ref={headerRef}
            className={`uclic-reveal ${headerVisible ? 'is-visible' : ''} text-center mb-14`}
          >
            <h2 className="uclic-heading-lg mb-4">Questions fréquentes</h2>
          </div>

          {/* FAQ items */}
          <div
            ref={faqRef}
            className={`uclic-reveal ${faqVisible ? 'is-visible' : ''}`}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
