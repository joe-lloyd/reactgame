import * as path from "path";
import webpack from "webpack";

/**
 * @description
 * webpack config that builds the game
 *
 * @type {*[]}
 */
module.exports = [
	{
		entry: {
			app: path.join(__dirname, "./src"),
			vendor: [
				"babel-polyfill"
			]
		},
		output: {
			path: path.join(__dirname, "/"),
			filename: "[name].js"
		},
		module: {
			loaders: [
				{
					loader: 'babel-loader'
				},
				{
					loader: "json-loader",
					test: /\.json$/
				}
			]
		},
		devtool: 'source-map',
		plugins: [
			new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
		]
	}
];
