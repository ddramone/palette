module.exports = function (config) {

    var configuration = {

        basePath: '',


        frameworks: ['jasmine'],

        files: [{ pattern: 'spec.bundle.js', watched: false }],

        exclude: [],

        preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js/, exclude: [/node_modules/], loader: 'babel-loader' },
                    { test: /\.html/, loader: 'raw-loader' },
                    { test: /\.(css|scss)$/, loader: 'empty-loader' }
                ]
            }
        },

        webpackServer: {
            noInfo: true // prevent console spamming when running in Karma!
        },


        reporters: ['mocha'],


        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        // autoWatch: true,

        browsers: ['Chrome'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
        // configuration.reporters = configuration.reporters.concat(['coverage', 'coveralls']);
        // configuration.coverageReporter = {
        //   type : 'lcovonly',
        //   dir : 'coverage/'
        // };
    }

    config.set(configuration);

};