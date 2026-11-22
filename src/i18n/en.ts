/**
 * English content (default language).
 * Everything marked "Placeholder" is meant to be replaced with real content.
 * Keep the same shape in pt.ts — TypeScript will complain if they drift.
 */
export const en = {
  meta: {
    title: 'Victor Hugo Pongolino — Senior Backend Developer',
    description:
      'Portfolio of Victor Hugo Pongolino, Senior Backend Developer building reliable, scalable distributed systems.',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    skipToContent: 'Skip to content',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'Senior Backend Developer',
    tagline:
      'Placeholder tagline — I design and build reliable, scalable backend systems, from APIs to event-driven microservices.',
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'View projects',
    available: 'Open to new opportunities',
    photoAlt: 'Portrait of Victor Hugo Pongolino (placeholder)',
    terminal: {
      role: 'Senior Backend Developer',
      focus: 'Distributed systems, APIs, reactive programming',
      location: 'Brazil (placeholder)',
    },
  },
  about: {
    eyebrow: 'About',
    title: 'A little about me',
    paragraphs: [
      'Placeholder paragraph — introduce yourself: who you are, how long you have been working with backend development and what kind of problems you enjoy solving.',
      'Placeholder paragraph — describe your approach: clean architecture, testing, observability, performance, mentoring, and how you collaborate with product and other teams.',
      'Placeholder paragraph — something personal: what you study, write or build outside of work.',
    ],
    stats: [
      { value: 'X+', label: 'Years of experience' },
      { value: 'XX+', label: 'Projects delivered' },
      { value: 'XX+', label: 'Services in production' },
      { value: 'XX', label: 'Articles & talks' },
    ],
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Technologies I work with',
    subtitle: 'Placeholder list — adjust the groups and items to match your real stack.',
    groups: [
      { name: 'Languages', items: ['Java', 'Kotlin', 'TypeScript', 'SQL'] },
      {
        name: 'Frameworks',
        items: ['Spring Boot', 'Spring WebFlux', 'Project Reactor', 'Quarkus'],
      },
      { name: 'Data & Messaging', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ'] },
      {
        name: 'Cloud & DevOps',
        items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
      },
      {
        name: 'Architecture',
        items: ['Microservices', 'Event-driven', 'REST', 'gRPC', 'DDD'],
      },
      {
        name: 'Quality & Observability',
        items: ['JUnit', 'Testcontainers', 'Grafana', 'Prometheus', 'OpenTelemetry'],
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: "Where I've worked",
    items: [
      {
        period: '20XX — Present',
        role: 'Senior Backend Developer',
        company: 'Company name (placeholder)',
        description:
          'Placeholder description — summarize your responsibilities and the systems you own in one or two sentences.',
        highlights: [
          'Placeholder achievement with a measurable result (e.g. reduced latency by XX%).',
          'Placeholder achievement about architecture, scale or reliability.',
        ],
        stack: ['Java', 'Spring Boot', 'Kafka', 'AWS'],
      },
      {
        period: '20XX — 20XX',
        role: 'Backend Developer',
        company: 'Company name (placeholder)',
        description:
          'Placeholder description — summarize your responsibilities and the systems you worked on.',
        highlights: [
          'Placeholder achievement with a measurable result.',
          'Placeholder achievement about a feature or migration you led.',
        ],
        stack: ['Java', 'PostgreSQL', 'RabbitMQ', 'Docker'],
      },
      {
        period: '20XX — 20XX',
        role: 'Junior Developer',
        company: 'Company name (placeholder)',
        description: 'Placeholder description — where it all started and what you learned.',
        highlights: ['Placeholder achievement.'],
        stack: ['Java', 'SQL', 'Git'],
      },
    ],
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected work',
    subtitle: 'Placeholder projects — replace images, descriptions and links with real ones.',
    code: 'Code',
    live: 'Live',
    imageAlt: 'Project screenshot (placeholder)',
    items: [
      {
        name: 'Project One',
        description:
          'Placeholder description — the problem this project solves, your role and the main technical challenge.',
        stack: ['Java', 'Spring WebFlux', 'Kafka'],
      },
      {
        name: 'Project Two',
        description:
          'Placeholder description — the problem this project solves, your role and the main technical challenge.',
        stack: ['Kotlin', 'PostgreSQL', 'Docker'],
      },
      {
        name: 'Project Three',
        description:
          'Placeholder description — the problem this project solves, your role and the main technical challenge.',
        stack: ['Java', 'Redis', 'Kubernetes'],
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something together",
    text: 'Placeholder text — tell people what you are open to (new roles, freelance, mentoring) and the best way to reach you.',
    emailCta: 'Send me an email',
    or: 'or find me on',
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with TypeScript & Tailwind CSS.',
    backToTop: 'Back to top',
  },
};

export type Dictionary = typeof en;
