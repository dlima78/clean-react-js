const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  const webpack = require('../../../../../webpack.common.js')

  on('file:preprocessor', webpackPreprocessor({ webpack }))
}
