import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * CTAButton — composant CTA canonique du site uclic V2.
 *
 * La DA de référence est celle du CTA du Nav (header — `headerCTA` dans
 * `components/nav/navData.ts`). Toute la DA est construite autour de ce motif :
 *   - fond : radial-gradient blanc sur `var(--accent)`
 *   - texte : noir en mode dark, blanc en mode light (`text-black light:text-white`)
 *   - radius : `rounded-md` (6px)
 *   - police : Inter semibold
 *   - interaction : `hover:scale-[1.02]` + transition transform
 *
 * Variants :
 *   - `primary` (défaut) : accent plein (canon Nav) — CTA principal.
 *   - `secondary`        : ghost bordé accent — CTA secondaire.
 *   - `ghost`            : texte accent inline — "lire la suite", "en savoir plus".
 *
 * Sizes :
 *   - `sm` : height 32px (canon Nav — desktop header)
 *   - `md` : py-3 px-5 (canon inner page / hero secondary)
 *   - `lg` : py-3.5 px-7 (canon Hero / CtaFinal landing)
 *
 * Usage :
 *   <CTAButton href="/audit" icon={PlayCircle}>Audit offert</CTAButton>
 *   <CTAButton href="/contact" variant="secondary" size="md">Nous contacter</CTAButton>
 *   <CTAButton variant="ghost" href="/blog">Lire l’article</CTAButton>
 */

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  icon?: IconComponent;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  fullWidth?: boolean;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
    onClick?: never;
    type?: never;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
    type?: 'button' | 'submit' | 'reset';
  };

type CTAButtonProps = AnchorProps | ButtonProps;

/** Radial-gradient canonique du CTA Nav — source unique de vérité. */
export const CTA_PRIMARY_BACKGROUND =
  'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)';

const BASE =
  'inline-flex items-center gap-2 rounded-md font-semibold transition-[transform,colors,opacity] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:opacity-60 disabled:pointer-events-none';

const SIZES: Record<Size, string> = {
  // Canon Nav desktop (header)
  sm: 'px-4 h-8 text-[13px]',
  // Canon inner-page hero (primary action)
  md: 'px-5 h-11 text-[13px]',
  // Canon Hero / CtaFinal landing
  lg: 'px-7 py-3.5 text-[14px]',
};

const VARIANTS: Record<Variant, string> = {
  primary: 'text-black light:text-white hover:scale-[1.02]',
  secondary:
    'border border-[color:var(--border-subtle)] text-[color:var(--ink)] hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)]',
  ghost:
    'text-[color:var(--accent)] hover:gap-2.5 px-0 h-auto py-0 rounded-none border-0 bg-transparent font-medium',
};

export default function CTAButton(props: CTAButtonProps) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    iconSize,
    fullWidth,
  } = props;

  const resolvedIconSize = iconSize ?? (size === 'lg' ? 16 : size === 'sm' ? 14 : 15);

  const classes = cn(
    BASE,
    variant !== 'ghost' && SIZES[size],
    VARIANTS[variant],
    fullWidth && 'w-full justify-center',
    className
  );

  const style =
    variant === 'primary'
      ? { background: CTA_PRIMARY_BACKGROUND }
      : undefined;

  const iconNode = Icon ? (
    <Icon
      size={resolvedIconSize}
      className={variant === 'primary' ? 'text-black light:text-white' : undefined}
    />
  ) : null;

  const content = (
    <>
      {iconNode && iconPosition === 'left' ? iconNode : null}
      <span>{children}</span>
      {iconNode && iconPosition === 'right' ? iconNode : null}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, icon: _i, iconPosition: _ip, iconSize: _is, fullWidth: _fw, children: _c, className: _cn, ...rest } =
      props as AnchorProps & { variant?: Variant; size?: Size };
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a href={href} className={classes} style={style} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} style={style} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, iconPosition: _ip, iconSize: _is, fullWidth: _fw, children: _c, className: _cn, type = 'button', ...rest } =
    props as ButtonProps;
  return (
    <button type={type} className={classes} style={style} {...rest}>
      {content}
    </button>
  );
}
