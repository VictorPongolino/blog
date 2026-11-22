import './style.css';
import { LOCALES, detectLocale, getDictionary, saveLocale, type Locale } from './i18n';
import { about, contact, experience, footer, projects, skills } from './sections/content';
import { header } from './sections/header';
import { hero } from './sections/hero';

const app = document.querySelector<HTMLDivElement>('#app')!;
let locale: Locale = detectLocale();
let observers: IntersectionObserver[] = [];

function render(): void {
  const t = getDictionary(locale);

  document.documentElement.lang = LOCALES.find((l) => l.code === locale)!.htmlLang;
  document.title = t.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);

  app.innerHTML = `
    ${header(t, locale)}
    <main id="main">
      ${hero(t)}
      ${about(t)}
      ${skills(t)}
      ${experience(t)}
      ${projects(t)}
      ${contact(t)}
    </main>
    ${footer(t)}`;

  observe();
}

/** Scroll-reveal animation and active nav link highlighting. */
function observe(): void {
  observers.forEach((observer) => observer.disconnect());
  observers = [];
  if (!('IntersectionObserver' in window)) return;

  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  app.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));
  document.documentElement.classList.add('reveal-ready');

  const active = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        app.querySelectorAll<HTMLElement>('[data-nav-link]').forEach((link) => {
          link.dataset.active = String(link.dataset.navLink === entry.target.id);
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  app.querySelectorAll('main section[id]').forEach((el) => active.observe(el));

  observers = [reveal, active];
}

function setMenu(open: boolean): void {
  const toggle = app.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = app.querySelector<HTMLElement>('#mobile-menu');
  if (!toggle || !menu) return;

  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose! : toggle.dataset.labelOpen!);
  toggle.querySelector<HTMLElement>('[data-icon-open]')!.hidden = open;
  toggle.querySelector<HTMLElement>('[data-icon-close]')!.hidden = !open;
}

// Event delegation: handlers survive re-rendering on language change.
app.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  const localeButton = target.closest<HTMLElement>('[data-locale]');
  if (localeButton) {
    const next = localeButton.dataset.locale as Locale;
    if (next !== locale) {
      locale = next;
      saveLocale(locale);
      render();
      // Everything already on screen was visible before; don't re-animate it.
      app.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      app.querySelector<HTMLElement>(`[data-locale="${locale}"]`)?.focus();
    }
    return;
  }

  const toggle = target.closest<HTMLElement>('[data-menu-toggle]');
  if (toggle) {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    return;
  }

  if (target.closest('#mobile-menu a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

render();
