import { en, type Dictionary } from './en';
import { pt } from './pt';

export type Locale = 'en' | 'pt';

/** Each language is its own page: English at "/", Portuguese at "/pt/". */
export const LOCALES: {
  code: Locale;
  label: string;
  name: string;
  htmlLang: string;
  ogLocale: string;
  path: string;
}[] = [
  { code: 'en', label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US', path: '/' },
  {
    code: 'pt',
    label: 'PT',
    name: 'Português',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    path: '/pt/',
  },
];

export const DEFAULT_LOCALE: Locale = 'en';

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const getLocale = (locale: Locale) => LOCALES.find((l) => l.code === locale)!;

export type { Dictionary };
