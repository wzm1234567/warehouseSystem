<template>
    <div class="had">
        <header>

            <div>
                <img style="width: 90px;margin-right: 16px;margin-bottom: -10px;" src="../../assets/logos.png" alt="">
                <span>中国国际经济合作学会</span>
            </div>
            <p>China Association for International Economic Cooperation</p>




            <!-- <div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div> -->
           


        </header>

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
.had {
    width: 100vw;

    header {
        margin: auto;
        width: 100%;
        height: 320px;
        background-image: url(https://gd-hbimg.huaban.com/f6e2ae0db8021e433704f7bc78005a489d62cedf32f1e-IOYPQX);
        background-repeat: no-repeat;
        background-size: 100% 165%;
        overflow: hidden;

        &>div {
            font-weight: 700;
            font-family: '手札体-中黑';
            -webkit-text-stroke: #fff 1px;
            font-size: 3.5em;
            text-align: center;
            color: #1157b3;
            margin-top: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p {
            text-align: center;
            color: #2a63ad;
            font-size: 1.1em;
            font-size: 600;
            margin-top: 14px
        }
    }
}




.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}


</style>