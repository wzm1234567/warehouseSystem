<template>
    <div style="display: flex;">

        <div style="display: flex;">
            <div class="color" @mouseenter.stop="evententer" @mouseleave="eventleave">
                <div>
                    <div @click="Toggle('Blue')"></div>
                    <div @click="Toggle('Skyblue')"></div>
                    <div @click="Toggle('Orange')"></div>
                </div>


                <svg style="color: #3070c4;margin-right: 8px; cursor: pointer;z-index: 99999;transform: translateX(-35px);"
                    @mouseenter.stop="evententer" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-palette-icon text-primary size-4">
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                    <path
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z">
                    </path>
                </svg>
            </div>
            <div class="toolbar">

                <MoonIcon v-if="flag" style="color: #000000 ;cursor: pointer" @click="eventFlag" />
                <SunnyIcon v-else style="color: #fff;cursor: pointer" @click="eventFlag2" />
            </div>

        </div>

    </div>
</template>
<script>
import { MoonIcon, SunnyIcon } from 'tdesign-icons-vue';
export default {
    components: { MoonIcon, SunnyIcon },
    data() {
        return {
            flag: false,
            setting1: null,
            aflag: false,
            bflag: false,
            setting2: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.flag = localStorage.getItem('flag')
            if (this.flag == 'dark') {
                this.eventFlag()
            } else {
                this.eventFlag2()
            }
        })
    },
    methods: {
        eventFlag() {
            this.flag = false
            document.documentElement.setAttribute('theme-mode', 'dark');
            if (localStorage.getItem('color')) {
                this.$emit('flagColor', localStorage.getItem('color'))
            }
            localStorage.setItem('flag', 'dark')
        },
        eventFlag2() {
            this.flag = true
            document.documentElement.removeAttribute('theme-mode');
            // document.documentElement.setAttribute('theme-mode', 'right');
            if (localStorage.getItem('color')) {
                this.$emit('flagColor', localStorage.getItem('color'))
            }
            
            localStorage.setItem('flag', 'light')
        },

        evententer() {
            clearTimeout(this.setting1)
            this.setting1 = setTimeout(() => {
                let color = document.querySelector('.color>div')
                color.style.transform = 'translate(-30px,0)'
                // color.style.transitionDelay = '2s'
                color.style.transition = 'transform 0.7s'
                setTimeout(() => {
                    color.style.opacity = '1'
                }, 150)
                setTimeout(() => {
                    color.style.zIndex = '99999'
                }, 300)
            }, 500)
        },


        eventleave() {
            clearTimeout(this.setting1)
            this.setting2 = setTimeout(() => {
                let color = document.querySelector('.color>div')
                color.style.transform = 'translateX(58px)'
                color.style.transition = 'transform 0.7s'
                color.style.zIndex = '0'
                setTimeout(() => {
                    color.style.opacity = '0'

                }, 300)
            })

        },

        Toggle(color) {
            this.$emit('flagColor', color)
        }
    },
}
</script>
<style lang="scss" scoped>
.toolbar {
    /* background-color: #e4e5e793; */
    background-color: var(--bgc-color-toolbar);
    border-radius: 17px;
    padding: 10px 20px 10px 40px;
    display: flex;
    justify-self: start;
    align-items: center;
    z-index: 9;


}

.color {
    display: flex;
    align-items: center;

    &>div {
        display: flex;
        transform: translateX(58px);
        background-color: var(--bgc-color-toolbar);
        opacity: 0;
        border-radius: 17px 0 0 17px;
        padding: 8px 10px;
        cursor: pointer
    }

    &>div>div:nth-child(1) {
        width: 20px;
        height: 20px;
        background-color: blue;
        border-radius: 50%;

        &:hover {
            transform: scale(1.2);
        }
    }

    &>div>div:nth-child(2) {
        width: 20px;
        height: 20px;
        background-color: skyblue;
        border-radius: 50%;
        margin: 0 10px;

        &:hover {
            transform: scale(1.2);
        }
    }

    &>div>div:nth-child(3) {
        width: 20px;
        height: 20px;
        background-color: orange;
        border-radius: 50%;
        margin-right: 18px;

        &:hover {
            transform: scale(1.2);
        }
    }

}
</style>