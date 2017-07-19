const {join} = require('path');
const webpack = require('webpack');
const {
  SRC_PATH, TEST_PATH, ASSETS_PATH_REL, CONFIG_PATH
} = require('.');

module.exports = {
  devtool: '#inline-source-map',
  resolve: {
    alias: {
      '@': SRC_PATH,
      'test': TEST_PATH
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [SRC_PATH, CONFIG_PATH]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 1},
          },
          {
            loader: 'postcss-loader',
            options: {
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('test')
      }
    })
  ]
};
