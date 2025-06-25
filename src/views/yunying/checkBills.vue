<template>
  <div>
    <div style="display: flex; align-items: center; margin: 10px 0 20px 0">
      <div style="margin-left: 10px; display: flex">
        <t-input placeholder="请输入收货人名称" v-model="searchName" @change="search" style="width: 200px" />
        <t-button @click="search">搜索</t-button>
      </div>
    </div>
    <div style="
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
      ">
      <!-- <div>
          <t-button style="margin-right: 15px" @click="openAdd">出库</t-button>
        </div> -->
      <t-button @click="reset">刷新数据</t-button>
    </div>
    <div>
      <t-table rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered" :hover="hover"
        :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :showHeader="showHeader" cellEmptyContent="-"
        resizable>
        <template #song_ling="{ row }">
          <!-- {{ ["运送", "零售"][row.song_ling] }} -->
          <t-tag theme="success" v-if="row.song_ling == 0">运送</t-tag>
          <t-tag theme="warning" v-else>零售</t-tag>
        </template>
        <template #consignee_phone="{ row }">
          <!-- <span style="letter-spacing: 0.5px;font-size: 16px;">{{ row.consignee_phone }}</span> -->
          <span v-if="row.consignee_phone == '未知'">{{
            row.consignee_phone
          }}</span>
          <t-tag v-else theme="success" style="letter-spacing: 0.5px; font-size: 16px">{{ row.consignee_phone }}</t-tag>
        </template>
        <template #consignee_name="{ row }">
          <span v-if="row.consignee_name == '未知'">{{
            row.consignee_name
          }}</span>
          <t-tag v-else theme="success">{{ row.consignee_name }}</t-tag>
        </template>

        <template #address="{ row }">
          <t-link theme="primary">{{ row.address }}</t-link>
        </template>

        <template #time="{ row }">
          {{ new Date(row.time).toLocaleString().replaceAll("/", "-") }}
        </template>

        <template #time_out="{ row }">
          <span v-if="row.time_out !== null">{{
            new Date(row.time_out).toLocaleString().replaceAll("/", "-")
          }}</span>
          <span v-else style="color: red">待出库</span>
        </template>

        <template #caozuo="{ row }">
          <div>
            <el-row>
              <el-col :span="8">
                <t-button size="small" @click="handleInfo(row)">订货详情</t-button>
              </el-col>
              <el-col :span="8">
                <t-button v-if="row.duizhang_type === 0" size="small" theme="info"
                  @click="handleOut(row)">未对账</t-button>
                <t-button v-if="row.qiankuan_tyoe === 0" size="small" theme="danger"
                  @click="handleOut(row)">有欠款</t-button>
              </el-col>
              <el-col :span="8">
                <t-button v-if="row.duizhang_type === 1 && row.qiankuan_tyoe === 1" size="small" theme="success"
                  @click="handleOut(row)">已结清</t-button>
                <t-button v-else size="small" theme="warning">未结清</t-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </t-table>

      <t-pagination v-model="page" style="margin-top: 20px; padding: 0 30px" :total="total" showPageNumber showPageSize
        page-ellipsis-mode="both-ends" showPreviousAndNextBtn :page-size.sync="pageSize" totalContent
        @change="getlist" />
    </div>

    <t-dialog theme="info" header="选择出库方式" :confirmBtn="null" :visible.sync="visible1" :onClose="close1"
      :cancelBtn="null">
      <div style="
          display: flex;
          justify-content: space-around;
          padding: 0 80px;
          margin-top: 15px;
        ">
        <t-button theme="warning" size="large" @click="openlingshou">零售</t-button>
        <t-button theme="success" size="large" @click="openyunsong">运送</t-button>
      </div>
    </t-dialog>

    <dialogs :visibleinfo.sync="visibleinfo" :row="row"></dialogs>
    <add-dialog :addvisible.sync="addvisible" @getlist="getlist"></add-dialog>
    <issue-yunsong :visibleyunsong.sync="visibleyunsong" @getlist="getlist"></issue-yunsong>
    <t-dialog width="75%" top="5vh" :zIndex="100" :header="false" :footer="false" :visible.sync="visibleModal"
      mode="modal" draggable>
      <div slot="body">
        <!-- <t-date-picker v-model="timeOut" placeholder="请选择出库时间" clearable allow-input style="width: 100%;"
            @change="handleChange" /> -->
        <div>
          <div style="font-weight: 600;display: flex;justify-content: space-between;align-items: center;padding: 0 10px;margin-bottom: 6px;">
            <p>历史金额详情</p>
            <span v-if="timeOutParams.duizhang_type === 1 && timeOutParams.qiankuan_tyoe === 1" style="color: green;">已结清</span>
            <span v-else style="color: red;">未结清</span>
          </div>
          <t-table rowKey="index" :data="rowData" :columns="rowcolumns" :stripe="stripe" :bordered="bordered"
            :hover="hover" :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :showHeader="showHeader"
            cellEmptyContent="-" resizable>
            <template #receive_price="{ row }">
              {{ row.receive_price }}元
            </template>
            <template #actual_price="{ row }">
              {{ row.actual_price }}元
            </template>
            <template #totalPrice="{ row }">
              <span v-if="row.totalPrice > 0 || row.totalPrice === 0" style="color: green">{{ row.totalPrice }}元</span>
              <span v-else style="color: red">{{ row.totalPrice }}元</span>
            </template>

            <!-- <template #address="{ row }">
          <t-link theme="primary">{{ row.address }}</t-link>
        </template>

        <template #time="{ row }">
          {{ new Date(row.time).toLocaleString().replaceAll("/", "-") }}
        </template>

        <template #time_out="{ row }">
          <span v-if="row.time_out !== null">{{ new Date(row.time_out).toLocaleString().replaceAll("/", "-") }}</span>
          <span v-else style="color: red;">待出库</span>
        </template> -->
          </t-table>
        </div>
        <div style="margin-top: 15px" v-if="timeOutParams.jieqing_type !== 1">
          <p style="font-weight: 600;padding: 0 10px;">本次要提交的金额</p>
          <t-space direction="vertical" style="width: 100%">
            <t-input v-model="timeOutParams.receive_price" align="right" label="应收金额：" suffix="元" disabled />

            <t-input-number v-model="timeOut" theme="normal" align="right" style="width: 100%">
              <template #label><span>本次应收金额：</span></template>
              <template #suffix><span>元</span></template>
            </t-input-number>

            <t-input v-model="getTotalPrice" align="right" label="当前欠款：" suffix="元" disabled />
          </t-space>
          <t-date-picker v-model="outTime" enable-time-picker allow-input clearable placeholder="请选择收款时间"
          style="margin-top: 15px" />
        <p style="color: #ccc; font-size: 12px">
          若不选择收款时间则采用当前时间
        </p>
        </div>
        <div style="text-align: right">
          <t-button theme="info" style="margin-top: 15px" @click="visibleModal = false">取消</t-button>
          <t-button v-if="timeOutParams.jieqing_type !== 1" theme="primary" style="margin: 15px 10px 0 10px" @click="handleTimeOut">提交</t-button>
          <t-button v-if="timeOutParams.jieqing_type !== 1" theme="success" style="margin-top: 15px" @click="handleSettle">结清</t-button>
        </div>
      </div>
    </t-dialog>
  </div>
