<template>
    <div>
        <h2>下载：npm install echarts</h2>
        <h2>下载：npm install echarts-liquidfill</h2>
        <h2>引入：import * as echarts from 'echarts';
            import 'echarts-liquidfill'</h2>
        <div id="main" style="width: 750px;height:600px;"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
export default {
    data() {
        return {
            value: 0.65,
            value1: 0.26,
        }
    },
    computed: {
        option() {
            let that = this;
            return {
                backgroundColor: '#0F224C',
                title: [
                    {
                        text: '本年收缴率',
                        x: '20%', // 文字位置
                        y: '70%',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: '100',
                            color: '#5dc3ea',
                            lineHeight: 16,
                            textAlign: 'center',
                        },
                    },
                    {
                        text: '本月收缴率',
                        x: '73%',
                        y: '70%',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: '100',
                            color: '#5dc3ea',
                            lineHeight: 16,
                            textAlign: 'center',
                        },
                    },
                ],
                series: [
                    {
                        type: 'liquidFill',
                        radius: '47%',
                        center: ['25%', '45%'],
                        data: [that.value, that.value, that.value],
                        backgroundStyle: {
                            borderWidth: 1,
                            color: 'rgba(51, 66, 127, 0.7)',
                        },
                        label: {
                            normal: {
                                formatter: (that.value * 100).toFixed(2) + '%', //计算的值
                                textStyle: {
                                    fontSize: 50,
                                    color: '#fff',
                                },
                            },
                        },
                        outline: {
                            borderDistance: 0,
                            itemStyle: {
                                borderWidth: 2,
                                borderColor: '#112165',
                            },
                        },
                        color: ['#446bf5', '#2ca3e2'],
                    },
                    {
                        type: 'liquidFill',
                        radius: '30%', // 圆环大小
                        center: ['75%', '45%'],
                        data: [that.value1, that.value1],
                        backgroundStyle: {
                            borderWidth: 1,
                            color: 'rgba(51, 66, 127, 0.7)',
                        },
                        label: {
                            normal: {
                                formatter: (that.value1 * 100).toFixed(2) + '%',
                                textStyle: {
                                    fontSize: 28,
                                    color: '#fff',
                                },
                            },
                        },
                        outline: {
                            borderDistance: 0,
                            itemStyle: {
                                borderWidth: 2,
                                borderColor: '#112165',
                            },
                        },
                        color: ['#2aa1e3', '#08bbc9'],
                    },
                ],
            }
        }

    },
    mounted() {
        console.log(this.option);
        // 初始化 ECharts 实例
        var myChart = echarts.init(document.getElementById('main'));
        // 使用配置项设置图表
        myChart.setOption(this.option);


    }
}

</script>
