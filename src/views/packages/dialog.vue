<template>
    <div class="su-submit">
        <!-- 选择 -->
        <div class="user-group-box">
            <h3>选择</h3>
            <div class="user-groups">
                <el-button type="primary" plain size="small" @click="openUserAlert">添加</el-button>
                <el-button type="danger" plain size="small" @click="userGroupDelete">删除</el-button>
            </div>
            <!-- 添加 Dialog -->
            <public-dialog :title="userTitle" :visible="dialogVisible" :closeModal="closeModal" :width="userWidth"
                top="10vh" @dialogClose="dialogClose" @handleSave="dialogSave" @handleCancel="dialogCancel">
                <!-- Dialog 标题, 可通过具名 slot 传入 -->

                <template v-slot:title>
                    <!-- 新建 -->
                    <!-- 使用插槽的方式 -->
                    <div style="font-size: 20px;font-weight: 400;display: flex;align-items: center;color: #363739;">
                        新增66
                    </div>

                </template>

                <template #dialog-container>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>

                </template>
            </public-dialog>
        </div>
    </div>
</template>

<script>
    import publicDialog from "@/components/common/diaLog.vue";
    export default {
        components: {
            publicDialog, // 公共弹框组件
        },
        data() {
            return {
                userTitle: "新建", // Dialog 的标题
                dialogVisible: false, // 控制添加的 Dialog 显示
                userWidth: "60%", // Dialog 的宽度
                closeModal: true, //是否点击模态框关闭Dialog

                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },
        methods: {
            dialogClose() {
                // 右上角关闭按钮
                this.$confirm("确认关闭?")
                    .then((_) => {
                        this.dialogVisible = false;
                    })
                    .catch((_) => { });
            },
            dialogCancel() {
                // 取消保存
                this.dialogVisible = false;
            },

            dialogSave() {
                // 确定
                this.dialogVisible = false;
            },


            openUserAlert() {
                this.dialogVisible = true;
                // this.userTitle = "新建";
            }
        },
    };
</script>