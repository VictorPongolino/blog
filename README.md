# Portfolio — Victor Hugo Pongolino

Personal portfolio of a Senior Backend Developer. Single page, mobile first, in English (`/`) and
Portuguese (`/pt/`).

Built with [Vite](https://vite.dev/), TypeScript and [Tailwind CSS](https://tailwindcss.com/) — no
UI framework. The pages are generated as plain HTML at build time, so search engines and visitors
without JavaScript get the full content.

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

## Where to change things

| What                                    | Where                              |
| --------------------------------------- | ---------------------------------- |
| Texts (English)                         | `src/i18n/en.ts`                   |
| Texts (Portuguese)                      | `src/i18n/pt.ts`                   |
| Photo, e-mail, social links, site URL   | `src/config.ts`                    |
| Link preview image                      | `public/images/social-preview.png` |
| Projects (empty list hides the section) | `src/projects.ts`                  |
| Images                                  | `public/images/`                   |
| Colors and fonts                        | `@theme` block in `src/style.css`  |

`pt.ts` is typed against `en.ts`, so the build fails if a translation is missing.

### Switches that turn content on

- **Photo** — set `photo` in `src/config.ts` (e.g. `'/images/profile.jpg'`). While it is empty no
  photo is rendered; once set it appears in the hero and in link previews.
- **E-mail** — set `email` in `src/config.ts`. While it is empty the contact button points to
  LinkedIn; once set it becomes a "Send me an email" button.
- **Projects** — add entries to `src/projects.ts`. While the list is empty the section, its menu
  link and the hero button are not rendered.

## Search engines and accessibility

- Each language has its own URL with `canonical` and `hreflang` links, Open Graph tags and
  schema.org `Person` data, all generated in `src/render.ts`.
- `sitemap.xml` and `robots.txt` are generated on build from `url` in `src/config.ts`. That URL
  must be the address the site is served from (the custom domain in the Pages settings and
  `public/CNAME`); an address that only redirects there makes every canonical link wrong.
- Link previews use `public/images/social-preview.png` (1200×630) until a photo is set.
- Semantic landmarks, labelled sections, a skip link, keyboard-friendly menu and reduced-motion
  support.

## Structure

```
index.html, pt/index.html   HTML shells, filled at build time
vite.config.ts              build + prerender plugin
src/render.ts               page HTML, <head> tags, sitemap
src/main.ts                 browser behaviour (menu, scroll effects)
src/config.ts               language-independent data
src/projects.ts             projects list
src/i18n/                   dictionaries and languages
src/sections/               one function per page section
content/articles/           articles from the previous blog (not published)
```

## Deploy

`.github/workflows/deploy-pages.yml` builds every pull request, and on pushes to `master` builds
and publishes `dist/` to GitHub Pages.
