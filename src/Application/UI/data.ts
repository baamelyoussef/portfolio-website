export type Lang = 'en' | 'fr';

export interface ExpEntry {
  role: string;
  company: string;
  period: string;
  logo: string | null;
  bullets: string[];
}

export interface ProjectEntry {
  title: string;
  tags: string;
  year: string;
  bg: string | null;
  link: string | null;
  github: string | null;
  resumeBullets: { en: string[]; fr: string[] };
}

export interface SkillRow {
  cat: string;
  items: string;
}

export const experience: Record<Lang, ExpEntry[]> = {
  en: [
    {
      role: 'Front-End Engineer',
      company: 'BTECHNOLOGIE · Bouygues Telecom × Accenture',
      period: 'Jan 2025 — Present',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bouygues_Telecom_%28alt_logo%29.svg/1280px-Bouygues_Telecom_%28alt_logo%29.svg.png',
      bullets: [
        'Led front-end delivery of web & mobile applications for Bouygues Telecom, serving millions of subscribers across France, using React, Next.js, and TypeScript',
        'Architected a Directus-powered CMS partials system enabling content teams to ship autonomously at scale while preserving engineering standards',
        'Integrated AWS backend services for asset processing and high-traffic delivery in a demanding production environment',
      ],
    },
    {
      role: 'Full-Stack Engineer',
      company: '1450 Factory · Blink Pharma',
      period: 'Sep 2023 — Sep 2024',
      logo: 'https://dharab.com/wp-content/uploads/2023/12/blinkpharma-square.png',
      bullets: [
        "Drove full-stack development of blinkpharma.ma — Morocco's leading digital pharma platform — from an initial Python/Django backend through a complete migration to a Next.js fullstack architecture",
        'Built and shipped cross-platform mobile applications for pharmaceutical clients operating under strict regulatory and quality requirements',
        'Owned the entire technical stack using React Native, Node.js, PostgreSQL, and MongoDB, from database modelling to production deployment',
      ],
    },
    {
      role: 'Full-Stack Engineer',
      company: 'MEDIOT',
      period: 'Jun 2023 — Sep 2023',
      logo: 'https://mediot.tech/wp-content/uploads/2024/05/MEDIOT_LOGO.png',
      bullets: [
        'Delivered full-stack features end to end for medical-sector SaaS applications using React.js and Node.js in Agile sprints, from specification to production',
        'Collaborated with product and design teams to uphold quality and compliance standards in a regulated healthcare environment',
      ],
    },
    {
      role: 'Full-Stack Engineer',
      company: 'Algo Consulting Group · ONCF',
      period: 'Jan 2022 — Mar 2023',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeShVCtZHpRFBYcO32O89EmsabzU6voOFxA&s',
      bullets: [
        'Enhanced the ONCF Voyages and Supratours national rail-ticket platforms, improving user experience and conversion for millions of travellers',
        "Implemented RTL Arabic localization across the full platform, extending accessibility to Morocco's Arabic-speaking majority",
        'Advised on UX strategy for the merchant portal redesign, translating complex user research into actionable technical decisions',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Freelance',
      period: 'Feb 2020 — Dec 2021',
      logo: null,
      bullets: [
        'Delivered diverse full-stack projects using Python (Django), Node.js, React.js, Vue.js, and MongoDB for clients across varied industries',
        'Managed full technical ownership — from architecture and development to delivery — across greenfield builds, CMS integrations, and legacy migrations',
      ],
    },
  ],
  fr: [
    {
      role: 'Ingénieur Front-End',
      company: 'BTECHNOLOGIE · Bouygues Telecom × Accenture',
      period: 'Jan 2025 — Présent',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bouygues_Telecom_%28alt_logo%29.svg/1280px-Bouygues_Telecom_%28alt_logo%29.svg.png',
      bullets: [
        "Développement et livraison des applications web & mobile pour Bouygues Telecom, au service de millions d'abonnés en France, avec React, Next.js et TypeScript",
        "Conception d'un système de partials piloté par le CMS headless Directus, permettant aux équipes contenu de livrer de façon autonome à l'échelle tout en maintenant les standards d'ingénierie",
        "Intégration des services AWS pour le traitement des assets et la livraison à fort trafic dans un environnement de production exigeant",
      ],
    },
    {
      role: 'Ingénieur Full-Stack',
      company: '1450 Factory · Blink Pharma',
      period: 'Sep 2023 — Sep 2024',
      logo: 'https://dharab.com/wp-content/uploads/2023/12/blinkpharma-square.png',
      bullets: [
        "Pilotage du développement full-stack de blinkpharma.ma — principale plateforme pharmaceutique digitale du Maroc — depuis le backend Python/Django initial jusqu'à la migration complète vers une architecture Next.js",
        "Développement et livraison d'applications mobiles cross-platform pour des clients pharmaceutiques soumis à des exigences réglementaires et qualité strictes",
        "Maîtrise de l'ensemble de la stack technique (React Native, Node.js, PostgreSQL, MongoDB) de la modélisation des données au déploiement en production",
      ],
    },
    {
      role: 'Ingénieur Full-Stack',
      company: 'MEDIOT',
      period: 'Juin 2023 — Sep 2023',
      logo: 'https://mediot.tech/wp-content/uploads/2024/05/MEDIOT_LOGO.png',
      bullets: [
        "Livraison de fonctionnalités full-stack bout-en-bout pour des applications SaaS dans le secteur médical (React.js, Node.js), en méthodologie Agile, de la spécification à la mise en production",
        'Collaboration étroite avec les équipes produit et design pour maintenir les standards de qualité et de conformité dans un environnement de santé réglementé',
      ],
    },
    {
      role: 'Ingénieur Full-Stack',
      company: 'Algo Consulting Group · ONCF',
      period: 'Jan 2022 — Mar 2023',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeShVCtZHpRFBYcO32O89EmsabzU6voOFxA&s',
      bullets: [
        "Amélioration des plateformes de réservation ferroviaire ONCF Voyages et Supratours, optimisant l'expérience utilisateur et la conversion pour des millions de voyageurs",
        "Mise en place de la localisation RTL en langue arabe sur l'ensemble de la plateforme, élargissant l'accessibilité à la majorité arabophone du Maroc",
        'Conseil en stratégie UX pour la refonte du portail marchand, en traduisant des recherches utilisateurs complexes en décisions techniques actionnables',
      ],
    },
    {
      role: 'Développeur Full-Stack',
      company: 'Freelance',
      period: 'Fév 2020 — Déc 2021',
      logo: null,
      bullets: [
        "Réalisation de projets full-stack variés (Python/Django, Node.js, React.js, Vue.js, MongoDB) pour des clients de secteurs d'activité divers",
        "Propriété technique complète — de l'architecture au déploiement — sur des projets from scratch, des intégrations CMS et des migrations de systèmes existants",
      ],
    },
  ],
};

export const skills: Record<Lang, SkillRow[]> = {
  en: [
    { cat: 'Front-End', items: 'React, Next.js, React Native, TypeScript, Vue.js, HTML/CSS' },
    { cat: 'Back-End', items: 'Node.js, Python (Django, FastAPI), Express' },
    { cat: 'Databases', items: 'PostgreSQL, MongoDB, Redis, MySQL' },
    { cat: 'Tools & Cloud', items: 'AWS, Docker, Directus CMS, Git, WebSockets, CRDT' },
  ],
  fr: [
    { cat: 'Front-End', items: 'React, Next.js, React Native, TypeScript, Vue.js, HTML/CSS' },
    { cat: 'Back-End', items: 'Node.js, Python (Django, FastAPI), Express' },
    { cat: 'Bases de données', items: 'PostgreSQL, MongoDB, Redis, MySQL' },
    { cat: 'Outils & Cloud', items: 'AWS, Docker, Directus CMS, Git, WebSockets, CRDT' },
  ],
};

export const projects: ProjectEntry[] = [
  {
    title: 'Heald — Put Yourself First',
    tags: 'React Native · iOS · Health & Fitness',
    year: '2025',
    bg: '/images/heald-preview.png',
    link: 'https://apps.apple.com/us/app/heald-put-yourself-first/id6756617487',
    github: null,
    resumeBullets: {
      en: ['Health & fitness iOS app published on the App Store, built with React Native'],
      fr: ["Application iOS santé & bien-être publiée sur l'App Store, développée avec React Native"],
    },
  },
  {
    title: 'Blink Premium',
    tags: 'React Native · iOS · Medical',
    year: '2024',
    bg: '/images/blink-premium-preview.png',
    link: 'https://apps.apple.com/ma/app/blink-premium/id1482286159',
    github: null,
    resumeBullets: {
      en: ['Cross-platform mobile app for the Blink Pharma ecosystem, published on the App Store'],
      fr: ["Application mobile cross-platform pour l'écosystème Blink Pharma, publiée sur l'App Store"],
    },
  },
  {
    title: 'Debrief',
    tags: 'React · Node.js · Whisper · GPT-4o mini · PostgreSQL · Redis · Docker',
    year: '2026',
    bg: '/images/debrief-preview.png',
    link: 'https://usedbrief.vercel.app/',
    github: 'https://github.com/baamelyoussef/debrief',
    resumeBullets: {
      en: [
        'AI-powered meeting intelligence tool — real-time audio transcription via OpenAI Whisper with structured summaries and action items',
        'Full-stack architecture: React frontend, Node.js API, PostgreSQL + Redis, containerised with Docker',
      ],
      fr: [
        "Outil d'intelligence réunion par IA — transcription audio en temps réel via OpenAI Whisper avec résumés structurés et points d'action",
        "Architecture full-stack : frontend React, API Node.js, PostgreSQL + Redis, conteneurisée avec Docker",
      ],
    },
  },
  {
    title: 'Outmailer',
    tags: 'Next.js · TypeScript · Email Validation · SaaS',
    year: '2022',
    bg: '/images/outmailer-preview.png',
    link: 'https://outmailer.vercel.app/',
    github: 'https://github.com/baamelyoussef/Outmailer',
    resumeBullets: {
      en: ['SaaS email validation tool built with Next.js and TypeScript'],
      fr: ["Outil SaaS de validation d'e-mails développé avec Next.js et TypeScript"],
    },
  },
  {
    title: 'Syncboard',
    tags: 'React · Python · FastAPI · WebSockets · CRDT · Canvas · roughjs',
    year: '2026',
    bg: '/images/syncboard-preview.png',
    link: 'https://syncboard-teal.vercel.app/',
    github: 'https://github.com/baamelyoussef/syncboard',
    resumeBullets: {
      en: [
        'Real-time collaborative whiteboard with CRDT-based conflict-free concurrent editing over WebSockets',
        'Full-stack: React canvas frontend, Python FastAPI backend, roughjs for hand-drawn aesthetics',
      ],
      fr: [
        'Tableau blanc collaboratif en temps réel avec résolution de conflits CRDT sur WebSockets',
        'Architecture full-stack : canvas React, backend Python FastAPI, esthétique dessin main avec roughjs',
      ],
    },
  },
];

export const UI: Record<Lang, {
  nav: { experience: string; projects: string; contact: string; resume: string };
  labels: { experience: string; skills: string; projects: string; contact: string };
  resumeUI: { print: string; close: string; skills: string; projects: string; experience: string };
  visitProject: string;
  github: string;
  footerCopy: (y: number) => string;
}> = {
  en: {
    nav: { experience: 'Experience', projects: 'Projects', contact: 'Contact', resume: 'Resume ↓' },
    labels: { experience: 'Experience', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    resumeUI: { print: 'Print / Save PDF', close: '✕', skills: 'Technical Skills', projects: 'Projects', experience: 'Experience' },
    visitProject: 'Visit Project ↗',
    github: 'GitHub ↗',
    footerCopy: (y) => `© ${y} Youssef Baamel`,
  },
  fr: {
    nav: { experience: 'Expérience', projects: 'Projets', contact: 'Contact', resume: 'CV ↓' },
    labels: { experience: 'Expérience', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
    resumeUI: { print: 'Imprimer / Enregistrer PDF', close: '✕', skills: 'Compétences techniques', projects: 'Projets', experience: 'Expérience' },
    visitProject: 'Voir le projet ↗',
    github: 'GitHub ↗',
    footerCopy: (y) => `© ${y} Youssef Baamel`,
  },
};
