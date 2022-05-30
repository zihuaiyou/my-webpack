// eslint配置文件
module.exports = {
    // 继承其他规则
    extends: ['eslint:recommended'],
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    // 解析选项
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    // 具体检查选项
    rules: {
        'no-var': 'error'//不能使用var声明变量
    }
}