<template>
    <div>
        <div style="display: flex;align-items: center;margin: 10px 0 20px 0;">
            <div>

                <t-date-picker mode="month" clearable allow-input @change="onChange" />
            </div>
            <div style="margin-left: 10px;">
                <!-- <t-button>搜索</t-button> -->
            </div>
        </div>
        <div style="margin-bottom: 20px;display: flex;justify-content: space-between;padding-right: 20px;">
            <div>
                <!-- <t-button style="margin-right: 15px;">入库</t-button> -->
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

                <!-- <template #ruku_day="{ row }">
                    {{unitsValue == 1 ? row.ruku_day : unitsValue == 2 ? row.ruku_day*10: row.ruku_day *10 *2}}
                    {{unitsValue == 1 ? '吨' : unitsValue == 2 ? '千克' : '斤' }}

                </template>


                <template #chuku_day="{ row }">
                    {{unitsValue == 1 ? row.chuku_day : unitsValue == 2 ? row.chuku_day*10: row.chuku_day *10 *2}}
                    {{unitsValue == 1 ? '吨' : unitsValue == 2 ? '千克' : '斤' }}

                </template> -->

                <template #ruku_month="{ row }">
                    {{unitsValue == 1 ? row.ruku_month : unitsValue == 2 ? row.ruku_month*10: row.ruku_month *10 *2}}
                    {{unitsValue == 1 ? '吨' : unitsValue == 2 ? '千克' : '斤' }}

                </template>

                <template #chuku_month="{ row }">
                    {{unitsValue == 1 ? row.chuku_month : unitsValue == 2 ? row.chuku_month*10: row.chuku_month *10 *2}}
                    {{unitsValue == 1 ? '吨' : unitsValue == 2 ? '千克' : '斤' }}

                </template>

                <template #time="{ row }">
                    {{new Date(row.time).toLocaleDateString().split('/')[0]}} 年
                    {{new Date(row.time).toLocaleDateString().split('/')[1]}}月
                    <!-- {{row.time}} -->
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

    </div>
</template>
<script>
    import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
    import http from '../../utils/http.js';
    export default {
        data() {
            return {
                time: null,
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
                    { colKey: 'address', title: '仓库名称' },
                    { colKey: 'name', title: '物料名称', width: '100' },
                    { colKey: 'pinpai', title: '品牌', width: '150', },
                    // { colKey: 'ruku_day', title: '今日入库' },
                    // { colKey: 'chuku_day', title: '今日出库', ellipsis: true },
                    { colKey: 'ruku_month', title: '本月入库' },
                    { colKey: 'chuku_month', title: '本月出库' },
                    { colKey: 'time', title: '时间' },
                    { colKey: 'caozuo', title: '操作' },
                ],
                pageSize: 5,
                page: 1,
                total: 0,
            }

        },
        created() {
            this.getlist()

        },
        methods: {
            getlist() {
                console.log(this.time);

                http.post('/stash/getstash', { page: this.page, pageSize: this.pageSize, time: this.time }).then(res => {
                    console.log(res);
                    this.data = res.data.data
                    this.total = res.data.total
                })
            },
            onPick(value, context) {
                console.log('onPick:', value, context);
            },
            onChange(value, context) {
                console.log(value);

                this.time = value

                this.getlist()
                // console.log('onChange:', value, context);

                // if (value.length == 0) return this.getlist()

                // http.post('/stash/searchstash', {
                //     date: value
                // }).then(res => {
                //     console.log(res);
                //     if (res.data.code == 0) {
                //         this.data = res.data.data
                //         this.total = res.data.data.length
                //     }
                // })
            },
            reset() {
                this.getlist()
                new Date().toLocaleDateString()
            },


            handleClick(e) {
                this.unitsValue = e.value
                console.log(e);
                // e.value == 1 ? this.units=e.content : e.value == 2 ? this.$message.success('千克') : this.$message.success('斤')
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