const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: './dist',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.vue', '.js', '.json'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'assets': path.resolve(__dirname, '../src/assets'),
            'app': path.resolve(__dirname, '../src/app'),
            'config': path.resolve(__dirname, '../src/config'),
            'components': path.resolve(__dirname, '../src/components'),
            'components-app': path.resolve(__dirname, '../src/components-app'),
            'constants': path.resolve(__dirname, '../src/constants'),
            'directives': path.resolve(__dirname, '../src/directives'),
            'lib-core': path.resolve(__dirname, '../src/lib-core'),
            'lib-vuex': path.resolve(__dirname, '../src/lib-vuex'),
            'demo': path.resolve(__dirname, '../src/demo'),
            'src': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    },
    vue: {
        loaders: {js: 'babel-loader'},
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: 'static'
            }
        ]),
    ]
};
