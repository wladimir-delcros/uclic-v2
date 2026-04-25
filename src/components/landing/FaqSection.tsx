'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionAmbience from '../ui/SectionAmbience';

const cats = ['Général', 'Méthode', 'Tarifs', 'Intégrations'] as const;
type Cat = typeof cats[number];

const faq: { cat: Cat; q: string; a: string }[] = [
  // ─ Général
  {
    cat: 'Général',
    q: "Vous travaillez avec des PME ou seulement des scale-ups ?",
    a: "Les deux. PME (10–50 salariés), scale-ups Series A/B, ETI post-levée, grands comptes sur périmètre délimité. Ce qui compte, ce n'est pas la taille mais : (1) une cible B2B claire, (2) un ACV ≥ 3 k€ ou un panier e-commerce rentabilisant l'acquisition payante, (3) une équipe prête à décider sous 30 jours. Si vous cochez ces trois cases, on peut embarquer. Sinon, on vous dit non — et on vous oriente vers un pair plus adapté (solo freelance, agence spé mono-canal, etc.).",
  },
  {
    cat: 'Général',
    q: "Comment savoir si c'est le bon moment ?",
    a: "Quelques signaux fiables : (1) l'acquisition plafonne malgré des efforts croissants, (2) les prestataires mono-canal s'empilent sans vision d'ensemble, (3) votre CFO réclame de la clarté sur le CAC/LTV et l'attribution, (4) vos concurrents industrialisent l'IA et creusent l'écart, (5) vous dépendez à 80 %+ d'un seul canal (Google Ads ou SEO par ex.). Si 2 ou 3 de ces signaux résonnent, l'audit gratuit 48 h est fait pour vous — on vous dit si on pense pouvoir aider.",
  },
  {
    cat: 'Général',
    q: "Vous pouvez remplacer un Head of Growth interne ?",
    a: "Oui sur deux modes : (a) remplacement complet — nous prenons la casquette Head of Growth externalisé, avec un Growth Strategist senior qui pilote la stratégie et rend des comptes à votre COMEX ; (b) renfort d'un Head of Growth existant — vous gardez votre pilote interne, nous apportons la profondeur canal (SEO/Ads/Outbound/IA) et la capacité d'exécution qui lui manque. Dans les deux cas, on s'aligne sur vos OKR et vos rituels existants plutôt que d'en imposer de nouveaux.",
  },
  {
    cat: 'Général',
    q: "Est-ce que vous travaillez en anglais ?",
    a: "Oui — pleinement bilingue FR/EN. Réunions, comptes rendus, livrables, dashboards, cold outbound, prompts d'agents IA, tout peut être opéré en anglais. Nous accompagnons régulièrement des scale-ups US (Delaware) et UK dont les comités sont en anglais. Si votre client final est francophone et votre board anglophone, on fait les deux — reporting board en EN, assets clients en FR.",
  },
  {
    cat: 'Général',
    q: "Vous êtes combien dans l'équipe ?",
    a: "Un noyau senior Uclic (Growth Leads 10+ ans d'XP, ops, ingénieurs IA & Next.js) + un collectif de freelances experts canal activés à la demande (SEO, Ads, SDR, motion, UX, data). Chaque compte est dimensionné selon l'ambition : au minimum 1 Growth Strategist + 1 expert canal. Sur les missions Duo ou Growth Machine, on monte à 3–5 intervenants, tous visibles dans votre Slack partagé.",
  },
  {
    cat: 'Général',
    q: "Dans quels secteurs opérez-vous ?",
    a: "SaaS B2B (horizontal et vertical), fintech & assurtech, edtech, retail/DTC, luxe & maison, marketplaces B2B, services professionnels (conseil, juridique), data & API. Nous évitons : crypto pure-player, para-pharma sans AMM, pure e-commerce low ticket (< 40 € panier) où l'économie unitaire ne supporte pas l'acquisition senior. En cas de doute, dites-nous votre secteur — si on ne prend pas, on vous recommande quelqu'un de pertinent.",
  },

  // ─ Méthode
  {
    cat: 'Méthode',
    q: "Comment ça se passe si on n'obtient pas les résultats attendus ?",
    a: "On ne promet pas de résultats chiffrés à l'avance — trop de variables nous échappent (saisonnalité, concurrence, produit, qualité des leads sortants). Ce qu'on promet : (1) une méthode claire avec hypothèses écrites, (2) une revue à 30, 60 et 90 jours où l'on arrête tout ce qui ne fonctionne pas, (3) une transparence totale sur le CAC et le ROI calculé par canal. Si au bout de 90 jours rien ne décolle, on sort ensemble — sans pénalité, sans facture surprise, avec le handover complet.",
  },
  {
    cat: 'Méthode',
    q: "Quand voit-on les premiers résultats ?",
    a: "Par canal : (a) Outbound multicanal — premiers RDV qualifiés en 3–6 semaines après séquençage, montée en puissance ×2–3 à 90 jours ; (b) Google / Meta / LinkedIn Ads — signaux CPC/CTR dès J+7, vrais apprentissages de CAC à J+30 ; (c) SEO — trafic mesurable à 2–3 mois, pic business à 4–6 mois ; (d) Automatisations & agents IA — gains de productivité dès la 2ᵉ semaine (−70 % temps manuel observé sur nos clients). On dispatche volontairement l'effort pour avoir des quick wins dès le 1ᵉʳ mois.",
  },
  {
    cat: 'Méthode',
    q: "C'est quoi un Growth Strategist ?",
    a: "Votre interlocuteur unique chez Uclic — un profil senior (10+ ans d'XP), ex-Head of Growth d'une scale-up reconnue, qui conçoit la stratégie, coordonne les experts canal, arbitre les priorités, vous challenge et vous rend des comptes. Vous ne parlez qu'à cette personne en comité hebdo — elle traduit ensuite en briefs aux experts. C'est la raison pour laquelle nos clients signalent une baisse drastique du coût coordination vs 4 freelances en parallèle.",
  },
  {
    cat: 'Méthode',
    q: "Quel format de reporting ?",
    a: "Trois niveaux : (1) Dashboard temps réel — Looker Studio (ou Metabase/Amplitude selon stack) avec KPIs pipeline, CAC par canal, LTV, cohortes ; (2) Comité hebdo 45 min en visio — un ordre du jour structuré (north-star review, décisions, next sprint) avec compte-rendu écrit envoyé dans l'heure ; (3) Bilan mensuel 3–5 pages — résumé décisions prises, apprentissages, ajustements roadmap. Toutes les sources data (GA4, HubSpot, Stripe, Segment) vous restent accessibles en lecture.",
  },
  {
    cat: 'Méthode',
    q: "Vous utilisez un scoring de priorisation ?",
    a: "Oui — ICE adapté (Impact 1-10, Confidence 1-10, Ease 1-10) + budget estimé + ressource requise. La roadmap vit en sprints 2 semaines, pas en plan trimestriel figé. Chaque sprint on prend les 3–5 items au meilleur score/budget, on exécute, on mesure, on passe au sprint suivant. Les éléments à forte incertitude passent en test rapide (500 € budget max) avant d'être promus.",
  },
  {
    cat: 'Méthode',
    q: "Qui fait les livrables : Uclic ou le freelance ?",
    a: "Les deux, sous le mandat du Growth Strategist. Vous savez à tout moment qui fait quoi — nom, rôle, disponibilité dans Slack partagé. Pas de sous-traitance opaque en cascade. Tous les livrables (ads, copy, workflows, pages, scripts) passent par une relecture QA interne Uclic avant envoi chez vous : 4 yeux minimum, méthode explicitée, critères d'acceptation écrits. Si un livrable ne passe pas la QA, il est refait — à notre charge.",
  },

  // ─ Tarifs
  {
    cat: 'Tarifs',
    q: "Combien ça coûte ?",
    a: "Quatre niveaux tarifaires transparents : (1) Audit gratuit — 0 €, sans engagement ; (2) 1 Pilier — 1 490 €/mois HT, un canal activé de bout en bout (SEO, Paid Media, Outbound, IA ou Dev) ; (3) Duo — 2 680 €/mois HT (−10 % vs 2×1 pilier), deux canaux avec Growth Strategist dédié ; (4) Growth Machine — 3 570 €/mois HT (−20 %), les 3 piliers activés, équipe marketing complète opérée par Uclic. 3 mois d'engagement initial, ensuite mensuel résiliable 30 jours préavis.",
  },
  {
    cat: 'Tarifs',
    q: "Y a-t-il un engagement ?",
    a: "Oui — 3 mois d'engagement initial. Raison : en dessous de 90 jours, on ne peut pas conclure honnêtement sur un canal (cycles de conversion, saisonnalité, learning period des plateformes ads). Après les 3 mois, vous passez en mensuel classique résiliable avec 30 jours de préavis écrit. Pas de reconduction automatique silencieuse, pas de pénalité à la sortie — on vous livre le handover (docs, accès, workflows) avant de partir.",
  },
  {
    cat: 'Tarifs',
    q: "L'audit gratuit, c'est quoi exactement ?",
    a: "Oui, 0 €, sans engagement, sans contrepartie commerciale. 30 min en visio (Google Meet ou Zoom) avec un Growth Lead senior qui vous pose les bonnes questions sur votre cible, votre produit, vos canaux et votre stack. Vous recevez sous 48 h : (a) une note synthétique des 3 piliers (Inbound, Outbound, IA & Dev), (b) 3–5 quick wins activables immédiatement, (c) un plan 90 jours chiffré sur la base de nos forfaits. Vous faites ce que vous voulez avec — y compris exécuter en interne. 80 % des audits ne débouchent pas sur un contrat, on assume.",
  },
  {
    cat: 'Tarifs',
    q: "Le budget média publicitaire est-il inclus ?",
    a: "Non — le budget média publicitaire (Google, Meta, TikTok, LinkedIn) est toujours payé directement par vous aux plateformes, jamais par Uclic. Nos forfaits couvrent uniquement le pilotage des campagnes : stratégie, audiences, créas, copy, A/B tests, optimisation continue, reporting hebdo. Aucune marge ni commission cachée sur le média : ce que les régies prélèvent, vous le payez à 100 % avec leurs factures à l'appui. Notre rémunération reste celle du forfait — pas un % du spend.",
  },
  {
    cat: 'Tarifs',
    q: "Comment fonctionne la facturation ?",
    a: "Facturation mensuelle en début de mois pour le forfait. Paiement à 15 jours par virement SEPA ou CB (Stripe). Le budget média publicitaire (Google, Meta, etc.) est payé directement par vous aux plateformes — il ne transite jamais par notre facturation. Devis ferme signé avant toute mise en production : aucun dépassement surprise. Si l'on voit qu'une enveloppe risque d'être dépassée, on vous le dit avant, on documente la cause et vous validez (ou pas). Chaque facture détaille les heures, les canaux, les livrables produits.",
  },

  // ─ Intégrations
  {
    cat: 'Intégrations',
    q: "Vous pouvez intégrer nos outils existants ?",
    a: "Oui — on travaille en mode \"vos outils\" par défaut, pas \"nos outils\". CRM (HubSpot, Salesforce, Pipedrive, Attio), prospection (Lemlist, La Growth Machine, Instantly), analytics (GA4, Mixpanel, Amplitude, Segment), orchestration (n8n, Make, Zapier, Temporal), enrichissement (Clay, Apollo, Cognism), dashboards (Looker Studio, Metabase) : on s'y branche sans migration forcée. Si votre stack a un trou béant, on propose une alternative — vous tranchez.",
  },
  {
    cat: 'Intégrations',
    q: "Quelle est votre stack IA de référence ?",
    a: "LLMs : OpenAI (GPT-4.1 / GPT-5 selon coût/qualité), Anthropic Claude (Sonnet 4.6 pour prod, Opus pour raisonnement), modèles open-weight (Llama, Mistral, Qwen) quand la donnée doit rester on-premise. Orchestration d'agents : n8n (low-code) ou code custom TypeScript/Python. RAG & vectorisation : pgvector sur Supabase, Qdrant ou Pinecone selon volume. Observabilité IA : Helicone, LangSmith ou Langfuse. Vous êtes propriétaire des prompts, workflows, indexes — tout est livré documenté.",
  },
  {
    cat: 'Intégrations',
    q: "Vous construisez des apps sur-mesure ?",
    a: "Oui — c'est le pilier IA & Développement. Landing pages haute-conversion, micro-apps SaaS, scrapers sur-mesure, outils de scoring lead, dashboards internes, intégrations API custom, portails clients, chatbots verticaux. Stack de référence : Next.js 15 (App Router), TypeScript, Tailwind 4, Supabase (Postgres + Auth + Storage), déployés sur Vercel ou Dokploy (self-hosted). Chaque app livrée avec README, variables d'environnement, guide de déploiement et tests E2E.",
  },
  {
    cat: 'Intégrations',
    q: "On garde la propriété des contenus et workflows ?",
    a: "Intégralement — cela figure au contrat cadre. Tout ce que nous produisons (pages, ads creatives, copy, workflows n8n, prompts d'agents, scripts, apps, images IA) vous appartient dès la livraison. Nous ne conservons aucun droit d'exploitation exclusif sur vos assets. À la sortie (à votre initiative ou à la nôtre), nous laissons les documents, les accès, les credentials et 2 heures de handover en visio incluses pour votre nouveau prestataire ou votre équipe interne.",
  },
];

