<template>
    <div class="drops">
        <div class="drop"></div>
        <div class="drop"></div>
        <div class="drop"></div>
        <div class="drop"></div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #edeeed;
}

.drops {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.drop {
    position: absolute;
    width: 150px;
    height: 150px;
    background: transparent;
    border-radius: 59% 41% 29% 71% / 49% 55% 45% 51%;
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
        15px 25px 10px rgba(0, 0, 0, 0.1),
        15px 20px 20px rgba(0, 0, 0, 0.05),
        inset -10px -10px 15px rgba(255, 255, 255, 0.9);
}

.drop::before {
    content: "";
    position: absolute;
    top: 25px;
    left: 35px;
    background: #fff;
    width: 20px;
    height: 20px;
    border-radius: 42% 58% 37% 63% / 40% 43% 57% 60%;
}

.drop::after {
    content: "";
    position: absolute;
    top: 25px;
    left: 65px;
    background: #fff;
    width: 10px;
    height: 10px;
    border-radius: 57% 43% 37% 63% / 48% 37% 63% 52%;
}

.drop:nth-child(2) {
    transform: scale(0.5) translate(-200px, 180px);
    border-radius: 64% 36% 42% 58% / 42% 37% 63% 58%;
}

.drop:nth-child(3) {
    transform: scale(0.5) translate(280px, 10px);
    border-radius: 49% 51% 42% 58% / 56% 47% 53% 44%;
}

.drop:nth-child(4) {
    transform: scale(0.35) translate(120px, -350px);
    border-radius: 40% 60% 67% 33% / 79% 50% 50% 21%;
}
</style>