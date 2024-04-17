const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入webpack-merge
const { merge } = require("webpack-merge");
// 引入公共配置
const common = require("./webpack.common.js");
const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  //所使用的插件
  plugins: [
    //生成html文件
    new HtmlWebpackPlugin({
      //使用html模板的目录
      template: resolvePath("../public/index.html"),
      //自动引入打包后的文件，默认值true
      inject: true,
    }),
    //使用插件定义全局变量DEV
    new webpack.DefinePlugin({
      process: JSON.stringify({
        env: "development",
      }),
    }),
  ],
  module: {
    rules: [
      {
        test: /.(le|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  //开发服务器配置
  devServer: {
    static: {
      //目录
      directory: resolvePath("../dist"),
    },
    //压缩
    compress: true,
    //热更新
    hot: true,
    //是否自动打开浏览器
    // open: true,
    //端口号
    port: 8888,
  },
});
