import path from "path";
import webpack from "webpack";

import { ENV, PLUGINS, FILENAMES } from "./webpack.shared.babel";
import { PATHS } from "./shared/main";

let clientPlugins = PLUGINS;


export default {
	entry: path.join(PATHS.clientSource, FILENAMES.js.entry),
	target: "web",
	mode: ENV.isProduction ? "production" : "development",
    devtool: ENV.isProduction ? null : "source-map",
    output: {
		path: PATHS.clientDist,
        filename: `${FILENAMES.js.output}.bundle.js`,
        publicPath: "/"
    },
    plugins: clientPlugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}