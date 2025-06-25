<template>
    <div>
        <t-dialog header="添加物料入库" @confirm="onConfirm" width="40%" :onConfirm="onConfirmAnother" :onClose="close"
            :visible.sync="addvisible">
            <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">

                <t-form-item label="物料" name="name">
                    <t-cascader v-model="formData.name" placeholder="请选择物料" :options="regionOptions" clearable
                        filterable />
                </t-form-item>

                <t-form-item label="品牌" name="pinpai">
                    <t-input v-model="formData.pinpai" placeholder="请输入物料品牌"></t-input>
                </t-form-item>

                <t-form-item label="物料重量" help="请注意选择选择单位，默认选择为“吨”" name="num">
                    <div style="display: flex; width: 100%;">
                        <t-input style="flex: 7;" type="number" v-model="formData.num"
                            placeholder="请输入物料重量(仅数字)"></t-input>
                        <t-select style="flex: 3;" v-model="formData.num_flag" :options="options1"
                            placeholder="默认选择吨" />
                    </div>

                </t-form-item>

                <t-form-item label="产品规格" name="guige" help="请注意选择选择单位，默认选择为“千克”">

                    <div style="display: flex; width: 100%;">
                        <t-input style="flex: 7;" type="number" v-model="formData.guige"
                            placeholder="请输入产品规格"></t-input>
                        <t-select style="flex: 3;" v-model="formData.guige_flag" :options="options1"
                            placeholder="默认选择千克" />
                    </div>
                </t-form-item>

                <!-- <t-form-item label="总袋数" name="zongnum">
                    <t-input type="number" v-model="formData.zongnum" placeholder="请输入总袋数"></t-input>
                </t-form-item> -->


                <t-form-item label="运送车辆" name="card">
                    <t-input v-model="formData.card" placeholder="请输入运送车辆车牌号"></t-input>
                </t-form-item>

                <t-form-item label="入库日期" help="请选择入库日期，若不选择，则默认采用当前日期">
                    <t-date-picker enable-time-picker v-model="formData.time" :firstDayOfWeek="3"
                        :inputProps="inputProps" />
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>
<script>
    import axios from "../../../utils/http.js"
    export default {
        props: {
            addvisible: Boolean
        },
        data() {
            return {
                formData: {
                    time: '',
                    num_flag: 1,
                    guige_flag: 2
                },
                regionOptions: [
                    {
                        label: '123',
                        value: 1,
                    },
                    {
                        label: '456',
                        value: 2
                    }
                ],
                options1: [
                    {
                        label: '吨',
                        value: 1,
                    },
                    {
                        label: '千克',
                        value: 2
                    },
                    {
                        label: '斤',
                        value: 3
                    }
                ]
            }
        },
        methods: {
            onConfirmAnother(context) {
                console.log('点击了确认按钮', context);
                this.$emit('update:addvisible', false)
                if (this.formData.time == '') this.formData.time = new Date().toLocaleString().replaceAll('/', '-')
                
                axios.post('/warehousing/addwarehousing', this.formData).then(res => {
                    if (res.data.code == 0) {
                        console.log(res);
                        this.$emit('getlist')
                        this.formData = { time: '', guige_flag: 2, num_flag: 1 }
                        this.$message.success('入库成功')
                    }else{
                        this.$message.error(res.data.msg)
                    }

                })


            },
            close(context) {
                console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
                this.$emit('update:addvisible', false)
            },
        },
    }
</script>