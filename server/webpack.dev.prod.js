var path = require('path')

const PreloadWebpackPlugin = require('preload-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')

module.exports = {
	entry: './client/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../public/javascripts/')
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./'),
			path.resolve('./node_modules'),
		]
	},

	module: {
		loaders: [
			{
				test: /\.css$/, use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					publicPath: '../'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				}
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.scss/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/,
				use: 'file-loader'
			},
		]
	},
	plugins: [

        
	]
}
