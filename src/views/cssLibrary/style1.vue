<template>
    <div style="width: 100%; height: 100%;">
        <div class="card">
                <img class="face" src="../../assets/img/img2.webp" alt="">
            <p class="back">
                <span>666666666666666666</span>
            </p>
        </div>

        <h2 style="font-family: serif;">serif 内置中文字体</h2>
        <h2 style="font-family: SimSun">SimSun 内置中文字体 宋体</h2>  <!-- 宋体 -->
        <h2 style="font-family: SimHei">SimHei 内置中文字体 黑体</h2>  <!-- 黑体 -->
        <h2 style="font-family: STKaiti">STKaiti 内置中文字体 楷体</h2>  <!-- 楷体 -->
        <h2 style="font-family: NSimSun">NSimSun 内置中文字体 新宋体</h2>    <!-- 新宋体 -->
        <h2 style="font-family: FangSong">FangSong 内置中文字体 仿宋</h2>  <!-- 仿宋 -->
        <br>
        <h2 style="font-family: Times New Roman">Times New Roman 字体</h2>  
        <h2 style="font-family: Georgia">Georgia 字体</h2>  
        <h2 style="font-family: Palatino">Palatino 字体</h2>  
        <h2 style="font-family: Garamond">Garamond 字体</h2>  
        <h2 style="font-family: Bookman Old Style">Bookman Old Style 字体</h2>  
        <h2 style="font-family: Computer Modern">Computer Modern 字体</h2> 
        <br>
        <h2 style="font-family: Arial">Arial 字体</h2>
        <h2 style="font-family: Verdana">Verdana 字体</h2>
        <h2 style="font-family: Trebuchet MS">Trebuchet MS 字体</h2>
        <h2 style="font-family: Helvetica">Helvetica 字体</h2>
        <h2 style="font-family: Lucida Grande">Lucida Grande 字体</h2>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
.card{
    // display: flex;
    // align-items: center;
    width: 200px;
    margin: 5vh auto;
    position: relative;
    .face{
        width: 200px;
        height: 200px;
        transition: all .5s;
        position: absolute;
        inset: 0;
    }
    .back{
        width: 200px;
        position: absolute;
        inset: 0;
        height: 200px;
        background-color: #fff;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .5s;
        transform: rotateY(180deg);
    }
}
.card:hover .face{
    transform: rotateY(-180deg);
}
.card:hover .back{
    transform: rotateY(0deg);
}
.face,.back{
    backface-visibility: hidden; // 重点    翻转成背面不可见
}
h2{
    margin-top: 6px;
}
</style>