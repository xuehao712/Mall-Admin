const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            exclude:path.resolve(__dirname, '../src/icons'),
            options: {
                limit:500, 
                name: 'images/[name]_[hash:7].[ext]',
                esModule: false
            }
        },
        {
            test: /\.svg$/,
            loader: "svg-sprite-loader",
            include: path.resolve(__dirname, "../src/icons"),
            options: {
              symbolId: "icon-[name]" 
            }
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })
    ],
    
    optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        }
    },
    resolve: {
        alias: {
            views: path.join(__dirname, 'src/views'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            utils: path.join(__dirname, 'src/utils'),
            services: path.join(__dirname, 'src/services'),
            assets: path.join(__dirname, 'src/assets'),
            views: path.join(__dirname, 'src/views'),
            styles: path.join(__dirname, 'src/styles'),
            icons: path.join(__dirname, 'src/icons')
        }
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8080'
        })
    }
};

module.exports = commonConfig;