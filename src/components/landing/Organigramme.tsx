'use client';
import { motion } from 'framer-motion';
import { Bot, Check, Code2 } from 'lucide-react';

/* N1 — Growth Experts (data réelle depuis uclic.fr/equipe) */
const growthLeads = [
  {
    name: 'Wladimir Delcros',
    role: 'Expert Growth Marketing',
    photo: '/team/wladimir.webp',
    seniority: '16 ans en startup',
    past: 'Ex-Head of Growth · Codingame & Muzzo',
  },
  {
    name: 'Alexis Christine-Amara',
    role: 'Expert Business Development',
    photo: '/team/alexis.webp',
    seniority: '16 ans en startup',
    past: 'Ex-Head of Sales · CodinGame · Cofounder',
  },
];

/* N2 — Équipe mixte : experts humains + dev fullstack + agents IA en production */
type Member =
  | {
      kind: 'channel';
      name: string;
      role: string;
      photo: string;
      color: string;
      certs: string[];
      agent: string;
    }
  | {
      kind: 'dev';
      name: string;
      role: string;
      photo: string;
      color: string;
      stack: string[];
    }
  | {
      kind: 'agent';
      name: string;
      role: string;
      stack: string[];
    };

const channels: Member[] = [
  { kind: 'channel', name: 'Théo Lambert',   role: 'SEO Lead',        photo: '/avatars/men-76.webp',  color: '#8E44AD', certs: ['Google', 'Semrush', 'Ahrefs'],   agent: 'SEO Writer IA' },
  { kind: 'channel', name: 'Anaïs Roux',     role: 'Paid Ads Lead',   photo: '/avatars/women-44.webp', color: '#0D7377', certs: ['Google', 'Meta', 'TikTok'],       agent: 'Bid Optimizer' },
  { kind: 'channel', name: 'Marc Fontaine',  role: 'Outbound · SDR',  photo: '/avatars/men-51.webp',  color: '#B57215', certs: ['LinkedIn', 'Lemlist', 'HubSpot'], agent: 'ICP Enricher' },
  { kind: 'channel', name: 'Sofia Perez',    role: 'Content & Brand', photo: '/avatars/women-68.webp', color: '#7B3FC4', certs: ['HubSpot', 'Notion', 'Webflow'],   agent: 'Content Assist' },
  { kind: 'dev',     name: 'Mathieu Lopez',  role: 'Dev Fullstack',   photo: '/avatars/men-32.webp',  color: '#6BFF95', stack: ['Next.js', 'Supabase', 'Python'] },
  { kind: 'agent',   name: 'Scoring IA',     role: 'Qualif leads auto',     stack: ['Claude', 'API'] },
  { kind: 'agent',   name: 'Outreach IA',    role: 'Séquences dynamiques',  stack: ['Claude', 'n8n'] },
  { kind: 'agent',   name: 'Insights IA',    role: 'Dashboard auto',        stack: ['Claude', 'GA4'] },
];

