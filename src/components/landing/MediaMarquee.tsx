'use client';
import { useEffect, useState, useMemo } from 'react';

const clients = [
  { src: '/partners/louisvuitton.png',     alt: 'Louis Vuitton' },
  { src: '/partners/oreal.png',            alt: "L'Oréal" },
  { src: '/partners/lemonde.png',          alt: 'Le Monde' },
  { src: '/partners/agicap.png',           alt: 'Agicap' },
  { src: '/partners/codingame.png',        alt: 'CodinGame' },
  { src: '/partners/deepki.png',           alt: 'Deepki' },
  { src: '/partners/tehtris.png',          alt: 'Tehtris' },
  { src: '/partners/floa.png',             alt: 'Floa Bank' },
  { src: '/partners/point-p.png',          alt: 'Point P' },
  { src: '/partners/msc.png',              alt: 'MSC Cruises' },
  { src: '/partners/cybelangel.png',       alt: 'CybelAngel' },
  { src: '/partners/bonpoint.png',         alt: 'Bonpoint' },
  { src: '/partners/paris-turf.png',       alt: 'Paris Turf' },
  { src: '/partners/but.png',              alt: 'BUT' },
  { src: '/partners/digital-campus.png',   alt: 'Digital Campus' },
  { src: '/partners/france-parebrise.png', alt: 'France Pare-Brise' },
  { src: '/partners/hapik.png',            alt: 'Hapik' },
  { src: '/partners/jobgether.png',        alt: 'Jobgether' },
  { src: '/partners/matchem.png',          alt: 'Matchem' },
  { src: '/partners/obat.png',             alt: 'OBat' },
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

  const logo = clients[current];
  const opacity = phase === 'out' ? 0 : 1;
  const translateY = phase === 'out' ? -6 : phase === 'in' ? 0 : 0;

  return (
    <div className="relative h-12 flex items-center justify-center shrink-0 min-w-0 w-full px-2">
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
        className="relative flex h-10 w-full items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          /* max-h fixe = tous les logos à la MÊME hauteur visuelle, largeur auto.
             max-w-full garde l'image dans le slot mobile étroit. */
          className="h-6 sm:h-7 w-auto max-w-full object-contain logo-white"
        />
      </div>
      {nextLogo && <link rel="preload" as="image" href={nextLogo.src} />}
    </div>
  );
}

export default function MediaMarquee() {
  const [slotCount, setSlotCount] = useState(SLOTS_DESKTOP);
  const [slots, setSlots] = useState<Slot[]>(() =>
    Array.from({ length: SLOTS_DESKTOP }, (_, i) => ({ logoIndex: i % clients.length, key: 0 })),
  );

  // Responsive slot count
  useEffect(() => {
    const sync = () => setSlotCount(window.innerWidth < 768 ? SLOTS_MOBILE : SLOTS_DESKTOP);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  // Keep slots array sized to slotCount
  useEffect(() => {
    setSlots((prev) => {
      if (prev.length === slotCount) {return prev;}
      if (prev.length < slotCount) {
        const extra = Array.from({ length: slotCount - prev.length }, (_, i) => ({
          logoIndex: (prev.length + i) % clients.length,
          key: 0,
        }));
        return [...prev, ...extra];
      }
      return prev.slice(0, slotCount);
    });
  }, [slotCount]);

  // Rotate one slot at a time, round-robin, with small jitter so it feels organic
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
        // Pick a logo not currently displayed
        const candidates = clients
          .map((_, idx) => idx)
          .filter((idx) => !used.has(idx));
        const pick =
          candidates.length > 0
            ? candidates[Math.floor(Math.random() * candidates.length)]
            : (prev[slotIdx].logoIndex + clients.length - 1) % clients.length;
        return prev.map((s, idx) => (idx === slotIdx ? { logoIndex: pick, key: s.key + 1 } : s));
      });
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, [slotCount]);

  const nextLogos = useMemo(() => slots.map((s) => clients[(s.logoIndex + 1) % clients.length]), [slots]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Grille de slots avec séparateurs verticaux pleine hauteur */}
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
