import path from "path";
import webpack from "webpack";

import { PATHS, PLUGINS } from "./shared";

// Enforce consistent entry point/output filenames
const ENTRY_JS_FILENAME = "main.js";
const OUTPUT_JS_FILENAME = "app.js";


export default {
    entry: path.resolve(PATHS.serverSource, ENTRY_JS_FILENAME),
    target: "node",
    output: {
        path: path.resolve(PATHS.serverDist),
        filename: OUTPUT_JS_FILENAME
    },
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [
        /^(?!\.|\/).+/i
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "transform-async-to-generator",
                            "transform-class-properties",
                            "transform-exponentiation-operator",
                            "transform-object-rest-spread"
                        ]
                    }
                }
            }
        ]
    }
}