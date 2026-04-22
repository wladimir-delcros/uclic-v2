'use client';

type Variant = 'medium' | 'full';

/**
 * Réutilise l'ambiance visuelle du Hero (grid + halos + noise) dans les autres
 * sections, avec intensité paramétrable pour ne pas surcharger.
 *
 * - `medium` : grid + 1 halo accent + noise → sections à enjeu (Offre, Tarifs...)
 * - `full`   : grid + 2 halos + conic-glow + particles + noise → sections conversion
 */
export default function SectionAmbience({ variant = 'medium' }: { variant?: Variant }) {
  return (
    <>
      {/* Grille décorative subtile */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none -z-10" />

      {/* Halo accent (côté gauche) — toujours présent */}
      <div className="halo absolute -left-40 top-20 opacity-60 pointer-events-none -z-10" />

      {variant === 'full' && (
        <>
          {/* 2e halo + conic-glow + particles pour les sections "conversion" */}
          <div
            className="halo absolute -right-40 bottom-20 opacity-50 pointer-events-none -z-10"
            style={{ animationDelay: '4s' }}
          />
          <div className="halo-teal absolute left-1/3 top-1/2 opacity-40 pointer-events-none -z-10" />
          <div className="conic-glow absolute left-1/2 -translate-x-1/2 top-1/4 opacity-40 pointer-events-none -z-10" />
          <div className="particles absolute inset-0 opacity-40 pointer-events-none -z-10" />
        </>
      )}

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-50 pointer-events-none -z-10" />
    </>
  );
}
