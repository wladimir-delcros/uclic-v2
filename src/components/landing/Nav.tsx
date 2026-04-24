'use client';

import { ChevronDown, Menu, PlayCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import DesktopDropdown from '@/components/nav/DesktopDropdown';
import DesktopMegaPanel from '@/components/nav/DesktopMegaPanel';
import MobilePanel from '@/components/nav/MobilePanel';
import { headerCTA, mainNav } from '@/components/nav/navData';
import ThemeToggle from './ThemeToggle';

type OpenPanel = 'expertises' | 'ressources' | null;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);

  // Scroll hide/show + scrolled state
  useEffect(() => {
    let lastY = window.scrollY;
    const threshold = 1800;
    const delta = 16;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y < threshold) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (Math.abs(y - lastY) < delta) return;
      if (y > lastY) setHidden(true);
      else setHidden(false);
      lastY = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const syncTheme = () => setIsLight(document.documentElement.classList.contains('light'));
    syncTheme();
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  // Close any open panel / mobile menu on route change
  useEffect(() => {
    setOpenPanel(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close on escape (desktop panels)
  useEffect(() => {
    if (!openPanel) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && setOpenPanel(null);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [openPanel]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenPanel(null), 120);
  }, [clearCloseTimer]);

  const openNow = useCallback(
    (panel: OpenPanel) => {
      clearCloseTimer();
      setOpenPanel(panel);
    },
    [clearCloseTimer]
  );

  const headerStyle: React.CSSProperties = {
    background: isLight ? '#FAFAF5' : '#060403',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    borderBottom: isLight
      ? '1px solid rgba(10, 8, 7, 0.08)'
      : '1px solid rgba(255, 255, 255, 0.08)',
    transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: 'transform',
  };

  return (
    <>
      <header
        className={`header-blur top-0 inset-x-0 z-50 h-[64px] ${scrolled ? 'is-scrolled' : ''}`}
        style={headerStyle}
        onMouseLeave={scheduleClose}>
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-5 lg:px-10 relative">
          <div className="flex items-center gap-10 min-w-0">
            <a href="/" className="flex items-center shrink-0" aria-label="uclic.fr">
              <img
                src="/logo.svg"
                alt="uclic"
                width={132}
                height={38}
                fetchPriority="high"
                decoding="async"
                className="h-9 w-auto logo-themed"
              />
            </a>

            {/* Desktop nav */}
            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {mainNav.map((item) => {
                  if (item.kind === 'link') {
                    return (
                      <li key={item.href} onMouseEnter={scheduleClose}>
                        <a
                          href={item.href}
                          className="group/link relative inline-flex items-center text-[14px] font-[450] text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
                          <span className="relative">
                            {item.label}
                            <span
                              aria-hidden="true"
                              className="absolute left-0 -bottom-1 h-px w-full bg-[color:var(--accent)] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out"
                            />
                          </span>
                        </a>
                      </li>
                    );
                  }

                  const panelId: OpenPanel = item.id as OpenPanel;
                  const isActive = openPanel === panelId;
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openNow(panelId)}>
                      <button
                        type="button"
                        onClick={() => setOpenPanel(isActive ? null : panelId)}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        className="group/link relative inline-flex items-center gap-1 text-[14px] font-[450] text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
                        <span className="relative">
                          {item.label}
                          <span
                            aria-hidden="true"
                            className={`absolute left-0 -bottom-1 h-px bg-[color:var(--accent)] origin-left transition-transform duration-300 ease-out w-full ${
                              isActive ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'
                            }`}
                          />
                        </span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <a
              href={headerCTA.href}
              className="hidden sm:inline-flex items-center gap-2 px-4 h-8 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
              style={{
                background:
                  'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
              }}>
              <PlayCircle size={14} className="text-black light:text-white" />
              {headerCTA.label}
            </a>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden shrink-0 w-11 h-11 grid place-items-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--surface)]/40 text-[color:var(--ink)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/50 transition-colors">
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {/* Desktop panels */}
          <DesktopMegaPanel
            isOpen={openPanel === 'expertises'}
            onClose={() => setOpenPanel(null)}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          />
          <DesktopDropdown
            isOpen={openPanel === 'ressources'}
            onClose={() => setOpenPanel(null)}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          />
        </div>
      </header>

      {/* Mobile drawer */}
      <MobilePanel isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
