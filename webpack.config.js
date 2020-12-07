const merge = require('webpack-merge');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use:[MiniCssExtractPlugin.loader,"css-loader", "postcss-loader",'sass-loader',]
                
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:5].css'
        })
    ],
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://3.19.228.58:8080'
        })
    }
};

module.exports = merge(commonConfig, publicConfig);