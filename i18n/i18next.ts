import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

export const languages = {
  en: { nativeLanguage: 'English' },
  de: { nativeLanguage: 'Deutsch' },
} as const

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })
