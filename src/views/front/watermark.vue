<template>
    <div class="about" style="margin: 100px">
      我是网页
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
      <h1 style="margin: 100px">别改我</h1>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        waterMaskBox: null,
        base64Url: null,
      };
    },
    mounted() {
      this.createdWaterMask(300, 300, "我是水印");
      const observer = new MutationObserver((mutations) => {
        console.log(mutations);
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            console.log("子节点被修改了");
          } else if (mutation.type === "attributes") {
            console.log("属性被修改了");
            this.waterMaskBox.remove();
            this.createdWaterMask(300, 300, "我是水印");
          }
        });
      });
  
      let fatherDom = document.body;
      observer.observe(fatherDom, {
        childList: true,
        attributes: true,
        subtree: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
      });
    },
    methods: {
      createdWaterMask(width, height, content) {
        // 生成水印节点
        this.waterMaskBox = document.createElement("div");
        this.waterMaskBox.setAttribute("id", "waterMask");
        // 获取对应的水印图片
        this.base64Url = this.createdCanvas(width, height, content);
        this.waterMaskBox.style = `
                  position: fixed;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  range: 0;
                  width: 100%;
                  height: 100%;
                  font-size: 18px; 
                  font-weight: 600; 
                  /* 控制水印dom布局  */
                  display: flex;
                  flex-wrap: wrap; 
                  overflow: hidden;
                  /* 整个水印盒子不能操作 */ 
                  user-select: none; 
                  pointer-events: none; 
                  opacity: 1; 
                  z-index: 9999;
                  pointer-events:none;
                  /*设置背景平铺和背景图*/
                  background-repeat:repeat;
                  background-image:url('${this.base64Url}');
              `;
        // 把水印盒子插到body下
        document.body.appendChild(this.waterMaskBox);
      },
  
      createdCanvas(width, height, content) {
        console.log(width, height);
  
        const canvas = document.createElement("canvas");
        // 设置单个水印的宽高
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        // 设置canvas文本样式
        ctx.font = "20px Microsoft Yahei";
        ctx.fillStyle = "rgba(184, 184, 184, 0.6)";
        // 写入水印文案
        ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2); // 绘制文本
        const img = canvas.toDataURL();
        console.log(img);
        return img;
      },
    },
  };
  </script>
  