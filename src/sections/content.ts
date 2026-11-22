import { site } from '../config';
import { icons } from '../icons';
import type { Dictionary, Locale } from '../i18n';
import { projects as projectList } from '../projects';
import { socialLinks } from './hero';
import { sectionNumber } from './header';
import { chips, esc, headingId, sectionHeading } from './shared';

export function about(t: Dictionary): string {
  return `
    <section id="about" aria-labelledby="${headingId('about')}" class="section">
      <div class="container-page">
        ${sectionHeading('about', t.about.eyebrow, t.about.title)}
        <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div class="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg" data-reveal>
            ${t.about.paragraphs.map((p) => `<p>${p}</p>`).join('')}
          </div>
          <dl class="grid grid-cols-2 gap-4 self-start" data-reveal>
            ${t.about.stats
              .map(
                (stat) => `
              <div class="card flex flex-col-reverse p-5">
                <dt class="mt-1 text-sm text-slate-400">${stat.label}</dt>
                <dd class="font-mono text-3xl font-bold text-accent">${stat.value}</dd>
              </div>`,
              )
              .join('')}
          </dl>
        </div>
      </div>
    </section>`;
}

export function skills(t: Dictionary): string {
  return `
    <section id="skills" aria-labelledby="${headingId('skills')}" class="section border-y border-white/5 bg-ink-900/40">
      <div class="container-page">
        ${sectionHeading('skills', t.skills.eyebrow, t.skills.title, t.skills.subtitle)}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${t.skills.groups
            .map(
              (group) => `
            <article class="card p-5 transition-colors hover:border-accent/40" data-reveal>
              <h3 class="mb-4 font-mono text-sm font-semibold text-white">
                <span class="text-accent" aria-hidden="true">&gt;</span> ${group.name}
              </h3>
              ${chips(group.items)}
            </article>`,
            )
            .join('')}
        </div>
      </div>
    </section>`;
}

export function experience(t: Dictionary): string {
  return `
    <section id="experience" aria-labelledby="${headingId('experience')}" class="section">
      <div class="container-page">
        ${sectionHeading('experience', t.experience.eyebrow, t.experience.title)}
        <ol class="relative space-y-10 border-l border-white/10 pl-6 sm:pl-8">
          ${t.experience.items
            .map(
              (job) => `
            <li class="relative" data-reveal>
              <span class="absolute top-1.5 -left-[31px] size-3 rounded-full border-2 border-accent bg-ink-950 sm:-left-[39px]" aria-hidden="true"></span>
              <p class="font-mono text-xs text-accent sm:text-sm">${job.period}</p>
              <h3 class="mt-1 text-xl font-semibold text-white">${job.role}</h3>
              <p class="text-slate-400"><span aria-hidden="true">@ </span>${job.company}</p>
              <p class="mt-3 max-w-3xl leading-relaxed text-slate-400">${job.description}</p>
              <ul class="mt-3 max-w-3xl space-y-2 text-slate-400">
                ${job.highlights
                  .map(
                    (h) => `
                  <li class="flex gap-3"><span class="mt-0.5 font-mono text-accent" aria-hidden="true">▹</span><span>${h}</span></li>`,
                  )
                  .join('')}
              </ul>
              <div class="mt-4">${chips(job.stack)}</div>
            </li>`,
            )
            .join('')}
        </ol>

        <h3 class="mt-14 mb-5 font-mono text-sm font-semibold text-white" data-reveal>
          <span class="text-accent" aria-hidden="true">&gt;</span> ${t.experience.educationTitle}
        </h3>
        <ul class="grid gap-4 sm:grid-cols-2">
          ${t.experience.education
            .map(
              (item) => `
            <li class="card p-5" data-reveal>
              <p class="font-mono text-xs text-accent sm:text-sm">${item.period}</p>
              <p class="mt-1 text-lg font-semibold text-white">${item.degree}</p>
              <p class="text-slate-400">${item.school}</p>
            </li>`,
            )
            .join('')}
        </ul>
      </div>
    </section>`;
}

