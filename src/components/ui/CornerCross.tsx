import type { CSSProperties } from 'react';

type Props = {
  size?: number;
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Decorative cross mark used at bento card corners & intersections.
 * Replaces the previous `rounded-full` dots across Hero, OffreSection, TarifsSection.
 *
 * `accent` = green (var(--accent)), otherwise theme-aware (var(--ink)).
 */
export default function CornerCross({ size = 14, accent = false, className, style }: Props) {
  const mid = size / 2;
  const colorClass = accent ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]';
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={style}
      className={`pointer-events-none ${colorClass} ${className ?? ''}`}
    >
      <path
        d={`M${mid} 0v${size}M0 ${mid}h${size}`}
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
