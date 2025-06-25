<template>

    <div class="app">
        <button class="btn" @mouseenter="changeButEnter" @mouseleave="changeButLeave">
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        bgColor: {
            type: String,
            default: '#1b81ff'
        },
        textColor: {
            type: String,
            default: '#ffffff'
        },
        hoverBgColor: {
            type: String,
            default: 'blue'
        },
        hoverTextColor: {
            type: String,
            default: '#000'
        },
        size: {
            type: String,
            default: 'small'
        },
        textSize: {
            type: String,
            default: '16px'
        }
    },
    mounted() {
        let btn = document.querySelector('.btn')
        btn.style.color = this.textColor
        btn.style.backgroundColor = this.bgColor
        btn.style.fontSize = this.textSize

        switch (this.size) {
            case 'mini':
                btn.style.width = '80px'
                btn.style.height = '35px'
                break;
            case 'small':
                btn.style.width = '100px'
                btn.style.height = '50px'
                break;
            case 'medium':
                btn.style.width = '120px'
                btn.style.height = '60px'
                break;
            case 'large':
                btn.style.width = '160px'
                btn.style.height = '80px'
                break;
        }
    },
    methods: {
        changeButEnter() {
            let btn = document.querySelector('.btn')
            btn.style.color = this.hoverTextColor
            btn.style.backgroundColor = this.hoverBgColor
        },
        changeButLeave() {
            let btn = document.querySelector('.btn')
            btn.style.color = this.textColor
            btn.style.backgroundColor = this.bgColor
        }
    },
}
</script>
<style lang="scss" scoped>
.btn {
    border: none;
    outline: none;
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.6s ease-in-out;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
    box-reflect: below 4px linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.3));
    -webkit-box-reflect: below 4px linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.3));
}
</style>