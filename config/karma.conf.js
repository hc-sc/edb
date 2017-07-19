const {join} = require('path');
const webpackConfig = require('./webpack.test.js');
const {TEST_PATH} = require('.');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine', 'phantomjs-shim'],
    reporters: ['mocha', 'junit', 'coverage'],
    files: ['./test-files.js'],
    preprocessors: {
      './test-files.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    coverageReporter: {
      dir: join(TEST_PATH, 'reports'),
      reporters: [
        {type: 'lcov', subdir: 'coverage'},
        {type: 'text-summary'}
      ]
    },
    junitReporter: {
      outputDir: join(TEST_PATH, 'reports', 'junit'),
      outputFile: 'test-results.xml',
      useBrowserName: false
    }
  });
};
