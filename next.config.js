const { i18n } = require('./next-i18next.config.js')

module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware(config) {
    config.watchOptions = { ignored: ['.git/', '.next/', 'node_modules'] }
    return config
  },
  i18n,
}
