<template>
    <div style="background-color: pink;height: 100%;overflow: hidden;">
        
            <div style="margin:10vh auto;width: 20vw;">
                <p>绿蚁新陪酒</p>
                <p>红泥小火炉</p>
            </div>
    
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
<style lang='scss' scoped>
    p{
        font-size: 5em;
        font-weight: bold;
        font-family: '手札体-中黑';
        // font-family: '手札体-简';
        height: 13vh;
        line-height: 13vh;
        margin: 20px 0;
        color: #000;
        // text-shadow: 0 -2px #fff,2px 0 #fff,-2px 0 #fff,0 2px #fff,2px 2px #fff,2px -2px #fff,-2px 2px #fff,-2px -2px #fff;   //方法一

        -webkit-text-stroke: #fff 2px;  // 方法二
    }
</style>