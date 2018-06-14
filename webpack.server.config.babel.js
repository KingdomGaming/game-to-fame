import path from "path";
import webpack from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";

import { ENV, PLUGINS } from "./webpack.shared.babel";
import { PATHS } from "./shared/main";

// Enforce consistent entry point/output filenames
const ENTRY_JS_FILENAME = "main.js";
const OUTPUT_JS_FILENAME = "app.js";


export default {
    entry: path.join(PATHS.serverSource, ENTRY_JS_FILENAME),
    target: "node",
    mode: ENV.isProduction ? "production" : "development",
    devtool: ENV.isProduction ? null : "source-map",
    output: {
        path: PATHS.serverDist,
        filename: OUTPUT_JS_FILENAME,
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
    plugins: [
        new NodemonPlugin({
            watch: PATHS.serverDist,
            script: path.resolve(PATHS.serverDist, OUTPUT_JS_FILENAME)
        })
    ],
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