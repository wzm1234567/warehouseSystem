<template>
    <div>
        <div style="margin: 10px; display: flex">
            <t-input placeholder="请输入客户名称进行搜索" v-model="searchName" @change="search" style="width: 200px" />
            <t-button @click="search">搜索</t-button>
        </div>

        <t-button style="margin: 15px" @click="addClient"><add-icon slot="icon" />新增客户</t-button>

        <t-table rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered" :hover="hover"
            :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :showHeader="showHeader" cellEmptyContent="-"
            resizable>
            <template #name="{ row }">
                <t-link theme="success">{{ row.name }}</t-link>
            </template>
            <template #phone="{ row }">
                <span style="letter-spacing: 0.5px; font-size: 17px">{{
                    row.phone
                    }}</span>
            </template>
            <template #address="{ row }">
                <t-link theme="primary">{{ row.address }}</t-link>
            </template>
            <template #order_time="{ row }">
                <span v-if="row.order_time == null" style="color: brown">暂时没有订货时间</span>
                <span v-else style="color: blue">{{
                    new Date(row.order_time).toLocaleString().replaceAll("/", "-")
                    }}</span>
            </template>

            <template #time="{ row }">
                {{ new Date(row.time).toLocaleString().replaceAll("/", "-") }}
            </template>

            <template #caozuo="{ row }">
                <div style="
            display: flex;
            justify-content: space-around;
            box-sizing: border-box;
            align-items: center;
          ">
                    <t-button size="small" @click="handleInfo(row)">订货详情</t-button>

                    <!-- <t-button size="small" theme="warning" @click="handleEdit(row)"><edit-icon
                            slot="icon" />编辑</t-button> -->

                    <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)"><delete-icon
                            slot="icon" />删除</t-button>
                </div>
            </template>
        </t-table>

        <client-info :clientInfo.sync="clientInfo" :rowInfo="rowInfo"></client-info>
        <add-client :visibleAddClient.sync="visibleAddClient" @getlist="getlist"></add-client>
    </div>
</template>
<script>
import {
    ErrorCircleFilledIcon,
    CheckCircleFilledIcon,
    CloseCircleFilledIcon,
} from "tdesign-icons-vue";
import {
    AddIcon,
    CloudUploadIcon,
    SearchIcon,
    DiscountIcon,
    CloudDownloadIcon,
    DeleteIcon,
    EditIcon,
} from "tdesign-icons-vue";
import http from "../../utils/http.js";
import clientInfo from "./clientComp/clientInfo";
import addClient from "./clientComp/addClient.vue";
export default {
    components: {
        clientInfo,
        addClient,
        AddIcon,
        CloudUploadIcon,
        DiscountIcon,
        CloudDownloadIcon,
        DeleteIcon,
        EditIcon,
    },
    data() {
        return {
            data: [],
            size: "medium",
            tableLayout: false,
            stripe: true,
            bordered: true,
            hover: false,
            showHeader: true,
            columns: [
                { colKey: "serial-number", width: 60, title: "序号", align: "center" },
                { colKey: "name", title: "客户姓名" },
                { colKey: "phone", title: "客户手机号", align: "center" },
                { colKey: "address", title: "客户地址" },
                { colKey: "order_time", title: "最近一次订货时间" },
                { colKey: "time", title: "添加客户的时间" },
                { colKey: "caozuo", title: "操作", align: "center" },
            ],
            searchName: "",
            clientInfo: false, // 详情对话框
            rowInfo: {}, // 详情对话框数据
            visibleAddClient: false, // 添加客户对话框
        };
    },
    created() {
        this.getlist();
    },
    methods: {
        getlist() {
            http.get("/admin/getclient").then((res) => {
                console.log(res);
                this.data = res.data.data;
                console.log(this.data);
            });
        },
        search() {
            http
                .get("/admin/getclient", { params: { name: this.searchName } })
                .then((res) => {
                    console.log(res);
                    this.data = res.data.data;
                    console.log(this.data);
                });
        },
        // 客户详情
        handleInfo(row) {
            this.rowInfo = row;
            this.clientInfo = true;
        },

        // 新增客户 打开新增客户弹窗
        addClient() {
            this.visibleAddClient = true;
        },
        handleDelete(row) {
            this.$confirm(
                "此操作将永久删除该客户信息，但不会删除订单信息，是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    http
                        .get("/admin/deleteClient", { params: { id: row.id } })
                        .then((res) => {
                            console.log(res);
                            if (res.data.code == 0) {
                                this.$message.success("删除成功");
                                this.getlist();
                            }
                        });
                })
                .catch(() => {
                    this.$message.info("取消删除");
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.t-table__body .t-tag span {
    display: inline-flex;
    align-items: center;
}
</style>
