const path = require("path"),
  merge = require("webpack-merge"),
  common = require("./webpack.common.js"),
  { HotModuleReplacementPlugin } = require("webpack"), //热更新
  HardSourceWebpackPlugin = require("hard-source-webpack-plugin"), //构建速度
  devConfig = {
    mode: "development",
    devtool: "inline-source-map", //sourcemap [下载地址](https://developers.google.com/closure/compiler#how-do-i-start)
    devServer: {
      contentBase: path.join(__dirname, "../dist"),
      host: "localhost",
      compress: true,
      port: 1234,
      hot: true,
    },
    plugins: [new HotModuleReplacementPlugin(), new HardSourceWebpackPlugin()],
  };
module.exports = merge(devConfig, common);
