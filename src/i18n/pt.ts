import type { Dictionary } from './en';

/**
 * Conteúdo em português.
 * Tudo marcado como "Placeholder" deve ser substituído por conteúdo real.
 */
export const pt: Dictionary = {
  meta: {
    title: 'Victor Hugo Pongolino — Desenvolvedor Backend Sênior',
    description:
      'Portfólio de Victor Hugo Pongolino, Desenvolvedor Backend Sênior construindo sistemas distribuídos confiáveis e escaláveis.',
  },
  nav: {
    about: 'Sobre',
    skills: 'Habilidades',
    experience: 'Experiência',
    projects: 'Projetos',
    contact: 'Contato',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
    skipToContent: 'Ir para o conteúdo',
  },
  hero: {
    greeting: 'Olá, eu sou',
    role: 'Desenvolvedor Backend Sênior',
    tagline:
      'Frase de exemplo (placeholder) — projeto e construo sistemas backend confiáveis e escaláveis, de APIs a microsserviços orientados a eventos.',
    ctaPrimary: 'Entre em contato',
    ctaSecondary: 'Ver projetos',
    available: 'Aberto a novas oportunidades',
    photoAlt: 'Retrato de Victor Hugo Pongolino (placeholder)',
    terminal: {
      role: 'Desenvolvedor Backend Sênior',
      focus: 'Sistemas distribuídos, APIs, programação reativa',
      location: 'Brasil (placeholder)',
    },
  },
  about: {
    eyebrow: 'Sobre',
    title: 'Um pouco sobre mim',
    paragraphs: [
      'Parágrafo de exemplo (placeholder) — apresente-se: quem você é, há quanto tempo trabalha com desenvolvimento backend e que tipo de problema gosta de resolver.',
      'Parágrafo de exemplo (placeholder) — descreva sua forma de trabalhar: arquitetura limpa, testes, observabilidade, performance, mentoria e como colabora com produto e outros times.',
      'Parágrafo de exemplo (placeholder) — algo pessoal: o que você estuda, escreve ou constrói fora do trabalho.',
    ],
    stats: [
      { value: 'X+', label: 'Anos de experiência' },
      { value: 'XX+', label: 'Projetos entregues' },
      { value: 'XX+', label: 'Serviços em produção' },
      { value: 'XX', label: 'Artigos e palestras' },
    ],
  },
  skills: {
    eyebrow: 'Habilidades',
    title: 'Tecnologias com que trabalho',
    subtitle: 'Lista de exemplo (placeholder) — ajuste os grupos e itens para refletir sua stack.',
    groups: [
      { name: 'Linguagens', items: ['Java', 'Kotlin', 'TypeScript', 'SQL'] },
      {
        name: 'Frameworks',
        items: ['Spring Boot', 'Spring WebFlux', 'Project Reactor', 'Quarkus'],
      },
      {
        name: 'Dados e Mensageria',
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ'],
      },
      {
        name: 'Cloud e DevOps',
        items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
      },
      {
        name: 'Arquitetura',
        items: ['Microsserviços', 'Orientada a eventos', 'REST', 'gRPC', 'DDD'],
      },
      {
        name: 'Qualidade e Observabilidade',
        items: ['JUnit', 'Testcontainers', 'Grafana', 'Prometheus', 'OpenTelemetry'],
      },
    ],
  },
  experience: {
    eyebrow: 'Experiência',
    title: 'Onde já trabalhei',
    items: [
      {
        period: '20XX — Atual',
        role: 'Desenvolvedor Backend Sênior',
        company: 'Nome da empresa (placeholder)',
        description:
          'Descrição de exemplo (placeholder) — resuma suas responsabilidades e os sistemas sob sua responsabilidade em uma ou duas frases.',
        highlights: [
          'Conquista de exemplo com resultado mensurável (ex.: redução de XX% na latência).',
          'Conquista de exemplo sobre arquitetura, escala ou confiabilidade.',
        ],
        stack: ['Java', 'Spring Boot', 'Kafka', 'AWS'],
      },
      {
        period: '20XX — 20XX',
        role: 'Desenvolvedor Backend',
        company: 'Nome da empresa (placeholder)',
        description:
          'Descrição de exemplo (placeholder) — resuma suas responsabilidades e os sistemas em que trabalhou.',
        highlights: [
          'Conquista de exemplo com resultado mensurável.',
          'Conquista de exemplo sobre uma funcionalidade ou migração que você liderou.',
        ],
        stack: ['Java', 'PostgreSQL', 'RabbitMQ', 'Docker'],
      },
      {
        period: '20XX — 20XX',
        role: 'Desenvolvedor Júnior',
        company: 'Nome da empresa (placeholder)',
        description:
          'Descrição de exemplo (placeholder) — onde tudo começou e o que você aprendeu.',
        highlights: ['Conquista de exemplo.'],
        stack: ['Java', 'SQL', 'Git'],
      },
    ],
  },
  projects: {
    eyebrow: 'Projetos',
    title: 'Trabalhos selecionados',
    subtitle:
      'Projetos de exemplo (placeholder) — substitua imagens, descrições e links pelos reais.',
    code: 'Código',
    live: 'Ver online',
    imageAlt: 'Captura de tela do projeto (placeholder)',
    items: [
      {
        name: 'Projeto Um',
        description:
          'Descrição de exemplo (placeholder) — o problema que o projeto resolve, seu papel e o principal desafio técnico.',
        stack: ['Java', 'Spring WebFlux', 'Kafka'],
      },
      {
        name: 'Projeto Dois',
        description:
          'Descrição de exemplo (placeholder) — o problema que o projeto resolve, seu papel e o principal desafio técnico.',
        stack: ['Kotlin', 'PostgreSQL', 'Docker'],
      },
      {
        name: 'Projeto Três',
        description:
          'Descrição de exemplo (placeholder) — o problema que o projeto resolve, seu papel e o principal desafio técnico.',
        stack: ['Java', 'Redis', 'Kubernetes'],
      },
    ],
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Vamos construir algo juntos',
    text: 'Texto de exemplo (placeholder) — diga às pessoas no que você tem interesse (novas vagas, freelas, mentoria) e a melhor forma de falar com você.',
    emailCta: 'Envie um e-mail',
    or: 'ou me encontre em',
  },
  footer: {
    rights: 'Todos os direitos reservados.',
    builtWith: 'Feito com TypeScript e Tailwind CSS.',
    backToTop: 'Voltar ao topo',
  },
};
