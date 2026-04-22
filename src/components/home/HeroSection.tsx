'use client';

import { useEffect, useRef } from 'react';
import { HeroBackground, GlowOrb, GrainOverlay } from '@/components/ui/icons';
import { useCountUp } from '@/hooks/useAnimations';

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="text-2xl md:text-3xl font-bold text-[#E0FF5C] font-['Absans','Inter',sans-serif] leading-none">
        {value}
      </span>
      <span className="text-xs text-[rgba(245,245,241,0.5)] mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Stagger animate hero elements
    const elements = heroRef.current?.querySelectorAll('[data-hero-animate]');
    if (!elements) return;
    elements.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Grain overlay */}
      <GrainOverlay opacity={0.03} />

      {/* Background glow */}
      <GlowOrb
        size="lg"
        intensity="soft"
        style={{ top: '-10%', right: '-10%' }}
      />
      <GlowOrb
        size="md"
        intensity="soft"
        style={{ bottom: '20%', left: '-5%' }}
      />

      {/* Hero SVG background shape */}
      <HeroBackground className="opacity-60" />

      {/* Content */}
      <div className="uclic-container relative z-10 px-4 md:px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl">

          {/* Badge */}
          <div data-hero-animate className="mb-6">
            <span className="uclic-badge">
              <span className="w-2 h-2 rounded-full bg-[#E0FF5C] inline-block animate-pulse" />
              Disponible — 2 places ce mois
            </span>
          </div>

          {/* H1 */}
          <h1
            data-hero-animate
            className="uclic-heading-xl mb-6"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Votre squad growth.<br />
            <span className="text-[#E0FF5C]">Résultats en 48h.</span>
          </h1>

          {/* Subtitle */}
          <p
            data-hero-animate
            className="text-base md:text-lg text-[rgba(245,245,241,0.55)] max-w-2xl leading-relaxed mb-10"
          >
            Pas une agence classique. On commence par identifier quels canaux peuvent vraiment marcher pour votre business — sans biais, sans préconisation orientée. Ensuite seulement, on active les bons experts et on scale ce qui fonctionne. Zéro bullshit, que des métriques.
          </p>

          {/* CTAs */}
          <div data-hero-animate className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href="#cta"
              className="uclic-btn-primary text-base py-3 px-7"
              style={{ animation: 'btnGlow 2.5s ease-in-out infinite' }}
            >
              Obtenir mon audit gratuit
            </a>
            <a href="#resultats" className="uclic-btn-ghost text-base py-3 px-7">
              Voir les résultats →
            </a>
          </div>

          {/* Stats */}
          <div
            data-hero-animate
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-8 border-t border-[color:var(--border-subtle)]"
          >
            <StatItem value="+300%" label="MQLs générés" />
            <div className="hidden sm:block w-px h-10 bg-[color:var(--card-elev-2)]" />
            <StatItem value="-60%" label="CAC moyen constaté" />
            <div className="hidden sm:block w-px h-10 bg-[color:var(--card-elev-2)]" />
            <StatItem value="48h" label="pour démarrer" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(224, 255, 92, 0.3), 0 0 40px rgba(224, 255, 92, 0.1); }
          50% { box-shadow: 0 0 30px rgba(224, 255, 92, 0.5), 0 0 60px rgba(224, 255, 92, 0.2); }
        }
      `}</style>
    </section>
  );
}
