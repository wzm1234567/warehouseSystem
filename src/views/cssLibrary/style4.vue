<template>
    <div class="boss" style="width: 100%;height: 100%;">
        <canvas id="bg"></canvas>
    </div>
</template>
<script>
export default {
    mounted() {
        // 获取父元素尺寸
        function getDimensions(element) {
            var rect = element.getBoundingClientRect();
            var width = rect.width;
            var height = rect.height;
            return { width: width, height: height };

        }
        // 获取 canvas 元素
        const cvs = document.getElementById('bg');
        const boss = document.querySelector('.boss');
        console.log(getDimensions(boss));

        // 获取窗口尺寸
        const width = getDimensions(boss).width;
        const height = getDimensions(boss).height;
        // const width = window.innerWidth * devicePixelRatio;
        // const height = window.innerHeight * devicePixelRatio;
        console.log(width, height);

        // 设置 canvas 尺寸为窗口尺寸
        cvs.width = width;
        cvs.height = height;

        // 获取绘制上下文
        const ctx = cvs.getContext('2d');
        //字体大小
        const fontSize = 20 * devicePixelRatio;

        // 列宽
        const columnWidth = fontSize;
        // 列的数量
        const columnNum = Math.floor(width / columnWidth);
        // 每一列下一个文字的下标
        const nextChars = new Array(columnNum).fill(0);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, width, height);
            for (let i = 0; i < columnNum; i++) {
                const char = getRandomChar();
                ctx.fillStyle = getRandomColor();
                ctx.font = `${fontSize}px "Roboto Mono"`
                const x = i * columnWidth;
                const index = nextChars[i]; // 当前列的下一个文字的下标
                const y = (index + 1) * fontSize;
                ctx.fillText(char, x, y);
                if (y > height && Math.random() > 0.99) {
                    nextChars[i] = 0;
                } else {
                    nextChars[i]++;
                }

            }
        }
        // 随机颜色
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // 随机字符
        function getRandomChar() {
            var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var index = Math.floor(Math.random() * letters.length);
            return letters[index];
        }


        setInterval(() => {
            draw()
        }, 40);

    }
}
</script>
<style lang="scss" scoped></style>