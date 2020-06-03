## 基础

### webpack 是什么

webpack 可以分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其打包为合适的格式以供浏览器使用

### webpack 学习路线

### webpack 基础用法，概念

#### entry

entry 用来配置入口文件的地址，支持三种写法

1.字符串

```
entry: path.resolve(__dirname, "src/index.js")
```

打包后生成 main.js 2.对象

```
entry: {
    main: path.resolve(__dirname, "src/index.js"),
    index: path.resolve(__dirname, "src/main.js"),
  }
```

打包后生成 main.js，index.js

3.数组

```
entry: [
    path.resolve(__dirname, "src/index.js"),
    path.resolve(__dirname, "src/main.js"),
  ]
```

打包后生成 main.js
不指定名称默认 main.js，其中数组写法等价对象 key-value

#### output

output 用来配置出口文件的地址

```
output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
```

#### mode

mode 支持三种种模式：分别是 production，development，none

#### status

status 用来控制输出框显示类型

#### optimization

#### performance

#### resolve

#### module

import，require，define ，css/sass/less 文件中的 @import==引过来的

#### 文件指纹

##### 1.hash

hash 是以项目为入口生成的，每次编译都会重新生成

##### 2.chunckhash

chunckhash 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值

##### 3.contenthash

contenthash 主要是为了应对 js 引入 css 文件，js 改变 css 的 hash 也跟着改变这种情况的，contenthash 可以在 js 中引入 css,只改变 js 的时候不改变 css 的 hash

#### sourcemap

sourcemap 是为了解决运行浏览器运行时帮助我们 debug 到原始开发代码
[devtool](https://www.webpackjs.com/configuration/devtool/#devtool)

#### devServer

#### plugin

- 常用 plugin
  copy-webpack-plugin
  clean-webpack-plugin
  webpack-bundle-analyzer

#### loader

##### 1.loader 是干什么的

loader 是转换器，可以要把不同的文件都转成浏览器认识的 js,css==

##### 2.loader 用法

- loader

```
rules: [
            {
                test: /\.css/,
                loader:['style-loader','css-loader']
            }
        ]
```

- use

```
rules: [
            {
                test: /\.css/,
                use:['style-loader','css-loader']
            }
        ]
```

- use+loader

```
rules: [
            {
                test: /\.css/,
                include: path.resolve(__dirname,'src'),
                use: [{
                    loader: 'style-loader',
                    options: {
                        insert:'top'
                    }
                },'css-loader']
            }
        ]
```

### webpack 优化
