'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AlertTriangle, X, Megaphone, Search, Mail, BarChart3, Zap } from 'lucide-react';

/* ── AVANT — Version réaliste pour scale-up B2B ──
   N1 = 1 Head of Marketing senior (seul, débordé) + 1 Founder qui doit s'en mêler
   Ligne = "pilotent 4 agences épars"
   N2 = 8 exécutants éclatés : 2 Agence Meta · 2 Agence SEO · 1 freelance outbound · 1 freelance email · 1 interne Ops (n8n bricolé) · 1 freelance data
   Tout est senior ou mid, mais déconnecté. Pas de caricature stagiaires. */

const clientSide = [
  {
    name: 'Sarah B.',
    role: 'Head of Marketing',
    detail: '7 ans d\'exp · solo · multi-hats',
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    seniority: 'Seule senior',
  },
  {
    name: 'Thomas L.',
    role: 'Founder · CEO',
    detail: 'Doit trancher les arbitrages marketing',
    photo: 'https://randomuser.me/api/portraits/men/14.jpg',
    seniority: 'Impliqué par défaut',
  },
];

type Exec = {
  name: string;
  role: string;
  photo: string;
  vendor: string;
  vendorIcon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  stack: string;
  level: string;
  stackColor: string;
};

type BrokenAI = { broken: true; name: string; role: string; vendor: string; stack: string; level: string };
type ExecItem = Exec | BrokenAI;

const execs: ExecItem[] = [
  { name: 'Rémi P.',      role: 'Media Buyer',     photo: 'https://randomuser.me/api/portraits/men/41.jpg',   vendor: 'Agence Meta',    vendorIcon: Megaphone, stack: 'Meta Ads',      stackColor: '#1877F2', level: 'Mid · 3 ans' },
  { name: 'Lina D.',      role: 'Creative Junior', photo: 'https://randomuser.me/api/portraits/women/18.jpg', vendor: 'Agence Meta',    vendorIcon: Megaphone, stack: 'Meta Creative', stackColor: '#1877F2', level: 'Alternant M2' },
  { name: 'Julien M.',    role: 'SEO Consultant',  photo: 'https://randomuser.me/api/portraits/men/22.jpg',   vendor: 'Agence SEO',     vendorIcon: Search,    stack: 'Google Search', stackColor: '#4285F4', level: 'Senior · 8 ans' },
  { name: 'Camille B.',   role: 'Content Writer',  photo: 'https://randomuser.me/api/portraits/women/47.jpg', vendor: 'Agence SEO',     vendorIcon: Search,    stack: 'WordPress',     stackColor: '#21759B', level: 'Mid · 4 ans' },
  { name: 'Marc O.',      role: 'SDR freelance',   photo: 'https://randomuser.me/api/portraits/men/51.jpg',   vendor: 'Freelance',      vendorIcon: Mail,      stack: 'Lemlist',       stackColor: '#FF6B00', level: 'Senior · solo' },
  { name: 'Léa M.',       role: 'Email Lifecycle', photo: 'https://randomuser.me/api/portraits/women/56.jpg', vendor: 'Freelance',      vendorIcon: Mail,      stack: 'Brevo',         stackColor: '#0B996E', level: 'Mid · 5 ans' },
  { name: 'Alex K.',      role: 'Data Analyst',    photo: 'https://randomuser.me/api/portraits/men/85.jpg',   vendor: 'Freelance',      vendorIcon: BarChart3, stack: 'GA4 + Excel',   stackColor: '#F4B400', level: 'Senior · 2 j/mois' },
  { broken: true, name: 'Agent IA Zapier', role: 'Hallucine les leads',   vendor: 'Bricolé interne', stack: 'Zapier bancal', level: 'Cassé · tombe 2×/sem' },
];

