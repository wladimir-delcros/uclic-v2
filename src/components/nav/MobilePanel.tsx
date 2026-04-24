'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, PlayCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  accountLinks,
  contactPhone,
  expertiseColumns,
  headerCTA,
  mainNav,
  ressourceGroups,
} from './navData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const easing = [0.22, 1, 0.36, 1] as const;

export default function MobilePanel({ isOpen, onClose }: Props) {
  const [openSection, setOpenSection] = useState<'expertises' | 'ressources' | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on escape + focus initial on close button (minimal focus trap)
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 120);
    return () => {
      window.removeEventListener('keydown', h);
      window.clearTimeout(t);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            key="mobile-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="mobile-drawer"
            id="mobile-nav-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: easing }}
            className="fixed inset-y-0 right-0 z-[120] w-full sm:max-w-[420px] lg:hidden bg-[color:var(--surface)] border-l border-[color:var(--border-subtle)] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal">
            {/* Header */}
            <div className="flex items-center justify-between h-[64px] px-5 border-b border-[color:var(--border-subtle)] shrink-0">
              <a href="/" onClick={onClose} aria-label="uclic.fr" className="flex items-center">
                <img
                  src="/logo.svg"
                  alt="uclic"
                  width={110}
                  height={32}
                  className="h-8 w-auto logo-themed"
                />
              </a>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="w-11 h-11 grid place-items-center rounded-md text-[color:var(--ink)] hover:text-[color:var(--accent)] border border-[color:var(--border-strong)] hover:border-[color:var(--accent)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/50 transition-colors">
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-5 flex flex-col gap-1" aria-label="Navigation mobile">
                {mainNav.map((item) => {
                  if (item.kind === 'mega') {
                    const open = openSection === 'expertises';
                    return (
                      <div key="expertises" className="border-b border-[color:var(--border-subtle)]">
                        <button
                          type="button"
                          onClick={() => setOpenSection(open ? null : 'expertises')}
                          className="w-full flex items-center justify-between py-4 text-[15px] font-medium text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
                          aria-expanded={open}>
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              key="expertises-panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: easing }}
                              className="overflow-hidden">
                              <div className="pb-4 space-y-5">
                                {expertiseColumns.map((col) => (
                                  <div key={col.title}>
                                    <div className="flex items-center gap-2 text-[10.5px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-2">
                                      <span className="w-5 h-px bg-[color:var(--accent)]" />
                                      {col.title}
                                    </div>
                                    <ul className="flex flex-col">
                                      {col.items.map((x) => {
                                        const Icon = x.Icon;
                                        return (
                                          <li key={x.href}>
                                            <a
                                              href={x.href}
                                              onClick={onClose}
                                              className="group/m flex items-center gap-3 py-2.5 text-[14px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
                                              <span className="w-8 h-8 rounded-xl grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] group-hover/m:text-[color:var(--accent)] group-hover/m:border-[color:var(--accent)]/30 transition-colors">
                                                <Icon size={14} strokeWidth={1.75} />
                                              </span>
                                              <span className="flex-1">{x.label}</span>
                                              <ArrowUpRight size={14} className="opacity-60" />
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                                <a
                                  href="/expertise"
                                  onClick={onClose}
                                  className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all">
                                  Voir toutes les expertises
                                  <ArrowUpRight size={13} />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (item.kind === 'dropdown') {
                    const open = openSection === 'ressources';
                    return (
                      <div key="ressources" className="border-b border-[color:var(--border-subtle)]">
                        <button
                          type="button"
                          onClick={() => setOpenSection(open ? null : 'ressources')}
                          className="w-full flex items-center justify-between py-4 text-[15px] font-medium text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
                          aria-expanded={open}>
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              key="ressources-panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: easing }}
                              className="overflow-hidden">
                              <div className="pb-4 space-y-5">
                                {ressourceGroups.map((g) => (
                                  <div key={g.title}>
                                    <div className="flex items-center gap-2 text-[10.5px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-2">
                                      <span className="w-5 h-px bg-[color:var(--accent)]" />
                                      {g.title}
                                    </div>
                                    <ul>
                                      {g.items.map((x) => {
                                        const Icon = x.Icon;
                                        return (
                                          <li key={x.href}>
                                            <a
                                              href={x.href}
                                              onClick={onClose}
                                              className="group/m flex items-center gap-3 py-2.5 text-[14px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
                                              <span className="w-8 h-8 rounded-xl grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] group-hover/m:text-[color:var(--accent)] group-hover/m:border-[color:var(--accent)]/30 transition-colors">
                                                <Icon size={14} strokeWidth={1.75} />
                                              </span>
                                              <span className="flex-1">{x.label}</span>
                                              <ArrowUpRight size={14} className="opacity-60" />
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="py-4 text-[15px] font-medium text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors border-b border-[color:var(--border-subtle)]">
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* CTA stack */}
              <div className="p-5 flex flex-col gap-3 border-t border-[color:var(--border-subtle)]">
                <a
                  href={headerCTA.href}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[14px] font-semibold text-black light:text-white hover:scale-[1.01] transition-transform"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}>
                  <PlayCircle size={15} />
                  {headerCTA.label}
                </a>
                <a
                  href={contactPhone.href}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[13.5px] font-medium text-[color:var(--ink)] hover:text-[color:var(--accent)] border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/40 transition-colors">
                  <contactPhone.Icon size={14} strokeWidth={1.75} />
                  {contactPhone.label}
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={accountLinks.login.href}
                    onClick={onClose}
                    className="flex-1 text-center text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] py-2 border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/30 transition-colors">
                    {accountLinks.login.label}
                  </a>
                  <a
                    href={accountLinks.signup.href}
                    onClick={onClose}
                    className="flex-1 text-center text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] py-2 border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/30 transition-colors">
                    {accountLinks.signup.label}
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
