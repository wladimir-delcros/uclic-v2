'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, CalendarClock } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';

export default function CtaFinal() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden bg-[color:var(--bg)]"
      style={{
        background:
          'radial-gradient(100% 80% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, var(--bg) 70%)',
      }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <SectionAmbience variant="full" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-5">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> Dernière étape <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
            Vous n'avez pas besoin de plus de canaux.
            <br />
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Vous avez besoin d'un pilote.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-6 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Un Growth Scan de 48 heures pour cartographier votre funnel, prioriser vos leviers
            et démarrer votre roadmap growth.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-[720px] mx-auto">
            <div className="card-inner !rounded-none !bg-[color:var(--surface-raised)] p-4 text-center">
              <div className="text-[color:var(--accent)] text-[22px] font-display font-medium">Gratuit</div>
              <div className="text-[12px] text-[color:var(--ink-muted)] mt-1">Aucune CB, aucun frais caché</div>
            </div>
            <div className="card-inner !rounded-none !bg-[color:var(--surface-raised)] p-4 text-center">
              <div className="text-[color:var(--accent)] text-[22px] font-display font-medium">48 heures</div>
              <div className="text-[12px] text-[color:var(--ink-muted)] mt-1">Du call à la restitution orale</div>
            </div>
            <div className="card-inner !rounded-none !bg-[color:var(--surface-raised)] p-4 text-center">
              <div className="text-[color:var(--accent)] text-[22px] font-display font-medium">Senior</div>
              <div className="text-[12px] text-[color:var(--ink-muted)] mt-1">Wladimir ou Alexis vous répondent</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/uclic/growth-scan"
              className="glass-pill inline-flex items-center gap-2 px-7 py-4 text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
              style={{
                background:
                  'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
              }}>
              <CalendarClock size={18} className="text-black light:text-white" />
              <span>Réserver mon Growth Scan</span>
              <ArrowRight size={16} className="text-black light:text-white" />
            </a>
            <a
              href="mailto:hello@uclic.fr"
              className="pill !rounded-none !py-4 !px-7 hover:border-[color:var(--border-strong)] transition">
              <Mail size={16} /> hello@uclic.fr
            </a>
          </div>

          <p className="mt-6 text-[12px] text-[color:var(--ink-muted)]">
            Créneau en 2 clics · Calendly direct · Sans engagement
          </p>
          <p className="mt-8 text-[12px] text-[color:var(--ink-muted)] flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5"><Phone size={13} /> 06 17 12 54 28</span>
            <span>·</span>
            <span>★ 4,9 Google · ★ 4,96 Sortlist · ★ 4,3 Trustpilot</span>
            <span>·</span>
            <span>40+ clients B2B</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
