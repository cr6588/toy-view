const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // disableHostCheck已被删除，使用allowedHosts https://webpack.js.org/configuration/dev-server/#devserverallowedhosts
    allowedHosts: 'all'
  }
})
