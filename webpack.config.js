const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {

    entry: {
        main: path.resolve(__dirname, 'src', 'main.js')
        // vendor: path.resolve(__dirname, 'src', 'vendor.js')
    },


    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },


    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /\.spec\.js/],
                use: 'babel-loader'
            },

            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },

    plugins: [

        // new webpack.optimize.CommonsChunkPlugin({
        // name: ['app', 'vendor']
        // }),

        new HtmlWebpackPlugin({
            inject: 'head',
            template: path.resolve(__dirname, 'src/index.html')
        })

    ],


    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 4100
    }
};

module.exports = config;