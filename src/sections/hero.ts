import { site } from '../config';
import { icons } from '../icons';
import type { Dictionary } from '../i18n';
import { projects } from '../projects';
import { esc } from './shared';

export function socialLinks(t: Dictionary, className = ''): string {
  const items: [string, string, string][] = [
    ['GitHub', site.social.github, icons.github],
    ['LinkedIn', site.social.linkedin, icons.linkedin],
    ['YouTube', site.social.youtube, icons.youtube],
  ];
  return `
    <ul class="flex items-center gap-2 ${className}">
      ${items
        .map(
          ([label, href, icon]) => `
        <li>
          <a href="${href}" target="_blank" rel="me noopener noreferrer" aria-label="${label} ${t.a11y.newTab}"
            class="grid size-11 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-accent/60 hover:text-accent">
            ${icon}
          </a>
        </li>`,
        )
        .join('')}
    </ul>`;
}

/** Decorative terminal: exposed to assistive tech as one image with a text summary. */
function terminal(t: Dictionary): string {
  const line = (key: string, value: string, last = false) =>
    `<div class="pl-4"><span class="text-accent-2">"${key}"</span>: <span class="text-amber-200">"${value}"</span>${last ? '' : ','}</div>`;
  const { role, focus, location } = t.hero.terminal;

  return `
    <div class="card overflow-hidden shadow-2xl shadow-black/40" data-reveal
      role="img" aria-label="${esc(`${t.hero.terminalLabel}: ${role}. ${focus}. ${location}.`)}">
      <div class="flex items-center gap-2 border-b border-white/10 bg-ink-800/80 px-4 py-3">
        <span class="size-3 rounded-full bg-red-400/80"></span>
        <span class="size-3 rounded-full bg-amber-300/80"></span>
        <span class="size-3 rounded-full bg-emerald-400/80"></span>
        <span class="ml-2 font-mono text-xs text-slate-400">bash — ${site.handle}</span>
      </div>
      <div class="space-y-1 p-4 font-mono text-[13px] leading-relaxed break-words sm:p-5 sm:text-sm">
        <div><span class="text-accent">$</span> <span class="text-slate-100">whoami</span></div>
        <div class="text-slate-400">${site.handle}</div>
        <div class="pt-2"><span class="text-accent">$</span> <span class="text-slate-100">cat profile.json</span></div>
        <div class="text-slate-400">{</div>
        ${line('role', role)}
        ${line('focus', focus)}
        ${line('location', location, true)}
        <div class="text-slate-400">}</div>
        <div class="pt-2"><span class="text-accent">$</span> <span class="cursor-blink text-slate-100">▍</span></div>
      </div>
    </div>`;
}

export function hero(t: Dictionary): string {
  // The photo only renders once `photo` is set in src/config.ts.
  const hasPhoto = site.photo !== '';
  const alt = esc(t.hero.photoAlt);

  const smallPhoto = hasPhoto
    ? `<img src="${site.photo}" alt="${alt}" width="96" height="96"
        class="size-20 rounded-full border-2 border-accent/50 object-cover ring-4 ring-accent/10 sm:size-24 lg:hidden" />`
    : '';

  // Desktop shows the same picture larger; hide the duplicate from assistive tech.
  const largePhoto = hasPhoto
    ? `<div class="relative mx-auto hidden w-64 lg:block" data-reveal aria-hidden="true">
        <div class="absolute -inset-3 rounded-2xl border border-accent/20"></div>
        <img src="${site.photo}" alt="" width="400" height="400"
          class="relative aspect-square w-full rounded-xl border border-white/10 object-cover" />
      </div>`
    : '';

  return `
    <section id="top" aria-labelledby="hero-title" class="relative overflow-hidden pt-16">
      <div class="bg-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden="true"></div>

      <div class="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-28">
        <div data-reveal>
          <div class="flex items-center gap-4">
            ${smallPhoto}
            <p class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1.5 font-mono text-xs text-accent">
              <span class="size-2 rounded-full bg-accent" aria-hidden="true"></span>
              ${t.hero.available}
            </p>
          </div>

          <h1 id="hero-title" class="mt-8">
            <span class="block font-mono text-sm font-normal text-accent sm:text-base">${t.hero.greeting}</span>
            <span class="mt-2 block text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">${site.name}</span>
          </h1>
          <p class="mt-3 bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            ${t.hero.role}
          </p>
          <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">${t.hero.tagline}</p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" class="btn btn-primary">${t.hero.ctaPrimary} ${icons.arrowRight}</a>
            ${projects.length ? `<a href="#projects" class="btn btn-ghost">${t.hero.ctaSecondary}</a>` : ''}
          </div>

          ${socialLinks(t, 'mt-8')}
        </div>

        <div class="grid gap-6">
          ${largePhoto}
          ${terminal(t)}
        </div>
      </div>
    </section>`;
}
