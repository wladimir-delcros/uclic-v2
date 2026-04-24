import { ArrowLeft, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import CTAButton from '@/components/ui/CTAButton';

export default function TeamMemberNotFound() {
  return (
    <>
      <Nav />
      <main className="relative">
        <section className="relative pt-24 lg:pt-28 pb-24 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[900px] mx-auto px-5 lg:px-10 relative text-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              404 · Membre introuvable
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(32px,4.2vw,48px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
              Ce membre de l&apos;équipe n&apos;existe pas.
            </h1>
            <p className="mt-5 text-[color:var(--ink-muted)] text-[16px] leading-relaxed">
              Le profil que vous cherchez a peut-être été déplacé ou n&apos;existe plus. Retrouvez toute l&apos;équipe Uclic.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <CTAButton href="/equipe" icon={ArrowLeft} iconPosition="left" size="md">
                Voir l&apos;équipe
              </CTAButton>
              <CTAButton href="/" variant="secondary" icon={ArrowRight} size="md">
                Accueil
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
