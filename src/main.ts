/**
 * Progressive enhancement only: the page content is already in the HTML
 * (see src/render.ts). This adds the mobile menu, scroll effects and
 * active-link highlighting.
 */
import './style.css';

function setMenu(open: boolean): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('#mobile-menu');
  if (!toggle || !menu) return;

  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose! : toggle.dataset.labelOpen!);
  toggle.querySelector<HTMLElement>('[data-icon-open]')!.hidden = open;
  toggle.querySelector<HTMLElement>('[data-icon-close]')!.hidden = !open;
}

const isMenuOpen = (): boolean =>
  document.querySelector('[data-menu-toggle]')?.getAttribute('aria-expanded') === 'true';

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  if (target.closest('[data-menu-toggle]')) {
    setMenu(!isMenuOpen());
    return;
  }

  if (target.closest('#mobile-menu a')) setMenu(false);

  // Keep the visitor on the same section when switching language.
  const localeLink = target.closest<HTMLAnchorElement>('a[data-locale-link]');
  if (localeLink && window.location.hash) {
    localeLink.href = localeLink.pathname + window.location.hash;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !isMenuOpen()) return;
  setMenu(false);
  document.querySelector<HTMLElement>('[data-menu-toggle]')?.focus();
});

if ('IntersectionObserver' in window) {
  // Fade sections in as they enter the viewport (CSS disables this for reduced motion).
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
  document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));
  document.documentElement.classList.add('reveal-ready');

  // Mark the menu link of the section currently on screen.
  const navLinks = document.querySelectorAll<HTMLElement>('[data-nav-link]');
  const active = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach((link) => {
          if (link.dataset.navLink === entry.target.id)
            link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  document.querySelectorAll('main section[id]').forEach((el) => active.observe(el));
}
