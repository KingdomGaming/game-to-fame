import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { ENV, PLUGINS, FILENAMES } from "./webpack.shared.babel";
import { PATHS } from "./shared/main";

let clientPlugins = PLUGINS;
clientPlugins.push(new MiniCssExtractPlugin({
    filename: `../css/${FILENAMES.styles.output}.css`, // Seems unideal...
}));



export default {
	entry: path.join(PATHS.clientSource, FILENAMES.js.entry),
	target: "web",
	mode: ENV.isProduction ? "production" : "development",
    devtool: ENV.isProduction ? null : "source-map",
    output: {
		path: PATHS.clientDist,
        filename: `${FILENAMES.js.output}.bundle.js`,
        publicPath: "/public/"
    },
    plugins: clientPlugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: "inline",
                            plugins: () => [
                                autoprefixer()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
}