import { sectionNumber, type SectionId } from './header';

/** Escape text placed inside an HTML attribute or a <title>. */
export const esc = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Id of a section's heading, referenced by the section's aria-labelledby. */
export const headingId = (id: SectionId): string => `${id}-title`;

/** Numbered, terminal-flavoured section heading shared by every section. */
export function sectionHeading(
  id: SectionId,
  eyebrow: string,
  title: string,
  subtitle = '',
): string {
  return `
    <header class="mb-10 sm:mb-14" data-reveal>
      <p class="font-mono text-sm text-accent" aria-hidden="true">
        <span class="text-slate-400">${sectionNumber(id)}.</span> ${eyebrow.toLowerCase()}
      </p>
      <h2 id="${headingId(id)}" class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">${title}</h2>
      ${subtitle ? `<p class="mt-3 max-w-2xl text-slate-400">${subtitle}</p>` : ''}
    </header>`;
}

export const chips = (items: string[]): string =>
  `<ul class="flex flex-wrap gap-2">${items.map((item) => `<li class="chip">${item}</li>`).join('')}</ul>`;
