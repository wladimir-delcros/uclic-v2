'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ressourceGroups } from './navData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function DesktopDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ressources-dropdown"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-full pt-3 z-40 hidden lg:block"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 flex">
            <div
              className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--surface)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden w-[560px] max-w-full ml-[180px]"
              role="menu"
              aria-label="Ressources">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)]/40 to-transparent" />
            <div className="grid grid-cols-2">
              {ressourceGroups.map((group, gIdx) => (
                <div
                  key={group.title}
                  className={`p-5 ${gIdx === 0 ? 'border-r border-[color:var(--border-subtle)]' : ''}`}>
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
                    <span className="w-5 h-px bg-[color:var(--accent)]" />
                    {group.title}
                  </div>
                  <ul className="flex flex-col">
                    {group.items.map((item) => {
                      const Icon = item.Icon;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={onClose}
                            className="group/item flex items-start gap-3 p-2.5 !rounded-none hover:bg-[color:var(--card-elev-1)] transition-colors">
                            <span className="shrink-0 w-8 h-8 rounded-xl grid place-items-center border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] text-[color:var(--ink-muted)] group-hover/item:text-[color:var(--accent)] group-hover/item:border-[color:var(--accent)]/30 transition-colors">
                              <Icon size={14} strokeWidth={1.75} />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-center justify-between gap-2">
                                <span className="text-[13.5px] font-medium text-[color:var(--ink)] group-hover/item:text-[color:var(--accent)] transition-colors">
                                  {item.label}
                                </span>
                                <ArrowUpRight
                                  size={12}
                                  className="shrink-0 text-[color:var(--ink-dim)] group-hover/item:text-[color:var(--accent)] group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 transition-all"
                                />
                              </span>
                              <span className="block mt-0.5 text-[12px] text-[color:var(--ink-dim)] leading-snug">
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
