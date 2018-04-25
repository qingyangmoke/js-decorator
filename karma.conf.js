// Karma configuration
module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'power-assert'],
    // list of files / patterns to load in the browser
    files: [
      // 'src/*.js',
      'tests/*.test.js',
    ],
    // list of files to exclude
    exclude: [],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/*.js': ['webpack', 'coverage'],
      'tests/*.test.js': ['webpack', 'coverage'],
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],
    // reporter options
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed',
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x',
      },
    },
    // optionally, configure the reporter
    // 新增--覆盖率测试
    coverageReporter: {
      type: 'lcov', // html
      dir: 'coverage/',
      subdir: '.',
      includeAllSources: true,
      // Would output the results into: .'/coverage/'
    },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // start these browsers , 'Firefox'
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    // customLaunchers: {
    //   Chrome: {
    //     base: 'ChromeHeadless',
    //     flags: ['--no-sandbox']
    //   }
    // },
    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-mocha',
      'karma-power-assert',
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
    ],
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: {
      // devtool: 'eval-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
          },
        ],
      },
    },
  });
};
