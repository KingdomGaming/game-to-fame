import path from "path";
import webpack from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";

import { ENV, PLUGINS, FILENAMES } from "./webpack.shared.babel";
import { PATHS } from "./shared/main";

let serverPlugins = PLUGINS;

if (!ENV.isProduction) {
    serverPlugins.push(new NodemonPlugin({
        watch: PATHS.serverDist,
        script: path.resolve(PATHS.serverDist, `${FILENAMES.js.output}.bundle.js`)
    }));
}


export default {
    entry: path.join(PATHS.serverSource, FILENAMES.js.entry),
    target: "node",
    mode: ENV.isProduction ? "production" : "development",
    devtool: ENV.isProduction ? null : "source-map",
    output: {
        path: PATHS.serverDist,
        filename: `${FILENAMES.js.output}.bundle.js`,
        libraryTarget: "commonjs",
        publicPath: "/"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [
        /^(?!\.|\/|[A-Z]\:).+/i, // Assume anything not relatively/absolutely pathed is external
    ],
    plugins: serverPlugins,
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