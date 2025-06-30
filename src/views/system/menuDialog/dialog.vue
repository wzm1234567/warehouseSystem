<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="60%" :before-close="handleClose">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-form-item label="上级菜单">
          <el-cascader v-model="formData.region" :options="options" :props="{ checkStrictly: true,label:'title',value: 'id' }" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="formData.title" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        
        <el-form-item label="菜单图标">
          <t-select v-model="formData.icon" placeholder="请选择菜单图标" filterable  :popup-props="{ overlayStyle: { width: '400px' } }">
              <t-option v-for="item in optionsIcon" :value="item.stem" :key="item.stem" class="overlay-options">
                <div>
                  <t-icon :name="item.stem" />
                </div>
              </t-option>
              <div slot="valueDisplay"><t-icon :name="formData.icon" :style="{ marginRight: '8px' }" />{{ formData.icon
              }}</div>
            </t-select>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="formData.path" placeholder="请输入组件路径"></el-input>
        </el-form-item>
        <el-form-item label="根路由地址" v-if="formData.region === '0'">
          <el-input v-model="formData.address" placeholder="请输入根路由地址"></el-input>
        </el-form-item>
        <el-form-item label="子路由地址"  v-if="formData.region !== '0'">
          <el-input v-model="formData.address" placeholder="请输入子路由地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import http from "../../../utils/http";
import { manifest } from "tdesign-icons-vue"; // 获取全部图标的列表

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    dataRow: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      formData: {
        region: "",
        icon: "",
        title: "",
        address: "",
        path: "",
        name: "",
        icon: "",
      },
      options: [],
      optionsIcon: manifest,
    };
  },
  created() {
    this.options = this.$store.getters.getmenu;
    // this.options.forEach((item) => {
    //   item.label = item.title;
    //   item.value = item.id;
    //   item.children.forEach((item2) => {
    //     item2.label = item2.title;
    //     item2.value = item2.id;
    //   });
    // });
    this.options = [ ...this.options, { title: '根路由', id: 0 }]
    console.log(this.options, 666);
  },
  methods: {
    async onConfirm() {
      http.post("/admin/setmenu", this.formData).then((res) => {
        console.log(res);
        this.$emit("update:visible", false);
        window.location.reload();
      });
    },
    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      (this.formData = {
        layout: "",
        region: "",
        icon: "",
        title: "",
        address: "",
        path: "",
        name: "",
        icon: "edit-1",
      }),
        this.$emit("update:visible", false);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
  },
};
</script>
<style lang="scss" scope>
.overlay-options {
  display: inline-block;
  font-size: 20px !important;
}
</style>
