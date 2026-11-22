/** Numbered, terminal-flavoured section heading shared by every section. */
export function sectionHeading(
  index: string,
  eyebrow: string,
  title: string,
  subtitle = '',
): string {
  return `
    <header class="mb-10 sm:mb-14" data-reveal>
      <p class="font-mono text-sm text-accent">
        <span class="text-slate-500">${index}.</span> ${eyebrow.toLowerCase()}
      </p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">${title}</h2>
      ${subtitle ? `<p class="mt-3 max-w-2xl text-slate-400">${subtitle}</p>` : ''}
    </header>`;
}

export const chips = (items: string[]): string =>
  `<ul class="flex flex-wrap gap-2">${items.map((item) => `<li class="chip">${item}</li>`).join('')}</ul>`;
