// babel配置
module.exports = {
    // 智能预设无法解决Promise,以及ES6+语法
    presets:[
        ["@babel/preset-env",
        {
            "useBuiltIns":'usage',
            'corejs':"3.22.8"
        }]
    ]
}