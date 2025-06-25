<template>
    <div>
        <el-button @click="open">打开抽屉</el-button>
        <public-drawer :visible.sync="visible" title="添加">

            <template v-slot:title>

            </template>

            <template v-slot:content>
                <div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div>
                    <el-button type="primary" @click="submit">提交</el-button>
                </div>
            </template>

            <template v-slot:footer>
                <div>
                    <el-button @click="closed">关 闭</el-button>
                </div>
            </template>
        </public-drawer>
    </div>
</template>
<script>
    import publicDrawer from "@/components/common/drawer.vue"
    export default {
        components: {
            publicDrawer
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            open() {
                this.visible = true
            },
            closed() {
                this.visible = false
            }
        },
    }
</script>
<style lang="scss" scoped>

</style>