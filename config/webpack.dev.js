const {join} = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {
  PROTOCOL, HOST, PORT, HTML_PATH, BUILD_PATH, DIST_PATH, CONFIG_PATH, ASSETS_PATH_REL, TARGET
} = require('.');

module.exports = {
  output: {
    filename: '[name].js',
    path: BUILD_PATH
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    https: PROTOCOL === 'https' ? true : false,
    host: HOST,
    port: PORT,
    stats: 'minimal',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {path: CONFIG_PATH}
            }
          }
        ]
      },
      {
        test: /\.(webp|png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: join(ASSETS_PATH_REL, 'images', '[name].[ext]'),
          publicPath: '../../'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: join(ASSETS_PATH_REL, 'fonts', '[name].[ext]'),
          publicPath: '../../'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {from: 'src/index.js', to: BUILD_PATH},
      {from: 'src/preload.js', to: BUILD_PATH},
      {from: 'src/package.json', to: BUILD_PATH},
      {
        from: 'src/configs/',
        to: join(BUILD_PATH, 'configs')
      },
      {
        from: 'src/constants/',
        to: join(BUILD_PATH, 'constants')
      },
      {
        from: 'src/models/',
        to: join(BUILD_PATH, 'models')
      },
      {
        from: 'src/services/',
        to: join(BUILD_PATH, 'services')
      },
      {
        from: 'src/utils/',
        to: join(BUILD_PATH, 'utils')
      }
    ]),

    new HtmlPlugin({
      template: HTML_PATH,
      base: TARGET === 'web' ? '/' : './',
      chunksSortMode: 'dependency'
    }),

    new webpack.HotModuleReplacementPlugin(),
  ]
};
