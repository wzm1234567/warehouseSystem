<template>
  <div class="boss" style="position: relative">
    <div class="title upward">尼日利亚H1项目-人员定位系统</div>
    <div class="content" style="position: relative;">
      <aside class="left upward">
        <div class="left-content">
          <dv-border-box-7>
            <div class="left-title">
              <!-- <img
                    src="../../../public/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
                    alt=""
                  /> -->
              <span>人员统计</span>
            </div>
          </dv-border-box-7>
          <div class="left-num">
            <span class="left-num-tit" style="font-size: 20px">人员总数</span>
            <div>
              <span class="left-num-num">378</span>
              <span :style="{ fontSize: px2vw(16) }">人</span>
            </div>
          </div>

          <div class="left-line">
            <dv-active-ring-chart
              :config="chartData"
              :style="{ width: px2vw(140), height: px2vh(140) }"
            />
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
              <div
                class="left-num-tit"
                :style="{ marginTop: px2vh(8), marginBottom: px2vh(8) }"
              >
                <div>三方人员</div>
                <div>
                  <span>0</span>
                  <span>5</span>
                  <span>2</span>
                </div>
              </div>
              <div class="left-num-tit">
                <div>访客</div>
                <div>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>

          <div class="weilan-echarts">
            <div class="weilan-echarts-tit">
              <span>围栏人数</span>
              <dv-decoration-2
                :style="{ width: px2vw(200), height: px2vh(5) }"
              />
            </div>
            <div
              id="echartsMain"
              :style="{ width: '100%', height: px2vh(255) }"
            ></div>
          </div>

          <div class="ruchang" :style="{ marginTop: px2vh(20) }">
            <dv-border-box-7>
              <div class="left-title">
                <!-- <img
                      src="../../../public/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
                      alt=""
                    /> -->
                <span>入场人员名单</span>
              </div>
            </dv-border-box-7>
            <div class="ruchang-con">
              <div style="width: 100%">
                <el-carousel indicator-position="outside" arrow="never">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <div
                      v-for="(item, index) in personList"
                      :key="index"
                      class="weilan-person-item"
                    >
                      <dv-border-box-2>
                        <div class="weilan-person-item-img">
                          <div
                            class="weilan-person-item-name"
                            :style="{ marginRight: px2vw(18) }"
                          >
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
          <div
            style="
              width: 100vw;
              height: calc(100vh - 66px);
              z-index: 10;
              position: absolute;
              top: 0;
              left: 0;
            "
          >
            <ismap style="z-index: 10" />
          </div>
        </div>
        <div class="center-bottom upward">
          <dv-border-box-7>
            <div class="left-title">
              <!-- <img
                    src="../../../public/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
                    alt=""
                  /> -->
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
              style="width: 100%"
              @mouseenter.native="mouseEnterCenter"
              @mouseleave.native="mouseLeaveCenter"
            >
              <el-table-column
                prop="date"
                label="姓名"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="address" label="工种" align="center">
              </el-table-column>
              <el-table-column prop="address" label="部门" align="center">
              </el-table-column>
              <el-table-column prop="address" label="入场时间" align="center">
              </el-table-column>
              <el-table-column prop="address" label="出场时间" align="center">
              </el-table-column>
              <el-table-column prop="address" label="轨迹" align="center">
                <template slot-scope="scope">
                  <el-link type="primary" :underline="false">查看</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="right upward">
        <div class="right-content">
          <dv-border-box-7>
            <div class="left-title">
              <!-- <img
                    src="../../../public/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
                    alt=""
                  /> -->
              <span>报警统计</span>
            </div>
          </dv-border-box-7>

          <div class="left-num">
            <span class="left-num-tit" :style="{ fontSize: px2vw(20) }"
              >当日报警总数</span
            >
            <div>
              <span class="left-num-num">378</span>
              <span :style="{ fontSize: px2vw(16) }">人</span>
            </div>
          </div>

          <div class="baojing"></div>

          <dv-border-box-7>
            <div class="left-title">
              <!-- <img
                    src="../../../public/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
                    alt=""
                  /> -->
              <span>报警处理情况</span>
            </div>
          </dv-border-box-7>

          <div class="echarts">
            <div
              id="stackingEcharts"
              :style="{ width: '100%', height: px2vh(240) }"
            ></div>
          </div>

          <dv-border-box-7 :style="{ marginTop: px2vh(20) }">
            <div class="left-title">
              <!-- <img
                    src="../../../public/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
                    alt=""
                  /> -->
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
              <el-table-column prop="date" label="人员" align="center">
              </el-table-column>
              <el-table-column prop="name" label="报警信息" width="180">
              </el-table-column>
              <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                  <el-link type="primary" :underline="false">处理</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ismap from "../gismap/index.vue";
