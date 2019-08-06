var webpackConfig = require('../build/webpack.config');
var testFilesPath = '../src/**/*-test.js';

delete webpackConfig.entry;

module.exports = function (config) {
    config.set({
        browsers: [ 'PhantomJS' ],
        autoWatch: false,
        singleRun: true,
        frameworks: [ 'mocha', 'chai', 'sinon', 'chai-sinon' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        files: [
            testFilesPath
        ],
        preprocessors: {
            [testFilesPath]: [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'mocha' ],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        plugins: [
            'karma-mocha',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-sinon',
            'karma-chai-sinon'
        ]
    });
}
