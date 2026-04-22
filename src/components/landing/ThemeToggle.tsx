'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? (resolvedTheme || theme) : 'dark';
  const isDark = current === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="glass-pill inline-flex items-center justify-center w-9 h-9 text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
      {mounted ? (
        isDark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />
      ) : (
        <span className="w-[15px] h-[15px]" aria-hidden="true" />
      )}
    </button>
  );
}
