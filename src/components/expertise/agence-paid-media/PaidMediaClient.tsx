'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function PaidMediaClient() {
  return (
    <ExpertiseClient
      eyebrow="Paid Media · SEA"
      h1Plain="Agence"
      h1Highlight="Paid Media."
      subtitle="Maximisez chaque euro investi en Google Ads, Bing Ads, Display et Shopping. Audit rigoureux, stratégie sur-mesure, campagnes pilotées par des experts canaux certifiés — et industrialisées par des agents IA en production. Pas de prestataire de plus : un pilote senior qui cadre, exécute et rend des comptes chaque semaine."
      whyTitle="Pourquoi Uclic"
      whyIntro="Notre agence Paid Media ne vend pas du conseil en slide. Nous déployons une machine d'acquisition : diagnostic express, campagnes automatisées 24/7, et industrialisation pour scaler sans friction. Chaque euro dépensé doit être traçable, mesurable et rentable."
      whyBullets={[
        "Experts Google Ads & Microsoft Ads certifiés — pas de junior en sous-traitance",
        "Pilotage hebdo + reporting exécutif — vous savez où va chaque euro",
        "Agents IA pour A/B testing, bid management et exclusions automatiques",
        "Dev Fullstack dédié pour tracking avancé, CAPI et dashboards custom",
        "Sans silo : aligné avec SEO, CRM et funnel produit",
        "Résultats visibles en 90 jours — pas de contrat qui vous enferme",
      ]}
      benefits={[
        {
          title: "Stratégie SEA & audit de comptes",
          description:
            "Audit complet de vos comptes Google Ads, Bing Ads et Display. Analyse de la structure, des audiences, des mots-clés, des annonces, du tracking et des performances historiques pour bâtir une stratégie SEA alignée sur vos objectifs business.",
        },
        {
          title: "Gestion de campagnes Google, Bing & Shopping",
          description:
            "Création, segmentation, rédaction d'annonces performantes, gestion des enchères, automatisation et suivi des conversions. Nous pilotons vos campagnes Google Ads, Bing Ads, Google Shopping et Display pour maximiser votre ROI.",
        },
        {
          title: "Optimisation continue, automatisation & reporting",
          description:
            "A/B testing, ajustement des enchères, automatisation des tâches récurrentes, analyse des performances, reporting détaillé (Looker Studio, dashboards custom) et recommandations stratégiques pour une croissance durable et mesurable.",
        },
      ]}
      processTitle="Notre méthodologie Paid Media en 3 étapes"
      processSubtitle="Un cadre éprouvé — de l'audit au scale, avec pilotage senior et agents IA en production."
      processSteps={[
        {
          title: "Audit de comptes & définition de la stratégie SEA",
          description:
            "Audit complet de vos comptes publicitaires : structure, audiences, mots-clés, annonces, tracking, performances historiques. Nous définissons une stratégie SEA personnalisée et alignée sur vos objectifs business.",
        },
        {
          title: "Création, gestion & optimisation des campagnes",
          description:
            "Création, gestion et optimisation de vos campagnes Google Ads, Bing Ads, Display et Shopping : formats, segmentation avancée, rédaction d'annonces, gestion des enchères, automatisation, suivi des conversions et ajustements continus.",
        },
        {
          title: "Automatisation, suivi des conversions & reporting avancé",
          description:
            "Automatisation des tâches récurrentes, suivi précis des conversions (CAPI, server-side), reporting avancé (Looker Studio, dashboards personnalisés), analyse des performances et recommandations stratégiques pour garantir la progression.",
        },
      ]}
      faqTitle="Questions fréquentes sur la gestion Paid Media & SEA"
      faq={[
        {
          question: "Quelles sont les étapes d'une stratégie Paid Media performante ?",
          answer:
            "Notre méthode en 3 étapes : audit complet (comptes, audiences, tracking, concurrence), lancement avec segmentation avancée et créas testées, puis optimisation continue par A/B testing, automatisation et reporting exécutif hebdomadaire. Résultats visibles sous 90 jours.",
        },
        {
          question: "Quels outils utilisez-vous pour piloter les campagnes Paid Media ?",
          answer:
            "Google Ads, Microsoft Ads, Google Analytics 4, Looker Studio, Tag Manager, CAPI server-side, plus nos propres agents IA maison pour l'A/B testing des créas, la gestion dynamique des enchères et les exclusions automatiques. Tracking serveur-side pour fiabiliser la donnée.",
        },
        {
          question: "Combien de temps pour voir les résultats d'une campagne Paid Media ?",
          answer:
            "Les premiers signaux remontent en 2 à 4 semaines (CPL, CTR, premières conversions). Une courbe de performance stabilisée s'obtient généralement en 90 jours — le cadre que nous vous engageons. Nous priorisons les quick wins 30 jours en parallèle des chantiers structurants.",
        },
        {
          question: "Le Paid Media est-il adapté à tous les secteurs ?",
          answer:
            "Oui pour la plupart des scale-ups B2B, SaaS, e-commerce et marketplaces. Nous auditons votre marché, votre offre et votre cycle de vente pendant la phase 01 avant d'engager du budget média. Si le Paid Media n'est pas le bon levier pour vous, nous le disons.",
        },
        {
          question: "Accompagnez-vous la gestion, l'optimisation et le reporting ?",
          answer:
            "Oui. Pilotage hebdo par un expert senior uclic, reporting exécutif mensuel, dashboard temps réel accessible 24/7, et ajustements continus. Vous gardez un accès direct au traffic manager — pas de SDR, pas de junior en sous-traitance.",
        },
        {
          question: "Proposez-vous un audit de mes campagnes actuelles ?",
          answer:
            "Oui. La phase 01 de notre méthode — audit stratégique — est offerte : 0€, sans engagement. Livrable sous 48h : rapport exécutif + roadmap priorisée 12 mois. C'est le point de départ obligatoire avant toute collaboration.",
        },
      ]}
      closingBlurb="De l'audit au scale : 48h pour démarrer. Notre agence Paid Media vous remet un diagnostic exécutif + une roadmap priorisée 12 mois, offert — pour décider en connaissance de cause."
    />
  );
}
