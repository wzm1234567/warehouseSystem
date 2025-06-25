<template>
    <div>
        <t-dialog header="新增客户" width="50%" top="8vh" :footer="false" :onClose="close" :visible.sync="visibleAddClient">

            <t-form :data="formData" ref="form" :rules="rules" @reset="onReset" @submit="onSubmit">
                <t-form-item label="客户姓名" name="name">
                    <t-input v-model="formData.name" placeholder="请输入客户姓名"></t-input>
                </t-form-item>
                <t-form-item label="客户手机号" name="phone">
                    <t-input v-model="formData.phone" placeholder="请输入客户手机号"></t-input>
                </t-form-item>
                <t-form-item label="客户地址" name="address">
                    <t-input v-model="formData.address" placeholder="请输入客户地址"></t-input>
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
import http from "../../../utils/http"
import { IconFont } from "tdesign-icons-vue";
import { MessagePlugin } from "tdesign-vue";
export default {
    props: {
        visibleAddClient: Boolean,
        rowInfo: Object,
    },
    data() {
        return {
            formData: {},
            rules: {
                name: [{ required: true, message: '请输入客户名称', type: 'error' }],
                phone: [{ required: true, message: '请输入客户手机号', type: 'error' }],
                address: [{ required: true, message: '请输入客户地址', type: 'error' }],
            }
        }
    },
    methods: {
        close() { // 点击取消按钮
            this.formData = {}
            this.$emit('update:visibleAddClient', false)
        },
        onReset() {
            this.$message.success('重置成功');
            console.log('formData', this.formData);
        },
        onSubmit({ validateResult, firstError }) {
            if (validateResult === true) {
                http.post("/admin/addclient", { ...this.formData, time: new Date().getTime() }).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$message.success('提交成功');
                        this.formData = {}
                        this.$emit('update:visibleAddClient', false)
                        this.$emit("getlist");
                    } else {
                        MessagePlugin.error({ content: res.data.msg });
                    }
                })

            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },

    }
}
</script>
<style lang="scss" scoped></style>