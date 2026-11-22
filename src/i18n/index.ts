import { en, type Dictionary } from './en';
import { pt } from './pt';

export type Locale = 'en' | 'pt';

export const LOCALES: { code: Locale; label: string; htmlLang: string }[] = [
  { code: 'en', label: 'EN', htmlLang: 'en' },
  { code: 'pt', label: 'PT', htmlLang: 'pt-BR' },
];

const dictionaries: Record<Locale, Dictionary> = { en, pt };
const STORAGE_KEY = 'locale';
const DEFAULT_LOCALE: Locale = 'en';

const isLocale = (value: unknown): value is Locale =>
  LOCALES.some((locale) => locale.code === value);

/** Priority: ?lang= in the URL, saved choice, browser language, English. */
export function detectLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromUrl)) return fromUrl;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Storage unavailable (private mode, blocked) — fall through.
  }

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : DEFAULT_LOCALE;
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Not persisted; the choice still applies to this visit.
  }
}

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export type { Dictionary };
