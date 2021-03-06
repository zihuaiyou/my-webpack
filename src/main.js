import count from "./js/count";
import sum from "./js/sum";
import "./css/style.css"
import "./less/style.less"
import './sass/style1.sass'
import './sass/style2.scss'
import './css/iconfont.css'

console.log(count(8, 2));
console.log(sum(1, 2, 3, 4, 5));

// 对js实现HMR(以后react项目可以使用react-hot-loader来实现)
if (module.hot) {
    module.hot.accept('./js/count');
    module.hot.accept('./js/sum');
}

document.body.querySelector(".btn").onclick = () => {
    // import动态导入
    // /*webpackChunkName:'math' */ webpack魔法命名，对动态导入的文件的命名，在chunkFileName中为[name]的值
    import(/*webpackChunkName:'math' */ './js/math').then(({ mul }) => {
        console.log(mul(2, 3));
    })
}

new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, 1000);
})

// 注册serviceWorker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}