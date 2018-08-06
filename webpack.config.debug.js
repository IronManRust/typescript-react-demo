const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    "entry": [
        "babel-polyfill",
        "./src/index.tsx"
    ],
    "output": {
        "path": path.resolve(__dirname, "dist"),
        "filename": "bundle.js",
        "publicPath": "/"
    },
    "plugins": [
        new CleanWebpackPlugin(["dist"], {
            "verbose": true
        }),
        new webpack.EnvironmentPlugin(["NODE_ENV"])
    ],
    "resolve": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".d.ts", ".json"]
    },
    "externals": {
        "cheerio": "window",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
    },
    "mode": "development",
    "module": {
        "rules": [
            {
                "test": /\.ts$|\.tsx$/,
                "exclude": "/node_modules/",
                "loader": "babel-loader!ts-loader"
            },
            {
                "test": /\.js$|\.jsx$/,
                "exclude": "/node_modules/",
                "loader": "babel-loader"
            },
            {
                "test": /\.css$/,
                "loaders": [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                "test": /\.scss$/,
                "loaders": [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                "test": /\.jpg$|\.png$/,
                "loader": "file-loader?name=images/[name].[ext]"
            },
            {
                "test": /\.html$|\.ico$|\.config|\.txt$/,
                "loader": "file-loader?name=[name].[ext]"
            },
            {
                "test": /\.(eot|otf|woff|woff2|ttf|svg)$/,
                "loader": "url-loader?limit=100000"
            }
        ]
    }
};
