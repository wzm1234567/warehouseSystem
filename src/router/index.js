import Vue from "vue";
import VueRouter from "vue-router";
import http from "../utils/http";
import store from "@/store";
import { MessagePlugin } from 'tdesign-vue';

Vue.use(VueRouter);

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
    component: () => import("../views/largeScreen/index.vue"),
  },
  {
    path: "/rotatingEarth",
    name: "rotatingEarth",
    title: "旋转地图",
    component: () => import("../views/rotatingEarth.vue"),
  },
  // ⚠️ 404路由必须放在最后，且需要动态路由加载后重新评估
  {
    path: '*',
    component: () => import('@/views/exception/404')
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// ✅ 修复：将 arr 移入函数内部，避免全局污染
function flattening(list) {
  const arr = [];
  const dfs = (items) => {
    items.forEach(item => {
      // ⚠️ 只有具备 component 的项才是可访问路由
      if (item.component) {
        arr.push(item);
      }
      if (item.children && item.children.length) {
        dfs(item.children);
      }
    });
  };
  dfs(list);
  return arr;
}

// ✅ 修复：核心导航守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  
  // 无 token 处理
  if (!token) {
    return to.path === '/' ? next() : next('/');
  }

  // 已加载动态路由：直接放行
  if (store.getters.getHasRouterFlag) {
    return next();
  }

  // 未加载：开始获取动态路由
  try {
    const res = await http.get("/admin/menu");
    const menuData = res?.data?.data || [];
    
    if (!Array.isArray(menuData) || menuData.length === 0) {
      throw new Error('菜单数据为空');
    }

    store.commit("setmenu", menuData);
    
    // 生成并添加路由
    const flatMenu = flattening(store.getters.getmenu);
    flatMenu.forEach(item => {
      // ✅ 修复：生成有意义的路由 name
      const routeName = item.name || item.path.replace(/\//g, '_').replace(/^_|_$/, '');
      
      const route = {
        path: item.path,
        name: routeName,
        meta: { title: item.title },
        component: () => import(/* webpackChunkName: "[request]" */ `../views${item.component}.vue`),
      };
      
      router.addRoute("layout", route);
    });

    // ✅ 修复：在循环外提交 flag
    store.commit('setHasRouterFlag', true);

    // ✅ 核心修复：重新尝试进入目标路由，而不是硬编码跳转
    next({ ...to, replace: true });
    
  } catch (error) {
    console.error('动态路由加载失败:', error);
    MessagePlugin.error({ content: '路由加载失败，请重新登录' });
    
    // 清理状态，允许重试
    localStorage.removeItem("token");
    store.commit('setHasRouterFlag', false);
    
    next('/');
  }
});

export default router;