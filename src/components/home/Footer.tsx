import { UclicLogoSVG } from '@/components/ui/icons';

const navLinks = [
  { label: 'Processus', href: '#processus' },
  { label: 'Équipe', href: '#equipe' },
  { label: 'Résultats', href: '#resultats' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Audit Gratuit', href: '#cta' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-black py-12 md:py-16">
      <div className="uclic-container px-4 md:px-6">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">

          {/* Logo + tagline */}
          <div>
            <UclicLogoSVG className="mb-3" />
            <p className="text-sm text-[rgba(245,245,241,0.4)] max-w-xs">
              Growth sans bullshit. Résultats en 48h.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  link.label === 'Audit Gratuit'
                    ? 'text-[#E0FF5C] hover:text-[#cce84f]'
                    : 'text-[rgba(245,245,241,0.45)] hover:text-[rgba(245,245,241,0.8)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="uclic-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[rgba(245,245,241,0.25)]">
            © 2025 Uclic — Growth Marketing Squad Paris. Tous droits réservés.
          </p>
          <a
            href="https://www.linkedin.com/in/wladimirdelcros/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[rgba(245,245,241,0.3)] hover:text-[#E0FF5C] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            LinkedIn Wladimir
          </a>
        </div>
      </div>
    </footer>
  );
}
