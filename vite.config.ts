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
    // The dev server has no build output, so it serves the generated files directly.
    configureServer(server) {
      const generated = [
        { path: '/sitemap.xml', type: 'application/xml', render: renderSitemap },
        { path: '/robots.txt', type: 'text/plain; charset=utf-8', render: renderRobots },
      ];
      for (const file of generated) {
        server.middlewares.use(file.path, (_req, res) => {
          res.setHeader('Content-Type', file.type);
          res.end(file.render());
        });
      }
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
