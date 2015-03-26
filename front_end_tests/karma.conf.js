// Karma configuration
// Generated on Wed Mar 11 2015 10:40:55 GMT+1100 (AUS Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/assets/vendor/jquery/dist/jquery.js',
        'public/assets/vendor/angular/angular.js',
        'public/assets/vendor/angular-animate/angular-animate.js',
        'public/assets/vendor/angular-bootstrap/ui-bootstrap.js',
        'public/assets/vendor/angular-local-storage/dist/angular-local-storage.js',
        'public/assets/vendor/angular-sanitize/angular-sanitize.js',
        'public/assets/vendor/angular-ui-router/release/angular-ui-router.js',
        'public/assets/vendor/angular-mocks/angular-mocks.js',
        'public/config.js',
        'public/application.js',
        'public/modules/core/core.module.js',
        'public/modules/test/test.module.js',
        'public/modules/wines/wines.module.js',
        'public/modules/cart/cart.module.js',
        'public/modules/account/account.module.js',
        'public/modules/**/*.js',
        'public/modules/**/**/*.js',
        'public/modules/**/views/*.html',
        'front_end_tests/unit/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
          'public/modules/**/views/*.html':['ng-html2js']
      },

      ngHtml2JsPreprocessor: {
          stripPrefix: 'public/',
          moduleName: 'my.templates'
      },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    plugins : [
        'karma-chrome-launcher',
        //'karma-firefox-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
