<template>
  <div>
    <t-dialog
      @confirm="onConfirm"
      top="5vh"
      width="1100px"
      :onClose="close"
      :visible.sync="visibleinfo"
    >
      <template #header>
        <div style="display: flex; justify-content: space-between; width: 80%">
          <div>出库信息</div>
          <div>
            订货时间：{{
              new Date(row.time).toLocaleString().replaceAll("/", "-")
            }}
          </div>
          <div>
            出库时间：{{
              new Date(row.time_out).toLocaleString().replaceAll("/", "-")
            }}
          </div>
        </div>
      </template>
      <div style="font-size: 20px">
        <div class="row">
          <div style="width: 150px;">收货人：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.consignee_name }}</t-tag
            >
          </div>
        </div>
        <div class="row">
          <div style="width: 150px;">收货人手机号：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.consignee_phone }}</t-tag
            >
          </div>
        </div>
        <div class="row" v-if="row.address">
          <div style="width: 150px;">收货人地址：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.address }}</t-tag
            >
          </div>
        </div>
        <div class="row" v-if="row.card">
          <div style="width: 150px;">运送车辆：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.card }}</t-tag
            >
          </div>
        </div>
        <div class="row">
          <div style="width: 150px;">零售/运送：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ ["运送", "零售"][row.song_ling] }}</t-tag
            >
          </div>
        </div>
        <div class="row">
          <div style="width: 150px;">出库仓库：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.stash_label }}</t-tag
            >
          </div>
        </div>
      </div>

      <div>
        <div
          class="issueInfoData"
          v-for="(item, index) in issueInfoData"
          :key="item.id"
        >
          <div class="row" :key="item.id">
            <div>物料名称：</div>
            <div>
              <t-tag
                style="font-size: 20px; padding: 15px 10px"
                theme="success"
                variant="light"
                >{{ item.content }}</t-tag
              >
            </div>
          </div>
          <div class="row" :key="item.id">
            <div>物料品牌：</div>
            <div>
              <t-tag
                style="font-size: 20px; padding: 15px 10px"
                theme="success"
                variant="light"
                >{{ item.pinpai == "" ? "未填写" : item.pinpai }}</t-tag
              >
            </div>
          </div>
          <div class="row" :key="item.id">
            <div>物料规格：</div>
            <div>
              <t-tag
                style="font-size: 20px; padding: 15px 10px"
                theme="success"
                variant="light"
                >{{ item.net_content }}KG/袋</t-tag
              >
            </div>
          </div>
          <div class="row" :key="item.id">
            <div>订货数量：</div>
            <div>
              <t-tag
                style="font-size: 20px; padding: 15px 10px"
                theme="success"
                variant="light"
                >{{ item.content_num }}袋</t-tag
              >
            </div>
          </div>
          <div class="row" :key="item.id" v-if="item.price_Tons">
            <div>每吨价格：</div>
            <div>
              <t-tag
                style="font-size: 20px; padding: 15px 10px"
                theme="success"
                variant="light"
                >{{ item.price_Tons }}元/吨</t-tag
              >
            </div>
          </div>
          <div class="row" :key="item.id" v-if="item.content_price">
            <div>单价：</div>
            <div>
              <t-tag
                style="font-size: 20px; padding: 15px 10px"
                theme="success"
                variant="light"
                >{{ item.content_price }}元/袋</t-tag
              >
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-around;font-size: 20px;">
        <div class="row" v-if="row.receive_price">
          <div>应收价格：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.receive_price }}元</t-tag
            >
          </div>
        </div>
        <div class="row" v-if="row.actual_price">
          <div>实收价格：</div>
          <div>
            <t-tag
              style="font-size: 20px; padding: 15px 10px"
              theme="primary"
              variant="light"
              >{{ row.actual_price }}元</t-tag
            >
          </div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>
<script>
import http from "../../../utils/http.js";
export default {
  props: {
    visibleinfo: Boolean,
    row: Object,
  },
  data() {
    return {
      issueInfoData: [],
      formData: {
        time: "",
        num_flag: 1,
        guige_flag: 2,
      },
      regionOptions: [
        {
          label: "123",
          value: 1,
        },
        {
          label: "456",
          value: 2,
        },
      ],
      options1: [
        {
          label: "吨",
          value: 1,
        },
        {
          label: "千克",
          value: 2,
        },
        {
          label: "斤",
          value: 3,
        },
      ],
    };
  },
  watch: {
    row: {
      async handler(newVal, oldVal) {
        // console.log(newVal);
        let issueinfo = await http.get("/issue/issueinfo?id=" + newVal.id);
        console.log(issueinfo.data.data);
        this.issueInfoData = issueinfo.data.data;
      },
      deep: true,
    },
  },
  methods: {
    onConfirm(context) {
      console.log("点击了确认按钮", context);
      // this.$emit('update:infovisible', false)
      // if (this.formData.time == '') this.formData.time = new Date().toLocaleString().replaceAll('/', '-')

      // axios.post('/warehousing/addwarehousing', this.formData).then(res => {
      //     if (res.data.code == 0) {
      //         console.log(res);
      //         this.$emit('getlist')
      //         this.formData = { time: '', guige_flag: 2, num_flag: 1 }
      //         this.$message.success('入库成功')
      //     }else{
      //         this.$message.error(res.data.msg)
      //     }

      // })
    },
    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      this.$emit("update:visibleinfo", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  height: 32px;
  margin: 18px 0;
}

.issueInfoData {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
}

.issueInfoData .row {
  margin: 10px 0;
}
</style>
