<template>
    <div>
        <div style="display: flex;align-items: center;margin: 10px 0 20px 0;">
            <div>
                <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
            </div>

            <div style="margin-left: 10px;display: flex;">
                <t-input placeholder="请输入物料名称" v-model="SearchName" style="width: 200px;" />
                <t-button @click="search" style="display: flex;align-items: center;"><search-icon slot="icon"/><span>搜索</span></t-button>
            </div>
        </div>
        <div style="margin-bottom: 20px;display: flex;justify-content: space-between;padding-right: 20px;">
            <div>
                <t-button style="margin-right: 15px;" @click="openAdd"><add-icon slot="icon"/>入库</t-button>
                <t-dropdown
                    :options="[{ content: '吨', value: 1 }, { content: '千克', value: 2 }, { content: '斤', value: 3 }]"
                    @click="handleClick">
                    <t-button style="padding: 5px;" variant="outline">选择单位</t-button>
                </t-dropdown>
            </div>
            <t-button @click="reset">刷新数据</t-button>
        </div>


        <div>
            <t-table rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered" :hover="hover"
                :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :showHeader="showHeader"
                cellEmptyContent="-" resizable>
                <template #name="{ row }">
                    <t-tag theme="success">{{ row.name }}</t-tag>
                </template>
                <template #num="{ row }">
                    {{ unitsValue == 1 ? row.num / 1000 : unitsValue == 2 ? row.num : row.num * 2000 }}
                    {{ unitsValue == 1 ? '吨' : unitsValue == 2 ? '千克' : '斤' }}

                </template>
                <template #specifications="{ row }">

                    <span style="font-size: 17px;font-weight: 600;color: green;">{{ row.specifications }}</span>千克

                </template>
                <template #number="{ row }">

                    <span style="font-size: 17px;font-weight: 600;color: royalblue;">{{ row.number }}</span>袋

                </template>
                <template #price="{ row }">

                    <!-- {{ row.price ? row.price + '元' : '' }} -->
                    <span style="font-size: 17px;font-weight: 600;color: red;">{{ row.price }}</span>元
                </template>


                <template #time="{ row }">
                    {{ new Date(row.time).toLocaleString().replaceAll('/', '-') }}
                </template>

                <template #uptime="{ row }">
                    {{ row.uptime ? new Date(row.uptime).toLocaleString().replaceAll('/', '-') : '' }}
                </template>




                <template #caozuo="{ row }">
                    <div
                        style="display: flex;justify-content: space-around;box-sizing: border-box;align-items: center;">

                        <t-button size="small" @click="handleEdit(row)">编辑</t-button>

                        <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)">删除</t-button>

                    </div>
                </template>
            </t-table>

            <t-pagination v-model="page" style="margin-top: 20px;padding: 0 30px;" :total="total" showPageNumber
                showPageSize page-ellipsis-mode="both-ends" showPreviousAndNextBtn :page-size.sync="pageSize"
                totalContent @change="getlist" />
        </div>


        <add :addvisible.sync="addvisible" :rowList="rowList" @getlist="getlist"></add>


    </div>
</template>
<script>
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
import { AddIcon, CloudUploadIcon, SearchIcon, DiscountIcon, CloudDownloadIcon,DeleteIcon ,EditIcon ,searchIcon} from 'tdesign-icons-vue';
import { Icon } from 'tdesign-icons-vue';
import add from "./compoent/add.vue"
import http from '../../utils/http.js';
import { MessagePlugin } from 'tdesign-vue';
export default {
    components: {
        add,
        Icon,
        AddIcon,
        CloudUploadIcon,
        DiscountIcon,
        CloudDownloadIcon,
        DeleteIcon,
        EditIcon,
        searchIcon
    },
    data() {
        return {
            delFlag: false,
            addvisible: false,
            SearchName:'',
            data: [],
            unitsValue: 2,
            size: 'small',
            tableLayout: true,
            stripe: true,
            bordered: true,
            hover: false,
            showHeader: true,
            columns: [
                { colKey: 'serial-number', width: 55, title: '序号', align: 'center' },
                { colKey: 'stash_label', title: '仓库名称', align: 'center' },
                { colKey: 'name', title: '物料名称', align: 'center' },
                { colKey: 'pinpai', title: '品牌', align: 'center' },
                { colKey: 'specifications', title: '产品规格(每袋)', align: 'center' },
                { colKey: 'number', title: '入库总袋数' },
                { colKey: 'num', title: '入库总重量' },
                { colKey: 'price', title: '总金额', ellipsis: true },
                { colKey: 'card', title: '运送车辆（车牌号）', ellipsis: true, align: 'center' },
                { colKey: 'time', title: '入库时间', width: 180, align: 'center' },
                // { colKey: 'uptime', title: '修改时间', width: 180, align: 'center' },
                { colKey: 'caozuo', title: '操作', width: 160, align: 'center' },
            ],
            pageSize: 10,
            page: 1,
            total: 0,
            searchName: '',
            rowList: {},
            searchTime: [],
        }

    },
    created() {
        this.getlist()

    },
    methods: {
        getlist() {
            http.get('/warehousing/getwarehousing', { params: { page: this.page, pageSize: this.pageSize, search: this.searchName } }).then(res => {
                console.log(res);
                this.data = res.data.data
                this.total = res.data.total
            })
        },
        onPick(value, context) {
            console.log('onPick:', value, context);
        },
        onChange(value, context) {
            console.log('onChange:', value, context);
            let time = context.dayjsValue.map((d) => d.valueOf())
            console.log(time);
            this.searchTime = time
        },
        reset() {
            this.getlist()
            // new Date().toLocaleString
        },


        handleClick(e) {
            this.unitsValue = e.value
            console.log(e);
            // e.value == 1 ? this.units=e.content : e.value == 2 ? this.$message.success('千克') : this.$message.success('斤')
        },


        openAdd() {
            this.rowList = {}
            this.addvisible = true
        },

        search() {
            // this.getlist()
            console.log(this.searchTime);
            console.log(this.searchName);
            let search = { sta: this.searchTime[0], end: this.searchTime[1], name: this.searchName }
            http.post('/warehousing/searchwarehousing', { data: search }).then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    this.data = res.data.data
                    this.total = res.data.data.length
                }
            })

        },

        handleEdit(row) {
            this.rowList = row
            this.addvisible = true
        },

        handleDelete(row) {
            this.$confirm('此操作将永久删除此条数据并且还原仓库数据并更新库存数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                console.log(row);
                http.get("/warehousing/deletewarehousing", { params: { id: row.id } }).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.getlist()
                        MessagePlugin('success', '成功删除')
                    }else{
                        MessagePlugin('error', res.data.message)
                    }
                })
            }).catch(() => {
                MessagePlugin.info('取消删除')
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.t-table__body .t-tag span {
    display: inline-flex;
    align-items: center;
}
</style>