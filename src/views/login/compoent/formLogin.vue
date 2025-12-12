<template>
    <div class="form-login">
        <h1 style="display: flex;align-items: end;">欢迎回来<img style="width: 70px;height: 70px;margin-left: 20px;"
                src="http://117.72.187.234:3001/upload/file-176551762719491a5c864a7636ea2a1c02128bbcd69d0016677af9e841-GEx-KMQ-fw1200.gif"
                alt=""></h1>
        <p style="font-size: 12px;margin: 10px 0 35px 0;color: #83848c;">请输入您的账号信息开始管理后台项目</p>
        <t-space style="width: 100%">
            <t-form :data="formData" ref="form" :rules="rules" @reset="onReset" @submit="onSubmit" :colon="true"
                :labelWidth="0">
                <t-form-item name="username">
                    <t-input clearable v-model="formData.username" placeholder="请输入用户名">
                        <desktop-icon slot="prefix-icon"></desktop-icon>
                    </t-input>
                </t-form-item>
                <t-form-item name="password">
                    <t-input type="password" clearable v-model="formData.password" placeholder="请输入密码">
                        <lock-on-icon slot="prefix-icon"></lock-on-icon>
                    </t-input>
                </t-form-item>


                <t-form-item name="captcha">
                    <div style="display: flex;align-items: center;width: 100%;">
                        <div style="flex: 6.5;">
                            <t-input type="captcha" clearable v-model="formData.captcha" placeholder="请输入验证码"
                                class="int">
                                <lock-on-icon slot="prefix-icon"></lock-on-icon>
                            </t-input>
                        </div>
                        <div v-html="svg" @click="getCaptcha"
                            style="flex: 3;display: flex;align-items: center;justify-content: center;"></div>
                    </div>


                </t-form-item>
                <div
                    style="display: flex;justify-content: space-between;align-items: center;font-size: 14px;margin-bottom: 20px;">
                    <t-checkbox style="color: var(--color-text);">记住账号</t-checkbox>
                    <t-space>
                        <t-link theme="primary">忘记密码?</t-link>
                    </t-space>
                </div>

                <t-form-item>
                    <t-button theme="primary" type="submit" block>登录</t-button>
                </t-form-item>
            </t-form>
        </t-space>


        <div style="display: flex;justify-content: space-between; margin: 20px 0 30px 0;">
            <t-button style="width: 48%;" variant="outline">手机号登录</t-button>
            <t-button style="width: 48%;" variant="outline">扫码登录</t-button>
        </div>
        <div style="background-color: #434c59;height: 0.1px;margin-bottom: 20px;">

        </div>
        <footer style="text-align: center;font-size: 14px;">
            <span>还没有账号？<t-link theme="primary" @click="createAccount">创建账号</t-link></span>
        </footer>
    </div>
</template>
<script>
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue';
import http from '../../../utils/http.js'
export default {
    components: {
        DesktopIcon,
        LockOnIcon,
    },
    data() {
        return {
            svg: null,
            formData: {
                username: 'admin',
                password: '123456',
                captcha: ''
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
                        max: 100,
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
                captcha: [
                    {
                        required: true,
                        message: '验证码不能为空',
                        type: 'error',
                        trigger: 'blur',
                    },
                    // trigger 默认为 'change'
                    { required: true, message: '验证码不能为空', type: 'error' },
                    { whitespace: true, message: '验证码不能为空' },
                ]
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
                http.post('/login/login', this.formData).then(res => {
                    console.log(res)
                    console.log(res.data.code);
                    
                    if (res.data.code == 0) {
                        localStorage.setItem('token', 'Bearer ' + res.data.data.token)
                        localStorage.setItem('user', JSON.stringify(res.data.data.user))
                        this.$message.success('登录成功');
                        this.$router.push('/layout')
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },
        handleClear() {
            this.$refs.form.clearValidate();
        },

        createAccount() {
            this.$emit('createAccount', 2)
        },
        getCaptcha() {
            http.get('/login/captcha').then(res => {
                console.log(res)
                this.svg = res.data.data
            })
        }

    },
    created() {
        this.getCaptcha()
    },




}
</script>
<style lang="scss" scoped>
/* * {
        transition: background-color 0.7s, color 0.7s;
    
    } */

/* @import "../../../style/index.css"; */

.form-login {
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

.int {
    padding-right: 0;
}
</style>