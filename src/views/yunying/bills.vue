<template>
  <div>
    <div style="display: flex; align-items: center; margin: 10px 0 20px 0">
      <div>
        <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
      </div>
      <div style="margin-left: 10px">
        <!-- <t-button>搜索</t-button> -->
      </div>
    </div>
    <div style="
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
      ">
      <t-button @click="handleAdd">创建账单</t-button>
      <t-button @click="reset">刷新数据</t-button>
    </div>
    <div>
      <t-table rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered" :hover="hover"
        :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :showHeader="showHeader" cellEmptyContent="-"
        resizable>
        <!-- <template #create_time="{ row }">
          {{ new Date(row.create_time).toLocaleString().replaceAll("/", "-") }}
        </template>
<template #update_time="{ row }">
          {{ new Date(row.update_time).toLocaleString().replaceAll("/", "-") }}
        </template> -->
        <template #date="{ row }">
          <!-- {{ new Date(row.date).toLocaleDateString().replaceAll("/", "-") }} -->
          {{ row.date }}
        </template>
        <!-- <template #shijijiaoyie="{ row }">
          {{ Number(row.shijijiaoyidunshu) * Number(row.fahoprice) }}
        </template> -->
        <template #brand="{ row }">
          {{ Number(row.dakuanqianshu) - Number(row.shijijiaoyie) }}
        </template>
        <template #fapiaodingdan="{ row }">
          <t-link v-if="row.fapiaodingdan !== ''" theme="primary" @click="handleviewdingdan(row)">查看发票订单</t-link>
          <span v-else style="color: red; font-size: 14px">未上传发票订单</span>
        </template>
        <template #caozuo="{ row }">
          <div style="
              display: flex;
              justify-content: space-around;
              box-sizing: border-box;
            ">
            <!-- <t-button size="small" @click="handleEdit(row)">编辑</t-button> -->

            <t-popconfirm placement="left" theme="danger" destroyOnClose showArrow :visible="false" content="确认删除吗">
              <t-button theme="danger" variant="base" size="small" @click="handleDelete(row)">删除</t-button>
            </t-popconfirm>
          </div>
        </template>
      </t-table>

      <t-pagination v-model="page" style="margin-top: 20px; padding: 0 30px" :total="total" showPageNumber showPageSize
        page-ellipsis-mode="both-ends" showPreviousAndNextBtn :page-size.sync="pageSize" totalContent
        @change="getlist" />
    </div>

    <t-dialog :header="formData.hasOwnProperty('id') ? '修改账单':'添加账单'" :visible.sync="visibleAdd" width="60%" top="5vh" :confirmOnEnter="false" :footer="false"
      :onClose="close">
      <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">
        <t-form-item label="发单日期" name="date" :rules="[
          { required: true, message: '此项必填' },
          { date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' },
        ]">
          <t-date-picker v-model="formData.date" valueType="YYYY-MM-DD"></t-date-picker>
        </t-form-item>
        <t-form-item label="发货吨数" name="fahuodunshu" :rules="[
          { required: true, message: '此项必填' },
        ]">
          <t-input v-model="formData.fahuodunshu" placeholder="请输入发货吨数" />
        </t-form-item>
        <t-form-item label="发货价格" name="fahoprice" :rules="[
          { required: true, message: '此项必填' },
        ]">
          <t-input v-model="formData.fahoprice" placeholder="请输入发货价格（元）" />
        </t-form-item>
        <t-form-item label="品种" name="pinzhong" :rules="[
          { required: true, message: '此项必填' },
        ]">
          <t-input v-model="formData.pinzhong" placeholder="请输入品种" />
        </t-form-item>
        <t-form-item label="车牌号" name="plate" :rules="[
          { required: true, message: '此项必填' },
        ]">
          <t-input v-model="formData.plate" placeholder="请输入车牌号" />
        </t-form-item>
        <t-form-item label="实际交易吨数" name="shijijiaoyidunshu" :rules="[
          { required: true, message: '此项必填' },
        ]">
          <t-input v-model="formData.shijijiaoyidunshu" placeholder="请输入实际交易吨数" />
        </t-form-item>
        <!-- <t-form-item label="实际交易额" name="shijijiaoyie">
          <t-input
            v-model="formData.shijijiaoyie"
            placeholder="请输入实际交易额"
          />
        </t-form-item> -->
        <t-form-item label="打款钱数" name="dakuanqianshu" :rules="[
          { required: true, message: '此项必填' },
        ]">
          <t-input v-model="formData.dakuanqianshu" placeholder="请输入打款钱数" />
        </t-form-item>
        <t-form-item label="上传发票订单" name="fapiaodingdan">
          <el-upload 
            v-model="formData.fapiaodingdan" 
            class="avatar-uploader" 
            :action="actionUrl"
            :headers="headers" 
            drag 
            :limit="1" 
            :before-upload="beforeUpload"
            :on-success="handleSuccess" 
            :show-file-list="false"
            >
            <img style="width: 100%; height: 100%; z-index: 9999" v-if="imgUrl !== ''" :src="imgUrl" alt="" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过4M
            </div>
          </el-upload>
        </t-form-item>
        <t-form-item label="备注" name="remark">
          <t-textarea v-model="formData.remark" placeholder="备注"></t-textarea>
        </t-form-item>
        <t-form-item style="margin-left: 100px">
          <t-space size="10px">
            <t-button theme="primary" type="submit">{{ formData.hasOwnProperty('id') ? '修改':'提交'}}</t-button>
            <t-button theme="default" variant="base" type="reset">重置</t-button>
            <t-button theme="default" variant="base" @click="handleClear">清空校验结果</t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </t-dialog>
    <t-image-viewer v-model="visibleViewImage" :images="ViewImages">
    </t-image-viewer>
  </div>
