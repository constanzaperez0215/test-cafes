const { defineConfig } = require('vitest/config')

module.export = defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      reporter: ['html']
    }
  }
})
