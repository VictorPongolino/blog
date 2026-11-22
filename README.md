# Portfolio — Victor Hugo Pongolino

Personal portfolio of a Senior Backend Developer. Single page, mobile first, English and Portuguese.

Built with [Vite](https://vite.dev/), TypeScript and [Tailwind CSS](https://tailwindcss.com/) — no UI framework.

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

## Replacing the placeholders

| What                                   | Where                                             |
| -------------------------------------- | ------------------------------------------------- |
| Texts (English)                        | `src/i18n/en.ts`                                  |
| Texts (Portuguese)                     | `src/i18n/pt.ts`                                  |
| Photo, e-mail, social and project URLs | `src/config.ts`                                   |
| Images                                 | `public/images/` (then update `src/config.ts`)    |
| Colors and fonts                       | `@theme` block in `src/style.css`                 |

`pt.ts` is typed against `en.ts`, so the build fails if a translation is missing.

## Languages

The language is chosen in this order: `?lang=en|pt` in the URL, the visitor's saved choice,
the browser language, then English. To add a language, create a dictionary in `src/i18n/` and
register it in `src/i18n/index.ts`.

## Structure

```
index.html            entry page
src/main.ts           rendering, language switch, menu, scroll effects
src/config.ts         language-independent data (links, images)
src/i18n/             dictionaries and locale detection
src/sections/         one function per page section
content/articles/     articles from the previous blog (not published)
```

## Deploy

Pushing to `master` builds the site and publishes `dist/` to GitHub Pages
(`.github/workflows/deploy-pages.yml`).
