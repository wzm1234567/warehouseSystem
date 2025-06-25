<template>
    <div class="login">
        <div class="login-left">
            <div class="login-title">
                <img style="width: 60px;height: 60px;"
                    src="https://i.postimg.cc/MZn308n0/bab66ead545efef87ff21fe4c07e020870c086c21c910-Sv-QDk-A.png"
                    alt="">
                <span
                    style="color: var(--color-text);font-size: 18px;font-weight: 600;letter-spacing: 0.5px;">子默饲料原料仓储管理系统</span>
            </div>

            <div class="login-logo">
                <img style="width: 80%;height: 80%;"
                    src="https://i.postimg.cc/MphxbYDt/36762d98f099d7ad0f019e20e1e73a78de56b0b3455dbd-5g-Oo-Wu-fw1200.gif"
                    alt="">
            </div>

        </div>
        <div class="login-right">
            <div class="login-toolbar">
                <!-- <toolbar></toolbar> -->
            </div>
            <transition name="component-fade" mode="out-in">
                <form-login v-if="loginFlag==1" @createAccount="createAccount"></form-login>
                <register v-if="loginFlag==2" @login="login"></register>
            </transition>
        </div>
    </div>
</template>
<script>
    import formLogin from './compoent/formLogin.vue'
    import toolbar from '../../components/toolbar.vue'
    import register from './compoent/register.vue'
    export default {
        components: {
            formLogin,
            toolbar,
            register
        },
        data() {
            return {
                loginFlag: 1,
            }
        },
        methods: {
            createAccount(e) {
                this.loginFlag = e
            },
            login(e) {
                this.loginFlag = e
            },
        },
    }
</script>
<style lang="scss" scoped>
    /* * {
        transition: background-color 0.7s, color 0.7s;

    } */

    /* @import "../../style/index.css"; */
    .login {
        width: 100vw;
        height: 100vh;
        display: flex;

        .login-left {
            flex: 6.6;
            /* background: rgb(7,7,9); */
            /* background-image: linear-gradient(330deg, #07070a 0%, #06060a 22%, #061427 49%, #06060a 75%, #07070a 100%);  */
            background-image: linear-gradient(330deg, var(--bgc-color-light) 0%, var(--bgc-color-light) 22%, var(--bgc-color-center) 49%, var(--bgc-color-light) 75%, var(--bgc-color-light) 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            transition: background-image 3s ease-in-out;

            .login-title {
                position: absolute;
                top: 5px;
                left: 5px;
                display: flex;
                align-items: center;
            }
        }

        .login-right {
            flex: 3.4;
            /* background-color: #14161a; */
            background-color: var(--bgc-color);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .login-toolbar {
                position: absolute;
                right: 5px;
                top: 5px;

            }
        }
    }


    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .component-fade-enter-active,
    .component-fade-leave-active {
        transition: opacity .5s ease;
    }

    .component-fade-enter,
    .component-fade-leave-to

    /* .component-fade-leave-active for below version 2.1.8 */
        {
        opacity: 0;
    }
</style>