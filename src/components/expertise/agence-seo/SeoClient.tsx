'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function SeoClient() {
  return (
    <ExpertiseClient
      eyebrow="SEO · Référencement naturel"
      h1Plain="Agence"
      h1Highlight="SEO."
      subtitle="Référencement naturel, stratégie de visibilité Google & croissance organique sur-mesure. Audit technique approfondi, optimisation sémantique, netlinking qualitatif, SEO local, SEO & IA (AI Overviews, ChatGPT). Experts canaux certifiés + agents IA en production, pilotés par un Growth Lead senior."
      whyTitle="Pourquoi Uclic"
      whyIntro="Notre agence SEO maîtrise l'ensemble des leviers du référencement naturel et les nouveaux territoires de la recherche (AI Overviews, ChatGPT Search, Perplexity). Pas de prestations isolées : une stratégie complète pilotée en 90 jours, industrialisée par des agents IA pour produire du contenu à l'échelle sans casser la qualité."
      whyBullets={[
        "Audit technique 360° — crawl, indexation, Core Web Vitals, sécurité",
        "SEO sémantique + AI Overviews & GEO — visibilité sur Google ET les LLMs",
        "Netlinking qualitatif — acquisition de backlinks thématiques, pas de PBN",
        "Agents IA pour génération de contenu à l'échelle (briefs, maillage, YMYL)",
        "Dev Fullstack dédié pour migrations, schema.org et optimisations techniques",
        "Reporting exécutif hebdomadaire + veille algorithmique Google",
      ]}
      benefits={[
        {
          title: "Audit SEO complet, analyse de potentiel",
          description:
            "Audit exhaustif : technique (vitesse, mobile, sécurité, indexation), sémantique (arborescence, mots-clés, intention), netlinking (profil de backlinks, autorité), UX (Core Web Vitals) et analyse concurrentielle. Objectif : bâtir une roadmap SEO priorisée par impact business.",
        },
        {
          title: "Optimisation technique, contenu & netlinking",
          description:
            "Optimisation technique avancée (vitesse, mobile first, HTTPS, balisage, crawlabilité), contenu sémantique (silos thématiques, maillage interne, intention de recherche) et netlinking qualitatif (backlinks thématiques, relations presse digitales).",
        },
        {
          title: "SEO local, IA & accompagnement multi-sites",
          description:
            "SEO local (Google Business Profile, citations, pages de localisation), optimisation pour l'IA (AI Overviews, ChatGPT Search, llms.txt, structuration des contenus), gestion multi-sites/franchises et veille algorithmique continue.",
        },
      ]}
      processTitle="Notre méthodologie SEO en 3 étapes"
      processSubtitle="De l'audit à l'accompagnement continu — un cadre éprouvé, piloté par un Growth Lead senior, industrialisé par des agents IA."
      processSteps={[
        {
          title: "Audit SEO complet & feuille de route",
          description:
            "État des lieux précis : audit technique, crawl, analyse des mots-clés, étude concurrentielle, identification des opportunités. Livrable : roadmap claire et priorisée, alignée sur vos objectifs business et votre maturité SEO actuelle.",
        },
        {
          title: "Optimisation technique, sémantique & netlinking",
          description:
            "Optimisations techniques (vitesse, mobile, sécurité, balisage, indexation), enrichissement sémantique (contenus à forte valeur ajoutée, silos, maillage interne), acquisition de backlinks qualitatifs et développement de l'autorité sur vos thématiques stratégiques.",
        },
        {
          title: "Suivi, reporting & ajustements continus",
          description:
            "Suivi des positions sur Google et AI Overviews, reporting détaillé (Looker Studio, dashboards), veille algorithmique, ajustements continus de la stratégie, conseils proactifs et pilotage senior pour garantir la progression de votre trafic qualifié et de votre ROI.",
        },
      ]}
      faqTitle="Questions fréquentes sur notre accompagnement SEO"
      faq={[
        {
          question: "Quelles sont les étapes d'une stratégie SEO performante ?",
          answer:
            "Audit complet (technique, sémantique, netlinking, concurrence), roadmap priorisée, exécution (optimisations on-site, production de contenu, netlinking), suivi continu et ajustements. Notre cadre : 90 jours pour poser les fondations et livrer les premiers résultats mesurables.",
        },
        {
          question: "Quels outils utilisez-vous pour piloter le SEO ?",
          answer:
            "Google Search Console, GA4, Ahrefs, Semrush, Screaming Frog, Looker Studio pour le reporting. Et nos propres agents IA maison pour la production de briefs sémantiques, le maillage interne automatisé, la détection d'opportunités et l'optimisation AI Overviews / GEO.",
        },
        {
          question: "Combien de temps pour voir les résultats ?",
          answer:
            "Quick wins techniques et sémantiques visibles en 30-60 jours. Trafic organique structurel : courbe stabilisée en 6 à 9 mois selon la concurrence. Notre cadre 90 jours pose les fondations et livre les premiers signaux mesurables — les compositions s'accélèrent ensuite.",
        },
        {
          question: "Le SEO est-il adapté à tous les secteurs ?",
          answer:
            "Le SEO est pertinent dès que votre audience cherche activement sur Google ou sur les LLMs (ChatGPT, Perplexity, AI Overviews). Nous auditons d'abord votre marché, le volume de recherche et le cycle de vente avant de recommander ou non le canal.",
        },
        {
          question: "Accompagnez-vous la mise en œuvre et le reporting ?",
          answer:
            "Oui. Pilotage hebdomadaire par un expert SEO senior uclic, production de contenu industrialisée (agents IA + relecture humaine), netlinking géré, dashboard temps réel, reporting exécutif mensuel. Vous gardez un accès direct à l'équipe — pas de junior en sous-traitance.",
        },
        {
          question: "Quel est le rôle de l'optimisation technique avancée ?",
          answer:
            "La technique est la fondation. Un site lent, mal indexé ou mal structuré ne décollera jamais, même avec le meilleur contenu. Nous avons un Dev Fullstack dédié qui traite migrations, schema.org, Core Web Vitals, rendu JS et optimisations server-side — sans dépendre de votre équipe tech.",
        },
      ]}
      closingBlurb="Du diagnostic à la progression durable : 48h pour démarrer. Notre agence SEO vous remet un audit exécutif + une roadmap 12 mois, offert — pour décider en connaissance de cause."
    />
  );
}
