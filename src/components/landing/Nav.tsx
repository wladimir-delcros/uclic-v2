'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Offre',     href: '#offre'   },
  { label: 'Équipe',    href: '#equipe'  },
  { label: 'Méthode',   href: '#methode' },
  { label: 'Résultats', href: '#preuve'  },
  { label: 'Tarifs',    href: '#tarifs'  },
  { label: 'FAQ',       href: '#faq'     },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Observe .light class on <html> for theme changes
    const syncTheme = () => setIsLight(document.documentElement.classList.contains('light'));
    syncTheme();
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  // Fond solide full-width + border-bottom franche (brutaliste).
  const headerStyle: React.CSSProperties = {
    background: isLight ? '#FAFAF5' : '#060403',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    borderBottom: isLight
      ? '1px solid rgba(10, 8, 7, 0.08)'
      : '1px solid rgba(255, 255, 255, 0.08)',
  };

  return (
    <header
      className={`header-blur top-0 inset-x-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}
      style={headerStyle}>
      <div className="max-w-[1200px] mx-auto px-0 h-[72px] lg:grid lg:grid-cols-[1fr_auto_1fr] flex items-stretch justify-between relative">
        <a href="/" className="flex items-center shrink-0 px-5 lg:px-10 lg:justify-self-start" aria-label="uclic.fr">
          <Image src="/logo.svg" alt="uclic" width={132} height={38} priority className="h-9 w-auto logo-themed" />
        </a>

        <nav className="hidden lg:flex lg:justify-self-center h-full">
          <ul className="grid grid-cols-6 h-full">
            {links.map((l) => (
              <li key={l.href} className="flex items-stretch border-r border-[color:var(--border-subtle)] last:border-r-0">
                <a href={l.href}
                   className="group/link relative flex items-center justify-center w-full px-4 text-[12px] font-medium uppercase tracking-[0.14em] text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
                  <span className="relative">
                    {l.label}
                    <span aria-hidden="true" className="absolute left-0 -bottom-1 h-px w-full bg-[color:var(--accent)] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 pl-5 pr-5 lg:pr-10 lg:justify-self-end">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
            style={{
              background:
                'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
            }}>
            <PlayCircle size={14} className="text-black light:text-white" />
            Audit offert
          </a>
        </div>
      </div>
    </header>
  );
}
