<template>
    <div class="container"></div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        (function fairyDustCursor() {
            let possibleColors = ["#fff", "#ee7700", "#00b383", "#d90052", '#3073a9']
            let width = window.innerWidth;
            console.log(width);

            let height = window.innerHeight;
            console.log(height);

            let cursor = { x: width / 2, y: width / 2 };
            let particles = [];

            function init() {
                bindEvents();
                loop();
            }

            function bindEvents() {
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('touchmove', touchMove);
                document.addEventListener('touchstart', touchMove);
                window.addEventListener('resize', windowResize);
            }

            function windowResize(e) {
                width = window.innerWidth;
                height = window.innerHeight;
            }

            function touchMove(e) {
                if (e.touches.length > 0) {
                    for (let i = 0; i < e.touches.length; i++) {
                        addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
                    }
                }
            }

            function mouseMove(e) {
                // let container = document.querySelector('.container');
                // console.log(container);
                // cursor.x = container.clientWidth
                // cursor.y = container.clientHeight
                // console.log(container.clientWidth);
                // console.log(container.clientHeight);


                cursor.x = e.clientX;
                cursor.y = e.clientY - 950;   // 根据情况自身调节
                console.log(e.clientX);
                console.log(e.clientY);
                addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
            }

            function addParticle(x, y, color) {
                let particle = new Particle();
                particle.init(x, y, color);
                particles.push(particle);
            }

            function updateParticles() {
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                }

                for (let i = particles.length - 1; i >= 0; i--) {
                    if (particles[i].lifeSpan < 0) {
                        particles[i].die();
                        particles.splice(i, 1);
                    }
                }
            }

            function loop() {
                requestAnimationFrame(loop);
                updateParticles();
            }

            function Particle() {
                this.character = "❤";
                this.lifeSpan = 120;
                this.initialStyles = {
                    "position": "absolute",
                    "display": "block",
                    "pointerEvents": "none",
                    "z-index": "10000000",
                    "fontSize": "18px",
                    "will-change": "transform"
                };
                this.init = function (x, y, color) {
                    this.velocity = {
                        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                        y: 1
                    };

                    this.position = { x: x - 10, y: y - 20 };
                    this.initialStyles.color = color;
                    this.element = document.createElement('span');
                    this.element.innerHTML = this.character;
                    applyProperties(this.element, this.initialStyles);
                    this.update();

                    document.body.appendChild(this.element);
                };

                this.update = function () {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.lifeSpan--;
                    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
                }

                this.die = function () {
                    this.element.parentNode.removeChild(this.element);
                }

            }
            function applyProperties(target, properties) {
                for (let key in properties) {
                    target.style[key] = properties[key];
                }
            }

            init();
        })();
    },
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 95%;
    font-size: 100%;
    background-color: #32322e;
}
</style>