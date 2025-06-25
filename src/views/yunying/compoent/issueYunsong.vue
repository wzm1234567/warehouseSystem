<template>
  <div>
    <t-dialog header="添加出库记录" width="1250px" :footer="false" top="8vh" :onClose="close" :visible.sync="visibleyunsong">
      <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">
        <t-form-item label="选择客户" name="peple">
          <!-- <t-input v-model="formData.peple" placeholder="请输入收货人名称"></t-input> -->
          <t-select v-model="formData.peple" filterable :options="optionsClient" placeholder="请选择客户" />
        </t-form-item>

        <!-- <t-form-item label="手机号" name="name">
          <t-input v-model="formData.phone" placeholder="请输入收货人手机号"></t-input>
        </t-form-item>

        <t-form-item label="收货地址" name="name">
          <t-input v-model="formData.address" placeholder="请输入收货人地址"></t-input>
        </t-form-item> -->

        <t-form-item label="运送车辆" name="card">
          <t-input v-model="formData.card" placeholder="请输入运送车辆车牌号"></t-input>
        </t-form-item>

        <t-form-item label="选择仓库" name="is_stash_id" help="仓库、物料名称、品牌、规格请依次选择">
          <t-cascader v-model="formData.is_stash_id" placeholder="请选择入库仓库" :options="stashOptions" clearable
            @change="handlerChange" />
        </t-form-item>

        <div style=" display: flex; margin-bottom: 30px; " v-for="(item, index) in form" :key="index">

          <div v-for="(ele, i) in item.children" :key="i">
            <t-form-item :label="i == 0 || i == 1 || i == 2 || i == 3 || ele.flag ? ele.label : ''" :name="ele.name">

              <t-cascader style="width: 130px" v-if="ele.type == 0" v-model="ele.value" :placeholder="ele.placeholder"
                :options="item.regionOptions" clearable @change="onChange(ele, index)" />

              <t-cascader style="width: 130px" v-if="i == 1" v-model="ele.value" :placeholder="ele.placeholder"
                :options="item.regionOptions2" clearable @change="onChange2(ele, index)" />

              <t-cascader style="width: 130px" v-if="i == 2" v-model="ele.value" :placeholder="ele.placeholder"
                :options="item.regionOptions3" clearable @change="onChange3" />

              <t-input style="width: 100px" auto-width v-if="i == 3" type="number" v-model="ele.value"
                :placeholder="ele.placeholder"></t-input>

              <!-- <t-input-adornment v-if="i == 2" append="kg/袋">
                <t-input style="min-width: 90px" auto-width v-if="ele.type == 1"
                  :type="i == 3 || i == 2 || i == 4 || i == 5 ? 'number' : ''" v-model="ele.value"
                  :placeholder="ele.placeholder"></t-input>
              </t-input-adornment> -->

              <t-input style="width: 100px" auto-width v-if="ele.flag"
                :type="i == 3 || i == 2 || i == 4 || i == 5 ? 'number' : ''" v-model="ele.value"
                :placeholder="ele.placeholder"></t-input>
              <t-button size="small" @click="qiehuan(item.children[i + 1], item.children[i])"
                v-if="i == 4 && ele.flag">切换单价</t-button>
              <t-button size="small" @click="qiehuan(item.children[i - 1], item.children[i])"
                v-if="i == 5 && ele.flag">切换每吨</t-button>


            </t-form-item>
          </div>
        </div>

        <div style="display: flex; justify-content: center; cursor: pointer">
          <icon-font name="add" style="color: orange; font-size: 20px" />
          <span @click="addItem" style="margin-left: 3px">添加一行</span>
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

        <div style="display: flex; justify-content: space-between;margin-top: 30px;">
          <div>
            <t-form-item label="应收价格">
              <t-input disabled type="number" v-model="zongprice" placeholder="正在计算总价格..."></t-input>
            </t-form-item>
          </div>
          <!-- <div>
            <t-form-item label="实际价格" name="actualPrice">
              <t-input type="number" v-model="formData.actualPrice" placeholder="请输入实际价格"></t-input>
            </t-form-item>
          </div> -->
          <div>
            <t-form-item label="订货日期" help="请选择订货日期，若不选择，则默认采用当前日期">
              <t-date-picker enable-time-picker v-model="formData.time" :firstDayOfWeek="3" />
            </t-form-item>
          </div>
          
        </div>
        <t-form-item style="margin-left: 100px;margin-top: 30px;">
          <t-space size="10px">
            <t-button theme="primary" type="submit">提交</t-button>
            <t-button theme="default" variant="base" type="reset">重置</t-button>

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
    visibleyunsong: Boolean,
  },
  components: {
    IconFont,
  },
  data() {
    return {
      addFlag: 0,
      flag: 4,
      formData: {
        time: "", //出库日期
        peple: "", //收货人
        phone: "", //手机号
        zongnum: null,
        song_ling: 0,//运送
        address: '', //收货地址
        
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
              label: "规格",
              placeholder: "请输入每袋规格KG",
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
              name: "priceTons",
              value: "",
              label: "每吨价格",
              placeholder: "每吨价格",
              type: 2,
              flag: true
            },
            {
              name: "price",
              value: "",
              label: "单价",
              placeholder: "请输入单价",
              type: 2,
              flag: false
            },
            {
              name: "net",
              value: "",
              label: "规格真实",
              placeholder: "请输入每袋规格KG",
              type: 1,
            },
          ],
          regionOptions: [], // 物料名称信息
          regionOptions2: [], // 物料名称信息
          regionOptions3: [], // 物料名称信息
        },
      ],
      regionOptions: [], // 物料名称信息
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
      optionsClient: [],
      index: 0,
      stashOptions: [],
      rules: {
        peple: [{ required: true, message: '请选择客户', type: 'error' }],
        card: [{ required: true, message: '请输入运送车辆', type: 'error' }],
        is_stash_id: [{ required: true, message: '请选择出库仓库', type: 'error' }],
        actualPrice: [{ required: true, message: '请输入实际收款价格单位（元）', type: 'error' }],
        // name: [{ required: true, message: '请选择物料名称', type: 'error' }],
        // pinpai: [{ required: true, message: '请输入物料品牌', type: 'error' }],
        // netContent: [{ required: true, message: '请输入每袋净含量', type: 'error' }],
        // number: [{ required: true, message: '请输入卖出袋数', type: 'error' }],
        // price: [{ required: true, message: '请输入单价', type: 'error' }]
      },
    };
  },

  watch: {
    form: {
      handler(newValue, oldValue) {
        let sum = null;
        newValue.forEach((item, index) => {
          if (item.children[5].value != '') {
            // 计算单价的价格
            sum += item.children[5].value * item.children[3].value
          } else {
            // 计算每吨的价格
            sum += item.children[4].value / 1000 * item.children[6].value * item.children[3].value
          }
        })
        this.zongprice = sum
      },
      deep: true
    }
  },
  methods: {
    handlerChange() {
      // 获取物料信息
      http.get("/admin/getmaterial", { params: { stashId: this.formData.is_stash_id } }).then((res) => {
        console.log(res.data.data);
        let arr = res.data.data
        arr.forEach(item => {
          item.value = item.id
        });
        this.form[this.addFlag].regionOptions = arr
      });
    },
    onReset() {
      this.$message.success('重置成功');
      console.log('formData', this.formData);
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.formData.receive_price = this.zongprice
        if (this.formData.time == "") {
          this.formData.time = new Date().getTime()
        } else {
          this.formData.time = new Date(this.formData.time).getTime()
        }
        let arr = []
        this.form.forEach(item => {
          if (item.children[0].value == "" || item.children[1].value == "" || item.children[2].value == "" || item.children[3].value == "") {
            MessagePlugin.error('请填写完整物料信息')
            return
          } else {
            arr.push({ name: item.children[0].value, pinpai: item.children[1].value, netContent: item.children[2].value, number: item.children[3].value, priceTons: item.children[4].value, price: item.children[5].value })
          }
        })
        arr.push(this.formData)
        http.post("/issue/setissue", arr).then((res) => {
          if (res.data.code == 0) {
            console.log(res);
            this.formData = {
              time: "",
              peple: "", //收货人
              phone: "", //手机号
              zongnum: null,
              song_ling: 0,
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
                    label: "规格",
                    placeholder: "请输入每袋规格KG",
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
                    name: "priceTons",
                    value: "",
                    label: "每吨价格",
                    placeholder: "每吨价格",
                    type: 2,
                    flag: true
                  },
                  {
                    name: "price",
                    value: "",
                    label: "单价",
                    placeholder: "请输入单价",
                    type: 2,
                    flag: false
                  },
                  {
                    name: "net",
                    value: "",
                    label: "规格真实",
                    placeholder: "请输入每袋规格KG",
                    type: 1,
                  },
                ],
                regionOptions: [], // 物料名称信息
                regionOptions2: [], // 物料名称信息
                regionOptions3: [], // 物料名称信息
              },
            ];
            MessagePlugin("success", res.data.msg);
            this.$emit("getlist");
            this.$emit("update:visibleyunsong", false);
          } else {
            MessagePlugin.error({ content: res.data.msg });
            this.$emit("update:visibleyunsong", false);
          }
        });

      } else {
        console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },

    close(context) {
      console.log("关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发", context);
      this.addFlag = 0
      this.formData = {
        time: "",
        peple: "", //收货人
        phone: "", //手机号
        zongnum: null,
        song_ling: 0,
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
              label: "规格",
              placeholder: "请输入每袋规格KG",
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
              name: "priceTons",
              value: "",
              label: "每吨价格",
              placeholder: "每吨价格",
              type: 2,
              flag: true
            },
            {
              name: "price",
              value: "",
              label: "单价",
              placeholder: "请输入单价",
              type: 2,
              flag: false
            },
            {
              name: "net",
              value: "",
              label: "规格真实",
              placeholder: "请输入每袋规格KG",
              type: 1,
            },
          ],
          regionOptions: [], // 物料名称信息
          regionOptions2: [], // 物料名称信息
          regionOptions3: [], // 物料名称信息
        },
      ];
      this.regionOptions = []
      this.$emit("update:visibleyunsong", false);
    },
    // 价格方式切换
    qiehuan(ele, item) {
      ele.flag = !ele.flag
      item.flag = !item.flag
      ele.value = ''
      item.value = ''
      console.log(ele);

    },
    addItem() {
      this.addFlag++
      this.form.push({
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
            label: "规格",
            placeholder: "请输入每袋规格KG",
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
            name: "priceTons",
            value: "",
            label: "每吨价格",
            placeholder: "每吨价格",
            type: 2,
            flag: true
          },
          {
            name: "price",
            value: "",
            label: "单价",
            placeholder: "请输入单价",
            type: 2,
            flag: false
          },
          {
            name: "net",
            value: "",
            label: "规格真实",
            placeholder: "请输入每袋规格KG",
            type: 1,
          },
        ],
        regionOptions: [], // 物料名称信息
        regionOptions2: [], // 物料名称信息
        regionOptions3: [], // 物料名称信息
      });
      // 获取物料信息
      http.get("/admin/getmaterial", { params: { stashId: this.formData.is_stash_id } }).then((res) => {
        console.log(res.data.data);
        let arr = res.data.data
        arr.forEach(item => {
          item.value = item.id
        });
        this.form[this.addFlag].regionOptions = arr
      });
    },

    // 选择物料触发
    onChange(val, i) {
      http({
        method: 'get',
        url: '/admin/getmaterial_pinpai',
        params: { id: val.value }
      }).then((res) => {
        let arr = res.data.data
        // this.formData.pinpai = ''
        arr.forEach(item => {
          item.label = item.pinpai
          item.value = item.id
        });
        this.form[i].regionOptions2 = arr
      })
    },
    // 选择品牌触发
    onChange2(val, i) {
      console.log(val);
      console.log(i);
      http({
        method: 'get',
        url: '/admin/getmaterial_guige',
        params: { id: val.value }
      }).then((res) => {
        let arr = res.data.data
        // this.formData.guige = ''
        // this.value = ''
        arr.forEach(item => {
          item.label = item.guige
          item.value = item.id
        });
        this.index = i
        this.form[i].regionOptions3 = arr
      })

    },
    onChange3(val, context) {
      console.log(val);
      console.log(context.node.label);


      // console.log(ele);
      // console.log(i);
      // console.log(this.form[i].children[6].value);
      // this.index = i
      this.form[this.index].children[6].value = context.node.label
    },
  },
  created() {
    // 获取客户信息
    http.get("/admin/getclient").then(res => {
      console.log(res);
      res.data.data.forEach(item => {
        this.optionsClient.push({
          label: item.name,
          value: item.id
        })
      });
    })


    http.post('/stash/getstash').then(res => {
      console.log(res);
      let arr = res.data.data
      arr.forEach(item => {
        item.label = item.name
        item.value = item.id
      });
      this.stashOptions = arr
    })
  },
};
</script>
<style lang="scss" scoped>
::v-deep .t-form-inline .t-form__item {
  margin-right: 0;
}
</style>
