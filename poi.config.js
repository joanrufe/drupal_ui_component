var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (options, req) => {
  // Production
  if (options.mode === 'production') {
    return {
      entry: {
        datepicker: "./js-src/datepicker/index.js",
      },
      filename: {
        js: '[name].js',
        css: 'datepicker.css',
      },
      webpack(config) {
        config.plugins.push(new webpack.optimize.CommonsChunkPlugin('common'))
        config.plugins.push(new ExtractTextPlugin({
          filename: '[name].css',
          disable: false,
          allChunks: false
        }))
        return config
      },
      mergeConfig: {
        module: {
          loaders: [
            {
              test: /\.css$/,
              loaders: ['css-loader', 'sass-loader']
            }
          ]
        }
      }
    }
  }
  // Developement 
  else {
    return {
      entry: {
        client: "./js-src/datepicker/index.js",
      },
      presets: [
        require('poi-preset-react')(/* options */)
      ],
      postcss: {
        autoprefixer: {
          browsers: ['ie > 9', 'chrome > 42']
        }
      },
      eslint: {
        configFile: './.eslintrc.json'
      },
      mergeConfig: {
        module: {
          loaders: [
            {
              test: /\.scss$/,
              loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
          ]
        }
      }
    }
  }
}