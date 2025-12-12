<template>
    <div>
        <div style="margin: 20px;">
            <t-button @click="editUser(false)">添加</t-button>
        </div>

        <t-table row-key="id" :data="data" :columns="columns" lazyLoad bordered horizontalScrollAffixedBottom hover
            stripe>
            <template #nickname="{ row }">
                <t-link theme="primary">{{ row.nickname }}</t-link>
            </template>
            <template #denger="{ row }">
                <t-tag theme="success" v-if="row.denger == 0">男</t-tag>
                <t-tag theme="warning" v-else>女</t-tag>
            </template>
            <!-- <template #realname="{ row }">
                <t-tag theme="primary">{{ row.realname }}</t-tag>
            </template> -->
            <template #caozuo="{ row }">
                <t-button theme="success" size="small" @click="editUser(row)">修改</t-button>
                <t-button theme="danger" size="small" style="margin: 0 10px;" @click="deleteUser(row)">删除</t-button>
                <t-button theme="warning" size="small" @click="resetPard(row)">重置密码</t-button>
            </template>
        </t-table>

        <el-dialog :title="form.id ? '修改用户' : '添加用户'" :visible.sync="dialogVisibleEdit" width="50%" @close="dialogClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" v-if="!form.id">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.denger">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="分配角色">
                    <el-select v-model="form.roleId" placeholder="请选择要分配的角色">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleSub">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import http from "@/utils/http"
import { dic } from "@/utils/dic"
export default {
    data() {
        return {
            data: [],
            columns: [
                { colKey: 'serial-number', width: 70, title: '序号', align: 'center' },
                { colKey: 'username', title: '用户账号', align: 'center' },
                { colKey: 'nickname', title: '用户姓名', align: 'center' },
                { colKey: 'denger', width: 120, title: '性别', align: 'center' },
                { colKey: 'phone', width: 200, title: '手机号', align: 'center' },
                { colKey: 'caozuo', width: 200, title: '操作', align: 'center' },
            ],
            form: {
                username: '',
                password: '',
                phone: '',
                nickname: '',
                denger: 0,

            },
            dialogVisibleEdit: false,
            roleList: []
        }
    },
    created() {
        this.getlist()
        dic("gender_type").then(res => {
            console.log(res);
        })
    },
    methods: {
        async getlist() {
            Promise.all([await http.get("/users/users"), await http.get("/role/search")]).then(res => {
                this.data = res[0].data.data
                this.roleList = res[1].data.data
            }).catch(err => {
                console.log(err);
            })
        },
        // 添加与编辑用户
        editUser(row) {
            if (row) {
                this.form = { ...row, roleId: row.new_role_id }
            }
            this.dialogVisibleEdit = true
        },
        // 添加与编辑用户
        handleSub() {
            console.log(this.form);
            http.post("/users/addUsers", this.form).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    this.$message.success(res.data.message)
                    this.dialogVisibleEdit = false
                    this.getlist()
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        // 删除用户
        deleteUser(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await http.get("/users/deleteUser", { params: { id: row.id } })
                this.getlist()
                this.$message.success(data.data.message);
            }).catch(() => {
                this.$message.warning('已取消删除');
            });

        },
        // 重置密码
        resetPard(row) {
            this.$confirm('确定要重置密码吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await http.get("/users/resetPard", { params: { id: row.id } })
                this.getlist()
                this.$message.success(data.data.message);
            }).catch(() => {
                this.$message.warning('已取消');
            });
        },
        dialogClose() {
            this.form = {
                username: '',
                password: '',
                phone: '',
                nickname: '',
                denger: 0,
            }
        },
    }
}
</script>
<style lang="scss" scoped></style>