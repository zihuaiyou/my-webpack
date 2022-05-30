const path = require('path')
// 使用插件需要引用
//webpack5 使用插件处理eslint(webpack4使用loader)
const EslintWebpackPlugin = require('eslint-webpack-plugin');
module.exports = {
    // 入口文件
    entry: "./src/main.js", //相对目录
    // 输出
    output: {
        // 输出文件目录
        path: path.resolve(__dirname, "dist"), //绝对目录(所有文件)
        // 输出文件名
        filename: "static/main.js", //js入口文件的目录
        // 自动清空上次打包的文件
        clean: true
    },
    // 配置loader
    module: {
        // 配置规则
        rules: [
            {
                test: /\.css$/,  //检测以css结尾的文件(正则)
                //loader:"xxx" 只能使用一个loader
                use: [ //使用loader, 需要按顺序（从下往上执行）
                    // use 可以使用多个loader
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
            },
            {
                test: /\.s[ac]ss$/,  //检测以sass或scss结尾的文件(正则)
                use: [ //使用loader, 需要按顺序（从下往上执行）
                    'style-loader', //将js中的css以style标签的形式添加到html中
                    'css-loader', //将css资源编译呈commonjs模块形式添加到js中
                    'sass-loader'//将sass或scss编译成css文件
                ]
            },
            {
                // webpack4使用fileloader和urlloader处理图片
                // webpack 内置了处理图片的loader，(可以将小体积的图片转为base64)
                // base64:优点：减少网络请求； 缺点：会增加图片的体积
                test: /\.(png|jpe?g|webp|gif)$/,  //检测以图片扩展名结尾的文件(正则)
                type: 'asset',  //使低于指定大小的图片转化为base64格式
                generator: {
                    // 控制图片资源生成路径
                    // [hash:8] 文件名取hash值，取前8位
                    // [ext]取文件之前的扩展名
                    // [query]取之前的查询参数
                    filename: "static/imgs/[hash:5][ext][query]"
                }
            },
            {
                // webpack4使用fileloader和urlloader处理图片
                // webpack 内置了处理图片的loader，(可以将小体积的图片转为base64)
                // base64:优点：减少网络请求； 缺点：会增加图片的体积
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource', //原样打包(处理字体图标、音视频文件等其他资源)
                generator: {
                    filename: "static/media/[hash:5][ext][query]"
                }
            },
            {
                // babel 使用loader
                test:/\.js$/,
                exclude:/node_modules/, //不处理node_modules文件
                loader:'babel-loader',
                /**
                 * babel配置可以直接在下面写，也可以在外部文件写
                 */
                // options:{
                //     // 使用babel插件
                //     presets:["@babel/preset-env"] //允许使用最近的js
                // }
            }
        ]
    },
    // 插件
    plugins: [
        // 插件是构造函数，需要new
        new EslintWebpackPlugin({
            // 指定检查文件的目录
            context:path.resolve(__dirname,'src')
        })
    ],
    // 模式
    mode: "development"
}