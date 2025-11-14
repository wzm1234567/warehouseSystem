const { defineConfig } = require("@vue/cli-service");
// 这个插件的作用是打包时生成 gzip 压缩文件，让网页加载更快
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");
module.exports = defineConfig({
  // 禁用生产环境 source map 
  productionSourceMap: false,
  // 解构node_models中的文件 使用babel转换成es5
  transpileDependencies: ["element-ui"],
  // transpileDependencies: true
  devServer: {
    proxy: {
      "/api": {
        // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
        target: "http://127.0.0.1:3000/", // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: true, // 是否启用  websockets;
        pathRewrite: {
          // 去掉 路径中的  /api  的这一截
          "^/api": "",
        },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== "development") {
      // 对超过10kb的文件gzip压缩
      config.plugin("compressionPlugin").use(
        new CompressionWebpackPlugin({
          test: /\.(js|css|html)$/,
          threshold: 10240,
        })
      );
    }
  },
});
