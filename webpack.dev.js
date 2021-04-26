const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    writeToDisk: true,
    historyApiFallback: true,
    port: 8080
  },
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.APÌ_URL': JSON.stringify('http://localhost:5050/api')
    }),
    new HtmlWebpackPlugin({
      template: 'template.dev.html'
    })
  ]
})
