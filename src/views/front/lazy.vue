<template>

    <div class="container">
        <div class="child" v-for="(item, index) in srcList">
            <img style="width: 100%;height: 100%;" v-lazy="item" alt="" :key="item">
        </div>



    </div>
</template>
<script>

export default {
    data() {
        return {
            imageSrc: '../../assets/img/img1.jpg', // 占位图片
            srcList: [
                'https://img2.baidu.com/it/u=2227899634,1580731753&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
                'https://img1.baidu.com/it/u=588095852,1286628071&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=800',
                'https://img1.baidu.com/it/u=2423808336,3389706469&fm=253&fmt=auto&app=120&f=JPEG?w=799&h=500',
                'https://img1.baidu.com/it/u=1584535727,3968574556&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
                'https://img2.baidu.com/it/u=4278841032,2238904845&fm=253&fmt=auto&app=120&f=JPEG?w=1421&h=800',


                'https://img1.baidu.com/it/u=588095852,1286628071&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=800',
                'https://img1.baidu.com/it/u=3582849695,1724327755&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
                'https://img2.baidu.com/it/u=1146789038,149069202&fm=253&fmt=auto&app=138&f=JPEG?w=1605&h=800'
            ]
        }
    },
    created() {

    },
    mounted() {

    },
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 96%;
    overflow-y: auto;

    .child {
        width: 100%;
        background-color: #c00d0d;
        height: 800px;
    }
}
</style>