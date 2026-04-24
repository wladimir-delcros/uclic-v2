'use client';

import { useMemo, useState } from 'react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { sampleSizeForMde } from '@/lib/stats';

function fmtInt(n: number): string {
  if (!Number.isFinite(n)) {return '—';}
  return new Intl.NumberFormat('fr-FR').format(Math.ceil(n));
}

function fmtPct(n: number, digits = 2): string {
  return `${(n * 100).toFixed(digits)}%`;
}

export default function MDECalculatorClient() {
  const [baselinePct, setBaselinePct] = useState('4.0');
  const [mdePct, setMdePct] = useState('10');
  const [alpha, setAlpha] = useState('0.05');
  const [power, setPower] = useState('0.80');
  const [dailyVisitors, setDailyVisitors] = useState('1000');

  const result = useMemo(() => {
    const baseline = parseFloat(baselinePct) / 100;
    const mde = parseFloat(mdePct) / 100;
    const a = parseFloat(alpha);
    const pw = parseFloat(power);
    if (
      !(baseline > 0 && baseline < 1) ||
      !(mde > 0) ||
      !(a > 0 && a < 1) ||
      !(pw > 0 && pw < 1)
    ) {
      return null;
    }
    const res = sampleSizeForMde(baseline, mde, { alpha: a, power: pw, twoSided: true });
    return res;
  }, [baselinePct, mdePct, alpha, power]);

  const daysNeeded = useMemo(() => {
    const daily = parseInt(dailyVisitors, 10);
    if (!result || !Number.isFinite(daily) || daily <= 0) {return null;}
    return Math.ceil(result.totalSampleSize / daily);
  }, [result, dailyVisitors]);

  return (
    <>
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-24 lg:pb-32 overflow-hidden min-h-[80vh]">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[920px] mx-auto px-5 lg:px-10">
            <a
              href="/outils-gratuits"
              className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              ← Tous les outils gratuits
            </a>
            <div className="mt-4 inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Outil gratuit</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] leading-[1.1] font-semibold text-[color:var(--ink)] tracking-tight">
              Calculateur MDE — Taille d'échantillon
            </h1>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--ink-muted)] max-w-[680px]">
              Estimez le nombre de visiteurs nécessaires pour détecter un écart relatif
              donné (Minimum Detectable Effect) entre contrôle et variante.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 space-y-4">
                <Field
                  label="Taux de conversion baseline (%)"
                  value={baselinePct}
                  onChange={setBaselinePct}
                  step="0.1"
                  hint="Taux actuel du contrôle. Ex : 4% = 4.0."
                />
                <Field
                  label="MDE relatif (%)"
                  value={mdePct}
                  onChange={setMdePct}
                  step="1"
                  hint="Plus petit écart relatif que vous voulez détecter. 10% = passer de 4% à 4,4%."
                />
                <Field
                  label="Visiteurs / jour (total test)"
                  value={dailyVisitors}
                  onChange={setDailyVisitors}
                  step="100"
                  hint="Somme des deux groupes. Pour estimer la durée."
                />
              </div>
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-2">
                    Significativité (alpha)
                  </label>
                  <select
                    value={alpha}
                    onChange={(e) => setAlpha(e.target.value)}
                    className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-3 py-2 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50"
                  >
                    <option value="0.10">10% (confiance 90%)</option>
                    <option value="0.05">5% (confiance 95%)</option>
                    <option value="0.01">1% (confiance 99%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-2">
                    Puissance statistique
                  </label>
                  <select
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-3 py-2 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50"
                  >
                    <option value="0.80">80% (standard)</option>
                    <option value="0.90">90% (strict)</option>
                    <option value="0.95">95% (très strict)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-5 !rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-6 lg:p-8">
              {result ? (
                <>
                  <h2 className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-5">
                    Résultat
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <Metric
                      label="Par variante"
                      value={fmtInt(result.sampleSizePerVariant)}
                      suffix="visiteurs"
                    />
                    <Metric
                      label="Total (2 groupes)"
                      value={fmtInt(result.totalSampleSize)}
                      suffix="visiteurs"
                      accent
                    />
                    <Metric
                      label="Écart absolu détecté"
                      value={fmtPct(result.absoluteMde, 3)}
                    />
                    <Metric
                      label="Durée estimée"
                      value={daysNeeded != null ? fmtInt(daysNeeded) : '—'}
                      suffix={daysNeeded != null ? 'jours' : undefined}
                    />
                  </div>
                </>
              ) : (
                <p className="text-[14px] text-[color:var(--ink-muted)]">
                  Renseignez des valeurs valides (baseline entre 0% et 100%, MDE &gt; 0)
                  pour obtenir le résultat.
                </p>
              )}
            </div>

            <p className="mt-6 text-[12px] text-[color:var(--ink-muted)]/80 leading-relaxed">
              Formule : taille d'échantillon par variante pour un test z bilatéral sur
              deux proportions, avec puissance 1−β et significativité α. L'approximation
              normale est valide quand np ≥ 5 et n(1−p) ≥ 5.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-2">
        {label}
      </label>
      <input
        type="number"
        step={step || 'any'}
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[15px] text-[color:var(--ink)] tabular-nums focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
      />
      {hint ? (
        <p className="mt-1.5 text-[11.5px] text-[color:var(--ink-muted)]/80 leading-snug">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Metric({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-1">
        {label}
      </div>
      <div
        className={`text-[22px] md:text-[26px] font-semibold leading-tight tabular-nums ${
          accent ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
        }`}
      >
        {value}
        {suffix ? (
          <span className="ml-1.5 text-[12px] font-normal text-[color:var(--ink-muted)] tracking-normal normal-case">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}
