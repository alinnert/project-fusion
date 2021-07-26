const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  },
  localePath: path.resolve('./public/locales/'),
  localeStructure: '{{lng}}/{{ns}}'
}
