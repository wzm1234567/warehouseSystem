<template>
  <div>
    <el-dialog :title="title" top="5vh" :visible.sync="visible" width="50%" @open="open" :show-close="false" :close-on-click-modal="false">
      <el-form ref="formData" :model="formData" label-width="120px">
        <el-form-item label="菜单类型">
          <el-radio-group v-model="formData.type" @input="radioChange" :disabled="formData.id">
            <el-radio :label="0">菜单</el-radio>
            <el-radio :label="1">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可见">
          <el-radio-group v-model="formData.hide">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-cascader v-model="formData.region" :options="options"
            :props="{ checkStrictly: true, label: 'title', value: 'id' }" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="formData.title" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input type="number" v-model="formData.sort" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.permission" :disabled="formData.type === 0" placeholder="请输入权限标识"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <t-select v-model="formData.icon" placeholder="请选择菜单图标" :disabled="formData.type === 1" filterable
            :popup-props="{ overlayStyle: { width: '400px' } }">
            <t-option v-for="item in optionsIcon" :value="item.stem" :key="item.stem" class="overlay-options">
              <div>
                <t-icon :name="item.stem" />
              </div>
            </t-option>
            <div slot="valueDisplay"><t-icon :name="formData.icon" :style="{ marginRight: '8px' }" />{{ formData.icon
            }}</div>
          </t-select>
        </el-form-item>
        <el-form-item label="菜单标识/名称">
          <el-input v-model="formData.name" :disabled="formData.type === 1" placeholder="请输入菜单标识"></el-input>
        </el-form-item>
        <el-form-item label="根路由地址" v-if="formData.region[0] === 0">
          <el-input v-model="formData.path" :disabled="formData.type === 1" placeholder="请输入根路由地址  头部不加/"></el-input>
        </el-form-item>
        <el-form-item label="子路由地址" v-else>
          <el-input v-model="formData.path" :disabled="formData.type === 1" placeholder="请输入子路由地址  头部不加/"></el-input>
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
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        region: [],
        icon: "",
        title: "",
        name: "",
        path: "",
        icon: "",
        type: 0,
        sort: 0,
        hide: 0,
        permission: "",
      },
      optionsIcon: manifest,
    };
  },
  created() {

  },
  methods: {
    open() {
      Object.assign(this.formData, this.dataRow)
      this.options.push({ title: '根路由', id: 0 })
      console.log(this.formData);
      console.log(this.dataRow);

    },
    // 选择菜单类型 时触发
    radioChange(e) {
      console.log(e);

    },
    async onConfirm() {
      console.log(this.formData);
      
      http.post("/admin/setmenu", this.formData).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.$emit("update:visible", false);
          this.$message.success(res.data.msg);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },
    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      this.formData = {
        region: [],
        icon: "",
        title: "",
        name: "",
        path: "",
        icon: "",
        type: 0,
        sort: 0,
        hide: 0,
        permission: "",
      },
        this.$emit("update:visible", false);
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
