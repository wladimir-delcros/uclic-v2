'use client';

import { useMemo, useState } from 'react';
import { sampleSizeForMde } from '@/lib/stats';

function fmtInt(n: number): string {
  if (!Number.isFinite(n)) {return '—';}
  return new Intl.NumberFormat('fr-FR').format(Math.ceil(n));
}

function fmtPct(n: number, digits = 2): string {
  return `${(n * 100).toFixed(digits)}%`;
}

/**
 * MDE Calculator — Minimum Detectable Effect / sample size estimator.
 * Self-contained client component (no Nav / Footer / Section wrapper).
 * Drop inside any page section.
 */
export default function MDECalculator() {
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
    return sampleSizeForMde(baseline, mde, { alpha: a, power: pw, twoSided: true });
  }, [baselinePct, mdePct, alpha, power]);

  const daysNeeded = useMemo(() => {
    const daily = parseInt(dailyVisitors, 10);
    if (!result || !Number.isFinite(daily) || daily <= 0) {return null;}
    return Math.ceil(result.totalSampleSize / daily);
  }, [result, dailyVisitors]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              className="w-full !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white px-3 py-2.5 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50"
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
              className="w-full !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white px-3 py-2.5 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50"
            >
              <option value="0.80">80% (standard)</option>
              <option value="0.90">90% (strict)</option>
              <option value="0.95">95% (très strict)</option>
            </select>
          </div>
          <p className="text-[11.5px] text-[color:var(--ink-muted)]/80 leading-relaxed pt-2">
            Recommandé : alpha 5%, puissance 80%. Standard de l&apos;industrie pour un A/B B2B.
          </p>
        </div>
      </div>

      <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-6 lg:p-8">
        {result ? (
          <>
            <h3 className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-5">
              Résultat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <Metric label="Par variante" value={fmtInt(result.sampleSizePerVariant)} suffix="visiteurs" />
              <Metric label="Total (2 groupes)" value={fmtInt(result.totalSampleSize)} suffix="visiteurs" accent />
              <Metric label="Écart absolu détecté" value={fmtPct(result.absoluteMde, 3)} />
              <Metric
                label="Durée estimée"
                value={daysNeeded !== null ? fmtInt(daysNeeded) : '—'}
                suffix={daysNeeded !== null ? 'jours' : undefined}
              />
            </div>
          </>
        ) : (
          <p className="text-[14px] text-[color:var(--ink-muted)]">
            Renseignez des valeurs valides (baseline entre 0% et 100%, MDE &gt; 0) pour obtenir le résultat.
          </p>
        )}
      </div>
    </div>
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
        className="w-full !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white px-4 py-3 text-[15px] text-[color:var(--ink)] tabular-nums focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
      />
      {hint ? (
        <p className="mt-1.5 text-[11.5px] text-[color:var(--ink-muted)]/80 leading-snug">{hint}</p>
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
      <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-1">{label}</div>
      <div
        className={`font-display tracking-[-0.02em] text-[26px] md:text-[30px] font-medium leading-tight tabular-nums ${
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
