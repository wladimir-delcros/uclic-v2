/**
 * Simulation de strategie growth pour le formulaire /simulation.
 * Logique portee depuis V1 (src/app/simulation/page.tsx) en TypeScript pur,
 * sans dependance externe. Toutes les valeurs sont des estimations indicatives
 * calibrees sur notre portefeuille clients.
 */

export interface SimulationAnswers {
  secteur?: string;
  budget?: string;
  defi?: string;
  timing?: string;
  source?: string;
  ca?: string;
}

export interface StrategyPillar {
  label: string;
  desc: string;
}

export interface SimulationStrategy {
  leadsGain: string; // ex: "+240%"
  cac: string;      // ex: "-45%"
  delay: string;    // ex: "6 semaines"
  piliers: StrategyPillar[];
  score: number;    // 0-100
}

/**
 * Genere un plan growth a partir des reponses du questionnaire.
 * Les valeurs sont des moyennes observees sur notre portefeuille client,
 * pas une promesse contractuelle.
 */
export function buildStrategy(answers: SimulationAnswers): SimulationStrategy {
  const leadsGain =
    answers.source === 'Aucun'
      ? '+400%'
      : answers.source === 'Reseau'
      ? '+280%'
      : answers.source === 'SEO'
      ? '+180%'
      : '+240%';

  const cac =
    answers.budget === '>30k'
      ? '-61%'
      : answers.budget === '10k-30k'
      ? '-52%'
      : answers.budget === '2k-10k'
      ? '-38%'
      : '-45%';

  const delay =
    answers.timing === 'ASAP'
      ? '4 semaines'
      : answers.timing === '1 mois'
      ? '6 semaines'
      : '8 semaines';

  const piliers: StrategyPillar[] = [];
  if (answers.source === 'Aucun' || answers.source === 'Reseau') {
    piliers.push({
      label: 'Inbound SEO + Ads',
      desc: 'Construire votre visibilite organique et payante en parallele.',
    });
  }
  if (
    answers.defi === 'Plus de leads' ||
    answers.source === 'Reseau' ||
    answers.source === 'Aucun'
  ) {
    piliers.push({
      label: 'Outbound IA & cold email',
      desc: 'Sequences automatisees vers vos cibles ideales, avec scoring IA.',
    });
  }
  if (
    answers.defi === 'Automatisation' ||
    (answers.budget && answers.budget !== '<2k' && answers.budget !== 'Indefini')
  ) {
    piliers.push({
      label: 'Automation & agents IA',
      desc: 'Workflows n8n, scoring leads, CRM automatise, reporting live.',
    });
  }
  if (answers.defi === 'Conversion' || answers.ca === '>10M') {
    piliers.push({
      label: 'CRO & landing pages',
      desc: 'Optimiser la conversion a chaque etape du funnel.',
    });
  }
  if (answers.defi === 'International') {
    piliers.push({
      label: 'Expansion internationale',
      desc: 'SEO multilingue, ads multi-pays, localisation.',
    });
  }
  if (piliers.length < 2) {
    piliers.push({
      label: 'Data & reporting revenue',
      desc: 'Dashboard OKR, attribution, pilotage par les revenus.',
    });
  }

  const score = Math.min(
    68 +
      (answers.ca === '>10M' ? 12 : answers.ca === '2M-10M' ? 8 : 4) +
      (answers.budget === '>30k' ? 10 : answers.budget === '10k-30k' ? 6 : 2) +
      (answers.defi === 'Automatisation' ? 5 : 3),
    98,
  );

  return { leadsGain, cac, delay, piliers, score };
}
