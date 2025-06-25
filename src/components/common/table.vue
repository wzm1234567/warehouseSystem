<!-- table组件封装 -->
<template>
    <div>
        <el-table style="width: 100%" v-loading="loading" :data="tableList"
            :header-cell-style="{ background: '#EFEFEF', textAlign: 'center' }" :border="false" :height="height">


            <el-table-column width="55" type="selection" align="center" v-if="showCheckBox"></el-table-column>

            <el-table-column label="序号" width="55" align="center" v-if="showNumber">

                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>

            </el-table-column>
            <el-table-column label="" min-width="35" align="center">

                <template slot-scope="scope">
                    <!-- 模板图片插槽 -->
                    <slot name="templateImg" :row="scope.row" v-if="scope.row.survey_model === 2"></slot>
                </template>

            </el-table-column>


            <el-table-column v-for="(item, index) in headerList" 
            :key="index" 
            :prop="item.props" 
            :label="item.label"
            :min-width="item.minWidth" 
            :align="item.props === 'surveyName' ? '' : 'center'">
            </el-table-column>



            <el-table-column label="操作" v-if="showHandle" min-width="300" align="center">
                <template slot-scope="scope">
                    <!-- 事项操作插槽 -->
                    <slot name="matterOperation" :row="scope.row"></slot>
                    <!-- 场景操作插槽 -->
                    <slot name="sceneOperation" :row="scope.row"></slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            headerList: {
                type: Array,
            },
            tableList: {
                type: Array,
            },
            showCheckBox: {
                // 是否显示多选框
                type: Boolean,
                default: false,
            },
            showNumber: {
                // 是否显示序号
                type: Boolean,
                default: false,
            },
            showHandle: {
                // 是否显示操作栏
                type: Boolean,
                default: true,
            },
            content: {
                type: String,
                default: "删除",
            },
            loading: {
                // 是否显示 Loading 加载
                type: Boolean,
                default: false,
            },
            height: {
                // 表格高度
                type: String,
                default: "auto",
            },
        },
    };
</script>

<style lang="scss" scoped>
    .cell button {
        border: none;
        padding-left: 0;
    }
</style>