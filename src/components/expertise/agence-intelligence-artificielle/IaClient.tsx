'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function IaClient() {
  return (
    <ExpertiseClient
      eyebrow="Agence Intelligence Artificielle"
      h1Plain="Conseil, automatisation, agents IA &"
      h1Highlight="IA sur-mesure."
      subtitle="Notre agence IA vous aide à identifier les cas d’usage les plus rentables, à automatiser vos processus et à déployer des agents IA en production — rapidement, sans complexité technique. Pilotage Growth Lead senior + Dev Fullstack dédié."
      whyTitle="Pourquoi Uclic"
      whyIntro="Une agence IA ne se limite pas à des formations : elle conçoit et déploie des solutions concrètes qui transforment votre efficacité opérationnelle. Chatbots, standardistes IA, agents autonomes, automatisation de workflows — nos projets sont mesurables, évolutifs et intégrés à vos outils existants."
      whyBullets={[
        'Diagnostic IA personnalisé — on ne vend pas de POC qui finissent au placard',
        'Agents IA en production : assistants métiers, scoring, standardistes',
        'Stack moderne : OpenAI, Anthropic, LangChain, Vertex AI, n8n, Make',
        'Dev Fullstack dédié pour intégrer l’IA à votre CRM, ERP, outils métier',
        'Formation ciblée de vos équipes + RGPD, éthique, sécurité',
        'Indicateurs de performance pour suivre l’impact réel sur le business',
      ]}
      benefits={[
        {
          title: 'Accélérez votre compétitivité',
          description:
            'Intégrez les meilleures pratiques pour mettre l’intelligence artificielle au cœur de vos processus métier. Vos équipes apprennent à automatiser les tâches répétitives, structurer les données et exploiter tout le potentiel de l’IA pour générer des gains de productivité durables et mesurables.',
        },
        {
          title: 'Maîtrisez les outils IA de référence',
          description:
            'Nous formons vos équipes à des outils de pointe : OpenAI, Anthropic, LangChain, Vertex AI, n8n, Make… Au-delà des outils, nous transmettons une méthodologie complète pour structurer des projets IA robustes, entraîner ou piloter des modèles performants et les déployer en production.',
        },
        {
          title: 'Créez un avantage stratégique durable',
          description:
            'Nous vous accompagnons à chaque étape : du cadrage initial à la mise en production, en passant par l’évaluation des données, l’entraînement des modèles et le suivi des performances. Vos projets IA sont structurés avec rigueur, avec des résultats tangibles et une adoption rapide.',
        },
      ]}
      processTitle="Un accompagnement structuré pour concrétiser vos projets d’IA"
      processSubtitle="Chez Uclic, nous ne vendons pas de promesses vagues : un processus clair, itératif et orienté résultats. De l’identification des cas d’usage à l’implémentation opérationnelle, chaque étape maximise l’impact de l’IA."
      processSteps={[
        {
          title: 'Détection des opportunités IA',
          description:
            'Audit stratégique de vos processus métier pour identifier les leviers d’automatisation ou d’optimisation par l’IA. Cette phase inclut un diagnostic complet, des interviews métiers et l’analyse de la data disponible afin de faire émerger des cas d’usage concrets à forte valeur ajoutée.',
        },
        {
          title: 'Prototype et validation terrain',
          description:
            'Sur la base des cas identifiés, nous concevons un POC rapide, souvent via des modèles préentraînés ou des briques low-code IA. Ce prototype est testé sur un périmètre restreint pour mesurer les gains en productivité, fiabilité ou réduction des coûts. Vos équipes participent à la validation fonctionnelle.',
        },
        {
          title: 'Déploiement & montée en compétences',
          description:
            'Nous industrialisons la solution validée en l’intégrant dans vos outils existants (CRM, ERP, logiciels métier…). Formations ciblées, indicateurs de performance, suivi de l’impact réel. Vous devenez autonome dans la gestion et l’évolution de votre IA.',
        },
      ]}
      faqTitle="Questions fréquentes sur notre agence IA"
      faq={[
        {
          question: 'Qu’est-ce qu’une agence IA exactement ?',
          answer:
            'Un partenaire spécialisé dans le déploiement de solutions d’intelligence artificielle pour les entreprises. Nous vous aidons à identifier les cas d’usage pertinents, à développer des prototypes (chatbots, automatisations, agents, prédiction…), puis à les industrialiser pour générer des gains concrets (productivité, réduction des coûts, expérience client).',
        },
        {
          question: 'En quoi une agence IA peut-elle m’aider concrètement ?',
          answer:
            'Accompagnement de A à Z : audit de vos process, détection des leviers IA, création de solutions sur mesure (GPT, agents, RPA, NLP), formation des équipes, intégration technique, mise en production et maintenance. Vous gagnez du temps, montez en compétence et rentabilisez vos investissements rapidement.',
        },
        {
          question: 'Quels types de projets peut-on confier à une agence IA ?',
          answer:
            'Tout projet avec des tâches répétitives, de la donnée, ou des décisions à automatiser : chatbot de service client, résumé automatique de documents, scoring commercial, analyse d’emails entrants, génération de contenu, prévisions de ventes, standardiste IA, etc.',
        },
        {
          question: 'Combien coûte un projet avec une agence IA ?',
          answer:
            'Le budget dépend du périmètre, de la complexité et du niveau de personnalisation. Nous proposons des offres packagées, des abonnements mensuels ou des prestations sur mesure selon vos objectifs. Le point de départ reste l’audit stratégique offert.',
        },
        {
          question: 'Quelle différence entre une agence IA et un freelance prompt engineer ?',
          answer:
            'Un prompt engineer peut vous aider à tester rapidement des cas d’usage, mais une agence IA apporte un accompagnement complet : cadrage stratégique, développement, intégration, éthique, formation, RGPD… C’est la différence entre un outil bricolé et une solution opérationnelle et sécurisée.',
        },
        {
          question: 'Combien de temps faut-il pour mettre en place une solution IA ?',
          answer:
            'Un premier prototype peut être livré en 2 à 3 semaines. Le déploiement complet prend généralement 4 à 8 semaines selon les intégrations et les tests requis. Nos projets sont pensés pour être rapides à implémenter, mesurables et évolutifs.',
        },
      ]}
      closingBlurb="Du diagnostic au déploiement : 48h pour démarrer. Notre agence IA vous remet un audit des cas d’usage + une roadmap priorisée, offert — pour décider en connaissance de cause."
    />
  );
}
