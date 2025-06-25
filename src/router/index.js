import Vue from "vue";

import VueRouter from "vue-router";

import http from "../utils/http";
import store from "@/store";
import { MessagePlugin } from 'tdesign-vue';

Vue.use(VueRouter);

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

const routes = [
  {
    path: "/",
    name: "login",
    title: "登录",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    redirect: "/home/work",
    title: "首页",
    component: () => import("../layout/index.vue"),
    children: [],
  },
    {
    path: "/largeScreen",
    name: "largeScreen",
    title: "大屏",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/largeScreen/index.vue"),
  },
  {
    path: "/rotatingEarth",
    name: "rotatingEarth",
    title: "旋转地图",
    component: () => import("../views/rotatingEarth.vue"),
  },
  {
    path: '*',
    component: () => import('@/views/exception/404')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let arr = [];
function flattening(list) {
  list.forEach((item) => {
    if (item.children) {
      item.children.forEach((ele) => {
        arr.push(ele);
      });
      arr.push(item);
    } else {
      arr.push(item);
    }
  });

  return arr;
}

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    if (!store.getters.getHasRouterFlag) { // 判断是否已经动态添加路由
      try {
        http.get("/admin/menu").then(res => {
          // if(res.data.code != 0) return MessagePlugin.error({ content: res.data.msg })
          console.log(res);
          store.commit("setmenu", res.data.data);
          let newArr = [];
          flattening(store.getters.getmenu).forEach((item) => {
            let { children, ...arr } = item;
            newArr.push(arr);
          });
          console.log(newArr); // 数据扁平化
          newArr.forEach((item) => {
            let r = {
              path: item.path,
              name: item.path.substr(0, 1),
              meta: {
                title: item.title,
              },
              component: () => import("../views" + item.component + ".vue"),
            };
            // 将动态路由数据添加到父路由下面
            router.addRoute("layout", r);
            store.commit('setHasRouterFlag', true)
          });
          // next({ ...to, replace: true })    // 重点
          // let path = localStorage.getItem(savedRoute) || '/articleView'
          // next(path)    // 重点
          // next('/articleView')    // 重点
          // console.log(Vue);
          // console.log(localStorage.getItem(savedRoute));
          // console.log(sessionStorage.getItem('savedRoute'));

          // if (sessionStorage.getItem('savedRoute') && sessionStorage.getItem('savedRoute') !== '/') {
          //   next(sessionStorage.getItem('savedRoute'))
          // } else {
          next('/home/work')
          // }
        }); // 获取动态路由

      } catch (error) {
        MessagePlugin.error({ content: '登录失败，请联系管理员' })
        localStorage.removeItem("token")
        next('/')
      }


    } else {
      // if (sessionStorage.getItem('savedRoute') && sessionStorage.getItem('savedRoute') !== '/') {
      //   next(sessionStorage.getItem('savedRoute'))
      // } else {
      //   next('/articleView')
      // }
      // console.log(22222);
      next()
    }
  } else if (to.path == "/") {
    next()
  } else {
    next('/')
  }
});

// router.afterEach((to) => {
//   console.log(to);

//   // localStorage.setItem("savedRoute", JSON.stringify(to.fullPath))
//   sessionStorage.setItem("savedRoute", JSON.stringify(to.fullPath))
// })
export default router;
