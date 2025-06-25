<template>
    <div>
        <div class="box">
            <div></div>
        </div>
        <div class="box2">
            <div></div>
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
.box {
    width: 400px;
    height: 300px;
    background: rgb(181, 230, 103);
    position: relative;
    display: inline-block;

    div {
        width: 180px;
        height: 150px;
        border: 1px solid #000;
        position: absolute;
        top: calc(50% - 75px);
        left: calc(50% - 100px);

        border-top-left-radius: 140px 70px;
        // border-top-right-radius: 50px 50px;
        // border-bottom-left-radius: 50px 50px ;
        border-bottom-right-radius: 140px 70px;
    }
}


.box2 {
    display: inline-block;
    width: 400px;
    height: 300px;
    background: rgb(0, 0, 0);
    position: relative;
    margin: 0 40px;

    div {
        width: 150px;
        height: 150px;
        // border: 1px solid #ffffff;
        position: absolute;
        top: calc(50% - 75px);
        left: calc(50% - 100px);
        border-radius: 50%;
        box-shadow: inset 0px 0px 20px 10px rgb(236, 122, 179),
            inset 20px 0px 20px 10px rgb(95, 158, 230),
            inset -20px 0px 20px 10px rgb(86, 233, 110),
            0px 0px 20px 10px rgb(245, 194, 83),
            0px 0px 25px 15px rgb(255, 0, 0);

    }
}
</style>