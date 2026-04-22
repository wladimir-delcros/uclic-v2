#!/usr/bin/env python3
"""
One-shot refactor: replace hardcoded Tailwind white/black opacities in landing + ui
components with semantic CSS variables so they cascade with the .light class.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIRS = [ROOT / 'src/components/landing', ROOT / 'src/components/ui', ROOT / 'src/components/home']

# Order matters: most specific first
REPLACEMENTS = [
    # Hardcoded surface colors
    (r'!bg-\[#15110F\]', '!bg-[color:var(--surface-raised)]'),
    (r'(?<![-\w])bg-\[#15110F\]', 'bg-[color:var(--surface-raised)]'),
    (r'(?<![-\w])bg-\[#0a0605\]', 'bg-[color:var(--bg)]'),
    (r'(?<![-\w])bg-\[#1a1512\]', 'bg-[color:var(--surface-raised)]'),

    # Card fills (from dimmest to brightest)
    (r'bg-white/\[0\.015\]', 'bg-[color:var(--card)]'),
    (r'bg-white/\[0\.02\]', 'bg-[color:var(--card)]'),
    (r'bg-white/\[0\.03\]', 'bg-[color:var(--card-elev-1)]'),
    (r'bg-white/\[0\.04\]', 'bg-[color:var(--card-elev-1)]'),
    (r'bg-white/\[0\.05\]', 'bg-[color:var(--card-elev-1)]'),
    (r'bg-white/\[0\.06\]', 'bg-[color:var(--card-elev-2)]'),
    (r'bg-white/\[0\.08\]', 'bg-[color:var(--card-elev-2)]'),
    (r'bg-white/5(?!\d)', 'bg-[color:var(--card-elev-1)]'),
    (r'bg-white/10(?!\d)', 'bg-[color:var(--card-elev-2)]'),

    # Borders
    (r'border-white/\[0\.06\]', 'border-[color:var(--border-subtle)]'),
    (r'border-white/\[0\.08\]', 'border-[color:var(--border-subtle)]'),
    (r'border-white/8(?!\d)', 'border-[color:var(--border-subtle)]'),
    (r'border-white/10(?!\d)', 'border-[color:var(--border-subtle)]'),
    (r'border-white/12(?!\d)', 'border-[color:var(--border-subtle)]'),
    (r'border-white/\[0\.16\]', 'border-[color:var(--border-strong)]'),
    (r'border-white/16(?!\d)', 'border-[color:var(--border-strong)]'),
    (r'border-white/20(?!\d)', 'border-[color:var(--border-strong)]'),

    # Text opacities -> muted / dim
    (r'text-white/80(?!\d)', 'text-[color:var(--ink-muted)]'),
    (r'text-white/85(?!\d)', 'text-[color:var(--ink-muted)]'),
    (r'text-white/90(?!\d)', 'text-[color:var(--ink-muted)]'),
    (r'text-white/75(?!\d)', 'text-[color:var(--ink-muted)]'),
    (r'text-white/70(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/65(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/60(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/55(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/50(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/45(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/40(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/35(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/30(?!\d)', 'text-[color:var(--ink-dim)]'),
    (r'text-white/25(?!\d)', 'text-[color:var(--ink-dim)]'),

    # Gradient stops used for dividers
    (r'via-white/10', 'via-[color:var(--border-subtle)]'),
    (r'via-white/\[0\.08\]', 'via-[color:var(--border-subtle)]'),
]

changed = []
for d in DIRS:
    if not d.exists():
        continue
    for f in d.glob('*.tsx'):
        text = f.read_text()
        new = text
        for pat, rep in REPLACEMENTS:
            new = re.sub(pat, rep, new)
        if new != text:
            f.write_text(new)
            changed.append(str(f.relative_to(ROOT)))

print(f'Rewrote {len(changed)} files:')
for c in changed:
    print('  -', c)
