<template>
  <div>
    <t-dialog
      :header="title"
      :visible.sync="visible"
      @confirm="onConfirm"
      width="40%"
      :confirmOnEnter="true"
      :onConfirm="onConfirmAnother"
      :onClose="close"
    >
      <div style="margin-top:30px">
        <t-form
          :data="formData"
          labelWidth="calc(2em + 54px)"
       
          ref="form"
          @reset="onReset"
          @submit="onSubmit"
          scrollToFirstError="smooth"
        >
          <t-form-item label="上级菜单" help="想要创建根路由,请选择根路由" name="region">
            <t-select v-model="formData.region" :options="options" placeholder="请选择上级菜单" />
          </t-form-item>
          <t-form-item label="菜单名称" name="title">
            <t-input 
              v-model="formData.title"
              placeholder="请输入菜单名称"
            ></t-input>
          </t-form-item>
         
          <t-form-item label="菜单图标" help="例如：edit-1" name="icon">
            <t-input 
              v-model="formData.icon"
              placeholder="请输入菜单图标"
            ></t-input>
          </t-form-item>
          <t-form-item label="路由名称" name="name">
            <t-input 
              v-model="formData.name"
              placeholder="请输入路由名称"
            ></t-input>
          </t-form-item>
          <t-form-item label="根路由地址" v-if="formData.region==='0'" name="address" >
            <t-input 
              v-model="formData.address"
              placeholder="请输入根路由地址"
              
            ></t-input>
          </t-form-item>
          <t-form-item label="子路由地址" help="请在views文件夹下面创建对应的vue文件" name="address" v-if="formData.region!=='0'">
            <t-input 
              v-model="formData.address"
              placeholder="请输入子路由地址"
              
            ></t-input>
          </t-form-item>
          <t-form-item label="组件路径" help="例如：/system" name="path">
            <t-input 
              v-model="formData.path"
              placeholder="请输入组件路径"
            ></t-input>
          </t-form-item>
        </t-form>
      </div>
    </t-dialog>
  </div>
</template>
<script>
import http from "../../../utils/http"
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
        region:'',
        icon:'',
        title:'',
        address:'',
        path:'',
        name:'',
      },
      options: [],
    };
  },
  created() {
    this.options = this.$store.getters.getmenu;
    this.options.forEach((item) => {
      item.label = item.title;
      item.value = item.id;
      item.children.forEach((item2) => {
        item2.label = item2.title;
        item2.value = item2.id;
      });
    });
    this.options = [...this.options,{label:'根路由',value:'0'}]
  },
  methods: {
    async onConfirm(context) {
      console.log(
        "@confirm与onConfirm任选一种方式即可，其他几个事件类似",
        context
      );

     http.post("/admin/setmenu",this.formData).then(res=>{
        console.log(res);
        window.location.reload();
     })
       
        
      
      console.log(this.formData);
      
      this.visible = false;
    },
    onConfirmAnother(context) {
      console.log("点击了确认按钮", context);
    },
    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      this.formData = {
        layout: "",
        region:'',
        icon:'',
        title:'',
        address:'',
        path:'',
        name:'',
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
<style lang="scss" scope></style>