export default function FaqSection() {
  const [active, setActive] = useState<Cat>('Général');
  const filtered = faq.filter((f) => f.cat === active);
  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <SectionAmbience variant="medium" />
      <div className="max-w-[980px] mx-auto px-5 lg:px-10 relative">
        <Reveal as="div" className="text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> FAQ <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 text-center text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em] max-w-[900px] mx-auto">
            Les questions qu'on{' '}
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              reçoit le plus souvent.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-center text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Tout ce qu'on nous demande avant de démarrer. Si votre question n'y est pas, on y répond pendant l'audit gratuit.
          </p>
        </Reveal>

        <Reveal as="div" className="mt-10 flex justify-center flex-wrap gap-2" delay={0.15}>
          {cats.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`pill !rounded-none transition-colors ${
                  isActive
                    ? '!bg-[color:var(--accent)] !text-black !border-[color:var(--accent)] font-medium'
                    : 'hover:!border-[color:var(--border-strong)]'
                }`}>
                {c}
              </button>
            );
          })}
        </Reveal>

        <Reveal as="div" className="mt-14 !rounded-none !p-0 overflow-hidden border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white" delay={0.25}>
          {filtered.map((f, i) => (
            <details key={f.q} className="group">
              <summary className={`px-8 lg:px-10 py-6 flex items-center justify-between gap-6 cursor-pointer list-none ${
                i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
              } hover:bg-[color:var(--card)]`}>
                <span className="text-[16px] font-medium pr-4 leading-snug">{f.q}</span>
                <Plus
                  size={18}
                  strokeWidth={2}
                  className="text-[color:var(--accent)] transition-transform duration-300 group-open:rotate-45 shrink-0"
                />
              </summary>
              <div className="px-8 lg:px-10 pb-7 pt-1 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[780px]">{f.a}</div>
            </details>
          ))}
        </Reveal>

        <Reveal as="p" className="mt-14 text-center text-[14px] text-[color:var(--ink-muted)]" delay={0.35}>
          Une question spécifique ? On y répond pendant l'audit gratuit.
        </Reveal>
      </div>
    </section>
  );
}
