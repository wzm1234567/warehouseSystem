<template>
    <div>
        <div class="card">HOVER</div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    position: relative;
    width: 220px;
    height: 320px;
    background: mediumturquoise;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
}

.card::before,
.card::after {
    position: absolute;
    content: "";
    width: 20%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    background-color: lightblue;
    transition: all 0.5s;
}

.card::before {
    top: 0;
    right: 0;
    border-radius: 0 15px 0 100%;
}

.card::after {
    bottom: 0;
    left: 0;
    border-radius: 0 100% 0 15px;
}

.card:hover::before,
.card:hover:after {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 0.5s;
}

.card:hover:after {
    content: "HELLO";
}
</style>