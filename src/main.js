import Vue from "vue";
import App from "./App.vue";
import "lib-flexible"; // 引入适配包
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
