'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { buildStrategy, type SimulationAnswers } from '@/lib/simulation';

interface Choice {
  label: string;
  value: string;
}

interface Step {
  id: keyof SimulationAnswers;
  question: string;
  hint: string;
  choices: Choice[];
}

const STEPS: Step[] = [
  {
    id: 'secteur',
    question: 'Votre secteur d\'activite ?',
    hint: 'Chaque marche a ses leviers de croissance.',
    choices: [
      { label: 'SaaS / Logiciel B2B', value: 'SaaS B2B' },
      { label: 'Fintech / Assurance', value: 'Fintech' },
      { label: 'E-commerce', value: 'Ecommerce' },
      { label: 'Services B2B', value: 'Services B2B' },
      { label: 'Sante / MedTech', value: 'Sante' },
      { label: 'Formation / EdTech', value: 'EdTech' },
      { label: 'Immobilier / PropTech', value: 'Immobilier' },
      { label: 'Autre secteur', value: 'Autre' },
    ],
  },
  {
    id: 'ca',
    question: 'Votre chiffre d\'affaires annuel ?',
    hint: 'On calibre les benchmarks sur votre taille.',
    choices: [
      { label: 'Moins de 500 k€', value: '<500k' },
      { label: '500 k€ - 2 M€', value: '500k-2M' },
      { label: '2 M€ - 10 M€', value: '2M-10M' },
      { label: 'Plus de 10 M€', value: '>10M' },
    ],
  },
  {
    id: 'budget',
    question: 'Budget marketing mensuel ?',
    hint: 'Toutes depenses : agences, Ads, outils.',
    choices: [
      { label: 'Moins de 2 000 €/mois', value: '<2k' },
      { label: '2 000 € - 10 000 €/mois', value: '2k-10k' },
      { label: '10 000 € - 30 000 €/mois', value: '10k-30k' },
      { label: 'Plus de 30 000 €/mois', value: '>30k' },
      { label: 'Pas de budget defini', value: 'Indefini' },
    ],
  },
  {
    id: 'source',
    question: 'Vos sources d\'acquisition actuelles ?',
    hint: 'Sur quoi repose aujourd\'hui votre croissance ?',
    choices: [
      { label: 'SEO / contenu', value: 'SEO' },
      { label: 'Ads payants (Google, Meta, LinkedIn)', value: 'Ads' },
      { label: 'Outbound / prospection', value: 'Outbound' },
      { label: 'Reseau et recommandations', value: 'Reseau' },
      { label: 'Multi-canal equilibre', value: 'Multi-canal' },
      { label: 'Rien de structure', value: 'Aucun' },
    ],
  },
  {
    id: 'defi',
    question: 'Votre defi marketing n°1 ?',
    hint: 'On concentre le plan sur ce point.',
    choices: [
      { label: 'Plus de leads qualifies', value: 'Plus de leads' },
      { label: 'Reduire mon cout d\'acquisition', value: 'Reduire CAC' },
      { label: 'Ameliorer les conversions', value: 'Conversion' },
      { label: 'Automatiser l\'acquisition', value: 'Automatisation' },
      { label: 'Comprendre ce qui bloque', value: 'Diagnostic' },
      { label: 'Se developper a l\'international', value: 'International' },
    ],
  },
  {
    id: 'timing',
    question: 'Quand souhaitez-vous demarrer ?',
    hint: 'On s\'adapte a votre agenda.',
    choices: [
      { label: 'Le plus tot possible', value: 'ASAP' },
      { label: 'Dans le mois', value: '1 mois' },
      { label: 'Dans 1 a 3 mois', value: '3 mois' },
      { label: 'Je me renseigne pour l\'instant', value: 'Renseignement' },
    ],
  },
];

