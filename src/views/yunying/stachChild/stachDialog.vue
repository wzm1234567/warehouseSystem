<template>
    <div>
        <t-dialog header="添加仓库" :visible.sync="visible1" @confirm="onConfirm" width="40%" :onClose="close"
            :footer="false">
            <t-form :data="formData" ref="form" @reset="onReset" @submit="onSubmit">
                <t-form-item label="仓库名称" name="name">
                    <t-input v-model="formData.name" placeholder="请输入仓库名称"></t-input>
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
export default {
    props: {
        visible1: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {},
        }
    },
    methods: {
       
        close(context) {
            console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
            this.$emit('update:visible1', false)
        },

        onReset() {
            this.$message.success('重置成功');
            console.log('formData', this.formData);
        },
        onSubmit({ validateResult, firstError }) {
            if (validateResult === true) {
                http.post("/stash/addstash",this.formData).then(res=>{
                if (res.data.code == 0) {
                    this.$message.success('提交成功');
                    this.$emit('getlist')
                    this.$emit('update:visible1', false)
                }else{
                    this.$message.error(res.data.message)
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
<style lang="scss"></style>