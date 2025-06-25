<template>
    <div style="width: 100%;height: 95%;background-color: #000;position: relative;">
        <div class="box">

        </div>
        <div class="box2">

        </div>
    </div>
</template>
<style lang="scss" scoped>
.box {
    width: 100px;
    height: 100px;
    border: 10px solid #fff;
    position: absolute;
    top: calc(20% - 50px);
    left: calc(20% - 50px);
    // 支持渐变颜色
    border-image-source: linear-gradient(red, yellow);
    border-image-slice: 10; // 必须属性 固定写法 一般和boder的值是一样的 默认值100%
    // border-image-outset: 100px; // 边框外边距 默认值0 往外延伸 不常用
    border-image-width: 1; // 边框宽度 默认值1
    // 支持背景图片
    // border-image-source: url();
    // border-image-slice: 10; // 必须属性 里面可以填入4个值，当填写一个值时代表4个值相等
    /**
     * 值：(也可以填写两个参数 一个代表水平 一个代表垂直)
     * stretch: 默认值
     * repeat: 边框图片平铺
     * round: 边框图片平铺，但会按照图片的尺寸进行缩放
     * space: 边框图片平铺，但会按照图片的尺寸进行缩放，且会留白
     */
    border-image-repeat: stretch;
    /**
         * 联合写法
         */

    // border-image:source slice  repeat; 
}

.box2 {
    width: 200px;
    height: 200px;
    // border: 10px solid #fff;
    position: absolute;
    top: calc(20% - 50px);
    left: calc(60% - 50px);
    // background-image: linear-gradient(to top right, red, yellow);
    // background-image: linear-gradient(40deg, red, yellow);
    // background-image: linear-gradient(40deg, red 80px, yellow);

    // background-image: radial-gradient(red, yellow,blue);
    // background-image: radial-gradient(red 10%, yellow 80px,blue 90%);
                                              //设置圆心的位置
    // background-image: radial-gradient(circle at 50% 50%, red, yellow);

    // background-image: radial-gradient(ellipse at 50px 50px, red, yellow);// 椭圆
    // background-image: radial-gradient(ellipse closest-corner at 50px 30px, red, yellow);// 椭圆
    // background-image: radial-gradient(ellipse closest-side at 50px 30px, red, yellow);// 椭圆
    // background-image: radial-gradient(ellipse farthest-corner at 50px 50px, red, yellow);// 椭圆
    background-image: radial-gradient(ellipse farthest-side at 50px 50px, red, yellow); // 椭圆
}
</style>