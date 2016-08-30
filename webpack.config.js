const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src', 'components', 'app'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  entry: {
    app: PATHS.app
  },
  target: 'electron',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('style!css') },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?prefix=font/&limit=10000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  externals: {
    nedb: 'commonjs nedb'
  },
  resolve: {
    extensions: ['', '.js'],
    // modulesDirectories: ['src/components', 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'eDossier Builder'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        keep_fnames: true
      },
      output: {
        comments: false,
      },
      mangle: false
    })
  ],
  devtool: '#eval-source-map',
  cache: true
};