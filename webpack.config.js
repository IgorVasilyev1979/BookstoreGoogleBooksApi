const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Google book's API shop",
            template: './src/index.html'
          }),
        new MiniCssExtractPlugin(),
        new TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()]
    },
    module: {
        rules: [
          { test: /\.css$/,
           use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true
                }
            }, 'css-loader'] }
        ]
      }
}