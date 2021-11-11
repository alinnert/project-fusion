import i18n from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export default i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    interpolation: {
      escapeValue: false,
      format(value, format, language) {
        switch (format) {
          default:
            return value

          case 'capitalize':
            return `${value[0].toUpperCase()}${value.substr(1)}`
        }
      },
    },
  })
