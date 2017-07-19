const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const devConfig = require('./config/webpack.dev.js');
const prodConfig = require('./config/webpack.prod.js');
const {
  APP_PATH, SRC_PATH, TARGET
} = require('./config/');

let baseConfig = {
  target: TARGET,
  entry: {
    app: APP_PATH
  },
  resolve: {
    alias: {
      '@': SRC_PATH,
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin()
  ]
};

module.exports = (env) => {
  printEnvironment(env);
  switch (env) {
    case 'development':
      return merge(baseConfig, devConfig);
    case 'production':
      return merge(baseConfig, prodConfig);
    default:
      console.error('ERROR: Invalid environment');
      process.exit(1);
  }
};

function printEnvironment(env) {
  console.log(`
-----------------------------------------
Building for ${TARGET === 'web' ? 'web' : 'Electron'} in ${env} mode
-----------------------------------------
`);
}




// OLD ANGULAR BUNDLER

// const path = require('path');
// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const validate = require('webpack-validator');
// const HtmlPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const PATHS = {
//   app: path.join(__dirname, 'src', 'renderer', 'index'),
//   src: path.join(__dirname, 'src', 'renderer'),
//   build: path.join(__dirname, 'build', 'renderer'),
//   dist: path.join(__dirname, 'dist', 'renderer')
// };

// const common = {
//   target: 'electron',
//   entry: {
//     app: PATHS.app,
//   },
//   output: {
//     path: PATHS.build,
//     filename: '[name].js'
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, 'src', 'renderer')
//     },
//     extensions: ['', '.js', '.css', '.scss', '.html']
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader'
//       },
//       { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
//       { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
//       {
//         test: /\.html$/,
//         include: path.join(PATHS.src, 'components'),
//         loader: 'html'
//       },
//       // {
//       //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//       //   loader: 'url?limit=10000&mimetype=application/font-woff'
//       // },
//       // {
//       //   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//       //   loader: 'file'
//       // }
//       {
//         test: /\.(woff2?|ttf|eot)$/,
//         loader: 'file-loader'
//       },
//       {
//         test: /\.(jpe?g|png|gif|svg)$/,
//         loader: 'file-loader'
//       }
//     ]
//   },
//   plugins: [
//     new webpack.ProvidePlugin({
//       _: 'lodash',
//       'Promise': 'bluebird'
//     })
//   ]
// };

// let config;
// let mode = process.env.npm_lifecycle_event;
// mode = (mode !== 'dist' && mode !== 'test') ? 'dev' : mode;
// console.log(`
// --------------------------
// Bundling in ${mode} mode
// --------------------------
// `);

// switch (mode) {
//   case 'dist':
//     config = merge(
//       common,
//       {
//         output: {
//           path: PATHS.dist
//         }
//       },
//       createHTML('dist'),
//       copyFiles('dist'),
//       extractCSS(),
//       minifyJS()
//     );
//     break;
//   case 'test':
//     break;
//   default:
//     config = merge(
//       common,
//       {
//         devtool: 'eval-source-map'
//       },
//       createHTML('build'),
//       copyFiles('build'),
//       loadCSS()
//     );
//     break;
// }


// function loadCSS() {
//   return {
//     module: {
//       loaders: [
//         {
//           test: /\.css$/,
//           loaders: [
//             {loader: 'style-loader'},
//             {
//               loader: 'css-loader',
//               options: {importLoaders: 1}},
//             {
//               loader: 'postcss-loader',
//               options: {
//                 sourceMap: true,
//               }
//             }
//           ]
//         },
//       ]
//     }
//   };
// }

// function extractCSS() {
//   return {
//     module: {
//       loaders: [
//         {
//           test: /\.css$/,
//           loader: ExtractTextPlugin.extract('style', 'css')
//         },
//         {
//           test: /\.scss$/,
//           loader: ExtractTextPlugin.extract('style', 'css!sass')
//         }
//       ]
//     },
//     plugins: [
//       new ExtractTextPlugin('[name].[chunkhash].css')
//     ]
//   };
// }

// function minifyJS() {
//   return {
//     plugins: [
//       new webpack.optimize.UglifyJsPlugin({
//         beautify: false,
//         comments: false,
//         compress: {
//           warnings: false,
//           // drop_console: true
//         },
//         mangle: false
//       })
//     ]
//   };
// }

// function copyFiles(dest) {
//   var copies = [
//     { from: 'src/index.js', to: path.join(__dirname, dest) },
//     { from: 'src/preload.js', to: path.join(__dirname, dest) },
//     { from: 'src/package.json', to: path.join(__dirname, dest) },
//     // { from: 'src/renderer/dummy-data/', to: path.join(__dirname, dest, 'renderer', 'dummy-data') },
//     // { from: 'src/renderer/scss/', to: path.join(__dirname, dest, 'renderer', 'scss') },
//     // { from: 'src/renderer/img/', to: path.join(__dirname, dest, 'renderer', 'img') },
//     // { from: 'src/constants/', to: path.join(__dirname, dest, 'constants') },
//     // { from: 'src/models/', to: path.join(__dirname, dest, 'models') },
//     // { from: 'src/services/', to: path.join(__dirname, dest, 'services') },
//     // { from: 'src/utils/', to: path.join(__dirname, dest, 'utils') },
//     // { from: 'src/configs/', to: path.join(__dirname, dest, 'configs') }
//   ];

//   if (dest === 'dist') {
//     copies.push({ from: 'resources/app/', to: path.join(__dirname, dest) });
//   }

//   return {
//     plugins: [
//       new CopyPlugin(copies)
//     ]
//   };
// }

// function createHTML(dest) {
//   return {
//     plugins: [
//       new HtmlPlugin({
//         ngAppName: 'app',
//         title: 'Electron Angular Materialize',
//         template: (dest === 'build') ?
//           path.join(PATHS.src, 'index') :
//           path.join(PATHS.src, 'index'),
//         authors: ['Alex Gagnon', 'Jun Tang', 'Hai Tu', 'Daniel Wen']
//       })
//     ]
//   };
// }

// module.exports = validate(config);
