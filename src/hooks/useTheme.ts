'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(readStoredTheme());
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
  }, []);

  return { theme, setTheme, resolvedTheme: theme, mounted };
}

/**
 * Inline script injected in <head> (layout.tsx) to apply the stored theme
 * BEFORE React hydrates — prevents FOUC flash on page load.
 * Mirror of the default branch in readStoredTheme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var c=t==='light'?'light':'dark';var r=document.documentElement;r.classList.add(c);r.style.colorScheme=c;}catch(e){}})();`;
