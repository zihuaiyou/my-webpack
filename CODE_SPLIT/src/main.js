import { sum } from './math'
// import count from './count'
console.log(sum(1, 2, 3));
console.log('main');

const btn = document.body.querySelector(".btn");
btn.addEventListener("click", () => {
    /**
     * 实现按需加载
     */
    import('./count') //import函数动态导入，将导入的文件分割成模块，然后自动加载
        .then(res => console.log(res,res.default(3,2)))
        .catch(err => console.log(err))
})

