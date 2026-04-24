'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function CrmClient() {
  return (
    <ExpertiseClient
      eyebrow="Agence CRM & RevOps"
      h1Plain="Optimisez votre croissance avec un CRM"
      h1Highlight="bien structuré."
      subtitle="Nos experts CRM vous accompagnent dans la mise en place ou l’optimisation de votre stack pour booster votre acquisition, conversion et rétention. De la stratégie RevOps à l’automatisation marketing, en passant par la gestion de la donnée client — piloté par un Growth Lead senior, sans silo."
      whyTitle="Pourquoi Uclic"
      whyIntro="Un CRM bien structuré, ce n’est pas juste une base de contacts : c’est l’épine dorsale de votre croissance. Nous alignons marketing, sales et support autour d’une donnée client fiable, centralisée et actionnable — avec un cadrage business avant tout paramétrage technique."
      whyBullets={[
        'Agnostique outils : HubSpot, Pipedrive, Salesforce, Notion, Airtable…',
        'Cartographie complète des process avant toute implémentation',
        'Automatisations marketing + sales (scoring, nurturing, séquences)',
        'Dashboards de pilotage pour équipes et direction — attribution propre',
        'Formation personnalisée par rôle (Sales, Marketing, Support)',
        'Optimisation continue post-déploiement, chaque mois',
      ]}
      benefits={[
        {
          title: 'Une vision client unifiée',
          description:
            'Centralisez toutes vos données prospects et clients dans un CRM structuré. Fini les silos entre marketing, sales et support : vous accédez à une vue 360° de votre pipeline et des parcours clients pour des décisions plus éclairées.',
        },
        {
          title: 'Des process fluides & scalables',
          description:
            'Nous modélisons vos processus métier (marketing automation, lead nurturing, scoring, qualification) dans un système évolutif. Résultat : des équipes alignées, plus rapides, et une acquisition plus rentable.',
        },
        {
          title: 'Un pilotage précis de la performance',
          description:
            'Grâce à des dashboards clairs et une attribution bien configurée, vous mesurez l’impact de chaque action sur la conversion et le revenu. Le CRM devient un outil de pilotage pour vos équipes et votre direction.',
        },
      ]}
      processTitle="Notre processus CRM en 3 étapes"
      processSubtitle="Une approche claire et itérative pour structurer un CRM aligné avec vos process métiers, vos outils et vos objectifs business."
      processSteps={[
        {
          title: 'Audit & cartographie des processus',
          description:
            'Nous analysons vos processus actuels (marketing, ventes, support) pour identifier les points de friction, les doublons et les zones non couvertes. Nous auditons aussi les outils utilisés, les workflows manuels et la qualité des données. Cette phase pose une base solide avant toute implémentation.',
        },
        {
          title: 'Design & structuration du CRM',
          description:
            'Nous concevons l’architecture de votre CRM : entités (contacts, deals, entreprises), pipelines, automatisations, propriétés clés et tableaux de bord. Objectif : un outil intuitif, facilement pris en main, aligné avec vos process métiers et vos objectifs business.',
        },
        {
          title: 'Déploiement, formation & amélioration continue',
          description:
            'Nous accompagnons vos équipes dans le déploiement avec une documentation claire, des sessions de formation ciblées et un suivi post-lancement. Chaque mois, nous analysons les usages pour optimiser les automatisations, enrichir les dashboards et assurer une montée en puissance continue.',
        },
      ]}
      faqTitle="Questions fréquentes sur notre accompagnement CRM"
      faq={[
        {
          question: 'Pourquoi faire appel à une agence CRM plutôt que tout faire en interne ?',
          answer:
            'Parce qu’un CRM mal structuré coûte plus cher qu’il ne rapporte. Une agence CRM vous fait gagner du temps, évite les erreurs de configuration et vous permet de tirer rapidement de la valeur métier de votre outil — sans réinventer la roue à chaque projet.',
        },
        {
          question: 'Quels outils CRM peut-on structurer avec vous ?',
          answer:
            'Nous travaillons principalement avec HubSpot, Pipedrive, Salesforce et Notion CRM, et parfois des solutions custom (Airtable, Make, Zapier, n8n). Notre approche est agnostique : on vous aide à choisir l’outil qui colle à vos besoins, pas l’inverse.',
        },
        {
          question: 'Combien de temps prend une mission CRM complète ?',
          answer:
            'Entre 3 et 6 semaines selon la complexité de votre organisation, la qualité de vos données existantes et les intégrations à prévoir. Certaines automatisations peuvent être déployées dès la première semaine.',
        },
        {
          question: 'Peut-on faire uniquement un audit de notre CRM actuel ?',
          answer:
            'Oui. Nous proposons un audit seul avec une restitution complète : analyse de la structure actuelle, des failles, des doublons, de la qualité des datas et des quick wins à activer. C’est souvent le point de départ.',
        },
        {
          question: 'Est-ce qu’on forme nos équipes à l’usage du CRM ?',
          answer:
            'Bien sûr. La formation fait partie de la phase 3. Elle est adaptée à chaque rôle (Sales, Marketing, Support) et livrée avec une documentation simple pour assurer la montée en compétence rapide de vos équipes.',
        },
        {
          question: 'Quels résultats peut-on attendre d’un CRM bien structuré ?',
          answer:
            'Une meilleure productivité, moins de leads oubliés, un pipeline lisible, des reportings fiables et surtout plus de chiffre d’affaires. Un CRM bien structuré, c’est un levier de croissance à court, moyen et long terme.',
        },
      ]}
      closingBlurb="De l’audit au CRM opérationnel : 48h pour démarrer. Notre équipe CRM vous remet un audit + une roadmap priorisée, offert — pour décider en connaissance de cause."
    />
  );
}
