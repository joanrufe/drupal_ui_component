var webpack = require('webpack')

module.exports = (options, req) => ({
  entry: {
    datepicker: "./js-src/datepicker/index.js",
  },
  filename: {
    js: '[name].js',
    css: 'datepicker.css',
    /*  Enable when needed
    images: 'assets/images/[name].[ext]',
    fonts: 'assets/fonts/[name].[ext]',
    chunk: '[id].chunk.js' 
    */
  },
  webpack(config) {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin('common'))
    return config
  }
})