<template>
    <div class="app">
        <button class="btn90" @mouseenter="enter" @mouseleave="leave">
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        borderColor: {
            type: String,
            default: '#2951ff'
        },
        bgColor: {
            type: String,
            default: 'transparent'
        },
        bgColorHover: {
            type: String,
            default: '#2951ff'
        },
        color: {
            type: String,
            default: '#2951ff'
        },
        colorHover: {
            type: String,
            default: '#fff'
        }
    },
    mounted() {
        let btn = document.querySelector('.btn90')
        btn.style.borderColor = this.borderColor
        btn.style.backgroundColor = this.bgColor
        btn.style.color = this.color
    },
    methods: {
        enter() {
            let btn = document.querySelector('.btn90')
            btn.style.backgroundColor = this.bgColorHover
            btn.style.color = this.colorHover
        },
        leave() {
            let btn = document.querySelector('.btn90')
            btn.style.backgroundColor = this.bgColor
            btn.style.color = this.color
        }
    }
}
</script>
<style lang="scss" scoped>
.app {
    // width: 100%;
    // height: 100vh;
    // background-color: #ffffff;
    // position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}

.btn90 {
    padding: 10px 24px;
    border: 2px solid transparent;
    outline: none;
    // background-color: transparent;
    cursor: pointer;
    transform: skewX(-15deg);
    transition: all 0.2s linear;
    font-size: 18px;
    font-weight: bold;
}

.btn90::after {
    // content: 'BUTTON';
    // font-size: 18px;
    // font-weight: bold;
    // color: #2951ff;
    // transition: all 0.2s linear;
}

.btn90:hover {
    // background-color: #2951ff;
    transform: skewX(-20deg) translate(-4px, -4px);
    box-shadow: 2px 2px 0 #fff, 6px 6px 0 #000;
}

.btn90:hover::after {
    // color: #ffffff;
    // transform: translate(-3px, -3px);
    // text-shadow: 4px 4px 0 #000;
}
</style>