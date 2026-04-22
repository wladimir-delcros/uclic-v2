'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import type { CasClient } from '@/lib/portfolio';

interface PreuveCardProps {
  cas: CasClient;
  index: number;
  total: number;
}

export function PreuveCard({ cas, index, total }: PreuveCardProps) {
  const href = `https://uclic.fr/cas-clients/${cas.slug}`;
  const isLastCol = index === total - 1;
  const isLastRow = index === total - 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group p-8 flex flex-col relative overflow-hidden transition-colors duration-300 !rounded-none border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white ${
        !isLastCol ? 'md:border-r' : ''
      } ${!isLastRow ? 'border-b md:border-b-0' : ''}`}>
      {cas.featured_image_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
          <Image
            src={cas.featured_image_url}
            alt={cas.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <h3 className="mt-5 text-[28px] font-display font-medium leading-tight">
        {cas.title}
      </h3>

      {cas.excerpt && cas.excerpt.trim().length > 0 && (
        <p className="mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
          {cas.excerpt}
        </p>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-7 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:gap-2.5 hover:text-[color:var(--accent)] transition-all self-start">
        Lire le cas complet
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </motion.article>
  );
}

export function PreuveClosure({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-14 flex items-center justify-center gap-2 text-[13px] text-[color:var(--ink-muted)]">
      {children}
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-[color:var(--accent)]">
        <ArrowDown size={14} />
      </motion.span>
    </motion.p>
  );
}
