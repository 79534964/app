<template>
    <div class="common-horologe">
        <img src="./background.png"/>
        <img class="needle" :style="`transform: rotate(${hour}deg)`" src="./hour.png"/>
        <img class="needle" :style="`transform: rotate(${minute}deg)`" src="./minute.png"/>
        <img class="needle" :style="`transform: rotate(${second}deg)`" src="./second.png"/>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        props: {
            time: {
                type: Number
            }
        },
        data() {
            return {
                second: 0,
                minute: 0,
                hour: 0
            };
        },
        methods: {
            init() {
                let time = new Date(+new Date() + this.time);
                this.hour = time.getHours() * 30 + parseInt((time.getMinutes() / 60) * 30);
                this.minute = time.getMinutes() * 6;
                this.second = time.getSeconds() * 6;
            }
        },
        mounted() {
            window.setInterval(() => {
                this.init();
            }, 1000);
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .common-horologe
        position relative
        width: 100%
        height: 100%
        .needle
            position: absolute
            left: 0
            right: 0
            top: 0
            bottom: 0
</style>
