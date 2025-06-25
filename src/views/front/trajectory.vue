<template>

    <div class="container">
        <!-- 旋转动画 -->
        <div class="animate">
            <div class="ball ball1">
                <!-- <img src="./ren.png" /> -->
                <p>血氧</p>
                <span>正常</span>
            </div>
            <div class="ball ball2">
                <!-- <img src="./ren.png" /> -->
                <p>血糖</p>
                <span>正常</span>
            </div>
            <div class="ball ball3">
                <!-- <img src="./ren.png" /> -->
                <p>健康</p>
                <span>优</span>
            </div>
            <div class="ball ball4">
                <!-- <img src="./ren.png" /> -->
                <p>血压</p>
                <span>正常</span>
            </div>
            <div class="ball ball5">
                <!-- <img src="./ren.png" /> -->
                <p>体温</p>
                <span>36.5</span>
            </div>
            <div class="ball ball6">
                <!-- <img src="./ren.png" /> -->
                <p>睡眠</p>
                <span>良好</span>
            </div>
        </div>
        <!-- 旋转动画结束 -->
    </div>

</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        var items = document.getElementsByClassName("ball");
        //console.log(items)
        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function () {
                console.log(this);
            });
        }
        // for (var i = 0; i < items.length; i++) {
        //   items[i].addEventListener("mouseover", function () {
        //     for (j = 0; j < items.length; j++) {
        //       items[j].style.animationPlayState = "paused";
        //     }
        //   });
        //   items[i].addEventListener("mouseout", function () {
        //     for (j = 0; j < items.length; j++) {
        //       items[j].style.animationPlayState = "running";
        //     }
        //   });
    }
    // }
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
}

/* 旋转动画 */
.animate {
    width: 420px;
    height: 300px;
    border-radius: 50%;
    position: absolute;
    left: 100px;
    top: 20px;
    background-color: rgba(16, 140, 189, 0.637);

}

@keyframes animX {
    0% {
        left: -20px;
    }

    100% {
        left: 340px;
    }
}

@keyframes animY {
    0% {
        top: -30px;
    }

    100% {
        top: 200px;
    }
}

@keyframes scale {
    0% {
        transform: scale(0.7);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(0.7);
    }
}

.ball {
    width: 90px;
    height: 90px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #fff;
    background-image: url("../../assets/img/border-4.webp");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

p {
    margin: 0;
}

.ball img:hover {
    transform: scale(1.2);
}

.ball img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}

/* 6个图x和y轴动画加起来是18s , 18s/6 等于 3s
每个球y轴动画延迟 从0递减3s,x轴与y轴相差动画时长的一半（9s/2） */
.ball1 {
    animation: animX 9s cubic-bezier(0.36, 0, 0.64, 1) -4.5s infinite alternate,
        animY 9s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
        scale 18s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
}

.ball2 {
    animation: animX 9s cubic-bezier(0.36, 0, 0.64, 1) -7.5s infinite alternate,
        animY 9s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate,
        scale 18s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate;
}

.ball3 {
    animation: animX 9s cubic-bezier(0.36, 0, 0.64, 1) -10.5s infinite alternate,
        animY 9s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate,
        scale 18s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate;
}

.ball4 {
    animation: animX 9s cubic-bezier(0.36, 0, 0.64, 1) -13.5s infinite alternate,
        animY 9s cubic-bezier(0.36, 0, 0.64, 1) -9s infinite alternate,
        scale 18s cubic-bezier(0.36, 0, 0.64, 1) -9s infinite alternate;
}

.ball5 {
    animation: animX 9s cubic-bezier(0.36, 0, 0.64, 1) -16.5s infinite alternate,
        animY 9s cubic-bezier(0.36, 0, 0.64, 1) -12s infinite alternate,
        scale 18s cubic-bezier(0.36, 0, 0.64, 1) -12s infinite alternate;
}

.ball6 {
    animation: animX 9s cubic-bezier(0.36, 0, 0.64, 1) -19.5s infinite alternate,
        animY 9s cubic-bezier(0.36, 0, 0.64, 1) -15s infinite alternate,
        scale 18s cubic-bezier(0.36, 0, 0.64, 1) -15s infinite alternate;
}
</style>