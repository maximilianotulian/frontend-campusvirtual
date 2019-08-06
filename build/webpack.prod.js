const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');

let cleanOptions = {
    verbose: true,
    allowExternal: true
};
let pathsToClean = [path.resolve(__dirname, '../dist')];

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
});
