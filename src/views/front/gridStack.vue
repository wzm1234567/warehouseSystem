<template>
    <div id="home">
        <!-- 左边的添加与删除 -->
        <div class="left-box">
            <div class="delete-grid">放在这里删除小部件！</div>
            <div class="add-grid" draggable="true">把我拖进仪表盘！</div>
        </div>

        <!-- 右边的grid容器 -->
        <div class="right-box">
            <div class="grid-stack"></div>
        </div>
    </div>
</template>
<script>
// 引入gridstack
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
//   import Vue from "vue";
//   import barChart from "../EchartsView/EchartsView.vue";

export default {
    name: "APP",
    data() {
        return {
            grid: null,
            option: {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    itemStyle: { color: "red" },
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: "bar",
                        showBackground: true,
                        backgroundStyle: {
                            color: "#BBFFFF",
                        },
                        itemStyle: {
                            color: "#EEE9E9",
                            borderWidth: 1,
                            borderColor: "#000000",
                        },
                    },
                ],
                aria: {
                    enable: true,
                    decal: {
                        show: true,
                        decals: {
                            symbol: "rect",
                            dashArrayX: [2, 0],
                            dashArrayY: [2, 2],
                            rotation: 0.523,
                            color: "#ffffff",
                            border: 1,
                        },
                    },
                },
            },
        };
    },
    created() { },
    mounted() {
        this.GridStackInit();
        let container = document.querySelector(".right-box");
        container.ondragover = function (e) {
            e.preventDefault();
        };
        container.addEventListener("drop", (e) => {
            this.addGrid();
        });
        let deleteGrid = document.querySelector(".delete-grid");
        deleteGrid.ondragover = function (e) {
            e.preventDefault();
        };
        deleteGrid.addEventListener("drop", (e) => { });
    },
    methods: {
        GridStackInit() {
            let Options = {
                dragOut: true,
                margin: 5, //网格里面之间的距离
                acceptWidgets: true, //接受从其他网格或外部拖动的小部件
                dragIn: ".add-grid",
            };
            // let item7 = document.getElementsByClassName('grid-stack-item7')
            this.grid = GridStack.init(Options);
            let gridData = [
                { w: 4, h: 2, content: "1" },
                {
                    w: 4,
                    h: 4,
                    content: "不能缩放，也不能移动！",
                    noResize: true,
                    noMove: true,
                },
                { w: 2, h: 2, content: "不能缩放！", noResize: true },
                { w: 2, h: 2, content: "4" },
                { w: 2, h: 2, content: "5" },
                { w: 2, h: 4, content: "6" },
                { w: 4, h: 2, content: "7" },
                { w: 2, h: 2, content: "8" },
                { w: 6, h: 4, id: "card_9" },
                { w: 2, h: 2, content: "10" },
                { w: 2, h: 2, content: "11" },
            ];
            this.grid.load(gridData);
            if (this.grid.engine) {
                this.grid.engine.nodes.forEach((widget) => {
                    this.loadGridItem(widget);
                });
            }
        },
        addGrid() {
            this.grid.addWidget({ w: 2, h: 2, content: "添加" });
        },
        loadGridItem(widget) {
            // 把组件仿佛第九个方块中
            if (widget.id == "card_9") {
                // 找到第九个方块
                let widgetEl = widget.el;
                let content = widgetEl.querySelector(".grid-stack-item-content");

                let itemDom = document.createElement("div");
                itemDom.setAttribute("id", "card_" + widget._id);

                // 把组件放入方块中
                content.appendChild(itemDom);

                // 局部注册组件，组件放入方块中
                let WidgetComponent = Vue.component("barChart", barChart);
                let instance = new WidgetComponent({
                    el: "#card_" + widget._id,
                    propsData: { name: "xiaoming" },
                    parent: this,
                });
                // 调整大小，echarts图resize
                this.grid.on('resizestop', function (event, gridEl) {
                    // 当你缩放暂停，触发条件，重新绘图resize
                    instance.handleResize()
                })
            }
        },
    },
};
</script>
<style lang="scss" scoped>
#home {
    display: flex;
    width: 100%;
    background-color: #44a1ee;
    // margin: 20px;
    height: 100%;
}

.left-box {
    display: inline;
    display: flex;
    flex-direction: column;
    width: 20%;
    border-right: 2px dashed #ffffff;

    .delete-grid {
        width: 80%;
        height: 120px;
        background-color: #ee6d44;
        border: 2px solid #ffffff;
        margin: 20px 0 20px 20px;
    }

    .add-grid {
        width: 80%;
        height: 120px;
        background-color: #54ff9f;
        border: 2px solid #ffffff;
        margin: 0 0 0 20px;
    }
}

.right-box {
    width: 70%;
    border: 2px solid #ffffff;
    margin: 20px 0 20px 20px;
}
</style>
<style lang="scss">
.grid-stack-item-content {
    background-color: #a51f1f;
    text-align: center;
}
</style>