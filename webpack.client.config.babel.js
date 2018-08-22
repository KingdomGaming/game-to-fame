import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { ENV, PLUGINS, FILENAMES } from "./webpack.shared.babel";
import { PATHS } from "./shared/main";

let clientPlugins = PLUGINS;
clientPlugins.push(
    new MiniCssExtractPlugin({
        filename: `css/${FILENAMES.styles.output}.css`, // Seems unideal...
    }),
    new CleanWebpackPlugin([PATHS.publicRoot], {
        "exclude" : ["assets"]
    }), // FUTURE: exclude vendor js when generated
    new HtmlWebpackPlugin({
        template: `${PATHS.clientHtml}/index.html`,
        filename: `${PATHS.publicRoot}/index.html`,
        hash: true,
        cache: false
    })
);



export default {
	entry: path.join(PATHS.clientSource, FILENAMES.js.entry),
	target: "web",
	mode: ENV.isProduction ? "production" : "development",
    devtool: ENV.isProduction ? null : "source-map",
    output: {
		path: PATHS.publicRoot,
        filename: `js/${FILENAMES.js.output}.bundle.js`,
        publicPath: "/"
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