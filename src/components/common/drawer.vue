<template>
    <div>
        <el-drawer :title="title" :visible="visible" :direction="direction" :before-close="handleClose"
            :with-header="header" :modal="modal" :size="size" :wrapperClosable="wrapperClosable">
            <template #title>
                <slot name="title"></slot>
            </template>
            <div>
                <slot name="content"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                // 标题
                type: String,
                default: '我是标题'
            },
            visible: {
                // 显示与隐藏
                type: Boolean,
                default: false
            },
            direction: {
                // 显示方向
                type: String,
                default: 'rtl'
            },
            header: {
                // 是否显示标题
                type: Boolean,
                default: true
            },
            modal: {
                // 是否显示遮罩
                type: Boolean,
                default: true
            },
            size: {
                // 窗体宽度
                type: String,
                default: '30%'
            },
            wrapperClosable: {
                // 点击遮罩是否关闭
                type: Boolean,
                default: true
            }

        },
        data() {
            return {

            }
        },
        methods: {
            handleClose() {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit('update:visible', false)
                        done();
                    })
                    .catch(_ => { });
            }
        },
    }
</script>
<style lang="scss" scoped>
    .footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: right;
        padding: 7px 10px;
        background-color: #f2f2f2;
    }
</style>