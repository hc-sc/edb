const {join} = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
  DIST_DIR, DIST_PATH, URL_LOADER_LIMIT, HTML_PATH, CONFIG_PATH, ASSETS_PATH_REL, TARGET, SOURCE_MAPS, pathFromRoot
} = require('.');

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    // libraryTarget: 'commonjs2',
    path: DIST_PATH
  },
  // may need these depending on your application
  // externals: [
  //   ...Object.keys(require('../package.json') || {}).filter(d => d !== 'vue')
  // ],
  // node: {
  //   __dirname: false,
  //   __filename: false
  // },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
        }]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: SOURCE_MAPS,
                config: {path: CONFIG_PATH}
              }
            }
          ]
        })
      },
      {
        test: /\.(webp|png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          // limit: URL_LOADER_LIMIT, // if using url-loader
          name: join(ASSETS_PATH_REL, 'images', '[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          // limit: URL_LOADER_LIMIT // if using url-loader
          name: join(ASSETS_PATH_REL, 'fonts', '[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new CleanPlugin(DIST_DIR, {root: pathFromRoot()}),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: SOURCE_MAPS
    }),

    // pull vendor code into its own bundle, so modifying our code base doesn't change its hash (would ruin cache busting)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    // extract Webpack runtime to its own file, so vendor hash isn't updated on change (would ruin cache busting)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new ExtractTextPlugin({
      filename: join(ASSETS_PATH_REL, 'css', 'style.[contenthash].css'),
      allChunks: true,
      ignoreOrder: true
    }),

    // new OptimizeCSSAssetsPlugin({
      // cssProcessorOptions: {safe: true}
    // }),

    new HtmlPlugin({
      template: HTML_PATH,
      // setting a base href causes 'not allowed to load resource' in Electron
      base: TARGET === 'web' ? '/' : '',
      chunksSortMode: 'dependency',
      nodeModules: pathFromRoot('node_modules'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
};
