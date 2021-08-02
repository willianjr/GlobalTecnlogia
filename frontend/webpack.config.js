const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: "./src/index.tsx",
    output: {
			path: path.join(__dirname, "public"),
			filename: "index.bundle.js",
			publicPath: "/"
		},
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
				alias:{
					modules:path.resolve(__dirname, 'node_modules'),
					styles:path.resolve(__dirname,'src', 'common', 'styles'),
					jquery: 'modules/admin-lte/plugins/jquery/jquery.min.js',
					bootstrap: 'modules/bootstrap/dist/js/bootstrap.min.js',
				}
    },
    devServer: {
            port:8081,
            contentBase: path.join(__dirname, "public") },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(woff|woff2|ttf|eot|jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
				new MiniCssExtractPlugin({
					filename: 'index.bundle.css'
				}),
				new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery',
					'window.jQuery': 'jquery'
				}),
    ],
}
