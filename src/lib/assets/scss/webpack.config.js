const path = require('path');
// @ts-ignore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					// 将 CSS 转化成 CommonJS 模块
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					// 将 CSS 转化成 CommonJS 模块
					'postcss-loader',
					// 将 Sass 编译成 CSS
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'beer.css',
		}),
	],
	devServer: {
		contentBase: './',
		host: '0.0.0.0',
		compress: true,
		port: 9000,
		open: false,
		writeToDisk: true,
		stats: 'errors-only',
	},
};
