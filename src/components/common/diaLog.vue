<!-- dialog组件封装 -->
<template>
    <el-dialog class="app-dialog" :title="title" :visible.sync="showDialogVisible" :width="width"
        :before-close="dialogClose" :top="top" :close-on-click-modal="closeModal" :lock-scroll="lockScroll"
        v-bind="$attrs" v-on="$listeners">

        <!-- Dialog 标题, 可通过具名 slot 传入 -->
        <template #title>
            <slot name="title"></slot>
        </template>

        <!-- Dialog 中间内容部分 -->
        <div class="app-dialog-container">
            <slot name="dialog-container"></slot>
        </div>

        <!-- Dialog 底部按钮部分 -->
        <div v-show="showButton" class="t-right app-dialog-button">
            <slot name="dialog-button">
                <el-button type="primary" size="medium" :disabled="disabled" @click="handleSave" v-loading="isLoading"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,0.6)">{{ saveText
                    }}</el-button>
                <el-button size="medium" :disabled="disabled" @click="handleCancel">{{cancelText}}</el-button>
            </slot>
        </div>

    </el-dialog>
</template>

<script>
    export default {
        name: "Dialog",
        props: {
            visible: {
                // 控制是否显示 Dialog
                type: Boolean,
                required: true,
                default: false,
            },
            title: {
                // Dialog 标题
                type: String,
                default: "",
            },
            width: {
                // Dialog 宽度
                type: String,
                default: "60rem",
            },
            top: {
                // Dialog 中 margin-top 值
                type: String,
                default: "40vh",
            },
            showButton: {
                // v-show 是否显示按钮
                type: Boolean,
                default: true,
            },
            disabled: {
                // disabled 是否禁用按钮
                type: Boolean,
                default: false,
            },
            saveText: {
                type: String,
                default: "确定",
            },
            cancelText: {
                type: String,
                default: "取消",
            },
            lockScroll: {
                // 是否在 Dialog 出现时将 body 滚动锁定
                type: Boolean,
                default: true,
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
            closeModal: {
                // 是否可以通过点击 modal 关闭 Dialog
                type: Boolean,
                default: false
            },
        },
        computed: {
            showDialogVisible: {
                get() {
                    return this.visible;
                },
                set(val) {
                    this.$emit("update:visible", val);
                },
            },
        },
        methods: {
            dialogClose() {
                // 点击右上角X的时候触发
                this.$emit("dialogClose", true);
            },
            handleSave() {
                // 点击确定的时候触发
                this.$emit("handleSave");
            },
            handleCancel() {

                // 点击取消的时候触发
                this.$emit("handleCancel");
            },
        },
    };
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }

    ::v-deep {
        .el-dialog {
            margin: 0 auto;
            border-radius: 8px;

            .el-dialog__header {
                background-color: #f2f2f2;
                /* padding: 10px 20px 10px 20px; */
                border-radius: 8px;
            }

            .el-dialog__body {
                padding: 5px 10px;
            }

            .el-loading-spinner {
                line-height: 40px;
            }
        }
    }

    .t-right {
        text-align: right;
        padding: 5px 10px;
    }

    .app-dialog-container {
        padding: 15px 20px;
    }
</style>