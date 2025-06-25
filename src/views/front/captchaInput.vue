<template>
    <div>
        <div class="otp-field">
            <h2>输入验证码</h2>
            <input type="text" v-model="captcha.code1" maxlength="1">
            <input type="text" v-model="captcha.code2" maxlength="1">
            <input type="text" v-model="captcha.code3" maxlength="1">
            <input type="text" v-model="captcha.code4" maxlength="1">
            <input type="text" v-model="captcha.code5" maxlength="1">
            <input type="text" v-model="captcha.code6" maxlength="1">
        </div>
    </div>

</template>

<script>

export default {
    data() {
        return {
            captcha: {
                code1: '',
                code2: '',
                code3: '',
                code4: '',
                code5: '',
                code6: '',
            }
        }
    },
    mounted() {
        let that = this
        const inputs = document.querySelectorAll('.otp-field input');
        // 遍历每一输入框
        inputs.forEach((input, index) => {
            // input.dataset.index = index;
            input.addEventListener('input', function () {
                const value = this.value;
                // console.log(value.length);
                if (value.length === 1) {
                    // 如果当前输入框内容达到1，获取下一个输入框并聚焦
                    const nextIndex = index + 1;
                    if (nextIndex < inputs.length) {
                        inputs[nextIndex].focus();
                    }
                }
            });

            // 为每一个输入框添加键盘按下事件监听器
            input.addEventListener("keydown", function (event) {
                console.log(event);

                if (event.key === "Backspace") { // Backspace 键盘退格键
                    const value = this.value;
                    console.log(value);
                    if (value.length === 0) {
                        // 如果当前输入框内容为空，则获取前一个输入框并聚焦
                        const prevIndex = index - 1;
                        if (prevIndex >= 0) {
                            inputs[prevIndex].focus();
                            inputs[prevIndex].select();
                        }
                    }
                }

                console.log(that.captcha);
                
            })
        });



    }
}
</script>

<style lang="scss" scoped>
.otp-field {
    background-color: #fff;
    display: inline-block;
    padding: 20px 30px;

    h2 {
        color: #666;
        font-weight: normal;
        font-size: 16px;
        margin-bottom: 10px;

    }

    input {
        width: 30px;
        height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        margin-right: 5px;
    }
}
</style>
