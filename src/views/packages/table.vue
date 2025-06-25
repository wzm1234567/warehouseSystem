<template>
    <div>
        <!-- Table 表格 -->
        <public-table :loading="formData.loading" :tableList="formData.tableList" :headerList="formData.headerList"
            :height="height" :showNumber="true" :showCheckBox="true">
            <!-- 模板图片插槽 -->
            <template #templateImg>
                <div>
                    <img src="" alt="" />
                </div>
            </template>

            <!-- 事项操作插槽 -->
            <template #matterOperation="row">
                <div class="btn-group">
                    <el-tooltip content="设计">
                        <el-button size="small" icon="el-icon-edit-outline" @click="rowEditHandle(row.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="收集">
                        <el-button size="small" icon="el-icon-edit-round"></el-button>
                    </el-tooltip>
                </div>
            </template>

            <!-- 场景操作插槽 -->
            <template #sceneOperation>
                <div>
                    <el-button type="primary" size="mini" @click="rowEditHandle(row)">设计</el-button>
                    <el-button type="primary" size="mini" @click="rowEditHandle(row)">收集</el-button>
                </div>
            </template>

        </public-table>
    </div>
</template>

<script>
    import publicTable from "@/components/common/table.vue";
    import http from "../../utils/http.js";
    export default {
        components: {
            publicTable, // 公共表格组件
        },
        data() {
            return {
                formData: {
                    tableList: [], // 后端返回的列表数据
                    showNumber: false, // 是否显示序号
                    headerList: [
                        {
                            props: "name",
                            label: "物料名称"
                        },
                        {
                            props: "pinpai",
                            label: "品牌"
                        },
                        {
                            props: "num",
                            label: "入库重量"
                        },
                        {
                            props: "specifications",
                            label: "产品规格"
                        },
                        {
                            props: "number",
                            label: "入库总袋数"
                        },
                        {
                            props: "card",
                            label: "运送车辆"
                        },
                        {
                            props: "time",
                            label: "入库时间"
                        },

                    ], // 列表表头数据
                    loading: false, // Loading 加载
                },
                height: 600,
                pageSize: 10,
                page: 1,
                total: 0,
            };
        },
        created() {
            this.getlist();
        },
        methods: {

            rowEditHandle(row) {
                // 设计
                console.log(row, "SCOPE");
            },

            getlist() {
                http.get('/warehousing/getwarehousing', { params: { page: this.page, pageSize: this.pageSize } }).then(res => {
                    console.log(res);


                    this.formData.tableList = res.data.data
                    this.total = res.data.total
                    console.log(this.formData.tableList);
                })
            },

        },
    };
</script>