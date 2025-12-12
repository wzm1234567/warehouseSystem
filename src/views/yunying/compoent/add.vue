<template>
    <div>
        <t-dialog :header="rowList.id == undefined ? '添加入库信息' : '修改入库信息'" width="40%" :footer="false" :onClose="close"
            :visible.sync="addvisible" top="8vh">
            <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">
                <t-form-item label="选择仓库" name="is_stash_id">
                    <t-cascader v-model="formData.is_stash_id" placeholder="请选择入库仓库" :options="stashOptions" clearable
                        filterable @change="handleChange" />
                </t-form-item>
                <t-form-item label="物料" name="name" help="物料、品牌、规格请依次选择">

                    <t-cascader v-model="formData.name" placeholder="请选择物料" :options="regionOptions" clearable
                        @change="onChange" filterable />

                </t-form-item>

                <t-form-item label="品牌" name="pinpai" help="物料、品牌、规格请依次选择">
                    <!-- <t-input v-model="formData.pinpai" placeholder="请输入物料品牌"></t-input> -->
                    <t-cascader v-model="formData.pinpai" placeholder="请选择物料品牌" :options="regionOptions2" clearable
                        @change="onChange2" filterable />
                </t-form-item>


                <t-form-item label="产品规格" name="guige" help="物料、品牌、规格请依次选择">

                    <!-- <t-select style="flex: 3;" v-model="formData.guige" :options="regionOptions3"
                            placeholder="请选择产品规格" clearable/> -->
                    <div style="display: flex; width: 100%;">
                        <t-cascader v-model="value" placeholder="请选择产品规格" :options="regionOptions3" clearable filterable />
                        <t-select style="flex: 3;" v-model="formData.guige_flag" :options="options1"
                            placeholder="默认选择千克" disabled />
                    </div>
                </t-form-item>

                <t-form-item label="总重量" help="请注意选择选择单位，默认选择为“吨”" name="num">
                    <div style="display: flex; width: 100%;">
                        <!-- <t-input style="flex: 7;" type="number" v-model="formData.num" placeholder="请输入物料重量(仅数字)"></t-input> -->
                        <t-input-number style="flex: 7;" v-model="formData.num" theme="normal" :min="0"
                            placeholder="请输入物料重量(仅数字)"></t-input-number>
                        <t-select style="flex: 3;" v-model="formData.num_flag" :options="options1"
                            placeholder="默认选择吨" />
                    </div>

                </t-form-item>



                <!-- <t-form-item label="袋数" name="numberss">
                    <t-input type="number" v-model="formData.numberss" placeholder="请输入入库总袋数"></t-input>
                </t-form-item> -->

                <!-- <t-form-item label="总袋数" name="zongnum">
                    <t-input type="number" v-model="formData.zongnum" placeholder="请输入总袋数"></t-input>
                </t-form-item> -->


                <t-form-item label="运送车辆" name="card">
                    <t-input v-model="formData.card" placeholder="请输入运送车辆车牌号"></t-input>
                </t-form-item>

                <t-form-item label="金额" name="price">
                    <!-- <t-input v-model="formData.price" placeholder="请输入入库金额"></t-input> -->
                    <div style="display: flex; width: 100%;">
                        <!-- <t-input style="flex: 7;" type="number" v-model="formData.price" placeholder="请输入入库金额"></t-input> -->
                        <t-input-number style="flex: 7;" v-model="formData.price" theme="normal" :min="0"
                            placeholder="请输入入库金额"></t-input-number>
                        <t-select style="flex: 3;" v-model="formData.price_option" :options="optionsPrice"
                            placeholder="默认选择元" />
                    </div>
                </t-form-item>

                <t-form-item label="入库日期" help="请选择入库日期，若不选择，则默认采用当前日期" v-if="rowList.id == undefined">
                    <t-date-picker enable-time-picker v-model="formData.time" :firstDayOfWeek="3" />
                </t-form-item>
                <t-form-item label="修改日期" help="请选择修改日期，若不选择，则默认采用当前日期" v-else>
                    <t-date-picker enable-time-picker v-model="formData.uptime" :firstDayOfWeek="3" />
                </t-form-item>
                <t-form-item style="margin-left: 100px">
                    <t-space size="10px">
                        <t-button theme="primary" type="submit">提交</t-button>
                        <t-button theme="default" variant="base" type="reset">重置</t-button>
                    </t-space>
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>
<script>
import axios from "../../../utils/http.js"
export default {
    props: {
        addvisible: Boolean,
        rowList: {
            type: Object,
            default: {}
        }
    },
    created() {

        
        axios.post('/stash/getstash').then(res => {
            console.log(res);
            let arr = res.data.data
            arr.forEach(item => {
                item.label = item.name
                item.value = item.id
            });
            this.stashOptions = arr
        })

    },
    data() {
        return {
            formData: {
                time: '',
                num_flag: 1,
                guige_flag: 2,
                price_option: 1,
            },
            regionOptions: [],
            regionOptions2: [],
            regionOptions3: [],
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
            ],
            optionsPrice: [
                {
                    label: '元',
                    value: 1,
                },
                {
                    label: '万元',
                    value: 2
                }
            ],
            stashOptions: [],
            rules: {
                is_stash_id: [{ required: true, message: '请选择仓库', type: 'error' }],
                name: [{ required: true, message: '请选择物料', type: 'error' }],
                pinpai: [{ required: true, message: '请选择品牌', type: 'error' }],
                // guige:[{ required: true, message: '请选择规格', type: 'error' }],
                num: [{ required: true, message: '请输入总重量', type: 'error' }],
                card: [{ required: true, message: '请输入运送车辆', type: 'error' }],
                price: [{ required: true, message: '请输入金额', type: 'error' }],
            },
            value: ''
        }
    },
    watch: {
        rowList: {
            handler(newVal, oldVal) {
                if (this.rowList.id == undefined) {
                    this.formData = {
                        time: '',
                        num_flag: 1,
                        guige_flag: 2,
                        price_option: 1,
                    }
                } else {
                    this.formData = { ...this.formData, ...this.rowList, guige: this.rowList.specifications * 1000 }
                }

            },
            deep: true
        }
    },
    methods: {
        getmaterial() {
            axios.get("/admin/getmaterial", { params: { stashId: this.formData.is_stash_id } }).then(res => {
                console.log(res);
                let arr = res.data.data
                arr.forEach(item => {
                    item.value = item.id
                });
                this.regionOptions = arr
            })
        },
        onReset() {
            this.value = ''
            this.$message.success('重置成功');
            console.log('formData', this.formData);
        },
        onSubmit({ validateResult, firstError }) {
            if (validateResult === true) {
                if (this.rowList.id == undefined) { // 添加
                    if (this.value == '') return this.$message.error('请选择规格')
                    this.formData.guige = this.value
                    if (this.formData.time == '') this.formData.time = new Date().getTime()
                    axios.post('/warehousing/addwarehousing', this.formData).then(res => {
                        if (res.data.code == 0) {
                            console.log(res);
                            this.$emit('getlist')
                            this.formData = { time: '', guige_flag: 2, num_flag: 1 }
                            this.$message.success('入库成功')
                            this.$emit('update:addvisible', false)
                        } else {
                            this.$message.error(res.data.msg)
                        }

                    })
                } else { // 修改
                    if (this.formData.uptime == null) this.formData.uptime = new Date().getTime()
                    axios.post('/warehousing/updatewarehousing', this.formData).then(res => {
                        if (res.data.code == 0) {
                            console.log(res);
                            this.$emit('getlist')
                            this.formData = { time: '', guige_flag: 2, num_flag: 1 }
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })

                }

            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },
        close(context) {
            console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);

            this.$emit('update:addvisible', false)
        },

        // 选择仓库
        handleChange() {
            this.value = ''
            this.formData.name = ''
            this.formData.pinpai = ''

            this.getmaterial()
        },
        // 选择物料触发
        onChange(val, context) {
            console.log(this.formData.name, val, context);
            console.log('path: ', context.node.getPath());
            axios({
                method: 'get',
                url: '/admin/getmaterial_pinpai',
                params: { id: this.formData.name }
            }).then((res) => {
                let arr = res.data.data
                this.formData.pinpai = ''
                arr.forEach(item => {
                    item.label = item.pinpai
                    item.value = item.id
                });
                this.regionOptions2 = arr
            })
        },
        // 选择品牌触发
        onChange2() {
            axios({
                method: 'get',
                url: '/admin/getmaterial_guige',
                params: { id: this.formData.pinpai }
            }).then((res) => {
                let arr = res.data.data
                this.formData.guige = ''
                this.value = ''
                arr.forEach(item => {
                    item.label = item.guige
                    item.value = item.id
                });
                this.regionOptions3 = arr
            })

        },
        // onChange3(val){
        //     console.log(this.regionOptions3);

        //     console.log(this.formData.guige);
        //     console.log(val);

        // }
    },
}
</script>