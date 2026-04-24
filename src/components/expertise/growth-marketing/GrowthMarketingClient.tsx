'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function GrowthMarketingClient() {
  return (
    <ExpertiseClient
      eyebrow="Agence Growth Marketing"
      h1Plain="Accélérez votre croissance"
      h1Highlight="dès maintenant."
      subtitle="Le Growth Marketing combine méthode, itération rapide et outils d’automatisation pour identifier les canaux les plus rentables. Dans un contexte où le coût d’acquisition ne cesse d’augmenter, notre approche produit des résultats mesurables en 90 jours — pilotés par un Growth Lead senior, sans silo."
      whyTitle="Pourquoi Uclic"
      whyIntro="On ne promet pas la lune : on cadre en 90 jours, on industrialise ce qui marche, on coupe ce qui ne rapporte pas. Experts canaux certifiés + agents IA en production + Dev Fullstack dédié. Pas un prestataire de plus à orchestrer — une équipe qui pilote l’ensemble de votre croissance."
      whyBullets={[
        'Cadre 90 jours : Audit → Setup → Équipe senior → Industrialisation IA',
        'Multicanal piloté : Cold Email, LinkedIn, Cold Calling, SEO, Ads',
        'Automatisation intelligente — scraping, enrichissement, scoring, séquences',
        'Stack optimale : Dropcontact, Instantly, Lemlist, Waalaxy, PhantomBuster, Make…',
        'Pilotage hebdo par un Growth Lead senior + reporting exécutif',
        'Délivrabilité : warm-up, hygiène listes, cadences maîtrisées',
      ]}
      benefits={[
        {
          title: 'Acquisition rapide et ciblée',
          description:
            'Accélérez votre génération de leads avec des campagnes multicanales performantes. Dès les premières semaines, vous obtenez des prospects qualifiés via des séquences calibrées pour la conversion (Cold Email, LinkedIn, Cold Calling…). Les bons messages, aux bonnes personnes, au bon moment.',
        },
        {
          title: 'Automatisation des tâches chronophages',
          description:
            'Ne perdez plus de temps avec des tâches manuelles. Nous intégrons et automatisons vos outils clés (scraping, enrichissement, CRM, outils d’outreach) dans des workflows sur mesure. Exécution plus rapide, équipe plus focus, meilleur ROI.',
        },
        {
          title: 'Suivi data-driven pour scaler efficacement',
          description:
            'Toutes nos campagnes sont pilotées par la donnée. Nous testons, mesurons et itérons en continu pour identifier ce qui performe vraiment. Dashboards en temps réel + reportings actionnables pour scaler les canaux et les messages les plus rentables.',
        },
      ]}
      processTitle="Notre processus Growth en 3 étapes"
      processSubtitle="Une approche structurée et orientée résultats pour lancer, scaler et automatiser vos campagnes d’acquisition avec une équipe Growth senior."
      processSteps={[
        {
          title: 'Cadrage & Persona',
          description:
            'Phase d’immersion : définition des ICP, mapping des messages, identification des canaux prioritaires. Cette étape pose les fondations d’un tunnel d’acquisition solide et cohérent, centré sur vos cibles à fort potentiel.',
        },
        {
          title: 'Setup technique & création des contenus',
          description:
            'On passe à l’opérationnel : scraping des leads, enrichissement, paramétrage des outils (PhantomBuster, Instantly, Waalaxy, Dropcontact…), création des séquences et rédaction de messages personnalisés. Tout est prêt pour lancer dans les meilleures conditions.',
        },
        {
          title: 'Lancement, itérations & scaling',
          description:
            'Lancement des campagnes multicanales avec A/B testing intégré. Analyse hebdomadaire des KPIs, ajustements des séquences, optimisation des taux de réponse et scaling des canaux les plus performants. Objectif : générer un maximum d’opportunités en un minimum de temps.',
        },
      ]}
      faqTitle="Questions fréquentes sur notre accompagnement Growth Marketing"
      faq={[
        {
          question: 'Quel ROI attendre d’une stratégie de Growth Marketing avec Uclic ?',
          answer:
            'Le ROI dépend de votre offre, de votre positionnement et des canaux activés. En moyenne, une stratégie pilotée génère un coût par lead 2 à 3 fois inférieur aux campagnes payantes classiques (Ads). L’approche est plus fine, plus rapide à déployer et beaucoup plus optimisée — parce qu’elle est pilotée par un Growth Lead senior, pas par un junior.',
        },
        {
          question: 'Est-ce que le Growth fonctionne pour du B2B complexe ?',
          answer:
            'Oui. Le Growth est particulièrement adapté aux cycles de vente longs et aux cibles exigeantes. Grâce à une personnalisation avancée des messages, à des séquences multicanales et à un travail fin sur l’ICP et la qualification, on adresse des interlocuteurs de haut niveau (C-level, décideurs) avec un tunnel de nurturing calibré.',
        },
        {
          question: 'Combien de temps pour voir les premiers résultats ?',
          answer:
            'Une équipe Growth travaille vite : en général, les premiers leads qualifiés tombent sous 10 à 15 jours. Les réponses démarrent souvent dès les premiers envois, et l’optimisation permet ensuite de monter rapidement en volume sans sacrifier la qualité.',
        },
        {
          question: 'Peut-on automatiser tout le process Growth ?',
          answer:
            'Oui, mais intelligemment. Scraping, enrichissement, séquences, scoring… tout peut être automatisé sans perdre la personnalisation. C’est cette finesse qui fait la différence entre une campagne de masse et une stratégie Growth qui convertit vraiment.',
        },
        {
          question: 'Quels outils utilisez-vous ?',
          answer:
            'Selon vos objectifs et votre stack : Dropcontact, Instantly, Lemlist, Waalaxy, PhantomBuster, Make, Apollo, LaGrowthMachine… Chaque projet a sa stack optimale. L’important, c’est de connecter les outils entre eux pour un workflow fluide et scalable.',
        },
        {
          question: 'Le Growth met-il en danger ma réputation d’envoi ?',
          answer:
            'Non, si c’est fait proprement. Nous respectons toutes les bonnes pratiques d’emailing B2B : warm-up des domaines, hygiène des listes, cadences maîtrisées, suivi des taux d’ouverture et de spam. La délivrabilité est une priorité — pas une option.',
        },
      ]}
      closingBlurb="Du cadrage à la machine : 48h pour démarrer. Notre agence Growth vous remet un audit + un plan 90 jours, offert — pour décider en connaissance de cause."
    />
  );
}
