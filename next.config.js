const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  webpackDevMiddleware(config) {
    config.watchOptions = { ignored: ['.git/', '.next/', 'node_modules'] }
    return config
  },
  pwa: {
    dest: 'public'
  }
})
