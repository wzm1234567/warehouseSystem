<template>
    <div>
        <div style="padding: 20px;display: flex;justify-content: space-between;">
            <div class="dictLeft">
                <el-button type="primary" size="mini" @click="addDictType">添加</el-button>
                <el-button type="warning" size="mini" @click="editDictType">修改</el-button>
                <el-button type="danger" size="mini" @click="delDictType">删除</el-button>
                <div style="width: 380px;margin-top: 30px;" :border="true">
                    <MyTable :tableData="tableDataLeft" :config="dictConfigLeft" :border="true" :rowClick="rowClick"
                        :rowStyle="rowStyle">
                        <template #type_name="{ row }">
                            <div class="type_name">
                                {{ row.type_name }}
                            </div>
                        </template>
                    </MyTable>
                </div>
            </div>
            <div class="dictRight" style="flex: 0.9;">
                <el-button type="primary" size="mini" @click="addDictItem">添加</el-button>
                <div style="margin-top: 30px;" :border="true">
                    <MyTable :tableData="tableDataRight" :config="dictConfigRight" :border="true">
                        <template #type_name="{ row }">
                            <div class="type_name">
                                {{ row.type_name }}
                            </div>
                        </template>
                        <template #action="{ row }">
                            <el-button type="warning" size="mini" @click="editDictItem(row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteDictItem(row)">删除</el-button>
                        </template>
                    </MyTable>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisibleDict" :title="row.id ? '编辑字典类型' : '添加字典类型'" width="30%">
            <el-form :model="formLeft" label-width="100px">
                <el-form-item label="字典类型名称">
                    <el-input v-model="formLeft.type_name"></el-input>
                </el-form-item>
                <el-form-item label="字典类型值">
                    <el-input v-model="formLeft.type_code"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleDict = false">取 消</el-button>
                <el-button type="primary" @click="handleDictType">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogVisibleItem" :title="formRight.id ? '修改字典项' : '添加字典项'" width="30%">
            <el-form :model="formRight" label-width="100px">
                <el-form-item label="字典项名称">
                    <el-input v-model="formRight.item_name"></el-input>
                </el-form-item>
                <el-form-item label="字典项值">
                    <el-input v-model="formRight.item_code"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleItem = false">取 消</el-button>
                <el-button type="primary" @click="handleDictItem">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { grantMap } from "./enum"
export default {
    name: "dictView",
    data() {
        return {
            tableDataLeft: [],
            tableDataRight: [],
            dictConfigLeft: grantMap.dictConfigLeft,
            dictConfigRight: grantMap.dictConfigRight,
            dialogVisibleDict: false,
            dialogVisibleItem: false,
            formLeft: { type_name: '', type_code: '' },
            formRight: { item_name: '', item_code: '' },
            rowStyleId: 0,
            row: {},
        }
    },
    created() {
        this.getDictType()
    },
    methods: {
        // 获取字典类型
        getDictType() {
            this.$http.get('/dict/getDictType').then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    this.tableDataLeft = res.data.data
                }
            })
        },
        // 获取字典项
        getDictItem() {
            this.$http.get('/dict/getDictItem', { params: { type_id: this.rowStyleId } }).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    this.tableDataRight = res.data.data
                }
            })
        },
        // 添加字典类型
        addDictType() {
            this.formLeft = { type_name: '', type_code: '' }
            this.dialogVisibleDict = true
        },
        // 编辑字典类型
        editDictType() {
            if (this.rowStyleId === 0) return this.$message.error('请选择字典类型')
            Object.assign(this.formLeft, this.row)
            this.dialogVisibleDict = true
        },
        // 添加与编辑字典类型
        handleDictType() {
            console.log(this.formLeft);
            this.$http.post('/dict/addDictType', this.formLeft).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    this.$message.success(res.data.msg)
                    this.dialogVisibleDict = false
                    this.getDictType()
                }
            })
        },
        // 删除字典类型
        delDictType() {
            if (this.rowStyleId === 0) return this.$message.error('请选择字典类型')
            this.$confirm('此操作将永久删除该字典类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await this.$http.get('/dict/deleteDictType', { params: { id: this.rowStyleId } })
                this.$message.success(data.data.msg)
                this.rowStyleId = 0
                this.getDictType()
            }).catch(() => {
                this.$message.error('已取消删除')
            });
        },
        // 点击表行的事件
        rowClick(row) {
            console.log(row);
            this.rowStyleId = row.id
            this.row = row
            this.getDictItem()
        },
        // 表格行样式 
        rowStyle(row) {
            if (this.rowStyleId === row.row.id) return { 'backgroundColor': '#e0faff' }
        },
        // 添加字典项
        addDictItem() {
            if (this.rowStyleId === 0) return this.$message.error('请选择字典类型')
            this.dialogVisibleItem = true
            this.formRight = { item_name: '', item_code: '' }
        },
        // 编辑字典项
        editDictItem(row) {
            Object.assign(this.formRight, row)
            this.dialogVisibleItem = true
        },
        // 添加与修改 字典项
        handleDictItem() {
            this.$http.post('/dict/addDictItem', { ...this.formRight, type_id: this.rowStyleId }).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    this.$message.success(res.data.msg)
                    this.dialogVisibleItem = false
                    this.getDictItem()
                }
            })
        },
        // 删除字典项
        deleteDictItem(row) {
            this.$confirm('此操作将永久删除该字典项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await this.$http.get('/dict/deleteDictItem', { params: { id: row.id } })
                this.$message.success(data.data.msg)
                this.getDictItem()
            }).catch(() => {
                this.$message.error('已取消删除')
            });
        },
    }
}
</script>
<style scoped>
.type_name {
    width: 100%;
    position: relative;
    cursor: pointer;
    /* background-color: #4e83d2; */
}

.type_name::after {
    content: '\e6e0';
    font-family: element-icons !important;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-45%);
}
</style>