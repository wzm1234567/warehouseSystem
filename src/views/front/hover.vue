<template>
    <div>
        <div class="container">
            <img src="../../assets/img/img1.jpg" alt="">
            <img src="../../assets/img/img2.webp" alt="">
            <img src="../../assets/img/img3.webp" alt="">
            <img src="../../assets/img/img4.webp" alt="">
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
    .container {
        display: flex;
        width: 600px;
        height: 240px;
        margin: 50px auto;
    }

    img {
        flex: 1;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
        transition: all .5s;
        -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
    }

    .container:hover>:not(:hover) {
        margin: 0 -20px;
        filter: grayscale(0.9) drop-shadow(0 0 25px #000) drop-shadow(0 0 45px #000);
        transform: perspective(500px) rotateY(45deg) scale(0.8);
    }

    .container:hover~img {
        transform: perspective(500px) rotateY(-45deg) scale(0.8) !important;
    }
</style>