const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: "./src/main.js", //单入口文件的写法
    entry:{
        // 多入口文件的写法
        main: './src/main.js',
        app:'./src/app.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"js/[name].js", //[name]，webpack的写法，将打包的文件名作为输出的文件名
        clean:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"./public/index.html")
        })
    ],
    mode:'production'
}