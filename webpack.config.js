const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  mode: "development",
  watch: true,
  entry: ["babel-polyfill", "./src/index.tsx"],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
      // { test: /\.tsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      // { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.tsx?$/, loaders: ['ts-loader', 'babel-loader'], exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      filename: './200.html',
    }),
  ],
  devServer: {
    // hot: true,
    // historyApiFallback: true,
  },
};

module.exports = config;
