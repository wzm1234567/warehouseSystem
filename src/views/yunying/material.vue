<template>
  <div>
    <div style="margin-left: 10px; display: flex">
      <!-- <t-input placeholder="请输入收货人名称" v-model="searchName" style="width: 200px" />
      <t-button @click="search">搜索</t-button> -->
      <t-button style="margin: 20px;" @click="add">添加物料</t-button>
      <t-button style="margin: 20px;" @click="del" theme="danger">删除物料</t-button>

    </div>

    <div style="margin-left: 10px; display: flex;margin-bottom: 30px;width: 400px;">
      <t-select label="仓库：" v-model="stash" :options="options1" placeholder="请选择仓库" @change="onGetStash" />
    </div>
    <section style="display: flex;justify-content: space-around;">
      <div style="width: 20%;">

        <t-table rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered"
          rowClassName="tableRow" :hover="hover" :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'"
          :showHeader="showHeader" cellEmptyContent="-" resizable>

          <template #label="{ row }">

            <div class="label" :style="data2Id == row.id ? 'background-color: #4ec8f8;' : ''"
              @click="getlist_pinpai(row.id)">
              {{ row.label }}
            </div>
          </template>

          <!-- <template #caozuo="{ row }">
            <div style="
              display: flex;
              justify-content: space-around;
              box-sizing: border-box;
              align-items: center;
            ">
              <t-button size="small" @click="handleInfo(row)">详情</t-button>

              <t-button size="small" @click="handleEdit(row)">编辑</t-button>

              <t-popconfirm placement="left" theme="danger" destroyOnClose showArrow :visible="false" content="确认删除吗">
                <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)">删除</t-button>
              </t-popconfirm>
            </div>
          </template> -->
        </t-table>
      </div>

      <div style="width: 30%;">
        <t-table rowKey="index" :data="data2" :columns="columns2" :stripe="stripe" :bordered="bordered"
          rowClassName="tableRow" :hover="hover" :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'"
          :showHeader="showHeader" cellEmptyContent="-" resizable>
          <template #pinpai="{ row }">

            <div class="label" @click="getlist_guige(row.id)"
              :style="data3Id == row.id ? 'background-color: #4ec8f8;' : ''">
              {{ row.pinpai }}
            </div>
          </template>

          <!-- <template #caozuo="{ row }">
            <div style="
              display: flex;
              justify-content: space-around;
              box-sizing: border-box;
              align-items: center;
            ">

              <t-button size="small" @click="handleEdit(row)">编辑</t-button>

              <t-popconfirm placement="left" theme="danger" destroyOnClose showArrow :visible="false" content="确认删除吗">
                <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)">删除</t-button>
              </t-popconfirm>
            </div>
          </template> -->
        </t-table>
      </div>

      <div style="width: 46%;">
        <t-table rowKey="index" :data="data3" :columns="columns3" :stripe="stripe" :bordered="bordered" :hover="hover"
          :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :showHeader="showHeader" cellEmptyContent="-"
          resizable>

          <template #surplus="{ row }">
            <span v-if="row.surplus != null" style="font-size: 18px;color: red;">{{ row.surplus }}袋</span>
          </template>

          <template #caozuo="{ row }">
            <div style="
              display: flex;
              justify-content: space-around;
              box-sizing: border-box;
              align-items: center;
            ">

              <!-- <t-button size="small" @click="handleEdit(row)">编辑</t-button> -->

              <t-popconfirm placement="left" theme="danger" destroyOnClose showArrow :visible="false" content="确认删除吗">
                <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)">删除</t-button>
              </t-popconfirm>
            </div>
          </template>
        </t-table>
      </div>
    </section>



    <addUpDialog :visible.sync="visible" @getlist="getlist"></addUpDialog>
  </div>
