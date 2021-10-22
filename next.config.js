const { i18n } = require('./next-i18next.config.js')
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  webpackDevMiddleware(config) {
    config.watchOptions = { ignored: ['.git/', '.next/', 'node_modules'] }
    return config
  },
  i18n,
  pwa: {
    dest: 'public'
  }
})