export function projects(t: Dictionary, locale: Locale): string {
  // No projects yet (see src/projects.ts): render nothing at all.
  if (projectList.length === 0) return '';

  const link = (href: string | undefined, label: string, icon: string, name: string) =>
    href
      ? `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${label} — ${name} ${t.a11y.newTab}`)}" class="inline-flex items-center gap-1.5 py-2 font-mono text-sm text-slate-300 transition-colors hover:text-accent">${icon} ${label}</a>`
      : '';

  return `
    <section id="projects" aria-labelledby="${headingId('projects')}" class="section border-y border-white/5 bg-ink-900/40">
      <div class="container-page">
        ${sectionHeading('projects', t.projects.eyebrow, t.projects.title)}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${projectList
            .map(
              (project) => `
            <article class="card group flex flex-col overflow-hidden transition-colors hover:border-accent/40" data-reveal>
              <img src="${project.image ?? site.projectImageFallback}" alt="${esc(`${t.projects.imageAlt}: ${project.name[locale]}`)}" width="800" height="450" loading="lazy"
                class="aspect-video w-full border-b border-white/10 object-cover" />
              <div class="flex flex-1 flex-col p-5">
                <h3 class="text-lg font-semibold text-white group-hover:text-accent">${project.name[locale]}</h3>
                <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">${project.description[locale]}</p>
                <div class="mt-4">${chips(project.stack)}</div>
                <div class="mt-3 flex gap-5">
                  ${link(project.code, t.projects.code, icons.github, project.name[locale])}
                  ${link(project.live, t.projects.live, icons.external, project.name[locale])}
                </div>
              </div>
            </article>`,
            )
            .join('')}
        </div>
      </div>
    </section>`;
}

export function contact(t: Dictionary): string {
  // With an e-mail in src/config.ts the button is a mailto; otherwise it points to LinkedIn.
  const cta = site.email
    ? `<a href="mailto:${site.email}" class="btn btn-primary mt-8 w-full sm:w-auto">${icons.mail} ${t.contact.emailCta}</a>`
    : `<a href="${site.social.linkedin}" target="_blank" rel="me noopener noreferrer" class="btn btn-primary mt-8 w-full sm:w-auto">
        ${icons.linkedin} ${t.contact.linkedinCta}<span class="sr-only"> ${t.a11y.newTab}</span>
      </a>`;

  return `
    <section id="contact" aria-labelledby="${headingId('contact')}" class="section">
      <div class="container-page">
        <div class="card relative overflow-hidden px-5 py-12 text-center sm:px-12 sm:py-16" data-reveal>
          <div class="pointer-events-none absolute -bottom-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-accent-2/10 blur-3xl" aria-hidden="true"></div>
          <div class="relative">
            <p class="font-mono text-sm text-accent" aria-hidden="true">
              <span class="text-slate-400">${sectionNumber('contact')}.</span> ${t.contact.eyebrow.toLowerCase()}
            </p>
            <h2 id="${headingId('contact')}" class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">${t.contact.title}</h2>
            <p class="mx-auto mt-4 max-w-xl leading-relaxed text-slate-400">${t.contact.text}</p>
            ${cta}
            <p class="mt-8 font-mono text-xs text-slate-400">${t.contact.or}</p>
            ${socialLinks(t, 'mt-3 justify-center')}
          </div>
        </div>
      </div>
    </section>`;
}

export function footer(t: Dictionary): string {
  return `
    <footer class="border-t border-white/5">
      <div class="container-page flex flex-col items-center gap-3 py-8 text-center font-mono text-xs text-slate-400 sm:flex-row sm:justify-between sm:text-left">
        <p>© ${new Date().getFullYear()} ${site.name}. ${t.footer.rights}</p>
        <p>${t.footer.builtWith}</p>
        <a href="#top" class="inline-flex items-center gap-1.5 py-2 text-slate-300 transition-colors hover:text-accent">
          ${icons.arrowUp} ${t.footer.backToTop}
        </a>
      </div>
    </footer>`;
}
