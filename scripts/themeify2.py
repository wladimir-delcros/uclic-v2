#!/usr/bin/env python3
"""Pass 2: remaining hardcoded colors."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIRS = [ROOT / 'src/components/landing', ROOT / 'src/components/ui', ROOT / 'src/components/home']

REPLACEMENTS = [
    # Bare text-white (only when not in a className context mixing with bg-green etc)
    # These are all in dark-surface contexts where text needs to be "ink"
    (r"'text-white'", "'text-[color:var(--ink)]'"),
    (r'"text-white"', '"text-[color:var(--ink)]"'),
    (r'(?<=[\s`"\'])text-white(?=[\s"\'`])', 'text-[color:var(--ink)]'),

    # hover:text-white -> ink
    (r'hover:text-white(?![-/])', 'hover:text-[color:var(--ink)]'),

    # bg-white/15, bg-white/30 (small decorative accents) -> ink-dim
    (r'bg-white/15(?!\d)', 'bg-[color:var(--border-strong)]'),
    (r'bg-white/30(?!\d)', 'bg-[color:var(--ink-dim)]'),

    # Accent rgba -> color-mix
    # Keep shadows using rgba(107,255,149,X) since they're brand glow — acceptable in light too.
    # But blur bg tints should be theme-aware:
    (r'bg-\[#0a0706\]', 'bg-[color:var(--bg)]'),

    # Common black-ish fills in Dashboard
    (r'ring-\[#0a0706\]', 'ring-[color:var(--bg)]'),
    (r'ring-2 ring-\[#0a0706\]', 'ring-2 ring-[color:var(--bg)]'),
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
