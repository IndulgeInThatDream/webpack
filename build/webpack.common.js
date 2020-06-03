const path = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"), //压缩css
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"), //copy
  { CleanWebpackPlugin } = require("clean-webpack-plugin"), //清除
  isProd = process.env.NODE_ENV === "production";
module.exports = {
  // entry: {main:path.join(__dirname, "../src/main.js"),index:path.join(__dirname, "../src/index.js")},
  entry: path.join(__dirname, "../src/main.js"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: isProd ? "js/[name].[chunkhash].js" : "js/[name].js",
    publicPath: "/",
  },
  //控制台输出[地址](https://webpack.docschina.org/configuration/stats/)
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  performance: {
    // false | "error" | "warning"
    hints: "warning",
    // 根据入口起点的最大体积，控制webpack何时生成性能*提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大5m
    maxAssetSize: 1024 * 1024 * 5,
  },
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve(__dirname, "../src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? "css/[name].[contenthash].css" : "css/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../src/static"),
          to: path.join(__dirname, "../dist/static"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "My webpack",
      template: path.join(__dirname, "../src/index.html"),
    }),
  ],
  module: {
    //loader执行顺序优先级pre > normal > inline > post
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
          "less-loader",
        ],
        include: path.join(__dirname, "../src"),
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: "url-loader", //包含fileloader
            options: {
              limit: 10 * 1024,
              name: "assets/[name].[ext]",
            },
          },
        ],
        include: path.join(__dirname, "../src"),
        exclude: /node_modules/,
        // enforce: pre, 同样配置的url-loader先执行
      },
      {
        test: /\.(woff|ttf|eot|svg|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            //如果要加载的图片大小小于10K的话，就把这张图片转成base64编码内嵌到html网页中去
            limit: 10 * 1024,
          },
        },
      },
      // {
      //   test: /\.(png|svg)$/,
      //   use: {
      //     loader: "image-webpack-loader",
      //   },
      //   enforce: "pre", // 提高了 img-webpack-loader 的优先级
      // },
      {
        test: /\.js$/, //babel-loader=>@babel/core=>@babel/preset-env=>插件预设没有的需加新的=>
        //babel 在每个文件都插入了辅助代码，使代码体积过大,默认情况下会被添加到每一个需要它的文件中。你可以引入 @babel/runtime 作为一个独立模块，来避免重复引入,@babel/plugin-transform-runtime 是开发时引入, @babel/runtime 是运行时引用
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: true,
                },
              ],
            ],
          },
        },
        include: path.join(__dirname, "../src"),
        exclude: /node_modules/,
      },
    ],
  },
};