export default function OrganigrammeAvant() {
  return (
    <div className="relative">
      {/* ── N1 · Head of Marketing seul senior + Founder impliqué ── */}
      <div className="grid md:grid-cols-2 gap-3 max-w-[640px] mx-auto relative">
        {clientSide.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-surface !rounded-none p-3 relative !bg-[color:var(--card-elev-1)] light:!bg-white !shadow-none border border-[color:var(--border-subtle)]">
            <div className={`flex items-center gap-2.5 ${i === 1 ? 'flex-row-reverse' : ''}`}>
              <Image src={c.photo} alt={c.name} width={44} height={44}
                     className="w-11 h-11 object-cover border border-[color:var(--border-subtle)] shrink-0" unoptimized />
              <div className={`min-w-0 flex-1 ${i === 1 ? 'text-right' : ''}`}>
                <div className="text-[15px] font-display font-medium truncate leading-tight">{c.name}</div>
                <div className="text-[12.5px] text-[color:var(--ink-muted)] truncate mt-0.5">{c.role}</div>
              </div>
            </div>
            <div className={`mt-2.5 pt-2.5 border-t border-[color:var(--border-subtle)] text-[12px] text-[color:var(--ink-dim)] leading-snug ${i === 1 ? 'text-right' : ''}`}>
              {c.detail}
            </div>
          </motion.div>
        ))}
        {/* Connecteur au centre — "?" vs "+" côté uclic */}
        <div
          aria-hidden="true"
          className="hidden md:grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-red-500/15 text-red-500 place-items-center font-bold text-[14px] leading-none z-[2] border-2 border-white dark:border-[color:var(--bg)]">
          ?
        </div>
      </div>

      {/* ── Ligne pilotage ── */}
      <div className="relative mt-6 mb-4" aria-hidden="true">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-3 bg-white dark:bg-[color:var(--bg)] text-[11.5px] font-mono uppercase tracking-[0.2em] text-red-500/85 inline-flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1 h-1 bg-red-500" />
          pilotent 4 prestas épars
          <span className="w-1 h-1 bg-red-500" />
        </div>
      </div>

      {/* ── Bandeau "0 communication entre eux" — le message clef ── */}
      <div className="relative mb-4 flex items-center justify-center gap-2 py-2 px-3 border border-red-500/35 bg-red-500/[0.05]">
        <X size={13} strokeWidth={2.8} className="text-red-500" />
        <span className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-red-500 font-semibold">
          0 communication entre eux
        </span>
        <X size={13} strokeWidth={2.8} className="text-red-500" />
      </div>

      {/* ── N2 · 8 exécutants éclatés · multi-agences · outils différents ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {execs.map((e, i) => {
          // 8ème card = Agent IA Zapier cassé (même taille/format que les autres)
          if ('broken' in e) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="card-surface !rounded-none p-2.5 flex flex-col items-center text-center !bg-red-500/[0.06] dark:!bg-red-950/40 !shadow-none border-2 border-dashed border-red-500/50 relative overflow-hidden">
                {/* Halo rouge subtil pulse */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-red-500/10 blur-xl opacity-60 pointer-events-none animate-pulse"
                  style={{ animationDuration: '2.8s' }}
                />
                {/* Badge "cassé" */}
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 grid place-items-center border-2 border-[color:var(--bg)] z-[2]">
                  <AlertTriangle size={10} strokeWidth={3} className="text-white" />
                </div>
                {/* Icône Zap */}
                <div className="relative shrink-0 z-[1]">
                  <div className="w-12 h-12 grid place-items-center bg-red-500/15 border border-red-500/40">
                    <Zap size={22} className="text-red-500" strokeWidth={2.4} fill="currentColor" />
                  </div>
                </div>
                <div className="mt-2 text-[15px] font-medium truncate w-full leading-tight relative z-[1]">{e.name}</div>
                <div className="text-[13px] text-red-500/85 truncate w-full relative z-[1] mt-0.5">{e.role}</div>
                <div className="mt-2 flex flex-nowrap justify-center gap-1 w-full relative z-[1]">
                  <span className="text-[11.5px] text-white bg-red-500 border border-red-500 px-2 py-0.5 whitespace-nowrap leading-tight font-semibold">
                    {e.level}
                  </span>
                </div>
                <div className="mt-2.5 pt-3 w-full border-t border-dashed border-red-500/40 relative z-[1]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 grid place-items-center bg-red-500/10 border border-red-500/30 shrink-0">
                      <X size={15} className="text-red-500" strokeWidth={2.6} />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-[12px] font-mono uppercase tracking-wider text-red-500/85 leading-none truncate">
                        {e.vendor}
                      </div>
                      <div className="text-[15px] font-medium text-[color:var(--ink)] truncate leading-tight mt-1">
                        {e.stack}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }
          const VendorIcon = e.vendorIcon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="card-surface !rounded-none p-2.5 flex flex-col items-center text-center !bg-[color:var(--card-elev-1)] light:!bg-white !shadow-none border border-[color:var(--border-subtle)] relative">
              {/* Badge X — prestataire isolé */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 grid place-items-center border-2 border-[color:var(--bg)] z-[2]">
                <X size={8} strokeWidth={3.2} className="text-white" />
              </div>

              {/* Avatar */}
              <div className="relative shrink-0">
                <Image src={e.photo} alt={e.name} width={40} height={40}
                       className="w-10 h-10 object-cover border border-[color:var(--border-subtle)] opacity-90" unoptimized />
              </div>

              <div className="mt-1.5 text-[13.5px] font-medium truncate w-full leading-tight">{e.name}</div>
              <div className="text-[12px] text-[color:var(--ink-muted)] truncate w-full">{e.role}</div>

              {/* Chip niveau — senior/mid/alt · mélangé */}
              <div className="mt-1.5 flex flex-nowrap justify-center gap-1 w-full">
                <span className="text-[11.5px] text-[color:var(--ink-dim)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-2 py-0.5 whitespace-nowrap leading-tight">
                  {e.level}
                </span>
              </div>

              {/* Vendor + stack — mirror du bloc agent IA */}
              <div className="mt-2.5 pt-3 w-full border-t border-dashed border-[color:var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 grid place-items-center bg-[color:var(--card)] border border-[color:var(--border-subtle)] shrink-0">
                    <VendorIcon size={15} className="text-[color:var(--ink-muted)]" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[12px] font-mono uppercase tracking-wider text-[color:var(--ink-dim)] leading-none truncate">
                      {e.vendor}
                    </div>
                    <div className="text-[15px] font-medium text-[color:var(--ink)] truncate leading-tight mt-1">
                      {e.stack}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Verdict bas ── */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <AlertTriangle size={12} strokeWidth={2.2} className="text-red-500" /> 4 agences · 8 outils
        </span>
        <span className="w-1 h-1 bg-[color:var(--ink-dim)]" />
        <span>agent IA cassé</span>
        <span className="w-1 h-1 bg-[color:var(--ink-dim)]" />
        <span>0 orchestration</span>
      </div>

    </div>
  );
}
