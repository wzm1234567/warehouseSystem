<template>
    <div style="overflow: hidden;">
        <!-- <p class="tit">学会领导赴中国建筑业协会钢木建筑分会座谈</p> -->
        <section style="margin-top: 40px;">
            <div :style="{ width: '50%' }" class="swiper">
                <t-swiper :duration="500" :interval="5000">
                    <t-swiper-item>
                        <div class="sw-item" :style="{ background: 'var(--td-success-color-7)' }" >
                            <div>
                                <p>学会领导赴中国建筑业协会钢木建筑分会座谈</p>
                            </div>
                        </div>
                    </t-swiper-item>
                    <t-swiper-item>
                        <div class="sw-item" :style="{ height: '400px', background: 'var(--td-warning-color-7)' }" ></div>
                    </t-swiper-item>
                    <t-swiper-item>
                        <div class="sw-item" :style="{ height: '400px', background: 'var(--td-error-color-7)' }" ></div>
                    </t-swiper-item>
                </t-swiper>
            </div>
            <div style="width: 50%;">
                <ul>
                    <li>
                        <div></div>
                        <div></div><span>学会动态</span>
                    </li>
                    <li>
                        <icon name="ellipsis" />

                        <t-popup>

                            <!-- <t-space slot="content">触发元素是指触发浮层内容显示的元素</t-space> -->
                            <template #content>
                                <div>更多</div>
                            </template>
                        </t-popup>
                    </li>
                </ul>
                <ol>
                    <li>
                        <p>学会领导赴中国建筑业协会钢木建筑分会座谈</p>
                        <span>2024-10-17</span>
                    </li>
                    <li>
                        <p>第七届“一带一路”高质量发展对接交流活动在厦门成功举办 </p>
                        <span>2024-09-12</span>
                    </li>
                    <li>
                        <p>第七届“一带一路”高质量发展对接交流活动在厦门成功举办 </p>
                        <span>2024-09-12</span>
                    </li>
                    <li>
                        <p>中国国际经济合作学会赴河南省新乡市出席中国国际经济合作学会法律咨询专业 </p>
                        <span>2024-09-12</span>
                    </li>
                    <li>
                        <p>中国国际经济合作学会赴河南省新乡市出席中国国际经济合作学会法律咨询专业 </p>
                        <span>2024-09-12</span>
                    </li>
                    <li>
                        <p>中国国际经济合作学会赴河南省新乡市出席中国国际经济合作学会法律咨询专业 </p>
                        <span>2024-09-12</span>
                    </li>
                    <li>
                        <p>中国国际经济合作学会赴河南省新乡市出席中国国际经济合作学会法律咨询专业 </p>
                        <span>2024-09-12</span>
                    </li>


                </ol>
            </div>
        </section>
    </div>
</template>
<script>
import { Icon } from 'tdesign-icons-vue';
export default {
    components: {
        Icon,
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
.tit {
    width: 40%;
    font-size: 36px;
    font-weight: 600;
    color: #0649a5;
    // background-color: #fff;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 70px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap
}

section {
    display: flex;
    width: 100%;
    .swiper{
        .sw-item{
            height: 400px;
            position: relative;
            &>div{
                position: absolute;
                height: 80px;
                width: 100%;
                background-color: #1b1b1b48;
                bottom: 0;
                font-size: 22px;
                padding: 20px;
            }
        }
    }
    &>div:nth-of-type(2) {
        // background-color: #6d1616;
        padding: 10px 20px;

        ul {
            transform: translateY(-15px);
            border-bottom: 1px solid #0e4ca2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: 20px;

            li:nth-of-type(1) {
                color: #0e4ca2;
                font-size: 24px;
                font-weight: 600;
                // background-color: #0e4ca2;
                border-radius: 14px;
                padding: 5px 8px;
                display: inline-block;
                display: flex;
                align-items: center;

                div:nth-of-type(2) {
                    width: 5px;
                    height: 20px;
                    background-color: #0e4ca2;
                    margin-right: 10px;
                    transform: translateY(2px);
                }

                div:nth-of-type(1) {
                    width: 3px;
                    height: 20px;
                    background-color: rgb(230, 84, 84);
                    margin-right: 1px;
                    transform: translateY(2px);
                }
            }

            li:nth-of-type(2) {
                font-size: 26px;
                color: #024e7a;
                cursor: pointer;
            }
        }

        ol {
            width: 100%;

            // margin-top: 10px;
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                margin-left: 25px;
                padding: 12px 0;
                cursor: pointer;
                color: #333333;

                &::before {
                    content: '';
                    position: absolute;
                    left: -20px;
                    top: 50%;
                    width: 8px;
                    height: 8px;
                    transform: translateY(-50%);
                    background-color: #0e4ca2;
                    border-radius: 50%;
                    // display: flex;
                    // align-items: center;
                }

                &:hover {
                    color: red;
                }

                p {
                    font-size: 19px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;

                    font-weight: 500;
                    width: 80%;
                }

                span {
                    color: #6d6d6d;
                }
            }

        }
    }
}
</style>