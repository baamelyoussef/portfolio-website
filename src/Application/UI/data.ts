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
        'Led front-end delivery of web & mobile applications for Bouygues Telecom — platforms serving 15.8M quarterly visitors (SimilarWeb verified) — using React, Next.js, and TypeScript',
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
      logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHBDG4j9Ggf-Q/company-logo_200_200/company-logo_200_200/0/1630548813412/mediot_technology_logo?e=1784160000&v=beta&t=1oTBbFAMsfLnPo9XEJ2GKNG3I7Uqk82MGzm0QPbJp6Y',
      bullets: [
        'Built a telemedicine platform that facilitated over 1M medical interventions and 200,000+ tele-expertises with specialists — one of the most impactful projects of my career, particularly during the 2023 Marrakesh earthquake when it helped deliver care to people in disrupted areas',
        'Integrated AI-native medical devices to support remote diagnostics and patient monitoring',
        'Delivered full-stack features end to end using React.js and Node.js in Agile sprints, from specification to production',
      ],
    },
    {
      role: 'Full-Stack Engineer',
      company: 'Algo Consulting Group · ONCF',
      period: 'Jan 2022 — Mar 2023',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeShVCtZHpRFBYcO32O89EmsabzU6voOFxA&s',
      bullets: [
        'Consultant on Morocco\'s national railway e-commerce platforms (ONCF Voyages & Supratours), improving user experience and conversion for millions of travellers',
        'Sub-managed a team of junior engineers and interns, onboarding and guiding them through delivery — the team later took over the mission full-time',
        "Implemented RTL Arabic localization across the full platform, extending accessibility to Morocco's Arabic-speaking majority",
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
        "Développement et livraison des applications web & mobile pour Bouygues Telecom — plateformes totalisant 15,8M de visiteurs trimestriels (SimilarWeb vérifié) — avec React, Next.js et TypeScript",
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
      logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHBDG4j9Ggf-Q/company-logo_200_200/company-logo_200_200/0/1630548813412/mediot_technology_logo?e=1784160000&v=beta&t=1oTBbFAMsfLnPo9XEJ2GKNG3I7Uqk82MGzm0QPbJp6Y',
      bullets: [
        "Développement d'une plateforme de télémédecine ayant facilité plus d'1 million d'interventions médicales et 200 000+ télé-expertises avec des spécialistes — projet particulièrement impactant lors du séisme de Marrakech en 2023",
        "Intégration de dispositifs médicaux à IA native pour la télédiagnostique et le suivi patient à distance",
        "Livraison de fonctionnalités full-stack bout-en-bout (React.js, Node.js) en méthodologie Agile, de la spécification à la mise en production",
      ],
    },
    {
      role: 'Ingénieur Full-Stack',
      company: 'Algo Consulting Group · ONCF',
      period: 'Jan 2022 — Mar 2023',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeShVCtZHpRFBYcO32O89EmsabzU6voOFxA&s',
      bullets: [
        "Consultant sur les plateformes e-commerce ferroviaires nationales du Maroc (ONCF Voyages & Supratours), optimisant l'expérience utilisateur et la conversion pour des millions de voyageurs",
        "Encadrement d'une équipe de jeunes ingénieurs et stagiaires, les accompagnant jusqu'à la reprise complète de la mission en autonomie",
        "Mise en place de la localisation RTL en langue arabe sur l'ensemble de la plateforme, élargissant l'accessibilité à la majorité arabophone du Maroc",
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
    { cat: 'Front-End', items: 'React.js, Next.js, Vue.js, Nuxt.js, React Native, TypeScript' },
    { cat: 'Back-End', items: 'Node.js, Express.js, Python (Django, FastAPI), Laravel, REST APIs' },
    { cat: 'Styling & Design', items: 'TailwindCSS, CSS / SASS, Figma' },
    { cat: 'Cloud & DevOps', items: 'AWS, Digital Ocean, Vercel, Docker, Kubernetes, Terraform, CI/CD, Git / GitHub' },
    { cat: 'Testing', items: 'Jest' },
    { cat: 'Databases & BaaS', items: 'PostgreSQL, MySQL, Microsoft SQL Server, MongoDB, GraphQL, Firebase, Supabase, Drizzle' },
    { cat: 'AI & ML', items: 'OpenAI API, LangChain, Hugging Face, Pinecone, RAG, LLM Integration, Prompt Engineering, AI Agents' },
    { cat: 'Languages', items: 'Arabic (Native), French (Fluent), English (Fluent), Spanish (Beginner), German (Beginner)' },
  ],
  fr: [
    { cat: 'Front-End', items: 'React.js, Next.js, Vue.js, Nuxt.js, React Native, TypeScript' },
    { cat: 'Back-End', items: 'Node.js, Express.js, Python (Django, FastAPI), Laravel, REST APIs' },
    { cat: 'Style & Design', items: 'TailwindCSS, CSS / SASS, Figma' },
    { cat: 'Cloud & DevOps', items: 'AWS, Digital Ocean, Vercel, Docker, Kubernetes, Terraform, CI/CD, Git / GitHub' },
    { cat: 'Tests', items: 'Jest' },
    { cat: 'Bases de données & BaaS', items: 'PostgreSQL, MySQL, Microsoft SQL Server, MongoDB, GraphQL, Firebase, Supabase, Drizzle' },
    { cat: 'IA & ML', items: 'OpenAI API, LangChain, Hugging Face, Pinecone, RAG, Intégration LLM, Prompt Engineering, Agents IA' },
    { cat: 'Langues', items: 'Arabe (natif), Français (courant), Anglais (courant), Espagnol (débutant), Allemand (débutant)' },
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
      en: ['Health & fitness iOS app published on the App Store (5.0 ★), built with React Native — AI-powered emotional recovery tracking and journaling'],
      fr: ["Application iOS santé & bien-être publiée sur l'App Store (5.0 ★), développée avec React Native — suivi de rétablissement émotionnel et journal personnel assisté par IA"],
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
      en: ['Medical iOS app for the Moroccan pharmaceutical market, live on the App Store — actively maintained across 25+ releases, serving pharmacies with marketplace access and medical tools'],
      fr: ["Application iOS médicale pour le marché pharmaceutique marocain, publiée sur l'App Store — maintenue activement sur 25+ versions, au service des pharmacies avec accès marketplace et outils médicaux"],
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
