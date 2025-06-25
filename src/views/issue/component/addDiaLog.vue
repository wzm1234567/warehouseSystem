<template>
    <div>
        <t-dialog header="添加出库记录" @confirm="onConfirm" :width="300" :onConfirm="onConfirmAnother" top="8vh" :onClose="close"
            :visible.sync="addvisible">
            <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">


                <t-form-item style="transform: translateX(-14px);" label="收货人" name="name">
                    <t-input v-model="formData.pinpai" placeholder="请输入收货人名称"></t-input>
                </t-form-item>

                <t-form-item style="transform: translateX(-14px);" label="手机号" name="name">
                    <t-input v-model="formData.pinpai" placeholder="请输入收货人手机号"></t-input>
                </t-form-item>

                <t-form-item style="transform: translateX(-14px);" label="收货地址" name="name">
                    <t-input v-model="formData.pinpai" placeholder="请输入收货人地址"></t-input>
                </t-form-item>

                <!-- <t-form-item style="transform: translateX(-14px);" label="运送车辆" name="card">
                    <t-input v-model="formData.card" placeholder="请输入运送车辆车牌号"></t-input>
                </t-form-item> -->

                <div style="display: flex;transform: translateX(-14px);margin-bottom: 30px;"
                    v-for="(item, index) in form" :key="index">
                    <div v-for="(ele, i) in item.children" :key="i">
                        <t-form-item :label="ele.label" :name="ele.name">
                            <t-cascader v-if="ele.type==0" v-model="ele.value" :placeholder="ele.placeholder"
                                :options="regionOptions" clearable filterable />
                            <t-input v-if="ele.type==1" v-model="ele.value" :placeholder="ele.placeholder"></t-input>
                        </t-form-item>
                    </div>
                </div>


                <div style="display: flex;justify-content: center;cursor: pointer;" @click="addItem">
                    <icon-font name="add" style="color: orange;font-size: 20px;" />
                    <span style="margin-left: 3px;">添加一行</span>
                </div>






                <!-- <t-form-item label="物料重量" help="请注意选择选择单位，默认选择为“吨”" name="num">
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
                </t-form-item> -->

                <!-- <t-form-item label="总袋数" name="zongnum">
                    <t-input type="number" v-model="formData.zongnum" placeholder="请输入总袋数"></t-input>
                </t-form-item> -->


                <div style="display: flex;justify-content: space-between;">
                    <div>
                        <t-form-item style="transform: translateX(-14px);" label="出库日期" help="请选择入库日期，若不选择，则默认采用当前日期">
                            <t-date-picker enable-time-picker v-model="formData.time" :firstDayOfWeek="3"
                                :inputProps="inputProps" />
                        </t-form-item>
                    </div>
                    <div>
                        <t-form-item  label="总价格">
                            <t-input disabled type="number" v-model="formData.zongnum" placeholder="正在计算总价格..."></t-input>
                        </t-form-item>
                    </div>
                </div>

                
                
            </t-form>
        </t-dialog>
    </div>
</template>
<script>
    import axios from "../../../utils/http.js"
    import { IconFont } from 'tdesign-icons-vue';
    export default {
        props: {
            addvisible: Boolean
        },
        components: {
            IconFont
        },
        data() {
            return {
                formData: {
                    time: '',
                    num_flag: 1,
                    guige_flag: 2
                },
                form: [
                    {
                        children: [
                            {
                                name: 'name',
                                value: '',
                                label: '物料名称',
                                placeholder: '请选择物料名称',
                                type: 0
                            },
                            {
                                name: "pinpai",
                                value: '',
                                label: '品牌',
                                placeholder: '请输入物料品牌',
                                type: 1
                            },
                            {
                                name: "number",
                                value: '',
                                label: '数量',
                                placeholder: '请输入卖出袋数',
                                type: 1

                            },
                            {
                                name: "price",
                                value: '',
                                label: '单价',
                                placeholder: '请输入单价',
                                type: 1
                            },
                        ]
                    },
                ],
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
                // this.$emit('update:addvisible', false)
                // if (this.formData.time == '') this.formData.time = new Date().toLocaleString().replaceAll('/', '-')

                // axios.post('/warehousing/addwarehousing', this.formData).then(res => {
                //     if (res.data.code == 0) {
                //         console.log(res);
                //         this.$emit('getlist')
                //         this.formData = { time: '', guige_flag: 2, num_flag: 1 }
                //         this.$message.success('入库成功')
                //     } else {
                //         this.$message.error(res.data.msg)
                //     }

                // })
                console.log(this.form);


            },
            close(context) {
                console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
                this.$emit('update:addvisible', false)
            },



            addItem() {
                this.form.push({
                    children: [
                        {
                            value: '',
                            label: '物料名称',
                            placeholder: '请选择物料名称',
                            type: 0
                        },
                        {
                            value: '',
                            label: '品牌',
                            placeholder: '请输入物料品牌',
                            type: 1
                        },
                        {
                            value: '',
                            label: '数量',
                            placeholder: '请输入卖出袋数',
                            type: 1

                        },
                        {
                            value: '',
                            label: '单价',
                            placeholder: '请输入单价',
                            type: 1
                        },
                    ]
                },)
            }



        },
    }
</script>
<style lang="scss" scoped>
    ::v-deep .t-form-inline .t-form__item {
        margin-right: 0;
    }
</style>