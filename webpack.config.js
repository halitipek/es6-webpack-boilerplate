const path = require('path')
const Dotenv = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new Dotenv({
      safe: true, 
      systemvars: true, 
      silent: true 
    }),
    new NodemonPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}