const path = require('path')
// 使用插件需要引用
//webpack5 使用插件处理eslint(webpack4使用loader)
const EslintWebpackPlugin = require('eslint-webpack-plugin');//检查代码格式
const HtmlWebpackPlugin = require('html-webpack-plugin');//使html自动引入打包好的js文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//使html通过link标签的形式引入单独的css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');//压缩css
const os = require('os');
const terserWebpackPlugin = require('terser-webpack-plugin'); //Terser webpack 内置的压缩生产模式js代码段的工具
const imageMinimzerPlugin = require('image-minimizer-webpack-plugin');//压缩图片

const threads = os.cpus().length; //获取cpu线程数
// const PreloadWebpackPlugin  = require("preload-webpack-plugin"); 
/**
 * PWA应用借助Service Workers 技术可以离线运行，
 * 引入workbox-webpack-plugin为web app提供离线支持
 */
const WorkboxPlugin = require('workbox-webpack-plugin');

/**
 * 封装一个合并处理样式的loader的函数
 */
function getstyleLoader(pre) {
    return [ //使用loader, 需要按顺序（从下往上执行）
        // use 可以使用多个loader
        // 'style-loader', //将js中的css以style标签的形式添加到html中
        MiniCssExtractPlugin.loader, //不再使用style-loader
        'css-loader', //将css资源编译呈commonjs模块形式添加到js中
        {
            loader: 'postcss-loader', //处理css兼容性问题
            options: { //配置postcss-loader
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env'//postcss只能预设，能解决绝大多数的兼容性问题
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}
module.exports = {
    // 入口文件
    entry: "./src/main.js", //相对目录
    // 输出
    output: {
        // 输出文件目录
        // 生产模式需要输出打包文件
        path: path.resolve(__dirname, "../dist"), //绝对目录(所有文件)
        // 输出文件名
        // 配置contenthash，文件内容变化，hash值就变化，方便浏览器判断是否走缓存
        filename: "static/js/[name].[contenthash:8].js", //js入口文件打包输出的文件名
        chunkFilename: 'static/js/[name].chunk.[contenthash:8].js', //对webpack动态导入的文件重命名，[name]的值为 webpackChunkName的值
        assetModuleFilename: "static/media/[hash:5][ext][query]", //对type:asset形式处理的图片、字体等文件的统一命名方式
        // 自动清空上次打包的文件
        clean: true
    },
    // 配置loader
    module: {
        // 配置规则
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,  //检测以css结尾的文件(正则)
                        //loader:"xxx" 只能使用一个loader
                        use: getstyleLoader()
                    },
                    {
                        test: /\.less$/,  //检测以less结尾的文件(正则)
                        use: getstyleLoader('less-loader')
                    },
                    {
                        test: /\.s[ac]ss$/,  //检测以sass或scss结尾的文件(正则)
                        use: getstyleLoader('sass-loader')
                    },
                    {
                        // webpack4使用fileloader和urlloader处理图片
                        // webpack 内置了处理图片的loader，(可以将小体积的图片转为base64)
                        // base64:优点：减少网络请求； 缺点：会增加图片的体积
                        test: /\.(png|jpe?g|webp|gif)$/,  //检测以图片扩展名结尾的文件(正则)
                        type: 'asset',  //使低于指定大小的图片转化为base64格式
                        // generator: {
                        //     // 控制图片资源生成路径
                        //     // [hash:8] 文件名取hash值，取前8位
                        //     // [ext]取文件之前的扩展名
                        //     // [query]取之前的查询参数
                        //     filename: "static/imgs/[hash:5][ext][query]"
                        // }
                    },
                    {
                        // webpack4使用fileloader和urlloader处理图片
                        // webpack 内置了处理图片的loader，(可以将小体积的图片转为base64)
                        // base64:优点：减少网络请求； 缺点：会增加图片的体积
                        test: /\.(ttf|woff2?)$/,
                        type: 'asset/resource', //原样打包(处理字体图标、音视频文件等其他资源)
                        // generator: {
                        //     filename: "static/media/[hash:5][ext][query]"
                        // }
                    },
                    {
                        // babel 使用loader
                        test: /\.js$/,
                        exclude: /node_modules/, //不处理node_modules文件
                        use: [
                            {
                                loader: "thread-loader", //开启多线程打包
                                options: {
                                    workers: threads,//线程数
                                }
                            },
                            {
                                loader: 'babel-loader',
                                /**
                                 * babel配置可以直接在下面写，也可以在外部文件写
                                 */
                                options: {
                                    //     // 使用babel插件
                                    //     presets:["@babel/preset-env"] //允许使用最近的js
                                    cacheDirectory: true, //开启缓存模式
                                    cacheCompression: false, //关闭缓存压缩
                                    /**
                                     * babel会对文件添加辅助代码，使用@babel/plugin-transform-runtime可以使辅助代码
                                     * 从@babel/plugin-transform-runtime中引入
                                     */
                                    plugins: ['@babel/plugin-transform-runtime']
                                }
                            }
                        ]

                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // 插件是构造函数，需要new
        new EslintWebpackPlugin({
            // 指定检查文件的目录
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'), //缓存地址
            threads,//开启多线程打包并指定线程数
        }),
        new HtmlWebpackPlugin({
            // 创建以public/index.html为模板的html文件
            //创建的html结构与模板一致，并且会自动引入打包好的js文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin(
            {
                // 指定css文件输出目录
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].chunk.[contenthash:8].css'
            }
        ),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
        // new PreloadWebpackPlugin({
        //     // preload和prefetch兼容性较差，请谨慎使用
        //     // rel: 'preload', //preload 让浏览器立即加载所需资源
        //     // as: 'script',
        //     rel:'prefetch' //prefetch 让浏览器空闲时加载所需资源
        // })
    ],
    // 配置开发服务器（打包命令为npx webpack serve）
    // 开发服务器不会输出资源文件(dist)，代码在内存中编译打包
    /**
     * 生产模式无需配置开发服务器
     */
    // devServer: {
    //     host: 'localhost',
    //     port: '3000',
    //     open: true
    // },
    optimization: {
        minimize: true,
        // 可以将压缩文件写入到optimization.minimizer中
        minimizer: [
            new CssMinimizerPlugin(),
            new terserWebpackPlugin({ //生产模式默认开启terserWebpackPlugin
                parallel: threads //Terser开启多线程
            }),
            new imageMinimzerPlugin({ //压缩图片 无损压缩
                minimizer: {
                    implementation: imageMinimzerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            })
        ],
        splitChunks: {
            //提取重复代码，将引入的代码分割成独立的文件，需要时在导入
            chunks: "all"
        },
        // 在入口文件中提取runtime至独立的runtime文件，避免打包后输出文件因动态导入文件变化而变化
        runtimeChunk: {
            name: (entryPoint) => `runtime~${entryPoint.name}.js`
        }
    },

    // 模式
    mode: "production",//生产模式默认开启压缩html和js
    devtool: 'source-map'
}