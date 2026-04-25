'use client';

import { Plus } from 'lucide-react';

type Item = { q: string; a: string };

export default function AuditFaq({ items }: { items: Item[] }) {
  return (
    <div className="mt-12 !rounded-none overflow-hidden border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white">
      {items.map((f, i) => (
        <details key={f.q} className="group">
          <summary
            className={`px-7 lg:px-9 py-5 lg:py-6 flex items-center justify-between gap-6 cursor-pointer list-none ${
              i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
            } hover:bg-[color:var(--card)]`}>
            <span className="text-[15.5px] font-medium pr-4 leading-snug">{f.q}</span>
            <Plus
              size={18}
              strokeWidth={2}
              className="text-[color:var(--accent)] transition-transform duration-300 group-open:rotate-45 shrink-0"
            />
          </summary>
          <div className="px-7 lg:px-9 pb-6 pt-1 text-[14.5px] text-[color:var(--ink-muted)] leading-[1.65] max-w-[780px]">
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );
}
