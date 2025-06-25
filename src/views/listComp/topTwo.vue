<template>
    <div style="width: 100%;margin: 60px 0;">
        <div class="tit">
            <div></div>
            <div></div>
            <p>学术与交流</p>
            <div></div>
            <div></div>
            <div></div>
            <!-- <icon class="icon" name="chevron-right-double-s" /> -->
        </div>
        <p class="subtit">XUE SHU YU JIAO LIU</p>

        <div class="content">
            <icon class="icon-left" @click="swLeft" name="chevron-left" />
            <div class="tdesign-demo-block--swiper">
                <t-swiper type="card" :height="280" :current="indexSw" :duration="500" :interval="0" @change="swChange"
                    trigger="click">
                    <t-swiper-item>
                        <div class="swiper-item">
                            <p>习近平在中国－中亚峰会上的主旨讲话（全文）1</p>
                            <div>尊敬的各位同事，

                                女士们，先生们，朋友们：

                                欢迎大家来到西安，出席中国－中亚峰会，共商中国同中亚五国合作大计。

                                西安古称长安，是中华文明和中华民族的重要发祥地之一，也是古丝绸之路的东方起点。2100多年前，中国汉代使者张骞自长安出发，出使西域，打开了中国同中亚友好交往的大门。千百年来，中国同中亚各族人民一道推动了丝绸之路的兴起和繁荣，为世界文明交流交融、丰富发展作出了历史性贡献。中国唐代诗人李白曾有过“长安复携手，再顾重千金”的诗句。今天我们在西安相聚，续写千年友谊，开辟崭新未来，具有十分重要的意义。
                            </div>
                            <p>2023-05-22</p>
                        </div>
                    </t-swiper-item>
                    <t-swiper-item>
                        <div class="swiper-item">
                            <p>中国国际经济合作学会会员服务需求问卷调查表2</p>
                            <div>
                                中国国际经济合作学会于2024年1月26日在京召开了第八届会员代表大会，选举产生了新一届领导班子。针对性地向会员单位和专业委员会提供优质服务，提高学会工作水平，现向各会员单位发放需求问卷表，征求意见
                            </div>
                            <p>2024-08-19</p>
                        </div>
                    </t-swiper-item>
                    <t-swiper-item>
                        <div class="swiper-item">
                            <p>中国－中亚峰会成果清单（全文）3</p>
                            <div>2023年5月18日至19日，中国－中亚峰会在陕西省西安市举办。峰会期间，中国同中亚五国达成系列合作共识。

                                一、主要合作共识和倡议

                                1.成立中国－中亚元首会晤机制；

                                2.在重点优先合作领域成立部长级会晤机制；</div>
                            <p>2023-05-22</p>
                        </div>
                    </t-swiper-item>
                    <t-swiper-item>
                        <div class="swiper-item">
                            <p>习近平在中国－中亚峰会上的主旨讲话（全文）4</p>
                            <div>尊敬的各位同事，

                                女士们，先生们，朋友们：

                                欢迎大家来到西安，出席中国－中亚峰会，共商中国同中亚五国合作大计。

                                西安古称长安，是中华文明和中华民族的重要发祥地之一，也是古丝绸之路的东方起点。2100多年前，中国汉代使者张骞自长安出发，出使西域，打开了中国同中亚友好交往的大门。千百年来，中国同中亚各族人民一道推动了丝绸之路的兴起和繁荣，为世界文明交流交融、丰富发展作出了历史性贡献。中国唐代诗人李白曾有过“长安复携手，再顾重千金”的诗句。今天我们在西安相聚，续写千年友谊，开辟崭新未来，具有十分重要的意义。
                            </div>
                            <p>2023-05-22</p>
                        </div>
                    </t-swiper-item>
                </t-swiper>
            </div>
            <icon class="icon-right" @click="swRight" name="chevron-right" />
        </div>
    </div>
</template>
<script>
import { Icon } from 'tdesign-icons-vue';
export default {
    components: {
        Icon
    },
    data() {
        return {
            indexSw: 0
        }
    },
    methods: {
        swChange(e) {
            console.log(e);
            this.indexSw = e
            console.log(this.indexSw);
        },
        swLeft(){
            
            if (this.indexSw > 0) {
                this.indexSw--
            }else{
                this.indexSw = 3
            }
        },
        swRight(){
            if (this.indexSw < 3) {
                this.indexSw++
            }else{
                this.indexSw = 0
            }
            
        }
    }
}
</script>  
<style lang="scss" scoped>
// import 'tdesign-vue/es/style/index.css';
@import 'tdesign-vue/es/style/index.css';

.tit {
    display: flex;
    font-size: 35px;
    // color: #045991;
    color: #0e4ca2;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;

    div:nth-of-type(1),
    div:nth-of-type(4) {
        width: 7px;
        height: 7px;
        background-color: #074d7c;
        border-radius: 50%;
    }

    div:nth-of-type(2),
    div:nth-of-type(3) {
        width: 12px;
        height: 12px;
        background-color: #074d7c;
        border-radius: 50%;
    }

    div:nth-of-type(2),
    div:nth-of-type(4) {
        margin-left: 10px;
    }

    p {
        margin: 0 20px;
    }

    div:nth-of-type(5) {
        width: 90px;
        height: 70px;
        position: absolute;
        left: 52.2%;
        // transform: translateX(-50%);
        top: 15px;
        z-index: -1;
        background-image: url('https://gd-hbimg.huaban.com/58baa824551b8c66c0efd998975548843626c12cb0045-PCtoUP');
        background-repeat: no-repeat;
        background-size: 190% 130%;
    }

    .icon {
        position: absolute;
        right: 0%;
        top: 90px;
        cursor: pointer;
    }
}

.subtit {
    text-align: center;
    font-size: 14px;
    color: #358ac4;
    margin-top: 10px;
    z-index: 10;
}

.content {
    // display: flex;
    // justify-content: space-between;
    margin-top: 50px;
    text-align: center;
    // background-color: #c71212;
    height: 350px;
    position: relative;
    .icon-left{
        position: absolute;
        font-size: 30px;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    .icon-right{
        font-size: 30px;
        position: absolute;
        right: -15px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    &>div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;

        .swiper-item {
            padding: 35px;
            z-index: 99;
            background-color: #fff;
            height: 300px;

            p:nth-of-type(1) {
                font-size: 21px;
                font-weight: 600;
                font-family: SimHei;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                /* 显示的行数 */
                overflow: hidden;
                letter-spacing: 1px;
                color: #2b2b2b;
            }

            &>div {
                font-size: 15px;
                // font-family: SimSun ;
                margin-top: 20px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                /* 显示的行数 */
                overflow: hidden;
                line-height: 36px;
                color: #707070;
                font-weight: 600;
                text-indent: 2em;
                letter-spacing: 1px;
                cursor: pointer;
            }

            &>div:hover {
                color: #045991;
            }

            p:nth-of-type(2) {
                margin-top: 30px;
                text-align: right;
                color: #464545;
            }
        }
    }
}

::v-deep .t-swiper__arrow svg.t-icon {
    width: 50px;
    height: 50px;
    display: none;
}
::v-deep .t-swiper__navigation{
    display: none;
}
</style>