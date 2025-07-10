<template>
    <div>
        <h2>{{ str }}</h2>
        格式化
        <p>{{ str2 }}</p>
        <h1>str.replace(/\B(?=(\d{3})+$)/g, ',')</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            str: '1000000',
            str2: this.formatted('1000000')
        }
    },
    methods: {
        formatted(str) {
            return str.replace(/\B(?=(\d{3})+$)/g, ',')
        }
    }
}
</script>
<style scoped>

</style>