import ismap from "../home/openlayers.vue";
import * as echarts from "echarts";

export default {
  components: { ismap },
  data() {
    return {
      innerWidth: screen.width,
      innerHeight: screen.height,
      tableData: [
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
        {
          date: "王小虎",
          name: "海工",
          address: "焊工",
        },
      ],
      chartData: {
        radius: "84%",
        activeRadius: "93%",
        lineWidth: 8,
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 78,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
        ],
        digitalFlopStyle: {
          fontSize: "22px",
          fill: "#fff",
        },
      },
      personList: [
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456",
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456",
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456",
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456",
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456",
        },
        {
          name: "张三",
          a: "涂装去",
          b: "15465789456",
        },
      ],
      baojingData: [
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
        {
          date: "张三",
          name: "违规进入危险区域",
        },
      ],
      timerCenter: null,
      timerRight: null,
      isCenterRunning: true,
      isRightRunning: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.echartsMain();
      this.stackingEcharts();
      this.startScroll(this.$refs.tableCenter, "center");
      this.startScroll(this.$refs.tableRight, "right");
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  created() {
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    console.log(screenWidth, screenHeight, 8889);
  },
  // eslint-disable-next-line comma-dangle
  methods: {
    px2vw(px) {
      return (px / 1920) * 100 + "vw";
    },
    px2vh(px) {
      return (px / 1080) * 100 + "vh";
    },
    stackingEcharts() {
      var chartDom = document.getElementById("stackingEcharts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
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
                type: "dashed",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#ffffff6b"],
                width: 1,
                type: "dashed",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        legend: {
          data: ["已处理", "未处理"],
          right: "10px",
          top: "15px",
          // 设置图表示例文字颜色
          textStyle: {
            color: "#ffffff", // 白色文字
          },
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
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            barWidth: 12, // 设置柱子宽度为固定值30
            itemStyle: {
              color: "#47e7ff", // 橙色
            },
          },
          {
            name: "未处理",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
            barWidth: 12, // 设置柱子宽度为固定值30
            itemStyle: {
              color: "#ffc849", // 橙色
            },
          },
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
        ],
      };

      option && myChart.setOption(option);
    },
    echartsMain() {
      const chartDomEchartsMain = document.getElementById("echartsMain");
      const myChartEchartsMain = echarts.init(chartDomEchartsMain);
      const optionEchartsMain = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "12%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#ffffff6b"],
              width: 1,
              type: "dashed",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            barWidth: 12, // 设置柱子宽度为固定值30
            itemStyle: {
              color: "#55ffd0",
            },
          },
        ],
      };
      optionEchartsMain && myChartEchartsMain.setOption(optionEchartsMain);
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
      let that = this;
      if (af === "center") {
        this.timerCenter = setInterval(() => {
          if (that.isCenterRunning) {
            divData.scrollTop += 1;
            if (
              divData.clientHeight + divData.scrollTop >=
              divData.scrollHeight - 1
            ) {
              divData.scrollTop = 0;
            }
          }
        }, 50);
      }
      if (af === "right") {
        this.timerRight = setInterval(() => {
          if (that.isRightRunning) {
            divData.scrollTop += 1;
            if (
              divData.clientHeight + divData.scrollTop >=
              divData.scrollHeight - 1
            ) {
              divData.scrollTop = 0;
            }
          }
        }, 50);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timerCenter);
    clearInterval(this.timerRight);
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
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
  background-color: #022a74;
  // background-image: url("../../../public/背景-D4yJLj.png");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