</template>
<script>
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue";
import http from "../../utils/http.js";
import { MessagePlugin } from "tdesign-vue";

export default {
  data() {
    return {
      actionUrl: `${process.env.VUE_APP_SYS_API}/file/uploadImage`,
      data: [],
      size: "small",
      tableLayout: true,
      stripe: true,
      bordered: true,
      hover: false,
      showHeader: true,
      columns: [
        { colKey: "serial-number", width: 60, title: "序号", align: "center" },
        { colKey: "date", title: "发单日期", width: "100", align: "center" },
        {
          colKey: "fahuodunshu",
          title: "发货吨数",
          width: "100",
          align: "center",
        },
        {
          colKey: "fahoprice",
          title: "发货价格",
          width: "100",
          align: "center",
        },
        { colKey: "pinzhong", title: "品牌", width: "100", align: "center" },
        { colKey: "plate", title: "车牌号", width: "100", align: "center" },
        {
          colKey: "shijijiaoyidunshu",
          title: "实际交易数量",
          width: "100",
          align: "center",
        },
        {
          colKey: "shijijiaoyie",
          title: "实际交易额",
          width: "100",
          align: "center",
        },
        {
          colKey: "dakuanqianshu",
          title: "打款钱数",
          width: "100",
          align: "center",
        },
        { colKey: "brand", title: "亏盈", width: "100", align: "center" },
        {
          colKey: "fapiaodingdan",
          title: "发票订单",
          width: "120",
          align: "center",
        },
        { colKey: "remark", title: "备注", width: "100", align: "center" },
        // {
        //   colKey: "tonnage_shipped",
        //   title: "发货吨数",
        //   width: "150",
        // },
        // { colKey: "shipping_price", title: "发货价格" },
        // { colKey: "plate_number", title: "车牌号", ellipsis: true },
        // { colKey: "transaction_num", title: "实际交易数量" },
        // { colKey: "transaction_price", title: "实际交易额" },
        // { colKey: "money", title: "打款钱数" },
        // { colKey: "Profit_and_loss", title: "盈亏" },
        // { colKey: "create_time", title: "创建日期" },
        // { colKey: "update_time", title: "修改日期" },
        // { colKey: "remark", title: "备注" },
        { colKey: "caozuo", title: "操作", align: "center", width: "120" },
      ],
      pageSize: 10,
      page: 1,
      total: 0,
      visibleAdd: false,
      formData: {
        fapiaodingdan: "",
      },
      rules: {
        age: [{ required: true, message: "年龄必填", type: "error" }],
      },
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json, text/plain, */*",
      },
      imgUrl: "",
      visibleViewImage: false,
      ViewImages: [],
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      http
        .get("/bills/getbills", {
          params: { page: this.page, pageSize: this.pageSize },
        })
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
          this.total = res.data.total;
        });
    },
    onPick(value, context) {
      console.log("onPick:", value, context);
    },
    onChange(value, context) {
      console.log("onChange:", value, context);

      if (value.length == 0) return this.getlist();

      http
        .post("/bills/searchbills", {
          date: value,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            this.data = res.data.data;
            this.total = res.data.data.length;
          }
        });
    },
    reset() {
      this.getlist();
    },
    // 添加账单事件
    handleAdd() {
      this.visibleAdd = true;
      this.$refs.form.reset();
            this.$refs.form.clearValidate();
    },
    // 添加弹框确认事件
    onConfirm() {
      console.log(666);
    },
    close() {
      this.visibleAdd = false;
    },

    onReset() {
      this.$message.success("重置成功");
      console.log("formData", this.formData);
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.formData.shijijiaoyie =
          Number(this.formData.shijijiaoyidunshu) *
          Number(this.formData.fahoprice);
        http.post("/bills/addbills", this.formData).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message.success("提交成功");
            this.formData.fapiaodingdan = "";
            this.imgUrl = "";
            this.visibleAdd = false;
            this.getlist();
          }
        });
      } else {
        console.log("Errors: ", validateResult);
        this.$message.warning(firstError);
      }
    },
    handleClear() {
      this.$refs.form.clearValidate();
    },
    // 文件上传
    //上传图片前的判断只能上传jpg/png格式的图片
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        MessagePlugin.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        MessagePlugin.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    //上传图片功能
    handleSuccess(res, file) {
      this.formData.fapiaodingdan = URL.createObjectURL(file.raw);
      console.log(res,'上传图片的回调');
      if (res.code == 0) {
        this.formData.fapiaodingdan = res.data;
        this.imgUrl = res.data;
        console.log(this.imgUrl,'this.imgUrl');
        MessagePlugin("success", "上传图片成功");
      } else {
        MessagePlugin.error("上传图片失败");
      }
    },
    // 查看订单
    handleviewdingdan(row) {
      console.log(row.fapiaodingdan);

      if (row.fapiaodingdan === "") return;
      this.ViewImages = [`${row.fapiaodingdan}`];
      console.log(this.ViewImages);

      setTimeout(() => {
        this.visibleViewImage = true;
      }, 500);
    },
    handleDelete(row) {
      this.$confirm(
        "此操作将永久删除信息,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          http
            .get("/bills/deletebills", { params: { id: row.id } })
            .then((res) => {
              console.log(res);
              if (res.data.code == 0) {
                this.$message.success("删除成功");
                this.getlist();
              }
            });
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
    handleEdit(row){
      console.log(row);
      
      this.formData = {...row};
      this.visibleAdd = true;
    }
  },
};
</script>
<style lang="scss" scoped>
.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
