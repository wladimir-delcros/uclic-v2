'use client';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="glass-pill rounded-md inline-flex items-center justify-center w-9 h-9 text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors">
      {mounted ? (
        isDark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />
      ) : (
        <span className="w-[15px] h-[15px]" aria-hidden="true" />
      )}
    </button>
  );
}
