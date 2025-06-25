<template>
    <div class="style18">
        <div class="container">
            <!-- 容器div -->
            <div class="card">
                <!-- 卡片div -->
                <div class="logo">
                    <!-- Logo的div -->
                    <span class="circle" style="--i: 0"></span>
                    <!-- 五个圆圈，用于制作3D视差效果 -->
                    <span class="circle" style="--i: 1"></span>
                    <span class="circle" style="--i: 2"></span>
                    <span class="circle" style="--i: 3"></span>
                    <span class="circle" style="--i: 4"><i
                            class="fa-solid fa-seedling"></i><!-- FontAwesome图标 --></span>
                </div>
                <div class="glass">
                    <!-- 玻璃效果 -->
                    <div class="content">
                        <!-- 内容div -->
                        <h1>小黑学长T</h1>
                        <!-- 标题 -->
                        <p>此处是小黑学长相关的废话100字...</p>
                        <!-- 文本内容 -->
                    </div>
                    <div class="footer">
                        <!-- 页脚div -->
                        <div class="social">
                            <!-- 社交图标div -->
                            <span class="social_icon" style="--j: 1">
                                <i class="fa-brands fa-weixin"></i><!-- 微信图标 -->
                            </span>
                            <span class="social_icon" style="--j: 2">
                                <i class="fa-brands fa-qq"></i><!-- QQ图标 --></span>
                            <span class="social_icon" style="--j: 3">
                                <i class="fa-brands fa-discord"></i><!-- Discord图标 -->
                            </span>
                        </div>
                        <div class="link">
                            更多...<i class="fa-solid fa-arrow-up-right-from-square"></i><!-- 更多链接及相关图标 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css); // tubiao图标 */

/* 设置根元素变量 */
:root {
    --primary-color: #00894d;
}

/* 设置页面背景样式 */
.style18 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: linear-gradient(135deg, #dc86fb, #12cfe0);
}

/* 定义3D效果容器 */
.container {
    width: 300px;
    height: 300px;
    perspective: 1000px;
}

/* 卡片样式 */
.card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, #00ffd6, #08e260);
    transition: 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: 40px 50px 25px #05471100, 0px 25px 25px #02140033;
}

/* Logo样式 */
.logo {
    position: absolute;
    top: 0;
    right: 0;
    transform-style: preserve-3d;
}

/* 按钮圆圈样式 */
.logo .circle {
    position: absolute;
    top: calc(var(--i) * 2px + 8px);
    right: calc(var(--i) * 2px + 8px);
    width: calc(170px - var(--i) * 30px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: #00f9cd33;
    box-shadow: -10px 10px 20px #64646f33;
    transition: 0.5s ease-in-out;
    backdrop-filter: blyr(5px);
    transform: translate3d(0, 0, calc((var(--i) + 1) * 20px));
    transition-delay: calc(var(--i) * 0.4s);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
}

/* 玻璃样式 */
.glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    background: linear-gradient(#ffffff59, #ffffffd0);
    border-radius: 55px;
    border-top-right-radius: 100%;
    border-left: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    transition: 0.5s ease-in-out;
    transform: translate3d(0, 0, 25px);
}

/* 内容样式 */
.content {
    padding: 130px 60px 0 30px;
}

/* 标题样式 */
.content h1 {
    color: var(--primary-color);
    font-weight: 900;
    font-size: 20px;
}

/* 段落样式 */
.content p {
    margin-top: 10px;
    color: #00a15d;
    font-size: 12px;
}

/* 页脚样式 */
.footer {
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 30px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* 页脚链接样式 */
.footer .link {
    transition: 0.2s ease-in-out;
    font-size: 12px;
    color: #00c37b;
    cursor: pointer;
}

/* 鼠标悬停时链接样式 */
.footer .link:hover {
    transform: translate3d(0, 0, 10px);
    color: var(--primary-color);
}

/* 社交图标样式 */
.footer .social {
    transform-style: preserve-3d;
    display: flex;
    gap: 10px;
}

/* 社交图标图标样式 */
.footer .social .social_icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #ffffff;
    color: var(--primary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 7px 7px 5px #05471180;
    transition: 0.2s ease-in-out calc(var(--j) * 0.2s);
}

/* 鼠标悬停时卡片样式 */
.container:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: 40px 50px 25px #0547110d, 0px 25px 30px #05471111;
}

/* 鼠标悬停时社交图标样式 */
.container:hover .card .footer .social .social_icon {
    transform: translate3d(0, 0, 50px);
    box-shadow: -5px 20px 10px #05471133;
}

/* 鼠标悬停时Logo圆圈样式 */
.container:hover .card .logo .circle {
    transform: translate3d(0, 0, calc(var(--i) * 20px + 40px));
}
</style>
