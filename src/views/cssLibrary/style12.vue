<template>
    <div style="width: 100%;height: 95%;background-color: #000;position: relative;background-color: pink;">
        <div class="box">
            texttext-shadow
        </div>
        <div class="box2">
            撒尽快哈康
        </div>
    </div>
</template>
<style lang="scss" scoped>
/**
 * text-shadow 1.文字阴影
 * white-space: nowrap;  强制文字不换行
 * word-wrap: break-word;  强制换行
 * word-break: keep-all;  强制文字不换行
 * word-break: break-all;  换行
 * text-overflow: ellipsis;  文本溢出省略号
 * text-overflow: clip;  文本溢出不显示
 * text-overflow: -o-ellipsis-lastline;  文本溢出省略号
 * vertical-align: middle;  垂直居中
 */
@font-face {
    font-family: 'abc'; //  字体包起的名字
    src: url();
}
    .box{
        /**浮雕效果 */
        // width: 500px;
        // height: 300px;
        // text-align: center;
        // line-height: 300px;
        // border: 1px solid pink;
        // font-size: 50px;
        // color: #ddd;

        // text-shadow: 1px 1px #000,-1px -1px #fff;



        /*镂刻效果 */
        // width: 500px;
        // height: 300px;
        // text-align: center;
        // line-height: 300px;
        // border: 1px solid pink;
        // font-size: 50px;
        // color: #ddd;

        // text-shadow: -1px -1px #000;



        /**** */
        width: 500px;
        height: 300px;
        text-align: center;
        line-height: 300px;
        border: 1px solid pink;
        font-size: 50px;
        color: #ddd;

        text-shadow: 0px 0px 10px #000,
                     0px 0px 20px #000;
    }
    
    .box2{
        width: 500px;
        height: 300px;
        text-align: center;
        line-height: 300px;
        border: 1px solid pink;
        font-size: 50px;
        color: #868686;

        -webkit-text-stroke: 1px red; 
        font-family: simsun;
          
    }
</style>