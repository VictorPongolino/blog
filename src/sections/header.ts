import { icons } from '../icons';
import { LOCALES, type Dictionary, type Locale } from '../i18n';
import { projects } from '../projects';

const ALL_SECTIONS = ['about', 'skills', 'experience', 'projects', 'contact'] as const;
export type SectionId = (typeof ALL_SECTIONS)[number];

/** Sections without content are left out of the page and the menu. */
export const NAV_SECTIONS = ALL_SECTIONS.filter((id) => id !== 'projects' || projects.length > 0);

/** "01", "02"… following the sections actually shown. */
export const sectionNumber = (id: SectionId): string =>
  String(NAV_SECTIONS.indexOf(id) + 1).padStart(2, '0');

/** Real links between the language pages, so crawlers and no-JS visitors can follow them. */
function languageSwitch(t: Dictionary, locale: Locale): string {
  const links = LOCALES.map(({ code, label, name, htmlLang, path }) => {
    const active = code === locale;
    return `
      <li>
        <a href="${path}" hreflang="${htmlLang}" lang="${htmlLang}" data-locale-link
          ${active ? 'aria-current="true"' : ''}
          class="block rounded-md px-2.5 py-1.5 font-mono text-xs font-medium transition-colors ${
            active ? 'bg-accent text-ink-950' : 'text-slate-300 hover:text-white'
          }"><span aria-hidden="true">${label}</span><span class="sr-only">${name}</span></a>
      </li>`;
  }).join('');

  return `
    <nav aria-label="${t.nav.language}">
      <ul class="flex items-center gap-0.5 rounded-lg border border-white/10 bg-ink-900 p-0.5">
        ${links}
      </ul>
    </nav>`;
}

export function header(t: Dictionary, locale: Locale): string {
  const links = (className: string) =>
    NAV_SECTIONS.map(
      (id) => `
        <li>
          <a href="#${id}" data-nav-link="${id}" class="${className}">
            <span class="text-accent" aria-hidden="true">${sectionNumber(id)}.</span> ${t.nav[id]}
          </a>
        </li>`,
    ).join('');

  return `
    <a href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950">
      ${t.nav.skipToContent}
    </a>
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink-950/80 backdrop-blur-md">
      <div class="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="${t.nav.home}" class="font-mono text-base font-semibold text-white">
          <span aria-hidden="true"><span class="text-accent">~/</span>victor<span class="cursor-blink text-accent">_</span></span>
        </a>

        <nav aria-label="${t.nav.primary}" class="hidden md:block">
          <ul class="flex items-center gap-6 font-mono text-sm">
            ${links('text-slate-300 transition-colors hover:text-white aria-[current]:text-white')}
          </ul>
        </nav>

        <div class="flex items-center gap-2">
          ${languageSwitch(t, locale)}
          <button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu"
            aria-label="${t.nav.openMenu}" data-label-open="${t.nav.openMenu}" data-label-close="${t.nav.closeMenu}"
            class="grid size-10 place-items-center rounded-lg border border-white/10 text-slate-200 md:hidden">
            <span data-icon-open>${icons.menu}</span>
            <span data-icon-close hidden>${icons.close}</span>
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="${t.nav.mobile}" hidden class="border-t border-white/5 bg-ink-950 md:hidden">
        <ul class="container-page flex flex-col py-3 font-mono text-base">
          ${links('block rounded-lg px-2 py-3 text-slate-300 hover:bg-white/5 hover:text-white')}
        </ul>
      </nav>
    </header>`;
}
