/**
 * SectionDivider — hairline horizontale 1px sur toute la largeur.
 * Même gris subtil que le border-bottom du header (dark + light adaptés).
 *
 * Usage :
 *   <OffreSection />
 *   <SectionDivider />
 *   <DifferentSection />
 */
type Props = {
  /** Classes appliquées au wrapper. Override possible pour tuner la marge verticale. */
  className?: string;
};

export default function SectionDivider({ className = 'my-0' }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`w-full h-px bg-[color:var(--border-subtle)] ${className}`}
    />
  );
}
