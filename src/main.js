import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import router from "./router";
import store from "./store";

import "element-ui/lib/theme-chalk/index.css";
import "./style/index.css"

import TDesign from 'tdesign-vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import { i18n } from "./i18n/index";

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)

import VueLazyload from 'vue-lazyload' // 图片懒加载
Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(TDesign);
Vue.use(VueLazyload,{
  preLoad: 1.3, //预加载的宽高比
  loading:'./assets/logo.png', // 加载中的图片，
  error:'./assets/marker.gif', // 加载失败的图片
  attempt: 1, // 加载错误后最大尝试次数
});

new Vue({
  i18n,
  router,
  store,
  el: "#app",
  render: (h) => h(App),
}).$mount("#app");