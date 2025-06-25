<template>
    <div style="width: 100%;height: 95%;background-color: #000;position: relative;">
        <div class="box">

        </div>
        <div class="text">
            王子默
        </div>

        <div class="repeat">

        </div>
        <div class="attachment">
            66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        </div>

        <div class="size">
            66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        </div>
    </div>
</template>
<style lang="scss" scoped>
.box {
    width: 200px;
    height: 200px;
    // border: 10px solid #fff;
    position: absolute;
    top: calc(10% - 50px);
    left: calc(20% - 50px);
    padding: 20px;
    box-sizing: content-box;
    // background-image: linear-gradient(red,yellow); // 渐变色
    // background-image: radial-gradient(circle,red,yellow); // 渐变色

    /**
     * 背景图片 展示多张图片 多url()
     * 用途：第一张图片未加载出来，先显示第二张图片，或者，第一张图片加载失败，显示第二张图片
     * 一般第一张图片是网络请求图片，第二张是本地图片（第一张图片未加载出来，会显示第二张图片）
     */
    // background-image: url(../../assets/img/img2.webp) , url(../../assets/img/img3.webp);// 引入多张图片
    // background-size: 100px 200px , 100px 200px; // 控制两张图片的大小 用逗号隔开
    // background-repeat: no-repeat;
    // background-position: 0 , 100px; 


    /**
     * background-origin 属性
     * 设置背景图片的起始位置
     * padding-box 默认值，背景图片与边框重叠
     * border-box 背景图片与边框重叠
     * content-box 背景图片与内容重叠
     */
    border: 10px solid transparent;
    background-image: url(../../assets/img/img2.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-origin: padding-box; // 默认值 padding-box ；border-box ; content-box
    // background-position: 20px 20px ;  // 根据padding 来位移 因为background-origin 设置为padding-box
    /**
     * background-clip 属性
     * 设置背景图片的裁切位置
     * padding-box 默认值，背景图片与边框重叠
     * border-box 背景图片与边框重叠
     * content-box 背景图片与内容重叠
     * text 背景图片与文本重叠 ***重点***
     */
    background-clip: border-box; // padding-box ；默认值 border-box ; content-box ; text
}

/**
 * background-clip 属性 text 
 * 背景图片与文本重叠
 */
.text {
    font-size: 60px;
    width: 400px;
    padding: 20px;
    height: 200px;
    border: 2px solid #fff;
    border-image: linear-gradient(red, yellow);
    // background-color: #fff;
    position: absolute;
    top: 20%;
    left: 70%;
    transform: translate(-50%, -50%);
    border: 10px solid #000;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-image: url(../../assets/img/img2.webp);
    background-size: 100% 100%;
}





.repeat {
    width: 400px;
    padding: 20px;
    height: 200px;
    border: 2px solid #fff;
    border-image: linear-gradient(red, yellow);
    position: absolute;
    border-image-slice: 2;
    top: 50%;
    left: 10%;
    background-image: url(../../assets/img/img2.webp);
    background-size: 50px 50px;
    // background-repeat: no-repeat;
    // background-repeat: repeat-x;
    // background-repeat: repeat-y;
    // background-repeat: round; // 默认值 平铺
    // background-repeat: space; // 平铺，但会留白
    background-repeat: round space; // 第一个值代表 横向 ；第二个代表 纵向（只有round space这两个属性可以填写两个值）
}


/**
 * background-attachment 属性 ***重点***
 */
.attachment {
    width: 400px;
    padding: 20px;
    height: 200px;
    border: 2px solid #fff;
    border-image: linear-gradient(red, yellow);
    position: absolute;
    border-image-slice: 2;
    top: 50%;
    left: 40%;
    overflow: scroll;
    background-image: url(../../assets/img/img2.webp);
    background-size: 100px 100px;
    background-position: 50px 10px;
    background-repeat: no-repeat;

    // background-attachment: scroll; // scroll默认值 ； 
    background-attachment: local; //local 本地 相当于内容当作定位
    // background-attachment: fixed; //fixed 固定 相当于视口当作定位
}

/**
 *  background-size: ;
 *
 */
.size {
    width: 400px;
    padding: 20px;
    height: 200px;
    border: 2px solid #fff;
    border-image: linear-gradient(red, yellow);
    position: absolute;
    border-image-slice: 2;
    top: 50%;
    left: 70%;
    overflow: scroll;
    background-image: url(../../assets/img/img2.webp);
    // background-size: cover; //背景图片会完全覆盖容器 用一张图片完全覆盖容器 不改变图片比例
    // background-size: contain; //背景图片会完全包含容器 不改变图片比例 在容器下完全展示一张图片
    background-repeat: no-repeat;
}
</style>