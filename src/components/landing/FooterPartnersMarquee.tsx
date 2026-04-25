'use client';
import { useEffect, useState, useMemo } from 'react';

/**
 * Clients supplémentaires — même UI/UX que `MediaMarquee` sous le Hero,
 * avec les logos clients qui ne tournent pas là-haut (limité à 21 slots).
 * On exclut volontairement la stack tools (PostHog/Lemlist/HubSpot/etc.)
 * qui a sa propre sémantique et ne doit pas se mélanger aux références
 * clients dans le footer.
 */
// Liste alignée sur la source de vérité `uclic.fr` (section clients) :
// 13 références que MediaMarquee (Hero) n'affiche pas déjà. Aucun tool
// ici — uniquement des clients historiques.
const partners = [
  { src: '/partners/muzzo.png',           alt: 'Muzzo' },
  { src: '/partners/coderpad.png',        alt: 'CoderPad' },
  { src: '/partners/breega.png',          alt: 'Breega' },
  { src: '/partners/isai.png',            alt: 'ISAI' },
  { src: '/partners/summit-partner.png',  alt: 'Summit Partners' },
  { src: '/partners/supergeek.png',       alt: 'Supergeek' },
  { src: '/partners/avanoo.png',          alt: 'Avanoo' },
  { src: '/partners/beertime.png',        alt: 'Beertime' },
  { src: '/partners/clicknjustice.png',   alt: "Click'n Justice" },
  { src: '/partners/comcom.png',          alt: 'Comcom' },
  { src: '/partners/esg.png',             alt: 'ESG' },
  { src: '/partners/expanders.png',       alt: 'Expanders' },
  { src: '/partners/logo-youngdata.png',  alt: 'YoungData' },
];

const SLOTS_DESKTOP = 7;
const SLOTS_MOBILE = 3;
const ROTATION_MS = 2000;
const FADE_MS = 550;

type Slot = { logoIndex: number; key: number };

function RotatingSlot({ slot, nextLogo }: { slot: Slot; nextLogo: { src: string; alt: string } | null }) {
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const [current, setCurrent] = useState(slot.logoIndex);

  useEffect(() => {
    if (slot.logoIndex === current) {return;}
    setPhase('out');
    const t1 = setTimeout(() => {
      setCurrent(slot.logoIndex);
      setPhase('in');
      const t2 = setTimeout(() => setPhase('idle'), FADE_MS);
      return () => clearTimeout(t2);
    }, FADE_MS);
    return () => clearTimeout(t1);
  }, [slot.logoIndex, current]);

  const logo = partners[current];
  const opacity = phase === 'out' ? 0 : 1;
  const translateY = phase === 'out' ? -6 : 0;

  return (
    <div className="relative h-12 flex items-center justify-center shrink-0 min-w-0 w-full px-2">
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
        className="relative flex h-10 w-full items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          className="h-6 sm:h-7 w-auto max-w-full object-contain logo-white"
        />
      </div>
      {nextLogo && <link rel="preload" as="image" href={nextLogo.src} />}
    </div>
  );
}

export default function FooterPartnersMarquee() {
  const [slotCount, setSlotCount] = useState(SLOTS_DESKTOP);
  const [slots, setSlots] = useState<Slot[]>(() =>
    Array.from({ length: SLOTS_DESKTOP }, (_, i) => ({ logoIndex: i % partners.length, key: 0 })),
  );

  useEffect(() => {
    const sync = () => setSlotCount(window.innerWidth < 768 ? SLOTS_MOBILE : SLOTS_DESKTOP);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  useEffect(() => {
    setSlots((prev) => {
      if (prev.length === slotCount) {return prev;}
      if (prev.length < slotCount) {
        const extra = Array.from({ length: slotCount - prev.length }, (_, i) => ({
          logoIndex: (prev.length + i) % partners.length,
          key: 0,
        }));
        return [...prev, ...extra];
      }
      return prev.slice(0, slotCount);
    });
  }, [slotCount]);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {return;}

    let i = 0;
    const interval = setInterval(() => {
      const slotIdx = i % slotCount;
      i += 1;
      setSlots((prev) => {
        const used = new Set(prev.map((s) => s.logoIndex));
        const candidates = partners
          .map((_, idx) => idx)
          .filter((idx) => !used.has(idx));
        const pick =
          candidates.length > 0
            ? candidates[Math.floor(Math.random() * candidates.length)]
            : (prev[slotIdx].logoIndex + partners.length - 1) % partners.length;
        return prev.map((s, idx) => (idx === slotIdx ? { logoIndex: pick, key: s.key + 1 } : s));
      });
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, [slotCount]);

  const nextLogos = useMemo(() => slots.map((s) => partners[(s.logoIndex + 1) % partners.length]), [slots]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div
          className="grid items-stretch"
          style={{ gridTemplateColumns: `repeat(${slotCount}, minmax(0, 1fr))` }}>
          {slots.map((slot, i) => (
            <div
              key={i}
              className={`flex items-center justify-center py-6 ${
                i < slots.length - 1 ? 'border-r border-[color:var(--border-subtle)]' : ''
              }`}>
              <RotatingSlot slot={slot} nextLogo={nextLogos[i] ?? null} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
