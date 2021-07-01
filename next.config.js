module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware(config) {
    config.watchOptions = { ignored: ['.git/', '.next/', 'node_modules'] }
    return config
  },
}
