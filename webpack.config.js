const path = require('path')
module.exports = {
    // 入口文件
    entry:"./src/main.js", //相对目录
    // 输出
    output:{
        // 输出文件目录
        path:path.resolve(__dirname,"dist"), //绝对目录
        // 输出文件名
        filename:"main.js"
    },
    // 配置loader
    module:{
        // 配置规则
        rules:[]
    },
    // 插件
    plugins:[],
    // 模式
    mode:"development"
}