<template>
    <div>
        // 代码在uni-app 中使用
        <view class="page">
            <view class="tabbar-box">
                <block v-for="(item, index) in tabbar">
                    <view class="tabbar-item" :class="idx == index && 'active'" @click=" tabClick(index)" :key="index">
                        <image class="icon" :src="item.icon" mode=""></image>
                        <text>{{ item.name }}</text>
                    </view>
                </block>
                <view class="active-tabbar-box" :style="'--n:' + idx"></view>
            </view>
        </view>
    </div>



</template>

<script>
export default {
    data() {
        return {
            idx: 0,
            tabbar: [{
                name: "首页",
                icon: "../../static/tabbar/1.png"
            },
            {
                name: "推荐",
                icon: "../../static/tabbar/2.png"
            },
            {
                name: "购物车",
                icon: "../../static/tabbar/3.png"
            },
            {
                name: "订单",
                icon: "../../static/tabbar/4.png"
            },
            ]
        }
    },

    onLoad() {

    },

    methods: {
        tabClick(index) {
            this.idx = index
        },
    }
}
</script>


<style scoped>
.page {
    background: #eee;
    width: 350px;
    height: 600px;
}

.tabbar-box {
    background: #ffffff;
    border-radius: 10rpx 10rpx 0 0;
    position: relative;
    height: 120rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    /* 底部安全区域 */
    padding-bottom: constant(safe-area-inset-bottom);
    /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom);
    /* 兼容 iOS >= 11.2 */
}

.tabbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 175rpx;
    height: 100%;
}

.tabbar-item .icon {
    transition: 0.5s all;
    position: relative;
    z-index: 9;
    width: 50rpx;
    height: 50rpx;
}

.tabbar-item text {
    position: absolute;
    font-size: 26rpx;
    font-weight: bold;
    color: #222;
    transition: 0.5s all;
    opacity: 0;
    transform: translateY(50rpx);
}

.tabbar-item.active .icon {
    transform: translateY(-60rpx);
}

.tabbar-item.active text {
    opacity: 1;
    transform: translateY(22rpx);
}

.active-tabbar-box {
    box-sizing: border-box;
    position: absolute;
    width: 120rpx;
    height: 120rpx;
    background: #fff;
    --left-pad: calc(750rpx - (4 * 175rpx));
    left: calc((var(--left-pad) / 2) + (175rpx / 2) - (120rpx / 2));
    top: calc(-50% + constant(safe-area-inset-bottom) / 2);
    top: calc(-50% + env(safe-area-inset-bottom) / 2);
    border-radius: 50%;
    border: 10rpx solid #eee;
    transition: 0.5s all;
}

.active-tabbar-box::before,
.active-tabbar-box::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 30rpx;
    height: 30rpx;
    background: transparent;
}

/* 间隙 */
.active-tabbar-box::before {
    left: -33rpx;
    border-radius: 0 30rpx 0 0;
    box-shadow: 0 -15rpx 0 0 #eee;
}

.active-tabbar-box::after {
    right: -33rpx;
    border-radius: 30rpx 0 0 0;
    box-shadow: 0 -15rpx 0 0 #eee;
}

.active-tabbar-box {
    transform: translateX(calc(175rpx * var(--n)));
}
</style>