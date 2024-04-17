const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //用来清除上一次打包的文件目录的插件
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //打包分析工具
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将css提取成单独的文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //压缩css文件
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  //用于提高性能，可以进行代码分割，
  optimization: {
    //告知webpack使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle。
    minimize: true,
    //分割模块
    splitChunks: {
      chunks: "all",
    },
    //允许你通过提供一个或多个定制过的 TerserPlugin 实例， 覆盖默认压缩工具(minimizer)。
    minimizer: [new CssMinimizerPlugin()],
  },
  //所使用的插件
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      //输出的目录
      filename: "css/[hash].css",
    }),
    //使用插件定义全局变量DEV
    new webpack.DefinePlugin({
      process: JSON.stringify({
        env: "production",
      }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
});
