import type { Locale } from './i18n';

type Localized = Record<Locale, string>;

export interface Project {
  name: Localized;
  description: Localized;
  stack: string[];
  /** Optional. Falls back to the placeholder image. Put files in public/images/. */
  image?: string;
  /** Optional links — each button only shows when its URL is set. */
  code?: string;
  live?: string;
}

/**
 * Projects shown on the site.
 *
 * While this list is EMPTY the whole Projects section is hidden: the section,
 * its menu link and the "View projects" button in the hero all disappear.
 * Add at least one entry and everything shows up again — nothing else to change.
 *
 * Example:
 *
 *   {
 *     name: { en: 'Order Events Platform', pt: 'Plataforma de Eventos de Pedidos' },
 *     description: {
 *       en: 'Event-driven order processing with Kafka and Spring Boot.',
 *       pt: 'Processamento de pedidos orientado a eventos com Kafka e Spring Boot.',
 *     },
 *     stack: ['Java', 'Spring Boot', 'Kafka'],
 *     image: '/images/order-events.png',
 *     code: 'https://github.com/VictorPongolino/order-events',
 *     live: 'https://example.com',
 *   },
 */
export const projects: Project[] = [];
