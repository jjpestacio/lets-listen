var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

// Paths
var paths = {
	build: path.resolve('build'),
	src: path.resolve('client/src'),
	nodeModules: path.resolve('node_modules'),
}

module.exports = {
	devtool: 'source-map',
	entry: paths.src,
	output: {
		path: paths.build,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [
						'babel-preset-es2015', 
						'babel-preset-es2016', 
						'babel-preset-react'
					],
					plugins: [
					    'babel-plugin-transform-class-properties',
					    'babel-plugin-transform-object-rest-spread',
					    'babel-plugin-transform-decorators-legacy'
					]
				},
				exclude: paths.nodeModules
			},
			{
				test: /\.css$/,
				include: paths.src,
				loader: 'style!css!postcss',
				exclude: paths.nodeModules
			}
		],
		postcss: function() {
			return [autoprefixer];
		}
	}

}