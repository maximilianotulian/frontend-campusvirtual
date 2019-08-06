const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    debug: true,
    devtool: 'inline-source-map',
    devServer: {
        inline: true
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false)
        })
    ]
});
