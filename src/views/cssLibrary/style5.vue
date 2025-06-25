<template>
    <div style="width: 100%;height: 100%;perspective: 2000px;">
        <div ref="ring" class="ring">
            <img src="../../assets/img/img5 (1).webp" alt="">
            <img src="../../assets/img/img5 (2).webp" alt="">
            <img src="../../assets/img/img5 (3).webp" alt="">
            <img src="../../assets/img/img5 (4).webp" alt="">
            <img src="../../assets/img/img1.jpg" alt="">
            <img src="../../assets/img/img2.webp" alt="">
            <img src="../../assets/img/img3.webp" alt="">
            <img src="../../assets/img/img4.webp" alt="">
            <img src="../../assets/img/img4.webp" alt="">
            <img src="../../assets/img/img4.webp" alt="">
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        // let num =0
       
        
        // setInterval(() => {
        //     console.log(this.$refs.ring);
        //     this.$refs.ring.style.transform = `rotateY(${num}deg)`;
        //    num = num + 5
        // }, 500);
    }
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
.ring {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(0deg);

    img {
        position: absolute;
        $imgWidth: 300px;
        width: $imgWidth;
        $imgHeight: 400px;
        height: $imgHeight;
        left: 50%;
        top: 50%;
        margin-left: -$imgWidth/2;
        margin-top: -$imgHeight/2;
        $r: 500px;
        $n: 10; // 代表一共几张图片
        $pDeg: 360deg / $n;
        backface-visibility: hidden;
        @for $i from 0 through $n - 1 {
            &:nth-child(#{$i+1}) {
                $deg: $i * $pDeg;
                $x: math.sin($deg) * $r;
                $z: math.cos($deg) * $r;
                transform: translate3d(#{$x}, 0, #{$z}) rotateY(180deg + $deg);
            }

        }

    }
}
</style>