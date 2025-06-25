import Vue from "vue";

import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import http from "../utils/http";
import store from "@/store";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    name: "login",
    title: "登录",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/index.vue"),
  },
  {
    path: "/list",
    name: "list",
    title: "网站",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/list.vue"),
  },
  {
    path: "/rotatingEarth",
    name: "rotatingEarth",
    title: "3D旋转地球",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/rotatingEarth.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    redirect: "/home/work",
    title: "首页",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layout/index.vue"),
    children: [
      // {
      //   path: "/about",
      //   name: "about",
      //   title: "前端水印",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      // },
      // {
      //   path: "/gismap",
      //   name: "gismap",
      //   title: "GIS地图",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/gismap.vue"),
      // },
      // {
      //   path: "/lianxi",
      //   name: "lianxi",
      //   title: "练习页面",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/front/lianxi.vue"),
      // },
      // {
      //   path: "/i18n",
      //   name: "i18n",
      //   title: "国际语言切换",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/i18n.vue"),
      // },
      // {
      //   path: "/home",
      //   name: "home",
      //   title: "前端实现图片下载",
      //   component: HomeView,
      // },
      // {
      //   path: "/bills",
      //   name: "bills",
      //   title: "账单",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "about" */
      //       "../views/financial/bills.vue"
      //     ),
      // },
      // {
      //   path: "/stash",
      //   name: "stash",
      //   title: "仓库",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/stash/index.vue"),
      // },
      // {
      //   path: "/client",
      //   name: "client",
      //   title: "客户",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/client/index.vue"),
      // },
      // {
      //   path: "/warehousing",
      //   name: "warehousing",
      //   title: "入库",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "about" */
      //       "../views/warehousing/index.vue"
      //     ),
      // },
      // {
      //   path: "/issue",
      //   name: "issue",
      //   title: "出库",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/issue/index.vue"),
      // },
      // {
      //   path: "/tinymce",
      //   name: "tinymce",
      //   title: "富文本",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/tinymce/index.vue"),
      // },
      // {
      //   path: "/particles",
      //   name: "particles",
      //   title: "粒子效果",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "about" */
      //       "../views/particles/index.vue"
      //     ),
      // },
      // {
      //   path: "/hover",
      //   name: "hover",
      //   title: "图片悬停效果",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/hover/index.vue"),
      // },
      // {
      //   path: "/diaLog",
      //   name: "diaLog",
      //   title: "diaLog全局组件封装",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/diaLog/index.vue"),
      // },
      // {
      //   path: "/table",
      //   name: "table",
      //   title: "table全局组件封装",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/table/index.vue"),
      // },
      // {
      //   path: "/drawer",
      //   name: "drawer",
      //   title: "drawer抽屉全局组件封装",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/drawer/index.vue"),
      // },
      // {
      //   path: "/qrcode",
      //   name: "qrcode",
      //   title: "二维码生成",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "../views/qrcode/index.vue"),
      // },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

console.log(router.getRoutes());

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

router.beforeEach(async (to, from, next) => {


  if (localStorage.getItem("token")) {

    if (!store.getters.getHasRouterFlag) { // 判断是否已经动态添加路由
      let menulist = await http.get("/menu/menu"); // 获取动态路由
      console.log(menulist);
      store.commit("setmenu", menulist.data.data);
  
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
        store.commit('setHasRouterFlag',true)
      });
      next( {...to,replace:true})    // 重点

    }else{
      next()

    }



    
  
    // http.get("/menu/menu").then((res) => {
    //     console.log(res.data.data);
    //     if (res.data.code == 0) {
    //       store.commit("setmenu", res.data.data);
    //       let newArr = [];
    //       flattening(store.getters.getmenu).forEach((item) => {
    //         let { children, ...arr } = item;
    //         newArr.push(arr);
    //       });
    //       console.log(newArr); // 数据扁平化

    //       newArr.forEach((item) => {
    //         let r = {
    //           path: item.path,
    //           name: item.path.substr(0, 1),
    //           meta: {
    //             title: item.title,
    //           },
    //           component: () => import("../views" + item.component + ".vue"),
    //         };
    //         // 将动态路由数据添加到父路由下面
    //         router.addRoute("layout", r);
    //       });

    //       console.log(router.getRoutes());

    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // next();
    //   });
    //   next();
  } else if(to.path == "/"){
    next();
    
  } else{
    next('/')
  }
});
export default router;
