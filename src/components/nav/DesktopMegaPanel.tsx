'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { expertiseColumns } from './navData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function DesktopMegaPanel({ isOpen, onClose, onMouseEnter, onMouseLeave }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mega-panel"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-full pt-3 z-40 hidden lg:block"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div
              className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--surface)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden"
              role="menu"
              aria-label="Expertises">
              {/* Filet top accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)]/40 to-transparent" />

              <div className="grid md:grid-cols-3 items-stretch relative">
                {expertiseColumns.map((col, colIdx) => (
                  <div
                    key={col.title}
                    className={`p-7 flex flex-col ${
                      colIdx < expertiseColumns.length - 1 ? 'md:border-r border-[color:var(--border-subtle)]' : ''
                    }`}>
                    <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-5">
                      <span className="w-6 h-px bg-[color:var(--accent)]" />
                      {col.title}
                    </div>

                    <ul className="flex flex-col gap-1.5">
                      {col.items.map((item) => {
                        const Icon = item.Icon;
                        return (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              onClick={onClose}
                              className="group/item flex items-start gap-3 p-3 !rounded-none border border-transparent hover:border-[color:var(--border-subtle)] hover:bg-[color:var(--card-elev-1)] transition-colors">
                              <span className="shrink-0 w-9 h-9 rounded-xl grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] group-hover/item:text-[color:var(--accent)] group-hover/item:border-[color:var(--accent)]/30 transition-colors">
                                <Icon size={16} strokeWidth={1.75} />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="flex items-center justify-between gap-2">
                                  <span className="text-[14px] font-medium text-[color:var(--ink)] group-hover/item:text-[color:var(--accent)] transition-colors">
                                    {item.label}
                                  </span>
                                  <ArrowUpRight
                                    size={13}
                                    className="shrink-0 text-[color:var(--ink-dim)] group-hover/item:text-[color:var(--accent)] group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 transition-all"
                                  />
                                </span>
                                <span className="block mt-0.5 text-[12.5px] text-[color:var(--ink-dim)] leading-snug">
                                  {item.tagline}
                                </span>
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer CTA row */}
              <div className="border-t border-[color:var(--border-subtle)] px-7 py-4 flex items-center justify-between gap-4 bg-[color:var(--card-elev-1)]">
                <span className="text-[12.5px] text-[color:var(--ink-muted)]">
                  Besoin d’un avis senior sur votre stack growth&nbsp;?
                </span>
                <a
                  href="/audit"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[color:var(--accent)] hover:gap-2.5 transition-all">
                  Demander un audit offert
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
