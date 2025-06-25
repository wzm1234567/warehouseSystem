<template>
  <div>
    <div style="display: flex; align-items: center; margin: 10px 0 20px 0">
      <!-- <div>
        <t-date-range-picker enable-time-picker allow-input clearable />
      </div> -->
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
      <div>
        <t-button style="margin-right: 15px" @click="openAdd">出库</t-button>
        <!-- <t-dropdown :options="[
          { content: '吨', value: 1 },
          { content: '千克', value: 2 },
          { content: '斤', value: 3 },
        ]" @click="handleClick">
          <t-button style="padding: 5px" variant="outline">选择单位</t-button>
        </t-dropdown> -->
      </div>
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
          <span v-if="row.time_out !== null">{{ new Date(row.time_out).toLocaleString().replaceAll("/", "-") }}</span>
          <span v-else style="color: red;">待出库</span>
        </template>

        <template #caozuo="{ row }">
          <div>
            <el-row>
              <el-col :span="8">
                <t-button size="small" @click="handleInfo(row)">详情</t-button>
              </el-col>
              <el-col :span="8">
                <t-button v-if="row.time_out === null" size="small" theme="success" @click="handleOut(row)"
                  style="margin: 0 12px;">出库</t-button>
              </el-col>
              <el-col :span="8">
                <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)"
                  style="margin: 0 12px;">删除</t-button>
              </el-col>
            </el-row>
          </div>
          <!-- <div
            style="
              display: flex;
              
              box-sizing: border-box;
              align-items: center;
            "
          >
            

            


            
            
          </div> -->
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
    <t-dialog header="选择出库时间" :visible.sync="visibleModal" mode="modal" draggable :onConfirm="handleTimeOut">
      <div slot="body">
        <t-date-picker v-model="timeOut" placeholder="请选择出库时间" clearable allow-input style="width: 100%;"
          @change="handleChange" />
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
  data() {
    return {
      timeOutParams: {},
      timeOut: '',
      visibleModal: false,
      row: {},
      visibleinfo: false,
      addvisible: false,
      visible1: false,
      visibleyunsong: false,
      data: [],
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
    getlist() {
      this.visibleinfo = false;
      this.addvisible = false;
      this.visibleyunsong = false;
      http
        .get("/issue/getissue", {
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
        .get("/issue/getissue", {
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
    handleOut(row) {
      this.timeOutParams = row
      this.visibleModal = true
    },
    handleTimeOut() {
      http.post('/issue/timeout', { date: this.timeOut, id: this.timeOutParams.id }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          MessagePlugin('success', '出库成功')
          this.getlist();
          this.visibleModal = false
        } else {
          MessagePlugin('error', '出库失败')
        }
      })
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
            .get("/issue/delissue", { params: { id: row.id } })
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
  },
};
</script>
<style lang="scss" scoped>
.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}
</style>
