<!-- table组件封装 -->
<template>
    <div>
        <el-table 
            v-loading="loading" 
            :data="tableData"
            :border="border" 
            :height="height"
            :row-style="rowStyle"
            @row-click="rowClick"
            >

            <template v-for="(item, index) in config">
                <el-table-column v-if="item.isIndex" :label="item.label || ''" width="55" align="center">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column v-if="item.isSlot" :label="item.label" :width="item.width || ''" :align="item.align || 'center'">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :row="scope.row"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-if="!item.isIndex && !item.isSlot" :prop="item.prop" :label="item.label" :width="item.width || ''" :align="item.align || 'center'" />
                <!-- <el-table-column v-if="!item.isIndex && !item.isSlot" prop="name" label="item.label" :width="item.width || ''" :align="item.align || 'center'" /> -->
            </template>

        </el-table>
    </div>
</template>

<script>
/**
 * 表格组件封装
 * @param {Array} config 表格列配置
 * @param {Array} tableData 表格数据
 * @param {Boolean} loading 是否显示 Loading 加载
 * @param {String} height 表格高度
 */
export default {
    name: "Table",
    props: {
        config: {
            /**
             * 表格列配置项
             * label             列名称, 
             * prop,             列字段
             * width,            列宽度 
             * align             列对齐方式 left | center | right
             * isIndex,          是否是序号列
             * isSlot,           是否开启插槽
             * slotName,         插槽名称
             * isExpand, 
             * isSelection, 
             * hideTooltip 
             */
            type: Array,
            default: () => [],
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        loading: {
            // 是否显示 Loading 加载
            type: Boolean,
            default: false,
        },
        height: {
            // 表格高度
            type: String,
            default: "",
        },
        border: {
            // 是否显示表格边框
            type: Boolean,
            default: false,
        },
        rowClick: {
            // 行点击事件
            type: Function,
            default: () => {},
        },
        rowStyle: {
            // 行样式
            type: Function,
            default: () => {},
        }
    },
};
</script>

<style lang="scss" scoped>

</style>