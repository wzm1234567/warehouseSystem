<template>
    <div>
        <VueQr id="vueQr" :text="qrcodeValue" :size="200" style="margin: 0 auto;display: block;"></VueQr>

        <el-button type="text" size="mini" @click="generateQRCode">下载</el-button>

    </div>
</template>
<script>
import VueQr from 'vue-qr'
import http from "../../utils/http"
export default {
    components: {
        VueQr
    },
    data() {
        return {
            qrcodeValue:'123456'
        }
    },
    created(){
        // http.get('/users/users').then(res=>{
        //     console.log(res);
        // })
    },
    methods: {
        generateQRCode(){

        }
    }
}
</script>
<style lang="scss" scoped></style>