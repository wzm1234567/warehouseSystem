<template>
    <div>
        <t-dialog id="loading-service-demo" ref="content" class="loading-service-demo" header="订货时间表" top="5vh"
            @confirm="onConfirm" width="900px" :onClose="close" :visible.sync="clientInfo" @opened="onBeforeOpen">

            <div style="max-height: 70vh;overflow-y: auto;">
                <t-timeline mode="same" :reverse="reverse">
                    <t-timeline-item v-for="(item, index) in list" :key="index">
                        <t-list :split="true">
                            <template #header>
                                <div
                                    style="display: flex;justify-content: space-between;width: 70%;font-size: large;font-weight: 600;color: cornflowerblue;">
                                    <div>{{ rowInfo.name }}</div>
                                    <div>订货日期：{{ new Date(item.time).toLocaleString().replaceAll('/', '-') }}</div>
                                </div>
                            </template>

                            <t-list-item v-for="(ele, i) in item.children" :key="ele.id">
                                <t-list-item-meta>
                                    <template #description>
                                        <div style="display: flex;align-items: center;justify-content: space-between;width: 120%;">
                                            <div><t-tag style="font-size: 19px;padding:20px 10px ;" theme="success" variant="outline">{{ ele.name }}</t-tag></div>
                                            <div><t-tag style="font-size: 19px;padding:20px 10px ;" theme="success" variant="outline">规格：{{ ele.net_content }}KG/袋</t-tag></div>
                                            <div><t-tag style="font-size: 19px;padding:20px 10px ;" theme="success" variant="outline">品牌：{{ ele.pinpai }}</t-tag></div>
                                            <div><t-tag style="font-size: 19px;padding:20px 10px ;" theme="success" variant="outline">数量：{{ ele.num }}袋</t-tag></div>
                                            <div><t-tag style="font-size: 19px;padding:20px 10px ;" theme="success" variant="outline" v-show="ele.price_dun">{{ ele.price_dun }}元/吨</t-tag></div>
                                            <div><t-tag style="font-size: 19px;padding:20px 10px ;" theme="success" variant="outline"  v-show="ele.price">{{ ele.price }}元/袋</t-tag></div>
                                        </div>
                                    </template>
                                </t-list-item-meta>
                            </t-list-item>

                        </t-list>
                    </t-timeline-item>
                </t-timeline>
            </div>

            <div v-if="list.length == 0">
                暂无订货信息
            </div>


        </t-dialog>
    </div>
</template>
<script>
import http from "../../../utils/http.js"
import { LoadingPlugin } from 'tdesign-vue';
export default {
    props: {
        clientInfo: Boolean,
        rowInfo: Object,
    },
    data() {
        return {
            reverse: false,
            list: [],
            attachLoading: false,
        }
    },
    methods: {
        onConfirm(context) {



        },
        close(context) {
            this.$emit('update:clientInfo', false)
            this.list =[]
        },
        // 对话框弹出时触发
        onBeforeOpen() {
            console.log(this.rowInfo);
            const loadingAttachInstance = this.$loading({
                attach: '#loading-service-demo',
                showOverlay: true,
                size: '20px',
            });
            this.attachLoading = true;
            http.get("/admin/getClientInfo?id=" + this.rowInfo.id).then(res => {
                console.log(res);
                this.list = res.data.data.reverse()
                loadingAttachInstance.hide();
                this.attachLoading = false;
            })
        }
    },
}
</script>