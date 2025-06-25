<template>
    <div class="fot">
        <div>
            <h2>主办单位</h2>
            <ul>
                <li>中国国际经济合作学会</li>
                <li>地址：中国北京安外东后巷28号</li>
                <li>邮编：100011</li>
                <li>电话：</li>
                <li>传真：(010)64211697</li>
                <li>Email：ciecos@263.net</li>
            </ul>
        </div>
        <aside></aside>
        <div>
            <h2>技术支持</h2>
            <ul>
                <!-- <li>中国国际电子商务中心</li>
                <li>电话：010-85093020</li> -->
                <li>ICP备案编号：京ICP备2020042838号</li>
                <li><img src="http://www.cafiecmofcom.org.cn/images/beianicon.png" alt="">京公网安备 11010102005861号</li>
            </ul>

        </div>
        <aside></aside>
        <div>
            <h2>联系我们</h2>
            <ul>
                <!-- <li>地址：北京市东城区安外东后巷28号</li> -->
                <!-- <li>邮编：100011</li> -->
                <li>秘书处 (010)64239509</li>
                <li>会员部 (010)64512488</li>
                <li>对外联络部 (010)64222440</li>
                <li>学术研究部 (010)64515458</li>
                <li>信息咨询部 (010)64211697</li>

            </ul>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
.fot {
    width: 100vw;
    height: 380px;
    background-color: #0c41bb;
    display: flex;
    justify-content: space-around;
    padding: 45px 160px;
    align-items: center;

    h2 {
        color: #fff;
        margin-bottom: 20px;
    }

    ul {
        color: #ffffff91;
        line-height: 27px;

        li {
            display: flex;
            align-items: center;
        }
    }

    aside {
        width: 1px;
        height: 200px;
        background-color: #1255d1;
    }

    div:nth-of-type(3) {
        z-index: 9999;

        ul {
            li {
                cursor: pointer;

                &:hover {
                    color: #fff;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>