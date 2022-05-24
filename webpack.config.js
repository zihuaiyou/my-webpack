const path = require('path')
module.exports = {
    // 入口文件
    entry: "./src/main.js", //相对目录
    // 输出
    output: {
        // 输出文件目录
        path: path.resolve(__dirname, "dist"), //绝对目录
        // 输出文件名
        filename: "main.js"
    },
    // 配置loader
    module: {
        // 配置规则
        rules: [
            {
                test: /\.css$/,  //检测以css结尾的文件(正则)
                use: [ //使用loader, 需要按顺序（从下往上执行）
                    'style-loader', //将js中的css以style标签的形式添加到html中
                    'css-loader', //将css资源编译呈commonjs模块形式添加到js中
                ]
            },
            {
                test: /\.less$/,  //检测以less结尾的文件(正则)
                use: [ //使用loader, 需要按顺序（从下往上执行）
                    'style-loader', //将js中的css以style标签的形式添加到html中
                    'css-loader', //将css资源编译呈commonjs模块形式添加到js中
                    'less-loader'//将less编译成css文件
                ]
            }
        ]
    },
    // 插件
    plugins: [],
    // 模式
    mode: "development"
}