import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { LOCALES, type Locale } from './src/i18n';
import { renderPage, renderRobots, renderSitemap } from './src/render';

/**
 * Writes the page content into each HTML entry at build time (one per language)
 * and generates sitemap.xml and robots.txt, so the site is fully static and crawlable.
 */
function prerender(): Plugin {
  return {
    name: 'prerender',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const locale: Locale = ctx.path.startsWith('/pt/') ? 'pt' : 'en';
        const page = renderPage(locale);
        return html
          .replace('<html lang="en"', `<html lang="${page.lang}"`)
          .replace('<!--head-->', page.head)
          .replace('<!--app-->', page.body);
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), prerender()],
  build: {
    rollupOptions: {
      // One HTML entry per language: "/" and "/pt/".
      input: Object.fromEntries(LOCALES.map((l) => [l.code, `${l.path.slice(1)}index.html`])),
    },
  },
});
