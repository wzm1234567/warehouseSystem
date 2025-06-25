<template>
    <div>
        <div style="margin: 20px;"><t-button>添加</t-button> <t-button theme="danger">删除</t-button></div>

        <t-table row-key="id" :data="data" :columns="columns" lazyLoad bordered horizontalScrollAffixedBottom hover
            stripe>
            <template #nickname="{ row }">
                <t-link theme="primary">{{ row.nickname }}</t-link>
            </template>
            <template #denger="{ row }">
                <t-tag theme="success" v-if="row.denger == 0">男</t-tag>
                <t-tag theme="warning" v-else>女</t-tag>
            </template>
            <template #realname="{ row }">
                <t-tag theme="primary">{{ row.realname }}</t-tag>
            </template>
            <template #caozuo="{ row }">
                <t-button theme="success" size="small">修改</t-button>
                <t-button theme="danger" size="small" style="margin: 0 10px;">删除</t-button>
                <t-button theme="warning" size="small">重置密码</t-button>
            </template>
        </t-table>
    </div>
</template>
<script>
import http from "@/utils/http"
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
                { colKey: 'realname', width: 200, title: '角色', align: 'center' },
                { colKey: 'caozuo', width: 200, title: '操作', align: 'center' },
            ]
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        getlist() {
            http.get("/users/users").then(res => {
                console.log(res);
                this.data = res.data.data
            })
        }
    }
}
</script>
<style lang="scss" scoped></style>