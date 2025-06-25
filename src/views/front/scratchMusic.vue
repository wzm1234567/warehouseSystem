<template>
    <div>
        <div
            style="position: relative; width: 700px;height: 300px;background-color: red; display: flex; justify-content: space-between; align-items: center;">
            <h2>6666666666</h2>
            <canvas id="canvas" width="700" height="300"> </canvas>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.draw();
    },
    methods: {
        draw() {

            var canvas = document.getElementById('canvas');
            if (!canvas.getContext) return;
            var ctx = canvas.getContext('2d');
            // 设置一个颜色 覆盖在这个图片上
            ctx.beginPath();
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // 属性方法
            ctx.globalCompositeOperation = 'destination-out';
            // 设置画笔为圆形
            ctx.lineCap = 'round';
            // 设置画笔宽度
            ctx.lineWidth = 40;

            // 鼠标或触摸按下
            function start(e) {
                console.log(e);

                e.preventDefault();
                var x = e.clientX - 216 - 8 || e.touches[0].clientX;
                var y = e.clientY - 60 || e.touches[0].clientY;
                console.log(x, y);

                ctx.moveTo(x, y);
                move();
            }

            // 移动
            function move() {
                canvas.addEventListener('mousemove', drawLine);
                canvas.addEventListener('touchmove', drawLine);
            }

            // 绘制线条
            function drawLine(e) {
                e.preventDefault();
                var x = e.clientX - 216 - 8 || e.touches[0].clientX;
                var y = e.clientY - 60 || e.touches[0].clientY;
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            // 结束
            function end(e) {
                e.preventDefault();
                canvas.removeEventListener('mousemove', drawLine);
                canvas.removeEventListener('touchmove', drawLine);
            }

            // 添加事件监听器
            canvas.addEventListener('mousedown', start);
            canvas.addEventListener('touchstart', start);
            canvas.addEventListener('mouseup', end);
            canvas.addEventListener('touchend', end);
        }
    }


}
</script>
<style lang="scss" scoped>
#canvas {
    position: absolute;
    left: 0;
    cursor: pointer;
}

h2 {
    text-align: center;
}
</style>