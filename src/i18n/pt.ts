import type { Dictionary } from './en';

/**
 * Conteúdo em português.
 * O que estiver marcado como "Placeholder" (foto, texto de contato) deve ser substituído por conteúdo real.
 */
export const pt: Dictionary = {
  meta: {
    title: 'Victor Hugo Pongolino — Desenvolvedor Backend Sênior',
    description:
      'Portfólio de Victor Hugo Pongolino, Desenvolvedor Backend Sênior construindo microsserviços escaláveis com Java e Spring.',
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
      'Construo microsserviços escaláveis com Java e Spring, com foco em sistemas distribuídos e arquiteturas orientadas a eventos.',
    ctaPrimary: 'Entre em contato',
    ctaSecondary: 'Ver projetos',
    available: 'Aberto a novas oportunidades',
    photoAlt: 'Retrato de Victor Hugo Pongolino (placeholder)',
    terminal: {
      role: 'Desenvolvedor Backend Sênior',
      focus: 'Microsserviços, sistemas distribuídos, arquitetura orientada a eventos',
      location: 'Guarulhos, São Paulo, Brasil',
    },
  },
  about: {
    eyebrow: 'Sobre',
    title: 'Um pouco sobre mim',
    paragraphs: [
      'Sou Engenheiro de Software Backend com mais de 4 anos de experiência em Java e Spring, especializado na construção de microsserviços escaláveis.',
      'Trabalho com sistemas distribuídos e arquiteturas orientadas a eventos, utilizando tecnologias de mensageria como RabbitMQ, Apache Kafka, Amazon SQS e AWS Kinesis. Hoje, na Avanade, construo serviços reativos com Spring WebFlux para uma instituição bancária. Na IBM, contribuí para serviços backend de processamento de dados em sistemas de RH, dando suporte a fluxos de integração de dados. Antes disso, trabalhei em um projeto da BMW, entregando aplicações Java Quarkus escaláveis em um ambiente DevOps.',
      'Sou fluente em inglês e tenho experiência em colaboração com equipes internacionais.',
    ],
    stats: [
      { value: '4+', label: 'Anos de experiência' },
      { value: '70%', label: 'Menos tempo em exclusões em massa na Elo7' },
      { value: '4', label: 'Plataformas de mensageria em produção' },
      { value: 'EN · PT', label: 'Idiomas de trabalho' },
    ],
  },
  skills: {
    eyebrow: 'Habilidades',
    title: 'Tecnologias com que trabalho',
    subtitle: 'A stack que uso para projetar, entregar e operar sistemas backend.',
    groups: [
      { name: 'Linguagens', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
      {
        name: 'Frameworks',
        items: ['Spring Boot', 'Spring WebFlux', 'Quarkus', 'Angular', 'RxJS', 'React JS'],
      },
      { name: 'Mensageria', items: ['Apache Kafka', 'RabbitMQ', 'Amazon SQS', 'AWS Kinesis'] },
      { name: 'Dados', items: ['MySQL', 'Redis', 'DynamoDB', 'Amazon RDS'] },
      {
        name: 'Cloud e DevOps',
        items: ['AWS', 'Docker', 'Kubernetes', 'Helm Charts', 'Terraform', 'Google Tag Manager'],
      },
      {
        name: 'Arquitetura',
        items: [
          'Microsserviços',
          'Sistemas distribuídos',
          'Orientada a eventos',
          'BFFs reativos',
          'Resilience4j',
        ],
      },
    ],
  },
  experience: {
    eyebrow: 'Experiência',
    title: 'Onde já trabalhei',
    items: [
      {
        period: 'abr 2026 — Atual',
        role: 'Backend Software Engineer Sênior',
        company: 'Avanade · Cliente: instituição bancária',
        description:
          'Serviços backend reativos em Java com Spring WebFlux para uma instituição bancária.',
        highlights: [
          'Construção de camadas de resiliência com Resilience4j: circuit breakers, retries e bulkheads.',
          'Integração dos serviços backend com o mainframe.',
          'Consumo de APIs REST com OpenFeign e WebClient usando protocolos seguros.',
          'Implementação de sanitização de entradas e segurança avançada, como criptografia e cofres de segredos.',
          'Desenvolvimento de BFFs reativos com Redis, com entrega rápida de dados para os times de front-end.',
          'Criação de páginas front-end mobile first com Angular e RxJS, consumindo dados das APIs.',
          'Configuração de tags de rastreamento com Google Tag Manager.',
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
        period: 'jul 2024 — mar 2026',
        role: 'Backend Software Engineer',
        company: 'Experis · Cliente: IBM',
        description:
          'Suporte a pipelines críticos de processamento de dados de RH (L1, L2 e L3) e aos serviços backend por trás deles.',
        highlights: [
          'Atuação com Informações Pessoais Sensíveis (SPII), seguindo rigorosamente as melhores práticas de segurança e proteção de dados.',
          'Investigação e depuração de problemas em sistemas distribuídos, garantindo alta disponibilidade e confiabilidade.',
          'Análise de logs, monitoramento de desempenho e resolução de incidentes em ambientes produtivos.',
          'Colaboração com equipes de desenvolvimento na identificação de causa raiz e em correções definitivas, prevenindo falhas recorrentes.',
        ],
        stack: ['Pipelines de dados', 'Sistemas distribuídos', 'Resposta a incidentes', 'SPII'],
      },
      {
        period: 'dez 2023 — mai 2024',
        role: 'DevOps Engineer',
        company: 'ília · Cliente: BMW · Remoto',
        description:
          'Desenvolvimento de microsserviços Java distribuídos com Quarkus e gestão da infraestrutura em nuvem, em colaboração com equipes internacionais.',
        highlights: [
          'Discussão e definição de arquiteturas e sistemas com equipes internacionais.',
          'Gestão de infraestrutura com Terraform, Kubernetes e Docker.',
          'Implementação de soluções na AWS com EC2, S3, RDS, DynamoDB, EKS, ECS, SQS e Kinesis.',
          'Leitura, documentação e implementação da RFC 8030, aplicando boas práticas de segurança na comunicação entre dispositivos e veículos.',
        ],
        stack: ['Java', 'Quarkus', 'AWS', 'Kubernetes', 'Terraform', 'Docker'],
      },
      {
        period: 'jan 2021 — out 2023',
        role: 'Backend Software Engineer',
        company: 'Elo7 · Remoto',
        description: 'Desenvolvimento, manutenção e operação de aplicações do marketplace.',
        highlights: [
          'Desenvolvimento de um sistema que reduziu em 70% o tempo necessário para a exclusão em massa de produtos ilegais do marketplace.',
          'Automatização de ferramentas que permitiu ao time de OPS resolver problemas de forma autônoma.',
          'Contribuição para a separação de processos de sistemas monolíticos em sistemas distribuídos.',
          'Aumento da produtividade da equipe de engenharia, identificando features para reduzir cargas manuais.',
          'Participação em plantões e apoio ao time de OPS em investigações, resoluções e documentação.',
        ],
        stack: ['Java', 'Spring', 'Microsserviços', 'Plantão'],
      },
    ],
    educationTitle: 'Formação',
    education: [
      {
        period: '2018 — 2021',
        degree: 'Bacharelado',
        school: 'Universidade São Judas Tadeu, São Paulo',
      },
    ],
  },
  projects: {
    eyebrow: 'Projetos',
    title: 'Trabalhos selecionados',
    code: 'Código',
    live: 'Ver online',
    imageAlt: 'Captura de tela do projeto',
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
