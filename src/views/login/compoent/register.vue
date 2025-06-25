<template>
    <div class="register">
        <h1 style="display: flex;align-items: end;">创建一个账号<img style="width: 70px;height: 70px;margin-left: 20px;"
                src="https://i.postimg.cc/nrvnC97T/91a5c864a7636ea2a1c02128bbcd69d0016677af9e841-GEx-KMQ-fw1200.gif"
                alt=""></h1>
        <p style="font-size: 12px;margin: 10px 0 35px 0;color: #83848c;">让您的应用程序管理变得简单而有趣</p>
        <t-space style="width: 100%">
            <t-form :data="formData" ref="form" :rules="rules" @reset="onReset" @submit="onSubmit" :colon="true"
                :labelWidth="0">
                <t-form-item name="username">
                    <t-input clearable v-model="formData.username" placeholder="请输入用户名">
                        <desktop-icon slot="prefix-icon"></desktop-icon>
                    </t-input>
                </t-form-item>
                <t-form-item name="password">
                    <t-input type="password" clearable v-model="formData.password" placeholder="密码">
                        <lock-on-icon slot="prefix-icon"></lock-on-icon>
                    </t-input>
                </t-form-item>

                <t-form-item name="password">
                    <t-input type="password" clearable v-model="formData.password" placeholder="确认密码">
                        <lock-on-icon slot="prefix-icon"></lock-on-icon>
                    </t-input>
                </t-form-item>

                <div
                    style="display: flex;align-items: center;font-size: 14px;margin-bottom: 20px;">
                    <t-checkbox style="color: var(--color-text);margin-right: 5px;">我同意</t-checkbox>
                    <t-space>
                        <t-link theme="primary">隐私政策 & 条款</t-link>
                    </t-space>
                </div>

                <t-form-item>
                    <t-button theme="primary" type="submit" block>注册</t-button>
                </t-form-item>
            </t-form>
        </t-space>


        <!-- <div style="display: flex;justify-content: space-between; margin: 20px 0 30px 0;">
            <t-button style="width: 48%;" variant="outline">手机号登录</t-button>
            <t-button style="width: 48%;" variant="outline">扫码登录</t-button>
        </div> -->
        <div style="background-color: #434c59;height: 0.1px;margin-bottom: 20px;margin-top: 20px;">

        </div>
        <footer style="text-align: center;font-size: 14px;">
            <span>已经有账号了？<t-link theme="primary" @click="login">去登录</t-link></span>
        </footer>
    </div>

</template>
<script>
import http from "../../../utils/http"
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: '',
                },

                rules: {
                    username: [
                        {
                            required: true,
                            message: '用户名不能为空',
                            type: 'error',
                            trigger: 'blur',
                        },
                        // trigger 默认为 'change'
                        { required: true, message: '用户名不能为空', type: 'error' },
                        { whitespace: true, message: '用户名不能为空' },
                        {
                            min: 2,
                            message: '至少需要两个字符，一个中文等于两个字符',
                            type: 'warning',
                            trigger: 'blur',
                        },
                        {
                            max: 10,
                            message: '姓名字符长度超出',
                            type: 'warning',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码不能为空',
                            type: 'error',
                            trigger: 'blur',
                        },
                        // trigger 默认为 'change'
                        { required: true, message: '密码不能为空', type: 'error' },
                        { whitespace: true, message: '密码不能为空' },
                        {
                            validator: (val) => val.length >= 5,
                            message: '至少 5 个字，中文长度等于英文长度',
                            type: 'warning',
                        },
                        {
                            validator: (val) => val.length < 20,
                            message: '不能超过 20 个字，中文长度等于英文长度',
                            type: 'warning',
                        },
                    ],
                }
            }
        },
        methods: {
            onReset() {
                this.$message.success('重置成功');
                console.log('formData', this.formData);
            },
            onSubmit({ validateResult, firstError }) {
                if (validateResult === true) {
                    http.post('/users/register',this.formData).then(res=>{
                        console.log(res);    
                    })
                    this.$message.success('提交成功');
                } else {
                    console.log('Errors: ', validateResult);
                    this.$message.warning(firstError);

                }
            },
            handleClear() {
                this.$refs.form.clearValidate();
            },
            login(){
                this.$emit('login', 1)
            }
        },
    }
</script>
<style lang="scss" scoped>
    /* * {
        transition: background-color 0.7s, color 0.7s;
       
    } */

    /* @import "../../../style/index.css"; */

    .register {
        color: var(--color-text);
        width: 70%;
        /* background-color: pink; */
    }

    ::v-deep .t-input {
        height: 38px;
        border-radius: 6px;
    }

    ::v-deep .t-button {
        height: 35px;
        border-radius: 6px;
    }
</style>