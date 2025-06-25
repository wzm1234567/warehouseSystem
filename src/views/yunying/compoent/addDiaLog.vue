<template>
  <div>
    <t-dialog
      header="添加出库记录"
      width="1250px"
      :footer="false"
      top="8vh"
      :onClose="close"
      :visible.sync="addvisible"
    >
      <t-form
        :data="formData"
        ref="form"
        :rules="rules"
        @reset="onReset"
        @submit="onSubmit"
      >
        <t-form-item label="收货人" name="peple">
          <t-input
            v-model="formData.peple"
            placeholder="请输入收货人名称"
          ></t-input>
        </t-form-item>

        <t-form-item label="手机号" name="phone">
          <t-input
            v-model="formData.phone"
            placeholder="请输入收货人手机号"
          ></t-input>
        </t-form-item>

        <t-form-item
          label="选择仓库"
          name="is_stash_id"
          help="仓库、物料名称、品牌、规格请依次选择"
        >
          <t-cascader
            v-model="formData.is_stash_id"
            placeholder="请选择入库仓库"
            :options="stashOptions"
            clearable
            @change="handlerChange"
          />
        </t-form-item>

        <div
          style="display: flex; margin-bottom: 30px"
          v-for="(item, index) in form"
          :key="index"
        >
          <div v-for="(ele, i) in item.children" :key="i">
            <t-form-item :label="ele.label" :name="ele.name">
              <t-cascader
                style="width: 130px"
                v-if="ele.type == 0"
                v-model="ele.value"
                :placeholder="ele.placeholder"
                :options="form[index].regionOptions"
                clearable
                @change="onChange(ele, index)"
              />

              <t-cascader
                style="width: 130px"
                v-if="i == 1"
                v-model="ele.value"
                :placeholder="ele.placeholder"
                :options="form[index].regionOptions2"
                clearable
                @change="onChange2(ele, index)"
              />

              <t-cascader
                style="width: 130px"
                v-if="i == 2"
                v-model="ele.value"
                :placeholder="ele.placeholder"
                :options="form[index].regionOptions3"
                clearable
              />

              <t-input-adornment v-if="i == 3" append="袋">
                <t-input
                  style="width: 100px"
                  auto-width
                  v-if="ele.type == 1"
                  :type="i == 3 || i == 2 || i == 4 || i == 5 ? 'number' : ''"
                  v-model="ele.value"
                  :placeholder="ele.placeholder"
                ></t-input>
              </t-input-adornment>

              <t-input-adornment v-if="i == 4" append="元">
                <t-input
                  style="width: 100px"
                  auto-width
                  v-if="i == 4"
                  :type="i == 3 || i == 2 ? 'number' : ''"
                  v-model="ele.value"
                  :placeholder="ele.placeholder"
                ></t-input>
              </t-input-adornment>
            </t-form-item>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: center;
            cursor: pointer;
            justify-content: space-around;
            margin-bottom: 10px;
          "
        >
          <div @click="addItem">
            <icon-font name="add" style="color: orange; font-size: 20px" />
            <span style="margin-left: 3px">添加一行</span>
          </div>
          <!-- <div>
            <icon-font name="add" style="color: orange; font-size: 20px" />
            <span style="margin-left: 3px">删除一行</span>
          </div> -->
        </div>

        <!-- <t-form-item label="物料重量" help="请注意选择选择单位，默认选择为“吨”" name="num">
                    <div style="display: flex; width: 100%;">
                        <t-input style="flex: 7;" type="number" v-model="formData.num"
                            placeholder="请输入物料重量(仅数字)"></t-input>
                        <t-select style="flex: 3;" v-model="formData.num_flag" :options="options1"
                            placeholder="默认选择吨" />
                    </div>

                </t-form-item>

                <t-form-item label="产品规格" name="guige" help="请注意选择选择单位，默认选择为“千克”">

                    <div style="display: flex; width: 100%;">
                        <t-input style="flex: 7;" type="number" v-model="formData.guige"
                            placeholder="请输入产品规格"></t-input>
                        <t-select style="flex: 3;" v-model="formData.guige_flag" :options="options1"
                            placeholder="默认选择千克" />
                    </div>
                </t-form-item> -->

        <!-- <t-form-item label="总袋数" name="zongnum">
                    <t-input type="number" v-model="formData.zongnum" placeholder="请输入总袋数"></t-input>
                </t-form-item> -->

        <div style="display: flex; justify-content: space-between">
          <div>
            <t-form-item
              label="出库日期"
              help="请选择出库日期，若不选择，则默认采用当前日期"
            >
              <t-date-picker
                enable-time-picker
                v-model="formData.time"
                :firstDayOfWeek="3"
              />
            </t-form-item>
          </div>
          <div>
            <t-form-item label="总价格">
              <t-input-adornment v-if="formData.zongnum" append="元">
                <t-input
                  disabled
                  type="number"
                  v-model="formData.zongnum"
                  placeholder="正在计算总价格..."
                ></t-input>
              </t-input-adornment>
            </t-form-item>
          </div>
        </div>

        <t-form-item style="margin-left: 100px; margin-top: 30px">
          <t-space size="10px">
            <t-button theme="primary" type="submit">提交</t-button>
            <t-button theme="default" variant="base" type="reset"
              >重置</t-button
            >
          </t-space>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
