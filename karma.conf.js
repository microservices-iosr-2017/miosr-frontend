
const path = require('path');
const wpConf = require('./webpack.dconf');

/* to determine actual list of browsers on which frontend tests should be run intersection of this array and
 * autodetection results is taken. Currently avaliable:
 * - Chrome
 * - ChromeCanary
 * - Firefox
 * - Opera
 * - Safari (only Mac)
 * - PhantomJS
 * - IE (only Windows)
 * */
const envBF = process.env.BROWSER_FILTER;
const browserFilter = envBF ? eval(envBF) : ['Chrome', 'Firefox', 'Opera', 'Safari', 'PhantomJS', 'IE'];

module.exports = function(config) {
  config.set({
    detectBrowsers: {
      // enable/disable, default is true
      enabled: true,

      // enable/disable phantomjs support, default is true
      usePhantomJS: true,

      // post processing of browsers list
      // here you can edit the list of browsers used by karma
      postDetection: function(availableBrowser) {

        var result = [];

        // filter browsers according to browser filter
        browserFilter.forEach((b) => {
          if(availableBrowser.indexOf(b) > -1) {
            result.push(b);
          }
        });

        //Add IE Emulation
        if (availableBrowser.indexOf('IE')>-1) {
          result.push('IE9');
        }

        console.log("Browsers remaiming after applying filter: " + result.toString());

        return result;
      }
    },

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'detectBrowsers', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    webpack: wpConf.karma(),

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    // list of files / patterns to load in the browser
    files: [
      'src/node_modules/tests/client/**/*.jsx',
      'src/node_modules/tests/client/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    preprocessors: {
      'src/node_modules/tests/client/**/*.jsx': ['webpack', 'sourcemap'],
      'src/node_modules/tests/client/**/*.js': ['webpack', 'sourcemap']
    },

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['mocha'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
