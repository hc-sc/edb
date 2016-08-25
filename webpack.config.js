const webpack = require('webpack');

module.exports = {
  entry: [
    './src/components/app.webpack'
  ],
  target: 'electron',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.svg$/, loader: 'file' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src/components', 'node_modules', 'src/jspm_packages']
  },
  plugins: [
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
  ]
};