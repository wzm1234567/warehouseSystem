<template>
    <div>
        <div style="margin-bottom: 20px;">
            <el-button type="primary" size="small" @click="editRole(false)">添加</el-button>
        </div>
        <!-- 表格 -->
        <MyTable :tableData="tableData" :config="roleConfig" :border="true">
            <template #action="{ row }">
                <el-button type="primary" size="mini" @click="addRole(row)">赋权</el-button>
                <el-button type="warning" size="mini" @click="editRole(row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteRole(row)">删除</el-button>
            </template>
        </MyTable>
        <!-- 弹窗 权限 -->
        <el-dialog title="权限" :visible.sync="dialogVisibleRole" width="30%">
            <el-tree ref="treeRole" :props="{ label: 'title' }" :data="treeData" :default-checked-keys="defaultChecked"
                node-key="id" show-checkbox>
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRole = false">取 消</el-button>
                <el-button type="primary" @click="roleSub">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="form.id ? '编辑' : '添加'" :visible.sync="dialogVisibleEdit" width="60%">
            <el-form :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色编码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input type="textarea" v-model="form.note"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { grantMap } from './enum'
export default {
    data() {
        return {
            tableData: [],
            roleConfig: grantMap.roleConfig,
            dialogVisibleRole: false,
            dialogVisibleEdit: false,
            defaultChecked: [],
            treeData: [],
            roleId: 0,
            form: {
                name: '',
                code: '',
                note: ''
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        // 调接口 获取表数据
        getData() {
            this.$http.get("/role/search").then(res => {
                console.log(res);
                this.tableData = res.data.data
            })
        },
        // 角色赋权限
        async addRole(row) {
            this.roleId = row.id
            this.defaultChecked.splice(0)
            let data = await this.$http.get("/admin/menuList")
            console.log(data);
            this.treeData = data.data.data
            let data1 = await this.$http.get("/role/menuListkey", { params: { roleId: row.id } })
            console.log(data1);
            this.defaultChecked = data1.data.data
            this.dialogVisibleRole = true
        },
        // 权限提交
        async roleSub() {
            let data = await this.$http.post("/role/addrolemenu", { roleId: this.roleId, menuIds: this.$refs.treeRole.getCheckedKeys() })
            if (data.data.code === 0) {
                this.$message.success(data.data.message)
                this.dialogVisibleRole = false
            } else {
                this.$message.error(data.data.message)
                this.dialogVisibleRole = false
            }
        },
        // 编辑角色
        editRole(row) {
            if (row) this.form = row
            this.dialogVisibleEdit = true
        },
        // 提交编辑与新增
        async handleEdit() {
            console.log(this.form);
            let data = await this.$http.post("/role/addrole", this.form)
            console.log(data);
            if (data.data.code === 0) {
                this.$message.success(data.data.message)
                this.form = { name: '', code: '', note: '' }
                this.dialogVisibleEdit = false
                this.getData()
            } else {
                this.$message.error(data.data.message)
            }
        },
        // 删除角色
        deleteRole(row) {
            this.$confirm('此操作将永久删除此角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await this.$http.get("/role/deleterole", { params: { id: row.id } })
                if (data.data.code === 0) {
                    this.$message.success("删除成功")
                    this.getData()
                }
            }).catch(() => {
                this.$message.info("已取消删除")
            });
        }
    }
}
</script>