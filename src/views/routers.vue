<template>
    <div style="padding: 30px;">
        <t-button @click="tz1">中国国际经济合作学会官网</t-button>
        <t-button @click="tz3">中国国际经济合作学会后台</t-button>
        <t-button @click="tz2">3D旋转地球</t-button>

    </div>
</template>
<script>
export default {
    methods: {
        tz1() {
            window.open("http://v2.cafiecmofcom.org.cn")
        },
        tz3() {
            window.open("http://a.cafiecmofcom.org.cn/")
        },
        tz2() {
            // window.open("/rotatingEarth")
            this.$router.push('/rotatingEarth')
        }
    },
}
</script>
<style lang="scss" scoped>
.t-button {
    margin: 0 20px
}
</style>