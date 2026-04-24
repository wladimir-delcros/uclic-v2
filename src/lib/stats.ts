/**
 * Minimal stats helpers for the free A/B-test & MDE calculators.
 * Pure TypeScript — no external dependency.
 */

/** Abramowitz-Stegun approximation of the error function (max error ~1.5e-7). */
export function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x >= 0 ? 1 : -1;
  const ax = Math.abs(x);
  const t = 1.0 / (1.0 + p * ax);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}

/** Standard normal cumulative distribution function. */
export function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

/** Inverse of the standard normal CDF (Beasley-Springer-Moro approximation). */
export function normalInverseCdf(p: number): number {
  if (p <= 0 || p >= 1) {throw new Error('p must be in (0, 1)');}
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= pHigh) {
    const q = p - 0.5;
    const r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
    ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

export interface PValueResult {
  zScore: number;
  pValue: number;
  isSignificant: boolean;
  controlRate: number;
  variantRate: number;
  uplift: number; // relative, e.g. 0.12 = +12%
  ciLow: number; // variant CI lower bound (absolute)
  ciHigh: number; // variant CI upper bound (absolute)
}

export function abTestStats(
  controlVisitors: number,
  controlConversions: number,
  variantVisitors: number,
  variantConversions: number,
  options: { twoSided?: boolean; alpha?: number } = {},
): PValueResult {
  const twoSided = options.twoSided ?? true;
  const alpha = options.alpha ?? 0.05;

  const pc = controlConversions / controlVisitors;
  const pv = variantConversions / variantVisitors;
  const pooled =
    (controlConversions + variantConversions) /
    (controlVisitors + variantVisitors);

  const se = Math.sqrt(
    pooled * (1 - pooled) * (1 / controlVisitors + 1 / variantVisitors),
  );
  const adjSe = se < 1e-10 ? 1e-10 : se;
  const z = (pv - pc) / adjSe;

  const pValue = twoSided
    ? 2 * (1 - normalCdf(Math.abs(z)))
    : z > 0
    ? 1 - normalCdf(z)
    : 1 - normalCdf(-z);

  const seVariant = Math.sqrt((pv * (1 - pv)) / variantVisitors);
  const zAlpha = normalInverseCdf(1 - alpha / 2);
  const ciLow = Math.max(0, pv - zAlpha * seVariant);
  const ciHigh = Math.min(1, pv + zAlpha * seVariant);

  return {
    zScore: z,
    pValue: Math.min(Math.max(pValue, 0), 1),
    isSignificant: pValue < alpha,
    controlRate: pc,
    variantRate: pv,
    uplift: pc > 0 ? (pv - pc) / pc : 0,
    ciLow,
    ciHigh,
  };
}

export interface MdeResult {
  sampleSizePerVariant: number;
  totalSampleSize: number;
  absoluteMde: number; // detectable change in rate (p2 - p1)
}

/**
 * Sample size per variant for detecting a given relative MDE between two
 * proportions (control = baseline, variant = baseline * (1 + mde)).
 * Uses the standard two-proportion z-test formula.
 */
export function sampleSizeForMde(
  baselineRate: number,
  relativeMde: number,
  options: { alpha?: number; power?: number; twoSided?: boolean } = {},
): MdeResult {
  const alpha = options.alpha ?? 0.05;
  const power = options.power ?? 0.8;
  const twoSided = options.twoSided ?? true;

  const p1 = baselineRate;
  const p2 = baselineRate * (1 + relativeMde);
  const pBar = (p1 + p2) / 2;

  const zAlpha = normalInverseCdf(1 - (twoSided ? alpha / 2 : alpha));
  const zBeta = normalInverseCdf(power);

  const numerator = Math.pow(
    zAlpha * Math.sqrt(2 * pBar * (1 - pBar)) +
      zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)),
    2,
  );
  const denominator = Math.pow(p2 - p1, 2);
  const n = denominator > 0 ? Math.ceil(numerator / denominator) : Infinity;

  return {
    sampleSizePerVariant: n,
    totalSampleSize: n * 2,
    absoluteMde: p2 - p1,
  };
}
