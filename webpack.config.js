const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const returnCss = () => {
	if (isProd) {
		return new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		});
	} else {
		return new MiniCssExtractPlugin({
			filename: 'bundle.css'
		});
	}
};

module.exports = {
	context: path.resolve(__dirname, 'task_1.5/src'),
	mode: 'development',
	entry: './index.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'task_1.5/dist'),
		assetModuleFilename: 'img/[name][ext][query]',
		clean: true
	},
	devServer: {
		port: '4200'
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './about-us.html',
			filename: 'about-us.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './contact-page.html',
			filename: 'contact-page.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		returnCss()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext][query]'
				}
			}
		]
	}
};
