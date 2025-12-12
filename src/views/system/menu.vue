<template>
  <div>
    <t-button theme="primary" @click="editMenu({}, '添加路由')" style="margin: 20px 5px">添加路由</t-button>
    <t-enhanced-table ref="enhancedTableRef" row-key="id" :expanded-row-keys="expandedRowKeys"
      @expand-change="onExpandChange" :columns="columns" :data="data" :tree="{
        childrenKey: 'children',
        checkStrictly: checkStrictly === 'true' ? true : false,
        // 第 2 列显示树形结构展开节点
        treeNodeColumnIndex: 1,
        // expandTreeNodeOnClick: true,
      }" :scroll="{ type: 'virtual', rowHeight: 49, bufferSize: 10 }" :selected-row-keys="selectedRowKeys" lazyLoad
      @select-change="rehandleSelectChange">
      <template #type="{ row }">
        <t-link v-if="row.type === 0" theme="primary">菜单</t-link>
        <t-link v-else theme="danger">按钮</t-link>
      </template>
      <template #hide="{ row }">
        <t-link v-if="row.hide === 0" theme="primary">显示</t-link>
        <t-link v-else theme="danger">隐藏</t-link>
      </template>
      <template #permission="{ row }">
        <t-link v-if="row.type === 1">{{ row.permission }}</t-link>
      </template>
      <template #caozuo="{ row }">
        <div style="display: flex; justify-content: space-around">
          <t-button theme="primary" size="small" @click.stop="editMenu(row, '修改路由')">修改</t-button>
          <t-button theme="danger" size="small" @click="del(row)">删除</t-button>
        </div>
      </template>
    </t-enhanced-table>

    <menu-dialog :visible.sync="visible" :dataRow="dataRow" :title="title" :options="data"></menu-dialog>
  </div>
</template>
<script>
import { EnhancedTable, MessagePlugin } from "tdesign-vue";
import cloneDeep from "lodash/cloneDeep";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue";

import menuDialog from "./menuDialog/dialog.vue";
export default {
  components: { TEnhancedTable: EnhancedTable, menuDialog },
  data() {
    return {
      visible: false,
      data: [],
      checkStrictly: "true",
      dataRow: {},
      selectedRowKeys: [],
      expandedRowKeys: [],
      title: "",
      columns: [
        { colKey: "serial-number", width: 80, title: "编号" },
        { colKey: "title", title: "名称", align: 'center' },
        { colKey: "path", title: "路由", align: 'center' },
        { colKey: "name", title: "名字", align: 'center' },
        { colKey: "icon", title: "图标", align: 'center' },
        { colKey: "type", title: "类型", align: 'center' },
        { colKey: "hide", title: "是否显示", align: 'center' },
        { colKey: "sort", title: "排序", align: 'center' },
        { colKey: "permission", title: "按钮权限", align: 'center' },
        { colKey: "caozuo", title: "操作", align: 'center' },
      ],
    };
  },
  created() {

    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      this.$http.get("/admin/menuList").then(res => {
        this.data = res.data.data
        console.log(this.data);
      })
    },
    del(row) {
      console.log(row);
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '确认提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$http.get("/admin/delMenu", { params: { id: row.id } })
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    rehandleSelectChange(e) {
      console.log(e, 666666);
    },
    // expandedRowRender(h, { row }) {
    //   return <div>这是展开项数据，我是 {row.key} 号</div>;
    // },
    onExpandChange(val) {
      this.expandedRowKeys = val;
    },
    editMenu(row, title) {
      row.region = [row.pid]
      this.visible = true;
      this.dataRow = row;
      this.title = title;
    },
  },
};
</script>
<style lang="scss" scoped></style>
