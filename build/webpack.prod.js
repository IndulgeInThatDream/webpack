const merge = require("webpack-merge"),
  common = require("./webpack.common.js"),
  OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"), //压缩css
  SpeedMeasurePlugin = require("speed-measure-webpack-plugin"), //耗时分析
  { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"), //包分析
  CompressionPlugin = require("compression-webpack-plugin"), //gzip
  TerserPlugin = require("terser-webpack-plugin"); //压缩

(smp = new SpeedMeasurePlugin()), (buildEnv = process.env.NODE_ENV);
optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        name: "vendor",
        chunks: "all",
        minChunks: 1,
        minSize: 0,
        priority: 8,
      },
      common: {
        name: "common",
        minChunks: 2,
        chunks: "all",
        maxInitialRequests: 5,
        minSize: 0,
        priority: 6,
      },
    },
  },
  runtimeChunk: {
    name: "manifest",
  },
};
prodConfig = {
  mode: "production",
  devtool: "none",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
    ...optimization,
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin(),
    buildEnv === "bundle" ? new BundleAnalyzerPlugin() : null,
    buildEnv === "gzip"
      ? new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css/,
          deleteOriginalAssets: true,
        })
      : null,
  ].filter((v) => v !== null),
};

// 以前DllPlugin现在hardsourcemap
module.exports =
  buildEnv === "bundle"
    ? merge(prodConfig, common)
    : smp.wrap(merge(prodConfig, common));
