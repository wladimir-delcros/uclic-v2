'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, BadgeCheck, Star } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';

/* Équipe éditoriale — le legacy s'appuyait sur Supabase pour lister les membres.
   V2 n'a pas de back office encore : on expose la composition de référence
   (pilotes seniors + experts canaux + agents IA) alignée sur la home. */

const pilots = [
  {
    name: 'Wladimir Delcros',
    role: 'CEO · Growth Strategist',
    seniority: '16 ans',
    summary: 'Ex-Head of Growth CodinGame (5 ans, 20M ARR), Muzzo, Obat. Product-Led Growth, stratégie acquisition B2B SaaS. Pilote le compte en première ligne.',
    past: ['CodinGame', 'Muzzo', 'Obat', 'StayHome'],
  },
  {
    name: 'Alexis Christine-Amara',
    role: 'Cofondateur · Business Development',
    seniority: '12 ans',
    summary: 'Ex-Head of Sales CodinGame. Tandem revenu + growth reconstitué chez Uclic. Outbound complexe, signaux d\'achat, grands comptes B2B.',
    past: ['CodinGame', 'Scale-ups SaaS'],
  },
];

const channels = [
  { name: 'SEO Lead', role: 'SEO · Contenu éditorial', years: '8 ans', certs: ['Google', 'Semrush', 'Ahrefs'] },
  { name: 'Paid Ads Lead', role: 'Google · Meta · LinkedIn Ads', years: '7 ans', certs: ['Google', 'Meta', 'TikTok'] },
  { name: 'Outbound · SDR Lead', role: 'Cold email + LinkedIn', years: '6 ans', certs: ['Lemlist', 'LinkedIn', 'HubSpot'] },
  { name: 'Content & Brand', role: 'Stratégie contenu, copywriting', years: '5 ans', certs: ['HubSpot', 'Notion', 'Webflow'] },
  { name: 'CRM & Data', role: 'HubSpot, Salesforce, Segment', years: '9 ans', certs: ['HubSpot', 'Salesforce', 'Segment'] },
  { name: 'Dev Fullstack', role: 'Apps, intégrations, agents IA en prod', years: '10 ans', certs: ['Next.js', 'n8n', 'Supabase'] },
];

const agents = [
  { name: 'SEO Writer IA', task: 'Génère des pages en bulk, brief → draft.' },
  { name: 'Bid Optimizer', task: 'Ajuste les enchères Google/Meta en continu.' },
  { name: 'ICP Enricher', task: 'Enrichit + score les leads entrants.' },
  { name: 'Content Assist', task: 'Brief → draft + brand QA, ton et tonalité.' },
  { name: 'Triggers Auto', task: 'Playbooks HubSpot déclenchés automatiquement.' },
];

export default function EquipeClient() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* HERO */}
      <section className="relative pt-24 lg:pt-28 pb-16 overflow-x-clip">
        <SectionAmbience variant="medium" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              L&apos;équipe Uclic
              <span className="w-6 h-px bg-[color:var(--accent)]" />
            </div>

            <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
              Seniors au pilotage.{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                Experts au terrain.
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h1>

            <p className="mt-5 text-[color:var(--ink-muted)] max-w-[640px] text-[16px] leading-relaxed">
              Trois piliers. Une seule équipe. Zéro silo. Pilotage senior, experts canaux certifiés, agents IA en production — même Slack, même roadmap, résultats mesurables en 90 jours.
            </p>
          </div>
        </div>
      </section>

      {/* PILOTES */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> N1 · Pilotage senior
          </div>
          <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
            Les co-fondateurs ex-CodinGame restent en première ligne.
          </h2>
          <p className="mt-3 text-[color:var(--ink-muted)] max-w-[620px] text-[15px] leading-relaxed">
            Vous rencontrez Wladimir et Alexis dès le premier call. Ce sont eux qui cadrent, pilotent et rendent des comptes — pas un junior d&apos;account management.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {pilots.map((p, i) => (
              <motion.div
                key={p.name}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-8"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  <Star size={12} /> {p.seniority} d&apos;expérience
                </div>
                <h3 className="mt-4 text-[22px] font-display font-medium tracking-[-0.01em]">{p.name}</h3>
                <div className="mt-1 text-[13px] text-[color:var(--ink-muted)] uppercase tracking-[0.12em]">{p.role}</div>
                <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--ink)]">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.past.map((x) => (
                    <span
                      key={x}
                      className="text-[11px] font-mono uppercase tracking-[0.18em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTS CANAUX */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> N2 · Experts canaux certifiés
          </div>
          <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
            Un spécialiste par canal — Inbound, Outbound, IA & Développement.
          </h2>
          <p className="mt-3 text-[color:var(--ink-muted)] max-w-[620px] text-[15px] leading-relaxed">
            Chaque pilier des trois est tenu par quelqu&apos;un dont c&apos;est le métier depuis 5 à 9 ans. Certifications à jour, process documenté, reporting hebdo — pas de junior livré seul.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((c, i) => (
              <motion.div
                key={c.name}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  <BadgeCheck size={12} /> {c.years}
                </div>
                <h3 className="mt-3 text-[18px] font-display font-medium tracking-[-0.01em]">{c.name}</h3>
                <div className="mt-1 text-[13px] text-[color:var(--ink-muted)]">{c.role}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.certs.map((x) => (
                    <span
                      key={x}
                      className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENTS IA */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> N3 · Agents IA en production
          </div>
          <h2 className="mt-4 text-[clamp(28px,3.2vw,40px)] font-display font-medium tracking-[-0.02em] max-w-[720px]">
            Des agents IA en production — pas des démos.
          </h2>
          <p className="mt-3 text-[color:var(--ink-muted)] max-w-[620px] text-[15px] leading-relaxed">
            Chaque expert canal s&apos;appuie sur un agent IA qui industrialise les tâches répétitives. −70 % de temps manuel. Vous récupérez le levier, pas la facture.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((a, i) => (
              <motion.div
                key={a.name}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  <Sparkles size={12} /> Agent IA
                </div>
                <h3 className="mt-3 text-[18px] font-display font-medium tracking-[-0.01em]">{a.name}</h3>
                <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">{a.task}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
