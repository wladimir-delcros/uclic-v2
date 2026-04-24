import { getCasClientsForHomepage } from '@/lib/portfolio';
import { PreuveClosure } from './PreuveCard';
import PreuveTabs from './PreuveTabs';

export default async function PreuveSection() {
  const cases = await getCasClientsForHomepage();

  return (
    <section id="preuve" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" />
            La preuve
            <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
          Ce n'est pas nous qui le disons.{' '}
          <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
            Ce sont eux.
            <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
          </span>
        </h2>

        <p className="mt-5 text-center max-w-[640px] mx-auto text-[16px] text-[color:var(--ink-muted)] leading-relaxed">
          Trois cas clients publiés, choisis parmi 40+ scale-ups B2B accompagnées. Du problème brut au résultat mesuré.
        </p>

        {cases.length === 0 ? (
          <div className="mt-14 flex flex-col items-start gap-5">
            <p className="text-[16px] text-[color:var(--ink-muted)] max-w-[560px] leading-relaxed">
              40+ clients B2B ont déjà fait le choix. Retrouve l'intégralité des cas publiés sur la page dédiée.
            </p>
            <a
              href="/cas-clients"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all">
              Voir tous les cas clients →
            </a>
          </div>
        ) : (
          <>
            <PreuveTabs cases={cases} />
            <PreuveClosure>40+ clients B2B ont déjà fait le choix</PreuveClosure>
          </>
        )}
      </div>
    </section>
  );
}
