const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  base: "/zaiten/",
  plugins: [],
  resolve: {
    alias: [
      
    ]
  },
  transpileDependencies: true
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/zaiten/'
    : '/'
}
