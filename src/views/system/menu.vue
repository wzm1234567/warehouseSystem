<template>
  <div>
    <t-button
      theme="primary"
      @click="editMenu({}, '添加路由')"
      style="margin: 20px 5px"
      >添加路由</t-button
    >
    <t-enhanced-table
      ref="enhancedTableRef"
      row-key="id"
      :expanded-row-keys="expandedRowKeys"
      @expand-change="onExpandChange"
      :columns="columns"
      :data="data"
      :tree="{
        childrenKey: 'children',
        checkStrictly: checkStrictly === 'true' ? true : false,
        // 第 2 列显示树形结构展开节点
        treeNodeColumnIndex: 1,
        // expandTreeNodeOnClick: true,
      }"
      :scroll="{ type: 'virtual', rowHeight: 49, bufferSize: 10 }"
      :selected-row-keys="selectedRowKeys"
      lazyLoad
      @select-change="rehandleSelectChange"
      @row-click="onRowClick"
    >
      <template #caozuo="{ row }">
        <div style="display: flex; justify-content: space-around">
          <t-button
            theme="primary"
            size="small"
            @click.stop="editMenu(row, '修改路由')"
            >修改</t-button
          >
          <t-button
            theme="danger"
            size="small"
            @click="() => MessagePlugin.info('点击了操作按钮')"
            >删除</t-button
          >
        </div>
      </template>
    </t-enhanced-table>

    <menu-dialog
      :visible.sync="visible"
      :data="dataRow"
      :title="title"
    ></menu-dialog>
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
      data: this.$store.getters.getmenu,
      checkStrictly: "true",
      dataRow: {},
      selectedRowKeys: [],
      expandedRowKeys: [],
      title: "",
      columns: [
        { colKey: "serial-number", width: 80, title: "编号" },
        { colKey: "title", title: "名称" },
        { colKey: "path", title: "路由", },
        { colKey: "name", title: "名字",  },
        { colKey: "icon", title: "图标",},
        { colKey: "component", title: "文件地址" },
        { colKey: "caozuo", title: "操作" },
      ],
    };
  },
  created() {
    console.log(this.data);
  },
  methods: {
    rehandleSelectChange(e) {
      console.log(e, 666666);
    },
    onRowClick(e) {
      console.log(e, 77777);
    },
    // expandedRowRender(h, { row }) {
    //   return <div>这是展开项数据，我是 {row.key} 号</div>;
    // },
    onExpandChange(val) {
      this.expandedRowKeys = val;
    },
    editMenu(row, title) {
      console.log(row);
      this.visible = true;
      this.dataRow = row;
      this.title = title;
    },
  },
};
</script>
<style lang="scss" scoped></style>
