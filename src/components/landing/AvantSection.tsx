'use client';
import { Check, X } from 'lucide-react';
import Reveal from '../ui/Reveal';

const inclus = [
  'Un Growth Scan offert, sans engagement',
  'Un Growth Strategist senior dédié',
  '30 minutes par semaine de votre côté',
  'Un reporting mensuel condensé',
  'Vous restez propriétaire de ce qu\'on construit',
  'Vos prestataires actuels audités avant toute décision',
];
const cadre = [
  'Engagement initial : 3 mois',
  'Ensuite : mensuel, résiliable 30j préavis',
  'Pas de clause cachée, pas de dépendance',
];
const non = [
  'ROI x5 promis en 3 mois',
  'Garantie chiffrée avant diagnostic',
];

export default function AvantSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> Avant de vous décider
          </div>
          <h2 className="mt-4 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
            Ce que vous signez. <span className="text-[color:var(--accent)]">Et ce que vous ne signez pas.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          <Reveal as="div" className="card-surface p-7" delay={0}>
            <div className="pill !text-[11px] !py-1 !px-3 !border-[color:var(--accent)]/30 text-[color:var(--accent)] mb-5">
              Ce qui est inclus
            </div>
            <ul className="space-y-3">
              {inclus.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-[14px]">
                  <Check size={16} className="text-[color:var(--accent)] mt-0.5 shrink-0" /> {l}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="card-surface p-7" delay={0.1}>
            <div className="pill !text-[11px] !py-1 !px-3 mb-5">Cadre contractuel</div>
            <ul className="space-y-3">
              {cadre.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-[14px]">
                  <Check size={16} className="text-[color:var(--ink-dim)] mt-0.5 shrink-0" /> {l}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="card-surface p-7" delay={0.2}>
            <div className="pill !text-[11px] !py-1 !px-3 mb-5">Ce qu'on ne fait pas</div>
            <ul className="space-y-3">
              {non.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-[14px] text-[color:var(--ink-muted)]">
                  <X size={16} className="text-[color:var(--ink-dim)] mt-0.5 shrink-0" /> {l}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-[color:var(--border-subtle)] text-[13px] text-[color:var(--accent)]">
              ✓ Clarté · Transparence · Réactivité · Seniorité
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
