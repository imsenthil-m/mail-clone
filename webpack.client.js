const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const PROD = true;
const DEV = !PROD;

module.exports = {
  entry: "./client/src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },

  mode: PROD ? "production" : "development",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: "errors-only",
    proxy: {
      "/api": {
        target: "http://localhost:9001"
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ["@babel/preset-env",
          "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader,  "css-loader"]
      }
    ],
  },
  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(PROD ? "production" : "development")
    }),
    new HTMLWebpackPlugin({
      template: "./client/index.html"
    })
  ],
  mode: 'development'
};
