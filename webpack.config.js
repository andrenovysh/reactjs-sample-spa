var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './js/app.jsx',
	output: {
		path: path.resolve(__dirname, "/build/js"),
		filename: 'bundle.js'
	},
	plugins: [new HtmlWebpackPlugin({
		template: './index.html',
        inject: true
	})],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react'],
				plugins: ["transform-object-rest-spread"]
			}
		}]
	}
}