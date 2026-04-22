'use client';
/**
 * HorizonLine — a pair of horizontal accent hairlines that reach from the
 * viewport edges toward a centered element (typically a section's h2), each
 * line fading from transparent at the edge to `var(--accent)` near the middle
 * and terminated by a small glowing dot.
 *
 * Sits as an absolute decorative layer inside a `relative` parent. Parent is
 * expected to define a horizontal gutter (`gap`) where the title breathes —
 * the lines stop at `--horizon-gap` from the center.
 */
export default function HorizonLine({
  gap = 280,
  offsetY,
  className = '',
}: {
  /** Half-width of the clear space reserved at center (px). */
  gap?: number;
  /** Vertical offset from the top of the parent (px). If omitted, centered vertically. */
  offsetY?: number;
  className?: string;
}) {
  const centered = offsetY === undefined;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 flex items-center justify-between ${className}`}
      style={
        centered
          ? { top: '50%', transform: 'translateY(-50%)' }
          : { top: offsetY }
      }>
      {/* left line */}
      <div className="relative flex-1 h-px" style={{ marginRight: gap }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, transparent 0%, color-mix(in srgb, var(--accent) 0%, transparent) 20%, color-mix(in srgb, var(--accent) 70%, transparent) 100%)',
          }}
        />
        {/* dot at right end */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 block w-1 h-1 rounded-full bg-[color:var(--accent)]" />
        <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 block w-3 h-3 rounded-full bg-[color:var(--accent)]/60 blur-md" />
      </div>
      {/* right line */}
      <div className="relative flex-1 h-px" style={{ marginLeft: gap }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, transparent 0%, color-mix(in srgb, var(--accent) 0%, transparent) 20%, color-mix(in srgb, var(--accent) 70%, transparent) 100%)',
          }}
        />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 block w-1 h-1 rounded-full bg-[color:var(--accent)]" />
        <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 block w-3 h-3 rounded-full bg-[color:var(--accent)]/60 blur-md" />
      </div>
    </div>
  );
}
