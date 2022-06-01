import count from "./js/count";
import sum from "./js/sum";
import "./css/style.css"
import "./less/style.less"
import './sass/style1.sass'
import './sass/style2.scss'
import './css/iconfont.css'

console.log(count(8, 2));
console.log(sum(1, 2, 3, 4,5));

// 对js实现HMR(以后react项目可以使用react-hot-loader来实现)
if (module.hot) {
    module.hot.accept('./js/count');
    module.hot.accept('./js/sum');
}