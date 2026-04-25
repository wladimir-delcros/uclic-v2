'use client';

import { useState, type ComponentType } from 'react';
import { Link2, Check, Share2 } from 'lucide-react';

/* Inline social SVGs — lucide 1.8.0 ne fournit pas les logos de marques. */
const Linkedin: ComponentType<{ size?: number; strokeWidth?: number; className?: string }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);
const Twitter: ComponentType<{ size?: number; strokeWidth?: number; className?: string }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const Facebook: ComponentType<{ size?: number; strokeWidth?: number; className?: string }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.061C22 6.504 17.523 2 12 2S2 6.504 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.493-3.916 3.777-3.916 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.89h2.773l-.443 2.909h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939z" />
  </svg>
);
const MessageCircle: ComponentType<{ size?: number; strokeWidth?: number; className?: string }> = ({ size = 16 }) => (
  /* WhatsApp mark */
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
  </svg>
);

interface Props {
  url: string;
  title: string;
  variant?: 'sidebar' | 'inline';
}

/**
 * Boutons de partage social.
 * - `sidebar` : stack vertical dans la barre latérale (default)
 * - `inline`  : row horizontale (utile en fin d'article)
 * Tous les events GA passent par `data-ga-event="cta_click"`.
 */
export default function ShareButtons({ url, title, variant = 'sidebar' }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const networks = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: Twitter,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      Icon: MessageCircle,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencieux — certains navigateurs bloquent clipboard sans interaction
    }
  };

  const tryNativeShare = async () => {
    const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { share?: (d: ShareData) => Promise<void> }) : null;
    if (nav?.share) {
      try {
        await nav.share({ title, url });
      } catch {
        /* user cancel */
      }
    }
  };

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-dim)] mr-2">
          Partager
        </span>
        {networks.map((n) => (
          <a
            key={n.name}
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Partager sur ${n.name}`}
            className="inline-flex items-center justify-center w-9 h-9 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors"
            data-ga-event="cta_click"
            data-ga-cta-name={`share-${n.name}`}
            data-ga-cta-location="article-footer"
          >
            <n.Icon size={15} strokeWidth={1.75} />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copier le lien"
          className="inline-flex items-center justify-center w-9 h-9 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors"
        >
          {copied ? <Check size={15} strokeWidth={2} /> : <Link2 size={15} strokeWidth={1.75} />}
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[color:var(--border-subtle)] !rounded-none bg-[#141211] light:bg-white p-5">
      <div className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--accent)] mb-4">
        <span className="w-4 h-px bg-[color:var(--accent)]" />
        Partager
      </div>
      <ul className="space-y-2">
        {networks.map((n) => (
          <li key={n.name}>
            <a
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] transition-colors"
              data-ga-event="cta_click"
              data-ga-cta-name={`share-${n.name}`}
              data-ga-cta-location="article-sidebar"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/30 transition-colors">
                <n.Icon size={14} strokeWidth={1.75} />
              </span>
              <span>{n.name}</span>
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copyLink}
            className="group flex items-center gap-3 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] transition-colors w-full text-left"
          >
            <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/30 transition-colors">
              {copied ? <Check size={14} strokeWidth={2} /> : <Link2 size={14} strokeWidth={1.75} />}
            </span>
            <span>{copied ? 'Lien copié' : 'Copier le lien'}</span>
          </button>
        </li>
        {/* Native share (mobile PWA) — affiché seulement si l'API est dispo au runtime */}
        <li className="hidden [@supports(not_(selector(*)))]:block">
          {/* placeholder — on active dynamiquement via JS */}
        </li>
        <li>
          <button
            type="button"
            onClick={tryNativeShare}
            className="group flex items-center gap-3 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] transition-colors w-full text-left lg:hidden"
          >
            <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/30 transition-colors">
              <Share2 size={14} strokeWidth={1.75} />
            </span>
            <span>Autre app…</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
