import type { ComponentType } from 'react';
import {
  Rocket,
  Megaphone,
  Search,
  BarChart3,
  BrainCircuit,
  Palette,
  Users,
  Workflow,
  FileText,
  Wrench,
  Building2,
  Banknote,
  Calculator,
  Handshake,
  Phone,
  Briefcase,
  Sparkles,
  UserPlus,
} from 'lucide-react';

export type NavLink = {
  label: string;
  href: string;
};

export type ExpertiseEntry = {
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  tagline: string;
};

export type ExpertiseColumn = {
  title: string;
  items: ExpertiseEntry[];
};

export type RessourceGroup = {
  title: string;
  items: ExpertiseEntry[];
};

// Main navigation (desktop)
export const mainNav: Array<
  | { kind: 'link'; label: string; href: string }
  | { kind: 'mega'; label: string; href: string; id: 'expertises' }
  | { kind: 'dropdown'; label: string; href: string; id: 'ressources' }
> = [
  { kind: 'mega', label: 'Expertises', href: '/expertise', id: 'expertises' },
  { kind: 'link', label: 'Cas clients', href: '/cas-clients' },
  { kind: 'dropdown', label: 'Ressources', href: '#', id: 'ressources' },
  { kind: 'link', label: 'Tarifs', href: '/tarifs' },
  { kind: 'link', label: 'Contact', href: '/contact' },
];

// Expertise mega menu columns (3 cols, bento-inspired).
// Slugs correspondent à ceux utilisés dans Footer.tsx (expertise/[category]).
export const expertiseColumns: ExpertiseColumn[] = [
  {
    title: 'Acquisition',
    items: [
      {
        label: 'Growth Marketing',
        href: '/expertise/growth-marketing',
        Icon: Rocket,
        tagline: 'Pilotage senior + experts canaux + agents IA.',
      },
      {
        label: 'Paid Media',
        href: '/expertise/agence-paid-media',
        Icon: Megaphone,
        tagline: 'Google, Meta, LinkedIn, TikTok — ROAS first.',
      },
      {
        label: 'SEO',
        href: '/expertise/agence-seo',
        Icon: Search,
        tagline: 'SEO technique, contenu, GEO (AI Overviews).',
      },
      {
        label: 'Social Ads',
        href: '/expertise/agence-sma',
        Icon: Sparkles,
        tagline: 'Creative-first sur Meta, TikTok, LinkedIn.',
      },
    ],
  },
  {
    title: 'Data & IA',
    items: [
      {
        label: 'Data Analytics',
        href: '/expertise/agence-data-analytics',
        Icon: BarChart3,
        tagline: 'Tracking, dashboards, attribution & LTV.',
      },
      {
        label: 'Intelligence Artificielle',
        href: '/expertise/agence-intelligence-artificielle',
        Icon: BrainCircuit,
        tagline: 'Agents IA, RAG, automatisations métier.',
      },
      {
        label: 'Workflows n8n',
        href: '/membres/workflows',
        Icon: Workflow,
        tagline: 'Bibliothèque de workflows prêts à l’emploi.',
      },
      {
        label: 'CRM & Lifecycle',
        href: '/expertise/crm-gestion-de-la-relation-client',
        Icon: Users,
        tagline: 'HubSpot, Salesforce, Brevo — activation.',
      },
    ],
  },
  {
    title: 'Brand & B2B',
    items: [
      {
        label: 'Branding',
        href: '/expertise/agence-branding',
        Icon: Palette,
        tagline: 'Positionnement, identité, messaging.',
      },
      {
        label: 'Services de Scraping',
        href: '/scraping',
        Icon: Briefcase,
        tagline: 'Bases de prospects qualifiés sur-mesure.',
      },
      {
        label: 'Levées de fonds',
        href: '/levee-de-fonds',
        Icon: Banknote,
        tagline: 'Accompagnement growth pre/post-seed.',
      },
      {
        label: 'Meilleures agences',
        href: '/meilleure-agence',
        Icon: Building2,
        tagline: 'Comparatif des agences growth en France.',
      },
    ],
  },
];

// Dropdown "Ressources"
export const ressourceGroups: RessourceGroup[] = [
  {
    title: 'Apprendre',
    items: [
      { label: 'Blog', href: '/blog', Icon: FileText, tagline: 'Analyses growth & IA.' },
      { label: 'Toolbox', href: '/toolbox', Icon: Wrench, tagline: 'Notre stack d’outils préférés.' },
      { label: 'Outils gratuits', href: '/outils-gratuits', Icon: Calculator, tagline: 'Calculateurs AB test, MDE…' },
    ],
  },
  {
    title: 'Équipe & valeurs',
    items: [
      { label: 'Manifeste', href: '/a-propos', Icon: Sparkles, tagline: 'Pourquoi Uclic existe, ce qui nous guide.' },
      { label: 'L’équipe', href: '/equipe', Icon: Users, tagline: 'Les experts qui pilotent vos missions.' },
      { label: 'Collectif Freelance', href: '/charte-freelance', Icon: Handshake, tagline: 'Slack commun, entraide, agents IA partagés.' },
      { label: 'Rejoindre le collectif', href: '/rejoindre', Icon: UserPlus, tagline: 'Candidature · assessment · missions.' },
      { label: 'Presse', href: '/presse', Icon: Megaphone, tagline: 'Interviews, podcasts, kit presse.' },
    ],
  },
];

// CTA du header
export const headerCTA = {
  href: '/audit',
  label: 'Audit offert',
};

// Contact rapide
export const contactPhone = {
  href: 'tel:+33617125428',
  label: '+33 6 17 12 54 28',
  Icon: Phone,
};

// Account links
export const accountLinks = {
  login: { href: '/login', label: 'Se connecter' },
  signup: { href: '/signup', label: "S'inscrire" },
};
