'use client';

import { useEffect, useState } from 'react';
import { UclicLogoSVG } from '@/components/ui/icons';

const navLinks = [
  { label: 'Processus', href: '#processus' },
  { label: 'Équipe', href: '#equipe' },
  { label: 'Résultats', href: '#resultats' },
  { label: 'Tarifs', href: '#tarifs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[color:var(--border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <div className="uclic-container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <UclicLogoSVG />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[rgba(245,245,241,0.6)] hover:text-[#F5F5F1] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#cta"
              className="uclic-btn-primary text-sm py-2 px-5"
            >
              Audit Gratuit
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-[#F5F5F1] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#F5F5F1] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#F5F5F1] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-[color:var(--border-subtle)] px-4 py-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-[rgba(245,245,241,0.7)] hover:text-[#F5F5F1] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="uclic-btn-primary text-sm mt-2 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Audit Gratuit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
