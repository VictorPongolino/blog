/**
 * English content (default language).
 * Keep the same shape in pt.ts — TypeScript will complain if they drift.
 */
export const en = {
  meta: {
    title: 'Victor Hugo Pongolino — Senior Backend Developer',
    description:
      'Portfolio of Victor Hugo Pongolino, Senior Backend Developer building scalable microservices with Java and Spring.',
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
    primary: 'Primary',
    mobile: 'Mobile menu',
    home: 'Victor Hugo Pongolino — back to top',
    skipToContent: 'Skip to content',
  },
  a11y: {
    newTab: '(opens in a new tab)',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'Senior Backend Developer',
    tagline:
      'I build scalable microservices with Java and Spring, with a focus on distributed systems and event-driven architectures.',
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'View projects',
    available: 'Open to new opportunities',
    photoAlt: 'Portrait of Victor Hugo Pongolino',
    terminalLabel: 'Terminal showing my profile',
    terminal: {
      role: 'Senior Backend Developer',
      focus: 'Microservices, distributed systems, event-driven architecture',
      location: 'Guarulhos, São Paulo, Brazil',
    },
  },
  about: {
    eyebrow: 'About',
    title: 'A little about me',
    paragraphs: [
      'I am a Backend Software Engineer with more than 4 years of experience in Java and Spring, specialized in building scalable microservices.',
      'I work with distributed systems and event-driven architectures, using messaging technologies such as RabbitMQ, Apache Kafka, Amazon SQS and AWS Kinesis. Today, at Avanade, I build reactive services with Spring WebFlux for a banking institution. At IBM I contributed to backend services that process HR data and support data integration flows. Before that, I worked on a BMW project delivering scalable Java Quarkus applications in a DevOps environment.',
      'I am fluent in English and used to collaborating with international teams.',
    ],
    stats: [
      { value: '4+', label: 'Years of experience' },
      { value: '70%', label: 'Less time on bulk removals at Elo7' },
      { value: '3', label: 'Enterprise clients: IBM, BMW and a bank' },
      { value: 'EN · PT', label: 'Working languages' },
    ],
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Technologies I work with',
    subtitle: 'The stack I use to design, ship and operate backend systems.',
    groups: [
      { name: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
      {
        name: 'Frameworks',
        items: ['Spring Boot', 'Spring WebFlux', 'Quarkus', 'Angular', 'RxJS', 'React JS'],
      },
      { name: 'Messaging', items: ['Apache Kafka', 'RabbitMQ', 'Amazon SQS', 'AWS Kinesis'] },
      { name: 'Data', items: ['MySQL', 'Redis', 'DynamoDB', 'Amazon RDS'] },
      {
        name: 'Cloud & DevOps',
        items: ['AWS', 'Docker', 'Kubernetes', 'Helm Charts', 'Terraform', 'Google Tag Manager'],
      },
      {
        name: 'Architecture',
        items: [
          'Microservices',
          'Distributed systems',
          'Event-driven',
          'Reactive BFFs',
          'Resilience4j',
        ],
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: "Where I've worked",
    items: [
      {
        period: 'Apr 2026 — Present',
        role: 'Senior Backend Software Engineer',
        company: 'Avanade · Client: banking institution',
        description:
          'Reactive backend services in Java with Spring WebFlux for a banking institution.',
        highlights: [
          'Built resilience layers with Resilience4j: circuit breakers, retries and bulkheads.',
          'Integrated backend services with the mainframe.',
          'Consumed REST APIs with OpenFeign and WebClient over secure protocols.',
          'Implemented input sanitization and advanced security such as encryption and secret vaults.',
          'Developed reactive BFFs backed by Redis, delivering data fast to the front-end teams.',
          'Built mobile-first front-end pages with Angular and RxJS, consuming data from the APIs.',
          'Set up tracking tags with Google Tag Manager.',
        ],
        stack: [
          'Java',
          'Spring WebFlux',
          'Resilience4j',
          'OpenFeign',
          'Redis',
          'Mainframe',
          'Angular',
          'RxJS',
        ],
      },
      {
        period: 'Jul 2024 — Mar 2026',
        role: 'Backend Software Engineer',
        company: 'Experis · Client: IBM',
        description:
          'Support for critical HR data processing pipelines (L1, L2 and L3) and the backend services behind them.',
        highlights: [
          'Handled Sensitive Personal Information (SPII), strictly following security and data protection best practices.',
          'Investigated and debugged issues in distributed systems, keeping availability and reliability high.',
          'Analyzed logs, monitored performance and resolved incidents in production environments.',
          'Worked with development teams on root cause analysis and permanent fixes, preventing recurring failures.',
        ],
        stack: ['Data pipelines', 'Distributed systems', 'Incident response', 'SPII'],
      },
      {
        period: 'Dec 2023 — May 2024',
        role: 'DevOps Engineer',
        company: 'ília · Client: BMW · Remote',
        description:
          'Built distributed Java microservices with Quarkus and managed their cloud infrastructure, working with international teams.',
        highlights: [
          'Discussed and defined architectures and systems together with international teams.',
          'Managed infrastructure with Terraform, Kubernetes and Docker.',
          'Implemented AWS solutions with EC2, S3, RDS, DynamoDB, EKS, ECS, SQS and Kinesis.',
          'Read, documented and implemented RFC 8030, applying security best practices to communication between devices and vehicles.',
        ],
        stack: ['Java', 'Quarkus', 'AWS', 'Kubernetes', 'Terraform', 'Docker'],
      },
      {
        period: 'Jan 2021 — Oct 2023',
        role: 'Backend Software Engineer',
        company: 'Elo7 · Remote',
        description: 'Development, maintenance and operation of marketplace applications.',
        highlights: [
          'Built a system that cut the time needed to bulk-remove illegal products from the marketplace by 70%.',
          'Automated tooling that let the OPS team solve problems on their own.',
          'Helped split monolithic processes into distributed systems.',
          'Raised engineering productivity by identifying features that reduce manual work.',
          'Took part in on-call rotations and supported OPS with investigations, fixes and documentation.',
        ],
        stack: ['Java', 'Spring', 'Microservices', 'On-call'],
      },
    ],
    educationTitle: 'Education',
    education: [
      {
        period: '2018 — 2021',
        degree: "Bachelor's degree",
        school: 'Universidade São Judas Tadeu, São Paulo',
      },
    ],
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected work',
    code: 'Code',
    live: 'Live',
    imageAlt: 'Project screenshot',
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something together",
    text: 'Want to talk about backend engineering, distributed systems or a new opportunity? Send me a message — I will be glad to chat.',
    emailCta: 'Send me an email',
    linkedinCta: 'Message me on LinkedIn',
    or: 'You can also find me on',
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with TypeScript & Tailwind CSS.',
    backToTop: 'Back to top',
  },
};

export type Dictionary = typeof en;