export default function Organigramme() {
  return (
    <div className="relative">
      {/* ── N1 · Growth Experts (2 cards compactes avec "+" connecteur) ── */}
      <div className="grid md:grid-cols-2 gap-3 max-w-[640px] mx-auto relative">
        {growthLeads.map((g, i) => (
          <motion.div key={g.name}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-surface !rounded-none p-3 relative !bg-[color:var(--bg)] !shadow-none border border-[color:var(--border-subtle)]">
            <div className={`flex items-center gap-2.5 ${i === 1 ? 'flex-row-reverse' : ''}`}>
              <img src={g.photo} alt={g.name} width={44} height={44} loading="lazy" decoding="async"
                   className="w-11 h-11 object-cover border border-[color:var(--border-subtle)] shrink-0" />
              <div className={`min-w-0 flex-1 ${i === 1 ? 'text-right' : ''}`}>
                <div className="text-[15px] font-display font-medium truncate leading-tight">{g.name}</div>
                <div className="text-[12.5px] text-[color:var(--ink-muted)] truncate mt-0.5">{g.role}</div>
              </div>
            </div>
            <div className={`mt-2.5 pt-2.5 border-t border-[color:var(--border-subtle)] text-[12px] text-[color:var(--ink-dim)] leading-snug ${i === 1 ? 'text-right' : ''}`}>
              {g.past}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Ligne de pilotage (N1 pilote N2) ── */}
      <div className="relative mt-6 mb-4" aria-hidden="true">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[color:var(--accent)]/50 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-3 bg-white dark:bg-[color:var(--bg)] text-[11.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)] inline-flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1 h-1 bg-[color:var(--accent)]" />
          pilotent des experts freelance
          <span className="w-1 h-1 bg-[color:var(--accent)]" />
        </div>
      </div>

      {/* ── Bandeau "Communication fluide" — miroir positif du "0 communication" ── */}
      <div className="relative mb-4 flex items-center justify-center gap-2 py-2 px-3 border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/[0.06]">
        <Check size={13} strokeWidth={2.8} className="text-[color:var(--accent)]" />
        <span className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] font-semibold">
          Communication fluide entre eux
        </span>
        <Check size={13} strokeWidth={2.8} className="text-[color:var(--accent)]" />
      </div>

      {/* ── N2 · Équipe mixte : experts + dev fullstack + agents IA ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {channels.map((c) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="card-surface !rounded-none p-2.5 flex flex-col items-center text-center !bg-[color:var(--bg)] !shadow-none border border-[color:var(--border-subtle)] relative">
            {c.kind === 'agent' ? (
              <>
                {/* Agent IA — pas de photo, icône Bot large */}
                <div className="w-12 h-12 grid place-items-center bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] shrink-0">
                  <Bot size={22} className="text-[color:var(--ink-muted)]" strokeWidth={2.2} />
                </div>
                <div className="mt-2 text-[15px] font-medium truncate w-full leading-tight">{c.name}</div>
                <div className="text-[13px] text-[color:var(--ink-muted)] truncate w-full mt-0.5">{c.role}</div>
                <div className="mt-2 flex flex-nowrap justify-center gap-1 w-full">
                  {c.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11.5px] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-2 py-0.5 whitespace-nowrap leading-tight">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Footer : structure unifiée (icon box + label + value) */}
                <div className="mt-2.5 pt-3 w-full border-t border-dashed border-[color:var(--border-subtle)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 grid place-items-center bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] shrink-0">
                      <Check size={15} className="text-[color:var(--accent)]" strokeWidth={2.4} />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-[12px] font-mono uppercase tracking-wider text-[color:var(--ink-dim)] leading-none flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[color:var(--accent)] pulse-soft" />
                        En production
                      </div>
                      <div className="text-[15px] font-medium text-[color:var(--ink)] truncate leading-tight mt-1">
                        24/7
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Expert / Dev — photo + role + certs|stack + footer spécifique */}
                <div className="relative shrink-0">
                  <img src={c.photo} alt={c.name} width={40} height={40} loading="lazy" decoding="async"
                       className="w-10 h-10 object-cover border border-[color:var(--border-subtle)]" />
                </div>
                <div className="mt-1.5 text-[13.5px] font-medium truncate w-full leading-tight">{c.name}</div>
                <div className="text-[12px] text-[color:var(--ink-muted)] truncate w-full">{c.role}</div>
                <div className="mt-1.5 flex flex-nowrap justify-center gap-1 w-full">
                  {(c.kind === 'dev' ? c.stack : c.certs).map((t) => (
                    <span
                      key={t}
                      className="text-[11.5px] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-2 py-0.5 whitespace-nowrap leading-tight">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer : structure unifiée (icon box + label + value) */}
                <div className="mt-2.5 pt-3 w-full border-t border-dashed border-[color:var(--border-subtle)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 grid place-items-center bg-[color:var(--card-elev-1)] border border-[color:var(--border-subtle)] shrink-0">
                      {c.kind === 'channel' ? (
                        <Bot size={15} className="text-[color:var(--ink-muted)]" />
                      ) : (
                        <Code2 size={15} className="text-[color:var(--accent)]" strokeWidth={2.4} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-[12px] font-mono uppercase tracking-wider text-[color:var(--ink-dim)] leading-none">
                        {c.kind === 'channel' ? '+ Agent IA' : 'Dev fullstack'}
                      </div>
                      <div className="text-[15px] font-medium text-[color:var(--ink)] truncate leading-tight mt-1">
                        {c.kind === 'channel' ? c.agent : 'Apps sur-mesure'}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Verdict bas · miroir positif du verdict "sans uclic" ── */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <Check size={12} strokeWidth={2.6} className="text-[color:var(--accent)]" /> vision 360°
        </span>
        <span className="w-1 h-1 bg-[color:var(--ink-dim)]" />
        <span>1 pilote</span>
        <span className="w-1 h-1 bg-[color:var(--ink-dim)]" />
        <span>agents IA en production</span>
      </div>
    </div>
  );
}
