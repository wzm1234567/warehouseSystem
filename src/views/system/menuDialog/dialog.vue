<template>
  <div>
    <t-dialog :header="title" :visible.sync="visible" @confirm="onConfirm" width="40%" :onConfirm="onConfirmAnother"
      :onClose="close">
      <div style="margin-top:30px">
        <t-form :data="formData" labelWidth="calc(2em + 54px)" ref="form"
          scrollToFirstError="smooth">
          <t-form-item label="上级菜单" help="想要创建根路由,请选择根路由" name="region">
            <!-- <t-select v-model="formData.region" :options="options" placeholder="请选择上级菜单" /> -->
            <!-- <el-cascader :value="formData.region"  :options="options" :props="{ checkStrictly: true, }" :filterable="true" clearable></el-cascader> -->
            <el-cascader placeholder="试试搜索：指南" :options="options" filterable></el-cascader>
          </t-form-item>
          <t-form-item label="菜单名称" name="title">
            <t-input v-model="formData.title" placeholder="请输入菜单名称"></t-input>
          </t-form-item>

          <t-form-item label="菜单图标" help="例如：edit-1" name="icon">
            <!-- <t-input v-model="formData.icon" placeholder="请输入菜单图标"></t-input> -->
            <t-select v-model="formData.icon" placeholder="请选择菜单图标" :popup-props="{ overlayStyle: { width: '400px' } }">
              <t-option v-for="item in optionsIcon" :value="item.stem" :key="item.stem" class="overlay-options">
                <div>
                  <t-icon :name="item.stem" />
                </div>
              </t-option>
              <div slot="valueDisplay"><t-icon :name="formData.icon" :style="{ marginRight: '8px' }" />{{ formData.icon
                }}</div>
            </t-select>
          </t-form-item>
          <t-form-item label="组件路径" help="path路径,例:/menu" name="path">
            <t-input v-model="formData.path" placeholder="请输入组件路径"></t-input>
          </t-form-item>
          <!-- <t-form-item label="路由名称" help="路由名称与组件路径一致,例:menu" name="name">
            <t-input v-model="formData.name" placeholder="请输入路由名称"></t-input>
          </t-form-item> -->
          <t-form-item label="根路由地址" v-if="formData.region === '0'" name="address">
            <t-input v-model="formData.address" placeholder="请输入根路由地址"></t-input>
          </t-form-item>
          <t-form-item label="子路由地址" help="请在views文件夹下面创建对应的vue文件,例:/system/menu" name="address"
            v-if="formData.region !== '0'">
            <t-input v-model="formData.address" placeholder="请输入子路由地址"></t-input>
          </t-form-item>

        </t-form>
      </div>
    </t-dialog>
  </div>
</template>
<script>
import http from "../../../utils/http"
import { manifest } from 'tdesign-icons-vue'; // 获取全部图标的列表

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
        region: '',
        icon: '',
        title: '',
        address: '',
        path: '',
        name: '',
        icon: 'edit-1'
      },
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      optionsIcon: manifest,
    };
  },
  created() {
    // this.options = this.$store.getters.getmenu;

    // // this.options.forEach((item) => {
    // //   item.label = item.title;
    // //   item.value = item.id;
    // //   item.children.forEach((item2) => {
    // //     item2.label = item2.title;
    // //     item2.value = item2.id;
    // //   });
    // // });
    // this.options = [ { label: '根路由', value: 0 }]
    // console.log(this.options, 666);

  },
  methods: {
    async onConfirm(context) {
      console.log(
        "@confirm与onConfirm任选一种方式即可，其他几个事件类似",
        context
      );

      http.post("/admin/setmenu", this.formData).then(res => {
        console.log(res);
        this.$emit("update:visible", false);
        window.location.reload();
      })

    },
    onConfirmAnother(context) {
      console.log("点击了确认按钮", context);
    },
    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      this.formData = {
        layout: "",
        region: '',
        icon: '',
        title: '',
        address: '',
        path: '',
        name: '',
        icon: 'edit-1'
      },
        this.$emit("update:visible", false);
    },
    onCancel(context) {
      console.log("点击了取消按钮", context);
    },
    onKeydownEsc(context) {
      console.log("按下了ESC", context);
    },
    onClickCloseBtn(context) {
      console.log("点击了关闭按钮", context);
    },
    onClickOverlay(context) {
      console.log("点击了蒙层", context);
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
