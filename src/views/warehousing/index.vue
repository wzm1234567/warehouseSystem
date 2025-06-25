<template>
    <div>
        <div style="display: flex;align-items: center;margin: 10px 0 20px 0;">
            <div>
                <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
            </div>
            <div style="margin-left: 10px;display: flex;">
                <t-input placeholder="请输入物料名称" v-model="searchName" style="width: 200px;" />
                <t-button @click="search">搜索</t-button>
            </div>
        </div>
        <div style="margin-bottom: 20px;display: flex;justify-content: space-between;padding-right: 20px;">
            <div>
                <t-button style="margin-right: 15px;" @click="openAdd">入库</t-button>
                <t-dropdown
                    :options="[{ content: '吨', value: 1 },{ content: '千克', value: 2 },{ content: '斤', value: 3 }]"
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

                <template #num="{ row }">
                    {{unitsValue == 1 ? row.num : unitsValue == 2 ? row.num*1000 : row.num *1000 *2}}
                    {{unitsValue == 1 ? '吨' : unitsValue == 2 ? '千克' : '斤' }}

                </template>
                <template #specifications="{ row }">

                    {{row.specifications * 1000}}千克

                </template>


                <template #time="{ row }">
                    {{new Date(row.time).toLocaleString().replaceAll('/', '-')}}
                </template>




                <template #caozuo="{ row }">
                    <div
                        style="display: flex;justify-content: space-around;box-sizing: border-box;align-items: center;">

                        <t-button size="small" @click="handleEdit(row)">编辑</t-button>

                        <t-popconfirm placement="left" theme="danger" destroyOnClose showArrow :visible="false"
                            content="确认删除吗">
                            <t-button theme="danger" variant="base" size="small"
                                @click="handleDelete(row)">删除</t-button>
                        </t-popconfirm>
                    </div>
                </template>
            </t-table>

            <t-pagination v-model="page" style="margin-top: 20px;padding: 0 30px;" :total="total" showPageNumber
                showPageSize page-ellipsis-mode="both-ends" showPreviousAndNextBtn :page-size.sync="pageSize"
                totalContent @change="getlist" />
        </div>




        <add :addvisible.sync="addvisible" @getlist="getlist"></add>


    </div>
</template>
<script>
    import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
    import add from "./compoent/add.vue"
    import http from '../../utils/http.js';
    export default {
        components: {
            add
        },
        data() {
            return {
                addvisible: false,
                data: [],
                unitsValue: 1,
                size: 'small',
                tableLayout: true,
                stripe: true,
                bordered: true,
                hover: false,
                showHeader: true,
                columns: [
                    { colKey: 'serial-number', width: 60, title: '序号' },
                    { colKey: 'name', title: '物料名称', width: '100' },
                    { colKey: 'pinpai', title: '品牌', width: '150', },
                    { colKey: 'num', title: '入库重量' },
                    { colKey: 'specifications', title: '产品规格' },
                    { colKey: 'number', title: '入库总袋数' },
                    { colKey: 'card', title: '运送车辆（车牌号）', ellipsis: true },
                    { colKey: 'time', title: '入库时间' },
                    { colKey: 'caozuo', title: '操作' },
                ],
                pageSize: 10,
                page: 1,
                total: 0,
                searchName:''
            }

        },
        created() {
            this.getlist()

        },
        methods: {
            getlist() {
                http.get('/warehousing/getwarehousing', { params: { page: this.page, pageSize: this.pageSize, search:this.searchName } }).then(res => {
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

                if (value.length == 0) return this.getlist()

                http.post('/warehousing/searchwarehousing', {
                    date: value
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.data = res.data.data
                        this.total = res.data.data.length
                    }
                })
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
                this.addvisible = true
            },

            search(){
               this.getlist()
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