import axios from "axios";
import { LoadingPlugin } from "tdesign-vue";
import { MessagePlugin } from "tdesign-vue";

const instance = axios.create({
  // baseURL: "www.junmei.com:3000",
  baseURL: "http://127.0.0.1:3000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // axios.defaults.withCredentials=true;//携带cookie,默认不携带
    // 在发送请求之前做些什么
    // config.defaults.withCredentials = true;
    // console.log(config);
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
      // console.log("token", localStorage.getItem("token"));
    }
    LoadingPlugin(true);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response);

    switch (response.data.code) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        localStorage.removeItem("token");
        MessagePlugin.info('登录已失效，请重新登录')
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
        break;
      case 500:
        localStorage.removeItem("token");
        MessagePlugin.info('服务繁忙请稍后再试')
        break;
      case 400:
        MessagePlugin.info('参数错误,请联系管理员')
        break;
      case 403:
        MessagePlugin.info('禁止访问')
        break;
      case 404:
        MessagePlugin.info('服务器问题，请联系管理员')
        break;
      case 408:
        MessagePlugin.info('请求超时，请稍后再试')
        break;
    }

    LoadingPlugin(false);
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // switch (error.status) {
    //   case 401:
    //     window.location.href = "/";
    //     // 返回 401 清除token信息并跳转到登录页面
    //     localStorage.removeItem("token");
    //     MessagePlugin("warning", { content: "登录超时请重新登录" });

    //     // return Promise.reject('登录超时请重新登录');
    //     break;
    // }
    return Promise.reject(error);
  }
);

export default instance;
