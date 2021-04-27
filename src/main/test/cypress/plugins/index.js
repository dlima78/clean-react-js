const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  const webpack = {
    webpackOptions: require('../../../../../webpack.common.js'),
    watchOptions: {}
  }
  on('file:preprocessor', webpackPreprocessor({ webpack }))
}
