<template>
  <div class="boss" style="position: relative">
    <div class="title upward">
      <h1>尼日利亚H1项目-人员定位系统</h1>
    </div>
    <div class="content">
      <aside class="left upward">
        <div class="left-content">
          <dv-border-box-7 :color="['#39627d', '#73b4c7']" backgroundColor="#ffffff00">
            <div class="left-title">
              <img
                    src="@/assets/screen/person.png"
                    alt=""
                  />
              <span>人员统计</span>
            </div>
          </dv-border-box-7>
          <div class="left-num">
            <span class="left-num-tit">人员总数</span>
            <div :style="{paddingTop: px2vh(7)}">
              <span class="left-num-num">{{ personTotal }}66</span>
              <span :style="{ fontSize: px2vw(16) }">人</span>
            </div>
          </div>

          <div class="left-line">
            <dv-active-ring-chart :config="chartData" :style="{ width: px2vw(140), height: px2vh(140) }" />
            <!-- <div class="left"></div> -->
            <div class="renyuanfenlei-right">
              <div class="left-num-tit">
                <div>自有人员</div>
                <div>
                  <span>1</span>
                  <span>4</span>
                  <span>6</span>
                </div>
              </div>
              <div class="left-num-tit" :style="{ marginTop: px2vh(8) }">
                <div>三方人员</div>
                <div>
                  <span>0</span>
                  <span>5</span>
                  <span>2</span>
                </div>
              </div>
              <!-- <div class="left-num-tit">
                <div>访客</div>
                <div>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div> -->
            </div>
          </div>

          <div class="weilan-echarts">
            <div class="weilan-echarts-tit">
              <span>围栏人数</span>
              <!-- <dv-decoration-2 :style="{ width: px2vw(200), height: px2vh(5) }" /> -->
            </div>
            <div id="echartsMain" :style="{ width: '100%', height: px2vh(206) }" />
          </div>

          <div class="ruchang" :style="{ marginTop: px2vh(20) }">
            <dv-border-box-7 :color="['#39627d', '#73b4c7']" backgroundColor="#ffffff00">
              <div class="left-title">
                <img
                      src="@/assets/screen/离开一会.png"
                      alt=""
                    />
                <span>入场人员名单</span>
              </div>
            </dv-border-box-7>
            <div class="ruchang-con">
              <div style="width: 100%; height: 100%">
                <el-carousel indicator-position="outside" arrow="never">
                  <el-carousel-item v-for="item in 1" :key="item">
                    <div v-for="(item, index) in personList" :key="index" class="weilan-person-item">
                      <dv-border-box-2>
                        <div class="weilan-person-item-img">
                          <div class="weilan-person-item-name" :style="{ marginRight: px2vw(18) }">
                            <span class="name">姓名</span>
                            <span class="name-value">{{ item.name }}</span>
                          </div>
                          <div class="weilan-person-item-name">
                            <span class="name"> 区域 </span>
                            <span class="name-value">{{ item.a }}</span>
                          </div>
                          <div class="weilan-person-item-name">
                            <span class="name">电话</span>
                            <span class="name-value">{{ item.b }}</span>
                          </div>
                        </div>
                      </dv-border-box-2>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="center">
        <div class="center-top">
            <ul>
              <li>在场人数</li>
              <li><span>2</span></li>
              <li><span>5</span></li>
              <li><span>7</span></li>
            </ul>
          <div>
            <!-- <ismap style="z-index: 10;" /> -->
          </div>
        </div>
        <div class="center-bottom-bgc"></div>
        <div class="center-bottom upward">
          <dv-border-box-7 :color="['#39627d', '#73b4c7']" backgroundColor="#ffffff00">
            <div class="left-title">
              <img
                    src="@/assets/screen/离开一会.png"
                    alt=""
                  />
              <span>人员通行记录</span>
            </div>
          </dv-border-box-7>
          <div>
            <el-table
              ref="tableCenter"
              :data="tableData"
              :highlight-current-row="false"
              :height="px2vh(255)"
              :row-class-name="tablecellrowClass"
              :header-row-class-name="headerRowClassName"
              stripe
              :style="{ width: px2vw(900)}"
              @mouseenter.native="mouseEnterCenter"
              @mouseleave.native="mouseLeaveCenter"
            >
              <el-table-column
                prop="date"
                label="姓名"
                
                align="center"
              />
              <el-table-column
                prop="name"
                label="公司"
               
                align="center"
              />
              <el-table-column prop="address" label="工种" align="center" />
              <el-table-column prop="address" label="部门" align="center" />
              <el-table-column prop="address" label="入场时间" align="center" />
              <el-table-column prop="address" label="出场时间" align="center" />
              <el-table-column prop="address" label="轨迹" align="center">
                <template slot-scope="scope">
                  <el-link style="text-shadow: 0px 0px 1px #fff" type="primary" :underline="false">
                    查看
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="right upward">
        <div class="right-content">
          <dv-border-box-7 :color="['#39627d', '#73b4c7']" backgroundColor="#ffffff00">
            <div class="left-title">
              <img
                    src="@/assets/screen/访客通行.png"
                    alt=""
                  />
              <span>报警统计</span>
            </div>
          </dv-border-box-7>

          <div class="left-num">
            <span class="left-num-tit">当日报警总数</span>
            <div :style="{ paddingTop: px2vh(7) }">
              <span class="left-num-num">378</span>
              <span :style="{ fontSize: px2vw(16) }">人</span>
            </div>
          </div>

          <div class="baojing">
            <ul>
              <li></li>
              <li>
                <p>危险区域报警</p>
                <p>
                  <span>22</span>
                  <span>/43</span>
                </p>
              </li>
            </ul>
            <ul>
              <li></li>
              <li>
                <p>串岗报警</p>
                <p>
                  <span>22</span>
                  <span>/43</span>
                </p>
              </li>
            </ul>
            <ul>
              <li></li>
              <li>
                <p>离岗报警</p>
                <p>
                  <span>22</span>
                  <span>/43</span>
                </p>
              </li>
            </ul>
            <ul>
              <li></li>
              <li>
                <p>求救报警</p>
                <p>
                  <span>22</span>
                  <span>/43</span>
                </p>
              </li>
            </ul>
            <ul>
              <li></li>
              <li>
                <p>未授权报警</p>
                <p>
                  <span>22</span>
                  <span>/43</span>
                </p>
              </li>
            </ul>
            <ul>
              <li></li>
              <li>
                <p>静止报警</p>
                <p>
                  <span>22</span>
                  <span>/43</span>
                </p>
              </li>
            </ul>
          </div>

          <dv-border-box-7 :color="['#39627d', '#73b4c7']" backgroundColor="#ffffff00">
            <div class="left-title">
              <img
                    src="@/assets/screen/事件管理.png"
                    alt=""
                  />
              <span>报警处理情况</span>
            </div>
          </dv-border-box-7>

          <div class="echarts">
            <div id="stackingEcharts" :style="{ width: '100%', height: px2vh(240) }" />
          </div>

          <dv-border-box-7 :color="['#39627d', '#73b4c7']" backgroundColor="#ffffff00" :style="{ marginTop: px2vh(10) }">
            <div class="left-title">
              <img
                    src="@/assets/screen/事件管理.png"
                    alt=""
                  />
              <span>报警记录</span>
            </div>
          </dv-border-box-7>

          <div :style="{ marginTop: px2vh(12) }">
            <el-table
              ref="tableRight"
              :data="baojingData"
              :highlight-current-row="false"
              :height="px2vh(244)"
              :row-class-name="tablecellrowClass"
              :header-row-class-name="headerRowClassName"
              stripe
              style="width: 100%"
              @mouseenter.native="mouseEnterRight"
              @mouseleave.native="mouseLeaveRight"
            >
              <el-table-column prop="personName" label="人员" align="center" />
              <el-table-column prop="message" label="报警信息" width="180" />
              <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                  <el-link style="text-shadow: 0px 0px 1px #fff" type="primary" :underline="false">
                    处理
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <footer></footer>
  </div>
