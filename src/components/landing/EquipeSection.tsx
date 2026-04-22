'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Star, BadgeCheck } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';

/* N1 — Growth Experts (pilotage, 15 ans d'XP chacun) */
const growthLeads = [
  {
    name: 'Wladimir Delcros',
    role: 'Growth Expert Lead',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    seniority: '15 ans',
    summary: 'Growth Marketing · Ex-Head of Growth SaaS B2B',
    past: ["L'Oréal", 'Agicap', 'Deepki'],
  },
  {
    name: 'Alexis Moreau',
    role: 'Growth Expert Senior',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    seniority: '15 ans',
    summary: 'Growth Marketing · Ex-VP Growth scale-up fintech',
    past: ['Floa', 'CybelAngel', 'Tehtris'],
  },
];

/* N2 — Channel Experts (certifications mises en avant) */
const channels = [
  {
    name: 'Théo Lambert',  role: 'SEO Lead',        photo: 'https://randomuser.me/api/portraits/men/76.jpg',  color: '#8E44AD',
    years: '8 ans', certs: ['Google', 'Semrush', 'Ahrefs'],
  },
  {
    name: 'Anaïs Roux',    role: 'Paid Ads Lead',   photo: 'https://randomuser.me/api/portraits/women/44.jpg', color: '#0D7377',
    years: '7 ans', certs: ['Google', 'Meta', 'TikTok'],
  },
  {
    name: 'Marc Fontaine', role: 'Outbound · SDR',  photo: 'https://randomuser.me/api/portraits/men/51.jpg',  color: '#B57215',
    years: '6 ans', certs: ['LinkedIn', 'Lemlist', 'HubSpot'],
  },
  {
    name: 'Sofia Perez',   role: 'Content & Brand', photo: 'https://randomuser.me/api/portraits/women/68.jpg', color: '#7B3FC4',
    years: '5 ans', certs: ['HubSpot', 'Notion', 'Webflow'],
  },
  {
    name: 'Julien Bard',   role: 'CRM & Data',      photo: 'https://randomuser.me/api/portraits/men/85.jpg',  color: '#C68B00',
    years: '9 ans', certs: ['HubSpot', 'Salesforce', 'Segment'],
  },
];

/* N3 — Agents IA rattachés à chaque channel (même ordre que channels) */
const agents = [
  { parent: 'SEO',      name: 'SEO Writer IA',   task: 'Produit des pages en bulk' },
  { parent: 'Paid',     name: 'Bid Optimizer',   task: 'Ajuste enchères en H24' },
  { parent: 'Outbound', name: 'ICP Enricher',    task: 'Enrichit + score les leads' },
  { parent: 'Content',  name: 'Content Assist',  task: 'Brief → draft + brand QA' },
  { parent: 'CRM',      name: 'Triggers Auto',   task: 'Playbooks HubSpot auto' },
];

