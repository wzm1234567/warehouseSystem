<template>
    <div style="width: 100%;height: 100%;background-color: pink;overflow: hidden;">
        <div class="avatar">

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
<style lang="scss" scoped>
.avatar {
    width: 200px;
    height: 200px;
    margin: 10vh auto;
    background-image: url(../../assets/img/img1.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    border: 5px solid #0c0b0b;
}

.avatar::before,
.avatar::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    transition: all 0.5s;
}

.avatar::before {
    background-color: rgba(0, 0, 0, .5);
}

.avatar::after {
    background: inherit;
    clip-path: circle(0% at 50% 50%); // 重点
}

.avatar:hover::after {
    clip-path: circle(50% at 50% 50%);
}
</style>