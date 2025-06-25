<template>
    <div>
        <div style="display: flex;align-items: center;margin: 10px 0 20px 0;">
            <div>
                <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
            </div>
            <div style="margin-left: 10px;display: flex;">
                <t-input placeholder="请输入收货人名称" v-model="searchName" style="width: 200px;" />
                <t-button @click="search">搜索</t-button>
            </div>
        </div>
        <div style="margin-bottom: 20px;display: flex;justify-content: space-between;padding-right: 20px;">
            <div>
                <t-button style="margin-right: 15px;" @click="openAdd">出库</t-button>
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

                <template #song_ling="{ row }">
                    {{['运送','零售'][row.song_ling]}}
                </template>
                <!-- <template #specifications="{ row }">

                    {{row.specifications * 1000}}千克

                </template> -->


                <template #time="{ row }">
                    {{new Date(row.time).toLocaleString().replaceAll('/', '-')}}
                </template>




                <template #caozuo="{ row }">
                    <div
                        style="display: flex;justify-content: space-around;box-sizing: border-box;align-items: center;">


                        <t-button size="small" @click="handleInfo(row)">出库详情</t-button>

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


        <t-dialog
      theme="info"
      header="选择出库方式"
        :confirmBtn="null"
      :visible.sync="visible1"
      @confirm="onConfirm"
      :onClose="close1"
      :cancelBtn="null"
    >
        <div style="display: flex;justify-content: space-around;padding: 0 80px;margin-top: 15px;">
            <t-button theme="warning" size="large" @click="openlingshou">零售</t-button>
            <t-button theme="success" size="large">运送</t-button>
        </div>
</t-dialog>
        
        <dialogs :visibleinfo.sync="visibleinfo" :row="row"></dialogs>
        <add-dialog :addvisible.sync="addvisible"></add-dialog>

    </div>
</template>
<script>
    // import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
    import dialogs from "./component/dialog.vue"
    import addDialog from "./component/addDiaLog.vue"
    import http from '../../utils/http.js';
    export default {
        components: {
            dialogs,
            addDialog
        },
        data() {
            return {
                row:{},
                visibleinfo: false,
                addvisible:false,
                visible1:false,
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
                    { colKey: 'consignee_name', title: '收货人', width: '100' },
                    { colKey: 'consignee_phone', title: '收货人手机号', width: '150', },
                    { colKey: 'consignee_address', title: '收货人地址' },
                    { colKey: 'song_ling', title: '零售/运送' },
                    { colKey: 'time', title: '出库时间' },
                    { colKey: 'caozuo', title: '操作' },
                ],
                pageSize: 10,
                page: 1,
                total: 0,
                searchName: ''
            }

        },
        created() {
            this.getlist()

        },
        methods: {
            getlist() {
                http.get('/issue/getissue', { params: { page: this.page, pageSize: this.pageSize, search: this.searchName } }).then(res => {
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
                this.visible1 = true
                
            },

            search() {
                this.getlist()
            },
            openlingshou(){
this.addvisible = true
            },
            handleInfo(row){
                console.log(row);
                this.row = row
                this.visibleinfo = true
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