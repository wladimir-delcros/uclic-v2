'use client';

import { useScrollAnimation } from '@/hooks/useAnimations';

export default function CTAFinal() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-black" id="cta">
      {/* Glow orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="uclic-cta-glow" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(224,255,92,0.12) 0%, rgba(224,255,92,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'ctaGlow 4s ease-in-out infinite',
          }}
        />
      </div>

      <div className="uclic-container relative z-10 px-4 md:px-6 text-center">
        <div
          ref={ref}
          className={`uclic-reveal ${isVisible ? 'is-visible' : ''} max-w-2xl mx-auto`}
        >
          {/* Label */}
          <span className="uclic-badge mb-6 inline-flex">Passez à l&apos;action</span>

          {/* Headline */}
          <h2
            className="uclic-heading-lg mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Votre prochaine étape de croissance{' '}
            <span className="text-[#E0FF5C]">commence ici.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base text-[rgba(245,245,241,0.55)] leading-relaxed mb-10 max-w-xl mx-auto">
            Un audit gratuit de 30 minutes avec Wladimir. On regarde ensemble vos canaux, vos blocages et ce qu&apos;on peut activer en 48h. Sans engagement, sans PowerPoint — juste des réponses concrètes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="mailto:hello@uclic.fr"
              className="uclic-btn-primary text-base py-4 px-8"
              style={{ animation: 'btnGlow 2.5s ease-in-out infinite' }}
            >
              Réserver mon audit gratuit
            </a>
            <a href="#tarifs" className="uclic-btn-ghost text-base py-4 px-8">
              Voir les tarifs
            </a>
          </div>

          {/* Trust note */}
          <p className="text-xs text-[rgba(245,245,241,0.3)]">
            Gratuit · Sans engagement · Réponse sous 24h
          </p>

          {/* Contact */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[rgba(245,245,241,0.35)]">
            <a href="mailto:hello@uclic.fr" className="hover:text-[#E0FF5C] transition-colors">
              hello@uclic.fr
            </a>
            <span className="hidden sm:block">·</span>
            <a href="tel:+33617125428" className="hover:text-[#E0FF5C] transition-colors">
              +33 6 17 12 54 28
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ctaGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(224, 255, 92, 0.3), 0 0 40px rgba(224, 255, 92, 0.1); }
          50% { box-shadow: 0 0 30px rgba(224, 255, 92, 0.5), 0 0 60px rgba(224, 255, 92, 0.2); }
        }
      `}</style>
    </section>
  );
}
