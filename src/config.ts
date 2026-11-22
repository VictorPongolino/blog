/** Language-independent site data. */
export const site = {
  /**
   * Public address of the site, without a trailing slash. Used for SEO tags, the sitemap and
   * robots.txt. Must be the address the site is actually served from (the custom domain set in
   * the repository's Pages settings, same as public/CNAME), not one that redirects to it.
   */
  url: 'https://victorpongolino.com',
  name: 'Victor Hugo Pongolino',
  handle: 'victor.pongolino',
  /**
   * Your photo. While EMPTY, no photo is shown anywhere.
   * Put the file in public/images/ and set its path here, e.g. '/images/profile.jpg'
   * (square, at least 400×400). It then appears in the hero and in link previews.
   */
  photo: '',
  /**
   * Image shown in link previews (LinkedIn, WhatsApp, X…) while `photo` is empty.
   * 1200×630 PNG in public/images/.
   */
  socialImage: { path: '/images/social-preview.png', width: 1200, height: 630 },
  /** Used for projects without an image of their own */
  projectImageFallback: '/images/project-placeholder.svg',
  /**
   * Public contact address. While EMPTY, the contact button points to LinkedIn instead.
   * Set it, e.g. 'me@example.com', to show a "Send me an email" button.
   */
  email: '',
  social: {
    github: 'https://github.com/VictorPongolino',
    linkedin: 'https://www.linkedin.com/in/victor-hugo-pongolino/',
    youtube: 'https://www.youtube.com/@victorpongolino',
  },
};
