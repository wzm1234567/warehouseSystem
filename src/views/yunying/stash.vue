<template>
  <div>
    <div style="display: flex; align-items: center; margin: 10px 0 20px 0">
      <!-- <div>

                <t-date-picker mode="month" clearable allow-input @change="onChange" />
            </div> -->
      <div style="margin-left: 10px">
        <!-- <t-button>搜索</t-button> -->
      </div>
    </div>
    <div
      style="
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
      "
    >
      <div>
        <!-- <t-button style="margin-right: 15px;">创建仓库</t-button> -->
        <t-dropdown
          :options="[
            { content: '吨', value: 1 },
            { content: '千克', value: 2 },
            { content: '斤', value: 3 },
          ]"
          @click="handleClick"
        >
          <t-button style="padding: 5px" variant="outline">选择单位</t-button>
        </t-dropdown>
      </div>
      <t-button @click="reset">刷新数据</t-button>
    </div>

    <div style="display: flex; width: 100%; justify-content: space-between">
      <div style="width: 18%">
        <div
          style="
            display: flex;
            justify-content: space-around;
            margin-bottom: 15px;
          "
        >
          <t-button size="small" @click="addStash"
            ><add-icon slot="icon" />创建仓库</t-button
          >
          <t-button size="small" theme="danger"
            ><delete-icon slot="icon" />删除仓库</t-button
          >
        </div>
        <t-table
          rowKey="id"
          :data="data"
          :columns="columns"
          :stripe="stripe"
          rowClassName="tableRow"
          :bordered="bordered"
          :hover="hover"
          :size="size"
          :table-layout="tableLayout ? 'auto' : 'fixed'"
          :showHeader="showHeader"
          cellEmptyContent="-"
          resizable
        >
          <template #name="{ row }">
            <div
              :style="
                row.id == flagId
                  ? 'cursor: pointer;background-color: #4ec8f8;padding:6px;'
                  : 'cursor: pointer;padding:6px;'
              "
              @click="handleClickqh(row)"
            >
              {{ row.name }}
            </div>
          </template>
        </t-table>
      </div>
      <div style="width: 80%">
        <div
          style="
            display: flex;
            margin-bottom: 15px;
            padding: 0 12px;
            height: 26px;
            justify-content: space-between;
          "
        >
          <div style="display: flex; align-items: center">
            <t-date-range-picker
              enable-time-picker
              allow-input
              clearable
              @change="pickeronChange"
            />
            <t-input
              style="width: 200px"
              v-model="input"
              placeholder="请输入物料名称"
            />
            <t-button
              size="small"
              style="padding: 5px 12px; margin-left: 5px"
              @click="search"
              >搜索</t-button
            >
          </div>
          <div>
            <t-link theme="warning" style="margin-right: 15px"
              >收入：{{ income }}</t-link
            >
            <t-link theme="success">支出：{{ expenditure }}</t-link>
          </div>
        </div>
        <t-table
          rowKey="id"
          :data="data2"
          :columns="columns2"
          :stripe="stripe"
          :bordered="bordered"
          :hover="hover"
          :size="size"
          :table-layout="tableLayout ? 'auto' : 'fixed'"
          :showHeader="showHeader"
          cellEmptyContent="-"
          resizable
          :sort="sort"
          @sort-change="sortChange"
          max-height="450px"
        >
          <template #name="{ row }">
            <span style="font-size: 16px">{{ row.name }}</span>
          </template>
          <template #type="{ row }">
            <t-tag theme="success" v-if="row.type == 0">入库</t-tag>
            <t-tag theme="warning" v-else>出库</t-tag>
          </template>

          <template #num="{ row }">
            <span style="color: orangered; font-size: 17px; font-weight: 600">{{
              row.num
            }}</span
            >袋
          </template>

          <template #weight="{ row }">
            {{
              unitsValue == 1
                ? row.weight / 1000 + "吨"
                : unitsValue == 2
                ? row.weight + "千克"
                : row.weight * 2000 + "斤"
            }}
          </template>
          <template #guige="{ row }"> {{ row.guige }}千克 </template>

          <template #price="{ row }">
            <span
              :style="
                row.type == 1
                  ? 'color: red;font-size: 17px;font-weight: 600;'
                  : 'color: green;font-size: 17px;font-weight: 600;'
              "
              >{{ row.price }}</span
            >元
          </template>

          <template #time="{ row }">
            {{ new Date(row.time).toLocaleString().replaceAll("/", "-") }}
          </template>
        </t-table>
        <t-pagination
          v-model="page"
          style="margin-top: 20px; padding: 0 30px"
          :total="total"
          showPageNumber
          showPageSize
          page-ellipsis-mode="both-ends"
          showPreviousAndNextBtn
          :page-size.sync="pageSize"
          totalContent
          @change="getdata"
          :page-size-options="pageSizeOptions"
        />
      </div>
    </div>

    <stachDialog :visible1.sync="visible1" @getlist="getlist"></stachDialog>
    <stachInfoDrawer
      :visibleInfo.sync="visibleInfo"
      @getlist="getlist"
    ></stachInfoDrawer>
  </div>
