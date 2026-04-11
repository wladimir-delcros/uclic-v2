'use client';

import Marquee from 'react-fast-marquee';
import { useScrollAnimation } from '@/hooks/useAnimations';

const logos = [
  'CodinGame',
  'Stormshield',
  'La Growth Machine',
  'Scalezia',
  'Inpulse',
  'Toucan Toco',
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center mx-10 md:mx-14">
      <span className="text-sm font-semibold text-[rgba(245,245,241,0.3)] tracking-wider uppercase whitespace-nowrap hover:text-[rgba(245,245,241,0.6)] transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

export default function LogoBar() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-12 border-y border-white/[0.06] bg-black overflow-hidden">
      <div className="uclic-container px-4 md:px-6 mb-8">
        <p
          ref={ref}
          className={`text-center text-xs uppercase tracking-[0.15em] text-[rgba(245,245,241,0.3)] uclic-reveal ${isVisible ? 'is-visible' : ''}`}
        >
          Ils nous ont fait confiance
        </p>
      </div>

      <Marquee gradient={false} speed={40} pauseOnHover>
        {logos.map((logo) => (
          <LogoItem key={logo} name={logo} />
        ))}
        {logos.map((logo) => (
          <LogoItem key={`${logo}-2`} name={logo} />
        ))}
      </Marquee>
    </section>
  );
}
