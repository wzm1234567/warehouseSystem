<template>
    <div>
        <t-drawer :visible.sync="visibleInfo" header="物料记录" @close="handleClose" :closeBtn="true" :footer="false"
            size="40%">
            <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">
                <t-form-item label="选择仓库" name="is_stash_id">
                    <t-cascader v-model="formData.is_stash_id" placeholder="请选择仓库" :options="stashOptions" clearable
                        filterable @popup-visible-change="handleChange" />
                </t-form-item>
                <t-form-item label="物料名称" name="name">
                    <t-input v-model="formData.name" placeholder="请输入物料名称"></t-input>
                </t-form-item>
                <t-form-item label="品牌" name="pinpai">
                    <t-input v-model="formData.pinpai" placeholder="请输入物料品牌"></t-input>
                </t-form-item>
                <t-form-item label="类型" name="type">
                    <t-cascader v-model="formData.type" placeholder="请选择类型" :options="typeOptions" clearable
                        filterable />
                </t-form-item>
                <t-form-item label="袋数" help="数量/袋" name="num">
                    <t-input type="number" v-model="formData.num" placeholder="请输入出库/入库数量"></t-input>
                </t-form-item>
                <t-form-item label="重量" help="默认单位为吨" name="weight">
                    <t-input type="number" v-model="formData.weight" placeholder="请输入出库/入库重量"></t-input>
                    <t-cascader v-model="weight" :options="weightOptions" clearable filterable />
                </t-form-item>
                <t-form-item label="规格" help="每袋多少千克" name="guige">
                    <t-input type="number" v-model="formData.guige" placeholder="请输入产品规格/kg"></t-input>
                </t-form-item>
                <t-form-item label="金额" name="price">
                    <t-input v-model="formData.price" placeholder="请输入金额"></t-input>
                </t-form-item>
                <t-form-item label="出库/入库时间" help="不填写默认为当前时间" name="time">
                    <t-date-picker v-model="formData.time"></t-date-picker>
                </t-form-item>
                <t-form-item style="margin-left: 100px">
                    <t-space size="10px">
                        <t-button theme="primary" type="submit">提交</t-button>
                        <t-button theme="default" variant="base" type="reset">重置</t-button>
                    </t-space>
                </t-form-item>
            </t-form>
        </t-drawer>
    </div>
</template>
<script>
import { MessagePlugin as Message } from 'tdesign-vue';
import http from "@/utils/http";
export default {
    props: {
        visibleInfo: {
            type: Boolean,
            default: false

        }
    },
    data() {
        return {
            formData: {},
            rules: {
                is_stash_id: [{ required: true, message: '仓库必填', type: 'error' }],
                name: [{ required: true, message: '姓名必填', type: 'error', trigger: 'blur', }],
                pinpai: [{ required: true, message: '品牌必填', type: 'error', trigger: 'blur', }],
                type: [{ required: true, message: '类型必填', type: 'error' }],
                num: [{ required: true, message: '数量必填', type: 'error' }],
                weight: [{ required: true, message: '重量必填', type: 'error' }],
                guige: [{ required: true, message: '规格必填', type: 'error' }],
            },
            typeOptions: [
                {
                    label: '入库',
                    value: 0
                },
                {
                    label: '出库',
                    value: 11
                }
            ],
            weight: 0,
            weightOptions: [
                {
                    label: '吨',
                    value: 0
                },
                {
                    label: '千克',
                    value: 1
                },
                {
                    label: '斤',
                    value: 2
                },
            ],
            stashOptions: []
        }
    },
    methods: {
        handleClose() {
            this.$emit("update:visibleInfo", false)
        },

        onReset() {
            this.$message.success('重置成功');
            console.log('formData', this.formData);
        },
        onSubmit({ validateResult, firstError }) {
            if (validateResult === true) {
                this.$message.success('提交成功');
                if (this.weight == 1) {
                    this.formData.weight = this.formData.weight / 1000
                } else if (this.weight == 2) {
                    this.formData.weight = this.formData.weight / 2000
                }
                if (!this.formData.time) {
                    this.formData.time = new Date().getTime()
                }
                http.post("/stash/addstashinfo", this.formData).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$message.success("提交成功")
                        this.formData = {}
                        this.$emit("getlist")
                        this.$emit("update:visibleInfo", false)
                    }
                })
            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },

        // 选择仓库
        handleChange() {
            http.post('/stash/getstash').then(res => {
                console.log(res);
                let arr = res.data.data
                arr.forEach(item => {
                    item.label = item.name
                    item.value = item.id
                });
                this.stashOptions = arr
            })
        }
    }
}
</script>