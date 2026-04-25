'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { abTestStats } from '@/lib/stats';

function fmtPct(n: number, digits = 2): string {
  return `${(n * 100).toFixed(digits)}%`;
}

function fmtNum(n: number, digits = 3): string {
  if (!Number.isFinite(n)) {return '—';}
  return n.toFixed(digits);
}

/**
 * A/B Test Calculator — significativité, p-value, z-score, uplift, IC.
 * Self-contained client component (no Nav / Footer / Section wrapper).
 */
export default function ABTestCalculator() {
  const [controlVisitors, setControlVisitors] = useState('10000');
  const [controlConversions, setControlConversions] = useState('420');
  const [variantVisitors, setVariantVisitors] = useState('10000');
  const [variantConversions, setVariantConversions] = useState('480');
  const [alpha, setAlpha] = useState('0.05');
  const [twoSided, setTwoSided] = useState(true);

  const result = useMemo(() => {
    const cv = parseInt(controlVisitors, 10);
    const cc = parseInt(controlConversions, 10);
    const vv = parseInt(variantVisitors, 10);
    const vc = parseInt(variantConversions, 10);
    const a = parseFloat(alpha);
    if (
      !Number.isFinite(cv) ||
      !Number.isFinite(cc) ||
      !Number.isFinite(vv) ||
      !Number.isFinite(vc) ||
      cv <= 0 ||
      vv <= 0 ||
      cc < 0 ||
      vc < 0 ||
      cc > cv ||
      vc > vv ||
      !(a > 0 && a < 1)
    ) {
      return null;
    }
    try {
      return abTestStats(cv, cc, vv, vc, { twoSided, alpha: a });
    } catch {
      return null;
    }
  }, [controlVisitors, controlConversions, variantVisitors, variantConversions, alpha, twoSided]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Control */}
        <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6">
          <h3 className="text-[14px] font-semibold text-[color:var(--ink)] mb-4 uppercase tracking-[0.12em]">
            Contrôle (A)
          </h3>
          <div className="space-y-4">
            <Field label="Visiteurs" value={controlVisitors} onChange={setControlVisitors} />
            <Field label="Conversions" value={controlConversions} onChange={setControlConversions} />
          </div>
          <div className="mt-4 pt-4 border-t border-[color:var(--border-subtle)]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">Taux</div>
            <div className="font-display tracking-[-0.02em] text-[26px] md:text-[30px] font-medium text-[color:var(--ink)] tabular-nums">
              {result ? fmtPct(result.controlRate) : '—'}
            </div>
          </div>
        </div>

        {/* Variant */}
        <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-6">
          <h3 className="text-[14px] font-semibold text-[color:var(--accent)] mb-4 uppercase tracking-[0.12em]">
            Variante (B)
          </h3>
          <div className="space-y-4">
            <Field label="Visiteurs" value={variantVisitors} onChange={setVariantVisitors} />
            <Field label="Conversions" value={variantConversions} onChange={setVariantConversions} />
          </div>
          <div className="mt-4 pt-4 border-t border-[color:var(--accent)]/20">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">Taux</div>
            <div className="font-display tracking-[-0.02em] text-[26px] md:text-[30px] font-medium text-[color:var(--ink)] tabular-nums">
              {result ? fmtPct(result.variantRate) : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 flex flex-col sm:flex-row gap-5 sm:items-end">
        <div className="flex-1">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-2">
            Seuil alpha
          </label>
          <select
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
            className="w-full !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white px-3 py-2.5 text-[14px] text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--accent)]/50"
          >
            <option value="0.10">10% (90% confiance)</option>
            <option value="0.05">5% (95% confiance)</option>
            <option value="0.01">1% (99% confiance)</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-[13px] text-[color:var(--ink)] cursor-pointer">
          <input
            type="checkbox"
            checked={twoSided}
            onChange={(e) => setTwoSided(e.target.checked)}
            className="w-4 h-4 accent-[color:var(--accent)]"
          />
          Test bilatéral (recommandé)
        </label>
      </div>

      {/* Result */}
      <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-6 lg:p-8">
        {result ? (
          <>
            <div className="flex items-start gap-3 mb-5">
              {result.isSignificant ? (
                <CheckCircle2 size={28} className="text-[color:var(--accent)] shrink-0" />
              ) : (
                <XCircle size={28} className="text-[color:var(--ink-muted)] shrink-0" />
              )}
              <div>
                <div className="font-display tracking-[-0.02em] text-[24px] md:text-[28px] font-medium text-[color:var(--ink)] leading-tight">
                  {result.isSignificant ? 'Résultat significatif' : 'Pas encore significatif'}
                </div>
                <p className="mt-1 text-[14px] text-[color:var(--ink-muted)]">
                  {result.isSignificant
                    ? `L'écart observé est significatif au seuil ${fmtPct(parseFloat(alpha), 0)}.`
                    : `L'écart observé peut relever du hasard au seuil ${fmtPct(parseFloat(alpha), 0)}. Continuez le test.`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-[color:var(--accent)]/20">
              <Metric label="p-value" value={result.pValue < 0.0001 ? '< 0,0001' : fmtNum(result.pValue, 4)} />
              <Metric label="z-score" value={fmtNum(result.zScore, 3)} />
              <Metric
                label="Uplift"
                value={result.uplift >= 0 ? `+${fmtPct(result.uplift, 2)}` : fmtPct(result.uplift, 2)}
                accent={result.uplift > 0}
              />
              <Metric label="IC variante" value={`${fmtPct(result.ciLow, 2)} – ${fmtPct(result.ciHigh, 2)}`} />
            </div>
          </>
        ) : (
          <p className="text-[14px] text-[color:var(--ink-muted)]">
            Renseignez des valeurs valides pour obtenir un résultat. Les conversions doivent être ≤ visiteurs et tous les champs numériques positifs.
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-2">
        {label}
      </label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white px-4 py-3 text-[15px] text-[color:var(--ink)] tabular-nums focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
      />
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)] mb-1">{label}</div>
      <div
        className={`font-display tracking-[-0.02em] text-[20px] md:text-[24px] font-medium tabular-nums ${
          accent ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