</template>
<script>
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue";
import {
  AddIcon,
  CloudUploadIcon,
  SearchIcon,
  DiscountIcon,
  CloudDownloadIcon,
  DeleteIcon,
} from "tdesign-icons-vue";
import stachDialog from "./stachChild/stachDialog.vue";
import http from "../../utils/http.js";
import stachInfoDrawer from "./stachChild/stachInfoDrawer.vue";
export default {
  components: {
    stachDialog,
    stachInfoDrawer,
    AddIcon,
    CloudUploadIcon,
    DiscountIcon,
    CloudDownloadIcon,
    DeleteIcon,
  },
  data() {
    return {
      sort: {
        // 按照 status 字段进行排序
        sortBy: "type",
        // 是否按照降序进行排序
        descending: true,
      },
      visible1: false,
      time: null,
      data: [],
      unitsValue: 2,
      size: "small",
      tableLayout: true,
      stripe: true,
      bordered: true,
      hover: false,
      showHeader: true,
      columns: [{ colKey: "name", title: "仓库名称" }],

      visibleInfo: false,
      data2: [],
      columns2: [
        { colKey: "serial-number", width: 50, title: "序号", align: "center" },
        { colKey: "name", title: "物料名称" },
        { colKey: "pinpai", title: "品牌" },
        {
          colKey: "type",
          title: "类型",
          align: "center",
          width: 100,
          sorter: true,
          sortType: "all",
        },
        { colKey: "num", title: "数量", ellipsis: true },
        { colKey: "weight", title: "总重量" },
        { colKey: "guige", title: "规格" },
        { colKey: "price", title: "总金额" },
        { colKey: "time", title: "出库/入库时间", width: 200, align: "center" },
        // { colKey: 'caozuo', title: '操作' },
      ],
      flagId: 0,
      pageSize: 15,
      page: 1,
      total: 0,
      pageSizeOptions: [
        { label: "每页 10 条", value: 10 },
        { label: "每页 15 条", value: 15 },
        { label: "每页 20 条", value: 20 },
        { label: "每页 50 条", value: 50 },
      ],
      input: "",
      timeArray: [],
    };
  },
  computed: {
    income() {
      // 收入
      let num = 0;
      this.data2.forEach((item) => {
        if (item.type == 1) num += Number(item.price);
        console.log(item);
      });
      return num;
    },
    expenditure() {
      // 支出
      let num = 0;
      this.data2.forEach((item) => {
        if (item.type == 0) num += Number(item.price);
      });
      return num;
    },
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      console.log(this.time);
      http.post("/stash/getstash").then((res) => {
        console.log(res);
        this.data = res.data.data;
        if (res.data.data.length != 0) this.flagId = res.data.data[0].id;

        this.getdata();
      });
    },
    getdata() {
      http
        .get("/stash/getstashinfo", {
          params: { id: this.flagId, page: this.page, pageSize: this.pageSize },
        })
        .then((res) => {
          console.log(res);

          this.data2 = res.data.data;
          this.total = res.data.total;
        });
    },
    // 切换左侧列表 切换仓库
    handleClickqh(row) {
      this.flagId = row.id;
      this.getdata();
    },
    // 添加仓库
    addStash() {
      this.visible1 = true;
    },
    // 添加物料 打开抽屉
    addWuliao() {
      this.visibleInfo = true;
    },
    onPick(value, context) {
      console.log("onPick:", value, context);
    },
    onChange(value, context) {
      console.log(value);
      this.time = value;
      this.getlist();
    },
    reset() {
      if (this.input != "") return this.$message.warning("请清空搜索框内容");

      this.getlist();
    },
    sortChange(sortInfo) {
      // 对于受控属性而言，这里的赋值很重要，不可缺少
      console.log(sortInfo);

      this.sort = sortInfo;
      this.request(sortInfo);
      console.log("sort-change", sortInfo);
    },
    request(sort) {
      console.log(sort);

      console.log(this.flagId);

      // 模拟异步请求，进行数据排序
      http
        .get("/stash/getstashinfo", {
          params: { id: this.flagId, page: this.page, pageSize: this.pageSize },
        })
        .then((res) => {
          console.log(res);
          if (sort) {
            this.data2 = res.data.data
              .concat()
              .sort((a, b) =>
                sort.descending
                  ? b[sort.sortBy] - a[sort.sortBy]
                  : a[sort.sortBy] - b[sort.sortBy]
              );
          } else {
            this.data = res.data.data.concat();
          }
        });
    },
    handleClick(e) {
      this.unitsValue = e.value;
      console.log(e);
    },

    pickeronChange(value, context) {
      // console.log('onChange:', value, context);
      // console.log('timestamp:',context.dayjsValue.map((d) => d.valueOf()));// 转化时间戳
      // console.log('YYYYMMDD:',context.dayjsValue.map((d) => d.format('YYYYMMDD')));
      this.timeArray = context.dayjsValue.map((d) => d.valueOf());
      //   http.post("/stash/searchstash", {
      //       timeArray: this.timeArray,
      //       stashId: this.flagId,
      //       name: this.input,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       this.data2 = res.data.data;
      //     });
    },

    search() {
      if (this.input == "" && this.timeArray.length == 0)
        return this.$message.warning("请输入搜索内容或选择日期");

      http.post("/stash/searchstash", {
          timeArray: this.timeArray,
          stashId: this.flagId,
          name: this.input,
        })
        .then((res) => {
          console.log(res);
          this.data2 = res.data.data;
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

::v-deep .tableRow {
  td {
    padding: 2px;
  }
}
</style>
