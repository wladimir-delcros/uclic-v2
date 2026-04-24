'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function DataAnalyticsClient() {
  return (
    <ExpertiseClient
      eyebrow="Agence Data Analytics"
      h1Plain="Libérez le potentiel"
      h1Highlight="de vos données."
      subtitle="Nous structurons, analysons et exploitons vos données pour prendre les bonnes décisions. Amélioration du taux de conversion, suivi des performances de campagnes, dashboards intelligents : nos experts data rendent la donnée lisible et actionnable, pilotés par un Growth Lead senior."
      whyTitle="Pourquoi Uclic"
      whyIntro="La majorité des entreprises collectent de la data, mais peu l’utilisent intelligemment. Sans architecture robuste ni stratégie claire, vos outils CRM, dashboards ou campagnes deviennent inefficaces. Nous structurons votre approche — de la collecte à la visualisation — pour créer un pilotage clair, sans silo."
      whyBullets={[
        'Audit des sources : CRM, web analytics, bases clients, ERP',
        'Architecture data fiable : warehouse, tracking, dashboards',
        'Outils BI de référence : Looker Studio, Power BI, Tableau, BigQuery, GA4',
        'Automatisation des flux entre sources pour fiabiliser les KPIs',
        'Modèles prédictifs et insights activables pour le marketing et les ops',
        'Formation des équipes pour devenir autonomes sur vos dashboards',
      ]}
      benefits={[
        {
          title: 'Décisions pilotées par la donnée',
          description:
            'Grâce à une architecture data robuste, vos décisions sont basées sur des insights concrets et non sur l’instinct. Chaque action est justifiée par des indicateurs précis issus de vos outils analytics et CRM.',
        },
        {
          title: 'Meilleur ROI marketing',
          description:
            'Une équipe data vous aide à identifier les campagnes les plus rentables, à suivre les conversions avec précision et à détecter les fuites dans vos tunnels de vente. Résultat : un budget marketing optimisé en continu.',
        },
        {
          title: 'Automatisation & productivité',
          description:
            'De la création de dashboards automatisés à l’intégration de flux entre vos sources (CRM, Google Analytics, ERP…), vous gagnez du temps et éliminez les tâches manuelles à faible valeur ajoutée.',
        },
      ]}
      processTitle="Notre processus Data Analytics en 3 étapes"
      processSubtitle="Un cadre clair pour structurer vos données, améliorer vos performances et piloter votre activité avec précision."
      processSteps={[
        {
          title: 'Audit & cartographie des données',
          description:
            'Nous analysons vos sources de données (CRM, web analytics, bases clients, etc.) et cartographions les flux d’information pour détecter les doublons, les silos ou les pertes de valeur.',
        },
        {
          title: 'Structuration & automatisation',
          description:
            'Nous mettons en place une architecture claire (data warehouse, dashboards, tracking), en automatisant les flux pour fiabiliser vos KPI et faciliter les prises de décision.',
        },
        {
          title: 'Analyse & activation',
          description:
            'Nous transformons la donnée brute en insights exploitables grâce à des outils BI, des rapports dynamiques et des modèles prédictifs. Objectif : générer des actions business concrètes.',
        },
      ]}
      faqTitle="Questions fréquentes sur notre accompagnement data analytics"
      faq={[
        {
          question: 'Qu’est-ce qu’une agence data analytics ?',
          answer:
            'Une équipe spécialisée dans la collecte, l’analyse et la visualisation de vos données pour en extraire des insights exploitables. Nous transformons vos données brutes en tableaux de bord clairs, KPI et recommandations stratégiques pour piloter votre entreprise.',
        },
        {
          question: 'Pourquoi faire appel à une agence d’analyse de données ?',
          answer:
            'Externaliser l’analyse de vos données permet de bénéficier d’une expertise pointue en data engineering, BI, tracking et visualisation sans avoir à recruter en interne. Vous gagnez en précision, en temps et en impact sur vos décisions.',
        },
        {
          question: 'Quels outils de data analytics utilisez-vous ?',
          answer:
            'Nous utilisons des solutions de référence comme Google Looker Studio, Power BI, Tableau, BigQuery et GA4. Nous sélectionnons les meilleurs outils en fonction de vos besoins métiers et de votre stack existante.',
        },
        {
          question: 'Combien coûte une prestation de data analytics ?',
          answer:
            'Les tarifs d’une mission data varient selon le périmètre : audit, tracking, dashboards, data visualisation, etc. Nos projets s’adaptent à votre maturité data et à vos objectifs business — le point de départ reste toujours l’audit stratégique offert.',
        },
        {
          question: 'Est-ce que vous formez les équipes à l’usage des dashboards ?',
          answer:
            'Oui, nous proposons des formations à vos équipes marketing, produit ou finance pour une prise en main totale des dashboards, outils BI et KPIs. Objectif : vous rendre autonomes dans l’analyse et la lecture des données.',
        },
        {
          question: 'Combien de temps faut-il pour mettre en place une stack data ?',
          answer:
            'Selon la complexité du projet, une mission data prend en moyenne 2 à 6 semaines. Nous priorisons toujours les actions à fort ROI : tracking propre, dashboards métiers et premiers rapports automatisés.',
        },
      ]}
      closingBlurb="De l’audit à l’activation : 48h pour démarrer. Notre équipe data vous remet un audit + une roadmap priorisée, offert — pour décider en connaissance de cause."
    />
  );
}
