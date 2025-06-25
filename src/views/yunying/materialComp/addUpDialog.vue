<template>
    <div>
        <t-dialog header="添加物料" width="40%" :footer="false" :onClose="close" :visible.sync="visible">
            <t-form :data="formData" ref="form" :rules="rules" @reset="onReset" @submit="onSubmit">

                <t-form-item label="仓库" name="stashId">
                    <t-select v-model="formData.stashId" :options="options1" placeholder="请选择仓库"
                        :onPopupVisibleChange="handleChange" />
                </t-form-item>

                <t-form-item label="物料名称" name="name">
                    <t-input v-model="formData.name" placeholder="请输入物料名称"></t-input>
                </t-form-item>

                <t-form-item label="品牌" name="pinpai">
                    <t-input v-model="formData.pinpai" placeholder="请输入物料品牌"></t-input>
                </t-form-item>

                <t-form-item label="产品规格" name="guige" help="请注意单位为KG，请以“千克”为单位输入">
                    <div style="display: flex; width: 100%;">
                        <t-input style="flex: 7;" type="number" v-model="formData.guige"
                            placeholder="请输入产品规格"></t-input>
                    </div>
                </t-form-item>

                <!-- <t-form-item label="总袋数" name="zongnum">
                    <t-input type="number" v-model="formData.zongnum" placeholder="请输入总袋数"></t-input>
                </t-form-item> -->


                <!-- <t-form-item label="运送车辆" name="card">
                    <t-input v-model="formData.card" placeholder="请输入运送车辆车牌号"></t-input>
                </t-form-item>

                <t-form-item label="金额" name="price">
                    <t-input v-model="formData.price" placeholder="请输入入库金额"></t-input>
                </t-form-item> -->

                <t-form-item label="添加日期" help="请选择入库日期，若不选择，则默认采用当前日期">
                    <t-date-picker enable-time-picker v-model="formData.time" :firstDayOfWeek="3"
                        :inputProps="inputProps" />
                </t-form-item>
                <t-form-item style="margin-left: 100px;margin-top: 30px;">
                    <t-space size="10px">
                        <t-button theme="primary" type="submit">提交</t-button>
                        <t-button theme="default" variant="base" type="reset">重置</t-button>

                    </t-space>
                </t-form-item>
                <!-- <t-form-item label="修改日期" help="请选择修改日期，若不选择，则默认采用当前日期" >
                    <t-date-picker enable-time-picker v-model="formData.uptime" :firstDayOfWeek="3"
                        :inputProps="inputProps" />
                </t-form-item> -->
            </t-form>
        </t-dialog>
    </div>
</template>
<script>
import http from "@/utils/http.js";
export default {
    props: {
        visible: Boolean
    },
    data() {
        return {
            stashId: null,
            options1: [],
            formData: {},
            rules: {
                stashId: [{ required: true, message: '请选择仓库', type: 'error' }],
                name: [{ required: true, message: '请输入物料名称', type: 'error' }],
                pinpai: [{ required: true, message: '请输入物料品牌', type: 'error' }],
                guige: [{ required: true, message: '请输入物料规格', type: 'error' }],
            }
        }
    },
    methods: {
        handleChange() {
            http.get("/admin/getmaterialstash").then(res => {
                this.options1 = res.data.data.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            })

        },
        onReset() {
            this.$message.success('重置成功');
        },
        onSubmit({ validateResult, firstError }) {
            if (validateResult === true) {
                if (this.formData.time == null) this.formData.time = new Date().toLocaleString().replaceAll('/', '-')
                http.post("/admin/addmaterial", this.formData).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$message.success('提交成功');
                        this.$emit('getlist')
                        this.$emit('update:visible', false)
                        this.formData = {}
                    }
                })

            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },
        close() {
            this.$emit('update:visible', false)
        }
    },
}
</script>
<style lang="scss" scoped></style>