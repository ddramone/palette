const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {

    entry: {
        main: path.resolve(__dirname, 'src', 'main.js')
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
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },

            {
                test: /\.png$/,
                loader: 'url-loader'
            }


        ]
    },

    plugins: [

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