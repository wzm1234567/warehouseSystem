<template>
    <div class="home">
      <!-- 把dom元素 转化成canvas 并下载成png图片-->
       <div id="container">66666666666666666666</div>
       <img id="image" src="../../assets/logo.png" alt="">
       <!-- <canvas id="canvas"></canvas> -->
    </div>
  </template>
  
  <script>
  // import HelloWorld from "@/components/HelloWorld.vue";
  
  /* 
   * 第一步
   * npm install html2canvas
  */
  
  // 第二部
  import html2canvas from "html2canvas";
  export default {
    // components: {HelloWorld},
  
    data() {
      return {};
    },
    mounted() {                    // 选择哪一个元素 就会下载哪一个元素里的内容
      html2canvas(document.getElementById("image"), {
        backgroundColor: "transparent",
        allowTaint: true,
        useCORS: true, //支持图片跨域
        scale: 1, //设置放大的倍数
      }).then((canvas) => {
        console.log(canvas);
        // 将画布展示到最前端
        // canvas.id = "canvas";
        // document.body.appendChild(canvas);
        // document.getElementById("canvas").style.position = "fixed";
        // document.getElementById("canvas").style.top = "0";
        // document.getElementById("canvas").style.left = "0";
        // document.getElementById("canvas").style.zIndex = "9999";
  
  
        // // 下载图片到本地
  
        var a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "图片6666"; // 下载图片的文件名
        a.click();
  
      });
    },
    methods: {},
  };
  </script>
  