export default function SimulationClient() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<SimulationAnswers>({});
  const [done, setDone] = useState(false);

  const strategy = useMemo(() => buildStrategy(answers), [answers]);
  const step = STEPS[stepIdx];
  const progress = Math.round(((stepIdx + (done ? 1 : 0)) / STEPS.length) * 100);

  const handleChoice = (value: string) => {
    if (!step) return;
    const next: SimulationAnswers = { ...answers, [step.id]: value };
    setAnswers(next);
    if (stepIdx + 1 >= STEPS.length) {
      setDone(true);
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const goBack = () => {
    if (done) {
      setDone(false);
      return;
    }
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const reset = () => {
    setAnswers({});
    setStepIdx(0);
    setDone(false);
  };

  return (
    <section className="relative py-12 lg:py-16">
      <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-[12px] text-[color:var(--ink-muted)] mb-2">
            <span>
              {done ? 'Simulation complete' : `Etape ${stepIdx + 1} / ${STEPS.length}`}
            </span>
            <span className="text-[color:var(--accent)] font-medium">{progress}%</span>
          </div>
          <div className="h-[3px] w-full bg-[color:var(--border-subtle)] overflow-hidden">
            <div
              className="h-full bg-[color:var(--accent)] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!done && step && (
          <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[color:var(--ink)] tracking-tight">
              {step.question}
            </h2>
            <p className="mt-2 text-[14px] text-[color:var(--ink-muted)]">{step.hint}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.choices.map((c) => {
                const isSelected = answers[step.id] === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => handleChoice(c.value)}
                    className={`text-left !rounded-none border p-4 lg:p-5 transition-colors ${
                      isSelected
                        ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/5'
                        : 'border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/50'
                    }`}
                  >
                    <span className="text-[14px] font-medium text-[color:var(--ink)]">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIdx === 0}
                className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &larr; Retour
              </button>
              <span className="text-[12px] text-[color:var(--ink-muted)]">
                Selectionnez une reponse pour continuer
              </span>
            </div>
          </div>
        )}

        {done && (
          <div className="space-y-6">
            {/* Score */}
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Score de potentiel</span>
              </div>
              <div className="flex items-end gap-4">
                <div className="text-[56px] md:text-[72px] leading-none font-semibold text-[color:var(--ink)] tracking-tight">
                  {strategy.score}
                </div>
                <div className="text-[14px] text-[color:var(--ink-muted)] pb-2">/ 100</div>
              </div>
              <div className="mt-4 h-[4px] w-full bg-[color:var(--border-subtle)] overflow-hidden">
                <div
                  className="h-full bg-[color:var(--accent)] transition-[width] duration-700"
                  style={{ width: `${strategy.score}%` }}
                />
              </div>
              <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] max-w-[620px]">
                Fort potentiel de croissance identifie sur {strategy.piliers.length} leviers
                prioritaires. Estimations indicatives basees sur notre portefeuille clients.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)] mb-3">
                  Leads qualifies
                </div>
                <div className="text-[32px] md:text-[40px] leading-none font-semibold text-[color:var(--accent)] tracking-tight">
                  {strategy.leadsGain}
                </div>
                <div className="mt-2 text-[12px] text-[color:var(--ink-muted)]">
                  Gain attendu sur 6 mois
                </div>
              </div>
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)] mb-3">
                  CAC
                </div>
                <div className="text-[32px] md:text-[40px] leading-none font-semibold text-[color:var(--ink)] tracking-tight">
                  {strategy.cac}
                </div>
                <div className="mt-2 text-[12px] text-[color:var(--ink-muted)]">
                  Reduction du cout d&apos;acquisition
                </div>
              </div>
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--ink-muted)] mb-3">
                  Premiers resultats
                </div>
                <div className="text-[32px] md:text-[40px] leading-none font-semibold text-[color:var(--ink)] tracking-tight">
                  {strategy.delay}
                </div>
                <div className="mt-2 text-[12px] text-[color:var(--ink-muted)]">
                  Apres kick-off
                </div>
              </div>
            </div>

            {/* Piliers */}
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Plan d&apos;action recommande</span>
              </div>
              <ul className="space-y-4">
                {strategy.piliers.map((p) => (
                  <li key={p.label} className="flex gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[color:var(--accent)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[15px] font-semibold text-[color:var(--ink)]">
                        {p.label}
                      </div>
                      <div className="mt-1 text-[13px] leading-relaxed text-[color:var(--ink-muted)]">
                        {p.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-6 lg:p-8">
              <h3 className="text-[22px] md:text-[28px] font-semibold text-[color:var(--ink)] tracking-tight">
                Recevez votre plan d&apos;action detaille sous 24h.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] max-w-[680px]">
                Reservez un appel stratege avec Wladimir Delcros (30 min, gratuit) et recevez
                un audit personnalise base sur vos reponses.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/audit"
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}
                >
                  Reserver mon audit offert
                  <ArrowRight size={14} className="text-black light:text-white" />
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  Refaire la simulation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
