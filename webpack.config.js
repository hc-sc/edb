const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src', 'components', 'app'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: {
    app: PATHS.app
  },
  target: 'electron',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: false
    }),
    new webpack.optimize.DedupePlugin()
  ]
};

var config;

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {
      devtool: '#source-map'
    });
    break;
  default:
    config = merge(common, {
      devtool: '#eval-source-map',
      cache: true
    })
}

module.exports = validate(config);