export default function EquipeSection() {
  return (
    <section id="equipe" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <SectionAmbience variant="medium" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
          <span className="w-6 h-px bg-[color:var(--accent)]" /> Notre équipe
        </div>
        <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[680px]">
            <span className="block">Seniors au pilotage.</span>
            <span className="block">Experts au terrain.</span>
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              IA au relais.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="text-[color:var(--ink-muted)] max-w-[420px] text-[15px]">
            Là où 3 agences se renverraient la balle, nos 3 niveaux opèrent en interne. Même Slack, même pilote, même roadmap.
          </p>
        </div>

        {/* ─── ORGANIGRAMME ─── */}
        <div className="mt-16 relative">

          {/* ── N1 · Growth Experts (2 cards) ── */}
          <div className="grid md:grid-cols-2 gap-5 max-w-[760px] mx-auto">
            {growthLeads.map((g, i) => (
              <motion.div key={g.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-surface p-4 relative !bg-[color:var(--surface-raised)] dark:!bg-black dark:!shadow-none">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[color:var(--accent)] text-black whitespace-nowrap">
                  <Star size={11} fill="currentColor" /> {g.seniority}
                </div>
                <div className="flex items-center gap-3">
                  <Image src={g.photo} alt={g.name} width={56} height={56}
                         className="w-14 h-14 rounded-xl object-cover border border-[color:var(--border-subtle)] shrink-0" unoptimized />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.15em] text-[color:var(--ink-muted)]">{g.role}</div>
                    <div className="text-[16px] font-display font-medium mt-0.5 truncate">{g.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Lignes N1 → N2 ── */}
          <div className="relative h-12 md:h-16" aria-hidden="true">
            {/* Central trunk : 2 N1 convergent vers la ligne horizontale */}
            <div
              className="neon-line-v absolute inset-x-0 top-0 mx-auto w-px h-6 md:h-8 bg-gradient-to-b from-[color:var(--accent)]/60 to-white/15"
              style={{ ['--neon-color' as string]: 'var(--accent)', ['--neon-duration' as string]: '2s' }}
            />
            {/* Ligne horizontale */}
            <div
              className="neon-line-h hidden md:block absolute left-[calc(10%+1px)] right-[calc(10%+1px)] top-6 md:top-8 h-px bg-[color:var(--border-strong)]"
              style={{ ['--neon-color' as string]: 'var(--accent)', ['--neon-duration' as string]: '3.5s' }}
            />
            {/* 5 branches : dispersion simultanée à la sortie du trunk (delay sync 1.9s) */}
            <div className="hidden md:flex absolute left-[10%] right-[10%] bottom-0 justify-between">
              {channels.map((_, i) => (
                <div
                  key={i}
                  className="neon-line-v w-px h-6 md:h-8 bg-[color:var(--border-strong)]"
                  style={{
                    ['--neon-color' as string]: 'var(--accent)',
                    ['--neon-duration' as string]: '2s',
                    ['--neon-delay' as string]: '1.9s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── N2 · Channel Experts ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {channels.map((c, i) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-surface p-3 flex flex-col items-center text-center !bg-[color:var(--surface-raised)] dark:!bg-black dark:!shadow-none">
                <div className="relative shrink-0">
                  <Image src={c.photo} alt={c.name} width={48} height={48}
                         className="w-12 h-12 rounded-xl object-cover border border-[color:var(--border-subtle)]" unoptimized />
                  <span style={{ backgroundColor: c.color }}
                        className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[color:var(--surface)]" />
                </div>
                <div className="mt-2 text-[12.5px] font-medium truncate w-full">{c.name}</div>
                <div className="text-[10.5px] text-[color:var(--ink-muted)] truncate w-full">{c.role}</div>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {c.certs.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-0.5 text-[9.5px] text-[color:var(--accent)] border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                      <BadgeCheck size={9} /> {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Lignes N2 → N3 ── */}
          <div className="relative h-12 md:h-16" aria-hidden="true">
            {/* 5 lignes verticales continues N2 → N3 (pulse fluide de haut en bas) */}
            <div className="hidden md:flex absolute left-[10%] right-[10%] inset-y-0 justify-between">
              {channels.map((_, i) => (
                <div
                  key={i}
                  className="neon-line-v w-px h-full bg-gradient-to-b from-white/15 via-violet-400/35 to-violet-400/50"
                  style={{
                    ['--neon-color' as string]: '#a78bfa',
                    ['--neon-duration' as string]: '3s',
                    ['--neon-delay' as string]: `${i * 0.4 + 0.5}s`,
                  }}
                />
              ))}
            </div>
            {/* Ligne horizontale violette en overlay au milieu */}
            <div
              className="neon-line-h hidden md:block absolute left-[calc(10%+1px)] right-[calc(10%+1px)] top-1/2 -translate-y-1/2 h-px bg-violet-400/35"
              style={{ ['--neon-color' as string]: '#a78bfa', ['--neon-duration' as string]: '3.5s', ['--neon-delay' as string]: '1s' }}
            />
          </div>

          {/* ── N3 · Agents IA (rattachés sous chaque channel) ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {agents.map((a, i) => (
              <motion.div key={a.name}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-3 rounded-xl bg-violet-500/[0.06] dark:!bg-black border border-violet-400/20 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-lg grid place-items-center bg-gradient-to-br from-violet-500/30 to-indigo-500/20 border border-violet-400/30 shrink-0">
                  <Sparkles size={15} className="text-violet-200" />
                </div>
                <span className="mt-2 text-[9px] font-mono uppercase tracking-wider text-violet-300/80 px-1.5 py-0.5 rounded border border-violet-400/25 bg-violet-500/10">
                  {a.parent}
                </span>
                <div className="mt-1.5 text-[12px] font-medium text-[color:var(--ink)] truncate w-full">{a.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
