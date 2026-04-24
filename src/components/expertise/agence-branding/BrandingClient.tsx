'use client';
import ExpertiseClient from '../ExpertiseClient';

export default function BrandingClient() {
  return (
    <ExpertiseClient
      eyebrow="Agence Branding"
      h1Plain="Développez un univers de marque"
      h1Highlight="fort et cohérent."
      subtitle="Notre agence de branding vous aide à bâtir une identité visuelle mémorable, un positionnement différenciateur et un discours de marque qui capte l’attention… et reste en tête. Design stratégique, piloté par un Growth Lead senior, industrialisé par nos agents IA."
      whyTitle="Pourquoi Uclic"
      whyIntro="Dans un écosystème où l’attention est une ressource rare, le branding n’est plus un luxe : c’est un accélérateur de croissance. Nous ne dessinons pas qu’un joli logo — nous clarifions votre ADN, votre positionnement et déployons une image cohérente sur tous vos canaux, sans les lourdeurs d’une agence classique en silo."
      whyBullets={[
        'Positionnement stratégique avant le design — on cadre avant de créer',
        'Identité sur-mesure : logo, typographie, palette, iconographie',
        'Brand Book complet pour garder la cohérence dans le temps',
        'Déclinaisons prêtes à l’emploi : site, réseaux, pitch, docs pro',
        'Cession de droits 100 % incluse — vos visuels vous appartiennent',
        'Pilotage senior + ajustements post-livraison, sans friction',
      ]}
      benefits={[
        {
          title: 'Une identité unique qui vous ressemble',
          description:
            'Un regard extérieur affûté pour construire une identité visuelle cohérente, mémorable et en phase avec vos valeurs. Exit les templates génériques : place à une approche sur-mesure qui vous distingue clairement de vos concurrents.',
        },
        {
          title: 'Une flexibilité précieuse pour vos projets',
          description:
            'Notre approche branding s’adapte à vos deadlines, vos cycles de production et vos contraintes de budget. Vous avancez rapidement tout en gardant la main sur chaque étape : positionnement, logo, charte graphique, ton de voix…',
        },
        {
          title: 'Une expertise complète, en direct',
          description:
            'Vous échangez directement avec les experts qui conçoivent votre branding. Moins d’intermédiaires, plus de réactivité, une cohérence stratégique du début à la fin — vision consultant + savoir-faire designer.',
        },
      ]}
      processTitle="Notre méthode de branding en 3 étapes"
      processSubtitle="Une approche stratégique et créative pour construire une marque alignée avec vos valeurs, vos cibles et vos ambitions business."
      processSteps={[
        {
          title: 'Diagnostic & Positionnement',
          description:
            'Avant de créer quoi que ce soit, on écoute. On analyse votre écosystème, vos concurrents, vos clients, et on clarifie votre mission, votre vision et votre valeur unique. Objectif : construire une plateforme de marque cohérente et différenciante.',
        },
        {
          title: 'Design de l’identité visuelle',
          description:
            'Logo, typographies, couleurs, iconographie… chaque élément est pensé pour incarner votre essence. Pas de templates : tout est sur-mesure pour refléter votre positionnement et générer de la confiance instantanée.',
        },
        {
          title: 'Déploiement & cohérence',
          description:
            'On déploie votre identité sur vos supports clés (site, réseaux, pitch, documents pro) et on vous remet un Brand Book complet pour garantir une cohérence graphique dans le temps, même en autonomie.',
        },
      ]}
      faqTitle="Questions fréquentes sur notre accompagnement branding"
      faq={[
        {
          question: 'Pourquoi travailler avec Uclic plutôt qu’une agence branding classique ?',
          answer:
            'Notre approche branding est plus agile, plus réactive et plus impliquée. Vous bénéficiez d’un accompagnement sur-mesure, sans intermédiaire, avec une vraie proximité et une relation directe avec le créatif qui porte votre projet — piloté par un Growth Lead senior qui garantit l’alignement business.',
        },
        {
          question: 'Quelles sont les étapes d’un accompagnement branding ?',
          answer:
            'Chez Uclic, le processus se fait en 3 temps : 1) diagnostic stratégique, 2) design de l’identité visuelle, 3) déclinaisons et livrables. C’est structuré, efficace et totalement personnalisé.',
        },
        {
          question: 'Combien de temps dure une mission de branding ?',
          answer:
            'Tout dépend de la complexité du projet, mais en général, il faut compter entre 2 et 4 semaines pour une mission complète : analyse, création, livrables et guide de marque.',
        },
        {
          question: 'Que livrez-vous à la fin du projet ?',
          answer:
            'Un logo dans tous les formats, une charte graphique complète, des déclinaisons visuelles (réseaux sociaux, pitch deck, signature mail…) et un Brand Book centralisé pour garantir la cohérence dans le temps.',
        },
        {
          question: 'Est-ce que je garde les droits sur les créations ?',
          answer:
            'Oui, tous les visuels livrés sont 100 % à vous. Une cession de droits complète est incluse dans chaque projet. Vous êtes libre d’exploiter votre identité comme bon vous semble.',
        },
        {
          question: 'Et si j’ai besoin d’adaptations plus tard ?',
          answer:
            'Nous restons disponibles après la mission pour des ajustements, déclinaisons ou supports supplémentaires. Vous n’êtes jamais seul après la livraison — pas de contrat qui vous enferme, pas de rupture brutale.',
        },
      ]}
      closingBlurb="Du diagnostic au Brand Book : 48h pour démarrer. Notre agence branding vous remet un cadrage stratégique + une direction créative, offert — pour décider en connaissance de cause."
    />
  );
}