</template>
<script>
// import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
import dialogs from "./compoent/dialog.vue";
import addDialog from "./compoent/addDiaLog.vue";
import http from "../../utils/http";
import issueYunsong from "./compoent/issueYunsong.vue";
import { MessagePlugin } from "tdesign-vue";
export default {
  components: {
    dialogs,
    addDialog,
    issueYunsong,
  },
  computed: {
    getTotalPrice() {
      if (this.rowData.length > 0) {
        this.total_price = Math.abs(this.qian) - Number(this.timeOut);
        // this.total_price = Number(this.timeOut) + Math.abs(this.qian) - Number(this.timeOutParams.receive_price)
        return Math.abs(this.qian) - Number(this.timeOut);
      }else {
        this.total_price = this.timeOut - Number(this.timeOutParams.receive_price);
        return this.timeOut - Number(this.timeOutParams.receive_price);
      }
    },
  },
  data() {
    return {
      timeOutParams: {},
      timeOut: 0,
      outTime: "",
      qian: 0,
      total_price: 0,
      visibleModal: false,
      row: {},
      visibleinfo: false,
      addvisible: false,
      visible1: false,
      visibleyunsong: false,
      data: [],
      rowData: [],
      unitsValue: 1,
      size: "small",
      tableLayout: true,
      stripe: true,
      bordered: true,
      hover: false,
      showHeader: true,
      columns: [
        { colKey: "serial-number", width: 50, title: "序号", align: "center" },
        { colKey: "stash_label", title: "出库仓库", align: "center" },
        { colKey: "consignee_name", title: "收货人", align: "center" },
        { colKey: "consignee_phone", title: "收货人手机号", align: "center" },
        { colKey: "address", title: "收货人地址" },
        {
          colKey: "song_ling",
          title: "零售/运送",
          width: 100,
          align: "center",
        },
        { colKey: "time", title: "订货时间", width: 200, align: "center" },
        { colKey: "time_out", title: "出库时间", width: 200, align: "center" },
        { colKey: "caozuo", title: "操作", width: 200, align: "center" },
      ],
      rowcolumns: [
        { colKey: "serial-number", width: 50, title: "序号", align: "center" },
        { colKey: "receive_price", title: "应收款金额", align: "center" },
        { colKey: "actual_price", title: "实际收款金额", align: "center" },
        { colKey: "date", title: "收款日期时间", align: "center" },
        { colKey: "totalPrice", title: "欠款金额", align: "center" },

        // { colKey: "consignee_phone", title: "收货人手机号", align: "center" },
        // { colKey: "address", title: "收货人地址" },
      ],
      pageSize: 10,
      page: 1,
      total: 0,
      searchName: "",
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      this.visibleinfo = false;
      this.addvisible = false;
      this.visibleyunsong = false;
      http
        .get("/checkBills/getissue", {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            search: this.searchName,
          },
        })
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
          this.total = res.data.total;
        });
    },
    // onPick(value, context) {
    //   console.log("onPick:", value, context);
    // },
    // onChange(value, context) {
    //   console.log("onChange:", value, context);

    //   if (value.length == 0) return this.getlist();

    //   http
    //     .post("/warehousing/searchwarehousing", {
    //       date: value,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code == 0) {
    //         this.data = res.data.data;
    //         this.total = res.data.data.length;
    //       }
    //     });
    // },
    reset() {
      this.getlist();
      // new Date().toLocaleString
    },

    handleClick(e) {
      this.unitsValue = e.value;
      console.log(e);
      // e.value == 1 ? this.units=e.content : e.value == 2 ? this.$message.success('千克') : this.$message.success('斤')
    },
    //点击出库按钮触发
    openAdd() {
      this.visible1 = true;
    },

    search() {
      this.visibleinfo = false;
      this.addvisible = false;
      this.visibleyunsong = false;
      http
        .get("/checkBills/getissue", {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            search: this.searchName,
          },
        })
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
          this.total = res.data.total;
        });
    },
    // 点击零售按钮触发
    openlingshou() {
      this.visibleyunsong = false;
      this.addvisible = true; // 打开零售对话框
    },
    // 点击运送按钮触发
    openyunsong() {
      this.addvisible = false;
      this.visibleyunsong = true; //打开运送对话框
    },
    close1() {
      this.visible1 = false;
    },
    async handleOut(row) {
      this.timeOutParams = row;
      this.outTime = "";
      this.timeOut = 0;
      let data = await http.get("/checkBills/getclient", {
        params: { id: row.id },
      });
      console.log(data);
      this.qian =
        data.data.data.length === 0
          ? 0
          : data.data.data[data.data.data.length - 1].totalPrice;
      this.rowData = data.data.data;
      this.visibleModal = true;
    },
    handleTimeOut() {
      if (this.timeOut === 0) return MessagePlugin("info", "请填写实收金额");
      if (this.outTime === "") this.outTime = this.getCurrentDateTime();
      http
        .post("/checkBills/acprice", {
          price: this.timeOut,
          id: this.timeOutParams.id,
          receive_price: Number(this.timeOutParams.receive_price),
          totalPrice: this.total_price,
          date: this.outTime,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            MessagePlugin("success", "出库成功");
            this.getlist();
            this.visibleModal = false;
          } else {
            MessagePlugin("error", "出库失败");
          }
        });
    },
    handleSettle() {
      let msgs = null
      let msg = `<div>当前订单还有<span style='color:red;'>${this.total_price}元</span>未进行结清，是否继续选择结清?</div>`
      let msg2 = `<div>是否继续选择结算，此操作不可逆，是否确认结算?</div>`
      if (this.total_price > 0) {
        msgs = msg
      }else{
        msgs = msg2
      }
      this.$confirm(
          msgs,
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }
        )
          .then(() => {
            if (this.outTime === "") this.outTime = this.getCurrentDateTime();
            http
              .post("/checkBills/settle", {
                price: this.timeOut,
                id: this.timeOutParams.id,
                receive_price: Number(this.timeOutParams.receive_price),
                totalPrice: this.total_price,
                date: this.outTime,
              })
              .then((res) => {
                console.log(res);
                if (res.data.code == 0) {
                  MessagePlugin("success", "结清成功");
                  this.getlist();
                 this.visibleModal = false;
                }
              })
          })
          .catch(() => {
            MessagePlugin.info("暂不结清");
          });
    },
    handleInfo(row) {
      console.log(row);
      this.row = row;
      this.visibleinfo = true;
    },

    handleDelete(row) {
      this.$confirm(
        "此操作将永久删除此条数据并且还原仓库数据并更新库存数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(() => {
          console.log(row);

          http
            .get("/checkBills/delissue", { params: { id: row.id } })
            .then((res) => {
              console.log(res);
              if (res.data.code == 0) {
                this.getlist();
                MessagePlugin("success", "成功删除");
              }
            });
        })
        .catch(() => {
          MessagePlugin.info("取消删除");
        });
    },
    getCurrentDateTime() {
      const now = new Date(); // 获取当前时间

      // 获取年、月、日
      const year = now.getFullYear(); // 获取完整的年份（4位数字）
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 获取月份（0-11，需要加1）
      const day = String(now.getDate()).padStart(2, "0"); // 获取日期（1-31）

      // 获取时、分、秒
      const hours = String(now.getHours()).padStart(2, "0"); // 获取小时（24小时制）
      const minutes = String(now.getMinutes()).padStart(2, "0"); // 获取分钟
      const seconds = String(now.getSeconds()).padStart(2, "0"); // 获取秒

      // 拼接为字符串
      const dateTimeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return dateTimeStr;
    },
  },
};
</script>
<style lang="scss" scoped>
.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}
</style>
