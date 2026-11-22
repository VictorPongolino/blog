/**
 * Builds the full HTML of a page for one language.
 * Runs at build time (see vite.config.ts), so the published pages are plain
 * HTML that search engines and visitors without JavaScript can read.
 */
import { site } from './config';
import { DEFAULT_LOCALE, LOCALES, getDictionary, getLocale, type Locale } from './i18n';
import { about, contact, experience, footer, projects, skills } from './sections/content';
import { header } from './sections/header';
import { hero } from './sections/hero';
import { esc } from './sections/shared';

export const absoluteUrl = (path: string): string => `${site.url}${path}`;

/** schema.org description of the person, for rich results in search engines. */
function structuredData(locale: Locale): string {
  const t = getDictionary(locale);
  const { htmlLang, path } = getLocale(locale);
  const person = {
    '@type': 'Person',
    '@id': `${absoluteUrl('/')}#person`,
    name: site.name,
    jobTitle: t.hero.role,
    description: t.meta.description,
    url: absoluteUrl('/'),
    ...(site.photo ? { image: absoluteUrl(site.photo) } : {}),
    sameAs: Object.values(site.social),
    knowsLanguage: ['pt-BR', 'en'],
    knowsAbout: t.skills.groups.flatMap((group) => group.items),
  };
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'ProfilePage',
        '@id': absoluteUrl(path),
        url: absoluteUrl(path),
        name: t.meta.title,
        inLanguage: htmlLang,
        mainEntity: { '@id': person['@id'] },
      },
    ],
  };
  // "<" is escaped so the JSON can never close the script tag early.
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}

function head(locale: Locale): string {
  const t = getDictionary(locale);
  const current = getLocale(locale);
  const url = absoluteUrl(current.path);
  const title = esc(t.meta.title);
  const description = esc(t.meta.description);

  const alternates = LOCALES.map(
    (l) => `<link rel="alternate" hreflang="${l.htmlLang}" href="${absoluteUrl(l.path)}" />`,
  ).join('\n    ');
  const ogAlternates = LOCALES.filter((l) => l.code !== locale)
    .map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`)
    .join('\n    ');
  // Link previews use the photo once it is set, and the generic preview image until then.
  const preview = site.photo
    ? { url: absoluteUrl(site.photo), alt: esc(t.hero.photoAlt), size: [] }
    : {
        url: absoluteUrl(site.socialImage.paths[locale]),
        alt: title,
        size: [
          `<meta property="og:image:width" content="${site.socialImage.width}" />`,
          `<meta property="og:image:height" content="${site.socialImage.height}" />`,
        ],
      };
  const image = [
    `<meta property="og:image" content="${preview.url}" />`,
    ...preview.size,
    `<meta property="og:image:alt" content="${preview.alt}" />`,
    `<meta name="twitter:image" content="${preview.url}" />`,
    `<meta name="twitter:image:alt" content="${preview.alt}" />`,
  ].join('\n    ');

  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="${esc(site.name)}" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#070b14" />
    <meta name="color-scheme" content="dark" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(getLocale(DEFAULT_LOCALE).path)}" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="${current.ogLocale}" />
    ${ogAlternates}
    ${image}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <script type="application/ld+json">${structuredData(locale)}</script>`;
}

function body(locale: Locale): string {
  const t = getDictionary(locale);
  return `${header(t, locale)}
    <main id="main">
      ${hero(t)}
      ${about(t)}
      ${skills(t)}
      ${experience(t)}
      ${projects(t, locale)}
      ${contact(t)}
    </main>
    ${footer(t)}`;
}

export function renderPage(locale: Locale): { lang: string; head: string; body: string } {
  return { lang: getLocale(locale).htmlLang, head: head(locale), body: body(locale) };
}

export function renderSitemap(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const links = LOCALES.map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l.htmlLang}" href="${absoluteUrl(l.path)}" />`,
  ).join('\n');
  const urls = LOCALES.map(
    (l) => `  <url>
    <loc>${absoluteUrl(l.path)}</loc>
    <lastmod>${lastmod}</lastmod>
${links}
  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function renderRobots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
}