.title {
  height: vh(66);
  z-index: 10;
  width: 100vw;
  background-color: rgba(255, 192, 203, 0.626);
  justify-content: center;
  display: flex;
  align-items: center;
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(126, 200, 237),
    #c7eef9,
    rgb(255, 255, 255)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: vw(30);
  font-weight: 800;
  font-style: oblique;
}
.content {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: calc(100vh - vh(66));

  .left {
    height: 100%;
    width: 26%;
    background-color: #4c658366;
    display: flex;
    justify-content: center;

    .left-content {
      width: 85%;

      .left-title {
        display: flex;
        align-items: center;
        height: vh(36);

        img {
          width: vw(16);
          height: auto;
          margin-right: vw(15);
          vertical-align: middle; /* 垂直居中 */
        }

        span {
          color: #fff;
          text-shadow: 0px 0px 5px #5ecfec;
          font-weight: 500;
        }
      }

      .left-num {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 vw(20);
        height: vh(36);
        margin-top: vh(20);
        color: #fff;

        .left-num-tit {
          font-size: vw(18);
          font-weight: 600;
          background-image: -webkit-linear-gradient(
            bottom,
            rgb(126, 200, 237),
            #a8e0ef,
            rgb(255, 255, 255)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .left-num-num {
          font-weight: 600;
          font-size: vw(22);
          color: aquamarine;
          margin-right: vw(5);
        }
      }

      .left-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: vh(20);
        .renyuanfenlei-right {
          width: 80%;
          padding: 0 vw(20);
          color: #fff;

          .left-num-tit {
            height: vh(36);
            border: 1px saddlebrown solid;
            font-size: vw(18);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 vw(12);
            span {
              display: inline-block;
              background-color: #1d2136;
              width: vw(20);
              font-size: vw(16);
              height: vh(26);
              margin: 0 vw(3);
              border-radius: 3px;
              text-align: center;
              line-height: vh(26);
            }
          }
        }
      }

      .weilan-echarts {
        width: 100%;
        margin-top: vh(30);

        .weilan-echarts-tit {
          width: 100%;
          display: flex;
          align-items: center;

          span {
            font-size: vw(18);
            font-weight: 600;
            text-shadow: 0px 0px 10px #00c8fa;
            color: #fff;
            margin-right: vw(30);
          }
        }
      }

      .ruchang-con {
        width: 100%;
        margin-top: vh(15);
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
            font-size: vw(15);
            font-weight: 600;

            .name {
              margin-right: vw(10);
              color: #a9bcdb;
            }
          }
        }
      }
    }
  }
  .center {
    width: 48%;
    height: 100%;
    // background-color: #c7f5c757;
    .center-top {
      height: calc(100% - vh(380));
      background-color: rgba(255, 192, 203, 0.438);
    }
    .center-bottom {
      height: vh(380);
      // background-color: #f7e0a28a;
      .left-title {
        height: vh(36);
        display: flex;
        align-items: center;
        img {
          width: vw(16);
          height: auto;
          margin-right: vw(15);
          vertical-align: middle; /* 垂直居中 */
        }
        span {
          color: #fff;
          text-shadow: 0px 0px 5px #5ecfec;
          font-weight: 500;
        }
      }
    }
  }
  .right {
    height: 100%;
    width: 26%;
    background-color: #6b9ad485;
    display: flex;
    justify-content: center;
    // background-color: rgba(255, 192, 203, 0.566);
    .right-content {
      width: 85%;
      .left-title {
        height: vh(36);
        display: flex;
        align-items: center;
        img {
          width: vw(16);
          height: auto;
          margin-right: vw(15);
          vertical-align: middle; /* 垂直居中 */
        }
        span {
          color: #ffffff;
          text-shadow: 0px 0px 5px #5ecfec;
          font-weight: 500;
        }
      }
      .left-num {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 vw(20);
        height: 36px;
        margin-top: vw(20);
        color: #fff;

        .left-num-tit {
          font-size: vw(18);
          font-weight: 600;
          background-image: -webkit-linear-gradient(
            bottom,
            rgb(126, 200, 237),
            #a8e0ef,
            rgb(255, 255, 255)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .left-num-num {
          font-weight: 600;
          font-size: vw(22);
          color: #fdc441;
          margin-right: vw(5);
        }
      }
      .baojing {
        width: 100%;
        height: vh(160);
        background-color: pink;
        margin: vh(30) 0;
      }
    }
  }
}
.dv-border-box-7 {
  height: vh(36);
  padding-left: vw(14);
  border: 1px solid rgb(0 96 255 / 30%);
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
  background-color: #ffffff00 !important;
  color: #fff;
  text-shadow: 0px 0px 5px #fff;
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
  color: #fff;
  background: radial-gradient(circle, #09425f93 0%, #0a1d2e6e 100%) !important;
  // pointer-events: none !important; /* 禁用鼠标事件 */
}
::v-deep .table-two-rowClass {
  color: #fff;
  background: radial-gradient(circle, #051c2c7e 0%, #071a2b8e 100%) !important;
  // pointer-events: none !important; /* 禁用鼠标事件 */
}
::v-deep .el-table__body {
  background: none !important;
}
::v-deep
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
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
  background: radial-gradient(circle, #051c2c7e 0%, #071a2b8e 100%) !important;
}
::v-deep .el-table__row:nth-child(odd):hover {
  background: radial-gradient(circle, #09425f93 0%, #0a1d2e6e 100%) !important;
}
::v-deep
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td.el-table__cell {
  background: none !important;
}
::v-deep .el-carousel__indicators--outside {
  display: none;
}
</style>