</template>
<script>
// import ismap from "../gismap/index.vue";
import ismap from "../home/openlayers.vue";
import * as echarts from "echarts";
// import {
//   // 人员统计接口
//   getPersonCount,
//   getFenceCount,
//   getAlarmRecord
// } from "@/api/screen";

export default {
  components: { ismap },
  data() {
    return {
      // eslint-disable-next-line no-restricted-globals
      innerWidth: screen.width,
      // eslint-disable-next-line no-restricted-globals
      innerHeight: screen.height,
      tableData: [
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工"
        }
      ],
      chartData: {
        radius: "84%",
        activeRadius: "93%",
        lineWidth: 8,
        data: [
          {
            name: "周口",
            value: 55
          },
          {
            name: "南阳",
            value: 120
          },
          {
            name: "西峡",
            value: 78
          },
          {
            name: "驻马店",
            value: 66
          },
          {
            name: "新乡",
            value: 80
          }
        ],
        digitalFlopStyle: {
          fontSize: "30px",
          fill: "#fff"
        },
        
      },
      personList: [
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456"
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456"
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456"
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456"
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456"
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456"
        }
      ],
      baojingData: [
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        },
        {
          date: "张三",
          name: "违规进入危险区域"
        }
      ],
      timerCenter: null,
      timerRight: null,
      isCenterRunning: true,
      isRightRunning: true,
      fangKePersonTotal: null,
      personTotal: "",
      sanFangPersonTotal: null,
      ziYouPersonTotal: null,
      zhuzhuangX: [],
      zhuzhuangvalue: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.echartsMain();
      this.stackingEcharts();
      this.startScroll(this.$refs.tableCenter, "center");
      this.startScroll(this.$refs.tableRight, "right");
    }, 2000);
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  created() {
    // eslint-disable-next-line no-restricted-globals
    const screenWidth = screen.width;
    // eslint-disable-next-line no-restricted-globals
    const screenHeight = screen.height;
    console.log(screenWidth, screenHeight, 8889);
    // this.getPerson();
    // this.getFence();
    // this.getAlarm();
  },
  beforeDestroy() {
    clearInterval(this.timerCenter);
    clearInterval(this.timerRight);
  },
  // eslint-disable-next-line comma-dangle
  methods: {
    // 人员统计接口
    getPerson() {
      getPersonCount().then((res) => {
        this.personTotal = res.data.personTotal;
      });
    },
    getFence() {
      getFenceCount().then((res) => {
        this.zhuzhuangX = Object.keys(res.data.fenceCount);
        this.zhuzhuangvalue = Object.values(res.data.fenceCount);
      });
    },
    getAlarm() {
      getAlarmRecord({ pageNum: 1, pageSize: 10 }).then((res) => {
        console.log(res, 886);
        this.baojingData = res.rows;
      });
    },
    px2vw(px) {
      return `${(px / 1920) * 100}vw`;
    },
    px2vh(px) {
      return `${(px / 1080) * 100}vh`;
    },
    stackingEcharts() {
      var chartDom = document.getElementById("stackingEcharts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#fff"],
                width: 1,
                type: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#ffffff6b"],
                width: 1,
                type: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        // eslint-disable-next-line no-dupe-keys
        legend: {
          data: ["已处理", "未处理"],
          right: "10px",
          top: "15px",
          // 设置图表示例文字颜色
          textStyle: {
            color: "#ffffff" // 白色文字
          }
        },
        series: [
          // {
          //   name: "Direct",
          //   type: "bar",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [320, 332, 301, 334, 390, 330, 320],
          // },
          // {
          //   name: "Email",
          //   type: "bar",
          //   stack: "Ad",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [120, 132, 101, 134, 90, 230, 210],
          // },
          {
            name: "已处理",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            barWidth: 12, // 设置柱子宽度为固定值30
            itemStyle: {
              color: "#47e7ff" // 橙色
            }
          },
          {
            name: "未处理",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series"
            },
            data: [150, 232, 201, 154, 190, 330, 410],
            barWidth: 12, // 设置柱子宽度为固定值30
            itemStyle: {
              color: "#ffc849" // 橙色
            }
          }
          // {
          //   name: "Search Engine",
          //   type: "bar",
          //   data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          //   emphasis: {
          //     focus: "series",
          //   },
          //   markLine: {
          //     lineStyle: {
          //       type: "dashed",
          //     },
          //     data: [[{ type: "min" }, { type: "max" }]],
          //   },
          // },
          // {
          //   name: "Baidu",
          //   type: "bar",
          //   barWidth: 5,
          //   stack: "Search Engine",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [620, 732, 701, 734, 1090, 1130, 1120],
          // },
          // {
          //   name: "Google",
          //   type: "bar",
          //   stack: "Search Engine",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [120, 132, 101, 134, 290, 230, 220],
          // },
          // {
          //   name: "Bing",
          //   type: "bar",
          //   stack: "Search Engine",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [60, 72, 71, 74, 190, 130, 110],
          // },
          // {
          //   name: "Others",
          //   type: "bar",
          //   stack: "Search Engine",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [62, 82, 91, 84, 109, 110, 120],
          // },
        ]
      };

      option && myChart.setOption(option);
      window.addEventListener('resize', function () {
          myChart.resize();
      });
    },
    echartsMain() {
      const chartDomEchartsMain = document.getElementById("echartsMain");
      const myChartEchartsMain = echarts.init(chartDomEchartsMain);
      const optionEchartsMain = {
        xAxis: {
          type: "category",
          // data: this.zhuzhuangX,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "12%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#ffffff6b"],
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: [10, 52, 20, 33, 39, 33, 22],
            // data: this.zhuzhuangvalue,
            type: "bar",
            barWidth: 12, // 设置柱子宽度为固定值30
            itemStyle: {
              color: "#55ffd0"
            }
          }
        ]
      };
      optionEchartsMain && myChartEchartsMain.setOption(optionEchartsMain);
      window.addEventListener('resize', function () {
          myChartEchartsMain.resize();
      });
    },
    headerRowClassName({ row, rowIndex }) {
      // 根据 rowIndex 或 row 的数据来返回不同的类名
      if (rowIndex === 0) {
        return "custom-header-row"; // 自定义的类名
      }
      return "";
    },
    tablecellrowClass({ row, rowIndex }) {
      console.log(row, 667);
      console.log(rowIndex, 888);
      // 根据 rowIndex 或 row 的数据来返回不同的类名
      if (rowIndex % 2 === 0) {
        return "table-rowClass"; // 自定义的类名
      }
      return "table-two-rowClass";
    },
    mouseEnterCenter() {
      this.isCenterRunning = false;
    },
    mouseLeaveCenter() {
      this.isCenterRunning = true;
    },
    mouseEnterRight() {
      this.isRightRunning = false;
    },
    mouseLeaveRight() {
      this.isRightRunning = true;
    },
    startScroll(table, af) {
      const divData = table.bodyWrapper;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      if (af === "center") {
        this.timerCenter = setInterval(() => {
          if (that.isCenterRunning) {
            divData.scrollTop += 1;
            if (divData.clientHeight + divData.scrollTop >= divData.scrollHeight - 1) {
              divData.scrollTop = 0;
            }
          }
        }, 50);
      }
      if (af === "right") {
        this.timerRight = setInterval(() => {
          if (that.isRightRunning) {
            divData.scrollTop += 1;
            if (divData.clientHeight + divData.scrollTop >= divData.scrollHeight - 1) {
              divData.scrollTop = 0;
            }
          }
        }, 50);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:math';
$designWidth: 1920;
$designHeight: 1080;

@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
* {
  margin: 0;
  padding: 0;
}
.upward {
  z-index: 20;
  position: relative;
}
.inferior {
  z-index: -20;
  position: relative;
}
.boss {
  width: 100vw;
  height: 100vh;
  // background-color: #022a74;
  // background-image: url("@/assets/screen/组 1583.png");
  // // background-image: url("../../../public/背景-D4yJLj.png");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
.title {
  z-index: 21;
  width: vw(1456);
  height: vh(100);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-image: url("@/assets/screen/title.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  h1 {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: vw(30);
    font-weight: 800;
    background-image: -webkit-linear-gradient(bottom, rgb(126, 200, 237), #c7eef9, rgb(255, 255, 255));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-top: vh(10);
    font-style: oblique;
    letter-spacing: 1px
  }
}
.content {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  
  .left {
    padding-top: vh(100);
    height: 100%;
    width: vw(550);
    // background-color: #4c658357;
    // display: flex;
    padding-left: vw(40);
    // justify-content: center;
    background-image: url("@/assets/screen/组 1583.png");
    background-repeat: no-repeat;
    background-size: 349% 100%;
    background-position: 0 64%;
    // background-color: #ffffff00;
    .left-content {
      width: vw(420);
      .left-title {
        display: flex;
        align-items: center;
        height: vh(36);

        img {
          width: vw(18);
          height: auto;
          margin-right: vw(22);
          vertical-align: middle; /* 垂直居中 */
          border: 1px solid #235873;
          padding: vh(3) vw(3);
        }

        span {
          color: #fff;
          text-shadow: 0px 0px 5px #5ecfec;
          font-weight: 500;
          font-size: vw(14);
        }
      }

      .left-num {
        display: flex;
        // align-items: center;
        justify-content: space-between;
        padding: 0 vw(20);
        margin-top: vh(20);
        
        color: #fff;
        height: vh(72);
        background-image: url("@/assets/screen/按钮_数字像素.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .left-num-tit {
          padding-top: vh(9);
          font-size: vw(18);
          font-weight: 600;
          background-image: -webkit-linear-gradient(bottom, rgb(126, 200, 237), #a8e0ef, rgb(255, 255, 255));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .left-num-num {
          font-weight: 600;
          font-size: vw(22);
          color: #4dffcb;
          margin-right: vw(5);
        }
      }

      .left-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: vh(20);
        .renyuanfenlei-right {
          background-image: url("@/assets/screen/组 2.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 80%;
          height: vh(142);
          // padding: 0 vw(20);
          padding-left: vw(41);
          padding-right: vw(15);
          color: #fff;

          .left-num-tit {
            height: vh(66);
            font-size: vw(14);
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #B5C6DF ;
            // padding: 0 vw(12);
            // padding-left: vw(32);
            span {
              display: inline-block;
              background-color: #051121;
              width: vw(24);
              font-size: vw(16);
              height: vh(28);
              margin: 0 vw(3);
              border-radius: 4px;
              text-align: center;
              line-height: vh(28);
              border: 1px solid #19577B ;
            }
          }
        }
      }

      .weilan-echarts {
        width: 100%;
        margin-top: vh(46);

        .weilan-echarts-tit {
          width: 100%;
          // display: flex;
          height: vh(14);
          // align-items: center;
          background-image: url("@/assets/screen/组 4.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          line-height: vh(9);
          span {
            font-size: vw(18);
            font-weight: 600;
            text-shadow: 0px 0px 5px #00c8fa;
            color: #fff;
            margin-left: vw(25);
          }
        }
      }

      .ruchang-con {
        width: 100%;
        margin-top: vh(15);
        height: vh(300);
        .el-carousel__item {
          display: flex;
          flex-wrap: wrap;
        }
        .weilan-person-item {
          width: 50%;
          color: #fff;
          height: vh(100);
          .weilan-person-item-img {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: vh(16) vw(16);
          }
          // .dv-border-box-2 {
          //   border: 1px solid rgb(1, 156, 252) !important;
          // }

          .weilan-person-item-name {
            font-size: vw(14);
            font-family: Alibaba PuHuiTi;
            font-weight: 500;
            .name {
              margin-right: vw(10);
              color: #AEC3E1;
            }
          }
        }
      }
    }
  }
  .center {
    width: calc(100vw - vw(1100));
    height: 100%;
    position: relative;
    // background-color: #c7f5c757;
    .center-top {
      height: calc(100% - vh(355));
      position: relative;
      &>div{
        width: 100%;
        width: 99vw; 
        height: calc(100vh - vh(100)); 
        z-index: 10; 
        position: absolute; 
        top: vh(100); 
        left: vw(-550)
      }
      // background-color: rgba(255, 192, 203, 0.438);
      ul {
        display: flex;
        align-items: center;
        position: absolute;
        left: vw(40);
        top: vh(130);
        z-index: 99;
        li:nth-of-type(1) {
          font-size: vw(14);
          color: #fff;
          font-weight: 500;
        }
        li:nth-of-type(2), li:nth-of-type(3), li:nth-of-type(4) { 
          width: vw(41);
          height: vh(49);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: vw(4);
          // background-color: #fff;
          background: linear-gradient(0deg, #B5E9FF 0%, #104082 0%, #010F1E 100%);
          border: 2px solid;
          border-image: linear-gradient(0deg, #95DAFF, #2362BF, #4180DD) 10 10;
          span {
            font-size: vw(34);
            font-weight: 600;
            // background-image: -webkit-linear-gradient(bottom, rgb(126, 200, 237), #a8e0ef, rgb(255, 255, 255));
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #FFFFFF;
            text-shadow: 0px 10px 5px rgba(1,10,18,0.17);
            background: linear-gradient(0deg, #7BB3FF 0%, #FFFFFF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    .center-bottom-bgc{
      height: vh(355);
      width: 100%;
      background-image: url("@/assets/screen/组 1583.png");
      background-repeat: no-repeat;
      background-size: 100vw 100vh;
      background-position: 50% 100%;
    }
    .center-bottom {
      height: vh(355);
      width: vw(900);
      position: absolute;
      bottom: 0;
      left: vw(-40);
      z-index: 21;
      .left-title {
        display: flex;
        align-items: center;
        height: vh(36);

        img {
          width: vw(18);
          height: auto;
          margin-right: vw(22);
          vertical-align: middle; /* 垂直居中 */
          border: 1px solid #235873;
          padding: vh(3) vw(3);
        }

        span {
          color: #fff;
          text-shadow: 0px 0px 5px #5ecfec;
          font-weight: 500;
          font-size: vw(14);
        }
      }
    }
  }
  .right {
    height: 100%;
    width: vw(550);
    // background-color: #6b9ad485;
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-right: vw(40);
    background-image: url("@/assets/screen/组 1583.png");
    background-repeat: no-repeat;
    background-size: 349% 100%;
    background-position: 100% 80%;
    // background-color: rgba(255, 192, 203, 0.141);
    .right-content {
      width: vw(420);
      padding-top: vh(100);
      .left-title {
        display: flex;
        align-items: center;
        height: vh(36);

        img {
          width: vw(18);
          height: auto;
          margin-right: vw(22);
          vertical-align: middle; /* 垂直居中 */
          border: 1px solid #235873;
          padding: vh(3) vw(3);
        }

        span {
          color: #fff;
          text-shadow: 0px 0px 5px #5ecfec;
          font-weight: 500;
          font-size: vw(14);
        }
      }
      .left-num {
        display: flex;
        // align-items: center;
        justify-content: space-between;
        padding: 0 vw(20);
        margin-top: vh(20);
        
        color: #fff;
        height: vh(72);
        background-image: url("@/assets/screen/按钮_数字像素.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .left-num-tit {
          padding-top: vh(9);
          font-size: vw(18);
          font-weight: 600;
          background-image: -webkit-linear-gradient(bottom, rgb(126, 200, 237), #a8e0ef, rgb(255, 255, 255));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .left-num-num {
          font-weight: 600;
          font-size: vw(22);
          color: #ffc602;
          margin-right: vw(5);
        }
      }
      .baojing {
        width: 100%;
        height: vh(160);
        // background-color: pink;
        margin-top: vh(30);
        margin-bottom: vh(20);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        ul{
          width: 33%;
          height: 50%;
          // border: 1px solid #ffc602;
          display: flex;
          li:nth-of-type(1){
            width: vw(62);
            height: 100%;
            // border: 1px solid #fff;
          }
          li:nth-of-type(2){
            height: 100%;
            padding-top: vh(2);
            p:nth-of-type(1) {
              font-size: vw(12);
              font-weight: 600;
              color: #fff;
              background-image: -webkit-linear-gradient(bottom, rgb(126, 200, 237), rgb(255, 255, 255));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-style: oblique;
            }
            p:nth-of-type(2) {
              font-size: vw(19);
              margin-top: vh(2);
              font-family: "DINCond-Bold";
              font-weight: 400;
              span:nth-of-type(1) {
                color: #50E0FF;
              }
              span:nth-of-type(2) {
                color: #74AFBC ;
              }
            }   
          }
        }
        ul:nth-of-type(1){
          background-image: url("@/assets/screen/1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        ul:nth-of-type(2){
          background-image: url("@/assets/screen/2.png");
          background-repeat: no-repeat;
          background-size: 135% 92%;
        }
        ul:nth-of-type(3){
          background-image: url("@/assets/screen/3.png");
          background-repeat: no-repeat;
          background-size: 112% 92%;
        }
        ul:nth-of-type(4){
          background-image: url("@/assets/screen/4.png");
          background-repeat: no-repeat;
          background-size: 100% 90%;
        }
        ul:nth-of-type(5){
          background-image: url("@/assets/screen/5.png");
          background-repeat: no-repeat;
          background-size: 140% 92%;
        }
        ul:nth-of-type(6){
          background-image: url("@/assets/screen/6.png");
          background-repeat: no-repeat;
          background-size: 100% 75%;
        }
      }
    }
  }
}
footer {
  background-image: url("@/assets/screen/底部.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: vw(695);
  height: vh(50);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 22;
}
.dv-border-box-7 {
  height: vh(36);
  padding-left: vw(14);
  // border: 1px solid rgb(0 96 255 / 30%);
}
::v-deep .dv-border-box-2 .dv-border-svg-container {
  //  fill: rgb(1, 156, 252) !important;
  fill: rgb(1, 156, 252) !important;
  /* 修改填充颜色 */
  stroke: rgba(1, 156, 252, 0.626) !important;
  /* 修改边框颜色 */
  // display: none !important;
}

::v-deep .dv-border-svg-container polyline {
  // fill:  rgb(1, 156, 252) !important; /* 修改填充颜色 */
  stroke: rgba(1, 156, 252, 0) !important;
  /* 修改边框颜色 */
}

::v-deep .dv-border-svg-container circle {
  // fill:  rgb(1, 156, 252) !important; /* 修改填充颜色 */
  //   stroke:  rgba(1, 156, 252, 0.459) !important; /* 修改边框颜色 */
}
::v-deep .custom-header-row {
  //   background-color: #ffffff00 !important;
  color: #fff !important;
  text-shadow: 0px 0px 3px #fff;
  background: none !important;
}
::v-deep .custom-header-row > th {
  background-color: #ffffff00 !important;
  border: 0 !important;
}

::v-deep .el-table {
  background-color: #ffffff00 !important;
  &::before {
    background: none;
  }
}

::v-deep .table-rowClass {
  // background: #000 !important;
  color: #fff !important;
  // background: linear-gradient(-88deg, rgba(16, 133, 175, 0), rgba(16,133,175,0.3), rgba(16,133,175,0)) !important;
  background: radial-gradient(circle, rgba(16, 133, 175, 0.205)  0%, rgba(16,133,175,0) 100%) !important;
  // pointer-events: none !important; /* 禁用鼠标事件 */
}
::v-deep .table-two-rowClass {
  color: #fff !important;
  background: #ffffff00 !important;
  // pointer-events: none !important; /* 禁用鼠标事件 */
}
::v-deep .el-table__body {
  background: none !important;
}
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: none;
}
::v-deep .el-table .el-table__cell {
  padding: 7px 0;
  border: 0;
}

/* 隐藏滚动条 */
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  display: none; /* 隐藏 WebKit 浏览器的滚动条 */
}
::v-deep .el-table__row:nth-child(2n):hover {
  background: #ffffff00 !important;
}
::v-deep .el-table__row:nth-child(odd):hover {
  background: radial-gradient(circle, rgba(16, 133, 175, 0.205)  0%, rgba(16,133,175,0) 100%) !important;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: none !important;
}
::v-deep .el-carousel__indicators--outside {
  display: none;
}
::v-deep .el-table .cell {
  color: #fff !important;
  // text-shadow: 0px 0px 5px #fff;
  background: none !important;
  // color: white;
}
::v-deep .el-carousel__container,
.el-carousel--horizontal {
  height: 100% !important;
}
</style>