<script>
import http from "../../../utils/http.js";
import { IconFont } from "tdesign-icons-vue";
import { MessagePlugin } from "tdesign-vue";
export default {
  props: {
    addvisible: Boolean,
  },
  components: {
    IconFont,
  },
  data() {
    return {
      addFlag: 0,
      formData: {
        time: "",
        peple: "", //收货人
        phone: "", //手机号
        is_stash_id: "",
        zongnum: null,
        song_ling: 1,
      },
      rules: {
        is_stash_id: [
          { required: true, message: "请选择出库仓库", type: "error" },
        ],
        // name: [{ required: true, message: '请选择物料名称', type: 'error' }],
        // pinpai: [{ required: true, message: '请输入物料品牌', type: 'error' }],
        // netContent: [{ required: true, message: '请输入每袋净含量', type: 'error' }],
        // number: [{ required: true, message: '请输入卖出袋数', type: 'error' }],
        // price: [{ required: true, message: '请输入单价', type: 'error' }]
      },
      form: [
        {
          children: [
            {
              name: "name",
              value: "",
              label: "物料名称",
              placeholder: "请选择物料名称",
              type: 0,
            },
            {
              name: "pinpai",
              value: "",
              label: "品牌",
              placeholder: "请输入物料品牌",
              type: 1,
            },
            {
              name: "netContent",
              value: "",
              label: "净含量",
              placeholder: "请输入每袋净含量",
              type: 1,
            },
            {
              name: "number",
              value: "",
              label: "数量",
              placeholder: "请输入卖出袋数",
              type: 1,
            },
            {
              name: "price",
              value: "",
              label: "单价",
              placeholder: "请输入单价",
              type: 1,
            },
          ],
          regionOptions: [],
          regionOptions2: [],
          regionOptions3: [],
        },
      ],

      options1: [
        {
          label: "吨",
          value: 1,
        },
        {
          label: "千克",
          value: 2,
        },
        {
          label: "斤",
          value: 3,
        },
      ],
      stashOptions: [],
    };
  },
  watch: {
    form: {
      handler(newArr, old) {
        console.log(newArr);
        let newNum = 0;
        newArr.forEach((item) => {
          if (
            item.children[2].value != undefined &&
            item.children[3].value != undefined
          ) {
            newNum +=
              Number(item.children[4].value) * Number(item.children[3].value);
          }
        });
        console.log(newNum);
        console.log();
        this.formData.zongnum = newNum;
      },
      deep: true,
    },
  },
  methods: {
    handlerChange() {
      http
        .get("/admin/getmaterial", {
          params: { stashId: this.formData.is_stash_id },
        })
        .then((res) => {
          console.log(res.data.data);
          let arr = res.data.data;
          arr.forEach((item) => {
            item.value = item.id;
          });
          console.log(this.addFlag);

          this.form[this.addFlag].regionOptions = arr;
        });
    },
    onReset() {
      this.$message.success("重置成功");
      console.log("formData", this.formData);
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        if (this.formData.time == "") this.formData.time = new Date().getTime();
        if (this.formData.peple == "") this.formData.peple = "未知";
        if (this.formData.phone == "") this.formData.phone = "未知";
        let arr = [];
        console.log(this.form);
        this.form.forEach((item) => {
          if (
            item.children[0].value == "" ||
            item.children[1].value == "" ||
            item.children[2].value == "" ||
            item.children[3].value == "" ||
            item.children[4].value == ""
          ) {
            MessagePlugin.error("请填写完整物料信息");
          } else {
            arr.push({
              name: item.children[0].value,
              pinpai: item.children[1].value,
              netContent: item.children[2].value,
              number: item.children[3].value,
              price: item.children[4].value,
            });
          }
        });

        arr.push(this.formData);

        http.post("/issue/setissueling", arr).then((res) => {
          console.log(res);

          if (res.data.code == 0) {
            console.log(res);

            this.formData = {
              time: "",
              peple: "", //收货人
              phone: "", //手机号
              zongnum: null,
              song_ling: 1,
            };
            this.form = [
              {
                children: [
                  {
                    name: "name",
                    value: "",
                    label: "物料名称",
                    placeholder: "请选择物料名称",
                    type: 0,
                  },
                  {
                    name: "pinpai",
                    value: "",
                    label: "品牌",
                    placeholder: "请输入物料品牌",
                    type: 1,
                  },
                  {
                    name: "netContent",
                    value: "",
                    label: "净含量",
                    placeholder: "请输入每袋净含量",
                    type: 1,
                  },
                  {
                    name: "number",
                    value: "",
                    label: "数量",
                    placeholder: "请输入卖出袋数",
                    type: 1,
                  },
                  {
                    name: "price",
                    value: "",
                    label: "单价",
                    placeholder: "请输入单价",
                    type: 1,
                  },
                ],
                regionOptions: [],
                regionOptions2: [],
                regionOptions3: [],
              },
            ];
            this.addFlag = 0;
            MessagePlugin("success", res.data.msg);
            this.$emit("getlist");
          } else {
            MessagePlugin.error({ content: res.data.msg });
          }
        });
      } else {
        console.log("Errors: ", validateResult);
        this.$message.warning(firstError);
      }
    },

    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      this.addFlag = 0;
      this.formData = {
        time: "",
        peple: "", //收货人
        phone: "", //手机号
        zongnum: null,
        song_ling: 1,
      };
      this.form = [
        {
          children: [
            {
              name: "name",
              value: "",
              label: "物料名称",
              placeholder: "请选择物料名称",
              type: 0,
            },
            {
              name: "pinpai",
              value: "",
              label: "品牌",
              placeholder: "请输入物料品牌",
              type: 1,
            },
            {
              name: "netContent",
              value: "",
              label: "净含量",
              placeholder: "请输入每袋净含量",
              type: 1,
            },
            {
              name: "number",
              value: "",
              label: "数量",
              placeholder: "请输入卖出袋数",
              type: 1,
            },
            {
              name: "price",
              value: "",
              label: "单价",
              placeholder: "请输入单价",
              type: 1,
            },
          ],
        },
      ];
      this.$emit("update:addvisible", false);
    },

    addItem() {
      this.addFlag++;
      this.form.push({
        children: [
          {
            value: "",
            name: "name",
            label: "物料名称",
            placeholder: "请选择物料名称",
            type: 0,
          },
          {
            value: "",
            name: "pinpai",
            label: "品牌",
            placeholder: "请输入物料品牌",
            type: 1,
          },
          {
            name: "netContent",
            value: "",
            label: "净含量",
            placeholder: "请输入每袋净含量",
            type: 1,
          },
          {
            value: "",
            name: "number",
            label: "数量",
            placeholder: "请输入卖出袋数",
            type: 1,
          },
          {
            value: "",
            name: "price",
            label: "单价",
            placeholder: "请输入单价",
            type: 1,
          },
        ],
        regionOptions: [],
        regionOptions2: [],
        regionOptions3: [],
      });

      http
        .get("/admin/getmaterial", {
          params: { stashId: this.formData.is_stash_id },
        })
        .then((res) => {
          console.log(res.data.data);
          let arr = res.data.data;
          arr.forEach((item) => {
            item.value = item.id;
          });
          console.log(this.addFlag);

          this.form[this.addFlag].regionOptions = arr;
        });
    },
    // 选择物料触发
    onChange(val, i) {
      console.log(888);

      http({
        method: "get",
        url: "/admin/getmaterial_pinpai",
        params: { id: val.value },
      }).then((res) => {
        let arr = res.data.data;
        // this.formData.pinpai = ''
        arr.forEach((item) => {
          item.label = item.pinpai;
          item.value = item.id;
        });
        this.form[i].regionOptions2 = arr;
      });
    },
    // 选择品牌触发
    onChange2(val, i) {
      console.log(val);
      console.log(i);
      http({
        method: "get",
        url: "/admin/getmaterial_guige",
        params: { id: val.value },
      }).then((res) => {
        let arr = res.data.data;
        // this.formData.guige = ''
        // this.value = ''
        arr.forEach((item) => {
          item.label = item.guige;
          item.value = item.id;
        });
        this.form[i].regionOptions3 = arr;
      });
    },
  },
  created() {
    http.post("/stash/getstash").then((res) => {
      console.log(res);
      let arr = res.data.data;
      arr.forEach((item) => {
        item.label = item.name;
        item.value = item.id;
      });
      this.stashOptions = arr;
    });
  },
};
</script>
<style lang="scss" scoped>
::v-deep .t-form-inline .t-form__item {
  margin-right: 0;
}
</style>
