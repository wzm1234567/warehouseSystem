<template>
    <div>
        <div id="particles-js"></div>
    </div>
</template>
<script>
    import particlesjson1 from '../../assets/particles.json'
    import particlesjson2 from '../../assets/particles2.json'
    import particlesjson3 from '../../assets/particles3.json'
    import particlesjson4 from '../../assets/particles4.json'
    import particlesjson5 from '../../assets/particles5.json'
    import particlesjson6 from '../../assets/particles6.json'
    import particlesjson7 from '../../assets/particles7.json'
    export default {
        data() {
            return {

            }
        },
        computed: {

        },
        mounted() {
            require('particles.js')
            particlesJS('particles-js', particlesjson1, function () {
                console.log('callback - particles.js config loaded');
            });
        },
    }
</script>
<style lang="scss" scoped></style>