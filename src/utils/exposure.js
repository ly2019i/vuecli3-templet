// polyfill
import "intersection-observer";
// 自行封装数据上报方法,其实就是网络请求
import { DotData } from "./dotData";

// 可以把节流的时间调大一点，默认是100ms
IntersectionObserver.prototype["THROTTLE_TIMEOUT"] = 300;

export default class Exposure {
  constructor() {
    // 当前收集的  尚未上报的数据  也就是已经进入视窗的DOM节点的数据
    this._timer = 0;
    // 全局只会实例化一次Exposure类，init方法也只会执行一次
    this.init();
  }

  init() {
    const self = this;
    // init只会执行一次，所以这两边界处理方法放这就行

    this._observer = new IntersectionObserver(
      function(entries, observer) {
        entries.forEach(entry => {
          // 这段逻辑，是每一个商品进入视窗时都会触发的
          if (entry.isIntersecting) {
            // 我这里是直接把商品相关的数据直接放DOM上面了  比如 <div {...什么id  class style等属性} :data-dot="渲染商品流时自行加上自身属性" ></div>
            const ctm = entry.target.attributes["data-product"].value;
            DotData(ctm);
            // 收集到该商品的数据后，取消对该商品DOM的观察
            self._observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // 不一定非得全部露出来  这个阈值可以小一点点
      }
    );
  }

  // 每个商品都会会通过全局唯一的Exposure的实例来执行该add方法,将自己添加进观察者中
  add(entry) {
    this._observer && this._observer.observe(entry.el);
  }
}
