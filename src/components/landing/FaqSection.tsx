'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionAmbience from '../ui/SectionAmbience';

const cats = ['Général', 'Méthode', 'Tarifs', 'Intégrations'] as const;
type Cat = typeof cats[number];

const faq: { cat: Cat; q: string; a: string }[] = [
  { cat: 'Général', q: "Vous travaillez avec des PME ou seulement des scale-ups ?",
    a: "Les deux. PME, scale-ups, ETI, grands comptes. Le vrai critère : clarté de la cible et ambition de scale." },
  { cat: 'Général', q: "Comment savoir si c'est le bon moment ?",
    a: "Acquisition qui stagne, prestataires qui s'empilent, CFO qui demande de la clarté, concurrents qui accélèrent — autant de signaux." },
  { cat: 'Général', q: "Vous pouvez remplacer un Head of Growth interne ?",
    a: "Oui, ou venir en renfort s'il est déjà bon mais manque de bras ou de spécialités." },
  { cat: 'Méthode', q: "Comment ça se passe si on n'obtient pas les résultats attendus ?",
    a: "On ne promet pas de résultats chiffrés à l'avance — trop de variables sont hors de notre contrôle. En revanche, on ajuste tous les 30 jours et on coupe ce qui ne marche pas." },
  { cat: 'Méthode', q: "Quand voit-on les premiers résultats ?",
    a: "Outbound et ads : signaux rapides (quelques semaines). SEO : progressif (2-3 mois). Automatisations IA : gains productivité quasi immédiats." },
  { cat: 'Méthode', q: "C'est quoi un Growth Strategist ?",
    a: "Votre interlocuteur unique chez Uclic. Senior qui pilote la stratégie, coordonne les experts, arbitre les priorités." },
  { cat: 'Tarifs', q: "Combien ça coûte ?",
    a: "Growth Scan offert. Accompagnement dès 1 490 €/mois (1 pilier), 2 680 €/mois (Duo), 3 570 €/mois (Growth Machine)." },
  { cat: 'Tarifs', q: "Y a-t-il un engagement ?",
    a: "Engagement initial 3 mois (le temps nécessaire pour déployer et mesurer), puis mensuel résiliable 30 jours préavis." },
  { cat: 'Intégrations', q: "Vous pouvez intégrer nos outils existants ?",
    a: "Oui. CRM, prospection, analytics, orchestration, enrichissement : on s'y branche dans la majorité des cas." },
];

export default function FaqSection() {
  const [active, setActive] = useState<Cat>('Général');
  const filtered = faq.filter((f) => f.cat === active);
  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <SectionAmbience variant="medium" />
      <div className="max-w-[980px] mx-auto px-5 lg:px-10 relative">
        <Reveal as="div" className="text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> FAQ <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
            Les questions qu'on{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              reçoit le plus souvent.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Tout ce qu'on nous demande avant de démarrer. Si votre question n'y est pas, on y répond pendant le Growth Scan.
          </p>
        </Reveal>

        <Reveal as="div" className="mt-10 flex justify-center flex-wrap gap-2" delay={0.15}>
          {cats.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`pill !rounded-none transition-colors ${
                  isActive
                    ? '!bg-[color:var(--accent)] !text-black !border-[color:var(--accent)] font-medium'
                    : 'hover:!border-[color:var(--border-strong)]'
                }`}>
                {c}
              </button>
            );
          })}
        </Reveal>

        <Reveal as="div" className="mt-14 !rounded-none !p-0 overflow-hidden border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white" delay={0.25}>
          {filtered.map((f, i) => (
            <details key={f.q} className="group">
              <summary className={`px-8 lg:px-10 py-6 flex items-center justify-between gap-6 cursor-pointer list-none ${
                i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
              } hover:bg-[color:var(--card)]`}>
                <span className="text-[16px] font-medium pr-4 leading-snug">{f.q}</span>
                <Plus
                  size={18}
                  strokeWidth={2}
                  className="text-[color:var(--accent)] transition-transform duration-300 group-open:rotate-45 shrink-0"
                />
              </summary>
              <div className="px-8 lg:px-10 pb-7 pt-1 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[780px]">{f.a}</div>
            </details>
          ))}
        </Reveal>

        <Reveal as="p" className="mt-14 text-center text-[14px] text-[color:var(--ink-muted)]" delay={0.35}>
          Une question spécifique ? On y répond pendant le Growth Scan.
        </Reveal>
      </div>
    </section>
  );
}
