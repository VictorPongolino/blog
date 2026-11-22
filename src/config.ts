/** Language-independent site data. */
export const site = {
  /** Public address of the site, without a trailing slash. Used for SEO tags and the sitemap. */
  url: 'https://victorpongolino.com',
  name: 'Victor Hugo Pongolino',
  handle: 'victor.pongolino',
  /**
   * Your photo. While EMPTY, no photo is shown anywhere.
   * Put the file in public/images/ and set its path here, e.g. '/images/profile.jpg'
   * (square, at least 400×400). It then appears in the hero and in link previews.
   */
  photo: '',
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
