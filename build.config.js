module.exports = {
  // Disable build tracing
  tracing: false,
  // Disable source maps
  sourceMaps: false,
  // Disable minification
  minify: false,
  // Disable tree shaking
  treeShaking: false,
  // Disable optimization
  optimization: {
    minimize: false,
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
    sideEffects: false
  },
  // Disable experimental features
  experimental: {
    cacheCompression: false,
    layers: false,
    lazyCompilation: false,
    memoryBackend: false
  }
}
