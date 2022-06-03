const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: "./src/main.js", //单入口文件的写法
    entry: {
        // 多入口文件的写法
        main: './src/main.js',
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name].js", //[name]，webpack的写法，将打包的文件名作为输出的文件名
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        })
    ],
    optimization: {//优化代码的选项
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 以下是默认值
            // minSize: 20000, // 分割代码最小的大小
            // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
            // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
            // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
            // maxInitialRequests: 30, // 入口js文件最大并行请求数量
            // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
            // cacheGroups: { // 组，哪些模块要打包到一个组
            //   defaultVendors: { // 组名
            //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //     priority: -10, // 权重（越大越高）
            //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            //   },
            //   default: { // 其他没有写的配置会使用上面的默认值
            //     minChunks: 2, // 这里的minChunks权重更大
            //     priority: -20,
            //     reuseExistingChunk: true,
            //   },
            // }, 
            /**
             * 修改默认配置（因为多入口引入的文件大小太小而不会单独打包）
             */
            cacheGroups: {
                default: {
                    minSize: 0, //将最小文件大小修改为0
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        },
    },
    mode: 'production'
}