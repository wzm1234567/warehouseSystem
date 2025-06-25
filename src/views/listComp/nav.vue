<template>
    <div class="tabs">
        <ul>
            <li v-for="(item, index) in tabList" :key="index" @click="tab = item.value">{{ item.label }} <div
                    v-show="item.value === tab"></div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tab: 1,
            tabList: [
                {
                    label: '首页',
                    value: 1,
                },
                {
                    label: '关于我们',
                    value: 2,
                },
                {
                    label: '学会动态',
                    value: 3,
                },
                {
                    label: '工作通知',
                    value: 4,
                },
                {
                    label: '学术与交流',
                    value: 5,
                },
                {
                    label: '政策法规',
                    value: 6,
                },
                {
                    label: '学会会刊',
                    value: 7,
                },
                {
                    label: '入会申请',
                    value: 8,
                },
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.tabs {
    display: flex;
    width: 100vw;
    background-color: #0e4ca2;

    ul {
        display: flex;
        // background-color: #a00e0e;
        width: 80%;
        margin: auto;
        justify-content: space-around;

        li {
            height: 60px;
            line-height: 60px;
            padding: 0 15px;
            cursor: pointer;
            font-weight: 600;
            font-size: 20px;
            color: #fff;
            position: relative;

            div {
                height: 4px;
                background-color: #ffffff;
                z-index: 99;
                position: absolute;
                bottom: 0px;
                width: 60%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
}
</style>