</template>
<script>
import http from "@/utils/http.js";
import addUpDialog from "./materialComp/addUpDialog";
export default {
  components: { addUpDialog },
  data() {
    return {
      stash: null,
      options1: [],
      visible: false,
      searchName: '',
      visibleinfo: false,
      addvisible: false,
      visible1: false,
      visibleyunsong: false,
      data: [],
      data2: [],
      data3: [],
      unitsValue: 1,
      size: "small",
      tableLayout: true,
      stripe: true,
      bordered: true,
      hover: false,
      showHeader: true,
      columns: [
        // { colKey: "serial-number", width: 60, title: "序号" },
        { colKey: "label", title: "物料名称", },
        // { colKey: "pinpai", title: "品牌", },
        // { colKey: "guige", title: "规格(kg)", },
        // { colKey: "time", title: "添加时间", },
        // { colKey: "uptime", title: "修改时间", },
        // { colKey: "caozuo", title: "操作" },
      ],
      data2Id: 0,
      columns2: [
        { colKey: "serial-number", width: 60, title: "序号", align: 'center' },
        // { colKey: "label", title: "物料名称", },
        { colKey: "pinpai", title: "品牌", },
        // { colKey: "guige", title: "规格(kg)", },
        // { colKey: "time", title: "添加时间", },
        // { colKey: "uptime", title: "修改时间", },
        // { colKey: "caozuo", title: "操作", width: 160, align: 'center' },
      ],
      data3Id: 0,
      columns3: [
        { colKey: "serial-number", width: 60, title: "序号", align: 'center' },
        // { colKey: "label", title: "物料名称", },
        // { colKey: "pinpai", title: "品牌", },
        { colKey: "guige", title: "规格(kg)", align: 'center' },
        { colKey: 'surplus', title: '仓库剩余余量（剩余袋数）', ellipsis: true },
        // { colKey: "time", title: "添加时间", },
        // { colKey: "uptime", title: "修改时间", },
        { colKey: "caozuo", title: "操作", width: 100, align: 'center' },
      ],
    }
  },
  created() {
    this.getmaterialstash()
    // 
  },
  methods: {
    onGetStash() {
      console.log(this.stash);
      this.data2Id = 0
      this.getlist()
    },
    getmaterialstash() {
      http.get("/admin/getmaterialstash").then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data.length > 0) this.stash = res.data.data[0].id
          this.getlist()
          res.data.data.forEach(item => {
            this.options1.push({
              label: item.name,
              value: item.id
            })
          })
        }
      })
    },
    async getlist() {
      let data = await http.get("/admin/getmaterial", { params: { stashId: this.stash } })
      // console.log(data);
      this.data = data.data.data
      if (data.data.data.length != 0) this.data2Id = data.data.data[0].id


      this.getlist_pinpai()
    },
    async getlist_pinpai(id) {
      console.log(id);

      if (id != undefined) this.data2Id = id


      let data2 = await http.get("/admin/getmaterial_pinpai?id=" + this.data2Id)
      console.log(data2);
      this.data2 = data2.data.data
      if (data2.data.data.length == 0) {
        this.data3Id = 0
      } else {
        this.data3Id = data2.data.data[0].id
      }

      this.getlist_guige()

    },
    async getlist_guige(id) {
      if (id != undefined) this.data3Id = id
      let data3 = await http.get("/admin/getmaterial_guige?id=" + this.data3Id)
      console.log(data3);

      this.data3 = data3.data.data
    },
    search() {

    },
    add() {
      this.visible = true
    },
    del() {

    },
    handleDelete(row) {
      this.$confirm(
        "此操作将永久删除该客户信息，但不会删除订单信息，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          http.post("/admin/delmaterial", row).then(res => {
            if (res.data.code == 0) {
              this.$message.success("删除成功");
              this.getlist();
            }

          })

        })
        .catch(() => {
          this.$message.info("取消删除");
        });

    }

  },
}
</script>
<style lang="scss" scoped>
.label {
  cursor: pointer;
  padding: 6px;
}

::v-deep .tableRow {
  td {
    padding: 2px;
  }
}
</style>