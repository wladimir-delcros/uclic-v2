'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function SmaClient() {
  return (
    <ExpertiseClient
      eyebrow="Social Ads · SMA"
      h1Plain="Agence"
      h1Highlight="Social Ads."
      subtitle="Nous concevons et pilotons vos campagnes Social Media Ads sur-mesure (Meta, LinkedIn, TikTok) pour transformer votre budget en clients qualifiés. Stratégie créa data-driven, tracking serveur-side (CAPI), A/B testing et pilotage ROI hebdomadaire — par des experts canaux certifiés, industrialisés par des agents IA en production."
      whyTitle="Pourquoi Uclic"
      whyIntro="Une agence Social Ads ne gère pas du community management : elle achète de la visibilité ultra-ciblée pour générer des résultats chiffrés. Notre focus : votre ROI. Pas de jargon, pas de reporting cosmétique — des tests concrets, pilotés par un Growth Lead senior qui reste en première ligne."
      whyBullets={[
        "Experts Meta Ads, LinkedIn Ads et TikTok Ads certifiés",
        "Stratégie créa + copywriting UGC & social-first — la créa est le levier #1",
        "Tracking serveur-side (Meta CAPI, Conversions API) pour fiabiliser la donnée",
        "Agents IA pour production créa, A/B testing et analyse des performances",
        "Pilotage hebdo + dashboard temps réel, sans jargon",
        "Sans silo : aligné avec SEO, CRM, retargeting et audiences similaires",
      ]}
      benefits={[
        {
          title: "Pilotage orienté performance",
          description:
            "Chaque euro investi est analysé, optimisé et réaffecté selon les performances. Gestion quotidienne, lecture fine des données (CPA, ROAS, CTR, CPM, LTV), allocation budget là où elle génère le plus de valeur. Vous dépensez moins pour acquérir mieux.",
        },
        {
          title: "Stratégie créa & approche data-driven",
          description:
            "La créa fait 70% de la performance. Nous concevons des publicités qui captent dès les premières secondes, avec visuels et vidéos adaptés à chaque plateforme (Meta, TikTok, LinkedIn). Data et créativité croisées, testées en continu pour maximiser les conversions.",
        },
        {
          title: "Intégration à vos équipes & outils",
          description:
            "Pas de friction : nous intégrons nos process à votre stack (Slack, Notion, Drive, CRM, e-commerce). Point hebdo, dashboards temps réel, accès direct aux traffic managers. Vous restez maître de votre stratégie, avec un pilotage 100% transparent.",
        },
      ]}
      processTitle="Notre processus Social Ads en 3 étapes"
      processSubtitle="Un framework éprouvé pour construire, piloter et scaler vos campagnes Social Media. Approche orientée performance, pilotée par la donnée et l'itération continue."
      processSteps={[
        {
          title: "Diagnostic & stratégie SMA",
          description:
            "Audit complet de vos canaux, audiences, offres et objectifs business. Élaboration d'une stratégie sur-mesure alignée avec vos KPIs (ROAS, CPL, CAC). Plan média, répartition budgétaire et tracking avancé posés avant le lancement.",
        },
        {
          title: "Création & lancement des campagnes",
          description:
            "Création d'assets visuels performants (vidéos social-first, carrousels, UGC) + copywriting orienté conversion. Mise en place de campagnes structurées : tests d'audiences, A/B testing, tracking serveur-side. Lancement avec un plan média adapté à votre maturité.",
        },
        {
          title: "Optimisation & scaling",
          description:
            "Mode performance : itération des best ads, scaling via CBO/ABO, exclusions intelligentes, retargeting multi-niveaux, analyse des UTMs. Objectif : rentabilité maximale à budget contrôlé. Pilotage hebdomadaire et reporting exécutif.",
        },
      ]}
      faqTitle="Questions fréquentes sur nos campagnes Social Ads"
      faq={[
        {
          question: "Pourquoi investir dans la publicité sur les réseaux sociaux ?",
          answer:
            "Les Social Ads offrent un ciblage précis (intent, démographie, centres d'intérêt, audiences similaires) et un ROI mesurable à court terme. Pour une scale-up B2B, c'est un levier d'acquisition complémentaire au SEO et à l'outbound, activable rapidement et scalable.",
        },
        {
          question: "Quelle est la différence entre Social Ads et SEO ?",
          answer:
            "Le SEO construit un actif durable (trafic organique), le Social Ads achète de la visibilité à court terme et teste vite. Les deux sont complémentaires : les mots-clés SEO qui convertissent nourrissent les angles Social Ads, et vos bases emails alimentent les audiences similaires.",
        },
        {
          question: "Quels réseaux sociaux sont les plus efficaces pour faire du SMA ?",
          answer:
            "LinkedIn reste le roi du B2B pour cibler les décideurs. Meta (Facebook + Instagram) conserve sa puissance grâce à sa base massive et sa polyvalence. TikTok et Instagram Reels captent les audiences jeunes via la vidéo. Notre rôle : recommander le mix gagnant selon votre cible et votre budget.",
        },
        {
          question: "Quel budget minimum faut-il prévoir ?",
          answer:
            "Pour un test sérieux, comptez un minimum de 3 000 à 5 000 € / mois de budget média (hors frais d'agence) sur une plateforme. En dessous, l'algorithme n'a pas assez de données pour optimiser. Nous cadrons le bon niveau de budget pendant la phase 01 — audit offert.",
        },
        {
          question: "Combien de temps pour voir des résultats ?",
          answer:
            "Premiers signaux en 2 à 4 semaines (CPL, CTR, engagement). Courbe de performance stabilisée en 90 jours. Le scaling rentable demande généralement 60 à 90 jours de test-learn rigoureux avec itération créa hebdomadaire.",
        },
        {
          question: "Quelle différence entre votre agence SMA et une agence généraliste ?",
          answer:
            "Nous ne sommes pas un prestataire de plus à orchestrer. Nous pilotons Social Ads + tracking + créa + intégration CRM avec un Growth Lead senior unique. Experts canaux certifiés + agents IA en production + Dev Fullstack dédié — sans silo, en 90 jours.",
        },
      ]}
      closingBlurb="Du diagnostic au scale : 48h pour démarrer. Notre agence Social Ads vous remet un audit exécutif + une roadmap 12 mois, offert — pour décider en connaissance de cause."
    />
  );
}
