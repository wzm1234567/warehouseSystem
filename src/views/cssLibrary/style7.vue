<template>
    <div style="width: 100%;">
        <div class="box">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.box {
    width: 100%;
    margin: 0 auto;
    /* 几列 */
    column-count: 4;
    /* 列间距 */
    column-gap: 20px;
    /* 添加背景颜色 */
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
}

.box div {
    height: 160px;
    margin-bottom: 20px;
    /* 增加底部间距 */
    /* 避免在该元素内部发生分页或者分栏 如果不够 排在下一列*/
    break-inside: avoid;
    color: #333333;
    /* 更改文字颜色 */
    text-align: center;
    font-size: 24px;
    /* 调整字体大小 */
    border: 2px solid #ffffff;
    /* 添加边框 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
    border-radius: 10px;
    /* 圆角 */
}

.box div:nth-child(1) {
    background: linear-gradient(135deg, #ffcc00, #ff9900);
}

.box div:nth-child(2) {
    background: linear-gradient(135deg, #ff6666, #ff3333);
}

.box div:nth-child(3) {
    background: linear-gradient(135deg, #66ccff, #3399ff);
}

.box div:nth-child(4) {
    background: linear-gradient(135deg, #ccff66, #99ff33);
}

.box div:nth-child(5) {
    background: linear-gradient(135deg, #ffccff, #ff99cc);
}

.box div:nth-child(6) {
    background: linear-gradient(135deg, #ccffcc, #99ff99);
}

.box div:nth-child(7) {
    background: linear-gradient(135deg, #ffcc99, #ff9966);
}

.box div:nth-child(8) {
    background: linear-gradient(135deg, #ccccff, #9999ff);
}

.box div:nth-child(9) {
    background: linear-gradient(135deg, #ffcccc, #ff9999);
}

.box div:nth-child(10) {
    background: linear-gradient(135deg, #ccffcc, #99ff99);
}

.box div:nth-child(11) {
    background: linear-gradient(135deg, #ffcc99, #ff9966);
}

.box div:nth-child(12) {
    background: linear-gradient(135deg, #ccccff, #9999ff);
}

.box div:nth-child(13) {
    background: linear-gradient(135deg, #ffcccc, #ff9999);
}

.box div:nth-child(14) {
    background: linear-gradient(135deg, #ccffcc, #99ff99);
}

.box div:nth-child(15) {
    background: linear-gradient(135deg, #ffcc99, #ff9966);
}

.box div:nth-child(16) {
    background: linear-gradient(135deg, #ccccff, #9999ff);
}

.box div:nth-child(2n) {
    height: 300px;
}

.box div:nth-child(3n+1) {
    height: 180px;
}
</style>