const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const workbox = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/js/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production' || process.env.NODE_ENV)
        }),
        new workbox.GenerateSW()
    ]
}
