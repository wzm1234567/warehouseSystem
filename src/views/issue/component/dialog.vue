<template>
    <div>
        <t-dialog header="出库详情" @confirm="onConfirm" width="40%" :onConfirm="onConfirmAnother" :onClose="close"
            :visible.sync="visibleinfo">

                <div>
                    <div class="row">
                        <div class="col-md-4">出库单号：</div>
                        <div class="col-md-8">{{row.id}}</div>
                    </div>
                </div>
        </t-dialog>
    </div>
</template>
<script>
    import axios from "../../../utils/http.js"
    export default {
        props: {
            visibleinfo: Boolean,
            row:Object
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
                this.$emit('update:infovisible', false)
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
                this.$emit('update:visibleinfo', false)
            },
        },
    }
</script>