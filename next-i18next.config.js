const path = require('path')

module.exports = {
  // next.js configuration
  // See: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    defaultLocale: 'de',
    locales: ['en', 'de'],
  },

  // next-i18next configuration
  serializeConfig: false,
  localePath: path.resolve('./public/locales/'),
  localeStructure: '{{lng}}/{{ns}}',

  // i18next configuration
  interpolation: {
    /** @type {import('i18next').FormatFunction} */
    format(value, format, language) {
      switch (format) {
        default: {
          return value
        }

        case 'capitalize': {
          return `${value[0].toUpperCase()}${value.substr(1)}`
        }
      }
    },
  },
}
